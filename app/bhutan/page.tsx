"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Mountain,
  Compass,
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  HeartHandshake,
  Users,
  ArrowRight,
  Sparkles,
  Award,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MainAgencyNav } from "@/components/agency/MainAgencyNav";
import { AgencyFooter } from "@/components/agency/AgencyFooter";
import { useCurrency } from "@/components/agency/CurrencyContext";
import {
  PassportStamp,
  PaperAirplaneContrail,
  FancyTravelIcon,
  RetroCameraSticker,
  BoardingTicketsSticker,
  AnimatedTravelBadge,
} from "@/components/travel/TravelStickers";

const BHUTAN_PACKAGES = [
  {
    id: "bhutan-classic",
    title: "Bhutan Cultural Discovery & Tiger's Nest",
    duration: "7 Days / 6 Nights",
    maxAltitude: "3,120m (Paro Taktsang)",
    grade: "Easy to Moderate",
    priceUSD: 2450,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1000&auto=format&fit=crop",
    slug: "bhutan-cultural-tour",
    highlights: [
      "Hike to the cliff-hanging Paro Taktsang (Tiger's Nest)",
      "Explore the majestic 17th-century Punakha Dzong",
      "Panoramic Himalayan vistas from Dochula Pass (108 chortens)",
      "Giant bronze Buddha Dordenma overlooking Thimphu Valley",
    ],
  },
  {
    id: "bhutan-valleys",
    title: "Dragon Kingdom & Glacial Phobjikha Valley",
    duration: "10 Days / 9 Nights",
    maxAltitude: "3,400m (Pele La Pass)",
    grade: "Moderate",
    priceUSD: 3290,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000&auto=format&fit=crop",
    slug: "bhutan-dragon-valleys",
    highlights: [
      "Spot rare black-necked cranes in serene Phobjikha Valley",
      "Traditional Bhutanese archery matches & hot stone baths",
      "Centuries-old Gangtey Gompa monastery blessing",
      "Authentic farmhouse homestay experience with local hosts",
    ],
  },
  {
    id: "bhutan-express",
    title: "Tiger's Nest & Sacred Dzongs Express",
    duration: "5 Days / 4 Nights",
    maxAltitude: "3,120m (Tiger's Nest)",
    grade: "Easy / Cultural",
    priceUSD: 1980,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000&auto=format&fit=crop",
    slug: "bhutan-sacred-dzongs-express",
    highlights: [
      "Direct scenic Drukair flight from Kathmandu into Paro",
      "Guided spiritual meditation inside Taktsang cave chapel",
      "Thimphu National Textile Museum and weekend craft market",
      "Curated 4-star boutique heritage lodge accommodation",
    ],
  },
];

const SDF_FACTS = [
  {
    title: "Official SDF Rate",
    value: "$100 / night",
    desc: "The Sustainable Development Fee is mandatory for all foreign tourists and is 100% pre-included in our packages.",
  },
  {
    title: "Carbon Negative Nation",
    value: "70%+ Forest Cover",
    desc: "Bhutan absorbs more carbon dioxide than it emits, legally preserving pristine Himalayan biodiversity.",
  },
  {
    title: "Free Healthcare & Schooling",
    value: "Community Reinvestment",
    desc: "SDF tourism royalties directly fund universal healthcare, education, and ecological trail conservation in Bhutan.",
  },
  {
    title: "Drukair Kathmandu Link",
    value: "1h 10m Flight",
    desc: "Daily direct flight connection between Kathmandu Tribhuvan Airport (KTM) and Paro International (PBH).",
  },
];

