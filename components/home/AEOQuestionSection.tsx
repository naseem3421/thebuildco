import React from "react";
import Link from "next/link";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { HelpCircle, ArrowRight } from "lucide-react";

export const homepageAeoQuestions = [
  {
    q: "How much does it cost to build a house in Chennai?",
    a: "In Chennai, turnkey residential construction generally costs between ₹1,899 and ₹2,899+ per sqft. For a standard 2,000 to 3,500 sqft residence, total project cost ranges from ₹45 Lakhs to ₹1 Crore for basic framing up to ₹1 Crore to ₹3 Crore for premium individual houses and luxury villas with high-spec interior finishes.",
  },
    {
      q: "What is the construction cost per square foot in Chennai?",
      a: "Typical construction costs per sqft in Chennai vary by specification tier: Basic/Standard construction starts around ₹1,899/sqft, Premium residential homes average ₹2,199 to ₹2,499/sqft, and Luxury bespoke villas with imported marble, high-end fenestrations, and home automation range between ₹2,699 and ₹3,200+/sqft.",
    },
    {
      q: "How much does it cost to build a 2,000 sqft house in Chennai?",
      a: "Constructing a 2,000 sqft house in Chennai typically requires an investment of ₹38 Lakhs to ₹58 Lakhs depending on the chosen finish tier. A standard specification package averages approximately ₹38–44 Lakhs, while a premium turnkey finish with branded teak doors, vitrified flooring, and modular plumbing averages ₹45–55 Lakhs.",
    },
    {
      q: "How much does it cost to build a 3,000 sqft house in Chennai?",
      a: "A 3,000 sqft duplex or independent house in Chennai typically costs between ₹65 Lakhs and ₹95 Lakhs for standard-to-premium specifications. If opting for luxury architectural finishes, Italian marble flooring, and smart home automation, the project investment ranges from ₹85 Lakhs to ₹1.10 Crores.",
    },
    {
      q: "How long does it take to construct a house in Chennai?",
      a: "On average, turnkey construction of a 2,500 to 3,500 sqft house in Chennai takes 8 to 12 months. Timelines depend on the number of floors, soil foundation requirements, monsoon curing intervals, and the speed of municipal drawing sanctions.",
    },
    {
      q: "What is included in turnkey construction?",
      a: "Turnkey residential construction covers end-to-end delivery: architectural design, structural engineering, soil testing, liaison for approvals, material procurement, civil framing, brickwork, waterproofing, electrical, plumbing, painting, flooring, and final handover with warranties under a single accountable contract.",
    },
    {
      q: "How do stage-wise construction payments work?",
      a: "Payments are split into 7 to 8 transparent milestone tranches linked directly to verified physical progress — such as plinth beam completion, ground floor slab casting, first floor slab casting, brickwork, plastering, and finishing — rather than arbitrary calendar advances.",
    },
    {
      q: "Should I hire an architect and contractor separately?",
      a: "Hiring an architect and contractor separately frequently leads to coordination friction, blame-shifting during site snags, and unexpected budget escalation. A turnkey construction partner provides single-source accountability, ensuring architectural concepts are engineered directly within your committed budget.",
    },
    {
      q: "What should I check before starting house construction?",
      a: "Key pre-construction checks include: clear title legal verification, patta and encumbrance certificate (EC), soil bearing capacity (SBC) testing, CMDA or Greater Chennai Corporation (GCC) building setback guidelines, groundwater quality, and access road width for concrete transit mixers.",
    },
    {
      q: "How do I choose a construction company in Chennai?",
      a: "Evaluate construction partners on five criteria: experience building on client-owned land, willingness to provide itemized BOQ specifications with named brands, transparent stage-wise payment schedules, verifiable past client testimonials, and written structural warranties.",
    },
    {
      q: "Does TBC build only on client-owned land?",
      a: "Yes. TBC — The Build Company operates strictly as a turnkey design and civil construction company for landowners. We build custom individual residences, villas, and duplex homes exclusively on land already owned by the client. We do not sell plots or broker land.",
    },
    {
      q: "Does TBC handle architectural and structural planning?",
      a: "Yes. TBC has in-house architectural and chartered structural engineering teams. We prepare custom 2D floor layouts, photorealistic 3D elevations, structural analysis blueprints, Vastu consultations, and electrical/plumbing drawings for every project.",
    },
    {
      q: "Does TBC handle approvals?",
      a: "Yes. TBC assists clients with statutory building plan sanctions through CMDA, Greater Chennai Corporation (GCC), or local town panchayats, ensuring setbacks, FSI calculations, and structural safety parameters meet local municipal norms.",
    },
    {
      q: "What warranty does TBC provide?",
      a: "TBC provides a written 5-Year Structural Warranty covering the RCC foundation, columns, beams, and roof slabs, along with comprehensive 1-year seepage and MEP maintenance support post key handover.",
    },
    {
      q: "Does TBC undertake Joint Venture projects?",
      a: "Yes. TBC selectively partners with Chennai property owners and landowners on Joint Venture (JV) residential developments. Suitability is evaluated based on plot frontage, road width, neighborhood market demand, and commercial feasibility.",
    },
    {
      q: "How can I submit my property for a Joint Venture proposal?",
      a: "You can submit your property details directly through our dedicated Joint Venture page or consultation form. Our civil and real-estate feasibility team will review plot dimensions, zoning guidelines, and reach out for an on-site feasibility evaluation.",
    },
  ];

export function AEOQuestionSection() {
  return (
    <section id="aeo-answers" className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-neutral-200">
      <Container size="wide">
        <SectionHeading
          eyebrow="KNOWLEDGE BASE & AI CLARITY"
          title="Questions Chennai Landowners Ask Before Building"
          subtitle="Direct, factual answers on residential construction costs, engineering processes, timelines, and joint ventures in Chennai."
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {homepageAeoQuestions.map((item, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-3xl bg-white border border-neutral-200/90 shadow-xs hover:border-[#EA580C]/40 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-[#FFF7ED] flex items-center justify-center shrink-0 mt-0.5 text-[#EA580C]">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-neutral-900 leading-snug">
                    {item.q}
                  </h3>
                </div>

                <p className="mt-3 text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {item.a}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-400">
                <span>Question 0{idx + 1}</span>
                <a
                  href="#consultation"
                  className="text-xs font-semibold text-[#EA580C] hover:text-[#C2410C] inline-flex items-center gap-1"
                >
                  <span>Discuss This Question</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
