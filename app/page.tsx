import React from "react";
import {
  HeroSection,
  TrustStripSection,
  WhatDoesTBCDoSection,
  QualificationSection,
  ProblemSection,
  OneAccountableTeamSection,
  ServicesSection,
  JointVentureHomeSection,
  ConstructionCostSection,
  CostCalculatorSection,
  MoneyControlSection,
  ProcessSection,
  QualityControlSection,
  ProjectsSection,
  WhyTBCSection,
  TestimonialsSection,
  AEOQuestionSection,
  FAQSection,
  ContactInquirySection,
  FinalCTASection,
} from "@/components";
import { homepageAeoQuestions } from "@/components/home/AEOQuestionSection";
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
        description="End-to-end turnkey residential construction in Chennai for landowners planning ₹1 Cr–₹3 Cr homes, luxury villas, and duplex residences."
      />

      {/* 02 — Hero Section */}
      <HeroSection />

      {/* 03 — Trust Strip */}
      <TrustStripSection />

      {/* 04 — What Does TBC Do? (AEO/AIO Direct Entity Overview) */}
      <WhatDoesTBCDoSection />

      {/* 05 — Is TBC Right For Your Project? (4 Qualification Criteria) */}
      <QualificationSection />

      {/* 06 — The Problem (Building a ₹2 Crore Home Shouldn't Feel Like Managing 20 Contractors) */}
      <ProblemSection />

      {/* 07 — One Accountable Team (6 Stages from First Drawing to Final Key) */}
      <OneAccountableTeamSection />

      {/* 08 — Residential Services (Individual House, Villa, Duplex, Luxury Home) */}
      <ServicesSection />

      {/* 09 — Joint Venture Projects (Secondary Business Offering) */}
      <JointVentureHomeSection />

      {/* 10 — Construction Cost in Chennai (Direct Answer & Cost Drivers) */}
      <ConstructionCostSection />

      {/* 11 — Cost Calculator (Interactive Estimation Engine & Project Qualification) */}
      <CostCalculatorSection />

      {/* 12 — Investment & Payment Transparency (Know Where Your Money Goes & Milestone Payments) */}
      <MoneyControlSection />

      {/* 13 — 8-Stage Construction Process */}
      <ProcessSection />

      {/* 14 — Quality Control (Engineering Rigor & Critical Stage Inspections) */}
      <QualityControlSection />

      {/* 15 — Selected Projects (Real Case Studies on Client-Owned Land) */}
      <ProjectsSection />

      {/* 16 — Why TBC (6 Core Differentiators) */}
      <WhyTBCSection />

      {/* 17 — Client Testimonials (Genuine Homeowner Experiences) */}
      <TestimonialsSection />

      {/* 18 — AEO Question Section (16 Factual Q&As for Chennai Landowners) */}
      <AEOQuestionSection />

      {/* 19 — FAQ (Interactive Accordion) */}
      <FAQSection />

      {/* Consultation Booking & Site Survey Form */}
      <ContactInquirySection />

      {/* 20 — Final CTA */}
      <FinalCTASection />
    </div>
  );
}
