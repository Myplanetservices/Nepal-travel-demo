"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Compass,
  MapPin,
  Mountain,
  BookOpen,
  Calendar,
  Phone,
  ShieldCheck,
  FileText,
  Sparkles,
  ArrowRight,
  Plane,
  Layers,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MainAgencyNav } from "@/components/agency/MainAgencyNav";
import { AgencyFooter } from "@/components/agency/AgencyFooter";
import {
  PassportStamp,
  PaperAirplaneContrail,
  AnimatedTravelBadge,
} from "@/components/travel/TravelStickers";
import { DEMO_PACKAGES } from "@/lib/demo-agency-data";

export default function SitemapPage() {
  return (
    <div className="min-h-screen bg-[#F5F3EF] flex flex-col font-sans">
      <MainAgencyNav />

      {/* Hero Header */}
      <section className="relative bg-[#1B2F22] text-[#F5F3EF] pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden">
        {/* Background Hero Image with Atmospheric Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1920&auto=format&fit=crop"
            alt="Himalayan Panorama"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-black/60" />
        </div>

        {/* Animated 2D Stickers */}
        <div className="absolute top-32 right-12 hidden md:flex items-center gap-2 pointer-events-none z-20">
          <AnimatedTravelBadge
            icon="compass"
            label="EXPEDITION DIRECTORY"
            animation="animate-float-gentle"
            variant="dark"
          />
        </div>
        <div className="absolute top-40 right-28 pointer-events-none opacity-80 hidden lg:block z-10">
          <PaperAirplaneContrail className="w-24 h-14 animate-float-drift" />
        </div>
        <div className="absolute bottom-6 right-8 hidden sm:block pointer-events-none z-20">
          <PassportStamp
            text="INDEX & SITEMAP"
            date="2026"
            className="w-16 h-16 opacity-90 text-white animate-tilt-float"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Badge className="bg-[#7FA05C] text-white border-none font-bold text-xs shadow-md">
              Zenith Himalaya Directory
            </Badge>
            <AnimatedTravelBadge
              icon="map"
              label="COMPLETE SITEMAP"
              animation="animate-gentle-pulse"
              variant="dark"
            />
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl !text-white tracking-tight leading-tight drop-shadow-lg">
            Expedition Sitemap & Trail Directory
          </h1>
          <p className="mt-3 text-xs sm:text-sm !text-white/95 leading-relaxed font-medium drop-shadow-md">
            Explore every corner of the Zenith Himalaya portal—including signature Nepal trekking routes, Bhutan and Tibet expeditions, regional filters, field journals, and legal resources.
          </p>
        </div>
      </section>

      {/* Main Sitemap Content Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Group 1: Core Navigation & Agency */}
          <div className="bg-white rounded-2xl p-6 border border-[#7C8A96]/20 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 font-heading font-extrabold text-base text-[#2D4A34] pb-3 border-b border-[#7C8A96]/15">
              <Compass className="size-5 text-[#7FA05C]" />
              <span>Core Portals</span>
            </div>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/" className="font-bold text-[#2D4A34] hover:text-[#7FA05C] transition-colors flex items-center justify-between">
                  <span>Home — Himalayan Expeditions</span>
                  <ArrowRight className="size-3.5 text-[#7C8A96]" />
                </Link>
                <div className="text-[11px] text-[#7C8A96]">Main interactive portal with 3D terrain & route finder</div>
              </li>
              <li>
                <Link href="/about" className="font-bold text-[#2D4A34] hover:text-[#7FA05C] transition-colors flex items-center justify-between">
                  <span>About Us — Sherpa Heritage</span>
                  <ArrowRight className="size-3.5 text-[#7C8A96]" />
                </Link>
                <div className="text-[11px] text-[#7C8A96]">Agency history since 2008, team credentials, porter welfare</div>
              </li>
              <li>
                <Link href="/tour" className="font-bold text-[#2D4A34] hover:text-[#7FA05C] transition-colors flex items-center justify-between">
                  <span>All Expeditions Catalogue</span>
                  <ArrowRight className="size-3.5 text-[#7C8A96]" />
                </Link>
                <div className="text-[11px] text-[#7C8A96]">Searchable index with altitude & difficulty filters</div>
              </li>
              <li>
                <Link href="/blog" className="font-bold text-[#2D4A34] hover:text-[#7FA05C] transition-colors flex items-center justify-between">
                  <span>Guides & Field Journal</span>
                  <ArrowRight className="size-3.5 text-[#7C8A96]" />
                </Link>
                <div className="text-[11px] text-[#7C8A96]">Altitude science, gear checklists, and culture guides</div>
              </li>
              <li>
                <Link href="/contact" className="font-bold text-[#2D4A34] hover:text-[#7FA05C] transition-colors flex items-center justify-between">
                  <span>Contact Headquarters</span>
                  <ArrowRight className="size-3.5 text-[#7C8A96]" />
                </Link>
                <div className="text-[11px] text-[#7C8A96]">Thamel Kathmandu HQ, Pokhara branch, direct guide hotline</div>
              </li>
              <li>
                <Link href="/booking" className="font-bold text-[#2D4A34] hover:text-[#7FA05C] transition-colors flex items-center justify-between">
                  <span>Expedition Booking Engine</span>
                  <ArrowRight className="size-3.5 text-[#7C8A96]" />
                </Link>
                <div className="text-[11px] text-[#7C8A96]">10% deposit reservation calculator with tier pricing</div>
              </li>
            </ul>
          </div>

          {/* Group 2: Signature Nepal Expeditions */}
          <div className="bg-white rounded-2xl p-6 border border-[#7C8A96]/20 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 font-heading font-extrabold text-base text-[#2D4A34] pb-3 border-b border-[#7C8A96]/15">
              <Mountain className="size-5 text-[#7FA05C]" />
              <span>Signature Nepal Treks</span>
            </div>
            <ul className="space-y-3 text-xs">
              {DEMO_PACKAGES.filter((p) => p.destination === "Nepal").map((pkg) => (
                <li key={pkg.id}>
                  <Link
                    href={`/tour/${pkg.slug}`}
                    className="font-bold text-[#2D4A34] hover:text-[#7FA05C] transition-colors flex items-center justify-between"
                  >
                    <span>{pkg.title}</span>
                    <Badge className="bg-[#7FA05C]/15 text-[#2D4A34] border-none text-[10px] font-bold">
                      {pkg.duration}
                    </Badge>
                  </Link>
                  <div className="text-[11px] text-[#7C8A96]">
                    Max Altitude: {pkg.altitude} · Grade: {pkg.difficulty}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Group 3: Regional Exploration Hubs */}
          <div className="bg-white rounded-2xl p-6 border border-[#7C8A96]/20 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 font-heading font-extrabold text-base text-[#2D4A34] pb-3 border-b border-[#7C8A96]/15">
              <MapPin className="size-5 text-[#7FA05C]" />
              <span>Trekking Regions</span>
            </div>
            <ul className="space-y-3 text-xs">
              <li>
                <Link
                  href="/tour?region=Everest"
                  className="font-bold text-[#2D4A34] hover:text-[#7FA05C] transition-colors flex items-center justify-between"
                >
                  <span>Everest / Khumbu Region</span>
                  <ArrowRight className="size-3.5 text-[#7C8A96]" />
                </Link>
                <div className="text-[11px] text-[#7C8A96]">Kala Patthar, Gokyo Lakes, Cho La & Kongma La high passes</div>
              </li>
              <li>
                <Link
                  href="/tour?region=Annapurna"
                  className="font-bold text-[#2D4A34] hover:text-[#7FA05C] transition-colors flex items-center justify-between"
                >
                  <span>Annapurna & Mustang Region</span>
                  <ArrowRight className="size-3.5 text-[#7C8A96]" />
                </Link>
                <div className="text-[11px] text-[#7C8A96]">Thorong La Pass (5,416m), Annapurna Base Camp, Poon Hill</div>
              </li>
              <li>
                <Link
                  href="/tour?region=Manaslu"
                  className="font-bold text-[#2D4A34] hover:text-[#7FA05C] transition-colors flex items-center justify-between"
                >
                  <span>Manaslu Restricted Wilderness</span>
                  <ArrowRight className="size-3.5 text-[#7C8A96]" />
                </Link>
                <div className="text-[11px] text-[#7C8A96]">Larkya La Pass (5,106m), Tsum Valley sacred Tibetan borderlands</div>
              </li>
              <li>
                <Link
                  href="/tour?region=Langtang"
                  className="font-bold text-[#2D4A34] hover:text-[#7FA05C] transition-colors flex items-center justify-between"
                >
                  <span>Langtang Valley & Helambu</span>
                  <ArrowRight className="size-3.5 text-[#7C8A96]" />
                </Link>
                <div className="text-[11px] text-[#7C8A96]">Kyanjin Gompa, Tserko Ri, sacred Gosainkunda alpine lakes</div>
              </li>
            </ul>
          </div>

          {/* Group 4: Cross-Border Himalayan Kingdoms */}
          <div className="bg-white rounded-2xl p-6 border border-[#7C8A96]/20 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 font-heading font-extrabold text-base text-[#2D4A34] pb-3 border-b border-[#7C8A96]/15">
              <Plane className="size-5 text-[#7FA05C]" />
              <span>Himalayan Kingdoms</span>
            </div>
            <ul className="space-y-3 text-xs">
              <li>
                <Link
                  href="/bhutan"
                  className="font-bold text-[#2D4A34] hover:text-[#7FA05C] transition-colors flex items-center justify-between"
                >
                  <span>Kingdom of Bhutan</span>
                  <Badge className="bg-[#D9A23B]/20 text-[#2D4A34] border-none text-[10px] font-bold">
                    SDF Included
                  </Badge>
                </Link>
                <div className="text-[11px] text-[#7C8A96]">Paro Taktsang (Tiger's Nest), Punakha Dzong, Drukair connections</div>
              </li>
              <li>
                <Link
                  href="/tibet"
                  className="font-bold text-[#2D4A34] hover:text-[#7FA05C] transition-colors flex items-center justify-between"
                >
                  <span>Tibet Autonomous Region</span>
                  <Badge className="bg-[#3E7C94]/20 text-[#2D4A34] border-none text-[10px] font-bold">
                    Permits Handled
                  </Badge>
                </Link>
                <div className="text-[11px] text-[#7C8A96]">Lhasa Potala Palace, Mount Kailash Kora, Everest North Base Camp</div>
              </li>
            </ul>
          </div>

          {/* Group 5: Field Journal Articles */}
          <div className="bg-white rounded-2xl p-6 border border-[#7C8A96]/20 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 font-heading font-extrabold text-base text-[#2D4A34] pb-3 border-b border-[#7C8A96]/15">
              <BookOpen className="size-5 text-[#7FA05C]" />
              <span>Field Journal & Advice</span>
            </div>
            <ul className="space-y-3 text-xs">
              <li>
                <Link href="/blog#blog-1" className="font-bold text-[#2D4A34] hover:text-[#7FA05C] transition-colors block">
                  The Complete High-Pass Packing Guide
                </Link>
                <div className="text-[11px] text-[#7C8A96]">Layering systems, boots, down jackets, and sleeping bags</div>
              </li>
              <li>
                <Link href="/blog#blog-2" className="font-bold text-[#2D4A34] hover:text-[#7FA05C] transition-colors block">
                  Altitude Acclimatization & Diamox Medical Science
                </Link>
                <div className="text-[11px] text-[#7C8A96]">Preventing AMS, pulse oximeter thresholds, hydration</div>
              </li>
              <li>
                <Link href="/blog#blog-3" className="font-bold text-[#2D4A34] hover:text-[#7FA05C] transition-colors block">
                  Autumn vs Spring: Choosing Your Season
                </Link>
                <div className="text-[11px] text-[#7C8A96]">Clear sky windows, temperatures, and rhododendron blooms</div>
              </li>
              <li>
                <Link href="/blog#blog-4" className="font-bold text-[#2D4A34] hover:text-[#7FA05C] transition-colors block">
                  Teahouse Etiquette & Sherpa Culture
                </Link>
                <div className="text-[11px] text-[#7C8A96]">Respecting prayer stones, dining rituals, and mountain customs</div>
              </li>
            </ul>
          </div>

          {/* Group 6: Legal, Accreditations & Tech */}
          <div className="bg-white rounded-2xl p-6 border border-[#7C8A96]/20 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 font-heading font-extrabold text-base text-[#2D4A34] pb-3 border-b border-[#7C8A96]/15">
              <ShieldCheck className="size-5 text-[#7FA05C]" />
              <span>Legal & Accreditations</span>
            </div>
            <ul className="space-y-3 text-xs">
              <li>
                <Link href="/privacy-policy" className="font-bold text-[#2D4A34] hover:text-[#7FA05C] transition-colors flex items-center justify-between">
                  <span>Privacy Policy</span>
                  <ArrowRight className="size-3.5 text-[#7C8A96]" />
                </Link>
                <div className="text-[11px] text-[#7C8A96]">Passport data security, emergency rescue disclosures</div>
              </li>
              <li>
                <Link href="/terms-of-booking" className="font-bold text-[#2D4A34] hover:text-[#7FA05C] transition-colors flex items-center justify-between">
                  <span>Terms of Booking</span>
                  <ArrowRight className="size-3.5 text-[#7C8A96]" />
                </Link>
                <div className="text-[11px] text-[#7C8A96]">10% deposit terms, rescue insurance, porter welfare guarantee</div>
              </li>
            </ul>
          </div>
        </div>
      </main>

      <AgencyFooter />
    </div>
  );
}
