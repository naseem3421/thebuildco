"use client";

import React from "react";
import { X, CheckCircle, Sparkles } from "lucide-react";
import { PRO_PACKAGES, PRO_COMPARISON_MATRIX } from "@/config/calculatorPro";

interface PackageComparisonModalProps {
  isOpen: boolean;
  selectedPackageId: string;
  totalBuiltUpArea: number;
  onSelectPackage: (id: "basic" | "standard" | "premium" | "luxury") => void;
  onClose: () => void;
}

export function PackageComparisonModal({
  isOpen,
  selectedPackageId,
  totalBuiltUpArea,
  onSelectPackage,
  onClose,
}: PackageComparisonModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl rounded-3xl bg-[#FBF9F4] border border-[#D9D2C5] shadow-2xl p-4 sm:p-7 max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#D9D2C5] shrink-0">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#EA580C] flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> FULL SPECIFICATIONS COMPARISON
            </span>
            <h3 className="font-display text-lg sm:text-2xl font-bold text-[#183B35]">
              Compare Chennai Construction Packages
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#E9E4DA] hover:bg-[#D9D2C5] text-[#183B35] flex items-center justify-center transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto overflow-y-auto flex-1 mt-3 rounded-2xl border border-[#D9D2C5] bg-white">
          <table className="w-full text-left text-xs">
            <thead className="sticky top-0 z-10">
              <tr className="bg-[#183B35] text-white">
                <th className="py-3 px-3.5 uppercase font-bold text-[11px]">Feature</th>
                {PRO_PACKAGES.map((pkg) => {
                  const isCurrent = selectedPackageId === pkg.id;
                  return (
                    <th
                      key={pkg.id}
                      className={`py-3 px-3 text-center font-bold transition-all ${
                        isCurrent ? "bg-[#EA580C]" : ""
                      }`}
                    >
                      <span className="block font-display text-sm">{pkg.name}</span>
                      <span className="text-[10px] font-normal opacity-90 block">
                        ₹{pkg.ratePerSqft.toLocaleString()}/sqft
                      </span>
                      <button
                        type="button"
                        onClick={() => onSelectPackage(pkg.id as any)}
                        className={`mt-1.5 px-2.5 py-0.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                          isCurrent
                            ? "bg-white text-[#EA580C] shadow-sm"
                            : "bg-white/20 text-white hover:bg-white/40"
                        }`}
                      >
                        {isCurrent ? "Selected" : "Select"}
                      </button>
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody className="divide-y divide-[#D9D2C5]/60 text-[#183B35]">
              <tr className="bg-[#FFF7F3] font-bold">
                <td className="py-2.5 px-3.5 text-[#EA580C]">
                  Est. Cost ({totalBuiltUpArea.toLocaleString()} sqft)
                </td>
                {PRO_PACKAGES.map((pkg) => {
                  const total = totalBuiltUpArea * pkg.ratePerSqft;
                  const lakhs = (total / 100000).toFixed(2);
                  return (
                    <td key={pkg.id} className="py-2.5 px-3 text-center text-[#EA580C] font-display font-bold">
                      ₹{lakhs} L
                    </td>
                  );
                })}
              </tr>

              {PRO_COMPARISON_MATRIX.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#FBF9F4]">
                  <td className="py-2 px-3.5 font-semibold text-[#52655E]">{row.feature}</td>
                  {(["standard", "premium", "luxury"] as const).map((colKey) => {
                    const val = row[colKey];
                    return (
                      <td key={colKey} className="py-2 px-3 text-center">
                        {typeof val === "boolean" ? (
                          val ? (
                            <CheckCircle className="w-3.5 h-3.5 text-[#15803D] mx-auto" />
                          ) : (
                            <span className="text-[#8C9C96]">—</span>
                          )
                        ) : (
                          val
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer close */}
        <div className="pt-3 border-t border-[#D9D2C5] flex justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="py-2.5 px-5 rounded-xl bg-[#183B35] text-white text-xs font-bold hover:bg-[#0D2420] transition-all cursor-pointer"
          >
            Apply & Close
          </button>
        </div>
      </div>
    </div>
  );
}
