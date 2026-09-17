"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Mountain,
  ShieldCheck,
  Award,
  HeartHandshake,
  Users,
  Compass,
  ArrowRight,
  HeartPulse,
  Leaf,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AnimatedTravelBadge } from "@/components/travel/TravelStickers";

export default function AboutPage() {
  return (
    <div className="w-full bg-[#F5F3EF]">
      {/* Hero Banner */}
      <div className="bg-[#2D4A34] text-[#F5F3EF] py-16 lg:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Badge className="bg-[#7FA05C] text-white border-none font-bold text-xs">
              Born & Raised in the Himalayas
            </Badge>
            <AnimatedTravelBadge icon="mountain" label="ESTABLISHED 2011" animation="animate-float-gentle" variant="dark" />
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white">
            Authentic Mountain Guiding with Uncompromising Safety
          </h1>
          <p className="mt-4 text-xs sm:text-sm text-[#F5F3EF]/90 leading-relaxed font-medium">
            Founded in 2011 in Kathmandu, we bridge international mountain adventurers with native Himalayan Sherpa wisdom, fair porter ethics, and genuine cultural immersion.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Story & Heritage */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4 text-xs sm:text-sm text-[#33322E] leading-relaxed">
            <div className="text-xs font-extrabold uppercase tracking-wider text-[#7FA05C]">
              Our Foundation Story
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#2D4A34]">
              More Than Just a Trekking Company. A Local Family.
            </h2>
            <p>
              Unlike foreign booking portals that outsource operations to nameless third parties, Annapurna Treks is owned and operated 100% on the ground in Nepal. Every guide on our roster is certified by the Nepal Academy of Tourism and Hotel Management (NATHM) and holds international Wilderness First Aid credentials.
            </p>
            <p>
              We believe the mountains demand respect. That's why our itineraries incorporate generous acclimatization schedules, daily pulse oximeter testing, and sustainable tourism ethics that ensure remote mountain communities directly benefit from your journey.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs font-bold text-[#2D4A34]">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="size-4 text-[#7FA05C]" />
                <span>Govt License #48201</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="size-4 text-[#7FA05C]" />
                <span>TAAN & NMA Member</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Leaf className="size-4 text-[#7FA05C]" />
                <span>Zero Trace Waste Partner</span>
              </div>
            </div>
          </div>

          <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-slate-100">
            <Image
              src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop"
              alt="Himalayan mountain peaks"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Ethical Porter Welfare & Safety Commitments */}
        <div className="bg-white rounded-2xl p-8 sm:p-12 border border-[#7C8A96]/20 shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="text-xs font-extrabold uppercase tracking-wider text-[#7FA05C] mb-1">
              Ethical Guiding Standards
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#2D4A34]">
              Our Guiding Principles & Commitments
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2.5 text-xs">
              <div className="size-11 rounded-xl bg-[#2D4A34] text-[#7FA05C] flex items-center justify-center font-bold mb-3 shadow-xs">
                <HeartHandshake className="size-5" />
              </div>
              <h3 className="font-heading font-extrabold text-sm text-[#2D4A34]">
                100% Porter Welfare (IPPG Guidelines)
              </h3>
              <p className="text-[#7C8A96] leading-relaxed">
                Porters are the true backbone of the Himalayas. We strictly enforce the 20kg weight limit, provide warm gear, comprehensive medical insurance, and above-industry fair living wages.
              </p>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="size-11 rounded-xl bg-[#2D4A34] text-[#7FA05C] flex items-center justify-center font-bold mb-3 shadow-xs">
                <HeartPulse className="size-5 text-[#fa0000]" />
              </div>
              <h3 className="font-heading font-extrabold text-sm text-[#2D4A34]">
                Medical Safety & Oximeter Checks
              </h3>
              <p className="text-[#7C8A96] leading-relaxed">
                Every team carries daily pulse oximeters, altitude medication kits, and direct 24/7 satellite emergency links with helicopter evacuation hospitals in Kathmandu.
              </p>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="size-11 rounded-xl bg-[#2D4A34] text-[#7FA05C] flex items-center justify-center font-bold mb-3 shadow-xs">
                <Leaf className="size-5" />
              </div>
              <h3 className="font-heading font-extrabold text-sm text-[#2D4A34]">
                Leave No Trace & Eco-Tourism
              </h3>
              <p className="text-[#7C8A96] leading-relaxed">
                We forbid single-use plastic water bottles, encourage UV water purifiers, support local village lodge economies, and partner with the Sagarmatha Pollution Control Committee.
              </p>
            </div>
          </div>
        </div>

        {/* Leadership & Guides */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="text-xs font-extrabold uppercase tracking-wider text-[#7FA05C] mb-1">
              Meet The Experts
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#2D4A34]">
              Our Senior Guides & Operations Team
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-[#7C8A96]/20 shadow-xs text-center flex flex-col items-center">
              <div className="relative size-24 rounded-full overflow-hidden bg-slate-200 mb-4 border-2 border-[#7FA05C]">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop"
                  alt="Dawa Sherpa"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-heading font-extrabold text-base text-[#2D4A34]">
                Dawa Sherpa
              </h3>
              <div className="text-[11px] font-bold text-[#7FA05C] uppercase tracking-wider mb-2">
                Managing Director · 6x Everest Summiteer
              </div>
              <p className="text-xs text-[#7C8A96] leading-relaxed">
                Born in Solukhumbu, Dawa has led over 60 high-altitude Himalayan expeditions across Everest, Manaslu, and Annapurna over 18 years.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#7C8A96]/20 shadow-xs text-center flex flex-col items-center">
              <div className="relative size-24 rounded-full overflow-hidden bg-slate-200 mb-4 border-2 border-[#7FA05C]">
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop"
                  alt="Sunita Thapa"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-heading font-extrabold text-base text-[#2D4A34]">
                Sunita Thapa
              </h3>
              <div className="text-[11px] font-bold text-[#7FA05C] uppercase tracking-wider mb-2">
                Co-Founder & Operations Director
              </div>
              <p className="text-xs text-[#7C8A96] leading-relaxed">
                Pioneering female tourism leadership in Nepal, Sunita oversees client logistics, Bhutan visa clearances, and responsible community initiatives.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#7C8A96]/20 shadow-xs text-center flex flex-col items-center">
              <div className="relative size-24 rounded-full overflow-hidden bg-slate-200 mb-4 border-2 border-[#7FA05C]">
                <Image
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop"
                  alt="Pasang Nuru"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-heading font-extrabold text-base text-[#2D4A34]">
                Pasang Nuru
              </h3>
              <div className="text-[11px] font-bold text-[#7FA05C] uppercase tracking-wider mb-2">
                Lead Trekking Guide · UIAGM Certified
              </div>
              <p className="text-xs text-[#7C8A96] leading-relaxed">
                Specializing in Thorong La and Larkya La pass traverses, Pasang is renowned for his humor, calm altitude crisis management, and trail botanical knowledge.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#2D4A34] text-white p-8 sm:p-12 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-heading font-extrabold text-xl sm:text-2xl">
              Ready to Explore the Roof of the World?
            </h3>
            <p className="text-xs text-white/80 mt-1">
              Browse our guaranteed departures or request a custom itinerary directly with our Sherpas.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/demo/annapurna-treks#packages"
              className="px-5 py-2.5 rounded-xl bg-[#7FA05C] hover:bg-[#6E8C4E] text-white font-extrabold text-xs shadow-md transition-colors"
            >
              Explore Treks
            </Link>
            <Link
              href="/demo/annapurna-treks/contact"
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
