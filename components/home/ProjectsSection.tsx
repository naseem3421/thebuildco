import React from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { MapPin, Maximize2, ArrowRight, CheckCircle2 } from "lucide-react";

export function ProjectsSection() {
  return (
    <section id="projects" className="py-16 sm:py-24 bg-white border-b border-neutral-200">
      <Container size="wide">
        <SectionHeading
          eyebrow="REAL CHENNAI CASE STUDIES"
          title="Selected Residential Projects"
          subtitle="Delivered exclusively on client-owned residential plots across Chennai's premier residential corridors."
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {siteConfig.projects.map((project) => (
            <div
              key={project.id}
              className="group rounded-3xl overflow-hidden bg-white border border-neutral-200/90 shadow-xs hover:shadow-luxury-md hover:border-[#EA580C]/40 transition-all flex flex-col justify-between"
            >
              {/* Image Frame */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100">
                <Image
                  src={project.imageUrl}
                  alt={`${project.title} - ${project.type} in ${project.location} by TBC`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Overlaid Badges */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-white text-neutral-900 shadow-xs">
                    {project.type}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#EA580C] text-white shadow-xs">
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

                  <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white">
                    {project.title}
                  </h3>
                </div>
              </div>

              {/* Case Study Metadata */}
              <div className="p-6 bg-[#FAF8F5] border-t border-neutral-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] uppercase font-bold tracking-wider text-neutral-500 block">
                    Execution Scope
                  </span>
                  <span className="text-sm font-bold text-neutral-900">
                    Turnkey Architectural & Civil Construction
                  </span>
                </div>

                <Link
                  href={`/projects/${project.slug}`}
                  className="px-5 py-2.5 rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-xs font-bold text-neutral-900 transition-colors inline-flex items-center gap-1.5 shadow-xs"
                >
                  <span>View Project</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#EA580C]" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-neutral-900 text-white font-semibold text-sm hover:bg-neutral-800 transition-colors shadow-luxury-sm"
          >
            <span>See Our Completed Projects</span>
            <ArrowRight className="w-4 h-4 text-[#EA580C]" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
