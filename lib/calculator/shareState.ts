import { CalculatorInputs } from "./calculations";

export interface SerializedCalculatorState {
  l?: string; // locality
  p?: number; // plotArea
  a?: number; // isAutoBuiltUp (1 or 0)
  c?: number; // customBuiltUpPerFloor
  f?: number; // floors
  b?: number; // bhk
  h?: string; // homeType
  k?: number; // parking area
  pkg?: string; // packageId
  e?: string; // elevation
  ad?: string[]; // active addon IDs
}

/**
 * Encodes safe calculator state into URL query parameter
 */
export function encodeCalculatorState(state: CalculatorInputs): string {
  try {
    const compact: SerializedCalculatorState = {
      l: state.localityKey,
      p: state.plotArea,
      a: state.isAutoBuiltUp ? 1 : 0,
      c: state.customBuiltUpPerFloor,
      f: state.floors,
      b: state.bhk,
      h: state.homeType,
      k: state.carParkingArea,
      pkg: state.packageId,
      e: state.elevationStyleId,
      ad: Object.entries(state.selectedAddons)
        .filter(([, v]) => v.enabled)
        .map(([k]) => k),
    };

    const jsonStr = JSON.stringify(compact);
    if (typeof window !== "undefined" && typeof window.btoa === "function") {
      return encodeURIComponent(window.btoa(jsonStr));
    }
    return encodeURIComponent(Buffer.from(jsonStr).toString("base64"));
  } catch {
    return "";
  }
}

/**
 * Decodes URL query parameter into CalculatorInputs
 */
export function decodeCalculatorState(encodedParam: string): Partial<CalculatorInputs> | null {
  if (!encodedParam) return null;
  try {
    let jsonStr = "";
    const decodedUri = decodeURIComponent(encodedParam);
    if (typeof window !== "undefined" && typeof window.atob === "function") {
      jsonStr = window.atob(decodedUri);
    } else {
      jsonStr = Buffer.from(decodedUri, "base64").toString("utf-8");
    }

    const compact: SerializedCalculatorState = JSON.parse(jsonStr);
    const addonsMap: Record<string, { enabled: boolean; customUnit?: number }> = {};
    if (Array.isArray(compact.ad)) {
      compact.ad.forEach((id) => {
        addonsMap[id] = { enabled: true };
      });
    }

    return {
      localityKey: compact.l || undefined,
      plotArea: compact.p || undefined,
      isAutoBuiltUp: compact.a !== undefined ? compact.a === 1 : undefined,
      customBuiltUpPerFloor: compact.c || undefined,
      floors: compact.f || undefined,
      bhk: compact.b || undefined,
      homeType: (compact.h as any) || undefined,
      carParkingArea: compact.k !== undefined ? compact.k : undefined,
      packageId: (compact.pkg as any) || undefined,
      elevationStyleId: compact.e || undefined,
      selectedAddons: Object.keys(addonsMap).length > 0 ? addonsMap : undefined,
    };
  } catch {
    return null;
  }
}
