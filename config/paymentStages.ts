/**
 * Stage-wise Payment Schedule Configuration for The Build Company Construction
 * Chennai 2026 Milestone Schedule
 */

export interface PaymentStage {
  id: string;
  stageNumber: string;
  name: string;
  percentShare: number;
  timelineLabel: string;
  description: string;
  deliverables: string[];
}

export const PAYMENT_STAGES: PaymentStage[] = [
  {
    id: "stage_1_booking_foundation",
    stageNumber: "01",
    name: "Booking & Foundation Work",
    percentShare: 20,
    timelineLabel: "Month 1–3",
    description: "Soil testing, structural drawing approval, excavation, PCC, and column starters up to plinth level.",
    deliverables: [
      "Soil bearing capacity lab test",
      "Architectural & structural 2D/3D blueprints",
      "Excavation & anti-termite chemical barrier",
      "Plinth beam casting & earth backfilling",
    ],
  },
  {
    id: "stage_2_rcc_slabs",
    stageNumber: "02",
    name: "RCC Columns & Roof Slabs",
    percentShare: 25,
    timelineLabel: "Month 4–6",
    description: "Reinforced concrete columns, beam shuttering, steel tying, and monolithic floor/roof slab casting.",
    deliverables: [
      "High-grade Fe550D TMT reinforcement",
      "Ready-mix / machine batch M20/M25 concrete",
      "Concealed electrical conduit pipes in slabs",
      "21-day structural curing cycle",
    ],
  },
  {
    id: "stage_3_masonry_plaster",
    stageNumber: "03",
    name: "Brickwork & Plastering",
    percentShare: 20,
    timelineLabel: "Month 7–9",
    description: "External 9-inch and internal 4.5-inch brickwork, door/window frame fixing, and double-coat wall plastering.",
    deliverables: [
      "First quality red clay bricks / solid blocks",
      "RCC lintel beams and sunshades",
      "Ceiling and wall cement plastering",
      "Sunken slab polymer waterproofing",
    ],
  },
  {
    id: "stage_4_flooring_services",
    stageNumber: "04",
    name: "Flooring, Electrical & Plumbing",
    percentShare: 20,
    timelineLabel: "Month 10–13",
    description: "Vitrified tile laying, CPVC plumbing lines, concealed wiring, modular switchboards, and bathroom fittings.",
    deliverables: [
      "Living/dining & bedroom vitrified tiles",
      "Bathroom anti-skid floor & 7ft wall dado tiles",
      "Finolex/Orbit FRLS concealed wiring",
      "CP & sanitary fixture installations",
    ],
  },
  {
    id: "stage_5_finishing_handover",
    stageNumber: "05",
    name: "Painting, Snag Audit & Handover",
    percentShare: 15,
    timelineLabel: "Month 14",
    description: "Birla putty smoothing, Asian Paints emulsion, teak door polishing, deep acid cleaning, and keys handover.",
    deliverables: [
      "2 coats interior emulsion + 2 coats weatherproof exterior",
      "150-point engineering quality snag audit",
      "Post-construction deep chemical cleaning",
      "Certified Snag-Free Handover & As-Built Blueprints",
    ],
  },
];
