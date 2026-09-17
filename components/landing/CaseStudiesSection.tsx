import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Compass, TrendingUp, Star } from "lucide-react";

export function CaseStudiesSection() {
  return (
    <section id="work" className="py-20 md:py-28 bg-[#F5F3EF] relative border-b border-[#7C8A96]/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <Badge variant="meadow" className="mb-3">
              Proven Transformations
            </Badge>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#2D4A34] tracking-tight">
              Selected Nepal Agency Showcases
            </h2>
            <p className="mt-3 text-base text-[#33322E]/85 max-w-xl font-medium">
              Real outcomes from upgrading local outfitters from outdated social media pages to modern, direct-booking web platforms.
            </p>
          </div>

          <Link href="/demo/annapurna-treks">
            <Button variant="secondary" size="md" className="gap-2">
              <Compass className="size-4 text-[#F5F3EF]" />
              <span>Launch Live Interactive Demo</span>
            </Button>
          </Link>
        </div>

        {/* Case Studies Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Featured Large Case Study (Span 7) */}
          <Card className="lg:col-span-7 overflow-hidden border border-[#7C8A96]/30 bg-white text-[#33322E] p-6 sm:p-8 flex flex-col justify-between relative shadow-card group min-h-[460px]">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <Badge variant="gold" className="gap-1 shadow-xs">
                  <Star className="size-3 fill-current" />
                  Flagship Case Study
                </Badge>
                <span className="text-xs font-mono text-[#7C8A96] font-semibold">Pokhara & Kathmandu</span>
              </div>

              <span className="text-xs uppercase font-bold text-[#7FA05C] tracking-wider">
                Annapurna Trekking & Expedition
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#2D4A34] mt-1">
                From 100% Social Media Reliance to $140K in Direct Treks
              </h3>
              <p className="text-sm text-[#33322E]/85 mt-3 max-w-lg leading-relaxed font-medium">
                Previously operating only via a Facebook business page and scattered WhatsApp groups, this 14-year-old agency replaced OTA middleman fees with a modern booking portal.
              </p>
            </div>

            {/* Impact Metric Bar */}
            <div className="mt-8 pt-6 border-t border-[#7C8A96]/25 grid grid-cols-3 gap-4">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold font-heading text-[#2D4A34]">
                  +380%
                </div>
                <div className="text-xs text-[#7C8A96] mt-0.5 font-bold">Direct Bookings</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold font-heading text-[#2D4A34]">
                  $0
                </div>
                <div className="text-xs text-[#7C8A96] mt-0.5 font-bold">OTA Platform Fees</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold font-heading text-[#2D4A34]">
                  1.1s
                </div>
                <div className="text-xs text-[#7C8A96] mt-0.5 font-bold">Mobile Load Speed</div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <Link href="/demo/annapurna-treks" className="inline-flex items-center gap-2 text-sm font-bold text-[#3E7C94] hover:text-[#2D4A34] transition-colors">
                <span>Experience the Live Demo Site</span>
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </Card>

          {/* Stacked Secondary Case Studies (Span 5) */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
            {/* Card 2: Everest Sherpa Expeditions */}
            <Card className="p-6 bg-white border-[#7C8A96]/25 shadow-card flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] uppercase font-bold tracking-wider text-[#7FA05C]">
                    Khumbu High-Altitude Outfitter
                  </span>
                  <span className="text-xs font-mono text-[#7C8A96]">Namche Bazaar</span>
                </div>
                <h4 className="text-lg font-bold font-heading text-[#2D4A34]">
                  Everest Sherpa Alpine Adventures
                </h4>
                <p className="text-xs text-[#33322E]/85 mt-2 leading-relaxed font-medium">
                  Implemented an automated altitude medical questionnaire, Sherpa bio showcase, and direct credit card deposits for luxury EBC heli-treks.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#7C8A96]/25 flex items-center justify-between text-xs">
                <span className="font-bold text-[#2D4A34] flex items-center gap-1">
                  <TrendingUp className="size-3.5 text-[#7FA05C]" /> 4.6x Higher Booking Value
                </span>
                <span className="text-[#7C8A96] font-semibold">100% Sherpa Owned</span>
              </div>
            </Card>

            {/* Card 3: Langtang Eco Treks */}
            <Card className="p-6 bg-white border-[#7C8A96]/25 shadow-card flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] uppercase font-bold tracking-wider text-[#7FA05C]">
                    Sustainable Eco-Trekking
                  </span>
                  <span className="text-xs font-mono text-[#7C8A96]">Thamel, Kathmandu</span>
                </div>
                <h4 className="text-lg font-bold font-heading text-[#2D4A34]">
                  Langtang Heritage Cultural Trails
                </h4>
                <p className="text-xs text-[#33322E]/85 mt-2 leading-relaxed font-medium">
                  Upgraded from a slow WordPress site that crashed on mobile. New Next.js architecture boosted Google search traffic from the UK and Germany by 220%.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#7C8A96]/25 flex items-center justify-between text-xs">
                <span className="font-bold text-[#2D4A34] flex items-center gap-1">
                  <TrendingUp className="size-3.5 text-[#7FA05C]" /> #1 Google Rank for "Langtang Circuit"
                </span>
                <span className="text-[#7C8A96] font-semibold">Bypassed OTAs</span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
