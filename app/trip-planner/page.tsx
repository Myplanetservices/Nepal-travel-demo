"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  Mountain,
  Compass,
  Calendar,
  Users,
  DollarSign,
  ArrowRight,
  ArrowLeft,
  Check,
  RotateCcw,
  Printer,
  Bookmark,
  BookmarkCheck,
  ShieldCheck,
  AlertTriangle,
  Clock,
  Layers,
  Heart,
  ChevronRight,
  ChevronDown,
  Info,
  MapPin,
  Flame,
  CheckCircle2,
  Trash2,
} from "lucide-react";
import { MainAgencyNav } from "@/components/agency/MainAgencyNav";
import { AgencyFooter } from "@/components/agency/AgencyFooter";
import { useSiteConfig } from "@/components/customizer/SiteConfigContext";
import { DEMO_PACKAGES } from "@/lib/demo-agency-data";

interface ActivityItem {
  id: string;
  time: "Morning" | "Afternoon" | "Evening";
  title: string;
  description: string;
  category: "Trek" | "Culture" | "Acclimatization" | "Culinary" | "Logistics" | "Scenic";
  estimatedCost: number;
}

interface DayItinerary {
  day: number;
  title: string;
  altitude: string;
  distance: string;
  walkingTime: string;
  accommodation: string;
  meals: string;
  dailyBudgetEstimate: number;
  activities: ActivityItem[];
}

interface GeneratedItinerary {
  id: string;
  tripTitle: string;
  overview: string;
  destination: string;
  durationDays: number;
  budgetTier: "budget" | "mid" | "luxury";
  travelStyles: string[];
  groupSize: string;
  travelDates: string;
  fitnessRequirement: string;
  recommendedSeason: string;
  estimatedCostPerPerson: number;
  totalEstimatedCost: number;
  currency: string;
  matchedPackageSlug?: string;
  altitudeProfile: {
    maxAltitude: string;
    acclimatizationDays: number;
    altitudeWarning: string;
  };
  permitsRequired: string[];
  costBreakdown: {
    permitsAndFees: number;
    guideAndPorters: number;
    accommodation: number;
    mealsAndWater: number;
    transportAndLogistics: number;
  };
  days: DayItinerary[];
}

const DESTINATION_PRESETS = [
  {
    name: "Everest Base Camp & Kala Patthar",
    region: "Everest",
    altitude: "5,550m",
    icon: "🏔️",
    desc: "The world's highest peak trail, Namche Bazaar & Tengboche monastery.",
  },
  {
    name: "Annapurna Circuit & Thorong La",
    region: "Annapurna",
    altitude: "5,416m",
    icon: "🌿",
    desc: "Diverse landscapes from subtropical gorges to high alpine desert.",
  },
  {
    name: "Manaslu Remote Circuit",
    region: "Manaslu",
    altitude: "5,106m",
    icon: "🦅",
    desc: "Untamed wilderness, restricted Tibetan borderland culture.",
  },
  {
    name: "Langtang Valley & Kyanjin Gompa",
    region: "Langtang",
    altitude: "4,773m",
    icon: "🌸",
    desc: "Lush rhododendrons, Tamang heritage and towering glacial cirques.",
  },
  {
    name: "Upper Mustang Kingdom",
    region: "Mustang",
    altitude: "3,840m",
    icon: "🏜️",
    desc: "Forbidden Tibetan walled city of Lo Manthang & ancient sky caves.",
  },
  {
    name: "Bhutan Cultural Dragon Traverse",
    region: "Bhutan",
    altitude: "3,120m",
    icon: "🇧🇹",
    desc: "Tiger's Nest monastery, sacred dzongs, and Gross National Happiness.",
  },
];

const TRAVEL_STYLES = [
  "High Altitude Passes",
  "Buddhist Monasteries & Gompas",
  "Wildlife & Alpine Flora",
  "Sherpa Homestays & Teahouses",
  "Helicopter Scenic Flight",
  "Sunrise & Night Photography",
  "Vegetarian / Organic Dining",
  "Off-the-beaten-path Ridges",
];

const GROUP_OPTIONS = [
  { id: "Solo Trekker", label: "Solo Trekker", desc: "Private guide + 1 dedicated porter" },
  { id: "Couple / Pair", label: "Couple / Duo", desc: "Shared room + private guide & porter" },
  { id: "Small Group (3-6)", label: "Small Group (3-6)", desc: "Lead Sirdar + assistant guides (-10% group rate)" },
  { id: "Expedition Group (7+)", label: "Expedition (7+)", desc: "Full expedition team & medical officer (-18% rate)" },
];

const SEASONS = [
  { id: "Autumn (Sep-Nov)", label: "Autumn (Sep-Nov)", badge: "Peak Clarity", desc: "Crystal clear skies, warm days, crisp alpine nights." },
  { id: "Spring (Mar-May)", label: "Spring (Mar-May)", badge: "Wildflowers", desc: "Blooming rhododendron forests, active wildlife." },
  { id: "Winter (Dec-Feb)", label: "Winter (Dec-Feb)", badge: "Solitude", desc: "Empty trails, crisp photography, colder high passes." },
  { id: "Summer/Monsoon (Jun-Aug)", label: "Summer (Jun-Aug)", badge: "Rain Shadow", desc: "Best for Mustang & Tibet arid valleys." },
];

