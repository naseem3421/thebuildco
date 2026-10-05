/**
 * AI Intelligence & Geotechnical Rules Engine for Calculator Pro 2
 * Chennai 2026 Architectural, Geotechnical, Vastu, and Financial Models
 */

export interface ChennaiSoilProfile {
  locality: string;
  zone: string;
  soilType: string;
  waterTableDepth: string;
  foundationRecommendation: string;
  antiTermiteRequired: boolean;
  waterproofingGrade: "Standard" | "High Performance" | "Marine Grade / Heavy";
  cmdaZoneAdvice: string;
  aiInsightTip: string;
}

export interface VastuRoomLayout {
  roomName: string;
  zoneDirection: string;
  vastuScore: number;
  significance: string;
  dimensions: string;
  floor: "Ground Floor" | "First Floor" | "Second Floor";
}

export interface ElevationStyle {
  id: "contemporary" | "minimalist" | "luxury_villa" | "heritage_fusion";
  name: string;
  badge: string;
  tagline: string;
  accentColor: string;
  features: string[];
  finishesIncluded: string[];
}

export const CHENNAI_SOIL_DATABASE: Record<string, ChennaiSoilProfile> = {
  ecr: {
    locality: "ECR (East Coast Road)",
    zone: "Coastal South",
    soilType: "Marine Sand & Coastal Sandy Strata",
    waterTableDepth: "4 – 6 feet (High Water Table)",
    foundationRecommendation: "Reinforced Raft Footing or Pile Foundation with Sulphate-Resistant Cement",
    antiTermiteRequired: true,
    waterproofingGrade: "Marine Grade / Heavy",
    cmdaZoneAdvice: "CRZ compliance checks required if within 500m of HTL; Max FAR 1.5–1.75",
    aiInsightTip:
      "Coastal sand has high salinity. AI recommends Ramco Supergrade / Coromandel marine cement with double-layer crystalline waterproofing for basement & sump.",
  },
  omr: {
    locality: "OMR (Old Mahabalipuram Road)",
    zone: "IT Corridor South",
    soilType: "Medium Clay & Gravel Mixed Strata",
    waterTableDepth: "8 – 12 feet",
    foundationRecommendation: "Isolated Column Footing with Heavy Plinth Tie Beams (4–5 ft depth)",
    antiTermiteRequired: true,
    waterproofingGrade: "High Performance",
    cmdaZoneAdvice: "Standard CMDA Mixed Residential Zone; FAR 2.0 eligible on 40ft+ roads",
    aiInsightTip:
      "Good soil bearing capacity (SBC ~160 kN/m²). Standard isolated column footing is highly cost-effective here.",
  },
  medavakkam: {
    locality: "Medavakkam",
    zone: "South Chennai",
    soilType: "Expansive Black/Brown Clay",
    waterTableDepth: "6 – 10 feet",
    foundationRecommendation: "Combined Footing or Under-Reamed Pile with Deep Plinth Beam",
    antiTermiteRequired: true,
    waterproofingGrade: "High Performance",
    cmdaZoneAdvice: "GCC/CMDA Approved Layouts; Setbacks: 1.5m front/rear standard",
    aiInsightTip:
      "Clayey soil exhibits volumetric expansion during monsoon. Our structural engineers design deeper 4.5ft excavation to reach hard strata.",
  },
  velachery: {
    locality: "Velachery",
    zone: "South-Central",
    soilType: "Alluvial Silty Clay & Marsh Fringe",
    waterTableDepth: "5 – 8 feet",
    foundationRecommendation: "Heavy RCC Raft or Deep Strip Footing with Plinth Raised 3.5ft Above Road",
    antiTermiteRequired: true,
    waterproofingGrade: "Marine Grade / Heavy",
    cmdaZoneAdvice: "GCC Ward; Stormwater drain connection mandatory",
    aiInsightTip:
      "Flood resilience is critical. AI auto-recommends raising the basement plinth 3.5 ft above road crown level.",
  },
  anna_nagar: {
    locality: "Anna Nagar / Shenoy Nagar",
    zone: "Central West",
    soilType: "Hard Red Soil & Rock Strata",
    waterTableDepth: "15 – 20 feet",
    foundationRecommendation: "Standard Isolated Column Footing (3.5 – 4 ft depth)",
    antiTermiteRequired: false,
    waterproofingGrade: "Standard",
    cmdaZoneAdvice: "Premium Residential Zone; Regularized layouts, rapid GCC online permit",
    aiInsightTip:
      "High Soil Bearing Capacity (>220 kN/m²). Zero foundation risk; saves approximately 8–10% on excavation and foundation steel.",
  },
  porur: {
    locality: "Porur / Mugalivakkam",
    zone: "South-West",
    soilType: "Clayey Loam & Mixed Sedimentary",
    waterTableDepth: "8 – 14 feet",
    foundationRecommendation: "Isolated Trapezoidal Footing with RCC Plinth Grid",
    antiTermiteRequired: true,
    waterproofingGrade: "High Performance",
    cmdaZoneAdvice: "GCC / Porur Zone; Standard residential coverage up to 75%",
    aiInsightTip:
      "Moderate SBC. Standard RCC frame structure provides ideal stability for G+1 and G+2 duplex residences.",
  },
  tambaram: {
    locality: "Tambaram / Chromepet",
    zone: "South Gateway",
    soilType: "Weathered Rock & Hard Gravel Soil",
    waterTableDepth: "12 – 18 feet",
    foundationRecommendation: "Shallow Column Footings anchored in hard gravel strata",
    antiTermiteRequired: false,
    waterproofingGrade: "Standard",
    cmdaZoneAdvice: "Tambaram Corporation approval zone; Quick 30-day single window permit",
    aiInsightTip:
      "Solid rocky sub-base reduces concrete excavation depth by 1.5 ft, delivering instant civil savings.",
  },
};

