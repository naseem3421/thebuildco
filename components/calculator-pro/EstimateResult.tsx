"use client";

import React, { useState, useMemo } from "react";
import {
  Sparkles,
  Download,
  Share2,
  PhoneCall,
  MessageCircle,
  CheckCircle,
  HelpCircle,
  Check,
  ChevronDown,
  Info,
  Calendar,
  Layers,
  FileSpreadsheet,
  TrendingUp,
  Compass,
  MapPin,
  Clock,
  ShieldCheck,
  Building,
  Sliders,
  AlertCircle,
  Loader2,
  CheckCircle2,
  Lock,
  Unlock,
} from "lucide-react";
import { CalculationResult, formatInLakhs, formatIndianCurrency } from "@/lib/calculator/calculations";
import { siteConfig } from "@/config/site";
import { optimizeBudget } from "@/config/aiCalculatorEngine";
import { PRO_FAQS, PRO_COMPARISON_MATRIX, PRO_PACKAGES, PRO_ADDONS } from "@/config/calculatorPro";
import { trackWhatsAppClick, trackPhoneClick, trackCTAClick } from "@/lib/analytics";
import { encodeCalculatorState } from "@/lib/calculator/shareState";

interface EstimateResultProps {
  calculation: CalculationResult;
  rawInputs: any;
  onApplyBudgetPlan: (packageId: "basic" | "standard" | "premium" | "luxury", floors: number) => void;
  onOpenConsultationModal: () => void;
  onEditSelection: () => void;
}

