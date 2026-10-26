"use client";

import React from "react";
import { Container } from "../ui/Container";

interface BrandLogo {
  id: string;
  name: string;
  category: string;
  logo: React.ReactNode;
}

const BRAND_LOGOS_ROW_1: BrandLogo[] = [
  {
    id: "tata-tiscon",
    name: "Tata Tiscon",
    category: "Steel",
    logo: (
      <div className="flex items-center gap-2.5">
        <svg className="w-8 h-8 shrink-0" viewBox="0 0 36 36" fill="none">
          <ellipse cx="18" cy="18" rx="16" ry="12" stroke="#003875" strokeWidth="2.5" />
          <path d="M12 21C14 14 22 14 24 21" stroke="#003875" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M15 15C16.5 11 19.5 11 21 15" stroke="#003875" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <div className="flex flex-col text-left">
          <span className="font-sans font-black text-xs tracking-wider text-[#003875] uppercase leading-none">
            TATA
          </span>
          <span className="font-sans font-extrabold text-[13px] tracking-tight text-[#00539B] uppercase leading-tight">
            TISCON
          </span>
        </div>
      </div>
    ),
  },
  {
    id: "ultratech",
    name: "UltraTech Cement",
    category: "Cement",
    logo: (
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-md bg-[#FBBF24] border border-[#F59E0B] flex items-center justify-center shadow-xs shrink-0 transform -rotate-6">
          <span className="text-black font-black text-sm tracking-tighter">UT</span>
        </div>
        <div className="flex flex-col text-left">
          <span className="font-sans font-black text-sm tracking-tight text-[#1E293B] leading-none">
            UltraTech
          </span>
          <span className="font-sans font-bold text-[9px] tracking-widest text-[#D97706] uppercase leading-tight">
            CEMENT
          </span>
        </div>
      </div>
    ),
  },
  {
    id: "kohler",
    name: "Kohler",
    category: "Plumbing",
    logo: (
      <div className="flex items-center">
        <span className="font-sans font-black text-base sm:text-lg tracking-[0.25em] text-[#0F172A] uppercase">
          KOHLER
        </span>
      </div>
    ),
  },
  {
    id: "schneider",
    name: "Schneider Electric",
    category: "Electrical",
    logo: (
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded bg-[#3DCD58] flex items-center justify-center shrink-0 shadow-xs">
          <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L4 7v10l8 5 8-5V7l-8-5zm0 3.2L18 8.8v6.4L12 18.8 6 15.2V8.8L12 5.2z" />
          </svg>
        </div>
        <div className="flex flex-col text-left">
          <span className="font-sans font-bold text-xs tracking-tight text-[#0F172A] leading-tight">
            Schneider
          </span>
          <span className="font-sans font-semibold text-[10px] tracking-wide text-[#3DCD58] leading-none">
            Electric
          </span>
        </div>
      </div>
    ),
  },
  {
    id: "asian-paints",
    name: "Asian Paints",
    category: "Paints",
    logo: (
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#EA580C] via-[#DC2626] to-[#F59E0B] p-0.5 shadow-xs shrink-0 flex items-center justify-center">
          <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
            <span className="text-[#DC2626] font-black text-[10px]">ap</span>
          </div>
        </div>
        <div className="flex flex-col text-left">
          <span className="font-sans font-black text-xs tracking-tight text-[#183B35] lowercase leading-none">
            asian<span className="text-[#DC2626]">paints</span>
          </span>
        </div>
      </div>
    ),
  },
  {
    id: "jsw-neosteel",
    name: "JSW Neosteel",
    category: "Steel",
    logo: (
      <div className="flex items-center gap-2.5">
        <div className="flex items-center">
          <span className="font-sans font-black text-sm tracking-tight text-[#0D47A1]">JSW</span>
        </div>
        <span className="w-0.5 h-5 bg-neutral-300" />
        <span className="font-sans font-bold text-xs tracking-wider text-[#B71C1C] uppercase">
          NEOSTEEL
        </span>
      </div>
    ),
  },
  {
    id: "ramco",
    name: "Ramco Cements",
    category: "Cement",
    logo: (
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-full bg-[#C62828] flex items-center justify-center text-white font-black text-xs shrink-0 shadow-xs">
          ★
        </div>
        <div className="flex flex-col text-left">
          <span className="font-sans font-black text-xs tracking-wider text-[#C62828] uppercase leading-none">
            RAMCO
          </span>
          <span className="font-sans font-semibold text-[9px] tracking-widest text-neutral-500 uppercase leading-tight">
            CEMENT
          </span>
        </div>
      </div>
    ),
  },
  {
    id: "jaquar",
    name: "Jaquar",
    category: "Plumbing",
    logo: (
      <div className="flex items-center gap-2">
        <svg className="w-5 h-5 text-[#0F172A] shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z" />
        </svg>
        <span className="font-sans font-black text-sm sm:text-base tracking-widest text-[#0F172A] lowercase">
          jaquar
        </span>
      </div>
    ),
  },
  {
    id: "legrand",
    name: "Legrand",
    category: "Electrical",
    logo: (
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 border-2 border-[#E11D48] flex items-center justify-center shrink-0">
          <div className="w-2.5 h-2.5 bg-[#E11D48]" />
        </div>
        <span className="font-sans font-bold text-xs sm:text-sm tracking-widest text-[#0F172A] uppercase">
          LEGRAND
        </span>
      </div>
    ),
  },
  {
    id: "berger",
    name: "Berger Paints",
    category: "Paints",
    logo: (
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-[#00897B] flex items-center justify-center text-white font-black text-xs shrink-0 shadow-xs">
          B
        </div>
        <div className="flex flex-col text-left">
          <span className="font-sans font-black text-xs tracking-wider text-[#00897B] uppercase leading-none">
            BERGER
          </span>
          <span className="font-sans font-semibold text-[9px] tracking-wider text-neutral-500 uppercase leading-tight">
            PAINTS
          </span>
        </div>
      </div>
    ),
  },
  {
    id: "jindal-panther",
    name: "Jindal Panther",
    category: "Steel",
    logo: (
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded bg-[#991B1B] flex items-center justify-center text-white font-black text-[11px] shrink-0">
          JP
        </div>
        <div className="flex flex-col text-left">
          <span className="font-sans font-black text-xs tracking-tight text-[#0F172A] uppercase leading-none">
            JINDAL
          </span>
          <span className="font-sans font-extrabold text-[10px] tracking-wider text-[#991B1B] uppercase leading-tight">
            PANTHER
          </span>
        </div>
      </div>
    ),
  },
  {
    id: "astral",
    name: "Astral Pipes",
    category: "Plumbing",
    logo: (
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-full bg-[#0284C7] flex items-center justify-center text-white font-black text-xs shrink-0 shadow-xs">
          A
        </div>
        <div className="flex flex-col text-left">
          <span className="font-sans font-black text-xs tracking-wider text-[#0284C7] uppercase leading-none">
            ASTRAL
          </span>
          <span className="font-sans font-bold text-[9px] tracking-widest text-neutral-600 uppercase leading-tight">
            PIPES
          </span>
        </div>
      </div>
    ),
  },
  {
    id: "havells",
    name: "Havells",
    category: "Electrical",
    logo: (
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded bg-[#DC2626] flex items-center justify-center text-white font-black text-xs shrink-0">
          H
        </div>
        <span className="font-sans font-black text-xs sm:text-sm tracking-[0.15em] text-[#DC2626] uppercase">
          HAVELLS
        </span>
      </div>
    ),
  },
];

const BRAND_LOGOS_ROW_2: BrandLogo[] = [
  {
    id: "dalmia",
    name: "Dalmia Bharat",
    category: "Cement",
    logo: (
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded bg-[#1D4ED8] flex items-center justify-center text-white font-black text-xs shrink-0 shadow-xs">
          D
        </div>
        <div className="flex flex-col text-left">
          <span className="font-sans font-black text-xs tracking-wider text-[#1D4ED8] uppercase leading-none">
            DALMIA
          </span>
          <span className="font-sans font-semibold text-[9px] tracking-widest text-neutral-500 uppercase leading-tight">
            CEMENT
          </span>
        </div>
      </div>
    ),
  },
  {
    id: "polycab",
    name: "Polycab",
    category: "Electrical",
    logo: (
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rotate-45 bg-[#E11D48] flex items-center justify-center shrink-0">
          <div className="w-2.5 h-2.5 bg-white -rotate-45" />
        </div>
        <span className="font-sans font-black text-xs sm:text-sm tracking-wider text-[#0F172A] uppercase">
          POLYCAB
        </span>
      </div>
    ),
  },
  {
    id: "dulux",
    name: "Dulux",
    category: "Paints",
    logo: (
      <div className="flex items-center gap-2">
        <span className="font-serif italic font-extrabold text-base sm:text-lg text-[#0F172A]">
          Dulux
        </span>
        <span className="w-2 h-2 rounded-full bg-[#EA580C]" />
      </div>
    ),
  },
  {
    id: "sail-steel",
    name: "SAIL Steel",
    category: "Steel",
    logo: (
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-sm border-2 border-[#1565C0] flex items-center justify-center shrink-0">
          <span className="text-[#1565C0] font-black text-[10px]">S</span>
        </div>
        <div className="flex flex-col text-left">
          <span className="font-sans font-black text-xs tracking-wider text-[#1565C0] uppercase leading-none">
            SAIL
          </span>
          <span className="font-sans font-semibold text-[9px] tracking-widest text-neutral-500 uppercase leading-tight">
            STEEL
          </span>
        </div>
      </div>
    ),
  },
  {
    id: "ashirvad",
    name: "Ashirvad Pipes",
    category: "Plumbing",
    logo: (
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-[#E11D48] flex items-center justify-center text-yellow-300 font-bold text-[10px] shrink-0">
          💧
        </div>
        <span className="font-sans font-black text-xs tracking-tight text-[#E11D48] lowercase">
          ashirvad
        </span>
      </div>
    ),
  },
  {
    id: "dr-fixit",
    name: "Dr. Fixit",
    category: "Paints",
    logo: (
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-[#F59E0B] flex items-center justify-center text-[#1E3A8A] font-black text-xs shrink-0 shadow-xs">
          🛡️
        </div>
        <div className="flex flex-col text-left">
          <span className="font-sans font-black text-xs tracking-tight text-[#1E3A8A] leading-none">
            Dr. Fixit
          </span>
          <span className="font-sans font-semibold text-[8px] tracking-wider text-neutral-500 uppercase leading-tight">
            Waterproofing
          </span>
        </div>
      </div>
    ),
  },
  {
    id: "vizag-steel",
    name: "Vizag Steel",
    category: "Steel",
    logo: (
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-full bg-[#00695C] flex items-center justify-center text-white font-black text-xs shrink-0 shadow-xs">
          V
        </div>
        <div className="flex flex-col text-left">
          <span className="font-sans font-black text-xs tracking-wider text-[#00695C] uppercase leading-none">
            VIZAG
          </span>
          <span className="font-sans font-bold text-[9px] tracking-widest text-neutral-600 uppercase leading-tight">
            STEEL
          </span>
        </div>
      </div>
    ),
  },
  {
    id: "coromandel",
    name: "Coromandel King",
    category: "Cement",
    logo: (
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded bg-[#2E7D32] flex items-center justify-center text-yellow-400 font-black text-xs shrink-0 shadow-xs">
          👑
        </div>
        <div className="flex flex-col text-left">
          <span className="font-sans font-black text-xs tracking-wider text-[#2E7D32] uppercase leading-none">
            COROMANDEL
          </span>
          <span className="font-sans font-semibold text-[9px] tracking-widest text-neutral-500 uppercase leading-tight">
            KING
          </span>
        </div>
      </div>
    ),
  },
  {
    id: "supreme",
    name: "Supreme",
    category: "Plumbing",
    logo: (
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full border-2 border-[#DC2626] flex items-center justify-center shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-[#DC2626]" />
        </div>
        <span className="font-sans font-black text-xs sm:text-sm tracking-wide text-[#DC2626]">
          Supreme
        </span>
      </div>
    ),
  },
  {
    id: "finolex",
    name: "Finolex",
    category: "Electrical",
    logo: (
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-[#0284C7] flex items-center justify-center text-white font-black text-[11px] shrink-0">
          F
        </div>
        <span className="font-sans font-black text-xs sm:text-sm tracking-wider text-[#0284C7]">
          Finolex
        </span>
      </div>
    ),
  },
  {
    id: "acc",
    name: "ACC Cement",
    category: "Cement",
    logo: (
      <div className="flex items-center gap-2">
        <div className="px-2 py-0.5 rounded bg-[#DC2626] text-white font-black text-xs tracking-wider shrink-0">
          ACC
        </div>
        <span className="font-sans font-bold text-xs tracking-widest text-neutral-700 uppercase">
          CEMENT
        </span>
      </div>
    ),
  },
  {
    id: "fosroc",
    name: "Fosroc",
    category: "Paints",
    logo: (
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded bg-[#004D40] flex items-center justify-center text-white font-black text-xs shrink-0">
          F
        </div>
        <span className="font-sans font-black text-xs sm:text-sm tracking-widest text-[#004D40] uppercase">
          FOSROC
        </span>
      </div>
    ),
  },
];

export function BrandPartnersSection() {
  // Duplicated arrays to ensure an uninterrupted, infinite sliding loop
  const row1Display = [...BRAND_LOGOS_ROW_1, ...BRAND_LOGOS_ROW_1];
  const row2Display = [...BRAND_LOGOS_ROW_2, ...BRAND_LOGOS_ROW_2];

  return (
    <section
      id="brand-partners"
      className="py-8 sm:py-12 bg-[#FAF8F5] border-t border-[#D9D2C5]/70 overflow-hidden relative"
    >
      <Container size="wide">
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <span className="text-[11px] font-bold tracking-[0.2em] text-[#EA580C] uppercase mb-1.5 block">
            GENUINE & CERTIFIED MATERIALS
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-[#183B35]">
            Built With Trusted & Tested Brands
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#52655E] max-w-xl mx-auto">
            We build exclusively with genuine, certified materials—from Grade 53 cement and Fe 550D TMT steel to premium electrical and sanitary fittings.
          </p>
        </div>
      </Container>

      {/* Infinite Logo Marquee Track 1 (Sliding Right to Left) */}
      <div className="relative w-full overflow-hidden">
        {/* Soft edge gradient fade masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/90 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#FAF8F5] via-[#FAF8F5]/90 to-transparent z-10" />

        <div className="animate-slide-right-to-left py-2">
          {row1Display.map((brand, idx) => (
            <div
              key={`${brand.id}-r1-${idx}`}
              className="h-16 sm:h-20 w-[180px] sm:w-[220px] shrink-0 mx-2.5 sm:mx-3 px-5 sm:px-6 rounded-2xl bg-white border border-[#D9D2C5]/80 shadow-xs hover:border-[#183B35]/40 hover:shadow-luxury-sm transition-all flex items-center justify-center group cursor-default"
              title={`${brand.name} (${brand.category})`}
            >
              {brand.logo}
            </div>
          ))}
        </div>
      </div>

      {/* Infinite Logo Marquee Track 2 (Sliding Right to Left) */}
      <div className="relative w-full overflow-hidden mt-3 sm:mt-4">
        {/* Soft edge gradient fade masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/90 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#FAF8F5] via-[#FAF8F5]/90 to-transparent z-10" />

        <div className="animate-slide-right-to-left py-2" style={{ animationDuration: "48s" }}>
          {row2Display.map((brand, idx) => (
            <div
              key={`${brand.id}-r2-${idx}`}
              className="h-16 sm:h-20 w-[180px] sm:w-[220px] shrink-0 mx-2.5 sm:mx-3 px-5 sm:px-6 rounded-2xl bg-white border border-[#D9D2C5]/80 shadow-xs hover:border-[#183B35]/40 hover:shadow-luxury-sm transition-all flex items-center justify-center group cursor-default"
              title={`${brand.name} (${brand.category})`}
            >
              {brand.logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
