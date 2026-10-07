"use client";

import React, { useState, useRef, useEffect } from "react";
import { siteConfig, getWhatsAppUrl } from "@/config/site";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { LeadForm } from "../forms/LeadForm";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import {
  trackCalculatorStart,
  trackCalculatorComplete,
  trackWhatsAppClick,
} from "@/lib/analytics";
import {
  Calculator,
  MessageCircle,
  ChevronRight,
  Info,
  Layers,
  MapPin,
} from "lucide-react";

export function CostCalculatorSection() {
  const [area, setArea] = useState<number>(siteConfig.calculatorConfig.defaultArea);
  const [selectedPackage, setSelectedPackage] = useState<string>(
    siteConfig.calculatorConfig.defaultPackageId
  );
  const [floors, setFloors] = useState<number>(siteConfig.calculatorConfig.defaultFloors);
  const [location, setLocation] = useState<string>("OMR");
  const [showLeadGate, setShowLeadGate] = useState<boolean>(false);

  const hasStartedRef = useRef(false);
  const calcTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentPkg =
    siteConfig.packages.find((p) => p.id === selectedPackage) ||
    siteConfig.packages[1];

  const currentFloorMultiplier =
    siteConfig.calculatorConfig.floorMultipliers.find((f) => f.floors === floors)
      ?.multiplier || 1.0;

  // Exact Calculation Formula
  const baseEstimatedCost = Math.round(
    area * currentPkg.pricePerSqft * currentFloorMultiplier
  );

  const variance = siteConfig.calculatorConfig.variancePercentage;
  const lowerBound = Math.round(baseEstimatedCost * (1 - variance));
  const upperBound = Math.round(baseEstimatedCost * (1 + variance));

  const formatLakhsRange = (low: number, high: number) => {
    const lowLakhs = (low / 100000).toFixed(1);
    const highLakhs = (high / 100000).toFixed(1);

    if (low >= 10000000) {
      const lowCr = (low / 10000000).toFixed(2);
      const highCr = (high / 10000000).toFixed(2);
      return `₹${lowCr}Cr – ₹${highCr}Cr`;
    }

    return `₹${lowLakhs}L – ₹${highLakhs}L`;
  };

  const formattedRange = formatLakhsRange(lowerBound, upperBound);

  const notifyInteraction = () => {
    if (!hasStartedRef.current) {
      hasStartedRef.current = true;
      trackCalculatorStart();
    }
  };

  // Debounced tracking for calculation complete
  useEffect(() => {
    if (!hasStartedRef.current) return;

    if (calcTimerRef.current) {
      clearTimeout(calcTimerRef.current);
    }

    calcTimerRef.current = setTimeout(() => {
      trackCalculatorComplete({
        package: currentPkg.name,
        area,
        floors,
        location,
        estimated_cost: formattedRange,
      });
    }, 1200);

    return () => {
      if (calcTimerRef.current) clearTimeout(calcTimerRef.current);
    };
  }, [area, currentPkg.name, floors, location, formattedRange]);

  const whatsappMessage = siteConfig.whatsappMessages.calculator(
    area,
    location,
    formattedRange
  );

  const handleWhatsAppClick = () => {
    trackWhatsAppClick("calculator", `calculator_${area}sqft_${currentPkg.name}`);
  };

  return (
    <section id="calculator" className="py-16 sm:py-24 bg-[#E9E4D9]/40 border-y border-[#D9D2C5]/80 scroll-mt-20">
      <Container size="wide">
        <SectionHeading
          eyebrow="Interactive Estimation Engine"
          title="Instant Construction Cost Calculator"
          description="Select your built-up area, desired finish tier, and number of floors to calculate an indicative turnkey budget for your plot in Chennai."
          align="center"
        />

        <div className="mt-12 max-w-5xl mx-auto rounded-3xl bg-[#FBF9F4] border border-[#D9D2C5] p-6 sm:p-10 shadow-luxury-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left Column: Interactive Inputs (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* 1. Built-up area */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="calc-area-input"
                    className="text-xs font-semibold text-[#183B35] uppercase tracking-wider flex items-center gap-1.5"
                  >
                    <span>Built-up Area (Sq.Ft)</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      id="calc-area-input"
                      type="number"
                      min={siteConfig.calculatorConfig.minArea}
                      max={siteConfig.calculatorConfig.maxArea}
                      step={siteConfig.calculatorConfig.stepArea}
                      value={area}
                      onFocus={notifyInteraction}
                      onChange={(e) => {
                        notifyInteraction();
                        const val = parseInt(e.target.value);
                        if (!isNaN(val)) {
                          setArea(Math.min(20000, Math.max(100, val)));
                        }
                      }}
                      className="w-24 h-9 px-2 text-right font-display font-bold text-lg rounded-lg border border-[#D9D2C5] bg-[#F4F0E8] text-[#183B35]"
                    />
                    <span className="text-xs font-semibold text-[#52655E]">sqft</span>
                  </div>
                </div>

                <input
                  aria-label="Adjust built-up area in square feet"
                  type="range"
                  min={siteConfig.calculatorConfig.minArea}
                  max={siteConfig.calculatorConfig.maxArea}
                  step={siteConfig.calculatorConfig.stepArea}
                  value={area}
                  onFocus={notifyInteraction}
                  onChange={(e) => {
                    notifyInteraction();
                    setArea(parseInt(e.target.value));
                  }}
                  className="w-full h-2 bg-[#D9D2C5] rounded-lg appearance-none cursor-pointer accent-[#B86F50]"
                />
                <div className="flex justify-between text-[11px] text-[#52655E] mt-1.5 font-medium">
                  <span>600 sqft</span>
                  <span>2,400 sqft (Typical)</span>
                  <span>5,000 sqft</span>
                  <span>10,000 sqft</span>
                </div>
              </div>

              {/* 2. Package Tier Selection */}
              <div>
                <label className="text-xs font-semibold text-[#183B35] uppercase tracking-wider block mb-2.5">
                  Finish & Specification Package
                </label>
                <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                  {siteConfig.packages.map((pkg) => {
                    const isSelected = selectedPackage === pkg.id;
                    return (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => {
                          notifyInteraction();
                          setSelectedPackage(pkg.id);
                        }}
                        className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#183B35] text-[#F4F0E8] border-[#183B35] shadow-luxury-sm ring-2 ring-[#B86F50]/50"
                            : "bg-[#F4F0E8] text-[#183B35] border-[#D9D2C5] hover:bg-[#E9E4D9]"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold">{pkg.name}</span>
                          {pkg.popular && (
                            <span className="text-[9px] uppercase tracking-wider bg-[#B86F50] text-white px-1.5 py-0.5 rounded-full">
                              Popular
                            </span>
                          )}
                        </div>
                        <div className={`text-sm font-semibold mt-1 ${isSelected ? "text-[#E9E4D9]" : "text-[#B86F50]"}`}>
                          {pkg.formattedPrice}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Floors / Typology Selection */}
              <div>
                <label className="text-xs font-semibold text-[#183B35] uppercase tracking-wider block mb-2.5 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#B86F50]" />
                  <span>Number of Floors (Structure Height)</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {siteConfig.calculatorConfig.floorMultipliers.map((f) => (
                    <button
                      key={f.floors}
                      type="button"
                      onClick={() => {
                        notifyInteraction();
                        setFloors(f.floors);
                      }}
                      className={`py-2.5 px-2 text-center rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        floors === f.floors
                          ? "bg-[#B86F50] text-white border-[#B86F50] shadow-luxury-sm"
                          : "bg-[#F4F0E8] text-[#52655E] border-[#D9D2C5] hover:bg-[#E9E4D9]"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Plot Location in Chennai */}
              <div>
                <label
                  htmlFor="calc-location-select"
                  className="text-xs font-semibold text-[#183B35] uppercase tracking-wider block mb-2 flex items-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#B86F50]" />
                  <span>Plot Location in Chennai</span>
                </label>
                <select
                  id="calc-location-select"
                  value={location}
                  onFocus={notifyInteraction}
                  onChange={(e) => {
                    notifyInteraction();
                    setLocation(e.target.value);
                  }}
                  className="w-full h-11 px-3.5 rounded-xl border border-[#D9D2C5] bg-[#F4F0E8] text-[#183B35] text-sm focus:border-[#B86F50] focus:bg-white focus:outline-none transition-colors"
                >
                  {siteConfig.serviceAreas.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Right Column: Output Box & Lead Gate (5 cols) */}
            <div className="lg:col-span-5 rounded-3xl bg-[#0E2420] text-[#F4F0E8] p-6 sm:p-8 flex flex-col justify-between border border-[#183B35] shadow-luxury-md">
              {!showLeadGate ? (
                <div>
                  <div className="flex items-center justify-between text-xs text-[#8C9C96]">
                    <span className="flex items-center gap-1.5 font-semibold">
                      <Calculator className="w-4 h-4 text-[#B86F50]" /> Indicative Construction Cost
                    </span>
                    <Badge variant="sand" size="sm">
                      {currentPkg.name}
                    </Badge>
                  </div>

                  <div className="mt-5 pb-5 border-b border-[#244E46]">
                    <span className="text-xs text-[#8C9C96] uppercase tracking-wider block">
                      Estimated Cost Range
                    </span>
                    <div className="font-display text-3xl sm:text-4xl font-bold text-[#FBF9F4] mt-1">
                      {formattedRange}
                    </div>
                    <span className="text-[11px] text-[#8C9C96] block mt-1">
                      Base rate: ₹{currentPkg.pricePerSqft}/sqft • {area.toLocaleString()} sqft ({floors} Floors)
                    </span>
                  </div>

                  {/* Summary Breakdown */}
                  <div className="mt-5 space-y-2 text-xs text-[#D9D2C5]">
                    <div className="flex justify-between">
                      <span className="text-[#8C9C96]">Selected Plot Zone:</span>
                      <span className="font-semibold text-[#F4F0E8]">{location}, Chennai</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8C9C96]">Specification Tier:</span>
                      <span className="font-semibold text-[#F4F0E8]">{currentPkg.name} ({currentPkg.formattedPrice})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8C9C96]">Warranty Inbuilt:</span>
                      <span className="font-semibold text-[#1E7E34]">5-Year Structural</span>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="mt-8 pt-5 border-t border-[#244E46] space-y-3">
                    <Button
                      variant="primary"
                      size="lg"
                      fullWidth
                      onClick={() => setShowLeadGate(true)}
                      rightIcon={<ChevronRight className="w-4 h-4" />}
                    >
                      Get My Detailed Project Estimate
                    </Button>

                    <Button
                      variant="whatsapp"
                      size="md"
                      fullWidth
                      href={getWhatsAppUrl(whatsappMessage)}
                      onClick={handleWhatsAppClick}
                      leftIcon={<MessageCircle className="w-4 h-4" />}
                    >
                      Discuss Cost on WhatsApp
                    </Button>
                  </div>
                </div>
              ) : (
                /* CALCULATOR LEAD GATE FORM */
                <div className="animate-in fade-in duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#B86F50]">
                      Detailed BOQ & Floor Plan
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowLeadGate(false)}
                      className="text-xs text-[#8C9C96] hover:text-[#F4F0E8] underline"
                    >
                      ← Back
                    </button>
                  </div>

                  <h3 className="font-display text-2xl font-medium text-[#FBF9F4]">
                    Get Detailed Estimate
                  </h3>
                  <p className="mt-1 text-xs text-[#8C9C96] mb-5">
                    For {area} sqft in {location} ({formattedRange}).
                  </p>

                  <LeadForm
                    source="calculator_lead_gate"
                    formType="calculator"
                    buttonLabel="Get Detailed Estimate"
                    variant="compact"
                    prefillArea={area}
                    prefillPackage={currentPkg.name}
                    prefillFloors={floors}
                    prefillEstimatedCost={formattedRange}
                  />
                </div>
              )}

              {/* Indicative Disclaimer */}
              <div className="mt-6 pt-4 border-t border-[#244E46] text-[11px] text-[#8C9C96] flex items-start gap-1.5 leading-snug">
                <Info className="w-3.5 h-3.5 text-[#B86F50] shrink-0 mt-0.5" />
                <span>{siteConfig.calculatorConfig.disclaimer}</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
