"use client";

import React from "react";
import { siteConfig, getWhatsAppUrl } from "@/config/site";
import { Badge } from "@/components/ui/Badge";
import { trackPhoneClick, trackWhatsAppClick } from "@/lib/analytics";
import { Phone, MessageCircle, Mail, MapPin, Clock, Sparkles } from "lucide-react";

export function ContactInfoClient() {
  const handlePhone = () => {
    trackPhoneClick("contact");
  };

  const handleWhatsApp = () => {
    trackWhatsAppClick("contact_page");
  };

  return (
    <div className="lg:col-span-5 rounded-3xl bg-[#0E2420] text-[#F4F0E8] p-8 sm:p-10 flex flex-col justify-between border border-[#183B35] shadow-luxury-md">
      <div>
        <Badge variant="sand" size="sm" className="mb-4">
          Chennai Central Office
        </Badge>

        <h2 className="font-display text-2xl sm:text-3xl font-medium text-[#FBF9F4]">
          Get In Touch
        </h2>

        <p className="mt-3 text-xs sm:text-sm text-[#8C9C96] leading-relaxed">
          Have questions about floor plans, package specs, or approval permits? Reach out directly.
        </p>

        <div className="mt-8 space-y-5 text-sm text-[#D9D2C5]">
          <div className="flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-xl bg-[#183B35] flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 text-[#B86F50]" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-[#8C9C96] block">
                Headquarters
              </span>
              <span className="font-medium text-[#FBF9F4]">
                {siteConfig.location.address}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-xl bg-[#183B35] flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4 text-[#B86F50]" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-[#8C9C96] block">
                Phone (Direct)
              </span>
              <a
                href={siteConfig.contact.phoneHref}
                onClick={handlePhone}
                className="font-medium text-[#FBF9F4] hover:text-[#B86F50] transition-colors"
              >
                {siteConfig.contact.phoneDisplay}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-xl bg-[#183B35] flex items-center justify-center shrink-0">
              <MessageCircle className="w-4 h-4 text-[#1E7E34]" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-[#8C9C96] block">
                WhatsApp Fast Response
              </span>
              <a
                href={getWhatsAppUrl(siteConfig.whatsappMessages.siteVisit)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsApp}
                className="font-medium text-[#FBF9F4] hover:text-[#1E7E34] transition-colors"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-xl bg-[#183B35] flex items-center justify-center shrink-0">
              <Mail className="w-4 h-4 text-[#B86F50]" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-[#8C9C96] block">
                Email
              </span>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="font-medium text-[#FBF9F4] hover:text-[#B86F50] transition-colors"
              >
                {siteConfig.contact.email}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-xl bg-[#183B35] flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4 text-[#B86F50]" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-[#8C9C96] block">
                Working Hours
              </span>
              <span className="font-medium text-[#FBF9F4]">
                {siteConfig.contact.workingHours}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-[#244E46] text-xs text-[#8C9C96] flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-[#B86F50]" />
        <span>Immediate consultation during working hours</span>
      </div>
    </div>
  );
}
