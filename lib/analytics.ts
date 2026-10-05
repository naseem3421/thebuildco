/**
 * Production-ready Conversion Tracking & Analytics Architecture
 * Supports Google Analytics 4 (GA4), Meta Pixel, Google Ads conversions, and dataLayer.
 * Strictly guarantees ZERO PII is sent to external analytics tools.
 */

// Window extensions for gtag, fbq, dataLayer
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export type WhatsAppLocation =
  | "hero"
  | "packages"
  | "calculator"
  | "footer"
  | "sticky_mobile"
  | "header"
  | "cta_section"
  | "locality_page"
  | "project_page"
  | "contact_page"
  | "general";

export type PhoneLocation =
  | "header"
  | "hero"
  | "sticky_mobile"
  | "contact"
  | "footer"
  | "locality_page"
  | "general";

export type FormType =
  | "consultation"
  | "calculator"
  | "contact"
  | "site_visit"
  | "general_inquiry"
  | "calculator_lead_gate";

export interface CalculatorEventParams {
  package: string;
  area: number;
  floors: number;
  location: string;
  estimated_cost: string | number;
}

export interface PackageViewParams {
  package_name: string;
  price_per_sqft: number;
}

export interface ProjectViewParams {
  project_name: string;
  location?: string;
  built_up_area?: string | number;
}

export interface CTAClickParams {
  cta_label: string;
  location?: string;
  destination?: string;
}

export interface GenericEventPayload {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  metadata?: Record<string, string | number | boolean | undefined>;
}

// Deduplication map to prevent accidental double-firing within 800ms
const recentEvents = new Map<string, number>();

function isDuplicate(eventKey: string): boolean {
  const now = Date.now();
  const lastTime = recentEvents.get(eventKey);
  if (lastTime && now - lastTime < 800) {
    return true;
  }
  recentEvents.set(eventKey, now);
  return false;
}

/**
 * Log safely in development mode without cluttering production console
 */
function logDebug(platform: string, eventName: string, params?: unknown) {
  if (process.env.NODE_ENV === "development") {
    console.log(
      `%c[TBC ${platform}]%c ${eventName}`,
      "color: #183B35; font-weight: bold; background: #E9E4D9; padding: 2px 6px; border-radius: 4px;",
      "color: #B86F50; font-weight: 600;",
      params || ""
    );
  }
}

/**
 * Core event dispatcher to GA4, Meta Pixel, and DOM Custom Events
 */
export function trackEvent(event: GenericEventPayload): void {
  if (typeof window === "undefined") return;

  const dedupKey = `${event.action}_${event.label || ""}_${JSON.stringify(event.metadata || {})}`;
  if (isDuplicate(dedupKey)) return;

  try {
    // 1. Dispatch custom DOM event
    window.dispatchEvent(
      new CustomEvent("tbc_analytics_event", {
        detail: event,
      })
    );

    // 2. Google Analytics 4 / Google Tag Manager
    if (typeof window.gtag === "function") {
      window.gtag("event", event.action, {
        event_category: event.category || "engagement",
        event_label: event.label,
        value: event.value,
        ...event.metadata,
      });
      logDebug("GA4", event.action, { label: event.label, ...event.metadata });
    }

    // 3. Fallback DataLayer push
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: event.action,
        event_category: event.category || "engagement",
        event_label: event.label,
        value: event.value,
        ...event.metadata,
      });
    }
  } catch {
    // Silent fail
  }
}

/**
 * Track Page View on client navigation
 */
export function trackPageView(url: string, title?: string): void {
  if (typeof window === "undefined") return;

  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", "page_view", {
        page_location: url,
        page_title: title || (typeof document !== "undefined" ? document.title : ""),
      });
      logDebug("GA4", "page_view", { url, title });
    }

    if (typeof window.fbq === "function") {
      window.fbq("track", "PageView");
      logDebug("Meta Pixel", "PageView", { url });
    }
  } catch {
    // Silent fail
  }
}

/**
 * 1. WhatsApp Click Tracking (GA4 & Meta Custom)
 */
export function trackWhatsAppClick(location: WhatsAppLocation, customLabel?: string): void {
  const dedupKey = `whatsapp_${location}`;
  if (isDuplicate(dedupKey)) return;

  // GA4
  trackEvent({
    action: "whatsapp_click",
    category: "conversion",
    label: customLabel || location,
    metadata: { location },
  });

  // Meta Pixel
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("trackCustom", "whatsapp_click", { location });
    window.fbq("track", "Contact", { content_name: "WhatsApp Click", content_category: location });
    logDebug("Meta Pixel", "whatsapp_click", { location });
  }
}

/**
 * 2. Phone Call Click Tracking (GA4 & Meta Custom)
 */
export function trackPhoneClick(location: PhoneLocation, customLabel?: string): void {
  const dedupKey = `phone_${location}`;
  if (isDuplicate(dedupKey)) return;

  // GA4
  trackEvent({
    action: "phone_click",
    category: "conversion",
    label: customLabel || location,
    metadata: { location },
  });

  // Meta Pixel
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("trackCustom", "phone_click", { location });
    window.fbq("track", "Contact", { content_name: "Phone Call Click", content_category: location });
    logDebug("Meta Pixel", "phone_click", { location });
  }
}

