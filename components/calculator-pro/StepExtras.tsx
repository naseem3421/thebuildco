"use client";

import React from "react";
import { PRO_ADDONS, ProAddon, ProPackageTier } from "@/config/calculatorPro";
import { ArrowLeft, ArrowRight, CheckSquare, PlusCircle, Wrench, Sparkles } from "lucide-react";

export interface SelectedAddonState {
  [addonId: string]: {
    enabled: boolean;
    customUnit?: number;
  };
}

export interface StepExtrasProps {
  selectedAddons: SelectedAddonState;
  setSelectedAddons: React.Dispatch<React.SetStateAction<SelectedAddonState>>;
  selectedPackage: ProPackageTier;
  onNext: () => void;
  onBack: () => void;
}

export function StepExtras({
  selectedAddons,
  setSelectedAddons,
  selectedPackage,
  onNext,
  onBack,
}: StepExtrasProps) {
  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        enabled: !prev[id]?.enabled,
      },
    }));
  };

  const updateUnit = (id: string, unit: number) => {
    setSelectedAddons((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        customUnit: unit,
      },
    }));
  };

  const calculateAddonCost = (addon: ProAddon): number => {
    const state = selectedAddons[addon.id];
    if (!state?.enabled) return 0;

    if (addon.type === "fixed") {
      return addon.rate;
    }
    if (addon.type === "per_sqft_package") {
      return (addon.defaultUnit || 200) * selectedPackage.ratePerSqft;
    }
    const unitCount = state.customUnit !== undefined ? state.customUnit : addon.defaultUnit || 1;
    // Rate variations according to package level
    let unitRate = addon.rate;
    if (selectedPackage.id === "basic") {
      if (addon.id === "overhead_tank") unitRate = 40;
      if (addon.id === "compound_wall") unitRate = 2300;
      if (addon.id === "underground_sump") unitRate = 30;
      if (addon.id === "septic_tank") unitRate = 28;
    }
    return unitCount * unitRate;
  };

  const totalAddonsCost = PRO_ADDONS.reduce(
    (sum, addon) => sum + calculateAddonCost(addon),
    0
  );

  const selectedCount = Object.values(selectedAddons).filter((s) => s?.enabled).length;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex items-start gap-4 p-5 sm:p-6 rounded-2xl bg-[#FFF7F3] border border-[#FFD9C6]">
        <div className="w-10 h-10 rounded-xl bg-[#FFEDE0] border border-[#FFC8A9] flex items-center justify-center shrink-0 text-[#EA580C]">
          <Wrench className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-[#183B35]">
            Any extra requirements?
          </h3>
          <p className="text-xs sm:text-sm text-[#52655E] mt-0.5">
            These add-ons are on top of the base construction estimate.
          </p>
        </div>
      </div>

      {/* Real-time Add-on Summary Pill */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-[#F8F6F0] border border-[#E9E4DA]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#EA580C] text-white flex items-center justify-center font-bold text-xs">
            {selectedCount}
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#8C9C96] block">
              ADD-ONS SELECTED
            </span>
            <span className="text-sm font-bold text-[#183B35]">
              {selectedCount === 0
                ? "No add-ons selected"
                : `${selectedCount} optional ${selectedCount === 1 ? "upgrade" : "upgrades"} included`}
            </span>
          </div>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8C9C96]">
            Total Add-on Cost:
          </span>
          <span className="font-display text-2xl font-bold text-[#EA580C]">
            {totalAddonsCost > 0 ? `₹${totalAddonsCost.toLocaleString()}` : "₹0"}
          </span>
        </div>
      </div>

      {/* Add-on Cards Grid (11 Addons) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {PRO_ADDONS.map((addon) => {
          const isEnabled = !!selectedAddons[addon.id]?.enabled;
          const cost = calculateAddonCost(addon);

          let displayRateString = addon.formattedRateDisplay;
          if (addon.id === "headroom") {
            const headroomTotal = (addon.defaultUnit || 200) * selectedPackage.ratePerSqft;
            displayRateString = `200 sq ft × ₹${selectedPackage.ratePerSqft.toLocaleString()}/sqft · ₹${headroomTotal.toLocaleString()}`;
          }

          return (
            <div
              key={addon.id}
              onClick={() => toggleAddon(addon.id)}
              className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                isEnabled
                  ? "bg-[#FFF7F3] border-[#EA580C] shadow-luxury-sm ring-1 ring-[#EA580C]"
                  : "bg-[#FBF9F4] border-[#D9D2C5] hover:bg-[#E9E4D9] hover:border-[#8C9C96]"
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <span className="font-display text-base font-bold text-[#183B35] leading-snug block">
                      {addon.name}
                    </span>
                    {addon.subtitle && (
                      <p className="text-[11px] text-[#52655E] mt-0.5 leading-normal">
                        {addon.subtitle}
                      </p>
                    )}
                  </div>

                  <div className="shrink-0 mt-0.5">
                    {isEnabled ? (
                      <div className="w-5 h-5 rounded-md bg-[#EA580C] text-white flex items-center justify-center">
                        <CheckSquare className="w-4 h-4" />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-md border border-[#D9D2C5] bg-white flex items-center justify-center text-transparent hover:border-[#8C9C96]">
                        <PlusCircle className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-[#D9D2C5]/60 flex items-baseline justify-between">
                  <span className="text-[11px] font-semibold text-[#8C9C96]">
                    {addon.type === "fixed" ? "Fixed Price" : "Unit Rate"}
                  </span>
                  <span className="text-xs font-bold text-[#EA580C]">{displayRateString}</span>
                </div>
              </div>

              {/* Optional unit quantity adjustment for per_litre / per_rft if enabled */}
              {isEnabled && addon.unitLabel && (
                <div
                  className="mt-3 pt-3 border-t border-[#FFD9C6] flex items-center justify-between gap-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <label
                    htmlFor={`unit-input-${addon.id}`}
                    className="text-[10px] font-bold uppercase tracking-wider text-[#52655E]"
                  >
                    Quantity ({addon.unitLabel}):
                  </label>
                  <input
                    id={`unit-input-${addon.id}`}
                    type="number"
                    min="10"
                    step={addon.unitLabel === "litres" ? 500 : 10}
                    value={
                      selectedAddons[addon.id]?.customUnit !== undefined
                        ? selectedAddons[addon.id]?.customUnit
                        : addon.defaultUnit
                    }
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      updateUnit(addon.id, isNaN(val) ? 0 : val);
                    }}
                    className="w-24 h-8 px-2 text-right rounded-lg border border-[#D9D2C5] bg-white text-xs font-bold text-[#183B35] focus:outline-none focus:border-[#EA580C]"
                  />
                </div>
              )}
            </div>
          );
        })}
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
          <span>Generate Full Report (100%)</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
