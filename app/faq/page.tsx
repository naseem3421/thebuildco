import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { FAQDirectory } from "@/components/faq/FAQDirectory";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Find detailed answers to questions about construction pricing, stage payments, materials, approvals, warranties, and timelines for building on your plot in Chennai.",
};

export default function FAQPage() {
  return (
    <div className="py-12 sm:py-20 flex flex-col gap-12 sm:gap-16">
      <section>
        <Container size="wide">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <Badge variant="terracotta" className="mb-4">
              Knowledge Base
            </Badge>

            <h1 className="font-display text-4xl sm:text-6xl font-medium text-[#183B35] leading-tight">
              Frequently Asked Questions
            </h1>

            <p className="mt-4 text-base sm:text-lg text-[#52655E] leading-relaxed">
              Clear, transparent answers to every technical and commercial question about constructing your home on your plot in Chennai.
            </p>
          </div>

          <FAQDirectory />
        </Container>
      </section>
    </div>
  );
}
