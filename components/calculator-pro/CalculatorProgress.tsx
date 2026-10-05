"use client";

import React from "react";
import { Check, ArrowLeft } from "lucide-react";

interface CalculatorProgressProps {
  currentStep: number; // 1, 2, 3, 4, 5 (Result)
  onStepClick: (step: number) => void;
  onBack?: () => void;
}

export function CalculatorProgress({ currentStep, onStepClick, onBack }: CalculatorProgressProps) {
  const steps = [
    { number: 1, label: "Plot" },
    { number: 2, label: "Home" },
    { number: 3, label: "Package" },
    { number: 4, label: "Add-ons" },
  ];

  if (currentStep === 5) {
    return (
      <div className="w-full flex items-center justify-between pb-4 border-b border-[#D9D2C5]/70">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#D9D2C5] text-xs font-bold text-[#183B35] hover:bg-[#E9E4D9] transition-all cursor-pointer shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Edit Selections</span>
        </button>

        <span className="text-xs font-bold uppercase tracking-wider text-[#EA580C] px-3 py-1 rounded-full bg-[#FFF7F3] border border-[#FFD9C6]">
          Live Turnkey Estimate
        </span>
      </div>
    );
  }

  return (
    <div className="w-full space-y-3 pb-4 border-b border-[#D9D2C5]/70">
      <div className="flex items-center justify-between">
        {onBack && currentStep > 1 ? (
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#52655E] hover:text-[#183B35] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
        ) : (
          <span className="text-xs font-bold text-[#8C9C96]">Step {currentStep} of 4</span>
        )}

        <span className="text-xs font-bold text-[#EA580C]">
          {steps[currentStep - 1]?.label || "Estimate"}
        </span>
      </div>

      {/* Progress Track */}
      <div className="grid grid-cols-4 gap-2">
        {steps.map((s) => {
          const isCompleted = currentStep > s.number;
          const isCurrent = currentStep === s.number;

          return (
            <button
              key={s.number}
              type="button"
              onClick={() => {
                if (s.number < currentStep) onStepClick(s.number);
              }}
              disabled={s.number > currentStep}
              className={`h-2 rounded-full transition-all duration-300 ${
                isCompleted
                  ? "bg-[#183B35] cursor-pointer"
                  : isCurrent
                  ? "bg-[#EA580C]"
                  : "bg-[#D9D2C5]/60 cursor-not-allowed"
              }`}
              title={`Step ${s.number}: ${s.label}`}
              aria-label={`Step ${s.number}: ${s.label}`}
            />
          );
        })}
      </div>
    </div>
  );
}
