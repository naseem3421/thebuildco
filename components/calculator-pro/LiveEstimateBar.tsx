"use client";

import React from "react";
import { Sparkles, ArrowRight, Clock, Building } from "lucide-react";
import { CalculationResult, formatInLakhs } from "@/lib/calculator/calculations";

interface LiveEstimateBarProps {
  calculation: CalculationResult;
  currentStep: number;
  onNext: () => void;
  onViewEstimate: () => void;
}

export function LiveEstimateBar({
  calculation,
  currentStep,
  onNext,
  onViewEstimate,
}: LiveEstimateBarProps) {
  const { estimateLow, estimateHigh, grandTotal, totalBuiltUpArea, durationLabel, selectedPackage } =
    calculation;

  const lowStr = formatInLakhs(estimateLow);
  const highStr = formatInLakhs(estimateHigh);

  // If already on result screen (step 5), don't show the sticky bottom next bar
  if (currentStep === 5) return null;

  return (
    <>
      {/* 1. Mobile Sticky Bottom Action Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#183B35]/95 backdrop-blur-md text-[#F4F0E8] border-t border-[#3E5C54] px-4 py-3 shadow-2xl animate-in slide-in-from-bottom duration-200">
        <div className="max-w-md mx-auto flex items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#EA580C]">
                ESTIMATED RANGE
              </span>
              <span className="text-[10px] text-[#8C9C96]">
                • {totalBuiltUpArea.toLocaleString()} sqft
              </span>
            </div>

            <div className="font-display text-lg sm:text-xl font-bold text-white leading-tight">
              {lowStr} – {highStr}
            </div>

            <span className="text-[10px] text-[#8C9C96] block">
              ₹{selectedPackage.ratePerSqft}/sqft ({selectedPackage.name})
            </span>
          </div>

          <button
            type="button"
            onClick={currentStep === 4 ? onViewEstimate : onNext}
            className="py-3 px-5 rounded-2xl bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-xs sm:text-sm shadow-luxury-sm transition-all flex items-center gap-1.5 shrink-0 cursor-pointer active:scale-[0.98]"
          >
            <span>{currentStep === 4 ? "View Estimate" : "Next"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Desktop Sticky Summary Widget (Rendered in right column) */}
      <div className="hidden lg:block rounded-3xl bg-gradient-to-br from-[#183B35] to-[#0D2420] text-[#F4F0E8] p-6 shadow-luxury-lg border border-[#3E5C54] space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#EA580C] bg-[#EA580C]/20 px-3 py-1 rounded-full border border-[#EA580C]/30 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3" /> LIVE 2026 ESTIMATE
          </span>
          <span className="text-xs font-semibold text-[#8C9C96] flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> ~{durationLabel}
          </span>
        </div>

        <div>
          <span className="text-[11px] uppercase tracking-wider text-[#8C9C96] block">
            Indicative Turnkey Cost Range
          </span>
          <div className="font-display text-3xl font-bold tracking-tight text-white mt-1">
            {lowStr} – {highStr}
          </div>
          <span className="text-xs font-semibold text-[#8C9C96] block mt-0.5">
            Base Target: {formatInLakhs(grandTotal)}
          </span>
        </div>

        {/* Mini KPI metrics */}
        <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-white/10 text-xs">
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] uppercase font-bold text-[#8C9C96] block">
              Total Built-up
            </span>
            <span className="font-bold text-white text-sm">
              {totalBuiltUpArea.toLocaleString()} sqft
            </span>
            <span className="text-[10px] text-[#8C9C96]">
              ₹{selectedPackage.ratePerSqft}/sqft ({selectedPackage.name})
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] uppercase font-bold text-[#8C9C96] block">
              Est. Bank EMI
            </span>
            <span className="font-bold text-[#86EFAC] text-sm">
              ₹{calculation.emi.toLocaleString()}/mo
            </span>
            <span className="text-[10px] text-[#8C9C96]">20 Yr @ 7.1% P.A.</span>
          </div>
        </div>

        {/* Action Button on Desktop */}
        <div className="pt-2">
          <button
            type="button"
            onClick={currentStep === 4 ? onViewEstimate : onNext}
            className="w-full py-3.5 px-4 rounded-2xl bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-sm shadow-luxury-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
          >
            <span>{currentStep === 4 ? "View Full Estimate Dashboard" : "Continue to Next Step"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
}
