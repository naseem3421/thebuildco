"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { HelpCircle, ChevronDown, ArrowRight } from "lucide-react";
import { homepage8Questions } from "@/config/homepageFaq";

export function AEOQuestionSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // first question open by default

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-10 sm:py-14 bg-[#FAF8F5] border-b border-neutral-200">
      <Container size="wide">
        <SectionHeading
          eyebrow="FREQUENTLY ASKED QUESTIONS"
          title="Questions Chennai Landowners Ask Before Building"
          subtitle="Clear, direct answers on residential construction costs, engineering standards, timelines, and contracts."
          align="center"
        />

        {/* 8 High-Intent FAQs in 2-Column Grid */}
        <div className="mt-7 grid grid-cols-1 lg:grid-cols-2 gap-3.5 max-w-5xl mx-auto">
          {homepage8Questions.map((item, idx) => {
            const isOpen = openIndex === idx;
            const buttonId = `faq-btn-${idx}`;
            const panelId = `faq-panel-${idx}`;

            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-neutral-200/90 overflow-hidden shadow-xs hover:border-[#EA580C]/40 transition-colors"
              >
                <button
                  id={buttonId}
                  type="button"
                  onClick={() => toggleQuestion(idx)}
                  className="w-full p-5 text-left flex items-start justify-between gap-3 cursor-pointer focus-visible:outline-none"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                >
                  <div className="flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-lg bg-[#FFF7ED] flex items-center justify-center shrink-0 mt-0.5 text-[#EA580C]">
                      <HelpCircle className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-bold text-neutral-900 text-sm leading-snug">
                      {item.q}
                    </span>
                  </div>
                  <div
                    aria-hidden="true"
                    className={`w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center shrink-0 text-neutral-600 transition-transform duration-200 ${
                      isOpen ? "rotate-180 bg-[#EA580C] text-white" : ""
                    }`}
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100"
                  >
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA to Full FAQ Library */}
        <div className="mt-10 text-center">
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white border border-neutral-300 text-neutral-900 font-semibold text-xs sm:text-sm hover:border-[#EA580C] hover:text-[#EA580C] shadow-xs transition-all group"
          >
            <span>View All Construction FAQs</span>
            <ArrowRight className="w-4 h-4 text-[#EA580C] transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
