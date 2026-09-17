"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  ShieldCheck,
  Send,
  CheckCircle2,
  Mountain,
  Compass,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AnimatedTravelBadge } from "@/components/travel/TravelStickers";

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
    <div className="w-full bg-[#F5F3EF]">
      {/* Header Banner */}
      <div className="bg-[#2D4A34] text-[#F5F3EF] py-14 lg:py-18 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Badge className="bg-[#7FA05C] text-white border-none font-bold text-xs">
              Local Himalayan Experts Available 24/7
            </Badge>
            <AnimatedTravelBadge icon="compass" label="24/7 SUPPORT" animation="animate-gentle-pulse" variant="dark" />
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white">
            Get in Touch With Our Sherpa Directors
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-[#F5F3EF]/85 leading-relaxed">
            Have questions about altitudes, acclimatization routes, customized private groups, or Bhutan visas? Our certified guides respond within a few hours.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* LEFT COLUMN: Physical Locations & Direct Contacts (Access Nepal Style) */}
          <div className="space-y-6">
            {/* Head Office Card */}
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
                  <span>inquiry@annapurnatreks.example</span>
                </div>
              </div>
            </div>

            {/* Pokhara Branch Card */}
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

            {/* Direct WhatsApp Emergency Assistance */}
            <div className="bg-[#2D4A34] text-white p-6 rounded-2xl shadow-sm space-y-3">
              <div className="flex items-center gap-2 font-bold text-sm text-[#7FA05C]">
                <MessageCircle className="size-4 fill-[#7FA05C] text-[#2D4A34]" />
                <span>24/7 WhatsApp Hotline</span>
              </div>
              <p className="text-xs text-white/80 leading-relaxed">
                Connect directly with Senior Trek Director Dawa Sherpa for immediate itinerary customization.
              </p>
              <a
                href="https://wa.me/9779800000000?text=Hi%20Annapurna%20Treks,%20I'd%20like%20to%20plan%20a%20Himalayan%20trek"
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs transition-colors shadow-xs"
              >
                <span>+977-9800000000</span>
              </a>
            </div>

            {/* Office Hours */}
            <div className="bg-white p-6 rounded-2xl border border-[#7C8A96]/20 shadow-xs text-xs space-y-2">
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

          {/* RIGHT TWO COLUMNS: Comprehensive Custom Inquiry Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 sm:p-10 rounded-2xl border border-[#7C8A96]/20 shadow-sm">
              <div className="mb-6">
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
                        Phone / WhatsApp *
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
                      placeholder="e.g. We are celebrating our 10th anniversary and want a moderate trek with a helicopter return and private rooms. We also would love to add 2 days in Chitwan National Park."
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
    </div>
  );
}
