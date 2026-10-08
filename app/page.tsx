import React from "react";
import {
  HeroSection,
  QualificationSection,
  ProblemSection,
  OneAccountableTeamSection,
  ServicesSection,
  CostCalculatorSection,
  MoneyControlSection,
  QualityControlSection,
  ProjectsSection,
  WhyTBCSection,
  TestimonialsSection,
  AEOQuestionSection,
  JointVentureHomeSection,
  FinalCTASection,
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

      {/* SECTION 02 — QUICK PROJECT QUALIFICATION */}
      <QualificationSection />

      {/* SECTION 03 — THE PROBLEM / TBC SOLUTION */}
      <ProblemSection />

      {/* SECTION 04 — TBC PROCESS SUMMARY */}
      <OneAccountableTeamSection />

      {/* SECTION 05 — RESIDENTIAL CONSTRUCTION SERVICES */}
      <ServicesSection />

      {/* SECTION 06 — CONSTRUCTION COST CALCULATOR */}
      <CostCalculatorSection />

      {/* SECTION 07 — INVESTMENT TRANSPARENCY */}
      <MoneyControlSection />

      {/* SECTION 08 — ENGINEERING & QUALITY */}
      <QualityControlSection />

      {/* SECTION 09 — SELECTED PROJECTS */}
      <ProjectsSection />

      {/* SECTION 10 — WHY TBC */}
      <WhyTBCSection />

      {/* SECTION 11 — TESTIMONIALS */}
      <TestimonialsSection />

      {/* SECTION 12 — FAQ */}
      <AEOQuestionSection />

      {/* SECTION 13 — JOINT VENTURE */}
      <JointVentureHomeSection />

      {/* SECTION 14 — FINAL CTA & CONSULTATION */}
      <FinalCTASection />
    </div>
  );
}
