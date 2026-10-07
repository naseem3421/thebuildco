"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { HelpCircle, ChevronDown, ArrowRight, MessageSquareQuote } from "lucide-react";
import { homepageAeoQuestions, AEOQuestionItem } from "@/config/aeoQuestions";

export { homepageAeoQuestions };
export type { AEOQuestionItem };

const categories = [
  "All",
  "Cost & Pricing",
  "Scope & Process",
  "Engineering & Quality",
  "Planning & Approvals",
  "Joint Ventures",
];

export function AEOQuestionSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [openIndices, setOpenIndices] = useState<number[]>([0, 1]); // first two open by default

  const filteredQuestions =
    selectedCategory === "All"
      ? homepageAeoQuestions
      : homepageAeoQuestions.filter((item) => item.category === selectedCategory);

  const toggleQuestion = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-neutral-200">
      <span id="aeo-answers" className="sr-only" aria-hidden="true" />
      <Container size="wide">
        <SectionHeading
          eyebrow="LANDOWNER KNOWLEDGE BASE & FAQ"
          title="Questions Chennai Landowners Ask Before Building"
          subtitle="Direct, factual answers on residential construction costs, engineering standards, timelines, contracts, and joint ventures in Chennai."
        />

        {/* Category Filter Pills */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? "bg-[#EA580C] text-white shadow-xs"
                  : "bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion Grid */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredQuestions.map((item, idx) => {
            const isOpen = openIndices.includes(idx);
            const buttonId = `faq-accordion-btn-${idx}`;
            const panelId = `faq-accordion-panel-${idx}`;

            return (
              <div
                key={idx}
                className="rounded-3xl bg-white border border-neutral-200/90 overflow-hidden shadow-xs hover:border-[#EA580C]/40 transition-colors"
              >
                <button
                  id={buttonId}
                  type="button"
                  onClick={() => toggleQuestion(idx)}
                  className="w-full p-6 text-left flex items-start justify-between gap-4 cursor-pointer focus-visible:outline-none"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-[#FFF7ED] flex items-center justify-center shrink-0 mt-0.5 text-[#EA580C]">
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-neutral-900 text-sm sm:text-base leading-snug">
                      {item.q}
                    </span>
                  </div>
                  <div
                    aria-hidden="true"
                    className={`w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center shrink-0 text-neutral-600 transition-transform duration-200 ${
                      isOpen ? "rotate-180 bg-[#EA580C] text-white" : ""
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
                    className="px-6 pb-6 pt-1 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100"
                  >
                    <p>{item.a}</p>
                    <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-400">
                      {item.category && (
                        <span className="font-semibold text-neutral-500 uppercase tracking-wider text-[10px]">
                          {item.category}
                        </span>
                      )}
                      <a
                        href="#consultation"
                        className="text-xs font-semibold text-[#EA580C] hover:text-[#C2410C] inline-flex items-center gap-1"
                      >
                        <span>Discuss This Question</span>
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Links to Full Technical FAQ & Consultation */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-neutral-300 text-neutral-900 font-bold text-xs uppercase tracking-wider hover:border-[#EA580C] hover:text-[#EA580C] shadow-xs transition-all"
          >
            <span>View All Detailed Technical FAQs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <a
            href="#consultation"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#EA580C] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#C2410C] shadow-xs transition-all"
          >
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>Have a Specific Question? Ask an Engineer</span>
          </a>
        </div>
      </Container>
    </section>
  );
}
