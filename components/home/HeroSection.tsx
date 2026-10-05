"use client";

import React, { useState } from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Container } from "../ui/Container";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { CTAButton } from "../ui/CTAButton";
import { WhatsAppButton } from "../ui/WhatsAppButton";
import { trackWhatsAppClick, trackCTAClick } from "@/lib/analytics";
import {
  LandPlot,
  Calculator,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export function HeroSection() {
  const [area, setArea] = useState<string>("2400");
  const [calculatedEstimate, setCalculatedEstimate] = useState<number | null>(
    2400 * 2199
  );

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const sqft = parseFloat(area);
    if (!isNaN(sqft) && sqft > 0) {
      setCalculatedEstimate(Math.round(sqft * 2199));
    }
    trackCTAClick({
      cta_label: "Hero Quick Calculate",
      location: "hero",
      destination: "#calculator",
    });
  };

  const formatLakhs = (val: number) => {
    const inLakhs = val / 100000;
    return `₹${inLakhs.toFixed(2)} Lakhs`;
  };

  return (
    <section className="relative pt-6 pb-16 sm:pt-10 sm:pb-24 overflow-hidden">
      {/* Background architectural grid/soft grain hint */}
      <div className="absolute inset-0 bg-[radial-gradient(#D9D2C5_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <Container size="wide">
        {/* Top Editorial Banner */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E9E4D9] border border-[#D9D2C5] text-xs font-semibold text-[#183B35] mb-6 shadow-luxury-sm animate-in fade-in duration-500">
            <LandPlot className="w-3.5 h-3.5 text-[#B86F50]" />
            <span>Exclusively for Chennai Landowners • We Build On Your Land</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-medium tracking-tight text-[#183B35] leading-[1.08]">
            {siteConfig.heroTitle}
          </h1>

          <p className="mt-5 text-base sm:text-xl text-[#52655E] max-w-2xl font-normal leading-relaxed">
            {siteConfig.heroSubtitle}
          </p>

          {/* Pricing Highlight Pill */}
          <div className="mt-4 flex items-center gap-3">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#52655E]">
              Turnkey Construction Packages:
            </span>
            <Badge variant="terracotta" size="md" className="shadow-luxury-sm">
              Starting {siteConfig.pricing.formattedStartingPrice}
            </Badge>
          </div>

          {/* Primary CTA Conversion Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
            <CTAButton
              type="primary"
              size="lg"
              className="w-full sm:w-auto"
              location="hero"
              trackingLabel="hero_quote_cta"
            />
            <WhatsAppButton
              size="lg"
              className="w-full sm:w-auto"
              location="hero"
              customMessage={siteConfig.whatsappMessages.hero}
              trackingLabel="hero_whatsapp_cta"
            />
          </div>

          {/* Micro trust indicators */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-[#52655E]">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#1E7E34]" /> 5-Year Structural Warranty
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#1E7E34]" /> Transparent Stage-Wise Payments
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#1E7E34]" /> Certified Grade-A Materials
            </span>
          </div>
        </div>

        {/* HERO IMAGE & INTEGRATED COMPACT ESTIMATOR COMPOSITION */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Main Hero Architectural Image Card (8 cols) */}
          <div className="lg:col-span-8 relative min-h-[360px] sm:min-h-[480px] lg:min-h-[520px] rounded-3xl overflow-hidden border border-[#D9D2C5] shadow-luxury-md group">
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85"
              alt="Bespoke luxury contemporary villa in Chennai constructed by TBC"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E2420]/80 via-[#0E2420]/20 to-transparent" />

            {/* Overlaid Badges and Project Details */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex flex-wrap gap-2">
              <Badge variant="white">Signature Architectural Execution</Badge>
              <Badge variant="sand">ECR, Chennai</Badge>
            </div>

            <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-8 text-[#F4F0E8] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs uppercase font-semibold tracking-widest text-[#B86F50] block mb-1">
                  Featured Residential Project
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-medium text-[#FBF9F4]">
                  The Horizon House • 4,200 sqft
                </h3>
                <p className="text-xs sm:text-sm text-[#D9D2C5] mt-1 max-w-md">
                  Double-height living space with exposed teak pergolas and monolithic concrete structural finishes.
                </p>
              </div>

              <div className="hidden sm:flex flex-col items-end shrink-0 bg-[#0E2420]/70 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-[#244E46]">
                <span className="text-[10px] uppercase tracking-wider text-[#8C9C96]">Execution Time</span>
                <span className="text-sm font-semibold text-[#F4F0E8]">10 Months Turnkey</span>
              </div>
            </div>
          </div>

          {/* Compact Quick Cost Estimator Widget (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between rounded-3xl bg-[#FBF9F4] border border-[#D9D2C5] p-6 sm:p-8 shadow-luxury-md">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-2xl bg-[#F7EDE8] border border-[#E6B8A5] flex items-center justify-center">
                  <Calculator className="w-5 h-5 text-[#B86F50]" />
                </div>
                <Badge variant="terracotta" size="sm">
                  Instant Calculator
                </Badge>
              </div>

              <h2 className="font-display text-2xl font-normal text-[#183B35]">
                Know your approximate construction cost
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-[#52655E] leading-relaxed">
                Enter your proposed built-up area to preview initial package costing for your Chennai plot.
              </p>

              {/* Interactive Calculation Form */}
              <form onSubmit={handleCalculate} className="mt-6 space-y-4">
                <div>
                  <label
                    htmlFor="hero-area-input"
                    className="block text-xs font-semibold text-[#183B35] uppercase tracking-wider mb-1.5"
                  >
                    Built-up Area (Sq.Ft)
                  </label>
                  <div className="relative">
                    <input
                      id="hero-area-input"
                      type="number"
                      min="500"
                      max="20000"
                      step="50"
                      value={area}
                      onChange={(e) => {
                        setArea(e.target.value);
                        const val = parseFloat(e.target.value);
                        if (!isNaN(val) && val > 0) {
                          setCalculatedEstimate(Math.round(val * 2199));
                        } else {
                          setCalculatedEstimate(null);
                        }
                      }}
                      placeholder="e.g. 2400"
                      className="w-full h-12 px-4 rounded-xl border border-[#D9D2C5] bg-[#F4F0E8]/50 text-[#183B35] font-semibold text-base focus:border-[#B86F50] focus:bg-white focus:outline-none transition-colors"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-[#52655E]">
                      sqft
                    </span>
                  </div>
                </div>

                {/* Estimate Result Box */}
                {calculatedEstimate !== null && (
                  <div className="p-4 rounded-2xl bg-[#E9E4D9]/60 border border-[#D9D2C5] transition-all">
                    <div className="flex items-center justify-between text-xs text-[#52655E]">
                      <span>Standard Package (~₹2,199/sqft):</span>
                      <span className="text-[11px] font-semibold text-[#183B35]">Turnkey Finish</span>
                    </div>
                    <div className="mt-1 font-display text-3xl font-semibold text-[#183B35]">
                      {formatLakhs(calculatedEstimate)}
                    </div>
                    <span className="text-[11px] text-[#52655E] block mt-0.5">
                      Basic from {formatLakhs((parseFloat(area) || 0) * 1899)} • Premium from {formatLakhs((parseFloat(area) || 0) * 2599)}
                    </span>
                  </div>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  fullWidth
                  href={`#calculator`}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Get Detailed Estimate
                </Button>
              </form>
            </div>

            <div className="mt-6 pt-4 border-t border-[#D9D2C5]/70 flex items-center justify-between text-xs text-[#52655E]">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#B86F50]" /> Zero obligation
              </span>
              <a
                href={siteConfig.contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("hero")}
                className="text-[#1E7E34] font-semibold hover:underline"
              >
                Instant WhatsApp Quote →
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
