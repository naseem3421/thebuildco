/**
 * Central Business Configuration for TBC — The Build Company
 * All business details, contact info, pricing, packages, process, projects, and conversion parameters are centralized here.
 */

export interface PackageTier {
  id: string;
  name: string;
  pricePerSqft: number;
  formattedPrice: string;
  tagline: string;
  popular?: boolean;
  features: string[];
}

export interface SpecificationCategory {
  category: string;
  basic: string;
  standard: string;
  premium: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  iconName: string;
  imageUrl: string;
  sqftRange?: string;
}

export interface TrustMetricItem {
  value: string;
  label: string;
  subtext?: string;
  highlight?: boolean;
}

export interface HeaderNavSubItem {
  label: string;
  description?: string;
  href: string;
  badge?: string;
}

export interface HeaderNavItem {
  label: string;
  href: string;
  isBadge?: boolean;
  badgeText?: string;
  children?: HeaderNavSubItem[];
}

export interface NavItem {
  label: string;
  href: string;
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  location: string;
  type: string;
  area: string;
  packageUsed: string;
  duration: string;
  imageUrl: string;
  gallery: string[];
  tag: string;
  description: string;
  keySpecs: string[];
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  details?: string[];
}

export interface WhyTBCItem {
  title: string;
  description: string;
  iconName: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  location: string;
  projectType: string;
  verified?: boolean;
  highlight?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export interface FloorMultiplier {
  floors: number;
  label: string;
  multiplier: number;
}

export const siteConfig = {
  name: "TBC — The Build Company",
  shortName: "TBC",
  tagline: "Build Better. Build With Confidence.",
  heroTitle: "Build Your Dream Home in Chennai",
  heroSubtitle:
    "Already own the land? We build your home with transparent sqft pricing, professional supervision and a clear construction process.",
  description:
    "Chennai's trusted bespoke construction partner. We construct premium individual houses, luxury villas, duplex homes, and commercial spaces directly on your own land.",
  modelNotice: "We build exclusively on customer-owned land across Chennai & Tamil Nadu. TBC does not sell land.",

  location: {
    city: "Chennai",
    state: "Tamil Nadu",
    country: "India",
    address: "Anna Nagar / OMR, Chennai, Tamil Nadu, India",
  },

  contact: {
    phone: "+91 98400 12345",
    phoneDisplay: "+91 98400 12345",
    phoneHref: "tel:+919840012345",
    whatsappNumber: "919840012345",
    whatsappHref:
      "https://wa.me/919840012345?text=Hi%20TBC%2C%20I%20already%20own%20a%20plot%20in%20Chennai%20and%20I%27m%20looking%20for%20construction%20services.%20I%20would%20like%20to%20know%20the%20approximate%20construction%20cost%20and%20process.",
    email: "enquiry@thebuildcompany.in",
    workingHours: "Mon - Sat: 9:00 AM - 7:00 PM",
  },

  whatsappMessages: {
    default:
      "Hi TBC, I already own a plot in Chennai and I'm looking for construction services. I would like to know the approximate construction cost and process.",
    hero:
      "Hi TBC, I would like to get a construction quote for my property.",
    siteVisit:
      "Hi TBC, I own land in Chennai and would like to schedule a free site visit & architectural consultation.",
    calculator: (area: number | string, location: string, estimate?: string) =>
      `Hi TBC, I used your construction cost calculator. My estimated project size is ${area} sqft in ${location}${
        estimate ? ` (Approx: ${estimate})` : ""
      }. I would like to discuss the construction cost.`,
    packageInquiry: (packageName: string, rate: string) =>
      `Hi TBC, I am interested in your ${packageName} package (${rate}). Please share detailed specifications.`,
  },

  pricing: {
    startingPrice: "₹1,899",
    startingPriceUnit: "/sqft",
    formattedStartingPrice: "₹1,899/sqft",
  },

  experience: "15+ Years",
  projectsCompleted: "50+ Projects",
  warranty: "5-Year Construction Warranty",
  paymentStructure: "Stage-wise Payments (Milestone based)",

  calculatorConfig: {
    floorMultipliers: [
      { floors: 1, label: "Ground Only (1 Floor)", multiplier: 1.0 },
      { floors: 2, label: "G+1 (2 Floors)", multiplier: 1.0 },
      { floors: 3, label: "G+2 (3 Floors)", multiplier: 1.02 },
      { floors: 4, label: "G+3 (4 Floors)", multiplier: 1.05 },
    ] as FloorMultiplier[],
    variancePercentage: 0.05, // ±5% lower/upper bounds
    defaultArea: 2400,
    minArea: 600,
    maxArea: 10000,
    stepArea: 50,
    defaultPackageId: "standard",
    defaultFloors: 2,
    disclaimer:
      "This is an indicative estimate. Final pricing depends on design, specifications, site conditions and project requirements.",
  },

  costFactors: [
    {
      title: "Built-up Area (Sq.Ft)",
      description: "Larger footprint projects offer economies of scale, while smaller compact footprints have higher per-sqft service distribution costs.",
    },
    {
      title: "Number of Floors",
      description: "Multi-story buildings require enhanced foundation engineering, heavier crane lifting, and stronger RCC beam reinforcement.",
    },
    {
      title: "Design & Architectural Complexity",
      description: "Cantilevered balconies, double-height ceilings, and curved facade features require specialized formwork and engineering detailing.",
    },
    {
      title: "Material Specifications",
      description: "Choice of flooring (Vitrified vs. Italian Marble), joinery (Teak vs. UPVC), and sanitary fittings directly governs total interior investment.",
    },
    {
      title: "Site Soil & Ground Conditions",
      description: "Soil conditions (clay, coastal sand in ECR, or rocky strata) determine the depth of foundation, pile driving, or raft footing requirements.",
    },
    {
      title: "Location Access & Logistical Feasibility",
      description: "Plots situated along narrow streets require smaller transit trucks for ready-mix concrete and staging material supplies.",
    },
  ],

  packages: [
    {
      id: "basic",
      name: "Basic",
      pricePerSqft: 1899,
      formattedPrice: "₹1,899/sqft",
      tagline: "High standard essentials for solid, budget-conscious construction.",
      features: [
        "Standard Structural Design (Fe 550 Steel & Grade 53/43 Cement)",
        "Premium Red Bricks / Solid Concrete Blocks",
        "Vitrified Tiles (2x2 ft premium flooring)",
        "Standard Teak Wood Main Door & Flush Internal Doors",
        "UPVC Windows with Bug Mesh",
        "Stage-wise Milestone Quality Audits",
        "5-Year Structural Warranty",
      ],
    },
    {
      id: "standard",
      name: "Standard",
      pricePerSqft: 2199,
      formattedPrice: "₹2,199/sqft",
      tagline: "Our most popular package balancing premium finishes & durability.",
      popular: true,
      features: [
        "Enhanced Seismic Resilient RCC Frame Structure",
        "Large Format Glazed Vitrified Tiles (4x2 ft flooring)",
        "First Quality Teak Main Door & Engineered Doors",
        "Branded Sanitary & CP Fittings (Kohler / Jaquar)",
        "Concealed Copper Wiring with Modular Switches (Havells/Legrand)",
        "Dedicated Site Supervisor & 3D Elevation Renderings",
        "5-Year Comprehensive Warranty",
      ],
    },
    {
      id: "premium",
      name: "Premium",
      pricePerSqft: 2599,
      formattedPrice: "₹2,599/sqft",
      tagline: "Luxury architectural craftsmanship with turnkey luxury specifications.",
      features: [
        "Architectural Layout & Bespoke Structural Engineering",
        "Italian Marble / Premium Large Porcelain Slab Flooring",
        "Full Teakwood Joinery & Heavy Acoustic Aluminium/UPVC Glazing",
        "Luxury Sanitary & Concealed Diverter Systems (Grohe / Kohler)",
        "Smart Home Automation Prep & False Ceiling with Ambient Lighting",
        "Weekly Milestone Video Reports & Executive Site Architect",
        "5-Year Full Warranty + Lifetime Structural Assurance",
      ],
    },
  ] as PackageTier[],

  packageComparisonMatrix: [
    {
      category: "Structure & RCC",
      basic: "Fe 550 Steel (Tata/Jindal), Coromandel / Dalmia Grade 53 Cement, M20 Grade Concrete",
      standard: "Fe 550D Seismic Resilient Steel, Grade 53 Ultratech/Coromandel, M25 Design Mix Concrete with Waterproofing",
      premium: "Fe 550D Corrosion Resistant Steel, Ultratech Super Grade 53, M25/M30 Design Mix with Crystalline Admixtures",
    },
    {
      category: "Flooring",
      basic: "2x2 ft Double Charged Vitrified Tiles (₹55/sqft budget)",
      standard: "4x2 ft Glazed Vitrified Tiles (₹90/sqft budget) / Wooden Laminate in Master Bedroom",
      premium: "Italian Marble / Large Porcelain Slabs (₹220/sqft budget) + Solid Engineered Hardwood",
    },
    {
      category: "Main & Internal Doors",
      basic: "Standard Teak Wood Main Frame & Shutter; Flush Internal Doors with Enamel Paint",
      standard: "First-Quality Teak Main Door with Brass Hardware; Molded Veneer Internal Doors",
      premium: "Handcrafted 8-Foot Teak Main Door with Biometric Smart Lock; Full Flush Teak Veneer Doors",
    },
    {
      category: "Windows & Glazing",
      basic: "Standard 2-Track UPVC Sliding Windows with Bug Mesh (Fenesta/Kommerling profile)",
      standard: "Heavy 3-Track UPVC / Thermal Break Aluminum Windows with Toughened Glass",
      premium: "Acoustic Double-Glazed Argon-Filled European Slimline Aluminum Glass Systems",
    },
    {
      category: "Electrical & Smart Prep",
      basic: "Finolex / Anchor Concealed Copper Wiring; Anchor Roma Modular Switches",
      standard: "Havells / Polycab FRLS Fire-Resistant Wiring; Legrand Arteor / Schneider Modular Switches",
      premium: "Complete Smart Automation Conduit Prep, Legrand / Lutron Switches, EV Charging Provision in Garage",
    },
    {
      category: "Plumbing & Drainage",
      basic: "Ashirvad / Supreme CPVC & PVC Concealed Pipes, Standard Overhead Tank (1,000L)",
      standard: "Ashirvad FlowGuard CPVC Pipes, Dual Water Supply (Ground/Corporation), 2,000L Overhead Tank",
      premium: "Pressurized Water System, Soundproof Soil Waste Drainage Pipes, Automated Water Level Sensors",
    },
    {
      category: "Kitchen",
      basic: "Polished Black Granite Countertop (20mm), SS Sink (Nirali), 2ft Dado Tiles",
      standard: "Premium Quartz / Granite Countertop, Double Bowl SS Sink with Pull-out Faucet, 4ft Dado Tiles",
      premium: "Designer Quartz Countertop, Island Counter Provision, Franke/Grohe Granite Composite Sink",
    },
    {
      category: "Bathrooms & Sanitary",
      basic: "Parryware / Hindware EWC & Wash Basins, Standard Wall Mixer",
      standard: "Jaquar / Kohler Wall-Hung EWC with Concealed Cistern, Single Lever Diverter",
      premium: "Grohe / Kohler Digital Thermostatic Diverters, Frameless Toughened Glass Shower Partitions",
    },
    {
      category: "Painting & Finishes",
      basic: "2 Coats Asian Paints Tractor Emulsion (Interior), Ace Exterior Finish",
      standard: "2 Coats Asian Paints Royale Luxury Emulsion (Interior), Apex WeatherProof Exterior",
      premium: "Asian Paints Royale Aspira (Interior) with Wall Textures, Apex Ultima Protek with 10-Yr Guarantee",
    },
    {
      category: "Architectural & Elevation",
      basic: "2D Functional Floor Plans, Standard 3D Elevation Rendering",
      standard: "Bespoke 3D Elevation with Louver / CNC Detailing, Structural Drawings, Vastu Alignment",
      premium: "Full Architectural Package: 3D Walkthrough Video, Landscape Layout, Lighting & False Ceiling Plans",
    },
    {
      category: "Project Supervision",
      basic: "Weekly Site Civil Engineer Audits, Stage Milestone Verification",
      standard: "Full-Time Dedicated Site Supervisor, Weekly Video Reports on WhatsApp, Lab Cube Tests",
      premium: "Dedicated Senior Project Architect, Daily Digital Logbook, Third-Party Structural Quality Audit",
    },
    {
      category: "Warranty & Support",
      basic: "5-Year Structural Warranty",
      standard: "5-Year Comprehensive Structural & Waterproofing Warranty + 1-Year Free Maintenance",
      premium: "5-Year Full Turnkey Warranty + 10-Year Structural Assurance + Lifetime Civil Advisory",
    },
  ] as SpecificationCategory[],

  services: [
    {
      id: "individual-houses",
      title: "Individual Houses",
      shortDesc: "Custom-designed single and multi-level family residences built to your lifestyle needs.",
      iconName: "Home",
      imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      sqftRange: "1,500 – 4,000 sqft",
    },
    {
      id: "villas",
      title: "Villas",
      shortDesc: "Architecturally distinctive luxury villas with expansive layouts, double heights and bespoke detailing.",
      iconName: "Building",
      imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
      sqftRange: "3,000 – 7,500 sqft",
    },
    {
      id: "duplex-homes",
      title: "Duplex Homes",
      shortDesc: "Contemporary two-story homes designed for smart spatial efficiency and abundant natural daylight.",
      iconName: "Layers",
      imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
      sqftRange: "2,000 – 4,500 sqft",
    },
    {
      id: "commercial-buildings",
      title: "Commercial Buildings",
      shortDesc: "High-yield commercial spaces, boutique retail hubs, and offices engineered for structural longevity.",
      iconName: "Briefcase",
      imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
      sqftRange: "3,000 – 15,000 sqft",
    },
    {
      id: "renovation",
      title: "Renovation",
      shortDesc: "Structural remodeling, floor additions, and turnkey luxury modernization for existing Chennai homes.",
      iconName: "Hammer",
      imageUrl: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
      sqftRange: "1,000 – 5,000 sqft",
    },
  ] as ServiceItem[],

  trustMetrics: [
    {
      value: "15+",
      label: "Years Experience",
      subtext: "Proven engineering excellence",
      highlight: false,
    },
    {
      value: "50+",
      label: "Projects Completed",
      subtext: "Across prime Chennai zones",
      highlight: false,
    },
    {
      value: "₹1,899+",
      label: "Starting / sqft",
      subtext: "Transparent upfront pricing",
      highlight: true,
    },
    {
      value: "5-Year",
      label: "Warranty",
      subtext: "Structural peace of mind",
      highlight: false,
    },
  ] as TrustMetricItem[],

  processSteps: [
    {
      step: "01",
      title: "Consultation",
      description: "Discuss your lifestyle needs, plot dimensions, and initial budget expectations with our chief architect.",
      details: ["Plot dimension check", "Budget calibration", "Initial conceptual layout review"],
    },
    {
      step: "02",
      title: "Site Visit",
      description: "Our civil engineers inspect your plot in Chennai, conduct soil assessment, and verify road access.",
      details: ["Soil load bearing check", "Road access verification", "Ground water level survey"],
    },
    {
      step: "03",
      title: "Design & Planning",
      description: "We create functional 2D floor plans, 3D architectural elevations, and Vastu-compliant layouts.",
      details: ["2D architectural floor plans", "3D photo-realistic elevation render", "Vastu-compliant spatial optimization"],
    },
    {
      step: "04",
      title: "Detailed Estimate",
      description: "Receive a comprehensive, itemized BOQ with locked-in sqft pricing and zero hidden clauses.",
      details: ["Itemized bill of quantities (BOQ)", "Brand & grade specifications sheet", "Locked milestone pricing"],
    },
    {
      step: "05",
      title: "Agreement",
      description: "Sign a clear, legally bound contract with well-defined stage-wise milestones and completion timeline.",
      details: ["Clear milestone schedule", "Legally binding handover timeline", "Material warranty guarantees"],
    },
    {
      step: "06",
      title: "Construction",
      description: "Site execution begins with Grade-A materials, dedicated site supervisors, and weekly video updates.",
      details: ["RCC foundation & super structure", "Full-time on-site civil supervisor", "Weekly video updates on WhatsApp"],
    },
    {
      step: "07",
      title: "Quality Checks",
      description: "150+ point structural and civil inspections executed at every milestone before payments are claimed.",
      details: ["Concrete cube compressive strength tests", "Slump & curing audits", "Plumbing pressure & electrical insulation audits"],
    },
    {
      step: "08",
      title: "Handover",
      description: "Welcome to your new home with final deep cleaning, keys handover, and 5-year structural warranty certificate.",
      details: ["Deep cleaning & final snag audit", "Key handover ceremony", "5-Year Structural Warranty Certificate"],
    },
  ] as ProcessStep[],

  projects: [
    {
      id: "greenfield-residence",
      slug: "greenfield-residence",
      title: "Greenfield Residence",
      location: "Medavakkam, Chennai",
      type: "Individual House",
      area: "2,850 sqft",
      packageUsed: "Standard Package (₹2,199/sqft)",
      duration: "9.5 Months",
      tag: "Completed",
      imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
      ],
      description:
        "A contemporary 4BHK individual residence designed for multi-generational living on a 30x40 ft plot in Medavakkam. Features double-height living areas, cross-ventilation corridors, and an exterior teak louver facade.",
      keySpecs: [
        "Fe 550D Seismic Resilient RCC Frame Structure",
        "4x2 ft Glazed Vitrified Tile Flooring throughout",
        "First Quality Teak Wood Joinery & UPVC Thermal Glazing",
        "Kohler Concealed Sanitary Fittings & Havells Modular Systems",
      ],
    },
    {
      id: "palm-grove-villa",
      slug: "palm-grove-villa",
      title: "Palm Grove Villa",
      location: "Sholinganallur, Chennai",
      type: "Villas",
      area: "4,200 sqft",
      packageUsed: "Premium Package (₹2,599/sqft)",
      duration: "11 Months",
      tag: "Completed",
      imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      ],
      description:
        "A luxury modern villa in Sholinganallur featuring floor-to-ceiling acoustic glass, Italian marble flooring in entertaining zones, and an expansive terrace garden with cantilevered pergolas.",
      keySpecs: [
        "Italian Marble & Large Porcelain Slabs in Living & Dining",
        "8-Foot Solid Teak Main Door with Smart Keyless Entry",
        "Grohe Concealed Thermostatic Shower Diverters",
        "Complete Smart Automation Conduit Prep & EV Charging Port",
      ],
    },
    {
      id: "lakeview-residence",
      slug: "lakeview-residence",
      title: "Lakeview Residence",
      location: "Tambaram, Chennai",
      type: "Duplex",
      area: "3,100 sqft",
      packageUsed: "Standard Package (₹2,199/sqft)",
      duration: "10 Months",
      tag: "Completed",
      imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
      ],
      description:
        "An urban duplex residence engineered for natural light and spatial efficiency near the Tambaram lake catchment zone. Designed with a cantilevered portico and bespoke internal floating wooden staircase.",
      keySpecs: [
        "M25 Concrete with Integral Crystalline Waterproofing",
        "UPVC Acoustic Glass Windows with Stainless Steel Bug Mesh",
        "Jaquar Premium Sanitary & Diverter Assemblies",
        "Royale Luxury Emulsion Interiors with Decorative Wall Treatments",
      ],
    },
    {
      id: "urban-edge",
      slug: "urban-edge",
      title: "Urban Edge",
      location: "OMR, Chennai",
      type: "Individual Houses",
      area: "3,650 sqft",
      packageUsed: "Standard Package (₹2,199/sqft)",
      duration: "10.5 Months",
      tag: "Completed",
      imageUrl: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      ],
      description:
        "A sleek minimalist 4-bedroom home situated in the OMR tech corridor. Features an integrated home office suite, private landscaped courtyard, and energy-efficient solar conduit infrastructure.",
      keySpecs: [
        "Solar Panel Roof Conduits & Heat Reflective Tile Insulation",
        "Full Teak Veneer Doors & Concealed Copper Wiring",
        "Quartz Stone Kitchen Countertops with Franke Stainless Sink",
        "5-Year Full Structural and Waterproofing Assurance",
      ],
    },
  ] as ProjectItem[],

  aboutStory: {
    hero: "Engineering Chennai's finest homes on customer-owned plots with unwavering integrity and architectural precision.",
    paragraphs: [
      "Founded with the conviction that home construction should be transparent, stress-free, and architecturally inspiring, TBC (The Build Company) has grown into one of Chennai's most trusted turnkey construction firms.",
      "We operate under a simple, unambiguous model: you own the land; we engineer and construct your home. We do not sell plots or broker real estate. This single-minded focus allows our civil engineers, architects, and site supervisors to devote 100% of their expertise to structural excellence, material purity, and timely handover.",
    ],
    values: [
      {
        title: "Transparent Fixed Costing",
        description: "Zero surprise escalations. Every single material brand, tile thickness, and electrical gauge is specified in an enforceable contract.",
      },
      {
        title: "Milestone-Linked Escrow",
        description: "You only release payments when physical work is completed, verified on-site by you, and audited by our engineers.",
      },
      {
        title: "Civil Engineering Rigor",
        description: "We don't cut corners on structural concrete mix ratios, curing periods, or rebar spacing. Every floor slab undergoes lab testing.",
      },
      {
        title: "Turnkey Accountability",
        description: "From soil testing and architectural floor plans to final paint coat and key handover, one team is accountable.",
      },
    ],
    team: [
      {
        name: "Er. K. Natarajan",
        role: "Chief Civil Engineer & Founder",
        experience: "22+ Years in Structural Engineering",
        bio: "Former chief civil consultant for major residential projects across Chennai with expertise in seismic design and soil foundation engineering.",
      },
      {
        name: "Ar. Sneha Ranganathan",
        role: "Principal Architectural Designer",
        experience: "14+ Years in Residential Architecture",
        bio: "Specialist in contemporary tropical homes, natural daylight optimization, and bespoke Vastu-compliant luxury residences.",
      },
      {
        name: "Er. Vigneshwaran S.",
        role: "Head of Site Supervision & QC",
        experience: "12+ Years in On-Ground Execution",
        bio: "Oversees the 150+ point structural quality audit checklist and manages daily on-site civil supervisor teams across Chennai.",
      },
    ],
  },

  whyTBC: [
    {
      title: "Transparent Pricing",
      description: "Fixed sqft rates with complete itemized specifications. No surprise billing or sudden escalation clauses.",
      iconName: "Receipt",
    },
    {
      title: "Stage-wise Payments",
      description: "Pay purely on verified construction milestones. Funds are requested only after stage inspection approval.",
      iconName: "Milestone",
    },
    {
      title: "Professional Supervision",
      description: "Experienced civil engineers on-site daily, ensuring structural integrity and precise architectural finish.",
      iconName: "HardHat",
    },
    {
      title: "Quality-Controlled Construction",
      description: "Exclusively certified Grade-53 cement, Fe 550 steel, and branded plumbing and electrical fittings.",
      iconName: "ShieldCheck",
    },
    {
      title: "Clear Communication",
      description: "Weekly photo/video reports and a direct WhatsApp channel with your project manager and architect.",
      iconName: "MessageCircle",
    },
    {
      title: "Warranty & Support",
      description: "5-Year structural warranty with proactive post-handover civil support and annual check-ups.",
      iconName: "Award",
    },
  ] as WhyTBCItem[],

  testimonials: [
    {
      id: "t1",
      quote:
        "Building on our plot in Medavakkam seemed daunting until we met TBC. The stage-wise billing gave us absolute financial control, and the house was delivered exactly as planned in 10 months.",
      author: "K. R. Sundaram",
      role: "Landowner & Tech Lead",
      location: "Medavakkam, Chennai",
      projectType: "3,200 sqft Duplex",
      verified: true,
      highlight: "Delivered in 10 Months on Budget",
    },
    {
      id: "t2",
      quote:
        "The level of transparency in material selection was top-tier. TBC provided lab test reports for concrete cubes and steel grades for every single slab. Unmatched professionalism in Chennai.",
      author: "Priya & Anand V.",
      role: "Homeowners",
      location: "ECR, Chennai",
      projectType: "4,500 sqft Luxury Villa",
      verified: true,
      highlight: "Lab-Tested Concrete & Rebar",
    },
    {
      id: "t3",
      quote:
        "As an NRI managing construction remotely, TBC's weekly video walkthroughs and dedicated site engineer gave me total peace of mind. No cost overruns, no delays.",
      author: "Venkatesh S.",
      role: "NRI Landowner",
      location: "OMR, Chennai",
      projectType: "2,800 sqft Individual House",
      verified: true,
      highlight: "Remote NRI Weekly Video Tracking",
    },
    {
      id: "t4",
      quote:
        "TBC's architects spent countless hours perfecting our floor plan to ensure complete Vastu alignment without sacrificing modern aesthetic open spaces. Highly recommended!",
      author: "Dr. Meenakshi & Ramesh K.",
      role: "Medical Professionals",
      location: "Anna Nagar, Chennai",
      projectType: "3,600 sqft Contemporary Home",
      verified: true,
      highlight: "Vastu & Modern Design Synergy",
    },
  ] as TestimonialItem[],

  riskReversals: [
    {
      title: "Free Initial Consultation",
      description: "Sit with our chief architect to discuss floor plans and feasibility without spending a rupee.",
    },
    {
      title: "No-Obligation Estimate",
      description: "Get a complete itemized material and cost breakdown customized for your plot.",
    },
    {
      title: "Transparent Pricing",
      description: "Locked sqft construction contract with no hidden costs or mid-project rate hikes.",
    },
    {
      title: "Stage-Wise Milestone Payments",
      description: "Pay only when the actual work on your plot is completed and verified by you.",
    },
    {
      title: "Dedicated Professional Supervision",
      description: "Full-time civil engineers on site ensuring zero material compromise or workmanship flaws.",
    },
  ],

  faqs: [
    {
      category: "Pricing & Costing",
      question: "What is included in the ₹1,899/sqft starting price?",
      answer: "The ₹1,899/sqft package includes turnkey construction: architectural planning, structural engineering, RCC foundation, brickwork, vitrified tile flooring, standard teak doors, UPVC windows, plumbing, electricals, interior & exterior painting, and 5-year structural warranty.",
    },
    {
      category: "Pricing & Costing",
      question: "Are there any hidden costs or escalation clauses during construction?",
      answer: "No. Once our detailed BOQ and contract are finalized and signed, the sqft rate is locked. Any material price fluctuations during the project lifecycle are absorbed by TBC unless you request an architectural scope change.",
    },
    {
      category: "Payments & Financials",
      question: "How do stage-wise milestone payments work?",
      answer: "Our contracts break down your project into 8 to 10 distinct physical milestones (e.g. Foundation, Plinth Beam, Ground Floor Slab, First Floor Slab, Brickwork, Plastering, Finishing). You only release payments after inspecting and approving each completed stage.",
    },
    {
      category: "Timeline & Delivery",
      question: "What is your typical construction timeline in Chennai?",
      answer: "An individual house or duplex (2,000–3,500 sqft) typically takes 8 to 11 months from foundation commencement to final key handover. Luxury villas with extensive bespoke detailing may take 12 to 14 months.",
    },
    {
      category: "Approvals & Permissions",
      question: "Do you assist with building plan approvals from CMDA / Corporation?",
      answer: "Yes. Our in-house architectural team handles the complete drawing preparation, structural stability certificates, and liaison support required for CMDA / Greater Chennai Corporation building plan approvals.",
    },
    {
      category: "Engineering & Materials",
      question: "What grades of steel and cement do you use?",
      answer: "We use exclusively certified Fe 550D TMT steel (Tata Tiscon / Jindal Panther) and Grade 53 Portland Pozzolana or Ordinary Portland Cement (Ultratech / Coromandel / Dalmia). We provide lab compressive strength cube test reports for every slab pour.",
    },
    {
      category: "Warranty & Aftercare",
      question: "What does the 5-Year Construction Warranty cover?",
      answer: "Our 5-year warranty covers all structural RCC elements (foundations, columns, beams, slabs) and integral roof/bathroom waterproofing against leakage or cracks, backed by prompt service support and annual preventative inspections.",
    },
    {
      category: "Site Visits & Land",
      question: "Do you construct only on plots already owned by the client?",
      answer: "Yes, exactly. TBC is exclusively a bespoke construction firm that constructs premium homes and commercial buildings on land already owned by our clients. We do not sell plots or broker real estate.",
    },
    {
      category: "Site Visits & Land",
      question: "How do I schedule a site survey on my plot?",
      answer: "Simply submit our online request form or message us on WhatsApp. Our senior civil engineer will visit your plot in Chennai to check soil conditions, road approach, and plot demarcation free of charge.",
    },
    {
      category: "Service Areas",
      question: "Which locations in Chennai do you cover?",
      answer: "We construct actively across Chennai including OMR, ECR, Tambaram, Medavakkam, Sholinganallur, Velachery, Perungudi, Thoraipakkam, Pallikaranai, Chromepet, Porur, Avadi, Anna Nagar, Adyar, and Besant Nagar.",
    },
    {
      category: "Calculator",
      question: "How accurate is the online construction cost calculator?",
      answer: "The online calculator provides an accurate indicative estimate (±5% variance) based on our standard sqft package rates and floor multipliers. Final precise budgets are determined during the detailed BOQ blueprint consultation.",
    },
  ] as FAQItem[],

  serviceAreas: [
    "Chennai",
    "OMR",
    "ECR",
    "Tambaram",
    "Medavakkam",
    "Sholinganallur",
    "Velachery",
    "Perungudi",
    "Thoraipakkam",
    "Pallikaranai",
    "Chromepet",
    "Porur",
    "Avadi",
    "Anna Nagar",
    "Adyar / Besant Nagar",
  ],

  headerNavigation: [
    { label: "Packages", href: "/packages" },
    { label: "Projects", href: "/projects" },
    { label: "Process", href: "/process" },
    {
      label: "Cost Calculator",
      href: "/calculator-pro-3",
      isBadge: true,
      badgeText: "PRO",
      children: [
        {
          label: "Calculator Pro 3",
          description: "Interactive floor-wise estimator with real-time BOQ",
          href: "/calculator-pro-3",
          badge: "Latest",
        },
        {
          label: "Calculator Pro 2",
          description: "Step-by-step guided budget builder",
          href: "/calculator-pro-2",
        },
        {
          label: "Cost Calculator PRO",
          description: "10-phase milestone distribution & material analysis",
          href: "/calculator-pro",
        },
        {
          label: "Quick Calculator",
          description: "Instant sqft & package rate comparison",
          href: "/calculator",
        },
      ],
    },
    {
      label: "About",
      href: "/about",
      children: [
        {
          label: "About TBC",
          description: "Our philosophy, leadership & Chennai standards",
          href: "/about",
        },
        {
          label: "Client Testimonials",
          description: "Verified homeowner stories & build experiences",
          href: "/testimonials",
        },
        {
          label: "Frequently Asked Questions",
          description: "Clear answers on pricing, approvals & timeline",
          href: "/faq",
        },
      ],
    },
    { label: "Contact", href: "/contact" },
  ] as HeaderNavItem[],

  navigation: [
    { label: "Home", href: "/" },
    { label: "Packages", href: "/packages" },
    { label: "Projects", href: "/projects" },
    { label: "Process", href: "/process" },
    { label: "Cost Calculator PRO", href: "/calculator-pro-3" },
    { label: "About", href: "/about" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ] as NavItem[],

  ctaDefaults: {
    primary: "Get Free Quote",
    secondary: "Chat on WhatsApp",
    third: "Book Free Site Visit",
    phone: "Call Now",
    calculator: "Calculate Construction Cost",
  },

  legal: {
    disclaimer:
      "TBC (The Build Company) is a specialized turnkey residential & commercial building contractor in Chennai, Tamil Nadu. We construct exclusively on plots owned by our clients. TBC does not engage in real estate brokerage or land sales.",
    copyright: `© ${new Date().getFullYear()} TBC — The Build Company. All rights reserved.`,
  },
} as const;

export type SiteConfig = typeof siteConfig;

/**
 * Generates direct WhatsApp click-to-chat URL with prefilled text
 */
export function getWhatsAppUrl(message?: string): string {
  const text = message || siteConfig.whatsappMessages.default;
  return `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(text)}`;
}
