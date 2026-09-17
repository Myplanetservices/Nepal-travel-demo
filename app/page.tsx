"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Calendar,
  Compass,
  Clock,
  Mountain,
  Star,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Sliders,
  DollarSign,
  HeartPulse,
  CalendarCheck,
  Plane,
  Hotel,
  Users,
  ChevronLeft,
  ChevronRight,
  Camera,
  Ticket,
  Sparkles,
  Tag,
  PhoneCall,
  Play,
  Check,
  Copy,
  Utensils,
  Coffee,
  Car,
  GlassWater,
  Quote,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import { motion, AnimatePresence } from "framer-motion";
import {
  usePrefersReducedMotion,
  useIntersectionReveal,
  useParallaxOffset,
  StatCounter,
} from "@/components/travel/SectionAnimations";
import { useCurrency } from "@/components/agency/CurrencyContext";
import {
  DEMO_PACKAGES,
  DESTINATION_REGIONS,
  TESTIMONIALS,
  BLOG_ARTICLES,
} from "@/lib/demo-agency-data";
import { MainAgencyNav } from "@/components/agency/MainAgencyNav";
import { HeroSection } from "@/components/landing/HeroSection";
import { AgencyFooter } from "@/components/agency/AgencyFooter";
import { InteractiveDestinationGallery } from "@/components/agency/InteractiveDestinationGallery";
import { HimalayanSunriseBalloonSection } from "@/components/travel/HimalayanSunriseBalloonSection";
import {
  RetroCameraSticker,
  BoardingTicketsSticker,
  LuggageWatermark,
  PalmWatermark,
  PaperAirplaneContrail,
  PassportStamp,
  FancyTravelIcon,
  FloatingCornerAsset,
  AnimatedTravelBadge,
  AnimatedTravelIcon,
} from "@/components/travel/TravelStickers";

