"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  calculateEstimate,
  CalculatorInputs,
  CalculationResult,
} from "@/lib/calculator/calculations";
import { decodeCalculatorState } from "@/lib/calculator/shareState";
import { AIInterpretationResult } from "@/app/api/calculator/interpret/route";
import { PRO_PACKAGES, PRO_ADDONS } from "@/config/calculatorPro";
import { CHENNAI_SOIL_DATABASE } from "@/config/aiCalculatorEngine";
import { trackCalculatorStart, trackCalculatorComplete } from "@/lib/analytics";

import { DreamHomeHero } from "./DreamHomeHero";
import { CalculatorProgress } from "./CalculatorProgress";
import { PlotStep } from "./PlotStep";
import { HomeTypeStep } from "./HomeTypeStep";
import { PackageStep } from "./PackageStep";
import { AddonsStep } from "./AddonsStep";
import { LiveEstimateBar } from "./LiveEstimateBar";
import { EstimateResult } from "./EstimateResult";
import { LeadForm } from "../forms/LeadForm";
import { X, Sparkles } from "lucide-react";

function CalculatorPro3Content() {
  const searchParams = useSearchParams();

  // 1. Primary Step State: 0 (Hero AI), 1 (Plot), 2 (Home), 3 (Package), 4 (Add-ons), 5 (Result)
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [hasTrackedStart, setHasTrackedStart] = useState(false);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);

  // 2. Calculator Configuration Inputs
  const [localityKey, setLocalityKey] = useState<string>("medavakkam");
  const [plotArea, setPlotArea] = useState<number>(1200);
  const [isAutoBuiltUp, setIsAutoBuiltUp] = useState<boolean>(true);
  const [customBuiltUpPerFloor, setCustomBuiltUpPerFloor] = useState<number>(900);
  const [floors, setFloors] = useState<number>(2); // Default G+1 (2 Floors)
  const [bhk, setBhk] = useState<number>(3);
  const [homeType, setHomeType] = useState<"independent_house" | "duplex" | "villa">("duplex");
  const [carParkingArea, setCarParkingArea] = useState<number>(200); // Default 1 car (200 sqft)
  const [packageId, setPackageId] = useState<"basic" | "standard" | "premium" | "luxury">("premium");
  const [elevationStyleId, setElevationStyleId] = useState<string>("contemporary");

  // Selected Addons map
  const [selectedAddons, setSelectedAddons] = useState<{
    [id: string]: { enabled: boolean; customUnit?: number };
  }>({
    underground_sump: { enabled: true, customUnit: 4000 },
    overhead_tank: { enabled: true, customUnit: 2000 },
    compound_wall: { enabled: true, customUnit: 140 },
    main_gate: { enabled: true },
  });

  // 3. Hydrate state from shareable URL if available
  useEffect(() => {
    const encodedParam = searchParams.get("estimate");
    if (encodedParam) {
      const decoded = decodeCalculatorState(encodedParam);
      if (decoded) {
        if (decoded.localityKey) setLocalityKey(decoded.localityKey);
        if (decoded.plotArea) setPlotArea(decoded.plotArea);
        if (decoded.isAutoBuiltUp !== undefined) setIsAutoBuiltUp(decoded.isAutoBuiltUp);
        if (decoded.customBuiltUpPerFloor) setCustomBuiltUpPerFloor(decoded.customBuiltUpPerFloor);
        if (decoded.floors) setFloors(decoded.floors);
        if (decoded.bhk) setBhk(decoded.bhk);
        if (decoded.homeType) setHomeType(decoded.homeType as any);
        if (decoded.carParkingArea !== undefined) setCarParkingArea(decoded.carParkingArea);
        if (decoded.packageId) setPackageId(decoded.packageId);
        if (decoded.elevationStyleId) setElevationStyleId(decoded.elevationStyleId);
        if (decoded.selectedAddons) setSelectedAddons(decoded.selectedAddons);
        setCurrentStep(5); // Jump straight to result if loading shared estimate
      }
    }
  }, [searchParams]);

  // 4. Centralized Authoritative Calculations
  const rawInputs: CalculatorInputs = useMemo(
    () => ({
      localityKey,
      plotArea,
      isAutoBuiltUp,
      customBuiltUpPerFloor,
      floors,
      bhk,
      homeType,
      carParkingArea,
      packageId,
      elevationStyleId,
      selectedAddons,
    }),
    [
      localityKey,
      plotArea,
      isAutoBuiltUp,
      customBuiltUpPerFloor,
      floors,
      bhk,
      homeType,
      carParkingArea,
      packageId,
      elevationStyleId,
      selectedAddons,
    ]
  );

  const calculationResult: CalculationResult = useMemo(() => {
    return calculateEstimate(rawInputs);
  }, [rawInputs]);

  // 5. Analytics Tracking
  useEffect(() => {
    if (!hasTrackedStart) {
      trackCalculatorStart();
      setHasTrackedStart(true);
    }
  }, [hasTrackedStart]);

  useEffect(() => {
    if (currentStep === 5) {
      trackCalculatorComplete({
        package: calculationResult.selectedPackage.name,
        area: calculationResult.totalBuiltUpArea,
        floors,
        location: calculationResult.currentSoilProfile.locality,
        estimated_cost: calculationResult.grandTotal,
      });
    }
  }, [currentStep, calculationResult, floors]);

  // 6. AI Dream Home Plan Application Handler
  const handleApplyAIParsedPlan = (aiData: AIInterpretationResult) => {
    if (aiData.plot_sqft) setPlotArea(aiData.plot_sqft);
    if (aiData.floors) setFloors(aiData.floors);
    if (aiData.bhk) setBhk(aiData.bhk);
    if (aiData.home_type) setHomeType(aiData.home_type);
    if (aiData.parking !== null && aiData.parking !== undefined) {
      setCarParkingArea(aiData.parking * 200);
    }
    if (aiData.package) setPackageId(aiData.package);

    if (Array.isArray(aiData.addons) && aiData.addons.length > 0) {
      setSelectedAddons((prev) => {
        const next = { ...prev };
        aiData.addons.forEach((id) => {
          next[id] = { enabled: true };
        });
        return next;
      });
    }

    // Advance directly to the result estimate
    setCurrentStep(5);
  };

  // Add-on Handlers
  const handleToggleAddon = (id: string, customUnit?: number) => {
    setSelectedAddons((prev) => {
      const isCurrentlyEnabled = !!prev[id]?.enabled;
      return {
        ...prev,
        [id]: {
          ...prev[id],
          enabled: !isCurrentlyEnabled,
          customUnit: customUnit !== undefined ? customUnit : prev[id]?.customUnit,
        },
      };
    });
  };

  const handleApplyCivilBundle = () => {
    setSelectedAddons((prev) => ({
      ...prev,
      underground_sump: { enabled: true, customUnit: 4000 },
      overhead_tank: { enabled: true, customUnit: 2000 },
      compound_wall: { enabled: true, customUnit: 140 },
      main_gate: { enabled: true },
    }));
  };

  const handleApplyEcoBundle = () => {
    setSelectedAddons((prev) => ({
      ...prev,
      solar_panels: { enabled: true },
      smart_home: { enabled: true },
      cctv_system: { enabled: true },
    }));
  };

  // Step Navigation Handlers
  const handleNext = () => {
    setCurrentStep((prev) => Math.min(5, prev + 1));
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 120, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  return (
    <div id="calculator-pro-3-anchor" className="w-full max-w-6xl mx-auto space-y-8 pb-16">
      {/* 1. HERO CONVERSATIONAL AI BAR */}
      <DreamHomeHero
        onApplyParsedPlan={handleApplyAIParsedPlan}
        onSkipToManual={() => setCurrentStep(1)}
      />

      {/* 2. MAIN 4-STEP WORKSPACE & LIVE DASHBOARD */}
      <div className="rounded-3xl bg-[#FBF9F4] border border-[#D9D2C5] p-5 sm:p-8 shadow-luxury-md space-y-6">
        {/* Progress bar */}
        <CalculatorProgress
          currentStep={currentStep}
          onStepClick={(step) => setCurrentStep(step)}
          onBack={currentStep > 1 ? handleBack : undefined}
        />

        {/* Dynamic Step Viewports */}
        {currentStep === 1 && (
          <PlotStep
            plotArea={plotArea}
            localityKey={localityKey}
            onSelectPlotArea={(sqft) => setPlotArea(sqft)}
            onSelectLocality={(key) => setLocalityKey(key)}
            onNext={handleNext}
          />
        )}

        {currentStep === 2 && (
          <HomeTypeStep
            plotArea={plotArea}
            floors={floors}
            bhk={bhk}
            homeType={homeType}
            isAutoBuiltUp={isAutoBuiltUp}
            customBuiltUpPerFloor={customBuiltUpPerFloor}
            carParkingArea={carParkingArea}
            onSelectHomeType={(type, bhkVal, suggestedFl) => {
              setHomeType(type);
              setBhk(bhkVal);
              setFloors(suggestedFl);
            }}
            onSelectFloors={(fl) => setFloors(fl)}
            onToggleAutoBuiltUp={(isAuto, customVal) => {
              setIsAutoBuiltUp(isAuto);
              if (customVal !== undefined) setCustomBuiltUpPerFloor(customVal);
            }}
            onSelectParking={(parkingSqft) => setCarParkingArea(parkingSqft)}
            onNext={handleNext}
          />
        )}

        {currentStep === 3 && (
          <PackageStep
            selectedPackageId={packageId}
            totalBuiltUpArea={calculationResult.totalBuiltUpArea}
            onSelectPackage={(id) => setPackageId(id)}
            onNext={handleNext}
          />
        )}

        {currentStep === 4 && (
          <AddonsStep
            selectedAddons={selectedAddons}
            onToggleAddon={handleToggleAddon}
            onApplyCivilBundle={handleApplyCivilBundle}
            onApplyEcoBundle={handleApplyEcoBundle}
            onCalculateResult={() => setCurrentStep(5)}
          />
        )}

        {currentStep === 5 && (
          <EstimateResult
            calculation={calculationResult}
            rawInputs={rawInputs}
            onApplyBudgetPlan={(pkg, fl) => {
              setPackageId(pkg);
              setFloors(fl);
            }}
            onOpenConsultationModal={() => setIsConsultationModalOpen(true)}
            onEditSelection={() => setCurrentStep(1)}
          />
        )}
      </div>

      {/* 3. LIVE ESTIMATE BOTTOM / DESKTOP WIDGET */}
      <LiveEstimateBar
        calculation={calculationResult}
        currentStep={currentStep}
        onNext={handleNext}
        onViewEstimate={() => setCurrentStep(5)}
      />

      {/* 4. CONSULTATION MODAL */}
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
                Our senior civil engineer will visit your Chennai plot (
                {calculationResult.currentSoilProfile.locality}), inspect soil strata, verify road approach, and provide a contract-locked BOQ quote.
              </p>
            </div>

            <LeadForm
              source="calculator_pro_3_modal"
              formType="consultation"
              buttonLabel="Confirm Free Site Visit"
              prefillArea={calculationResult.totalBuiltUpArea}
              prefillPackage={calculationResult.selectedPackage.name}
              prefillFloors={floors}
              prefillEstimatedCost={calculationResult.grandTotal}
              onSuccess={() => setIsConsultationModalOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export function CostCalculatorPro3() {
  return (
    <Suspense fallback={<div className="text-center py-12 text-sm text-[#8C9C96]">Loading Calculator Studio...</div>}>
      <CalculatorPro3Content />
    </Suspense>
  );
}
