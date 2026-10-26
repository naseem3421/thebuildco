import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { MapPin, Maximize2, ArrowRight } from "lucide-react";

interface CompletedProject {
  id: string;
  slug: string;
  title: string;
  location: string;
  type: string;
  area: string;
  tag: string;
  imageUrl: string;
  scope: string;
}

const COMPLETED_PROJECTS: CompletedProject[] = [
  {
    id: "greenfield-residence",
    slug: "greenfield-residence",
    title: "Greenfield Residence",
    location: "Medavakkam, Chennai",
    type: "Individual House",
    area: "2,850 sqft",
    tag: "Completed",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    scope: "Turnkey Design & Civil Build",
  },
  {
    id: "palm-grove-villa",
    slug: "palm-grove-villa",
    title: "Palm Grove Villa",
    location: "Sholinganallur, Chennai",
    type: "Luxury Villa",
    area: "4,200 sqft",
    tag: "Completed",
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    scope: "Turnkey Design & Civil Build",
  },
  {
    id: "lakeview-residence",
    slug: "lakeview-residence",
    title: "Lakeview Residence",
    location: "Tambaram, Chennai",
    type: "Modern Duplex",
    area: "3,100 sqft",
    tag: "Completed",
    imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    scope: "Turnkey Design & Civil Build",
  },
  {
    id: "urban-edge",
    slug: "urban-edge",
    title: "Urban Edge",
    location: "OMR, Chennai",
    type: "Contemporary House",
    area: "3,650 sqft",
    tag: "Completed",
    imageUrl: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
    scope: "Turnkey Design & Civil Build",
  },
  {
    id: "mayflower-manor",
    slug: "greenfield-residence",
    title: "Mayflower Manor",
    location: "Anna Nagar, Chennai",
    type: "Premium Villa",
    area: "4,500 sqft",
    tag: "Completed",
    imageUrl: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
    scope: "Architectural Planning & Civil",
  },
  {
    id: "emerald-grove",
    slug: "palm-grove-villa",
    title: "Emerald Grove Residence",
    location: "ECR, Chennai",
    type: "Beachside Residence",
    area: "5,100 sqft",
    tag: "Completed",
    imageUrl: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80",
    scope: "Bespoke Luxury Construction",
  },
];

export function ProjectsSection() {
  // Duplicated for smooth infinite looping animation
  const infiniteProjects = [...COMPLETED_PROJECTS, ...COMPLETED_PROJECTS];

  return (
    <section id="projects" className="py-10 sm:py-14 bg-white border-b border-neutral-200 overflow-hidden">
      <Container size="wide">
        <SectionHeading
          title="Recently Completed Projects"
          subtitle="Engineered and delivered exclusively on client-owned residential plots across Chennai."
          align="center"
        />
      </Container>

      {/* Infinite Carousel Slider Track */}
      <div className="mt-6 sm:mt-7 relative w-full overflow-hidden">
        {/* Ambient fade gradients on edges */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

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
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#EA580C] text-white shadow-xs">
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

              {/* Case Study Scope & CTA */}
              <div className="p-5 bg-[#FAF8F5] border-t border-neutral-100 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-500 block">
                    Execution Scope
                  </span>
                  <span className="text-xs font-bold text-neutral-900 truncate max-w-[170px] block">
                    {project.scope}
                  </span>
                </div>

                <Link
                  href={`/projects/${project.slug}`}
                  className="px-4 py-2 rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-xs font-bold text-neutral-900 transition-colors inline-flex items-center gap-1.5 shadow-xs shrink-0"
                >
                  <span>View Project</span>
                  <ArrowRight className="w-3 h-3 text-[#EA580C]" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Container size="wide">
        <div className="mt-8 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-neutral-900 text-white font-semibold text-xs sm:text-sm hover:bg-neutral-800 transition-colors shadow-luxury-sm group"
          >
            <span>View All Completed Projects</span>
            <ArrowRight className="w-4 h-4 text-[#EA580C] group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
