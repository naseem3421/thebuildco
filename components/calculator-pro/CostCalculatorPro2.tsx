"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  PRO_PACKAGES,
  PRO_PHASES,
  PRO_ADDONS,
  PRO_COMPARISON_MATRIX,
  PRO_FAQS,
  ProPackageTier,
} from "@/config/calculatorPro";
import {
  ELEVATION_STYLES,
  generateAIVastuPlan,
  optimizeBudget,
  ElevationStyle,
} from "@/config/aiCalculatorEngine";
import { siteConfig } from "@/config/site";
import { LeadForm } from "../forms/LeadForm";
import {
  Building,
  Layers,
  Sparkles,
  Wrench,
  FileSpreadsheet,
  Clock,
  ShieldCheck,
  Zap,
  CheckCircle,
  X,
  Car,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Download,
  Share2,
  PhoneCall,
  Check,
  HelpCircle,
  TrendingUp,
  Info,
  PackageCheck,
  MessageCircle,
  Home,
  Crown,
  Compass,
  Sliders,
  Palette,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  Eye,
} from "lucide-react";
import { trackCalculatorStart, trackCalculatorComplete, trackWhatsAppClick } from "@/lib/analytics";

// Plot Presets for Step 1
const PLOT_PRESETS = [
  { label: "20 × 30", sqft: 600, cents: "1.38", grounds: "0.25 Ground" },
  { label: "30 × 40", sqft: 1200, cents: "2.75", grounds: "0.5 Ground", popular: true },
  { label: "40 × 60", sqft: 2400, cents: "5.51", grounds: "1 Ground" },
  { label: "1 Ground", sqft: 2400, cents: "5.51", grounds: "1 Ground" },
  { label: "2 Grounds", sqft: 4800, cents: "11.02", grounds: "2 Grounds" },
];