// Hand-drawn SVG Doodle Arrow matching reference images
function DoodleArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M10 40 C 35 10, 65 45, 88 15"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M74 12 L 89 15 L 84 28"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Hand-drawn SVG Doodle Curve Loop
function DoodleLoop({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M20 20 C 40 10, 65 30, 50 60 C 40 75, 20 65, 35 45 C 45 35, 65 40, 70 50"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M60 42 L 71 50 L 58 58"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Tour Categories (Matching Image 3 Reference: Staggered Organic Tiles)
const TOUR_CATEGORIES = [
  {
    id: "adventure",
    name: "Adventure Tours",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=600&auto=format&fit=crop",
    link: "#packages",
    offsetClass: "md:-translate-y-4",
  },
  {
    id: "cultural",
    name: "Cultural Tours",
    image: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=600&auto=format&fit=crop",
    link: "#packages",
    offsetClass: "md:translate-y-8",
  },
  {
    id: "heli",
    name: "Beach Getaways",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=600&auto=format&fit=crop",
    link: "#packages",
    offsetClass: "md:translate-y-0",
  },
  {
    id: "luxury",
    name: "Luxury Escapes",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=600&auto=format&fit=crop",
    link: "#packages",
    offsetClass: "md:translate-y-2",
  },
  {
    id: "family",
    name: "Family Vacations",
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=600&auto=format&fit=crop",
    link: "#packages",
    offsetClass: "md:translate-y-8",
  },
  {
    id: "wildlife",
    name: "Wildlife Expeditions",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=600&auto=format&fit=crop",
    link: "#packages",
    offsetClass: "md:-translate-y-3",
  },
];

// Tiered Expedition Passes (Dual-mode: Aerial Sunrise Flights & Alpine Ground Traverses)
interface ExpeditionPass {
  id: string;
  tier: string;
  badge?: string;
  priceUsd: number;
  unit: string;
  altitude: string;
  duration: string;
  featured: boolean;
  tagline: string;
  features: string[];
  buttonText: string;
  link: string;
  aeromedicalTag: string;
}

const EXPEDITION_PASSES: Record<"aerial" | "ground", ExpeditionPass[]> = {
  aerial: [
    {
      id: "aerial-economic",
      tier: "Essential Dawn Pass",
      badge: "Classic Sunrise Flight",
      priceUsd: 240,
      unit: "/Person",
      altitude: "4,200m Ridge",
      duration: "1 Hour Scenic Flight",
      featured: false,
      tagline: "Sunrise aerial traverse viewing Everest, Lhotse & Langtang with guaranteed window seat.",
      features: [
        "1-Hour dawn flight corridor past Everest, Lhotse & Ama Dablam",
        "Complimentary valley hotel chauffeur pick-up & return transfer",
        "Guaranteed individual window seat with supplemental O2 safety briefing",
        "National Park environmental conservation entry permit included",
        "Standard aeromedical rescue standby insurance",
      ],
      buttonText: "Reserve Dawn Pass",
      link: "/booking?package=economic-flight",
      aeromedicalTag: "Standard O2 Briefing",
    },
    {
      id: "aerial-exclusive",
      tier: "Sovereign Private Charter",
      badge: "👑 Most Chosen for Private Groups",
      priceUsd: 1800,
      unit: "/Basket (Private Craft)",
      altitude: "6,800m Summit Ring",
      duration: "2.5 Hours Extended Charter",
      featured: true,
      tagline: "VIP private aerial traverse with landing at Kala Patthar (5,545m) & champagne breakfast.",
      features: [
        "2.5-Hour extended private charter with Kala Patthar (5,545m) alpine touchdown",
        "Private Mercedes-Benz chauffeur direct to VIP alpine helipad",
        "Dedicated IFMGA Sherpa Guide & wilderness aeromedical escort",
        "Emergency hyperbaric Gamow bag & continuous supplemental O2 on board",
        "Champagne toast & Everest panoramic breakfast with commemorative medal",
      ],
      buttonText: "Reserve Sovereign Charter",
      link: "/booking?package=exclusive-basket",
      aeromedicalTag: "ICU Medical Oxygen Standby",
    },
    {
      id: "aerial-standard",
      tier: "Signature Mountain Flight",
      badge: "Small Group · Max 8",
      priceUsd: 320,
      unit: "/Person",
      altitude: "5,200m Amphitheater",
      duration: "1.5 Hours Mountain Flight",
      featured: false,
      tagline: "Small-cabin aerial traverse with extended hover over Gokyo Lakes & Khumbu Glacier.",
      features: [
        "1.5-Hour sunrise mountain flight with Khumbu glacier & Lukla flyby",
        "Free Kathmandu hotel pick-up & drop-off",
        "Intimate small-group cabin guarantee (maximum 8 passengers per group)",
        "4K digital flight telemetry video recording & route certificate",
        "Full coverage aeromedical evacuation insurance included",
      ],
      buttonText: "Reserve Signature Pass",
      link: "/booking?package=standard-flight",
      aeromedicalTag: "Enhanced O2 Monitoring",
    },
  ],
  ground: [
    {
      id: "ground-economic",
      tier: "Valley Ridge Traverse",
      badge: "Day Acclimatization",
      priceUsd: 190,
      unit: "/Person",
      altitude: "3,200m Pine Ridge",
      duration: "Full Day Guided Hike",
      featured: false,
      tagline: "Scenic ridge traverse through rhododendron forests with panoramic Himalayan views.",
      features: [
        "Full-day guided traverse across pristine mountain ridges",
        "Private trailhead transport & local organic Sherpa tea lunch",
        "Certified native trail guide & trekking poles provided",
        "Entry permits to protected biological conservation sanctuaries",
        "Standard trail medical & emergency communication support",
      ],
      buttonText: "Book Ridge Traverse",
      link: "/booking?package=ridge-traverse",
      aeromedicalTag: "First Aid Certified Lead",
    },
    {
      id: "ground-exclusive",
      tier: "High-Pass Heli-Trek Pass",
      badge: "👑 Summit Ridge Insertion",
      priceUsd: 1450,
      unit: "/Private Duo (2 Trekkers)",
      altitude: "5,416m Thorong La",
      duration: "Heli-Drop & High Traverse",
      featured: true,
      tagline: "Helicopter drop onto high alpine ridge with private Everest guide and hot gourmet lunch.",
      features: [
        "Helicopter insertion directly to high alpine plateau (4,800m+)",
        "Private 1-on-1 IFMGA Everest Summiteer mountain guide",
        "Hot gourmet lunch & butter tea prepared at 4,900m panoramic station",
        "Portable Gamow pressure chamber & pulse oximeter monitoring",
        "Helicopter extraction back to luxury heritage mountain lodge",
      ],
      buttonText: "Book Heli-Trek Pass",
      link: "/booking?package=heli-trek",
      aeromedicalTag: "Wilderness Physician Escort",
    },
    {
      id: "ground-standard",
      tier: "Glacial Moraine Pass",
      badge: "Small Group Guided",
      priceUsd: 280,
      unit: "/Person",
      altitude: "4,600m Glacial Lake",
      duration: "Extended Day Trek",
      featured: false,
      tagline: "Active alpine day traverse along glacial lateral moraines and suspension bridges.",
      features: [
        "Rigorous 7-hour guided traverse of scenic glacial moraine corridors",
        "Full technical gear package (microspikes, poles, gaiters included)",
        "High-energy organic trail rations & warm hydration packs",
        "Wilderness First Responder lead with satellite communication phone",
        "TIMS card and Sagarmatha / Annapurna entry permits handled in advance",
      ],
      buttonText: "Book Moraine Pass",
      link: "/booking?package=moraine-pass",
      aeromedicalTag: "Satellite SOS Active",
    },
  ],
};

// Special Offers (Tactile Dual-Chamber Himalayan Expedition Vouchers)
const SPECIAL_OFFERS = [
  {
    id: "offer-1",
    discount: "15% OFF",
    tag: "Early Bird 2026",
    title: "Autumn 2026 Early Bird Everest Departures",
    description: "Lock peak-season Sagarmatha permits 6 months in advance with priority teahouse rooms and Sherpa team gear check.",
    code: "AUTUMN15",
    link: "/tour/everest-base-camp-trek",
    region: "Khumbu Valley, Nepal",
    altitude: "5,364m",
    validity: "Departures: Sep – Nov 2026",
    perk: "Locked Teahouse Permits & Free Gear Check",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "offer-2",
    discount: "25% OFF",
    tag: "Group Adventure",
    title: "Group Booking Discount (4+ Trekkers)",
    description: "Assemble family or trail companions for Thorong La Pass. Includes dedicated Sherpa expedition leads and reduced porter ratios.",
    code: "GROUP25",
    link: "/tour/annapurna-circuit-trek",
    region: "Annapurna Sanctuary, Nepal",
    altitude: "5,416m",
    validity: "Parties of 4+ Trekkers",
    perk: "Dedicated Lead Sherpa & Private Group Porter",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "offer-3",
    discount: "35% OFF",
    tag: "Cultural Sanctuary",
    title: "Off-Season Cultural Circuits & Valley Treks",
    description: "Experience Bhutan's cliff-hanging dzongs and Tiger's Nest monastery with complimentary visa processing and boutique heritage lodging.",
    code: "CULTURE35",
    link: "/tour/bhutan-cultural-tour",
    region: "Paro & Thimphu, Bhutan",
    altitude: "3,120m",
    validity: "Valid across all 2026 departures",
    perk: "Govt SDF Tax Waiver & Heritage Boutique Inns",
    image: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function Home() {
  const { formatPrice } = useCurrency();

  // Floating Reservation Widget state
  const [searchDestination, setSearchDestination] = useState<string>("Everest");
  const [searchActivity, setSearchActivity] = useState<string>("All");
  const [searchCheckIn, setSearchCheckIn] = useState<string>("2026-10-15");
  const [searchGuests, setSearchGuests] = useState<string>("2 People");
  const [appliedSearch, setAppliedSearch] = useState<{
    destination: string;
    activity: string;
    date: string;
    guests: string;
  } | null>(null);

  // Filter state for popular tours
  const [activeTab, setActiveTab] = useState<string>("All");

  // Read URL params on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const urlParams = new URLSearchParams(window.location.search);
    const regionParam = urlParams.get("region");
    const activityParam = urlParams.get("activity");
    const dateParam = urlParams.get("date");
    const guestsParam = urlParams.get("guests");

    if (regionParam || activityParam || dateParam || guestsParam) {
      const validRegions = ["Everest", "Annapurna", "Manaslu", "Langtang", "Bhutan", "Tibet"];
      const matched = regionParam
        ? validRegions.find((r) => r.toLowerCase() === regionParam.toLowerCase()) || "Everest"
        : "Everest";
      setSearchDestination(matched);
      setActiveTab(matched);
      if (activityParam) setSearchActivity(activityParam);
      if (dateParam) setSearchCheckIn(dateParam);
      if (guestsParam) setSearchGuests(guestsParam);
      setAppliedSearch({
        destination: matched,
        activity: activityParam || "All",
        date: dateParam || "",
        guests: guestsParam || "2 People",
      });
    }
  }, []);

  // Handle Search Submit
  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setAppliedSearch({
      destination: searchDestination,
      activity: searchActivity,
      date: searchCheckIn,
      guests: searchGuests,
    });
    setActiveTab(searchDestination === "All" ? "All" : searchDestination);

    if (typeof window !== "undefined") {
      const params = new URLSearchParams();
      if (searchDestination && searchDestination !== "All") params.set("region", searchDestination.toLowerCase());
      if (searchActivity && searchActivity !== "All") params.set("activity", searchActivity.toLowerCase());
      if (searchCheckIn) params.set("date", searchCheckIn);
      if (searchGuests) params.set("guests", searchGuests);
      const newUrl = `${window.location.pathname}?${params.toString()}#packages`;
      window.history.pushState({}, "", newUrl);

      const target = document.getElementById("packages");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Video modal state
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Special Offers promo code copy feedback state
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const handleCopyCode = (code: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2500);
    }
  };

  // Filtered packages with search parameter matching
  const filteredPackages = useMemo(() => {
    return DEMO_PACKAGES.filter((pkg) => {
      if (appliedSearch) {
        if (appliedSearch.destination !== "All" && pkg.region !== appliedSearch.destination) {
          return false;
        }
        if (appliedSearch.activity !== "All" && appliedSearch.activity) {
          if (appliedSearch.activity.toLowerCase() !== pkg.activity.toLowerCase()) {
            return false;
          }
        }
      } else if (activeTab !== "All" && pkg.region !== activeTab) {
        return false;
      }
      return true;
    });
  }, [activeTab, appliedSearch]);

  // Accessibility: Detect prefers-reduced-motion
  const prefersReducedMotion = usePrefersReducedMotion();

  // Section 6: Tiered Expedition Passes state & reveal
  const { ref: section6Ref, inView: section6InView } = useIntersectionReveal(0.12);
  const [packageMode, setPackageMode] = useState<"aerial" | "ground">("aerial");

  // Task 2 & Follow-up: Section 7 entrance reveal & mountain image parallax
  const { ref: section7Ref, inView: section7InView } = useIntersectionReveal(0.15);
  const { containerRef: mountainParallaxRef, offsetY: mountainOffsetY } = useParallaxOffset(prefersReducedMotion, 50);

  // Task 2 & Follow-up: Section 11 entrance reveal, trekker image parallax, & auto-advancing testimonial carousel
  const { ref: section11Ref, inView: section11InView } = useIntersectionReveal(0.15);
  const { containerRef: trekkerParallaxRef, offsetY: trekkerOffsetY } = useParallaxOffset(prefersReducedMotion, 50);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<"next" | "prev">("next");
  const [isTestimonialAutoPlay, setIsTestimonialAutoPlay] = useState(true);

  const handleNextTestimonial = () => {
    setSlideDirection("next");
    setTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrevTestimonial = () => {
    setSlideDirection("prev");
    setTestimonialIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  // Section 11: Auto-cycle carousel with hover pause
  useEffect(() => {
    if (!isTestimonialAutoPlay || prefersReducedMotion) return;
    const interval = setInterval(() => {
      setSlideDirection("next");
      setTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [isTestimonialAutoPlay, prefersReducedMotion]);

  return (
    <main className="relative min-h-screen flex flex-col bg-[#F5F3EF] text-[#33322E]">
      {/* Sticky Agency Navigation with Currency Switcher & Accreditation */}
      <MainAgencyNav />

      {/* Scrubbable Mountain Video Hero Section (Intact!) */}
      <HeroSection showProofBar={false} />

      {/* =========================================================================
          SECTION 1: FLOATING TABBED RESERVATION WIDGET (Image 1: Tourex)
          ========================================================================= */}
      <section className="relative z-30 -mt-20 sm:-mt-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Subtle 2D/3D Floating Cloud Asset (Tastefully dropped nearby) */}
        <div className="absolute -top-7 right-6 sm:right-12 w-20 h-14 pointer-events-none animate-float-drift z-40">
          <Image
            src="/images/assets/fluffy-cloud.jpg"
            alt="Floating 3D Cloud"
            fill
            className="object-contain mix-blend-multiply opacity-90 drop-shadow-sm"
          />
        </div>

        {/* 2D Paper Airplane with dotted flight contrail on left */}
        <div className="absolute -top-10 -left-4 sm:-left-10 pointer-events-none animate-float-slow z-40 hidden sm:block">
          <PaperAirplaneContrail className="w-24 sm:w-28 h-16 sm:h-20" />
        </div>

        <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-2xl border border-[#7C8A96]/20 text-[#33322E] relative overflow-hidden">
          {/* Subtle watermark in reservation background */}
          <div className="absolute -bottom-8 -right-8 pointer-events-none opacity-10">
            <FancyTravelIcon name="compass" className="size-36" />
          </div>

          {/* Top Bar: Expeditions & Treks Focus (Flight and Hotels removed per requirements) */}
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-stone-100">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold bg-[#2D4A34] text-[#F5F3EF] shadow-md">
              <Compass className="size-4 text-[#7FA05C]" />
              <span>Himalayan Expedition &amp; Trek Search</span>
            </div>

            {/* Visible animated 2D badge on tab bar right */}
            <div className="ml-auto hidden sm:flex items-center">
              <AnimatedTravelBadge
                icon="tickets"
                label="CONFIRMED 2026 DEPARTURES"
                animation="animate-float-gentle"
                variant="light"
                size="size-4"
              />
            </div>
          </div>

          {/* Form Fields: Destination | Activity | Departure Date | Guest | Search CTA */}
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3.5 items-end">
            <div className="lg:col-span-3">
              <label htmlFor="hero-destination-select" className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1.5">
                Destination
              </label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#7FA05C]" />
                <select
                  id="hero-destination-select"
                  value={searchDestination}
                  onChange={(e) => setSearchDestination(e.target.value)}
                  className="w-full h-12 pl-10 pr-4 bg-[#F5F3EF] border border-[#7C8A96]/30 rounded-2xl text-xs font-semibold text-[#2D4A34] focus:outline-none focus:border-[#2D4A34] cursor-pointer appearance-none"
                >
                  <option value="All">All Himalayan Regions</option>
                  <option value="Everest">Everest &amp; Kala Patthar</option>
                  <option value="Annapurna">Annapurna Sanctuary &amp; Circuit</option>
                  <option value="Manaslu">Manaslu Circuit (Restricted)</option>
                  <option value="Langtang">Langtang Valley &amp; Glaciers</option>
                  <option value="Bhutan">Kingdom of Bhutan</option>
                  <option value="Tibet">Lhasa &amp; Kailash, Tibet</option>
                </select>
              </div>
            </div>

            <div className="lg:col-span-3">
              <label htmlFor="hero-activity-select" className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1.5">
                Expedition Activity
              </label>
              <div className="relative">
                <Mountain className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#7FA05C]" />
                <select
                  id="hero-activity-select"
                  value={searchActivity}
                  onChange={(e) => setSearchActivity(e.target.value)}
                  className="w-full h-12 pl-10 pr-4 bg-[#F5F3EF] border border-[#7C8A96]/30 rounded-2xl text-xs font-semibold text-[#2D4A34] focus:outline-none focus:border-[#2D4A34] cursor-pointer appearance-none"
                >
                  <option value="All">All Activities</option>
                  <option value="Trekking">High Altitude Trekking</option>
                  <option value="Peak Climbing">Technical Peak Climbing</option>
                  <option value="Tour">Cultural Alpine Tour</option>
                </select>
              </div>
            </div>

            <div className="lg:col-span-2">
              <label htmlFor="hero-departure-date" className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1.5">
                Target Departure
              </label>
              <div className="relative">
                <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#7FA05C]" />
                <input
                  id="hero-departure-date"
                  type="date"
                  value={searchCheckIn}
                  onChange={(e) => setSearchCheckIn(e.target.value)}
                  className="w-full h-12 pl-10 pr-3 bg-[#F5F3EF] border border-[#7C8A96]/30 rounded-2xl text-xs font-semibold text-[#2D4A34] focus:outline-none focus:border-[#2D4A34] cursor-pointer"
                />
              </div>
            </div>

            <div className="lg:col-span-2">
              <label htmlFor="hero-guests-select" className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1.5">
                Climbers / Party
              </label>
              <div className="relative">
                <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#7FA05C]" />
                <select
                  id="hero-guests-select"
                  value={searchGuests}
                  onChange={(e) => setSearchGuests(e.target.value)}
                  className="w-full h-12 pl-10 pr-3 bg-[#F5F3EF] border border-[#7C8A96]/30 rounded-2xl text-xs font-semibold text-[#2D4A34] focus:outline-none focus:border-[#2D4A34] cursor-pointer appearance-none"
                >
                  <option value="1 Person">1 Climber (Solo)</option>
                  <option value="2 People">2 Climbers (Duo)</option>
                  <option value="4 People">4 Climbers (Team)</option>
                  <option value="8+ People">8+ Climbers (Full Group)</option>
                </select>
              </div>
            </div>

            <div className="lg:col-span-2">
              <button
                type="submit"
                className="w-full h-12 flex items-center justify-center gap-2 rounded-2xl bg-[#2D4A34] hover:bg-[#1F2E23] text-[#F5F3EF] font-bold text-xs shadow-lg transition-all active:scale-95 cursor-pointer"
              >
                <span>Search Expeditions</span>
                <ArrowRight className="size-3.5 text-[#7FA05C]" />
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: KINETIC INLINE-IMAGE TYPOGRAPHIC STATEMENT (Image 1: Tourex)
          ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center relative overflow-hidden">
        {/* Visible 2D Vintage Permit Stamp with gentle float */}
        <div className="absolute top-4 left-4 sm:left-10 pointer-events-none hidden md:block">
          <PassportStamp
            text="HIMALAYA PERMIT"
            date="2026-2027"
            subtext="AUTHENTIC EXPEDITION"
            className="w-20 h-20 opacity-80"
            animation="animate-tilt-float"
          />
        </div>
        {/* Visible 2D Globe Badge with gentle animation */}
        <div className="absolute top-6 right-6 sm:right-12 pointer-events-none hidden md:block">
          <AnimatedTravelBadge
            icon="globe"
            label="HIGH HIMALAYAS"
            animation="animate-float-gentle"
            variant="light"
            size="size-4"
          />
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-heading font-extrabold tracking-tight text-[#2D4A34] leading-[1.3] sm:leading-[1.35] text-balance">
          Take the step and explore{" "}
          <span className="inline-block align-middle mx-1.5 sm:mx-2 w-20 sm:w-28 md:w-32 h-8 sm:h-12 md:h-14 rounded-full overflow-hidden relative shadow-md border-2 border-white">
            <Image
              src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=400&auto=format&fit=crop"
              alt="Himalayan panorama"
              fill
              className="object-cover"
            />
          </span>{" "}
          the world{" "}
          <span className="inline-block align-middle mx-1.5 sm:mx-2 w-20 sm:w-28 md:w-32 h-8 sm:h-12 md:h-14 rounded-full overflow-hidden relative shadow-md border-2 border-white">
            <Image
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=400&auto=format&fit=crop"
              alt="Turquoise alpine water"
              fill
              className="object-cover"
            />
          </span>{" "}
          waiting for you.
        </h2>
        <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto mt-6 leading-relaxed font-medium">
          Traveling changes you. You see new places, meet new people, and become a new version of yourself.
        </p>
      </section>

      {/* =========================================================================
          SECTION 3: TOUR CATEGORIES (Redesigned matching Image 3 Reference)
          ========================================================================= */}
      <section className="py-20 sm:py-28 bg-white border-t border-b border-stone-200/80 relative overflow-hidden">
        {/* Faint Palm Leaf Watermark on Left Margin (matching Image 3) */}
        <div className="absolute bottom-6 left-4 sm:left-10 z-0 pointer-events-none opacity-25">
          <PalmWatermark className="w-28 sm:w-36 h-28 sm:h-36" />
        </div>

        {/* Faint Luggage Watermark on Right Margin (matching Image 3) */}
        <div className="absolute bottom-6 right-4 sm:right-10 z-0 pointer-events-none opacity-25">
          <LuggageWatermark className="w-24 sm:w-32 h-32 sm:h-40" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Centered Heading with Floating Retro Green Camera & Boarding Tickets (matching Image 3) */}
          <div className="text-center max-w-xl mx-auto mb-16 sm:mb-20 relative">
            {/* 2D Retro Green Camera floating top-left (Image 3) */}
            <div className="absolute -top-10 left-6 sm:left-14 pointer-events-none animate-float-drift z-20">
              <RetroCameraSticker className="w-13 h-11 sm:w-16 sm:h-14" tilt="-rotate-12" />
            </div>

            {/* 2D Boarding Tickets floating top-right (Image 3) */}
            <div className="absolute -top-9 right-6 sm:right-14 pointer-events-none animate-float-slow z-20">
              <BoardingTicketsSticker className="w-13 h-11 sm:w-16 sm:h-14" tilt="rotate-12" />
            </div>

            <div className="flex items-center justify-center mb-2">
              <AnimatedTravelBadge
                icon="compass"
                label="EXPLORE REGIONS"
                animation="animate-gentle-pulse"
                variant="light"
                size="size-4"
              />
            </div>

            <div className="flex items-center justify-center gap-2 mb-1.5">
              <div className="relative w-7 h-5 sm:w-8 sm:h-6">
                <Image
                  src="/images/assets/fluffy-cloud.png"
                  alt="Cloud Asset"
                  fill
                  className="object-contain drop-shadow-sm"
                />
              </div>
              <span className="text-[11px] sm:text-xs uppercase tracking-widest font-bold text-[#7FA05C]">
                Curated Tour Categories
              </span>
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-[#2D4A34] tracking-tight">
              Tour Categories
            </h2>
          </div>

          {/* Staggered Organic Categories Row without Card Containers (matching Image 3) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 sm:gap-6 lg:gap-7 items-start">
            {TOUR_CATEGORIES.map((cat) => (
              <a
                key={cat.id}
                href={cat.link}
                className={`tour-category-card group flex flex-col items-center transition-all duration-500 cursor-pointer ${cat.offsetClass}`}
              >
                {/* Pure Rounded Image Tile */}
                <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden shadow-md group-hover:shadow-2xl transition-all duration-500 bg-stone-200">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                </div>

                {/* Bold Category Name Underneath (NO box / border) */}
                <h4 className="font-heading font-extrabold text-xs sm:text-sm md:text-base text-[#2D4A34] text-center mt-3 group-hover:text-[#3E7C94] transition-colors tracking-tight">
                  {cat.name}
                </h4>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: MOST POPULAR TOUR SHOWCASE (Image 2: TravelGo & Access Nepal)
          ========================================================================= */}
      <section id="packages" className="py-20 bg-[#F5F3EF] relative overflow-hidden">
        {/* Visible animated 2D badges in margins */}
        <div className="absolute top-10 right-6 sm:right-12 pointer-events-none hidden md:block">
          <AnimatedTravelBadge
            icon="boot"
            label="HIGH TRAILS"
            animation="animate-float-gentle"
            variant="light"
            size="size-4"
          />
        </div>
        <div className="absolute bottom-10 left-6 sm:left-10 pointer-events-none hidden md:block">
          <AnimatedTravelBadge
            icon="map"
            label="TOP DESTINATIONS"
            animation="animate-gentle-pulse"
            variant="light"
            size="size-4"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <div className="relative w-7 h-5 sm:w-8 sm:h-6">
                  <Image
                    src="/images/assets/fluffy-cloud.png"
                    alt="Cloud Asset"
                    fill
                    className="object-contain drop-shadow-sm"
                  />
                </div>
                <span className="text-[11px] sm:text-xs uppercase tracking-widest font-bold text-[#7FA05C]">
                  Signature Himalayan Routes
                </span>
              </div>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-pine tracking-tight leading-[1.3] text-balance">
                Most Popular Tour
              </h2>
            </div>

            {/* Region Filter Tabs */}
            <div className="flex items-center gap-1.5 bg-white p-1 rounded-2xl border border-[#7C8A96]/20 overflow-x-auto shadow-xs">
              {["All", "Everest", "Annapurna", "Manaslu", "Bhutan"].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === tab
                      ? "bg-[#2D4A34] text-[#F5F3EF] shadow-xs"
                      : "text-[#33322E]/70 hover:text-[#2D4A34]"
                  }`}
                >
                  {tab === "All" ? "All Tours" : tab}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Search Results Banner (Visible when user searches from hero widget) */}
          {appliedSearch && (
            <div className="mb-8 p-4 rounded-2xl bg-white border border-[#2D4A34]/25 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <div className="size-7 rounded-lg bg-[#7FA05C]/20 text-[#2D4A34] flex items-center justify-center font-bold">
                  ✓
                </div>
                <div>
                  <span className="font-extrabold text-[#2D4A34] block">
                    Search Results: {appliedSearch.destination === "All" ? "All Himalayan Regions" : `${appliedSearch.destination} Region`}
                    {appliedSearch.activity !== "All" && ` · ${appliedSearch.activity}`}
                  </span>
                  <span className="text-[#7C8A96] block text-[11px] mt-0.5">
                    Target: {appliedSearch.date || "Flexible Date"} · Party: {appliedSearch.guests} · Found {filteredPackages.length} matching expedition{filteredPackages.length === 1 ? "" : "s"}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setAppliedSearch(null);
                  setActiveTab("All");
                  if (typeof window !== "undefined") {
                    window.history.pushState({}, "", window.location.pathname);
                  }
                }}
                className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-[#2D4A34] font-bold text-xs transition-colors cursor-pointer"
              >
                Clear Search Filter
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map((pkg) => (
              <Card
                key={pkg.id}
                className="overflow-hidden border border-[#7C8A96]/25 rounded-3xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={pkg.heroImage}
                    alt={pkg.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-2 z-10">
                    <span className="px-3 py-1 rounded-full bg-[#2D4A34] text-[#F5F3EF] text-[11px] font-extrabold shadow-sm">
                      {pkg.duration}
                    </span>
                    {pkg.bestSeller && (
                      <span className="px-3 py-1 rounded-full bg-[#D9A23B] text-slate-900 text-[11px] font-extrabold shadow-sm">
                        Best Seller
                      </span>
                    )}
                  </div>

                  {pkg.discountPercent > 0 && (
                    <div className="absolute top-3.5 right-3.5 z-10">
                      <span className="px-2.5 py-1 rounded-full bg-[#7FA05C] text-white text-[11px] font-extrabold shadow-sm">
                        {pkg.discountPercent}% OFF
                      </span>
                    </div>
                  )}

                  <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-white text-xs z-10">
                    <span className="font-semibold flex items-center gap-1">
                      <Mountain className="size-3.5 text-[#7FA05C]" />
                      {pkg.altitude}
                    </span>
                    <span className="flex items-center gap-1 font-bold bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-xs">
                      <Star className="size-3 fill-[#D9A23B] text-[#D9A23B]" />
                      {pkg.rating} ({pkg.reviewsCount})
                    </span>
                  </div>
                </div>

                <CardContent className="p-6 sm:p-7 pt-6 sm:pt-7 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] font-bold text-[#2D4A34] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                      <span className="inline-block size-1.5 rounded-full bg-[#7FA05C]" />
                      <span>{pkg.destination} · {pkg.region} Region</span>
                    </div>

                    <Link href={`/tour/${pkg.slug}`} className="block group/title">
                      <h3 className="font-heading font-extrabold text-[17px] sm:text-lg text-[#2D4A34] group-hover/title:text-[#3E7C94] transition-colors leading-snug line-clamp-2 h-[52px] flex items-center">
                        {pkg.title}
                      </h3>
                    </Link>

                    <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed h-[36px]">
                      {pkg.subtitle}
                    </p>

                    <div className="mt-4 pt-3.5 border-t border-stone-200/80 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-stone-500 font-medium">
                        <span>Difficulty:</span>
                        <span className="font-bold text-[#2D4A34] bg-[#F5F3EF] px-2 py-0.5 rounded-md text-[11px] border border-stone-200/60">
                          {pkg.difficulty}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-stone-500 font-medium">
                        <span>Best:</span>
                        <span className="font-bold text-[#2D4A34] bg-[#F5F3EF] px-2 py-0.5 rounded-md text-[11px] border border-stone-200/60">
                          {pkg.bestSeason.split("&")[0].trim()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-stone-200/80 flex items-end justify-between">
                    <div>
                      <div className="text-[10px] text-stone-400 uppercase font-bold tracking-wider flex items-center gap-1.5">
                        <span>From</span>
                        <span className="line-through text-stone-400 font-semibold">
                          {formatPrice(pkg.originalPriceUSD)}
                        </span>
                      </div>
                      <div className="text-2xl font-black text-[#2D4A34] tracking-tight leading-none mt-1">
                        {formatPrice(pkg.priceUSD)}
                        <span className="text-xs font-normal text-stone-500 ml-1">/ person</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/tour/${pkg.slug}`}
                        className="px-3.5 py-2.5 rounded-xl bg-stone-100 hover:bg-[#2D4A34] hover:text-white text-[#2D4A34] font-bold text-xs transition-colors border border-stone-200/80 cursor-pointer"
                      >
                        Details
                      </Link>
                      <Link
                        href={`/booking?package=${pkg.slug}`}
                        className="px-4 py-2.5 rounded-xl bg-[#2D4A34] hover:bg-[#1F2E23] text-[#F5F3EF] font-bold text-xs transition-all shadow-xs hover:shadow-md cursor-pointer"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: CULINARY GASTRONOMY & INTERACTIVE SCENIC MEDIA (Alpine Hearth & 4K Reel)
          ========================================================================= */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative overflow-hidden">
        {/* Subtle decorative background watermark glows */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-[#7FA05C]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#3E7C94]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Corner animated travel badge */}
        <div className="absolute top-8 right-12 pointer-events-none hidden md:block">
          <AnimatedTravelBadge
            icon="camping"
            label="TEAHOUSE GASTRONOMY"
            animation="animate-float-gentle"
            variant="light"
            size="size-4"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Authentic Himalayan Trail Gastronomy Bento */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="relative w-7 h-5 sm:w-8 sm:h-6">
                  <Image
                    src="/images/assets/fluffy-cloud.png"
                    alt="Cloud Asset"
                    fill
                    className="object-contain drop-shadow-sm"
                  />
                </div>
                <span className="text-[11px] sm:text-xs uppercase tracking-widest font-bold text-[#7FA05C]">
                  Himalayan Gastronomy & Trail Sustenance
                </span>
              </div>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-pine tracking-tight leading-[1.3] text-balance">
                Where and what to eat on the trail
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-2 font-medium leading-relaxed max-w-xl">
                High-altitude organic fuel and warm hearth hospitality prepared fresh daily by local Sherpa cooks across traditional stone teahouse lodges.
              </p>
            </div>

            {/* Food Card 1: Hand-Crimped Himalayan Sherpa Momos (Hero Card) */}
            <div className="relative h-56 sm:h-60 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 border border-stone-200/90 bg-stone-900 group">
              <Image
                src="https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=900&auto=format&fit=crop"
                alt="Hand-Crimped Himalayan Sherpa Momos with dipping chutney"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D9A23B] text-slate-900 text-xs font-black uppercase tracking-wide shadow-md">
                  <Utensils className="size-3 text-[#2D4A34]" />
                  <span>Teahouse Signature</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/45 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold">
                  <Mountain className="size-3 text-[#7FA05C]" />
                  <span>Namche Bazaar • 3,440m</span>
                </span>
              </div>

              <div className="absolute bottom-4 left-5 right-5 text-white z-10">
                <div className="flex items-center gap-1.5 text-xs text-amber-200/90 font-semibold mb-1">
                  <MapPin className="size-3 text-[#7FA05C]" />
                  <span>Lukla to Everest Base Camp Route</span>
                </div>
                <h3 className="font-heading font-extrabold text-lg sm:text-xl text-white leading-snug drop-shadow-sm group-hover:text-amber-100 transition-colors">
                  Steaming Sherpa Momos with Mountain Herb Chili Achar
                </h3>
                <p className="text-xs text-white/80 mt-1 line-clamp-1">
                  Handmade daily with fresh highland greens, yak cheese, and wild Himalayan spices folded in delicate dough.
                </p>
              </div>
            </div>

            {/* Food Cards 2 & 3: Traditional Dal Bhat Power + Marpha Apple Tart */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Card 2: Dal Bhat */}
              <div className="rounded-3xl overflow-hidden border border-stone-200/90 bg-white shadow-md hover:shadow-xl transition-all duration-500 group flex flex-col">
                <div className="relative h-44 w-full overflow-hidden bg-stone-900">
                  <Image
                    src="https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=800&auto=format&fit=crop"
                    alt="Traditional Brass Thali Dal Bhat with Spiced Lentils"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full bg-[#2D4A34] text-white text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
                      24-Hour Trail Fuel
                    </span>
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <h4 className="font-heading font-extrabold text-sm text-[#2D4A34] leading-snug group-hover:text-[#3E7C94] transition-colors">
                      Brass Thali Dal Bhat Platter
                    </h4>
                    <p className="text-xs text-stone-600 mt-1 line-clamp-2 leading-relaxed font-sans">
                      Steamed mountain rice, slow-simmered lentil broth, organic spinach tarkari & pickled radish.
                    </p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center gap-1.5 text-[11px] font-semibold text-[#7FA05C]">
                    <CheckCircle2 className="size-3.5 text-[#7FA05C] shrink-0" />
                    <span>Unlimited Teahouse Refills Included</span>
                  </div>
                </div>
              </div>

              {/* Card 3: Marpha Apple Tart */}
              <div className="rounded-3xl overflow-hidden border border-stone-200/90 bg-white shadow-md hover:shadow-xl transition-all duration-500 group flex flex-col">
                <div className="relative h-44 w-full overflow-hidden bg-stone-900">
                  <Image
                    src="https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?q=80&w=800&auto=format&fit=crop"
                    alt="Wood-Fired Himalayan Apple Tart"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full bg-[#7FA05C] text-white text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
                      Annapurna Hearth
                    </span>
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <h4 className="font-heading font-extrabold text-sm text-[#2D4A34] leading-snug group-hover:text-[#3E7C94] transition-colors">
                      Wood-Fired Marpha Apple Tart
                    </h4>
                    <p className="text-xs text-stone-600 mt-1 line-clamp-2 leading-relaxed font-sans">
                      Heirloom Mustang orchard apples baked in clay hearths with wild cinnamon and hot butter tea.
                    </p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center gap-1.5 text-[11px] font-semibold text-[#D9A23B]">
                    <Sparkles className="size-3.5 text-[#D9A23B] shrink-0" />
                    <span>Fresh Daily Teahouse Hearth Bake</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Prestige 4K Alpine Aerial Expedition Video Card */}
          <div className="lg:col-span-6 relative flex flex-col">
            <div className="relative min-h-[520px] sm:min-h-[580px] lg:h-full rounded-3xl overflow-hidden border border-stone-200/90 shadow-2xl bg-stone-950 group flex flex-col justify-between p-6 sm:p-8">
              {/* Alpine Sunrise Background Photography */}
              <Image
                src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1400&auto=format&fit=crop"
                alt="Golden sunrise illuminating high Himalayan summits"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/25" />

              {/* Top Glassmorphism Meta Bar */}
              <div className="relative z-20 flex items-center justify-between">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/55 backdrop-blur-md border border-white/20 text-white text-xs font-bold tracking-wide shadow-md">
                  <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                  4K CINEMATIC DISPATCH • 2:15 MIN
                </span>

                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/55 backdrop-blur-md border border-white/20 text-white text-xs font-semibold shadow-md">
                  <Mountain className="size-3.5 text-[#D9A23B]" />
                  <span>Kala Patthar • 5,550m ASL</span>
                </span>
              </div>

              {/* Spacer */}
              <div className="flex-1" />

              {/* Bottom Captions & Feature Highlights */}
              <div className="relative z-20 text-white">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2D4A34]/90 text-white text-[11px] font-bold uppercase tracking-wider backdrop-blur-xs mb-2.5 border border-white/15">
                  <Mountain className="size-3 text-[#7FA05C]" />
                  <span>Dawn Over Sagarmatha & Annapurna Sanctuaries</span>
                </div>
                <h3 className="font-heading font-extrabold text-xl sm:text-2xl lg:text-3xl text-white drop-shadow-sm leading-snug">
                  Catch the golden hour above the highest peaks
                </h3>
                <p className="text-xs sm:text-sm text-white/80 mt-1.5 max-w-lg leading-relaxed font-sans">
                  Witness the first alpine dawn striking the sheer rock and ice face of Everest, Lhotse, and Machapuchare from an aerial perspective.
                </p>

                {/* Highlights Strip */}
                <div className="mt-4 pt-3.5 border-t border-white/15 flex flex-wrap items-center gap-3 text-xs text-white/90 font-medium">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-3.5 text-[#7FA05C]" />
                    Ultra-HD Aerial Vistas
                  </span>
                  <span className="text-white/30">•</span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-3.5 text-[#D9A23B]" />
                    Sherpa Audio Narration
                  </span>
                  <span className="text-white/30">•</span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-3.5 text-[#7FA05C]" />
                    Full Interactive Map
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: TIERED EXPEDITION PASSES & AERIAL TRAVERSES (Image 1 Redesign)
          ========================================================================= */}
      <section ref={section6Ref} className="py-24 bg-background border-t border-b border-mountain/20 relative overflow-hidden">
        {/* Animated 2D travel badges */}
        <div className="absolute top-8 right-8 sm:right-16 pointer-events-none hidden md:block">
          <PassportStamp
            text="EXPEDITION PASS"
            date="2026-2027"
            subtext="GUARANTEED TRAVERSE"
            className="w-20 h-20 opacity-80"
            animation="animate-tilt-float"
          />
        </div>
        <div className="absolute bottom-6 left-6 pointer-events-none hidden lg:block">
          <AnimatedTravelBadge
            icon="hot-air-balloon"
            label="AERIAL & HIGH PASS"
            animation="animate-float-gentle"
            variant="light"
            size="size-4"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header with Eyebrow, Editorial Title, and Interactive Mode Switcher */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <SectionEyebrow>Tiered Expedition Passes</SectionEyebrow>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-pine tracking-tight leading-[1.3] text-balance">
                Choose Your Altitude &amp; Expedition Tier
              </h2>
              <p className="text-text/80 text-sm sm:text-base mt-3 leading-relaxed">
                From shared sunrise flights past Everest and Langtang to VIP helicopter traverses and private Sherpa-led summit passes.
              </p>
            </div>

            {/* Interactive Experience Mode Switcher */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <span className="text-xs font-bold text-mountain uppercase tracking-wider hidden xl:inline">
                Expedition Mode:
              </span>
              <div className="inline-flex p-1.5 rounded-full bg-surface border border-mountain/25 shadow-xs">
                <button
                  type="button"
                  onClick={() => setPackageMode("aerial")}
                  aria-pressed={packageMode === "aerial"}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    packageMode === "aerial"
                      ? "bg-pine text-white shadow-sm"
                      : "text-mountain hover:text-pine"
                  }`}
                >
                  <Plane className="size-3.5" />
                  <span>Aerial Mountain Flights</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPackageMode("ground")}
                  aria-pressed={packageMode === "ground"}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    packageMode === "ground"
                      ? "bg-pine text-white shadow-sm"
                      : "text-mountain hover:text-pine"
                  }`}
                >
                  <Mountain className="size-3.5" />
                  <span>High-Alpine Traverses</span>
                </button>
              </div>
            </div>
          </div>

          {/* 3 Bento Cards with AnimatePresence */}
          <AnimatePresence mode="wait">
            <motion.div
              key={packageMode}
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch"
            >
              {EXPEDITION_PASSES[packageMode].map((pkg) => {
                const isExclusive = pkg.featured;

                return (
                  <div
                    key={pkg.id}
                    className={`rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 relative group ${
                      isExclusive
                        ? "bg-pine text-white shadow-2xl lg:-translate-y-4 hover:-translate-y-6 hover:shadow-2xl border-2 border-accent-gold/70"
                        : "bg-surface text-text border border-mountain/20 hover:border-mountain/45 hover:shadow-xl hover:-translate-y-2"
                    }`}
                  >
                    {/* Top Ribbon for Sovereign / Exclusive Card */}
                    {isExclusive && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-accent-gold via-amber-300 to-accent-gold text-pine text-[10px] font-black uppercase tracking-widest shadow-md flex items-center gap-1.5 whitespace-nowrap">
                        <Sparkles className="size-3" />
                        <span>Most Chosen for Private Expeditions</span>
                      </div>
                    )}

                    <div>
                      {/* Tier & Badge row */}
                      <div className="flex items-center justify-between mb-3 pt-1">
                        <span
                          className={`text-xs font-bold uppercase tracking-wider ${
                            isExclusive ? "text-accent-gold" : "text-mountain"
                          }`}
                        >
                          {pkg.tier}
                        </span>
                        {pkg.badge && !isExclusive && (
                          <span className="px-2.5 py-0.5 rounded-full bg-mountain/10 text-pine text-[10px] font-bold uppercase tracking-wide">
                            {pkg.badge}
                          </span>
                        )}
                        {isExclusive && (
                          <span className="px-2.5 py-0.5 rounded-full bg-accent-gold/20 text-accent-gold border border-accent-gold/40 text-[10px] font-extrabold uppercase tracking-widest">
                            VIP Sovereign
                          </span>
                        )}
                      </div>

                      {/* Dynamic Currency Price */}
                      <div className="flex items-baseline gap-1.5 mt-2 mb-2">
                        <span
                          className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight ${
                            isExclusive ? "text-white" : "text-pine"
                          }`}
                        >
                          {formatPrice(pkg.priceUsd)}
                        </span>
                        <span
                          className={`text-xs font-semibold ${
                            isExclusive ? "text-stone-300" : "text-mountain"
                          }`}
                        >
                          {pkg.unit}
                        </span>
                      </div>

                      {/* Tagline */}
                      <p
                        className={`text-xs leading-relaxed mb-6 ${
                          isExclusive ? "text-stone-200/90" : "text-text/75"
                        }`}
                      >
                        {pkg.tagline}
                      </p>

                      {/* Altitude & Duration Micro-Specs */}
                      <div
                        className={`p-3 rounded-2xl mb-6 flex items-center justify-between text-xs font-medium border ${
                          isExclusive
                            ? "bg-white/10 border-white/15 text-white"
                            : "bg-background border-mountain/15 text-pine"
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <Mountain
                            className={`size-3.5 ${
                              isExclusive ? "text-accent-gold" : "text-meadow"
                            }`}
                          />
                          <span className="font-semibold">{pkg.altitude}</span>
                        </div>
                        <div className="text-[11px] opacity-80">
                          {pkg.duration}
                        </div>
                      </div>

                      {/* Features Checklist */}
                      <ul className="space-y-3 mb-8">
                        {pkg.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs leading-relaxed">
                            <span
                              className={`size-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                                isExclusive
                                  ? "bg-accent-gold text-pine"
                                  : "bg-pine text-white"
                              }`}
                            >
                              <Check className="size-2.5 stroke-[3]" />
                            </span>
                            <span
                              className={
                                isExclusive
                                  ? "text-stone-200 font-medium"
                                  : "text-text/85 font-medium"
                              }
                            >
                              {feat}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Bottom Action Section */}
                    <div>
                      <div
                        className={`text-[10px] font-bold uppercase tracking-wider mb-3 flex items-center gap-1 ${
                          isExclusive ? "text-accent-gold" : "text-mountain"
                        }`}
                      >
                        <ShieldCheck className="size-3" />
                        <span>{pkg.aeromedicalTag}</span>
                      </div>

                      <Link
                        href={pkg.link}
                        className={`w-full py-3.5 px-5 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-xs ${
                          isExclusive
                            ? "bg-white text-pine hover:bg-accent-gold hover:text-white shadow-md font-extrabold"
                            : "bg-pine text-white hover:bg-pine/90 shadow-sm"
                        }`}
                      >
                        <span>{pkg.buttonText}</span>
                        <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Bottom Alpine Expedition Guarantee Ribbon */}
          <div className="mt-14 text-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-6 px-6 py-3.5 rounded-2xl bg-surface border border-mountain/20 shadow-xs text-xs text-text/85 font-medium">
              <span className="flex items-center gap-1.5 font-bold text-pine">
                <ShieldCheck className="size-4 text-meadow" />
                100% Weather Reschedule Guarantee
              </span>
              <span className="text-mountain/30 hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5">
                <Mountain className="size-4 text-accent-blue" />
                Zero Environmental Footprint (Carbon Offset)
              </span>
              <span className="text-mountain/30 hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5">
                <HeartPulse className="size-4 text-terracotta" />
                Aeromedical Emergency Standby on Every Craft
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: "ABOUT US / WHY CHOOSE US" SPLIT SECTION (Image 1 Redesign)
          ========================================================================= */}
      <section ref={section7Ref} className="py-24 bg-background border-b border-mountain/20 relative overflow-hidden">
        {/* Animated 2D compass sticker & vintage luggage tag */}
        <div className="absolute top-8 left-8 pointer-events-none hidden md:block">
          <AnimatedTravelBadge
            icon="compass"
            label="GUIDED EXPEDITIONS"
            animation="animate-float-slow"
            variant="light"
            size="size-4"
          />
        </div>
        <div className="absolute bottom-8 right-10 pointer-events-none hidden md:block">
          <PassportStamp
            text="HIMALAYA STATS"
            date="SINCE 2008"
            subtext="ACCUMULATED RECORD"
            className="w-20 h-20 opacity-80"
            animation="animate-tilt-float"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left: Tall portrait image of alpine mountain lake with subtle depth parallax & live status beacons */}
            <div className="lg:col-span-5">
              <div
                ref={mountainParallaxRef}
                className="relative h-[490px] sm:h-[550px] rounded-3xl overflow-hidden shadow-2xl border-4 border-surface group"
              >
                <div
                  className="absolute inset-0 w-full h-[115%] -top-[7.5%] will-change-transform"
                  style={{
                    transform: prefersReducedMotion
                      ? "none"
                      : `translateY(${mountainOffsetY}px) scale(1.05)`,
                    transition: "transform 0.1s ease-out",
                  }}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=900&auto=format&fit=crop"
                    alt="Scenic mountain lake with wooden boat"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                {/* Top Alpine Coordinates Live Beacon with Concentric Radar Wave */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white text-xs font-semibold shadow-lg group/beacon hover:bg-black/70 transition-colors">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-40 [animation-delay:400ms]" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-xs" />
                  </span>
                  <span className="tracking-wide font-bold">Gokyo Ri Summit · 5,357m</span>
                  <span className="text-white/40 hidden sm:inline">•</span>
                  <span className="text-white/80 text-[10px] hidden sm:inline font-mono">27°57&apos;N 86°41&apos;E</span>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none" />

                {/* Bottom Frosted Glass Milestone Card */}
                <div className="absolute bottom-4 left-4 right-4 z-20 p-4 rounded-2xl bg-black/55 backdrop-blur-md border border-white/20 shadow-xl text-white">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Badge
                      variant="meadow"
                      className="px-2.5 py-0.5 rounded-full bg-meadow text-white border-transparent text-[10px] font-extrabold uppercase tracking-wider shadow-xs"
                    >
                      Pristine Himalayan Trails
                    </Badge>
                    <span className="text-[11px] text-white/75 font-medium">Sacred Alpine Basin</span>
                  </div>
                  <h4 className="font-heading font-bold text-base sm:text-lg text-white leading-snug">
                    Gokyo Sacred Lakes &amp; Ngozumpa Glacier
                  </h4>
                  <p className="text-xs text-white/80 mt-1 leading-relaxed">
                    Highest freshwater alpine lake system on Earth · 4,750m elevation
                  </p>
                  <div className="mt-2.5 pt-2.5 border-t border-white/15 flex items-center gap-3 text-[11px] text-white/90">
                    <span className="flex items-center gap-1 font-medium">
                      <CheckCircle2 className="size-3 text-meadow" />
                      Daily Acclimatization
                    </span>
                    <span className="flex items-center gap-1 font-medium">
                      <ShieldCheck className="size-3 text-accent-gold" />
                      Sherpa Guided
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Staggered Cascade Entrance for Eyebrow, Heading, Paragraph, and Bento Milestone Cards */}
            <div className="lg:col-span-7">
              {/* Stagger 1: Eyebrow (delay 0ms) */}
              <div
                className="transition-all duration-700 ease-out"
                style={{
                  opacity: section7InView ? 1 : 0,
                  transform: prefersReducedMotion
                    ? "none"
                    : section7InView
                    ? "translateY(0)"
                    : "translateY(20px)",
                  transitionDelay: "0ms",
                }}
              >
                <SectionEyebrow>Transformative Journeys</SectionEyebrow>
              </div>

              {/* Stagger 2: Heading (delay 120ms) */}
              <div
                className="transition-all duration-700 ease-out"
                style={{
                  opacity: section7InView ? 1 : 0,
                  transform: prefersReducedMotion
                    ? "none"
                    : section7InView
                    ? "translateY(0)"
                    : "translateY(20px)",
                  transitionDelay: "120ms",
                }}
              >
                <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-pine tracking-tight leading-[1.35] sm:leading-[1.4] text-balance">
                  Traveling brings you{" "}
                  <span className="inline-block align-middle mx-1.5 sm:mx-2 w-16 sm:w-24 md:w-28 h-7 sm:h-9 md:h-11 rounded-full overflow-hidden relative shadow-md border-2 border-surface group/pill cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-xl hover:border-meadow">
                    <Image
                      src="https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=400&auto=format&fit=crop"
                      alt="Alpine expedition trekkers on trail"
                      fill
                      className="object-cover group-hover/pill:scale-115 transition-transform duration-500"
                    />
                    <span className="absolute inset-0 bg-black/15 group-hover/pill:bg-transparent transition-colors" />
                  </span>{" "}
                  closer to new places,{" "}
                  <span className="inline-block align-middle mx-1.5 sm:mx-2 w-16 sm:w-24 md:w-28 h-7 sm:h-9 md:h-11 rounded-full overflow-hidden relative shadow-md border-2 border-surface group/pill cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-xl hover:border-meadow">
                    <Image
                      src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=400&auto=format&fit=crop"
                      alt="Himalayan mountain peaks"
                      fill
                      className="object-cover group-hover/pill:scale-115 transition-transform duration-500"
                    />
                    <span className="absolute inset-0 bg-black/15 group-hover/pill:bg-transparent transition-colors" />
                  </span>{" "}
                  people, and memories
                </h2>
              </div>

              {/* Stagger 3: Paragraph (delay 240ms) */}
              <div
                className="transition-all duration-700 ease-out"
                style={{
                  opacity: section7InView ? 1 : 0,
                  transform: prefersReducedMotion
                    ? "none"
                    : section7InView
                    ? "translateY(0)"
                    : "translateY(20px)",
                  transitionDelay: "240ms",
                }}
              >
                <p className="text-text/80 mt-5 leading-relaxed text-sm sm:text-base font-normal">
                  Trekking in Nepal is more than reaching high-altitude summits. It is about waking up to golden dawn on the Annapurna range, sharing butter tea with Sherpa elders in high stone teahouses, and discovering inner resilience along suspension bridges draped in sacred prayer flags.
                </p>
              </div>

              {/* Stagger 4: Tactile Bento Milestone Stat Cards with Radial Progress & Hover Physics (delay 360ms) */}
              <div
                className="transition-all duration-700 ease-out"
                style={{
                  opacity: section7InView ? 1 : 0,
                  transform: prefersReducedMotion
                    ? "none"
                    : section7InView
                    ? "translateY(0)"
                    : "translateY(20px)",
                  transitionDelay: "360ms",
                }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mt-8 pt-6 border-t border-mountain/20">
                  {/* Card 1: 97% Satisfaction with Animated SVG Radial Ring */}
                  <div className="group/stat bg-surface/75 hover:bg-surface border border-mountain/20 hover:border-meadow/50 rounded-2xl p-4 sm:p-5 transition-all duration-300 shadow-2xs hover:shadow-lg hover:-translate-y-1.5 relative overflow-hidden flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-3">
                      {/* Animated Radial Ring */}
                      <div className="relative size-11 flex items-center justify-center">
                        <svg className="size-11 -rotate-90" viewBox="0 0 44 44">
                          <circle
                            cx="22"
                            cy="22"
                            r="18"
                            className="stroke-mountain/15 fill-none"
                            strokeWidth="3"
                          />
                          <circle
                            cx="22"
                            cy="22"
                            r="18"
                            className="stroke-meadow fill-none transition-all duration-1000 ease-out"
                            strokeWidth="3"
                            strokeLinecap="round"
                            style={{
                              strokeDasharray: 2 * Math.PI * 18,
                              strokeDashoffset: section7InView
                                ? 2 * Math.PI * 18 * (1 - 0.97)
                                : 2 * Math.PI * 18,
                            }}
                          />
                        </svg>
                        <div className="size-7 rounded-lg bg-meadow/15 text-meadow flex items-center justify-center absolute group-hover/stat:bg-meadow group-hover/stat:text-white transition-colors duration-300">
                          <ShieldCheck className="size-4" />
                        </div>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-meadow bg-meadow/10 px-2 py-0.5 rounded-full">
                        Verified
                      </span>
                    </div>
                    <div>
                      <StatCounter
                        target={97}
                        suffix="%"
                        inView={section7InView}
                        prefersReducedMotion={prefersReducedMotion}
                        duration={1800}
                      />
                      <div className="text-sm font-bold text-pine mt-1">
                        Customer Satisfaction
                      </div>
                      <p className="text-[11px] text-mountain/90 mt-1 leading-snug">
                        Across 1,420+ high-altitude expeditions &amp; pass traverses
                      </p>
                    </div>
                  </div>

                  {/* Card 2: 85+ Curated Routes with Tactile Lift */}
                  <div className="group/stat bg-surface/75 hover:bg-surface border border-mountain/20 hover:border-accent-blue/50 rounded-2xl p-4 sm:p-5 transition-all duration-300 shadow-2xs hover:shadow-lg hover:-translate-y-1.5 relative overflow-hidden flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-3">
                      <div className="size-9 rounded-xl bg-accent-blue/15 text-accent-blue flex items-center justify-center group-hover/stat:bg-accent-blue group-hover/stat:text-white transition-colors duration-300">
                        <Compass className="size-5 group-hover/stat:rotate-45 transition-transform duration-500" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-accent-blue bg-accent-blue/10 px-2 py-0.5 rounded-full">
                        Active
                      </span>
                    </div>
                    <div>
                      <StatCounter
                        target={85}
                        suffix="+"
                        inView={section7InView}
                        prefersReducedMotion={prefersReducedMotion}
                        duration={1800}
                      />
                      <div className="text-sm font-bold text-pine mt-1">
                        Curated Destinations
                      </div>
                      <p className="text-[11px] text-mountain/90 mt-1 leading-snug">
                        From Khumbu 3-Passes to Manaslu &amp; Bhutan valleys
                      </p>
                    </div>
                  </div>

                  {/* Card 3: 245+ Experienced Guides with Tactile Lift */}
                  <div className="group/stat bg-surface/75 hover:bg-surface border border-mountain/20 hover:border-accent-gold/50 rounded-2xl p-4 sm:p-5 transition-all duration-300 shadow-2xs hover:shadow-lg hover:-translate-y-1.5 relative overflow-hidden flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-3">
                      <div className="size-9 rounded-xl bg-accent-gold/20 text-accent-gold flex items-center justify-center group-hover/stat:bg-accent-gold group-hover/stat:text-white transition-colors duration-300">
                        <Users className="size-5 group-hover/stat:scale-110 transition-transform duration-300" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-accent-gold bg-accent-gold/15 px-2 py-0.5 rounded-full">
                        Sherpa Team
                      </span>
                    </div>
                    <div>
                      <StatCounter
                        target={245}
                        suffix="+"
                        inView={section7InView}
                        prefersReducedMotion={prefersReducedMotion}
                        duration={1800}
                      />
                      <div className="text-sm font-bold text-pine mt-1">
                        Certified Sherpa Guides
                      </div>
                      <p className="text-[11px] text-mountain/90 mt-1 leading-snug">
                        IFMGA certified alpine leads with medical emergency mastery
                      </p>
                    </div>
                  </div>
                </div>

                {/* Authenticity & Safety Micro-Ribbon */}
                <div className="mt-5 flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-mountain/90 font-medium">
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface border border-mountain/20 text-pine font-semibold text-[11px] shadow-2xs">
                    <Mountain className="size-3.5 text-meadow" />
                    Leave No Trace Certified
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface border border-mountain/20 text-pine font-semibold text-[11px] shadow-2xs">
                    <ShieldCheck className="size-3.5 text-accent-blue" />
                    100% Native Sherpa Ownership
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface border border-mountain/20 text-pine font-semibold text-[11px] shadow-2xs">
                    <HeartPulse className="size-3.5 text-terracotta" />
                    Hyperbaric &amp; O2 Medical Protocols
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: "WHAT WE OFFER" - ALL-INCLUSIVE EXPEDITION CARE & LOGISTICS
          ========================================================================= */}
      <section className="py-24 bg-white border-b border-stone-200/80 relative overflow-hidden">
        {/* Visible animated 2D backpack badge in top corner */}
        <div className="absolute top-8 right-10 pointer-events-none hidden md:block">
          <AnimatedTravelBadge
            icon="backpack"
            label="EXPEDITION GEAR"
            animation="animate-float-gentle"
            variant="light"
            size="size-4"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Layered High-Altitude Expedition Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative h-[480px] sm:h-[540px] rounded-3xl overflow-hidden shadow-2xl border border-stone-200/90 bg-stone-900 group">
                <Image
                  src="https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=900&auto=format&fit=crop"
                  alt="High altitude Himalayan expedition trekker crossing alpine ridge"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Gradient Scrims */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-stone-950/35 pointer-events-none" />
                
                {/* Top Floating Status Pill */}
                <div className="absolute top-5 left-5 right-5 flex items-center justify-between pointer-events-none">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-950/75 backdrop-blur-md border border-white/20 text-white text-xs font-semibold shadow-lg">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7FA05C] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7FA05C]"></span>
                    </span>
                    <span>Khumbu Trail · 4,410m</span>
                  </div>
                  
                  <span className="text-[11px] font-mono uppercase tracking-wider text-white/85 bg-stone-950/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                    27°59&apos;N · 86°55&apos;E
                  </span>
                </div>

                {/* Bottom Floating Tactile Credential Card */}
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/90 shadow-xl text-[#2D4A34] transition-transform duration-300 group-hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="flex items-center gap-2.5">
                        <div className="size-9 rounded-xl bg-[#2D4A34] text-white flex items-center justify-center shrink-0 shadow-sm">
                          <ShieldCheck className="size-5 text-[#D9A23B]" />
                        </div>
                        <div>
                          <div className="font-heading font-extrabold text-xs sm:text-sm text-[#2D4A34]">
                            100% Certified Sherpa Crew
                          </div>
                          <div className="text-[10px] text-stone-500 font-medium">
                            UIAGM / NNMGA Licensed Mountaineers
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#7FA05C]/15 text-[#2D4A34] border border-[#7FA05C]/30 shrink-0">
                        1:2 Porter Ratio
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2.5 border-t border-stone-200/80 text-[10.5px] text-stone-600 font-medium">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="size-3.5 text-[#7FA05C] shrink-0" />
                        <span>Daily O₂ Saturation Logs</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="size-3.5 text-[#7FA05C] shrink-0" />
                        <span>Gamow Hyperbaric Ready</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: "What we offer" Header + 4 Dynamic Himalayan Care Cards */}
            <div className="lg:col-span-7">
              {/* Section Header */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-2">
                  <div className="relative w-7 h-5 sm:w-8 sm:h-6">
                    <Image
                      src="/images/assets/fluffy-cloud.png"
                      alt="Cloud Asset"
                      fill
                      className="object-contain drop-shadow-sm"
                    />
                  </div>
                  <span className="text-[11px] sm:text-xs uppercase tracking-widest font-bold text-[#7FA05C]">
                    Full-Service Expedition Care
                  </span>
                </div>
                
                <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-pine tracking-tight leading-[1.3] text-balance mb-3">
                  What we offer
                </h2>
                
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-medium max-w-xl">
                  Every high-altitude ascent pairs comprehensive clinical safety protocols with warm Sherpa teahouse hospitality, ethical porter welfare, and rapid mountain logistics.
                </p>
              </div>

              {/* 4 Interactive Inclusions Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-8">
                {/* 1. Lead Sherpa Guidance & Altitude Safety */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#F5F3EF]/60 hover:bg-white border border-stone-200/90 shadow-sm hover:shadow-md hover:border-[#7FA05C]/50 transition-all duration-300 group">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="size-11 rounded-xl bg-[#2D4A34]/10 border border-[#2D4A34]/15 flex items-center justify-center text-[#2D4A34] group-hover:bg-[#2D4A34] group-hover:text-white transition-colors duration-300 shrink-0">
                      <ShieldCheck className="size-5" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#7FA05C]/15 text-[#2D4A34]">
                      Certified Leads
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-sm sm:text-base text-[#2D4A34] mb-1.5">
                    Sherpa Safety &amp; Medical Care
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed font-medium mb-3">
                    Twice-daily pulse oximetry checks, PAC hyperbaric chambers, wilderness first-aid kits, and satellite communicators.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="text-[10px] font-semibold text-stone-500 bg-stone-200/60 px-2 py-0.5 rounded-md">
                      Daily SpO₂ Logs
                    </span>
                    <span className="text-[10px] font-semibold text-stone-500 bg-stone-200/60 px-2 py-0.5 rounded-md">
                      Garmin inReach
                    </span>
                  </div>
                </div>

                {/* 2. Full-Board Teahouse Hearth Dining */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#F5F3EF]/60 hover:bg-white border border-stone-200/90 shadow-sm hover:shadow-md hover:border-[#D9A23B]/50 transition-all duration-300 group">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="size-11 rounded-xl bg-[#D9A23B]/15 border border-[#D9A23B]/20 flex items-center justify-center text-[#D9A23B] group-hover:bg-[#D9A23B] group-hover:text-white transition-colors duration-300 shrink-0">
                      <Utensils className="size-5" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#D9A23B]/20 text-[#8C6418]">
                      3 Meals Daily
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-sm sm:text-base text-[#2D4A34] mb-1.5">
                    Full-Board Mountain Dining
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed font-medium mb-3">
                    Fresh Himalayan meals, warming garlic soups for acclimatization, high-calorie trail fuel, and unlimited boiled tea &amp; coffee.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="text-[10px] font-semibold text-stone-500 bg-stone-200/60 px-2 py-0.5 rounded-md">
                      Organic Produce
                    </span>
                    <span className="text-[10px] font-semibold text-stone-500 bg-stone-200/60 px-2 py-0.5 rounded-md">
                      Boiled Water
                    </span>
                  </div>
                </div>

                {/* 3. Ethical Porter Welfare & Luggage Logistics */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#F5F3EF]/60 hover:bg-white border border-stone-200/90 shadow-sm hover:shadow-md hover:border-[#3E7C94]/50 transition-all duration-300 group">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="size-11 rounded-xl bg-[#3E7C94]/15 border border-[#3E7C94]/20 flex items-center justify-center text-[#3E7C94] group-hover:bg-[#3E7C94] group-hover:text-white transition-colors duration-300 shrink-0">
                      <Users className="size-5" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#3E7C94]/20 text-[#25566A]">
                      IPPG Standard
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-sm sm:text-base text-[#2D4A34] mb-1.5">
                    Ethical Porter Logistics
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed font-medium mb-3">
                    15kg strict duffle limits, fair living wages, certified cold-weather gear, and comprehensive high-altitude health insurance.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="text-[10px] font-semibold text-stone-500 bg-stone-200/60 px-2 py-0.5 rounded-md">
                      1:2 Porter Ratio
                    </span>
                    <span className="text-[10px] font-semibold text-stone-500 bg-stone-200/60 px-2 py-0.5 rounded-md">
                      Insured Crew
                    </span>
                  </div>
                </div>

                {/* 4. 24/7 Helicopter Evac Standby */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#F5F3EF]/60 hover:bg-white border border-stone-200/90 shadow-sm hover:shadow-md hover:border-[#C34A36]/50 transition-all duration-300 group">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="size-11 rounded-xl bg-[#C34A36]/15 border border-[#C34A36]/20 flex items-center justify-center text-[#C34A36] group-hover:bg-[#C34A36] group-hover:text-white transition-colors duration-300 shrink-0">
                      <Plane className="size-5" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#C34A36]/15 text-[#C34A36]">
                      Instant Dispatch
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-sm sm:text-base text-[#2D4A34] mb-1.5">
                    24/7 Heli Rescue Standby
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed font-medium mb-3">
                    Direct base camp evac coordination up to 6,000m with Kathmandu Airbus B3 helicopters and pre-authorized insurance dispatch.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="text-[10px] font-semibold text-stone-500 bg-stone-200/60 px-2 py-0.5 rounded-md">
                      6,000m Ceiling
                    </span>
                    <span className="text-[10px] font-semibold text-stone-500 bg-stone-200/60 px-2 py-0.5 rounded-md">
                      Zero-Delay Link
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Inclusions Bar */}
              <div className="p-4 rounded-2xl bg-[#F5F3EF] border border-stone-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-stone-700 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Check className="size-3.5 text-[#7FA05C] stroke-[3]" />
                    <span>TIMS &amp; National Park Permits</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="size-3.5 text-[#7FA05C] stroke-[3]" />
                    <span>Kathmandu Airport Transfers</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="size-3.5 text-[#7FA05C] stroke-[3]" />
                    <span>Down Jacket &amp; Duffle Rental</span>
                  </div>
                </div>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2D4A34] hover:text-[#7FA05C] transition-colors shrink-0"
                >
                  <span>Safety standards</span>
                  <ArrowRight className="size-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9: "EXPERIENCE OUR DESTINATION" ASYMMETRIC GRID (Image 1: Tourex)
          ========================================================================= */}
      <section id="destinations" className="py-24 bg-[#F5F3EF] relative overflow-hidden">
        {/* Subtle Paper Plane with flight loop in destination section */}
        <div className="absolute top-8 right-10 pointer-events-none hidden md:block">
          <PaperAirplaneContrail className="w-24 sm:w-28 h-16 sm:h-20" />
        </div>
        <div className="absolute bottom-8 left-8 pointer-events-none hidden lg:block">
          <AnimatedTravelBadge
            icon="mountain"
            label="SIGNATURE PEAKS"
            animation="animate-float-gentle"
            variant="light"
            size="size-4"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="flex items-center justify-center gap-2 mb-1.5">
              <div className="relative w-7 h-5 sm:w-8 sm:h-6">
                <Image
                  src="/images/assets/fluffy-cloud.png"
                  alt="Cloud Asset"
                  fill
                  className="object-contain drop-shadow-sm"
                />
              </div>
              <span className="text-[11px] sm:text-xs uppercase tracking-widest font-bold text-[#7FA05C]">
                Curated Geographic Regions
              </span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#2D4A34] tracking-tight">
              Experience Our Destination
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2">
              From the iconic 8,000-meter peaks of Khumbu to remote Tibetan borderlands and sacred Himalayan kingdoms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DESTINATION_REGIONS.map((region, idx) => (
              <div
                key={region.id}
                className={`relative rounded-3xl overflow-hidden group shadow-md hover:shadow-2xl transition-all duration-500 ${
                  idx === 0 || idx === 3 ? "h-80 lg:h-96" : "h-80"
                }`}
              >
                <Image
                  src={region.image}
                  alt={region.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-[#7FA05C] text-white font-extrabold text-[11px] shadow-sm">
                    {region.badge}
                  </span>
                </div>

                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#D9A23B] uppercase tracking-wider mb-1">
                    <MapPin className="size-3" />
                    <span>{region.country} · {region.packageCount} Packages</span>
                  </div>
                  <h3 className="font-heading font-extrabold text-xl text-white">
                    {region.name}
                  </h3>
                  <p className="text-xs text-white/80 line-clamp-2 mt-1 leading-relaxed">
                    {region.description}
                  </p>
                  <div className="mt-3 pt-2.5 border-t border-white/20 flex items-center justify-between text-xs font-bold">
                    <span className="text-stone-200">
                      From <strong className="text-white text-sm">{formatPrice(region.startingPriceUSD)}</strong>
                    </span>
                    <span className="flex items-center gap-1 text-[#7FA05C] group-hover:translate-x-1 transition-transform">
                      Explore <ArrowRight className="size-3" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 10: SPECIAL OFFERS TO INSPIRE YOU (Alpine Expedition Voucher Passes)
          ========================================================================= */}
      <section className="py-24 bg-[#F5F3EF] border-t border-b border-stone-200/80 relative overflow-hidden">
        {/* Subtle decorative background watermark glows */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-[#7FA05C]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#3E7C94]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Visible animated 2D badges */}
        <div className="absolute top-8 left-6 sm:left-12 pointer-events-none hidden md:block">
          <AnimatedTravelBadge
            icon="tickets"
            label="SPECIAL OFFERS"
            animation="animate-float-gentle"
            variant="light"
            size="size-4"
          />
        </div>
        <div className="absolute top-8 right-8 sm:right-14 pointer-events-none hidden md:block">
          <AnimatedTravelBadge
            icon="compass"
            label="LIMITED DEPARTURES"
            animation="animate-gentle-pulse"
            variant="light"
            size="size-4"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="flex items-center justify-center gap-2 mb-1.5">
              <div className="relative w-7 h-5 sm:w-8 sm:h-6">
                <Image
                  src="/images/assets/fluffy-cloud.png"
                  alt="Cloud Asset"
                  fill
                  className="object-contain drop-shadow-sm"
                />
              </div>
              <span className="text-[11px] sm:text-xs uppercase tracking-widest font-bold text-[#7FA05C]">
                Exclusive Expedition Offers
              </span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#2D4A34] tracking-tight">
              Offers To Inspire You
            </h2>
            <p className="text-sm text-[#7C8A96] mt-2.5 font-sans leading-relaxed">
              Locked teahouse allocations, guaranteed departure slots, and direct Sherpa team rates for the 2026–2027 seasons.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SPECIAL_OFFERS.map((offer) => (
              <div
                key={offer.id}
                className="bg-white rounded-3xl border border-stone-200/90 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 flex flex-col overflow-hidden group"
              >
                {/* Chamber 1: Scenic Alpine Destination Visual Window */}
                <div className="h-64 sm:h-72 relative overflow-hidden bg-stone-900">
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Atmospheric gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/25" />

                  {/* Top Bar Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#D9A23B] text-white text-xs font-black tracking-wide shadow-md">
                      <Tag className="size-3" />
                      <span>{offer.discount}</span>
                    </span>

                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/45 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold shadow-sm">
                      <Mountain className="size-3 text-[#7FA05C]" />
                      <span>{offer.altitude}</span>
                    </span>
                  </div>

                  {/* Bottom Header Info inside Visual Window */}
                  <div className="absolute bottom-4 left-5 right-5 z-10">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[10px] font-mono tracking-widest text-amber-300 font-bold uppercase">
                        {offer.tag}
                      </span>
                      <span className="text-white/40 text-xs">•</span>
                      <span className="text-white/85 text-[11px] font-medium flex items-center gap-1">
                        <MapPin className="size-2.5 text-amber-300/80" />
                        {offer.region}
                      </span>
                    </div>

                    <h3 className="font-heading font-extrabold text-lg sm:text-xl text-white leading-snug drop-shadow-sm group-hover:text-amber-100 transition-colors">
                      {offer.title}
                    </h3>
                  </div>
                </div>

                {/* Tactile Perforated Ticket Divider with Notches */}
                <div className="relative flex items-center bg-white h-5 overflow-hidden">
                  {/* Left Concave Cutout */}
                  <div className="absolute -left-3 top-1/2 -translate-y-1/2 size-6 rounded-full bg-[#F5F3EF] border-r border-stone-200/90 shadow-inner" />
                  {/* Perforated Dashed Tear Line */}
                  <div className="w-full border-t border-dashed border-stone-300 mx-5" />
                  {/* Right Concave Cutout */}
                  <div className="absolute -right-3 top-1/2 -translate-y-1/2 size-6 rounded-full bg-[#F5F3EF] border-l border-stone-200/90 shadow-inner" />
                </div>

                {/* Chamber 2: Voucher Perks & Interactive Redemption Action */}
                <div className="p-6 pt-2 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <p className="text-xs text-stone-600 leading-relaxed font-sans">
                      {offer.description}
                    </p>

                    {/* Included Perk Highlight */}
                    <div className="mt-3.5 flex items-center gap-2 px-3 py-2 rounded-xl bg-stone-50 border border-stone-200/70">
                      <CheckCircle2 className="size-3.5 text-[#7FA05C] shrink-0" />
                      <span className="text-[11px] font-semibold text-[#2D4A34] line-clamp-1">
                        {offer.perk}
                      </span>
                    </div>

                    {/* Validity Metadata */}
                    <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-stone-400 font-medium">
                      <Calendar className="size-3 text-stone-400" />
                      <span>{offer.validity}</span>
                    </div>
                  </div>

                  {/* Voucher Action Row */}
                  <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
                    {/* 1-Click Interactive Copy Code Button */}
                    <button
                      type="button"
                      onClick={() => handleCopyCode(offer.code)}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-50 hover:bg-[#7FA05C]/10 border border-dashed border-stone-300 hover:border-[#7FA05C] transition-all group/code text-left cursor-pointer"
                      title="Click to copy promo code"
                    >
                      <div className="flex flex-col">
                        <span className="text-[9px] uppercase tracking-wider text-stone-400 font-bold">
                          Promo Code
                        </span>
                        <span className="font-mono text-xs font-black text-[#2D4A34] tracking-wider">
                          {offer.code}
                        </span>
                      </div>
                      {copiedCode === offer.code ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#2D4A34] bg-[#7FA05C]/25 px-1.5 py-0.5 rounded">
                          <Check className="size-3 text-[#2D4A34]" />
                          Copied!
                        </span>
                      ) : (
                        <Copy className="size-3.5 text-stone-400 group-hover/code:text-[#2D4A34] transition-colors" />
                      )}
                    </button>

                    {/* Direct Booking / View Tour CTA */}
                    <Link
                      href={offer.link}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#2D4A34] hover:bg-[#1E3324] text-white text-xs font-bold shadow-sm hover:shadow-md hover:translate-x-0.5 transition-all group/btn"
                    >
                      <span>Claim Deal</span>
                      <ArrowRight className="size-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Expedition Guarantee & Trust Ribbon */}
          <div className="mt-14 text-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-4 sm:gap-8 px-6 py-3.5 rounded-2xl bg-white/90 border border-stone-200/80 shadow-sm text-xs text-stone-600 font-medium">
              <span className="flex items-center gap-1.5 font-semibold text-[#2D4A34]">
                <ShieldCheck className="size-4 text-[#7FA05C]" />
                100% Guaranteed Departures
              </span>
              <span className="text-stone-300 hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="size-4 text-[#D9A23B]" />
                Zero Rescheduling Fees
              </span>
              <span className="text-stone-300 hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5">
                <Tag className="size-4 text-[#3E7C94]" />
                Instant Checkout Code Redemption
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 11: CUSTOMER REVIEWS & TESTIMONIALS (Image 2 Redesign)
          ========================================================================= */}
      <section ref={section11Ref} id="reviews" className="py-24 bg-background border-t border-mountain/20 relative overflow-hidden">
        {/* Visible animated 2D camera badge & passport stamp */}
        <div className="absolute top-8 right-8 sm:right-14 pointer-events-none hidden md:block">
          <AnimatedTravelBadge
            icon="camera"
            label="VERIFIED EXPEDITIONERS"
            animation="animate-float-gentle"
            variant="light"
            size="size-4"
          />
        </div>
        <div className="absolute bottom-6 left-6 sm:left-12 pointer-events-none hidden lg:block">
          <PassportStamp
            text="VERIFIED TREKKER"
            date="2026"
            subtext="AUTHENTIC EXPERIENCES"
            className="w-20 h-20 opacity-80"
            animation="animate-tilt-float"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-14">
            {/* Stagger 1: Eyebrow (delay 0ms) */}
            <div
              className="transition-all duration-700 ease-out"
              style={{
                opacity: section11InView ? 1 : 0,
                transform: prefersReducedMotion
                  ? "none"
                  : section11InView
                  ? "translateY(0)"
                  : "translateY(20px)",
                transitionDelay: "0ms",
              }}
            >
              <SectionEyebrow align="center">Verified Trekker Stories</SectionEyebrow>
            </div>

            {/* Stagger 2: Heading (delay 120ms) */}
            <div
              className="transition-all duration-700 ease-out"
              style={{
                opacity: section11InView ? 1 : 0,
                transform: prefersReducedMotion
                  ? "none"
                  : section11InView
                  ? "translateY(0)"
                  : "translateY(20px)",
                transitionDelay: "120ms",
              }}
            >
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-pine tracking-tight leading-[1.35] sm:leading-[1.4] text-balance">
                Customer Reviews &amp; Expedition Stories
              </h2>

              {/* Aggregate Trust Ribbon */}
              <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-4 px-4 py-2 rounded-full bg-surface border border-mountain/20 shadow-xs text-xs sm:text-sm font-semibold text-pine">
                <div className="flex items-center gap-1 text-accent-gold">
                  <Star className="size-3.5 fill-accent-gold text-accent-gold" />
                  <Star className="size-3.5 fill-accent-gold text-accent-gold" />
                  <Star className="size-3.5 fill-accent-gold text-accent-gold" />
                  <Star className="size-3.5 fill-accent-gold text-accent-gold" />
                  <Star className="size-3.5 fill-accent-gold text-accent-gold" />
                </div>
                <span className="font-black text-pine">4.98 / 5.0</span>
                <span className="text-mountain/40">•</span>
                <span className="text-mountain font-medium">1,420+ Verified Independent Reviews</span>
                <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-meadow font-bold pl-1 border-l border-mountain/20">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-meadow opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-meadow" />
                  </span>
                  TripAdvisor &amp; Google
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Traveler with backpack and map with subtle depth parallax & live trust beacon */}
            <div className="lg:col-span-4 flex justify-center">
              <div
                ref={trekkerParallaxRef}
                className="relative w-72 sm:w-80 h-[420px] sm:h-[460px] rounded-3xl overflow-hidden shadow-2xl border-4 border-surface bg-stone-200 group"
              >
                <div
                  className="absolute inset-0 w-full h-[115%] -top-[7.5%] will-change-transform"
                  style={{
                    transform: prefersReducedMotion
                      ? "none"
                      : `translateY(${trekkerOffsetY}px) scale(1.05)`,
                    transition: "transform 0.1s ease-out",
                  }}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=800&auto=format&fit=crop"
                    alt="Adventurous trekker with backpack in Himalayas"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                {/* Top Authenticity Badge */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-white/20 text-white text-xs font-semibold shadow-md">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span>100% Genuine Trekkers</span>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />

                {/* Bottom Glassmorphic Overlay Card */}
                <div className="absolute bottom-4 left-4 right-4 z-20 p-4 rounded-2xl bg-black/55 backdrop-blur-md border border-white/20 shadow-xl text-white">
                  <div className="flex items-center gap-1 text-accent-gold text-xs font-bold mb-1">
                    <Star className="size-3.5 fill-accent-gold text-accent-gold" />
                    <Star className="size-3.5 fill-accent-gold text-accent-gold" />
                    <Star className="size-3.5 fill-accent-gold text-accent-gold" />
                    <Star className="size-3.5 fill-accent-gold text-accent-gold" />
                    <Star className="size-3.5 fill-accent-gold text-accent-gold" />
                    <span className="text-white ml-1.5 font-extrabold text-xs">5.0 Star Rated</span>
                  </div>
                  <div className="font-heading font-bold text-sm sm:text-base text-white">
                    Verified Himalaya Trekkers
                  </div>
                  <p className="text-[11px] text-white/80 mt-1 leading-relaxed">
                    Real stories from Everest Base Camp, Annapurna Circuit &amp; Bhutan Sanctuary
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-white/15 flex items-center gap-2 text-[10px] text-white/90">
                    <span className="flex items-center gap-1 font-medium">
                      <ShieldCheck className="size-3 text-meadow" />
                      Sherpa-Led Safety
                    </span>
                    <span className="text-white/40">•</span>
                    <span className="flex items-center gap-1 font-medium">
                      <HeartPulse className="size-3 text-accent-gold" />
                      Oxygen Equipped
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Multi-card reviews carousel with animated horizontal slide */}
            <div className="lg:col-span-8">
              {/* Stagger 3: Carousel Content (delay 240ms) */}
              <div
                className="transition-all duration-700 ease-out"
                style={{
                  opacity: section11InView ? 1 : 0,
                  transform: prefersReducedMotion
                    ? "none"
                    : section11InView
                    ? "translateY(0)"
                    : "translateY(20px)",
                  transitionDelay: "240ms",
                }}
              >
                <div
                  className="relative overflow-hidden min-h-[320px]"
                  onMouseEnter={() => setIsTestimonialAutoPlay(false)}
                  onMouseLeave={() => setIsTestimonialAutoPlay(true)}
                >
                  <AnimatePresence mode="wait" custom={slideDirection}>
                    <motion.div
                      key={testimonialIndex}
                      custom={slideDirection}
                      initial={
                        prefersReducedMotion
                          ? { opacity: 0 }
                          : {
                              opacity: 0,
                              x: slideDirection === "next" ? 50 : -50,
                              scale: 0.94,
                            }
                      }
                      animate={{
                        opacity: 1,
                        x: 0,
                        scale: 1,
                      }}
                      exit={
                        prefersReducedMotion
                          ? { opacity: 0 }
                          : {
                              opacity: 0,
                              x: slideDirection === "next" ? -50 : 50,
                              scale: 0.94,
                            }
                      }
                      transition={{
                        duration: 0.5,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                    >
                      {[
                        TESTIMONIALS[testimonialIndex],
                        TESTIMONIALS[(testimonialIndex + 1) % TESTIMONIALS.length],
                      ].map((test) => (
                        <Card
                          key={test.id}
                          className="bg-surface p-6 sm:p-7 rounded-3xl border border-mountain/20 hover:border-mountain/40 shadow-card hover:shadow-lg transition-all duration-300 flex flex-col justify-between relative overflow-hidden group min-h-[300px]"
                        >
                          {/* Elegant Quote Watermark with Hover Rotation & Tint */}
                          <Quote className="absolute right-5 top-5 size-12 text-stone-200/50 group-hover:text-meadow/25 group-hover:rotate-6 group-hover:scale-110 transition-all duration-300 pointer-events-none" />

                          <div>
                            <div className="flex items-center justify-between mb-4 relative z-10">
                              <div className="flex items-center gap-1 text-accent-gold">
                                {Array.from({ length: test.rating }).map((_, i) => (
                                  <Star key={i} className="size-3.5 fill-accent-gold text-accent-gold" />
                                ))}
                              </div>
                              <Badge
                                variant="default"
                                className="text-[11px] font-bold normal-case tracking-normal px-2.5 py-0.5 rounded-full bg-background text-pine border border-mountain/20 shadow-2xs"
                              >
                                {test.source}
                              </Badge>
                            </div>

                            <p className="text-xs sm:text-sm text-text/85 leading-relaxed italic min-h-[100px] flex items-start relative z-10">
                              &ldquo;{test.text}&rdquo;
                            </p>
                          </div>

                          <div className="mt-6 pt-4 border-t border-mountain/20 flex items-center gap-3 relative z-10">
                            <div className="relative size-11 rounded-full overflow-hidden bg-slate-200 shrink-0 border-2 border-surface shadow-xs">
                              <Image
                                src={test.avatar}
                                alt={test.name}
                                fill
                                className="object-cover"
                              />
                              {/* Verified Check Badge */}
                              <div className="absolute -bottom-0.5 -right-0.5 size-3.5 bg-meadow rounded-full flex items-center justify-center text-white text-[8px] font-bold border border-surface shadow-2xs">
                                ✓
                              </div>
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="font-bold text-xs sm:text-sm text-pine truncate">
                                {test.name}
                              </div>
                              <div className="text-[11px] text-mountain font-medium truncate flex items-center gap-1">
                                <span>{test.country}</span>
                                <span className="text-stone-300">•</span>
                                <span className="text-pine/80 font-semibold">{test.trip}</span>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Slider pagination indicator & arrow controls with Auto-play Progress Bar */}
                <div className="flex items-center justify-between mt-8 pt-2 border-t border-mountain/15">
                  {/* Interactive Dot & Slide Tracker with Auto-play Progress Bar */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      {TESTIMONIALS.map((_, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setSlideDirection(idx > testimonialIndex ? "next" : "prev");
                            setTestimonialIndex(idx);
                          }}
                          aria-label={`Go to review slide ${idx + 1}`}
                          className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                            testimonialIndex === idx
                              ? "w-7 bg-pine"
                              : "w-2 bg-mountain/30 hover:bg-mountain/60"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Auto-Play Animated Progress Bar */}
                    <div className="w-16 h-1 bg-mountain/20 rounded-full overflow-hidden relative hidden sm:block">
                      <motion.div
                        key={`${testimonialIndex}-${isTestimonialAutoPlay}`}
                        initial={{ width: "0%" }}
                        animate={{ width: isTestimonialAutoPlay && !prefersReducedMotion ? "100%" : "0%" }}
                        transition={{
                          duration: isTestimonialAutoPlay && !prefersReducedMotion ? 6.5 : 0,
                          ease: "linear",
                        }}
                        className="h-full bg-pine rounded-full"
                      />
                    </div>

                    <span className="text-xs font-mono font-bold text-mountain">
                      0{testimonialIndex + 1} / 0{TESTIMONIALS.length}
                    </span>

                    <span className="text-[10px] uppercase tracking-wider font-semibold text-mountain/70 hidden md:inline">
                      {isTestimonialAutoPlay ? "Auto-playing" : "Paused"}
                    </span>
                  </div>

                  {/* Slider arrow controls with Doodle flourish */}
                  <div className="flex items-center gap-2">
                    <DoodleArrow className="w-12 h-6 text-pine opacity-75 mr-2 hidden sm:block" />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handlePrevTestimonial}
                      aria-label="Previous testimonial"
                      className="size-10 rounded-full p-0 border border-mountain/30 text-pine hover:bg-pine hover:text-white bg-surface shadow-2xs cursor-pointer active:scale-95 transition-all"
                    >
                      <ChevronLeft className="size-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="primary"
                      size="sm"
                      onClick={handleNextTestimonial}
                      aria-label="Next testimonial"
                      className="size-10 rounded-full p-0 bg-cta text-cta-foreground hover:bg-cta/90 border border-cta shadow-xs cursor-pointer active:scale-95 transition-all"
                    >
                      <ChevronRight className="size-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 12: RECENT ARTICLES & POSTS (Image 2: TravelGo)
          ========================================================================= */}
      <section id="blog" className="py-20 bg-white border-t border-stone-200/80 relative overflow-hidden">
        {/* Visible animated 2D badges */}
        <div className="absolute top-8 right-8 sm:right-14 pointer-events-none hidden md:block">
          <AnimatedTravelBadge
            icon="passport"
            label="TRAIL INTEL"
            animation="animate-float-gentle"
            variant="light"
            size="size-4"
          />
        </div>
        <div className="absolute top-8 left-6 sm:left-12 pointer-events-none hidden md:block">
          <AnimatedTravelBadge
            icon="map"
            label="FIELD NOTES"
            animation="animate-gentle-pulse"
            variant="light"
            size="size-4"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-2 mb-1.5">
              <div className="relative w-7 h-5 sm:w-8 sm:h-6">
                <Image
                  src="/images/assets/fluffy-cloud.png"
                  alt="Cloud Asset"
                  fill
                  className="object-contain drop-shadow-sm"
                />
              </div>
              <span className="text-[11px] sm:text-xs uppercase tracking-widest font-bold text-[#7FA05C]">
                Alpine Adventure Journal
              </span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-pine tracking-tight leading-[1.3] text-balance">
              Recent Articles &amp; Posts
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BLOG_ARTICLES.map((article) => (
              <div
                key={article.id}
                className="bg-[#F5F3EF] rounded-3xl overflow-hidden border border-stone-200/80 shadow-xs hover:shadow-xl transition-all duration-300 group flex flex-col"
              >
                <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3.5 left-3.5">
                    <span className="px-3 py-1 rounded-full bg-[#2D4A34] text-[#F5F3EF] font-extrabold text-[10px]">
                      {article.category}
                    </span>
                  </div>

                  <div className="absolute top-3.5 right-3.5 bg-white/95 backdrop-blur-xs text-[#2D4A34] px-2.5 py-1 rounded-xl text-center shadow-md">
                    <div className="text-xs font-black leading-none">
                      {article.date.split(" ")[0]}
                    </div>
                    <div className="text-[10px] font-bold text-stone-500 uppercase leading-tight">
                      {article.date.split(" ")[1].replace(",", "")}
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-7 pt-6 sm:pt-7 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] text-stone-500 mb-1.5 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                      <span>By {article.author}</span>
                      <span>·</span>
                      <span>{article.readTime}</span>
                    </div>

                    <h3 className="font-heading font-extrabold text-base text-[#2D4A34] group-hover:text-[#3E7C94] transition-colors leading-snug line-clamp-2 h-[48px] flex items-center">
                      {article.title}
                    </h3>

                    <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed h-[36px]">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-stone-200/80 flex items-center justify-between text-xs font-bold text-[#2D4A34]">
                    <span className="text-stone-500 font-medium">Expert Trail Insights</span>
                    <span className="text-[#3E7C94] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 font-bold">
                      Read Guide <ArrowRight className="size-3" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 13: INTERACTIVE MASTER-DETAIL RECENT GALLERY (Matching GallerySectionRef.mp4)
          ========================================================================= */}
      <InteractiveDestinationGallery />

      {/* =========================================================================
          SECTION 15: BESPOKE HIMALAYAN SUNRISE AERIAL EXPEDITIONS
          ========================================================================= */}
      <HimalayanSunriseBalloonSection />

      {/* =========================================================================
          SECTION 16: BESPOKE ITINERARY CTA STRIP (Access Nepal Tour Style)
          ========================================================================= */}
      <section className="bg-[#2D4A34] text-[#F5F3EF] py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="mb-3">
              <AnimatedTravelBadge
                icon="plane"
                label="TAILOR-MADE ROUTES"
                animation="animate-float-gentle"
                variant="dark"
                size="size-4"
              />
            </div>
            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl tracking-tight">
              Looking for a Custom Tailor-Made Himalayan Itinerary?
            </h3>
            <p className="text-xs sm:text-sm text-[#F5F3EF]/85 mt-2 leading-relaxed">
              Whether you want a private helicopter return from Everest Base Camp, a family trek in the Annapurnas, or a spiritual pilgrimage to Bhutan, our Sherpa directors craft bespoke journeys with zero commitment fee.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="px-6 py-3.5 rounded-2xl bg-[#7FA05C] hover:bg-[#6E8C4E] text-white font-extrabold text-xs shadow-lg transition-all active:scale-95 cursor-pointer"
            >
              Plan My Custom Trip
            </Link>
            <a
              href="tel:+97714701234"
              className="px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-[#F5F3EF] font-bold text-xs border border-white/20 transition-all cursor-pointer flex items-center gap-2"
            >
              <PhoneCall className="size-3.5 text-[#7FA05C]" />
              <span>Call Expedition HQ</span>
            </a>
          </div>
        </div>
      </section>

      {/* Video Modal Preview */}
      {isVideoModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src="/videos/hero-hq.mp4"
              controls
              autoPlay
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 size-10 rounded-full bg-black/60 text-white flex items-center justify-center font-bold hover:bg-black/80 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Agency Footer */}
      <AgencyFooter />
    </main>
  );
}
