import React from "react";
import {
  HeroSection,
  WhatDoesTBCDoSection,
  QualificationSection,
  ProblemSection,
  OneAccountableTeamSection,
  ServicesSection,
  JointVentureHomeSection,
  ConstructionCostSection,
  CostCalculatorSection,
  MoneyControlSection,
  QualityControlSection,
  ProjectsSection,
  WhyTBCSection,
  TestimonialsSection,
  AEOQuestionSection,
  ContactInquirySection,
  FinalCTASection,
} from "@/components";
import { homepageAeoQuestions } from "@/config/aeoQuestions";
import { FAQJsonLd, ServiceJsonLd } from "@/components/seo/JsonLd";

export default function HomePage() {
  const faqSchemaData = homepageAeoQuestions.map((item) => ({
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
        description="End-to-end turnkey residential construction in Chennai for landowners planning bespoke homes, luxury villas, and duplex residences."
      />

      {/* 01 — Hero Section */}
      <HeroSection />

      {/* 02 — What Does TBC Do? (AEO/AIO Direct Entity Overview) */}
      <WhatDoesTBCDoSection />

      {/* 03 — Is TBC Right For Your Project? (4 Qualification Criteria) */}
      <QualificationSection />

      {/* 04 — The Problem (Building a Premium Home Shouldn't Feel Like Managing 20 Contractors) */}
      <ProblemSection />

      {/* 05 — One Accountable Team & Process (6 Stages from First Drawing to Final Key) */}
      <OneAccountableTeamSection />

      {/* 06 — Residential Services (Individual House, Villa, Duplex, Luxury Home) */}
      <ServicesSection />

      {/* 07 — Joint Venture Projects (Selective Landowner Partnerships) */}
      <JointVentureHomeSection />

      {/* 08 — Construction Cost in Chennai (Direct Answer & Cost Drivers) */}
      <ConstructionCostSection />

      {/* 09 — Cost Calculator (Interactive Estimation Engine & Project Qualification) */}
      <CostCalculatorSection />

      {/* 10 — Investment & Payment Transparency (Know Where Your Money Goes & Milestone Payments) */}
      <MoneyControlSection />

      {/* 11 — Quality Control (Engineering Rigor & Critical Stage Inspections) */}
      <QualityControlSection />

      {/* 12 — Selected Projects (Real Case Studies on Client-Owned Land) */}
      <ProjectsSection />

      {/* 13 — Why TBC (6 Core Differentiators) */}
      <WhyTBCSection />

      {/* 14 — Client Testimonials (Genuine Homeowner Experiences) */}
      <TestimonialsSection />

      {/* 15 — Landowner Knowledge Base & FAQ (18 Factual Q&As with Interactive Accordion) */}
      <AEOQuestionSection />

      {/* 16 — Consultation Booking & Site Survey Form */}
      <ContactInquirySection />

      {/* 17 — Final CTA */}
      <FinalCTASection />
    </div>
  );
}
