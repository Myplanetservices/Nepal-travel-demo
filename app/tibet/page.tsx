"use client";

import React, { useState } from "react";
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
  FileText,
  Users,
  ArrowRight,
  Info,
  ChevronRight,
  Sparkles,
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
  BoardingTicketsSticker,
  RetroCameraSticker,
  AnimatedTravelBadge,
} from "@/components/travel/TravelStickers";

const TIBET_EXPEDITIONS = [
  {
    id: "tibet-ebc",
    title: "Lhasa to Everest Base Camp (North Face)",
    duration: "8 Days / 7 Nights",
    maxAltitude: "5,200m (Rongbuk Monastery)",
    grade: "Moderate",
    priceUSD: 1650,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1000&auto=format&fit=crop",
    slug: "lhasa-everest-north-face",
    highlights: [
      "UNESCO Potala Palace & Jokhang Temple in Lhasa",
      "Stunning turquoise waters of Yamdrok Lake & Karola Glacier",
      "Sunset and sunrise over Mount Everest North Face",
      "Rongbuk Monastery (world's highest monastery at 5,000m)",
    ],
  },
  {
    id: "kailash-kora",
    title: "Mount Kailash Sacred Kora & Lake Manasarovar",
    duration: "14 Days / 13 Nights",
    maxAltitude: "5,630m (Drolma La Pass)",
    grade: "Challenging",
    priceUSD: 2490,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000&auto=format&fit=crop",
    slug: "mount-kailash-manasarovar",
    highlights: [
      "Sacred 3-day parikrama circumambulating Mount Kailash",
      "Spiritual purification ceremonies at holy Lake Manasarovar",
      "High altitude crossing over the prayer-flag strewn Drolma La",
      "Expansive Tibetan plateau vistas across western Ngari prefecture",
    ],
  },
  {
    id: "lhasa-heritage",
    title: "Lhasa Ancient Monasteries & Heritage Discovery",
    duration: "5 Days / 4 Nights",
    maxAltitude: "3,656m (Lhasa Valley)",
    grade: "Easy / Cultural",
    priceUSD: 890,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000&auto=format&fit=crop",
    slug: "lhasa-cultural-heritage",
    highlights: [
      "In-depth access to the winter palace of Dalai Lamas (Potala)",
      "Vibrant monk philosophical debates at Sera Monastery courtyard",
      "Prostrating pilgrims circling the sacred Barkhor Street circuit",
      "Traditional Tibetan herbal tea house and cuisine tastings",
    ],
  },
];

const PERMIT_REQUIREMENTS = [
  {
    step: "1",
    title: "Chinese Group Visa (from Kathmandu)",
    desc: "We arrange the official Chinese Embassy group visa clearance in Kathmandu (requires 3 working days with your original passport).",
  },
  {
    step: "2",
    title: "Tibet Travel Permit (TTP)",
    desc: "Issued exclusively by the Tibet Tourism Bureau (TTB). We process and receive your permit 20 days prior to your flight or overland crossing.",
  },
  {
    step: "3",
    title: "Alien's Travel Permit (PSB)",
    desc: "Required when traveling outside Lhasa toward Everest Base Camp North or Mount Kailash. Handled directly by our resident Tibetan guides.",
  },
  {
    step: "4",
    title: "Military Area Permit",
    desc: "Mandatory for Kailash and remote western Tibetan borders. Fully included and pre-cleared in all our expedition packages.",
  },
];

