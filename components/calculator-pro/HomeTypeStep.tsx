"use client";

import React, { useState } from "react";
import {
  Home,
  Building,
  Crown,
  Car,
  Clock,
  CheckCircle2,
  ChevronRight,
  Sliders,
  Sparkles,
} from "lucide-react";

interface HomeTypeStepProps {
  plotArea: number;
  floors: number;
  bhk?: number;
  homeType?: string;
  isAutoBuiltUp: boolean;
  customBuiltUpPerFloor?: number;
  carParkingArea: number;
  onSelectHomeType: (type: "independent_house" | "duplex" | "villa", bhk: number, suggestedFloors: number) => void;
  onSelectFloors: (floors: number) => void;
  onToggleAutoBuiltUp: (isAuto: boolean, customArea?: number) => void;
  onSelectParking: (parkingSqft: number) => void;
  onNext: () => void;
}

interface HomeCardConfig {
  id: string;
  type: "independent_house" | "duplex" | "villa";
  bhk: number;
  title: string;
  subtitle: string;
  suggestedFloors: number;
  description: string;
  badge?: string;
  icon: React.ElementType;
}

const HOME_CARDS: HomeCardConfig[] = [
  {
    id: "2bhk",
    type: "independent_house",
    bhk: 2,
    title: "2BHK Home",
    subtitle: "Compact & Cost-Effective",
    suggestedFloors: 1,
    description: "Living, kitchen, 2 bedrooms & 2 baths. Perfect for compact city plots.",
    icon: Home,
  },
  {
    id: "3bhk_duplex",
    type: "duplex",
    bhk: 3,
    title: "3BHK Duplex",
    subtitle: "Most Popular in Chennai",
    suggestedFloors: 2,
    description: "Ground floor living & guest room, upper master suites + family lounge.",
    badge: "★ MOST POPULAR",
    icon: Building,
  },
  {
    id: "4bhk_duplex",
    type: "duplex",
    bhk: 4,
    title: "4BHK Duplex",
    subtitle: "Spacious Multi-Generation",
    suggestedFloors: 2,
    description: "Generous bedrooms with attached baths, walk-in closets & open terrace.",
    icon: Building,
  },
  {
    id: "luxury_villa",
    type: "villa",
    bhk: 4,
    title: "Luxury Villa",
    subtitle: "Grand Turnkey Living",
    suggestedFloors: 2,
    description: "Double-height entrance foyer, Italian stone facade accents & viewing decks.",
    badge: "ULTRA PREMIUM",
    icon: Crown,
  },
];

