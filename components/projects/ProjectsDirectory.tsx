"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig, ProjectItem } from "@/config/site";
import { Container } from "../ui/Container";
import { Badge } from "../ui/Badge";
import { MapPin, Maximize2, Clock, ArrowUpRight } from "lucide-react";

interface OnSitePhoto {
  id: string;
  stage: string;
  title: string;
  location: string;
  qaCheck: string;
  imageUrl: string;
  statusBadge: string;
}

const ON_SITE_PROGRESS_PHOTOS: OnSitePhoto[] = [
  {
    id: "site-foundation",
    stage: "Stage 01 • Sub-Structure",
    title: "Isolated Footing & Column Starter Rebar Binding",
    location: "Medavakkam Plot, Chennai",
    qaCheck: "Soil bearing capacity verified (SBC 180 kN/m²); Fe 550D rebar cover block clearance checked.",
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb18615f8?auto=format&fit=crop&w=1200&q=80",
    statusBadge: "Verified Passed",
  },
  {
    id: "site-shuttering",
    stage: "Stage 02 • RCC Framing",
    title: "First-Floor Beam & Slab Shuttering Alignment",
    location: "OMR IT Corridor, Chennai",
    qaCheck: "Laser level plumb check on staging props; 100% waterproof shuttering plywood verified.",
    imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
    statusBadge: "Verified Passed",
  },
  {
    id: "site-slab-pour",
    stage: "Stage 03 • Concreting",
    title: "M25 High-Strength Slab Pour & Cube Sampling",
    location: "Sholinganallur Plot, Chennai",
    qaCheck: "6 concrete cubes sampled for 7-day & 28-day compressive lab crush tests; slump test recorded at 110mm.",
    imageUrl: "https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&w=1200&q=80",
    statusBadge: "Lab Tested",
  },
  {
    id: "site-brickwork",
    stage: "Stage 04 • Superstructure",
    title: "Chamber Clay Brick Masonry & Lintel Bands",
    location: "Porur Residence, Chennai",
    qaCheck: "Mortar ratio 1:5; continuous seismic sill and lintel concrete bands cast across all openings.",
    imageUrl: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=1200&q=80",
    statusBadge: "Inspected",
  },
  {
    id: "site-ponding",
    stage: "Stage 05 • Waterproofing",
    title: "72-Hour Full Submersion Terrace Ponding Test",
    location: "Tambaram Plot, Chennai",
    qaCheck: "100mm water depth maintained continuously for 72 hours; zero underside dampness certified.",
    imageUrl: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80",
    statusBadge: "72-Hr Pass",
  },
  {
    id: "site-snag",
    stage: "Stage 06 • Handover",
    title: "Laser Level Flooring & Pre-Handover Snag Clearance",
    location: "Besant Nagar, Chennai",
    qaCheck: "360° laser tile slope inspection, MEP pressure test, and 150-point zero-snag sign-off.",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    statusBadge: "Handover Ready",
  },
];

export function ProjectsDirectory() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "On-Site Progress Photos",
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
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 sm:mb-12">
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

        {/* Project Grid / On-Site Progress Grid */}
        {selectedCategory === "On-Site Progress Photos" ? (
          <div className="space-y-6">
            <div className="p-4 sm:p-5 rounded-2xl bg-[#E9E4D9]/40 border border-[#D9D2C5] flex flex-wrap items-center justify-between gap-3 text-xs text-[#52655E]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#15803D] animate-pulse" />
                <span className="font-bold text-[#183B35]">Realtime On-Site Telemetry:</span>
                <span>Active project sites across Chennai under dedicated civil supervision.</span>
              </div>
              <span className="font-mono text-[11px] font-semibold text-[#8C9C96]">6 Active Stage Gateways</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ON_SITE_PROGRESS_PHOTOS.map((photo) => (
                <div
                  key={photo.id}
                  className="rounded-3xl overflow-hidden bg-[#FBF9F4] border border-[#D9D2C5] shadow-luxury-sm hover:shadow-luxury-md transition-all flex flex-col justify-between group"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#E9E4D9]">
                    <Image
                      src={photo.imageUrl}
                      alt={`${photo.title} at ${photo.location}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E2420]/80 via-[#0E2420]/20 to-transparent" />

                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#183B35]/90 text-white backdrop-blur-xs">
                        {photo.stage}
                      </span>
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#15803D] text-white">
                        {photo.statusBadge}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="flex items-center gap-1.5 text-xs text-[#E9E4D9] mb-0.5">
                        <MapPin className="w-3.5 h-3.5 text-[#B86F50]" />
                        <span>{photo.location}</span>
                      </div>
                      <h4 className="font-display text-base font-semibold text-white leading-snug">
                        {photo.title}
                      </h4>
                    </div>
                  </div>

                  <div className="p-4 bg-white border-t border-[#D9D2C5]/70 space-y-2">
                    <div className="text-[11px] text-[#52655E] leading-relaxed">
                      <strong className="text-[#183B35] font-semibold block mb-0.5">Civil QA Gateway Check:</strong>
                      {photo.qaCheck}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
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
                    alt={`${project.title} - ${project.type} in ${project.location} by The Build Company`}
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
        )}
      </Container>
    </div>
  );
}
