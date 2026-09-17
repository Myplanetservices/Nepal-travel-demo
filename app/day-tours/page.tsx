"use client";

import React from "react";
import Link from "next/link";
import { MainAgencyNav } from "@/components/agency/MainAgencyNav";
import { AgencyFooter } from "@/components/agency/AgencyFooter";
import { HimalayanSunriseBalloonSection } from "@/components/travel/HimalayanSunriseBalloonSection";
import { AnimatedTravelBadge } from "@/components/travel/TravelStickers";
import { ChevronRight, Compass, Sun, MapPin } from "lucide-react";

export default function DayToursPage() {
  return (
    <main className="min-h-screen bg-[#F5F3EF] flex flex-col justify-between">
      <MainAgencyNav />

      {/* Page Header Banner */}
      <div className="pt-28 pb-12 bg-gradient-to-b from-[#2D4A34]/10 via-[#F5F3EF] to-[#F5F3EF] border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-stone-500 mb-6 font-medium">
            <Link href="/" className="hover:text-pine transition-colors">
              Home
            </Link>
            <ChevronRight className="size-3 text-stone-400" />
            <span className="text-[#2D4A34] font-bold">Day Tours &amp; Aerial Flights</span>
          </nav>

          <div className="max-w-3xl">
            <div className="mb-3">
              <AnimatedTravelBadge
                icon="compass"
                label="VALLEY &amp; AERIAL EXPERIENCES"
                animation="animate-float-gentle"
                variant="light"
                size="size-4"
              />
            </div>
            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#2D4A34] tracking-tight leading-tight">
              Himalayan Day Tours &amp; Aerial Flights
            </h1>
            <p className="mt-4 text-sm sm:text-base text-stone-600 leading-relaxed font-sans">
              Designed as leisurely pre-trek acclimatization or post-expedition celebrations. Experience
              panoramic dawn flights over the Annapurna range, Pokhara valley thermals, and curated day excursions.
            </p>
          </div>
        </div>
      </div>

      {/* Primary Section: Pokhara Sunrise Hot Air Balloon Experience */}
      <div className="flex-1 py-8 sm:py-12">
        <HimalayanSunriseBalloonSection />
      </div>

      <AgencyFooter />
    </main>
  );
}
