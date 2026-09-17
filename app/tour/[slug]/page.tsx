"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Mountain,
  Calendar,
  Clock,
  MapPin,
  Star,
  ShieldCheck,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  ArrowLeft,
  Users,
  Utensils,
  Home,
  CheckCircle2,
  CalendarCheck,
  CreditCard,
  DollarSign,
  Phone,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useCurrency } from "@/components/agency/CurrencyContext";
import { DEMO_PACKAGES } from "@/lib/demo-agency-data";
import { MainAgencyNav } from "@/components/agency/MainAgencyNav";
import { AgencyFooter } from "@/components/agency/AgencyFooter";
import {
  PassportStamp,
  PaperAirplaneContrail,
  FancyTravelIcon,
  BoardingTicketsSticker,
  RetroCameraSticker,
  AnimatedTravelBadge,
  AnimatedTravelIcon,
} from "@/components/travel/TravelStickers";

export default function TourDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const { formatPrice } = useCurrency();

  const pkg = DEMO_PACKAGES.find((p) => p.slug === resolvedParams.slug);

  if (!pkg) {
    notFound();
  }

  // State
  const [selectedPax, setSelectedPax] = useState<number>(2);
  const [expandedDays, setExpandedDays] = useState<Record<number, boolean>>({ 1: true, 2: true });

  const currentPriceUSD = (() => {
    if (selectedPax === 1) return pkg.tierPricing[0]?.pricePerPerson || pkg.priceUSD;
    if (selectedPax <= 3) return pkg.tierPricing[1]?.pricePerPerson || pkg.priceUSD;
    if (selectedPax <= 7) return pkg.tierPricing[2]?.pricePerPerson || pkg.priceUSD * 0.95;
    return pkg.tierPricing[3]?.pricePerPerson || pkg.priceUSD * 0.9;
  })();

  const totalPriceUSD = currentPriceUSD * selectedPax;
  const depositAmountUSD = Math.round(totalPriceUSD * 0.1);

  const toggleDay = (dayNum: number) => {
    setExpandedDays((prev) => ({ ...prev, [dayNum]: !prev[dayNum] }));
  };

  const toggleAllDays = (expand: boolean) => {
    const next: Record<number, boolean> = {};
    pkg.itinerary.forEach((day) => {
      next[day.day] = expand;
    });
    setExpandedDays(next);
  };

  return (
    <div className="min-h-screen bg-[#F5F3EF] flex flex-col font-sans">
      <MainAgencyNav />

      {/* Breadcrumb Navigation with top offset for fixed navbar */}
      <div className="bg-white border-b border-[#7C8A96]/20 pt-28 pb-3 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs text-[#7C8A96]">
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1 hover:text-[#2D4A34] transition-colors font-medium"
            >
              <ArrowLeft className="size-3.5" /> Home
            </Link>
            <span>/</span>
            <span className="font-semibold text-[#2D4A34]">{pkg.destination}</span>
            <span>/</span>
            <span className="text-[#33322E] truncate max-w-[200px] sm:max-w-none">{pkg.title}</span>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <AnimatedTravelBadge icon="mountain" label="EXPEDITION DETAILS" animation="animate-float-gentle" />
          </div>
        </div>
      </div>

      {/* Package Header Banner */}
      <div className="bg-[#1B2F22] text-[#F5F3EF] py-10 lg:py-14 relative overflow-hidden">
        {/* Background Hero Image with Atmospheric Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src={pkg.heroImage}
            alt={pkg.title}
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/35 to-black/10" />
        </div>

        {/* Subtle animated airplane asset */}
        <div className="absolute top-10 right-10 pointer-events-none opacity-80 hidden lg:block z-10">
          <PaperAirplaneContrail className="w-24 h-14 animate-float-drift" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge className="bg-[#7FA05C] text-white border-none font-bold text-xs shadow-md">
              {pkg.region} Region
            </Badge>
            <Badge className="bg-[#D9A23B] text-slate-900 border-none font-bold text-xs shadow-md">
              {pkg.activity}
            </Badge>
            <AnimatedTravelBadge icon="compass" label="GUARANTEED SLOTS" animation="animate-gentle-pulse" variant="dark" />
            <span className="text-xs text-white font-medium ml-2 flex items-center gap-1 drop-shadow-md">
              <Star className="size-3.5 fill-[#D9A23B] text-[#D9A23B]" />
              <strong>{pkg.rating}</strong> ({pkg.reviewsCount} verified reviews)
            </span>
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl !text-white tracking-tight leading-tight max-w-4xl drop-shadow-lg">
            {pkg.title}
          </h1>

          <p className="mt-3 text-sm sm:text-base !text-white/95 max-w-3xl leading-relaxed drop-shadow-md">
            {pkg.subtitle}
          </p>
        </div>
      </div>

      {/* Photo Gallery Grid */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 z-10 relative">
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-white p-2">
          {/* Primary Hero Image - Spans 2 Columns on Desktop */}
          <div className="relative w-full h-72 sm:h-96 md:col-span-2 rounded-xl overflow-hidden bg-slate-100">
            <Image
              src={pkg.heroImage}
              alt={pkg.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 66vw"
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          {/* Secondary Gallery Images - Spans 1 Column Stacked */}
          <div className="grid grid-cols-2 md:grid-cols-1 gap-3 w-full">
            {pkg.galleryImages.slice(1, 3).map((img, i) => (
              <div key={i} className="relative w-full h-36 sm:h-[186px] rounded-xl overflow-hidden bg-slate-100">
                <Image
                  src={img}
                  alt={`${pkg.title} preview ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Section Anchor Bar */}
      <div className="w-full sticky top-[73px] sm:top-[77px] lg:top-[81px] z-30 bg-white border-b border-[#7C8A96]/20 shadow-xs mt-10 sm:mt-12">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6 overflow-x-auto text-xs font-bold text-[#33322E] py-3.5 scrollbar-none">
            <a href="#overview" className="hover:text-[#2D4A34] transition-colors whitespace-nowrap">Overview</a>
            <a href="#itinerary" className="hover:text-[#2D4A34] transition-colors whitespace-nowrap">Day-by-Day Itinerary</a>
            <a href="#includes" className="hover:text-[#2D4A34] transition-colors whitespace-nowrap">Includes / Excludes</a>
            <a href="#departures" className="hover:text-[#2D4A34] transition-colors whitespace-nowrap">Departures & Pricing</a>
            <a href="#faqs" className="hover:text-[#2D4A34] transition-colors whitespace-nowrap">FAQs</a>
            <Link
              href={`/booking?package=${pkg.slug}`}
              className="ml-auto px-4 py-1.5 rounded-lg bg-[#2D4A34] text-white hover:bg-[#1F2E23] transition-colors whitespace-nowrap"
            >
              Book Dates
            </Link>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* LEFT COLUMN: Main Trip Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Key Facts Matrix Grid */}
            <div className="bg-white rounded-2xl p-6 border border-[#7C8A96]/20 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-extrabold text-base text-[#2D4A34]">
                  Trip Key Facts
                </h3>
                <AnimatedTravelBadge icon="boot" label="ACCLIMATIZATION READY" animation="animate-gentle-pulse" size="size-4" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                <div className="bg-[#F5F3EF] p-3 rounded-xl flex items-center gap-3">
                  <Mountain className="size-5 text-[#7FA05C] shrink-0" />
                  <div>
                    <div className="text-[10px] text-[#7C8A96] font-bold uppercase">Max Altitude</div>
                    <div className="font-extrabold text-[#2D4A34]">{pkg.altitude}</div>
                  </div>
                </div>

                <div className="bg-[#F5F3EF] p-3 rounded-xl flex items-center gap-3">
                  <Clock className="size-5 text-[#7FA05C] shrink-0" />
                  <div>
                    <div className="text-[10px] text-[#7C8A96] font-bold uppercase">Duration</div>
                    <div className="font-extrabold text-[#2D4A34]">{pkg.duration}</div>
                  </div>
                </div>

                <div className="bg-[#F5F3EF] p-3 rounded-xl flex items-center gap-3">
                  <ShieldCheck className="size-5 text-[#7FA05C] shrink-0" />
                  <div>
                    <div className="text-[10px] text-[#7C8A96] font-bold uppercase">Difficulty</div>
                    <div className="font-extrabold text-[#2D4A34]">{pkg.difficulty}</div>
                  </div>
                </div>

                <div className="bg-[#F5F3EF] p-3 rounded-xl flex items-center gap-3">
                  <Calendar className="size-5 text-[#7FA05C] shrink-0" />
                  <div>
                    <div className="text-[10px] text-[#7C8A96] font-bold uppercase">Best Season</div>
                    <div className="font-extrabold text-[#2D4A34]">{pkg.bestSeason}</div>
                  </div>
                </div>

                <div className="bg-[#F5F3EF] p-3 rounded-xl flex items-center gap-3">
                  <Home className="size-5 text-[#7FA05C] shrink-0" />
                  <div>
                    <div className="text-[10px] text-[#7C8A96] font-bold uppercase">Accommodation</div>
                    <div className="font-extrabold text-[#2D4A34]">{pkg.accommodation.split("&")[0]}</div>
                  </div>
                </div>

                <div className="bg-[#F5F3EF] p-3 rounded-xl flex items-center gap-3">
                  <Utensils className="size-5 text-[#7FA05C] shrink-0" />
                  <div>
                    <div className="text-[10px] text-[#7C8A96] font-bold uppercase">Meals</div>
                    <div className="font-extrabold text-[#2D4A34]">All Meals (Full Board)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Overview Section */}
            <section id="overview" className="bg-white rounded-2xl p-6 sm:p-8 border border-[#7C8A96]/20 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-heading font-extrabold text-2xl text-[#2D4A34]">
                  Trip Overview & Experience
                </h2>
                <AnimatedTravelBadge icon="binoculars" label="FIELD BRIEFING" animation="animate-float-gentle" size="size-4" />
              </div>
              <p className="text-xs sm:text-sm text-[#33322E] leading-relaxed text-justify">
                {pkg.description}
              </p>

              <div className="mt-6 pt-6 border-t border-[#7C8A96]/15">
                <h3 className="font-extrabold text-sm text-[#2D4A34] mb-3">
                  Trip Highlights:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#33322E]">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="size-4 text-[#7FA05C] shrink-0 mt-0.5" />
                    <span>Cross iconic Himalayan suspension bridges and prayer-flag trails</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="size-4 text-[#7FA05C] shrink-0 mt-0.5" />
                    <span>Stay in traditional mountain tea houses with hot meals and warm hospitality</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="size-4 text-[#7FA05C] shrink-0 mt-0.5" />
                    <span>Daily cardiovascular pulse oximeter monitoring by licensed Sherpa guides</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="size-4 text-[#7FA05C] shrink-0 mt-0.5" />
                    <span>All domestic flights, ACAP/TIMS permits, and airport transfers included</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Day-by-Day Detailed Itinerary */}
            <section id="itinerary" className="bg-white rounded-2xl p-6 sm:p-8 border border-[#7C8A96]/20 shadow-xs">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <AnimatedTravelBadge icon="map" label="TRAIL BREAKDOWN" animation="animate-tilt-float" size="size-4" />
                  </div>
                  <h2 className="font-heading font-extrabold text-2xl text-[#2D4A34]">
                    Day-by-Day Itinerary
                  </h2>
                  <div className="text-xs text-[#7C8A96] mt-0.5">
                    {pkg.itinerary.length} Days Trail Breakdown
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => toggleAllDays(true)}
                    className="text-xs font-bold text-[#3E7C94] hover:underline"
                  >
                    Expand All
                  </button>
                  <span className="text-[#7C8A96]">|</span>
                  <button
                    type="button"
                    onClick={() => toggleAllDays(false)}
                    className="text-xs font-bold text-[#7C8A96] hover:underline"
                  >
                    Collapse All
                  </button>
                </div>
              </div>

              {/* Itinerary Accordion Items */}
              <div className="space-y-3">
                {pkg.itinerary.map((day) => {
                  const isExpanded = !!expandedDays[day.day];
                  return (
                    <div
                      key={day.day}
                      className="border border-[#7C8A96]/20 rounded-xl overflow-hidden transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => toggleDay(day.day)}
                        className="w-full px-4 py-3.5 bg-[#F5F3EF] hover:bg-[#eae6df] flex items-center justify-between text-left transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <span className="size-7 rounded-lg bg-[#2D4A34] text-[#F5F3EF] font-bold text-xs flex items-center justify-center shrink-0">
                            D{day.day}
                          </span>
                          <div>
                            <div className="font-extrabold text-xs sm:text-sm text-[#2D4A34]">
                              {day.title}
                            </div>
                            <div className="text-[11px] text-[#7C8A96] flex items-center gap-3 mt-0.5">
                              <span>Altitude: <strong>{day.altitude}</strong></span>
                              <span>·</span>
                              <span>Distance: <strong>{day.distance}</strong></span>
                              <span>·</span>
                              <span>Time: <strong>{day.duration}</strong></span>
                            </div>
                          </div>
                        </div>

                        {isExpanded ? (
                          <ChevronUp className="size-4 text-[#7FA05C]" />
                        ) : (
                          <ChevronDown className="size-4 text-[#7C8A96]" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="p-4 text-xs text-[#33322E] leading-relaxed bg-white border-t border-[#7C8A96]/15">
                          {day.description}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Includes & Excludes */}
            <section id="includes" className="bg-white rounded-2xl p-6 sm:p-8 border border-[#7C8A96]/20 shadow-xs">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading font-extrabold text-2xl text-[#2D4A34]">
                  What's Included & Excluded
                </h2>
                <AnimatedTravelBadge icon="tickets" label="ALL-INCLUSIVE LOGISTICS" animation="animate-gentle-pulse" size="size-4" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inclusions */}
                <div className="bg-[#7FA05C]/10 rounded-xl p-5 border border-[#7FA05C]/30">
                  <h3 className="font-extrabold text-sm text-[#2D4A34] flex items-center gap-2 mb-4">
                    <CheckCircle2 className="size-4 text-[#7FA05C]" />
                    <span>What's Included in Price:</span>
                  </h3>
                  <ul className="space-y-2.5 text-xs text-[#33322E]">
                    {pkg.includes.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="size-4 text-[#7FA05C] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Exclusions */}
                <div className="bg-rose-50 rounded-xl p-5 border border-rose-200">
                  <h3 className="font-extrabold text-sm text-rose-800 flex items-center gap-2 mb-4">
                    <X className="size-4 text-rose-600" />
                    <span>What's Not Included:</span>
                  </h3>
                  <ul className="space-y-2.5 text-xs text-rose-950">
                    {pkg.excludes.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <X className="size-4 text-rose-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Fixed Departures & Tier Pricing Table */}
            <section id="departures" className="bg-white rounded-2xl p-6 sm:p-8 border border-[#7C8A96]/20 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-heading font-extrabold text-2xl text-[#2D4A34]">
                  Fixed Departures & Tier Pricing
                </h2>
                <AnimatedTravelBadge icon="compass" label="TIER DISCOUNTS" animation="animate-float-gentle" size="size-4" />
              </div>
              <p className="text-xs text-[#7C8A96] mb-6">
                Guaranteed departure dates with group tier discounts. Choose your preferred departure date or customize your private dates.
              </p>

              {/* Group Tier Pricing Table */}
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-left text-xs border border-[#7C8A96]/20 rounded-xl overflow-hidden">
                  <thead className="bg-[#2D4A34] text-white text-[11px] font-extrabold uppercase">
                    <tr>
                      <th className="p-3">Group Size</th>
                      <th className="p-3">Price Per Person</th>
                      <th className="p-3">Deposit to Lock</th>
                      <th className="p-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#7C8A96]/15">
                    {pkg.tierPricing.map((tier, i) => (
                      <tr key={i} className="hover:bg-[#F5F3EF]/60 transition-colors">
                        <td className="p-3 font-bold text-[#2D4A34]">{tier.pax}</td>
                        <td className="p-3 font-extrabold text-sm text-[#2D4A34]">
                          {formatPrice(tier.pricePerPerson)}
                        </td>
                        <td className="p-3 font-semibold text-[#7FA05C]">
                          {formatPrice(Math.round(tier.pricePerPerson * 0.1))} (10%)
                        </td>
                        <td className="p-3 text-right">
                          <Link
                            href={`/booking?package=${pkg.slug}&pax=${i === 0 ? 1 : i === 1 ? 2 : 4}`}
                            className="px-3 py-1.5 rounded-lg bg-[#2D4A34] text-white text-xs font-bold hover:bg-[#1F2E23] transition-colors inline-block"
                          >
                            Book
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Upcoming Fixed Departure Dates */}
              <h3 className="font-bold text-sm text-[#2D4A34] mb-3">
                Upcoming Guaranteed Departures (2026/2027):
              </h3>
              <div className="space-y-2">
                {pkg.departures.map((dep, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl border border-[#7C8A96]/20 flex items-center justify-between text-xs bg-[#F5F3EF]"
                  >
                    <div className="flex items-center gap-2 font-bold text-[#2D4A34]">
                      <CalendarCheck className="size-4 text-[#7FA05C]" />
                      <span>{dep.date}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          dep.status === "Guaranteed"
                            ? "bg-[#7FA05C]/20 text-[#2D4A34]"
                            : dep.status === "Filling Fast"
                            ? "bg-[#D9A23B]/30 text-slate-900"
                            : "bg-white text-[#7C8A96] border"
                        }`}
                      >
                        {dep.status}
                      </span>
                      <Link
                        href={`/booking?package=${pkg.slug}&departure=${encodeURIComponent(dep.date)}`}
                        className="px-3 py-1 rounded-lg bg-[#2D4A34] text-white font-bold text-[11px] hover:bg-[#1F2E23]"
                      >
                        Select
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQs */}
            <section id="faqs" className="bg-white rounded-2xl p-6 sm:p-8 border border-[#7C8A96]/20 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-heading font-extrabold text-2xl text-[#2D4A34]">
                  Frequently Asked Questions
                </h2>
                <AnimatedTravelBadge icon="backpack" label="EXPEDITION INTEL" animation="animate-gentle-pulse" size="size-4" />
              </div>
              <div className="space-y-3">
                {pkg.faqs.map((faq, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-[#7C8A96]/20 bg-[#F5F3EF]">
                    <h4 className="font-bold text-xs sm:text-sm text-[#2D4A34] mb-1.5">
                      {faq.question}
                    </h4>
                    <p className="text-xs text-[#7C8A96] leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN: Sticky Booking & Calculation Widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-[165px] space-y-6">
              <Card className="border border-[#7C8A96]/30 rounded-2xl bg-white shadow-xl overflow-hidden">
                <div className="bg-[#2D4A34] text-white p-5">
                  <div className="flex items-center justify-between">
                    <div className="text-[11px] text-[#7FA05C] font-extrabold uppercase tracking-wider mb-1">
                      Special Direct Operator Offer
                    </div>
                    <AnimatedTravelBadge icon="camera" label="SHERPA GUIDED" animation="animate-float-gentle" variant="dark" size="size-3.5" />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold tracking-tight">
                      {formatPrice(currentPriceUSD)}
                    </span>
                    <span className="text-xs text-white/70">/ person</span>
                    {pkg.discountPercent > 0 && (
                      <span className="line-through text-xs text-white/50 ml-auto">
                        {formatPrice(pkg.originalPriceUSD)}
                      </span>
                    )}
                  </div>
                  <div className="mt-1 text-[11px] text-white/80 font-medium">
                    10% deposit required: <strong>{formatPrice(depositAmountUSD)}</strong>
                  </div>
                </div>

                <CardContent className="p-5 space-y-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#2D4A34] mb-2 flex items-center justify-between">
                      <span>Traveler Count:</span>
                      <span className="text-[#7FA05C] font-extrabold">{selectedPax} Person{selectedPax > 1 ? "s" : ""}</span>
                    </label>

                    <div className="grid grid-cols-4 gap-1.5">
                      {[1, 2, 4, 8].map((paxNum) => (
                        <button
                          key={paxNum}
                          type="button"
                          onClick={() => setSelectedPax(paxNum)}
                          className={`py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                            selectedPax === paxNum
                              ? "bg-[#2D4A34] text-white border-[#2D4A34] shadow-xs"
                              : "bg-[#F5F3EF] text-[#33322E] border-[#7C8A96]/20 hover:border-[#2D4A34]"
                          }`}
                        >
                          {paxNum} Pax
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#F5F3EF] p-3.5 rounded-xl text-xs space-y-2 border border-[#7C8A96]/20">
                    <div className="flex justify-between text-[#7C8A96]">
                      <span>Rate per traveler:</span>
                      <span className="font-bold text-[#33322E]">{formatPrice(currentPriceUSD)}</span>
                    </div>
                    <div className="flex justify-between text-[#7C8A96]">
                      <span>Travelers:</span>
                      <span className="font-bold text-[#33322E]">× {selectedPax}</span>
                    </div>
                    <div className="pt-2 border-t border-[#7C8A96]/20 flex justify-between text-sm font-extrabold text-[#2D4A34]">
                      <span>Total Trip Price:</span>
                      <span>{formatPrice(totalPriceUSD)}</span>
                    </div>
                    <div className="flex justify-between text-[11px] text-[#7FA05C] font-bold">
                      <span>10% Advance Deposit Due:</span>
                      <span>{formatPrice(depositAmountUSD)}</span>
                    </div>
                    <div className="text-[10px] text-[#7C8A96]">
                      * Balance {formatPrice(totalPriceUSD - depositAmountUSD)} payable in Kathmandu upon arrival.
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <Link
                      href={`/booking?package=${pkg.slug}&pax=${selectedPax}`}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#2D4A34] hover:bg-[#1F2E23] text-white font-extrabold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
                    >
                      <Calendar className="size-4 text-[#7FA05C]" />
                      <span>Book This Trip ({formatPrice(depositAmountUSD)} Deposit)</span>
                    </Link>

                    <Link
                      href="/contact"
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#F5F3EF] hover:bg-[#eae6df] text-[#2D4A34] font-bold text-xs transition-colors border border-[#7C8A96]/30 cursor-pointer"
                    >
                      Inquire & Customize Itinerary
                    </Link>
                  </div>

                  <div className="pt-3 border-t border-[#7C8A96]/20 space-y-2 text-[11px] text-[#33322E]">
                    <div className="flex items-center gap-2 font-medium">
                      <ShieldCheck className="size-3.5 text-[#7FA05C] shrink-0" />
                      <span>100% Guaranteed Departures</span>
                    </div>
                    <div className="flex items-center gap-2 font-medium">
                      <CalendarCheck className="size-3.5 text-[#7FA05C] shrink-0" />
                      <span>Free Date Change up to 30 days prior</span>
                    </div>
                    <div className="flex items-center gap-2 font-medium">
                      <CreditCard className="size-3.5 text-[#7FA05C] shrink-0" />
                      <span>Secure 10% Deposit (Stripe / Bank Wire)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-white p-5 rounded-2xl border border-[#7C8A96]/20 text-center shadow-sm relative overflow-hidden">
                {/* Animated visible 2D passport stamp */}
                <div className="absolute -bottom-2 -right-2 pointer-events-none z-10">
                  <PassportStamp text="EVEREST REGION" date="2026" className="w-14 h-14 opacity-90 text-[#2D4A34] animate-tilt-float" />
                </div>

                <h4 className="font-heading font-extrabold text-xs text-[#2D4A34] mb-1">
                  Have Questions on Trail Fitness?
                </h4>
                <p className="text-[11px] text-[#7C8A96] mb-3">
                  Talk with our senior Sherpa expedition leader directly.
                </p>
                <a
                  href="tel:+97714701234"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2D4A34] hover:bg-[#1F2E23] text-white font-bold text-xs transition-colors shadow-xs"
                >
                  <Phone className="size-3.5 text-[#7FA05C]" />
                  <span>Call Guide Office</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AgencyFooter />
    </div>
  );
}
