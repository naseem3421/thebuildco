import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LeadForm } from "@/components/forms/LeadForm";
import { Sparkles, ShieldCheck, Gem, Layers, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Luxury Home Construction in Chennai | Premium Residences by TBC",
  description:
    "Construct bespoke luxury residences in Chennai with TBC. High-spec architectural homes with imported marble, home automation, and precision craftsmanship.",
  keywords: [
    "luxury house construction chennai",
    "luxury home builders chennai",
    "premium residential construction chennai",
    "high-end turnkey homes chennai",
  ],
  alternates: {
    canonical: "https://thebuildcompany.in/luxury-home-construction",
  },
};

export default function LuxuryHomeConstructionPage() {
  return (
    <div className="flex flex-col bg-[#FBF9F4]">
      {/* Hero */}
      <section className="py-16 sm:py-24 bg-white border-b border-neutral-200">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#EA580C] block mb-3">
                HIGH-SPEC ARCHITECTURAL RESIDENCES • CHENNAI
              </span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-neutral-900 leading-[1.1]">
                Luxury Home Construction in Chennai
              </h1>
              <p className="mt-6 text-base sm:text-lg text-neutral-600 leading-relaxed">
                For landowners seeking signature living with zero compromises. TBC delivers precision-engineered luxury residences with bespoke structural detailing, imported natural stones, smart home automation, and master-crafted finishings across Chennai’s most prestigious avenues.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#consultation"
                  className="px-6 py-3.5 rounded-full bg-[#EA580C] text-white font-semibold text-sm hover:bg-[#C2410C] transition-colors shadow-luxury-sm"
                >
                  Book My Project Consultation
                </a>
                <Link
                  href="/calculator-pro-3"
                  className="px-6 py-3.5 rounded-full border border-neutral-300 text-neutral-800 font-semibold text-sm hover:bg-neutral-100 transition-colors"
                >
                  Calculate My Construction Budget
                </Link>
              </div>
            </div>
            <div className="lg:col-span-5 relative h-96 w-full rounded-3xl overflow-hidden shadow-luxury-md">
              <Image
                src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80"
                alt="Luxury home construction in Chennai by TBC"
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
            eyebrow="UNCOMPROMISING PRECISION"
            title="The Hallmark of Luxury Execution"
            subtitle="Engineered for Chennai homeowners who value perfection in every millimeter."
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-2xl border border-neutral-200/90 shadow-xs">
              <Gem className="w-6 h-6 text-[#EA580C] mb-4" />
              <h3 className="text-base font-bold text-neutral-900 mb-2">Artisanal Finishes & Stones</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Seamless book-matched Statuario or Botticino Italian marble flooring, acoustic-insulated double-glazed slimline aluminium fenestrations, and teak finishes.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-neutral-200/90 shadow-xs">
              <Sparkles className="w-6 h-6 text-[#EA580C] mb-4" />
              <h3 className="text-base font-bold text-neutral-900 mb-2">Smart Living & Energy Systems</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Centralized HVAC/VRV air conditioning, automated lighting moods, integrated security surveillance, solar PV integration, and EV charging points.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-neutral-200/90 shadow-xs">
              <Award className="w-6 h-6 text-[#EA580C] mb-4" />
              <h3 className="text-base font-bold text-neutral-900 mb-2">Senior Architect & QC Oversight</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Direct oversight by chartered structural engineers and senior project managers. Every cube test, slump test, and finish tolerance is documented.
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
                CONFIDENTIAL CONSULTATION
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-medium text-neutral-900">
                Discuss Your Luxury Residence
              </h2>
              <p className="mt-3 text-neutral-600 text-sm sm:text-base">
                Connect directly with our leadership team for a confidential site review and preliminary architectural discussion.
              </p>
            </div>
            <div className="bg-[#FBF9F4] p-8 sm:p-10 rounded-3xl border border-neutral-200">
              <LeadForm source="Luxury Home Construction Page" defaultService="Luxury Construction" />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
