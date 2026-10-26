import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LeadForm } from "@/components/forms/LeadForm";
import { CheckCircle2, ShieldCheck, HardHat, Compass, FileCheck, Phone, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Individual House Construction Company in Chennai | The Build Company",
  description:
    "Construct your bespoke individual house in Chennai with The Build Company. Turnkey architectural design, structural engineering, and stage-wise payments for plots across Chennai.",
  keywords: [
    "individual house construction chennai",
    "house construction company chennai",
    "custom home builders chennai",
    "independent house construction chennai",
  ],
  alternates: {
    canonical: "https://thebuildcompany.in/individual-house-construction",
  },
};

export default function IndividualHouseConstructionPage() {
  return (
    <div className="flex flex-col bg-[#FBF9F4]">
      <section className="py-16 sm:py-24 bg-white border-b border-neutral-200">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#EA580C] block mb-3">
                TURNKEY RESIDENTIAL HOMES • CHENNAI
              </span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-neutral-900 leading-[1.1]">
                Individual House Construction in Chennai
              </h1>
              <p className="mt-6 text-base sm:text-lg text-neutral-600 leading-relaxed">
                Building an independent family home on your plot requires complete structural accountability. The Build Company manages your individual house project from architectural drawings and soil test through civil construction, electrical, plumbing, finishing, and key handover.
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
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                alt="Individual house construction in Chennai by The Build Company"
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
            eyebrow="ENGINEERED EXCELLENCE"
            title="What Makes The Build Company Individual House Construction Different"
            subtitle="One responsible civil engineering partner rather than a fragmented group of sub-contractors."
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-2xl border border-neutral-200/90 shadow-xs">
              <Compass className="w-6 h-6 text-[#EA580C] mb-4" />
              <h3 className="text-base font-bold text-neutral-900 mb-2">Vastu & Climate Sensitive</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Floor plans optimized for Chennai&apos;s tropical climate, ensuring cross-ventilation, abundant natural daylight, and strict Vastu alignment.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-neutral-200/90 shadow-xs">
              <HardHat className="w-6 h-6 text-[#EA580C] mb-4" />
              <h3 className="text-base font-bold text-neutral-900 mb-2">On-Site Civil Supervision</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Dedicated qualified civil engineers on your site daily to verify rebar spacing, concrete mix ratios, and curing periods.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-neutral-200/90 shadow-xs">
              <FileCheck className="w-6 h-6 text-[#EA580C] mb-4" />
              <h3 className="text-base font-bold text-neutral-900 mb-2">Milestone Escrow Billing</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                You never fund construction upfront. Payments are linked to verified physical milestones, from plinth to roof slab and handover.
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
                FREE ON-SITE ASSESSMENT
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-medium text-neutral-900">
                Discuss Your House Construction Project
              </h2>
              <p className="mt-3 text-sm text-neutral-600">
                Share your plot location and requirements in Chennai for a free engineering feasibility check and preliminary BOQ breakdown.
              </p>
            </div>
            <LeadForm
              source="individual_house_page"
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
