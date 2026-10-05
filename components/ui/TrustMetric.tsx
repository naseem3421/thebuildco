import React from "react";

export interface TrustMetricProps {
  value: string;
  label: string;
  subtext?: string;
  dark?: boolean;
  className?: string;
}

export function TrustMetric({
  value,
  label,
  subtext,
  dark = false,
  className = "",
}: TrustMetricProps) {
  return (
    <div
      className={`flex flex-col p-5 sm:p-6 rounded-2xl border ${
        dark
          ? "bg-[#183B35]/40 border-[#244E46] text-[#F4F0E8]"
          : "bg-[#FBF9F4] border-[#D9D2C5]/70 text-[#183B35]"
      } shadow-luxury-sm ${className}`}
    >
      <div
        className={`font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight ${
          dark ? "text-[#E9E4D9]" : "text-[#B86F50]"
        }`}
      >
        {value}
      </div>
      <div
        className={`mt-2 font-medium text-sm sm:text-base ${
          dark ? "text-[#F4F0E8]" : "text-[#183B35]"
        }`}
      >
        {label}
      </div>
      {subtext && (
        <div
          className={`mt-1 text-xs sm:text-sm ${
            dark ? "text-[#8C9C96]" : "text-[#52655E]"
          }`}
        >
          {subtext}
        </div>
      )}
    </div>
  );
}
