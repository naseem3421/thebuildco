import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LeadForm } from "@/components/forms/LeadForm";
import { CheckCircle2, ShieldCheck, Sparkles, Building, Layers, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Turnkey Villa Construction in Chennai | Luxury Villas by The Build Company",
  description:
    "Design and construct bespoke luxury villas in Chennai with The Build Company. Architectural excellence, Italian marble, double-height ceilings, and full turnkey supervision.",
  keywords: [
    "villa construction chennai",
    "luxury villa construction chennai",
    "turnkey villa builders chennai",
    "custom villa construction ecr omr chennai",
  ],
  alternates: {
    canonical: "https://thebuildcompany.in/villa-construction",
  },
};

export default function VillaConstructionPage() {
  return (
    <div className="flex flex-col bg-[#FBF9F4]">
      <section className="py-16 sm:py-24 bg-white border-b border-neutral-200">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#EA580C] block mb-3">
                BESPOKE LUXURY RESIDENCES • CHENNAI
              </span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-neutral-900 leading-[1.1]">
                Turnkey Villa Construction in Chennai
              </h1>
              <p className="mt-6 text-base sm:text-lg text-neutral-600 leading-relaxed">
                Elevate your family living with a bespoke luxury villa built on your plot across ECR, OMR, Anna Nagar, or prime Chennai localities. The Build Company executes architecturally stunning villas with double-height atriums, cantilevered pergolas, and world-class finishes.
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
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
                alt="Luxury villa construction in Chennai by The Build Company"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20 border-b border-neutral-200">
        <Container size="wide">
          <SectionHeading
            eyebrow="ARCHITECTURAL PRESTIGE"
            title="Premium Villa Features by The Build Company"
            subtitle="Designed for discerning Chennai homeowners planning ₹1.5 Cr–₹3 Cr+ residences."
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-2xl border border-neutral-200/90 shadow-xs">
              <Sparkles className="w-6 h-6 text-[#EA580C] mb-4" />
              <h3 className="text-base font-bold text-neutral-900 mb-2">Grand Volumetric Architecture</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Expansive open-concept living rooms, double-height foyers, skylights, and indoor landscaped water features designed by master architects.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-neutral-200/90 shadow-xs">
              <Layers className="w-6 h-6 text-[#EA580C] mb-4" />
              <h3 className="text-base font-bold text-neutral-900 mb-2">Curated Luxury Materials</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Choice of Italian marble, solid 8-foot Burma teak main doors, Grohe/Kohler concealed thermostatic diverters, and solar-ready infrastructure.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-neutral-200/90 shadow-xs">
              <ShieldCheck className="w-6 h-6 text-[#EA580C] mb-4" />
              <h3 className="text-base font-bold text-neutral-900 mb-2">Rigorous Civil QA & Snag Clearance</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Every villa is engineered with Fe 550D rebar and M25/M30 grade concrete, backed by dedicated supervision and pre-handover certified snag clearance.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section id="consultation" className="py-16 sm:py-24">
        <Container size="default">
          <div className="bg-white border border-neutral-200 rounded-3xl p-8 sm:p-12 shadow-luxury-md">
            <div className="max-w-xl mx-auto text-center mb-8">
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#EA580C] block mb-2">
                BESPOKE VILLA CONSULTATION
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-medium text-neutral-900">
                Plan Your Luxury Villa in Chennai
              </h2>
              <p className="mt-3 text-sm text-neutral-600">
                Consult with our chief architectural team to review your plot, discuss design preferences, and receive a comprehensive turnkey proposal.
              </p>
            </div>
            <LeadForm
              source="villa_construction_page"
              formType="consultation"
              buttonLabel="Book My Project Consultation"
              className="max-w-xl mx-auto"
            />
          </div>
        </Container>
      </section>
    </div>
  );
}
