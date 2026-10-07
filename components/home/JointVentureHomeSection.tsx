import React from "react";
import Link from "next/link";
import { Container } from "../ui/Container";
import { Handshake, MapPin, Ruler, Building, FileCheck2, ArrowRight } from "lucide-react";

export function JointVentureHomeSection() {
  const criteria = [
    {
      icon: MapPin,
      title: "Location Assessment",
      desc: "Prime Chennai corridors including OMR, ECR, Anna Nagar, Velachery, Porur, Medavakkam, and emerging residential belts.",
    },
    {
      icon: Ruler,
      title: "Plot Feasibility & Size",
      desc: "Clear frontage, road width adequacy for CMDA/GCC sanctions, and soil/drainage characteristics.",
    },
    {
      icon: Building,
      title: "Development Potential",
      desc: "Evaluation for multi-unit residential floors, boutique apartments, or independent villa clusters.",
    },
    {
      icon: FileCheck2,
      title: "Commercial Feasibility",
      desc: "Thorough legal title verification, local market demand mapping, and transparent cost-sharing models.",
    },
  ];

  return (
    <section id="joint-venture" className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-neutral-200">
      <Container size="wide">
        <div className="bg-white rounded-3xl p-8 sm:p-12 lg:p-14 border border-neutral-200/90 shadow-luxury-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Heading and Context */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF7ED] border border-[#FFEDD5] text-xs font-bold text-[#EA580C] uppercase tracking-wider mb-4">
                <Handshake className="w-3.5 h-3.5 text-[#EA580C]" />
                <span>SECONDARY BUSINESS OFFERING</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-neutral-900 leading-[1.15]">
                Have Land With Development Potential?
              </h2>

              <p className="mt-5 text-base sm:text-lg text-neutral-600 leading-relaxed">
                TBC also evaluates suitable Joint Venture development opportunities with Chennai landowners and property holders. If you own a property with development viability, our technical and commercial team can assess plot characteristics, regulatory feasibility, and architectural potential.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/joint-venture-projects"
                  className="px-7 py-3.5 rounded-full bg-[#EA580C] text-white font-semibold text-sm hover:bg-[#C2410C] transition-colors shadow-luxury-sm inline-flex items-center gap-2 group"
                >
                  <span>Submit Property for JV Evaluation</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                <Link
                  href="/joint-venture-projects"
                  className="px-6 py-3.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-semibold text-sm transition-colors"
                >
                  Learn About Our Joint Venture Model
                </Link>
              </div>

              <p className="mt-4 text-xs text-neutral-500 italic">
                * All JV proposals are subject to project feasibility, legal due diligence, and mutually agreed commercial terms. We do not make speculative return promises.
              </p>
            </div>

            {/* Right Column: 4 Criteria Grid */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {criteria.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-[#FAF8F5] border border-neutral-200/80"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-[#EA580C]" />
                    </div>
                    <h4 className="text-sm font-bold text-neutral-900 mb-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
