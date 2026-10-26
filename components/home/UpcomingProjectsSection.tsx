import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { MapPin, Maximize2, ArrowRight } from "lucide-react";

interface UpcomingProject {
  id: string;
  title: string;
  location: string;
  type: string;
  area: string;
  tag: string;
  imageUrl: string;
  scope: string;
}

const UPCOMING_PROJECTS: UpcomingProject[] = [
  {
    id: "serene-meadows-villa",
    title: "Serene Meadows Villa",
    location: "Perungudi, Chennai",
    type: "Modern Villa",
    area: "3,800 sqft",
    tag: "Upcoming",
    imageUrl: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
    scope: "Turnkey Design & Civil Build",
  },
  {
    id: "the-courtyard-residence",
    title: "The Courtyard Residence",
    location: "Adyar, Chennai",
    type: "Individual House",
    area: "4,200 sqft",
    tag: "Upcoming",
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    scope: "Architectural Planning & Civil",
  },
  {
    id: "skyline-crest-residence",
    title: "Skyline Crest Residence",
    location: "Velachery, Chennai",
    type: "Duplex Home",
    area: "3,250 sqft",
    tag: "Upcoming",
    imageUrl: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
    scope: "Turnkey RCC Frame & Interiors",
  },
  {
    id: "the-terraces-at-porur",
    title: "The Terraces at Porur",
    location: "Porur, Chennai",
    type: "Modern Villa",
    area: "3,600 sqft",
    tag: "Upcoming",
    imageUrl: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
    scope: "Turnkey Design & Civil Build",
  },
  {
    id: "boulevard-greens",
    title: "Boulevard Greens",
    location: "Besant Nagar, Chennai",
    type: "Coastal Residence",
    area: "4,400 sqft",
    tag: "Upcoming",
    imageUrl: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
    scope: "Bespoke Structural Engineering",
  },
  {
    id: "alwarpet-heritage-modern",
    title: "Alwarpet Heritage Modern",
    location: "Alwarpet, Chennai",
    type: "Luxury Residence",
    area: "3,950 sqft",
    tag: "Upcoming",
    imageUrl: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80",
    scope: "Turnkey Design, Civil & Finish",
  },
];

export function UpcomingProjectsSection() {
  // Duplicated for smooth infinite looping animation
  const infiniteProjects = [...UPCOMING_PROJECTS, ...UPCOMING_PROJECTS];

  return (
    <section id="upcoming-projects" className="py-10 sm:py-14 bg-[#FAF8F5] border-b border-neutral-200 overflow-hidden">
      <Container size="wide">
        <SectionHeading
          title="Upcoming Projects"
          subtitle="Architectural designs and scheduled turnkey residential constructions breaking ground across Chennai."
          align="center"
        />
      </Container>

      {/* Infinite Carousel Slider Track */}
      <div className="mt-6 sm:mt-7 relative w-full overflow-hidden">
        {/* Ambient fade gradients on edges */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/80 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-[#FAF8F5] via-[#FAF8F5]/80 to-transparent z-10" />

        <div className="animate-slide-left-to-right py-4">
          {infiniteProjects.map((project, idx) => (
            <div
              key={`${project.id}-${idx}`}
              className="w-[300px] sm:w-[360px] md:w-[380px] shrink-0 mx-3 group rounded-3xl overflow-hidden bg-white border border-neutral-200/90 shadow-xs hover:shadow-luxury-md hover:border-[#EA580C]/40 transition-all flex flex-col justify-between"
            >
              {/* Image Frame */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100">
                <Image
                  src={project.imageUrl}
                  alt={`${project.title} - ${project.type} in ${project.location} by The Build Company`}
                  fill
                  sizes="(max-width: 768px) 300px, 380px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Overlaid Badges */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-white text-neutral-900 shadow-xs">
                    {project.type}
                  </span>
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#183B35] text-white shadow-xs">
                    {project.tag}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-2 text-xs text-neutral-200 mb-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#EA580C]" />
                    <span>{project.location}</span>
                    <span>•</span>
                    <Maximize2 className="w-3.5 h-3.5 text-[#EA580C]" />
                    <span>{project.area}</span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-semibold text-white">
                    {project.title}
                  </h3>
                </div>
              </div>

              {/* Scope & CTA */}
              <div className="p-5 bg-white border-t border-neutral-100 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-500 block">
                    Execution Scope
                  </span>
                  <span className="text-xs font-bold text-neutral-900 truncate max-w-[170px] block">
                    {project.scope}
                  </span>
                </div>

                <a
                  href="#consultation"
                  className="px-4 py-2 rounded-full bg-[#FFF7F3] hover:bg-[#FFEDE0] border border-[#FFD9C6] text-xs font-bold text-[#EA580C] transition-colors inline-flex items-center gap-1.5 shadow-xs shrink-0"
                >
                  <span>Inquire Now</span>
                  <ArrowRight className="w-3 h-3 text-[#EA580C]" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Container size="wide">
        <div className="mt-8 text-center">
          <a
            href="#consultation"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-neutral-900 text-white font-semibold text-xs sm:text-sm hover:bg-neutral-800 transition-colors shadow-luxury-sm group"
          >
            <span>Plan Your Custom Build With The Build Company</span>
            <ArrowRight className="w-4 h-4 text-[#EA580C] group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </Container>
    </section>
  );
}
