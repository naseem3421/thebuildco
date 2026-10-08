"use client";

import React, { useState } from "react";
import { PRO_PACKAGES, ProPackageTier } from "@/config/calculatorPro";
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

export interface StepPackageProps {
  selectedPackage: ProPackageTier;
  setSelectedPackage: (pkg: ProPackageTier) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepPackage({
  selectedPackage,
  setSelectedPackage,
  onNext,
  onBack,
}: StepPackageProps) {
  const [activeTab, setActiveTab] = useState<"structure" | "finishes" | "fittings">("structure");

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex items-start gap-4 p-5 sm:p-6 rounded-2xl bg-[#FFF7F3] border border-[#FFD9C6]">
        <div className="w-10 h-10 rounded-xl bg-[#FFEDE0] border border-[#FFC8A9] flex items-center justify-center shrink-0 text-[#EA580C]">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-[#183B35]">
            Select your construction package
          </h3>
          <p className="text-xs sm:text-sm text-[#52655E] mt-0.5">
            Chennai 2026 rates, inclusive of materials, labour & site supervision.
          </p>
        </div>
      </div>

      {/* Package Tier Selection Cards (3 tiers) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {PRO_PACKAGES.map((pkg) => {
          const isSelected = selectedPackage.id === pkg.id;
          return (
            <div
              key={pkg.id}
              onClick={() => setSelectedPackage(pkg)}
              className={`relative rounded-3xl p-5 sm:p-6 flex flex-col justify-between transition-all cursor-pointer ${
                isSelected
                  ? "bg-[#FFF7F3] border-2 border-[#EA580C] shadow-luxury-md ring-2 ring-[#EA580C]/20 -translate-y-1"
                  : "bg-[#FBF9F4] border border-[#D9D2C5] hover:bg-[#E9E4D9] hover:border-[#8C9C96]"
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-[#EA580C] text-white text-[11px] font-extrabold uppercase tracking-wider shadow-sm flex items-center gap-1">
                  <span>★</span> Most Popular
                </div>
              )}

              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/80 border border-[#D9D2C5] text-[#52655E]">
                    {pkg.badge || "Tier"}
                  </span>
                  {isSelected && (
                    <span className="text-[#EA580C] flex items-center gap-1 text-xs font-bold">
                      <CheckCircle2 className="w-4 h-4 fill-[#EA580C] text-white" /> Selected
                    </span>
                  )}
                </div>

                <h4 className="font-display text-2xl font-bold text-[#183B35]">{pkg.name}</h4>
                <p className="text-xs text-[#52655E] mt-1 line-clamp-2 leading-relaxed">
                  {pkg.tagline}
                </p>

                <div className="mt-4 pt-4 border-t border-[#D9D2C5]/70">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C9C96] block">
                    BASE RATE
                  </span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="font-display text-3xl font-bold text-[#EA580C]">
                      ₹{pkg.ratePerSqft.toLocaleString()}
                    </span>
                    <span className="text-xs font-bold text-[#52655E]">/ sq.ft</span>
                  </div>
                  <span className="text-[11px] text-[#8C9C96] block mt-0.5">
                    All-inclusive · Labour + Materials
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#D9D2C5]/50 flex items-center justify-between text-xs text-[#52655E]">
                <span>Timeline</span>
                <span className="font-bold text-[#183B35]">{pkg.durationRange}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Package Specifications & What's Included Drawer */}
      <div className="rounded-3xl bg-[#F8F6F0] border border-[#E9E4DA] p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D9D2C5]/80">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#EA580C]" />
              <h4 className="font-display text-xl font-bold text-[#183B35]">
                {selectedPackage.name} Package Specifications
              </h4>
            </div>
            <p className="text-xs text-[#52655E] mt-0.5">
              Verified Chennai 2026 grade specifications for {selectedPackage.name} tier
            </p>
          </div>

          {/* Spec Tabs */}
          <div className="flex bg-white p-1 rounded-xl border border-[#D9D2C5] shrink-0 self-start sm:self-auto">
            {(["structure", "finishes", "fittings"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                  activeTab === tab
                    ? "bg-[#183B35] text-[#F4F0E8] shadow-sm"
                    : "text-[#52655E] hover:text-[#183B35]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Spec Details Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {selectedPackage.specs[activeTab].map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-[#FBF9F4] border border-[#D9D2C5] flex flex-col justify-between"
            >
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C9C96] block mb-1">
                {item.label}
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#183B35] leading-snug">
                {item.value}
              </span>
            </div>
          ))}
        </div>

        {/* What's Included Pills */}
        <div className="pt-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#183B35] block mb-3">
            WHAT'S INCLUDED
          </span>
          <div className="flex flex-wrap gap-2">
            {selectedPackage.whatsIncluded.map((item, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#D9D2C5] text-xs font-semibold text-[#183B35]"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#15803D]" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Actions */}
      <div className="pt-6 border-t border-[#D9D2C5]/70 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3.5 rounded-2xl border border-[#D9D2C5] bg-[#FBF9F4] hover:bg-[#E9E4D9] text-[#183B35] font-bold text-sm transition-all flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          className="px-8 py-4 rounded-2xl bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-base shadow-luxury-sm hover:shadow-luxury-md transition-all flex items-center gap-2 cursor-pointer active:scale-[0.99]"
        >
          <span>Next — Select Add-ons</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
