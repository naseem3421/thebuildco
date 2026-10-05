"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { ChevronDown, MessageCircle } from "lucide-react";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 scroll-mt-20">
      <Container size="narrow">
        <SectionHeading
          eyebrow="Landowner Clarity"
          title="Frequently Asked Questions"
          description="Straightforward answers to the most common questions about building on your plot in Chennai."
          align="center"
        />

        <div className="mt-12 space-y-4">
          {siteConfig.faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const buttonId = `faq-home-btn-${idx}`;
            const panelId = `faq-home-panel-${idx}`;

            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#FBF9F4] border border-[#D9D2C5] overflow-hidden transition-all duration-200 shadow-luxury-sm"
              >
                <button
                  id={buttonId}
                  type="button"
                  onClick={() => toggleFAQ(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-none"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                >
                  <span className="font-display text-lg sm:text-xl font-medium text-[#183B35]">
                    {faq.question}
                  </span>
                  <div
                    aria-hidden="true"
                    className={`w-8 h-8 rounded-full bg-[#F4F0E8] border border-[#D9D2C5] flex items-center justify-center shrink-0 text-[#183B35] transition-transform duration-200 ${
                      isOpen ? "rotate-180 bg-[#B86F50] text-white border-[#B86F50]" : ""
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
                    className="px-6 pb-6 text-xs sm:text-sm text-[#52655E] leading-relaxed border-t border-[#D9D2C5]/50 pt-4 animate-in fade-in duration-200"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Help Callout */}
        <div className="mt-10 text-center text-xs text-[#52655E]">
          <span>Have a unique plot size or specific architectural query? </span>
          <a
            href={siteConfig.contact.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-[#1E7E34] hover:underline ml-1"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Ask our engineers on WhatsApp</span>
          </a>
        </div>
      </Container>
    </section>
  );
}