export default function TibetPage() {
  const { formatPrice } = useCurrency();
  const [selectedSeason, setSelectedSeason] = useState("Autumn (Sept - Nov)");

  return (
    <div className="min-h-screen bg-[#F5F3EF] flex flex-col font-sans">
      <MainAgencyNav />

      {/* Hero Section */}
      <section className="relative bg-[#1B2F22] text-[#F5F3EF] pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        {/* Background Hero Image with Atmospheric Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1920&auto=format&fit=crop"
            alt="Tibet Himalayan High Plateau and Mount Kailash"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/35 to-black/10" />
        </div>
        {/* Animated small 2D badges & stamps */}
        <div className="absolute top-32 right-12 hidden md:flex items-center gap-2 pointer-events-none z-20">
          <AnimatedTravelBadge icon="mountain" label="ROOF OF THE WORLD" animation="animate-float-gentle" />
        </div>
        <div className="absolute top-40 right-28 pointer-events-none opacity-80 hidden lg:block z-10">
          <PaperAirplaneContrail className="w-24 h-14 animate-float-drift" />
        </div>
        <div className="absolute bottom-6 right-8 hidden sm:block pointer-events-none z-20">
          <PassportStamp text="LHASA EXPEDITION" date="2026" className="w-16 h-16 opacity-90 text-white animate-tilt-float" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <Badge className="bg-[#7FA05C] text-white border-none font-bold text-xs shadow-md">
                Roof of the World Expeditions
              </Badge>
              <AnimatedTravelBadge icon="compass" label="TIBET PERMIT GUARANTEE" animation="animate-gentle-pulse" className="bg-[#7FA05C]/20 border-white/20 text-white" />
            </div>
            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl !text-white tracking-tight leading-tight drop-shadow-lg">
              Journey Through the Sacred Monasteries & High Plateaus of Tibet
            </h1>
            <p className="mt-4 text-xs sm:text-sm !text-white/95 leading-relaxed font-medium drop-shadow-md">
              From the golden stupas of Lhasa's Potala Palace to the rugged northern face of Mount Everest and the sacred circumambulation of Mount Kailash. We handle 100% of the Tibet Travel Permits, Chinese group visas, and private overland logistics directly from Kathmandu.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="#packages"
                className="px-6 py-3 rounded-xl bg-[#7FA05C] hover:bg-[#6E8C4E] text-white font-extrabold text-xs shadow-lg transition-all active:scale-95 cursor-pointer"
              >
                View Tibet Packages
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-colors"
              >
                Inquire for Permits
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Fast Facts Banner */}
      <section className="bg-white border-b border-[#7C8A96]/20 py-6 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <AnimatedTravelBadge icon="boot" label="EXPEDITION READINESS" animation="animate-gentle-pulse" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-3 border-r border-[#7C8A96]/15 last:border-none">
              <div className="text-[10px] uppercase font-bold text-[#7FA05C]">Avg. Altitude</div>
              <div className="font-heading font-extrabold text-lg text-[#2D4A34] mt-0.5">3,650m — 5,200m</div>
              <div className="text-[11px] text-[#7C8A96]">Oxygen provided on road</div>
            </div>
            <div className="p-3 border-r border-[#7C8A96]/15 last:border-none">
              <div className="text-[10px] uppercase font-bold text-[#7FA05C]">Best Season</div>
              <div className="font-heading font-extrabold text-lg text-[#2D4A34] mt-0.5">May to October</div>
              <div className="text-[11px] text-[#7C8A96]">Mild weather & clear skies</div>
            </div>
            <div className="p-3 border-r border-[#7C8A96]/15 last:border-none">
              <div className="text-[10px] uppercase font-bold text-[#7FA05C]">Permit Processing</div>
              <div className="font-heading font-extrabold text-lg text-[#2D4A34] mt-0.5">15 — 20 Days</div>
              <div className="text-[11px] text-[#7C8A96]">Advance passport copy</div>
            </div>
            <div className="p-3">
              <div className="text-[10px] uppercase font-bold text-[#7FA05C]">Entry Points</div>
              <div className="font-heading font-extrabold text-lg text-[#2D4A34] mt-0.5">Kathmandu or Chengdu</div>
              <div className="text-[11px] text-[#7C8A96]">Daily flight & overland</div>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Animated small 2D camera sticker in corner */}
        <div className="absolute top-10 right-6 pointer-events-none z-20 hidden md:block">
          <RetroCameraSticker className="w-12 h-10 animate-tilt-float drop-shadow-sm" />
        </div>

        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 mb-2">
            <AnimatedTravelBadge icon="backpack" label="SACRED ROUTES" animation="animate-float-gentle" />
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#2D4A34]">
            Featured Tibet Expedition Routes
          </h2>
          <p className="text-xs sm:text-sm text-[#7C8A96] mt-2 leading-relaxed">
            All departures are accompanied by licensed Tibetan English-speaking guides, clean acclimatized private transport, oxygen concentrators, and 3-4 star boutique Tibetan hotels.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TIBET_EXPEDITIONS.map((tour) => (
            <Card
              key={tour.id}
              className="group overflow-hidden rounded-2xl border border-[#7C8A96]/25 bg-white shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative h-56 w-full overflow-hidden bg-slate-200">
                <Image
                  src={tour.image}
                  alt={tour.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full bg-[#2D4A34]/90 backdrop-blur-xs text-white text-[10px] font-bold">
                    {tour.grade}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3">
                  <span className="px-3 py-1 rounded-xl bg-white/95 backdrop-blur-xs text-[#2D4A34] text-xs font-extrabold shadow-sm">
                    From {formatPrice(tour.priceUSD)}
                  </span>
                </div>
              </div>

              <CardContent className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-3 text-xs text-[#7C8A96] mb-2 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock className="size-3.5 text-[#7FA05C]" /> {tour.duration}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Mountain className="size-3.5 text-[#7FA05C]" /> {tour.maxAltitude}
                    </span>
                  </div>

                  <h3 className="font-heading font-extrabold text-base text-[#2D4A34] group-hover:text-[#7FA05C] transition-colors line-clamp-2">
                    {tour.title}
                  </h3>

                  <ul className="mt-4 space-y-1.5 text-xs text-[#33322E]">
                    {tour.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="size-3.5 text-[#7FA05C] shrink-0 mt-0.5" />
                        <span className="text-[#33322E]/90 leading-tight">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#7C8A96]/15 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#7C8A96] uppercase font-bold block">All-Inclusive</span>
                    <span className="text-sm font-extrabold text-[#2D4A34]">{formatPrice(tour.priceUSD)}</span>
                  </div>
                  <Link
                    href={`/booking?package=${tour.slug}`}
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

      {/* Tibet Permit & Visa Guide */}
      <section className="bg-white border-y border-[#7C8A96]/20 py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <AnimatedTravelBadge icon="passport" label="GOVT TTB CLEARANCE" animation="animate-tilt-float" />
              </div>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#2D4A34] tracking-tight">
                How Tibet Permits & Visas Work with Zenith Himalaya
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-[#7C8A96] leading-relaxed">
                Independent foreign travel in Tibet is restricted by Chinese law. Travelers must be part of an organized tour with pre-cleared permits, a registered guide, and designated vehicle. We coordinate the full four-step pipeline seamlessly on your behalf.
              </p>

              <div className="mt-8 space-y-4">
                {PERMIT_REQUIREMENTS.map((item) => (
                  <div key={item.step} className="flex items-start gap-4 p-3.5 rounded-xl bg-[#F5F3EF] border border-[#7C8A96]/15">
                    <div className="size-8 rounded-full bg-[#2D4A34] text-white flex items-center justify-center font-bold text-xs shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-xs text-[#2D4A34]">{item.title}</h4>
                      <p className="text-[11px] text-[#7C8A96] mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#2D4A34] text-[#F5F3EF] p-8 sm:p-10 rounded-3xl relative overflow-hidden shadow-xl">
              {/* Animated visible 2D passport stamp */}
              <div className="absolute top-4 right-4 pointer-events-none z-20">
                <PassportStamp text="TTB PERMIT" date="2026" className="w-16 h-16 opacity-90 text-white animate-tilt-float" />
              </div>

              <div className="relative z-10 space-y-4">
                <div className="size-12 rounded-xl bg-white/10 text-[#7FA05C] flex items-center justify-center border border-white/20">
                  <ShieldCheck className="size-7" />
                </div>
                <h3 className="font-heading font-extrabold text-xl text-white">
                  99.8% Tibet Permit Approval Track Record
                </h3>
                <p className="text-xs text-[#F5F3EF]/85 leading-relaxed">
                  We have been processing Tibet Travel Permits continuously since 2008. Our Kathmandu operations team maintains daily coordination with the Lhasa tourism liaison office.
                </p>

                <div className="pt-3 border-t border-white/15 space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-[#7FA05C]" />
                    <span>Free rebooking if border regulations shift</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-[#7FA05C]" />
                    <span>Individual passport scan safety protocol</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-[#7FA05C]" />
                    <span>Direct Lhasa flight tickets arranged</span>
                  </div>
                </div>

                <div className="pt-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#7FA05C] hover:bg-[#6E8C4E] text-white font-bold text-xs transition-colors"
                  >
                    <span>Request Tibet Permit Checklist</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-[#1F2E23] text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          {/* Subtle animated plane asset */}
          <div className="absolute top-4 right-4 pointer-events-none z-10">
            <AnimatedTravelBadge icon="plane" label="KTM TO LHASA" animation="animate-float-drift" className="bg-white/10 border-white/20 text-white" />
          </div>

          <div className="max-w-xl relative z-10">
            <Badge className="bg-[#D9A23B] text-black border-none font-extrabold text-[10px] mb-3">
              May — Oct 2026 Departures Open
            </Badge>
            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl">
              Combine Nepal & Tibet for the Ultimate Himalayan Crossing
            </h3>
            <p className="text-xs text-white/80 mt-2 leading-relaxed">
              Fly directly from Kathmandu over Mount Everest into Lhasa, or travel overland through the historic Kyirong border crossing.
            </p>
          </div>

          <div className="flex items-center gap-3 relative z-10">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl bg-[#7FA05C] hover:bg-[#6E8C4E] text-white font-extrabold text-xs shadow-md transition-all active:scale-95"
            >
              Plan Tibet Route
            </Link>
            <Link
              href="/booking"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-colors"
            >
              Book Dates
            </Link>
          </div>
        </div>
      </section>

      <AgencyFooter />
    </div>
  );
}
