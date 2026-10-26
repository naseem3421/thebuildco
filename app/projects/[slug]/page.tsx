import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig, getWhatsAppUrl } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { LeadForm } from "@/components/forms/LeadForm";
import { TrackProjectView } from "@/components/analytics/TrackProjectView";
import {
  MapPin,
  Maximize2,
  Clock,
  ShieldCheck,
  Check,
  MessageCircle,
  ArrowLeft,
} from "lucide-react";

export async function generateStaticParams() {
  return siteConfig.projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const project = siteConfig.projects.find((p) => p.slug === resolvedParams.slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} — ${project.location}`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const project = siteConfig.projects.find((p) => p.slug === resolvedParams.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="py-12 sm:py-20 flex flex-col gap-12 sm:gap-16">
      <TrackProjectView
        projectName={project.title}
        location={project.location}
        builtUpArea={project.area}
      />
      <Container size="wide">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#52655E] hover:text-[#183B35] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Projects</span>
          </Link>
        </div>

        {/* Project Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#D9D2C5]">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="terracotta">{project.type}</Badge>
              <Badge variant="sand">{project.tag}</Badge>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl font-medium text-[#183B35] leading-tight">
              {project.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-[#52655E]">
              <span className="flex items-center gap-1.5 font-medium text-[#183B35]">
                <MapPin className="w-4 h-4 text-[#B86F50]" /> {project.location}
              </span>
              <span className="flex items-center gap-1.5 font-medium text-[#183B35]">
                <Maximize2 className="w-4 h-4 text-[#B86F50]" /> {project.area}
              </span>
              <span className="flex items-center gap-1.5 font-medium text-[#183B35]">
                <Clock className="w-4 h-4 text-[#B86F50]" /> {project.duration}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Button
              variant="whatsapp"
              size="md"
              href={getWhatsAppUrl(`Hi The Build Company, I really like your ${project.title} project in ${project.location}. I would like to build a similar home on my plot.`)}
              leftIcon={<MessageCircle className="w-4 h-4" />}
            >
              Ask About This Design
            </Button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Main Photo (8 cols) */}
          <div className="md:col-span-8 relative aspect-[16/10] rounded-3xl overflow-hidden border border-[#D9D2C5] shadow-luxury-md">
            <Image
              src={project.gallery[0] || project.imageUrl}
              alt={`${project.title} main exterior`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover"
            />
          </div>

          {/* Sub Photos (4 cols) */}
          <div className="md:col-span-4 flex flex-col gap-6">
            {project.gallery.slice(1, 3).map((img, idx) => (
              <div
                key={idx}
                className="relative aspect-[16/10] sm:aspect-auto flex-1 rounded-2xl overflow-hidden border border-[#D9D2C5] shadow-luxury-sm"
              >
                <Image
                  src={img}
                  alt={`${project.title} detail view ${idx + 1}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Project Details Split */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left: Description & Specs (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-medium text-[#183B35]">
                Project Architectural Overview
              </h2>
              <p className="mt-4 text-base sm:text-lg text-[#52655E] leading-relaxed">
                {project.description}
              </p>
            </div>

            <div>
              <h3 className="font-display text-xl sm:text-2xl font-medium text-[#183B35] mb-4">
                Key Structural Specifications & Materials
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {project.keySpecs.map((spec, sidx) => (
                  <div
                    key={sidx}
                    className="p-4 rounded-2xl bg-[#FBF9F4] border border-[#D9D2C5] flex items-start gap-3 shadow-luxury-sm"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#F7EDE8] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-[#B86F50]" />
                    </div>
                    <span className="text-xs sm:text-sm text-[#52655E] leading-snug">
                      {spec}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#E9E4D9]/50 border border-[#D9D2C5] flex items-center gap-4">
              <ShieldCheck className="w-8 h-8 text-[#B86F50] shrink-0" />
              <div className="text-xs text-[#52655E]">
                <strong className="text-[#183B35] block text-sm">Pre-Handover Snag Audit & Certified Clearance</strong>
                Constructed under The Build Company&apos;s 150-point civil inspection protocol with verified lab test reports.
              </div>
            </div>
          </div>

          {/* Right: Custom Inquiry Form for this design (5 cols) */}
          <div className="lg:col-span-5 rounded-3xl bg-[#FBF9F4] border border-[#D9D2C5] p-8 shadow-luxury-md">
            <h3 className="font-display text-2xl font-medium text-[#183B35]">
              Build a similar home on your plot
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[#52655E] mb-6">
              Our in-house design and engineering team will review your plot layout and prepare a custom blueprint estimate.
            </p>

            <LeadForm
              source={`project_detail_${project.slug}`}
              buttonLabel="Request Custom Blueprint"
              prefillArea={project.area.replace(/\D/g, "")}
              prefillPackage={project.packageUsed}
              variant="compact"
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
