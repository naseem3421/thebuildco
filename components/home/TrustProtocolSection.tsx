"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Container } from "../ui/Container";
import {
  ShieldCheck,
  FileCheck2,
  Lock,
  Layers,
  Scale,
  CheckCircle2,
  Building2,
  HardHat,
  Eye,
  CalendarCheck,
  ArrowRight,
  Sparkles,
  Award,
  Smartphone,
  Camera,
  FileText,
  Activity,
} from "lucide-react";

export function TrustProtocolSection() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const qaChecklist = [
    { label: "M25/M30 Concrete Cube Compressive Strength Tested", standard: "IS 516 / IS 456" },
    { label: "Slump Cone Flow Test for Every Transit Mixer Batch", standard: "IS 1199" },
    { label: "Ultrasonic Rebar Cover Block Depth Verification", standard: "IS 456 Cl. 26.4" },
    { label: "Pre-Concealment Hydrostatic Plumbing Pressure (10 Bar)", standard: "IS 2065" },
    { label: "Integral Crystalline Sump & Terrace Waterproofing", standard: "DIN 1048" },
  ];

  const milestones = [
    { stage: "M1", name: "Footing & Foundation", pct: "15%", status: "Inspected" },
    { stage: "M2", name: "Plinth & Soil Compaction", pct: "10%", status: "Certified" },
    { stage: "M3", name: "RCC Frame & Roof Slabs", pct: "25%", status: "Tested" },
    { stage: "M4", name: "Brick Masonry & Plaster", pct: "20%", status: "Audited" },
    { stage: "M5", name: "Flooring, MEP & Joinery", pct: "25%", status: "Verified" },
    { stage: "M6", name: "Deep Clean & Key Handover", pct: "5%", status: "Snag-Free" },
  ];

  return (
    <section id="trust-protocol" className="py-10 sm:py-14 bg-[#FBF9F4] border-b border-[#D9D2C5]/80 relative overflow-hidden">
      {/* Subtle architectural grid pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#D9D2C5_1px,transparent_1px)] [background-size:32px_32px] opacity-40 pointer-events-none" />

      <Container size="wide" className="relative z-10 space-y-8 sm:space-y-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF7ED] border border-[#FFEDD5] text-xs font-bold text-[#EA580C] uppercase tracking-widest shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#EA580C]" />
            <span>THE BUILD COMPANY TRUST PROTOCOL · VERIFIABLE SAFEGUARDS</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-[#183B35] leading-tight">
            Contractual Certainty Before a Single Brick Is Laid.
          </h2>

          <p className="text-sm sm:text-base text-[#52655E] max-w-2xl mx-auto leading-relaxed">
            Building on your own land in Chennai shouldn't feel like a gamble. We replace verbal assurances with five legally enforceable engineering and financial protocols.
          </p>
        </div>

        {/* Bento Console Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Bento Card 1 (Left 5 Cols): Hero Deep-Forest Price Lock & Contract Guard */}
          <div className="lg:col-span-5 rounded-3xl bg-gradient-to-br from-[#183B35] to-[#0D2420] text-[#F4F0E8] p-6 sm:p-8 flex flex-col justify-between shadow-luxury-md border border-[#3E5C54] relative overflow-hidden group">
            {/* Ambient gold glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#EA580C]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-5 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#EA580C] bg-[#EA580C]/20 px-3 py-1 rounded-full border border-[#EA580C]/30 inline-flex items-center gap-1.5">
                  <Lock className="w-3 h-3 text-[#EA580C]" /> SAFEGUARD 01
                </span>
                <span className="text-xs text-[#8C9C96] font-medium flex items-center gap-1">
                  <Scale className="w-3.5 h-3.5 text-[#86EFAC]" /> Legally Binding
                </span>
              </div>

              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white leading-snug">
                  Locked BOQ with Price Protection
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#8C9C96] leading-relaxed">
                  Contractually locked sqft pricing with up to 10% material price surge protection during the contract period. Once our structural BOQ is agreed upon, market price spikes are absorbed by The Build Company.
                </p>
              </div>

              {/* Mockup Contract Ledger */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2.5 backdrop-blur-xs text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-[#8C9C96] font-semibold text-[11px] uppercase tracking-wider">Locked BOQ Terms</span>
                  <span className="text-[#86EFAC] font-bold text-[11px]">Enforceable Deed</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-white/80">Cement Grade:</span>
                  <span className="font-bold text-white">UltraTech / Coromandel 53G</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Steel Standard:</span>
                  <span className="font-bold text-white">Tata Tiscon Fe550D TMT</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Price Surge Absorption:</span>
                  <span className="font-bold text-[#86EFAC]">Up to 10% Contractually Protected</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs text-[#8C9C96] relative z-10">
              <span className="flex items-center gap-1.5 text-white font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#86EFAC]" /> Zero Hidden Clauses
              </span>
              <a
                href="#consultation"
                className="text-[#EA580C] hover:text-[#FF8A4C] font-bold inline-flex items-center gap-1 transition-colors"
              >
                <span>Sample Deed</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Bento Card 2 & 3 (Right 7 Cols): 2 Staked Safeguards */}
          <div className="lg:col-span-7 flex flex-col gap-6 justify-between">
            {/* Top Right Card: Milestone-Linked Financial Escrow */}
            <div className="rounded-3xl bg-white p-6 sm:p-7 border border-[#D9D2C5] shadow-luxury-sm hover:border-[#EA580C]/40 transition-all space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#EA580C] bg-[#FFF7ED] px-3 py-1 rounded-full border border-[#FFEDD5] inline-flex items-center gap-1.5">
                  <Layers className="w-3 h-3 text-[#EA580C]" /> SAFEGUARD 02
                </span>
                <span className="text-xs text-[#52655E] font-bold">Stage-Gated Financial Escrow</span>
              </div>

              <div>
                <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#183B35]">
                  Pay Only After Milestone Verification
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-[#52655E] leading-relaxed">
                  Never pay arbitrary advances. Funds are released strictly in predefined stages after physical structural inspection and QA sign-off on your plot.
                </p>
              </div>

              {/* Visual Milestone Strip */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-2">
                {milestones.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#D9D2C5]/70 text-center flex flex-col justify-between"
                  >
                    <span className="text-[10px] font-extrabold text-[#EA580C] block">{m.stage}</span>
                    <span className="text-[11px] font-bold text-[#183B35] leading-tight mt-1 line-clamp-2">{m.name}</span>
                    <span className="text-[10px] font-semibold text-[#52655E] mt-1.5 block">{m.pct}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Right Card: 150-Point QA Gateway & Resident Engineer */}
            <div className="rounded-3xl bg-white p-6 sm:p-7 border border-[#D9D2C5] shadow-luxury-sm hover:border-[#EA580C]/40 transition-all space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#183B35] bg-[#E9E4D9]/60 px-3 py-1 rounded-full border border-[#D9D2C5] inline-flex items-center gap-1.5">
                  <HardHat className="w-3 h-3 text-[#183B35]" /> SAFEGUARD 03
                </span>
                <span className="text-xs text-[#EA580C] font-bold">Dedicated Supervisor For Each Site</span>
              </div>

              <div>
                <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#183B35]">
                  150+ Point Civil & Structural Engineering Gateways
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-[#52655E] leading-relaxed">
                  A dedicated site supervisor manages your plot daily, coordinating with our engineering team for every concrete pour, rebar grid, and curing cycle before subsequent stages begin.
                </p>
              </div>

              {/* QA Verification Chips */}
              <div className="space-y-1.5 pt-1">
                {qaChecklist.slice(0, 3).map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 rounded-xl bg-[#FAF8F5] border border-[#D9D2C5]/60 text-xs text-[#183B35]"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#15803D] shrink-0" />
                      <span className="font-medium text-xs truncate max-w-[280px] sm:max-w-none">{item.label}</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#8C9C96] shrink-0 font-semibold">{item.standard}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Dual Bottom Ribbons: Safeguards 04 & 05 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Safeguard 04: Live Site Telemetry */}
          <div className="p-6 rounded-3xl bg-white border border-[#D9D2C5] shadow-luxury-sm flex items-start gap-4 hover:shadow-luxury-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF7ED] border border-[#FFEDD5] flex items-center justify-center shrink-0">
              <Eye className="w-6 h-6 text-[#EA580C]" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold text-[#EA580C] uppercase tracking-wider">SAFEGUARD 04</span>
                <span className="text-xs text-[#8C9C96]">•</span>
                <span className="text-xs font-bold text-[#183B35]">Weekly Video Telemetry</span>
              </div>
              <h4 className="font-display text-lg font-semibold text-[#183B35]">
                Direct WhatsApp Video Logs & Test Reports
              </h4>
              <p className="text-xs text-[#52655E] leading-relaxed">
                Whether you are in Chennai or abroad, receive weekly 4K video walk-throughs, material arrival challans, and laboratory test cubes straight to your phone.
              </p>
            </div>
          </div>

          {/* Safeguard 05: Pre-Handover Snag Audit & Certified Clearance */}
          <div className="p-6 rounded-3xl bg-white border border-[#D9D2C5] shadow-luxury-sm flex items-start gap-4 hover:shadow-luxury-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#F0FDF4] border border-[#DCFCE7] flex items-center justify-center shrink-0">
              <Award className="w-6 h-6 text-[#15803D]" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold text-[#15803D] uppercase tracking-wider">SAFEGUARD 05</span>
                <span className="text-xs text-[#8C9C96]">•</span>
                <span className="text-xs font-bold text-[#183B35]">Post-Handover Assurance</span>
              </div>
              <h4 className="font-display text-lg font-semibold text-[#183B35]">
                Certified Pre-Handover Snag Audit Protocol
              </h4>
              <p className="text-xs text-[#52655E] leading-relaxed">
                Comprehensive 150-point civil inspection prior to possession: 72-hour waterproofing ponding test, laser level floor check, MEP pressure tests, and zero-defect certified clearance.
              </p>
            </div>
          </div>
        </div>

        {/* Safeguard 06: The Build Company Mobile App (Coming Soon) */}
        <div className="rounded-3xl bg-gradient-to-br from-white via-[#FAF8F5] to-white border-2 border-[#EA580C]/25 p-6 sm:p-8 shadow-luxury-md relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#EA580C]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left 7 Cols: Overview & Feature Badges */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#EA580C] bg-[#FFF7ED] px-3 py-1 rounded-full border border-[#FFEDD5] inline-flex items-center gap-1.5 shadow-xs">
                  <Smartphone className="w-3.5 h-3.5 text-[#EA580C]" /> SAFEGUARD 06 · DIGITAL TELEMETRY
                </span>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#15803D] bg-[#F0FDF4] px-3 py-1 rounded-full border border-[#DCFCE7] inline-flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#15803D]" /> COMING SOON · Q1 2027
                </span>
              </div>

              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#183B35] leading-tight">
                  The Build Company Mobile App
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#52655E] leading-relaxed max-w-xl">
                  Real-time construction intelligence and project feasibility in your pocket. Track daily on-site progress, verify material test reports, and approve milestones remotely from Chennai, Bangalore, or overseas with 100% transparency.
                </p>
              </div>

              {/* 4 Core In-App Feasibility Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-2xl bg-white border border-[#D9D2C5]/70 flex items-start gap-3 shadow-xs">
                  <div className="w-8 h-8 rounded-xl bg-[#FFF7ED] flex items-center justify-center shrink-0 mt-0.5">
                    <Camera className="w-4 h-4 text-[#EA580C]" />
                  </div>
                  <div>
                    <span className="font-bold text-xs text-[#183B35] block">Live 24/7 Site Feeds</span>
                    <span className="text-[11px] text-[#52655E] leading-snug block mt-0.5">High-definition time-lapse & camera streaming directly from your plot.</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-white border border-[#D9D2C5]/70 flex items-start gap-3 shadow-xs">
                  <div className="w-8 h-8 rounded-xl bg-[#F0FDF4] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-[#15803D]" />
                  </div>
                  <div>
                    <span className="font-bold text-xs text-[#183B35] block">1-Tap Milestone Sign-off</span>
                    <span className="text-[11px] text-[#52655E] leading-snug block mt-0.5">Review engineer checklists & release disbursements securely.</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-white border border-[#D9D2C5]/70 flex items-start gap-3 shadow-xs">
                  <div className="w-8 h-8 rounded-xl bg-[#EFF6FF] flex items-center justify-center shrink-0 mt-0.5">
                    <FileText className="w-4 h-4 text-[#2563EB]" />
                  </div>
                  <div>
                    <span className="font-bold text-xs text-[#183B35] block">Digital Vault & Lab Tests</span>
                    <span className="text-[11px] text-[#52655E] leading-snug block mt-0.5">Instant cloud access to CAD drawings, cube strength tests & tax bills.</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-white border border-[#D9D2C5]/70 flex items-start gap-3 shadow-xs">
                  <div className="w-8 h-8 rounded-xl bg-[#FAF5FF] flex items-center justify-center shrink-0 mt-0.5">
                    <Activity className="w-4 h-4 text-[#9333EA]" />
                  </div>
                  <div>
                    <span className="font-bold text-xs text-[#183B35] block">Feasibility & Soil Telemetry</span>
                    <span className="text-[11px] text-[#52655E] leading-snug block mt-0.5">Borehole logs, concrete curing timers & moisture sensor readouts.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Smartphone Screen Mockup Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-[340px] rounded-[32px] bg-[#183B35] p-4 text-white shadow-luxury-lg border-4 border-neutral-800 space-y-3 relative">
                {/* Mobile Camera Notch */}
                <div className="mx-auto w-24 h-4 bg-neutral-900 rounded-full flex items-center justify-center mb-1">
                  <span className="w-2 h-2 rounded-full bg-neutral-700" />
                </div>

                {/* Status Bar */}
                <div className="flex items-center justify-between text-[10px] text-[#8C9C96] px-1">
                  <span className="font-mono font-bold text-white">The Build Co OS</span>
                  <span className="flex items-center gap-1 text-[#86EFAC] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-pulse" /> LIVE SYNC
                  </span>
                </div>

                {/* Plot Header Card */}
                <div className="p-3 rounded-2xl bg-white/10 border border-white/15 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-[#EA580C]">Plot #42 · Medavakkam</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/20 font-mono">G+2 Villa</span>
                  </div>
                  <h4 className="font-bold text-sm text-white">Current Stage: Roof Slab RCC</h4>
                  <div className="w-full bg-white/20 rounded-full h-1.5 mt-2">
                    <div className="bg-[#EA580C] h-1.5 rounded-full w-[68%]" />
                  </div>
                  <div className="flex justify-between text-[9px] text-[#8C9C96] pt-0.5">
                    <span>Progress: 68%</span>
                    <span>On Schedule</span>
                  </div>
                </div>

                {/* Recent Event Feed */}
                <div className="space-y-1.5 text-xs">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#15803D]" />
                      <span className="text-[11px] text-white/90">28-Day Cube Test Passed (32.4 MPa)</span>
                    </div>
                    <span className="text-[9px] font-mono text-[#8C9C96]">Today</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#EA580C]" />
                      <span className="text-[11px] text-white/90">Tata Tiscon Rebar Batch Verified</span>
                    </div>
                    <span className="text-[9px] font-mono text-[#8C9C96]">Yesterday</span>
                  </div>
                </div>

                {/* Platform Badge Footer */}
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-[#8C9C96]">
                  <span>iOS & Android</span>
                  <span className="text-[#86EFAC] font-bold uppercase tracking-wider">COMING SOON · Q1 2027</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Consultation CTA Strip */}
        <div className="rounded-3xl bg-[#183B35] text-[#F4F0E8] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-luxury-md">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-display text-2xl font-normal text-white">
              Want to review our sample contract and 150-point QA blueprint?
            </h4>
            <p className="text-xs sm:text-sm text-[#D9D2C5]">
              Schedule a private site consultation or meet our chief engineer at our Chennai office.
            </p>
          </div>

          <a
            href="#consultation"
            className="px-7 py-3.5 rounded-full bg-[#EA580C] hover:bg-[#C2410C] text-white font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-luxury-sm shrink-0 inline-flex items-center gap-2 cursor-pointer group"
          >
            <span>Request Protocol Blueprint</span>
            <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </Container>
    </section>
  );
}
