import React from "react";
import { siteConfig } from "@/config/site";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Badge } from "../ui/Badge";
import { CTAButton } from "../ui/CTAButton";
import { WhatsAppButton } from "../ui/WhatsAppButton";
import { Check, Sparkles, ShieldCheck } from "lucide-react";

export function PackagesSection() {
  return (
    <section id="packages" className="py-16 sm:py-24 scroll-mt-20">
      <Container size="wide">
        <SectionHeading
          eyebrow="Transparent Specifications"
          title="Choose the Right Level of Finish"
          description="Stage-wise milestone pricing with clearly itemized civil, structural, and architectural specifications for your Chennai land."
          align="center"
        />

        <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {siteConfig.packages.map((pkg) => {
            const isPopular = pkg.popular;

            return (
              <div
                key={pkg.id}
                className={`flex flex-col justify-between rounded-3xl p-8 sm:p-10 transition-all duration-300 relative ${
                  isPopular
                    ? "bg-[#FBF9F4] border-2 border-[#B86F50] shadow-luxury-md -translate-y-1 lg:-translate-y-2"
                    : "bg-[#FBF9F4] border border-[#D9D2C5]/80 shadow-luxury-sm hover:shadow-luxury-md"
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <Badge variant="terracotta" size="md" className="shadow-luxury-sm">
                      <Sparkles className="w-3 h-3" /> Most Popular Choice
                    </Badge>
                  </div>
                )}

                <div>
                  {/* Header Tier */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-display text-3xl font-medium text-[#183B35]">
                        {pkg.name}
                      </h3>
                      <p className="mt-1 text-xs text-[#52655E] min-h-[32px]">
                        {pkg.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Pricing Display */}
                  <div className="mt-6 pb-6 border-b border-[#D9D2C5]">
                    <div className="flex items-baseline gap-1">
                      <span className="font-display text-4xl sm:text-5xl font-semibold text-[#183B35]">
                        {pkg.formattedPrice}
                      </span>
                    </div>
                    <span className="text-xs text-[#52655E] block mt-1">
                      Includes architectural plans, RCC structure & turnkey finishes
                    </span>
                  </div>

                  {/* Feature Inclusions */}
                  <div className="mt-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#183B35] block mb-4">
                      Key Inclusions:
                    </span>
                    <ul className="space-y-3.5">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-[#F7EDE8] flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3.5 h-3.5 text-[#B86F50]" />
                          </div>
                          <span className="text-xs sm:text-sm text-[#52655E] leading-snug">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="mt-10 pt-6 border-t border-[#D9D2C5]/70 flex flex-col gap-3">
                  <CTAButton
                    type={isPopular ? "primary" : "phone"}
                    size="md"
                    fullWidth
                    label={`Select ${pkg.name} Package`}
                  />
                  <WhatsAppButton
                    fullWidth
                    label="Get Itemized BOQ on WhatsApp"
                    customMessage={`Hello The Build Company, I would like the complete itemized BOQ for the ${pkg.name} package (${pkg.formattedPrice}).`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Assurance Note */}
        <div className="mt-12 p-6 rounded-2xl bg-[#E9E4D9]/50 border border-[#D9D2C5] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-[#B86F50] shrink-0" />
            <p className="text-xs sm:text-sm text-[#52655E]">
              <strong className="text-[#183B35]">Custom Requirements? </strong>
              All packages can be customized for specific tile brands, smart home features, or custom elevation details.
            </p>
          </div>
          <a
            href="#contact"
            className="text-xs font-semibold text-[#183B35] hover:text-[#B86F50] shrink-0 underline"
          >
            Request Custom Specification →
          </a>
        </div>
      </Container>
    </section>
  );
}
