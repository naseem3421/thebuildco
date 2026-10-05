"use client";

import React from "react";
import { ProPackageTier } from "@/config/calculatorPro";
import { ArrowRight, Layers, Car, Building } from "lucide-react";

export interface StepPlotAreaProps {
  plotArea: number;
  setPlotArea: (val: number) => void;
  builtUpPerFloor: number;
  setBuiltUpPerFloor: (val: number) => void;
  carParkingArea: number;
  setCarParkingArea: (val: number) => void;
  selectedPackage: ProPackageTier;
  floors: number;
  onNext: () => void;
}

export function StepPlotArea({
  plotArea,
  setPlotArea,
  builtUpPerFloor,
  setBuiltUpPerFloor,
  carParkingArea,
  setCarParkingArea,
  selectedPackage,
  floors,
  onNext,
}: StepPlotAreaProps) {
  const plotSqYards = (plotArea / 9).toFixed(1);
  const plotCents = (plotArea / 435.6).toFixed(2);

  const builtUpSqYards = (builtUpPerFloor / 9).toFixed(1);
  const builtUpCents = (builtUpPerFloor / 435.6).toFixed(2);

  const totalBuiltUp = builtUpPerFloor * floors + carParkingArea;
  const far = plotArea > 0 ? (totalBuiltUp / plotArea).toFixed(2) : "0.00";
  const coveragePercent = plotArea > 0 ? Math.min(100, Math.round((builtUpPerFloor / plotArea) * 100)) : 0;

  const carCount = Math.round(carParkingArea / 200);
  const carParkingCost = carParkingArea * selectedPackage.ratePerSqft;

  const plotPresets = [600, 800, 1200, 1500, 2000, 2400];
  const builtUpPresets = [600, 800, 1200, 1500, 2000, 2500];
  const parkingPresets = [
    { label: "1 Car (200 sqft)", sqft: 200 },
    { label: "2 Cars (400 sqft)", sqft: 400 },
    { label: "3 Cars (600 sqft)", sqft: 600 },
    { label: "4 Cars (800 sqft)", sqft: 800 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex items-start gap-4 p-5 sm:p-6 rounded-2xl bg-[#FFF7F3] border border-[#FFD9C6]">
        <div className="w-10 h-10 rounded-xl bg-[#FFEDE0] border border-[#FFC8A9] flex items-center justify-center shrink-0 text-[#EA580C]">
          <Building className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-[#183B35]">
            Enter your plot & built-up area
          </h3>
          <p className="text-xs sm:text-sm text-[#52655E] mt-0.5">
            Provide both your plot size and the construction area per floor.
          </p>
        </div>
      </div>

      {/* 1. PLOT AREA */}
      <div className="space-y-3">
        <label
          htmlFor="plot-area-input"
          className="text-xs font-bold uppercase tracking-wider text-[#183B35] block"
        >
          Plot Area (Sq. Ft) <span className="text-[#EA580C]">*</span>
        </label>
        <div className="relative">
          <input
            id="plot-area-input"
            type="number"
            min="300"
            max="50000"
            step="50"
            value={plotArea || ""}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              setPlotArea(isNaN(val) ? 0 : Math.max(0, val));
            }}
            placeholder="e.g. 1200"
            className="w-full h-14 px-5 rounded-2xl border border-[#D9D2C5] bg-[#FBF9F4] text-[#183B35] font-semibold text-lg sm:text-xl focus:border-[#EA580C] focus:bg-white focus:outline-none transition-all shadow-sm"
          />
          <span className="absolute right-5 top-1/2 -translate-y-1/2 text-xs font-bold uppercase tracking-wider text-[#8C9C96]">
            sq.ft
          </span>
        </div>

        {/* Quick presets */}
        <div className="flex flex-wrap gap-2 pt-1">
          {plotPresets.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPlotArea(p)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                plotArea === p
                  ? "bg-[#183B35] text-[#F4F0E8] border-[#183B35] shadow-sm"
                  : "bg-[#FBF9F4] text-[#52655E] border-[#D9D2C5] hover:bg-[#E9E4D9] hover:text-[#183B35]"
              }`}
            >
              {p.toLocaleString()} sqft
            </button>
          ))}
        </div>

        {/* Real-time conversion row */}
        <div className="grid grid-cols-3 gap-2 p-3.5 rounded-2xl bg-[#F8F6F0] border border-[#E9E4DA] text-center">
          <div>
            <span className="block font-bold text-sm sm:text-base text-[#183B35]">
              {plotArea ? plotArea.toLocaleString() : "—"}
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#8C9C96]">
              Sq. Feet
            </span>
          </div>
          <div className="border-x border-[#D9D2C5]/60">
            <span className="block font-bold text-sm sm:text-base text-[#183B35]">
              {plotArea ? plotSqYards : "—"}
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#8C9C96]">
              Sq. Yards
            </span>
          </div>
          <div>
            <span className="block font-bold text-sm sm:text-base text-[#183B35]">
              {plotArea ? plotCents : "—"}
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#8C9C96]">
              Cents
            </span>
          </div>
        </div>
      </div>

      <div className="relative py-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#D9D2C5]/70" />
        </div>
        <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold">
          <span className="bg-[#FBF9F4] px-4 text-[#8C9C96]">Built-up Area</span>
        </div>
      </div>

      {/* 2. BUILT-UP AREA PER FLOOR */}
      <div className="space-y-3">
        <label
          htmlFor="builtup-area-input"
          className="text-xs font-bold uppercase tracking-wider text-[#183B35] block"
        >
          Built-Up Area Per Floor (Sq. Ft) <span className="text-[#EA580C]">*</span>
        </label>
        <div className="relative">
          <input
            id="builtup-area-input"
            type="number"
            min="300"
            max="30000"
            step="50"
            value={builtUpPerFloor || ""}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              setBuiltUpPerFloor(isNaN(val) ? 0 : Math.max(0, val));
            }}
            placeholder="e.g. 1000"
            className="w-full h-14 px-5 rounded-2xl border border-[#D9D2C5] bg-[#FBF9F4] text-[#183B35] font-semibold text-lg sm:text-xl focus:border-[#EA580C] focus:bg-white focus:outline-none transition-all shadow-sm"
          />
          <span className="absolute right-5 top-1/2 -translate-y-1/2 text-xs font-bold uppercase tracking-wider text-[#8C9C96]">
            sq.ft / floor
          </span>
        </div>

        {/* Quick presets */}
        <div className="flex flex-wrap gap-2 pt-1">
          {builtUpPresets.map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => setBuiltUpPerFloor(b)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                builtUpPerFloor === b
                  ? "bg-[#183B35] text-[#F4F0E8] border-[#183B35] shadow-sm"
                  : "bg-[#FBF9F4] text-[#52655E] border-[#D9D2C5] hover:bg-[#E9E4D9] hover:text-[#183B35]"
              }`}
            >
              {b.toLocaleString()} sqft
            </button>
          ))}
        </div>

        {/* Conversion & FAR Compliance pill */}
        <div className="space-y-2">
          <div className="grid grid-cols-3 gap-2 p-3.5 rounded-2xl bg-[#F8F6F0] border border-[#E9E4DA] text-center">
            <div>
              <span className="block font-bold text-sm sm:text-base text-[#183B35]">
                {builtUpPerFloor ? builtUpPerFloor.toLocaleString() : "—"}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#8C9C96]">
                Sq. Feet
              </span>
            </div>
            <div className="border-x border-[#D9D2C5]/60">
              <span className="block font-bold text-sm sm:text-base text-[#183B35]">
                {builtUpPerFloor ? builtUpSqYards : "—"}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#8C9C96]">
                Sq. Yards
              </span>
            </div>
            <div>
              <span className="block font-bold text-sm sm:text-base text-[#183B35]">
                {builtUpPerFloor ? builtUpCents : "—"}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#8C9C96]">
                Cents
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-[#FFF7F3] border border-[#FFD9C6] text-xs font-semibold text-[#183B35]">
            <span className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#EA580C]" /> Floor Area Ratio (FAR):{" "}
              <strong className="text-[#EA580C]">{far}</strong>
            </span>
            <span>
              Ground Coverage: <strong className="text-[#EA580C]">{coveragePercent}%</strong>
            </span>
          </div>
        </div>
      </div>

      <div className="relative py-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#D9D2C5]/70" />
        </div>
        <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold">
          <span className="bg-[#FBF9F4] px-4 text-[#8C9C96]">Car Parking Area (Optional)</span>
        </div>
      </div>

      {/* 3. CAR PARKING AREA */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label
            htmlFor="parking-area-input"
            className="text-xs font-bold uppercase tracking-wider text-[#183B35] flex items-center gap-1.5"
          >
            <Car className="w-4 h-4 text-[#EA580C]" />
            <span>Car Parking Area (Sq. Ft)</span>
          </label>
          <span className="text-xs font-semibold text-[#EA580C]">
            ₹{selectedPackage.ratePerSqft.toLocaleString()}/sqft ({selectedPackage.name})
          </span>
        </div>

        <div className="relative">
          <input
            id="parking-area-input"
            type="number"
            min="0"
            max="3000"
            step="50"
            value={carParkingArea || ""}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              setCarParkingArea(isNaN(val) ? 0 : Math.max(0, val));
            }}
            placeholder="Optional, min 200 sqft"
            className="w-full h-14 px-5 rounded-2xl border border-[#D9D2C5] bg-[#FBF9F4] text-[#183B35] font-semibold text-lg sm:text-xl focus:border-[#EA580C] focus:bg-white focus:outline-none transition-all shadow-sm"
          />
          <span className="absolute right-5 top-1/2 -translate-y-1/2 text-xs font-bold uppercase tracking-wider text-[#8C9C96]">
            sq.ft
          </span>
        </div>

        {/* Parking presets */}
        <div className="flex flex-wrap gap-2 pt-1">
          {parkingPresets.map((pk) => (
            <button
              key={pk.sqft}
              type="button"
              onClick={() => setCarParkingArea(carParkingArea === pk.sqft ? 0 : pk.sqft)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                carParkingArea === pk.sqft
                  ? "bg-[#EA580C] text-white border-[#EA580C] shadow-sm"
                  : "bg-[#FBF9F4] text-[#52655E] border-[#D9D2C5] hover:bg-[#E9E4D9]"
              }`}
            >
              {pk.label}
            </button>
          ))}
        </div>

        {/* Parking breakdown row */}
        {carParkingArea > 0 && (
          <div className="grid grid-cols-3 gap-2 p-3.5 rounded-2xl bg-[#F8F6F0] border border-[#E9E4DA] text-center">
            <div>
              <span className="block font-bold text-sm sm:text-base text-[#183B35]">
                {carParkingArea.toLocaleString()}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#8C9C96]">
                Sq. Feet
              </span>
            </div>
            <div className="border-x border-[#D9D2C5]/60">
              <span className="block font-bold text-sm sm:text-base text-[#183B35]">
                ~{carCount} {carCount === 1 ? "Car" : "Cars"}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#8C9C96]">
                Capacity
              </span>
            </div>
            <div>
              <span className="block font-bold text-sm sm:text-base text-[#EA580C]">
                ₹{carParkingCost.toLocaleString()}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#8C9C96]">
                Est. Cost
              </span>
            </div>
          </div>
        )}

        <div className="p-3.5 rounded-xl bg-[#F0F9FF] border border-[#BAE6FD] text-[11px] text-[#0369A1] leading-relaxed">
          ℹ️ <strong>Minimum single car bay = 200 sqft</strong>. Leave blank if no parking is needed. Parking rate automatically updates based on your selected specification tier in Step 3.
        </div>
      </div>

      {/* Navigation Actions */}
      <div className="pt-4 border-t border-[#D9D2C5]/70 flex justify-end">
        <button
          type="button"
          onClick={onNext}
          className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-base shadow-luxury-sm hover:shadow-luxury-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
        >
          <span>Next — Choose Floors</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
