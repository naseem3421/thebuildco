/**
 * Centralized Locality Configuration for Chennai Local SEO
 * Each locality has distinct geographical, soil, zoning, and architectural characteristics.
 */

export interface LocalityData {
  slug: string;
  name: string;
  shortName: string;
  zone: string;
  metaTitle: string;
  metaDescription: string;
  heroTagline: string;
  overview: string;
  geotechnicalNotes: string;
  popularTypologies: string[];
  keyStreetsOrAreas: string[];
  nearbyProjectSlug?: string;
  nearbyProjectTitle?: string;
  localFaqs: {
    question: string;
    answer: string;
  }[];
}

export const localitiesConfig: Record<string, LocalityData> = {
  chennai: {
    slug: "chennai",
    name: "Chennai",
    shortName: "Chennai",
    zone: "Greater Chennai Metropolitan",
    metaTitle: "House Construction Company in Chennai | From ₹2,199/sqft | TBC",
    metaDescription: "Looking for the best house construction company in Chennai? TBC builds premium individual houses, villas & duplexes on your own plot from ₹2,199/sqft.",
    heroTagline: "Turnkey Residential & Commercial Construction Across Greater Chennai",
    overview:
      "TBC is Chennai's premier bespoke turnkey building contractor. Whether your plot is in Central Chennai, along the IT corridors of OMR, or in growing suburban belts, we bring professional civil engineering, 150+ point quality audits, and stage-wise milestone escrow to your project.",
    geotechnicalNotes:
      "Foundation design in Chennai varies significantly from sandy soil along coastal belts (ECR/Thiruvanmiyur) to expansive clay in South/West zones. We conduct mandatory soil bearing capacity (SBC) tests before finalizing structural column and footing designs.",
    popularTypologies: ["Individual Houses", "Luxury Villas", "Duplex Homes", "Commercial Complexes"],
    keyStreetsOrAreas: ["Anna Nagar", "Adyar", "T. Nagar", "Besant Nagar", "Nungambakkam", "Alwarpet", "Mylapore"],
    nearbyProjectSlug: "greenfield-residence",
    nearbyProjectTitle: "Greenfield Residence (Medavakkam)",
    localFaqs: [
      {
        question: "How much does house construction cost in Chennai per sqft?",
        answer: "Turnkey residential construction by TBC in Chennai starts at ₹2,199/sqft for Standard and ₹2,599/sqft for Premium, covering architectural drawings, RCC structure, and complete luxury finishes.",
      },
      {
        question: "Do you handle CMDA and Greater Chennai Corporation plan approvals?",
        answer: "Yes, our in-house architectural team manages complete drawing preparations, structural stability endorsements, and liaison support for CMDA and Greater Chennai Corporation building permits.",
      },
    ],
  },
  medavakkam: {
    slug: "medavakkam",
    name: "Medavakkam",
    shortName: "Medavakkam",
    zone: "South Chennai",
    metaTitle: "House Construction Company in Medavakkam, Chennai | TBC",
    metaDescription: "Expert house builders in Medavakkam, Chennai. Custom 3BHK/4BHK individual houses & duplex homes constructed on your land starting at ₹2,199/sqft.",
    heroTagline: "Bespoke Independent Houses & Duplexes in Medavakkam",
    overview:
      "Medavakkam has rapidly emerged as one of South Chennai's most sought-after residential hubs. With excellent connectivity to OMR, Velachery, and Tambaram, we help landowners in Medavakkam build modern, multi-story duplexes and contemporary residences optimized for plot frontage.",
    geotechnicalNotes:
      "Medavakkam typically features clayey to sandy-clay substrata. Our structural engineers design reinforced plinth beams and isolated or combined RCC footings to counter seasonal moisture variations and prevent settlement cracks.",
    popularTypologies: ["Individual 3BHK Houses", "Duplex Homes", "Rental Ground+2 Units"],
    keyStreetsOrAreas: ["Perumbakkam Main Road", "Sowmya Nagar", "VGP Shanthi Nagar", "Balaiah Garden"],
    nearbyProjectSlug: "greenfield-residence",
    nearbyProjectTitle: "Greenfield Residence (2,850 sqft Duplex in Medavakkam)",
    localFaqs: [
      {
        question: "What is the typical construction timeline for a 2,500 sqft home in Medavakkam?",
        answer: "A standard 2,500 sqft duplex in Medavakkam takes approximately 9 to 10 months from foundation excavation to final handover.",
      },
      {
        question: "Can I include rental portions on the first floor in Medavakkam?",
        answer: "Yes. Many landowners in Medavakkam opt for a duplex on the ground and first floor with a separate rental 2BHK unit on the second floor for steady rental yields.",
      },
    ],
  },
  sholinganallur: {
    slug: "sholinganallur",
    name: "Sholinganallur",
    shortName: "Sholinganallur",
    zone: "OMR IT Corridor",
    metaTitle: "House Construction Company in Sholinganallur, Chennai | TBC",
    metaDescription: "Build your dream villa or modern residence in Sholinganallur, OMR Chennai. Transparent sqft pricing, luxury architectural finishes, and 5-year warranty.",
    heroTagline: "Luxury Villa & Contemporary Home Builders in Sholinganallur",
    overview:
      "As the focal intersection of OMR and ECR Link Road, Sholinganallur is home to tech executives and landowners looking for architecturally distinctive, smart-ready homes. TBC creates luxury villas with open-concept living, acoustic glass, and EV charging provisions.",
    geotechnicalNotes:
      "Due to high ground water tables and proximity to water bodies, our Sholinganallur projects incorporate heavy sub-surface waterproofing with crystalline admixtures and robust damp-proof courses.",
    popularTypologies: ["Luxury Villas", "Contemporary 4BHK Duplexes", "Smart Homes"],
    keyStreetsOrAreas: ["OMR Junction", "ECR Link Road", "Classic Farms", "TNHB Layout"],
    nearbyProjectSlug: "palm-grove-villa",
    nearbyProjectTitle: "Palm Grove Villa (4,200 sqft Luxury Villa in Sholinganallur)",
    localFaqs: [
      {
        question: "Do you integrate smart home automation and solar infrastructure in Sholinganallur?",
        answer: "Yes, our Standard and Premium packages include complete concealed conduit prep for automated lighting, security systems, and rooftop solar panel installations.",
      },
    ],
  },
  velachery: {
    slug: "velachery",
    name: "Velachery",
    shortName: "Velachery",
    zone: "South-Central Chennai",
    metaTitle: "House Construction Company in Velachery, Chennai | TBC",
    metaDescription: "Turnkey home builders in Velachery. Maximize small and medium plots with space-efficient multi-level construction from ₹2,199/sqft.",
    heroTagline: "High-Efficiency Turnkey Residential Construction in Velachery",
    overview:
      "Velachery is a dense, high-demand residential neighborhood where maximizing every square foot of land is crucial. TBC specializes in smart vertical space optimization, stilt parking configurations, and premium multi-level residences.",
    geotechnicalNotes:
      "Given the historical marshland catchment characteristics in Velachery, we implement elevated plinth levels and heavy-duty storm water drainage integration along with structural grade M25 concrete.",
    popularTypologies: ["G+2 Residential Units", "Duplex Homes with Stilt Parking", "Commercial Showrooms"],
    keyStreetsOrAreas: ["Vijaya Nagar", "Baby Nagar", "Dhandeeswaram", "Tansi Nagar", "Vandikaran Street"],
    nearbyProjectSlug: "greenfield-residence",
    nearbyProjectTitle: "South Chennai Residence Showcase",
    localFaqs: [
      {
        question: "How do you handle flood resilience in Velachery plot construction?",
        answer: "We elevate the plinth beam minimum 3 to 4 feet above road crest level and engineer high-capacity sumps with backflow preventers to ensure flood immunity.",
      },
    ],
  },
  tambaram: {
    slug: "tambaram",
    name: "Tambaram",
    shortName: "Tambaram",
    zone: "South-West Gateway",
    metaTitle: "House Construction Company in Tambaram, Chennai | TBC",
    metaDescription: "Reliable house building contractors in Tambaram (East & West). Turnkey construction on your plot from ₹2,199/sqft with stage-wise payments.",
    heroTagline: "Quality Turnkey Home Construction in Tambaram",
    overview:
      "Tambaram is a flourishing residential zone known for larger individual plots and family-oriented communities. TBC constructs spacious independent houses, multi-generational duplexes, and rental apartments with Vastu compliance.",
    geotechnicalNotes:
      "Tambaram features solid rocky strata and hard gravel in many sectors, providing excellent soil bearing capacity (SBC) that allows cost-efficient, stable shallow foundation engineering.",
    popularTypologies: ["Individual Family Houses", "Vastu-Compliant Duplexes", "G+1 Villas"],
    keyStreetsOrAreas: ["Tambaram East", "Tambaram West", "Selaiyur", "Camp Road", "Mudichur Road", "Sanatorium"],
    nearbyProjectSlug: "lakeview-residence",
    nearbyProjectTitle: "Lakeview Residence (3,100 sqft in Tambaram)",
    localFaqs: [
      {
        question: "Do you construct in both Tambaram East and Tambaram West?",
        answer: "Yes, our civil engineering teams actively manage turnkey construction projects across Tambaram East, West, Selaiyur, Camp Road, and adjoining areas.",
      },
    ],
  },
  pallikaranai: {
    slug: "pallikaranai",
    name: "Pallikaranai",
    shortName: "Pallikaranai",
    zone: "South Chennai Growth Belt",
    metaTitle: "House Construction Company in Pallikaranai, Chennai | TBC",
    metaDescription: "Specialized civil engineering and house construction in Pallikaranai. Engineered raft foundations, stage-wise payments, starting ₹2,199/sqft.",
    heroTagline: "Engineered Foundation & Turnkey Home Construction in Pallikaranai",
    overview:
      "Pallikaranai requires specialized civil engineering due to unique geotechnical characteristics. TBC delivers robust structural engineering with specialized raft and pile foundations tailored specifically for Pallikaranai plots.",
    geotechnicalNotes:
      "We conduct specialized soil boring and moisture content analysis in Pallikaranai, designing raft foundations with corrosion-resistant TMT steel and crystalline integral waterproofing for maximum structural longevity.",
    popularTypologies: ["Modern Duplexes", "Elevated Independent Homes", "Individual Houses"],
    keyStreetsOrAreas: ["Velachery Main Road", "Oil Mill Road", "Kamatchi Nagar", "Maxworth Nagar"],
    nearbyProjectSlug: "greenfield-residence",
    nearbyProjectTitle: "South Chennai Residence Showcase",
    localFaqs: [
      {
        question: "What foundation type is best for Pallikaranai plots?",
        answer: "Based on soil test results, we typically engineer a rigid RCC Raft Foundation or Under-Reamed Piles to distribute structural load evenly and ensure zero settlement.",
      },
    ],
  },
  perungudi: {
    slug: "perungudi",
    name: "Perungudi",
    shortName: "Perungudi",
    zone: "OMR Commercial & Tech Hub",
    metaTitle: "House Construction Company in Perungudi, Chennai | TBC",
    metaDescription: "Build modern contemporary residences in Perungudi, OMR Chennai. Turnkey house builders with transparent sqft pricing from ₹2,199/sqft.",
    heroTagline: "Contemporary Residential Construction in Perungudi",
    overview:
      "Perungudi bridges the commercial energy of OMR with established residential enclaves. TBC crafts contemporary, energy-efficient homes that combine privacy with modern aesthetic finishes.",
    geotechnicalNotes:
      "Soil strata in Perungudi varies from clayey sand to marine clay. We design reinforced concrete framework with anti-corrosive epoxy coating where required.",
    popularTypologies: ["Contemporary Duplexes", "Individual Executive Homes", "Mixed-Use Buildings"],
    keyStreetsOrAreas: ["Kallukuttai", "Kandanchavadi", "OMR Service Road", "Thiruvalluvar Nagar"],
    nearbyProjectSlug: "urban-edge",
    nearbyProjectTitle: "Urban Edge (3,650 sqft on OMR)",
    localFaqs: [
      {
        question: "Can TBC help design compact 3BHK layouts for smaller plots in Perungudi?",
        answer: "Yes, our architectural team specializes in smart space optimization, utilizing open-plan layouts and vertical volumes to maximize living space on compact urban plots.",
      },
    ],
  },
  thoraipakkam: {
    slug: "thoraipakkam",
    name: "Thoraipakkam",
    shortName: "Thoraipakkam",
    zone: "OMR IT Zone",
    metaTitle: "House Construction Company in Thoraipakkam, Chennai | TBC",
    metaDescription: "Turnkey home builders in Thoraipakkam, OMR Chennai. Luxury specifications, stage payments, 5-year warranty starting at ₹2,199/sqft.",
    heroTagline: "Bespoke Home Builders Along the OMR Express Corridor",
    overview:
      "Thoraipakkam is a prime residential enclave along OMR, ideal for modern villas and spacious family duplexes. TBC brings precision architectural craftsmanship to landowners seeking hassle-free turnkey execution.",
    geotechnicalNotes:
      "Foundation depth is calculated based on seasonal water table fluctuations. We enforce strict 28-day water curing protocols for all structural columns and slabs.",
    popularTypologies: ["Bespoke Villas", "Executive Duplex Homes", "G+2 Residences"],
    keyStreetsOrAreas: ["200 Feet Radial Road", "Okkiyam Thoraipakkam", "Anand Nagar", "Chandrasekhar Avenue"],
    nearbyProjectSlug: "urban-edge",
    nearbyProjectTitle: "Urban Edge (OMR)",
    localFaqs: [
      {
        question: "How are quality checks performed on-site in Thoraipakkam?",
        answer: "Our civil engineers execute a 150+ point audit across every milestone, including cube compression tests for concrete and ultrasonic testing for critical welds and joints.",
      },
    ],
  },
  omr: {
    slug: "omr",
    name: "OMR",
    shortName: "OMR",
    zone: "Old Mahabalipuram Road IT Corridor",
    metaTitle: "House Construction Company on OMR, Chennai | From ₹2,199/sqft | TBC",
    metaDescription: "Premier house builders along OMR Chennai. Turnkey construction of villas, duplex homes & individual houses on your land with 5-year warranty.",
    heroTagline: "Architectural Excellence Across the Entire OMR Tech Corridor",
    overview:
      "Old Mahabalipuram Road (OMR) is Chennai's booming IT and residential spine. TBC constructs luxury villas, duplex homes, and independent residences across Perungudi, Thoraipakkam, Sholinganallur, Navalur, and Siruseri.",
    geotechnicalNotes:
      "OMR's expansive terrain requires precise site contour and soil testing. We ensure structural RCC designs conform to IS 456:2000 and seismic zone III parameters.",
    popularTypologies: ["Luxury Contemporary Villas", "Duplex Homes with Home Theatres", "G+2 Multi-Generational Houses"],
    keyStreetsOrAreas: ["Navalur", "Siruseri", "Karapakkam", "Padur", "Kelambakkam", "Kazhipattur"],
    nearbyProjectSlug: "urban-edge",
    nearbyProjectTitle: "Urban Edge (3,650 sqft OMR Residence)",
    localFaqs: [
      {
        question: "Do you construct beyond Sholinganallur on OMR up to Siruseri and Kelambakkam?",
        answer: "Yes, our logistics hubs and site supervisor teams actively manage turnkey construction all the way from Perungudi down to Kelambakkam and Thiruporur along OMR.",
      },
    ],
  },
  porur: {
    slug: "porur",
    name: "Porur",
    shortName: "Porur",
    zone: "West Chennai Growth Corridor",
    metaTitle: "House Construction Company in Porur, Chennai | TBC",
    metaDescription: "Trusted house construction contractors in Porur, Chennai. Turnkey individual house and villa building from ₹2,199/sqft with stage payments.",
    heroTagline: "Turnkey Residential & Commercial Construction in Porur",
    overview:
      "Porur is West Chennai's key commercial and residential hub, well-connected to Guindy, DLF IT Park, and the Poonamallee belt. TBC builds custom family homes and commercial structures with fast turnaround and transparent billing.",
    geotechnicalNotes:
      "Porur generally features stable red soil and clay-loam layers. We design standard isolated column footings that offer exceptional structural stability and cost efficiency.",
    popularTypologies: ["Individual Family Homes", "Duplex Residences", "Commercial Office Spaces"],
    keyStreetsOrAreas: ["Mount-Poonamallee Road", "Kundrathur Road", "Madanandapuram", "Mugalivakkam", "Ramapuram"],
    nearbyProjectSlug: "greenfield-residence",
    nearbyProjectTitle: "Chennai Residence Showcase",
    localFaqs: [
      {
        question: "Do you build commercial retail and office spaces in Porur?",
        answer: "Yes, we construct high-yield commercial complexes and mixed-use residential-commercial buildings with heavy structural glazing and basement parking options.",
      },
    ],
  },
  chromepet: {
    slug: "chromepet",
    name: "Chromepet",
    shortName: "Chromepet",
    zone: "GST Road Corridor",
    metaTitle: "House Construction Company in Chromepet, Chennai | TBC",
    metaDescription: "Expert house builders in Chromepet, Chennai. Custom individual homes and duplexes on your plot from ₹2,199/sqft with 5-year warranty.",
    heroTagline: "High Standard Turnkey Home Building in Chromepet",
    overview:
      "Chromepet is a thriving, established residential enclave along the GST corridor. TBC helps families modernize their ancestral plots or construct brand-new multi-story duplexes with quality-tested materials.",
    geotechnicalNotes:
      "Chromepet features firm gravelly clay and rock sub-bases. We provide structural calculations verified by certified civil structural engineers.",
    popularTypologies: ["Independent Multi-Level Houses", "Contemporary Duplexes", "Modernized Ancestral Homes"],
    keyStreetsOrAreas: ["Radha Nagar", "Hasthinapuram", "Nemilichery", "CLRI Colony", "GST Road"],
    nearbyProjectSlug: "lakeview-residence",
    nearbyProjectTitle: "Lakeview Residence (Tambaram-Chromepet Belt)",
    localFaqs: [
      {
        question: "Can TBC demolish an old house and reconstruct a new home in Chromepet?",
        answer: "Yes, we handle complete turnkey demolition, site clearing, debris disposal, and subsequent new construction from foundation to handover.",
      },
    ],
  },
  ecr: {
    slug: "ecr",
    name: "ECR",
    shortName: "ECR",
    zone: "East Coast Road Scenic & Luxury Belt",
    metaTitle: "Luxury Villa & House Construction on ECR, Chennai | TBC",
    metaDescription: "Premier villa construction contractors on ECR, Chennai. Bespoke coastal luxury residences with saline-resistant materials from ₹2,199/sqft.",
    heroTagline: "Coastal Luxury Architecture & Villa Construction on ECR",
    overview:
      "East Coast Road (ECR) is Chennai's prestigious beachside corridor. TBC specializes in high-end tropical modern villas, cantilevered architectural pavilions, and coastal-grade structural engineering designed to withstand marine environmental conditions.",
    geotechnicalNotes:
      "Coastal sand and saline air require high-durability M30 concrete, corrosion-resistant coated Fe 550D TMT steel, double-glazed marine anodized aluminum joinery, and specialized silicone weather sealants.",
    popularTypologies: ["Luxury Coastal Villas", "Beach Houses with Private Pools", "Tropical Modern Pavilions"],
    keyStreetsOrAreas: ["Palavakkam", "Kottivakkam", "Neelankarai", "Injambakkam", "Akkarai", "Uthandi", "Muttukadu"],
    nearbyProjectSlug: "palm-grove-villa",
    nearbyProjectTitle: "Signature Coastal Villa Portfolio",
    localFaqs: [
      {
        question: "How do you protect homes against coastal corrosion on ECR?",
        answer: "We use marine-grade anti-corrosive epoxy-coated rebars, higher concrete cover thickness (minimum 50mm), and heavy anodized UPVC/aluminum fittings to guarantee decades of corrosion immunity.",
      },
    ],
  },
  avadi: {
    slug: "avadi",
    name: "Avadi",
    shortName: "Avadi",
    zone: "North-West Chennai Corridor",
    metaTitle: "House Construction Company in Avadi, Chennai | TBC",
    metaDescription: "Turnkey house construction in Avadi, Chennai. Custom independent houses and duplexes built on your plot from ₹2,199/sqft with stage payments.",
    heroTagline: "Turnkey House Construction & Civil Engineering in Avadi",
    overview:
      "Avadi is a major growth center in North-West Chennai with spacious residential layouts. TBC provides turnkey civil construction for families building individual residences with transparent sqft pricing and zero hidden clauses.",
    geotechnicalNotes:
      "Avadi features predominantly red gravelly soil with moderate bearing capacity. We optimize footing dimensions to reduce structural excavation overhead while maintaining safety factors.",
    popularTypologies: ["Spacious Single Family Homes", "Individual G+1 Duplexes", "Modern Contemporary Residences"],
    keyStreetsOrAreas: ["HVF Road", "Kavarapalayam", "Pattabiram", "Poonamallee-Avadi Road", "Mitnamallee"],
    nearbyProjectSlug: "greenfield-residence",
    nearbyProjectTitle: "Chennai Residence Showcase",
    localFaqs: [
      {
        question: "What packages are available for plots in Avadi?",
        answer: "Both of our turnkey packages (Standard ₹2,199/sqft and Premium ₹2,599/sqft) are available with full material delivery and dedicated site supervisors in Avadi.",
      },
    ],
  },
};
