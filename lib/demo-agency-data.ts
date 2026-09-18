export interface ItineraryDay {
  day: number;
  title: string;
  altitude: string;
  distance: string;
  duration: string;
  description: string;
}

export interface TrekPackage {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  destination: "Nepal" | "Bhutan" | "Tibet";
  region: "Everest" | "Annapurna" | "Langtang" | "Manaslu" | "Mustang" | "Bhutan" | "Tibet";
  activity: "Trekking" | "Tour" | "Peak Climbing";
  duration: string;
  durationDays: number;
  altitude: string;
  difficulty: "Easy" | "Moderate" | "Challenging" | "Strenuous";
  priceUSD: number;
  originalPriceUSD: number;
  discountPercent: number;
  rating: number;
  reviewsCount: number;
  bestSeason: string;
  groupSize: string;
  accommodation: string;
  meals: string;
  featured: boolean;
  bestSeller: boolean;
  heroImage: string;
  galleryImages: string[];
  description: string;
  itinerary: ItineraryDay[];
  includes: string[];
  excludes: string[];
  tierPricing: { pax: string; pricePerPerson: number }[];
  departures: { date: string; status: "Available" | "Guaranteed" | "Filling Fast" }[];
  faqs: { question: string; answer: string }[];
}

export interface DestinationRegion {
  id: string;
  name: string;
  country: string;
  badge: string;
  packageCount: number;
  startingPriceUSD: number;
  image: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  country: string;
  avatar: string;
  trip: string;
  rating: number;
  date: string;
  source: "TripAdvisor" | "Google" | "Trustpilot";
  text: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  image: string;
  excerpt: string;
}

export const CURRENCY_RATES = {
  USD: { symbol: "$", rate: 1, name: "US Dollar" },
  EUR: { symbol: "€", rate: 0.92, name: "Euro" },
  GBP: { symbol: "£", rate: 0.79, name: "British Pound" },
  NPR: { symbol: "रू", rate: 134, name: "Nepalese Rupee" },
  AUD: { symbol: "A$", rate: 1.52, name: "Australian Dollar" },
};

