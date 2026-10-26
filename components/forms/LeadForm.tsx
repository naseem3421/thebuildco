"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/config/site";
import { Button } from "../ui/Button";
import {
  trackFormStart,
  trackFormSubmit,
  trackLeadGenerated,
  trackSiteVisitRequest,
  FormType,
} from "@/lib/analytics";
import { getStoredAttribution } from "@/lib/attribution";
import { Loader2, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";

export interface LeadFormProps {
  source?: string;
  formType?: FormType;
  buttonLabel?: string;
  defaultService?: string;
  prefillArea?: string | number;
  prefillPackage?: string;
  prefillFloors?: string | number;
  prefillEstimatedCost?: string | number;
  onSuccess?: () => void;
  className?: string;
  variant?: "default" | "compact" | "card";
}

export function LeadForm({
  source = "general_inquiry",
  formType = "consultation",
  buttonLabel = "Get Free Quote",
  prefillArea = "",
  prefillPackage = "Standard",
  prefillFloors = "2",
  prefillEstimatedCost = "",
  onSuccess,
  className = "",
  variant = "default",
}: LeadFormProps) {
  const router = useRouter();
  const hasStartedRef = useRef(false);

  const [formData, setFormData] = useState<{
    name: string;
    phone: string;
    area: string;
    location: string;
    constructionType: string;
    honeypot: string;
  }>({
    name: "",
    phone: "",
    area: prefillArea ? String(prefillArea) : "",
    location: String(siteConfig.serviceAreas[0] || "Chennai"),
    constructionType: "Individual House",
    honeypot: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  // Trigger form_start once when user interacts with any field
  const handleFocus = () => {
    if (!hasStartedRef.current) {
      hasStartedRef.current = true;
      trackFormStart(formType);
    }
  };

  // Validate fields client-side before sending
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = "Please enter your full name.";
    }

    const cleanPhone = formData.phone.replace(/[\s\-()+]/g, "");
    const normalizedPhone =
      cleanPhone.startsWith("91") && cleanPhone.length === 12
        ? cleanPhone.slice(2)
        : cleanPhone.startsWith("0") && cleanPhone.length === 11
        ? cleanPhone.slice(1)
        : cleanPhone;

    const isIndian = /^[6-9]\d{9}$/.test(normalizedPhone);
    const isInternational = /^\d{7,15}$/.test(cleanPhone);

    if (!cleanPhone || (!isIndian && !isInternational)) {
      newErrors.phone = "Enter a valid phone number (10-digit Indian or international with country code).";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Please select or enter your plot location.";
    }

    if (formData.area.trim()) {
      const num = Number(formData.area);
      if (isNaN(num) || num <= 0) {
        newErrors.area = "Please enter a valid numeric built-up area (sqft).";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Get stored attribution from session/local storage
      const attribution = getStoredAttribution();

      const payload = {
        name: formData.name,
        phone: formData.phone,
        area: formData.area || undefined,
        location: formData.location,
        constructionType: formData.constructionType,
        package: prefillPackage,
        floors: prefillFloors,
        estimatedCost: prefillEstimatedCost,
        source,
        honeypot: formData.honeypot, // Anti-bot trap
        utmParams: {
          utm_source: attribution.utm_source,
          utm_medium: attribution.utm_medium,
          utm_campaign: attribution.utm_campaign,
          utm_term: attribution.utm_term,
          utm_content: attribution.utm_content,
        },
        gclid: attribution.gclid,
        fbclid: attribution.fbclid,
        referrer: attribution.referrer,
        landingPage: typeof window !== "undefined" ? window.location.pathname : "/",
        timestamp: new Date().toISOString(),
      };

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setServerError(data.message || "Failed to submit enquiry. Please try again.");
        }
        setIsSubmitting(false);
        return;
      }

      // 2. Track form_submit event (NO PII)
      trackFormSubmit(formType, {
        source,
        location: formData.location,
        package: prefillPackage,
      });

      // 3. Track standard Lead conversion event (NO PII)
      trackLeadGenerated({
        form_type: formType,
        location: formData.location,
        package: prefillPackage,
        area: formData.area,
        estimated_cost: prefillEstimatedCost,
      });

      // 4. If site visit / consultation, trigger specific event
      if (formType === "consultation" || formType === "site_visit") {
        trackSiteVisitRequest(formData.location);
      }

      if (onSuccess) {
        onSuccess();
      }

      // Redirect to thank you page with query params
      router.push(`/thank-you?source=${encodeURIComponent(source)}&location=${encodeURIComponent(formData.location)}`);
    } catch {
      setServerError("Network error. Please try again or reach out on WhatsApp.");
      setIsSubmitting(false);
    }
  };

  const isCompact = variant === "compact";

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 text-left ${className}`} noValidate>
      {/* Hidden Honeypot field for anti-spam bot defense */}
      <div style={{ display: "none", position: "absolute", left: "-9999px" }} aria-hidden="true">
        <label htmlFor={`website-trap-${source}`}>Leave this field empty</label>
        <input
          id={`website-trap-${source}`}
          type="text"
          name="website_trap"
          tabIndex={-1}
          autoComplete="off"
          value={formData.honeypot}
          onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
        />
      </div>

      {serverError && (
        <div
          role="alert"
          className="p-3.5 rounded-xl bg-[#B86F50]/10 border border-[#B86F50]/40 text-xs text-[#9D5C42] flex items-center gap-2"
        >
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      {/* Name & Phone */}
      <div className={`grid gap-4 ${isCompact ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"}`}>
        <div>
          <label
            htmlFor={`lead-name-${source}`}
            className="block text-xs font-semibold text-[#183B35] uppercase tracking-wider mb-1.5"
          >
            Your Name <span className="text-[#B86F50]" aria-hidden="true">*</span>
          </label>
          <input
            id={`lead-name-${source}`}
            type="text"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `error-name-${source}` : undefined}
            autoComplete="name"
            placeholder="e.g. Rajesh Kumar"
            value={formData.name}
            onFocus={handleFocus}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
              if (errors.name) setErrors({ ...errors, name: "" });
            }}
            className={`w-full h-11 px-4 rounded-xl border bg-[#F4F0E8]/50 text-[#183B35] text-sm focus:border-[#B86F50] focus:bg-white focus:outline-none transition-colors ${
              errors.name ? "border-red-500 bg-red-50/20" : "border-[#D9D2C5]"
            }`}
          />
          {errors.name && (
            <p id={`error-name-${source}`} className="mt-1 text-xs text-red-600 font-medium">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor={`lead-phone-${source}`}
            className="block text-xs font-semibold text-[#183B35] uppercase tracking-wider mb-1.5"
          >
            Mobile Number <span className="text-[#B86F50]" aria-hidden="true">*</span>
          </label>
          <input
            id={`lead-phone-${source}`}
            type="tel"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? `error-phone-${source}` : undefined}
            autoComplete="tel"
            placeholder="e.g. 98400 12345"
            value={formData.phone}
            onFocus={handleFocus}
            onChange={(e) => {
              setFormData({ ...formData, phone: e.target.value });
              if (errors.phone) setErrors({ ...errors, phone: "" });
            }}
            className={`w-full h-11 px-4 rounded-xl border bg-[#F4F0E8]/50 text-[#183B35] text-sm focus:border-[#B86F50] focus:bg-white focus:outline-none transition-colors ${
              errors.phone ? "border-red-500 bg-red-50/20" : "border-[#D9D2C5]"
            }`}
          />
          {errors.phone && (
            <p id={`error-phone-${source}`} className="mt-1 text-xs text-red-600 font-medium">
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      {/* Location & Area */}
      <div className={`grid gap-4 ${isCompact ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"}`}>
        <div>
          <label
            htmlFor={`lead-location-${source}`}
            className="block text-xs font-semibold text-[#183B35] uppercase tracking-wider mb-1.5"
          >
            Plot Location in Chennai <span className="text-[#B86F50]" aria-hidden="true">*</span>
          </label>
          <select
            id={`lead-location-${source}`}
            aria-required="true"
            aria-invalid={Boolean(errors.location)}
            aria-describedby={errors.location ? `error-location-${source}` : undefined}
            value={formData.location}
            onFocus={handleFocus}
            onChange={(e) => {
              setFormData({ ...formData, location: e.target.value });
              if (errors.location) setErrors({ ...errors, location: "" });
            }}
            className={`w-full h-11 px-3 rounded-xl border bg-[#F4F0E8]/50 text-[#183B35] text-sm focus:border-[#B86F50] focus:bg-white focus:outline-none transition-colors ${
              errors.location ? "border-red-500" : "border-[#D9D2C5]"
            }`}
          >
            {siteConfig.serviceAreas.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
          {errors.location && (
            <p id={`error-location-${source}`} className="mt-1 text-xs text-red-600 font-medium">
              {errors.location}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor={`lead-area-${source}`}
            className="block text-xs font-semibold text-[#183B35] uppercase tracking-wider mb-1.5"
          >
            Approx Built-up Area (Sq.Ft)
          </label>
          <input
            id={`lead-area-${source}`}
            type="number"
            min="500"
            max="20000"
            aria-invalid={Boolean(errors.area)}
            aria-describedby={errors.area ? `error-area-${source}` : undefined}
            placeholder="e.g. 2400"
            value={formData.area}
            onFocus={handleFocus}
            onChange={(e) => {
              setFormData({ ...formData, area: e.target.value });
              if (errors.area) setErrors({ ...errors, area: "" });
            }}
            className={`w-full h-11 px-4 rounded-xl border bg-[#F4F0E8]/50 text-[#183B35] text-sm focus:border-[#B86F50] focus:bg-white focus:outline-none transition-colors ${
              errors.area ? "border-red-500" : "border-[#D9D2C5]"
            }`}
          />
          {errors.area && (
            <p id={`error-area-${source}`} className="mt-1 text-xs text-red-600 font-medium">
              {errors.area}
            </p>
          )}
        </div>
      </div>

      {/* Construction Type (Optional) */}
      {!isCompact && (
        <div>
          <label
            htmlFor={`lead-type-${source}`}
            className="block text-xs font-semibold text-[#183B35] uppercase tracking-wider mb-1.5"
          >
            Construction Type
          </label>
          <select
            id={`lead-type-${source}`}
            value={formData.constructionType}
            onFocus={handleFocus}
            onChange={(e) => setFormData({ ...formData, constructionType: e.target.value })}
            className="w-full h-11 px-3 rounded-xl border border-[#D9D2C5] bg-[#F4F0E8]/50 text-[#183B35] text-sm focus:border-[#B86F50] focus:bg-white focus:outline-none transition-colors"
          >
            <option value="Individual House">Individual House</option>
            <option value="Villa">Luxury Villa</option>
            <option value="Duplex Home">Duplex Home</option>
            <option value="Commercial Building">Commercial Building</option>
          </select>
        </div>
      )}

      {/* Submit Button */}
      <div className="pt-2">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          disabled={isSubmitting}
          rightIcon={
            isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <ArrowRight className="w-4 h-4" />
            )
          }
        >
          {isSubmitting ? "Processing Enquiry..." : buttonLabel}
        </Button>
      </div>

      <div className="flex items-center justify-center gap-2 text-[11px] text-[#52655E] pt-1">
        <CheckCircle2 className="w-3.5 h-3.5 text-[#1E7E34]" />
        <span>No spam • Free engineer consultation • Zero obligation</span>
      </div>
    </form>
  );
}
