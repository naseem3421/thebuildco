import React from "react";
import {
  HeroSection,
  TrustMetricsSection,
  ServicesSection,
  EditorialTrustSection,
  PackagesSection,
  CostCalculatorSection,
  ProcessSection,
  ProjectsSection,
  WhyTBCSection,
  TestimonialsSection,
  RiskReversalSection,
  FAQSection,
  ContactInquirySection,
  FinalCTASection,
} from "@/components";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* 2. Hero Section */}
      <HeroSection />

      {/* 3. Trust Metrics */}
      <TrustMetricsSection />

      {/* 4. Construction Services */}
      <ServicesSection />

      {/* 5. Editorial "Construction You Can Trust" */}
      <EditorialTrustSection />

      {/* 6. Packages Preview */}
      <PackagesSection />

      {/* 7. Cost Calculator Preview */}
      <CostCalculatorSection />

      {/* 8. Process (8 Steps) */}
      <ProcessSection />

      {/* 9. Featured Projects (4 Chennai Projects) */}
      <ProjectsSection />

      {/* 10. Why TBC */}
      <WhyTBCSection />

      {/* 11. Testimonials */}
      <TestimonialsSection />

      {/* 12. Risk Reversal */}
      <RiskReversalSection />

      {/* 13. FAQ Preview */}
      <FAQSection />

      {/* 14. Free Site Consultation Lead Capture */}
      <ContactInquirySection />

      {/* 15. Final CTA */}
      <FinalCTASection />
    </div>
  );
}
