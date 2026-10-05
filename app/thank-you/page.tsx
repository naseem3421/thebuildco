import React, { Suspense } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  CheckCircle2,
  MessageCircle,
  Phone,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Building,
} from "lucide-react";

function ThankYouContent() {
  return (
    <div className="py-16 sm:py-24">
      <Container size="narrow">
        <div className="rounded-3xl bg-[#FBF9F4] border border-[#D9D2C5] p-8 sm:p-14 shadow-luxury-md text-center flex flex-col items-center">
          {/* Animated Success Badge */}
          <div className="w-20 h-20 rounded-full bg-[#F7EDE8] border-2 border-[#B86F50] flex items-center justify-center text-[#B86F50] mb-6 shadow-luxury-sm">
            <CheckCircle2 className="w-10 h-10 text-[#1E7E34]" />
          </div>

          <Badge variant="terracotta" size="md" className="mb-3">
            Enquiry Confirmed
          </Badge>

          <h1 className="font-display text-3xl sm:text-5xl font-medium text-[#183B35] leading-tight">
            Thank You — We&apos;ve Received Your Enquiry.
          </h1>

          <p className="mt-4 text-base sm:text-lg text-[#52655E] max-w-xl leading-relaxed">
            Our chief civil engineer is reviewing your plot specifications and will reach out to you within 30 minutes to discuss your architectural floor plan and schedule a site visit.
          </p>

          {/* Key Assurance Cards */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full text-left">
            <div className="p-4 rounded-2xl bg-[#F4F0E8] border border-[#D9D2C5]">
              <Calendar className="w-5 h-5 text-[#B86F50] mb-2" />
              <h4 className="font-semibold text-xs text-[#183B35]">Free Site Visit</h4>
              <p className="text-[11px] text-[#52655E] mt-0.5">Plot soil & topography check with zero obligation.</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F4F0E8] border border-[#D9D2C5]">
              <Building className="w-5 h-5 text-[#B86F50] mb-2" />
              <h4 className="font-semibold text-xs text-[#183B35]">Custom Blueprints</h4>
              <p className="text-[11px] text-[#52655E] mt-0.5">2D architectural floor plan calibrated to your budget.</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F4F0E8] border border-[#D9D2C5]">
              <ShieldCheck className="w-5 h-5 text-[#B86F50] mb-2" />
              <h4 className="font-semibold text-xs text-[#183B35]">Itemized BOQ</h4>
              <p className="text-[11px] text-[#52655E] mt-0.5">Transparent sqft costing with zero hidden clauses.</p>
            </div>
          </div>

          {/* Immediate Action Buttons */}
          <div className="mt-10 pt-8 border-t border-[#D9D2C5] w-full flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              variant="whatsapp"
              size="lg"
              href={siteConfig.contact.whatsappHref}
              leftIcon={<MessageCircle className="w-4 h-4" />}
              className="w-full sm:w-auto"
            >
              Chat on WhatsApp
            </Button>

            <Button
              variant="secondary"
              size="lg"
              href={siteConfig.contact.phoneHref}
              leftIcon={<Phone className="w-4 h-4 text-[#B86F50]" />}
              className="w-full sm:w-auto"
            >
              Call Now: {siteConfig.contact.phoneDisplay}
            </Button>

            <Button
              variant="outline"
              size="lg"
              href="/#projects"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="w-full sm:w-auto"
            >
              View Projects
            </Button>
          </div>

          <div className="mt-8 text-xs text-[#52655E]">
            <Link href="/" className="text-[#183B35] font-semibold hover:underline">
              ← Return to Homepage
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-[#183B35]">Loading confirmation...</div>}>
      <ThankYouContent />
    </Suspense>
  );
}
