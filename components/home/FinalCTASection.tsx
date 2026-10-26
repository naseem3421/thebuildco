"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Container } from "../ui/Container";
import { LeadForm } from "../forms/LeadForm";
import { trackCTAClick, trackPhoneClick, trackWhatsAppClick } from "@/lib/analytics";
import {
  Phone,
  MessageCircle,
  MapPin,
  CalendarCheck,
  Calculator,
  Handshake,
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export function FinalCTASection() {
  const handlePhoneClick = () => {
    trackPhoneClick("contact");
  };

  const handleWhatsAppClick = () => {
    trackWhatsAppClick("cta_section");
  };

  return (
    <section id="consultation" className="py-10 sm:py-14 bg-white scroll-mt-20">
      <Container size="wide">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF7ED] border border-[#FFEDD5] text-xs font-bold text-[#EA580C] uppercase tracking-wider mb-3">
              START YOUR PROJECT
            </div>

            <h2 className="font-display text-3xl sm:text-5xl font-semibold text-neutral-900 leading-[1.15] tracking-tight">
              Planning a Premium Home in Chennai?
            </h2>

            <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed">
              Tell us about your plot, expected built-up area and project requirements. Our team will help you understand the right construction approach, approximate investment and next steps.
            </p>
          </div>

          {/* 2-Column Conversion Card: Left Details, Right Form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Column: Direct Office & Engineer Access (5 cols) */}
            <div className="lg:col-span-5 rounded-3xl bg-[#0E2420] text-[#F4F0E8] p-8 sm:p-10 flex flex-col justify-between border border-[#183B35] shadow-luxury-md">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#B86F50] block mb-2">
                  DIRECT ACCESS TO CIVIL ENGINEERS
                </span>

                <h3 className="font-display text-2xl font-medium text-[#FBF9F4]">
                  Speak With Our Engineering Team
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-[#8C9C96] leading-relaxed">
                  We review your plot location, soil conditions, road approach, and create custom 2D layouts with zero obligation.
                </p>

                <div className="mt-8 space-y-4 text-sm text-[#D9D2C5]">
                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-xl bg-[#183B35] flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 text-[#B86F50]" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#8C9C96] block">Location</span>
                      <span className="font-medium text-[#FBF9F4] text-xs sm:text-sm">{siteConfig.location.address}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-xl bg-[#183B35] flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4 text-[#B86F50]" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#8C9C96] block">Direct Phone</span>
                      <a
                        href={siteConfig.contact.phoneHref}
                        onClick={handlePhoneClick}
                        className="font-medium text-[#FBF9F4] hover:text-[#B86F50] transition-colors text-xs sm:text-sm"
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
                      <span className="text-[10px] uppercase tracking-wider text-[#8C9C96] block">Instant Chat</span>
                      <a
                        href={siteConfig.contact.whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleWhatsAppClick}
                        className="font-medium text-[#FBF9F4] hover:text-[#1E7E34] transition-colors text-xs sm:text-sm"
                      >
                        Chat on WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#244E46] space-y-2 text-xs text-[#8C9C96]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#86EFAC] shrink-0" />
                  <span>Pre-Handover Snag Audit & Certified Clearance</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#B86F50] shrink-0" />
                  <span>Client-Owned Plots Only • Zero Land Brokerage</span>
                </div>
              </div>
            </div>

            {/* Right Column: Lead Capture Form (7 cols) */}
            <div className="lg:col-span-7 rounded-3xl bg-[#FBF9F4] border border-[#D9D2C5] p-8 sm:p-10 shadow-luxury-md flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-display text-xl sm:text-2xl font-medium text-[#183B35]">
                    Book My Project Consultation
                  </h4>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#B86F50] bg-[#FFF7ED] border border-[#FFEDD5] px-2.5 py-1 rounded-full">
                    Zero Obligation
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#52655E] mb-6 leading-relaxed">
                  Enter your plot location and approximate requirements. We will coordinate a technical site survey and custom layout discussion.
                </p>

                <LeadForm
                  source="homepage_final_cta"
                  buttonLabel="Book My Project Consultation"
                  variant="default"
                />
              </div>

              {/* Secondary Actions & Links */}
              <div className="mt-6 pt-5 border-t border-[#D9D2C5] flex flex-wrap items-center justify-between gap-3 text-xs">
                <Link
                  href="/calculator-pro-2"
                  className="font-semibold text-neutral-800 hover:text-[#EA580C] inline-flex items-center gap-1.5 transition-colors"
                >
                  <Calculator className="w-4 h-4 text-[#EA580C]" />
                  <span>Calculate My Construction Budget →</span>
                </Link>

                <Link
                  href="/joint-venture"
                  className="text-neutral-500 hover:text-[#EA580C] inline-flex items-center gap-1 transition-colors"
                >
                  <Handshake className="w-3.5 h-3.5 text-[#EA580C]" />
                  <span>Have Development Land? Explore JV →</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
