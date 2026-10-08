"use client";

import React, { useState, useEffect } from "react";
import { PRO_PACKAGES, ProPackageTier } from "@/config/calculatorPro";
import { StepPlotArea } from "./StepPlotArea";
import { StepFloors } from "./StepFloors";
import { StepPackage } from "./StepPackage";
import { StepExtras, SelectedAddonState } from "./StepExtras";
import { StepReport } from "./StepReport";
import { LeadForm } from "../forms/LeadForm";
import {
  Building,
  Layers,
  Sparkles,
  Wrench,
  FileText,
  Clock,
  ShieldCheck,
  Zap,
  CheckCircle,
  X,
} from "lucide-react";
import { trackCalculatorStart, trackCalculatorComplete } from "@/lib/analytics";

export function CostCalculatorPro() {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [plotArea, setPlotArea] = useState<number>(800);
  const [builtUpPerFloor, setBuiltUpPerFloor] = useState<number>(1500);
  const [floors, setFloors] = useState<number>(1);
  const [carParkingArea, setCarParkingArea] = useState<number>(0);
  const [selectedPackage, setSelectedPackage] = useState<ProPackageTier>(PRO_PACKAGES[0]); // Standard default
  const [selectedAddons, setSelectedAddons] = useState<SelectedAddonState>({});
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [hasTrackedStart, setHasTrackedStart] = useState(false);

  // Track calculator start
  useEffect(() => {
    if (!hasTrackedStart) {
      trackCalculatorStart();
      setHasTrackedStart(true);
    }
  }, [hasTrackedStart]);

  // Track completion when reaching step 5
  useEffect(() => {
    if (step === 5) {
      const totalLivingBuiltUp = builtUpPerFloor * floors + (selectedAddons["headroom"]?.enabled ? 200 : 0);
      const totalArea = totalLivingBuiltUp + carParkingArea;
      const baseCost = totalArea * selectedPackage.ratePerSqft;
      trackCalculatorComplete({
        package: selectedPackage.name,
        area: totalArea,
        floors: floors,
        location: "Chennai",
        estimated_cost: baseCost,
      });
    }
  }, [step, builtUpPerFloor, floors, carParkingArea, selectedPackage, selectedAddons]);

  const stepsMeta = [
    { num: 1, label: "PLOT AREA", pct: "0%", icon: Building },
    { num: 2, label: "FLOORS", pct: "25%", icon: Layers },
    { num: 3, label: "PACKAGE", pct: "50%", icon: Sparkles },
    { num: 4, label: "EXTRAS", pct: "75%", icon: Wrench },
    { num: 5, label: "REPORT", pct: "100%", icon: FileText },
  ];

  const currentStepMeta = stepsMeta[step - 1];
  const progressPercent = (step - 1) * 25;

  const handleReset = () => {
    setStep(1);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goToStep = (targetStep: 1 | 2 | 3 | 4 | 5) => {
    setStep(targetStep);
    if (typeof window !== "undefined") {
      const el = document.getElementById("calculator-pro-anchor");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div id="calculator-pro-anchor" className="w-full max-w-5xl mx-auto space-y-8">
      {/* Header Container */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF7F3] border border-[#FFD9C6] text-[#EA580C] text-xs font-bold uppercase tracking-wider">
          <Zap className="w-3.5 h-3.5 fill-[#EA580C]" />
          <span>FREE HOUSE CONSTRUCTION COST CALCULATOR CHENNAI (2026)</span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#183B35]">
          House Construction Cost Calculator
        </h1>
        <p className="text-sm sm:text-base text-[#52655E] max-w-2xl mx-auto">
          Calculate floor-wise civil construction cost in 30 seconds with live 2026 Chennai material & labour benchmarks.
        </p>

        {/* 4 Feature Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 pt-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#D9D2C5] text-[11px] sm:text-xs font-semibold text-[#183B35]">
            <CheckCircle className="w-3.5 h-3.5 text-[#15803D]" /> ₹1,999+ / sq.ft Chennai 2026 rates
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#D9D2C5] text-[11px] sm:text-xs font-semibold text-[#183B35]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#15803D]" /> 10-Phase detailed cost breakdown
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#D9D2C5] text-[11px] sm:text-xs font-semibold text-[#183B35]">
            <Layers className="w-3.5 h-3.5 text-[#15803D]" /> 4 Packages compared side-by-side
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#D9D2C5] text-[11px] sm:text-xs font-semibold text-[#183B35]">
            <Clock className="w-3.5 h-3.5 text-[#15803D]" /> 100% Free · No registration required
          </span>
        </div>
      </div>

      {/* Main Interactive Multi-Step Stepper Box */}
      <div className="rounded-3xl bg-[#FBF9F4] border border-[#D9D2C5] shadow-luxury-md p-5 sm:p-8 space-y-6">
        {/* Stepper Header with Percentage */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-bold text-[#183B35]">
              {step === 5 ? (
                <span className="text-[#15803D]">Full Report Generated</span>
              ) : (
                <>
                  Step {step} of 4 —{" "}
                  <span className="text-[#EA580C] capitalize">
                    {currentStepMeta.label.toLowerCase()}
                  </span>
                </>
              )}
            </span>
            <span className="font-display font-bold text-sm sm:text-base text-[#EA580C]">
              {progressPercent}%
            </span>
          </div>

          {/* Progress Bar */}
          <div className="h-2 w-full bg-[#E9E4DA] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#EA580C] transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* 5 Step Icons Indicator */}
          <div className="grid grid-cols-5 gap-1 pt-1">
            {stepsMeta.map((s) => {
              const isPast = step > s.num;
              const isCurrent = step === s.num;
              const Icon = s.icon;
              return (
                <button
                  key={s.num}
                  type="button"
                  onClick={() => s.num < step && goToStep(s.num as any)}
                  disabled={s.num > step}
                  className={`flex flex-col items-center text-center p-2 rounded-xl transition-all ${
                    isCurrent
                      ? "bg-[#FFF7F3] text-[#EA580C] font-bold"
                      : isPast
                      ? "text-[#183B35] font-semibold hover:bg-[#E9E4D9] cursor-pointer"
                      : "text-[#8C9C96] opacity-60 cursor-not-allowed"
                  }`}
                >
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center mb-1 text-xs ${
                      isCurrent
                        ? "bg-[#EA580C] text-white shadow-sm"
                        : isPast
                        ? "bg-[#183B35] text-[#F4F0E8]"
                        : "bg-[#E9E4DA] text-[#8C9C96]"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-wider hidden sm:block">
                    {s.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step Body */}
        <div className="pt-2">
          {step === 1 && (
            <StepPlotArea
              plotArea={plotArea}
              setPlotArea={setPlotArea}
              builtUpPerFloor={builtUpPerFloor}
              setBuiltUpPerFloor={setBuiltUpPerFloor}
              carParkingArea={carParkingArea}
              setCarParkingArea={setCarParkingArea}
              selectedPackage={selectedPackage}
              floors={floors}
              onNext={() => goToStep(2)}
            />
          )}

          {step === 2 && (
            <StepFloors
              floors={floors}
              setFloors={setFloors}
              builtUpPerFloor={builtUpPerFloor}
              onNext={() => goToStep(3)}
              onBack={() => goToStep(1)}
            />
          )}

          {step === 3 && (
            <StepPackage
              selectedPackage={selectedPackage}
              setSelectedPackage={setSelectedPackage}
              onNext={() => goToStep(4)}
              onBack={() => goToStep(2)}
            />
          )}

          {step === 4 && (
            <StepExtras
              selectedAddons={selectedAddons}
              setSelectedAddons={setSelectedAddons}
              selectedPackage={selectedPackage}
              onNext={() => goToStep(5)}
              onBack={() => goToStep(3)}
            />
          )}

          {step === 5 && (
            <StepReport
              plotArea={plotArea}
              builtUpPerFloor={builtUpPerFloor}
              floors={floors}
              carParkingArea={carParkingArea}
              selectedPackage={selectedPackage}
              selectedAddons={selectedAddons}
              onReset={handleReset}
              onOpenConsultationModal={() => setIsConsultationModalOpen(true)}
            />
          )}
        </div>
      </div>

      {/* Consultation Modal Dialog */}
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
                Lock Your 2026 Construction BOQ
              </h3>
              <p className="text-xs text-[#52655E]">
                Our senior structural engineer will inspect your Chennai plot, verify soil strata, and provide a fixed-price turnkey quote.
              </p>
            </div>

            <LeadForm
              source="calculator_pro_report"
              formType="consultation"
              buttonLabel="Confirm Free Site Visit"
              prefillArea={builtUpPerFloor * floors + carParkingArea}
              prefillPackage={selectedPackage.name}
              prefillFloors={floors}
              prefillEstimatedCost={
                (builtUpPerFloor * floors + carParkingArea) * selectedPackage.ratePerSqft
              }
              onSuccess={() => setIsConsultationModalOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
