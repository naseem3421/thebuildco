import {
  PRO_PACKAGES,
  PRO_PHASES,
  PRO_ADDONS,
  ProPackageTier,
  ProAddon,
  ProPhaseItem,
} from "@/config/calculatorPro";
import {
  CHENNAI_SOIL_DATABASE,
  ChennaiSoilProfile,
  generateAIVastuPlan,
  VastuRoomLayout,
  ElevationStyle,
  ELEVATION_STYLES,
} from "@/config/aiCalculatorEngine";
import { PAYMENT_STAGES, PaymentStage } from "@/config/paymentStages";

export interface CalculatorInputs {
  localityKey: string;
  plotArea: number; // in sqft
  isAutoBuiltUp: boolean;
  customBuiltUpPerFloor?: number;
  floors: number; // 1 to 4
  bhk?: number; // 2, 3, 4
  homeType?: "independent_house" | "duplex" | "villa" | "residential_floors";
  carParkingArea: number; // 0, 200, 400, 600
  packageId: "basic" | "standard" | "premium" | "luxury";
  elevationStyleId?: string;
  selectedAddons: {
    [id: string]: { enabled: boolean; customUnit?: number };
  };
}

export interface FloorCostItem {
  name: string;
  amount: number;
  hasFoundation: boolean;
}

export interface PhaseCostItem extends ProPhaseItem {
  amount: number;
}

export interface PaymentStageItem extends PaymentStage {
  amount: number;
}

export interface MaterialBOQ {
  cementBagsMin: number;
  cementBagsMax: number;
  steelKgMin: number;
  steelKgMax: number;
  msandCftMin: number;
  aggregateCftMin: number;
  bricksCountMin: number;
  bricksCountMax: number;
}

export interface CalculationResult {
  plotArea: number;
  plotCents: string;
  plotGrounds: string;
  far: string;
  builtUpPerFloor: number;
  headroomArea: number;
  totalLivingBuiltUp: number;
  carParkingArea: number;
  totalBuiltUpArea: number;
  selectedPackage: ProPackageTier;
  selectedElevation: ElevationStyle;
  currentSoilProfile: ChennaiSoilProfile;
  baseCost: number;
  addonsCost: number;
  grandTotal: number;
  estimateLow: number;
  estimateHigh: number;
  costPerSqft: number;
  baseDurationMonths: number;
  durationLabel: string;
  emi: number;
  floorBreakdown: FloorCostItem[];
  phaseBreakdown: PhaseCostItem[];
  paymentSchedule: PaymentStageItem[];
  materialBOQ: MaterialBOQ;
  vastuPlan: VastuRoomLayout[];
}

/**
 * Authoritative Turnkey Construction Calculator Engine for Chennai 2026
 */
