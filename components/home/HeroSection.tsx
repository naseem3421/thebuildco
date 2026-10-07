"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "../ui/Container";
import { trackCTAClick } from "@/lib/analytics";
import {
  CalendarCheck,
  Calculator,
  ShieldCheck,
  MapPin,
  CheckCircle2,
  Building2,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export function HeroSection() {
  const handleConsultationClick = () => {
    trackCTAClick({
      cta_label: "Hero Book Consultation",
      location: "hero",
      destination: "#consultation",
    });
  };

  const handleCalculatorClick = () => {
    trackCTAClick({
      cta_label: "Hero Calculate Budget",
      location: "hero",
      destination: "#calculator",
    });
  };

  return (
    <section className="relative pt-8 pb-16 sm:pt-14 sm:pb-24 bg-white border-b border-neutral-200 overflow-hidden">
      {/* Subtle architectural background grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#E5E7EB_1px,transparent_1px)] [background-size:28px_28px] opacity-70 pointer-events-none" />

      <Container size="wide" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Core Positioning Copy */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF7ED] border border-[#FFEDD5] text-xs font-bold text-[#EA580C] mb-5 tracking-widest uppercase">
              <MapPin className="w-3.5 h-3.5 text-[#EA580C]" />
              <span>TURNKEY HOME CONSTRUCTION IN CHENNAI</span>
            </div>

            {/* H1 */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-neutral-900 leading-[1.12]">
              Build Your ₹1–3 Crore Home With One Team Accountable From Design to Handover.
            </h1>

            {/* Supporting Copy */}
            <p className="mt-6 text-base sm:text-lg text-neutral-600 leading-relaxed max-w-2xl font-normal">
              Already own your land in Chennai? TBC provides end-to-end residential construction — architectural planning, structural engineering, procurement, construction, quality control and handover — through one accountable team. Built for Chennai landowners planning premium homes, villas and duplex residences.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <a
                href="#consultation"
                onClick={handleConsultationClick}
                className="w-full sm:w-auto px-7 py-4 rounded-full bg-[#EA580C] text-white font-semibold text-sm hover:bg-[#C2410C] transition-all shadow-luxury-sm hover:shadow-luxury-md inline-flex items-center justify-center gap-2 group"
              >
                <CalendarCheck className="w-4 h-4 text-white" />
                <span>Book My Project Consultation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>

              <a
                href="#calculator"
                onClick={handleCalculatorClick}
                className="w-full sm:w-auto px-7 py-4 rounded-full bg-white border border-neutral-300 text-neutral-800 font-semibold text-sm hover:bg-neutral-50 transition-colors inline-flex items-center justify-center gap-2"
              >
                <Calculator className="w-4 h-4 text-[#EA580C]" />
                <span>Calculate My Construction Budget</span>
              </a>
            </div>

            {/* Trust Line */}
            <div className="mt-8 pt-6 border-t border-neutral-100 w-full">
              <p className="text-xs sm:text-sm font-semibold text-neutral-500 tracking-wide flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="text-neutral-900 font-bold">₹1 Cr–₹3 Cr Projects</span>
                <span className="text-neutral-300">•</span>
                <span className="text-neutral-900 font-bold">Chennai Landowners</span>
                <span className="text-neutral-300">•</span>
                <span className="text-neutral-900 font-bold">Turnkey Construction</span>
                <span className="text-neutral-300">•</span>
                <span className="text-neutral-900 font-bold">Stage-Wise Payments</span>
              </p>
            </div>
          </div>

          {/* Right Column: Visual Showcase of Real Residential Project */}
          <div className="lg:col-span-5 relative w-full">
            <div className="relative rounded-3xl overflow-hidden shadow-luxury-lg border border-neutral-200/80 bg-neutral-100">
              <div className="relative h-[360px] sm:h-[460px] w-full">
                <Image
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                  alt="Modern turnkey residential construction in Chennai by TBC"
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent" />
              </div>

              {/* Real Project Credential Overlay */}
              <div className="absolute bottom-4 inset-x-4 p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-white/60 shadow-luxury-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-extrabold tracking-wider uppercase text-[#EA580C]">
                    GREENFIELD RESIDENCE • MEDAVAKKAM
                  </span>
                  <span className="text-[11px] font-bold text-neutral-500">
                    2,850 SQFT
                  </span>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-neutral-900 leading-snug">
                  Contemporary Individual House on Client-Owned Land
                </h4>
                <p className="mt-1 text-xs text-neutral-600">
                  Architectural design, structural execution, vitrified flooring, and handover by TBC.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
