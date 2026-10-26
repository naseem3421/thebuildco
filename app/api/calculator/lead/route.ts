import { NextRequest, NextResponse } from "next/server";

export interface CalculatorLeadPayload {
  name: string;
  phone: string;
  calculator?: string;
  plotArea?: number;
  plotDimensions?: string;
  cents?: string;
  grounds?: string;
  builtUpArea?: number;
  floors?: number;
  bhk?: number;
  homeType?: string;
  package?: string;
  packageRate?: number;
  addons?: string[];
  estimatedCost?: number;
  estimateLow?: number;
  estimateHigh?: number;
  duration?: string;
  locality?: string;
  source?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  honeypot?: string;
}

// Phone validation: 10-digit Indian mobile or 7-15 digit international phone number
function validatePhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-()+]/g, "");
  const normalized =
    cleaned.startsWith("91") && cleaned.length === 12
      ? cleaned.slice(2)
      : cleaned.startsWith("0") && cleaned.length === 11
      ? cleaned.slice(1)
      : cleaned;

  const isIndian = /^[6-9]\d{9}$/.test(normalized);
  const isInternational = /^\d{7,15}$/.test(cleaned);

  return isIndian || isInternational;
}

export async function POST(request: NextRequest) {
  try {
    const clientIp =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";
    const userAgent = request.headers.get("user-agent") || undefined;

    const body: CalculatorLeadPayload = await request.json();

    // 1. Honeypot check
    if (body.honeypot && body.honeypot.trim().length > 0) {
      return NextResponse.json({ success: true, leadId: "BUILD-FILTERED" }, { status: 200 });
    }

    // 2. Validation
    const name = (body.name || "").trim();
    const phone = (body.phone || "").trim();

    if (!name || name.length < 2) {
      return NextResponse.json(
        { success: false, message: "Please enter your full name." },
        { status: 400 }
      );
    }

    if (!phone || !validatePhone(phone)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid phone number (10-digit Indian or international with country code)." },
        { status: 400 }
      );
    }

    const leadId = `BUILD-CALC-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    const timestamp = new Date().toISOString();

    const leadRecord = {
      leadId,
      name,
      phone,
      calculator: body.calculator || "calculator-pro-3",
      plotArea: body.plotArea,
      plotDimensions: body.plotDimensions,
      cents: body.cents,
      grounds: body.grounds,
      builtUpArea: body.builtUpArea,
      floors: body.floors,
      bhk: body.bhk,
      homeType: body.homeType,
      package: body.package,
      packageRate: body.packageRate,
      addons: body.addons || [],
      estimatedCost: body.estimatedCost,
      estimateLow: body.estimateLow,
      estimateHigh: body.estimateHigh,
      duration: body.duration,
      locality: body.locality,
      source: body.source || "calculator_pro_3_lead_gate",
      attribution: {
        utm_source: body.utm_source,
        utm_medium: body.utm_medium,
        utm_campaign: body.utm_campaign,
      },
      clientMeta: { clientIp, userAgent },
      timestamp,
    };

    // 3. Optional Webhook dispatch (Zapier / CRM / Webhook)
    const webhookUrl = process.env.CALCULATOR_LEAD_WEBHOOK_URL || process.env.LEAD_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(leadRecord),
        });
      } catch (webhookErr) {
        console.error("[Calculator Webhook Error]", webhookErr);
      }
    } else if (process.env.NODE_ENV === "development") {
      console.log("[Calculator Pro 3 Lead Received]", leadRecord);
    }

    return NextResponse.json(
      {
        success: true,
        leadId,
        message: "Your detailed breakdown and PDF quote are ready!",
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("[Calculator Lead Handler Error]", err);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred. Please reach out on WhatsApp." },
      { status: 500 }
    );
  }
}
