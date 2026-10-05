import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { ProjectsDirectory } from "@/components/projects/ProjectsDirectory";

export const metadata: Metadata = {
  title: "Selected Construction Projects in Chennai",
  description:
    "Explore our portfolio of completed individual houses, luxury villas, and duplex homes constructed on customer-owned plots in Chennai.",
};

export default function ProjectsPage() {
  return (
    <div className="py-12 sm:py-20 flex flex-col gap-12 sm:gap-16">
      <section>
        <Container size="wide">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <Badge variant="terracotta" className="mb-4">
              Chennai Portfolio
            </Badge>

            <h1 className="font-display text-4xl sm:text-6xl font-medium text-[#183B35] leading-tight">
              Selected Projects
            </h1>

            <p className="mt-4 text-base sm:text-lg text-[#52655E] leading-relaxed">
              Every residence shown was custom-engineered and constructed on our clients&apos; own plots across Chennai, OMR, ECR, Medavakkam, and Tambaram.
            </p>
          </div>

          <ProjectsDirectory />
        </Container>
      </section>
    </div>
  );
}
