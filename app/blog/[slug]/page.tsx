"use client";

import React, { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Mountain,
  ShieldCheck,
  Compass,
  MapPin,
  Share2,
  BookOpen,
  Phone,
  Check,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BLOG_ARTICLES, DEMO_PACKAGES } from "@/lib/demo-agency-data";
import { MainAgencyNav } from "@/components/agency/MainAgencyNav";
import { AgencyFooter } from "@/components/agency/AgencyFooter";
import {
  PassportStamp,
  AnimatedTravelBadge,
  PaperAirplaneContrail,
} from "@/components/travel/TravelStickers";

interface ArticleContent {
  intro: string;
  keyTakeaways: string[];
  sections: {
    heading: string;
    subheading?: string;
    paragraphs: string[];
    callout?: string;
    bulletPoints?: string[];
  }[];
  verdict: string;
  recommendedTours: string[];
}

const ARTICLE_DETAILS: Record<string, ArticleContent> = {
  "everest-base-camp-in-autumn-vs-spring": {
    intro:
      "Choosing between Autumn (late September to November) and Spring (March to May) is the most critical logistical decision when planning a trek to Everest Base Camp (5,364m) and Kala Patthar (5,550m). While both seasons offer stable weather and safe trail conditions, they offer distinctly different atmospheric, aesthetic, and cultural experiences.",
    keyTakeaways: [
      "Autumn brings the cleanest air, deepest blue skies, and greatest summit visibility following the monsoon wash.",
      "Spring features warmer daytime temperatures, lush blooming rhododendron forests below Namche, and bustling base camp energy with climbing teams.",
      "Autumn is colder at night (down to -15°C at Gorak Shep), requiring a genuine 4-season down sleeping bag.",
      "Spring daytime temperatures are slightly more forgiving, but late afternoon convection clouds can build up faster.",
    ],
    sections: [
      {
        heading: "1. Weather Dynamics & Mountain Visibility",
        subheading: "Atmospheric clarity after the monsoon vs warming spring air",
        paragraphs: [
          "In Autumn (October to November), the monsoon rains have ceased, scrubbing all dust and particulate matter from the Himalayan atmosphere. The results are the iconic crystalline blue skies that photographers dream of. Morning and afternoon visibility from Tengboche, Dingboche, and Kala Patthar is reliably razor-sharp.",
          "Spring (March to May) begins crisp and gradually warms as the season progresses. While mornings typically offer clear mountain views, midday thermal heating often pushes light clouds up from the lower valleys by 2:00 PM, occasionally obscuring high summits before clearing again by evening.",
        ],
        callout:
          "Pro Tip: If panoramic summit photography and razor-sharp sunrise views of Everest, Lhotse, and Ama Dablam are your highest priority, choose October or November.",
      },
      {
        heading: "2. Temperature Profiles Across the Khumbu",
        subheading: "What to expect at 2,800m versus 5,500m",
        paragraphs: [
          "Temperature fluctuates drastically based on altitude rather than just the calendar. In Spring, daytime temperatures at Namche Bazaar (3,440m) reach 12°C to 16°C, creating very comfortable trekking conditions in a light fleece. Gorak Shep (5,164m) nights hover between -6°C to -10°C.",
          "In Autumn, late October and November see night temperatures drop significantly. At Gorak Shep, night temperatures routinely dip to -15°C to -20°C. However, daytime sunshine makes walking comfortable with appropriate layering.",
        ],
        bulletPoints: [
          "Lukla (2,840m): Autumn 8°C to 18°C | Spring 10°C to 20°C",
          "Namche Bazaar (3,440m): Autumn 2°C to 14°C | Spring 5°C to 16°C",
          "Dingboche (4,410m): Autumn -5°C to 9°C | Spring -2°C to 11°C",
          "Gorak Shep (5,164m): Autumn -16°C to 4°C | Spring -10°C to 6°C",
        ],
      },
      {
        heading: "3. Flora, Culture & Base Camp Atmosphere",
        subheading: "Rhododendron forests vs climbing season summit pushes",
        paragraphs: [
          "In April and May, the lower Khumbu Valley from Lukla up to Phakding and Tengboche explodes into deep reds, pinks, and whites as the national flower of Nepal—the rhododendron (Lali Gurans)—blooms in dense mountain forests.",
          "Spring is also the official Everest climbing expedition season. When you arrive at Base Camp in April or May, it is a bustling yellow-tent city inhabited by hundreds of international mountaineers, Sherpa icefall doctors, and expedition support teams preparing for summit pushes.",
          "In Autumn, Everest Base Camp is peaceful, quiet, and starkly pristine. There are virtually no summit expedition tents on the Khumbu Glacier, allowing you to experience the natural grandeur of the amphitheater without commercial camps.",
        ],
      },
    ],
    verdict:
      "Both seasons are world-class. If you prioritize crystal-clear mountain panoramas, golden autumn light, and crisp air, book October–November. If you want warmer temperatures, blooming forests, and the electrifying energy of active mountaineering expeditions, book April–May.",
    recommendedTours: ["everest-base-camp-trek"],
  },
  "how-to-train-for-thorong-la-pass": {
    intro:
      "Crossing Thorong La Pass (5,416m) on the Annapurna Circuit is one of high-altitude trekking's ultimate triumphs. At 5,400 meters, each breath delivers only roughly 50% of the effective oxygen available at sea level. Conquering this pass requires a focused 12-week training regimen targeting cardiovascular endurance, eccentric leg strength, and strict acclimatization discipline.",
    keyTakeaways: [
      "Aerobic base building (Zone 2 cardio) is more effective for high-altitude endurance than high-intensity sprinting.",
      "Eccentric leg strength exercises prevent knee burnout during the 1,600m knee-jarring descent to Muktinath.",
      "The golden rule of acclimatization: Never gain more than 400–500m of sleeping altitude per day above 3,000 meters.",
      "Hydration is non-negotiable: Drink 4 to 5 liters of water daily to offset respiratory moisture loss at freezing altitudes.",
    ],
    sections: [
      {
        heading: "1. The 12-Week Endurance Conditioning Protocol",
        subheading: "Building an unbreakable aerobic engine",
        paragraphs: [
          "High altitude magnifies physical fatigue. If your heart rate spikes into the anaerobic zone during moderate climbs, lactic acid accumulates rapidly without sufficient oxygen to clear it. Training in Zone 2 (where you can hold a steady conversation without gasping) teaches your body to utilize fat as primary fuel and maximizes mitochondrial efficiency.",
          "We recommend 3 to 4 days per week of sustained Zone 2 cardio for 45 to 75 minutes. Long trail running, rowing, stationary cycling, or outdoor hiking with a weighted daypack are ideal.",
        ],
        bulletPoints: [
          "Weeks 1–4: 3x 45-min Zone 2 sessions + 1x weekend 3-hour hike with 6kg pack.",
          "Weeks 5–8: 3x 60-min sessions + 1x weekend 4-hour hike with 8kg pack.",
          "Weeks 9–11: 2x 60-min sessions + stair climbing with 10kg pack + 5-hour hike.",
          "Week 12 (Taper): Light 30-min brisk walks, mobility stretching, and restorative rest before flying to Nepal.",
        ],
      },
      {
        heading: "2. Leg Strength & Descent Preparation",
        subheading: "Saving your quads and knees on the 1,600m descent",
        paragraphs: [
          "Trekkers often worry about the ascent to Thorong La, but the descent from 5,416m down to Muktinath (3,760m) is where 80% of injuries and knee strains occur. Your quadriceps must perform thousands of repetitive eccentric braking contractions on loose shale and gravel.",
          "Incorporate step-downs, Bulgarian split squats, weighted lunges, and calf raises twice weekly. Eccentric slow-cadence squats (3 seconds down, 1 second up) build resilience in the patellar tendons.",
        ],
        callout:
          "Gear Insight: Always trek with two sturdy, collapsible trekking poles with carbide tips. On the Thorong La descent, poles reduce impact forces on knee joints by up to 25%.",
      },
      {
        heading: "3. The Acclimatization Strategy on the Trail",
        subheading: "How our Sherpa guides ensure a 98% pass crossing rate",
        paragraphs: [
          "Physical fitness alone does not make someone immune to Acute Mountain Sickness (AMS). Acclimatization is an involuntary physiological adaptation: your kidneys produce erythropoietin (EPO), stimulating bone marrow to manufacture more red blood cells.",
          "Our Annapurna itinerary includes mandatory rest and acclimatization in Manang (3,540m). We practice 'climb high, sleep low' by ascending to Gangapurna Lake or Chongkor viewpoint during the afternoon before returning to Manang to sleep.",
        ],
      },
    ],
    verdict:
      "Thorong La Pass is completely achievable for anyone with good baseline fitness who respects the altitude and commits to 8–12 weeks of steady preparation. Keep a slow, rhythmic pace on the pass day, breathe deeply, and trust your training.",
    recommendedTours: ["annapurna-circuit-trek", "annapurna-base-camp-trek"],
  },
  "nepal-trekking-packing-checklist": {
    intro:
      "Packing for a Himalayan trek requires striking the exact balance between sub-zero alpine warmth and lightweight portability. Your porter carries your main duffel bag (strictly limited to 10–12kg for porter welfare), while you carry a 28–35L daypack containing essentials for the day. Here is the verified 2026/2027 gear checklist compiled by our senior Sherpa expedition directors.",
    keyTakeaways: [
      "Layering is everything: Base layer (moisture wicking), Mid layer (insulation), and Outer layer (wind/water barrier).",
      "Never trek in brand-new boots: Break them in at least 4 weeks prior to your trip to prevent debilitating blisters.",
      "High-loft down jacket (800+ fill power) and a -15°C rated sleeping bag are mandatory for nights above 3,500m.",
      "High-grade down jackets and sleeping bags can be rented in Kathmandu (Thamel) for $2–$3 USD per day.",
    ],
    sections: [
      {
        heading: "1. The 3-Layer System for Mountain Temperatures",
        subheading: "Managing body heat from 25°C valleys to -15°C passes",
        paragraphs: [
          "Cotton is strictly forbidden in the high Himalayas ('cotton kills' because it traps sweat against the skin and induces rapid hypothermia). Every item next to your skin must be merino wool or synthetic polypropylene.",
          "During daytime ascents under bright sun, you will often hike in a light merino t-shirt or sun hoodie. As soon as you halt at a high pass or reach the evening teahouse, temperatures plummet within minutes, requiring an instant transition to fleece and heavy down.",
        ],
        bulletPoints: [
          "Base Layer: 2x 200g/m² Merino wool long-sleeve tops + 1x merino leggings.",
          "Mid Layer: 1x lightweight fleece or Polartec grid fleece pullover.",
          "Heavy Insulation: 1x 800+ fill power down jacket with hood (approx. 600g-800g).",
          "Outer Shell: 1x 3-layer Gore-Tex waterproof, breathable jacket with pit zips.",
          "Trekking Pants: 2x quick-dry stretch hiking pants + 1x waterproof rain pants.",
        ],
      },
      {
        heading: "2. Footwear & Extremities Protection",
        subheading: "Keeping feet, hands, and head protected",
        paragraphs: [
          "Your feet are your single most important asset. Sturdy mid-to-high ankle trekking boots with Vibram soles provide essential ankle stability over scree and rocky trails. Pair them with moisture-wicking merino wool trekking socks.",
          "Extremities feel the cold first. Bring one pair of lightweight touchscreen-compatible liner gloves for photography during the day, and one pair of heavy insulated, windproof mountaineering mittens for cold mornings.",
        ],
        callout:
          "Tip: Bring blister care essentials directly in your daypack: Compeed hydrocolloid patches, athletic tape, and sterile wipes.",
      },
      {
        heading: "3. Electronics, Water & Health Essentials",
        subheading: "Cold battery conservation and safe hydration",
        paragraphs: [
          "Lithium batteries lose up to 50% of their charge in sub-zero teahouse bedrooms. Keep your smartphone, camera batteries, and power bank inside your sleeping bag close to your body at night.",
          "Never buy single-use plastic bottles on Himalayan trails—they create severe ecological pollution. Bring two 1-liter wide-mouth Nalgene bottles and a UV SteriPEN or chlorine dioxide water purification drops. Teahouse staff can fill your Nalgene with boiling water at night, which doubles as a hot water bottle inside your sleeping bag.",
        ],
      },
    ],
    verdict:
      "Quality gear makes the difference between an exhausting ordeal and an unforgettable adventure. Focus on good footwear, merino wool base layers, and dependable cold-weather insulation.",
    recommendedTours: ["everest-base-camp-trek", "manaslu-circuit-trek", "upper-mustang-trek"],
  },
};

