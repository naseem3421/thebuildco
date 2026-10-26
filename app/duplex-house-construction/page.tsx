import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LeadForm } from "@/components/forms/LeadForm";
import { CheckCircle2, Home, Layers, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Duplex House Construction in Chennai | G+1 Turnkey Homes by The Build Company",
  description:
    "Construct modern duplex homes in Chennai with The Build Company. G+1 and G+2 duplex residences engineered for multi-generational families on client-owned plots.",
  keywords: [
    "duplex house construction chennai",
    "g+1 house construction chennai",
    "duplex home builders chennai",
    "turnkey duplex contractors chennai",
  ],
  alternates: {
    canonical: "https://thebuildcompany.in/duplex-house-construction",
  },
};

export default function DuplexHouseConstructionPage() {
  return (
    <div className="flex flex-col bg-[#FBF9F4]">
      {/* Hero */}
      <section className="py-16 sm:py-24 bg-white border-b border-neutral-200">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#EA580C] block mb-3">
                INTELLIGENT SPATIAL PLANNING • CHENNAI
              </span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-neutral-900 leading-[1.1]">
                Duplex House Construction in Chennai
              </h1>
              <p className="mt-6 text-base sm:text-lg text-neutral-600 leading-relaxed">
                Maximize comfort, privacy, and vertical elegance on your residential plot. The Build Company designs and constructs G+1 and G+2 duplex homes tailored for joint families, privacy-first lifestyle zoning, and future-proof structural longevity across Chennai.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#consultation"
                  className="px-6 py-3.5 rounded-full bg-[#EA580C] text-white font-semibold text-sm hover:bg-[#C2410C] transition-colors shadow-luxury-sm"
                >
                  Book My Project Consultation
                </a>
                <Link
                  href="/calculator-pro-2"
                  className="px-6 py-3.5 rounded-full border border-neutral-300 text-neutral-800 font-semibold text-sm hover:bg-neutral-100 transition-colors"
                >
                  Calculate My Construction Budget
                </Link>
              </div>
            </div>
            <div className="lg:col-span-5 relative h-96 w-full rounded-3xl overflow-hidden shadow-luxury-md">
              <Image
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
                alt="Duplex house construction in Chennai by The Build Company"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Highlights */}
      <section className="py-16 sm:py-20 border-b border-neutral-200">
        <Container size="wide">
          <SectionHeading
            eyebrow="DUAL-LEVEL LIVING"
            title="Why Families Choose Duplex Architecture"
            subtitle="Thoughtfully engineered for modern Chennai lifestyle, privacy, and natural ventilation."
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-2xl border border-neutral-200/90 shadow-xs">
              <Home className="w-6 h-6 text-[#EA580C] mb-4" />
              <h3 className="text-base font-bold text-neutral-900 mb-2">Private vs Entertaining Zones</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Ground level dedicated to drawing rooms, kitchen, and elder-friendly bedrooms; upper level dedicated to master suites, private family lounge, and study terraces.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-neutral-200/90 shadow-xs">
              <Layers className="w-6 h-6 text-[#EA580C] mb-4" />
              <h3 className="text-base font-bold text-neutral-900 mb-2">Double-Height Cutouts & Skylights</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Visual connectivity between floors with central staircases, internal cutouts, and sun-lit vertical shafts that keep the home cool and well-ventilated.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-neutral-200/90 shadow-xs">
              <ShieldCheck className="w-6 h-6 text-[#EA580C] mb-4" />
              <h3 className="text-base font-bold text-neutral-900 mb-2">Turnkey Execution & Clear Costing</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                From CMDA/GCC plan approvals and soil bearing tests to structural engineering and interior handover, managed by one accountable team.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Consultation Form */}
      <section id="consultation" className="py-16 sm:py-24 bg-white">
        <Container size="wide">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#EA580C] block mb-2">
                SCHEDULE CONSULTATION
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-medium text-neutral-900">
                Plan Your Chennai Duplex Home
              </h2>
              <p className="mt-3 text-neutral-600 text-sm sm:text-base">
                Share your plot dimensions and family requirements. We will prepare an architectural layout feasibility review and itemized budget.
              </p>
            </div>
            <div className="bg-[#FBF9F4] p-8 sm:p-10 rounded-3xl border border-neutral-200">
              <LeadForm source="Duplex House Construction Page" defaultService="Duplex Construction" />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