export function EstimateResult({
  calculation,
  rawInputs,
  onApplyBudgetPlan,
  onOpenConsultationModal,
  onEditSelection,
}: EstimateResultProps) {
  const {
    estimateLow,
    estimateHigh,
    grandTotal,
    baseCost,
    addonsCost,
    totalBuiltUpArea,
    plotArea,
    plotCents,
    plotGrounds,
    far,
    selectedPackage,
    selectedElevation,
    currentSoilProfile,
    baseDurationMonths,
    durationLabel,
    emi,
    floorBreakdown,
    phaseBreakdown,
    paymentSchedule,
    materialBOQ,
    vastuPlan,
  } = calculation;

  // Lead capture state
  const [leadName, setLeadName] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [isLeadSubmitting, setIsLeadSubmitting] = useState(false);
  const [isLeadUnlocked, setIsLeadUnlocked] = useState(false);
  const [leadError, setLeadError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  // Tabs & interactive elements
  const [activeReportTab, setActiveReportTab] = useState<"phases" | "vastu" | "materials" | "compare" | "soil" | "faqs">("phases");
  const [activePhaseIndex, setActivePhaseIndex] = useState<number | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showHowCalculated, setShowHowCalculated] = useState(false);

  // AI "What-If" budget optimizer state
  const [targetBudgetInput, setTargetBudgetInput] = useState<number>(
    Math.round(grandTotal / 100000) || 50
  );

  const budgetOptimization = useMemo(() => {
    return optimizeBudget(targetBudgetInput);
  }, [targetBudgetInput]);

  // Lead Form Submission Handler
  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLeadError(null);

    const name = leadName.trim();
    const cleanPhone = leadPhone.replace(/[\s\-()+]/g, "");
    const normalizedPhone =
      cleanPhone.startsWith("91") && cleanPhone.length === 12
        ? cleanPhone.slice(2)
        : cleanPhone.startsWith("0") && cleanPhone.length === 11
        ? cleanPhone.slice(1)
        : cleanPhone;

    if (!name || name.length < 2) {
      setLeadError("Please enter your full name.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(normalizedPhone)) {
      setLeadError("Please enter a valid 10-digit Indian mobile number.");
      return;
    }

    setIsLeadSubmitting(true);

    try {
      const activeAddonsList = Object.entries(rawInputs.selectedAddons || {})
        .filter(([, v]: any) => v.enabled)
        .map(([k]) => PRO_ADDONS.find((a) => a.id === k)?.name)
        .filter(Boolean);

      const res = await fetch("/api/calculator/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone: normalizedPhone,
          calculator: "calculator-pro-3",
          plotArea,
          plotDimensions: `${plotArea} sqft (${plotCents} Cents)`,
          cents: plotCents,
          grounds: plotGrounds,
          builtUpArea: totalBuiltUpArea,
          floors: rawInputs.floors,
          bhk: rawInputs.bhk,
          homeType: rawInputs.homeType,
          package: selectedPackage.name,
          packageRate: selectedPackage.ratePerSqft,
          addons: activeAddonsList,
          estimatedCost: grandTotal,
          estimateLow,
          estimateHigh,
          duration: durationLabel,
          locality: currentSoilProfile.locality,
          source: "calculator_pro_3_lead_unlock",
        }),
      });

      if (res.ok) {
        setIsLeadUnlocked(true);
      } else {
        // Unlock anyway on client so user is not blocked
        setIsLeadUnlocked(true);
      }
    } catch {
      setIsLeadUnlocked(true);
    } finally {
      setIsLeadSubmitting(false);
    }
  };

  // WhatsApp Share Handler
  const handleWhatsAppShare = () => {
    trackWhatsAppClick("calculator");
    const activeAddonsList = Object.entries(rawInputs.selectedAddons || {})
      .filter(([, v]: any) => v.enabled)
      .map(([k]) => PRO_ADDONS.find((a) => a.id === k)?.name)
      .filter(Boolean)
      .join(", ");

    const text = `*🏡 The Build Company Chennai Turnkey Construction Estimate*
-----------------------------------
• *Plot Area:* ${plotArea.toLocaleString()} sq.ft (${plotCents} Cents / ${plotGrounds} Gnd)
• *Locality:* ${currentSoilProfile.locality} (${currentSoilProfile.soilType})
• *Built-up Area:* ${totalBuiltUpArea.toLocaleString()} sq.ft (${rawInputs.floors === 1 ? "Ground Only" : `G+${rawInputs.floors - 1}`})
• *Package Tier:* ${selectedPackage.name} (₹${selectedPackage.ratePerSqft.toLocaleString()}/sqft)
• *Estimated Range:* ${formatInLakhs(estimateLow)} – ${formatInLakhs(estimateHigh)}
• *Approx. Turnkey Total:* ₹${grandTotal.toLocaleString()} (${formatInLakhs(grandTotal)})
• *Estimated Duration:* ~${durationLabel}
• *Est. 20-Yr EMI:* ₹${emi.toLocaleString()}/mo
${activeAddonsList ? `• *Add-ons Included:* ${activeAddonsList}\n` : ""}-----------------------------------
I used your online calculator and would like to schedule a free site survey to lock this BOQ.`;

    const url = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(text)}`;
    if (typeof window !== "undefined") {
      window.open(url, "_blank");
    }
  };

  // Share with Family (Web Share API with fallback)
  const handleShareFamily = async () => {
    if (typeof window === "undefined") return;
    const encoded = encodeCalculatorState(rawInputs);
    const shareUrl = `${window.location.origin}/calculator-pro-2?estimate=${encoded}`;
    const shareText = `The Build Company Chennai House Construction Estimate: ${formatInLakhs(estimateLow)} – ${formatInLakhs(estimateHigh)} for ${totalBuiltUpArea.toLocaleString()} sqft`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Chennai House Construction Estimate | The Build Company",
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    navigator.clipboard.writeText(shareUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  // Client-Side Branded PDF Quote Generation
  const handleDownloadPDF = () => {
    if (typeof window === "undefined") return;
    window.print();
  };

  // SVG Donut Chart Math
  const donutCenter = 150;
  const outerRadius = 135;
  const innerRadius = 82;
  let accumulatedAngle = -90;

  const r = (val: number) => Number(val.toFixed(2));

  const donutSlices = phaseBreakdown.map((phase) => {
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

    const pathData = `M ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 0 0 ${x4} ${y4} Z`;

    return { phase, pathData };
  });

  const activePhase = activePhaseIndex !== null ? phaseBreakdown[activePhaseIndex] : null;

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-200">
      {/* 1. HERO RESULTS SUMMARY CARD */}
      <div className="rounded-3xl bg-gradient-to-br from-[#183B35] to-[#0D2420] text-[#F4F0E8] p-6 sm:p-10 shadow-luxury-lg border border-[#3E5C54] relative overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#EA580C]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-6 relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EA580C]/20 border border-[#EA580C]/30 text-[#EA580C] text-xs font-extrabold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>YOUR 2026 HOME BUDGET ESTIMATE</span>
            </div>

            <button
              type="button"
              onClick={onEditSelection}
              className="text-xs font-bold text-[#8C9C96] hover:text-white underline decoration-dotted transition-colors cursor-pointer"
            >
              Modify Choices &rarr;
            </button>
          </div>

          {/* Big Cost Display */}
          <div className="space-y-1">
            <span className="text-xs sm:text-sm font-semibold text-[#8C9C96] block uppercase tracking-wider">
              Estimated Turnkey Construction Cost Range
            </span>
            <div className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-white">
              {formatInLakhs(estimateLow)} – {formatInLakhs(estimateHigh)}
            </div>
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs sm:text-sm text-[#8C9C96]">
              <span className="text-[#86EFAC] font-bold">
                Approx. ₹{calculation.costPerSqft.toLocaleString()}/sqft turnkey
              </span>
              <span>•</span>
              <span>Baseline: {formatInLakhs(grandTotal)}</span>
              <span>•</span>
              <span>{currentSoilProfile.locality}</span>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-[10px] uppercase font-bold text-[#8C9C96] block">
                Total Built-up Area
              </span>
              <span className="font-display text-lg sm:text-xl font-bold text-white block mt-0.5">
                {totalBuiltUpArea.toLocaleString()} sqft
              </span>
              <span className="text-[10px] text-[#8C9C96]">
                {rawInputs.floors === 1 ? "Ground Only" : `G+${rawInputs.floors - 1}`} • FAR: {far}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-[10px] uppercase font-bold text-[#8C9C96] block">
                Package Tier
              </span>
              <span className="font-display text-lg sm:text-xl font-bold text-[#EA580C] block mt-0.5">
                {selectedPackage.name}
              </span>
              <span className="text-[10px] text-[#8C9C96]">
                ₹{selectedPackage.ratePerSqft}/sqft
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-[10px] uppercase font-bold text-[#8C9C96] block">
                Est. Completion Time
              </span>
              <span className="font-display text-lg sm:text-xl font-bold text-[#86EFAC] block mt-0.5">
                ~{durationLabel}
              </span>
              <span className="text-[10px] text-[#8C9C96]">Milestone Inspected</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-[10px] uppercase font-bold text-[#8C9C96] block">
                Est. 20-Yr Bank EMI
              </span>
              <span className="font-display text-lg sm:text-xl font-bold text-white block mt-0.5">
                ₹{emi.toLocaleString()}/mo
              </span>
              <span className="text-[10px] text-[#8C9C96]">@ 7.1% Interest Rate</span>
            </div>
          </div>

          {/* Action CTAs Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-3">
            <button
              type="button"
              onClick={handleWhatsAppShare}
              className="py-3.5 px-4 rounded-2xl bg-[#15803D] hover:bg-[#166534] text-white font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Send to WhatsApp</span>
            </button>

            <button
              type="button"
              onClick={onOpenConsultationModal}
              className="py-3.5 px-4 rounded-2xl bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-xs sm:text-sm shadow-luxury-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Book Free Site Visit</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadPDF}
              className="py-3.5 px-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/15 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF Quote</span>
            </button>

            <button
              type="button"
              onClick={handleShareFamily}
              className="py-3.5 px-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/15 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>{isCopied ? "Link Copied!" : "Share with Family"}</span>
            </button>
          </div>

          {/* "How is this calculated?" Expandable */}
          <div className="pt-2 border-t border-white/10">
            <button
              type="button"
              onClick={() => setShowHowCalculated(!showHowCalculated)}
              className="text-xs font-semibold text-[#8C9C96] hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Info className="w-3.5 h-3.5 text-[#EA580C]" />
              <span>How is this estimate calculated?</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform ${showHowCalculated ? "rotate-180" : ""}`}
              />
            </button>

            {showHowCalculated && (
              <div className="mt-3 p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-[#D9D2C5] space-y-2 animate-in fade-in duration-150">
                <p>
                  <strong>1. Living Area:</strong> {calculation.builtUpPerFloor} sqft/floor × {rawInputs.floors} floors
                  {calculation.headroomArea > 0 ? ` + 200 sqft Headroom` : ""} = {calculation.totalLivingBuiltUp} sqft.
                </p>
                <p>
                  <strong>2. Base Turnkey Cost:</strong> {totalBuiltUpArea} sqft × ₹{selectedPackage.ratePerSqft}/sqft ({selectedPackage.name}) = {formatIndianCurrency(baseCost)}.
                </p>
                <p>
                  <strong>3. Add-on Infrastructure:</strong> {formatIndianCurrency(addonsCost)} (sumps, overhead tanks, compound walls, gates & solar).
                </p>
                <p className="text-[11px] text-[#8C9C96]">
                  <strong>Indicative Range (-5% / +8%):</strong> Accommodates architectural design choices, micro-soil foundation depths, and interior joinery variations.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. VISUAL CONSTRUCTION TIMELINE ROADMAP */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#FBF9F4] border border-[#D9D2C5] space-y-5 shadow-luxury-sm">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#EA580C] block">
              EXECUTION TIMELINE
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#183B35]">
              Estimated Construction Roadmap (~{durationLabel})
            </h3>
          </div>
          <span className="text-xs font-bold text-[#15803D] flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> 5 Inspection Stages
          </span>
        </div>

        {/* Horizontal Progress Timeline */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
          {[
            { step: "01", title: "Planning & Soil", time: "Month 1", desc: "Drawings & Soil Test" },
            { step: "02", title: "Foundation", time: "Month 2–3", desc: "Excavation & Plinth" },
            { step: "03", title: "RCC Slabs", time: "Month 4–6", desc: "Columns & Slab Cast" },
            { step: "04", title: "Brickwork", time: "Month 7–9", desc: "Walls & Plastering" },
            { step: "05", title: "Finishing", time: "Month 10–13", desc: "Tiles, Paint & Fittings" },
            { step: "06", title: "Handover", time: "Month 14", desc: "Snag Clearance & Keys" },
          ].map((item, idx) => (
            <div key={idx} className="p-3 rounded-2xl bg-white border border-[#D9D2C5] space-y-1">
              <span className="text-[10px] font-extrabold text-[#EA580C] bg-[#FFF7F3] px-1.5 py-0.5 rounded border border-[#FFD9C6]">
                {item.step}
              </span>
              <span className="font-display text-xs font-bold text-[#183B35] block mt-1">
                {item.title}
              </span>
              <span className="text-[10px] font-semibold text-[#8C9C96] block">{item.time}</span>
              <span className="text-[9px] text-[#52655E] block leading-tight">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. WHERE YOUR MONEY GOES (DONUT) & STAGE-WISE PAYMENT PLAN */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT: DONUT CHART (6 Cols) */}
        <div className="lg:col-span-6 p-6 sm:p-7 rounded-3xl bg-[#FBF9F4] border border-[#D9D2C5] space-y-5 shadow-luxury-sm">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#EA580C] block">
                COST BREAKDOWN
              </span>
              <h3 className="font-display text-lg sm:text-xl font-bold text-[#183B35]">
                Where Your Money Goes
              </h3>
            </div>
            <span className="text-xs font-bold text-[#52655E]">10 Civil Phases</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            {/* Donut SVG */}
            <div className="relative w-[220px] h-[220px] shrink-0 flex items-center justify-center">
              <svg width="220" height="220" viewBox="0 0 300 300" className="w-full h-full transform -rotate-90 origin-center">
                {donutSlices.map((slice, idx) => {
                  const isHovered = activePhaseIndex === idx;
                  return (
                    <path
                      key={idx}
                      d={slice.pathData}
                      fill={slice.phase.color}
                      stroke="#ffffff"
                      strokeWidth="2"
                      className="cursor-pointer transition-all duration-200"
                      style={{
                        opacity: activePhaseIndex === null || isHovered ? 1 : 0.45,
                        transform: isHovered ? "scale(1.03)" : "scale(1)",
                        transformOrigin: "center",
                      }}
                      onMouseEnter={() => setActivePhaseIndex(idx)}
                      onMouseLeave={() => setActivePhaseIndex(null)}
                      onClick={() => setActivePhaseIndex(activePhaseIndex === idx ? null : idx)}
                    />
                  );
                })}
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-2">
                <span className="font-display text-2xl font-bold text-[#183B35]">
                  {activePhase ? `${activePhase.percentShare}%` : "100%"}
                </span>
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#8C9C96] max-w-[100px] truncate">
                  {activePhase ? activePhase.name : "TURNKEY COST"}
                </span>
                {activePhase && (
                  <span className="text-xs font-extrabold text-[#EA580C] mt-0.5">
                    {formatInLakhs(activePhase.amount)}
                  </span>
                )}
              </div>
            </div>

            {/* Compact Phase List */}
            <div className="space-y-1.5 flex-1 w-full text-xs">
              {phaseBreakdown.slice(0, 5).map((ph, idx) => (
                <div
                  key={ph.id}
                  onMouseEnter={() => setActivePhaseIndex(idx)}
                  onMouseLeave={() => setActivePhaseIndex(null)}
                  className={`p-2 rounded-xl border flex items-center justify-between gap-2 transition-all cursor-pointer ${
                    activePhaseIndex === idx ? "bg-[#FFF7F3] border-[#EA580C]" : "bg-white border-[#E9E4DA]"
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: ph.color }} />
                    <span className="font-semibold text-[#183B35] truncate">{ph.name}</span>
                  </div>
                  <span className="font-bold text-[#183B35] shrink-0">{formatInLakhs(ph.amount)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: STAGE-WISE PAYMENT SCHEDULE (6 Cols) */}
        <div className="lg:col-span-6 p-6 sm:p-7 rounded-3xl bg-[#FBF9F4] border border-[#D9D2C5] space-y-5 shadow-luxury-sm">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#15803D] block">
                MILESTONE FINANCIALS
              </span>
              <h3 className="font-display text-lg sm:text-xl font-bold text-[#183B35]">
                Stage-Wise Payment Plan
              </h3>
            </div>
            <span className="text-xs font-semibold text-[#8C9C96]">Pay as work finishes</span>
          </div>

          <div className="space-y-2.5">
            {paymentSchedule.map((st) => (
              <div key={st.id} className="p-3 rounded-2xl bg-white border border-[#D9D2C5] flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-[#183B35] text-[#F4F0E8] font-bold text-[10px] flex items-center justify-center shrink-0">
                    {st.stageNumber}
                  </span>
                  <div>
                    <span className="font-bold text-[#183B35] block leading-snug">{st.name}</span>
                    <span className="text-[10px] text-[#8C9C96]">{st.timelineLabel} • {st.percentShare}% share</span>
                  </div>
                </div>

                <span className="font-display text-sm font-bold text-[#EA580C] shrink-0">
                  {formatInLakhs(st.amount)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. "HAVE A BUDGET IN MIND?" AI WHAT-IF OPTIMIZER */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#D9D2C5] space-y-4 shadow-luxury-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-[#EA580C]" />
            <div>
              <h3 className="font-display text-lg sm:text-xl font-bold text-[#183B35]">
                Have a Target Budget in Mind?
              </h3>
              <p className="text-xs text-[#52655E]">
                Let our AI reverse-engineer the maximum achievable square footage and optimal package.
              </p>
            </div>
          </div>

          <div className="text-right self-start sm:self-auto">
            <span className="text-[10px] uppercase font-bold text-[#8C9C96] block">Your Budget</span>
            <span className="font-display text-2xl font-bold text-[#EA580C]">
              ₹{targetBudgetInput} Lakhs
            </span>
          </div>
        </div>

        <input
          type="range"
          min="20"
          max="150"
          step="5"
          value={targetBudgetInput}
          onChange={(e) => setTargetBudgetInput(parseInt(e.target.value, 10))}
          className="w-full accent-[#EA580C] cursor-pointer"
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="p-3 rounded-2xl bg-[#FBF9F4] border border-[#E9E4DA]">
            <span className="text-[10px] font-bold text-[#8C9C96] uppercase block">In Premium (₹2,649)</span>
            <span className="font-display text-base font-bold text-[#183B35] block mt-0.5">
              ~{budgetOptimization.premiumSqft.toLocaleString()} sq.ft
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-[#FBF9F4] border border-[#E9E4DA]">
            <span className="text-[10px] font-bold text-[#8C9C96] uppercase block">In Standard (₹2,299)</span>
            <span className="font-display text-base font-bold text-[#183B35] block mt-0.5">
              ~{budgetOptimization.standardSqft.toLocaleString()} sq.ft
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-[#FFF7F3] border border-[#FFD9C6] flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-[#EA580C] uppercase block">Recommended</span>
              <span className="font-bold text-[#183B35] capitalize">
                {budgetOptimization.recommendedPackage} (G+{budgetOptimization.recommendedFloors - 1})
              </span>
            </div>

            <button
              type="button"
              onClick={() =>
                onApplyBudgetPlan(
                  budgetOptimization.recommendedPackage,
                  budgetOptimization.recommendedFloors
                )
              }
              className="px-3 py-1.5 rounded-xl bg-[#183B35] text-white font-bold text-xs hover:bg-[#0D2420] transition-all cursor-pointer"
            >
              Apply Plan
            </button>
          </div>
        </div>
      </div>

      {/* 5. LEAD CAPTURE PSYCHOLOGY: UNLOCK COMPLETE DETAILED REPORT */}
      {!isLeadUnlocked ? (
        <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-[#FFF7F3] to-[#FFEDE0] border-2 border-[#EA580C] space-y-6 shadow-luxury-md">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#FFD9C6] text-[#EA580C] text-xs font-extrabold uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>FREE DETAILED BREAKDOWN & BOQ</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#183B35]">
              Want the Complete Breakdown & PDF Estimate?
            </h3>
            <p className="text-xs sm:text-sm text-[#52655E] leading-relaxed">
              Your free estimate is calculated. Enter your name and phone number to unlock the 100% Vastu Floor Plan, Material BOQ, Package Specs Matrix, and direct WhatsApp quote.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs text-[#183B35] font-semibold">
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#15803D]" /> Complete Cost Breakup
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#15803D]" /> 100% Vastu Floor Plan
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#15803D]" /> Material BOQ Summary
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#15803D]" /> Downloadable PDF Quote
            </span>
          </div>

          <form onSubmit={handleLeadSubmit} className="max-w-xl space-y-3 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <input
                  type="text"
                  required
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  placeholder="Your Full Name *"
                  className="w-full h-12 px-4 rounded-2xl border border-[#D9D2C5] bg-white font-semibold text-sm text-[#183B35] focus:outline-none focus:border-[#EA580C] shadow-sm"
                />
              </div>

              <div>
                <input
                  type="tel"
                  required
                  value={leadPhone}
                  onChange={(e) => setLeadPhone(e.target.value)}
                  placeholder="10-digit Mobile Number *"
                  className="w-full h-12 px-4 rounded-2xl border border-[#D9D2C5] bg-white font-semibold text-sm text-[#183B35] focus:outline-none focus:border-[#EA580C] shadow-sm"
                />
              </div>
            </div>

            {leadError && (
              <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{leadError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLeadSubmitting}
              className="w-full py-4 px-6 rounded-2xl bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-sm sm:text-base shadow-luxury-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] disabled:opacity-50"
            >
              {isLeadSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Unlocking Your Report...</span>
                </>
              ) : (
                <>
                  <Unlock className="w-4 h-4" />
                  <span>Get My Detailed Estimate & Unlock Reports</span>
                </>
              )}
            </button>

            <p className="text-[11px] text-[#8C9C96] text-center">
              🔒 100% Privacy Guaranteed. Zero spam. We only contact regarding your plot estimate.
            </p>
          </form>
        </div>
      ) : (
        <div className="p-4 rounded-2xl bg-[#F0FDF4] border border-[#86EFAC] flex items-center justify-between text-xs text-[#15803D]">
          <span className="font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Full Detailed Engineering Report Unlocked for {leadName || "You"}!
          </span>
          <span className="text-[11px] font-semibold">Report Active</span>
        </div>
      )}

      {/* 6. ADVANCED ENGINEERING REPORTS DASHBOARD (UNLOCKED TABS) */}
      <div className="rounded-3xl bg-[#F8F6F0] border border-[#E9E4DA] p-6 sm:p-10 space-y-6 shadow-luxury-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D9D2C5]">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#EA580C] block">
              DEEP DIVE REPORT STUDIO
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#183B35]">
              Detailed Engineering Specifications & BOQ
            </h3>
          </div>

          {/* Report Tab Selector */}
          <div className="flex bg-white p-1 rounded-2xl border border-[#D9D2C5] shrink-0 overflow-x-auto max-w-full">
            {[
              { id: "phases", label: "10-Phase Breakdown", icon: Layers },
              { id: "vastu", label: "AI Vastu Floor Plan", icon: Compass },
              { id: "materials", label: "Material BOQ", icon: FileSpreadsheet },
              { id: "compare", label: "Compare Packages", icon: TrendingUp },
              { id: "soil", label: "Soil Intelligence", icon: MapPin },
              { id: "faqs", label: "Trust Guide & FAQs", icon: HelpCircle },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeReportTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveReportTab(tab.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    isActive ? "bg-[#183B35] text-[#F4F0E8] shadow-sm" : "text-[#52655E] hover:text-[#183B35]"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* TAB 1: 10-PHASE LIST */}
        {activeReportTab === "phases" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 animate-in fade-in duration-150">
            {phaseBreakdown.map((ph) => (
              <div key={ph.id} className="p-4 rounded-2xl bg-white border border-[#D9D2C5] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-[#EA580C] bg-[#FFF7F3] px-2 py-0.5 rounded-md border border-[#FFD9C6]">
                      Phase {ph.number}
                    </span>
                    <span className="font-display text-sm font-bold text-[#183B35]">{ph.name}</span>
                  </div>
                  <span className="font-display text-sm font-bold text-[#183B35]">
                    {formatInLakhs(ph.amount)}
                  </span>
                </div>
                <p className="text-xs text-[#52655E]">{ph.description}</p>
                <span className="text-[10px] font-bold text-[#8C9C96] block">
                  Timeline: {ph.monthRange} • {ph.percentShare}% share
                </span>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: AI VASTU FLOOR PLAN */}
        {activeReportTab === "vastu" && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="p-3.5 rounded-2xl bg-[#FFF7F3] border border-[#FFD9C6] flex items-center justify-between text-xs text-[#183B35]">
              <span className="font-bold flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-[#EA580C]" />
                100% Vastu-Compliant Spatial Room Schematics (Score: 98/100)
              </span>
              <span className="text-[#EA580C] font-semibold">{plotArea} sqft plot footprint</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {vastuPlan.map((room, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white border border-[#D9D2C5] space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold uppercase tracking-wider text-[#EA580C]">{room.floor}</span>
                    <span className="text-[10px] font-bold text-[#15803D] bg-[#DCFCE7] px-2 py-0.5 rounded">
                      {room.vastuScore}% Vastu
                    </span>
                  </div>
                  <h5 className="font-display text-sm font-bold text-[#183B35]">{room.roomName}</h5>
                  <div className="flex items-center justify-between text-xs text-[#52655E]">
                    <span>Direction:</span>
                    <strong className="text-[#183B35]">{room.zoneDirection}</strong>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#52655E]">
                    <span>Size:</span>
                    <strong className="text-[#183B35]">{room.dimensions}</strong>
                  </div>
                  <p className="text-[11px] text-[#8C9C96] pt-1 border-t border-[#F0EBE0]">{room.significance}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: MATERIAL BOQ */}
        {activeReportTab === "materials" && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-[#D9D2C5] space-y-1">
                <span className="text-[10px] font-bold uppercase text-[#8C9C96] block">Cement Procurement</span>
                <span className="font-display text-xl sm:text-2xl font-bold text-[#EA580C] block">
                  {materialBOQ.cementBagsMin.toLocaleString()} – {materialBOQ.cementBagsMax.toLocaleString()} Bags
                </span>
                <p className="text-xs text-[#52655E]">Ramco / Dalmia 53 Grade OPC & PPC</p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#D9D2C5] space-y-1">
                <span className="text-[10px] font-bold uppercase text-[#8C9C96] block">Steel Reinforcement</span>
                <span className="font-display text-xl sm:text-2xl font-bold text-[#EA580C] block">
                  {materialBOQ.steelKgMin.toLocaleString()} – {materialBOQ.steelKgMax.toLocaleString()} Kg
                </span>
                <p className="text-xs text-[#52655E]">Fe550D TMT bars for columns, beams & slabs</p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#D9D2C5] space-y-1">
                <span className="text-[10px] font-bold uppercase text-[#8C9C96] block">Sand & Aggregate</span>
                <span className="font-display text-xl sm:text-2xl font-bold text-[#EA580C] block">
                  {materialBOQ.msandCftMin.toLocaleString()} cft M-Sand
                </span>
                <p className="text-xs text-[#52655E]">Plus {materialBOQ.aggregateCftMin.toLocaleString()} cft 20mm blue metal</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: COMPARE ALL PACKAGES */}
        {activeReportTab === "compare" && (
          <div className="overflow-x-auto rounded-2xl border border-[#D9D2C5] bg-white animate-in fade-in duration-150">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-[#183B35] text-white">
                  <th className="py-3 px-4 font-bold">Feature</th>
                  {PRO_PACKAGES.map((pkg) => (
                    <th key={pkg.id} className="py-3 px-3 text-center font-bold">
                      {pkg.name} (₹{pkg.ratePerSqft})
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D9D2C5]/60 text-[#183B35]">
                {PRO_COMPARISON_MATRIX.slice(0, 10).map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#FBF9F4]">
                    <td className="py-2 px-4 font-semibold text-[#52655E]">{row.feature}</td>
                    <td className="py-2 px-3 text-center">{String(row.standard)}</td>
                    <td className="py-2 px-3 text-center">{String(row.premium)}</td>
                    <td className="py-2 px-3 text-center">{String(row.luxury)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 5: SOIL INTELLIGENCE */}
        {activeReportTab === "soil" && (
          <div className="p-5 rounded-2xl bg-white border border-[#D9D2C5] space-y-3 animate-in fade-in duration-150 text-xs">
            <div className="flex items-center justify-between border-b border-[#F0EBE0] pb-2">
              <span className="font-display font-bold text-base text-[#183B35]">
                {currentSoilProfile.locality} Geotechnical Strata
              </span>
              <span className="font-bold text-[#EA580C] uppercase">{currentSoilProfile.zone} Zone</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-[#FBF9F4] border border-[#E9E4DA]">
                <span className="text-[10px] text-[#8C9C96] font-bold uppercase block">Strata Type</span>
                <strong className="text-[#183B35]">{currentSoilProfile.soilType}</strong>
              </div>
              <div className="p-3 rounded-xl bg-[#FBF9F4] border border-[#E9E4DA]">
                <span className="text-[10px] text-[#8C9C96] font-bold uppercase block">Water Table Depth</span>
                <strong className="text-[#183B35]">{currentSoilProfile.waterTableDepth}</strong>
              </div>
              <div className="p-3 rounded-xl bg-[#FBF9F4] border border-[#E9E4DA]">
                <span className="text-[10px] text-[#8C9C96] font-bold uppercase block">Waterproofing Spec</span>
                <strong className="text-[#15803D]">{currentSoilProfile.waterproofingGrade}</strong>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-[#FFF7F3] border border-[#FFD9C6] text-[#52655E]">
              <strong>AI Civil Engineering Insight:</strong> {currentSoilProfile.aiInsightTip}
            </div>
          </div>
        )}

        {/* TAB 6: FAQS */}
        {activeReportTab === "faqs" && (
          <div className="space-y-2 animate-in fade-in duration-150">
            {PRO_FAQS.map((faq, idx) => {
              const isOpen = expandedFaq === idx;
              return (
                <div key={idx} className="rounded-2xl border border-[#D9D2C5] bg-white overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setExpandedFaq(isOpen ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-[#183B35] hover:text-[#EA580C] cursor-pointer"
                  >
                    <span>{idx + 1}. {faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-[#8C9C96] transition-transform ${isOpen ? "rotate-180 text-[#EA580C]" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-[#52655E] leading-relaxed border-t border-[#F0EBE0] pt-2.5">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 7. DISCLAIMER */}
      <div className="p-4 rounded-2xl bg-white border border-[#D9D2C5] text-xs text-[#8C9C96] space-y-1">
        <p className="font-bold text-[#52655E]">
          * Indicative Turnkey Estimate Disclaimer
        </p>
        <p>
          This is an indicative estimate based on 2026 Chennai civil construction market benchmarks. Final contracted price is locked through a physical site visit, soil strata test, architectural layout drawings, and approved Bill of Quantities (BOQ) with zero mid-project price escalation.
        </p>
      </div>
    </div>
  );
}