export default function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const article = BLOG_ARTICLES.find((a) => a.slug === resolvedParams.slug);

  if (!article) {
    notFound();
  }

  const content = ARTICLE_DETAILS[article.slug] || {
    intro: article.excerpt,
    keyTakeaways: [
      "Plan your departure windows with certified Sherpa expedition leaders.",
      "Pack according to season and high alpine conditions.",
      "Acclimatize gradually to prevent mountain sickness.",
    ],
    sections: [
      {
        heading: "Field Guide Overview",
        paragraphs: [
          article.excerpt,
          "Traveling in the high Himalayas requires preparation, authentic local logistics, and certified guides with verified government permits.",
        ],
      },
    ],
    verdict:
      "Consult with our Sherpa travel directors to organize your customized trekking departure.",
    recommendedTours: ["everest-base-camp-trek", "annapurna-circuit-trek"],
  };

  const relatedArticles = BLOG_ARTICLES.filter((a) => a.slug !== article.slug);
  const tours = DEMO_PACKAGES.filter((p) =>
    content.recommendedTours.includes(p.slug)
  );

  return (
    <div className="min-h-screen bg-[#F5F3EF] flex flex-col font-sans">
      <MainAgencyNav />

      {/* Article Header & Breadcrumbs */}
      <section className="bg-[#1B2F22] text-[#F5F3EF] pt-28 pb-14 lg:pt-36 lg:pb-18 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#F5F3EF]/75 hover:text-[#7FA05C] transition-colors"
            >
              <ArrowLeft className="size-3.5" /> Back to All Guides & Journals
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <Badge className="bg-[#7FA05C] text-white border-none font-bold text-xs">
              {article.category}
            </Badge>
            <AnimatedTravelBadge
              icon="compass"
              label="VERIFIED GUIDE"
              animation="animate-gentle-pulse"
              variant="dark"
              size="size-3.5"
            />
          </div>

          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl !text-white tracking-tight leading-tight drop-shadow-md">
            {article.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-6 text-xs text-[#F5F3EF]/85 pb-6 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="size-8 rounded-full bg-[#7FA05C] text-white flex items-center justify-center font-bold text-xs">
                {article.author.charAt(0)}
              </div>
              <div>
                <span className="font-bold text-white block">{article.author}</span>
                <span className="text-[11px] text-[#F5F3EF]/65">Senior Mountain Guide</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <Calendar className="size-3.5 text-[#7FA05C]" />
              <span>Published {article.date}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Clock className="size-3.5 text-[#7FA05C]" />
              <span>{article.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 flex-1">
        {/* Featured Hero Image */}
        <div className="relative h-64 sm:h-96 md:h-[420px] w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl mb-10 border border-[#7C8A96]/20">
          <Image
            src={article.image}
            alt={article.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 text-white text-xs sm:text-sm font-medium drop-shadow-md">
            Photo: High Himalaya Trails & Expeditions · Zenith Himalaya Archives
          </div>
        </div>

        {/* Key Takeaways Card */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#7C8A96]/20 shadow-xs mb-10">
          <div className="flex items-center gap-2.5 font-heading font-extrabold text-base text-[#2D4A34] mb-4">
            <CheckCircle2 className="size-5 text-[#7FA05C]" />
            <span>Key Takeaways & Quick Summary</span>
          </div>
          <ul className="space-y-3">
            {content.keyTakeaways.map((takeaway, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#33322E] leading-relaxed">
                <span className="size-5 rounded-full bg-[#7FA05C]/15 text-[#2D4A34] font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Article Body Sections */}
        <div className="space-y-10 text-[#33322E]">
          {/* Introduction */}
          <div className="text-sm sm:text-base leading-relaxed text-[#33322E] font-medium border-l-4 border-[#7FA05C] pl-4 sm:pl-6 py-1 bg-white/50 rounded-r-xl">
            {content.intro}
          </div>

          {/* Dynamic Content Sections */}
          {content.sections.map((section, idx) => (
            <div key={idx} className="space-y-4 pt-4 border-t border-[#7C8A96]/15">
              <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-[#2D4A34]">
                {section.heading}
              </h2>
              {section.subheading && (
                <p className="text-xs font-bold text-[#7FA05C] uppercase tracking-wider">
                  {section.subheading}
                </p>
              )}

              {section.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="text-xs sm:text-sm text-[#33322E] leading-relaxed">
                  {p}
                </p>
              ))}

              {section.callout && (
                <div className="p-4 sm:p-5 rounded-xl bg-[#2D4A34]/5 border border-[#2D4A34]/15 text-xs sm:text-sm text-[#2D4A34] font-semibold leading-relaxed">
                  {section.callout}
                </div>
              )}

              {section.bulletPoints && (
                <div className="bg-white p-5 rounded-xl border border-[#7C8A96]/20 space-y-2">
                  {section.bulletPoints.map((bp, bIdx) => (
                    <div key={bIdx} className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[#33322E]">
                      <Check className="size-4 text-[#7FA05C] shrink-0" />
                      <span>{bp}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Expert Verdict Box */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#2D4A34] text-white shadow-lg space-y-3 relative overflow-hidden">
            <div className="absolute top-3 right-3 pointer-events-none opacity-85">
              <PassportStamp text="VERIFIED ADVICE" date="2026" className="w-16 h-16 text-white animate-tilt-float" />
            </div>
            <div className="text-xs font-extrabold text-[#7FA05C] uppercase tracking-wider">
              The Sherpa Verdict
            </div>
            <p className="text-xs sm:text-sm text-white/95 leading-relaxed font-medium">
              {content.verdict}
            </p>
          </div>
        </div>

        {/* Recommended Tours Section */}
        {tours.length > 0 && (
          <div className="mt-14 pt-10 border-t border-[#7C8A96]/20">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#7FA05C]">
                  Featured Expeditions
                </span>
                <h3 className="font-heading font-extrabold text-xl text-[#2D4A34]">
                  Recommended Treks for This Route
                </h3>
              </div>
              <Link
                href="/tour"
                className="text-xs font-bold text-[#7FA05C] hover:text-[#2D4A34] flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowRight className="size-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {tours.map((pkg) => (
                <Card
                  key={pkg.id}
                  className="overflow-hidden rounded-2xl border border-[#7C8A96]/20 bg-white hover:shadow-lg transition-all"
                >
                  <div className="relative h-44 w-full">
                    <Image
                      src={pkg.heroImage}
                      alt={pkg.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <Badge className="bg-[#2D4A34]/90 text-white font-bold text-[10px]">
                        {pkg.duration}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <h4 className="font-heading font-extrabold text-sm text-[#2D4A34] line-clamp-1 mb-1.5">
                      {pkg.title}
                    </h4>
                    <p className="text-[11px] text-[#7C8A96] line-clamp-2 mb-3">
                      {pkg.subtitle}
                    </p>
                    <div className="flex items-center justify-between pt-3 border-t border-[#7C8A96]/15">
                      <div>
                        <span className="text-[10px] text-[#7C8A96] block">Starting from</span>
                        <span className="font-extrabold text-sm text-[#2D4A34]">${pkg.priceUSD} USD</span>
                      </div>
                      <Link
                        href={`/tour/${pkg.slug}`}
                        className="px-3.5 py-1.5 rounded-lg bg-[#2D4A34] hover:bg-[#1F2E23] text-white text-xs font-bold transition-colors"
                      >
                        Explore Tour
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Expedition Consultation Banner */}
        <div className="mt-14 p-8 rounded-3xl bg-[#F5F3EF] border-2 border-[#2D4A34]/20 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center sm:text-left">
            <h4 className="font-heading font-extrabold text-lg text-[#2D4A34]">
              Have Questions About Planning This Expedition?
            </h4>
            <p className="text-xs text-[#7C8A96] max-w-md">
              Speak directly with our Kathmandu Sherpa operations desk for customized routes, permit advice, and private group bookings.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href={`/contact?inquiry=${encodeURIComponent(article.title)}`}
              className="px-5 py-3 rounded-xl bg-[#2D4A34] hover:bg-[#1F2E23] text-white font-bold text-xs shadow-md transition-colors"
            >
              Ask Our Experts
            </Link>
            <a
              href="tel:+97714701234"
              className="px-4 py-3 rounded-xl bg-white border border-[#7C8A96]/30 text-[#2D4A34] font-bold text-xs hover:bg-[#F5F3EF] flex items-center gap-1.5 transition-colors"
            >
              <Phone className="size-3.5 text-[#7FA05C]" />
              <span>Call Desk</span>
            </a>
          </div>
        </div>

        {/* More Articles */}
        <div className="mt-14 pt-10 border-t border-[#7C8A96]/20">
          <h3 className="font-heading font-extrabold text-lg text-[#2D4A34] mb-6">
            More Himalayan Guides & Resources
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedArticles.map((rel) => (
              <Link
                key={rel.id}
                href={`/blog/${rel.slug}`}
                className="group flex gap-4 p-4 rounded-2xl bg-white border border-[#7C8A96]/20 hover:shadow-md transition-all"
              >
                <div className="relative size-20 rounded-xl overflow-hidden shrink-0">
                  <Image
                    src={rel.image}
                    alt={rel.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="flex-1">
                  <span className="text-[10px] font-extrabold text-[#7FA05C] uppercase tracking-wider block mb-1">
                    {rel.category}
                  </span>
                  <h4 className="font-heading font-bold text-xs text-[#2D4A34] group-hover:text-[#7FA05C] transition-colors line-clamp-2 leading-snug">
                    {rel.title}
                  </h4>
                  <span className="text-[10px] text-[#7C8A96] mt-2 block">
                    {rel.readTime} · {rel.date}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <AgencyFooter />
    </div>
  );
}