export function HomeTypeStep({
  plotArea,
  floors,
  bhk = 3,
  homeType = "duplex",
  isAutoBuiltUp,
  customBuiltUpPerFloor = 900,
  carParkingArea,
  onSelectHomeType,
  onSelectFloors,
  onToggleAutoBuiltUp,
  onSelectParking,
  onNext,
}: HomeTypeStepProps) {
  const [showAdjustArea, setShowAdjustArea] = useState(!isAutoBuiltUp);

  const calculatedFloorArea = isAutoBuiltUp
    ? Math.round(plotArea * 0.75)
    : customBuiltUpPerFloor;
  const totalLivingArea = calculatedFloorArea * floors;
  const totalBuiltUp = totalLivingArea + carParkingArea;

  const floorOptions = [
    { id: 1, name: "Ground Only", label: "1 Floor", duration: "10–12 mo" },
    { id: 2, name: "G + 1", label: "2 Floors Total", duration: "14–16 mo" },
    { id: 3, name: "G + 2", label: "3 Floors Total", duration: "18–20 mo" },
    { id: 4, name: "G + 3", label: "4 Floors Total", duration: "22–24 mo" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Title & Subtitle */}
      <div className="space-y-1">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#183B35]">
          What are you planning to build?
        </h2>
        <p className="text-xs sm:text-sm text-[#52655E]">
          Choose your home layout configuration and vertical floors.
        </p>
      </div>

      {/* 1. Home Type Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {HOME_CARDS.map((card) => {
          const Icon = card.icon;
          const isSelected = bhk === card.bhk && homeType === card.type;

          return (
            <button
              key={card.id}
              type="button"
              onClick={() => onSelectHomeType(card.type, card.bhk, card.suggestedFloors)}
              className={`p-4 sm:p-5 rounded-3xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? "bg-[#FFF7F3] border-2 border-[#EA580C] shadow-luxury-sm ring-1 ring-[#EA580C]"
                  : "bg-white border-[#D9D2C5] hover:border-[#183B35] hover:bg-[#FAF8F5]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                        isSelected
                          ? "bg-[#EA580C] text-white"
                          : "bg-[#F4F0E8] text-[#183B35]"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-display text-lg sm:text-xl font-bold text-[#183B35]">
                      {card.title}
                    </span>
                  </div>

                  {isSelected ? (
                    <CheckCircle2 className="w-5 h-5 text-[#EA580C]" />
                  ) : card.badge ? (
                    <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-[#EA580C]/10 text-[#EA580C] uppercase tracking-wider">
                      {card.badge}
                    </span>
                  ) : null}
                </div>

                <p className="text-xs text-[#52655E] mt-2 leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-[#D9D2C5]/60 flex items-center justify-between text-xs font-semibold text-[#8C9C96]">
                <span>Recommended: {card.suggestedFloors === 1 ? "Ground Only" : `G+${card.suggestedFloors - 1}`}</span>
                <span className="text-[#183B35]">~{Math.round(plotArea * 0.75 * card.suggestedFloors)} sqft</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* 2. Floor Selection */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#D9D2C5] space-y-3 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[#183B35]">
            Number of Floors
          </span>
          <span className="text-xs font-bold text-[#15803D] flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {floorOptions.find((f) => f.id === floors)?.duration}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {floorOptions.map((fl) => {
            const isFlSelected = floors === fl.id;
            return (
              <button
                key={fl.id}
                type="button"
                onClick={() => onSelectFloors(fl.id)}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col justify-between ${
                  isFlSelected
                    ? "bg-[#FFF7F3] border-2 border-[#EA580C] shadow-sm font-bold text-[#183B35]"
                    : "bg-[#FBF9F4] text-[#52655E] border-[#D9D2C5] hover:bg-[#E9E4D9]"
                }`}
              >
                <div>
                  <span className="font-display text-base sm:text-lg font-bold block">
                    {fl.name}
                  </span>
                  <span className="text-[10px] text-[#8C9C96] block mt-0.5">
                    {fl.label}
                  </span>
                </div>
                <span className="text-[9px] font-extrabold uppercase mt-1.5 text-[#EA580C] bg-white px-1.5 py-0.5 rounded border border-[#FFD9C6]">
                  {fl.duration}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Built-up Area & Optional Adjustment */}
      <div className="p-4 sm:p-5 rounded-3xl bg-[#FBF9F4] border border-[#D9D2C5] space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#183B35] block">
              Estimated Built-up Area
            </span>
            <span className="font-display text-lg sm:text-xl font-bold text-[#183B35]">
              {totalBuiltUp.toLocaleString()} sq.ft{" "}
              <span className="text-xs font-normal text-[#52655E]">
                ({calculatedFloorArea.toLocaleString()} sqft/floor × {floors} fl + {carParkingArea} parking)
              </span>
            </span>
          </div>

          <button
            type="button"
            onClick={() => setShowAdjustArea(!showAdjustArea)}
            className="px-3 py-1.5 rounded-xl border border-[#D9D2C5] bg-white text-xs font-bold text-[#EA580C] hover:bg-[#FFF7F3] transition-all cursor-pointer flex items-center gap-1 shadow-sm"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>{showAdjustArea ? "Done" : "Adjust"}</span>
          </button>
        </div>

        {showAdjustArea && (
          <div className="pt-2 border-t border-[#D9D2C5]/70 space-y-3 animate-in fade-in duration-150">
            <div className="flex items-center justify-between text-xs text-[#52655E]">
              <span>Coverage Mode:</span>
              <div className="flex bg-white p-0.5 rounded-xl border border-[#D9D2C5]">
                <button
                  type="button"
                  onClick={() => onToggleAutoBuiltUp(true)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    isAutoBuiltUp ? "bg-[#EA580C] text-white" : "text-[#52655E]"
                  }`}
                >
                  Auto 75% Coverage
                </button>
                <button
                  type="button"
                  onClick={() => onToggleAutoBuiltUp(false, calculatedFloorArea)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    !isAutoBuiltUp ? "bg-[#183B35] text-white" : "text-[#52655E]"
                  }`}
                >
                  Custom Area
                </button>
              </div>
            </div>

            {!isAutoBuiltUp && (
              <div>
                <label className="text-[11px] font-bold text-[#8C9C96] uppercase block mb-1">
                  Custom Floor Area (Sq.Ft / Floor)
                </label>
                <input
                  type="number"
                  min="200"
                  max="20000"
                  value={calculatedFloorArea}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10);
                    onToggleAutoBuiltUp(false, isNaN(val) ? 0 : val);
                  }}
                  className="w-full h-12 px-4 rounded-2xl border border-[#D9D2C5] bg-white font-bold text-[#183B35] focus:outline-none focus:border-[#EA580C]"
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* 4. Car Parking */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#D9D2C5] space-y-3 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[#183B35] flex items-center gap-1.5">
            <Car className="w-4 h-4 text-[#EA580C]" /> Car Parking Space
          </span>
          <span className="text-xs font-semibold text-[#EA580C]">
            {carParkingArea > 0 ? `${carParkingArea} sq.ft` : "No car parking"}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { label: "None", sqft: 0 },
            { label: "1 Car (200 sqft)", sqft: 200 },
            { label: "2 Cars (400 sqft)", sqft: 400 },
            { label: "3 Cars (600 sqft)", sqft: 600 },
          ].map((pk) => (
            <button
              key={pk.sqft}
              type="button"
              onClick={() => onSelectParking(pk.sqft)}
              className={`py-2.5 px-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                carParkingArea === pk.sqft
                  ? "bg-[#EA580C] text-white border-[#EA580C] shadow-sm font-bold"
                  : "bg-[#FBF9F4] text-[#52655E] border-[#D9D2C5] hover:bg-[#E9E4D9]"
              }`}
            >
              {pk.label}
            </button>
          ))}
        </div>
      </div>

      {/* 5. Action Bar */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onNext}
          className="w-full py-4 px-6 rounded-2xl bg-[#183B35] hover:bg-[#0D2420] text-white font-bold text-sm sm:text-base shadow-luxury-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
        >
          <span>Next: Select Finish Package</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
