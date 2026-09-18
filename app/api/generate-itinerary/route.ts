import { NextRequest, NextResponse } from "next/server";
import { DEMO_PACKAGES } from "@/lib/demo-agency-data";

export interface ActivityItem {
  id: string;
  time: "Morning" | "Afternoon" | "Evening";
  title: string;
  description: string;
  category: "Trek" | "Culture" | "Acclimatization" | "Culinary" | "Logistics" | "Scenic";
  estimatedCost: number;
}

export interface DayItinerary {
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

export interface GeneratedItineraryResponse {
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

// Activity swap alternatives repository by category & region
const SWAP_ALTERNATIVES: Record<string, { title: string; description: string; category: ActivityItem["category"]; costDiff: number }[]> = {
  Acclimatization: [
    {
      title: "Hike to Panoramic Ridge & Sherpa Memorial",
      description: "Gain 350m of elevation to trigger red blood cell production, taking in 360-degree vistas before descending to sleep low.",
      category: "Acclimatization",
      costDiff: 0,
    },
    {
      title: "Visit Monastic Library & Butter Lamp Offering",
      description: "Quiet contemplative walk to the local gompa. Join resident lamas for chanting and receive an altitude blessing scarf.",
      category: "Culture",
      costDiff: 10,
    },
    {
      title: "Sherpa Artisan Weaving & Local Tea Tasting",
      description: "Meet local yak-wool artisans and learn traditional spinning while sampling butter tea (Po Cha) and roasted tsampa.",
      category: "Culinary",
      costDiff: 15,
    },
  ],
  Trek: [
    {
      title: "Scenic High Ridge Bypass Trail",
      description: "Take the less-traveled high contour trail offering dramatic hanging valley views and fewer trekking groups.",
      category: "Scenic",
      costDiff: 0,
    },
    {
      title: "Forest Riverbed Walk with Birding Spotter",
      description: "Descend into the pine and rhododendron gorge listening for Himalayan monal pheasants and cascading glacial streams.",
      category: "Trek",
      costDiff: 0,
    },
    {
      title: "Paced Push with Trekking Poles Technique Session",
      description: "Practice rhythmic mountain pacing led by your Sherpa sirdar to maximize stamina over steep boulder switchbacks.",
      category: "Trek",
      costDiff: 0,
    },
  ],
  Culture: [
    {
      title: "Ancient Mani Wall & Chorten Circumambulation",
      description: "Walk clockwise around historical carved prayer stone walls, learning Tibetan Buddhist inscriptions and local lore.",
      category: "Culture",
      costDiff: 0,
    },
    {
      title: "Traditional Sherpa Kitchen Cooking Demonstration",
      description: "Step into a family lodge kitchen to hand-roll Tibetan momos and simmer spiced Sherpa stew (Shyakpa).",
      category: "Culinary",
      costDiff: 20,
    },
    {
      title: "Local Mountaineering History Archive Visit",
      description: "Explore vintage expedition gear, historic black-and-white summit photographs, and summit certificates.",
      category: "Culture",
      costDiff: 8,
    },
  ],
  Scenic: [
    {
      title: "Sunrise Golden Hour Photography Summit",
      description: "Early alpine dawn stroll to catch the first crimson alpenglow striking the 8,000m ice ramparts.",
      category: "Scenic",
      costDiff: 0,
    },
    {
      title: "Glacial Lake Moraine Viewpoint Stroll",
      description: "Hike along the lateral moraine to gaze over turquoise meltwater lakes fed by tumbling hanging seracs.",
      category: "Scenic",
      costDiff: 0,
    },
    {
      title: "Sunset Stargazing & Milky Way Photography",
      description: "Wrap up in down gear after dusk to observe the crystal-clear Himalayan night sky free of light pollution.",
      category: "Scenic",
      costDiff: 0,
    },
  ],
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. Handle Swap Activity Action
    if (body.action === "swap-activity") {
      const { category, currentTitle } = body;
      const key = (category && SWAP_ALTERNATIVES[category]) ? category : "Acclimatization";
      const pool = SWAP_ALTERNATIVES[key].filter((alt) => alt.title !== currentTitle);

      const picked = pool.length > 0
        ? pool[Math.floor(Math.random() * pool.length)]
        : SWAP_ALTERNATIVES.Culture[0];

      return NextResponse.json({
        success: true,
        activity: {
          id: `swapped-${Date.now()}`,
          time: body.time || "Afternoon",
          title: picked.title,
          description: picked.description,
          category: picked.category,
          estimatedCost: Math.max(0, (body.baseCost || 15) + picked.costDiff),
        },
      });
    }

    // 2. Main Itinerary Generation
    const destination = (body.destination || "Everest Base Camp").trim();
    const durationDays = Math.min(25, Math.max(4, parseInt(body.tripLength) || 12));
    const budgetTier = (body.budgetTier || "mid") as "budget" | "mid" | "luxury";
    const travelStyles = Array.isArray(body.travelStyles) && body.travelStyles.length > 0
      ? body.travelStyles
      : ["High Altitude Trekking", "Sherpa Homestays"];
    const groupSize = body.groupSize || "Solo Trekker";
    const travelDates = body.travelDates || "October 2026 (Peak Autumn)";

    // Match against real DEMO_PACKAGES
    const matchedPkg = DEMO_PACKAGES.find((pkg) => {
      const pTitle = pkg.title.toLowerCase();
      const pSlug = pkg.slug.toLowerCase();
      const pRegion = pkg.region.toLowerCase();
      const destLower = destination.toLowerCase();
      return pTitle.includes(destLower) || pSlug.includes(destLower) || pRegion.includes(destLower) || destLower.includes(pRegion);
    }) || DEMO_PACKAGES[0]; // fallback to Everest if no match

    // Calculate realistic pricing based on budget tier and duration
    let dailyRate = 95;
    if (budgetTier === "budget") dailyRate = 75;
    if (budgetTier === "mid") dailyRate = 145;
    if (budgetTier === "luxury") dailyRate = 320;

    // Apply group size factor
    let groupFactor = 1.0;
    if (groupSize.includes("Solo")) groupFactor = 1.15;
    if (groupSize.includes("Group") || groupSize.includes("3-6")) groupFactor = 0.90;
    if (groupSize.includes("Expedition") || groupSize.includes("7+")) groupFactor = 0.82;

    const estimatedCostPerPerson = Math.round(dailyRate * durationDays * groupFactor);
    const totalEstimatedCost = estimatedCostPerPerson;

    // Cost breakdown percentages
    const permitsAndFees = Math.round(estimatedCostPerPerson * 0.15);
    const guideAndPorters = Math.round(estimatedCostPerPerson * 0.30);
    const accommodation = Math.round(estimatedCostPerPerson * 0.25);
    const mealsAndWater = Math.round(estimatedCostPerPerson * 0.20);
    const transportAndLogistics = estimatedCostPerPerson - (permitsAndFees + guideAndPorters + accommodation + mealsAndWater);

    // Build day-by-day itinerary
    const days: DayItinerary[] = [];
    const sourceItinerary = matchedPkg.itinerary || [];

    for (let d = 1; d <= durationDays; d++) {
      let sourceDay = sourceItinerary[d - 1];

      // If requested duration is longer than source itinerary, synthesize rest/acclimatization/side days
      if (!sourceDay) {
        if (d === durationDays) {
          sourceDay = {
            day: d,
            title: `Final Farewell & Departure from Kathmandu`,
            altitude: "1,400m",
            distance: "Airport Transfer",
            duration: "30 mins",
            description: "Final souvenir shopping in Thamel, packing, and transfer to Tribhuvan International Airport for flight home.",
          };
        } else {
          sourceDay = {
            day: d,
            title: `Side Exploration & Alpine Acclimatization Day`,
            altitude: "3,850m",
            distance: "6 km",
            duration: "4 hours",
            description: "Flexible exploration day visiting high ridgelines, glacial viewpoints, and historic Himalayan monasteries.",
          };
        }
      }

      // Accommodation according to budget tier
      let accDesc = "Clean Family-run Teahouse with Shared Mountain-view Facilities";
      if (budgetTier === "mid") {
        accDesc = "Comfort Teahouse with Attached Bathroom & Solar Hot Shower";
      } else if (budgetTier === "luxury") {
        accDesc = "Yeti Mountain Home / Heritage Luxury Lodge with Heating & Heated Beds";
      }

      // Daily activities
      const morningAct: ActivityItem = {
        id: `act-${d}-1`,
        time: "Morning",
        title: d === 1
          ? "Arrival, Permit Verification & Gear Check"
          : `Trek Ascent towards ${sourceDay.title.split(":")[1]?.trim() || sourceDay.title}`,
        description: d === 1
          ? "Meet your Sherpa team, verify local conservation permits, and double-check high-altitude layers."
          : `Early morning start following mountain switchbacks with optimal weather clarity and mountain visibility.`,
        category: d === 1 ? "Logistics" : "Trek",
        estimatedCost: Math.round(dailyRate * 0.4),
      };

      const afternoonAct: ActivityItem = {
        id: `act-${d}-2`,
        time: "Afternoon",
        title: sourceDay.title.toLowerCase().includes("acclimatization")
          ? "Panoramic Ridge Hike & Altitude Calibration"
          : `Arrive at Lodge & Explore Local Settlement (${sourceDay.altitude})`,
        description: `Check into ${accDesc.split("with")[0].trim()}. Settle in with hot lemon ginger honey tea and rest legs.`,
        category: sourceDay.title.toLowerCase().includes("acclimatization") ? "Acclimatization" : "Scenic",
        estimatedCost: Math.round(dailyRate * 0.35),
      };

      const eveningAct: ActivityItem = {
        id: `act-${d}-3`,
        time: "Evening",
        title: "Communal Stove Dining & Next-Day Route Briefing",
        description: "Gather around the central wood-fired stove for hearty organic Sherpa dahl bhat, route maps review, and pulse oximeter check.",
        category: "Culinary",
        estimatedCost: Math.round(dailyRate * 0.25),
      };

      days.push({
        day: d,
        title: sourceDay.title,
        altitude: sourceDay.altitude || "3,200m",
        distance: sourceDay.distance || "8-11 km",
        walkingTime: sourceDay.duration || "5-6 hours",
        accommodation: accDesc,
        meals: "Breakfast, Lunch & Dinner Included",
        dailyBudgetEstimate: Math.round(dailyRate * groupFactor),
        activities: [morningAct, afternoonAct, eveningAct],
      });
    }

    const permitsRequired = [
      "TIMS Card (Trekkers' Information Management System)",
      matchedPkg.region === "Everest"
        ? "Sagarmatha National Park Permit & Khumbu Pasang Lhamu Entry Fee"
        : matchedPkg.region === "Annapurna"
        ? "Annapurna Conservation Area Permit (ACAP)"
        : matchedPkg.region === "Mustang"
        ? "Upper Mustang Restricted Area Permit (RAP)"
        : "Local Himalayan Conservation & Sanctuary Permit",
    ];

    const itineraryResponse: GeneratedItineraryResponse = {
      id: `itinerary-${Date.now()}`,
      tripTitle: `${durationDays}-Day Custom ${destination} Alpine Odyssey`,
      overview: `A meticulously balanced, altitude-graduated expedition designed for ${groupSize.toLowerCase()} travelers, calibrated for ${budgetTier} comfort and featuring verified Sherpa leadership across ${matchedPkg.region || destination}.`,
      destination: destination,
      durationDays: durationDays,
      budgetTier: budgetTier,
      travelStyles: travelStyles,
      groupSize: groupSize,
      travelDates: travelDates,
      fitnessRequirement: matchedPkg.difficulty || "Moderate to High",
      recommendedSeason: matchedPkg.bestSeason || "March - May & September - November",
      estimatedCostPerPerson: estimatedCostPerPerson,
      totalEstimatedCost: totalEstimatedCost,
      currency: "USD",
      matchedPackageSlug: matchedPkg.slug,
      altitudeProfile: {
        maxAltitude: matchedPkg.altitude || "5,364m",
        acclimatizationDays: Math.max(1, Math.floor(durationDays / 5)),
        altitudeWarning: "Includes mandatory rest days ensuring acclimatization compliance under UIAA high-altitude medical protocols.",
      },
      permitsRequired: permitsRequired,
      costBreakdown: {
        permitsAndFees,
        guideAndPorters,
        accommodation,
        mealsAndWater,
        transportAndLogistics,
      },
      days: days,
    };

    return NextResponse.json({
      success: true,
      itinerary: itineraryResponse,
    });
  } catch (error: any) {
    console.error("Failed to generate itinerary:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to generate customized itinerary" },
      { status: 500 }
    );
  }
}
