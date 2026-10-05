"use client";

import React from "react";
import { ArrowLeft, ArrowRight, Layers, Clock } from "lucide-react";

export interface StepFloorsProps {
  floors: number;
  setFloors: (val: number) => void;
  builtUpPerFloor: number;
  onNext: () => void;
  onBack: () => void;
}

export function StepFloors({
  floors,
  setFloors,
  builtUpPerFloor,
  onNext,
  onBack,
}: StepFloorsProps) {
  const floorOptions = [
    {
      id: 1,
      name: "Ground Only",
      shortLabel: "G",
      subLabel: "1 Floor Total",
      durationMonths: 12,
      svg: (
        <svg width="72" height="64" viewBox="0 0 72 64" fill="none" aria-hidden="true">
          <ellipse cx="36" cy="62" rx="28" ry="2.5" fill="#EA580C" opacity=".1" />
          <line x1="4" y1="58" x2="68" y2="58" stroke="#E2E8F0" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="8" y="34" width="56" height="24" rx="1" fill="#FFF7F3" stroke="#EA580C" strokeWidth="1.8" />
          <path d="M4 34 L36 14 L68 34 Z" fill="#FFEDE0" stroke="#EA580C" strokeWidth="1.8" strokeLinejoin="round" />
          <line x1="36" y1="14" x2="36" y2="18" stroke="#EA580C" strokeWidth="1.2" opacity=".5" />
          <rect x="50" y="10" width="6" height="10" rx="1" fill="#FFEDE0" stroke="#EA580C" strokeWidth="1.5" />
          <rect x="13" y="40" width="14" height="11" rx="2" fill="#BAE6FD" stroke="#EA580C" strokeWidth="1.4" />
          <line x1="20" y1="40" x2="20" y2="51" stroke="#EA580C" strokeWidth="1" opacity=".5" />
          <line x1="13" y1="45.5" x2="27" y2="45.5" stroke="#EA580C" strokeWidth="1" opacity=".5" />
          <rect x="31" y="43" width="10" height="15" rx="1.5" fill="#FDBA74" stroke="#EA580C" strokeWidth="1.4" />
          <circle cx="38.5" cy="51" r="1.2" fill="#EA580C" />
          <rect x="45" y="40" width="14" height="11" rx="2" fill="#BAE6FD" stroke="#EA580C" strokeWidth="1.4" />
          <line x1="52" y1="40" x2="52" y2="51" stroke="#EA580C" strokeWidth="1" opacity=".5" />
          <line x1="45" y1="45.5" x2="59" y2="45.5" stroke="#EA580C" strokeWidth="1" opacity=".5" />
          <rect x="27" y="34" width="18" height="5" rx="1" fill="#EA580C" opacity=".12" />
          <text x="36" y="38" textAnchor="middle" fontSize="4.2" fontWeight="800" fill="#EA580C" fontFamily="sans-serif" opacity=".8">
            G
          </text>
        </svg>
      ),
    },
    {
      id: 2,
      name: "G + 1",
      shortLabel: "G+1",
      subLabel: "2 Floors Total",
      durationMonths: 16,
      svg: (
        <svg width="72" height="64" viewBox="0 0 72 64" fill="none" aria-hidden="true">
          <ellipse cx="36" cy="62" rx="26" ry="2.2" fill="#EA580C" opacity=".1" />
          <line x1="5" y1="58" x2="67" y2="58" stroke="#E2E8F0" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="9" y="40" width="54" height="18" fill="#FFF7F3" stroke="#EA580C" strokeWidth="1.8" rx="1" />
          <rect x="9" y="38" width="54" height="4" rx="1" fill="#FFEDE0" stroke="#EA580C" strokeWidth="1.5" />
          <rect x="9" y="20" width="54" height="18" fill="#FFF7F3" stroke="#EA580C" strokeWidth="1.8" rx="1" />
          <rect x="7" y="14" width="58" height="7" rx="2" fill="#FFEDE0" stroke="#EA580C" strokeWidth="1.8" />
          <circle cx="16" cy="17.5" r="1.3" fill="#EA580C" opacity=".4" />
          <circle cx="24" cy="17.5" r="1.3" fill="#EA580C" opacity=".4" />
          <circle cx="32" cy="17.5" r="1.3" fill="#EA580C" opacity=".4" />
          <circle cx="40" cy="17.5" r="1.3" fill="#EA580C" opacity=".4" />
          <circle cx="48" cy="17.5" r="1.3" fill="#EA580C" opacity=".4" />
          <circle cx="56" cy="17.5" r="1.3" fill="#EA580C" opacity=".4" />
          <rect x="13" y="44" width="12" height="9" rx="1.5" fill="#BAE6FD" stroke="#EA580C" strokeWidth="1.3" />
          <line x1="19" y1="44" x2="19" y2="53" stroke="#EA580C" strokeWidth=".9" opacity=".5" />
          <rect x="30" y="44" width="12" height="14" rx="1.5" fill="#FDBA74" stroke="#EA580C" strokeWidth="1.3" />
          <circle cx="39" cy="52" r="1.1" fill="#EA580C" />
          <rect x="47" y="44" width="12" height="9" rx="1.5" fill="#BAE6FD" stroke="#EA580C" strokeWidth="1.3" />
          <line x1="53" y1="44" x2="53" y2="53" stroke="#EA580C" strokeWidth=".9" opacity=".5" />
          <rect x="13" y="24" width="12" height="9" rx="1.5" fill="#BAE6FD" stroke="#EA580C" strokeWidth="1.3" />
          <line x1="19" y1="24" x2="19" y2="33" stroke="#EA580C" strokeWidth=".9" opacity=".5" />
          <rect x="30" y="24" width="12" height="9" rx="1.5" fill="#BAE6FD" stroke="#EA580C" strokeWidth="1.3" />
          <line x1="36" y1="24" x2="36" y2="33" stroke="#EA580C" strokeWidth=".9" opacity=".5" />
          <rect x="47" y="24" width="12" height="9" rx="1.5" fill="#BAE6FD" stroke="#EA580C" strokeWidth="1.3" />
          <line x1="53" y1="24" x2="53" y2="33" stroke="#EA580C" strokeWidth=".9" opacity=".5" />
          <text x="36" y="50.5" textAnchor="middle" fontSize="3.8" fontWeight="800" fill="#EA580C" fontFamily="sans-serif" opacity=".6">
            G
          </text>
          <text x="36" y="32" textAnchor="middle" fontSize="3.8" fontWeight="800" fill="#EA580C" fontFamily="sans-serif" opacity=".6">
            1
          </text>
        </svg>
      ),
    },
    {
      id: 3,
      name: "G + 2",
      shortLabel: "G+2",
      subLabel: "3 Floors Total",
      durationMonths: 20,
      svg: (
        <svg width="72" height="64" viewBox="0 0 72 64" fill="none" aria-hidden="true">
          <ellipse cx="36" cy="62" rx="25" ry="2.2" fill="#EA580C" opacity=".1" />
          <line x1="5" y1="58" x2="67" y2="58" stroke="#E2E8F0" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="10" y="46" width="52" height="12" fill="#FFF7F3" stroke="#EA580C" strokeWidth="1.7" rx="1" />
          <rect x="10" y="43.5" width="52" height="3.5" rx="1" fill="#FFEDE0" stroke="#EA580C" strokeWidth="1.4" />
          <rect x="10" y="31" width="52" height="12" fill="#FFF7F3" stroke="#EA580C" strokeWidth="1.7" rx="1" />
          <rect x="10" y="28.5" width="52" height="3.5" rx="1" fill="#FFEDE0" stroke="#EA580C" strokeWidth="1.4" />
          <rect x="10" y="16" width="52" height="12" fill="#FFF7F3" stroke="#EA580C" strokeWidth="1.7" rx="1" />
          <rect x="8" y="10" width="56" height="7" rx="2" fill="#FFEDE0" stroke="#EA580C" strokeWidth="1.7" />
          <rect x="44" y="4" width="14" height="7" rx="2" fill="#BFDBFE" stroke="#EA580C" strokeWidth="1.4" />
          <line x1="47" y1="11" x2="47" y2="14" stroke="#EA580C" strokeWidth="1.2" opacity=".6" />
          <line x1="55" y1="11" x2="55" y2="14" stroke="#EA580C" strokeWidth="1.2" opacity=".6" />
          <rect x="14" y="49" width="9" height="7" rx="1.2" fill="#BAE6FD" stroke="#EA580C" strokeWidth="1.2" />
          <rect x="32" y="48" width="8" height="10" rx="1.2" fill="#FDBA74" stroke="#EA580C" strokeWidth="1.2" />
          <circle cx="38" cy="53.5" r="1" fill="#EA580C" />
          <rect x="49" y="49" width="9" height="7" rx="1.2" fill="#BAE6FD" stroke="#EA580C" strokeWidth="1.2" />
          <rect x="14" y="34" width="9" height="7" rx="1.2" fill="#BAE6FD" stroke="#EA580C" strokeWidth="1.2" />
          <rect x="32" y="34" width="8" height="7" rx="1.2" fill="#BAE6FD" stroke="#EA580C" strokeWidth="1.2" />
          <rect x="49" y="34" width="9" height="7" rx="1.2" fill="#BAE6FD" stroke="#EA580C" strokeWidth="1.2" />
          <rect x="14" y="19" width="9" height="7" rx="1.2" fill="#BAE6FD" stroke="#EA580C" strokeWidth="1.2" />
          <rect x="32" y="19" width="8" height="7" rx="1.2" fill="#BAE6FD" stroke="#EA580C" strokeWidth="1.2" />
          <rect x="49" y="19" width="9" height="7" rx="1.2" fill="#BAE6FD" stroke="#EA580C" strokeWidth="1.2" />
          <text x="36" y="54.5" textAnchor="middle" fontSize="3.6" fontWeight="800" fill="#EA580C" fontFamily="sans-serif" opacity=".55">
            G
          </text>
          <text x="36" y="39.5" textAnchor="middle" fontSize="3.6" fontWeight="800" fill="#EA580C" fontFamily="sans-serif" opacity=".55">
            1
          </text>
          <text x="36" y="24.5" textAnchor="middle" fontSize="3.6" fontWeight="800" fill="#EA580C" fontFamily="sans-serif" opacity=".55">
            2
          </text>
        </svg>
      ),
    },
    {
      id: 4,
      name: "G + 3",
      shortLabel: "G+3",
      subLabel: "4 Floors Total",
      durationMonths: 24,
      svg: (
        <svg width="72" height="64" viewBox="0 0 72 64" fill="none" aria-hidden="true">
          <ellipse cx="36" cy="62" rx="24" ry="2.2" fill="#EA580C" opacity=".1" />
          <line x1="5" y1="58" x2="67" y2="58" stroke="#E2E8F0" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="11" y="49" width="50" height="9" fill="#FFF7F3" stroke="#EA580C" strokeWidth="1.6" rx="1" />
          <rect x="11" y="47" width="50" height="3" rx="1" fill="#FFEDE0" stroke="#EA580C" strokeWidth="1.3" />
          <rect x="11" y="38" width="50" height="9" fill="#FFF7F3" stroke="#EA580C" strokeWidth="1.6" rx="1" />
          <rect x="11" y="36" width="50" height="3" rx="1" fill="#FFEDE0" stroke="#EA580C" strokeWidth="1.3" />
          <rect x="11" y="27" width="50" height="9" fill="#FFF7F3" stroke="#EA580C" strokeWidth="1.6" rx="1" />
          <rect x="11" y="25" width="50" height="3" rx="1" fill="#FFEDE0" stroke="#EA580C" strokeWidth="1.3" />
          <rect x="11" y="16" width="50" height="9" fill="#FFF7F3" stroke="#EA580C" strokeWidth="1.6" rx="1" />
          <rect x="9" y="10" width="54" height="7" rx="2" fill="#FFEDE0" stroke="#EA580C" strokeWidth="1.6" />
          <rect x="13" y="4" width="10" height="6" rx="1" fill="#BAE6FD" stroke="#EA580C" strokeWidth="1.2" transform="skewX(-5)" />
          <line x1="13" y1="7" x2="23" y2="7" stroke="#EA580C" strokeWidth=".8" opacity=".5" transform="skewX(-5)" />
          <rect x="26" y="4" width="10" height="6" rx="1" fill="#BAE6FD" stroke="#EA580C" strokeWidth="1.2" transform="skewX(-5)" />
          <line x1="26" y1="7" x2="36" y2="7" stroke="#EA580C" strokeWidth=".8" opacity=".5" transform="skewX(-5)" />
          <rect x="15" y="51" width="8" height="6" rx="1" fill="#BAE6FD" stroke="#EA580C" strokeWidth="1.1" />
          <rect x="32" y="50" width="8" height="8" rx="1" fill="#FDBA74" stroke="#EA580C" strokeWidth="1.1" />
          <circle cx="38" cy="54.5" r=".9" fill="#EA580C" />
          <rect x="49" y="51" width="8" height="6" rx="1" fill="#BAE6FD" stroke="#EA580C" strokeWidth="1.1" />
          <rect x="15" y="40" width="8" height="5.5" rx="1" fill="#BAE6FD" stroke="#EA580C" strokeWidth="1.1" />
          <rect x="32" y="40" width="8" height="5.5" rx="1" fill="#BAE6FD" stroke="#EA580C" strokeWidth="1.1" />
          <rect x="49" y="40" width="8" height="5.5" rx="1" fill="#BAE6FD" stroke="#EA580C" strokeWidth="1.1" />
          <rect x="15" y="29" width="8" height="5.5" rx="1" fill="#BAE6FD" stroke="#EA580C" strokeWidth="1.1" />
          <rect x="32" y="29" width="8" height="5.5" rx="1" fill="#BAE6FD" stroke="#EA580C" strokeWidth="1.1" />
          <rect x="49" y="29" width="8" height="5.5" rx="1" fill="#BAE6FD" stroke="#EA580C" strokeWidth="1.1" />
          <rect x="15" y="18" width="8" height="5.5" rx="1" fill="#BAE6FD" stroke="#EA580C" strokeWidth="1.1" />
          <rect x="32" y="18" width="8" height="5.5" rx="1" fill="#BAE6FD" stroke="#EA580C" strokeWidth="1.1" />
          <rect x="49" y="18" width="8" height="5.5" rx="1" fill="#BAE6FD" stroke="#EA580C" strokeWidth="1.1" />
          <line x1="11" y1="36" x2="61" y2="36" stroke="#EA580C" strokeWidth=".8" opacity=".35" />
          <line x1="15" y1="33" x2="15" y2="36" stroke="#EA580C" strokeWidth=".8" opacity=".35" />
          <line x1="22" y1="33" x2="22" y2="36" stroke="#EA580C" strokeWidth=".8" opacity=".35" />
          <line x1="29" y1="33" x2="29" y2="36" stroke="#EA580C" strokeWidth=".8" opacity=".35" />
          <line x1="43" y1="33" x2="43" y2="36" stroke="#EA580C" strokeWidth=".8" opacity=".35" />
          <line x1="50" y1="33" x2="50" y2="36" stroke="#EA580C" strokeWidth=".8" opacity=".35" />
          <line x1="57" y1="33" x2="57" y2="36" stroke="#EA580C" strokeWidth=".8" opacity=".35" />
          <text x="36" y="56" textAnchor="middle" fontSize="3.4" fontWeight="800" fill="#EA580C" fontFamily="sans-serif" opacity=".5">
            G
          </text>
          <text x="36" y="45.5" textAnchor="middle" fontSize="3.4" fontWeight="800" fill="#EA580C" fontFamily="sans-serif" opacity=".5">
            1
          </text>
          <text x="36" y="34.5" textAnchor="middle" fontSize="3.4" fontWeight="800" fill="#EA580C" fontFamily="sans-serif" opacity=".5">
            2
          </text>
          <text x="36" y="23.5" textAnchor="middle" fontSize="3.4" fontWeight="800" fill="#EA580C" fontFamily="sans-serif" opacity=".5">
            3
          </text>
        </svg>
      ),
    },
  ];

  const currentOption = floorOptions.find((f) => f.id === floors) || floorOptions[1];
  const totalFloorArea = builtUpPerFloor * floors;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex items-start gap-4 p-5 sm:p-6 rounded-2xl bg-[#FFF7F3] border border-[#FFD9C6]">
        <div className="w-10 h-10 rounded-xl bg-[#FFEDE0] border border-[#FFC8A9] flex items-center justify-center shrink-0 text-[#EA580C]">
          <Layers className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-[#183B35]">
            How many floors will you build?
          </h3>
          <p className="text-xs sm:text-sm text-[#52655E] mt-0.5">
            Each additional floor adds roughly 4 months to the construction timeline for slab curing and structural strength.
          </p>
        </div>
      </div>

      {/* Dynamic Selected Building Preview Box */}
      <div className="rounded-3xl bg-[#F8F6F0] border border-[#E9E4DA] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center justify-center bg-[#FFF7F3] rounded-2xl p-4 border border-[#FFD9C6]/80 shrink-0">
          <div className="scale-125">{currentOption.svg}</div>
        </div>

        <div className="flex-1 text-center sm:text-left space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EA580C]/10 text-xs font-bold uppercase tracking-wider text-[#EA580C]">
            <span>SELECTED CONFIGURATION</span>
          </div>

          <div className="flex items-baseline gap-3 justify-center sm:justify-start">
            <span className="font-display text-4xl sm:text-5xl font-bold text-[#EA580C]">
              {currentOption.shortLabel}
            </span>
            <span className="text-lg font-semibold text-[#183B35]">
              {currentOption.name} ({currentOption.id} {currentOption.id === 1 ? "Floor" : "Floors"})
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3 justify-center sm:justify-start pt-1 text-xs text-[#52655E]">
            <span className="px-3 py-1 rounded-lg bg-white border border-[#D9D2C5] font-semibold text-[#183B35]">
              Total Built-up: {totalFloorArea.toLocaleString()} sq.ft
            </span>
            <span className="px-3 py-1 rounded-lg bg-[#DCFCE7] border border-[#86EFAC] font-semibold text-[#15803D] flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> ~{currentOption.durationMonths} months est.
            </span>
          </div>
        </div>
      </div>

      {/* Floor Selection Grid (4 cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {floorOptions.map((opt) => {
          const isSelected = floors === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => setFloors(opt.id)}
              className={`p-4 sm:p-5 rounded-2xl flex flex-col items-center text-center transition-all cursor-pointer ${
                isSelected
                  ? "bg-[#FFF7F3] border-2 border-[#EA580C] shadow-luxury-md ring-2 ring-[#EA580C]/30 -translate-y-1"
                  : "bg-[#FBF9F4] border border-[#D9D2C5] hover:bg-[#E9E4D9] hover:border-[#8C9C96]"
              }`}
            >
              <div className="h-16 flex items-center justify-center mb-2 scale-90">{opt.svg}</div>
              <span className="font-display text-lg font-bold text-[#183B35] mt-1">{opt.name}</span>
              <span className="text-[11px] font-semibold text-[#8C9C96]">{opt.id} {opt.id === 1 ? "Floor" : "Floors"}</span>
            </button>
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
          <span>Next — Select Package</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
