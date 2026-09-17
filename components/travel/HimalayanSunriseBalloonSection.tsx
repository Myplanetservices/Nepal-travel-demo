"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Compass,
  Clock,
  ShieldCheck,
  Sun,
  Sunset,
  Eye,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  AnimatedTravelBadge,
  PassportStamp,
} from "@/components/travel/TravelStickers";
import { useCurrency } from "@/components/agency/CurrencyContext";

interface FlightOption {
  id: "sunrise" | "sunset";
  name: "Dawn Sunrise Launch" | "Golden Twilight Flight";
  time: string;
  altitude: string;
  visibility: string;
  duration: string;
  vistaHighlight: string;
  temp: string;
  priceUSD: number;
}

const FLIGHT_MODES: Record<"sunrise" | "sunset", FlightOption> = {
  sunrise: {
    id: "sunrise",
    name: "Dawn Sunrise Launch",
    time: "05:45 AM Launch",
    altitude: "3,000m (9,842 ft) ASL",
    visibility: "50+ km Clear Alpine Horizon",
    duration: "60 Min Flight Window",
    vistaHighlight: "First golden sunbeams striking Machapuchare (Fishtail) & Annapurna I (8,091m)",
    temp: "12°C - 16°C Morning Thermal",
    priceUSD: 195,
  },
  sunset: {
    id: "sunset",
    name: "Golden Twilight Flight",
    time: "04:30 PM Launch",
    altitude: "2,600m (8,530 ft) ASL",
    visibility: "35+ km Amber Valley Horizon",
    duration: "55 Min Flight Window",
    vistaHighlight: "Warm sunset reflections mirrored across Phewa Lake and the Sarangkot ridge",
    temp: "18°C - 21°C Evening Calm",
    priceUSD: 175,
  },
};