export default function TripPlannerPage() {
  const { config } = useSiteConfig();

  // Wizard state
  const [currentStep, setCurrentStep] = useState(1);
  const [destination, setDestination] = useState("Everest Base Camp & Kala Patthar");
  const [customDestination, setCustomDestination] = useState("");
  const [tripLength, setTripLength] = useState(14);
  const [budgetTier, setBudgetTier] = useState<"budget" | "mid" | "luxury">("mid");
  const [selectedStyles, setSelectedStyles] = useState<string[]>([
    "High Altitude Passes",
    "Sherpa Homestays & Teahouses",
  ]);
  const [groupSize, setGroupSize] = useState("Solo Trekker");
  const [travelDates, setTravelDates] = useState("Autumn (Sep-Nov)");

  // Generation & Output State
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedItinerary, setGeneratedItinerary] = useState<GeneratedItinerary | null>(null);
  const [generationError, setGenerationError] = useState("");
  const [swappingActivityId, setSwappingActivityId] = useState<string | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [savedTrips, setSavedTrips] = useState<GeneratedItinerary[]>([]);
  const [showSavedModal, setShowSavedModal] = useState(false);

  // Load saved itineraries from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("zenith_saved_itineraries");
      if (saved) {
        setSavedTrips(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load saved trips:", e);
    }
  }, []);

  const handleStyleToggle = (style: string) => {
    if (selectedStyles.includes(style)) {
      setSelectedStyles(selectedStyles.filter((s) => s !== style));
    } else {
      setSelectedStyles([...selectedStyles, style]);
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGenerationError("");

    const targetDestination = customDestination.trim() || destination;

    try {
      const response = await fetch("/api/generate-itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destination: targetDestination,
          tripLength,
          budgetTier,
          travelStyles: selectedStyles,
          groupSize,
          travelDates,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const data = await response.json();
      if (data.success && data.itinerary) {
        setGeneratedItinerary(data.itinerary);
        // Scroll to results
        setTimeout(() => {
          document.getElementById("itinerary-results-section")?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        throw new Error(data.error || "Failed to generate itinerary");
      }
    } catch (err: any) {
      console.error("Error generating itinerary:", err);
      setGenerationError(err.message || "Failed to generate custom itinerary. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Swap an individual activity on a day
  const handleSwapActivity = async (dayNumber: number, activity: ActivityItem) => {
    if (!generatedItinerary || swappingActivityId) return;

    setSwappingActivityId(activity.id);

    try {
      const response = await fetch("/api/generate-itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "swap-activity",
          category: activity.category,
          currentTitle: activity.title,
          time: activity.time,
          baseCost: activity.estimatedCost,
          destination: generatedItinerary.destination,
        }),
      });

      if (!response.ok) throw new Error("Failed to fetch swap activity");
      const data = await response.json();

      if (data.success && data.activity) {
        // Replace activity in state
        const updatedDays = generatedItinerary.days.map((d) => {
          if (d.day === dayNumber) {
            return {
              ...d,
              activities: d.activities.map((a) => (a.id === activity.id ? data.activity : a)),
            };
          }
          return d;
        });

        setGeneratedItinerary({
          ...generatedItinerary,
          days: updatedDays,
        });
      }
    } catch (e) {
      console.error("Failed to swap activity:", e);
    } finally {
      setSwappingActivityId(null);
    }
  };

  // Save current itinerary to localStorage
  const handleSaveItinerary = () => {
    if (!generatedItinerary) return;

    try {
      const existing = savedTrips.filter((t) => t.id !== generatedItinerary.id);
      const updated = [generatedItinerary, ...existing].slice(0, 10);
      setSavedTrips(updated);
      localStorage.setItem("zenith_saved_itineraries", JSON.stringify(updated));
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4000);
    } catch (e) {
      console.error("Failed to save to localStorage:", e);
    }
  };

  const handleDeleteSavedTrip = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = savedTrips.filter((t) => t.id !== id);
    setSavedTrips(updated);
    try {
      localStorage.setItem("zenith_saved_itineraries", JSON.stringify(updated));
    } catch {}
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F3EF] text-[#33322E]">
      <MainAgencyNav />

      <main className="flex-1 pt-28 pb-20">
        {/* Top Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-[#7C8A96] mb-4">
            <Link href="/" className="hover:text-[#2D4A34] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#2D4A34] font-semibold">AI Trip Planner</span>
          </nav>

          <div className="trip-planner-banner rounded-3xl text-white p-6 sm:p-10 shadow-2xl relative overflow-hidden border border-white/15">
            {/* Dynamic ambient glow backgrounds matching active theme */}
            <div
              className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-30 transition-all duration-500"
              style={{ backgroundColor: "var(--color-accent, #7FA05C)" }}
            />
            <div
              className="absolute bottom-0 left-10 w-72 h-72 rounded-full blur-2xl pointer-events-none opacity-25 transition-all duration-500"
              style={{ backgroundColor: "var(--color-cta, #DD6B2E)" }}
            />

            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-xs font-extrabold text-white mb-4 shadow-xs">
                <Sparkles className="size-3.5 text-amber-300 animate-spin" style={{ animationDuration: "4s" }} />
                <span className="tracking-wide text-white">Sherpa Intelligence &amp; Live Route Grounding</span>
              </div>

              <h1
                className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight mb-4 !text-white drop-shadow-xs"
                style={{ color: "#FFFFFF" }}
              >
                Custom Himalayan AI Trip Planner
              </h1>

              <p className="text-sm sm:text-base text-white/90 leading-relaxed font-sans mb-6 font-normal">
                Tell us where your dream trail lies, how long you wish to trek, and your preferred comfort tier. Our Sherpa-grounded engine compiles permit windows, altitude acclimatization rests, and interactive day-by-day itineraries in seconds.
              </p>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-semibold text-white/95">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 border border-white/15 backdrop-blur-xs">
                  <ShieldCheck className="size-4 text-emerald-300 shrink-0" />
                  <span>UIAA Altitude Protocols</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 border border-white/15 backdrop-blur-xs">
                  <Compass className="size-4 text-sky-300 shrink-0" />
                  <span>Interactive Day-by-Day Swaps</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 border border-white/15 backdrop-blur-xs">
                  <BookmarkCheck className="size-4 text-amber-300 shrink-0" />
                  <span>Client-Side Local Storage</span>
                </div>
                {savedTrips.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setShowSavedModal(true)}
                    className="ml-auto inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white font-bold transition-all border border-white/30 cursor-pointer shadow-sm active:scale-95"
                  >
                    <Bookmark className="size-3.5 text-amber-300" />
                    <span>View Saved Trips ({savedTrips.length})</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 5-Step Guided Wizard */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="bg-white rounded-3xl border border-[#7C8A96]/20 shadow-xl p-6 sm:p-8">
            {/* Step Progress Indicators */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3 text-xs font-bold">
                <span className="text-[#7FA05C] uppercase tracking-wider">
                  Step {currentStep} of 5
                </span>
                <span className="text-[#7C8A96]">
                  {currentStep === 1 && "Destination & Region"}
                  {currentStep === 2 && "Duration & Pacing"}
                  {currentStep === 3 && "Budget & Lodge Tier"}
                  {currentStep === 4 && "Trekking Styles"}
                  {currentStep === 5 && "Group Size & Season"}
                </span>
              </div>

              {/* Progress Track */}
              <div className="w-full bg-[#E2DFD8] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#2D4A34] via-[#7FA05C] to-[#DD6B2E] h-full transition-all duration-300 rounded-full"
                  style={{ width: `${(currentStep / 5) * 100}%` }}
                />
              </div>

              {/* Step Tab Buttons */}
              <div className="grid grid-cols-5 gap-2 mt-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setCurrentStep(s)}
                    className={`py-2 px-1 text-center text-xs font-bold rounded-lg border transition-all cursor-pointer truncate ${
                      currentStep === s
                        ? "bg-[#2D4A34] text-white border-[#2D4A34] shadow-xs"
                        : s < currentStep
                        ? "bg-[#7FA05C]/15 text-[#2D4A34] border-[#7FA05C]/30"
                        : "bg-[#F5F3EF] text-[#7C8A96] border-transparent hover:border-[#7C8A96]/30"
                    }`}
                  >
                    <span className="hidden sm:inline">Step </span>
                    {s}: {s === 1 ? "Route" : s === 2 ? "Days" : s === 3 ? "Budget" : s === 4 ? "Styles" : "Group"}
                  </button>
                ))}
              </div>
            </div>

            {/* STEP 1: DESTINATION */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h2 className="font-heading font-extrabold text-xl text-[#2D4A34] mb-1">
                    Select Your Himalayan Destination or Trail
                  </h2>
                  <p className="text-xs sm:text-sm text-[#7C8A96]">
                    Choose from our signature expedition corridors or enter a custom peak/valley.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {DESTINATION_PRESETS.map((preset) => {
                    const isSelected = destination === preset.name && !customDestination;
                    return (
                      <div
                        key={preset.name}
                        onClick={() => {
                          setDestination(preset.name);
                          setCustomDestination("");
                        }}
                        className={`p-4.5 rounded-2xl border-2 transition-all cursor-pointer group flex flex-col justify-between ${
                          isSelected
                            ? "border-[#2D4A34] bg-[#2D4A34]/5 shadow-md scale-101"
                            : "border-[#E2DFD8] hover:border-[#7FA05C] bg-white hover:bg-[#F5F3EF]/50"
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-2xl">{preset.icon}</span>
                            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#7FA05C]/15 text-[#2D4A34]">
                              Max: {preset.altitude}
                            </span>
                          </div>
                          <h3 className="font-heading font-bold text-sm text-[#2D4A34] group-hover:text-[#DD6B2E] transition-colors">
                            {preset.name}
                          </h3>
                          <p className="text-xs text-[#7C8A96] mt-1 line-clamp-2">
                            {preset.desc}
                          </p>
                        </div>

                        <div className="mt-4 pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                          <span className="text-[11px] font-bold text-[#7FA05C] uppercase tracking-wider">
                            {preset.region} Region
                          </span>
                          <div
                            className={`size-4 rounded-full border flex items-center justify-center ${
                              isSelected ? "border-[#2D4A34] bg-[#2D4A34] text-white" : "border-gray-300"
                            }`}
                          >
                            {isSelected && <Check className="size-2.5" />}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Custom Destination Option */}
                <div className="mt-4 p-4.5 rounded-2xl bg-[#F5F3EF] border border-[#E2DFD8] space-y-2">
                  <label htmlFor="custom-destination-input" className="block text-xs font-bold text-[#2D4A34]">
                    Or Enter Any Custom Valley, Peak, or Traverse:
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="custom-destination-input"
                      type="text"
                      value={customDestination}
                      onChange={(e) => setCustomDestination(e.target.value)}
                      placeholder="e.g. Dhaulagiri Circuit, Makalu Base Camp, Nar Phu Valley, Kanchenjunga..."
                      className="flex-1 px-4 py-2.5 rounded-xl bg-white border border-[#7C8A96]/30 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#7FA05C] transition-all"
                    />
                    {customDestination && (
                      <button
                        type="button"
                        onClick={() => setCustomDestination("")}
                        className="px-3 py-2 text-xs font-bold text-[#7C8A96] hover:text-red-600 cursor-pointer"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  {customDestination && (
                    <p className="text-[11px] text-[#7FA05C] font-semibold">
                      Custom destination recognized. The planner will generate an altitude-safe route for &quot;{customDestination}&quot;.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* STEP 2: DURATION */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h2 className="font-heading font-extrabold text-xl text-[#2D4A34] mb-1">
                    Select Expedition Duration &amp; Pacing
                  </h2>
                  <p className="text-xs sm:text-sm text-[#7C8A96]">
                    High-altitude Himalayan routes require calculated acclimatization days above 3,000m.
                  </p>
                </div>

                {/* Preset Chips */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { days: 7, label: "7 Days", type: "Express Traverse", note: "Compact & scenic" },
                    { days: 10, label: "10 Days", type: "Optimal Pace", note: "Great balance" },
                    { days: 14, label: "14 Days", type: "Classic Circuit", note: "Recommended for EBC" },
                    { days: 18, label: "18 Days", type: "Grand Odyssey", note: "Full high passes" },
                  ].map((p) => (
                    <button
                      key={p.days}
                      type="button"
                      onClick={() => setTripLength(p.days)}
                      className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                        tripLength === p.days
                          ? "border-[#2D4A34] bg-[#2D4A34]/5 shadow-sm"
                          : "border-[#E2DFD8] hover:border-[#7FA05C] bg-white"
                      }`}
                    >
                      <div className="font-heading font-black text-2xl text-[#2D4A34]">{p.label}</div>
                      <div className="text-xs font-bold text-[#DD6B2E] mt-0.5">{p.type}</div>
                      <div className="text-[11px] text-[#7C8A96] mt-1">{p.note}</div>
                    </button>
                  ))}
                </div>

                {/* Slider */}
                <div className="p-6 rounded-2xl bg-[#F5F3EF] border border-[#E2DFD8] space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#2D4A34]">Custom Days Slider:</span>
                    <span className="px-3 py-1 rounded-full bg-[#2D4A34] text-white font-mono font-extrabold text-sm">
                      {tripLength} Days ({tripLength - 1} Nights)
                    </span>
                  </div>

                  <input
                    type="range"
                    min={4}
                    max={25}
                    value={tripLength}
                    onChange={(e) => setTripLength(parseInt(e.target.value))}
                    className="w-full accent-[#2D4A34] h-2 bg-gray-300 rounded-lg cursor-pointer"
                  />

                  <div className="flex justify-between text-[11px] text-[#7C8A96] font-mono">
                    <span>4 Days (Shortest)</span>
                    <span>14 Days (Standard)</span>
                    <span>25 Days (Expedition)</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-[#7FA05C]/30 text-xs text-[#2D4A34] flex items-center gap-2">
                    <Info className="size-4 text-[#7FA05C] shrink-0" />
                    <span>
                      At <strong>{tripLength} days</strong>, our system schedules{" "}
                      <strong>{Math.max(1, Math.floor(tripLength / 5))} mandatory rest/acclimatization days</strong>{" "}
                      to conform with UIAA altitude safety protocols.
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: BUDGET & LODGE TIER */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h2 className="font-heading font-extrabold text-xl text-[#2D4A34] mb-1">
                    Select Budget Tier &amp; Accommodation Style
                  </h2>
                  <p className="text-xs sm:text-sm text-[#7C8A96]">
                    All tiers include licensed Sherpa guiding, emergency satellite dispatch, and TIMS permits.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Budget */}
                  <div
                    onClick={() => setBudgetTier("budget")}
                    className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      budgetTier === "budget"
                        ? "border-[#2D4A34] bg-[#2D4A34]/5 shadow-md scale-101"
                        : "border-[#E2DFD8] hover:border-[#7FA05C] bg-white"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-gray-200 text-gray-800">
                          Authentic
                        </span>
                        <span className="font-heading font-black text-lg text-[#2D4A34]">
                          ~$75<span className="text-xs font-normal text-[#7C8A96]">/day</span>
                        </span>
                      </div>
                      <h3 className="font-heading font-bold text-base text-[#2D4A34]">Teahouse Trekker</h3>
                      <p className="text-xs text-[#7C8A96] mt-1 leading-relaxed">
                        Traditional family-run mountain teahouses with warm communal dining stoves.
                      </p>
                      <ul className="mt-4 space-y-1.5 text-xs text-[#33322E]/80">
                        <li className="flex items-center gap-1.5">
                          <Check className="size-3 text-[#7FA05C]" /> Twin shared mountain rooms
                        </li>
                        <li className="flex items-center gap-1.5">
                          <Check className="size-3 text-[#7FA05C]" /> Shared bathroom facilities
                        </li>
                        <li className="flex items-center gap-1.5">
                          <Check className="size-3 text-[#7FA05C]" /> Hearty Dahl Bhat &amp; porridge
                        </li>
                        <li className="flex items-center gap-1.5">
                          <Check className="size-3 text-[#7FA05C]" /> Licensed English-speaking guide
                        </li>
                      </ul>
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-[#7C8A96]">Estimated {tripLength} days:</span>
                      <span className="font-mono font-bold text-xs text-[#2D4A34]">
                        ${75 * tripLength}
                      </span>
                    </div>
                  </div>

                  {/* Mid-Range / Recommended */}
                  <div
                    onClick={() => setBudgetTier("mid")}
                    className={`p-5 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                      budgetTier === "mid"
                        ? "border-[#2D4A34] bg-[#2D4A34]/5 shadow-md scale-101 ring-2 ring-[#7FA05C]/30"
                        : "border-[#E2DFD8] hover:border-[#7FA05C] bg-white"
                    }`}
                  >
                    <div className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-[#DD6B2E] text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
                      Most Popular
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-[#7FA05C]/20 text-[#2D4A34]">
                          Comfort
                        </span>
                        <span className="font-heading font-black text-lg text-[#2D4A34]">
                          ~$145<span className="text-xs font-normal text-[#7C8A96]">/day</span>
                        </span>
                      </div>
                      <h3 className="font-heading font-bold text-base text-[#2D4A34]">Alpine Comfort</h3>
                      <p className="text-xs text-[#7C8A96] mt-1 leading-relaxed">
                        Attached bathroom rooms where available, solar hot showers, and dedicated porter support.
                      </p>
                      <ul className="mt-4 space-y-1.5 text-xs text-[#33322E]/80">
                        <li className="flex items-center gap-1.5">
                          <Check className="size-3 text-[#7FA05C]" /> Attached bathrooms (Namche, Phakding)
                        </li>
                        <li className="flex items-center gap-1.5">
                          <Check className="size-3 text-[#7FA05C]" /> Solar/gas hot showers included
                        </li>
                        <li className="flex items-center gap-1.5">
                          <Check className="size-3 text-[#7FA05C]" /> Dedicated porter (1 porter per 2 pax)
                        </li>
                        <li className="flex items-center gap-1.5">
                          <Check className="size-3 text-[#7FA05C]" /> Pulse oximeter monitoring daily
                        </li>
                      </ul>
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-[#7C8A96]">Estimated {tripLength} days:</span>
                      <span className="font-mono font-bold text-xs text-[#2D4A34]">
                        ${145 * tripLength}
                      </span>
                    </div>
                  </div>

                  {/* Luxury */}
                  <div
                    onClick={() => setBudgetTier("luxury")}
                    className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      budgetTier === "luxury"
                        ? "border-[#2D4A34] bg-[#2D4A34]/5 shadow-md scale-101"
                        : "border-[#E2DFD8] hover:border-[#7FA05C] bg-white"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                          Premium
                        </span>
                        <span className="font-heading font-black text-lg text-[#2D4A34]">
                          ~$320<span className="text-xs font-normal text-[#7C8A96]">/day</span>
                        </span>
                      </div>
                      <h3 className="font-heading font-bold text-base text-[#2D4A34]">Himalayan Luxury</h3>
                      <p className="text-xs text-[#7C8A96] mt-1 leading-relaxed">
                        Yeti Mountain Home luxury lodges, electric heated blankets, and helicopter backup.
                      </p>
                      <ul className="mt-4 space-y-1.5 text-xs text-[#33322E]/80">
                        <li className="flex items-center gap-1.5">
                          <Check className="size-3 text-[#7FA05C]" /> Premium heritage lodges with heated beds
                        </li>
                        <li className="flex items-center gap-1.5">
                          <Check className="size-3 text-[#7FA05C]" /> Gourmet multi-course Himalayan dining
                        </li>
                        <li className="flex items-center gap-1.5">
                          <Check className="size-3 text-[#7FA05C]" /> Senior UIAGM certified Sherpa Sirdar
                        </li>
                        <li className="flex items-center gap-1.5">
                          <Check className="size-3 text-[#7FA05C]" /> Emergency helicopter rescue warranty
                        </li>
                      </ul>
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-[#7C8A96]">Estimated {tripLength} days:</span>
                      <span className="font-mono font-bold text-xs text-[#2D4A34]">
                        ${320 * tripLength}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: TRAVEL STYLES & PREFERENCES */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h2 className="font-heading font-extrabold text-xl text-[#2D4A34] mb-1">
                    Select Your Travel Styles &amp; Highlights
                  </h2>
                  <p className="text-xs sm:text-sm text-[#7C8A96]">
                    Choose the elements you want our AI generator to emphasize in your daily itinerary.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {TRAVEL_STYLES.map((style) => {
                    const isSelected = selectedStyles.includes(style);
                    return (
                      <button
                        key={style}
                        type="button"
                        onClick={() => handleStyleToggle(style)}
                        className={`p-3.5 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? "bg-[#2D4A34] text-white border-[#2D4A34] shadow-xs"
                            : "bg-[#F5F3EF] hover:bg-white text-[#2D4A34] border-[#E2DFD8]"
                        }`}
                      >
                        <span>{style}</span>
                        <div
                          className={`size-4 rounded-md border flex items-center justify-center shrink-0 ml-2 ${
                            isSelected ? "bg-white text-[#2D4A34] border-white" : "border-gray-400"
                          }`}
                        >
                          {isSelected && <Check className="size-3" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="p-4 rounded-2xl bg-[#F5F3EF] border border-[#E2DFD8] flex items-center gap-3">
                  <div className="size-8 rounded-full bg-[#7FA05C]/20 text-[#2D4A34] flex items-center justify-center font-bold text-xs shrink-0">
                    {selectedStyles.length}
                  </div>
                  <div className="text-xs text-[#7C8A96]">
                    {selectedStyles.length > 0
                      ? `Selected styles: ${selectedStyles.join(", ")}`
                      : "Please select at least 1 travel style to tailor activities."}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5: GROUP SIZE & SEASON */}
            {currentStep === 5 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h2 className="font-heading font-extrabold text-xl text-[#2D4A34] mb-1">
                    Group Size &amp; Travel Season
                  </h2>
                  <p className="text-xs sm:text-sm text-[#7C8A96]">
                    Group discounts apply automatically; seasons dictate weather warnings and trail conditions.
                  </p>
                </div>

                {/* Group Size */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-[#2D4A34]">Group Size:</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {GROUP_OPTIONS.map((g) => (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => setGroupSize(g.id)}
                        className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                          groupSize === g.id
                            ? "border-[#2D4A34] bg-[#2D4A34]/5 shadow-xs ring-1 ring-[#2D4A34]"
                            : "border-[#E2DFD8] hover:border-[#7FA05C] bg-white"
                        }`}
                      >
                        <div className="font-heading font-bold text-xs text-[#2D4A34]">{g.label}</div>
                        <div className="text-[11px] text-[#7C8A96] mt-0.5">{g.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Travel Season */}
                <div className="space-y-2 pt-2">
                  <label className="block text-xs font-bold text-[#2D4A34]">Preferred Travel Season:</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {SEASONS.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setTravelDates(s.id)}
                        className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                          travelDates === s.id
                            ? "border-[#2D4A34] bg-[#2D4A34]/5 shadow-xs ring-1 ring-[#2D4A34]"
                            : "border-[#E2DFD8] hover:border-[#7FA05C] bg-white"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="font-heading font-bold text-xs text-[#2D4A34]">{s.label}</div>
                          <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded bg-[#7FA05C]/20 text-[#2D4A34]">
                            {s.badge}
                          </span>
                        </div>
                        <div className="text-[11px] text-[#7C8A96] mt-1">{s.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons between Steps */}
            <div className="mt-8 pt-6 border-t border-[#7C8A96]/20 flex items-center justify-between">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="px-5 py-2.5 rounded-xl bg-[#F5F3EF] hover:bg-[#E2DFD8] text-[#2D4A34] font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="size-3.5" />
                  <span>Back</span>
                </button>
              ) : (
                <div />
              )}

              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="px-6 py-2.5 rounded-xl bg-[#2D4A34] hover:bg-[#1E3725] text-white font-bold text-xs transition-all shadow-md flex items-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <span>Next Step</span>
                  <ArrowRight className="size-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  disabled={isGenerating}
                  onClick={handleGenerate}
                  className="px-7 py-3 rounded-xl bg-gradient-to-r from-[#DD6B2E] via-[#D9A23B] to-[#7FA05C] hover:opacity-95 text-white font-black text-xs sm:text-sm tracking-wide transition-all shadow-lg flex items-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
                >
                  <Sparkles className="size-4 animate-spin" style={{ animationDuration: "3s" }} />
                  <span>{isGenerating ? "Synthesizing Sherpa Route..." : "Generate AI Custom Itinerary"}</span>
                </button>
              )}
            </div>

            {generationError && (
              <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertTriangle className="size-4 shrink-0 text-red-500" />
                <span>{generationError}</span>
              </div>
            )}
          </div>
        </section>

        {/* LOADING ANIMATION CONTAINER */}
        {isGenerating && (
          <section className="max-w-4xl mx-auto px-4 sm:px-6 my-16 text-center">
            <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#7FA05C]/30 shadow-2xl space-y-4">
              <div className="size-16 rounded-full bg-[#2D4A34] text-[#7FA05C] flex items-center justify-center mx-auto shadow-lg animate-pulse">
                <Compass className="size-8 animate-spin" style={{ animationDuration: "5s" }} />
              </div>
              <h3 className="font-heading font-black text-xl text-[#2D4A34]">
                Compiling Permit-Compliant Alpine Itinerary...
              </h3>
              <p className="text-xs sm:text-sm text-[#7C8A96] max-w-md mx-auto leading-relaxed">
                Calculating daily elevation profiles, rest milestones, and verified Sherpa teahouse checkpoints for{" "}
                <strong>{customDestination || destination}</strong>.
              </p>
              <div className="w-48 bg-gray-200 h-1.5 rounded-full mx-auto overflow-hidden mt-4">
                <div className="bg-[#7FA05C] h-full w-full animate-progress" />
              </div>
            </div>
          </section>
        )}

        {/* ITINERARY RESULTS SECTION */}
        {generatedItinerary && !isGenerating && (
          <section id="itinerary-results-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Sticky Actions Bar */}
            <div className="mb-6 p-4 rounded-2xl bg-white border border-[#7C8A96]/20 shadow-md flex flex-wrap items-center justify-between gap-4 sticky top-20 z-30 backdrop-blur-md bg-white/95">
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="font-heading font-extrabold text-sm text-[#2D4A34]">
                  Custom Plan Ready: {generatedItinerary.durationDays} Days · {generatedItinerary.destination}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleSaveItinerary}
                  className="px-3.5 py-1.5 rounded-lg bg-[#2D4A34]/10 hover:bg-[#2D4A34]/20 text-[#2D4A34] text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Bookmark className="size-3.5 text-[#7FA05C]" />
                  <span>{savedSuccess ? "Saved to My Trips!" : "Save Plan"}</span>
                </button>

                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-3.5 py-1.5 rounded-lg bg-[#F5F3EF] hover:bg-[#E2DFD8] text-[#33322E] text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="size-3.5 text-[#7C8A96]" />
                  <span>Print / PDF</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setCurrentStep(1);
                    window.scrollTo({ top: 300, behavior: "smooth" });
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-[#F5F3EF] hover:bg-[#E2DFD8] text-[#33322E] text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="size-3.5 text-[#7C8A96]" />
                  <span>Modify</span>
                </button>

                <Link
                  href={`/booking?destination=${encodeURIComponent(generatedItinerary.destination)}&duration=${generatedItinerary.durationDays}&budget=${generatedItinerary.budgetTier}&travelers=${encodeURIComponent(generatedItinerary.groupSize)}`}
                  className="px-4 py-1.5 rounded-lg bg-[#7FA05C] hover:bg-[#6E8C4E] text-white text-xs font-black transition-all shadow-sm flex items-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <span>Book This Custom Route</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>

            {/* Main Itinerary Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Day-by-Day Cards Column (lg:col-span-8) */}
              <div className="lg:col-span-8 space-y-6">
                {/* Trip Overview Card */}
                <div className="p-6 rounded-3xl bg-white border border-[#7C8A96]/20 shadow-md space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#2D4A34] text-white text-[10px] font-extrabold uppercase tracking-wider">
                      {generatedItinerary.budgetTier.toUpperCase()} TIER
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#7FA05C]/20 text-[#2D4A34] text-[10px] font-extrabold">
                      {generatedItinerary.durationDays} Days / {generatedItinerary.durationDays - 1} Nights
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-extrabold">
                      Max: {generatedItinerary.altitudeProfile.maxAltitude}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 text-[10px] font-extrabold">
                      Fitness: {generatedItinerary.fitnessRequirement}
                    </span>
                  </div>

                  <h2 className="font-heading font-black text-2xl text-[#2D4A34] leading-tight">
                    {generatedItinerary.tripTitle}
                  </h2>

                  <p className="text-xs sm:text-sm text-[#7C8A96] leading-relaxed">
                    {generatedItinerary.overview}
                  </p>

                  <div className="p-3.5 rounded-xl bg-[#F5F3EF] border border-[#E2DFD8] flex items-center gap-2.5 text-xs text-[#2D4A34]">
                    <ShieldCheck className="size-4 text-[#7FA05C] shrink-0" />
                    <span>
                      {generatedItinerary.altitudeProfile.altitudeWarning}
                    </span>
                  </div>
                </div>

                {/* Day-by-Day Accordion/Cards */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between px-2">
                    <h3 className="font-heading font-black text-lg text-[#2D4A34]">
                      Day-by-Day Interactive Itinerary
                    </h3>
                    <span className="text-xs text-[#7C8A96]">
                      Click &quot;Swap Activity&quot; to customize any time slot
                    </span>
                  </div>

                  {generatedItinerary.days.map((day) => (
                    <div
                      key={day.day}
                      className="p-5 rounded-2xl bg-white border border-[#7C8A96]/20 shadow-xs hover:shadow-md transition-all space-y-4"
                    >
                      {/* Day Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                          <span className="size-8 rounded-xl bg-[#2D4A34] text-white font-mono font-black text-xs flex items-center justify-center shadow-xs shrink-0">
                            D{day.day}
                          </span>
                          <div>
                            <h4 className="font-heading font-extrabold text-sm text-[#2D4A34]">
                              {day.title}
                            </h4>
                            <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#7C8A96] mt-0.5">
                              <span>🏔️ {day.altitude}</span>
                              <span>·</span>
                              <span>🥾 {day.distance}</span>
                              <span>·</span>
                              <span>⏱️ {day.walkingTime}</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-left sm:text-right text-[11px] text-[#7FA05C] font-semibold">
                          <span>{day.accommodation.split("with")[0]}</span>
                        </div>
                      </div>

                      {/* Activities for the day */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {day.activities.map((act) => {
                          const isSwapping = swappingActivityId === act.id;
                          return (
                            <div
                              key={act.id}
                              className="p-3.5 rounded-xl bg-[#F5F3EF] border border-[#E2DFD8] flex flex-col justify-between space-y-2"
                            >
                              <div>
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-[10px] font-mono font-extrabold uppercase px-1.5 py-0.2 rounded bg-white text-[#2D4A34] border border-gray-200">
                                    {act.time}
                                  </span>
                                  <span className="text-[9px] font-bold text-[#7FA05C] uppercase tracking-wider">
                                    {act.category}
                                  </span>
                                </div>
                                <h5 className="font-heading font-bold text-xs text-[#2D4A34] leading-snug">
                                  {act.title}
                                </h5>
                                <p className="text-[11px] text-[#7C8A96] leading-relaxed mt-1">
                                  {act.description}
                                </p>
                              </div>

                              <div className="pt-2 border-t border-gray-200/60 flex items-center justify-between">
                                <span className="text-[10px] text-[#7C8A96]">
                                  Est. ${act.estimatedCost}
                                </span>
                                <button
                                  type="button"
                                  disabled={isSwapping}
                                  onClick={() => handleSwapActivity(day.day, act)}
                                  className="text-[10px] font-bold text-[#DD6B2E] hover:underline flex items-center gap-1 cursor-pointer disabled:opacity-50"
                                >
                                  <RotateCcw className={`size-2.5 ${isSwapping ? "animate-spin" : ""}`} />
                                  <span>{isSwapping ? "Swapping..." : "Swap"}</span>
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar Column: Budget Breakdown & Altitude Stats (lg:col-span-4) */}
              <div className="lg:col-span-4 space-y-6">
                {/* Cost Breakdown Card */}
                <div className="p-6 rounded-3xl bg-white border border-[#7C8A96]/20 shadow-md space-y-5">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#7FA05C] block mb-1">
                      Budget Health Tracker
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-heading font-black text-3xl text-[#2D4A34]">
                        ${generatedItinerary.estimatedCostPerPerson}
                      </span>
                      <span className="text-xs text-[#7C8A96]">/ traveler total</span>
                    </div>
                    <div className="text-[11px] text-[#7C8A96] mt-0.5">
                      Includes permits, guide/porter, teahouses, &amp; meals.
                    </div>
                  </div>

                  {/* Itemized Cost Bars */}
                  <div className="space-y-2.5 text-xs">
                    <div>
                      <div className="flex justify-between text-[11px] text-[#33322E] font-bold mb-1">
                        <span>Permits &amp; Park Entry</span>
                        <span>${generatedItinerary.costBreakdown.permitsAndFees}</span>
                      </div>
                      <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[#3E7C94] h-full" style={{ width: "15%" }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] text-[#33322E] font-bold mb-1">
                        <span>Sherpa Guide &amp; Porter Sirdar</span>
                        <span>${generatedItinerary.costBreakdown.guideAndPorters}</span>
                      </div>
                      <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[#2D4A34] h-full" style={{ width: "30%" }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] text-[#33322E] font-bold mb-1">
                        <span>Lodge &amp; Teahouse Stays</span>
                        <span>${generatedItinerary.costBreakdown.accommodation}</span>
                      </div>
                      <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[#7FA05C] h-full" style={{ width: "25%" }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] text-[#33322E] font-bold mb-1">
                        <span>Meals &amp; Boiled Water</span>
                        <span>${generatedItinerary.costBreakdown.mealsAndWater}</span>
                      </div>
                      <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[#DD6B2E] h-full" style={{ width: "20%" }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] text-[#33322E] font-bold mb-1">
                        <span>Transfers &amp; Ground Logistics</span>
                        <span>${generatedItinerary.costBreakdown.transportAndLogistics}</span>
                      </div>
                      <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-gray-400 h-full" style={{ width: "10%" }} />
                      </div>
                    </div>
                  </div>

                  {/* Included Badges */}
                  <div className="p-3.5 rounded-xl bg-[#F5F3EF] space-y-2 text-xs">
                    <div className="font-heading font-extrabold text-xs text-[#2D4A34]">
                      Standard Inclusions:
                    </div>
                    <ul className="space-y-1 text-[11px] text-[#7C8A96]">
                      <li className="flex items-center gap-1.5">
                        <Check className="size-3 text-[#7FA05C]" /> 100% Sherpa Guided Expeditions
                      </li>
                      <li className="flex items-center gap-1.5">
                        <Check className="size-3 text-[#7FA05C]" /> Official TIMS + Park Permits Handled
                      </li>
                      <li className="flex items-center gap-1.5">
                        <Check className="size-3 text-[#7FA05C]" /> 10% Flexible Booking Deposit
                      </li>
                      <li className="flex items-center gap-1.5">
                        <Check className="size-3 text-[#7FA05C]" /> Pulse Oximeter &amp; Medical First Aid
                      </li>
                    </ul>
                  </div>

                  <Link
                    href={`/booking?destination=${encodeURIComponent(generatedItinerary.destination)}&duration=${generatedItinerary.durationDays}&budget=${generatedItinerary.budgetTier}&travelers=${encodeURIComponent(generatedItinerary.groupSize)}`}
                    className="w-full py-3 rounded-xl bg-[#2D4A34] hover:bg-[#1E3725] text-white font-extrabold text-xs text-center block shadow-md transition-all active:scale-95"
                  >
                    Lock In Dates &amp; Book Route
                  </Link>
                </div>

                {/* Permits & Legal Requirements Card */}
                <div className="p-6 rounded-3xl bg-white border border-[#7C8A96]/20 shadow-md space-y-3">
                  <div className="flex items-center gap-2 text-[#2D4A34] font-heading font-bold text-sm">
                    <ShieldCheck className="size-4 text-[#7FA05C]" />
                    <span>Permits Required for this Route</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-[#7C8A96]">
                    {generatedItinerary.permitsRequired.map((permit, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-[#7FA05C] font-bold">✓</span>
                        <span>{permit}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-[11px] text-[#7C8A96]/80 pt-2 border-t border-gray-100">
                    All permits are pre-issued by our Kathmandu office upon passport scan submission.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SAVED TRIPS MODAL */}
        {showSavedModal && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Saved Custom Itineraries"
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          >
            <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-2xl space-y-4 max-h-[85vh] flex flex-col">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Bookmark className="size-4 text-[#7FA05C]" />
                  <h3 className="font-heading font-bold text-base text-[#2D4A34]">
                    My Saved Custom Itineraries ({savedTrips.length})
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowSavedModal(false)}
                  className="size-7 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                {savedTrips.length === 0 ? (
                  <p className="text-xs text-[#7C8A96] text-center py-6">
                    No saved custom itineraries yet. Click &quot;Save Plan&quot; on any generated trip.
                  </p>
                ) : (
                  savedTrips.map((trip) => (
                    <div
                      key={trip.id}
                      onClick={() => {
                        setGeneratedItinerary(trip);
                        setShowSavedModal(false);
                        setTimeout(() => {
                          document.getElementById("itinerary-results-section")?.scrollIntoView({ behavior: "smooth" });
                        }, 100);
                      }}
                      className="p-3.5 rounded-xl border border-gray-200 hover:border-[#7FA05C] bg-[#F5F3EF] hover:bg-white transition-all cursor-pointer flex items-center justify-between group"
                    >
                      <div>
                        <h4 className="font-heading font-bold text-xs text-[#2D4A34] group-hover:text-[#DD6B2E]">
                          {trip.tripTitle}
                        </h4>
                        <div className="text-[11px] text-[#7C8A96] mt-0.5">
                          {trip.durationDays} Days · ${trip.estimatedCostPerPerson}/pax · {trip.budgetTier}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => handleDeleteSavedTrip(trip.id, e)}
                        title="Delete saved plan"
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              <div className="pt-3 border-t border-gray-100 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowSavedModal(false)}
                  className="px-4 py-2 rounded-xl bg-[#2D4A34] text-white font-bold text-xs cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <AgencyFooter />
    </div>
  );
}
