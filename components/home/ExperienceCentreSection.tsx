"use client";

import React, { useState } from "react";
import Link from "next/link";
import { siteConfig, getWhatsAppUrl } from "@/config/site";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import {
  Bath,
  Layers,
  Zap,
  DoorClosed,
  Maximize2,
  ShieldCheck,
  MapPin,
  Clock,
  Calendar,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  MessageCircle,
  Eye,
  SlidersHorizontal,
} from "lucide-react";

interface SampleCategory {
  id: string;
  title: string;
  icon: React.ElementType;
  tag: string;
  badgeColor: string;
  highlight: string;
  description: string;
  samples: string[];
  brands: string[];
}

const SAMPLE_CATEGORIES: SampleCategory[] = [
  {
    id: "sanitaryware",
    title: "Wash Basins & Sanitaryware",
    icon: Bath,
    tag: "Bath & Fixtures",
    badgeColor: "bg-cyan-50 text-cyan-800 border-cyan-200",
    highlight: "Working Water & Pressure Testing",
    description:
      "Touch and inspect live sanitary fittings rather than selecting from tiny catalog thumbnails.",
    samples: [
      "Table-top & under-counter vanity basins",
      "Rimless wall-hung closets with soft-close seats",
      "Concealed diverters, rain showers & health faucets",
      "Chrome, matte black & brushed nickel CP finishes",
    ],
    brands: ["Kohler", "Jaquar", "Hindware"],
  },
  {
    id: "tiles",
    title: "Tiles, Marble & Countertops",
    icon: Layers,
    tag: "Flooring & Walls",
    badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
    highlight: "150+ Physical Tile Boards",
    description:
      "Inspect actual gloss levels, anti-skid textures, and veining under both natural and warm lighting.",
    samples: [
      "Large-format 4ft × 2ft glazed vitrified tiles (GVT)",
      "Full-body vitrified living & dining flooring",
      "R10-rated anti-skid bathroom & balcony tiles",
      "Jet black granite & quartz kitchen counter slabs",
    ],
    brands: ["Kajaria", "Somany", "Qutone"],
  },
  {
    id: "electrical",
    title: "Wires, Switches & Automation",
    icon: Zap,
    tag: "MEP & Electrical",
    badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
    highlight: "Fire-Safe Copper Cutaways",
    description:
      "Verify conductor cross-sections, insulation thickness, and smooth tactile switch mechanisms.",
    samples: [
      "FR-LSH (Flame Retardant Low Smoke) copper wires",
      "Modular feather-touch switches & glass faceplates",
      "Concealed distribution boards & MCB isolators",
      "Smart home automation panels & two-way conduits",
    ],
    brands: ["Schneider", "Legrand", "Polycab", "Finolex"],
  },
  {
    id: "doors-windows",
    title: "Windows, Doors & Hardware",
    icon: DoorClosed,
    tag: "Joinery & Openings",
    badgeColor: "bg-purple-50 text-purple-800 border-purple-200",
    highlight: "1:1 Full-Scale Operating Mockups",
    description:
      "Operate heavy multi-chamber UPVC windows and feel the solid heft of teak wood doors.",
    samples: [
      "Multi-chamber UPVC acoustic sliding & casement windows",
      "Toughened Saint-Gobain insulated glass panels",
      "Solid first-quality teak main doors & veneer bedroom doors",
      "SS 304 magnetic mortise locks & architectural handles",
    ],
    brands: ["Saint-Gobain", "Kommerling", "Godrej", "Yale"],
  },
  {
    id: "structural",
    title: "Civil, Steel & Waterproofing",
    icon: ShieldCheck,
    tag: "Structural Rigor",
    badgeColor: "bg-blue-50 text-blue-800 border-blue-200",
    highlight: "Core Civil Engineering Cutaways",
    description:
      "See the hidden backbone of your home that contractors usually keep out of sight.",
    samples: [
      "Certified Fe 550D TMT rebar cross-section cutouts",
      "Lead-free CPVC & UPVC hot/cold plumbing pipes",
      "5-stage terrace & toilet waterproofing mockups",
      "M-Sand, P-Sand and test cube strength samples",
    ],
    brands: ["Tata Tiscon", "JSW Neosteel", "Astral", "Dr. Fixit"],
  },
  {
    id: "packages",
    title: "Side-by-Side Package Trays",
    icon: SlidersHorizontal,
    tag: "Package Comparison",
    badgeColor: "bg-orange-50 text-[#EA580C] border-orange-200",
    highlight: "Basic vs. Standard vs. Premium",
    description:
      "Hold the exact fixtures from our ₹2,399, ₹2,699, and ₹3,099/sqft packages side-by-side.",
    samples: [
      "Basic Tier: Sturdy, reliable standard ISI specifications",
      "Standard Tier: Premium vitrified tiles & luxury sanitaryware",
      "Premium Tier: Designer marble, high-end Kohler/Grohe & UPVC",
      "Contract-locked sample tags guaranteeing zero substitutions",
    ],
    brands: ["All Certified Brand Partners"],
  },
];

