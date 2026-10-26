import React from "react";
import {
  HeroSection,
  TrustBarSection,
  TrustProtocolSection,
  ProblemSection,
  OneAccountableTeamSection,
  CostCalculatorSection,
  QualityControlSection,
  ProjectsSection,
  UpcomingProjectsSection,
  WhyTBCSection,
  TestimonialsSection,
  AEOQuestionSection,
  JointVentureHomeSection,
  FinalCTASection,
  BrandPartnersSection,
  ExperienceCentreSection,
} from "@/components";
import { homepage8Questions } from "@/config/homepageFaq";
import { FAQJsonLd, ServiceJsonLd } from "@/components/seo/JsonLd";

export default function HomePage() {
  const faqSchemaData = homepage8Questions.map((item) => ({
    question: item.q,
    answer: item.a,
  }));

  return (
    <div className="flex flex-col">
      {/* Structured Data for Search & AI Engines */}
      <FAQJsonLd faqs={faqSchemaData} />
      <ServiceJsonLd
        name="Turnkey Residential Home Construction in Chennai"
        serviceType="Turnkey Residential House Construction"
        description="End-to-end turnkey residential construction in Chennai for landowners planning bespoke homes, luxury villas, and duplex residences on client-owned land."
      />

      {/* SECTION 01 — HERO */}
      <HeroSection />

      {/* EXECUTIVE TRUST CREDENTIALS BAR */}
      <TrustBarSection />

      {/* SECTION 02 — THE BUILD COMPANY TRUST PROTOCOL (CONTRACTUAL SAFEGUARDS) */}
      <TrustProtocolSection />

      {/* SECTION 03 — THE PROBLEM & SOLUTION */}
      <ProblemSection />

      {/* SECTION 03 — PROCESS SUMMARY */}
      <OneAccountableTeamSection />

      {/* SECTION 04 — RECENTLY COMPLETED PROJECTS */}
      <ProjectsSection />

      {/* SECTION 05 — UPCOMING PROJECTS */}
      <UpcomingProjectsSection />

      {/* SECTION 06 — CONSTRUCTION COST CALCULATOR */}
      <CostCalculatorSection />

      {/* SECTION 06.5 — PHYSICAL EXPERIENCE CENTRE & MATERIAL SAMPLES */}
      <ExperienceCentreSection />

      {/* SECTION 07 — ENGINEERING & QUALITY */}
      <QualityControlSection />

      {/* SECTION 08 — WHY THE BUILD COMPANY */}
      <WhyTBCSection />

      {/* SECTION 11 — TESTIMONIALS */}
      <TestimonialsSection />

      {/* SECTION 12 — FAQ */}
      <AEOQuestionSection />

      {/* SECTION 13 — JOINT VENTURE */}
      <JointVentureHomeSection />

      {/* SECTION 14 — FINAL CTA & CONSULTATION */}
      <FinalCTASection />

      {/* SECTION 15 — OUR BRAND PARTNERS (ABOVE FOOTER) */}
      <BrandPartnersSection />
    </div>
  );
}
