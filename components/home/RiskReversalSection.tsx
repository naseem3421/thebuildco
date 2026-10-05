import React from "react";
import { siteConfig } from "@/config/site";
import { Container } from "../ui/Container";
import { Badge } from "../ui/Badge";
import { CTAButton } from "../ui/CTAButton";
import { WhatsAppButton } from "../ui/WhatsAppButton";
import { CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

export function RiskReversalSection() {
  return (
    <section className="py-16 sm:py-24">
      <Container size="wide">
        <div className="rounded-3xl bg-[#183B35] text-[#F4F0E8] p-8 sm:p-14 relative overflow-hidden border border-[#244E46] shadow-luxury-md">
          {/* Ambient decorative glow */}
          <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-[#B86F50]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
            <Badge variant="sand" className="mb-4">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B86F50]" />
              Zero Risk Guarantee
            </Badge>

            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-normal text-[#FBF9F4] tracking-tight">
              Build With Clarity.
            </h2>

            <p className="mt-4 text-base sm:text-lg text-[#D9D2C5] max-w-2xl leading-relaxed">
              We remove the guesswork from building your home. Everything is verified upfront with complete legal and engineering transparency.
            </p>

            {/* 5 Risk Reversal Pill Blocks */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full text-left">
              {siteConfig.riskReversals.map((risk, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#0E2420]/80 border border-[#244E46] flex flex-col justify-between"
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-[#B86F50] shrink-0" />
                    <span className="font-semibold text-sm text-[#FBF9F4]">
                      {risk.title}
                    </span>
                  </div>
                  <p className="text-xs text-[#8C9C96] leading-relaxed pl-6.5">
                    {risk.description}
                  </p>
                </div>
              ))}

              {/* Special CTA tile */}
              <div className="p-5 rounded-2xl bg-[#B86F50]/20 border border-[#B86F50]/40 flex flex-col justify-center items-center text-center">
                <Sparkles className="w-6 h-6 text-[#E9E4D9] mb-1.5" />
                <span className="font-display text-lg font-medium text-[#FBF9F4]">
                  Zero Advance Lock-in
                </span>
                <span className="text-[11px] text-[#D9D2C5] mt-1">
                  100% satisfaction before milestone releases
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <CTAButton
                type="third"
                size="lg"
                label="Book a Free Consultation"
                className="bg-[#B86F50] text-[#FBF9F4] hover:bg-[#9D5C42] border-[#B86F50]"
              />
              <WhatsAppButton size="lg" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
