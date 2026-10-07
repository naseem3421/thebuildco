import React from "react";
import { Badge } from "./Badge";

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  subtitle?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  subtitle,
  align = "center",
  dark = false,
  className = "",
}: SectionHeadingProps) {
  const isCenter = align === "center";
  const descText = description || subtitle;

  return (
    <div
      className={`flex flex-col ${
        isCenter ? "items-center text-center mx-auto" : "items-start text-left"
      } max-w-3xl ${className}`}
    >
      {eyebrow && (
        <div className="mb-3">
          <Badge variant={dark ? "sand" : "terracotta"}>{eyebrow}</Badge>
        </div>
      )}

      <h2
        className={`font-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight leading-[1.15] ${
          dark ? "text-[#F4F0E8]" : "text-[#183B35]"
        }`}
      >
        {title}
      </h2>

      {descText && (
        <p
          className={`mt-4 text-base sm:text-lg leading-relaxed ${
            dark ? "text-[#D9D2C5]" : "text-[#52655E]"
          }`}
        >
          {descText}
        </p>
      )}
    </div>
  );
}
