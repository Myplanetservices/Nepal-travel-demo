"use client";

import React, { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Calendar,
  Users,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  CreditCard,
  Plane,
  Home,
  Check,
  Phone,
  Mail,
  User,
  MapPin,
  Lock,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCurrency } from "@/components/agency/CurrencyContext";
import { DEMO_PACKAGES, TrekPackage } from "@/lib/demo-agency-data";

function BookingContent() {
  const searchParams = useSearchParams();
  const { formatPrice } = useCurrency();

  const packageParam = searchParams.get("package") || "everest-base-camp-trek";
  const paxParam = parseInt(searchParams.get("pax") || "2", 10);
  const departureParam = searchParams.get("departure") || "";

  // Selected package
  const [selectedSlug, setSelectedSlug] = useState<string>(packageParam);
  const selectedPackage = useMemo(() => {
    return DEMO_PACKAGES.find((p) => p.slug === selectedSlug) || DEMO_PACKAGES[0];
  }, [selectedSlug]);

  // Form states
  const [travelerCount, setTravelerCount] = useState<number>(paxParam || 2);
  const [departureDate, setDepartureDate] = useState<string>(
    departureParam || selectedPackage.departures[0]?.date || "Oct 05, 2026 - Oct 18, 2026"
  );
  const [step, setStep] = useState<number>(1);
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);

  // Traveler info
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("United States");
  const [dietary, setDietary] = useState("");

  // Add-ons
  const [addHelicopter, setAddHelicopter] = useState(false);
  const [addSingleRoom, setAddSingleRoom] = useState(false);
  const [addExtraHotel, setAddExtraHotel] = useState(false);

  // Payment choice
  const [paymentType, setPaymentType] = useState<"deposit" | "full">("deposit");

  // Calculations
  const ratePerPax = useMemo(() => {
    if (travelerCount === 1) return selectedPackage.tierPricing[0]?.pricePerPerson || selectedPackage.priceUSD;
    if (travelerCount <= 3) return selectedPackage.tierPricing[1]?.pricePerPerson || selectedPackage.priceUSD;
    if (travelerCount <= 7) return selectedPackage.tierPricing[2]?.pricePerPerson || selectedPackage.priceUSD * 0.95;
    return selectedPackage.tierPricing[3]?.pricePerPerson || selectedPackage.priceUSD * 0.9;
  }, [travelerCount, selectedPackage]);

  const baseTotal = ratePerPax * travelerCount;
  const heliAddon = addHelicopter ? 450 * travelerCount : 0;
  const singleAddon = addSingleRoom ? 180 * travelerCount : 0;
  const hotelAddon = addExtraHotel ? 140 * travelerCount : 0;
  const grandTotal = baseTotal + heliAddon + singleAddon + hotelAddon;

  const depositDue = Math.round(grandTotal * 0.1);
  const balanceDue = grandTotal - depositDue;
  const amountToPayNow = paymentType === "deposit" ? depositDue : grandTotal;

  const handleCompleteBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
  };

  if (bookingSuccess) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="size-20 rounded-full bg-[#7FA05C]/20 text-[#2D4A34] flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="size-12 text-[#7FA05C]" />
        </div>

        <Badge className="bg-[#7FA05C] text-white border-none font-bold text-xs mb-3">
          Booking Deposit Received
        </Badge>

        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#2D4A34] tracking-tight">
          Congratulations! Your Himalayan Trek is Reserved.
        </h1>

        <p className="mt-3 text-xs sm:text-sm text-[#7C8A96] max-w-xl mx-auto leading-relaxed">
          Reference Code: <strong className="text-[#2D4A34]">AT-2026-{Math.floor(1000 + Math.random() * 9000)}</strong>. A confirmation voucher has been sent to <strong>{email || "your email address"}</strong>. Our Sherpa operations director will contact you on WhatsApp within 12 hours to verify passport details and equipment sizing.
        </p>

        {/* Confirmation Summary Card */}
        <div className="mt-8 bg-white p-6 rounded-2xl border border-[#7C8A96]/20 text-left text-xs max-w-lg mx-auto shadow-sm space-y-3">
          <div className="font-extrabold text-sm text-[#2D4A34] pb-2 border-b border-[#7C8A96]/15">
            Booking Reservation Summary
          </div>
          <div className="flex justify-between">
            <span className="text-[#7C8A96]">Selected Trek:</span>
            <span className="font-bold text-[#33322E]">{selectedPackage.title}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#7C8A96]">Departure Dates:</span>
            <span className="font-bold text-[#33322E]">{departureDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#7C8A96]">Travelers:</span>
            <span className="font-bold text-[#33322E]">{travelerCount} Person{travelerCount > 1 ? "s" : ""}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#7C8A96]">Lead Traveler:</span>
            <span className="font-bold text-[#33322E]">{fullName || "Marcus Sterling"}</span>
          </div>
          <div className="pt-2 border-t border-[#7C8A96]/15 flex justify-between font-bold text-sm text-[#2D4A34]">
            <span>Amount Paid Now (10% Deposit):</span>
            <span className="text-[#7FA05C]">{formatPrice(depositDue)}</span>
          </div>
          <div className="flex justify-between text-[11px] text-[#7C8A96]">
            <span>Remaining Balance (Due in Kathmandu):</span>
            <span>{formatPrice(balanceDue)}</span>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/demo/annapurna-treks"
            className="px-5 py-2.5 rounded-xl bg-[#2D4A34] text-white font-bold text-xs hover:bg-[#1F2E23] transition-colors"
          >
            Return to Agency Home
          </Link>
          <a
            href="https://wa.me/9779800000000"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 rounded-xl bg-white border border-[#7C8A96]/30 text-[#2D4A34] font-bold text-xs hover:bg-[#F5F3EF]"
          >
            Chat With Guide on WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      {/* Title & Back Link */}
      <div className="mb-8">
        <Link
          href={`/demo/annapurna-treks/tour/${selectedPackage.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7C8A96] hover:text-[#2D4A34] transition-colors mb-2"
        >
          <ArrowLeft className="size-3.5" /> Back to {selectedPackage.title}
        </Link>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#2D4A34] tracking-tight">
          Secure Your Himalayan Trek Reservation
        </h1>
        <p className="text-xs sm:text-sm text-[#7C8A96] mt-1">
          Lock in guaranteed departure dates with just a 10% refundable deposit. Free date changes up to 30 days prior.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* LEFT TWO COLUMNS: Step-by-Step Booking Form */}
        <div className="lg:col-span-2 space-y-8">
          {/* Step 1: Choose Trek & Group Size */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#7C8A96]/20 shadow-xs">
            <div className="flex items-center gap-3 mb-5">
              <span className="size-7 rounded-full bg-[#2D4A34] text-white font-extrabold text-xs flex items-center justify-center">
                1
              </span>
              <h2 className="font-heading font-extrabold text-lg text-[#2D4A34]">
                Trek Package & Traveler Count
              </h2>
            </div>

            <div className="space-y-4">
              {/* Trek Selector Dropdown */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#2D4A34] mb-1.5">
                  Selected Himalayan Trek
                </label>
                <select
                  value={selectedSlug}
                  onChange={(e) => setSelectedSlug(e.target.value)}
                  className="w-full h-11 px-3 bg-[#F5F3EF] border border-[#7C8A96]/30 rounded-xl text-xs font-bold focus:outline-none focus:border-[#2D4A34] cursor-pointer"
                >
                  {DEMO_PACKAGES.map((p) => (
                    <option key={p.slug} value={p.slug}>
                      {p.title} ({p.duration} · {p.altitude})
                    </option>
                  ))}
                </select>
              </div>

              {/* Traveler Count */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#2D4A34] mb-2 flex items-center justify-between">
                  <span>Number of Trekkers</span>
                  <span className="text-[#7FA05C] font-extrabold">
                    {formatPrice(ratePerPax)} / person
                  </span>
                </label>

                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {[1, 2, 3, 4, 6, 8].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setTravelerCount(num)}
                      className={`py-2.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                        travelerCount === num
                          ? "bg-[#2D4A34] text-white border-[#2D4A34] shadow-xs"
                          : "bg-[#F5F3EF] text-[#33322E] border-[#7C8A96]/20 hover:border-[#2D4A34]"
                      }`}
                    >
                      {num} {num === 1 ? "Solo" : "Pax"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Departure Date Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#2D4A34] mb-1.5">
                  Departure Window (Fixed Dates)
                </label>
                <select
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="w-full h-11 px-3 bg-[#F5F3EF] border border-[#7C8A96]/30 rounded-xl text-xs font-bold focus:outline-none focus:border-[#2D4A34] cursor-pointer"
                >
                  {selectedPackage.departures.map((d, i) => (
                    <option key={i} value={d.date}>
                      {d.date} — {d.status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Step 2: Lead Traveler Information */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#7C8A96]/20 shadow-xs">
            <div className="flex items-center gap-3 mb-5">
              <span className="size-7 rounded-full bg-[#2D4A34] text-white font-extrabold text-xs flex items-center justify-center">
                2
              </span>
              <h2 className="font-heading font-extrabold text-lg text-[#2D4A34]">
                Lead Traveler Details
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#2D4A34] mb-1.5">
                  Full Name (as in Passport) *
                </label>
                <div className="relative">
                  <User className="size-4 text-[#7C8A96] absolute left-3 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="Marcus Sterling"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full h-11 pl-9 pr-3 bg-[#F5F3EF] border border-[#7C8A96]/30 rounded-xl text-xs font-medium focus:outline-none focus:border-[#2D4A34]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#2D4A34] mb-1.5">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="size-4 text-[#7C8A96] absolute left-3 top-3.5" />
                  <input
                    type="email"
                    required
                    placeholder="marcus@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-11 pl-9 pr-3 bg-[#F5F3EF] border border-[#7C8A96]/30 rounded-xl text-xs font-medium focus:outline-none focus:border-[#2D4A34]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#2D4A34] mb-1.5">
                  Phone / WhatsApp (with Country Code) *
                </label>
                <div className="relative">
                  <Phone className="size-4 text-[#7C8A96] absolute left-3 top-3.5" />
                  <input
                    type="tel"
                    required
                    placeholder="+1 555-019-2834"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full h-11 pl-9 pr-3 bg-[#F5F3EF] border border-[#7C8A96]/30 rounded-xl text-xs font-medium focus:outline-none focus:border-[#2D4A34]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#2D4A34] mb-1.5">
                  Nationality / Country
                </label>
                <div className="relative">
                  <MapPin className="size-4 text-[#7C8A96] absolute left-3 top-3.5" />
                  <input
                    type="text"
                    placeholder="United States"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full h-11 pl-9 pr-3 bg-[#F5F3EF] border border-[#7C8A96]/30 rounded-xl text-xs font-medium focus:outline-none focus:border-[#2D4A34]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Optional Experience Add-ons */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#7C8A96]/20 shadow-xs">
            <div className="flex items-center gap-3 mb-5">
              <span className="size-7 rounded-full bg-[#2D4A34] text-white font-extrabold text-xs flex items-center justify-center">
                3
              </span>
              <h2 className="font-heading font-extrabold text-lg text-[#2D4A34]">
                Optional Expedition Upgrades
              </h2>
            </div>

            <div className="space-y-3">
              {/* Helicopter Addon */}
              <label className="flex items-start gap-3 p-3.5 rounded-xl border border-[#7C8A96]/20 hover:bg-[#F5F3EF]/50 transition-colors cursor-pointer">
                <input
                  type="checkbox"
                  checked={addHelicopter}
                  onChange={(e) => setAddHelicopter(e.target.checked)}
                  className="mt-1 size-4 rounded text-[#2D4A34] focus:ring-0 cursor-pointer"
                />
                <div className="flex-1 text-xs">
                  <div className="flex items-center justify-between font-bold text-[#2D4A34]">
                    <span className="flex items-center gap-1.5">
                      <Plane className="size-4 text-[#3E7C94]" /> Private / Shared Mountain Helicopter Return
                    </span>
                    <span className="text-[#7FA05C]">+{formatPrice(450)} / person</span>
                  </div>
                  <p className="text-[11px] text-[#7C8A96] mt-0.5">
                    Skip the 3-day return hike and fly directly from the high base camp back to Kathmandu or Pokhara with aerial views.
                  </p>
                </div>
              </label>

              {/* Single Supplement */}
              <label className="flex items-start gap-3 p-3.5 rounded-xl border border-[#7C8A96]/20 hover:bg-[#F5F3EF]/50 transition-colors cursor-pointer">
                <input
                  type="checkbox"
                  checked={addSingleRoom}
                  onChange={(e) => setAddSingleRoom(e.target.checked)}
                  className="mt-1 size-4 rounded text-[#2D4A34] focus:ring-0 cursor-pointer"
                />
                <div className="flex-1 text-xs">
                  <div className="flex items-center justify-between font-bold text-[#2D4A34]">
                    <span className="flex items-center gap-1.5">
                      <Home className="size-4 text-[#7FA05C]" /> Single Room Supplement (Private Teahouse Rooms)
                    </span>
                    <span className="text-[#7FA05C]">+{formatPrice(180)}</span>
                  </div>
                  <p className="text-[11px] text-[#7C8A96] mt-0.5">
                    Guaranteed private room every night at teahouses and lodges (no twin sharing).
                  </p>
                </div>
              </label>

              {/* Extra Hotel */}
              <label className="flex items-start gap-3 p-3.5 rounded-xl border border-[#7C8A96]/20 hover:bg-[#F5F3EF]/50 transition-colors cursor-pointer">
                <input
                  type="checkbox"
                  checked={addExtraHotel}
                  onChange={(e) => setAddExtraHotel(e.target.checked)}
                  className="mt-1 size-4 rounded text-[#2D4A34] focus:ring-0 cursor-pointer"
                />
                <div className="flex-1 text-xs">
                  <div className="flex items-center justify-between font-bold text-[#2D4A34]">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="size-4 text-[#D9A23B]" /> 2 Extra Nights Boutique Hotel in Thamel / Lakeside
                    </span>
                    <span className="text-[#7FA05C]">+{formatPrice(140)}</span>
                  </div>
                  <p className="text-[11px] text-[#7C8A96] mt-0.5">
                    Extended stay before or after trek with daily breakfast and airport transfers included.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Step 4: Payment Option & Confirmation */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#7C8A96]/20 shadow-xs">
            <div className="flex items-center gap-3 mb-5">
              <span className="size-7 rounded-full bg-[#2D4A34] text-white font-extrabold text-xs flex items-center justify-center">
                4
              </span>
              <h2 className="font-heading font-extrabold text-lg text-[#2D4A34]">
                Choose Deposit or Full Payment
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {/* 10% Deposit */}
              <div
                onClick={() => setPaymentType("deposit")}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  paymentType === "deposit"
                    ? "border-[#2D4A34] bg-[#F5F3EF] shadow-xs"
                    : "border-[#7C8A96]/20 bg-white"
                }`}
              >
                <div className="flex items-center justify-between font-extrabold text-sm text-[#2D4A34]">
                  <span>10% Advance Deposit</span>
                  <span className="text-[#7FA05C]">{formatPrice(depositDue)}</span>
                </div>
                <p className="text-[11px] text-[#7C8A96] mt-1 leading-relaxed">
                  Pay only 10% today to lock your guide and permit slots. The remaining {formatPrice(balanceDue)} is paid in Nepal upon arrival.
                </p>
              </div>

              {/* 100% Full Payment */}
              <div
                onClick={() => setPaymentType("full")}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  paymentType === "full"
                    ? "border-[#2D4A34] bg-[#F5F3EF] shadow-xs"
                    : "border-[#7C8A96]/20 bg-white"
                }`}
              >
                <div className="flex items-center justify-between font-extrabold text-sm text-[#2D4A34]">
                  <span>100% Full Payment</span>
                  <span className="text-[#2D4A34]">{formatPrice(grandTotal)}</span>
                </div>
                <p className="text-[11px] text-[#7C8A96] mt-1 leading-relaxed">
                  Pay all in one go and arrive in Nepal with everything completely squared away.
                </p>
              </div>
            </div>

            {/* Submission Button */}
            <form onSubmit={handleCompleteBooking}>
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-[#2D4A34] hover:bg-[#1F2E23] text-white font-extrabold text-sm shadow-lg transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <Lock className="size-4 text-[#7FA05C]" />
                <span>Confirm Reservation ({formatPrice(amountToPayNow)} Due Today)</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#7C8A96] mt-3">
                <ShieldCheck className="size-3.5 text-[#7FA05C]" />
                <span>Encrypted 256-bit SSL transaction. 100% Refundable if cancelled within 7 days.</span>
              </div>
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN: Real-Time Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-[109px] space-y-6">
            <Card className="border border-[#7C8A96]/30 rounded-2xl bg-white shadow-xl overflow-hidden">
              <div className="bg-[#2D4A34] text-white p-5">
                <div className="text-[10px] text-[#7FA05C] font-extrabold uppercase tracking-wider mb-1">
                  Trip Summary
                </div>
                <h3 className="font-heading font-extrabold text-base text-white leading-snug">
                  {selectedPackage.title}
                </h3>
                <div className="text-xs text-white/80 mt-1">
                  {selectedPackage.duration} · {selectedPackage.altitude}
                </div>
              </div>

              <CardContent className="p-5 space-y-4 text-xs">
                <div className="space-y-2 border-b border-[#7C8A96]/20 pb-4">
                  <div className="flex justify-between text-[#7C8A96]">
                    <span>Departure Dates:</span>
                    <span className="font-bold text-[#33322E] text-right">{departureDate}</span>
                  </div>
                  <div className="flex justify-between text-[#7C8A96]">
                    <span>Travelers:</span>
                    <span className="font-bold text-[#33322E]">{travelerCount} Person{travelerCount > 1 ? "s" : ""}</span>
                  </div>
                  <div className="flex justify-between text-[#7C8A96]">
                    <span>Rate per Person:</span>
                    <span className="font-bold text-[#33322E]">{formatPrice(ratePerPax)}</span>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2 border-b border-[#7C8A96]/20 pb-4">
                  <div className="flex justify-between">
                    <span className="text-[#7C8A96]">Trek Package Subtotal:</span>
                    <span className="font-bold text-[#33322E]">{formatPrice(baseTotal)}</span>
                  </div>

                  {addHelicopter && (
                    <div className="flex justify-between text-[#3E7C94]">
                      <span>Helicopter Return Upgrade:</span>
                      <span className="font-bold">+{formatPrice(heliAddon)}</span>
                    </div>
                  )}

                  {addSingleRoom && (
                    <div className="flex justify-between text-[#7FA05C]">
                      <span>Single Room Supplement:</span>
                      <span className="font-bold">+{formatPrice(singleAddon)}</span>
                    </div>
                  )}

                  {addExtraHotel && (
                    <div className="flex justify-between text-[#D9A23B]">
                      <span>Boutique Hotel Extension:</span>
                      <span className="font-bold">+{formatPrice(hotelAddon)}</span>
                    </div>
                  )}

                  <div className="pt-2 flex justify-between font-extrabold text-sm text-[#2D4A34]">
                    <span>Grand Total:</span>
                    <span>{formatPrice(grandTotal)}</span>
                  </div>
                </div>

                {/* Due Today vs Due on Arrival */}
                <div className="bg-[#F5F3EF] p-3.5 rounded-xl space-y-2 border border-[#7C8A96]/20">
                  <div className="flex justify-between text-xs font-bold text-[#7FA05C]">
                    <span>Due Today ({paymentType === "deposit" ? "10% Deposit" : "100% Full"}):</span>
                    <span className="text-base">{formatPrice(amountToPayNow)}</span>
                  </div>
                  {paymentType === "deposit" && (
                    <div className="flex justify-between text-[11px] text-[#7C8A96]">
                      <span>Balance Due on Arrival:</span>
                      <span className="font-bold text-[#33322E]">{formatPrice(balanceDue)}</span>
                    </div>
                  )}
                </div>

                <div className="pt-2 text-[11px] text-[#7C8A96] space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[#2D4A34] font-medium">
                    <CheckCircle2 className="size-3.5 text-[#7FA05C]" />
                    <span>Free cancellation up to 30 days prior</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#2D4A34] font-medium">
                    <CheckCircle2 className="size-3.5 text-[#7FA05C]" />
                    <span>ACAP & TIMS permits handled for you</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-[#7C8A96]">Loading Booking Portal...</div>}>
      <BookingContent />
    </Suspense>
  );
}
