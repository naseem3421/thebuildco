"use client";

import React, { useState } from "react";
import { Sparkles, Check, CheckCircle2, ChevronRight, Eye, Layers } from "lucide-react";
import { PRO_PACKAGES, ProPackageTier } from "@/config/calculatorPro";
import { PackageComparisonModal } from "./PackageComparisonModal";

interface PackageStepProps {
  selectedPackageId: "basic" | "standard" | "premium" | "luxury";
  totalBuiltUpArea: number;
  onSelectPackage: (id: "basic" | "standard" | "premium" | "luxury") => void;
  onNext: () => void;
}

export function PackageStep({
  selectedPackageId,
  totalBuiltUpArea,
  onSelectPackage,
  onNext,
}: PackageStepProps) {
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="space-y-1">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#183B35]">
            How do you want your home finished?
          </h2>
          <p className="text-xs sm:text-sm text-[#52655E]">
            Transparent per sq.ft turnkey rates with branded structural & interior specifications.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsCompareModalOpen(true)}
          className="self-start sm:self-auto px-3.5 py-2 rounded-xl bg-white border border-[#D9D2C5] text-xs font-bold text-[#EA580C] hover:bg-[#FFF7F3] transition-all flex items-center gap-1.5 cursor-pointer shadow-sm shrink-0"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Compare All Packages</span>
        </button>
      </div>

      {/* 4 Large Package Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {PRO_PACKAGES.map((pkg) => {
          const isSelected = selectedPackageId === pkg.id;
          const estCost = Math.round(totalBuiltUpArea * pkg.ratePerSqft);
          const estLakhs = (estCost / 100000).toFixed(2);

          return (
            <button
              key={pkg.id}
              type="button"
              onClick={() => onSelectPackage(pkg.id as any)}
              className={`p-5 rounded-3xl border text-left transition-all cursor-pointer flex flex-col justify-between relative ${
                isSelected
                  ? "bg-[#FFF7F3] border-2 border-[#EA580C] shadow-luxury-sm ring-1 ring-[#EA580C]"
                  : "bg-white border-[#D9D2C5] hover:border-[#183B35] hover:bg-[#FAF8F5]"
              }`}
            >
              <div>
                {/* Header Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-display text-xl sm:text-2xl font-bold text-[#183B35]">
                      {pkg.name}
                    </span>
                    {pkg.popular && (
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#EA580C] text-white uppercase tracking-wider">
                        ★ MOST POPULAR
                      </span>
                    )}
                  </div>

                  {isSelected ? (
                    <CheckCircle2 className="w-5 h-5 text-[#EA580C]" />
                  ) : (
                    <span className="text-[10px] font-bold text-[#8C9C96] uppercase">
                      {pkg.badge}
                    </span>
                  )}
                </div>

                {/* Price Display */}
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-display text-2xl sm:text-3xl font-bold text-[#EA580C]">
                    ₹{pkg.ratePerSqft.toLocaleString()}
                  </span>
                  <span className="text-xs text-[#8C9C96]">/ sq.ft turnkey</span>
                  <span className="text-xs font-bold text-[#183B35] ml-auto">
                    ≈ ₹{estLakhs} L
                  </span>
                </div>

                <p className="text-xs text-[#52655E] mt-1.5 leading-snug">
                  {pkg.tagline}
                </p>

                {/* Key Inclusions Checklist */}
                <div className="mt-4 pt-3 border-t border-[#D9D2C5]/60 space-y-1.5">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C9C96] block">
                    Key Specifications Included:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs text-[#183B35]">
                    {pkg.whatsIncluded.slice(0, 6).map((item, idx) => (
                      <div key={idx} className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-[#15803D] shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-2.5 border-t border-[#D9D2C5]/60 flex items-center justify-between text-xs text-[#8C9C96]">
                <span>Duration: {pkg.durationRange}</span>
                <span className="text-[#EA580C] font-semibold">
                  {isSelected ? "Selected Tier" : "Click to select"}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Action Bar */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onNext}
          className="w-full py-4 px-6 rounded-2xl bg-[#183B35] hover:bg-[#0D2420] text-white font-bold text-sm sm:text-base shadow-luxury-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
        >
          <span>Next: Add Extras & Auxiliary Civil Works</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Package Comparison Modal */}
      <PackageComparisonModal
        isOpen={isCompareModalOpen}
        selectedPackageId={selectedPackageId}
        totalBuiltUpArea={totalBuiltUpArea}
        onSelectPackage={(id) => {
          onSelectPackage(id);
          setIsCompareModalOpen(false);
        }}
        onClose={() => setIsCompareModalOpen(false)}
      />
    </div>
  );
}
