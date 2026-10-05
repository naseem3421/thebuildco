"use client";

import React, { useState, useEffect, useRef } from "react";
import { Sparkles, Mic, MicOff, ArrowRight, Check, Bot, CornerDownLeft, Loader2, RotateCcw } from "lucide-react";
import { interpretDreamHome } from "@/lib/calculator/aiParser";
import { AIInterpretationResult } from "@/app/api/calculator/interpret/route";

interface DreamHomeHeroProps {
  onApplyParsedPlan: (data: AIInterpretationResult) => void;
  onSkipToManual: () => void;
}

export function DreamHomeHero({ onApplyParsedPlan, onSkipToManual }: DreamHomeHeroProps) {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [parsedResult, setParsedResult] = useState<AIInterpretationResult | null>(null);
  const [showInterpretation, setShowInterpretation] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Check Web Speech API support
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        setSpeechSupported(true);
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = "en-IN";

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setPrompt(transcript);
          setIsListening(false);
          handleInterpret(transcript);
        };

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, []);

  const toggleVoiceInput = () => {
    if (!speechSupported || !recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        setIsListening(false);
      }
    }
  };

  const handleInterpret = async (textToParse?: string) => {
    const query = (textToParse !== undefined ? textToParse : prompt).trim();
    if (!query) return;

    setIsLoading(true);
    const result = await interpretDreamHome(query);
    setIsLoading(false);

    if (result) {
      setParsedResult(result);
      setShowInterpretation(true);
    } else {
      onSkipToManual();
    }
  };

  const handleChipClick = (sampleText: string) => {
    setPrompt(sampleText);
    handleInterpret(sampleText);
  };

  return (
    <div className="w-full max-w-4xl mx-auto text-center space-y-6 pt-2 pb-6">
      {/* 1. Hero Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF7F3] border border-[#FFD9C6] text-[#EA580C] text-xs font-extrabold uppercase tracking-wider shadow-sm">
          <Sparkles className="w-4 h-4 text-[#EA580C]" />
          <span>AI-POWERED CHENNAI CONSTRUCTION ESTIMATOR (2026)</span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#183B35] tracking-tight">
          Know What Your Dream Home Will Cost.
        </h1>
        <p className="text-sm sm:text-base text-[#52655E] max-w-xl mx-auto">
          Get a personalised construction estimate in under 60 seconds.
        </p>
        <p className="text-xs font-semibold text-[#8C9C96]">
          Indicative estimate • Final quote after site visit & soil test
        </p>
      </div>

      {/* 2. Conversational Dream Home Input Bar */}
      {!showInterpretation ? (
        <div className="space-y-4">
          <div className="relative max-w-2xl mx-auto bg-white rounded-3xl border-2 border-[#183B35]/20 focus-within:border-[#EA580C] shadow-luxury-md p-2 transition-all">
            <div className="flex items-center gap-2">
              <div className="pl-3 text-[#EA580C]">
                <Bot className="w-5 h-5 shrink-0" />
              </div>

              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleInterpret();
                  }
                }}
                placeholder="Example: 3BHK duplex on 30×40 plot with parking"
                aria-label="Tell us about your dream home"
                className="w-full py-3.5 px-2 bg-transparent text-sm sm:text-base font-semibold text-[#183B35] placeholder:text-[#8C9C96] focus:outline-none"
              />

              {/* Speech Recognition Mic */}
              {speechSupported && (
                <button
                  type="button"
                  onClick={toggleVoiceInput}
                  title={isListening ? "Listening... Click to stop" : "Speak your home plan"}
                  className={`p-2.5 rounded-2xl border transition-all cursor-pointer ${
                    isListening
                      ? "bg-[#EA580C] text-white border-[#EA580C] animate-pulse"
                      : "bg-[#F4F0E8] text-[#183B35] border-[#D9D2C5] hover:bg-[#E9E4D9]"
                  }`}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
              )}

              {/* Submit Button */}
              <button
                type="button"
                onClick={() => handleInterpret()}
                disabled={isLoading || !prompt.trim()}
                className="py-3 px-4 sm:px-5 rounded-2xl bg-[#183B35] hover:bg-[#0D2420] text-white font-bold text-xs sm:text-sm transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 shrink-0 shadow-sm"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <span>Calculate</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Prompt Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            <span className="text-[11px] font-bold text-[#8C9C96]">Try:</span>
            {[
              "3BHK on 30×40 plot",
              "3BHK duplex with parking",
              "4BHK villa on 2 grounds",
              "2BHK ground floor on 20×30",
            ].map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => handleChipClick(chip)}
                className="px-3 py-1 rounded-full bg-white border border-[#D9D2C5] text-[#183B35] hover:border-[#EA580C] hover:bg-[#FFF7F3] text-xs font-semibold transition-all cursor-pointer shadow-sm"
              >
                &ldquo;{chip}&rdquo;
              </button>
            ))}
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={onSkipToManual}
              className="text-xs font-bold text-[#52655E] hover:text-[#EA580C] underline decoration-dotted transition-colors cursor-pointer"
            >
              Or build your estimate step-by-step manually &rarr;
            </button>
          </div>
        </div>
      ) : (
        /* 3. AI Result Interpretation Card */
        <div className="max-w-2xl mx-auto rounded-3xl bg-white border-2 border-[#EA580C] p-6 shadow-luxury-md space-y-4 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between border-b border-[#F0EBE0] pb-3">
            <div className="flex items-center gap-2 text-[#183B35]">
              <Sparkles className="w-5 h-5 text-[#EA580C]" />
              <span className="font-display font-bold text-base sm:text-lg">
                Looks like this is what you&apos;re planning:
              </span>
            </div>
            <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-[#EA580C]/10 text-[#EA580C]">
              AI Auto-Configured
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-left">
            <div className="p-3 rounded-2xl bg-[#FBF9F4] border border-[#E9E4DA]">
              <span className="text-[10px] font-bold text-[#8C9C96] uppercase block">Plot Size</span>
              <span className="text-xs sm:text-sm font-bold text-[#183B35] flex items-center gap-1 mt-0.5">
                <Check className="w-3.5 h-3.5 text-[#15803D]" />
                {parsedResult?.plot_dimensions || `${parsedResult?.plot_sqft} sqft`}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-[#FBF9F4] border border-[#E9E4DA]">
              <span className="text-[10px] font-bold text-[#8C9C96] uppercase block">Configuration</span>
              <span className="text-xs sm:text-sm font-bold text-[#183B35] flex items-center gap-1 mt-0.5">
                <Check className="w-3.5 h-3.5 text-[#15803D]" />
                {parsedResult?.bhk ? `${parsedResult.bhk} BHK` : "Custom Layout"}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-[#FBF9F4] border border-[#E9E4DA]">
              <span className="text-[10px] font-bold text-[#8C9C96] uppercase block">Home Type</span>
              <span className="text-xs sm:text-sm font-bold text-[#183B35] flex items-center gap-1 mt-0.5 capitalize">
                <Check className="w-3.5 h-3.5 text-[#15803D]" />
                {parsedResult?.home_type?.replace("_", " ") || "Duplex"}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-[#FBF9F4] border border-[#E9E4DA]">
              <span className="text-[10px] font-bold text-[#8C9C96] uppercase block">Floors</span>
              <span className="text-xs sm:text-sm font-bold text-[#183B35] flex items-center gap-1 mt-0.5">
                <Check className="w-3.5 h-3.5 text-[#15803D]" />
                {parsedResult?.floors === 1 ? "Ground Only" : `G + ${(parsedResult?.floors || 2) - 1}`}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                if (parsedResult) onApplyParsedPlan(parsedResult);
              }}
              className="w-full sm:flex-1 py-3.5 px-6 rounded-2xl bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-sm shadow-luxury-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
            >
              <span>View Estimate with These Details</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => {
                setShowInterpretation(false);
                setParsedResult(null);
              }}
              className="w-full sm:w-auto py-3.5 px-5 rounded-2xl bg-[#F4F0E8] hover:bg-[#E9E4D9] text-[#183B35] font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Modify Details</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
