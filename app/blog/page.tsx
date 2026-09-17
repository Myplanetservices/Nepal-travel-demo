"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  Calendar,
  Clock,
  User,
  Search,
  ArrowRight,
  Sparkles,
  Bookmark,
  Share2,
  CheckCircle2,
  ShieldCheck,
  Download,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MainAgencyNav } from "@/components/agency/MainAgencyNav";
import { AgencyFooter } from "@/components/agency/AgencyFooter";
import { BLOG_ARTICLES } from "@/lib/demo-agency-data";
import {
  PassportStamp,
  PaperAirplaneContrail,
  FancyTravelIcon,
  RetroCameraSticker,
  BoardingTicketsSticker,
  AnimatedTravelBadge,
  AnimatedTravelIcon,
} from "@/components/travel/TravelStickers";

const EXTENDED_ARTICLES = [
  ...BLOG_ARTICLES,
  {
    id: "blog-4",
    slug: "teahouse-etiquette-nepal-himalayas",
    title: "Teahouse Etiquette & Sherpa Cultural Norms: What Every Trekker Should Know",
    category: "Culture & Tips",
    readTime: "7 min read",
    date: "Feb 24, 2026",
    author: "Dawa Sherpa",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop",
    excerpt: "How to respect sacred mani prayer stones, tea room courtesies, dining rituals, and supporting remote Sherpa village families.",
  },
  {
    id: "blog-5",
    slug: "bhutan-travel-permits-sdf-rules",
    title: "Demystifying Bhutan's $100/Night SDF Fee & Tourism Regulations for 2026",
    category: "Trekking Guide",
    readTime: "6 min read",
    date: "Mar 02, 2026",
    author: "Sunita Thapa",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop",
    excerpt: "Complete traveler breakdown of Bhutan's Sustainable Development Fee, Drukair connections, visa clearances, and what is included.",
  },
  {
    id: "blog-6",
    slug: "acclimatization-science-diamox-tips",
    title: "The Medical Science of Acclimatization: Diamox, Oxygen & Hydration Explained",
    category: "Fitness & Safety",
    readTime: "9 min read",
    date: "Mar 11, 2026",
    author: "Dr. Sunita Thapa",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop",
    excerpt: "Clinical insights on blood oxygen saturation, avoiding Acute Mountain Sickness (AMS), and safety-first pacing on high alpine passes.",
  },
];

