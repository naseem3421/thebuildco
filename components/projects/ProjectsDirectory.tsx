"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig, ProjectItem } from "@/config/site";
import { Container } from "../ui/Container";
import { Badge } from "../ui/Badge";
import { MapPin, Maximize2, Clock, ArrowUpRight } from "lucide-react";

export function ProjectsDirectory() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "Individual Houses",
    "Villas",
    "Duplex",
  ];

  const filteredProjects =
    selectedCategory === "All"
      ? siteConfig.projects
      : siteConfig.projects.filter(
          (p) =>
            p.type.toLowerCase().includes(selectedCategory.toLowerCase()) ||
            selectedCategory.toLowerCase().includes(p.type.toLowerCase())
        );

  return (
    <div>
      <Container size="wide">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12 sm:mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#183B35] text-[#F4F0E8] shadow-luxury-sm"
                  : "bg-[#FBF9F4] text-[#183B35] border border-[#D9D2C5] hover:bg-[#E9E4D9]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project: ProjectItem) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="group flex flex-col rounded-3xl overflow-hidden bg-[#FBF9F4] border border-[#D9D2C5] shadow-luxury-sm hover:shadow-luxury-md transition-all duration-300 hover:-translate-y-1 focus-visible:outline-none"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#E9E4D9]">
                <Image
                  src={project.imageUrl}
                  alt={`${project.title} - ${project.type} in ${project.location} by TBC`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E2420]/80 via-[#0E2420]/20 to-transparent" />

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

                  <h3 className="font-display text-2xl sm:text-3xl font-medium text-[#FBF9F4] group-hover:text-[#E9E4D9] transition-colors">
                    {project.title}
                  </h3>
                </div>
              </div>

              {/* Bottom Details */}
              <div className="p-6 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-[#52655E]">
                    <span className="flex items-center gap-1 font-medium text-[#183B35]">
                      <Clock className="w-3.5 h-3.5 text-[#B86F50]" /> {project.duration}
                    </span>
                    <span>•</span>
                    <span>{project.packageUsed}</span>
                  </div>
                </div>

                <div className="w-9 h-9 rounded-full border border-[#D9D2C5] flex items-center justify-center text-[#183B35] group-hover:bg-[#B86F50] group-hover:text-white group-hover:border-[#B86F50] transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
