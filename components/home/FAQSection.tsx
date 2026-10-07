"use client";

import React, { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { ChevronDown, MessageCircle, ArrowRight } from "lucide-react";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-white border-b border-neutral-200">
      <Container size="narrow">
        <SectionHeading
          eyebrow="LANDOWNER CLARITY"
          title="Frequently Asked Questions"
          subtitle="Clear, transparent answers to help you navigate building on your plot in Chennai."
        />

        <div className="mt-12 space-y-4">
          {siteConfig.faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const buttonId = `faq-home-btn-${idx}`;
            const panelId = `faq-home-panel-${idx}`;

            return (
              <div
                key={idx}
                className="rounded-3xl bg-[#FAF8F5] border border-neutral-200/90 overflow-hidden transition-all duration-200 shadow-xs"
              >
                <button
                  id={buttonId}
                  type="button"
                  onClick={() => toggleFAQ(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-none"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                >
                  <span className="font-display text-lg sm:text-xl font-medium text-neutral-900">
                    {faq.question}
                  </span>
                  <div
                    aria-hidden="true"
                    className={`w-8 h-8 rounded-full bg-white border border-neutral-200 flex items-center justify-center shrink-0 text-neutral-800 transition-transform duration-200 ${
                      isOpen ? "rotate-180 bg-[#EA580C] text-white border-[#EA580C]" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="px-6 pb-6 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-200/60 pt-4"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Deeper FAQ link */}
        <div className="mt-10 text-center">
          <Link
            href="/faq"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#EA580C] hover:text-[#C2410C]"
          >
            <span>View All Detailed Technical FAQs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