export default function BhutanPage() {
  const { formatPrice } = useCurrency();

  return (
    <div className="min-h-screen bg-[#F5F3EF] flex flex-col font-sans">
      <MainAgencyNav />

      {/* Hero Section */}
      <section className="relative bg-[#1B2F22] text-[#F5F3EF] pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        {/* Background Hero Image with Atmospheric Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=1920&auto=format&fit=crop"
            alt="Bhutan Paro Taktsang Tiger's Nest Monastery"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/35 to-black/10" />
        </div>
        {/* Animated small 2D badges & stamps */}
        <div className="absolute top-32 right-12 hidden md:flex items-center gap-2 pointer-events-none z-20">
          <AnimatedTravelBadge icon="plane" label="PARO AIRPORT ENTRY" animation="animate-float-gentle" />
        </div>
        <div className="absolute top-40 right-28 pointer-events-none opacity-80 hidden lg:block z-10">
          <PaperAirplaneContrail className="w-24 h-14 animate-float-drift" />
        </div>
        <div className="absolute bottom-6 right-8 hidden sm:block pointer-events-none z-20">
          <PassportStamp text="KINGDOM OF BHUTAN" date="2026" className="w-16 h-16 opacity-90 text-white animate-tilt-float" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <Badge className="bg-[#7FA05C] text-white border-none font-bold text-xs shadow-md">
                Kingdom of the Thunder Dragon
              </Badge>
              <AnimatedTravelBadge icon="compass" label="SDF INCLUDED" animation="animate-gentle-pulse" className="bg-[#7FA05C]/30 border-white/30 text-white" />
            </div>
            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl !text-white tracking-tight leading-tight drop-shadow-lg">
              Experience the Peaceful Magic & Ancient Dzongs of Bhutan
            </h1>
            <p className="mt-4 text-xs sm:text-sm !text-white/95 leading-relaxed font-medium drop-shadow-md">
              Climb the cliffside stone stairway to Paro's iconic Tiger's Nest Monastery, cross high mountain passes adorned with hundreds of prayer flags, and experience the world's only Gross National Happiness society. Handled seamlessly in tandem with our Kathmandu operations team.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="#packages"
                className="px-6 py-3 rounded-xl bg-[#7FA05C] hover:bg-[#6E8C4E] text-white font-extrabold text-xs shadow-lg transition-all active:scale-95 cursor-pointer"
              >
                Explore Bhutan Tours
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-colors"
              >
                Inquire With Guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Fast Facts Banner */}
      <section className="bg-white border-b border-[#7C8A96]/20 py-6 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <AnimatedTravelBadge icon="globe" label="CARBON NEGATIVE KINGDOM" animation="animate-gentle-pulse" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {SDF_FACTS.map((fact, idx) => (
              <div key={idx} className="p-3 border-r border-[#7C8A96]/15 last:border-none">
                <div className="text-[10px] uppercase font-bold text-[#7FA05C]">{fact.title}</div>
                <div className="font-heading font-extrabold text-lg text-[#2D4A34] mt-0.5">{fact.value}</div>
                <div className="text-[11px] text-[#7C8A96]">{fact.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signature Packages Section */}
      <section id="packages" className="py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Animated small 2D boarding ticket sticker in corner */}
        <div className="absolute top-10 right-6 pointer-events-none z-20 hidden md:block">
          <BoardingTicketsSticker className="w-12 h-10 animate-tilt-float drop-shadow-sm" />
        </div>

        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 mb-2">
            <AnimatedTravelBadge icon="camera" label="SACRED DZONGS" animation="animate-float-gentle" />
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#2D4A34]">
            Signature Bhutan Cultural Itineraries
          </h2>
          <p className="text-xs sm:text-sm text-[#7C8A96] mt-2 leading-relaxed">
            Every itinerary includes Bhutan government visa clearances, daily $100 SDF contributions, certified Bhutanese English-speaking guide, private vehicle, and all three meals daily.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BHUTAN_PACKAGES.map((pkg) => (
            <Card
              key={pkg.id}
              className="group overflow-hidden rounded-2xl border border-[#7C8A96]/25 bg-white shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative h-56 w-full overflow-hidden bg-slate-200">
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full bg-[#2D4A34]/90 backdrop-blur-xs text-white text-[10px] font-bold">
                    {pkg.grade}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3">
                  <span className="px-3 py-1 rounded-xl bg-white/95 backdrop-blur-xs text-[#2D4A34] text-xs font-extrabold shadow-sm">
                    From {formatPrice(pkg.priceUSD)}
                  </span>
                </div>
              </div>

              <CardContent className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-3 text-xs text-[#7C8A96] mb-2 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock className="size-3.5 text-[#7FA05C]" /> {pkg.duration}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Mountain className="size-3.5 text-[#7FA05C]" /> {pkg.maxAltitude}
                    </span>
                  </div>

                  <h3 className="font-heading font-extrabold text-base text-[#2D4A34] group-hover:text-[#7FA05C] transition-colors line-clamp-2">
                    {pkg.title}
                  </h3>

                  <ul className="mt-4 space-y-1.5 text-xs text-[#33322E]">
                    {pkg.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="size-3.5 text-[#7FA05C] shrink-0 mt-0.5" />
                        <span className="text-[#33322E]/90 leading-tight">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#7C8A96]/15 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#7C8A96] uppercase font-bold block">SDF & Visa Included</span>
                    <span className="text-sm font-extrabold text-[#2D4A34]">{formatPrice(pkg.priceUSD)}</span>
                  </div>
                  <Link
                    href={`/booking?package=${pkg.slug}`}
                    className="px-4 py-2 rounded-xl bg-[#2D4A34] hover:bg-[#1F2E23] text-white text-xs font-bold transition-all shadow-xs"
                  >
                    Book Trip
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Sustainable Tourism Philosophy */}
      <section className="bg-white border-y border-[#7C8A96]/20 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 lg:h-96 rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-slate-100">
              <Image
                src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop"
                alt="Paro Taktsang Tiger's Nest Bhutan"
                fill
                className="object-cover"
              />
              {/* Subtle 2D passport watermark */}
              <div className="absolute -bottom-3 -right-3 pointer-events-none drop-shadow-md">
                <PassportStamp text="TIGER'S NEST" subtext="3,120M ALTITUDE" year="2026" className="w-24 h-24" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <AnimatedTravelBadge icon="mountain" label="GROSS NATIONAL HAPPINESS" animation="animate-float-gentle" />
              </div>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#2D4A34]">
                High-Value, Low-Impact Himalayan Travel
              </h2>
              <p className="text-xs sm:text-sm text-[#7C8A96] leading-relaxed">
                Bhutan is unlike any other country on Earth. It has avoided mass commercial tourism by prioritizing cultural preservation and ecological balance.
              </p>
              <p className="text-xs sm:text-sm text-[#7C8A96] leading-relaxed">
                When traveling with Zenith Himalaya, you enjoy seamless cross-border coordination. You can start with an acclimatization trek in Nepal, take the breathtaking mountain-flight past Everest directly into Paro, and immerse yourself in Bhutan's tranquil fortress monasteries.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 text-xs font-bold text-[#2D4A34]">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="size-4 text-[#7FA05C]" />
                  <span>Licensed Bhutanese Tour Partners</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <HeartHandshake className="size-4 text-[#7FA05C]" />
                  <span>Ethical Porter & Driver Wages</span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2D4A34] text-white font-bold text-xs hover:bg-[#1F2E23] transition-colors"
                >
                  <span>Request Custom Nepal + Bhutan Combined Tour</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-[#2D4A34] text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-xl">
          {/* Animated 2D balloon badge */}
          <div className="absolute top-4 right-4 pointer-events-none z-10">
            <AnimatedTravelBadge icon="hot-air-balloon" label="PARO TSHECHU READY" animation="animate-float-gentle" className="bg-white/10 border-white/20 text-white" />
          </div>

          <div className="max-w-xl relative z-10">
            <Badge className="bg-[#D9A23B] text-black border-none font-extrabold text-[10px] mb-3">
              Direct Flights from Kathmandu
            </Badge>
            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl">
              Ready to Walk the Path of Tiger's Nest?
            </h3>
            <p className="text-xs text-white/80 mt-2 leading-relaxed">
              We secure your Drukair flights, visa clearances, and hotel confirmations with a flexible 10% deposit.
            </p>
          </div>

          <div className="flex items-center gap-3 relative z-10">
            <Link
              href="/booking?package=bhutan-cultural-tour"
              className="px-6 py-3 rounded-xl bg-[#7FA05C] hover:bg-[#6E8C4E] text-white font-extrabold text-xs shadow-md transition-all active:scale-95"
            >
              Book Bhutan Tour
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-colors"
            >
              Ask Our Guide
            </Link>
          </div>
        </div>
      </section>

      <AgencyFooter />
    </div>
  );
}