export const DEMO_PACKAGES: TrekPackage[] = [
  {
    id: "everest-base-camp-trek",
    slug: "everest-base-camp-trek",
    title: "Everest Base Camp Trek & Kala Patthar",
    subtitle: "The quintessential Himalayan adventure standing face-to-face with the roof of the world.",
    destination: "Nepal",
    region: "Everest",
    activity: "Trekking",
    duration: "14 Days",
    durationDays: 14,
    altitude: "5,550m (Kala Patthar)",
    difficulty: "Challenging",
    priceUSD: 1340,
    originalPriceUSD: 1490,
    discountPercent: 10,
    rating: 4.9,
    reviewsCount: 342,
    bestSeason: "Mar - May & Sep - Dec",
    groupSize: "1 to 14 travelers",
    accommodation: "Tea House Lodges & Mountain Inns",
    meals: "All Breakfasts, Lunches & Dinners",
    featured: true,
    bestSeller: true,
    heroImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1600&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop",
    ],
    description:
      "Stand at the foot of Mt. Everest (8,848.86m), the highest peak on Earth. Trek through iconic Sherpa villages, ancient Buddhist monasteries of Tengboche, across suspension bridges adorned with prayer flags, and up to Kala Patthar for the most dramatic sunrise over Everest, Lhotse, and Nuptse.",
    itinerary: [
      {
        day: 1,
        title: "Scenic Flight Kathmandu to Lukla (2,840m) & Trek to Phakding",
        altitude: "2,610m",
        distance: "8 km",
        duration: "3 - 4 hrs",
        description: "Thrilling mountain flight to Tenzing-Hillary Airport at Lukla. Meet your Sherpa support crew and descend along the Dudh Koshi riverbank to Phakding village.",
      },
      {
        day: 2,
        title: "Trek Phakding to Namche Bazaar via Hillary Suspension Bridge",
        altitude: "3,440m",
        distance: "11 km",
        duration: "5 - 6 hrs",
        description: "Cross five high suspension bridges draped in colorful prayer flags. Ascend the steep pine-scented trail into Sagarmatha National Park, reaching the vibrant amphitheater of Namche Bazaar.",
      },
      {
        day: 3,
        title: "Acclimatization Day in Namche Bazaar (Everest View Hotel Hike)",
        altitude: "3,880m",
        distance: "5 km",
        duration: "3 - 4 hrs",
        description: "Hike up to the iconic Hotel Everest View for panoramic vistas of Everest, Ama Dablam, and Thamserku. Explore the Sherpa Culture Museum and local yak market.",
      },
      {
        day: 4,
        title: "Trek Namche Bazaar to Tengboche Monastery",
        altitude: "3,867m",
        distance: "10 km",
        duration: "5 - 6 hrs",
        description: "Follow the contour trail overlooking deep river valleys before descending to Phunki Tenga. Climb through rhododendron forests to Tengboche, home of the Khumbu region's largest spiritual monastery.",
      },
      {
        day: 5,
        title: "Tengboche to Dingboche Alpine Pastures",
        altitude: "4,410m",
        distance: "9 km",
        duration: "5 hrs",
        description: "Cross the Imja Khola river and trek past the ancient stone chortens of Pangboche. Transition into the alpine tundra where stone-walled fields shelter crops from biting mountain winds.",
      },
      {
        day: 6,
        title: "Second Acclimatization Hike to Nagarjun Hill",
        altitude: "5,100m",
        distance: "6 km",
        duration: "4 - 5 hrs",
        description: "Climb Nagarjun Peak (5,100m) for sweeping views of Makalu, Lhotse, and Island Peak. Rest in the afternoon to prepare your cardiovascular system for higher altitudes.",
      },
      {
        day: 7,
        title: "Dingboche to Lobuche via Thokla Pass Memorials",
        altitude: "4,940m",
        distance: "8 km",
        duration: "5 - 6 hrs",
        description: "Ascend the moraine of the Khumbu Glacier. Pause at the emotional Everest Climbers Memorial on Thokla Pass before continuing alongside lateral moraines to Lobuche.",
      },
      {
        day: 8,
        title: "Lobuche to Gorak Shep & Trek to Everest Base Camp (5,364m)",
        altitude: "5,364m",
        distance: "13 km",
        duration: "7 - 8 hrs",
        description: "Hike across rocky glacier paths to Gorak Shep. Drop heavy packs and push forward to Everest Base Camp. Stand on the Khumbu Icefall surrounded by towering Himalayan spires.",
      },
      {
        day: 9,
        title: "Sunrise Summit of Kala Patthar (5,550m) & Descend to Pheriche",
        altitude: "5,550m",
        distance: "14 km",
        duration: "7 - 8 hrs",
        description: "Pre-dawn headlamp climb to Kala Patthar for the legendary gold-and-pink sunrise over Mt. Everest's summit pyramid. Descend back down through Gorak Shep to Pheriche valley.",
      },
      {
        day: 10,
        title: "Pheriche to Namche Bazaar",
        altitude: "3,440m",
        distance: "15 km",
        duration: "6 - 7 hrs",
        description: "Breathe in richer, oxygen-dense air as you trek downward past Pangboche and Tengboche back to the comforts, bakeries, and hot showers of Namche.",
      },
      {
        day: 11,
        title: "Namche Bazaar to Lukla via Dudh Koshi Trail",
        altitude: "2,840m",
        distance: "19 km",
        duration: "6 - 7 hrs",
        description: "Final trekking day descending steep valleys and crossing the river back to Lukla. Celebrate the epic accomplishment with your Sherpa guides and team.",
      },
      {
        day: 12,
        title: "Fly Lukla to Kathmandu & Transfer to Hotel",
        altitude: "1,400m",
        distance: "Flight",
        duration: "35 mins",
        description: "Morning mountain flight back to Kathmandu. Private transfer to your hotel with an afternoon free for Thamel shopping or rest.",
      },
      {
        day: 13,
        title: "Contingency / Kathmandu Cultural Heritage Tour",
        altitude: "1,400m",
        distance: "City",
        duration: "Flexible",
        description: "Buffer day for Lukla flight weather delays. Guided exploration of Swayambhunath (Monkey Temple) and Pashupatinath temple complex.",
      },
      {
        day: 14,
        title: "Final Departure from Tribhuvan International Airport",
        altitude: "1,400m",
        distance: "Airport",
        duration: "Transfer",
        description: "Private airport vehicle transfer for your onward international flight with unforgettable Himalayan memories.",
      },
    ],
    includes: [
      "Both way Lukla flights (Kathmandu/Ramechhap - Lukla - Kathmandu) including airport taxes",
      "Sagarmatha National Park Entry Permit & Khumbu Pasang Lhamu Rural Municipality Tax",
      "Government-licensed English-speaking Sherpa Mountain Guide & 1 porter for every 2 trekkers",
      "All teahouse lodge accommodations with twin-sharing rooms",
      "3 daily nutritious meals (Breakfast, Lunch, Dinner) with hot tea/coffee",
      "Medical pulse oximeter for daily blood oxygen monitoring & high-altitude first aid kit",
      "Airport pickup and drop-off in private tourist vehicles",
      "Staff salary, insurance, food, lodging, and high-altitude gear",
    ],
    excludes: [
      "International flights to/from Nepal & Nepal Entry Visa fee ($30 for 15 days, $50 for 30 days)",
      "Travel & high-altitude medical emergency rescue evacuation insurance (mandatory up to 6,000m)",
      "Personal expenses (hot showers at tea houses, Wi-Fi, battery charging, mineral water/boiled water)",
      "Tipping for Sherpa guides and porters (recommended $10-$15/day)",
    ],
    tierPricing: [
      { pax: "1 Person (Solo Traveler)", pricePerPerson: 1490 },
      { pax: "2 - 3 Persons", pricePerPerson: 1340 },
      { pax: "4 - 7 Persons", pricePerPerson: 1240 },
      { pax: "8 - 14 Persons (Group)", pricePerPerson: 1150 },
    ],
    departures: [
      { date: "Oct 05, 2026 - Oct 18, 2026", status: "Guaranteed" },
      { date: "Oct 18, 2026 - Oct 31, 2026", status: "Filling Fast" },
      { date: "Nov 02, 2026 - Nov 15, 2026", status: "Available" },
      { date: "Nov 15, 2026 - Nov 28, 2026", status: "Guaranteed" },
      { date: "Mar 10, 2027 - Mar 23, 2027", status: "Available" },
      { date: "Apr 04, 2027 - Apr 17, 2027", status: "Filling Fast" },
    ],
    faqs: [
      {
        question: "How physically fit do I need to be for Everest Base Camp?",
        answer:
          "You do not need prior mountaineering experience, but a solid base of cardiovascular fitness (running, stair-climbing, brisk hiking 3-4 times a week for 2 months prior) is strongly recommended as you will hike 5 to 7 hours daily at high altitudes.",
      },
      {
        question: "What happens if I get altitude sickness (AMS)?",
        answer:
          "Our itineraries include two dedicated acclimatization days in Namche Bazaar and Dingboche. Your certified guide conducts daily oximeter saturation checks. In serious situations, we immediately descend or coordinate helicopter rescue covered by your travel insurance.",
      },
      {
        question: "Can I charge my phone and access Wi-Fi on the trail?",
        answer:
          "Yes, most teahouses have solar or generator electricity charging stations ($2-$5 per device) and AirJaldi or EverestLink Wi-Fi cards available for purchase along the entire route.",
      },
    ],
  },
  {
    id: "annapurna-circuit-trek",
    slug: "annapurna-circuit-trek",
    title: "Annapurna Circuit Trek via Thorong La Pass",
    subtitle: "The world's most diverse bioclimatic mountain traverse crossing the mighty 5,416m Thorong La pass.",
    destination: "Nepal",
    region: "Annapurna",
    activity: "Trekking",
    duration: "14 Days",
    durationDays: 14,
    altitude: "5,416m (Thorong La Pass)",
    difficulty: "Challenging",
    priceUSD: 1150,
    originalPriceUSD: 1280,
    discountPercent: 10,
    rating: 4.9,
    reviewsCount: 228,
    bestSeason: "Mar - May & Oct - Dec",
    groupSize: "1 to 12 travelers",
    accommodation: "Traditional Mountain Teahouses",
    meals: "Full Board (3 Meals/day + Tea)",
    featured: true,
    bestSeller: true,
    heroImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1600&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop",
    ],
    description:
      "A legendary trans-Himalayan crossing that journeys from lush subtropical rice terraces through dense pine forests to the high, arid Tibetan plateau of Manang and Mustang. Crowned by crossing the world's highest navigable trekking pass: Thorong La (5,416m).",
    itinerary: [
      { day: 1, title: "Drive Kathmandu to Besisahar & Dharapani (1,900m)", altitude: "1,900m", distance: "180 km", duration: "7 - 8 hrs drive", description: "Scenic overland journey along Trishuli and Marsyangdi rivers to the trek gateway." },
      { day: 2, title: "Trek Dharapani to Chame via Apple Orchards", altitude: "2,670m", distance: "15 km", duration: "5 - 6 hrs", description: "Climb through pine and fir forests with spectacular views of Lamjung Himal and Annapurna II." },
      { day: 3, title: "Chame to Upper Pisang & dramatic Paungda Danda rock face", altitude: "3,200m", distance: "14 km", duration: "5 hrs", description: "Pass the curved 1,500m rock face known as the 'Gateway to Heaven' into Tibetan Buddhist country." },
      { day: 4, title: "Upper Pisang to Manang via high scenic Ghyaru route", altitude: "3,540m", distance: "17 km", duration: "6 - 7 hrs", description: "Breathtaking balcony trail offering direct panoramic vistas across the entire Annapurna massif." },
      { day: 5, title: "Acclimatization Day in Manang (Ice Lake / Gangapurna hike)", altitude: "4,600m", distance: "7 km", duration: "4 - 5 hrs", description: "Hike to turquoise Gangapurna glacier lake or the strenuous Ice Lake viewpoint." },
      { day: 6, title: "Manang to Yak Kharka Alpine Pasture", altitude: "4,050m", distance: "10 km", duration: "4 hrs", description: "Gentle climb past juniper shrubs where blue sheep and Himalayan yaks graze." },
      { day: 7, title: "Yak Kharka to Thorong Phedi Base Camp", altitude: "4,450m", distance: "7 km", duration: "3 - 4 hrs", description: "Short trek to the base camp under the steep shale walls of Thorong La." },
      { day: 8, title: "Cross Thorong La Pass (5,416m) to Muktinath Temple", altitude: "5,416m", distance: "16 km", duration: "8 - 9 hrs", description: "Early 4:00 AM start to conquer Thorong La before strong afternoon winds. Descend to the sacred pilgrimage oasis of Muktinath." },
      { day: 9, title: "Muktinath to Jomsom & Marpha Apple Capital", altitude: "2,720m", distance: "18 km", duration: "5 - 6 hrs", description: "Walk through the wind-carved Kali Gandaki Gorge to stone-paved streets of Marpha." },
      { day: 10, title: "Scenic Flight Jomsom to Pokhara & Rest at Lakeside", altitude: "820m", distance: "Flight", duration: "25 mins", description: "Stunning flight between Annapurna and Dhaulagiri mountain giants to tropical Pokhara." },
      { day: 11, title: "Drive Pokhara to Kathmandu in Tourist Coach", altitude: "1,400m", distance: "200 km", duration: "6 - 7 hrs", description: "Return drive across lush mid-hills to Kathmandu, or optional 25-minute flight." },
      { day: 12, title: "Kathmandu Valley Sightseeing & Farewell Dinner", altitude: "1,400m", distance: "City", duration: "Full Day", description: "Explore Patan Durbar Square and celebrate with traditional Nepali thali and folk dance." },
      { day: 13, title: "Buffer Day / Free Time in Thamel", altitude: "1,400m", distance: "Flexible", duration: "Self-guided", description: "Time for souvenir shopping, spa massage, or visiting local handicraft centers." },
      { day: 14, title: "Departure from Kathmandu", altitude: "1,400m", distance: "Airport", duration: "Transfer", description: "Private airport transfer for your departure flight." },
    ],
    includes: [
      "ACAP (Annapurna Conservation Area Permit) & TIMS Trekkers Card",
      "Government-registered English-speaking trekking guide & support porters",
      "All teahouse stays along the circuit with comfortable twin rooms",
      "3 meals daily during the trek + seasonal fresh fruits",
      "Domestic flight from Jomsom to Pokhara",
      "Tourist coach transfer Kathmandu - Pokhara - Kathmandu",
      "High-altitude first aid kit & oximeter testing twice daily",
    ],
    excludes: [
      "International flights & Nepal tourist visa",
      "Hot showers, Wi-Fi, and electronic battery charging in lodges",
      "Personal trekking gear (sleeping bag, down jacket - available for rent in Kathmandu/Pokhara)",
      "Tips for guides and porters",
    ],
    tierPricing: [
      { pax: "1 Person (Solo)", pricePerPerson: 1280 },
      { pax: "2 - 3 Persons", pricePerPerson: 1150 },
      { pax: "4 - 7 Persons", pricePerPerson: 1060 },
      { pax: "8+ Persons", pricePerPerson: 980 },
    ],
    departures: [
      { date: "Oct 10, 2026 - Oct 23, 2026", status: "Guaranteed" },
      { date: "Oct 25, 2026 - Nov 07, 2026", status: "Filling Fast" },
      { date: "Nov 12, 2026 - Nov 25, 2026", status: "Available" },
      { date: "Mar 15, 2027 - Mar 28, 2027", status: "Available" },
      { date: "Apr 08, 2027 - Apr 21, 2027", status: "Guaranteed" },
    ],
    faqs: [
      {
        question: "Is the road construction ruining the Annapurna Circuit?",
        answer:
          "We utilize the newly opened NATT (Natural Annapurna Trekking Trail) alternative routes, which bypass the dirt road almost entirely, taking you through pristine villages, apple orchards, and high mountain ridgelines.",
      },
      {
        question: "What is the temperature at Thorong La Pass?",
        answer:
          "During early morning pass crossings in October/November and April, temperatures can dip between -10°C to -15°C with wind chill. Thermal base layers, fleece, windproof jacket, and insulated gloves are required.",
      },
    ],
  },
  {
    id: "annapurna-base-camp-trek",
    slug: "annapurna-base-camp-trek",
    title: "Annapurna Base Camp Sanctuary Trek",
    subtitle: "A 360-degree mountain amphitheater enveloped by snow-clad 7,000m and 8,000m peaks.",
    destination: "Nepal",
    region: "Annapurna",
    activity: "Trekking",
    duration: "10 Days",
    durationDays: 10,
    altitude: "4,130m (ABC Sanctuary)",
    difficulty: "Moderate",
    priceUSD: 890,
    originalPriceUSD: 990,
    discountPercent: 10,
    rating: 5.0,
    reviewsCount: 214,
    bestSeason: "Feb - May & Sep - Dec",
    groupSize: "1 to 14 travelers",
    accommodation: "Cozy Mountain Lodges",
    meals: "Full Board (3 Meals/day)",
    featured: true,
    bestSeller: true,
    heroImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1600&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop",
    ],
    description:
      "Trek through rhododendron forests, Gurung terraced hamlets, and up the dramatic Modi Khola canyon directly into the sacred mountain bowl of Annapurna Sanctuary. Wake up surrounded by Annapurna I (8,091m), Machhapuchhre (Fishtail), Annapurna South, and Hiunchuli.",
    itinerary: [
      { day: 1, title: "Drive Pokhara to Nayapul & Trek to Tikhedhunga", altitude: "1,540m", distance: "9 km", duration: "4 hrs", description: "Short drive to trailhead and easy walk along riverbanks to stone village of Tikhedhunga." },
      { day: 2, title: "Tikhedhunga to Ghorepani via the Ulleri stone stairs", altitude: "2,860m", distance: "12 km", duration: "5 - 6 hrs", description: "Climb the famous 3,200 stone steps of Ulleri into enchanted rhododendron and oak woods." },
      { day: 3, title: "Poon Hill Sunrise (3,210m) & Trek to Tadapani", altitude: "2,630m", distance: "11 km", duration: "5 hrs", description: "Pre-dawn climb to Poon Hill for sunrise over Dhaulagiri and Annapurna ranges, then onward through mossy forests to Tadapani." },
      { day: 4, title: "Tadapani to Chhomrong Gurung village", altitude: "2,170m", distance: "9 km", duration: "4 - 5 hrs", description: "Descend to Kimrong Khola and ascend to the picturesque tiered village of Chhomrong." },
      { day: 5, title: "Chhomrong to Dovan / Bamboo forest", altitude: "2,600m", distance: "10 km", duration: "5 hrs", description: "Descend stone steps to Chhomrong Khola and enter the deep, lush Modi river gorge." },
      { day: 6, title: "Dovan to Machhapuchhre Base Camp (MBC)", altitude: "3,700m", distance: "11 km", duration: "5 - 6 hrs", description: "Climb past Deurali canyon above the tree line into high alpine tundra beneath sacred Fishtail peak." },
      { day: 7, title: "MBC to Annapurna Base Camp (4,130m) & Golden Sunrise", altitude: "4,130m", distance: "4 km", duration: "2 - 3 hrs", description: "Early walk into the heart of the Sanctuary. Stand surrounded by a sheer 360-degree wall of icy peaks." },
      { day: 8, title: "ABC descend to Bamboo / Sinuwa", altitude: "2,340m", distance: "14 km", duration: "6 hrs", description: "Long, scenic descent down the canyon enjoying rich oxygen and valley views." },
      { day: 9, title: "Bamboo to Jhinu Danda Hot Springs", altitude: "1,780m", distance: "8 km", duration: "4 hrs", description: "Trek to Jhinu Danda and soothe tired muscles in natural riverside thermal hot pools." },
      { day: 10, title: "Jhinu Danda to Siwai & Drive back to Pokhara", altitude: "820m", distance: "6 km + drive", duration: "3 hrs", description: "Cross Nepal's longest pedestrian suspension bridge and private jeep transfer back to Pokhara." },
    ],
    includes: [
      "ACAP and TIMS permits with paperwork processing",
      "Licensed mountain guide with comprehensive first aid certification",
      "Dedicated porters to carry luggage (1 porter for 2 guests)",
      "All teahouse accommodation and 3 meals/day during the trek",
      "Private vehicle transportation Pokhara - Trailhead - Pokhara",
      "Entry pass to Jhinu Danda natural riverside hot springs",
    ],
    excludes: [
      "International flights and Nepal entry visa",
      "Kathmandu-Pokhara transportation (flights or tourist coach available on request)",
      "Hot showers and electrical recharging at mountain lodges",
      "Guide and porter gratuities",
    ],
    tierPricing: [
      { pax: "1 Person", pricePerPerson: 990 },
      { pax: "2 - 3 Persons", pricePerPerson: 890 },
      { pax: "4 - 7 Persons", pricePerPerson: 810 },
      { pax: "8+ Persons", pricePerPerson: 750 },
    ],
    departures: [
      { date: "Oct 12, 2026 - Oct 21, 2026", status: "Guaranteed" },
      { date: "Oct 28, 2026 - Nov 06, 2026", status: "Available" },
      { date: "Nov 14, 2026 - Nov 23, 2026", status: "Filling Fast" },
      { date: "Mar 20, 2027 - Mar 29, 2027", status: "Available" },
    ],
    faqs: [
      {
        question: "Is Annapurna Base Camp easier than Everest Base Camp?",
        answer:
          "Yes. The maximum altitude is 4,130m (compared to 5,550m on Kala Patthar for EBC) and the trek duration is 10 days. However, ABC involves more stone stair climbs, so leg conditioning is beneficial.",
      },
    ],
  },
  {
    id: "manaslu-circuit-trek",
    slug: "manaslu-circuit-trek",
    title: "Manaslu Circuit Trek & Larkya La Pass",
    subtitle: "Untouched Tibetan cultural preservation encircling Mt. Manaslu (8,163m), the Mountain of the Spirit.",
    destination: "Nepal",
    region: "Manaslu",
    activity: "Trekking",
    duration: "14 Days",
    durationDays: 14,
    altitude: "5,106m (Larkya La Pass)",
    difficulty: "Challenging",
    priceUSD: 1280,
    originalPriceUSD: 1420,
    discountPercent: 10,
    rating: 4.9,
    reviewsCount: 168,
    bestSeason: "Mar - May & Sep - Nov",
    groupSize: "Minimum 2 travelers (Restricted Area)",
    accommodation: "Remote Authentic Tea Houses",
    meals: "3 Fresh Meals Daily",
    featured: true,
    bestSeller: false,
    heroImage: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop",
    ],
    description:
      "A raw, restricted-area wilderness trek encircling the world's 8th highest mountain. Untamed river gorges, ancient Tibetan gompas, and dramatic crossings over Larkya La (5,106m) with zero commercial crowds.",
    itinerary: [
      { day: 1, title: "Drive Kathmandu to Machha Khola (900m)", altitude: "900m", distance: "160 km", duration: "8 hrs jeep", description: "Off-road 4x4 mountain drive alongside the rushing Budhi Gandaki river." },
      { day: 2, title: "Machha Khola to Jagat (Restricted Area Checkpoint)", altitude: "1,410m", distance: "14 km", duration: "6 hrs", description: "Walk through hot springs at Tatopani and cross high cantilever suspension bridges." },
      { day: 3, title: "Jagat to Deng through bamboo canyons", altitude: "1,804m", distance: "16 km", duration: "6 - 7 hrs", description: "Enter deep pine forests and the first Buddhist mani prayer stones." },
      { day: 4, title: "Deng to Namrung Tibetan stone village", altitude: "2,630m", distance: "18 km", duration: "7 hrs", description: "Ascend past alpine waterfalls into upper Nubri valley where Tibetan traditions flourish." },
      { day: 5, title: "Namrung to Samagaon with Manaslu face views", altitude: "3,530m", distance: "15 km", duration: "5 - 6 hrs", description: "Spectacular plateau walk beneath Mt. Manaslu's double summits and Pungyen Gompa." },
      { day: 6, title: "Acclimatization Day in Samagaon (Birendra Tal hike)", altitude: "3,800m", distance: "6 km", duration: "4 hrs", description: "Hike to emerald Birendra glacial lake beneath the Manaslu glacier." },
      { day: 7, title: "Samagaon to Samdo near Tibetan border", altitude: "3,860m", distance: "9 km", duration: "4 hrs", description: "Short trek through yak pastures to the last inhabited border trading village." },
      { day: 8, title: "Samdo to Dharamsala / Larkya Phedi", altitude: "4,460m", distance: "7 km", duration: "4 hrs", description: "Climb past old trade routes to the rustic stone shelter before the pass." },
      { day: 9, title: "Cross Larkya La Pass (5,106m) to Bimthang", altitude: "5,106m", distance: "16 km", duration: "8 - 9 hrs", description: "Conquer the snowy Larkya La pass offering majestic views of Himlung Himal, Cheo Himal, and Annapurna II." },
      { day: 10, title: "Bimthang to Tilije through pristine rhododendrons", altitude: "2,300m", distance: "15 km", duration: "5 hrs", description: "Gentle descent through dense forests with panoramic glacial views." },
      { day: 11, title: "Tilije to Dharapani & Drive to Besisahar", altitude: "760m", distance: "Drive", duration: "5 hrs", description: "Meet the Annapurna circuit trail and private jeep to Besisahar." },
      { day: 12, title: "Besisahar return drive to Kathmandu", altitude: "1,400m", distance: "175 km", duration: "6 hrs", description: "Comfortable drive back to the capital hotel." },
      { day: 13, title: "Free exploration in Kathmandu & Shopping", altitude: "1,400m", distance: "City", duration: "Flexible", description: "Relaxation, souvenir hunting in Thamel, and celebratory team dinner." },
      { day: 14, title: "Final International Departure", altitude: "1,400m", distance: "Airport", duration: "Transfer", description: "Drop-off at Tribhuvan International Airport." },
    ],
    includes: [
      "Special Restricted Area Permit (RAP), MCAP, and ACAP government permits",
      "Certified government mountain guide experienced in Manaslu terrain",
      "Porters for luggage handling (1 porter per 2 trekkers)",
      "All meals and teahouse lodge bookings",
      "Private 4WD overland jeep transfers Kathmandu - Machha Khola and Dharapani - Kathmandu",
    ],
    excludes: [
      "Nepal tourist visa and international airfare",
      "Travel rescue insurance with helicopter coverage up to 5,500m",
      "Gratuities for guides and porters",
    ],
    tierPricing: [
      { pax: "2 - 3 Persons (Min 2 required by govt)", pricePerPerson: 1280 },
      { pax: "4 - 7 Persons", pricePerPerson: 1180 },
      { pax: "8+ Persons", pricePerPerson: 1090 },
    ],
    departures: [
      { date: "Oct 08, 2026 - Oct 21, 2026", status: "Guaranteed" },
      { date: "Oct 22, 2026 - Nov 04, 2026", status: "Filling Fast" },
      { date: "Mar 18, 2027 - Mar 31, 2027", status: "Available" },
    ],
    faqs: [
      {
        question: "Can a solo trekker do Manaslu Circuit?",
        answer:
          "No. The Nepal Department of Immigration legally mandates a minimum of two foreign trekkers accompanied by a certified licensed Nepali guide for Manaslu Restricted Area permits. We can pair solo travelers into small groups.",
      },
    ],
  },
  {
    id: "langtang-valley-trek",
    slug: "langtang-valley-trek",
    title: "Langtang Valley & Kyanjin Gompa Trek",
    subtitle: "The Valley of Glaciers: accessible mountain grandeur and resilient Tamang heritage.",
    destination: "Nepal",
    region: "Langtang",
    activity: "Trekking",
    duration: "8 Days",
    durationDays: 8,
    altitude: "4,773m (Kyanjin Ri)",
    difficulty: "Moderate",
    priceUSD: 650,
    originalPriceUSD: 720,
    discountPercent: 10,
    rating: 4.8,
    reviewsCount: 145,
    bestSeason: "Mar - May & Sep - Dec",
    groupSize: "1 to 14 travelers",
    accommodation: "Cozy Family Teahouses",
    meals: "3 Meals Daily",
    featured: false,
    bestSeller: false,
    heroImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1600&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop",
    ],
    description:
      "A scenic, moderate trek just north of Kathmandu into Langtang National Park. Hike through ancient forests where red pandas roam, savor artisanal yak cheese at Kyanjin Gompa, and climb Kyanjin Ri for panoramic views of Langtang Lirung (7,227m).",
    itinerary: [
      { day: 1, title: "Drive Kathmandu to Syabrubesi", altitude: "1,460m", distance: "135 km", duration: "6 - 7 hrs drive", description: "Scenic mountain road winding past Trishuli bazaar and terraced mid-hills." },
      { day: 2, title: "Trek Syabrubesi to Lama Hotel", altitude: "2,470m", distance: "11 km", duration: "5 - 6 hrs", description: "Follow the rushing Langtang Khola through dense bamboo and oak forest." },
      { day: 3, title: "Lama Hotel to Langtang Village (Mundu)", altitude: "3,430m", distance: "13 km", duration: "5 - 6 hrs", description: "Climb through the valley as views of Langtang Lirung open up past Buddhist water mills." },
      { day: 4, title: "Langtang to Kyanjin Gompa & Yak Cheese Factory", altitude: "3,870m", distance: "7 km", duration: "3 - 4 hrs", description: "Gentle trek past prayer stone walls to the sacred monastery and historic Swiss-assisted cheese dairy." },
      { day: 5, title: "Sunrise Climb to Kyanjin Ri (4,773m) / Tsergo Ri", altitude: "4,773m", distance: "6 km", duration: "4 - 5 hrs", description: "Panoramic morning climb overlooking icefalls, fluted glaciers, and Tibetan peaks." },
      { day: 6, title: "Kyanjin Gompa back to Lama Hotel", altitude: "2,470m", distance: "18 km", duration: "6 hrs", description: "Rapid downward hike through the forested valley enjoying easier breathing." },
      { day: 7, title: "Lama Hotel to Syabrubesi", altitude: "1,460m", distance: "11 km", duration: "4 - 5 hrs", description: "Final descent along the river to celebrate with your crew at Syabrubesi." },
      { day: 8, title: "Drive Syabrubesi to Kathmandu", altitude: "1,400m", distance: "135 km", duration: "6 - 7 hrs drive", description: "Return drive to your hotel in Kathmandu." },
    ],
    includes: [
      "Langtang National Park Permit & TIMS Card",
      "Experienced licensed guide and porter service",
      "All teahouse stays and 3 daily meals",
      "Private overland transport Kathmandu to Syabrubesi return",
    ],
    excludes: [
      "International flights and travel insurance",
      "Hot showers and drinks (tea/coffee outside meals)",
      "Guide and porter gratuities",
    ],
    tierPricing: [
      { pax: "1 Person", pricePerPerson: 720 },
      { pax: "2 - 3 Persons", pricePerPerson: 650 },
      { pax: "4+ Persons", pricePerPerson: 590 },
    ],
    departures: [
      { date: "Oct 15, 2026 - Oct 22, 2026", status: "Guaranteed" },
      { date: "Nov 05, 2026 - Nov 12, 2026", status: "Available" },
      { date: "Apr 02, 2027 - Apr 09, 2027", status: "Available" },
    ],
    faqs: [
      {
        question: "How close is Langtang to Kathmandu?",
        answer:
          "Syabrubesi (the trailhead) is only about 135 km north of Kathmandu. It takes 6 to 7 hours of driving, making it the fastest accessible high Himalayan trek from the capital without needing internal flights.",
      },
    ],
  },
  {
    id: "bhutan-cultural-tour",
    slug: "bhutan-cultural-tour",
    title: "Bhutan Kingdom of Thunder Dragon Odyssey",
    subtitle: "Sacred fortresses, ancient monasteries, and the cliffside wonder of Tiger's Nest.",
    destination: "Bhutan",
    region: "Bhutan",
    activity: "Tour",
    duration: "7 Days",
    durationDays: 7,
    altitude: "3,120m (Tiger's Nest)",
    difficulty: "Easy",
    priceUSD: 1650,
    originalPriceUSD: 1800,
    discountPercent: 8,
    rating: 5.0,
    reviewsCount: 88,
    bestSeason: "Year-Round (Best Mar - May & Sep - Nov)",
    groupSize: "1 to 10 travelers",
    accommodation: "3-Star & 4-Star Heritage Boutique Hotels",
    meals: "All Breakfasts, Lunches & Dinners",
    featured: true,
    bestSeller: false,
    heroImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1600&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop",
    ],
    description:
      "Journey into the land of Gross National Happiness. Explore Paro, the capital Thimphu, and the lush valley of Punakha with its magnificent fortress. Culminate with the spiritual hike to the iconic cliff-hanging Taktsang (Tiger's Nest) monastery.",
    itinerary: [
      { day: 1, title: "Fly to Paro & Transfer to Thimphu", altitude: "2,320m", distance: "50 km", duration: "1.5 hrs drive", description: "Spectacular flight past Everest and Kanchenjunga into Paro. Drive to capital city Thimphu." },
      { day: 2, title: "Thimphu Cultural Sightseeing", altitude: "2,320m", distance: "City", duration: "Full Day", description: "Visit the massive Buddha Dordenma statue, National Memorial Chorten, and Traditional Weaving Center." },
      { day: 3, title: "Thimphu to Punakha via Dochula Pass (3,100m)", altitude: "1,250m", distance: "72 km", duration: "3 hrs drive", description: "Cross Dochula Pass with 108 memorial chortens and views of snow-capped peaks into subtropical Punakha." },
      { day: 4, title: "Punakha Dzong & Chimi Lhakhang Fertility Temple", altitude: "1,250m", distance: "Valley", duration: "Full Day", description: "Explore Punakha Dzong, regarded as the most majestic palace in Bhutan, at the confluence of Pho Chhu and Mo Chhu." },
      { day: 5, title: "Punakha to Paro & Rinpung Dzong", altitude: "2,250m", distance: "125 km", duration: "4 hrs drive", description: "Scenic drive back to Paro valley and visit the historic Ta Dzong National Museum." },
      { day: 6, title: "Hike to Tiger's Nest Monastery (Taktsang, 3,120m)", altitude: "3,120m", distance: "8 km", duration: "5 - 6 hrs", description: "Unforgettable pilgrimage hike perched 900 meters above the Paro valley floor on sheer granite cliffs." },
      { day: 7, title: "Paro International Departure", altitude: "2,250m", distance: "Airport", duration: "Transfer", description: "Transfer to Paro airport for your onward flight to Kathmandu, Bangkok, or Delhi." },
    ],
    includes: [
      "Bhutan Government Sustainable Development Fee (SDF) of $100/night included",
      "Official Bhutanese Visa clearance & paperwork",
      "Certified English-speaking Bhutanese tour guide and private chauffeur vehicle",
      "Twin-share accommodations in approved 3-star boutique heritage hotels",
      "3 meals daily (Authentic Bhutanese and Continental cuisine)",
      "All monument, museum, and temple entry fees",
    ],
    excludes: [
      "Drukair / Bhutan Airlines flights to/from Paro",
      "Personal alcohol, laundry, and telephone bills",
      "Tips for guide and driver",
    ],
    tierPricing: [
      { pax: "1 Person (Solo)", pricePerPerson: 1850 },
      { pax: "2 - 3 Persons", pricePerPerson: 1650 },
      { pax: "4+ Persons", pricePerPerson: 1520 },
    ],
    departures: [
      { date: "Oct 18, 2026 - Oct 24, 2026", status: "Guaranteed" },
      { date: "Nov 08, 2026 - Nov 14, 2026", status: "Available" },
      { date: "Apr 10, 2027 - Apr 16, 2027", status: "Filling Fast" },
    ],
    faqs: [
      {
        question: "Is the Bhutan visa difficult to get?",
        answer:
          "No! We handle the entire visa clearance process directly with the Department of Tourism in Thimphu once your passport copy is submitted. Clearance takes only 3-5 business days.",
      },
    ],
  },
  {
    id: "upper-mustang-trek",
    slug: "upper-mustang-trek",
    title: "Upper Mustang Walled Kingdom Trek",
    subtitle: "Journey to Lo Manthang, the ancient walled capital and forbidden kingdom behind the Annapurna massif.",
    destination: "Nepal",
    region: "Mustang",
    activity: "Trekking",
    duration: "14 Days",
    durationDays: 14,
    altitude: "3,840m (Lo Manthang)",
    difficulty: "Moderate",
    priceUSD: 2180,
    originalPriceUSD: 2390,
    discountPercent: 9,
    rating: 4.95,
    reviewsCount: 168,
    bestSeason: "May - Oct (Rain Shadow Zone)",
    groupSize: "2 to 12 travelers",
    accommodation: "Heritage Tibetan Lodges & Teahouses",
    meals: "All Breakfasts, Lunches & Dinners",
    featured: true,
    bestSeller: false,
    heroImage: "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?q=80&w=1600&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop",
    ],
    description:
      "Venture north of the Annapurna and Dhaulagiri mountain ranges into the arid rain-shadow desert of the ancient Kingdom of Lo. Untouched by modern roads for centuries, Upper Mustang reveals wind-sculpted red sandstone canyons, 2,500-year-old cliffside sky caves, and the fortified medieval capital of Lo Manthang where Tibetan Buddhist traditions remain impeccably preserved.",
    itinerary: [
      {
        day: 1,
        title: "Scenic Flight Pokhara to Jomsom (2,720m) & Trek to Kagbeni",
        altitude: "2,800m",
        distance: "11 km",
        duration: "3 - 4 hrs",
        description: "Early morning mountain flight between Annapurna and Dhaulagiri into the Kali Gandaki Gorge. Follow the windy riverbed to the ancient fortress village of Kagbeni, gateway to restricted Upper Mustang.",
      },
      {
        day: 2,
        title: "Trek Kagbeni to Chele via Tangbe & Chhusang",
        altitude: "3,050m",
        distance: "15 km",
        duration: "5 - 6 hrs",
        description: "Pass the permit inspection checkpoint and enter the restricted boundary. Trek past whitewashed houses, apple orchards, and erosion-sculpted sandstone cliffs across the Kali Gandaki River to Chele.",
      },
      {
        day: 3,
        title: "Trek Chele to Syangboche via Taklam La & Dawa La Passes",
        altitude: "3,800m",
        distance: "12 km",
        duration: "6 - 7 hrs",
        description: "Ascend high above the gorge through dramatic stone staircases and passes with views of Nilgiri and Tilicho Peak, reaching the mountain settlement of Syangboche.",
      },
      {
        day: 4,
        title: "Trek Syangboche to Ghami via Nyi La Pass (4,010m)",
        altitude: "3,520m",
        distance: "13 km",
        duration: "5 - 6 hrs",
        description: "Cross the high Nyi La Pass into the heart of Mustang. Descend past the historic village of Jaite to Ghami, surrounded by rugged desert landscapes and terrace fields.",
      },
      {
        day: 5,
        title: "Trek Ghami to Tsarang via Longest Mani Wall",
        altitude: "3,560m",
        distance: "12 km",
        duration: "4 - 5 hrs",
        description: "Hike past the longest carved Buddhist Mani wall in Nepal. Cross the dramatic red cliffs of Tsarang and explore the 5-story white palace and 14th-century Tsarang Gompa.",
      },
      {
        day: 6,
        title: "Trek Tsarang to the Walled Capital of Lo Manthang",
        altitude: "3,840m",
        distance: "13 km",
        duration: "4 - 5 hrs",
        description: "Climb through the Lo La Pass (3,950m) for the breathtaking first view of the walled city of Lo Manthang nestled in a golden plateau. Settle into your heritage Tibetan lodge.",
      },
      {
        day: 7,
        title: "Exploration of Lo Manthang & Ancient Chhoser Sky Caves",
        altitude: "3,840m",
        distance: "8 km",
        duration: "Day Exploration",
        description: "Excursion to the mysterious multi-level Jhong Sky Caves carved high into cliff faces over 2,500 years ago. Visit the historic royal palace and the revered Jampa, Thubchen, and Chode gompas.",
      },
      {
        day: 8,
        title: "Lo Manthang to Drakmar via Gyakar & Ghar Gompa",
        altitude: "3,820m",
        distance: "16 km",
        duration: "6 - 7 hrs",
        description: "Take the scenic highland trail visiting Ghar Gompa (8th century), one of the oldest active Buddhist monasteries in the world, before descending to the towering scarlet cliffs of Drakmar.",
      },
      {
        day: 9,
        title: "Trek Drakmar to Shyangmochen",
        altitude: "3,800m",
        distance: "14 km",
        duration: "5 - 6 hrs",
        description: "Trek across panoramic canyon ridges and gentle descends with sweeping views of the northern slopes of Annapurna and Dhaulagiri.",
      },
      {
        day: 10,
        title: "Trek Shyangmochen to Chhusang",
        altitude: "2,980m",
        distance: "15 km",
        duration: "5 - 6 hrs",
        description: "Descend toward the Kali Gandaki Valley floor, experiencing unique rock flute formations and ancient cave dwellings carved into towering orange cliffs.",
      },
      {
        day: 11,
        title: "Trek Chhusang to Jomsom via Kagbeni Checkpoint",
        altitude: "2,720m",
        distance: "18 km",
        duration: "6 hrs",
        description: "Conclude the restricted area circuit back through Kagbeni. Check out of the permit registry and continue along the riverbed trail to Jomsom for celebratory dinner.",
      },
      {
        day: 12,
        title: "Morning Flight Jomsom to Pokhara & Leisure Afternoon",
        altitude: "820m",
        distance: "Flight",
        duration: "25 min flight",
        description: "Spectacular morning flight through the Annapurna mountain gap back to subtropical Pokhara. Rest, enjoy Lakeside cafes, and boat on Phewa Lake.",
      },
      {
        day: 13,
        title: "Scenic Overland Drive / Flight from Pokhara to Kathmandu",
        altitude: "1,400m",
        distance: "200 km",
        duration: "6 hrs drive",
        description: "Return to the capital city. Evening farewell dinner hosted by Zenith Himalaya expedition directors with traditional Sherpa and Newari cuisine.",
      },
      {
        day: 14,
        title: "Final Departure from Tribhuvan International Airport",
        altitude: "1,400m",
        distance: "Airport Transfer",
        duration: "Departure",
        description: "Private transfer to the international terminal for your onward journey home.",
      },
    ],
    includes: [
      "Government Restricted Area Permit ($500 USD per person included)",
      "Annapurna Conservation Area Project (ACAP) permit fees",
      "Roundtrip domestic flights: Pokhara — Jomsom — Pokhara including airport taxes",
      "Licensed English-speaking Upper Mustang cultural trekking guide",
      "Sherpa support crew and porters (1 porter for every 2 trekkers, 25kg limit)",
      "13 nights accommodation (heritage Tibetan lodges and boutique hotels)",
      "All meals on trek: 14 Breakfasts, 13 Lunches, 13 Dinners with fresh fruit & hot tea",
      "Comprehensive medical first aid kit with portable oximeter and emergency satellite communication",
      "All airport transfers in private air-conditioned vehicle",
      "Zenith Himalaya expedition kit bag and warm down jacket hire",
    ],
    excludes: [
      "International flights to/from Kathmandu",
      "Nepal tourist visa fees ($50 USD for 30 days)",
      "Travel and high-altitude emergency medical evacuation insurance",
      "Personal gear (sleeping bag, trekking poles, hiking boots)",
      "Beverages (bottled water, soft drinks, alcoholic beverages)",
      "Tips for local guide and porters",
    ],
    tierPricing: [
      { pax: "2 - 3 Persons", pricePerPerson: 2180 },
      { pax: "4 - 7 Persons", pricePerPerson: 1980 },
      { pax: "8+ Persons", pricePerPerson: 1850 },
    ],
    departures: [
      { date: "May 10, 2026 - May 23, 2026", status: "Guaranteed" },
      { date: "Jun 06, 2026 - Jun 19, 2026", status: "Available" },
      { date: "Aug 15, 2026 - Aug 28, 2026", status: "Available" },
      { date: "Sep 12, 2026 - Sep 25, 2026", status: "Guaranteed" },
      { date: "Oct 04, 2026 - Oct 17, 2026", status: "Filling Fast" },
    ],
    faqs: [
      {
        question: "Why does Upper Mustang require a $500 permit?",
        answer:
          "Upper Mustang was closed to foreigners until 1992. The Government of Nepal imposes a strict $500 USD Restricted Area Permit fee (minimum 2 travelers per group) to protect its delicate ancient Tibetan Buddhist culture, fragile high-desert ecology, and centuries-old walled heritage.",
      },
      {
        question: "Can I trek Upper Mustang during the monsoon (July & August)?",
        answer:
          "Yes! Upper Mustang is in the rain-shadow of the Greater Himalaya (Annapurna and Dhaulagiri massifs), meaning it receives less than 300mm of annual rainfall. Summer is actually one of the most vibrant times to visit, with blooming desert valleys and comfortable weather.",
      },
    ],
  },
];