const CATEGORIES = ["All", "Trekking Guide", "Fitness & Safety", "Gear Guide", "Culture & Tips"];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const filteredArticles = useMemo(() => {
    return EXTENDED_ARTICLES.filter((article) => {
      const matchesCat = selectedCategory === "All" || article.category === selectedCategory;
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.author.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#F5F3EF] flex flex-col font-sans">
      <MainAgencyNav />

      {/* Hero Header */}
      <section className="relative bg-[#1B2F22] text-[#F5F3EF] pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
        {/* Background Hero Image with Atmospheric Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1920&auto=format&fit=crop"
            alt="Misty Himalayan Peaks and Mountain Trails"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-black/60" />
        </div>

        {/* Animated small 2D badges & stamps */}
        <div className="absolute top-32 right-12 hidden md:flex items-center gap-2 pointer-events-none z-20">
          <AnimatedTravelBadge icon="binoculars" label="FIELD JOURNAL" animation="animate-float-gentle" variant="dark" />
        </div>
        <div className="absolute top-40 right-28 pointer-events-none opacity-80 hidden lg:block z-10">
          <PaperAirplaneContrail className="w-24 h-14 animate-float-drift" />
        </div>
        <div className="absolute bottom-6 right-8 hidden sm:block pointer-events-none z-20">
          <PassportStamp text="FIELD JOURNAL" date="2026" className="w-16 h-16 opacity-90 text-white animate-tilt-float" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Badge className="bg-[#7FA05C] text-white border-none font-bold text-xs shadow-md">
              Himalayan Trail Journal & Knowledge Base
            </Badge>
            <AnimatedTravelBadge icon="compass" label="SHERPA KNOWLEDGE" animation="animate-gentle-pulse" variant="dark" />
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl !text-white tracking-tight leading-tight drop-shadow-lg">
            Guides, Gear Advice & Mountain Wisdom
          </h1>
          <p className="mt-4 text-xs sm:text-sm !text-white/95 leading-relaxed font-medium drop-shadow-md">
            Written by certified Sherpa expedition leaders and high-altitude wilderness specialists. Honest preparation tips for trekking in Nepal, Bhutan, and Tibet.
          </p>

          {/* Search bar inside hero */}
          <div className="mt-8 max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-[#7C8A96]" />
            <input
              type="text"
              placeholder="Search gear guides, altitude tips, routes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full bg-white text-[#33322E] placeholder-[#7C8A96] text-xs font-medium shadow-xl focus:outline-none focus:ring-2 focus:ring-[#7FA05C]"
            />
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="bg-white border-b border-[#7C8A96]/20 sticky top-16 z-30 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar">
          <AnimatedTravelBadge icon="compass" label="TOPICS" animation="animate-gentle-pulse" size="size-4" className="shrink-0 mr-1" />
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#2D4A34] text-white shadow-xs"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-14 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative flex-1">
        {/* Animated small 2D camera sticker in corner */}
        <div className="absolute top-10 right-6 pointer-events-none z-20 hidden lg:block">
          <RetroCameraSticker className="w-12 h-10 animate-tilt-float drop-shadow-sm" />
        </div>

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <AnimatedTravelBadge icon="camera" label="TRAIL STORIES & ADVICE" animation="animate-float-gentle" />
          </div>
          <span className="text-xs text-[#7C8A96] font-medium">{filteredArticles.length} guides published</span>
        </div>

        {filteredArticles.length === 0 ? (
          <div className="text-center py-20">
            <div className="size-16 rounded-full bg-stone-200 text-[#7C8A96] flex items-center justify-center mx-auto mb-4">
              <BookOpen className="size-8" />
            </div>
            <h3 className="font-heading font-extrabold text-lg text-[#2D4A34]">No matching articles found</h3>
            <p className="text-xs text-[#7C8A96] mt-1">Try searching for "gear", "Everest", or "altitude"</p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-[#7FA05C] text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <Card
                key={article.id}
                className="group overflow-hidden rounded-2xl border border-[#7C8A96]/20 bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-[#2D4A34]/90 backdrop-blur-xs text-white text-[10px] font-bold">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 text-[11px] text-[#7C8A96] mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="size-3 text-[#7FA05C]" /> {article.date}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="size-3 text-[#7FA05C]" /> {article.readTime}
                      </span>
                    </div>

                    <h3 className="font-heading font-extrabold text-base text-[#2D4A34] group-hover:text-[#7FA05C] transition-colors leading-snug line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="mt-3 text-xs text-[#7C8A96] leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                  </CardContent>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-[#7C8A96]/15 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="size-6 rounded-full bg-[#7FA05C]/20 text-[#2D4A34] flex items-center justify-center text-[10px] font-bold">
                      <User className="size-3" />
                    </div>
                    <span className="text-xs font-bold text-[#33322E]">{article.author}</span>
                  </div>

                  <Link
                    href={`/contact?inquiry=${encodeURIComponent(article.title)}`}
                    className="inline-flex items-center gap-1 text-xs font-extrabold text-[#7FA05C] group-hover:text-[#2D4A34] transition-colors"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Free Field Guide Download Banner */}
        <div className="mt-16 bg-[#2D4A34] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
          {/* Animated visible 2D boarding tickets sticker */}
          <div className="absolute top-4 right-4 pointer-events-none z-20 hidden sm:flex items-center gap-2">
            <AnimatedTravelBadge icon="map" label="FREE 2026 EDITION" animation="animate-gentle-pulse" variant="dark" />
          </div>
          <div className="absolute -bottom-2 -right-2 pointer-events-none z-10 hidden md:block">
            <BoardingTicketsSticker className="w-14 h-12 animate-tilt-float drop-shadow-md" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center relative z-10">
            <div className="lg:col-span-2 space-y-2">
              <div className="flex items-center gap-2 mb-1">
                <Badge className="bg-[#D9A23B] text-black border-none font-bold text-[10px]">
                  Free Digital Handbook
                </Badge>
              </div>
              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
                Download the Complete 2026 Himalayan Trekker's Field Handbook
              </h3>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-xl">
                48 pages of high-altitude packing templates, teahouse meal nutrition breakdown, Diamox dosing charts, and porter welfare guidelines prepared by our UIAGM guides.
              </p>
            </div>

            <div className="bg-white/10 p-5 rounded-2xl border border-white/20 backdrop-blur-xs">
              {downloadSuccess ? (
                <div className="text-center py-4 space-y-2">
                  <CheckCircle2 className="size-8 text-[#7FA05C] mx-auto" />
                  <div className="font-bold text-sm text-white">Handbook Dispatched!</div>
                  <p className="text-[11px] text-white/80">Check your inbox for the PDF download link.</p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setDownloadSuccess(true);
                  }}
                  className="space-y-3"
                >
                  <input
                    type="email"
                    required
                    placeholder="Enter your email..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white text-[#33322E] text-xs placeholder-[#7C8A96] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-[#7FA05C] hover:bg-[#6E8C4E] text-white font-extrabold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Download className="size-3.5" />
                    <span>Get Free PDF Guide</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <AgencyFooter />
    </div>
  );
}
