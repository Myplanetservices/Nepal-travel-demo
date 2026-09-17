"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BeforeAfterSection } from "@/components/landing/BeforeAfterSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { CaseStudiesSection } from "@/components/landing/CaseStudiesSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { ContactSection } from "@/components/landing/ContactSection";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { PreviewGeneratorModal } from "@/components/landing/PreviewGeneratorModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Mountain, Globe } from "lucide-react";

export default function DemoAgencyPortfolioPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | undefined>(undefined);

  const handleOpenPreview = () => {
    setModalOpen(true);
  };

  const handleRequestQuote = (plan: string) => {
    setSelectedPlan(plan);
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-background text-foreground">
      {/* Introduction Hero Strip */}
      <section className="bg-[#2D4A34] text-[#F5F3EF] py-14 border-b border-[#7C8A96]/20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl relative z-10">
          <Badge className="bg-[#7FA05C] text-white border-none font-bold text-xs mb-3">
            <Sparkles className="size-3 mr-1 text-[#D9A23B]" /> My Planet Services · Nepal Travel Tech Studio
          </Badge>

          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white">
            High-Converting 3D Websites & Booking Engines for Nepal Travel Agencies
          </h1>

          <p className="mt-4 text-xs sm:text-sm text-[#F5F3EF]/90 leading-relaxed font-medium">
            Turn browsers into direct bookings. We engineer interactive 3D terrain previews, multi-currency deposit checkout, and automated WhatsApp inquiry flows that eliminate 20%+ OTA commissions.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button
              variant="primary"
              size="md"
              onClick={handleOpenPreview}
              className="bg-[#7FA05C] hover:bg-[#6E8C4E] text-white font-bold text-xs"
            >
              Generate Instant Agency Demo
            </Button>
            <Link
              href="/"
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#F5F3EF] text-xs font-bold border border-white/20 transition-colors flex items-center gap-1.5"
            >
              <Mountain className="size-3.5 text-[#7FA05C]" />
              <span>View Live Agency Experience</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Before / After Transformation Section */}
      <BeforeAfterSection onRequestPreview={handleOpenPreview} />

      {/* Nepal Agency Feature Bento Grid */}
      <FeaturesSection />

      {/* Case Studies & Live Demo Showcase */}
      <CaseStudiesSection />

      {/* Three-Tier Pricing Section */}
      <PricingSection onRequestQuote={handleRequestQuote} />

      {/* Nepal Agency Testimonials */}
      <TestimonialsSection />

      {/* React Hook Form + Zod Contact & Prototype Request Form */}
      <ContactSection defaultPlan={selectedPlan} />

      {/* Dark Footer with SEO / AEO Section */}
      <SiteFooter />

      {/* Instant Preview Generator Modal */}
      <PreviewGeneratorModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