export const DESTINATION_REGIONS: DestinationRegion[] = [
  {
    id: "everest",
    name: "Everest Region",
    country: "Nepal",
    badge: "Most Iconic",
    packageCount: 8,
    startingPriceUSD: 1240,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop",
    description: "Home of Mt. Everest, Kala Patthar, Sherpa hospitality, and high-altitude Buddhist culture.",
  },
  {
    id: "annapurna",
    name: "Annapurna Region",
    country: "Nepal",
    badge: "Most Diverse",
    packageCount: 11,
    startingPriceUSD: 560,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop",
    description: "Thorong La pass, 360° Sanctuary amphitheater, and rhododendron panoramas.",
  },
  {
    id: "manaslu",
    name: "Manaslu Region",
    country: "Nepal",
    badge: "Wilderness & Remote",
    packageCount: 4,
    startingPriceUSD: 1280,
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop",
    description: "Untamed restricted borderland encircling the 8th highest mountain on Earth.",
  },
  {
    id: "langtang",
    name: "Langtang Region",
    country: "Nepal",
    badge: "Closest to Capital",
    packageCount: 5,
    startingPriceUSD: 650,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop",
    description: "The Valley of Glaciers with Tamang heritage, yak cheese dairies, and Kyanjin Ri views.",
  },
  {
    id: "bhutan",
    name: "Bhutan Kingdom",
    country: "Bhutan",
    badge: "Cultural Wonder",
    packageCount: 4,
    startingPriceUSD: 1520,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop",
    description: "Gross National Happiness, sacred fortress dzongs, and the cliff-hanging Tiger's Nest.",
  },
  {
    id: "tibet",
    name: "Tibet Autonomous",
    country: "Tibet",
    badge: "Roof of the World",
    packageCount: 3,
    startingPriceUSD: 1790,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop",
    description: "Potala Palace in Lhasa, sacred Mt. Kailash Mansarovar, and trans-Himalayan overland roads.",
  },
];

