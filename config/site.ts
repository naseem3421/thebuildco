/**
 * Central Business Configuration for The Build Company
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
  name: "The Build Company",
  shortName: "The Build Company",
  tagline: "Build Better. Build With Confidence.",
  heroTitle: "Build Your Dream Home in Chennai",
  heroSubtitle:
    "Already own the land? We build your home with transparent sqft pricing, professional supervision and a clear construction process.",
  description:
    "Chennai's trusted bespoke construction partner. We construct premium individual houses, luxury villas, duplex homes, and commercial spaces directly on your own land.",
  modelNotice: "We build exclusively on customer-owned land across Chennai & Tamil Nadu. The Build Company does not sell land.",

  location: {
    city: "Chennai",
    state: "Tamil Nadu",
    country: "India",
    address: "9/18, Muthuvel Street, Kodambakkam, Chennai - 600 024.",
  },

  contact: {
    phone: "+91 98400 12345",
    phoneDisplay: "+91 98400 12345",
    phoneHref: "tel:+919840012345",
    whatsappNumber: "919840012345",
    whatsappHref:
      "https://wa.me/919840012345?text=Hi%20The%20Build%20Company%2C%20I%20already%20own%20a%20plot%20in%20Chennai%20and%20I%27m%20looking%20for%20construction%20services.%20I%20would%20like%20to%20know%20the%20approximate%20construction%20cost%20and%20process.",
    email: "enquiry@thebuildcompany.in",
    workingHours: "Mon - Sat: 9:00 AM - 7:00 PM",
  },

  whatsappMessages: {
    default:
      "Hi The Build Company, I already own a plot in Chennai and I'm looking for construction services. I would like to know the approximate construction cost and process.",
    hero:
      "Hi The Build Company, I would like to get a construction quote for my property.",
    siteVisit:
      "Hi The Build Company, I own land in Chennai and would like to schedule a free site visit & architectural consultation.",
    calculator: (area: number | string, location: string, estimate?: string) =>
      `Hi The Build Company, I used your construction cost calculator. My estimated project size is ${area} sqft in ${location}${
        estimate ? ` (Approx: ${estimate})` : ""
      }. I would like to discuss the construction cost.`,
    packageInquiry: (packageName: string, rate: string) =>
      `Hi The Build Company, I am interested in your ${packageName} package (${rate}). Please share detailed specifications.`,
    experienceCentre:
      "Hi The Build Company, I would like to schedule a visit to the Experience Centre in your office to physically inspect your package samples, tiles, sanitaryware, wires, windows, and fixtures.",
  },

  pricing: {
    startingPrice: "₹2,399",
    startingPriceUnit: "/sqft (excl. GST)",
    formattedStartingPrice: "₹2,399/sqft (excl. GST)",
  },

  experience: "25+ Years Legacy",
  projectsCompleted: "110+ Projects Completed",
  supervision: "Dedicated Site Supervision • Milestone Escrow",
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
      pricePerSqft: 2399,
      formattedPrice: "₹2,399/sqft (excl. GST)",
      tagline: "High standard essentials for solid, reliable construction.",
      features: [
        "Standard Structural Design (Fe 550 Steel & Grade 53/43 Cement)",
        "Premium Red Bricks / Solid Concrete Blocks",
        "Vitrified Tiles (2x2 ft premium flooring)",
        "Standard Teak Wood Main Door & Flush Internal Doors",
        "UPVC Windows with Bug Mesh",
        "Stage-wise Milestone Quality Audits",
        "Dedicated Site Supervisor on Your Plot",
      ],
    },
    {
      id: "standard",
      name: "Standard",
      pricePerSqft: 2699,
      formattedPrice: "₹2,699/sqft (excl. GST)",
      tagline: "Our most popular package balancing premium finishes & durability.",
      popular: true,
      features: [
        "Enhanced Seismic Resilient RCC Frame Structure",
        "Large Format Glazed Vitrified Tiles (4x2 ft flooring)",
        "First Quality Teak Main Door & Engineered Doors",
        "Branded Sanitary & CP Fittings (Kohler / Jaquar)",
        "Concealed Copper Wiring with Modular Switches (Havells/Legrand)",
        "Dedicated Site Supervisor & 3D Elevation Renderings",
        "Pre-Handover Inspection & Snag Clearance Protocol",
      ],
    },
    {
      id: "premium",
      name: "Premium",
      pricePerSqft: 3099,
      formattedPrice: "₹3,099/sqft (excl. GST)",
      tagline: "Luxury architectural craftsmanship with turnkey luxury specifications.",
      features: [
        "Architectural Layout & Bespoke Structural Engineering",
        "Italian Marble / Premium Large Porcelain Slab Flooring",
        "Full Teakwood Joinery & Heavy Acoustic Aluminium/UPVC Glazing",
        "Luxury Sanitary & Concealed Diverter Systems (Grohe / Kohler)",
        "Smart Home Automation Prep & False Ceiling with Ambient Lighting",
        "Weekly Milestone Video Reports & Executive Oversight",
        "Comprehensive Civil Handover Sign-Off",
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
      premium: "Dedicated Senior Site Supervisor, Daily Digital Logbook, Engineering Quality Audit",
    },
    {
      category: "Handover & Quality Audit",
      basic: "Comprehensive Handover Inspection, Snag Clearance Audit & Completion Sign-Off",
      standard: "150-Point QA Audit, 72-Hour Water Ponding Test, Snag Clearance & Post-Handover Support",
      premium: "Complete Civil Quality Audit, As-Built MEP Blueprint Dossier & Priority Handover Support",
    },
  ] as SpecificationCategory[],

  services: [
    {
      id: "individual-houses",
      title: "Individual Houses",
      shortDesc: "Custom-designed single and multi-level family residences built to your lifestyle needs.",
      iconName: "Home",
      imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      sqftRange: "1,800 – 5,000 sqft",
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
  ] as ServiceItem[],

  trustMetrics: [
    {
      value: "25+",
      label: "Years Legacy",
      subtext: "RDS Builders heritage since 1999",
      highlight: false,
    },
    {
      value: "110+",
      label: "Projects Completed",
      subtext: "Delivered across Chennai plots",
      highlight: false,
    },
    {
      value: "₹2,399",
      label: "Starting / sqft (excl. GST)",
      subtext: "Itemized milestone pricing",
      highlight: true,
    },
    {
      value: "Dedicated",
      label: "Site Supervisor",
      subtext: "Assigned oversight on your plot",
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
      details: ["Clear milestone schedule", "Legally binding handover timeline", "Quality assurance specifications"],
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
      description: "150+ point civil engineering inspections executed at every milestone before milestone payments are released.",
      details: ["Concrete cube compressive strength tests", "Slump & curing audits", "Plumbing pressure & electrical insulation audits"],
    },
    {
      step: "08",
      title: "Handover",
      description: "Welcome to your new home with final deep cleaning, keys handover, and certified pre-handover snag clearance protocol.",
      details: ["Deep cleaning & final snag audit", "Key handover ceremony", "Certified Snag-Free Handover Protocol"],
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
      packageUsed: "Standard Package (₹2,699/sqft)",
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
      packageUsed: "Premium Package (₹3,099/sqft)",
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
      packageUsed: "Standard Package (₹2,699/sqft)",
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
      packageUsed: "Standard Package (₹2,699/sqft)",
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
        "Pre-Handover Snag Audit & Certified Clearance Protocol",
      ],
    },
  ] as ProjectItem[],


  aboutStory: {
    hero: "Building Trust. Creating Lasting Value — Built on a 25+ Year Construction Legacy in Chennai.",
    paragraphs: [
      "The Build Company is a new-generation construction company built on a family legacy of over 25 years in the construction and real estate industry. Inspired by the vision of our father, Mr. R. Deenadayalan, Founder of RDS Builders, our journey began in 1999, with experience spanning 100+ residential projects.",
      "Mr. D. Uday Kumar, B.Tech in Civil Engineering and M.Tech in Construction Engineering Management, has been serving as a Director at RDS Builders since 2014. Alongside Mrs. R. Ramya, B.E., he leads The Build Company with a shared vision of delivering quality-driven construction through engineering expertise, professional project management, and modern construction practices.",
      "We specialise in premium residential and villa projects, delivering thoughtfully planned homes with a focus on quality, functionality, and lasting value. Our services also include residential building contracting, joint venture developments, warehouse and commercial construction, and turnkey interior solutions.",
    ],
    experienceCentre: {
      title: "Our Construction Experience Centre",
      tagline: "Experience Your Home Before It’s Built.",
      description:
        "Our unique Experience Centre brings construction materials, tiles, bathroom fittings, electrical fittings, door finishes, and interior samples under one roof, helping customers explore options and make confident decisions before construction begins.",
    },
    commitment:
      "From planning and material selection to construction and finishing, we focus on quality, transparency, timely delivery, and customer satisfaction—making every construction journey simpler, more convenient, and rewarding.",
    tagline: "The Build Company — Your One-Stop Solution for Construction.",
    values: [
      {
        title: "25+ Year Family Legacy",
        description: "Built on the foundation of RDS Builders (est. 1999) with over 100+ residential homes delivered across Chennai.",
      },
      {
        title: "Civil & Construction Masters",
        description: "Led by B.Tech and M.Tech Civil & Construction Engineering Management professionals with rigorous technical oversight.",
      },
      {
        title: "In-Office Experience Centre",
        description: "Touch, test, and compare tiles, sanitaryware, joinery, and structural samples under one roof before you break ground.",
      },
      {
        title: "Transparent Turnkey Delivery",
        description: "Milestone-linked billing, locked contracts, and zero hidden costs from initial soil test to final key handover.",
      },
    ],
    team: [
      {
        name: "Mr. D. Uday Kumar, B.Tech, M.Tech",
        role: "Managing Director",
        experience: "Director at RDS Builders since 2014",
        bio: "B.Tech in Civil Engineering and M.Tech in Construction Engineering Management. Leads The Build Company with deep technical acumen, modern construction systems, and client-centric project management.",
      },
      {
        name: "Mrs. R. Ramya, B.E.",
        role: "Director",
        experience: "Engineering Leadership",
        bio: "B.E. graduate co-leading The Build Company with a dedicated focus on architectural excellence, customer experience, interior design integration, and quality assurance.",
      },
      {
        name: "In Honour of Mr. R. Deenadayalan",
        role: "Founder, RDS Builders (1999)",
        experience: "25+ Years Legacy • 100+ Projects",
        bio: "The foundational mentor whose 25-year legacy of integrity, craftsmanship, and enduring client trust inspires every project built by The Build Company.",
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
      title: "QA Audits & Snag Clearance",
      description: "Milestone-by-milestone civil inspections, 72-hour waterproofing ponding tests, and certified snag clearance before handover.",
      iconName: "Award",
    },
  ] as WhyTBCItem[],

  testimonials: [
    {
      id: "t1",
      quote:
        "Building on our plot in Medavakkam seemed daunting until we met The Build Company. The stage-wise billing gave us absolute financial control, and the house was delivered exactly as planned in 10 months.",
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
        "The level of transparency in material selection was top-tier. The Build Company provided lab test reports for concrete cubes and steel grades for every single slab. Unmatched professionalism in Chennai.",
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
        "As an NRI managing construction remotely, The Build Company's weekly video walkthroughs and dedicated site supervisor gave me total peace of mind. No cost overruns, no delays.",
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
        "The Build Company's design team spent countless hours perfecting our floor plan to ensure complete Vastu alignment without sacrificing modern aesthetic open spaces. Highly recommended!",
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
      description: "Sit with our in-house architectural & engineering team to discuss floor plans and feasibility without spending a rupee.",
    },
    {
      title: "No-Obligation Estimate",
      description: "Get a complete itemized material and cost breakdown customized for your plot.",
    },
    {
      title: "Price Surge Protection",
      description: "Contractually locked pricing with up to 10% material price surge protection during the contract period.",
    },
    {
      title: "Stage-Wise Milestone Payments",
      description: "Pay only when the actual work on your plot is completed and verified by you.",
    },
    {
      title: "Dedicated Site Supervision",
      description: "Dedicated supervisor for each site ensuring zero material compromise or workmanship flaws.",
    },
  ],

  faqs: [
    {
      category: "Pricing & Costing",
      question: "What is included in the ₹2,399/sqft starting price?",
      answer: "Our ₹2,399/sqft (excl. GST) Basic package provides turnkey essentials: architectural floor plans, Fe 550 steel, Grade 53 cement, 2x2 vitrified tiles, standard teak wood main door, UPVC windows, branded sanitaryware, and stage-wise civil QA audits. For upgraded finishes like 4x2 glazed vitrified tiles, Kohler/Jaquar fittings, and FRLS fire-resistant wiring, clients select our ₹2,699/sqft Standard package.",
    },
    {
      category: "Pricing & Costing",
      question: "Are there any hidden costs or escalation clauses during construction?",
      answer: "No. Once our detailed BOQ and contract are finalized and signed, the sqft rate is locked. Material price fluctuations up to 10% during the contract period are absorbed by The Build Company, ensuring your budget remains protected.",
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
      answer: "Yes. Our in-house architectural team handles the complete drawing preparation, structural stability certificates, and liaison support required for CMDA / Greater Chennai Corporation approvals. Government scrutiny and development fees are paid directly by the client.",
    },
    {
      category: "Engineering & Materials",
      question: "What grades of steel and cement do you use?",
      answer: "We use exclusively certified Fe 550D TMT steel (Tata Tiscon / Jindal Panther) and Grade 53 Portland Pozzolana or Ordinary Portland Cement (Ultratech / Coromandel / Dalmia). We provide lab compressive strength cube test reports for every slab pour.",
    },
    {
      category: "Quality Assurance & Handover",
      question: "What quality assurance and post-handover protocol do you follow?",
      answer: "We conduct 150+ civil QA/QC inspections at every milestone, 72-hour waterproofing ponding tests, and have a dedicated supervisor for each site. Before final handover, a thorough snag audit is completed and certified to ensure a flawless, defect-free delivery.",
    },
    {
      category: "Site Visits & Land",
      question: "Do you construct only on plots already owned by the client?",
      answer: "Yes, exactly. The Build Company is exclusively a bespoke construction firm that constructs premium homes and commercial buildings on land already owned by our clients. We do not sell plots or broker real estate.",
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
    {
      label: "Services",
      href: "/services",
      children: [
        {
          label: "Individual House Construction",
          description: "Custom family residences on client-owned plots",
          href: "/services/individual-house-construction",
        },
        {
          label: "Villa Construction",
          description: "Turnkey luxury villas with bespoke architecture",
          href: "/services/villa-construction",
        },
        {
          label: "Duplex House Construction",
          description: "Optimized two-story multi-generational homes",
          href: "/services/duplex-house-construction",
        },
        {
          label: "Luxury Home Construction",
          description: "High-spec residences with architectural craftsmanship",
          href: "/services/luxury-home-construction",
        },
        {
          label: "All Services Overview",
          description: "Compare residential construction types",
          href: "/services",
        },
      ],
    },
    { label: "Projects", href: "/projects" },
    { label: "Process", href: "/process" },
    {
      label: "Cost Calculator",
      href: "/calculator-pro-2",
      isBadge: true,
      badgeText: "PRO",
      children: [
        {
          label: "Calculator Pro 2",
          description: "Step-by-step guided budget builder",
          href: "/calculator-pro-2",
          badge: "Latest",
        },
        {
          label: "Construction Cost in Chennai",
          description: "2026 cost guide, sqft rates & examples",
          href: "/construction-cost-chennai",
        },
        {
          label: "Packages Comparison",
          description: "Basic, Standard and Premium specifications",
          href: "/packages",
        },
        {
          label: "Experience Centre",
          description: "Inspect physical material & package samples",
          href: "/#experience-centre",
          badge: "Visit",
        },
      ],
    },
    {
      label: "About",
      href: "/about",
      children: [
        {
          label: "About The Build Company",
          description: "Our philosophy, leadership & Chennai standards",
          href: "/about",
        },
        {
          label: "Experience Centre",
          description: "Visit our physical sample lab in Chennai",
          href: "/#experience-centre",
        },
        {
          label: "Quality Standards",
          description: "150+ point civil engineering QA/QC audits",
          href: "/quality-standards",
        },
        {
          label: "Joint Venture",
          description: "Selective partnership opportunities for landowners",
          href: "/joint-venture",
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
  ] as HeaderNavItem[],

  navigation: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/projects" },
    { label: "Process", href: "/process" },
    { label: "Cost Calculator", href: "/calculator-pro-2" },
    { label: "Packages Comparison", href: "/packages" },
    { label: "Experience Centre", href: "/#experience-centre" },
    { label: "Construction Cost Guide", href: "/construction-cost-chennai" },
    { label: "Quality Standards", href: "/quality-standards" },
    { label: "Joint Venture", href: "/joint-venture" },
    { label: "About", href: "/about" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ] as NavItem[],

  ctaDefaults: {
    primary: "Get Free Estimate",
    secondary: "Chat on WhatsApp",
    third: "Book Free Site Visit",
    phone: "Call Now",
    calculator: "Calculate Construction Cost",
  },

  legal: {
    disclaimer:
      "The Build Company is a specialized turnkey residential & commercial building contractor in Chennai, Tamil Nadu. We construct exclusively on plots owned by our clients. The Build Company does not engage in real estate brokerage or land sales.",
    copyright: `© ${new Date().getFullYear()} The Build Company. All rights reserved.`,
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
