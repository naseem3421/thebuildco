import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LeadForm } from "@/components/forms/LeadForm";
import { ServiceJsonLd } from "@/components/seo/JsonLd";
import {
  ShieldCheck,
  CheckCircle2,
  HardHat,
  Droplets,
  Layers,
  Sparkles,
  ClipboardList,
  TestTube,
  FileCheck2,
  ArrowRight,
  Activity,
  Flame,
  Scale,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Construction Quality Standards in Chennai | Engineering Rigor | The Build Company",
  description:
    "Explore The Build Company's comprehensive 150+ point civil engineering QA/QC standards for residential construction in Chennai. Soil testing, Fe 550D rebar audits, concrete cube breaks, and 72-hour ponding tests.",
  keywords: [
    "construction quality standards chennai",
    "civil engineering quality audit chennai",
    "concrete cube test residential construction",
    "structural engineering standards chennai",
    "waterproofing ponding test chennai",
    "turnkey quality control chennai",
  ],
  alternates: {
    canonical: "https://thebuildcompany.in/quality-standards",
  },
  openGraph: {
    title: "Construction Quality Standards in Chennai | The Build Company QA/QC Engineering",
    description:
      "Verifiable civil engineering quality audits executed on your Chennai plot. Lab cube tests, rebar inspection, and certified snag-free handover protocol.",
    url: "https://thebuildcompany.in/quality-standards",
    type: "article",
  },
};

