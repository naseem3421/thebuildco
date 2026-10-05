import { NextRequest, NextResponse } from "next/server";

export interface LeadPayload {
  name: string;
  phone: string;
  area?: string | number;
  location: string;
  constructionType?: string;
  package?: string;
  floors?: string | number;
  estimatedCost?: string | number;
  source?: string;
  notes?: string;
  honeypot?: string; // Anti-spam hidden field
  utmParams?: Record<string, string | undefined>;
  gclid?: string;
  fbclid?: string;
  referrer?: string;
  landingPage?: string;
  timestamp?: string;
}

// In-memory rate limiting map: ip -> { count: number, resetTime: number }
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const MAX_REQUESTS_PER_WINDOW = 10;
const WINDOW_DURATION_MS = 10 * 60 * 1000; // 10 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + WINDOW_DURATION_MS });
    return false;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  record.count += 1;
  return false;
}

// Helper to strip HTML tags and sanitize strings
function sanitizeText(str?: string, maxLen = 200): string {
  if (!str) return "";
  return str
    .replace(/<[^>]*>?/gm, "") // remove HTML tags
    .replace(/[<>'"&]/g, "") // remove potential injection characters
    .trim()
    .slice(0, maxLen);
}

// Indian mobile number validation (10 digits starting with 6, 7, 8, 9, optional +91 or 0 prefix)
function validateIndianPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-()+]/g, "");
  const normalized = cleaned.startsWith("91") && cleaned.length === 12
    ? cleaned.slice(2)
    : cleaned.startsWith("0") && cleaned.length === 11
    ? cleaned.slice(1)
    : cleaned;

  return /^[6-9]\d{9}$/.test(normalized);
}

/**
 * Meta Conversions API (CAPI) Dispatcher
 * Only executes if META_CAPI_ACCESS_TOKEN and NEXT_PUBLIC_META_PIXEL_ID are provided in environment variables.
 */
async function dispatchMetaConversionsAPI(leadData: {
  leadId: string;
  phone: string;
  location: string;
  source: string;
  clientIp?: string;
  userAgent?: string;
  landingPage?: string;
  fbclid?: string;
  fbp?: string;
  fbc?: string;
}) {
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  if (!accessToken || !pixelId) {
    return;
  }

  try {
    const crypto = await import("crypto");
    const normalizedPhone = leadData.phone.replace(/\D/g, "");
    const hashedPhone = crypto.createHash("sha256").update(normalizedPhone).digest("hex");

    const eventPayload = {
      data: [
        {
          event_name: "Lead",
          event_time: Math.floor(Date.now() / 1000),
          event_id: leadData.leadId,
          event_source_url: leadData.landingPage || "https://thebuildcompany.in",
          action_source: "website",
          user_data: {
            ph: [hashedPhone],
            client_ip_address: leadData.clientIp,
            client_user_agent: leadData.userAgent,
            fbp: leadData.fbp,
            fbc: leadData.fbc || (leadData.fbclid ? `fb.1.${Date.now()}.${leadData.fbclid}` : undefined),
          },
          custom_data: {
            content_name: leadData.source,
            content_category: leadData.location,
            currency: "INR",
          },
        },
      ],
    };

    await fetch(`https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventPayload),
    });
  } catch (capiError) {
    console.error("[Meta CAPI Error]", capiError);
  }
}

export async function POST(request: NextRequest) {
  try {
    const clientIp =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";
    const userAgent = request.headers.get("user-agent") || undefined;

    // 1. Rate Limiting Check
    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many requests. Please try again after a few minutes or call us directly.",
        },
        { status: 429 }
      );
    }

    const body: LeadPayload = await request.json();

    // 2. Anti-Spam Honeypot Check (If filled, silently return 200 without processing)
    if (body.honeypot && body.honeypot.trim().length > 0) {
      return NextResponse.json(
        {
          success: true,
          leadId: "TBC-SPAM-FILTERED",
          message: "Enquiry received.",
        },
        { status: 200 }
      );
    }

    // 3. Validation & Sanitization
    const errors: Record<string, string> = {};

    const sanitizedName = sanitizeText(body.name, 100);
    const sanitizedLocation = sanitizeText(body.location, 100);
    const sanitizedNotes = sanitizeText(body.notes, 500);

    if (!sanitizedName || sanitizedName.length < 2) {
      errors.name = "Please enter a valid full name.";
    }

    if (!body.phone || !validateIndianPhone(body.phone)) {
      errors.phone = "Please enter a valid 10-digit Indian mobile number.";
    }

    if (!sanitizedLocation || sanitizedLocation.length < 2) {
      errors.location = "Please provide your plot location in Chennai.";
    }

    if (body.area !== undefined && body.area !== "") {
      const numArea = Number(body.area);
      if (isNaN(numArea) || numArea <= 0 || numArea > 100000) {
        errors.area = "Built-up area must be a valid positive number.";
      }
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          errors,
          message: "Validation failed. Please check the entered details.",
        },
        { status: 400 }
      );
    }

    // 4. Generate Lead Record with full Attribution
    const leadId = `TBC-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    const timestamp = body.timestamp || new Date().toISOString();

    const sanitizedLead = {
      leadId,
      name: sanitizedName,
      phone: body.phone.trim(),
      area: body.area ? String(body.area).trim() : undefined,
      location: sanitizedLocation,
      constructionType: sanitizeText(body.constructionType, 80) || "Turnkey Construction",
      package: sanitizeText(body.package, 80) || "Standard",
      floors: body.floors ? String(body.floors) : undefined,
      estimatedCost: body.estimatedCost ? String(body.estimatedCost) : undefined,
      source: sanitizeText(body.source, 80) || "website_inquiry",
      notes: sanitizedNotes || undefined,
      attribution: {
        utmParams: body.utmParams || {},
        gclid: sanitizeText(body.gclid, 120),
        fbclid: sanitizeText(body.fbclid, 120),
        referrer: sanitizeText(body.referrer, 250),
        landingPage: sanitizeText(body.landingPage, 150) || "/",
      },
      clientMeta: {
        clientIp,
        userAgent,
      },
      timestamp,
    };

    // 5. Trigger Meta CAPI if configured
    await dispatchMetaConversionsAPI({
      leadId,
      phone: sanitizedLead.phone,
      location: sanitizedLead.location,
      source: sanitizedLead.source,
      clientIp,
      userAgent,
      landingPage: sanitizedLead.attribution.landingPage,
      fbclid: body.fbclid,
    });

    // 6. Optional Webhook Dispatch (CRM / Zapier / Google Sheets)
    const webhookUrl = process.env.LEAD_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(sanitizedLead),
        });
      } catch (webhookError) {
        console.error("[Lead Webhook Error]", webhookError);
      }
    } else if (process.env.NODE_ENV === "development") {
      // Safe development logging
      console.log("[TBC New Lead Stored]", {
        leadId,
        source: sanitizedLead.source,
        location: sanitizedLead.location,
        area: sanitizedLead.area,
        package: sanitizedLead.package,
        attribution: sanitizedLead.attribution,
        timestamp,
      });
    }

    return NextResponse.json(
      {
        success: true,
        leadId,
        message: "Enquiry submitted successfully. Our engineering team will contact you shortly.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Lead Processing Error]", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while submitting your enquiry. Please try again or reach out on WhatsApp.",
      },
      { status: 500 }
    );
  }
}
