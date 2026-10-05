"use client";

import React from "react";
import { siteConfig } from "@/config/site";
import { trackPhoneClick, trackWhatsAppClick, trackCTAClick } from "@/lib/analytics";
import { Phone, MessageCircle, FileText } from "lucide-react";

export function StickyMobileCTA() {
  const handlePhoneClick = () => {
    trackPhoneClick("sticky_mobile");
  };

  const handleWhatsAppClick = () => {
    trackWhatsAppClick("sticky_mobile");
  };

  const handleQuoteClick = () => {
    trackCTAClick({
      cta_label: "Sticky Mobile Get Quote",
      location: "sticky_mobile",
      destination: "#contact",
    });
  };

  return (
    <aside
      aria-label="Quick contact actions"
      className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-[#F4F0E8]/95 backdrop-blur-lg border-t border-[#D9D2C5] shadow-[0_-4px_20px_rgba(24,59,53,0.12)] px-3 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]"
    >
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto items-center">
        {/* 1. CALL */}
        <a
          href={siteConfig.contact.phoneHref}
          onClick={handlePhoneClick}
          aria-label={`Call TBC office at ${siteConfig.contact.phoneDisplay}`}
          className="flex flex-col items-center justify-center min-h-[46px] rounded-xl bg-[#FBF9F4] text-[#183B35] border border-[#D9D2C5] active:bg-[#E9E4D9] transition-colors"
        >
          <Phone className="w-4 h-4 text-[#B86F50]" />
          <span className="text-[10px] font-bold uppercase tracking-wider mt-0.5">
            Call
          </span>
        </a>

        {/* 2. WHATSAPP */}
        <a
          href={siteConfig.contact.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleWhatsAppClick}
          aria-label="Chat on WhatsApp with TBC engineering team"
          className="flex flex-col items-center justify-center min-h-[46px] rounded-xl bg-[#1E7E34] text-white shadow-luxury-sm active:bg-[#155D27] transition-colors"
        >
          <MessageCircle className="w-4 h-4 text-white" />
          <span className="text-[10px] font-bold uppercase tracking-wider mt-0.5">
            WhatsApp
          </span>
        </a>

        {/* 3. GET QUOTE */}
        <a
          href="#contact"
          onClick={handleQuoteClick}
          aria-label="Get Free Construction Quote"
          className="flex flex-col items-center justify-center min-h-[46px] rounded-xl bg-[#B86F50] text-[#FBF9F4] shadow-luxury-sm active:bg-[#9D5C42] transition-colors"
        >
          <FileText className="w-4 h-4 text-[#FBF9F4]" />
          <span className="text-[10px] font-bold uppercase tracking-wider mt-0.5">
            Get Quote
          </span>
        </a>
      </div>
    </aside>
  );
}