export const ELEVATION_STYLES: ElevationStyle[] = [
  {
    id: "contemporary",
    name: "Contemporary Glass & Teak",
    badge: "Most Popular in Chennai",
    tagline: "Sleek geometric lines, full-height UPVC glass, and warm wood louvers.",
    accentColor: "#EA580C",
    features: [
      "Large format floor-to-ceiling glass fenestrations",
      "Exterior vertical teak-grain Aluminium louvers",
      "Hidden rooftop rainwater harvesting & solar tray",
      "Integrated LED warm profile strip lighting in soffits",
    ],
    finishesIncluded: ["3-Track UPVC", "Apex Weatherproof Paint", "Toughened Balcony Glass"],
  },
  {
    id: "minimalist",
    name: "Modern Minimalist White",
    badge: "Clean & Timeless",
    tagline: "Crisp white monolith massing with dark anthracite accents and cantilevered balconies.",
    accentColor: "#0284C7",
    features: [
      "Monochrome white stucco facade with anti-dirt coating",
      "Charcoal powder-coated aluminium box frames",
      "Recessed concealed downlights with dusk-to-dawn sensor",
      "Minimalist steel floating staircase railing",
    ],
    finishesIncluded: ["Apex Ultima White", "Dark Grey UPVC", "Slim-line Balcony Railing"],
  },
  {
    id: "luxury_villa",
    name: "Luxury Villa (Double Height)",
    badge: "Ultra-Premium",
    tagline: "Grand double-height entrance portal, Italian stone cladding, and wide viewing deck.",
    accentColor: "#7C3AED",
    features: [
      "18-foot double-height foyer with glass curtain wall",
      "Natural travertine / slate stone wall cladding accent",
      "Grand teak pivot entrance door with digital biometric lock",
      "Frameless toughened glass glass-to-glass balcony corners",
    ],
    finishesIncluded: ["Travertine Stone Cladding", "Curtain Wall DGU Glass", "Solid Teak Pivot Door"],
  },
  {
    id: "heritage_fusion",
    name: "Tamil Heritage Fusion",
    badge: "Classic Chettinad Charm",
    tagline: "Traditional pitched terracotta-sloped roof tiles with modern RCC durability.",
    accentColor: "#B45309",
    features: [
      "Mangalore / Kerala terracotta roof tiles over RCC slab",
      "Carved Burmese teak / Malaysian teak ornate pillar columns",
      "Athangudi inspired patterned floor borders in foyer",
      "Brass finish traditional fixtures and wooden jali work",
    ],
    finishesIncluded: ["Terracotta Sloped Tile", "Handcrafted Teak Pillars", "Brass Hardware Accents"],
  },
];

/**
 * AI Vastu Engine: Generates compliant 2D room layouts tailored to plot dimensions
 */
