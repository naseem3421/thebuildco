"use client";

import React, { useState } from "react";
import { siteConfig, FAQItem, getWhatsAppUrl } from "@/config/site";
import { ChevronDown, MessageCircle, HelpCircle } from "lucide-react";

export function FAQDirectory() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const categories = [
    "All",
    "Pricing & Costing",
    "Payments & Financials",
    "Timeline & Delivery",
    "Engineering & Materials",
    "Warranty & Aftercare",
    "Approvals & Permissions",
    "Site Visits & Land",
  ];

  const filteredFaqs =
    selectedCategory === "All"
      ? siteConfig.faqs
      : siteConfig.faqs.filter((faq: FAQItem) => faq.category === selectedCategory);

  const toggleFAQ = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div>
      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10" role="tablist" aria-label="FAQ Categories">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={selectedCategory === cat}
            onClick={() => {
              setSelectedCategory(cat);
              setOpenIndex(0);
            }}
            className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer ${
              selectedCategory === cat
                ? "bg-[#183B35] text-[#F4F0E8] shadow-luxury-sm"
                : "bg-[#FBF9F4] text-[#183B35] border border-[#D9D2C5] hover:bg-[#E9E4D9]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Accordion List */}
      <div className="space-y-4 max-w-3xl mx-auto">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          const buttonId = `faq-dir-btn-${idx}`;
          const panelId = `faq-dir-panel-${idx}`;

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

      {/* WhatsApp Help Trigger */}
      <div className="mt-12 text-center p-6 rounded-3xl bg-[#FBF9F4] border border-[#D9D2C5] max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 shadow-luxury-sm">
        <div className="flex items-center gap-3 text-left">
          <HelpCircle className="w-6 h-6 text-[#B86F50] shrink-0" />
          <div>
            <h4 className="font-semibold text-xs text-[#183B35]">Have a specific query?</h4>
            <p className="text-[11px] text-[#52655E]">Speak directly with our engineering team on WhatsApp.</p>
          </div>
        </div>
        <a
          href={getWhatsAppUrl("Hi TBC, I have a question regarding construction on my plot in Chennai.")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1E7E34] text-white text-xs font-semibold shadow-luxury-sm hover:bg-[#155D27] transition-colors shrink-0"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Ask on WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
