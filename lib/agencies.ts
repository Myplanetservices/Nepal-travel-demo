export interface AgencyConfig {
  slug: string;
  name: string;
  city: string;
  phone: string;
  email: string;
  regNumber: string;
  primaryColor: string;
  tagline: string;
  establishedYear: number;
  flagshipTrek: {
    title: string;
    duration: string;
    altitude: string;
    priceUSD: number;
    description: string;
    difficulty: "Moderate" | "Challenging" | "Strenuous";
  };
  clientOwnerName: string;
  customOutreachPitch: string;
}

export const PRESET_AGENCIES: Record<string, AgencyConfig> = {
  "seven-star-international": {
    slug: "seven-star-international",
    name: "Seven Star International Travel & Tours",
    city: "Thamel, Kathmandu",
    phone: "+977 9851012345",
    email: "info@sevenstartravels.example",
    regNumber: "38910/065/066",
    primaryColor: "#2D4A34",
    tagline: "Premier High-Altitude Expeditions & Himalayan Safaris",
    establishedYear: 2012,
    flagshipTrek: {
      title: "Everest Base Camp & Gokyo Lakes Luxury Odyssey",
      duration: "15 Days",
      altitude: "5,364m (EBC) / 5,357m (Gokyo Ri)",
      priceUSD: 1450,
      description: "Direct Sherpa-guided trek via Cho La Pass with private helicopter return option to Kathmandu.",
      difficulty: "Challenging",
    },
    clientOwnerName: "Agency Director",
    customOutreachPitch:
      "We analyzed Seven Star's Google listing and noted you get high-intent inquiries that drop off due to manual WhatsApp replies. This custom prototype adds instant online booking and 3D altitude previews.",
  },
  "himalayan-glacier": {
    slug: "himalayan-glacier",
    name: "Himalayan Glacier Trekking & Tours",
    city: "Lazimpat, Kathmandu",
    phone: "+977 9841234567",
    email: "tours@himalayanglacier.example",
    regNumber: "51203/067/068",
    primaryColor: "#3E7C94",
    tagline: "Eco-Conscious Mountain Guiding & Cultural Explorations",
    establishedYear: 2008,
    flagshipTrek: {
      title: "Annapurna Sanctuary & Poon Hill Golden Panorama",
      duration: "11 Days",
      altitude: "4,130m (Annapurna Base Camp)",
      priceUSD: 940,
      description: "Trek through sacred Gurung villages into the deep natural amphitheater of the 8,000m Annapurna range.",
      difficulty: "Moderate",
    },
    clientOwnerName: "Managing Team",
    customOutreachPitch:
      "Designed specifically to showcase Himalayan Glacier's eco-tourism credentials, automatic permit calculations, and direct international card checkout.",
  },
  "ace-the-himalaya": {
    slug: "ace-the-himalaya",
    name: "Ace Mountain Journeys & Expeditions",
    city: "Thamel, Kathmandu",
    phone: "+977 9801122334",
    email: "expeditions@acemountain.example",
    regNumber: "42019/064/065",
    primaryColor: "#2D4A34",
    tagline: "100% Sherpa Guided Extreme Alpine Adventures",
    establishedYear: 2010,
    flagshipTrek: {
      title: "Manaslu Circuit & Tsum Valley Sacred Heritage",
      duration: "16 Days",
      altitude: "5,160m (Larkya La Pass)",
      priceUSD: 1280,
      description: "Off-the-beaten-path restricted area trekking beneath the world's eighth-highest peak.",
      difficulty: "Strenuous",
    },
    clientOwnerName: "Operations Director",
    customOutreachPitch:
      "This personalized interactive preview features automatic restricted-area permit processing, medical checklists, and multi-currency deposits.",
  },
  "nepal-eco-adventure": {
    slug: "nepal-eco-adventure",
    name: "Nepal Eco Adventure Outfitters",
    city: "Lakeside, Pokhara",
    phone: "+977 61 465555",
    email: "contact@nepalecoadventure.example",
    regNumber: "63210/069/070",
    primaryColor: "#7FA05C",
    tagline: "Sustainable Community-Based Treks in Western Nepal",
    establishedYear: 2014,
    flagshipTrek: {
      title: "Mardi Himal & Upper Mustang Hidden Trails",
      duration: "10 Days",
      altitude: "4,500m (Mardi Viewpoint)",
      priceUSD: 850,
      description: "Direct departures from Lakeside Pokhara with organic farm teahouse stays and wilderness Sherpa guides.",
      difficulty: "Moderate",
    },
    clientOwnerName: "Lead Guide & Founder",
    customOutreachPitch:
      "Engineered to convert travelers visiting Lakeside Pokhara into confirmed bookings on their mobile phones without OTA fees.",
  },
};

/**
 * Returns agency configuration by slug, or dynamically generates one if the slug is unknown.
 */
export function getAgencyBySlug(rawSlug: string): AgencyConfig {
  const normalizedSlug = rawSlug.toLowerCase().trim();

  if (PRESET_AGENCIES[normalizedSlug]) {
    return PRESET_AGENCIES[normalizedSlug];
  }

  // Generate dynamic human-readable agency name from slug
  const cleanName = normalizedSlug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    slug: normalizedSlug,
    name: cleanName || "Nepal Adventure Treks",
    city: "Kathmandu & Pokhara, Nepal",
    phone: "+977 980-000-0000",
    email: `contact@${normalizedSlug || "nepaltreks"}.com`,
    regNumber: "Govt Reg. #74291/TAAN",
    primaryColor: "#2D4A34",
    tagline: "Licensed Himalayan Guides & High Altitude Outfitters",
    establishedYear: 2015,
    flagshipTrek: {
      title: "Classic Himalayan Highlights & Base Camp Trek",
      duration: "12 Days",
      altitude: "4,800m Altitude",
      priceUSD: 980,
      description: "Customized itinerary featuring private Sherpa guidance, conservation permits, and full lodge accommodations.",
      difficulty: "Moderate",
    },
    clientOwnerName: "Agency Director",
    customOutreachPitch: `This personalized preview was generated exclusively for ${cleanName} by My Planet Services to demonstrate direct online bookings and 3D visual storytelling.`,
  };
}
