import React from "react";
import Image from "next/image";
import { Badge } from "./Badge";

export interface ImageCardProps {
  src: string;
  alt: string;
  aspectRatio?: "16/9" | "4/3" | "1/1" | "3/4" | "21/9";
  title?: string;
  category?: string;
  caption?: string;
  priority?: boolean;
  className?: string;
  badge?: string;
}

export function ImageCard({
  src,
  alt,
  aspectRatio = "16/9",
  title,
  category,
  caption,
  priority = false,
  className = "",
  badge,
}: ImageCardProps) {
  const aspectClasses = {
    "16/9": "aspect-[16/9]",
    "4/3": "aspect-[4/3]",
    "1/1": "aspect-square",
    "3/4": "aspect-[3/4]",
    "21/9": "aspect-[21/9]",
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-[#D9D2C5]/70 bg-[#E9E4D9] shadow-luxury-sm transition-all duration-300 hover:shadow-luxury-md ${className}`}
    >
      <div className={`relative w-full ${aspectClasses[aspectRatio]} overflow-hidden`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E2420]/70 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
      </div>

      {badge && (
        <div className="absolute top-4 left-4 z-10">
          <Badge variant="white">{badge}</Badge>
        </div>
      )}

      {(title || caption || category) && (
        <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 text-white z-10">
          {category && (
            <span className="text-xs font-semibold uppercase tracking-wider text-[#E9E4D9] mb-1 block">
              {category}
            </span>
          )}
          {title && (
            <h3 className="font-display text-xl sm:text-2xl font-normal leading-snug text-[#FBF9F4]">
              {title}
            </h3>
          )}
          {caption && (
            <p className="mt-1 text-xs sm:text-sm text-[#D9D2C5] line-clamp-2">
              {caption}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
