"use client";

import React, { useState } from "react";
import {
  PRO_PACKAGES,
  PRO_PHASES,
  PRO_COMPARISON_MATRIX,
  PRO_FAQS,
  PRO_ADDONS,
  ProPackageTier,
} from "@/config/calculatorPro";
import { SelectedAddonState } from "./StepExtras";
import {
  Download,
  Share2,
  Calendar,
  CheckCircle2,
  HelpCircle,
  TrendingUp,
  FileSpreadsheet,
  Building2,
  Layers,
  Sparkles,
  PhoneCall,
  Check,
  ChevronDown,
  Info,
} from "lucide-react";

export interface StepReportProps {
  plotArea: number;
  builtUpPerFloor: number;
  floors: number;
  carParkingArea: number;
  selectedPackage: ProPackageTier;
  selectedAddons: SelectedAddonState;
  onReset: () => void;
  onOpenConsultationModal: () => void;
}

export function StepReport({
  plotArea,
  builtUpPerFloor,
  floors,
  carParkingArea,
  selectedPackage,
  selectedAddons,
  onReset,
  onOpenConsultationModal,
}: StepReportProps) {
  const [copied, setCopied] = useState(false);
  const [activePhaseIndex, setActivePhaseIndex] = useState<number | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Core Calculations
  const hasHeadroom = !!selectedAddons["headroom"]?.enabled;
  const headroomArea = hasHeadroom ? 200 : 0;
  const totalLivingBuiltUp = builtUpPerFloor * floors + headroomArea;
  const totalBuiltUpArea = totalLivingBuiltUp + carParkingArea;

  const baseLivingCost = totalLivingBuiltUp * selectedPackage.ratePerSqft;
  const carParkingCost = carParkingArea * selectedPackage.ratePerSqft;
  const baseCost = baseLivingCost + carParkingCost;

  // Addons cost calculation
  const addonsCost = PRO_ADDONS.reduce((sum, addon) => {
    const state = selectedAddons[addon.id];
    if (!state?.enabled) return sum;
    if (addon.id === "headroom") return sum; // already included in base living area
    if (addon.type === "fixed") return sum + addon.rate;

    const unitCount = state.customUnit !== undefined ? state.customUnit : addon.defaultUnit || 1;
    const unitRate = addon.rate;
    return sum + unitCount * unitRate;
  }, 0);

  const grandTotal = baseCost + addonsCost;

  // Floor Duration calculation
  const baseDurationMonths = 10 + (floors - 1) * 4;

  // Loan EMI calculation (7.1% per annum, 20 years = 240 months)
  const annualInterestRate = 0.071;
  const monthlyRate = annualInterestRate / 12;
  const totalMonths = 240;
  const emi =
    grandTotal > 0
      ? Math.round(
          (grandTotal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
            (Math.pow(1 + monthlyRate, totalMonths) - 1)
        )
      : 0;

  const monthlyOutflow = Math.round(grandTotal / baseDurationMonths);

  // Floor-wise Split (Ground floor carries 20% foundation & plinth share)
  const calculateFloorSplit = () => {
    if (floors === 1) {
      return [{ name: "Ground floor", amount: baseCost, hasFoundation: true }];
    }
    // Total base living cost split across floors
    // Ground floor takes 1.2x of normal floor share
    const totalUnits = floors + 0.2;
    const baseSharePerUnit = baseCost / totalUnits;
    const groundCost = Math.round(baseSharePerUnit * 1.2);
    const upperFloorCost = Math.round(baseSharePerUnit);

    const floorList = [
      { name: "Ground floor", amount: groundCost, hasFoundation: true },
    ];
    for (let f = 1; f < floors; f++) {
      floorList.push({
        name: f === 1 ? "First floor (1st)" : f === 2 ? "Second floor (2nd)" : "Third floor (3rd)",
        amount: upperFloorCost,
        hasFoundation: false,
      });
    }
    return floorList;
  };

  const floorWiseBreakdown = calculateFloorSplit();

  // Material Estimations
  const cementMin = Math.round(totalBuiltUpArea * 0.4);
  const cementMax = Math.round(totalBuiltUpArea * 0.45);

  const steelMin = Math.round(totalBuiltUpArea * 3.5);
  const steelMax = Math.round(totalBuiltUpArea * 4.0);

  const msandMin = Math.round(totalBuiltUpArea * 1.8);
  const msandMax = Math.round(totalBuiltUpArea * 2.0);

  const aggregateMin = Math.round(totalBuiltUpArea * 1.2);
  const aggregateMax = Math.round(totalBuiltUpArea * 1.4);

  const bricksMin = Math.round(totalBuiltUpArea * 18);
  const bricksMax = Math.round(totalBuiltUpArea * 20);

  const formatLakhs = (val: number) => {
    const lk = val / 100000;
    return `₹${lk.toFixed(2)} L`;
  };

  // SVG Donut Path calculations
  const donutCenter = 150;
  const outerRadius = 142;
  const innerRadius = 84;
  let accumulatedAngle = -90; // Start at 12 o'clock

  const r = (val: number) => Number(val.toFixed(2));

  const donutSlices = PRO_PHASES.map((phase) => {
    const sliceAngle = (phase.percentShare / 100) * 360;
    const startAngle = accumulatedAngle;
    const endAngle = accumulatedAngle + sliceAngle;
    accumulatedAngle += sliceAngle;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = r(donutCenter + outerRadius * Math.cos(startRad));
    const y1 = r(donutCenter + outerRadius * Math.sin(startRad));
    const x2 = r(donutCenter + outerRadius * Math.cos(endRad));
    const y2 = r(donutCenter + outerRadius * Math.sin(endRad));

    const x3 = r(donutCenter + innerRadius * Math.cos(endRad));
    const y3 = r(donutCenter + innerRadius * Math.sin(endRad));
    const x4 = r(donutCenter + innerRadius * Math.cos(startRad));
    const y4 = r(donutCenter + innerRadius * Math.sin(startRad));

    const midAngle = startAngle + sliceAngle / 2;
    const midRad = (midAngle * Math.PI) / 180;
    const textRadius = (outerRadius + innerRadius) / 2;
    const textX = r(donutCenter + textRadius * Math.cos(midRad));
    const textY = r(donutCenter + textRadius * Math.sin(midRad));

    const pathData = `M ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 0 0 ${x4} ${y4} Z`;
    const costForPhase = Math.round((baseCost * phase.percentShare) / 100);

    return {
      phase,
      pathData,
      textX,
      textY,
      costForPhase,
    };
  });

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const activePhase = activePhaseIndex !== null ? PRO_PHASES[activePhaseIndex] : null;
  const activePhaseCost = activePhase ? Math.round((baseCost * activePhase.percentShare) / 100) : null;

  return (
    <div className="space-y-12 animate-in fade-in duration-300 print:text-black">
      {/* 1. TOP RESULT HERO CARD */}
      <div className="rounded-3xl bg-gradient-to-br from-[#183B35] to-[#0D2420] text-[#F4F0E8] p-6 sm:p-10 shadow-luxury-lg border border-[#3E5C54] relative overflow-hidden">
        {/* Background decorative ring */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#EA580C]/10 blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EA580C]/20 border border-[#EA580C]/40 text-[#EA580C] text-xs font-extrabold uppercase tracking-wider">
              <span>★</span> Chennai 2026 Turnkey Estimate
            </div>

            <div className="flex items-baseline gap-2">
              <span className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-white">
                ₹{grandTotal.toLocaleString()}
              </span>
              <span className="text-sm sm:text-base font-semibold text-[#8C9C96]">
                ({formatLakhs(grandTotal)})
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-[#D9D2C5]">
              <span className="flex items-center gap-1.5 font-semibold text-[#EA580C]">
                <Sparkles className="w-4 h-4" /> ₹{selectedPackage.ratePerSqft.toLocaleString()}/sqft ({selectedPackage.name})
              </span>
              <span>•</span>
              <span>
                <strong>{totalBuiltUpArea.toLocaleString()}</strong> sq.ft Total Built-up
              </span>
              <span>•</span>
              <span>
                <strong>{plotArea.toLocaleString()}</strong> sq.ft Plot
              </span>
              <span>•</span>
              <span>
                Config: <strong>{floors === 1 ? "Ground Only (1 Floor)" : `G+${floors - 1} (${floors} Floors)`}</strong>
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0 print:hidden">
            <button
              type="button"
              onClick={handlePrint}
              className="px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm transition-all flex items-center gap-2 cursor-pointer backdrop-blur-sm"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm transition-all flex items-center gap-2 cursor-pointer backdrop-blur-sm"
            >
              {copied ? <Check className="w-4 h-4 text-[#86EFAC]" /> : <Share2 className="w-4 h-4" />}
              <span>{copied ? "Copied!" : "Share Link"}</span>
            </button>

            <button
              type="button"
              onClick={onOpenConsultationModal}
              className="px-6 py-3.5 rounded-2xl bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-sm shadow-luxury-md transition-all flex items-center gap-2 cursor-pointer active:scale-[0.99]"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Book Site Visit</span>
            </button>
          </div>
        </div>

        {/* Financial KPI Summary Bar */}
        <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-left">
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C9C96] block">
              Estimated Duration
            </span>
            <span className="font-display text-xl sm:text-2xl font-bold text-white mt-0.5 block">
              ~{baseDurationMonths} months
            </span>
            <span className="text-[11px] text-[#8C9C96] block">Site handover to keys</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C9C96] block">
              Base Construction
            </span>
            <span className="font-display text-xl sm:text-2xl font-bold text-white mt-0.5 block">
              {formatLakhs(baseCost)}
            </span>
            <span className="text-[11px] text-[#8C9C96] block">₹{baseCost.toLocaleString()}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C9C96] block">
              Selected Add-ons
            </span>
            <span className="font-display text-xl sm:text-2xl font-bold text-white mt-0.5 block">
              {addonsCost > 0 ? formatLakhs(addonsCost) : "₹0"}
            </span>
            <span className="text-[11px] text-[#8C9C96] block">
              {addonsCost > 0 ? `₹${addonsCost.toLocaleString()}` : "None selected"}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C9C96] block">
              Est. Bank EMI @ 7.1%
            </span>
            <span className="font-display text-xl sm:text-2xl font-bold text-[#86EFAC] mt-0.5 block">
              ₹{emi.toLocaleString()}
            </span>
            <span className="text-[11px] text-[#8C9C96] block">20 Yr tenure / month</span>
          </div>
        </div>
      </div>

      {/* 2. FLOOR-WISE COST BREAKDOWN & MATERIAL ESTIMATES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Floor-wise Cost Card */}
        <div className="rounded-3xl bg-[#F8F6F0] border border-[#E9E4DA] p-6 sm:p-8 space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FFF7F3] border border-[#FFD9C6] flex items-center justify-center text-[#EA580C]">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display text-xl font-bold text-[#183B35]">Floor-wise cost</h4>
              <p className="text-xs text-[#52655E]">
                Package rate is uniform, but ground floor includes foundation & plinth share.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {floorWiseBreakdown.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#FBF9F4] border border-[#D9D2C5] flex items-center justify-between gap-4"
              >
                <div>
                  <span className="font-display text-base font-bold text-[#183B35] block">
                    {item.name}
                  </span>
                  {item.hasFoundation ? (
                    <span className="text-[11px] text-[#EA580C] font-semibold flex items-center gap-1">
                      Includes foundation & plinth share (~20% structural load)
                    </span>
                  ) : (
                    <span className="text-[11px] text-[#8C9C96]">
                      Upper floor RCC superstructure & finishes
                    </span>
                  )}
                </div>
                <div className="text-right shrink-0">
                  <span className="font-display text-lg font-bold text-[#183B35] block">
                    {formatLakhs(item.amount)}
                  </span>
                  <span className="text-[11px] text-[#8C9C96]">₹{item.amount.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-[#FFF7F3] border border-[#FFD9C6] text-xs text-[#52655E] flex items-start gap-2">
            <Info className="w-4 h-4 text-[#EA580C] shrink-0 mt-0.5" />
            <span>
              The package rate is the same on every floor. The ground floor carries the foundation and plinth share, so it costs more than the floors above. This split does not specify a foundation type until soil testing is conducted.
            </span>
          </div>
        </div>

        {/* Estimated Material Quantities Card */}
        <div className="rounded-3xl bg-[#F8F6F0] border border-[#E9E4DA] p-6 sm:p-8 space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FFF7F3] border border-[#FFD9C6] flex items-center justify-center text-[#EA580C]">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display text-xl font-bold text-[#183B35]">
                Estimated Material Quantities
              </h4>
              <p className="text-xs text-[#52655E]">
                Standard procurement benchmarks for {totalBuiltUpArea.toLocaleString()} sq.ft built-up area.
              </p>
            </div>
          </div>

          <div className="space-y-2.5">
            <div className="p-3.5 rounded-2xl bg-[#FBF9F4] border border-[#D9D2C5] flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#183B35] block">Cement</span>
                <span className="text-[10px] text-[#8C9C96]">0.40 – 0.45 bags / sq.ft</span>
              </div>
              <span className="font-display text-base font-bold text-[#EA580C]">
                {cementMin.toLocaleString()} – {cementMax.toLocaleString()} bags
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FBF9F4] border border-[#D9D2C5] flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#183B35] block">Steel (Fe550D TMT)</span>
                <span className="text-[10px] text-[#8C9C96]">3.5 – 4.0 kg / sq.ft</span>
              </div>
              <span className="font-display text-base font-bold text-[#EA580C]">
                {steelMin.toLocaleString()} – {steelMax.toLocaleString()} kg
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FBF9F4] border border-[#D9D2C5] flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#183B35] block">M-Sand (Plastering & Masonry)</span>
                <span className="text-[10px] text-[#8C9C96]">1.8 – 2.0 cft / sq.ft</span>
              </div>
              <span className="font-display text-base font-bold text-[#EA580C]">
                {msandMin.toLocaleString()} – {msandMax.toLocaleString()} cft
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FBF9F4] border border-[#D9D2C5] flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#183B35] block">Aggregate (20mm Blue Metal)</span>
                <span className="text-[10px] text-[#8C9C96]">1.2 – 1.4 cft / sq.ft</span>
              </div>
              <span className="font-display text-base font-bold text-[#EA580C]">
                {aggregateMin.toLocaleString()} – {aggregateMax.toLocaleString()} cft
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FBF9F4] border border-[#D9D2C5] flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#183B35] block">Bricks (Red Wire-Cut / AAC)</span>
                <span className="text-[10px] text-[#8C9C96]">18 – 20 nos / sq.ft</span>
              </div>
              <span className="font-display text-base font-bold text-[#EA580C]">
                {bricksMin.toLocaleString()} – {bricksMax.toLocaleString()} nos
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. INTERACTIVE 10-PHASE DONUT & SKYLINE STAGE EXPLORER */}
      <div className="rounded-3xl bg-[#F8F6F0] border border-[#E9E4DA] p-6 sm:p-10 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EA580C]/10 text-xs font-bold uppercase tracking-wider text-[#EA580C] mb-2">
              <span>STAGE BREAKDOWN</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#183B35]">
              Cost Distribution by Phase
            </h3>
            <p className="text-xs sm:text-sm text-[#52655E] mt-0.5">
              How money actually leaves the escrow bank account across the 10 structural milestones.
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Interactive SVG Donut Chart */}
          <div className="flex flex-col items-center justify-center shrink-0 w-full lg:w-auto">
            <div className="relative w-[300px] h-[300px] sm:w-[340px] sm:h-[340px] flex items-center justify-center">
              <svg
                width="300"
                height="300"
                viewBox="0 0 300 300"
                className="w-full h-full transform -rotate-90 origin-center transition-all duration-300"
              >
                {donutSlices.map((slice, idx) => {
                  const isHovered = activePhaseIndex === idx;
                  return (
                    <path
                      key={idx}
                      d={slice.pathData}
                      fill={slice.phase.color}
                      stroke="#ffffff"
                      strokeWidth="2.5"
                      className="cursor-pointer transition-all duration-200"
                      style={{
                        opacity: activePhaseIndex === null || isHovered ? 1 : 0.45,
                        transform: isHovered ? "scale(1.03)" : "scale(1)",
                        transformOrigin: "center",
                      }}
                      onMouseEnter={() => setActivePhaseIndex(idx)}
                      onMouseLeave={() => setActivePhaseIndex(null)}
                      onClick={() =>
                        setActivePhaseIndex(activePhaseIndex === idx ? null : idx)
                      }
                    />
                  );
                })}
              </svg>

              {/* Center Donut Label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-4">
                <span className="font-display text-3xl font-bold text-[#183B35]">
                  {activePhase ? `${activePhase.percentShare}%` : "100%"}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C9C96] max-w-[120px] truncate">
                  {activePhase ? activePhase.name : "TOTAL BASE COST"}
                </span>
                {activePhaseCost && (
                  <span className="text-xs font-extrabold text-[#EA580C] mt-0.5">
                    {formatLakhs(activePhaseCost)}
                  </span>
                )}
              </div>
            </div>
            <span className="text-[11px] text-[#8C9C96] mt-2 text-center">
              Hover or tap any sector to inspect milestone scope
            </span>
          </div>

          {/* 10 Phases Grid / List */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
            {PRO_PHASES.map((ph, idx) => {
              const isSelected = activePhaseIndex === idx;
              const phaseCost = Math.round((baseCost * ph.percentShare) / 100);
              return (
                <div
                  key={ph.id}
                  onMouseEnter={() => setActivePhaseIndex(idx)}
                  onMouseLeave={() => setActivePhaseIndex(null)}
                  onClick={() => setActivePhaseIndex(activePhaseIndex === idx ? null : idx)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? "bg-[#FFF7F3] border-[#EA580C] shadow-luxury-sm ring-1 ring-[#EA580C]"
                      : "bg-[#FBF9F4] border-[#D9D2C5] hover:bg-[#E9E4D9]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3.5 h-3.5 rounded-full shrink-0"
                      style={{ backgroundColor: ph.color }}
                    />
                    <div>
                      <span className="text-xs font-bold text-[#183B35] block leading-snug">
                        {ph.number}. {ph.name}
                      </span>
                      <span className="text-[10px] text-[#8C9C96] font-semibold">
                        {ph.percentShare}% share · {ph.monthRange}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#183B35] shrink-0">
                    {formatLakhs(phaseCost)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. COMPLETE COST ESTIMATE SHEET TABLE */}
      <div className="rounded-3xl bg-[#F8F6F0] border border-[#E9E4DA] p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#FFF7F3] border border-[#FFD9C6] flex items-center justify-center text-[#EA580C]">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#183B35]">
              Complete Cost Estimate Sheet
            </h3>
            <p className="text-xs text-[#52655E]">
              Itemized BOQ share calculated against {totalBuiltUpArea.toLocaleString()} sq.ft at ₹{selectedPackage.ratePerSqft.toLocaleString()}/sqft.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-[#D9D2C5] bg-white">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#183B35] text-[#F4F0E8] uppercase font-bold tracking-wider text-[11px]">
                <th className="py-3.5 px-4">Construction Item</th>
                <th className="py-3.5 px-4 text-center">% Share</th>
                <th className="py-3.5 px-4 text-right">Estimated Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D9D2C5]/60 text-[#183B35]">
              {PRO_PHASES.map((phase) => {
                const itemCost = Math.round((baseLivingCost * phase.percentShare) / 100);
                return (
                  <tr key={phase.id} className="hover:bg-[#FBF9F4] transition-colors">
                    <td className="py-3 px-4 font-semibold">{phase.name}</td>
                    <td className="py-3 px-4 text-center font-bold text-[#52655E]">
                      {phase.percentShare}%
                    </td>
                    <td className="py-3 px-4 text-right font-bold">
                      ₹{itemCost.toLocaleString()}
                    </td>
                  </tr>
                );
              })}

              {carParkingArea > 0 && (
                <tr className="hover:bg-[#FBF9F4] transition-colors bg-[#FFF7F3]/40">
                  <td className="py-3 px-4 font-semibold text-[#EA580C]">
                    Car Parking — Ground Floor ({carParkingArea} sqft @ ₹{selectedPackage.ratePerSqft.toLocaleString()}/sqft)
                  </td>
                  <td className="py-3 px-4 text-center font-bold text-[#EA580C]">incl.</td>
                  <td className="py-3 px-4 text-right font-bold text-[#EA580C]">
                    ₹{carParkingCost.toLocaleString()}
                  </td>
                </tr>
              )}

              {addonsCost > 0 && (
                <tr className="hover:bg-[#FBF9F4] transition-colors bg-[#FFF7F3]/60">
                  <td className="py-3 px-4 font-semibold text-[#EA580C]">
                    Selected Add-ons & Extra Requirements
                  </td>
                  <td className="py-3 px-4 text-center font-bold text-[#EA580C]">Extra</td>
                  <td className="py-3 px-4 text-right font-bold text-[#EA580C]">
                    ₹{addonsCost.toLocaleString()}
                  </td>
                </tr>
              )}

              <tr className="bg-[#183B35] text-white font-bold text-sm">
                <td className="py-4 px-4 font-display text-base">Grand Total (Turnkey)</td>
                <td className="py-4 px-4 text-center">100%</td>
                <td className="py-4 px-4 text-right font-display text-lg text-[#86EFAC]">
                  ₹{grandTotal.toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-3.5 rounded-xl bg-[#FFF7F3] border border-[#FFD9C6] text-[11px] text-[#52655E] leading-relaxed">
          ⚠ <strong>Disclaimer:</strong> All figures are approximate estimates for Chennai metro (2026). Actual costs depend on site conditions, soil type, material price fluctuations, and final architectural design. Government approval charges, architect fees, EB/water connection charges, and interior loose furnishing are excluded. (*) Sump and overhead tank rates vary by selected package tier.
        </div>
      </div>

      {/* 5. ALL PACKAGES SIDE-BY-SIDE COMPARISON TABLE */}
      <div className="rounded-3xl bg-[#F8F6F0] border border-[#E9E4DA] p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#FFF7F3] border border-[#FFD9C6] flex items-center justify-center text-[#EA580C]">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#183B35]">
              All Packages — Side by Side
            </h3>
            <p className="text-xs text-[#52655E]">
              Compare Chennai 2026 specifications across all 4 tiers for {totalBuiltUpArea.toLocaleString()} sq.ft.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-[#D9D2C5] bg-white">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#183B35] text-[#F4F0E8]">
                <th className="py-3.5 px-4 font-bold text-xs uppercase tracking-wider">Feature</th>
                {PRO_PACKAGES.map((pkg) => (
                  <th
                    key={pkg.id}
                    className={`py-3.5 px-4 text-center font-bold ${
                      selectedPackage.id === pkg.id ? "bg-[#EA580C] text-white" : ""
                    }`}
                  >
                    <span className="block font-display text-base">{pkg.name}</span>
                    <span className="text-[11px] font-normal opacity-90">
                      ₹{pkg.ratePerSqft.toLocaleString()}/sqft
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D9D2C5]/60 text-[#183B35]">
              {/* Dynamic Estimated Total Cost Row */}
              <tr className="bg-[#FFF7F3] font-bold">
                <td className="py-3 px-4 text-[#EA580C]">Est. Total Cost ({totalBuiltUpArea} sqft)</td>
                {PRO_PACKAGES.map((pkg) => {
                  const pkgTotal = totalBuiltUpArea * pkg.ratePerSqft;
                  return (
                    <td key={pkg.id} className="py-3 px-4 text-center text-[#EA580C]">
                      {formatLakhs(pkgTotal)}
                    </td>
                  );
                })}
              </tr>

              {/* Monthly EMI Row */}
              <tr className="bg-[#F8F6F0] font-semibold text-xs">
                <td className="py-2.5 px-4 text-[#52655E]">Monthly EMI (20yr @ 7.1%)</td>
                {PRO_PACKAGES.map((pkg) => {
                  const pkgTotal = totalBuiltUpArea * pkg.ratePerSqft;
                  const pkgEmi = Math.round(
                    (pkgTotal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
                      (Math.pow(1 + monthlyRate, totalMonths) - 1)
                  );
                  return (
                    <td key={pkg.id} className="py-2.5 px-4 text-center text-[#183B35]">
                      ₹{pkgEmi.toLocaleString()}
                    </td>
                  );
                })}
              </tr>

              {/* Matrix Rows */}
              {PRO_COMPARISON_MATRIX.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#FBF9F4] transition-colors">
                  <td className="py-3 px-4 font-semibold text-[#52655E]">{row.feature}</td>
                  <td className="py-3 px-4 text-center">
                    {typeof row.basic === "boolean" ? (
                      row.basic ? (
                        <CheckCircle2 className="w-4 h-4 text-[#15803D] mx-auto" />
                      ) : (
                        <span className="text-[#8C9C96]">—</span>
                      )
                    ) : (
                      <span className="font-medium">{row.basic}</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {typeof row.standard === "boolean" ? (
                      row.standard ? (
                        <CheckCircle2 className="w-4 h-4 text-[#15803D] mx-auto" />
                      ) : (
                        <span className="text-[#8C9C96]">—</span>
                      )
                    ) : (
                      <span className="font-medium">{row.standard}</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {typeof row.premium === "boolean" ? (
                      row.premium ? (
                        <CheckCircle2 className="w-4 h-4 text-[#15803D] mx-auto" />
                      ) : (
                        <span className="text-[#8C9C96]">—</span>
                      )
                    ) : (
                      <span className="font-medium">{row.premium}</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {typeof row.luxury === "boolean" ? (
                      row.luxury ? (
                        <CheckCircle2 className="w-4 h-4 text-[#15803D] mx-auto" />
                      ) : (
                        <span className="text-[#8C9C96]">—</span>
                      )
                    ) : (
                      <span className="font-medium">{row.luxury}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. EDITORIAL TRUST GUIDE */}
      <div className="rounded-3xl bg-white border border-[#D9D2C5] p-6 sm:p-10 space-y-8">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#183B35]">
            Why homeowners across Chennai trust these numbers
          </h2>
          <p className="text-sm text-[#52655E] mt-3 leading-relaxed">
            Most construction calculators are written by software teams who have never watched a slab crack because soil was not tested, or watched a budget blow because staircase finishing was left out of the quote. These rates are what Chennai contractors are charging in 2026, checked against live procurement for <strong>Ramco and Dalmia cement, iSteel and TATA Tiscon, Finolex wiring and Parryware</strong> fittings, and labour from Anna Nagar to Perungudi. TBC has priced and delivered hundreds of bespoke homes in the city. That is the dataset behind this calculator — not a national spreadsheet.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[#D9D2C5]/60">
          <div className="space-y-2">
            <h4 className="font-display text-lg font-bold text-[#183B35]">
              What your estimate is actually telling you
            </h4>
            <p className="text-xs sm:text-sm text-[#52655E] leading-relaxed">
              The ten-phase split follows how money actually leaves a bank account during a build. Once those proportions are visible, you can talk to an engineer on day one instead of nine months later, when the budget is already off track. Timeline matters as much as the rupee total.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-display text-lg font-bold text-[#183B35]">
              What homeowners consistently get wrong
            </h4>
            <p className="text-xs sm:text-sm text-[#52655E] leading-relaxed">
              Three things eat budgets that never appear in a headline rate: the gap between the package and materials laid on site, mid-build changes (switching tile after laying starts costs labour twice), and add-ons like sumps, overhead tanks, and compound walls that look optional until they are not.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-display text-lg font-bold text-[#183B35]">
              One number to start a real conversation
            </h4>
            <p className="text-xs sm:text-sm text-[#52655E] leading-relaxed">
              This is not a vague marketing estimate. It is a measured starting point — the kind of figure you would get from a professional cost estimator. Take this report to your structural engineer and contractors. When a quote arrives drastically low, ask what it does not cover.
            </p>
          </div>
        </div>
      </div>

      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      <div className="rounded-3xl bg-[#F8F6F0] border border-[#E9E4DA] p-6 sm:p-10 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#FFF7F3] border border-[#FFD9C6] flex items-center justify-center text-[#EA580C]">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display text-2xl font-bold text-[#183B35]">
              Frequently Asked Questions – House Construction Cost in Chennai
            </h3>
            <p className="text-xs text-[#52655E]">
              Clear answers to the most common queries about 2026 residential construction costs in Chennai.
            </p>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          {PRO_FAQS.map((faq, idx) => {
            const isOpen = expandedFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-[#D9D2C5] bg-white overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setExpandedFaq(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-display font-bold text-base text-[#183B35] hover:text-[#EA580C] transition-colors cursor-pointer"
                >
                  <span>
                    {idx + 1}. {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#8C9C96] transition-transform duration-200 shrink-0 ${
                      isOpen ? "rotate-180 text-[#EA580C]" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-[#52655E] leading-relaxed border-t border-[#F0EBE0] pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 8. BOTTOM ACTION BAR & RECALCULATE */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#D9D2C5]">
        <button
          type="button"
          onClick={onReset}
          className="w-full sm:w-auto px-6 py-3.5 rounded-2xl border border-[#D9D2C5] bg-[#FBF9F4] hover:bg-[#E9E4D9] text-[#183B35] font-bold text-sm transition-all cursor-pointer"
        >
          Modify Inputs & Recalculate
        </button>

        <button
          type="button"
          onClick={onOpenConsultationModal}
          className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-base shadow-luxury-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
        >
          <PhoneCall className="w-5 h-5" />
          <span>Book Free Site Visit & Soil Consultation</span>
        </button>
      </div>
    </div>
  );
}