export function HimalayanSunriseBalloonSection() {
  const { formatPrice } = useCurrency();
  const [activeMode, setActiveMode] = useState<"sunrise" | "sunset">("sunrise");
  const flight = FLIGHT_MODES[activeMode];

  return (
    <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/80 min-h-[460px] flex flex-col justify-between transition-all duration-700 bg-gradient-to-r from-[#172E20] via-[#233F2E] to-[#452714]">
        {/* Background Mountain Photo Overlay for authentic depth */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-overlay">
          <Image
            src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1800&auto=format&fit=crop"
            alt="Annapurna Range Skyline"
            fill
            className="object-cover object-bottom"
          />
        </div>

        {/* Ambient Sunrise Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D9A23B]/20 rounded-full blur-3xl pointer-events-none" />

        {/* 3D Floating Assets - Primary Large Balloon */}
        <div className="absolute bottom-6 right-6 sm:right-16 z-20 size-40 sm:size-52 pointer-events-none drop-shadow-2xl animate-float-slow">
          <Image
            src="/images/assets/hot-air-balloon.png"
            alt="3D Hot Air Balloon Floating"
            fill
            className="object-contain filter contrast-105"
          />
        </div>

        {/* 3D Secondary Distant Balloon */}
        <div className="absolute top-10 right-48 sm:right-72 z-10 size-16 sm:size-24 pointer-events-none opacity-85 animate-float-drift">
          <Image
            src="/images/assets/hot-air-balloon.png"
            alt="Distant Hot Air Balloon"
            fill
            className="object-contain drop-shadow-md"
          />
        </div>

        {/* Floating 3D Cloud Assets */}
        <div className="absolute top-8 left-8 sm:left-14 z-10 w-28 h-18 pointer-events-none animate-float-drift opacity-80">
          <Image
            src="/images/assets/fluffy-cloud.png"
            alt="Fluffy Alpine Cloud"
            fill
            className="object-contain drop-shadow-sm"
          />
        </div>

        <div className="absolute bottom-8 left-1/3 z-10 w-32 h-20 pointer-events-none opacity-60 animate-float-slow hidden md:block">
          <Image
            src="/images/assets/fluffy-cloud.png"
            alt="Alpine Mist Cloud"
            fill
            className="object-contain drop-shadow-sm"
          />
        </div>

        {/* Decorative Stamp in Corner */}
        <div className="absolute top-8 right-6 hidden lg:block pointer-events-none z-10">
          <PassportStamp
            text="POKHARA AERIAL"
            subtext="ANNAPURNA"
            date="2026"
            className="w-18 h-18 text-white/70 animate-tilt-float"
          />
        </div>

        {/* Main Content Area */}
        <div className="relative z-30 p-6 sm:p-12 max-w-2xl flex flex-col justify-between h-full">
          <div>
            {/* Top Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge className="bg-[#D9A23B] text-slate-900 border-none font-bold text-xs">
                POKHARA SPECIALTY EXPEDITION
              </Badge>
              <AnimatedTravelBadge
                icon="hot-air-balloon"
                label="3,000M RIDGE ASCENT"
                animation="animate-gentle-pulse"
                variant="dark"
                size="size-4"
              />
            </div>

            {/* Headline */}
            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight leading-tight">
              Soar Above Annapurna at Sunrise in a High-Altitude Hot Air Balloon
            </h3>

            <p className="mt-3 text-xs sm:text-sm text-[#F5F3EF]/85 leading-relaxed font-medium">
              Take flight over the Pokhara Valley and Phewa Lake as the first rays of dawn illuminate the dramatic jagged pyramid of Machapuchare and the Annapurna giants. Nepal’s premier aerial sunrise experience.
            </p>

            {/* Interactive Flight Mode Toggle */}
            <div className="mt-6 inline-flex p-1 rounded-xl bg-black/35 backdrop-blur-md border border-white/15">
              <button
                type="button"
                onClick={() => setActiveMode("sunrise")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeMode === "sunrise"
                    ? "bg-[#D9A23B] text-slate-950 shadow-md"
                    : "text-white/80 hover:text-white"
                }`}
              >
                <Sun className="size-3.5" />
                <span>Dawn Sunrise (05:45 AM)</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveMode("sunset")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeMode === "sunset"
                    ? "bg-[#D9A23B] text-slate-950 shadow-md"
                    : "text-white/80 hover:text-white"
                }`}
              >
                <Sunset className="size-3.5" />
                <span>Golden Twilight (16:30 PM)</span>
              </button>
            </div>

            {/* Live Interactive Flight Specs Grid */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-w-lg">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-2.5 border border-white/15">
                <div className="text-[10px] uppercase font-bold text-[#D9A23B] flex items-center gap-1">
                  <Compass className="size-3" /> Max Altitude
                </div>
                <div className="text-xs font-extrabold text-white mt-0.5">{flight.altitude}</div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-2.5 border border-white/15">
                <div className="text-[10px] uppercase font-bold text-[#D9A23B] flex items-center gap-1">
                  <Clock className="size-3" /> Duration
                </div>
                <div className="text-xs font-extrabold text-white mt-0.5">{flight.duration}</div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-2.5 border border-white/15 col-span-2 sm:col-span-1">
                <div className="text-[10px] uppercase font-bold text-[#D9A23B] flex items-center gap-1">
                  <ShieldCheck className="size-3" /> Safety
                </div>
                <div className="text-xs font-extrabold text-white mt-0.5">CAAN Certified</div>
              </div>
            </div>

            {/* Live Vista Note */}
            <div className="mt-3 text-[11px] text-white/80 flex items-start gap-1.5 max-w-lg bg-black/20 rounded-lg p-2 border border-white/10">
              <Eye className="size-3.5 text-[#D9A23B] shrink-0 mt-0.5" />
              <span>
                <strong>Panoramic Vista:</strong> {flight.vistaHighlight}
              </span>
            </div>
          </div>

          {/* Action Row & Pricing */}
          <div className="mt-8 pt-5 border-t border-white/15 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-white/60 font-semibold">
                All-Inclusive Flight Package
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-heading font-extrabold text-2xl text-white">
                  {formatPrice(flight.priceUSD)}
                </span>
                <span className="text-xs text-white/70">/ person (Transfers + Breakfast)</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Link
                href="/booking"
                className="px-6 py-3 rounded-full bg-[#D9A23B] hover:bg-[#C8922C] text-slate-950 font-extrabold text-xs shadow-xl transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
              >
                <span>Reserve Flight Slot</span>
                <ArrowRight className="size-3.5" />
              </Link>
              <Link
                href="/contact"
                className="px-4 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-colors"
              >
                Inquire
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
