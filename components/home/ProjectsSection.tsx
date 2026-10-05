import React from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Badge } from "../ui/Badge";
import { MapPin, Maximize2 } from "lucide-react";

export function ProjectsSection() {
  return (
    <section id="projects" className="py-16 sm:py-24 bg-[#E9E4D9]/40 border-y border-[#D9D2C5]/80 scroll-mt-20">
      <Container size="wide">
        <SectionHeading
          eyebrow="Portfolio & Execution"
          title="Selected Projects"
          description="A curation of turnkey residences and bespoke structures engineered across Chennai's premier residential corridors."
          align="center"
        />

        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {siteConfig.projects.map((project) => (
            <div
              key={project.id}
              className="group relative rounded-3xl overflow-hidden bg-[#FBF9F4] border border-[#D9D2C5] shadow-luxury-sm hover:shadow-luxury-md transition-all duration-300"
            >
              {/* Image Frame */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#E9E4D9]">
                <Image
                  src={project.imageUrl}
                  alt={`${project.title} - ${project.type} in ${project.location} by TBC`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E2420]/80 via-[#0E2420]/20 to-transparent" />

                {/* Overlaid Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge variant="white">{project.type}</Badge>
                  <Badge variant="sand">{project.tag}</Badge>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-2 text-xs text-[#E9E4D9] mb-1">
                    <MapPin className="w-3.5 h-3.5 text-[#B86F50]" />
                    <span>{project.location}</span>
                    <span>•</span>
                    <Maximize2 className="w-3.5 h-3.5 text-[#B86F50]" />
                    <span>{project.area}</span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-medium text-[#FBF9F4]">
                    {project.title}
                  </h3>
                </div>
              </div>

              {/* Bottom Project Details Bar */}
              <div className="p-5 sm:p-6 flex items-center justify-between bg-[#FBF9F4]">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#52655E] block">
                    Scope of Work
                  </span>
                  <span className="text-sm font-semibold text-[#183B35]">
                    Turnkey Architectural & Civil Construction
                  </span>
                </div>

                <a
                  href="#contact"
                  className="text-xs font-semibold text-[#B86F50] hover:text-[#9D5C42] transition-colors"
                >
                  View Blueprint Specs →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Portfolio Action Prompt */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-3xl bg-[#183B35] text-[#F4F0E8] shadow-luxury-md">
          <div>
            <h4 className="font-display text-2xl font-normal text-[#FBF9F4]">
              Have an architectural concept in mind for your plot?
            </h4>
            <p className="mt-1 text-xs sm:text-sm text-[#D9D2C5]">
              Our architects create 3D elevations and custom layout plans matched to Chennai development regulations.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#contact"
              className="px-6 py-3 rounded-full bg-[#B86F50] text-white hover:bg-[#9D5C42] text-xs font-semibold tracking-wider uppercase transition-colors shadow-luxury-sm"
            >
              Request 3D Concept →
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
