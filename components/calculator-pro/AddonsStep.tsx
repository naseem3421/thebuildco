"use client";

import React, { useState } from "react";
import { Check, PackageCheck, Zap, ChevronRight, Sliders, Sparkles, ArrowRight } from "lucide-react";
import { PRO_ADDONS, ProAddon } from "@/config/calculatorPro";

interface AddonsStepProps {
  selectedAddons: {
    [id: string]: { enabled: boolean; customUnit?: number };
  };
  onToggleAddon: (id: string, customUnit?: number) => void;
  onApplyCivilBundle: () => void;
  onApplyEcoBundle: () => void;
  onCalculateResult: () => void;
}

export function AddonsStep({
  selectedAddons,
  onToggleAddon,
  onApplyCivilBundle,
  onApplyEcoBundle,
  onCalculateResult,
}: AddonsStepProps) {
  const [adjustingAddonId, setAdjustingAddonId] = useState<string | null>(null);

  const isAddonActive = (id: string) => !!selectedAddons[id]?.enabled;

  const getAddonUnit = (addon: ProAddon) => {
    return selectedAddons[addon.id]?.customUnit !== undefined
      ? selectedAddons[addon.id].customUnit
      : addon.defaultUnit;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Title */}
      <div className="space-y-1">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#183B35]">
          Anything else you want?
        </h2>
        <p className="text-xs sm:text-sm text-[#52655E]">
          Select auxiliary civil structures, renewable energy, and smart living provisions.
        </p>
      </div>

      {/* 1-Click Bundles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          type="button"
          onClick={onApplyCivilBundle}
          className="p-4 rounded-3xl bg-gradient-to-br from-[#FFF7F3] to-[#FFEDE0] border border-[#FFD9C6] text-left hover:shadow-luxury-sm transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#183B35] flex items-center gap-1.5">
              <PackageCheck className="w-4 h-4 text-[#EA580C]" /> 1-Click Civil Essentials
            </span>
            <span className="text-[10px] font-extrabold text-[#EA580C] uppercase tracking-wider">
              RECOMMENDED
            </span>
          </div>
          <p className="text-[11px] text-[#52655E] mt-1 leading-snug">
            Auto-adds 4,000L Sump + 2,000L Overhead Tank + 140 rft Compound Wall + Gate.
          </p>
        </button>

        <button
          type="button"
          onClick={onApplyEcoBundle}
          className="p-4 rounded-3xl bg-gradient-to-br from-[#F0FDF4] to-[#DCFCE7] border border-[#86EFAC] text-left hover:shadow-luxury-sm transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#183B35] flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-[#16A34A]" /> 1-Click Eco & Smart Living
            </span>
            <span className="text-[10px] font-extrabold text-[#16A34A] uppercase tracking-wider">
              +₹2.00 L
            </span>
          </div>
          <p className="text-[11px] text-[#52655E] mt-1 leading-snug">
            Auto-adds 3kW Rooftop Solar + Smart Home Automation + 4-Cam CCTV.
          </p>
        </button>
      </div>

      {/* Individual Addon Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {PRO_ADDONS.map((addon) => {
          const isEnabled = isAddonActive(addon.id);
          const currentUnitVal = getAddonUnit(addon);
          const isAdjustable =
            addon.type !== "fixed" &&
            addon.id !== "headroom" &&
            addon.defaultUnit !== undefined;

          return (
            <div
              key={addon.id}
              className={`p-3.5 rounded-2xl border transition-all ${
                isEnabled
                  ? "bg-[#FFF7F3] border-[#EA580C] shadow-sm font-semibold"
                  : "bg-white border-[#D9D2C5] hover:border-[#183B35]"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                {/* Clickable toggle row */}
                <div
                  onClick={() => onToggleAddon(addon.id, currentUnitVal)}
                  className="flex items-center gap-2.5 flex-1 cursor-pointer"
                >
                  <div
                    className={`w-5 h-5 rounded-lg flex items-center justify-center transition-all ${
                      isEnabled
                        ? "bg-[#EA580C] text-white"
                        : "border border-[#D9D2C5] bg-white"
                    }`}
                  >
                    {isEnabled && <Check className="w-3.5 h-3.5" />}
                  </div>

                  <div>
                    <span className="text-xs text-[#183B35] font-bold block leading-tight">
                      {addon.name}
                    </span>
                    {addon.subtitle && (
                      <span className="text-[10px] text-[#8C9C96] block leading-tight mt-0.5">
                        {addon.subtitle}
                      </span>
                    )}
                  </div>
                </div>

                {/* Rate & Optional Adjust Button */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-xs font-bold text-[#EA580C]">
                    {addon.formattedRateDisplay}
                  </span>

                  {isAdjustable && isEnabled && (
                    <button
                      type="button"
                      onClick={() =>
                        setAdjustingAddonId(
                          adjustingAddonId === addon.id ? null : addon.id
                        )
                      }
                      title="Adjust quantity"
                      className="p-1 rounded-lg border border-[#D9D2C5] bg-white hover:bg-[#E9E4D9] text-[#52655E] text-[10px] font-bold cursor-pointer"
                    >
                      <Sliders className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>

              {/* Quantity Adjustment Drawer */}
              {isAdjustable && isEnabled && adjustingAddonId === addon.id && (
                <div className="mt-2.5 pt-2 border-t border-[#FFD9C6] flex items-center justify-between text-xs animate-in fade-in duration-150">
                  <span className="text-[11px] text-[#52655E]">
                    Quantity ({addon.unitLabel}):
                  </span>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      min="10"
                      max="100000"
                      step={addon.type === "per_rft" ? "10" : "500"}
                      value={currentUnitVal || ""}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        onToggleAddon(addon.id, isNaN(val) ? 0 : val);
                      }}
                      className="w-24 h-8 px-2 rounded-lg border border-[#D9D2C5] bg-white text-xs font-bold text-[#183B35] focus:outline-none focus:border-[#EA580C]"
                    />
                    <span className="text-[10px] font-bold text-[#8C9C96]">
                      {addon.unitLabel}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Bar */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onCalculateResult}
          className="w-full py-4 px-6 rounded-2xl bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-sm sm:text-base shadow-luxury-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
        >
          <span>Calculate Turnkey Estimate</span>
          <Sparkles className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
