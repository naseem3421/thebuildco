import React from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CostCalculatorSection } from "@/components/home/CostCalculatorSection";
import {
  Maximize2,
  Layers,
  Sparkles,
  ShieldCheck,
  MapPin,
  HelpCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Construction Cost Calculator Chennai",
  description:
    "Calculate your house construction cost in Chennai instantly. Select sqft area, package tier, and floors to get an accurate estimate range.",
};

export default function CalculatorPage() {
  const costFactors = siteConfig.costFactors;

  const iconMap: Record<number, React.ReactNode> = {
    0: <Maximize2 className="w-5 h-5 text-[#B86F50]" />,
    1: <Layers className="w-5 h-5 text-[#B86F50]" />,
    2: <Sparkles className="w-5 h-5 text-[#B86F50]" />,
    3: <ShieldCheck className="w-5 h-5 text-[#B86F50]" />,
    4: <HelpCircle className="w-5 h-5 text-[#B86F50]" />,
    5: <MapPin className="w-5 h-5 text-[#B86F50]" />,
  };

  return (
    <div className="py-12 sm:py-20 flex flex-col gap-16 sm:gap-24">
      {/* 1. Main Interactive Calculator */}
      <div>
        <CostCalculatorSection />
      </div>

      {/* 2. Educational Section: What Affects Construction Cost? */}
      <section className="bg-[#E9E4D9]/40 py-16 sm:py-24 border-y border-[#D9D2C5]">
        <Container size="wide">
          <SectionHeading
            eyebrow="Cost Transparency Guide"
            title="What Affects Construction Cost in Chennai?"
            description="Understanding the core civil engineering and architectural variables that influence your turnkey budget."
            align="center"
          />

          <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {costFactors.map((factor, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-3xl bg-[#FBF9F4] border border-[#D9D2C5] shadow-luxury-sm hover:shadow-luxury-md transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-2xl bg-[#F7EDE8] border border-[#E6B8A5]/60 flex items-center justify-center mb-4">
                  {iconMap[idx] || <Sparkles className="w-5 h-5 text-[#B86F50]" />}
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-medium text-[#183B35]">
                  {factor.title}
                </h3>

                <p className="mt-2.5 text-xs sm:text-sm text-[#52655E] leading-relaxed">
                  {factor.description}
                </p>
              </div>
            ))}
          </div>

          {/* Consultation Prompt */}
          <div className="mt-12 p-8 rounded-3xl bg-[#183B35] text-[#F4F0E8] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-luxury-md">
            <div>
              <h4 className="font-display text-2xl font-normal text-[#FBF9F4]">
                Want an exact line-item Bill of Quantities (BOQ)?
              </h4>
              <p className="mt-1 text-xs sm:text-sm text-[#D9D2C5]">
                Our civil engineers provide a free on-site survey and locked-rate contract for your plot.
              </p>
            </div>

            <a
              href="#calculator"
              className="px-6 py-3 rounded-full bg-[#B86F50] text-white hover:bg-[#9D5C42] text-xs font-semibold uppercase tracking-wider transition-colors shrink-0 shadow-luxury-sm"
            >
              Get Itemized Estimate →
            </a>
          </div>
        </Container>
      </section>
    </div>
  );
}
