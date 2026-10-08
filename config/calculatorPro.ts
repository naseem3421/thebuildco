/**
 * Configuration & Data Models for Cost Calculator PRO
 * Chennai 2026 construction market benchmarks
 */

export interface ProPackageTier {
  id: "basic" | "standard" | "premium" | "luxury";
  name: string;
  badge?: string;
  ratePerSqft: number;
  tagline: string;
  durationRange: string;
  accentColor: string;
  popular?: boolean;
  specs: {
    structure: { label: string; value: string }[];
    finishes: { label: string; value: string }[];
    fittings: { label: string; value: string }[];
  };
  whatsIncluded: string[];
}

export interface ProAddon {
  id: string;
  name: string;
  subtitle?: string;
  type: "fixed" | "per_sqft_package" | "per_litre" | "per_rft";
  rate: number;
  defaultUnit?: number;
  unitLabel?: string;
  formattedRateDisplay: string;
  addsBuiltUpArea?: number;
}

export interface ProPhaseItem {
  id: string;
  number: string;
  name: string;
  percentShare: number;
  color: string;
  monthRange: string;
  description: string;
  details: string[];
}

export interface ProMatrixRow {
  category: "PRICING" | "STRUCTURE" | "FINISHES" | "DOORS & WINDOWS" | "ELECTRICAL" | "PLUMBING & SANITARY";
  feature: string;
  basic: string | boolean;
  standard: string | boolean;
  premium: string | boolean;
  luxury: string | boolean;
}