export function CostCalculatorPro2() {
  // Navigation Step: 1 = Plot, 2 = Plan, 3 = Package, 4 = Extras, 5 = Estimate Result
  const [currentStep, setCurrentStep] = useState<number>(1);

  // 1. Plot State
  const [plotArea, setPlotArea] = useState<number>(1200);
  const [isCustomPlot, setIsCustomPlot] = useState<boolean>(false);

  // 2. Plan Configuration
  const [floors, setFloors] = useState<number>(2); // Default G+1 (2 Floors)
  const [carParkingArea, setCarParkingArea] = useState<number>(200); // Default 1 car
  const [isAutoBuiltUp, setIsAutoBuiltUp] = useState<boolean>(true);
  const [customBuiltUpPerFloor, setCustomBuiltUpPerFloor] = useState<number>(900);
  const [selectedElevation, setSelectedElevation] = useState<ElevationStyle>(ELEVATION_STYLES[0]); // Contemporary

  // 3. Package Selection
  const [selectedPackage, setSelectedPackage] = useState<ProPackageTier>(PRO_PACKAGES[1]); // Default Premium ₹2,649
  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false);

  // 4. Add-ons Selection
  const [selectedAddons, setSelectedAddons] = useState<{
    [id: string]: { enabled: boolean; customUnit?: number };
  }>({
    underground_sump: { enabled: true, customUnit: 4000 },
    overhead_tank: { enabled: true, customUnit: 2000 },
    compound_wall: { enabled: true, customUnit: 140 },
    main_gate: { enabled: true },
  });

  // 5. Deep Dive & Result Modals
  const [resultDeepTab, setResultDeepTab] = useState<"overview" | "vastu" | "materials" | "compare" | "faqs">("overview");
  const [showDetailed10Phase, setShowDetailed10Phase] = useState<boolean>(false);
  const [activePhaseIndex, setActivePhaseIndex] = useState<number | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [hasTrackedStart, setHasTrackedStart] = useState<boolean>(false);

  // Budget Optimizer State
  const [targetBudgetInput, setTargetBudgetInput] = useState<number>(55); // in Lakhs

  // -------------------------------------------------------------
  // CALCULATIONS ENGINE (Preserved 100% from Source of Truth)
  // -------------------------------------------------------------
  const builtUpPerFloor = useMemo(() => {
    if (!isAutoBuiltUp) return customBuiltUpPerFloor;
    return Math.round(plotArea * 0.75);
  }, [isAutoBuiltUp, customBuiltUpPerFloor, plotArea]);

  const hasHeadroom = !!selectedAddons["headroom"]?.enabled;
  const headroomArea = hasHeadroom ? 200 : 0;
  const totalLivingBuiltUp = builtUpPerFloor * floors + headroomArea;
  const totalBuiltUpArea = totalLivingBuiltUp + carParkingArea;

  const plotCents = (plotArea / 435.6).toFixed(2);
  const rawGrounds = plotArea / 2400;
  const formattedGroundsNum = Number.isInteger(rawGrounds)
    ? rawGrounds.toString()
    : rawGrounds.toFixed(2).replace(/\.?0+$/, "");
  const plotGrounds = `${formattedGroundsNum} ${rawGrounds === 1 ? "Ground" : "Grounds"}`;
  const far = plotArea > 0 ? (totalBuiltUpArea / plotArea).toFixed(2) : "0.00";

  // Base Turnkey Costs
  const baseLivingCost = totalLivingBuiltUp * selectedPackage.ratePerSqft;
  const carParkingCost = carParkingArea * selectedPackage.ratePerSqft;
  const baseCost = baseLivingCost + carParkingCost;

  // Addons cost calculation
  const addonsCost = useMemo(() => {
    return PRO_ADDONS.reduce((sum, addon) => {
      const state = selectedAddons[addon.id];
      if (!state?.enabled) return sum;
      if (addon.id === "headroom") return sum;
      if (addon.type === "fixed") return sum + addon.rate;

      const unitCount = state.customUnit !== undefined ? state.customUnit : addon.defaultUnit || 1;
      const unitRate = addon.rate;
      return sum + unitCount * unitRate;
    }, 0);
  }, [selectedAddons]);

  const grandTotal = baseCost + addonsCost;
  const baseDurationMonths = 10 + (floors - 1) * 4;

  // Range Estimation (-5% Low, +8% High)
  const costLow = Math.round(grandTotal * 0.95);
  const costHigh = Math.round(grandTotal * 1.08);

  // Bank Loan EMI @ 7.1% for 20 Years (240 months)
  const monthlyRate = 0.071 / 12;
  const totalMonths = 240;
  const emi = useMemo(() => {
    if (grandTotal <= 0) return 0;
    return Math.round(
      (grandTotal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
    );
  }, [grandTotal]);

  // -------------------------------------------------------------
  // INDIAN CURRENCY & AMOUNT FORMATTERS:
  // e.g. "1,00,00,000/- (1 Crore)" & "1,00,000/- (1 Lakh)"
  // -------------------------------------------------------------
  const formatIndianNumber = (val: number): string => {
    return val.toLocaleString("en-IN");
  };

  const formatIndianWords = (val: number): string => {
    if (val >= 10000000) {
      const cr = val / 10000000;
      const formatted = Number.isInteger(cr) ? cr.toString() : cr.toFixed(2).replace(/\.?0+$/, "");
      return `${formatted} ${cr === 1 ? "Crore" : "Crores"}`;
    } else if (val >= 100000) {
      const lk = val / 100000;
      const formatted = Number.isInteger(lk) ? lk.toString() : lk.toFixed(2).replace(/\.?0+$/, "");
      return `${formatted} ${lk === 1 ? "Lakh" : "Lakhs"}`;
    } else if (val >= 1000) {
      const th = val / 1000;
      const formatted = Number.isInteger(th) ? th.toString() : th.toFixed(1).replace(/\.?0+$/, "");
      return `${formatted} Thousand`;
    }
    return val.toLocaleString("en-IN");
  };

  const formatFinalAmount = (val: number): string => {
    return `₹${formatIndianNumber(val)}/- (${formatIndianWords(val)})`;
  };

  const formatCurrency = (val: number): string => {
    return `₹${formatIndianNumber(val)}/-`;
  };

  const formatRangeWords = (low: number, high: number): string => {
    return `${formatIndianWords(low)} – ${formatIndianWords(high)}`;
  };

  // AI Vastu Layout
  const vastuLayouts = useMemo(() => {
    return generateAIVastuPlan(plotArea, builtUpPerFloor, floors);
  }, [plotArea, builtUpPerFloor, floors]);

  // AI Budget Optimizer Results
  const budgetOptimization = useMemo(() => {
    return optimizeBudget(targetBudgetInput);
  }, [targetBudgetInput]);

  // Material Estimations
  const cementBagsMin = Math.round(totalBuiltUpArea * 0.4);
  const cementBagsMax = Math.round(totalBuiltUpArea * 0.45);
  const steelKgMin = Math.round(totalBuiltUpArea * 3.5);
  const steelKgMax = Math.round(totalBuiltUpArea * 4.0);
  const msandCftMin = Math.round(totalBuiltUpArea * 1.8);
  const aggregateCftMin = Math.round(totalBuiltUpArea * 1.2);

  // Grouped Categories for "Where Your Money Goes"
  const macroPhases = useMemo(() => {
    const structureCost = Math.round((baseCost * 45) / 100);
    const finishesCost = Math.round((baseCost * 24) / 100);
    const mepCost = Math.round((baseCost * 22) / 100);
    const handoverCost = Math.round((baseCost * 9) / 100);
    return [
      { name: "Structure & Foundation", share: "45%", cost: structureCost, icon: Building, color: "#EAB308", desc: "Excavation, footing, columns, slab casting & brick masonry" },
      { name: "Finishes & Flooring", share: "24%", cost: finishesCost, icon: Palette, color: "#F97316", desc: "Vitrified tiles, teak doors, UPVC windows & Asian Paints" },
      { name: "Plumbing, Electrical & MEP", share: "22%", cost: mepCost, icon: Zap, color: "#3B82F6", desc: "Finolex wiring, Legrand switches, Parryware fittings & waterproofing" },
      { name: "Inspection & Handover", share: "9%", cost: handoverCost, icon: ShieldCheck, color: "#10B981", desc: "150-point QA inspection, debris clearance & 5-year warranty" },
    ];
  }, [baseCost]);

  // Analytics tracking
  useEffect(() => {
    if (!hasTrackedStart) {
      trackCalculatorStart();
      setHasTrackedStart(true);
    }
  }, [hasTrackedStart]);

  useEffect(() => {
    trackCalculatorComplete({
      package: selectedPackage.name,
      area: totalBuiltUpArea,
      floors: floors,
      location: "Chennai",
      estimated_cost: grandTotal,
    });
  }, [totalBuiltUpArea, floors, selectedPackage, grandTotal]);

  // Add-on Bundle Handlers
  const applyCivilEssentialsBundle = () => {
    setSelectedAddons((prev) => ({
      ...prev,
      underground_sump: { enabled: true, customUnit: 4000 },
      overhead_tank: { enabled: true, customUnit: 2000 },
      compound_wall: { enabled: true, customUnit: 140 },
      main_gate: { enabled: true },
    }));
  };

  const applyEcoSmartBundle = () => {
    setSelectedAddons((prev) => ({
      ...prev,
      solar_panels: { enabled: true },
      smart_home: { enabled: true },
      cctv_system: { enabled: true },
    }));
  };

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        enabled: !prev[id]?.enabled,
      },
    }));
  };

  // Apply Budget Optimization
  const handleApplyBudgetOptimization = () => {
    const targetPkg = PRO_PACKAGES.find((p) => p.id === budgetOptimization.recommendedPackage) || PRO_PACKAGES[1];
    setSelectedPackage(targetPkg);
    setFloors(budgetOptimization.recommendedFloors);
    setCurrentStep(5); // Jump straight to result
  };

  // WhatsApp Share Message
  const handleWhatsAppShare = () => {
    trackWhatsAppClick("calculator");
    const addonsList = Object.entries(selectedAddons)
      .filter(([, v]) => v.enabled)
      .map(([id]) => PRO_ADDONS.find((a) => a.id === id)?.name)
      .filter(Boolean)
      .join(", ");

    const text = `*🏡 TBC Chennai House Construction Estimate (Calculator Pro 2)*
-----------------------------------
• *Configuration:* ${floors === 1 ? "Ground Only" : `G+${floors - 1}`} (${floors} Floors)
• *Plot Area:* ${plotArea.toLocaleString("en-IN")} sq.ft (${plotCents} Cents)
• *Total Built-up Area:* ${totalBuiltUpArea.toLocaleString("en-IN")} sq.ft
• *Package:* ${selectedPackage.name} (₹${selectedPackage.ratePerSqft.toLocaleString("en-IN")}/sqft)
• *Est. Total Cost:* ${formatFinalAmount(grandTotal)}
• *Indicative Range:* ₹${formatIndianNumber(costLow)}/- to ₹${formatIndianNumber(costHigh)}/- (${formatRangeWords(costLow, costHigh)})
• *Est. Duration:* ~${baseDurationMonths} Months
• *Est. 20-Yr EMI:* ₹${emi.toLocaleString("en-IN")}/mo
${addonsList ? `• *Selected Extras:* ${addonsList}\n` : ""}-----------------------------------
I would like to schedule a free site consultation to lock this estimate for my Chennai plot.`;

    const url = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(text)}`;
    if (typeof window !== "undefined") {
      window.open(url, "_blank");
    }
  };

  const handleShareLink = () => {
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

  // SVG Donut Slices for Overview Tab (Precision rounded for hydration safety)
  const donutCenter = 150;
  const outerRadius = 140;
  const innerRadius = 82;
  let accumulatedAngle = -90;
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

    const pathData = `M ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 0 0 ${x4} ${y4} Z`;
    const costForPhase = Math.round((baseCost * phase.percentShare) / 100);

    return { phase, pathData, costForPhase };
  });

  const activePhase = activePhaseIndex !== null ? PRO_PHASES[activePhaseIndex] : null;
  const activePhaseCost = activePhase ? Math.round((baseCost * activePhase.percentShare) / 100) : null;

  const stepTitles = [
    { num: 1, label: "01 PLOT" },
    { num: 2, label: "02 PLAN" },
    { num: 3, label: "03 PACKAGE" },
    { num: 4, label: "04 EXTRAS" },
    { num: 5, label: "ESTIMATE" },
  ];

  return (
    <div id="calculator-pro-2-anchor" className="w-full max-w-7xl mx-auto space-y-6 sm:space-y-8 pb-24 lg:pb-8">
      {/* 1. PROGRESS STEPPER */}
      <div className="bg-[#FBF9F4] border border-[#D9D2C5] rounded-2xl p-2.5 sm:p-4 shadow-luxury-sm">
        <div className="flex items-center justify-between overflow-x-auto gap-1 sm:gap-2 pb-1 sm:pb-0 scrollbar-none">
          {stepTitles.map((st) => {
            const isActive = currentStep === st.num;
            const isCompleted = currentStep > st.num;
            return (
              <button
                key={st.num}
                type="button"
                onClick={() => setCurrentStep(st.num)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-[#183B35] text-[#F4F0E8] shadow-sm ring-1 ring-[#183B35]"
                    : isCompleted
                    ? "bg-[#FFF7F3] text-[#EA580C] hover:bg-[#FFEDE0]"
                    : "text-[#52655E] hover:bg-[#E9E4D9]"
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#15803D]" />
                ) : (
                  <span className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold ${
                    isActive ? "bg-[#EA580C] text-white" : "bg-[#D9D2C5] text-[#183B35]"
                  }`}>
                    {st.num}
                  </span>
                )}
                <span>{st.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. TWO-COLUMN LAYOUT: MAIN JOURNEY + STICKY ESTIMATE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* LEFT COLUMN: ACTIVE STEP (7 Cols on Desktop) */}
        <div className="lg:col-span-7 space-y-6">
          {/* ========================================================= */}
          {/* STEP 1: YOUR PLOT */}
          {/* ========================================================= */}
          {currentStep === 1 && (
            <div className="rounded-3xl bg-[#FBF9F4] border border-[#D9D2C5] p-6 sm:p-8 space-y-6 shadow-luxury-sm animate-in fade-in duration-200">
              <div className="space-y-1.5">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#EA580C] bg-[#FFF7F3] px-3 py-1 rounded-full border border-[#FFD9C6] inline-block">
                  STEP 01 · YOUR PLOT
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#183B35]">
                  What's your plot size?
                </h2>
                <p className="text-sm text-[#52655E]">
                  Select a common Chennai plot footprint or enter custom dimensions.
                </p>
              </div>

              {/* Preset Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {PLOT_PRESETS.map((pst) => {
                  const isSelected = !isCustomPlot && plotArea === pst.sqft;
                  return (
                    <button
                      key={pst.label}
                      type="button"
                      onClick={() => {
                        setIsCustomPlot(false);
                        setPlotArea(pst.sqft);
                      }}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? "bg-[#FFF7F3] border-2 border-[#EA580C] shadow-sm ring-1 ring-[#EA580C]"
                          : "bg-white border-[#D9D2C5] hover:bg-[#E9E4D9]"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="font-display text-base font-bold text-[#183B35]">
                            {pst.label}
                          </span>
                          {pst.popular && (
                            <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-[#EA580C] text-white">
                              POPULAR
                            </span>
                          )}
                        </div>
                        <span className="text-xs font-semibold text-[#52655E] block mt-0.5">
                          {pst.sqft.toLocaleString("en-IN")} sq.ft
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-[#EA580C] mt-2 pt-1 border-t border-[#D9D2C5]/50">
                        {pst.cents} Cents · {pst.grounds}
                      </span>
                    </button>
                  );
                })}

                {/* Custom Plot Option Card */}
                <button
                  type="button"
                  onClick={() => setIsCustomPlot(true)}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isCustomPlot
                      ? "bg-[#FFF7F3] border-2 border-[#EA580C] shadow-sm ring-1 ring-[#EA580C]"
                      : "bg-white border-[#D9D2C5] hover:bg-[#E9E4D9]"
                  }`}
                >
                  <div>
                    <span className="font-display text-base font-bold text-[#183B35] block">
                      Custom Size
                    </span>
                    <span className="text-xs font-semibold text-[#52655E] block mt-0.5">
                      Enter exact sq.ft
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-[#183B35] mt-2 pt-1 border-t border-[#D9D2C5]/50">
                    Type your plot area
                  </span>
                </button>
              </div>

              {/* Custom Input Field if toggled */}
              {isCustomPlot && (
                <div className="p-4 rounded-2xl bg-white border border-[#EA580C] space-y-2 animate-in fade-in duration-200">
                  <label htmlFor="custom-plot-input" className="text-xs font-bold uppercase tracking-wider text-[#183B35] block">
                    Enter Plot Area in Square Feet:
                  </label>
                  <div className="relative">
                    <input
                      id="custom-plot-input"
                      type="number"
                      min="300"
                      max="50000"
                      step="50"
                      value={plotArea || ""}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        setPlotArea(isNaN(val) ? 0 : Math.max(0, val));
                      }}
                      className="w-full h-12 px-4 rounded-xl border border-[#D9D2C5] bg-[#FBF9F4] text-[#183B35] font-bold text-lg focus:border-[#EA580C] focus:outline-none"
                      placeholder="e.g. 1500"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[#8C9C96]">
                      sq.ft
                    </span>
                  </div>
                </div>
              )}

              {/* Real-time Land Conversion Display */}
              <div className="p-4 rounded-2xl bg-white border border-[#D9D2C5] flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <span className="text-[10px] uppercase font-bold text-[#8C9C96] block">
                    Selected Plot Area
                  </span>
                  <span className="font-bold text-[#183B35] text-sm">
                    {plotArea.toLocaleString("en-IN")} sq.ft
                  </span>
                </div>
                <div className="text-right space-y-0.5">
                  <span className="text-[10px] uppercase font-bold text-[#8C9C96] block">
                    Tamil Nadu Land Units
                  </span>
                  <span className="font-bold text-[#EA580C] text-sm">
                    {plotCents} Cents · {plotGrounds}
                  </span>
                </div>
              </div>

              {/* Step Navigation Buttons */}
              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-3.5 rounded-2xl bg-[#183B35] hover:bg-[#0D2420] text-white font-bold text-sm transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Continue to Your Plan</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* STEP 2: YOUR PLAN */}
          {/* ========================================================= */}
          {currentStep === 2 && (
            <div className="rounded-3xl bg-[#FBF9F4] border border-[#D9D2C5] p-6 sm:p-8 space-y-6 shadow-luxury-sm animate-in fade-in duration-200">
              <div className="space-y-1.5">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#EA580C] bg-[#FFF7F3] px-3 py-1 rounded-full border border-[#FFD9C6] inline-block">
                  STEP 02 · YOUR PLAN
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#183B35]">
                  How do you want to build?
                </h2>
                <p className="text-sm text-[#52655E]">
                  Choose your floor height, parking space, and architectural elevation.
                </p>
              </div>

              {/* Floor Selection */}
              <div className="space-y-2.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#183B35] flex items-center justify-between">
                  <span>Number of Floors</span>
                  <span className="text-[#EA580C] font-semibold">
                    ~{baseDurationMonths} Months Build Duration
                  </span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 1, name: "Ground Only", label: "1 Floor", duration: "10-12 mo" },
                    { id: 2, name: "G + 1", label: "2 Floors", duration: "14-16 mo" },
                    { id: 3, name: "G + 2", label: "3 Floors", duration: "18-20 mo" },
                    { id: 4, name: "G + 3", label: "4 Floors", duration: "22-24 mo" },
                  ].map((fl) => {
                    const isSelected = floors === fl.id;
                    return (
                      <button
                        key={fl.id}
                        type="button"
                        onClick={() => setFloors(fl.id)}
                        className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? "bg-[#FFF7F3] border-2 border-[#EA580C] shadow-sm ring-1 ring-[#EA580C]"
                            : "bg-white border-[#D9D2C5] hover:bg-[#E9E4D9]"
                        }`}
                      >
                        <div>
                          <span className="font-display text-lg font-bold text-[#183B35] block">
                            {fl.name}
                          </span>
                          <span className="text-[10px] font-semibold text-[#8C9C96] block">
                            {fl.label}
                          </span>
                        </div>
                        <span className="mt-2 text-[9px] font-bold text-[#EA580C] bg-white px-2 py-0.5 rounded-md border border-[#FFD9C6]">
                          {fl.duration}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Car Parking */}
              <div className="space-y-2.5 pt-2 border-t border-[#D9D2C5]/70">
                <label className="text-xs font-bold uppercase tracking-wider text-[#183B35] flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Car className="w-3.5 h-3.5 text-[#EA580C]" /> Car Parking Allocation
                  </span>
                  <span className="text-[#EA580C]">
                    {carParkingArea > 0 ? `${carParkingArea} sq.ft (${Math.round(carParkingArea / 200)} Car)` : "No Covered Parking"}
                  </span>
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: "None", sqft: 0 },
                    { label: "1 Car", sqft: 200 },
                    { label: "2 Cars", sqft: 400 },
                    { label: "3 Cars", sqft: 600 },
                  ].map((pk) => (
                    <button
                      key={pk.sqft}
                      type="button"
                      onClick={() => setCarParkingArea(pk.sqft)}
                      className={`py-2 px-1 text-center rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        carParkingArea === pk.sqft
                          ? "bg-[#EA580C] text-white border-[#EA580C] shadow-sm"
                          : "bg-white text-[#52655E] border-[#D9D2C5] hover:bg-[#E9E4D9]"
                      }`}
                    >
                      {pk.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Built-up Area Recommendation */}
              <div className="space-y-2.5 pt-2 border-t border-[#D9D2C5]/70">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#183B35]">
                    Built-up Area / Floor
                  </span>
                  <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-[#D9D2C5]">
                    <button
                      type="button"
                      onClick={() => setIsAutoBuiltUp(true)}
                      className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                        isAutoBuiltUp ? "bg-[#EA580C] text-white" : "text-[#52655E]"
                      }`}
                    >
                      Smart Auto (75%)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsAutoBuiltUp(false);
                        setCustomBuiltUpPerFloor(builtUpPerFloor);
                      }}
                      className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                        !isAutoBuiltUp ? "bg-[#183B35] text-white" : "text-[#52655E]"
                      }`}
                    >
                      Customize Sqft
                    </button>
                  </div>
                </div>

                {!isAutoBuiltUp ? (
                  <div className="relative animate-in fade-in duration-200">
                    <input
                      type="number"
                      min="300"
                      max="20000"
                      step="50"
                      value={customBuiltUpPerFloor || ""}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        setCustomBuiltUpPerFloor(isNaN(val) ? 0 : Math.max(0, val));
                      }}
                      className="w-full h-12 px-4 rounded-xl border border-[#D9D2C5] bg-white text-[#183B35] font-bold text-base focus:border-[#EA580C] focus:outline-none"
                      placeholder="Enter custom floor area"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[#8C9C96]">
                      sq.ft / floor
                    </span>
                  </div>
                ) : (
                  <div className="p-3 rounded-2xl bg-[#FFF7F3] border border-[#FFD9C6] flex items-center justify-between text-xs text-[#183B35]">
                    <span className="font-semibold">
                      Standard 75% Footprint: <strong>{builtUpPerFloor.toLocaleString("en-IN")} sq.ft</strong> / floor
                    </span>
                    <span className="text-[#EA580C] font-bold">Total: {totalBuiltUpArea.toLocaleString("en-IN")} sq.ft (FAR: {far})</span>
                  </div>
                )}
              </div>

              {/* Optional 3D Elevation Style */}
              <div className="space-y-2.5 pt-2 border-t border-[#D9D2C5]/70">
                <span className="text-xs font-bold uppercase tracking-wider text-[#183B35] block">
                  Architectural Elevation Style (Optional)
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {ELEVATION_STYLES.map((style) => {
                    const isSelected = selectedElevation.id === style.id;
                    return (
                      <button
                        key={style.id}
                        type="button"
                        onClick={() => setSelectedElevation(style)}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#FFF7F3] border-[#EA580C] shadow-sm font-semibold"
                            : "bg-white border-[#D9D2C5] hover:bg-[#E9E4D9]"
                        }`}
                      >
                        <span className="text-xs font-bold text-[#183B35] block leading-tight">
                          {style.name}
                        </span>
                        <span className="text-[10px] text-[#EA580C] font-bold block mt-0.5">
                          {style.badge}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step Navigation Buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-5 py-3 rounded-2xl border border-[#D9D2C5] bg-white hover:bg-[#E9E4D9] text-[#183B35] font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-6 py-3.5 rounded-2xl bg-[#183B35] hover:bg-[#0D2420] text-white font-bold text-sm transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Continue to Packages</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* STEP 3: YOUR PACKAGE */}
          {/* ========================================================= */}
          {currentStep === 3 && (
            <div className="rounded-3xl bg-[#FBF9F4] border border-[#D9D2C5] p-6 sm:p-8 space-y-6 shadow-luxury-sm animate-in fade-in duration-200">
              <div className="space-y-1.5">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#EA580C] bg-[#FFF7F3] px-3 py-1 rounded-full border border-[#FFD9C6] inline-block">
                  STEP 03 · YOUR PACKAGE
                </span>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#183B35]">
                    How would you like your home finished?
                  </h2>
                  <button
                    type="button"
                    onClick={() => setIsCompareModalOpen(true)}
                    className="text-xs font-bold text-[#EA580C] hover:underline flex items-center gap-1 self-start sm:self-auto cursor-pointer"
                  >
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Compare All Packages</span>
                  </button>
                </div>
                <p className="text-sm text-[#52655E]">
                  All packages include 100% turnkey civil construction, soil engineering, and structural warranty.
                </p>
              </div>

              {/* 4 Package Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {PRO_PACKAGES.map((pkg) => {
                  const isSelected = selectedPackage.id === pkg.id;
                  return (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setSelectedPackage(pkg)}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between group ${
                        isSelected
                          ? "bg-[#FFF7F3] border-2 border-[#EA580C] shadow-sm ring-1 ring-[#EA580C]"
                          : "bg-white border-[#D9D2C5] hover:bg-[#E9E4D9]"
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C9C96]">
                            {pkg.badge}
                          </span>
                          {pkg.popular && (
                            <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-[#EA580C] text-white">
                              ★ RECOMMENDED
                            </span>
                          )}
                        </div>

                        <div className="flex items-baseline justify-between">
                          <span className="font-display text-xl font-bold text-[#183B35]">
                            {pkg.name}
                          </span>
                          <div className="text-right">
                            <span className="font-display text-xl font-bold text-[#EA580C]">
                              ₹{pkg.ratePerSqft.toLocaleString("en-IN")}
                            </span>
                            <span className="text-[10px] text-[#8C9C96] block">/ sq.ft</span>
                          </div>
                        </div>

                        <p className="text-xs text-[#52655E] leading-snug">
                          {pkg.tagline}
                        </p>

                        <div className="pt-2 border-t border-[#D9D2C5]/60 space-y-1">
                          {pkg.whatsIncluded.slice(0, 4).map((inc, idx) => (
                            <div key={idx} className="flex items-center gap-1.5 text-[11px] text-[#183B35]">
                              <Check className="w-3 h-3 text-[#15803D] shrink-0" />
                              <span className="truncate">{inc}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3 mt-2 flex items-center justify-between text-xs font-bold text-[#183B35]">
                        <span>{isSelected ? "Selected Package" : "Select Package"}</span>
                        {isSelected ? (
                          <CheckCircle2 className="w-4 h-4 text-[#EA580C]" />
                        ) : (
                          <ChevronRight className="w-3.5 h-3.5 text-[#8C9C96]" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Step Navigation Buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-5 py-3 rounded-2xl border border-[#D9D2C5] bg-white hover:bg-[#E9E4D9] text-[#183B35] font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="px-6 py-3.5 rounded-2xl bg-[#183B35] hover:bg-[#0D2420] text-white font-bold text-sm transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Continue to Optional Extras</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* STEP 4: OPTIONAL EXTRAS */}
          {/* ========================================================= */}
          {currentStep === 4 && (
            <div className="rounded-3xl bg-[#FBF9F4] border border-[#D9D2C5] p-6 sm:p-8 space-y-6 shadow-luxury-sm animate-in fade-in duration-200">
              <div className="space-y-1.5">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#EA580C] bg-[#FFF7F3] px-3 py-1 rounded-full border border-[#FFD9C6] inline-block">
                  STEP 04 · OPTIONAL EXTRAS
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#183B35]">
                  Want to add anything extra?
                </h2>
                <p className="text-sm text-[#52655E]">
                  Select boundary walls, water sumps, solar panels, or smart amenities to include in your turnkey quote.
                </p>
              </div>

              {/* 1-Click Bundles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={applyCivilEssentialsBundle}
                  className="p-3.5 rounded-2xl bg-gradient-to-br from-[#FFF7F3] to-[#FFEDE0] border border-[#FFD9C6] text-left hover:shadow-sm transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#183B35] flex items-center gap-1.5">
                      <PackageCheck className="w-4 h-4 text-[#EA580C]" /> 1-Click Civil Essentials
                    </span>
                    <span className="text-[10px] font-extrabold text-[#EA580C] uppercase tracking-wider">
                      RECOMMENDED
                    </span>
                  </div>
                  <p className="text-[11px] text-[#52655E] mt-1 leading-tight">
                    Enables 4,000L Sump + 2,000L Tank + 140 rft Compound Wall + Gate.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={applyEcoSmartBundle}
                  className="p-3.5 rounded-2xl bg-gradient-to-br from-[#F0FDF4] to-[#DCFCE7] border border-[#86EFAC] text-left hover:shadow-sm transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#183B35] flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-[#16A34A]" /> 1-Click Eco & Smart Living
                    </span>
                    <span className="text-[10px] font-extrabold text-[#16A34A] uppercase tracking-wider">
                      +₹2,00,000/-
                    </span>
                  </div>
                  <p className="text-[11px] text-[#52655E] mt-1 leading-tight">
                    Enables 3kW Solar Panels + Smart Home Automation + 4-Cam CCTV.
                  </p>
                </button>
              </div>

              {/* Grouped Add-ons */}
              <div className="space-y-4">
                {/* Category 1: Essential Civil Extras */}
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#183B35] block">
                    1. Essential Civil Extras
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {PRO_ADDONS.filter((a) =>
                      ["compound_wall", "main_gate", "underground_sump", "overhead_tank"].includes(a.id)
                    ).map((addon) => {
                      const isEnabled = !!selectedAddons[addon.id]?.enabled;
                      return (
                        <div
                          key={addon.id}
                          onClick={() => toggleAddon(addon.id)}
                          className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                            isEnabled
                              ? "bg-[#FFF7F3] border-[#EA580C] shadow-sm font-semibold"
                              : "bg-white border-[#D9D2C5] hover:bg-[#E9E4D9]"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-4 h-4 rounded flex items-center justify-center text-xs ${
                                isEnabled ? "bg-[#EA580C] text-white" : "border border-[#D9D2C5] bg-white"
                              }`}
                            >
                              {isEnabled && <Check className="w-3 h-3" />}
                            </div>
                            <span className="text-xs text-[#183B35] leading-snug">{addon.name}</span>
                          </div>
                          <span className="text-[11px] font-bold text-[#EA580C] shrink-0">
                            {addon.formattedRateDisplay}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Category 2: Smart & Eco Living */}
                <div className="space-y-2 pt-2 border-t border-[#D9D2C5]/50">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#183B35] block">
                    2. Smart & Eco Living
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {PRO_ADDONS.filter((a) =>
                      ["solar_panels", "cctv_system", "smart_home"].includes(a.id)
                    ).map((addon) => {
                      const isEnabled = !!selectedAddons[addon.id]?.enabled;
                      return (
                        <div
                          key={addon.id}
                          onClick={() => toggleAddon(addon.id)}
                          className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                            isEnabled
                              ? "bg-[#FFF7F3] border-[#EA580C] shadow-sm font-semibold"
                              : "bg-white border-[#D9D2C5] hover:bg-[#E9E4D9]"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-4 h-4 rounded flex items-center justify-center text-xs ${
                                isEnabled ? "bg-[#EA580C] text-white" : "border border-[#D9D2C5] bg-white"
                              }`}
                            >
                              {isEnabled && <Check className="w-3 h-3" />}
                            </div>
                            <span className="text-xs text-[#183B35] leading-snug">{addon.name}</span>
                          </div>
                          <span className="text-[11px] font-bold text-[#EA580C] shrink-0">
                            {addon.formattedRateDisplay}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Category 3: Additional Construction */}
                <div className="space-y-2 pt-2 border-t border-[#D9D2C5]/50">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#183B35] block">
                    3. Additional Construction
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {PRO_ADDONS.filter((a) =>
                      ["headroom", "septic_tank", "waste_water_tank", "lift"].includes(a.id)
                    ).map((addon) => {
                      const isEnabled = !!selectedAddons[addon.id]?.enabled;
                      return (
                        <div
                          key={addon.id}
                          onClick={() => toggleAddon(addon.id)}
                          className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                            isEnabled
                              ? "bg-[#FFF7F3] border-[#EA580C] shadow-sm font-semibold"
                              : "bg-white border-[#D9D2C5] hover:bg-[#E9E4D9]"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-4 h-4 rounded flex items-center justify-center text-xs ${
                                isEnabled ? "bg-[#EA580C] text-white" : "border border-[#D9D2C5] bg-white"
                              }`}
                            >
                              {isEnabled && <Check className="w-3 h-3" />}
                            </div>
                            <span className="text-xs text-[#183B35] leading-snug">{addon.name}</span>
                          </div>
                          <span className="text-[11px] font-bold text-[#EA580C] shrink-0">
                            {addon.formattedRateDisplay}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Step Navigation Buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-5 py-3 rounded-2xl border border-[#D9D2C5] bg-white hover:bg-[#E9E4D9] text-[#183B35] font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(5)}
                  className="px-6 py-3.5 rounded-2xl bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-sm transition-all flex items-center gap-2 cursor-pointer shadow-luxury-md"
                >
                  <span>View Final Estimate Dashboard</span>
                  <Sparkles className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* STEP 5: RESULT / DASHBOARD */}
          {/* ========================================================= */}
          {currentStep === 5 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Main Hero Result Card */}
              <div className="rounded-3xl bg-gradient-to-br from-[#183B35] to-[#0D2420] text-[#F4F0E8] p-6 sm:p-8 shadow-luxury-lg border border-[#3E5C54] space-y-6">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#EA580C] bg-[#EA580C]/20 px-3 py-1 rounded-full border border-[#EA580C]/30 inline-flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> OFFICIAL TURNKEY ESTIMATE
                    </span>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="text-xs text-[#8C9C96] hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Edit Inputs</span>
                    </button>
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-white pt-1">
                    Your TBC Construction Estimate
                  </h2>
                  <p className="text-xs sm:text-sm text-[#8C9C96]">
                    Calculated for {plotArea.toLocaleString("en-IN")} sq.ft plot · {floors === 1 ? "Ground Only" : `G+${floors - 1}`} · {selectedPackage.name} Package.
                  </p>
                </div>

                {/* 4 Primary KPIs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C9C96] block">
                      Estimated Cost
                    </span>
                    <span className="font-display text-lg sm:text-xl font-bold text-white block mt-0.5">
                      {formatCurrency(grandTotal)}
                    </span>
                    <span className="text-[11px] text-[#86EFAC] font-bold block">
                      ({formatIndianWords(grandTotal)})
                    </span>
                    <span className="text-[9px] text-[#8C9C96] block mt-0.5">
                      Range: {formatRangeWords(costLow, costHigh)}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C9C96] block">
                      Built-up Area
                    </span>
                    <span className="font-display text-lg sm:text-xl font-bold text-white block mt-0.5">
                      {totalBuiltUpArea.toLocaleString("en-IN")}
                    </span>
                    <span className="text-[10px] text-[#8C9C96] block">
                      sq.ft total living
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C9C96] block">
                      Timeline
                    </span>
                    <span className="font-display text-lg sm:text-xl font-bold text-white block mt-0.5">
                      ~{baseDurationMonths} Mo
                    </span>
                    <span className="text-[10px] text-[#8C9C96] block">
                      turnkey handover
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C9C96] block">
                      Bank Loan EMI
                    </span>
                    <span className="font-display text-lg sm:text-xl font-bold text-[#86EFAC] block mt-0.5">
                      ₹{emi.toLocaleString("en-IN")}/-
                    </span>
                    <span className="text-[10px] text-[#8C9C96] block">
                      per month (20 Yr @ 7.1%)
                    </span>
                  </div>
                </div>

                {/* Conversion Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsConsultationModalOpen(true)}
                    className="py-3.5 px-4 rounded-2xl bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-sm shadow-luxury-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>Book Free Site Visit & Soil Test</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppShare}
                    className="py-3.5 px-4 rounded-2xl bg-[#15803D] hover:bg-[#166534] text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send Estimate to WhatsApp</span>
                  </button>
                </div>

                <div className="flex items-center justify-between pt-1 text-xs text-[#8C9C96]">
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" /> Download PDF Summary
                  </button>
                  <button
                    type="button"
                    onClick={handleShareLink}
                    className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-[#86EFAC]" /> : <Share2 className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copied Link" : "Share Estimate"}</span>
                  </button>
                </div>
              </div>

              {/* Where Your Money Goes (Grouped Breakdown) */}
              <div className="rounded-3xl bg-[#FBF9F4] border border-[#D9D2C5] p-6 sm:p-7 space-y-4 shadow-luxury-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Layers className="w-5 h-5 text-[#EA580C]" />
                    <h3 className="font-display text-lg sm:text-xl font-bold text-[#183B35]">
                      Where Your Money Goes
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowDetailed10Phase(!showDetailed10Phase)}
                    className="text-xs font-bold text-[#EA580C] hover:underline cursor-pointer"
                  >
                    {showDetailed10Phase ? "Hide 10 Phases" : "View Detailed 10 Phases →"}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {macroPhases.map((mp, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-white border border-[#D9D2C5] space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#183B35] flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: mp.color }} />
                          {mp.name}
                        </span>
                        <span className="text-xs font-bold text-[#EA580C]">{formatFinalAmount(mp.cost)}</span>
                      </div>
                      <p className="text-[11px] text-[#52655E] leading-tight">
                        {mp.desc}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Optional Detailed 10-Phase View with Donut */}
                {showDetailed10Phase && (
                  <div className="pt-4 border-t border-[#D9D2C5]/70 space-y-4 animate-in fade-in duration-200">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
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
                          <span className="font-display text-xl font-bold text-[#183B35]">
                            {activePhase ? `${activePhase.percentShare}%` : "10 Phases"}
                          </span>
                          <span className="text-[9px] font-bold text-[#8C9C96] truncate max-w-[100px]">
                            {activePhase ? activePhase.name : "BASE CIVIL COST"}
                          </span>
                        </div>
                      </div>

                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
                        {PRO_PHASES.map((ph, idx) => {
                          const phaseCost = Math.round((baseCost * ph.percentShare) / 100);
                          return (
                            <div
                              key={ph.id}
                              onMouseEnter={() => setActivePhaseIndex(idx)}
                              onMouseLeave={() => setActivePhaseIndex(null)}
                              className="p-2.5 rounded-xl bg-white border border-[#D9D2C5] flex items-center justify-between text-xs"
                            >
                              <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: ph.color }} />
                                <span className="font-semibold text-[#183B35]">{ph.number}. {ph.name}</span>
                              </div>
                              <span className="font-bold text-[#EA580C]">{formatCurrency(phaseCost)}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Transparent Cost Accounting (Why The Price Changed) */}
              <div className="rounded-3xl bg-[#FBF9F4] border border-[#D9D2C5] p-6 sm:p-7 space-y-3 shadow-luxury-sm">
                <h3 className="font-display text-lg font-bold text-[#183B35]">
                  Transparent Cost Accounting
                </h3>
                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-xl bg-white border border-[#D9D2C5] flex items-center justify-between">
                    <span>Living Built-up ({totalLivingBuiltUp.toLocaleString("en-IN")} sq.ft × ₹{selectedPackage.ratePerSqft}/sqft):</span>
                    <strong className="text-[#183B35]">{formatFinalAmount(baseLivingCost)}</strong>
                  </div>
                  {carParkingArea > 0 && (
                    <div className="p-3 rounded-xl bg-white border border-[#D9D2C5] flex items-center justify-between">
                      <span>Covered Car Parking ({carParkingArea} sq.ft × ₹{selectedPackage.ratePerSqft}/sqft):</span>
                      <strong className="text-[#183B35]">{formatFinalAmount(carParkingCost)}</strong>
                    </div>
                  )}
                  {addonsCost > 0 && (
                    <div className="p-3 rounded-xl bg-white border border-[#D9D2C5] flex items-center justify-between">
                      <span>Selected Optional Extras (Sump, Tank, Gate, Solar, etc.):</span>
                      <strong className="text-[#EA580C]">+{formatFinalAmount(addonsCost)}</strong>
                    </div>
                  )}
                  <div className="p-3.5 rounded-xl bg-[#FFF7F3] border border-[#FFD9C6] flex items-center justify-between font-bold text-sm text-[#183B35]">
                    <span>Total Turnkey Estimated Value:</span>
                    <span className="text-[#EA580C]">{formatFinalAmount(grandTotal)}</span>
                  </div>
                </div>
              </div>

              {/* What's Included / What's Not Included */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-3xl bg-white border border-[#D9D2C5] space-y-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#15803D] flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4" /> What's Included in Quote
                  </span>
                  <ul className="space-y-1.5 text-xs text-[#52655E]">
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#15803D] shrink-0 mt-0.5" />
                      <span>100% turnkey civil foundation to keys handover</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#15803D] shrink-0 mt-0.5" />
                      <span>Soil testing & structural engineering drawings</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#15803D] shrink-0 mt-0.5" />
                      <span>{selectedPackage.name} tier branded materials (cement, steel, tiles)</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#15803D] shrink-0 mt-0.5" />
                      <span>5-Year comprehensive structural warranty certificate</span>
                    </li>
                  </ul>
                </div>

                <div className="p-5 rounded-3xl bg-white border border-[#D9D2C5] space-y-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#8C9C96] flex items-center gap-1.5">
                    <Info className="w-4 h-4" /> Standard Exclusions
                  </span>
                  <ul className="space-y-1.5 text-xs text-[#52655E]">
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#8C9C96] font-bold">—</span>
                      <span>Government statutory plan sanction & regularisation fees</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#8C9C96] font-bold">—</span>
                      <span>TANGEDCO (EB) external meter connection charges</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#8C9C96] font-bold">—</span>
                      <span>Interior loose furniture, curtains & soft furnishings</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: STICKY LIVE ESTIMATE PANEL (5 Cols on Desktop) */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
          {/* Main Hero Summary Card */}
          <div className="rounded-3xl bg-gradient-to-br from-[#183B35] to-[#0D2420] text-[#F4F0E8] p-6 shadow-luxury-lg border border-[#3E5C54] relative overflow-hidden space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#EA580C] bg-[#EA580C]/20 px-3 py-1 rounded-full border border-[#EA580C]/30 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> LIVE 2026 ESTIMATE
              </span>
              <span className="text-xs font-semibold text-[#8C9C96]">
                ~{baseDurationMonths} Mo Build
              </span>
            </div>

            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
                  {formatCurrency(grandTotal)}
                </span>
              </div>
              <span className="text-sm font-bold text-[#86EFAC] block mt-0.5">
                {formatIndianWords(grandTotal)}
              </span>
              <span className="text-xs text-[#8C9C96] block mt-0.5">
                Range: {formatRangeWords(costLow, costHigh)}
              </span>
            </div>

            {/* Quick Specs Overview */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-xs">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <span className="text-[10px] uppercase font-bold text-[#8C9C96] block">
                  Total Built-up
                </span>
                <span className="font-bold text-white text-sm">
                  {totalBuiltUpArea.toLocaleString("en-IN")} sqft
                </span>
                <span className="text-[10px] text-[#8C9C96]">
                  {selectedPackage.name} (₹{selectedPackage.ratePerSqft}/sqft)
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <span className="text-[10px] uppercase font-bold text-[#8C9C96] block">
                  Est. Bank EMI
                </span>
                <span className="font-bold text-[#86EFAC] text-sm">
                  ₹{emi.toLocaleString("en-IN")}/-
                </span>
                <span className="text-[10px] text-[#8C9C96]">20 Yr @ 7.1% P.A.</span>
              </div>
            </div>

            {/* Selected Configuration Summary */}
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1.5 text-xs text-white/90">
              <div className="flex items-center justify-between">
                <span>Configuration:</span>
                <span className="font-bold text-white">{floors === 1 ? "Ground Only" : `G+${floors - 1}`} ({floors} Floors)</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Plot Footprint:</span>
                <span className="font-bold text-white">{plotArea.toLocaleString("en-IN")} sq.ft ({plotCents} Cents)</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Elevation Style:</span>
                <span className="font-bold text-white">{selectedElevation.name}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              {currentStep !== 5 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(5)}
                  className="w-full py-3.5 px-4 rounded-2xl bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-sm shadow-luxury-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                >
                  <Eye className="w-4 h-4" />
                  <span>View Detailed Estimate →</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsConsultationModalOpen(true)}
                  className="w-full py-3.5 px-4 rounded-2xl bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-sm shadow-luxury-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Book Free Site Visit & Soil Test</span>
                </button>
              )}

              <button
                type="button"
                onClick={handleWhatsAppShare}
                className="w-full py-3 px-4 rounded-2xl bg-[#15803D] hover:bg-[#166534] text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send Estimate to WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Budget Goal Optimizer Slider (Redesigned) */}
          <div className="rounded-3xl bg-[#FBF9F4] border border-[#D9D2C5] p-5 space-y-3 shadow-luxury-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#183B35] flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-[#EA580C]" /> What's Your Construction Budget?
              </span>
              <span className="text-[10px] font-extrabold text-[#EA580C] uppercase tracking-wider">
                SMART FIT
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-[#183B35]">
                <span>Target Budget:</span>
                <span className="font-display text-base text-[#EA580C]">
                  {formatFinalAmount(targetBudgetInput * 100000)}
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="150"
                step="5"
                value={targetBudgetInput}
                onChange={(e) => setTargetBudgetInput(parseInt(e.target.value))}
                className="w-full accent-[#EA580C] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#8C9C96]">
                <span>₹20,00,000/- (20 Lakhs)</span>
                <span>₹80,00,000/- (80 Lakhs)</span>
                <span>₹1,50,00,000/- (1.5 Crores)</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white border border-[#D9D2C5] space-y-1.5 text-xs">
              <span className="text-[10px] uppercase font-bold text-[#8C9C96] block">
                Best-Fit Plan Recommendation:
              </span>
              <div className="flex items-center justify-between font-bold text-[#183B35]">
                <span className="capitalize">{budgetOptimization.recommendedPackage} Tier (G+{budgetOptimization.recommendedFloors - 1})</span>
                <span className="text-[#EA580C]">~{budgetOptimization.premiumSqft.toLocaleString("en-IN")} sqft</span>
              </div>
              <button
                type="button"
                onClick={handleApplyBudgetOptimization}
                className="w-full mt-1.5 py-2 rounded-xl bg-[#183B35] hover:bg-[#0D2420] text-white font-bold text-xs transition-all cursor-pointer"
              >
                Apply This Plan
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. DEEP DIVE REPORT STUDIO (PROGRESSIVE DISCLOSURE TABS) */}
      <div className="rounded-3xl bg-[#F8F6F0] border border-[#E9E4DA] p-6 sm:p-8 space-y-6 mt-8 shadow-luxury-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D9D2C5]">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#EA580C] block">
              DEEP DIVE REPORT STUDIO
            </span>
            <h2 className="font-display text-2xl font-bold text-[#183B35] mt-0.5">
              Detailed Engineering Estimate & Specifications
            </h2>
          </div>

          <div className="flex bg-white p-1 rounded-2xl border border-[#D9D2C5] shrink-0 self-start sm:self-auto overflow-x-auto max-w-full">
            {[
              { id: "overview", label: "10-Phase Breakdown", icon: Layers },
              { id: "vastu", label: "AI Vastu Plan", icon: Compass },
              { id: "materials", label: "Material BOQ", icon: FileSpreadsheet },
              { id: "compare", label: "Package Matrix", icon: TrendingUp },
              { id: "faqs", label: "Trust & FAQs", icon: HelpCircle },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = resultDeepTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setResultDeepTab(tab.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? "bg-[#183B35] text-[#F4F0E8] shadow-sm"
                      : "text-[#52655E] hover:text-[#183B35]"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* TAB 1: 10-Phase Overview */}
        {resultDeepTab === "overview" && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {PRO_PHASES.map((ph) => {
                const phaseCost = Math.round((baseCost * ph.percentShare) / 100);
                return (
                  <div key={ph.id} className="p-3.5 rounded-2xl bg-white border border-[#D9D2C5] space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: ph.color }} />
                        <span className="font-bold text-xs text-[#183B35]">{ph.number}. {ph.name}</span>
                      </div>
                      <span className="text-xs font-bold text-[#EA580C]">{formatFinalAmount(phaseCost)}</span>
                    </div>
                    <p className="text-[11px] text-[#52655E] leading-snug">{ph.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: Vastu Plan */}
        {resultDeepTab === "vastu" && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="p-3.5 rounded-2xl bg-[#FFF7F3] border border-[#FFD9C6] flex items-center justify-between text-xs">
              <span className="font-bold text-[#183B35]">
                100% Vastu-Compliant Room Layout Schematic ({plotArea} sq.ft Footprint)
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#15803D] text-white font-bold">
                Vastu Score: 98/100
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {vastuLayouts.map((room, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-white border border-[#D9D2C5] space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#EA580C] uppercase">{room.floor}</span>
                    <span className="text-[9px] font-bold text-[#15803D] bg-[#DCFCE7] px-1.5 py-0.2 rounded">
                      {room.vastuScore}% Vastu
                    </span>
                  </div>
                  <h5 className="font-display font-bold text-[#183B35]">{room.roomName}</h5>
                  <div className="flex justify-between text-[#52655E] pt-1">
                    <span>Direction: <strong className="text-[#EA580C]">{room.zoneDirection}</strong></span>
                    <span>Size: <strong className="text-[#183B35]">{room.dimensions}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Material BOQ */}
        {resultDeepTab === "materials" && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-white border border-[#D9D2C5] space-y-1 text-xs">
                <span className="text-[10px] font-bold uppercase text-[#8C9C96]">Cement Procurement</span>
                <span className="font-display text-xl font-bold text-[#EA580C] block">
                  {cementBagsMin.toLocaleString("en-IN")} – {cementBagsMax.toLocaleString("en-IN")} Bags
                </span>
                <p className="text-[#52655E]">0.40–0.45 bags/sq.ft standard mix for Ramco/Dalmia 53 Grade.</p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#D9D2C5] space-y-1 text-xs">
                <span className="text-[10px] font-bold uppercase text-[#8C9C96]">Steel Reinforcement</span>
                <span className="font-display text-xl font-bold text-[#EA580C] block">
                  {steelKgMin.toLocaleString("en-IN")} – {steelKgMax.toLocaleString("en-IN")} Kg
                </span>
                <p className="text-[#52655E]">3.5–4.0 kg/sq.ft Fe550D TMT bars for columns, plinth & roof slabs.</p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#D9D2C5] space-y-1 text-xs">
                <span className="text-[10px] font-bold uppercase text-[#8C9C96]">Sand & Blue Metal</span>
                <span className="font-display text-xl font-bold text-[#EA580C] block">
                  {msandCftMin.toLocaleString("en-IN")} cft M-Sand
                </span>
                <p className="text-[#52655E]">Plus {aggregateCftMin.toLocaleString("en-IN")} cft 20mm blue metal aggregate.</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Compare All Packages */}
        {resultDeepTab === "compare" && (
          <div className="space-y-4 animate-in fade-in duration-200 overflow-x-auto">
            <div className="rounded-2xl border border-[#D9D2C5] bg-white overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[#183B35] text-white">
                    <th className="py-2.5 px-3 uppercase font-bold text-[11px]">Feature</th>
                    {PRO_PACKAGES.map((pkg) => (
                      <th
                        key={pkg.id}
                        className={`py-2.5 px-3 text-center font-bold ${
                          selectedPackage.id === pkg.id ? "bg-[#EA580C]" : ""
                        }`}
                      >
                        <span className="block font-display text-xs">{pkg.name}</span>
                        <span className="text-[9px] font-normal opacity-90">
                          ₹{pkg.ratePerSqft.toLocaleString("en-IN")}/sqft
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D9D2C5]/60 text-[#183B35]">
                  {PRO_COMPARISON_MATRIX.slice(0, 12).map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#FBF9F4]">
                      <td className="py-2 px-3 font-semibold text-[#52655E]">{row.feature}</td>
                      <td className="py-2 px-3 text-center">{typeof row.basic === "boolean" ? (row.basic ? <CheckCircle className="w-3 h-3 text-[#15803D] mx-auto" /> : "—") : row.basic}</td>
                      <td className="py-2 px-3 text-center">{typeof row.standard === "boolean" ? (row.standard ? <CheckCircle className="w-3 h-3 text-[#15803D] mx-auto" /> : "—") : row.standard}</td>
                      <td className="py-2 px-3 text-center">{typeof row.premium === "boolean" ? (row.premium ? <CheckCircle className="w-3 h-3 text-[#15803D] mx-auto" /> : "—") : row.premium}</td>
                      <td className="py-2 px-3 text-center">{typeof row.luxury === "boolean" ? (row.luxury ? <CheckCircle className="w-3 h-3 text-[#15803D] mx-auto" /> : "—") : row.luxury}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: FAQs */}
        {resultDeepTab === "faqs" && (
          <div className="space-y-2.5 animate-in fade-in duration-200">
            {PRO_FAQS.slice(0, 4).map((faq, idx) => {
              const isOpen = expandedFaq === idx;
              return (
                <div key={idx} className="rounded-2xl border border-[#D9D2C5] bg-white overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setExpandedFaq(isOpen ? null : idx)}
                    className="w-full p-3.5 text-left flex items-center justify-between gap-3 font-display font-bold text-xs text-[#183B35] hover:text-[#EA580C] cursor-pointer"
                  >
                    <span>{idx + 1}. {faq.question}</span>
                    <ChevronDown className={`w-3.5 h-3.5 text-[#8C9C96] transition-transform ${isOpen ? "rotate-180 text-[#EA580C]" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="px-3.5 pb-3.5 text-xs text-[#52655E] leading-relaxed border-t border-[#F0EBE0] pt-2">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. PACKAGE COMPARISON MODAL */}
      {isCompareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl rounded-3xl bg-[#FBF9F4] border border-[#D9D2C5] shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#D9D2C5]">
              <div>
                <h3 className="font-display text-xl font-bold text-[#183B35]">
                  Full Package Comparison Matrix
                </h3>
                <p className="text-xs text-[#52655E]">
                  Compare all 4 construction tiers side-by-side with verified Chennai brand specifications.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsCompareModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#E9E4DA] hover:bg-[#D9D2C5] text-[#183B35] flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-[#D9D2C5] bg-white">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[#183B35] text-white">
                    <th className="py-3 px-4 uppercase font-bold text-xs">Specification</th>
                    {PRO_PACKAGES.map((pkg) => (
                      <th
                        key={pkg.id}
                        className={`py-3 px-4 text-center font-bold ${
                          selectedPackage.id === pkg.id ? "bg-[#EA580C]" : ""
                        }`}
                      >
                        <span className="block font-display text-sm">{pkg.name}</span>
                        <span className="text-[10px] font-normal opacity-90">
                          ₹{pkg.ratePerSqft.toLocaleString("en-IN")}/sqft
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D9D2C5]/60 text-[#183B35]">
                  {PRO_COMPARISON_MATRIX.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#FBF9F4]">
                      <td className="py-2.5 px-4 font-semibold text-[#52655E]">{row.feature}</td>
                      <td className="py-2.5 px-4 text-center">{typeof row.basic === "boolean" ? (row.basic ? <CheckCircle className="w-3.5 h-3.5 text-[#15803D] mx-auto" /> : "—") : row.basic}</td>
                      <td className="py-2.5 px-4 text-center">{typeof row.standard === "boolean" ? (row.standard ? <CheckCircle className="w-3.5 h-3.5 text-[#15803D] mx-auto" /> : "—") : row.standard}</td>
                      <td className="py-2.5 px-4 text-center">{typeof row.premium === "boolean" ? (row.premium ? <CheckCircle className="w-3.5 h-3.5 text-[#15803D] mx-auto" /> : "—") : row.premium}</td>
                      <td className="py-2.5 px-4 text-center">{typeof row.luxury === "boolean" ? (row.luxury ? <CheckCircle className="w-3.5 h-3.5 text-[#15803D] mx-auto" /> : "—") : row.luxury}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setIsCompareModalOpen(false)}
                className="px-6 py-2.5 rounded-xl bg-[#183B35] text-white font-bold text-xs cursor-pointer"
              >
                Close Comparison
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. CONSULTATION & FREE SITE VISIT LEAD MODAL */}
      {isConsultationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#FBF9F4] border border-[#D9D2C5] shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setIsConsultationModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#E9E4DA] hover:bg-[#D9D2C5] text-[#183B35] flex items-center justify-center transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-2 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF7F3] border border-[#FFD9C6] text-[#EA580C] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" /> Book Free Site Assessment
              </span>
              <h3 className="font-display text-2xl font-bold text-[#183B35]">
                Lock Your 2026 Construction Quote
              </h3>
              <p className="text-xs text-[#52655E]">
                Our senior structural engineer will inspect your Chennai plot, survey site conditions, and provide a fixed-price turnkey agreement.
              </p>
            </div>

            <LeadForm
              source="calculator_pro_2_ux_rebuild"
              formType="consultation"
              buttonLabel="Confirm Free Site Visit"
              prefillArea={totalBuiltUpArea}
              prefillPackage={selectedPackage.name}
              prefillFloors={floors}
              prefillEstimatedCost={grandTotal}
              onSuccess={() => setIsConsultationModalOpen(false)}
            />
          </div>
        </div>
      )}

      {/* 6. MOBILE STICKY BOTTOM ESTIMATE BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#183B35] border-t border-[#3E5C54] p-3 px-4 shadow-2xl text-white flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-white block">
            {formatCurrency(grandTotal)} ({formatIndianWords(grandTotal)})
          </span>
          <span className="text-[10px] text-[#86EFAC] block">
            {selectedPackage.name} ({floors === 1 ? "Ground" : `G+${floors - 1}`}) · {totalBuiltUpArea.toLocaleString("en-IN")} sqft
          </span>
        </div>

        {currentStep !== 5 ? (
          <button
            type="button"
            onClick={() => setCurrentStep(5)}
            className="px-4 py-2.5 rounded-xl bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-xs shadow-sm flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <span>View Estimate</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setIsConsultationModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-xs shadow-sm flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Book Visit</span>
          </button>
        )}
      </div>
    </div>
  );
}
