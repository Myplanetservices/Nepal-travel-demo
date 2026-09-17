"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Mountain,
  ShieldCheck,
  MapPin,
  MessageCircle,
  Phone,
  ChevronDown,
  Menu,
  X,
  Search,
  ArrowRight,
  Compass,
  Calendar,
} from "lucide-react";
import { useCurrency } from "./CurrencyContext";
import { CURRENCY_RATES, DEMO_PACKAGES } from "@/lib/demo-agency-data";

export function AgencyHeader() {
  const pathname = usePathname();
  const { currency, setCurrency } = useCurrency();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const nepalPackages = DEMO_PACKAGES.filter((p) => p.destination === "Nepal");
  const homeHref = pathname?.startsWith("/demo") ? "/demo/annapurna-treks" : "/";

  return (
    <header className="w-full bg-white border-b border-[#7C8A96]/20 sticky top-0 z-40 shadow-xs">
      {/* Top Credentials & Currency Strip */}
      <div className="bg-[#1F2E23] text-[#F5F3EF] border-b border-[#2D4A34] text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 font-semibold text-[#7FA05C]">
              <ShieldCheck className="size-3.5 text-[#7FA05C]" />
              Govt Reg. #48201 · TAAN & NMA Member
            </span>
            <span className="hidden lg:flex items-center gap-1 text-[#F5F3EF]/70">
              <MapPin className="size-3 text-[#7FA05C]" />
              Amrit Marga, Thamel, Kathmandu
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium ml-auto sm:ml-0">
            {/* Direct Phone / WhatsApp */}
            <a
              href="https://wa.me/9779800000000"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-[#F5F3EF] hover:text-[#7FA05C] transition-colors"
            >
              <MessageCircle className="size-3.5 text-[#7FA05C]" />
              <span className="hidden sm:inline">+977-9800000000</span>
              <span className="sm:hidden font-bold">WhatsApp</span>
            </a>

            {/* Currency Selector */}
            <div className="flex items-center gap-1 bg-white/10 rounded-md p-0.5 border border-white/15">
              {(Object.keys(CURRENCY_RATES) as (keyof typeof CURRENCY_RATES)[]).map((curr) => (
                <button
                  key={curr}
                  type="button"
                  onClick={() => setCurrency(curr)}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all cursor-pointer ${
                    currency === curr
                      ? "bg-[#7FA05C] text-white shadow-xs"
                      : "text-[#F5F3EF]/80 hover:text-white"
                  }`}
                  title={CURRENCY_RATES[curr].name}
                >
                  {curr}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Agency Logo */}
          <Link
            href={homeHref}
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="size-11 rounded-xl bg-[#2D4A34] text-[#F5F3EF] flex items-center justify-center font-extrabold text-xl shadow-md border border-[#2D4A34] group-hover:bg-[#1F2E23] transition-colors">
              <Mountain className="size-6 text-[#7FA05C]" />
            </div>
            <div>
              <div className="font-heading font-extrabold text-xl text-[#2D4A34] tracking-tight leading-none group-hover:text-[#1F2E23] transition-colors">
                Zenith Himalaya
              </div>
              <div className="text-[10px] tracking-wider uppercase font-bold text-[#7FA05C] mt-1">
                Pioneering Sherpa Expeditions · Est. 2008
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-bold text-[#33322E]">
            {/* Nepal Mega Menu */}
            <div
              className="relative py-4"
              onMouseEnter={() => setActiveDropdown("nepal")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                className={`flex items-center gap-1 hover:text-[#2D4A34] transition-colors cursor-pointer py-1 ${
                  activeDropdown === "nepal" ? "text-[#2D4A34]" : ""
                }`}
              >
                <span>NEPAL TREKS</span>
                <ChevronDown className="size-3.5 opacity-60" />
              </button>

              {activeDropdown === "nepal" && (
                <div className="absolute top-full left-0 w-[540px] bg-white rounded-xl shadow-xl border border-[#7C8A96]/20 p-5 grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                  <div>
                    <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#7FA05C] mb-2.5">
                      Popular Trekking Routes
                    </div>
                    <ul className="space-y-2">
                      {nepalPackages.slice(0, 4).map((pkg) => (
                        <li key={pkg.id}>
                          <Link
                            href={`/demo/annapurna-treks/tour/${pkg.slug}`}
                            className="block p-2 rounded-lg hover:bg-[#F5F3EF] transition-colors"
                            onClick={() => setActiveDropdown(null)}
                          >
                            <div className="font-bold text-xs text-[#2D4A34] hover:underline">
                              {pkg.title}
                            </div>
                            <div className="text-[11px] text-[#7C8A96] mt-0.5">
                              {pkg.duration} · {pkg.altitude}
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-l border-[#7C8A96]/15 pl-4 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#7FA05C] mb-2.5">
                        Regions & Styles
                      </div>
                      <div className="space-y-1.5 text-xs text-[#33322E]">
                        <Link
                          href="/demo/annapurna-treks#packages"
                          className="block py-1 hover:text-[#2D4A34] font-medium"
                          onClick={() => setActiveDropdown(null)}
                        >
                          🏔️ Everest Base Camp Treks
                        </Link>
                        <Link
                          href="/demo/annapurna-treks#packages"
                          className="block py-1 hover:text-[#2D4A34] font-medium"
                          onClick={() => setActiveDropdown(null)}
                        >
                          🌿 Annapurna Circuit & Sanctuary
                        </Link>
                        <Link
                          href="/demo/annapurna-treks#packages"
                          className="block py-1 hover:text-[#2D4A34] font-medium"
                          onClick={() => setActiveDropdown(null)}
                        >
                          🦅 Manaslu Restricted Circuit
                        </Link>
                        <Link
                          href="/demo/annapurna-treks#packages"
                          className="block py-1 hover:text-[#2D4A34] font-medium"
                          onClick={() => setActiveDropdown(null)}
                        >
                          🌸 Langtang Valley Eco Treks
                        </Link>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#7C8A96]/15 mt-3">
                      <Link
                        href="/demo/annapurna-treks#packages"
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#3E7C94] hover:underline"
                        onClick={() => setActiveDropdown(null)}
                      >
                        View All Packages <ArrowRight className="size-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bhutan Link */}
            <Link
              href="/demo/annapurna-treks/tour/bhutan-cultural-tour"
              className="hover:text-[#2D4A34] transition-colors"
            >
              BHUTAN TOURS
            </Link>

            {/* Tibet Link */}
            <Link
              href="/demo/annapurna-treks#destinations"
              className="hover:text-[#2D4A34] transition-colors"
            >
              TIBET
            </Link>

            {/* Company Dropdown */}
            <div
              className="relative py-4"
              onMouseEnter={() => setActiveDropdown("company")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                className={`flex items-center gap-1 hover:text-[#2D4A34] transition-colors cursor-pointer py-1 ${
                  activeDropdown === "company" ? "text-[#2D4A34]" : ""
                }`}
              >
                <span>COMPANY</span>
                <ChevronDown className="size-3.5 opacity-60" />
              </button>

              {activeDropdown === "company" && (
                <div className="absolute top-full left-0 w-48 bg-white rounded-xl shadow-xl border border-[#7C8A96]/20 p-2 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                  <Link
                    href="/demo/annapurna-treks/about"
                    className="block px-3 py-2 text-xs font-bold text-[#33322E] hover:bg-[#F5F3EF] hover:text-[#2D4A34] rounded-lg transition-colors"
                    onClick={() => setActiveDropdown(null)}
                  >
                    About Us
                  </Link>
                  <Link
                    href="/demo/annapurna-treks#why-choose-us"
                    className="block px-3 py-2 text-xs font-bold text-[#33322E] hover:bg-[#F5F3EF] hover:text-[#2D4A34] rounded-lg transition-colors"
                    onClick={() => setActiveDropdown(null)}
                  >
                    Why Choose Us
                  </Link>
                  <Link
                    href="/demo/annapurna-treks#testimonials"
                    className="block px-3 py-2 text-xs font-bold text-[#33322E] hover:bg-[#F5F3EF] hover:text-[#2D4A34] rounded-lg transition-colors"
                    onClick={() => setActiveDropdown(null)}
                  >
                    Traveler Reviews (4.9★)
                  </Link>
                </div>
              )}
            </div>

            {/* Blog */}
            <Link
              href="/demo/annapurna-treks#blog"
              className="hover:text-[#2D4A34] transition-colors"
            >
              BLOG
            </Link>

            {/* Contact */}
            <Link
              href="/demo/annapurna-treks/contact"
              className={`hover:text-[#2D4A34] transition-colors ${
                pathname === "/demo/annapurna-treks/contact" ? "text-[#2D4A34] underline underline-offset-4" : ""
              }`}
            >
              CONTACT US
            </Link>
          </nav>

          {/* Right Action CTA */}
          <div className="flex items-center gap-3">
            <Link
              href="/demo/annapurna-treks/booking"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2D4A34] text-[#F5F3EF] font-bold text-xs hover:bg-[#1F2E23] transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <Calendar className="size-3.5 text-[#7FA05C]" />
              <span>Book Trip</span>
            </Link>

            {/* Mobile Menu Trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#33322E] hover:bg-[#F5F3EF] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-[#7C8A96]/20 px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <Link
            href="/demo/annapurna-treks"
            className="block py-2 text-sm font-bold text-[#2D4A34] border-b border-[#7C8A96]/15"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <div className="text-xs font-extrabold uppercase tracking-wider text-[#7FA05C] pt-2">
            Top Treks
          </div>
          <div className="pl-2 space-y-2 text-xs font-semibold text-[#33322E]">
            {nepalPackages.map((pkg) => (
              <Link
                key={pkg.id}
                href={`/demo/annapurna-treks/tour/${pkg.slug}`}
                className="block py-1 hover:text-[#2D4A34]"
                onClick={() => setMobileMenuOpen(false)}
              >
                {pkg.title} ({pkg.duration})
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-[#7C8A96]/15 space-y-2 text-sm font-bold text-[#33322E]">
            <Link
              href="/demo/annapurna-treks/tour/bhutan-cultural-tour"
              className="block py-1 hover:text-[#2D4A34]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Bhutan Tours
            </Link>
            <Link
              href="/demo/annapurna-treks/about"
              className="block py-1 hover:text-[#2D4A34]"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Company & Sherpas
            </Link>
            <Link
              href="/demo/annapurna-treks/contact"
              className="block py-1 hover:text-[#2D4A34]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact Us
            </Link>
          </div>

          <div className="pt-3">
            <Link
              href="/demo/annapurna-treks/booking"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#2D4A34] text-[#F5F3EF] font-bold text-xs"
              onClick={() => setMobileMenuOpen(false)}
            >
              Book Trip Dates
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
