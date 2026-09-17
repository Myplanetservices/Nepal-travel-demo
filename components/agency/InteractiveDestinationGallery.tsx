"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCurrency } from "@/components/agency/CurrencyContext";
import { ArrowRight, MapPin, Compass, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedTravelBadge, PassportStamp } from "@/components/travel/TravelStickers";

interface GalleryDestination {
  id: string;
  name: string;
  country: string;
  startingPriceUSD: number;
  duration: string;
  hotelsCount: string;
  image: string;
  teaserImage: string;
  description: string;
  link: string;
}

const GALLERY_DESTINATIONS: GalleryDestination[] = [
  {
    id: "everest",
    name: "Everest Khumbu",
    country: "Nepal",
    startingPriceUSD: 1340,
    duration: "14 days",
    hotelsCount: "28 Teahouses",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop",
    teaserImage: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=400&auto=format&fit=crop",
    description: "Sagarmatha heartland beneath Ama Dablam, prayer flags, and high suspension bridges.",
    link: "/tour/everest-base-camp-trek",
  },
  {
    id: "annapurna",
    name: "Annapurna Sanctuary",
    country: "Nepal",
    startingPriceUSD: 890,
    duration: "10 days",
    hotelsCount: "34 Mountain Inns",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop",
    teaserImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=400&auto=format&fit=crop",
    description: "Amphitheater of 8,000m summits, deep river gorges, and golden sunrise over Machapuchare.",
    link: "/tour/annapurna-circuit-trek",
  },
  {
    id: "manaslu",
    name: "Manaslu Traverse",
    country: "Nepal",
    startingPriceUSD: 1450,
    duration: "15 days",
    hotelsCount: "22 Teahouses",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop",
    teaserImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=400&auto=format&fit=crop",
    description: "Remote restricted Tibetan borderlands crossing the wild Larkya La pass (5,106m).",
    link: "/tour/manaslu-circuit-trek",
  },
  {
    id: "langtang",
    name: "Langtang Valley",
    country: "Nepal",
    startingPriceUSD: 680,
    duration: "8 days",
    hotelsCount: "18 Alpine Lodges",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop",
    teaserImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=400&auto=format&fit=crop",
    description: "The serene valley of glaciers, Kyanjin Gompa yak cheese dairies, and Tamang culture.",
    link: "/tour/langtang-valley-trek",
  },
  {
    id: "mustang",
    name: "Upper Mustang",
    country: "Nepal",
    startingPriceUSD: 2180,
    duration: "12 days",
    hotelsCount: "16 Walled Lodges",
    image: "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?q=80&w=1200&auto=format&fit=crop",
    teaserImage: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=400&auto=format&fit=crop",
    description: "The Last Walled Forbidden Kingdom with vibrant red rock cliffs and ancient cliff caves.",
    link: "/tour/upper-mustang-trek",
  },
  {
    id: "bhutan",
    name: "Kingdom of Bhutan",
    country: "Bhutan",
    startingPriceUSD: 2490,
    duration: "7 days",
    hotelsCount: "12 Heritage Resorts",
    image: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=1200&auto=format&fit=crop",
    teaserImage: "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?q=80&w=400&auto=format&fit=crop",
    description: "Tiger's Nest cliffside monastery, sacred fortress dzongs, and pristine pine valleys.",
    link: "/tour/bhutan-cultural-tour",
  },
];

