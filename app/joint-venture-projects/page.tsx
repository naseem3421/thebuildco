import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LeadForm } from "@/components/forms/LeadForm";
import {
  Building2,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  Scale,
  FileCheck2,
  TrendingUp,
  LandPlot,
  ArrowRight,
  HelpCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Joint Venture Construction in Chennai | Partner With The Build Company",
  description:
    "Have residential land with development potential in Chennai? The Build Company evaluates joint venture partnerships for prime plots. Transparent feasibility, professional execution, and structured commercial terms.",
  keywords: [
    "joint venture construction chennai",
    "construction joint venture chennai",
    "land development joint venture chennai",
    "joint venture builder chennai",
    "property joint venture chennai",
    "jv builder chennai",
  ],
  alternates: {
    canonical: "https://thebuildcompany.in/joint-venture-projects",
  },
  openGraph: {
    title: "Joint Venture Construction Projects in Chennai | The Build Company",
    description:
      "Partner with The Build Company for joint venture residential development on suitable Chennai plots. Transparent feasibility and technical engineering oversight.",
    url: "https://thebuildcompany.in/joint-venture-projects",
    type: "website",
  },
};

export default function JointVenturePage() {
  const evaluationCriteria = [
    {
      title: "Prime Chennai Location",
      desc: "Plots located within established or high-growth residential corridors across Chennai (OMR, ECR, Anna Nagar, Velachery, Medavakkam, Porur, etc.).",
      icon: <MapPin className="w-5 h-5 text-[#EA580C]" />,
    },
    {
      title: "Clear Title & Approvals",
      desc: "Unencumbered, clear-title properties with verifiable ownership documentation ready for DTCP / CMDA planning approval.",
      icon: <FileCheck2 className="w-5 h-5 text-[#EA580C]" />,
    },
    {
      title: "Development Feasibility",
      desc: "Adequate road width, suitable frontage, and soil load-bearing capacity to support premium residential or duplex development.",
      icon: <LandPlot className="w-5 h-5 text-[#EA580C]" />,
    },
    {
      title: "Mutual Commercial Alignment",
      desc: "Fair, transparent commercial terms structured objectively based on location demand, project scale, and development economics.",
      icon: <Scale className="w-5 h-5 text-[#EA580C]" />,
    },
  ];

  const jvStages = [
    {
      step: "01",
      title: "Property Submission",
      desc: "Share your plot details, location, frontage, road width, and ownership background for preliminary desktop analysis.",
    },
    {
      step: "02",
      title: "On-Site Engineering Survey",
      desc: "Our civil engineering team visits the plot to evaluate ground conditions, neighborhood access, and zoning potential.",
    },
    {
      step: "03",
      title: "Architectural & Financial Feasibility",
      desc: "We formulate an indicative building concept and financial viability model assessing built-up potential and timelines.",
    },
    {
      step: "04",
      title: "Commercial Discussion & Agreement",
      desc: "Mutually aligned legal and development terms formulated with complete transparency before entering a formal JV contract.",
    },
    {
      step: "05",
      title: "Turnkey Execution & Delivery",
      desc: "The Build Company manages end-to-end execution — architectural design, CMDA/DTCP approvals, procurement, construction, and delivery.",
    },
  ];

  return (
    <div className="flex flex-col bg-[#FBF9F4]">
      {/* Hero Header */}
      <section className="relative py-16 sm:py-24 bg-white border-b border-neutral-200">
        <Container size="wide">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-[#EA580C] mb-6">
              <Building2 className="w-3.5 h-3.5" />
              <span>JOINT VENTURE RESIDENTIAL DEVELOPMENT • CHENNAI</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-neutral-900 leading-[1.1]">
              Have Land With Development Potential in Chennai?
            </h1>

            <p className="mt-6 text-base sm:text-lg text-neutral-600 leading-relaxed">
              The Build Company collaborates with landowners and property owners on suitable
              Joint Venture development opportunities. If you own residential
              land in Chennai with strong development potential, our engineering
              and architectural team can evaluate project feasibility and discuss
              structured development models.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#submit-property"
                className="px-6 py-3.5 rounded-full bg-[#EA580C] text-white font-semibold text-sm hover:bg-[#C2410C] transition-colors shadow-luxury-sm"
              >
                Submit Property for JV Evaluation
              </a>
              <Link
                href="/projects"
                className="px-6 py-3.5 rounded-full border border-neutral-300 text-neutral-800 font-semibold text-sm hover:bg-neutral-100 transition-colors"
              >
                View Our Construction Portfolio
              </Link>
            </div>

            <p className="mt-4 text-xs text-neutral-500 italic">
              * All Joint Venture proposals are strictly subject to project feasibility, due diligence, and mutually agreed commercial terms. The Build Company does not promise guaranteed financial returns or speculate on land.
            </p>
          </div>
        </Container>
      </section>

      {/* Evaluation Criteria */}
      <section className="py-16 sm:py-20 border-b border-neutral-200">
        <Container size="wide">
          <SectionHeading
            eyebrow="FEASIBILITY BENCHMARKS"
            title="How The Build Company Evaluates Joint Venture Opportunities"
            subtitle="We prioritize quality, legal integrity, and structural feasibility to protect every stakeholder's capital."
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {evaluationCriteria.map((item) => (
              <div
                key={item.title}
                className="bg-white border border-neutral-200/90 rounded-2xl p-6 shadow-xs flex flex-col"
              >
                <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-base font-bold text-neutral-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed flex-1">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 5-Step Process */}
      <section className="py-16 sm:py-20 bg-white border-b border-neutral-200">
        <Container size="wide">
          <SectionHeading
            eyebrow="TRANSPARENT WORKFLOW"
            title="The Joint Venture Evaluation Process"
            subtitle="A clear, structured path from your initial property details to formal execution."
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-5 gap-6">
            {jvStages.map((stage) => (
              <div
                key={stage.step}
                className="flex flex-col relative p-5 rounded-2xl bg-neutral-50 border border-neutral-200/80"
              >
                <span className="font-display text-2xl font-bold text-[#EA580C] mb-2">
                  {stage.step}
                </span>
                <h4 className="text-sm font-bold text-neutral-900 mb-2">
                  {stage.title}
                </h4>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {stage.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Submission Form Section */}
      <section id="submit-property" className="py-16 sm:py-24">
        <Container size="default">
          <div className="bg-white border border-neutral-200 rounded-3xl p-8 sm:p-12 shadow-luxury-md">
            <div className="max-w-xl mx-auto text-center mb-8">
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#EA580C] block mb-2">
                CONFIDENTIAL PROPERTY REVIEW
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-medium text-neutral-900">
                Submit Your Land for JV Evaluation
              </h2>
              <p className="mt-3 text-sm text-neutral-600">
                Provide your plot location and estimated dimensions. Our engineering team will review feasibility and get back to you within 2 business days.
              </p>
            </div>

            <LeadForm
              source="joint_venture_page"
              formType="consultation"
              buttonLabel="Submit Property for JV Evaluation"
              className="max-w-xl mx-auto"
            />
          </div>
        </Container>
      </section>
    </div>
  );
}