export const PRO_PACKAGES: ProPackageTier[] = [
  {
    id: "standard",
    name: "Standard",
    badge: "Most Balanced",
    ratePerSqft: 2299,
    tagline: "High-grade materials with branded finishes for long-lasting reliability.",
    durationRange: "10 – 16 months",
    accentColor: "#16A34A", // Emerald green
    specs: {
      structure: [
        { label: "Steel", value: "ARS Steel Fe550D" },
        { label: "Cement", value: "Zuari / Chettinad 53 Grade" },
        { label: "RCC Mix", value: "M20 Mix Design" },
        { label: "Basement", value: "Upto 3 ft" },
        { label: "Ceiling Height", value: "9.5 ft standard" },
        { label: "Soil Testing", value: "Standard core sample test" },
      ],
      finishes: [
        { label: "Living/Dining Tiles", value: "₹50/sqft vitrified" },
        { label: "Bedroom Tiles", value: "Vitrified tiles (2x2)" },
        { label: "Interior Paint", value: "Asian Tractor Emulsion" },
        { label: "Exterior Paint", value: "Asian Ace Weatherproof" },
        { label: "Waterproofing", value: "Dr. Fixit 2-coat chemical" },
        { label: "3D Elevation", value: "Standard 3D elevation" },
      ],
      fittings: [
        { label: "Main Door", value: "Malaysian Teak Frame & Shutter" },
        { label: "Windows", value: "2-track UPVC with glass" },
        { label: "Staircase", value: "MS painted modern railing" },
        { label: "Electrical Wiring", value: "Orbit / Kundan FRLS" },
        { label: "Switches", value: "Anchor Roma modular" },
        { label: "CP & Sanitary", value: "Hindware / Parryware standard" },
      ],
    },
    whatsIncluded: [
      "Structural Engineering",
      "ARS Fe550D Steel",
      "2-Track UPVC Windows",
      "Malaysian Teak Door",
      "Dr. Fixit Waterproofing",
      "Asian Ace Exterior Paint",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    badge: "Most Popular",
    popular: true,
    ratePerSqft: 2649,
    tagline: "Best-value package with premium brands, 3D elevation & structural design.",
    durationRange: "10 – 18 months",
    accentColor: "#EA580C", // Vibrant Terracotta / Orange
    specs: {
      structure: [
        { label: "Steel", value: "iSteel (Premium Grade Fe550D)" },
        { label: "Cement", value: "Ramco / Dalmia 53 Grade" },
        { label: "RCC Mix", value: "M20 + Structural Design" },
        { label: "Basement", value: "Upto 4 ft" },
        { label: "Ceiling Height", value: "10 ft standard" },
        { label: "Soil Testing", value: "Comprehensive lab analysis included" },
      ],
      finishes: [
        { label: "Living/Dining Tiles", value: "₹90/sqft premium vitrified (4x2)" },
        { label: "Bedroom Tiles", value: "Vitrified tiles (4x2 GVT)" },
        { label: "Interior Paint", value: "Asian Premium Royale / Apcolite" },
        { label: "Exterior Paint", value: "Apex Emulsion Anti-Fungal" },
        { label: "Waterproofing", value: "Dr. Fixit integral & terrace waterproofing" },
        { label: "3D Elevation", value: "Architectural 3D elevation included" },
      ],
      fittings: [
        { label: "Main Door", value: "First Quality First-Grade Teak Wood" },
        { label: "Windows", value: "3-track UPVC with mosquito mesh" },
        { label: "Staircase", value: "SS / MS designer glass railing" },
        { label: "Electrical Wiring", value: "Finolex Fire-Retardant" },
        { label: "Switches", value: "Legrand / Schneider Modular" },
        { label: "CP & Sanitary", value: "Parryware Premium / Jaquar" },
      ],
    },
    whatsIncluded: [
      "Structural Engineering",
      "Soil Testing Included",
      "3D Elevation Design",
      "Legrand Switches",
      "Premium UPVC Windows",
      "First Quality Teak Door",
      "Apex Exterior Paint",
      "Finolex FRLS Wiring",
    ],
  },
  {
    id: "luxury",
    name: "Luxury",
    badge: "Top Tier",
    ratePerSqft: 2999,
    tagline: "Bespoke architectural execution with Italian marble, smart home & luxury fittings.",
    durationRange: "12 – 20 months",
    accentColor: "#7C3AED", // Royal purple
    specs: {
      structure: [
        { label: "Steel", value: "TATA Tiscon Super Ductile" },
        { label: "Cement", value: "Ultratech / Coromandel Super" },
        { label: "RCC Mix", value: "M25 High Strength Mix" },
        { label: "Basement", value: "Upto 5 ft elevated" },
        { label: "Ceiling Height", value: "10.5 ft luxury clearance" },
        { label: "Soil Testing", value: "Full geotechnical lab report" },
      ],
      finishes: [
        { label: "Living/Dining Tiles", value: "₹150/sqft Italian marble look / GVT" },
        { label: "Bedroom Tiles", value: "Premium large-format vitrified / Wooden finish" },
        { label: "Interior Paint", value: "Nerolac Royale / Asian Royale Luxury" },
        { label: "Exterior Paint", value: "Apex Ultima / Weatherproof Elastomeric" },
        { label: "Waterproofing", value: "Multi-layer crystalline waterproofing" },
        { label: "3D Elevation", value: "Full Interior + Exterior 3D walkthrough" },
      ],
      fittings: [
        { label: "Main Door", value: "Custom Handcrafted Teak with digital lock" },
        { label: "Windows", value: "Aluminium DGU / 3-track UPVC with mesh" },
        { label: "Staircase", value: "SS premium toughened glass railing" },
        { label: "Electrical Wiring", value: "Havells / KEI Fire-Proof" },
        { label: "Switches", value: "Schneider AvatarOn / Smart Modular" },
        { label: "CP & Sanitary", value: "Jaquar / Kohler Artize Collection" },
      ],
    },
    whatsIncluded: [
      "Full Geotechnical Testing",
      "TATA Tiscon SD Steel",
      "Custom Teak Digital Lock Door",
      "Schneider Smart Switches",
      "Jaquar / Kohler Fixtures",
      "Italian Format Flooring",
      "Full 3D Interior Walkthrough",
      "Provision for Smart Home",
    ],
  },
];

export const PRO_ADDONS: ProAddon[] = [
  {
    id: "headroom",
    name: "Headroom (200 sq ft)",
    subtitle: "Adds 200 sq ft to total built-up area",
    type: "per_sqft_package",
    rate: 0, // calculated from package rate * 200
    defaultUnit: 200,
    formattedRateDisplay: "200 sq ft × Package Rate",
    addsBuiltUpArea: 200,
  },
  {
    id: "waste_water_tank",
    name: "Waste Water Recycling Tank",
    subtitle: "Eco-friendly alternative to standard septic tank",
    type: "fixed",
    rate: 75000,
    formattedRateDisplay: "+₹75,000",
  },
  {
    id: "overhead_tank",
    name: "Overhead Concrete Tank (per litre)",
    subtitle: "RCC monolithic water storage tank",
    type: "per_litre",
    rate: 55,
    defaultUnit: 2000,
    unitLabel: "litres",
    formattedRateDisplay: "₹55/litre",
  },
  {
    id: "compound_wall",
    name: "Compound Wall (per rft)",
    subtitle: "Brickwork with coping and plastering",
    type: "per_rft",
    rate: 2750,
    defaultUnit: 100,
    unitLabel: "rft",
    formattedRateDisplay: "₹2,750/rft",
  },
  {
    id: "underground_sump",
    name: "Underground Sump (per litre)",
    subtitle: "Waterproof RCC drinking water sump",
    type: "per_litre",
    rate: 40,
    defaultUnit: 4000,
    unitLabel: "litres",
    formattedRateDisplay: "₹40/litre",
  },
  {
    id: "solar_panels",
    name: "Solar Panels (3kW)",
    subtitle: "On-grid rooftop solar power system with net metering",
    type: "fixed",
    rate: 150000,
    formattedRateDisplay: "+₹1,50,000",
  },
  {
    id: "main_gate",
    name: "Main Gate (MS / Sliding)",
    subtitle: "Heavy-duty fabricated entrance gate with anti-rust primer",
    type: "fixed",
    rate: 125000,
    formattedRateDisplay: "+₹1,25,000",
  },
  {
    id: "cctv_system",
    name: "CCTV & Security System",
    subtitle: "4-camera HD IP camera setup with DVR & remote phone view",
    type: "fixed",
    rate: 30000,
    formattedRateDisplay: "+₹30,000",
  },
  {
    id: "smart_home",
    name: "Smart Home Automation",
    subtitle: "Wi-Fi smart lighting, fan control & app integration",
    type: "fixed",
    rate: 20000,
    formattedRateDisplay: "+₹20,000",
  },
  {
    id: "septic_tank",
    name: "Conventional Septic Tank (per litre)",
    subtitle: "Standard residential wastewater containment",
    type: "per_litre",
    rate: 35,
    defaultUnit: 3000,
    unitLabel: "litres",
    formattedRateDisplay: "₹35/litre",
  },
  {
    id: "lift",
    name: "Lift (4 Passengers)",
    subtitle: "Machine-room-less (MRL) residential passenger elevator",
    type: "fixed",
    rate: 800000,
    formattedRateDisplay: "+₹8,00,000",
  },
];

export const PRO_PHASES: ProPhaseItem[] = [
  {
    id: "phase_1",
    number: "01",
    name: "Foundation & Excavation",
    percentShare: 20,
    color: "#EAB308", // Amber/Gold
    monthRange: "Month 1–3",
    description: "Soil testing, site levelling, excavation, PCC, anti-termite treatment, RCC footing, and column starters up to plinth level.",
    details: [
      "Soil bearing capacity testing and site marking",
      "Earthwork excavation up to hard strata",
      "PCC bedding (1:4:8 mix) and anti-termite barrier",
      "Footing steel mesh with M20/M25 concrete",
      "Plinth beam casting and earth backfilling",
    ],
  },
  {
    id: "phase_2",
    number: "02",
    name: "RCC Structure & Columns",
    percentShare: 13,
    color: "#EF4444", // Red
    monthRange: "Month 4–5",
    description: "Casting vertical columns, shuttering, beam reinforcement, electrical conduits in slab, and monolithic roof slab casting.",
    details: [
      "Reinforced concrete column fabrication",
      "Centering and shuttering with steel props",
      "High-grade Fe550D TMT beam & slab steel tying",
      "Electrical conduit pipeline laying in slab",
      "Ready-mix / machine batch slab concrete with curing",
    ],
  },
  {
    id: "phase_3",
    number: "03",
    name: "Masonry & Block Work",
    percentShare: 12,
    color: "#A855F7", // Purple
    monthRange: "Month 6–7",
    description: "External 9-inch load-distributing walls, internal 4.5-inch partition walls, lintel casting, and door frame anchoring.",
    details: [
      "First quality kiln-burnt red clay bricks or AAC blocks",
      "Cement mortar 1:5 ratio with wire-mesh rebar anchors",
      "Precast / in-situ RCC lintel beams and chajjas",
      "Teak and hardwood door frame fixing",
    ],
  },
  {
    id: "phase_4",
    number: "04",
    name: "Waterproofing & Terrace",
    percentShare: 6,
    color: "#06B6D4", // Cyan
    monthRange: "Month 8",
    description: "Sunken slab waterproofing, toilet drop packing, terrace screed concrete with weathering tiles and rainwater drain spouts.",
    details: [
      "Bathroom sunken slab double-coat polymer chemical coating",
      "Water ponding test for 72 hours",
      "Terrace brick bat coba / heat-reflective weathering tiles",
      "Parapet wall construction and rainwater harvesting piping",
    ],
  },
  {
    id: "phase_5",
    number: "05",
    name: "Flooring & Tiling",
    percentShare: 10,
    color: "#F97316", // Orange
    monthRange: "Month 9–10",
    description: "Sub-base levelling, premium vitrified tile laying, bathroom anti-skid floor and wall dado tiles, and granite staircase steps.",
    details: [
      "Sand-cement screed levelling across all living areas",
      "4x2 / 2x2 vitrified tiles with epoxy grouting",
      "Wall dado tiling up to 7–8 ft in all bathrooms",
      "Full-bullnosed granite treads on staircases",
    ],
  },
  {
    id: "phase_6",
    number: "06",
    name: "Doors & Windows",
    percentShare: 8,
    color: "#10B981", // Green
    monthRange: "Month 11",
    description: "Teak main door installation, UPVC 3-track sliding windows, internal flush doors with laminate, and SS hardware.",
    details: [
      "Seasoned teak wood main door with brass/SS hardware",
      "Custom UPVC windows with mosquito mesh",
      "Waterproof bathroom flush doors with cylindrical locks",
      "Safety MS grills with anti-rust coating",
    ],
  },
  {
    id: "phase_7",
    number: "07",
    name: "Plumbing & Sanitary",
    percentShare: 7,
    color: "#3B82F6", // Blue
    monthRange: "Month 12",
    description: "Concealed CPVC hot/cold lines, PVC drainage stacks, septic tank connection, and branded CP/sanitary fixture mounting.",
    details: [
      "Ashirvad / Supreme CPVC internal water supply pipelines",
      "SWR PVC drainage & sewage pipeline network",
      "Parryware / Jaquar wall-hung closets and health faucets",
      "Overhead tank & underground sump connection plumbing",
    ],
  },
  {
    id: "phase_8",
    number: "08",
    name: "Electrical & Wiring",
    percentShare: 7,
    color: "#FBBF24", // Yellow
    monthRange: "Month 13",
    description: "Finolex FRLS wire pulling, modular switch plate installation, MCB distribution board, earthing pits, and inverter wiring.",
    details: [
      "FRLS multi-strand copper wire pulling through conduits",
      "Legrand / Schneider modular switchboard fitting",
      "Double earthing pit with chemical compound rods",
      "AC, geyser, EV charging and inverter ready circuits",
    ],
  },
  {
    id: "phase_9",
    number: "09",
    name: "Painting & Finishing",
    percentShare: 8,
    color: "#EC4899", // Pink
    monthRange: "Month 14",
    description: "2 coats of Birla wall putty, primer, Asian Paints premium emulsion interior, and weatherproof Apex exterior coating.",
    details: [
      "Wall putty smoothing and fine sanding",
      "1 coat interior acrylic primer + 2 coats premium emulsion",
      "2 coats exterior weatherproof anti-fungal paint",
      "Wood polish on teak main door and melamine finish",
    ],
  },
  {
    id: "phase_10",
    number: "10",
    name: "Miscellaneous & Overheads",
    percentShare: 9,
    color: "#64748B", // Slate
    monthRange: "Month 15",
    description: "Site cleanup, debris removal, post-construction chemical deep cleaning, civil inspection, and handover documentation.",
    details: [
      "Comprehensive 150-point engineering inspection checklist",
      "Debris disposal and site boundary cleaning",
      "Deep acid cleaning of floors and window glass",
      "Keys handover with 5-Year Structural Warranty certificate",
    ],
  },
];

export const PRO_COMPARISON_MATRIX: ProMatrixRow[] = [
  // PRICING
  { category: "PRICING", feature: "Rate / sqft", basic: "₹1,999", standard: "₹2,299", premium: "₹2,649", luxury: "₹2,999" },
  { category: "PRICING", feature: "Duration", basic: "~14 months", standard: "~16 months", premium: "~16 months", luxury: "~18 months" },

  // STRUCTURE
  { category: "STRUCTURE", feature: "Steel Brand", basic: "Any ISI Brand", standard: "ARS Steel", premium: "iSteel Fe550D", luxury: "TATA Tiscon" },
  { category: "STRUCTURE", feature: "Cement Brand", basic: "Zuari / Chettinad", standard: "Zuari / Chettinad", premium: "Ramco / Dalmia", luxury: "Ultratech" },
  { category: "STRUCTURE", feature: "RCC Mix Grade", basic: "M20", standard: "M20", premium: "M20", luxury: "M25" },
  { category: "STRUCTURE", feature: "Basement Depth", basic: "Upto 3 ft", standard: "Upto 3 ft", premium: "Upto 4 ft", luxury: "Upto 5 ft" },
  { category: "STRUCTURE", feature: "Ceiling Height", basic: "9.5 ft", standard: "9.5 ft", premium: "10 ft", luxury: "10 ft" },
  { category: "STRUCTURE", feature: "Structural Design", basic: false, standard: false, premium: true, luxury: true },
  { category: "STRUCTURE", feature: "Soil Testing", basic: false, standard: false, premium: true, luxury: true },
  { category: "STRUCTURE", feature: "Anti-Termite", basic: false, standard: false, premium: false, luxury: true },

  // FINISHES
  { category: "FINISHES", feature: "Living/Dining Tiles", basic: "₹50/sqft", standard: "₹50/sqft", premium: "₹90/sqft", luxury: "₹150/sqft" },
  { category: "FINISHES", feature: "Bedroom Tiles", basic: "Ceramic basic", standard: "Ceramic", premium: "Vitrified", luxury: "Premium Vitrified" },
  { category: "FINISHES", feature: "Interior Paint", basic: "Asian Tractor", standard: "Asian Tractor", premium: "Asian Premium", luxury: "Nerolac Royale" },
  { category: "FINISHES", feature: "Exterior Paint", basic: "White Cement", standard: "Asian Ace", premium: "Apex Emulsion", luxury: "Premium Waterproof" },
  { category: "FINISHES", feature: "Waterproofing", basic: false, standard: true, premium: true, luxury: true },
  { category: "FINISHES", feature: "3D Design", basic: false, standard: false, premium: "3D Elevation", luxury: "Full Interior 3D" },

  // DOORS & WINDOWS
  { category: "DOORS & WINDOWS", feature: "Main Door", basic: "Basic Flush", standard: "Malaysian Teak", premium: "First Quality Teak", luxury: "Custom Teak Design" },
  { category: "DOORS & WINDOWS", feature: "Windows", basic: "MS Grills", standard: "2-track UPVC", premium: "3-track UPVC + Mesh", luxury: "Aluminium + Mesh" },
  { category: "DOORS & WINDOWS", feature: "Staircase", basic: "MS basic", standard: "MS painted", premium: "SS / MS designer", luxury: "SS premium design" },

  // ELECTRICAL
  { category: "ELECTRICAL", feature: "Wiring Brand", basic: "Orbit", standard: "Orbit", premium: "Finolex", luxury: "Havells / KEI" },
  { category: "ELECTRICAL", feature: "Switches", basic: "Anchor Roma", standard: "Anchor Roma", premium: "Legrand", luxury: "Schneider / Modular" },
  { category: "ELECTRICAL", feature: "Home Automation", basic: false, standard: false, premium: false, luxury: "Provision for Smart" },

  // PLUMBING & SANITARY
  { category: "PLUMBING & SANITARY", feature: "CP Fittings", basic: "Basic chrome", standard: "Hindware", premium: "Parryware", luxury: "Jaquar / Kohler" },
  { category: "PLUMBING & SANITARY", feature: "Sanitary Ware", basic: "Parryware Basic", standard: "Parryware", premium: "Parryware Premium", luxury: "Jaquar / Kohler" },
  { category: "PLUMBING & SANITARY", feature: "Rain Shower", basic: false, standard: false, premium: true, luxury: true },
];

export const PRO_FAQS = [
  {
    question: "How much does it cost to build a house in Chennai in 2026?",
    answer:
      "House construction in Chennai in 2026 typically costs between ₹2,199/sqft (Standard package) and ₹2,599/sqft (Premium finish). For an average 2,400 sqft G+1 independent house, the turnkey civil construction budget ranges from ₹52.8 Lakhs to ₹62.4 Lakhs, depending on soil type, foundation depth, and material specifications.",
  },
  {
    question: "What is the construction cost per sq.ft in Chennai in 2026?",
    answer:
      "The baseline unit rate in Chennai starts at ₹2,199/sqft for standard RCC framed structures with branded materials. The most popular Premium package is ₹2,599/sqft (with branded Ramco/Dalmia cement, iSteel, teak doors, and Legrand switches), with bespoke luxury options available.",
  },
  {
    question: "What is the cost of a G+1 house in Chennai?",
    answer:
      "For a typical plot size of 1,200 sqft with a 1,000 sqft built-up area per floor (total 2,000 sqft built-up area across G+1), the construction cost ranges from ₹44 Lakhs (Standard) to ₹52 Lakhs (Premium), with the ground floor carrying approximately 20% foundation and plinth share.",
  },
  {
    question: "Does the calculator include plan approval and government charges?",
    answer:
      "No. Government statutory fees (CMDA / GCC building permit approval fees, regularisation charges), electricity board (TANGEDCO) connection fees, and water/sewerage (CMWSSB) road-cut charges are statutory direct-to-government payments and are not included in the construction base estimate.",
  },
  {
    question: "How long does house construction take in Chennai?",
    answer:
      "An individual ground-floor home takes roughly 10–12 months. A G+1 duplex typically requires 12–14 months. Each additional floor adds approximately 3–4 months to allow for structural concrete curing (21-day slab curing cycle), brickwork setting, and multi-stage plastering.",
  },
  {
    question: "What is the difference between Standard and Premium packages?",
    answer:
      "The Standard package (₹2,199/sqft) provides high-grade materials with vitrified flooring, UPVC windows, and branded finishes. The Premium package (₹2,599/sqft) upgrades to iSteel Fe550D reinforcement, Ramco/Dalmia 53-grade cement, 10 ft ceiling height, 4x2 GVT vitrified tiles, first-grade teak wood main doors, 3-track UPVC windows with mosquito mesh, and Legrand modular switches.",
  },
  {
    question: "Can TBC construct my house after using this calculator?",
    answer:
      "Yes! TBC (The Build Company) builds bespoke turnkey houses directly on your plot across all Chennai zones (OMR, ECR, Medavakkam, Velachery, Tambaram, Porur, Anna Nagar, etc.). You can book a free on-site engineering survey to convert this estimate into a contract-locked BOQ with zero mid-project price escalations.",
  },
];