export const WHY_CHOOSE_US_PILLARS = [
  {
    icon: "ShieldCheck",
    title: "100% Local Sherpa Guides",
    description: "Government-certified wilderness experts with decades of high-altitude rescue and summit experience.",
  },
  {
    icon: "CalendarCheck",
    title: "Guaranteed Departures",
    description: "Once your booking deposit is confirmed, your trek dates are 100% locked. We never cancel on you.",
  },
  {
    icon: "DollarSign",
    title: "Best Price Guarantee & No Hidden Fees",
    description: "Direct local operator prices with all permits, meals, transport, and guide wages fully disclosed upfront.",
  },
  {
    icon: "Sliders",
    title: "Flexible Custom Itineraries",
    description: "Add helicopter returns, extra acclimatization days, or cultural tours with one quick conversation.",
  },
  {
    icon: "HeartPulse",
    title: "Safety & Medical Emergency Ready",
    description: "Daily pulse oximeter monitoring, Gamow bag protocols, and standby 24/7 helicopter rescue coordination.",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    name: "Marcus Sterling",
    country: "United Kingdom",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    trip: "Everest Base Camp Trek (14 Days)",
    rating: 5,
    date: "November 2025",
    source: "TripAdvisor",
    text: "The organization was flawless from airport arrival to our celebratory return dinner. Dawa, our Sherpa guide, checked our blood oxygen every single evening at tea houses and adjusted our walking pace seamlessly. Reaching Kala Patthar at sunrise was the most profound experience of my life!",
  },
  {
    id: "test-2",
    name: "Elena Rostova & David Miller",
    country: "Australia",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    trip: "Annapurna Circuit via Thorong La",
    rating: 5,
    date: "October 2025",
    source: "Google",
    text: "Booking through this agency was a breeze. The transparency on what was included (all permits, transport, meals) gave us total confidence. Conquering Thorong La Pass at 5,416m felt completely safe with our guide Pemba leading the way. Can't recommend them highly enough!",
  },
  {
    id: "test-3",
    name: "Chloe Vandeberg",
    country: "Netherlands",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop",
    trip: "Bhutan Kingdom of Thunder Dragon",
    rating: 5,
    date: "January 2026",
    source: "Trustpilot",
    text: "They managed our Bhutan SDF tax and visa paperwork within 4 days. The hotels were exquisite boutique properties, and our private guide Sonam was knowledgeable and warm. Hiking to Tiger's Nest was completely magical.",
  },
];

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: "blog-1",
    slug: "everest-base-camp-in-autumn-vs-spring",
    title: "Everest Base Camp in Autumn vs. Spring: Which Season is Best for You?",
    category: "Trekking Guide",
    readTime: "6 min read",
    date: "Feb 12, 2026",
    author: "Tenzing Sherpa",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop",
    excerpt: "Comparing weather patterns, trail congestion, rhododendron blooms, and crystal-clear Himalayan summit visibility.",
  },
  {
    id: "blog-2",
    slug: "how-to-train-for-thorong-la-pass",
    title: "How to Train for High Altitude: Conquering 5,400m+ Passes Safely",
    category: "Fitness & Safety",
    readTime: "8 min read",
    date: "Jan 28, 2026",
    author: "Dr. Sunita Thapa",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop",
    excerpt: "Proven cardio workouts, stair-climbing protocols, and hydration tips to bulletproof your body against altitude sickness.",
  },
  {
    id: "blog-3",
    slug: "nepal-trekking-packing-checklist",
    title: "The Ultimate Nepal Trekking Packing List (2026/2027 Edition)",
    category: "Gear Guide",
    readTime: "5 min read",
    date: "Jan 10, 2026",
    author: "Pasang Nuru",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop",
    excerpt: "What to bring and what to rent in Thamel: layering system, sleeping bags, boots, water purification, and electronics.",
  },
];
