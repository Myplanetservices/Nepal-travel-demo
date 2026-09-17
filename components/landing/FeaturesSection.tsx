"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  CalendarCheck2,
  Smartphone,
  MessageCircleMore,
  Mountain,
  Check,
  Send,
  Sparkles,
  MapPin,
  Users,
} from "lucide-react";

export function FeaturesSection() {
  const [selectedTrek, setSelectedTrek] = useState("annapurna");
  const [groupSize, setGroupSize] = useState(2);
  const [activeDay, setActiveDay] = useState(2);
  const [sentWhatsapp, setSentWhatsapp] = useState(false);

  const itineraryDays = [
    { day: 1, stop: "Kathmandu to Pokhara (820m)", note: "Scenic highway transfer & orientation briefing" },
    { day: 2, stop: "Nayapul to Tikhedhunga (1,540m)", note: "Trail begins through Modi Khola rhododendron forest" },
    { day: 3, stop: "Tikhedhunga to Ghorepani (2,860m)", note: "Ulleri stone staircase climb, breathtaking Dhaulagiri vista" },
    { day: 4, stop: "Poon Hill Sunrise to Tadapani (2,630m)", note: "Golden panoramic sunrise over 8,000m Annapurna peaks" },
  ];

  return (
    <section id="features" className="py-20 md:py-28 bg-[#F5F3EF] border-b border-[#7C8A96]/25 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge variant="meadow" className="mb-3">
            Core Agency Capabilities
          </Badge>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#2D4A34] tracking-tight">
            Engineered Specifically for the Nepal Trekking Industry
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#33322E] leading-relaxed font-medium">
            Generic business templates fail because trekking agencies have unique challenges: multi-day itineraries, altitude warnings, permit checklists, and foreign currency payments.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: Direct Online Booking Engine (Span 7) */}
          <Card className="md:col-span-7 p-6 sm:p-8 bg-white border-[#7C8A96]/25 flex flex-col justify-between shadow-card hover:shadow-xl transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="size-12 rounded-xl bg-[#F5F3EF] border border-[#7C8A96]/30 flex items-center justify-center text-[#2D4A34]">
                  <CalendarCheck2 className="size-6" />
                </div>
                <span className="text-xs font-mono font-bold text-[#7C8A96]">01 / BOOKING ENGINE</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#2D4A34] mb-2">
                Automated Online Booking & Deposit Checkout
              </h3>
              <p className="text-sm text-[#33322E]/85 leading-relaxed font-medium">
                Allow international travelers to reserve their trekking dates 24/7. Automatically calculate group discounts, issue digital vouchers, and collect deposits in USD, EUR, or GBP.
              </p>

              {/* Interactive Booking Widget Demo */}
              <div className="mt-6 p-4 rounded-xl bg-[#F5F3EF] border border-[#7C8A96]/30 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-[#2D4A34]">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="size-3.5 text-[#D9A23B]" /> Live Client Booking Simulator
                  </span>
                  <span className="text-[#2D4A34] bg-white border border-[#7C8A96]/30 px-2 py-0.5 rounded text-[10px] font-bold">
                    Stripe / Card Ready
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedTrek("annapurna")}
                    className={`p-2.5 rounded-lg text-left text-xs transition-all border cursor-pointer ${
                      selectedTrek === "annapurna"
                        ? "bg-[#2D4A34] text-[#F5F3EF] border-[#2D4A34] font-bold shadow-xs"
                        : "bg-white text-[#33322E] border-[#7C8A96]/30 hover:border-[#2D4A34]"
                    }`}
                  >
                    <div>Annapurna Sanctuary</div>
                    <div className="text-[10px] opacity-80 mt-0.5">$890 / person</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedTrek("everest")}
                    className={`p-2.5 rounded-lg text-left text-xs transition-all border cursor-pointer ${
                      selectedTrek === "everest"
                        ? "bg-[#2D4A34] text-[#F5F3EF] border-[#2D4A34] font-bold shadow-xs"
                        : "bg-white text-[#33322E] border-[#7C8A96]/30 hover:border-[#2D4A34]"
                    }`}
                  >
                    <div>Everest Base Camp</div>
                    <div className="text-[10px] opacity-80 mt-0.5">$1,290 / person</div>
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs pt-1 border-t border-[#7C8A96]/25 font-semibold">
                  <span className="flex items-center gap-1 text-[#33322E]">
                    <Users className="size-3.5 text-[#3E7C94]" /> Trekkers:
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setGroupSize(Math.max(1, groupSize - 1))}
                      className="size-6 rounded bg-white border border-[#7C8A96]/30 flex items-center justify-center font-bold text-[#33322E] hover:bg-[#F5F3EF] cursor-pointer"
                    >
                      -
                    </button>
                    <span className="font-bold text-[#33322E]">{groupSize}</span>
                    <button
                      type="button"
                      onClick={() => setGroupSize(groupSize + 1)}
                      className="size-6 rounded bg-white border border-[#7C8A96]/30 flex items-center justify-center font-bold text-[#33322E] hover:bg-[#F5F3EF] cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                  <span className="font-mono font-bold text-[#2D4A34] text-sm">
                    ${(selectedTrek === "annapurna" ? 890 : 1290) * groupSize} USD
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#7C8A96]/25 flex items-center gap-4 text-xs font-bold text-[#33322E]">
              <span className="flex items-center gap-1">
                <Check className="size-3.5 text-[#7FA05C]" /> Multi-Currency
              </span>
              <span className="flex items-center gap-1">
                <Check className="size-3.5 text-[#7FA05C]" /> Instant PDF Invoice
              </span>
              <span className="flex items-center gap-1">
                <Check className="size-3.5 text-[#7FA05C]" /> Calendar Sync
              </span>
            </div>
          </Card>

          {/* Card 2: 1-Click WhatsApp Lead Stream (Span 5) */}
          <Card className="md:col-span-5 p-6 sm:p-8 bg-white border-[#7C8A96]/25 flex flex-col justify-between shadow-card hover:shadow-xl transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="size-12 rounded-xl bg-[#F5F3EF] border border-[#7C8A96]/30 text-[#2D4A34] flex items-center justify-center">
                  <MessageCircleMore className="size-6" />
                </div>
                <span className="text-xs font-mono font-bold text-[#7C8A96]">02 / LEAD STREAM</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#2D4A34] mb-2">
                1-Click WhatsApp Inquiries
              </h3>
              <p className="text-sm text-[#33322E]/85 leading-relaxed font-medium">
                Connect visitors directly to your agency director's phone. Route inquiries with pre-filled trek names, dates, and pax count so no context is lost.
              </p>

              {/* Simulated WhatsApp Chat Box */}
              <div className="mt-6 bg-[#F5F3EF] border border-[#7C8A96]/30 rounded-xl p-4 text-xs space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-[#7C8A96]/25">
                  <div className="size-2.5 rounded-full bg-[#7FA05C] animate-pulse" />
                  <span className="font-bold text-[#2D4A34]">WhatsApp Business API Gateway</span>
                </div>

                <div className="bg-white p-3 rounded-lg border border-[#7C8A96]/30 shadow-xs space-y-1">
                  <p className="text-[#33322E] font-mono text-[11px]">
                    "Namaste! I want to book the Annapurna Circuit Trek in October for 2 people. Can you confirm permit dates?"
                  </p>
                  <span className="text-[9px] text-[#7C8A96] block text-right">Just now · Pre-formatted</span>
                </div>

                <button
                  type="button"
                  onClick={() => setSentWhatsapp(true)}
                  disabled={sentWhatsapp}
                  className="w-full py-2.5 px-3 rounded-lg bg-[#3E7C94] hover:bg-[#32657A] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-[#32657A]"
                >
                  <Send className="size-3 text-white" />
                  <span>{sentWhatsapp ? "✓ Lead Delivered to WhatsApp!" : "Test 1-Click WhatsApp Trigger"}</span>
                </button>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#7C8A96]/25 flex items-center justify-between text-xs font-bold text-[#33322E]">
              <span className="text-[#7FA05C]">Zero Lost Messages</span>
              <span>Direct to Agency Mobile</span>
            </div>
          </Card>

          {/* Card 3: Interactive Itinerary & Altitude Profile (Span 6) */}
          <Card className="md:col-span-6 p-6 sm:p-8 bg-white border-[#7C8A96]/25 flex flex-col justify-between shadow-card hover:shadow-xl transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="size-12 rounded-xl bg-[#F5F3EF] border border-[#7C8A96]/30 text-[#2D4A34] flex items-center justify-center">
                  <Mountain className="size-6" />
                </div>
                <span className="text-xs font-mono font-bold text-[#7C8A96]">03 / ROUTE STORYTELLING</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#2D4A34] mb-2">
                Interactive Itinerary & Altitude Profile
              </h3>
              <p className="text-sm text-[#33322E]/85 leading-relaxed font-medium">
                Replace dull static PDF flyers with interactive day-by-day itineraries showing elevation gains, accommodation types, and photo galleries.
              </p>

              {/* Interactive Day Breakdown */}
              <div className="mt-6 space-y-2">
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                  {itineraryDays.map((item) => (
                    <button
                      key={item.day}
                      type="button"
                      onClick={() => setActiveDay(item.day)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                        activeDay === item.day
                          ? "bg-[#2D4A34] text-[#F5F3EF] shadow-xs"
                          : "bg-[#F5F3EF] text-[#33322E] border border-[#7C8A96]/30 hover:bg-[#EBE8E1]"
                      }`}
                    >
                      Day {item.day}
                    </button>
                  ))}
                </div>

                <div className="p-3.5 rounded-xl bg-[#F5F3EF] border border-[#7C8A96]/30 text-xs space-y-1">
                  <div className="font-bold text-[#2D4A34] flex items-center gap-1.5">
                    <MapPin className="size-3.5 text-[#7FA05C]" />
                    {itineraryDays[activeDay - 1].stop}
                  </div>
                  <p className="text-[#33322E]/85 text-xs leading-relaxed font-medium">
                    {itineraryDays[activeDay - 1].note}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#7C8A96]/25 flex items-center justify-between text-xs font-bold text-[#33322E]">
              <span className="text-[#7FA05C]">Engages Trekkers 3x Longer</span>
              <span>Reduces Pre-Trip Support Inquiries</span>
            </div>
          </Card>

          {/* Card 4: Mobile-First Speed & Offline Readiness (Span 6) */}
          <Card className="md:col-span-6 p-6 sm:p-8 bg-white border-[#7C8A96]/25 flex flex-col justify-between shadow-card hover:shadow-xl transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="size-12 rounded-xl bg-[#F5F3EF] border border-[#7C8A96]/30 text-[#2D4A34] flex items-center justify-center">
                  <Smartphone className="size-6" />
                </div>
                <span className="text-xs font-mono font-bold text-[#7C8A96]">04 / MOBILE PERFORMANCE</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#2D4A34] mb-2">
                Lightning Fast on Mountain 3G/4G Networks
              </h3>
              <p className="text-sm text-[#33322E]/85 leading-relaxed font-medium">
                Over 78% of travelers in Nepal browse on their phones while on buses or in teahouses. Our sites load under 1.2s with next-gen image optimization and offline caching.
              </p>

              <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                <div className="p-3 bg-[#F5F3EF] rounded-xl border border-[#7C8A96]/30">
                  <span className="text-xl font-extrabold font-heading text-[#2D4A34] block">98/100</span>
                  <span className="text-[10px] text-[#7C8A96] uppercase font-bold">Lighthouse Mobile</span>
                </div>
                <div className="p-3 bg-[#F5F3EF] rounded-xl border border-[#7C8A96]/30">
                  <span className="text-xl font-extrabold font-heading text-[#2D4A34] block">0.8s</span>
                  <span className="text-[10px] text-[#7C8A96] uppercase font-bold">First Contentful Paint</span>
                </div>
                <div className="p-3 bg-[#F5F3EF] rounded-xl border border-[#7C8A96]/30">
                  <span className="text-xl font-extrabold font-heading text-[#2D4A34] block">Zero</span>
                  <span className="text-[10px] text-[#7C8A96] uppercase font-bold">Layout Shift (CLS)</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#7C8A96]/25 flex items-center justify-between text-xs font-bold text-[#33322E]">
              <span className="text-[#33322E] font-semibold">Next.js 15 App Router</span>
              <span>Fully Responsive on iOS & Android</span>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