export default function QualityStandardsPage() {
  const qualityStages = [
    {
      stage: "Stage 01",
      title: "Soil Testing & SBC Analysis",
      icon: Layers,
      items: [
        "Core borehole soil sampling down to load-bearing hard strata",
        "Laboratory determination of Soil Bearing Capacity (SBC in kN/m²)",
        "Groundwater table survey & chemical test for sulfate/chloride attack",
        "Engineered foundation selection: isolated footings, combined, raft, or under-reamed piles",
      ],
    },
    {
      stage: "Stage 02",
      title: "Seismic Structural Engineering",
      icon: HardHat,
      items: [
        "STAAD Pro 3D structural analysis for Zone-III Chennai seismic loads",
        "Wind load calculations compliant with IS 875 coastal parameters",
        "Column and plinth beam reinforcement schedules certified by Chartered Structural Engineers",
        "Detailed bar bending schedules (BBS) to minimize on-site steel lap splices",
      ],
    },
    {
      stage: "Stage 03",
      title: "Steel Rebar & Cement Verification",
      icon: Scale,
      items: [
        "Certified Fe 550D TMT steel (Tata Tiscon / Jindal Panther / Kamachi)",
        "Verification of manufacturer Test Mill Certificates for elongation & tensile yield strength",
        "Fresh Grade 53 OPC/PPC cement (UltraTech / Coromandel / Dalmia) with batch date tracking",
        "Mandatory dry storage on wooden pallets elevated above ground to prevent hydration",
      ],
    },
    {
      stage: "Stage 04",
      title: "Concrete Slump & Lab Cube Testing",
      icon: TestTube,
      items: [
        "Slump cone workability testing for every concrete batch prior to placement",
        "Design mix concrete (M20 / M25) with controlled water-cement ratio",
        "Cast 150mm concrete cubes for every roof slab and heavy column pour",
        "Certified compressive strength laboratory testing at 7-day and 28-day curing intervals",
      ],
    },
    {
      stage: "Stage 05",
      title: "Shuttering & Rebar Binding Inspections",
      icon: ClipboardList,
      items: [
        "Pre-pour shuttering inspection using digital spirit levels for line, level, and plumbness",
        "Heavy-duty water-resistant film-faced plywood or steel formwork to prevent slurry leaks",
        "Factory-cast concrete cover blocks (40mm for footings, 25mm for beams, 20mm for slabs)",
        "Rebar spacer ties, stirrup hook angles (135° bend), and lap splice length verification",
      ],
    },
    {
      stage: "Stage 06",
      title: "Waterproofing & 72-Hour Ponding Tests",
      icon: Droplets,
      items: [
        "Integral crystalline waterproofing admixtures added directly to roof slab concrete",
        "Multi-coat elastomeric waterproofing membrane across bathroom sunken slabs and terrace decks",
        "Mandatory 72-hour standing water ponding test with zero-moisture underside sign-off",
        "Brickbat coba or heat-reflective insulation tiles laid with proper slope toward drain spouts",
      ],
    },
    {
      stage: "Stage 07",
      title: "MEP Pressure Testing & Conduit Checks",
      icon: Activity,
      items: [
        "Pneumatic hydrostatic pressure testing of concealed CPVC/UPVC pipes at 10 kg/cm² for 24 hours",
        "Soundproof drainage soil lines with anti-siphon traps and multi-floor inspection vents",
        "FRLS fire-retardant copper wiring insulation resistance tests using calibrated megohmmeters",
        "Earthing resistance audits ensuring electrode impedance falls strictly below 1 Ohm",
      ],
    },
    {
      stage: "Stage 08",
      title: "Laser Alignment, Snag Clearance & Handover",
      icon: Sparkles,
      items: [
        "Floor tile lippage and slope verification with cross-line 360° laser levels",
        "Right-angle plumbness checks for all door frames and window fenestrations",
        "Comprehensive 150-point room-by-room digital snag list zeroed before possession",
        "Final handover with digital as-built MEP blueprints and certified snag clearance protocol",
      ],
    },
  ];

  return (
    <div className="flex flex-col bg-[#FAF8F5]">
      {/* Schema */}
      <ServiceJsonLd
        name="Construction Quality Standards in Chennai"
        serviceType="Civil Engineering Quality Control"
        description="Detailed 150+ point civil engineering QA/QC methodology by The Build Company for turnkey residential construction in Chennai."
      />

      {/* Hero */}
      <section className="py-16 sm:py-24 bg-white border-b border-neutral-200">
        <Container size="wide">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF7ED] border border-[#FFEDD5] text-xs font-bold text-[#EA580C] uppercase tracking-wider mb-5">
              150+ POINT CIVIL ENGINEERING QA/QC FRAMEWORK
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-neutral-900 leading-[1.12]">
              Construction Quality Standards in Chennai
            </h1>

            <p className="mt-6 text-base sm:text-lg text-neutral-600 leading-relaxed max-w-3xl mx-auto">
              Real structural durability is not achieved through cosmetic paint or empty verbal promises. At The Build Company, every home on client-owned land is engineered with measurable lab testing, rigorous stage inspections, and single-source accountability.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/process"
                className="px-7 py-3.5 rounded-full bg-[#EA580C] text-white font-semibold text-sm hover:bg-[#C2410C] transition-colors shadow-luxury-sm inline-flex items-center gap-2"
              >
                <span>View Construction Methodology</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="px-7 py-3.5 rounded-full bg-white border border-neutral-300 text-neutral-800 font-semibold text-sm hover:bg-neutral-50 transition-colors"
              >
                Speak With QC Chief Engineer
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Section 02: 8 Detailed QA/QC Stages */}
      <section className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-neutral-200">
        <Container size="wide">
          <SectionHeading
            eyebrow="ENGINEERING RIGOR"
            title="The 8 Critical Inspection Milestones"
            subtitle="How our on-site civil engineers audit every pour, joint, weld, and conduit before payments are certified."
            align="center"
          />

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">
            {qualityStages.map((stage, idx) => {
              const Icon = stage.icon;
              return (
                <div
                  key={idx}
                  className="rounded-3xl p-8 bg-white border border-neutral-200/90 shadow-xs hover:shadow-luxury-md hover:border-[#EA580C]/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-[#FFF7ED] border border-[#FFEDD5] flex items-center justify-center text-[#EA580C]">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-mono font-bold tracking-wider text-neutral-400 bg-neutral-100 px-3 py-1 rounded-full uppercase">
                        {stage.stage}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl font-bold text-neutral-900 mb-4">
                      {stage.title}
                    </h3>

                    <ul className="space-y-3">
                      {stage.items.map((item, iIdx) => (
                        <li key={iIdx} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-600 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-[#EA580C] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500 font-semibold">
                    <span className="flex items-center gap-1.5 text-emerald-700">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      Lab & Site Sign-off Mandatory
                    </span>
                    <span className="font-mono text-[11px] text-neutral-400">IS Code Compliant</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Section 03: Quality Handover Protocol Strip */}
      <section className="py-16 sm:py-24 bg-white border-b border-neutral-200">
        <Container size="wide">
          <div className="rounded-3xl p-8 sm:p-12 bg-[#0B1E1A] text-white">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <span className="text-xs font-bold uppercase tracking-widest text-[#EA580C] block mb-2">
                  VERIFIED QA/QC HANDOVER PROTOCOL
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white">
                  Pre-Handover Snag Audit & Certified Clearance
                </h2>
                <p className="mt-3 text-sm text-neutral-300 leading-relaxed max-w-2xl">
                  Every home constructed by The Build Company undergoes rigorous civil engineering verification before handover: 72-hour waterproofing ponding test, laser level floor verification, MEP pressure tests, and certified snag clearance.
                </p>
                <div className="mt-6 flex flex-wrap gap-4 text-xs text-neutral-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#EA580C]" />
                    <span>Lab Cube Test Reports for Every Pour</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#EA580C]" />
                    <span>72-Hour Waterproofing Ponding Sign-off</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#EA580C]" />
                    <span>Digital As-Built Blueprints Handover</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 text-center lg:text-right">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#EA580C] text-white font-semibold text-sm hover:bg-[#C2410C] transition-colors shadow-luxury-sm"
                >
                  <span>Book Consultation With QC Lead</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Section 04: Consultation Form */}
      <section className="py-16 sm:py-24 bg-[#FAF8F5]">
        <Container size="narrow">
          <div className="rounded-3xl bg-white border border-neutral-200 p-8 sm:p-12 shadow-luxury-md text-center">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#EA580C] block mb-2">
              ENGINEERING FIRST
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-neutral-900">
              Schedule Your Site Soil & Plot Inspection
            </h2>
            <p className="mt-3 text-sm text-neutral-600 max-w-md mx-auto mb-8">
              Speak directly with our senior civil engineers. We will inspect your plot in Chennai and review foundation feasibility free of charge.
            </p>

            <LeadForm
              source="quality_standards_page"
              buttonLabel="Schedule Free Engineering Inspection"
              variant="default"
            />
          </div>
        </Container>
      </section>
    </div>
  );
}
