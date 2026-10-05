/**
 * Attribution & Campaign Parameter Storage Utility
 * Captures and persists UTM tags, Google Click IDs (gclid), and Meta Click IDs (fbclid)
 * across the entire user session.
 */

export interface AttributionData {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  fbclid?: string;
  referrer?: string;
  landing_page?: string;
  first_touch_timestamp?: string;
  fbp?: string;
  fbc?: string;
}

const STORAGE_KEY = "tbc_attribution_session";

/**
 * Parses query params from URL and stores initial touchpoint attribution in sessionStorage and localStorage.
 */
export function captureAttribution(): AttributionData {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const urlParams = new URLSearchParams(window.location.search);

    const utm_source = urlParams.get("utm_source") || undefined;
    const utm_medium = urlParams.get("utm_medium") || undefined;
    const utm_campaign = urlParams.get("utm_campaign") || undefined;
    const utm_term = urlParams.get("utm_term") || undefined;
    const utm_content = urlParams.get("utm_content") || undefined;
    const gclid = urlParams.get("gclid") || undefined;
    const fbclid = urlParams.get("fbclid") || undefined;

    // Check if we already have a first touchpoint stored in session
    const existing = getStoredAttribution();

    // Helper to get cookies like _fbp and _fbc
    const getCookie = (name: string): string | undefined => {
      const match = document.cookie.match(new RegExp(`(^|; )${name}=([^;]*)`));
      return match ? decodeURIComponent(match[2]) : undefined;
    };

    const fbp = getCookie("_fbp");
    const fbc = getCookie("_fbc") || (fbclid ? `fb.1.${Date.now()}.${fbclid}` : undefined);

    const hasNewCampaign = Boolean(utm_source || utm_medium || utm_campaign || gclid || fbclid);

    if (hasNewCampaign || !existing.first_touch_timestamp) {
      const newAttribution: AttributionData = {
        utm_source: utm_source || existing.utm_source || (document.referrer ? "organic_referral" : "direct"),
        utm_medium: utm_medium || existing.utm_medium,
        utm_campaign: utm_campaign || existing.utm_campaign,
        utm_term: utm_term || existing.utm_term,
        utm_content: utm_content || existing.utm_content,
        gclid: gclid || existing.gclid,
        fbclid: fbclid || existing.fbclid,
        referrer: existing.referrer || document.referrer || "direct",
        landing_page: existing.landing_page || window.location.pathname,
        first_touch_timestamp: existing.first_touch_timestamp || new Date().toISOString(),
        fbp: fbp || existing.fbp,
        fbc: fbc || existing.fbc,
      };

      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newAttribution));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newAttribution));
      } catch {
        // Safe fallback for restricted storage environments
      }

      return newAttribution;
    }

    return existing;
  } catch {
    return {};
  }
}

/**
 * Retrieves the stored attribution data from session/local storage.
 */
export function getStoredAttribution(): AttributionData {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const sessionVal = sessionStorage.getItem(STORAGE_KEY);
    if (sessionVal) {
      return JSON.parse(sessionVal);
    }
    const localVal = localStorage.getItem(STORAGE_KEY);
    if (localVal) {
      return JSON.parse(localVal);
    }
  } catch {
    // Return empty on parse error
  }

  return {};
}
