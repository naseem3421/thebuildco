"use client";

import React, { useState } from "react";
import { MapPin, CheckCircle2, ChevronRight, Info, Sparkles, Building2, Sliders } from "lucide-react";
import { CHENNAI_SOIL_DATABASE, ChennaiSoilProfile } from "@/config/aiCalculatorEngine";

interface PlotStepProps {
  plotArea: number;
  localityKey: string;
  onSelectPlotArea: (sqft: number) => void;
  onSelectLocality: (key: string) => void;
  onNext: () => void;
}

interface PlotPreset {
  id: string;
  title: string;
  sqft: number;
  cents: string;
  grounds: string;
  badge?: string;
  isCustom?: boolean;
}

const PRESET_CARDS: PlotPreset[] = [
  {
    id: "20x30",
    title: "20 × 30",
    sqft: 600,
    cents: "1.38",
    grounds: "0.25",
    badge: "Compact City Plot",
  },
  {
    id: "30x40",
    title: "30 × 40",
    sqft: 1200,
    cents: "2.75",
    grounds: "0.50",
    badge: "Most Common in Chennai",
  },
  {
    id: "40x60",
    title: "40 × 60",
    sqft: 2400,
    cents: "5.51",
    grounds: "1.00",
    badge: "Spacious Villa Plot",
  },
  {
    id: "1_ground",
    title: "1 Ground",
    sqft: 2400,
    cents: "5.51",
    grounds: "1.00",
    badge: "Traditional Standard",
  },
  {
    id: "2_grounds",
    title: "2 Grounds",
    sqft: 4800,
    cents: "11.02",
    grounds: "2.00",
    badge: "Grand Luxury Estate",
  },
];