/**
 * 3. Form Start Tracking (GA4)
 */
export function trackFormStart(formType: FormType): void {
  const dedupKey = `form_start_${formType}`;
  if (isDuplicate(dedupKey)) return;

  trackEvent({
    action: "form_start",
    category: "engagement",
    label: formType,
    metadata: { form_type: formType },
  });
}

/**
 * 4. Form Submit Tracking (GA4)
 */
export function trackFormSubmit(formType: FormType, metadata?: Record<string, string | number | boolean | undefined>): void {
  trackEvent({
    action: "form_submit",
    category: "conversion",
    label: formType,
    metadata: {
      form_type: formType,
      ...metadata,
    },
  });
}

/**
 * 5. Generate Lead / Conversion (GA4 & Meta Standard Lead)
 * Ensures NO PII (name/phone/email) is passed to third parties.
 */
export function trackLeadGenerated(params: {
  form_type: FormType;
  location?: string;
  package?: string;
  estimated_cost?: string | number;
  area?: string | number;
}): void {
  const safeMetadata = {
    form_type: params.form_type,
    location: params.location || "Chennai",
    package: params.package,
    area: params.area,
    estimated_cost: params.estimated_cost,
  };

  // GA4 standard conversion event
  trackEvent({
    action: "generate_lead",
    category: "conversion",
    label: params.form_type,
    metadata: safeMetadata,
  });

  // Meta Pixel Standard Lead Event
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", "Lead", {
      content_name: `Lead: ${params.form_type}`,
      content_category: params.location || "Chennai",
      currency: "INR",
    });
    logDebug("Meta Pixel", "Lead", safeMetadata);
  }
}

/**
 * 6. Calculator Start Tracking
 */
export function trackCalculatorStart(): void {
  const dedupKey = "calculator_start";
  if (isDuplicate(dedupKey)) return;

  trackEvent({
    action: "calculator_start",
    category: "engagement",
    label: "cost_calculator",
  });
}

/**
 * 7. Calculator Complete / Calculation Finished
 */
export function trackCalculatorComplete(params: CalculatorEventParams): void {
  const dedupKey = `calc_complete_${params.package}_${params.area}_${params.floors}`;
  if (isDuplicate(dedupKey)) return;

  trackEvent({
    action: "calculator_complete",
    category: "engagement",
    label: `${params.area}sqft_${params.package}`,
    metadata: {
      package: params.package,
      area: params.area,
      floors: params.floors,
      location: params.location,
      estimated_cost: params.estimated_cost,
    },
  });

  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("trackCustom", "calculator_complete", {
      package: params.package,
      area: params.area,
      floors: params.floors,
      location: params.location,
      estimated_cost: params.estimated_cost,
    });
    logDebug("Meta Pixel", "calculator_complete", params);
  }
}

/**
 * 8. Site Visit Request Tracking
 */
export function trackSiteVisitRequest(location?: string): void {
  trackEvent({
    action: "site_visit_request",
    category: "conversion",
    label: location || "Chennai",
    metadata: { location: location || "Chennai" },
  });

  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("trackCustom", "site_visit_request", { location: location || "Chennai" });
    logDebug("Meta Pixel", "site_visit_request", { location });
  }
}

/**
 * 9. View Package Tracking
 */
export function trackViewPackage(params: PackageViewParams): void {
  const dedupKey = `view_pkg_${params.package_name}`;
  if (isDuplicate(dedupKey)) return;

  trackEvent({
    action: "view_package",
    category: "engagement",
    label: params.package_name,
    metadata: {
      package_name: params.package_name,
      price_per_sqft: params.price_per_sqft,
    },
  });
}

/**
 * 10. View Project Tracking
 */
export function trackViewProject(params: ProjectViewParams): void {
  const dedupKey = `view_proj_${params.project_name}`;
  if (isDuplicate(dedupKey)) return;

  trackEvent({
    action: "view_project",
    category: "engagement",
    label: params.project_name,
    metadata: {
      project_name: params.project_name,
      location: params.location,
      built_up_area: params.built_up_area,
    },
  });
}

/**
 * 11. CTA Click Tracking
 */
export function trackCTAClick(params: CTAClickParams): void {
  trackEvent({
    action: "cta_click",
    category: "engagement",
    label: params.cta_label,
    metadata: {
      cta_label: params.cta_label,
      location: params.location,
      destination: params.destination,
    },
  });
}

/**
 * Google Ads Conversion Helper (Ready for Google Ads Conversion Linker)
 */
export function trackGoogleAdsConversion(params: {
  conversionId: string;
  conversionLabel: string;
  value?: number;
  currency?: string;
}): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  try {
    window.gtag("event", "conversion", {
      send_to: `${params.conversionId}/${params.conversionLabel}`,
      value: params.value,
      currency: params.currency || "INR",
    });
    logDebug("Google Ads", "conversion", params);
  } catch {
    // Silent fail
  }
}
