"use client";

import { useEffect } from "react";
import { trackViewPackage } from "@/lib/analytics";

export interface TrackPackageViewProps {
  packageName: string;
  pricePerSqft: number;
}

export function TrackPackageView({ packageName, pricePerSqft }: TrackPackageViewProps) {
  useEffect(() => {
    trackViewPackage({
      package_name: packageName,
      price_per_sqft: pricePerSqft,
    });
  }, [packageName, pricePerSqft]);

  return null;
}
