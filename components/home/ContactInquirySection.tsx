import React from "react";
import { siteConfig } from "@/config/site";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Badge } from "../ui/Badge";
import { LeadForm } from "../forms/LeadForm";
import { Phone, MessageCircle, MapPin, Sparkles, ShieldCheck } from "lucide-react";

export function ContactInquirySection() {
  return (
    <section id="contact" className="py-16 sm:py-24 scroll-mt-20">
      <Container size="wide">
        <SectionHeading
          eyebrow="Direct Engineering Consultation"
          title="Schedule Your Free Site Visit"
          description="Speak directly with our senior structural architect. We inspect your plot, evaluate soil conditions, and prepare a custom floor plan with zero obligation."
          align="center"
        />

        <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 max-w-5xl mx-auto items-stretch">
          {/* Left Column: Direct Contact & Office Info (5 cols) */}
          <div className="lg:col-span-5 rounded-3xl bg-[#0E2420] text-[#F4F0E8] p-8 sm:p-10 flex flex-col justify-between border border-[#183B35] shadow-luxury-md">
            <div>
              <Badge variant="sand" size="sm" className="mb-4">
                Chennai Central Office
              </Badge>

              <h3 className="font-display text-2xl sm:text-3xl font-medium text-[#FBF9F4]">
                Speak With An Engineer Today
              </h3>

              <p className="mt-3 text-xs sm:text-sm text-[#8C9C96] leading-relaxed">
                Whether your plot is ready for construction or you are currently evaluating floor plans, our civil engineering team is ready to assist.
              </p>

              <div className="mt-8 space-y-5 text-sm text-[#D9D2C5]">
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-[#183B35] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-[#B86F50]" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#8C9C96] block">Location</span>
                    <span className="font-medium text-[#FBF9F4]">{siteConfig.location.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-[#183B35] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-[#B86F50]" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#8C9C96] block">Direct Phone</span>
                    <a
                      href={siteConfig.contact.phoneHref}
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
                    <span className="text-xs uppercase tracking-wider text-[#8C9C96] block">WhatsApp Support</span>
                    <a
                      href={siteConfig.contact.whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-[#FBF9F4] hover:text-[#1E7E34] transition-colors"
                    >
                      Instant WhatsApp Chat
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#244E46] space-y-2 text-xs text-[#8C9C96]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#B86F50] shrink-0" />
                <span>Response within 30 minutes during working hours</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#1E7E34] shrink-0" />
                <span>5-Year Structural Construction Warranty Guaranteed</span>
              </div>
            </div>
          </div>

          {/* Right Column: Lead Form Card (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl bg-[#FBF9F4] border border-[#D9D2C5] p-8 sm:p-10 shadow-luxury-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-display text-2xl font-medium text-[#183B35]">
                  Request Free Site Survey
                </h4>
                <Badge variant="terracotta" size="sm">
                  Zero Obligation
                </Badge>
              </div>

              <p className="text-xs sm:text-sm text-[#52655E] mb-6 leading-relaxed">
                Fill in your plot location and approximate built-up area. Our engineers will arrange a soil check and initial 2D layout consultation.
              </p>

              <LeadForm
                source="contact_page_form"
                buttonLabel="Get Free Quote & Site Visit"
                variant="default"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
