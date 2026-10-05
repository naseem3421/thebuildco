import React from "react";
import { siteConfig } from "@/config/site";
import { Container } from "../ui/Container";

export function TrustMetricsSection() {
  return (
    <section className="relative -mt-6 sm:-mt-10 z-10">
      <Container size="wide">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {siteConfig.trustMetrics.map((metric, idx) => {
            const isHighlighted = metric.highlight;

            return (
              <div
                key={idx}
                className={`flex flex-col justify-between p-6 sm:p-8 rounded-3xl border transition-all duration-300 hover:shadow-luxury-md ${
                  isHighlighted
                    ? "bg-[#B86F50] text-[#FBF9F4] border-[#9D5C42] shadow-luxury-sm"
                    : "bg-[#FBF9F4] text-[#183B35] border-[#D9D2C5]/80 shadow-luxury-sm"
                }`}
              >
                <div>
                  <span
                    className={`text-xs uppercase font-semibold tracking-wider block ${
                      isHighlighted ? "text-[#F7EDE8]" : "text-[#52655E]"
                    }`}
                  >
                    Guaranteed Standard
                  </span>
                  <div
                    className={`font-display text-4xl sm:text-5xl font-semibold tracking-tight mt-2 ${
                      isHighlighted ? "text-[#FFFFFF]" : "text-[#183B35]"
                    }`}
                  >
                    {metric.value}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-current/15">
                  <div
                    className={`font-semibold text-base sm:text-lg ${
                      isHighlighted ? "text-[#FFFFFF]" : "text-[#183B35]"
                    }`}
                  >
                    {metric.label}
                  </div>
                  {metric.subtext && (
                    <div
                      className={`text-xs sm:text-sm mt-0.5 ${
                        isHighlighted ? "text-[#F7EDE8]/90" : "text-[#52655E]"
                      }`}
                    >
                      {metric.subtext}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Conversion Strip */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-[#E9E4D9]/60 border border-[#D9D2C5] text-center sm:text-left">
          <p className="text-xs sm:text-sm text-[#183B35]">
            <strong>Ready to discuss your plot in Chennai? </strong>
            Get a tailored floor plan and transparent sqft estimate with zero obligation.
          </p>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#contact"
              className="text-xs font-semibold px-4 py-2 rounded-full bg-[#183B35] text-[#F4F0E8] hover:bg-[#244E46] transition-colors shadow-luxury-sm"
            >
              Book Free Site Visit →
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
