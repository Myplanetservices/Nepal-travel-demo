"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  CheckCircle2,
  CreditCard,
  Sparkles,
  ShieldAlert,
  ArrowRight,
} from "lucide-react";

interface BeforeAfterProps {
  agencyName?: string;
  agencyLogo?: string;
  accentColor?: string;
  customTrek?: string;
  isPersonalized?: boolean;
  onRequestPreview?: () => void;
}

export function BeforeAfterSection({
  agencyName = "Annapurna Himalayan Expeditions",
  customTrek = "Annapurna Sanctuary & Base Camp 12-Day",
  isPersonalized = false,
  onRequestPreview,
}: BeforeAfterProps) {
  return (
    <section id="before-after" className="py-20 md:py-28 bg-[#F5F3EF] border-y border-[#7C8A96]/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge variant="meadow" className="mb-3">
            The Digital Gap in Nepal
          </Badge>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#2D4A34] tracking-tight">
            Before vs. After: What Happens When a Foreign Trekker Finds You
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#33322E] leading-relaxed font-medium">
            International travelers spend $1,500 to $4,000+ on Himalayan expeditions. When they see an unorganized Facebook page, they hesitate and leave. When they see a modern, verified booking portal, they reserve immediately.
          </p>
        </div>

        {/* Dedicated Side-by-Side Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch max-w-6xl mx-auto">
          {/* ================= BEFORE CARD ================= */}
          <div className="rounded-3xl border-2 border-[#DD6B2E]/40 bg-[#EBE8E1] p-6 sm:p-8 flex flex-col justify-between shadow-md relative overflow-hidden">
            {/* Top Red Status Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-[#7C8A96]/35 mb-6">
              <div className="flex items-center gap-2">
                <div className="size-3 rounded-full bg-[#DD6B2E]/60" />
                <div className="size-3 rounded-full bg-[#7C8A96]/40" />
                <div className="size-3 rounded-full bg-[#7C8A96]/20" />
                <span className="text-xs text-[#33322E]/80 font-mono ml-1 font-semibold">
                  m.facebook.com/{agencyName.toLowerCase().replace(/[^a-z0-9]/g, "")}
                </span>
              </div>
              <Badge variant="outline" className="gap-1.5 border-[#DD6B2E]/50 text-[#DD6B2E] bg-[#DD6B2E]/10 font-bold">
                <ShieldAlert className="size-3 text-[#DD6B2E]" />
                BEFORE: Status Quo
              </Badge>
            </div>

            {/* Outdated Facebook Post Mockup */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-[#7C8A96]/30 flex items-center justify-center text-[#33322E] text-xs font-bold shrink-0">
                  FB
                </div>
                <div>
                  <div className="text-sm font-bold text-[#33322E]">
                    {agencyName}
                  </div>
                  <div className="text-[11px] text-[#33322E]/60">
                    Facebook Page · Last active 3 weeks ago
                  </div>
                </div>
              </div>

              {/* Realistic Messy Social Post Box */}
              <div className="p-4 bg-white rounded-2xl border border-[#7C8A96]/30 text-xs text-[#33322E] space-y-2.5 leading-relaxed shadow-xs">
                <p className="font-extrabold text-[#DD6B2E] text-xs uppercase tracking-wide">
                  🔥 SPECIAL DISCOUNT AUTUMN 2026 TREK!! 🔥
                </p>
                <p className="font-medium text-[#33322E]">
                  Best price Annapurna & Everest trek sir! Inbox us for best deal or WhatsApp us at +977-9841... No fixed dates, we arrange anytime. Send wire transfer to local bank. Email: info.treks123@gmail.com
                </p>
                
                {/* Real Comment Frustrations */}
                <div className="pt-3 border-t border-[#7C8A96]/25 space-y-2">
                  <div className="bg-[#F5F3EF] p-2 rounded-lg">
                    <span className="font-bold text-[11px] text-[#33322E]">Sarah M. (UK):</span>
                    <span className="text-[11px] text-[#33322E]/80 ml-1.5">
                      "What are the exact departure dates for October? Does price include permits? Messaged 2 days ago with no reply..."
                    </span>
                  </div>
                  <div className="bg-[#F5F3EF] p-2 rounded-lg">
                    <span className="font-bold text-[11px] text-[#33322E]">Lukas W. (Germany):</span>
                    <span className="text-[11px] text-[#33322E]/80 ml-1.5">
                      "Can we pay by credit card with buyer protection? Wire transfer to personal account feels unsafe."
                    </span>
                  </div>
                </div>
              </div>

              {/* Red Warning Friction Points */}
              <div className="grid grid-cols-2 gap-2 pt-2 text-center text-xs font-bold">
                <div className="p-2.5 bg-white rounded-xl border border-[#DD6B2E]/30 text-[#DD6B2E] flex items-center justify-center gap-1.5">
                  <span>❌</span>
                  <span>No Card Gateway</span>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-[#DD6B2E]/30 text-[#DD6B2E] flex items-center justify-center gap-1.5">
                  <span>❌</span>
                  <span>12h Timezone Lag</span>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-[#DD6B2E]/30 text-[#DD6B2E] flex items-center justify-center gap-1.5">
                  <span>❌</span>
                  <span>20% OTA Commission</span>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-[#DD6B2E]/30 text-[#DD6B2E] flex items-center justify-center gap-1.5">
                  <span>❌</span>
                  <span>Zero SEO Ranking</span>
                </div>
              </div>
            </div>

            {/* Bottom Loss Metric */}
            <div className="mt-6 pt-4 border-t border-[#7C8A96]/30 flex items-center gap-2.5 text-xs text-[#DD6B2E] font-bold">
              <AlertTriangle className="size-4 shrink-0 text-[#DD6B2E]" />
              <span>Result: 72% of foreign leads abandon after waiting hours for a price quote</span>
            </div>
          </div>

          {/* ================= AFTER CARD ================= */}
          <div className="rounded-3xl border-2 border-[#7FA05C]/50 bg-[#2D4A34] text-[#F5F3EF] p-6 sm:p-8 flex flex-col justify-between shadow-elevated relative overflow-hidden">
            {/* Top Green Browser Chrome */}
            <div className="flex items-center justify-between pb-4 border-b border-[#F5F3EF]/20 mb-6">
              <div className="flex items-center gap-2">
                <div className="size-3 rounded-full bg-[#DD6B2E]" />
                <div className="size-3 rounded-full bg-[#D9A23B]" />
                <div className="size-3 rounded-full bg-[#7FA05C]" />
                <span className="text-xs text-[#F5F3EF]/90 font-mono ml-1 font-semibold flex items-center gap-1">
                  <span>🔒</span>
                  <span>https://{agencyName.toLowerCase().replace(/[^a-z0-9]/g, "")}.com</span>
                </span>
              </div>
              <Badge variant="meadow" className="gap-1.5 shadow-sm bg-[#7FA05C]/30 text-[#F5F3EF] border-[#7FA05C]/60 font-bold">
                <Sparkles className="size-3 text-[#D9A23B]" />
                AFTER: High-Converting Portal
              </Badge>
            </div>

            {/* Modern Interactive Platform Mockup */}
            <div className="space-y-4">
              <div>
                <span className="text-[11px] uppercase tracking-wider font-extrabold text-[#D9A23B]">
                  Official Licensed Outfitter · TAAN & NTB Certified
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#F5F3EF] mt-1">
                  {customTrek}
                </h3>
                <p className="text-xs sm:text-sm text-[#F5F3EF]/90 leading-relaxed font-medium mt-1">
                  Direct departures with licensed Sherpa guides, TIMS permits, teahouse lodges & 24/7 mountain rescue insurance included.
                </p>
              </div>

              {/* Route Elevation Metrics */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-[#243c2a] rounded-xl p-2.5 border border-[#7C8A96]/40">
                  <span className="text-[10px] text-[#7FA05C] block uppercase font-bold">Duration</span>
                  <span className="text-sm font-extrabold text-[#F5F3EF]">12 Days</span>
                </div>
                <div className="bg-[#243c2a] rounded-xl p-2.5 border border-[#7C8A96]/40">
                  <span className="text-[10px] text-[#7FA05C] block uppercase font-bold">Max Altitude</span>
                  <span className="text-sm font-extrabold text-[#F5F3EF]">4,130m</span>
                </div>
                <div className="bg-[#243c2a] rounded-xl p-2.5 border border-[#7C8A96]/40">
                  <span className="text-[10px] text-[#7FA05C] block uppercase font-bold">Transparent Price</span>
                  <span className="text-sm font-extrabold text-[#F5F3EF]">$890 USD</span>
                </div>
              </div>

              {/* Instant Booking Widget */}
              <div className="bg-[#243c2a] rounded-2xl p-4 border border-[#7FA05C]/35 space-y-2.5 shadow-sm">
                <div className="flex items-center justify-between text-xs font-bold text-[#F5F3EF]">
                  <span className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-[#7FA05C] animate-pulse" />
                    Instant Trek Booking
                  </span>
                  <span className="text-[#D9A23B] font-mono text-[10px]">Instant Confirmation Voucher</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="bg-[#2D4A34] rounded-lg p-2 text-xs border border-[#7C8A96]/30 text-[#F5F3EF]">
                    Departure: <span className="font-bold text-[#D9A23B]">Oct 14, 2026 (Peak)</span>
                  </div>
                  <div className="bg-[#2D4A34] rounded-lg p-2 text-xs border border-[#7C8A96]/30 text-[#F5F3EF]">
                    Party: <span className="font-bold text-[#D9A23B]">2 Adults ($1,780)</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="w-full py-2.5 rounded-full bg-[#DD6B2E] hover:bg-[#C55920] text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md border border-[#C55920] cursor-pointer transition-colors"
                >
                  <CreditCard className="size-3.5" />
                  <span>Reserve with 15% Deposit ($267 via Stripe / Apple Pay)</span>
                </button>
              </div>

              {/* Green Verified Benefit Pills */}
              <div className="grid grid-cols-2 gap-2 text-center text-xs font-bold">
                <div className="p-2.5 bg-[#243c2a] rounded-xl border border-[#7FA05C]/40 text-[#7FA05C] flex items-center justify-center gap-1.5">
                  <span>✓</span>
                  <span>24/7 Automated Booking</span>
                </div>
                <div className="p-2.5 bg-[#243c2a] rounded-xl border border-[#7FA05C]/40 text-[#7FA05C] flex items-center justify-center gap-1.5">
                  <span>✓</span>
                  <span>0% Foreign Commission</span>
                </div>
                <div className="p-2.5 bg-[#243c2a] rounded-xl border border-[#7FA05C]/40 text-[#7FA05C] flex items-center justify-center gap-1.5">
                  <span>✓</span>
                  <span>1-Click WhatsApp CRM</span>
                </div>
                <div className="p-2.5 bg-[#243c2a] rounded-xl border border-[#7FA05C]/40 text-[#7FA05C] flex items-center justify-center gap-1.5">
                  <span>✓</span>
                  <span>High Google SEO Rank</span>
                </div>
              </div>
            </div>

            {/* Bottom Gain Metric */}
            <div className="mt-6 pt-4 border-t border-[#F5F3EF]/20 flex items-center gap-2.5 text-xs text-[#D9A23B] font-extrabold">
              <CheckCircle2 className="size-4 shrink-0 text-[#7FA05C]" />
              <span>Result: 3.5x higher direct inquiry conversion while keeping 100% agency margins</span>
            </div>
          </div>
        </div>

        {/* Head-to-Head Comparison Breakdown Table */}
        <div className="mt-14 max-w-5xl mx-auto bg-white rounded-3xl border border-[#7C8A96]/30 overflow-hidden shadow-card">
          <div className="px-6 py-5 bg-[#2D4A34] text-[#F5F3EF] flex items-center justify-between">
            <h3 className="font-heading font-extrabold text-lg sm:text-xl">
              Direct Head-to-Head Comparison
            </h3>
            <span className="text-xs text-[#D9A23B] font-bold uppercase tracking-wider">
              Why It Matters for Your Revenue
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#7C8A96]/25 bg-[#F5F3EF] text-[#2D4A34] font-bold">
                  <th className="py-3.5 px-5 w-1/4">Key Dimension</th>
                  <th className="py-3.5 px-5 w-[37.5%] text-[#DD6B2E]">Outdated Agency (Before)</th>
                  <th className="py-3.5 px-5 w-[37.5%] text-[#2D4A34]">My Planet Services (After)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#7C8A96]/20 font-medium text-[#33322E]">
                <tr className="hover:bg-[#F5F3EF]/50 transition-colors">
                  <td className="py-3.5 px-5 font-bold text-[#2D4A34]">Booking Speed</td>
                  <td className="py-3.5 px-5 text-[#33322E]/85">
                    24–48 hours of tedious back-and-forth WhatsApp chats
                  </td>
                  <td className="py-3.5 px-5 font-bold text-[#2D4A34]">
                    Instant card deposit in under 2 minutes with calendar sync
                  </td>
                </tr>
                <tr className="hover:bg-[#F5F3EF]/50 transition-colors">
                  <td className="py-3.5 px-5 font-bold text-[#2D4A34]">International Trust</td>
                  <td className="py-3.5 px-5 text-[#33322E]/85">
                    Unverified Facebook page; foreigners fear wire transfer fraud
                  </td>
                  <td className="py-3.5 px-5 font-bold text-[#2D4A34]">
                    Official SSL portal with government & TAAN license validation
                  </td>
                </tr>
                <tr className="hover:bg-[#F5F3EF]/50 transition-colors">
                  <td className="py-3.5 px-5 font-bold text-[#2D4A34]">OTA Commission Loss</td>
                  <td className="py-3.5 px-5 text-[#33322E]/85">
                    Forced to give 20% ($400–$800/trekker) to Viator or TourRadar
                  </td>
                  <td className="py-3.5 px-5 font-bold text-[#2D4A34]">
                    0% commission — you retain 100% of your earnings
                  </td>
                </tr>
                <tr className="hover:bg-[#F5F3EF]/50 transition-colors">
                  <td className="py-3.5 px-5 font-bold text-[#2D4A34]">Timezone Coverage</td>
                  <td className="py-3.5 px-5 text-[#33322E]/85">
                    Agency asleep when US/European travelers plan trips in the evening
                  </td>
                  <td className="py-3.5 px-5 font-bold text-[#2D4A34]">
                    24/7 automated booking engine running continuously
                  </td>
                </tr>
                <tr className="hover:bg-[#F5F3EF]/50 transition-colors">
                  <td className="py-3.5 px-5 font-bold text-[#2D4A34]">Route Experience</td>
                  <td className="py-3.5 px-5 text-[#33322E]/85">
                    Blurry copied text and phone screenshots of itineraries
                  </td>
                  <td className="py-3.5 px-5 font-bold text-[#2D4A34]">
                    Interactive 3D elevation maps, day-by-day pass profiles & packing lists
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Reusable Preview CTA banner */}
        {!isPersonalized && (
          <div className="mt-12 max-w-4xl mx-auto text-center bg-white rounded-2xl p-6 border border-[#7C8A96]/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            <div className="text-left">
              <h4 className="font-heading font-bold text-base text-[#2D4A34]">
                Want to see what your agency's site would look like?
              </h4>
              <p className="text-xs text-[#33322E] font-medium mt-0.5">
                We generate custom, branded interactive previews for Nepal travel agencies in under 10 minutes.
              </p>
            </div>
            <Button
              variant="primary"
              size="md"
              onClick={
                onRequestPreview
                  ? onRequestPreview
                  : () => {
                      const el = document.getElementById("contact");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }
              }
              className="shrink-0 gap-2"
            >
              <span>Get Your Agency's Preview</span>
              <ArrowRight className="size-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