export function generateAIVastuPlan(
  plotArea: number,
  builtUpPerFloor: number,
  floors: number
): VastuRoomLayout[] {
  const widthRatio = Math.round(Math.sqrt(builtUpPerFloor * 0.75));
  const lengthRatio = Math.round(builtUpPerFloor / widthRatio);

  const layouts: VastuRoomLayout[] = [
    {
      roomName: "Living & Formal Foyer",
      zoneDirection: "North / North-East (Ishanya)",
      vastuScore: 98,
      significance: "Brings positive cosmic energy, abundance, and warm hospitality.",
      dimensions: `${Math.round(widthRatio * 0.45)}' × ${Math.round(lengthRatio * 0.4)}'`,
      floor: "Ground Floor",
    },
    {
      roomName: "Modular Kitchen & Utility",
      zoneDirection: "South-East (Agni Corner)",
      vastuScore: 100,
      significance: "Fire element zone ensures health, nutrition, and domestic prosperity.",
      dimensions: `${Math.round(widthRatio * 0.3)}' × ${Math.round(lengthRatio * 0.28)}'`,
      floor: "Ground Floor",
    },
    {
      roomName: "Pooja & Meditation Room",
      zoneDirection: "North-East (Ishanya)",
      vastuScore: 100,
      significance: "Sacred tranquil quadrant for divine blessings and mental clarity.",
      dimensions: `7' × 6'`,
      floor: "Ground Floor",
    },
    {
      roomName: "Master Bedroom with Walk-in Wardrobe",
      zoneDirection: "South-West (Nairuthi Corner)",
      vastuScore: 96,
      significance: "Earth element quadrant grants stability, authority, and restful sleep.",
      dimensions: `${Math.round(widthRatio * 0.4)}' × ${Math.round(lengthRatio * 0.35)}'`,
      floor: floors > 1 ? "First Floor" : "Ground Floor",
    },
    {
      roomName: "Children / Guest Bedroom",
      zoneDirection: "North-West (Vayu Corner)",
      vastuScore: 94,
      significance: "Air element promotes lively growth, focus, and restful guest comfort.",
      dimensions: `${Math.round(widthRatio * 0.35)}' × ${Math.round(lengthRatio * 0.3)}'`,
      floor: floors > 1 ? "First Floor" : "Ground Floor",
    },
    {
      roomName: "Covered Car Porch & Portico",
      zoneDirection: "North-West / South-East Entry",
      vastuScore: 92,
      significance: "Seamless vehicle transit without obstructing the auspicious North-East.",
      dimensions: `12' × 18'`,
      floor: "Ground Floor",
    },
  ];

  if (floors > 1) {
    layouts.push({
      roomName: "Family Lounge & Open Terrace",
      zoneDirection: "North / East Facade",
      vastuScore: 95,
      significance: "Open sky viewing deck for natural ventilation and morning sunlight.",
      dimensions: `${Math.round(widthRatio * 0.5)}' × ${Math.round(lengthRatio * 0.3)}'`,
      floor: "First Floor",
    });
  }

  return layouts;
}

/**
 * AI Budget Optimizer: Reverse engineers maximum built-up sqft and optimal package
 */
export function optimizeBudget(targetBudgetInLakhs: number) {
  const budgetInRupees = targetBudgetInLakhs * 100000;

  // Basic (₹1,999), Standard (₹2,299), Premium (₹2,649), Luxury (₹2,999)
  const basicSqft = Math.floor(budgetInRupees / 1999);
  const standardSqft = Math.floor(budgetInRupees / 2299);
  const premiumSqft = Math.floor(budgetInRupees / 2649);
  const luxurySqft = Math.floor(budgetInRupees / 2999);

  let recommendedPackage: "basic" | "standard" | "premium" | "luxury" = "premium";
  let recommendedFloors = 2;

  if (targetBudgetInLakhs < 30) {
    recommendedPackage = "basic";
    recommendedFloors = 1;
  } else if (targetBudgetInLakhs <= 45) {
    recommendedPackage = "standard";
    recommendedFloors = 2;
  } else if (targetBudgetInLakhs <= 80) {
    recommendedPackage = "premium";
    recommendedFloors = 2;
  } else {
    recommendedPackage = "luxury";
    recommendedFloors = 3;
  }

  return {
    targetBudgetInLakhs,
    basicSqft,
    standardSqft,
    premiumSqft,
    luxurySqft,
    recommendedPackage,
    recommendedFloors,
  };
}
