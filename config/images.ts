/**
 * Image Registry & Configuration
 * Provides centralized slots for project renders, site execution photography, hero visuals, and architectural textures.
 */

export interface ImageSlot {
  id: string;
  category: "hero" | "project" | "service" | "process" | "team" | "testimonial";
  title: string;
  alt: string;
  placeholderUrl: string;
  aspectRatio: "16/9" | "4/3" | "1/1" | "3/4" | "21/9";
  caption?: string;
  blurDataUrl?: string;
}

export const imageSlots: Record<string, ImageSlot> = {
  heroMain: {
    id: "hero-main",
    category: "hero",
    title: "Contemporary Architectural Residence in Chennai",
    alt: "Modern luxury villa exterior designed and constructed by The Build Company in Chennai",
    placeholderUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    aspectRatio: "16/9",
    caption: "Bespoke residential project in ECR, Chennai",
  },
  projectVilla1: {
    id: "project-villa-1",
    category: "project",
    title: "The Glass House Villa",
    alt: "Double-height contemporary villa with glass facade and teak louvers",
    placeholderUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    aspectRatio: "4/3",
    caption: "3,800 sqft Luxury Villa in OMR",
  },
  projectDuplex1: {
    id: "project-duplex-1",
    category: "project",
    title: "Urban Minimalist Duplex",
    alt: "Modern minimalist residential duplex home with stone cladding",
    placeholderUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    aspectRatio: "4/3",
    caption: "2,600 sqft Modern Duplex in Anna Nagar",
  },
  projectCommercial1: {
    id: "project-commercial-1",
    category: "project",
    title: "Boutique Retail & Commercial Complex",
    alt: "Modern commercial building with clean lines and structural glazing",
    placeholderUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    aspectRatio: "4/3",
    caption: "6,500 sqft Commercial Space in Velachery",
  },
  serviceHouses: {
    id: "service-houses",
    category: "service",
    title: "Individual Custom Houses",
    alt: "Individual residential house construction with landscaped frontage",
    placeholderUrl: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1000&q=80",
    aspectRatio: "4/3",
  },
  serviceCommercial: {
    id: "service-commercial",
    category: "service",
    title: "Commercial & Mixed-Use Construction",
    alt: "Commercial building and warehouse construction in Chennai",
    placeholderUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80",
    aspectRatio: "4/3",
  },
  processSiteInspection: {
    id: "process-site-inspection",
    category: "process",
    title: "Precision Site Soil & Topographical Survey",
    alt: "Architects and civil engineers reviewing blueprints on client land",
    placeholderUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80",
    aspectRatio: "16/9",
  },
};