export function PlotStep({
  plotArea,
  localityKey,
  onSelectPlotArea,
  onSelectLocality,
  onNext,
}: PlotStepProps) {
  const [isCustomOpen, setIsCustomOpen] = useState(false);
  const [customUnit, setCustomUnit] = useState<"sqft" | "cent" | "ground">("sqft");
  const [customValue, setCustomValue] = useState<string>(plotArea ? String(plotArea) : "1200");
  const [customDimWidth, setCustomDimWidth] = useState<string>("30");
  const [customDimLength, setCustomDimLength] = useState<string>("40");
  const [customMode, setCustomMode] = useState<"sqft" | "dimensions">("sqft");

  const currentSoil: ChennaiSoilProfile =
    CHENNAI_SOIL_DATABASE[localityKey] || CHENNAI_SOIL_DATABASE.medavakkam;

  const handleCustomSubmit = (sqft: number) => {
    const valid = Math.max(200, Math.min(50000, sqft));
    onSelectPlotArea(valid);
  };

  const handleDimensionChange = (wStr: string, lStr: string) => {
    setCustomDimWidth(wStr);
    setCustomDimLength(lStr);
    const w = parseInt(wStr, 10) || 0;
    const l = parseInt(lStr, 10) || 0;
    if (w > 0 && l > 0) {
      handleCustomSubmit(w * l);
    }
  };

  const handleValueChange = (valStr: string, unit: "sqft" | "cent" | "ground") => {
    setCustomValue(valStr);
    const num = parseFloat(valStr) || 0;
    if (num > 0) {
      if (unit === "sqft") handleCustomSubmit(Math.round(num));
      else if (unit === "cent") handleCustomSubmit(Math.round(num * 435.6));
      else if (unit === "ground") handleCustomSubmit(Math.round(num * 2400));
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Title & Description */}
      <div className="space-y-1">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#183B35]">
          What size is your plot?
        </h2>
        <p className="text-xs sm:text-sm text-[#52655E]">
          Select your plot dimensions below or enter your exact footprint.
        </p>
      </div>

      {/* 1. Large Tappable Plot Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {PRESET_CARDS.map((preset) => {
          const isSelected = !isCustomOpen && plotArea === preset.sqft;

          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => {
                setIsCustomOpen(false);
                onSelectPlotArea(preset.sqft);
              }}
              className={`p-4 sm:p-5 rounded-3xl border text-left transition-all cursor-pointer flex flex-col justify-between relative min-h-[110px] ${
                isSelected
                  ? "bg-[#FFF7F3] border-2 border-[#EA580C] shadow-luxury-sm ring-1 ring-[#EA580C]"
                  : "bg-white border-[#D9D2C5] hover:border-[#183B35] hover:bg-[#FAF8F5]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-display text-xl sm:text-2xl font-bold text-[#183B35]">
                    {preset.title}
                  </span>
                  {isSelected && <CheckCircle2 className="w-5 h-5 text-[#EA580C]" />}
                </div>

                {preset.badge && (
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#EA580C] block mt-0.5">
                    {preset.badge}
                  </span>
                )}
              </div>

              <div className="mt-3 pt-2 border-t border-[#D9D2C5]/60 flex items-center justify-between text-xs text-[#52655E]">
                <span className="font-bold text-[#183B35]">
                  {preset.sqft.toLocaleString()} sq.ft
                </span>
                <span className="text-[11px] text-[#8C9C96]">
                  {preset.cents} Cents · {preset.grounds} Gnd
                </span>
              </div>
            </button>
          );
        })}

        {/* Custom Plot Option Card */}
        <button
          type="button"
          onClick={() => setIsCustomOpen(true)}
          className={`p-4 sm:p-5 rounded-3xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[110px] ${
            isCustomOpen
              ? "bg-[#FFF7F3] border-2 border-[#EA580C] shadow-luxury-sm ring-1 ring-[#EA580C]"
              : "bg-white border-[#D9D2C5] hover:border-[#183B35] hover:bg-[#FAF8F5]"
          }`}
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="font-display text-xl sm:text-2xl font-bold text-[#183B35]">
                Enter My Own
              </span>
              {isCustomOpen && <CheckCircle2 className="w-5 h-5 text-[#EA580C]" />}
            </div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C9C96] block mt-0.5">
              Custom Size or Dimensions
            </span>
          </div>

          <div className="mt-3 pt-2 border-t border-[#D9D2C5]/60 text-xs font-semibold text-[#EA580C] flex items-center gap-1">
            <Sliders className="w-3.5 h-3.5" />
            <span>Click to enter custom area</span>
          </div>
        </button>
      </div>

      {/* 2. Custom Plot Input Drawer (Progressive Disclosure) */}
      {isCustomOpen && (
        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#D9D2C5] space-y-4 animate-in fade-in zoom-in-95 duration-150 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#F0EBE0] pb-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#183B35]">
              Custom Plot Size
            </span>
            <div className="flex bg-[#F8F6F0] p-0.5 rounded-xl border border-[#D9D2C5]">
              <button
                type="button"
                onClick={() => setCustomMode("sqft")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  customMode === "sqft" ? "bg-[#183B35] text-white" : "text-[#52655E]"
                }`}
              >
                Area (Sqft / Cents)
              </button>
              <button
                type="button"
                onClick={() => setCustomMode("dimensions")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  customMode === "dimensions" ? "bg-[#183B35] text-white" : "text-[#52655E]"
                }`}
              >
                Dimensions (W × L)
              </button>
            </div>
          </div>

          {customMode === "dimensions" ? (
            <div className="grid grid-cols-2 gap-3 items-center">
              <div>
                <label className="text-[11px] font-bold text-[#8C9C96] uppercase block mb-1">
                  Width (ft)
                </label>
                <input
                  type="number"
                  min="10"
                  max="500"
                  value={customDimWidth}
                  onChange={(e) => handleDimensionChange(e.target.value, customDimLength)}
                  className="w-full h-12 px-3.5 rounded-2xl border border-[#D9D2C5] bg-[#FBF9F4] font-bold text-[#183B35] focus:outline-none focus:border-[#EA580C]"
                  placeholder="30"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#8C9C96] uppercase block mb-1">
                  Length (ft)
                </label>
                <input
                  type="number"
                  min="10"
                  max="500"
                  value={customDimLength}
                  onChange={(e) => handleDimensionChange(customDimWidth, e.target.value)}
                  className="w-full h-12 px-3.5 rounded-2xl border border-[#D9D2C5] bg-[#FBF9F4] font-bold text-[#183B35] focus:outline-none focus:border-[#EA580C]"
                  placeholder="40"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="number"
                    min="200"
                    max="50000"
                    value={customValue}
                    onChange={(e) => handleValueChange(e.target.value, customUnit)}
                    className="w-full h-12 px-4 rounded-2xl border border-[#D9D2C5] bg-[#FBF9F4] font-bold text-[#183B35] text-base focus:outline-none focus:border-[#EA580C]"
                    placeholder="e.g. 1500"
                  />
                </div>

                <div className="flex bg-[#F8F6F0] p-1 rounded-2xl border border-[#D9D2C5] shrink-0">
                  {(["sqft", "cent", "ground"] as const).map((unit) => (
                    <button
                      key={unit}
                      type="button"
                      onClick={() => {
                        setCustomUnit(unit);
                        handleValueChange(customValue, unit);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer ${
                        customUnit === unit
                          ? "bg-[#EA580C] text-white shadow-sm"
                          : "text-[#52655E] hover:text-[#183B35]"
                      }`}
                    >
                      {unit}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Automatic Conversion Preview */}
          <div className="p-3 rounded-2xl bg-[#FFF7F3] border border-[#FFD9C6] flex items-center justify-between text-xs text-[#183B35]">
            <span className="font-semibold">
              Calculated Plot Size: <strong>{plotArea.toLocaleString()} sq.ft</strong>
            </span>
            <span className="text-[#EA580C] font-bold">
              {(plotArea / 435.6).toFixed(2)} Cents · {(plotArea / 2400).toFixed(2)} Grounds
            </span>
          </div>
        </div>
      )}

      {/* 3. Optional Intelligent Locality Selector */}
      <div className="p-4 sm:p-5 rounded-3xl bg-[#FBF9F4] border border-[#D9D2C5] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#183B35]">
            <MapPin className="w-3.5 h-3.5 text-[#EA580C]" />
            <span>Plot Locality (Optional AI Geotechnical Boost)</span>
          </div>
          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#183B35] text-white uppercase">
            {currentSoil.zone}
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {Object.entries(CHENNAI_SOIL_DATABASE).map(([key, data]) => {
            const isLocSelected = localityKey === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => onSelectLocality(key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  isLocSelected
                    ? "bg-[#EA580C] text-white border-[#EA580C] shadow-sm"
                    : "bg-white text-[#52655E] border-[#D9D2C5] hover:bg-[#E9E4D9]"
                }`}
              >
                {data.locality.split(" ")[0]}
              </button>
            );
          })}
        </div>

        <p className="text-[11px] text-[#52655E] leading-relaxed pt-1">
          <strong>{currentSoil.locality}:</strong> {currentSoil.soilType} • Water Table:{" "}
          {currentSoil.waterTableDepth} • Waterproofing: {currentSoil.waterproofingGrade}
        </p>
      </div>

      {/* 4. Action Bar */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onNext}
          className="w-full py-4 px-6 rounded-2xl bg-[#183B35] hover:bg-[#0D2420] text-white font-bold text-sm sm:text-base shadow-luxury-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
        >
          <span>Next: Choose Home Type</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