export function ExperienceCentreSection() {
  const [activeTab, setActiveTab] = useState<string>("sanitaryware");
  const selectedSample =
    SAMPLE_CATEGORIES.find((s) => s.id === activeTab) || SAMPLE_CATEGORIES[0];
  const IconComponent = selectedSample.icon;

  return (
    <section
      id="experience-centre"
      className="py-10 sm:py-14 bg-gradient-to-b from-[#FAF8F5] via-white to-[#FAF8F5] border-y border-[#D9D2C5]/70 relative overflow-hidden scroll-mt-20"
    >
      {/* Decorative architectural grid accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-100/20 rounded-full blur-3xl pointer-events-none" />

      <Container size="wide">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF7F3] border border-[#FFD9C6] text-xs font-bold text-[#EA580C] uppercase tracking-wider mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#EA580C]" />
            <span>OUR CONSTRUCTION EXPERIENCE CENTRE</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-[#183B35] leading-tight">
            Experience Your Home Before It’s Built.
          </h2>

          <p className="mt-3 text-sm sm:text-base text-[#52655E] leading-relaxed">
            Our unique in-office Experience Centre brings construction materials, tiles, bathroom fittings, electrical fittings, door finishes, and interior samples under one roof—helping you explore options and make confident decisions before construction begins.
          </p>
        </div>

        {/* 3 Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto mb-8 sm:mb-10">
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#D9D2C5]/80 shadow-xs flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-[#FFF7ED] border border-[#FFEDD5] flex items-center justify-center shrink-0 text-[#EA580C]">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-neutral-900 mb-1">
                200+ Live Material Samples
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                From wash basins and closets to switches, cables, and structural rebars. Everything is on physical display.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#D9D2C5]/80 shadow-xs flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 text-emerald-700">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-neutral-900 mb-1">
                Side-by-Side Package Trays
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Directly compare Basic, Standard, and Premium packages in person to easily choose the perfect tier for your family.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#D9D2C5]/80 shadow-xs flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center shrink-0 text-cyan-700">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-neutral-900 mb-1">
                Zero Mystery Substitutions
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                The exact samples you approve at the centre are contractually locked into your project BOQ. What you see is what we build.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Sample Explorer */}
        <div className="bg-white rounded-3xl border border-[#D9D2C5] shadow-luxury-md overflow-hidden max-w-6xl mx-auto">
          {/* Category Tabs */}
          <div className="bg-[#FAF8F5] border-b border-[#D9D2C5]/80 p-2 sm:p-3 overflow-x-auto">
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-max">
              {SAMPLE_CATEGORIES.map((cat) => {
                const CatIcon = cat.icon;
                const isActive = activeTab === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveTab(cat.id)}
                    className={`flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#183B35] text-white shadow-xs"
                        : "bg-transparent text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/50"
                    }`}
                  >
                    <CatIcon className={`w-4 h-4 ${isActive ? "text-[#F59E0B]" : "text-neutral-500"}`} />
                    <span>{cat.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Category Display Panel */}
          <div className="p-5 sm:p-7 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              {/* Left Column: Details & Sample List (7 cols) */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2.5 mb-3">
                    <span
                      className={`text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full border ${selectedSample.badgeColor}`}
                    >
                      {selectedSample.tag}
                    </span>
                    <span className="text-xs font-semibold text-[#EA580C] bg-[#FFF7F3] border border-[#FFD9C6] px-2.5 py-1 rounded-full">
                      ★ {selectedSample.highlight}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-medium text-[#183B35] leading-snug">
                    {selectedSample.title}
                  </h3>

                  <p className="mt-3 text-sm sm:text-base text-neutral-600 leading-relaxed">
                    {selectedSample.description}
                  </p>

                  {/* Sample Items Checklist */}
                  <div className="mt-6 sm:mt-8">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-800 mb-3.5">
                      Available Samples For Hands-On Inspection:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedSample.samples.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FAF8F5] border border-[#D9D2C5]/70"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#EA580C] shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-sm text-neutral-700 leading-snug font-medium">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Certified Partner Brands */}
                  <div className="mt-6 pt-5 border-t border-neutral-100 flex flex-wrap items-center gap-2">
                    <span className="text-xs text-neutral-500 font-medium">
                      On-Display Brands:
                    </span>
                    {selectedSample.brands.map((brand, bIdx) => (
                      <span
                        key={bIdx}
                        className="text-xs font-bold text-neutral-800 bg-neutral-100 border border-neutral-200 px-2.5 py-0.5 rounded-md"
                      >
                        {brand}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Visual Feature Box & Walkthrough Invitation (5 cols) */}
              <div className="lg:col-span-5">
                <div className="bg-gradient-to-br from-[#183B35] to-[#0F2622] rounded-3xl p-6 sm:p-8 text-white shadow-luxury-md relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-36 h-36 bg-[#EA580C]/20 rounded-full blur-2xl pointer-events-none" />

                  <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-5 text-[#F59E0B]">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#F59E0B] block mb-1">
                    IN-OFFICE EXPERIENCE CENTRE
                  </span>

                  <h4 className="font-display text-xl sm:text-2xl font-normal text-white leading-snug">
                    Visit Our Office For a Guided Walkthrough
                  </h4>

                  <p className="mt-2 text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    Walk through the material lab right inside our office with a <strong>Senior Civil Engineer</strong>. Review floor plans, test physical materials, and leave with an exact itemized estimate.
                  </p>

                  <div className="mt-6 space-y-2.5 text-xs text-neutral-200 border-t border-white/10 pt-5">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#F59E0B] shrink-0" />
                      <span>{siteConfig.location.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#F59E0B] shrink-0" />
                      <span>{siteConfig.contact.workingHours}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#F59E0B] shrink-0" />
                      <span>Dedicated 1-on-1 Session • Free Dedicated Parking</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row gap-2.5">
                    <Button
                      variant="primary"
                      size="sm"
                      fullWidth
                      href="/contact#book-consultation"
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                    >
                      Book Free Walkthrough
                    </Button>
                    <Button
                      variant="whatsapp"
                      size="sm"
                      fullWidth
                      href={getWhatsAppUrl(siteConfig.whatsappMessages.experienceCentre)}
                      leftIcon={<MessageCircle className="w-4 h-4" />}
                    >
                      Get Location on WhatsApp
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Assurance Banner */}
        <div className="mt-10 sm:mt-12 text-center">
          <p className="text-xs sm:text-sm text-neutral-600 max-w-2xl mx-auto">
            Can&apos;t visit in person right away? Our engineering team can also share a live video walkthrough of material samples and package mockups on WhatsApp.
          </p>
        </div>
      </Container>
    </section>
  );
}