export function InteractiveDestinationGallery() {
  const { formatPrice } = useCurrency();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const activeDestination = GALLERY_DESTINATIONS[selectedIndex];
  // Next destination for peek preview teaser
  const nextIndex = (selectedIndex + 1) % GALLERY_DESTINATIONS.length;
  const teaserDestination = GALLERY_DESTINATIONS[nextIndex];

  return (
    <section className="py-24 bg-[#F5F3EF] border-t border-stone-200/80 relative overflow-hidden">
      {/* Decorative animated passport stamp & camera badge */}
      <div className="absolute top-8 left-8 pointer-events-none hidden md:block">
        <PassportStamp
          text="GALLERY SELECTION"
          date="2026-2027"
          subtext="CURATED EXPEDITIONS"
          className="w-20 h-20 opacity-80"
          animation="animate-tilt-float"
        />
      </div>
      <div className="absolute top-8 right-8 pointer-events-none hidden md:block">
        <AnimatedTravelBadge
          icon="camera"
          label="TRAIL CAPTURES"
          animation="animate-float-gentle"
          variant="light"
          size="size-4"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <div className="flex items-center justify-center mb-2">
            <AnimatedTravelBadge
              icon="mountain"
              label="HIMALAYAN VISUALS"
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
              High Himalayan Visual Archive
            </span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-[#2D4A34] tracking-tight">
            Recent Gallery
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2 font-medium">
            Explore our premier curated destinations with real-time route details and teahouses.
          </p>
        </div>

        {/* Master-Detail Showcase matching GallerySectionRef.mp4 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* =========================================================================
              LEFT COLUMN: LARGE ACTIVE HERO SHOWCASE CARD (Matching Video Ref)
              ========================================================================= */}
          <div className="lg:col-span-8 flex flex-col">
            {/* Big Hero Image Container */}
            <div className="relative h-[440px] sm:h-[540px] md:h-[600px] w-full rounded-[32px] sm:rounded-[36px] overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDestination.id}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={activeDestination.image}
                    alt={activeDestination.name}
                    fill
                    priority
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Subtle lighting vignette overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
                </motion.div>
              </AnimatePresence>

              {/* Bottom-left Corner Peek Teaser Thumbnail (Matching video ref) */}
              <div
                onClick={() => setSelectedIndex(nextIndex)}
                className="absolute -bottom-2 -left-2 z-20 w-24 sm:w-32 h-20 sm:h-26 rounded-2xl overflow-hidden border-3 border-white shadow-xl cursor-pointer hover:scale-105 transition-transform group/teaser bg-slate-800"
                title={`Peek next: ${teaserDestination.name}`}
              >
                <Image
                  src={teaserDestination.image}
                  alt={teaserDestination.name}
                  fill
                  className="object-cover opacity-90 group-hover/teaser:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 bg-black/25 flex items-end p-1.5 sm:p-2">
                  <span className="text-[10px] sm:text-xs font-bold text-white drop-shadow truncate">
                    Next: {teaserDestination.name.split(" ")[0]}
                  </span>
                </div>
              </div>

              {/* Top badges */}
              <div className="absolute top-5 left-5 z-20 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#2D4A34]/90 text-white font-extrabold text-xs backdrop-blur-xs shadow-md">
                  {activeDestination.country}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/90 text-[#2D4A34] font-extrabold text-xs backdrop-blur-xs shadow-sm flex items-center gap-1">
                  <Sparkles className="size-3 text-[#D9A23B]" />
                  Curated Route
                </span>
              </div>
            </div>

            {/* Bottom Metadata Bar matching video: Big Title on Left | Price & Lodging on Right */}
            <div className="mt-5 sm:mt-6 px-2 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h3 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl text-[#2D4A34] tracking-tight leading-none">
                  {activeDestination.name}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-md font-medium">
                  {activeDestination.description}
                </p>
              </div>

              <div className="text-left sm:text-right shrink-0">
                <div className="text-xs sm:text-sm font-semibold text-stone-500 uppercase tracking-wider">
                  Starting Price
                </div>
                <div className="text-2xl sm:text-3xl font-black text-[#2D4A34] tracking-tight">
                  from {formatPrice(activeDestination.startingPriceUSD)}
                </div>
                <div className="text-xs sm:text-sm text-stone-600 font-bold mt-0.5 flex items-center sm:justify-end gap-1.5">
                  <span>{activeDestination.duration}</span>
                  <span className="text-stone-300">•</span>
                  <span>{activeDestination.hotelsCount}</span>
                </div>
              </div>
            </div>

            {/* Explore Package CTA */}
            <div className="mt-4 px-2">
              <Link
                href={activeDestination.link}
                className="inline-flex items-center gap-2 text-xs font-extrabold text-[#2D4A34] hover:text-[#3E7C94] transition-colors group cursor-pointer"
              >
                <span>View Full Itinerary & Teahouse Lodging</span>
                <ArrowRight className="size-3.5 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: VERTICAL LIST OF DESTINATION CARDS (Matching Video Ref)
              ========================================================================= */}
          <div className="lg:col-span-4 flex flex-col gap-3 sm:gap-3.5">
            <div className="text-xs font-extrabold text-stone-500 uppercase tracking-wider mb-1 px-1 flex items-center justify-between">
              <span>Select Destination</span>
              <span className="text-[#3E7C94] font-bold">
                {selectedIndex + 1} of {GALLERY_DESTINATIONS.length}
              </span>
            </div>

            <div className="space-y-3 max-h-[700px] overflow-y-auto pr-1">
              {GALLERY_DESTINATIONS.map((dest, idx) => {
                const isSelected = selectedIndex === idx;

                return (
                  <button
                    key={dest.id}
                    type="button"
                    onClick={() => setSelectedIndex(idx)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full text-left p-2.5 sm:p-3 rounded-2xl sm:rounded-3xl border transition-all duration-300 flex flex-col group cursor-pointer ${
                      isSelected
                        ? "bg-white border-[#2D4A34] shadow-lg ring-2 ring-[#2D4A34]/15 translate-x-1"
                        : "bg-white/70 hover:bg-white border-stone-200/80 hover:shadow-md hover:border-stone-300"
                    }`}
                  >
                    {/* Thumbnail Image */}
                    <div className="relative w-full h-32 sm:h-36 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100 mb-2.5">
                      <Image
                        src={dest.image}
                        alt={dest.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />

                      {isSelected && (
                        <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-[#2D4A34] text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
                          Viewing
                        </div>
                      )}
                    </div>

                    {/* Card Footer: Name on Left | Price on Right (Matching Video) */}
                    <div className="flex items-center justify-between px-1">
                      <h4
                        className={`font-heading font-extrabold text-sm sm:text-base tracking-tight transition-colors ${
                          isSelected ? "text-[#2D4A34]" : "text-stone-800 group-hover:text-[#2D4A34]"
                        }`}
                      >
                        {dest.name}
                      </h4>
                      <span className="font-heading font-bold text-xs sm:text-sm text-[#2D4A34]">
                        {formatPrice(dest.startingPriceUSD)}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