export function calculateEstimate(inputs: CalculatorInputs): CalculationResult {
  const {
    localityKey = "medavakkam",
    plotArea = 1200,
    isAutoBuiltUp = true,
    customBuiltUpPerFloor = 900,
    floors = 2,
    carParkingArea = 200,
    packageId = "premium",
    elevationStyleId = "contemporary",
    selectedAddons = {},
  } = inputs;

  const validPlotArea = Math.max(0, Number(plotArea) || 0);
  const validFloors = Math.max(1, Math.min(4, Number(floors) || 1));
  const validParking = Math.max(0, Number(carParkingArea) || 0);

  // 1. Package & Elevation Resolution
  const selectedPackage =
    PRO_PACKAGES.find((p) => p.id === packageId) || PRO_PACKAGES[1]; // Default to Premium ₹2,649
  const selectedElevation =
    ELEVATION_STYLES.find((e) => e.id === elevationStyleId) || ELEVATION_STYLES[0];
  const currentSoilProfile =
    CHENNAI_SOIL_DATABASE[localityKey] || CHENNAI_SOIL_DATABASE.medavakkam;

  // 2. Built-Up Area Math
  const builtUpPerFloor = isAutoBuiltUp
    ? Math.round(validPlotArea * 0.75)
    : Math.max(0, Number(customBuiltUpPerFloor) || Math.round(validPlotArea * 0.75));

  const hasHeadroom = !!selectedAddons["headroom"]?.enabled;
  const headroomArea = hasHeadroom ? 200 : 0;
  const totalLivingBuiltUp = builtUpPerFloor * validFloors + headroomArea;
  const totalBuiltUpArea = totalLivingBuiltUp + validParking;

  // 3. Land Conversions & FAR
  const plotCents = validPlotArea > 0 ? (validPlotArea / 435.6).toFixed(2) : "0.00";
  const plotGrounds = validPlotArea > 0 ? (validPlotArea / 2400).toFixed(2) : "0.00";
  const far = validPlotArea > 0 ? (totalBuiltUpArea / validPlotArea).toFixed(2) : "0.00";

  // 4. Base Cost
  const baseLivingCost = totalLivingBuiltUp * selectedPackage.ratePerSqft;
  const carParkingCost = validParking * selectedPackage.ratePerSqft;
  const baseCost = baseLivingCost + carParkingCost;

  // 5. Addons Cost with Basic overrides
  const addonsCost = PRO_ADDONS.reduce((sum, addon) => {
    const state = selectedAddons[addon.id];
    if (!state?.enabled) return sum;
    if (addon.id === "headroom") return sum; // Headroom is factored into living built-up area
    if (addon.type === "fixed") return sum + addon.rate;

    const unitCount = state.customUnit !== undefined ? state.customUnit : addon.defaultUnit || 1;
    let unitRate = addon.rate;
    if (selectedPackage.id === "basic") {
      if (addon.id === "overhead_tank") unitRate = 40;
      if (addon.id === "compound_wall") unitRate = 2300;
      if (addon.id === "underground_sump") unitRate = 30;
      if (addon.id === "septic_tank") unitRate = 28;
    }
    return sum + unitCount * unitRate;
  }, 0);

  const grandTotal = baseCost + addonsCost;
  const costPerSqft = totalBuiltUpArea > 0 ? Math.round(grandTotal / totalBuiltUpArea) : selectedPackage.ratePerSqft;

  // 6. Realistic Range Logic: Low (-5%), High (+8%)
  const estimateLow = Math.round(grandTotal * 0.95);
  const estimateHigh = Math.round(grandTotal * 1.08);

  // 7. Duration Logic
  const baseDurationMonths = 10 + (validFloors - 1) * 4;
  const durationLabels: Record<number, string> = {
    1: "10–12 Months",
    2: "14–16 Months",
    3: "18–20 Months",
    4: "22–24 Months",
  };
  const durationLabel = durationLabels[validFloors] || `${baseDurationMonths} Months`;

  // 8. Bank Loan EMI Formula (20-Year @ 7.1% P.A. / 240 months)
  const monthlyRate = 0.071 / 12;
  const totalMonths = 240;
  const emi =
    grandTotal > 0
      ? Math.round(
          (grandTotal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
            (Math.pow(1 + monthlyRate, totalMonths) - 1)
        )
      : 0;

  // 9. Floor-Wise Split
  let floorBreakdown: FloorCostItem[] = [];
  if (validFloors === 1) {
    floorBreakdown = [{ name: "Ground Floor", amount: baseCost, hasFoundation: true }];
  } else {
    const totalUnits = validFloors + 0.2;
    const baseSharePerUnit = baseCost / totalUnits;
    const groundCost = Math.round(baseSharePerUnit * 1.2);
    const upperFloorCost = Math.round(baseSharePerUnit);

    floorBreakdown.push({ name: "Ground Floor", amount: groundCost, hasFoundation: true });
    for (let f = 1; f < validFloors; f++) {
      floorBreakdown.push({
        name: f === 1 ? "1st Floor" : f === 2 ? "2nd Floor" : "3rd Floor",
        amount: upperFloorCost,
        hasFoundation: false,
      });
    }
  }

  // 10. 10-Phase Breakdown
  const phaseBreakdown: PhaseCostItem[] = PRO_PHASES.map((ph) => ({
    ...ph,
    amount: Math.round((baseCost * ph.percentShare) / 100),
  }));

  // 11. 5-Stage Payment Plan
  const paymentSchedule: PaymentStageItem[] = PAYMENT_STAGES.map((st) => ({
    ...st,
    amount: Math.round((grandTotal * st.percentShare) / 100),
  }));

  // 12. Material Estimations
  const materialBOQ: MaterialBOQ = {
    cementBagsMin: Math.round(totalBuiltUpArea * 0.4),
    cementBagsMax: Math.round(totalBuiltUpArea * 0.45),
    steelKgMin: Math.round(totalBuiltUpArea * 3.5),
    steelKgMax: Math.round(totalBuiltUpArea * 4.0),
    msandCftMin: Math.round(totalBuiltUpArea * 1.8),
    aggregateCftMin: Math.round(totalBuiltUpArea * 1.2),
    bricksCountMin: Math.round(totalBuiltUpArea * 18),
    bricksCountMax: Math.round(totalBuiltUpArea * 20),
  };

  // 13. AI Vastu Plan
  const vastuPlan = generateAIVastuPlan(validPlotArea, builtUpPerFloor, validFloors);

  return {
    plotArea: validPlotArea,
    plotCents,
    plotGrounds,
    far,
    builtUpPerFloor,
    headroomArea,
    totalLivingBuiltUp,
    carParkingArea: validParking,
    totalBuiltUpArea,
    selectedPackage,
    selectedElevation,
    currentSoilProfile,
    baseCost,
    addonsCost,
    grandTotal,
    estimateLow,
    estimateHigh,
    costPerSqft,
    baseDurationMonths,
    durationLabel,
    emi,
    floorBreakdown,
    phaseBreakdown,
    paymentSchedule,
    materialBOQ,
    vastuPlan,
  };
}

export function formatIndianCurrency(amount: number): string {
  if (!amount || isNaN(amount)) return "₹0";
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function formatInLakhs(amount: number): string {
  if (!amount || isNaN(amount)) return "₹0.00 L";
  const lakhs = amount / 100000;
  return `₹${lakhs.toFixed(2)} L`;
}
