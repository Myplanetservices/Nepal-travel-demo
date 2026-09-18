"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MainAgencyNav } from "@/components/agency/MainAgencyNav";
import { AgencyFooter } from "@/components/agency/AgencyFooter";
import {
  PassportStamp,
  PaperAirplaneContrail,
  FancyTravelIcon,
  BoardingTicketsSticker,
  AnimatedTravelBadge,
  AnimatedTravelIcon,
} from "@/components/travel/TravelStickers";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    destination: "Nepal",
    duration: "10-14 Days",
    travelers: "2",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F5F3EF] flex flex-col font-sans">
      <MainAgencyNav />

      <div className="bg-[#1B2F22] text-[#F5F3EF] pt-28 pb-14 lg:pt-36 lg:pb-18 relative overflow-hidden">
        {/* Background Hero Image with Atmospheric Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1920&auto=format&fit=crop"
            alt="Kathmandu Valley and Himalayan Mountain Peaks"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-black/60" />
        </div>
        {/* Animated small 2D badges & stamps */}
        <div className="absolute top-32 right-12 hidden md:flex items-center gap-2 pointer-events-none z-20">
          <AnimatedTravelBadge icon="map" label="KATHMANDU HQ & POKHARA" animation="animate-float-gentle" variant="dark" />
        </div>
        <div className="absolute top-40 right-28 pointer-events-none opacity-80 hidden lg:block z-10">
          <PaperAirplaneContrail className="w-24 h-14 animate-float-drift" />
        </div>
        <div className="absolute bottom-6 right-8 hidden sm:block pointer-events-none z-20">
          <PassportStamp text="EXPEDITION HQ" date="2026" className="w-16 h-16 opacity-90 text-white animate-tilt-float" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl relative z-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Badge className="bg-[#7FA05C] text-white border-none font-bold text-xs shadow-md">
              Local Himalayan Experts Available 24/7
            </Badge>
            <AnimatedTravelBadge icon="compass" label="24/7 SUPPORT" animation="animate-gentle-pulse" variant="dark" />
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight !text-white drop-shadow-lg">
            Get in Touch With Our Sherpa Directors
          </h1>
          <p className="mt-3 text-xs sm:text-sm !text-white/95 leading-relaxed drop-shadow-md">
            Have questions about altitudes, acclimatization routes, customized private groups, or Bhutan visas? Our certified guides respond within a few hours.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <AnimatedTravelBadge icon="compass" label="DIRECT ASSISTANCE" animation="animate-gentle-pulse" />
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#7C8A96]/20 shadow-xs">
              <div className="flex items-center gap-2 font-heading font-extrabold text-sm text-[#2D4A34] mb-3">
                <MapPin className="size-4 text-[#7FA05C]" />
                <span>Head Office — Kathmandu</span>
              </div>
              <p className="text-xs text-[#7C8A96] leading-relaxed mb-4">
                Amrit Marga, Thamel (Opposite Kathmandu Guest House), Kathmandu 44600, Nepal.
              </p>
              <div className="space-y-2 text-xs text-[#33322E]">
                <div className="flex items-center gap-2">
                  <Phone className="size-3.5 text-[#7FA05C]" />
                  <span>+977-1-4701234 / +977-1-4705678</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="size-3.5 text-[#7FA05C]" />
                  <a href="mailto:contact@zenithhimalaya.com" className="hover:text-[#7FA05C] transition-colors">
                    contact@zenithhimalaya.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#7C8A96]/20 shadow-xs">
              <div className="flex items-center gap-2 font-heading font-extrabold text-sm text-[#2D4A34] mb-3">
                <MapPin className="size-4 text-[#7FA05C]" />
                <span>Branch Office — Pokhara</span>
              </div>
              <p className="text-xs text-[#7C8A96] leading-relaxed mb-4">
                Lakeside-6, Baidam Road (Near Phewa Lake), Pokhara 33700, Nepal.
              </p>
              <div className="space-y-2 text-xs text-[#33322E]">
                <div className="flex items-center gap-2">
                  <Phone className="size-3.5 text-[#7FA05C]" />
                  <span>+977-61-465432</span>
                </div>
              </div>
            </div>

            <div className="bg-[#2D4A34] text-white p-6 rounded-2xl shadow-sm space-y-3 relative overflow-hidden">
              {/* Animated visible 2D passport stamp */}
              <div className="absolute -bottom-2 -right-2 pointer-events-none z-10">
                <PassportStamp text="24/7 SUPPORT" date="2026" className="w-16 h-16 opacity-90 text-white animate-tilt-float" />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-sm text-[#7FA05C]">
                  <Phone className="size-4 text-[#7FA05C]" />
                  <span>24/7 Guide Hotline</span>
                </div>
                <AnimatedTravelBadge icon="tickets" label="INSTANT" animation="animate-gentle-pulse" variant="dark" size="size-3.5" />
              </div>
              <p className="text-xs text-white/80 leading-relaxed">
                Connect directly with Senior Trek Director Dawa Sherpa for immediate itinerary customization.
              </p>
              <a
                href="tel:+9779801234567"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#7FA05C] hover:bg-[#6E8C4E] text-white font-bold text-xs transition-colors shadow-xs"
              >
                <span>Call +977 980-1234567</span>
              </a>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#7C8A96]/20 shadow-xs text-xs space-y-2 relative overflow-hidden">
              <div className="flex items-center gap-2 font-bold text-[#2D4A34] mb-2">
                <Clock className="size-4 text-[#7FA05C]" />
                <span>Office Opening Hours</span>
              </div>
              <div className="flex justify-between text-[#7C8A96]">
                <span>Sunday — Friday:</span>
                <span className="font-bold text-[#33322E]">8:00 AM — 7:00 PM NST</span>
              </div>
              <div className="flex justify-between text-[#7C8A96]">
                <span>Saturday:</span>
                <span className="font-bold text-[#33322E]">9:00 AM — 4:00 PM NST</span>
              </div>
              <div className="flex justify-between text-[#7C8A96]">
                <span>Trail Emergency:</span>
                <span className="font-bold text-[#7FA05C]">24/7 Mobile Standby</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white p-6 sm:p-10 rounded-2xl border border-[#7C8A96]/20 shadow-sm relative">
              {/* Animated small 2D boarding ticket sticker */}
              <div className="absolute top-6 right-6 pointer-events-none z-20 hidden sm:block">
                <BoardingTicketsSticker className="w-12 h-10 animate-tilt-float drop-shadow-sm" />
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <AnimatedTravelBadge icon="plane" label="TAILOR-MADE ITINERARIES" animation="animate-float-gentle" />
                </div>
                <h2 className="font-heading font-extrabold text-2xl text-[#2D4A34]">
                  Plan Your Tailor-Made Himalayan Trip
                </h2>
                <p className="text-xs text-[#7C8A96] mt-1">
                  Fill in your travel preferences and our destination specialists will craft a bespoke day-by-day itinerary and price quote with zero commitment.
                </p>
              </div>

              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="size-16 rounded-full bg-[#7FA05C]/20 text-[#7FA05C] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="size-10" />
                  </div>
                  <h3 className="font-heading font-extrabold text-2xl text-[#2D4A34]">
                    Thank You, {formData.name || "Explorer"}!
                  </h3>
                  <p className="text-xs sm:text-sm text-[#7C8A96] max-w-md mx-auto leading-relaxed">
                    Your custom trip request has been assigned to a senior destination manager. We will review your dates and email you a customized proposal within 6 to 12 hours.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSubmitted(false)}
                    className="mt-4"
                  >
                    Send Another Inquiry
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#2D4A34] mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Elena Rostova"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full h-11 px-3.5 bg-[#F5F3EF] border border-[#7C8A96]/30 rounded-xl text-xs font-medium focus:outline-none focus:border-[#2D4A34]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#2D4A34] mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="elena@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full h-11 px-3.5 bg-[#F5F3EF] border border-[#7C8A96]/30 rounded-xl text-xs font-medium focus:outline-none focus:border-[#2D4A34]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#2D4A34] mb-1.5">
                        Phone / Contact Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+61 400 123 456"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full h-11 px-3.5 bg-[#F5F3EF] border border-[#7C8A96]/30 rounded-xl text-xs font-medium focus:outline-none focus:border-[#2D4A34]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#2D4A34] mb-1.5">
                        Country of Residence
                      </label>
                      <input
                        type="text"
                        placeholder="Australia"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="w-full h-11 px-3.5 bg-[#F5F3EF] border border-[#7C8A96]/30 rounded-xl text-xs font-medium focus:outline-none focus:border-[#2D4A34]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#2D4A34] mb-1.5">
                        Destination
                      </label>
                      <select
                        value={formData.destination}
                        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                        className="w-full h-11 px-3 bg-[#F5F3EF] border border-[#7C8A96]/30 rounded-xl text-xs font-bold focus:outline-none focus:border-[#2D4A34] cursor-pointer"
                      >
                        <option value="Nepal">Nepal (Everest / Annapurna / Manaslu)</option>
                        <option value="Bhutan">Bhutan Kingdom</option>
                        <option value="Tibet">Tibet Overland</option>
                        <option value="Multi-Country">Combined Nepal + Bhutan</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#2D4A34] mb-1.5">
                        Duration
                      </label>
                      <select
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        className="w-full h-11 px-3 bg-[#F5F3EF] border border-[#7C8A96]/30 rounded-xl text-xs font-bold focus:outline-none focus:border-[#2D4A34] cursor-pointer"
                      >
                        <option value="1-7 Days">1 - 7 Days (Short Trek)</option>
                        <option value="8-14 Days">8 - 14 Days (Classic Trek)</option>
                        <option value="15+ Days">15+ Days (Grand Circuit)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#2D4A34] mb-1.5">
                        Travelers Count
                      </label>
                      <select
                        value={formData.travelers}
                        onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                        className="w-full h-11 px-3 bg-[#F5F3EF] border border-[#7C8A96]/30 rounded-xl text-xs font-bold focus:outline-none focus:border-[#2D4A34] cursor-pointer"
                      >
                        <option value="1">1 Person (Solo)</option>
                        <option value="2">2 Persons (Couple / Friends)</option>
                        <option value="3-5">3 - 5 Persons (Small Group)</option>
                        <option value="6+">6+ Persons (Family / Club)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#2D4A34] mb-1.5">
                      Tell Us About Your Dream Trip & Special Requests
                    </label>
                    <textarea
                      rows={4}
                      placeholder="e.g. We are celebrating our anniversary and want a moderate trek with a helicopter return and private rooms."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-3.5 bg-[#F5F3EF] border border-[#7C8A96]/30 rounded-xl text-xs font-medium focus:outline-none focus:border-[#2D4A34]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#2D4A34] hover:bg-[#1F2E23] text-white font-extrabold text-xs shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send className="size-4 text-[#7FA05C]" />
                    <span>Submit Tailor-Made Trip Request</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <AgencyFooter />
    </div>
  );
}
