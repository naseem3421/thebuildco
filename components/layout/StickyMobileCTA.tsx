"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { trackWhatsAppClick, trackCTAClick } from "@/lib/analytics";
import { MessageCircle, CalendarCheck, Calculator } from "lucide-react";

export function StickyMobileCTA() {
  const handleWhatsAppClick = () => {
    trackWhatsAppClick("sticky_mobile");
  };

  const handleConsultationClick = () => {
    trackCTAClick({
      cta_label: "Sticky Mobile Book Consultation",
      location: "sticky_mobile",
      destination: "#consultation",
    });
  };

  return (
    <aside
      aria-label="Quick contact actions"
      className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-white/95 backdrop-blur-lg border-t border-neutral-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-3 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]"
    >
      <div className="flex items-center gap-2 max-w-md mx-auto">
        {/* WhatsApp Icon */}
        <a
          href={siteConfig.contact.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleWhatsAppClick}
          aria-label="Chat on WhatsApp with TBC engineering team"
          className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#25D366] text-white shadow-xs shrink-0 active:scale-95 transition-transform"
        >
          <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
        </a>

        {/* Primary CTA: Book Project Consultation */}
        <a
          href="#consultation"
          onClick={handleConsultationClick}
          aria-label="Book Project Consultation"
          className="flex-1 flex items-center justify-center gap-1.5 h-11 px-3 rounded-xl bg-[#EA580C] text-white font-semibold text-xs sm:text-sm shadow-luxury-sm active:bg-[#C2410C] transition-colors"
        >
          <CalendarCheck className="w-4 h-4 shrink-0" />
          <span className="truncate">Book Project Consultation</span>
        </a>

        {/* Secondary CTA: Calculate Cost */}
        <Link
          href="/calculator-pro-3"
          aria-label="Calculate Construction Cost"
          className="flex items-center justify-center gap-1.5 h-11 px-3 rounded-xl bg-neutral-900 text-white font-semibold text-xs sm:text-sm shadow-xs shrink-0 active:bg-neutral-800 transition-colors"
        >
          <Calculator className="w-4 h-4 shrink-0 text-[#EA580C]" />
          <span className="whitespace-nowrap">Calculate Cost</span>
        </Link>
      </div>
    </aside>
  );
}
