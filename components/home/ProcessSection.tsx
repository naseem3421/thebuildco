import React from "react";
import { siteConfig } from "@/config/site";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";

export function ProcessSection() {
  return (
    <section id="process" className="py-16 sm:py-24 scroll-mt-20">
      <Container size="wide">
        <SectionHeading
          eyebrow="Step-By-Step Transparency"
          title="From Your First Conversation to Handover"
          description="A structured 8-stage civil roadmap engineered to eliminate ambiguity and deliver your Chennai home on schedule."
          align="center"
        />

        {/* Desktop / Tablet Grid Timeline (8 steps) */}
        <div className="mt-14 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {siteConfig.processSteps.map((step, idx) => (
            <div
              key={idx}
              className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-[#FBF9F4] border border-[#D9D2C5]/80 shadow-luxury-sm hover:shadow-luxury-md transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                {/* Step Number Tag */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-display text-3xl sm:text-4xl font-semibold text-[#B86F50] group-hover:scale-110 transition-transform">
                    {step.step}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest font-semibold text-[#52655E] bg-[#E9E4D9] px-2.5 py-1 rounded-full">
                    Stage {idx + 1}
                  </span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-medium text-[#183B35]">
                  {step.title}
                </h3>

                <p className="mt-2.5 text-xs sm:text-sm text-[#52655E] leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#D9D2C5]/60 flex items-center text-[11px] font-semibold text-[#B86F50]">
                <span>Stage Milestone</span>
              </div>
            </div>
          ))}
        </div>

        {/* Process CTA Trigger */}
        <div className="mt-12 p-8 rounded-3xl bg-[#FBF9F4] border border-[#D9D2C5] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-luxury-sm">
          <div className="max-w-xl text-center sm:text-left">
            <h4 className="font-display text-2xl font-medium text-[#183B35]">
              Ready to begin Stage 01 Consultation?
            </h4>
            <p className="mt-1 text-xs sm:text-sm text-[#52655E]">
              Schedule a site inspection with our senior civil engineer to discuss soil checks, layout options, and exact milestone pricing.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="#contact"
              className="px-6 py-3 rounded-full bg-[#B86F50] text-[#FBF9F4] hover:bg-[#9D5C42] text-xs font-semibold tracking-wider uppercase transition-colors shadow-luxury-sm"
            >
              Start Stage 01 →
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
