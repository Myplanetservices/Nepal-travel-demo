"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  Mountain,
  Compass,
  Calendar,
  Clock,
  MapPin,
  Star,
  Search,
  ArrowRight,
  SlidersHorizontal,
  CheckCircle2,
  Filter,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MainAgencyNav } from "@/components/agency/MainAgencyNav";
import { AgencyFooter } from "@/components/agency/AgencyFooter";
import { useCurrency } from "@/components/agency/CurrencyContext";
import { DEMO_PACKAGES } from "@/lib/demo-agency-data";
import {
  PassportStamp,
  PaperAirplaneContrail,
  FancyTravelIcon,
  RetroCameraSticker,
  BoardingTicketsSticker,
  AnimatedTravelBadge,
  AnimatedTravelIcon,
} from "@/components/travel/TravelStickers";

const REGIONS = ["All", "Everest", "Annapurna", "Manaslu", "Langtang", "Bhutan", "Tibet"];
const DIFFICULTIES = ["All", "Moderate", "Challenging", "Strenuous"];

function ToursContent() {
  const { formatPrice } = useCurrency();
  const searchParams = useSearchParams();
  const initialRegion = searchParams.get("region");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (initialRegion && REGIONS.includes(initialRegion)) {
      setSelectedRegion(initialRegion);
    }
  }, [initialRegion]);

  const filteredTours = useMemo(() => {
    return DEMO_PACKAGES.filter((pkg) => {
      const matchesRegion = selectedRegion === "All" || pkg.region === selectedRegion;
      const matchesDiff = selectedDifficulty === "All" || pkg.difficulty === selectedDifficulty;
      const matchesSearch =
        pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.altitude.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesRegion && matchesDiff && matchesSearch;
    });
  }, [selectedRegion, selectedDifficulty, searchQuery]);

  return (
    <div className="min-h-screen bg-[#F5F3EF] flex flex-col font-sans">
      <MainAgencyNav />

      {/* Hero Header */}
      <section className="relative bg-[#1B2F22] text-[#F5F3EF] pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
        {/* Background Hero Image with Atmospheric Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1920&auto=format&fit=crop"
            alt="Himalayan Mountain Passes and High Peaks"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-black/60" />
        </div>

        {/* Animated small 2D badges & stamps */}
        <div className="absolute top-32 right-12 hidden md:flex items-center gap-2 pointer-events-none z-20">
          <AnimatedTravelBadge icon="mountain" label="TRAIL CATALOGUE" animation="animate-float-gentle" variant="dark" />
        </div>
        <div className="absolute top-40 right-28 pointer-events-none opacity-80 hidden lg:block z-10">
          <PaperAirplaneContrail className="w-24 h-14 animate-float-drift" />
        </div>
        <div className="absolute bottom-6 right-8 hidden sm:block pointer-events-none z-20">
          <PassportStamp text="HIMALAYAN TRAILS" date="2026" className="w-16 h-16 opacity-90 text-white animate-tilt-float" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Badge className="bg-[#7FA05C] text-white border-none font-bold text-xs shadow-md">
              Himalayan Expeditions Catalog
            </Badge>
            <AnimatedTravelBadge icon="compass" label="GUARANTEED SLOTS" animation="animate-gentle-pulse" variant="dark" />
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl !text-white tracking-tight leading-tight drop-shadow-lg">
            Explore All Treks, Climbs & Cultural Circuits
          </h1>
          <p className="mt-4 text-xs sm:text-sm !text-white/95 leading-relaxed font-medium drop-shadow-md">
            From the legendary heights of Kala Patthar and Thorong La pass to restricted wilderness sanctuaries and serene Bhutanese monasteries. Every trip features 100% fair porter ethics, UIAGM guides, and guaranteed departure dates.
          </p>

          {/* Search bar inside hero */}
          <div className="mt-8 max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-[#7C8A96]" />
            <input
              type="text"
              placeholder="Search by peak, region (e.g. Everest, Manaslu)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full bg-white text-[#33322E] placeholder-[#7C8A96] text-xs font-medium shadow-xl focus:outline-none focus:ring-2 focus:ring-[#7FA05C]"
            />
          </div>
        </div>
      </section>

      {/* Filter Control Bar */}
      <section className="bg-white border-b border-[#7C8A96]/20 sticky top-16 z-30 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Region Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto">
            <AnimatedTravelBadge icon="compass" label="REGION" animation="animate-gentle-pulse" size="size-4" className="shrink-0 mr-1" />
            {REGIONS.map((reg) => (
              <button
                key={reg}
                type="button"
                onClick={() => setSelectedRegion(reg)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedRegion === reg
                    ? "bg-[#2D4A34] text-white shadow-xs"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                {reg}
              </button>
            ))}
          </div>

          {/* Difficulty Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto">
            <span className="text-[11px] font-bold text-[#7C8A96] mr-2 uppercase tracking-wider hidden md:inline">
              Grade:
            </span>
            {DIFFICULTIES.map((diff) => (
              <button
                key={diff}
                type="button"
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedDifficulty === diff
                    ? "bg-[#7FA05C] text-white shadow-xs"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-14 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative flex-1">
        {/* Animated small 2D boarding ticket sticker */}
        <div className="absolute top-10 right-6 pointer-events-none z-20 hidden lg:block">
          <BoardingTicketsSticker className="w-12 h-10 animate-tilt-float drop-shadow-sm" />
        </div>

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <AnimatedTravelBadge icon="backpack" label="GUARANTEED ROUTES & PASSES" animation="animate-float-gentle" />
          </div>
          <span className="text-xs text-[#7C8A96] font-medium">{filteredTours.length} expeditions listed</span>
        </div>

        {filteredTours.length === 0 ? (
          <div className="text-center py-20">
            <div className="size-16 rounded-full bg-stone-200 text-[#7C8A96] flex items-center justify-center mx-auto mb-4">
              <Mountain className="size-8" />
            </div>
            <h3 className="font-heading font-extrabold text-lg text-[#2D4A34]">No packages match your search</h3>
            <p className="text-xs text-[#7C8A96] mt-1">Try resetting the region or difficulty filters</p>
            <button
              type="button"
              onClick={() => {
                setSelectedRegion("All");
                setSelectedDifficulty("All");
                setSearchQuery("");
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-[#7FA05C] text-white text-xs font-bold"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTours.map((pkg) => (
              <Card
                key={pkg.id}
                className="group overflow-hidden rounded-2xl border border-[#7C8A96]/20 bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                    <Image
                      src={pkg.heroImage}
                      alt={pkg.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="px-2.5 py-1 rounded-full bg-[#2D4A34]/90 backdrop-blur-xs text-white text-[10px] font-bold">
                        {pkg.region}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-[#7FA05C]/90 backdrop-blur-xs text-white text-[10px] font-bold">
                        {pkg.difficulty}
                      </span>
                    </div>

                    <div className="absolute bottom-3 right-3">
                      <span className="px-3 py-1 rounded-xl bg-white/95 backdrop-blur-xs text-[#2D4A34] text-xs font-extrabold shadow-sm">
                        From {formatPrice(pkg.priceUSD)}
                      </span>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 text-xs text-[#7C8A96] mb-2 font-medium">
                      <span className="flex items-center gap-1">
                        <Clock className="size-3.5 text-[#7FA05C]" /> {pkg.duration}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Mountain className="size-3.5 text-[#7FA05C]" /> {pkg.altitude}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1 text-[#D9A23B]">
                        <Star className="size-3.5 fill-[#D9A23B]" /> {pkg.rating}
                      </span>
                    </div>

                    <h3 className="font-heading font-extrabold text-base text-[#2D4A34] group-hover:text-[#7FA05C] transition-colors leading-snug">
                      <Link href={`/tour/${pkg.slug}`}>{pkg.title}</Link>
                    </h3>

                    <p className="mt-2 text-xs text-[#7C8A96] leading-relaxed line-clamp-2">
                      {pkg.subtitle}
                    </p>

                    <div className="mt-4 pt-3 border-t border-[#7C8A96]/15 flex items-center justify-between text-[11px] text-[#7C8A96]">
                      <span>Best: {pkg.bestSeason}</span>
                      <span className="font-bold text-[#7FA05C]">Guaranteed Departures</span>
                    </div>
                  </CardContent>
                </div>

                <div className="px-6 pb-6 pt-2 flex items-center justify-between gap-3">
                  <Link
                    href={`/tour/${pkg.slug}`}
                    className="flex-1 py-2.5 rounded-xl border border-[#2D4A34] text-[#2D4A34] hover:bg-[#2D4A34] hover:text-white font-bold text-xs text-center transition-colors"
                  >
                    View Itinerary
                  </Link>
                  <Link
                    href={`/booking?package=${pkg.slug}`}
                    className="flex-1 py-2.5 rounded-xl bg-[#7FA05C] hover:bg-[#6E8C4E] text-white font-bold text-xs text-center transition-colors shadow-xs"
                  >
                    Book Now
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Bottom Confidence Banner */}
      <section className="bg-[#2D4A34] text-[#F5F3EF] py-14 border-t border-[#7C8A96]/20 relative overflow-hidden">
        {/* Subtle animated airplane asset */}
        <div className="absolute top-4 right-6 pointer-events-none z-10 hidden sm:block">
          <AnimatedTravelBadge icon="plane" label="BESPOKE ITINERARIES" animation="animate-float-drift" variant="dark" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4 relative z-10">
          <div className="flex items-center justify-center gap-2">
            <Badge className="bg-[#7FA05C] text-white border-none font-bold text-xs">
              100% Tailor-Made Friendly
            </Badge>
            <AnimatedTravelBadge icon="camping" label="BESPOKE EXPEDITIONS" animation="animate-gentle-pulse" variant="dark" />
          </div>
          <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
            Looking for a Private Custom Route or Specific Departure Date?
          </h3>
          <p className="text-xs sm:text-sm text-[#F5F3EF]/85 leading-relaxed">
            Our Senior Sherpa directors design bespoke itineraries for families, charity groups, universities, and individual mountaineers with private teahouse bookings and helicopter support.
          </p>
          <div className="pt-2 flex items-center justify-center gap-3">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl bg-[#7FA05C] hover:bg-[#6E8C4E] text-white font-extrabold text-xs shadow-md transition-colors"
            >
              Plan Private Itinerary
            </Link>
          </div>
        </div>
      </section>

      <AgencyFooter />
    </div>
  );
}

export default function AllToursPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F5F3EF]" />}>
      <ToursContent />
    </Suspense>
  );
}
