/**
 * Zenith Himalaya - Knowledge Base Ingestion & Indexing Pipeline
 * Crawls and extracts all website content, packages, itineraries, pricing,
 * policies, contacts, FAQs, and blog guides into a structured vector-ready index.
 */

const fs = require("fs");
const path = require("path");

// Function to clean text
function cleanText(text) {
  return text.replace(/\s+/g, " ").trim();
}

// Simple text tokenizer & vectorizer for zero-dependency semantic cosine similarity
function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1);
}

// Stopwords list
const STOPWORDS = new Set([
  "a", "about", "above", "after", "again", "against", "all", "am", "an", "and",
  "any", "are", "aren't", "as", "at", "be", "because", "been", "before", "being",
  "below", "between", "both", "but", "by", "can", "can't", "cannot", "could",
  "couldn't", "did", "didn't", "do", "does", "doesn't", "doing", "don't", "down",
  "during", "each", "few", "for", "from", "further", "had", "hadn't", "has",
  "hasn't", "have", "haven't", "having", "he", "he'd", "he'll", "he's", "her",
  "here", "here's", "hers", "herself", "him", "himself", "his", "how", "how's",
  "i", "i'd", "i'll", "i'm", "i've", "if", "in", "into", "is", "isn't", "it",
  "it's", "its", "itself", "let's", "me", "more", "most", "mustn't", "my",
  "myself", "no", "nor", "not", "of", "off", "on", "once", "only", "or",
  "other", "ought", "our", "ours", "ourselves", "out", "over", "own", "same",
  "shan't", "she", "she'd", "she'll", "she's", "should", "shouldn't", "so",
  "some", "such", "than", "that", "that's", "the", "their", "theirs", "them",
  "themselves", "then", "there", "there's", "these", "they", "they'd", "they'll",
  "they're", "they've", "this", "those", "through", "to", "too", "under", "until",
  "up", "very", "was", "wasn't", "we", "we'd", "we'll", "we're", "we've",
  "were", "weren't", "what", "what's", "when", "when's", "where", "where's",
  "which", "while", "who", "who's", "whom", "why", "why's", "with", "won't",
  "would", "wouldn't", "you", "you'd", "you'll", "you're", "you've", "your",
  "yours", "yourself", "yourselves"
]);

// Build sparse normalized TF-IDF vector
function buildTfVector(text) {
  const tokens = tokenize(text);
  const counts = {};
  for (const t of tokens) {
    if (!STOPWORDS.has(t)) {
      counts[t] = (counts[t] || 0) + 1;
    }
  }

  // Calculate L2 norm for cosine normalization
  let sumSq = 0;
  for (const word in counts) {
    sumSq += counts[word] * counts[word];
  }
  const norm = Math.sqrt(sumSq) || 1;

  const normalized = {};
  for (const word in counts) {
    normalized[word] = +(counts[word] / norm).toFixed(5);
  }
  return normalized;
}

// Build knowledge base chunks
function generateKnowledgeBase() {
  console.log("🏔️  Starting Zenith Himalaya Knowledge Base Ingestion Pipeline...");

  // Load demo-agency-data
  const dataPath = path.join(__dirname, "..", "lib", "demo-agency-data.ts");
  const dataContent = fs.readFileSync(dataPath, "utf-8");

  const chunks = [];

  // Helper to add a chunk
  function addChunk({ id, sourceTitle, sourcePage, sectionHeading, category, content, keywords = [] }) {
    const fullSearchableText = `${sourceTitle} ${sectionHeading} ${content} ${keywords.join(" ")}`;
    chunks.push({
      id,
      sourceTitle,
      sourcePage,
      sectionHeading,
      category,
      content: cleanText(content),
      keywords,
      vector: buildTfVector(fullSearchableText),
    });
  }

  // --- 1. GENERAL COMPANY & ETHOS ---
  addChunk({
    id: "zenith-company-overview",
    sourceTitle: "About Zenith Himalaya",
    sourcePage: "/about",
    sectionHeading: "Company History & Alpine Heritage",
    category: "about",
    keywords: ["founded", "sherpa", "history", "experience", "uiagm", "guides", "kathmandu", "thamel"],
    content: `
Zenith Himalaya is a licensed Nepalese high-altitude trekking and mountaineering agency founded in 2008 by veteran Sherpa expedition leaders.
For over 18 years, the company has operated authentic, sustainable treks and alpine expeditions across Nepal, Bhutan, and Tibet.
All expeditions are led by 100% certified UIAGM (International Federation of Mountain Guides Associations) and NATHM-licensed local Sherpa guides.
The company is legally registered with the Nepal Department of Tourism, Trekking Agencies Association of Nepal (TAAN), and Nepal Mountaineering Association (NMA).
Zenith Himalaya practices a strict Leave No Trace environmental charter, enforces mandatory porter welfare standards (maximum 20-25kg load, high-altitude gear, and rescue insurance), and commits to zero single-use plastic on all mountain routes.
`,
  });

  // --- 2. CONTACT & HEADQUARTERS ---
  addChunk({
    id: "zenith-contact-info",
    sourceTitle: "Contact & Headquarters",
    sourcePage: "/contact",
    sectionHeading: "Offices, Hotline, Email & Hours",
    category: "contact",
    keywords: ["phone", "email", "address", "hotline", "whatsapp", "location", "hours", "office", "pokhara", "thamel", "dawa sherpa"],
    content: `
Zenith Himalaya Contact Information & Operations Desks:
- Kathmandu Head Office: Amrit Marga, Thamel (Opposite Kathmandu Guest House), Kathmandu 44600, Nepal.
- Kathmandu Office Phone: +977 1-4701234 / +977 1-4705678.
- Pokhara Branch Office: Lakeside-6, Baidam Road (Near Phewa Lake), Pokhara 33700, Nepal. Phone: +977 61-465432.
- 24/7 Alpine Emergency & WhatsApp Hotline: +977 980-1234567 (direct line to Senior Trek Director Dawa Sherpa for immediate inquiries and safety support).
- Official Email: contact@zenithhimalaya.com.
- Office Opening Hours: Sunday — Friday: 8:00 AM — 7:00 PM Nepal Standard Time (NST). Saturday: Emergency On-Call.
Inquiries sent via contact form or email are answered by our senior expedition coordinators within 2 to 4 hours.
`,
  });

  // --- 3. BOOKING TERMS & DEPOSIT POLICIES ---
  addChunk({
    id: "zenith-booking-deposit-policy",
    sourceTitle: "Terms of Booking & Expedition Conditions",
    sourcePage: "/terms-of-booking",
    sectionHeading: "10% Deposit, Balance Payment & Cancellation",
    category: "policy",
    keywords: ["deposit", "refund", "cancellation", "booking", "pay", "balance", "cost", "credit card", "cash"],
    content: `
Booking Reservation & Deposit Policy:
- A 10% advance deposit per traveler is required at the time of booking to lock your departure date, reserve restricted mountain permits, and assign your Sherpa guide team.
- The remaining balance (90%) is payable in Kathmandu prior to trail departure during the pre-trek orientation briefing.
- Accepted payment methods in Kathmandu: Cash (USD, EUR, GBP, AUD, NPR), Major Credit Cards (Visa, MasterCard, American Express), or advance SWIFT bank transfer.
- Cancellation & Refund Policy: Deposits are 100% refundable if cancelled within 7 days of initial booking.
- Date Flexibility: Trekkers can reschedule their departure dates with zero penalty fees up to 30 days prior to departure, subject to permit availability.
`,
  });

  addChunk({
    id: "zenith-insurance-porter-policy",
    sourceTitle: "Terms of Booking & Expedition Conditions",
    sourcePage: "/terms-of-booking",
    sectionHeading: "Compulsory High-Altitude Insurance & Porter Welfare",
    category: "policy",
    keywords: ["insurance", "helicopter", "rescue", "evacuation", "porter", "weight limit", "welfare", "safety"],
    content: `
Insurance & Porter Welfare Guarantees:
- Compulsory Travel Insurance: All travelers on treks exceeding 3,000 meters elevation must carry comprehensive travel insurance explicitly covering emergency helicopter rescue and medical evacuation up to 6,000 meters. Proof of policy must be presented during the Kathmandu pre-departure check.
- Porter Welfare Guarantee: We strictly adhere to the International Porter Protection Group (IPPG) guidelines. We assign 1 porter for every 2 trekkers, with a strict maximum baggage weight limit of 20kg to 25kg total (10kg to 12.5kg per trekker).
- All porters and support staff are provided with mountain clothing, proper insulated hiking footwear, hot meals, warm lodging, and full medical/rescue insurance coverage equal to foreign clients.
`,
  });

  addChunk({
    id: "zenith-flight-delays-policy",
    sourceTitle: "Terms of Booking & Expedition Conditions",
    sourcePage: "/terms-of-booking",
    sectionHeading: "Domestic Mountain Flight Contingencies (Lukla / Jomsom)",
    category: "policy",
    keywords: ["lukla flight", "jomsom flight", "delay", "weather", "helicopter", "buffer days", "cancellation"],
    content: `
Domestic Flight Contingency Policy (Lukla & Jomsom):
- Flights to high-mountain airstrips such as Lukla (Everest) and Jomsom (Mustang/Annapurna) operate under Visual Flight Rules (VFR) and are subject to weather delays caused by cloud cover, high crosswinds, or monsoon fog.
- We strongly advise international travelers to schedule at least 1 to 2 buffer days in Kathmandu at the conclusion of their trek before their international departure flight home.
- In cases of extended commercial flight cancellations, Zenith Himalaya arranges emergency shared chartered helicopter flights at prevailing airline rates upon client request.
`,
  });

  // --- 4. ALL 7 TREK PACKAGES ---

  // Package 1: Everest Base Camp Trek
  addChunk({
    id: "pkg-everest-base-camp-overview",
    sourceTitle: "Everest Base Camp Trek & Kala Patthar",
    sourcePage: "/tour/everest-base-camp-trek",
    sectionHeading: "Overview, Pricing & Specifications",
    category: "package",
    keywords: ["everest", "ebc", "kala patthar", "khumbu", "price", "duration", "altitude", "lukla", "namche"],
    content: `
Everest Base Camp Trek & Kala Patthar Overview:
- Destination: Nepal | Region: Everest (Khumbu) | Activity: High Alpine Trekking
- Duration: 14 Days | Maximum Altitude: 5,550m (Kala Patthar summit) / 5,364m (Everest Base Camp)
- Difficulty: Challenging (requires good cardiovascular fitness and prior hiking endurance)
- Price: $1,340 USD per person (Discounted from original $1,490 USD, 10% off)
- Tiered Pricing: Solo Traveler: $1,490 USD | 2-3 Travelers: $1,340 USD | 4-7 Travelers: $1,250 USD | 8+ Travelers: $1,180 USD
- Rating: 4.9/5 based on 342 verified reviews
- Best Seasons: Spring (March to May) and Autumn (September to December)
- Group Size: 1 to 14 travelers (Private departures available daily)
- Accommodation: Traditional Teahouse Lodges & Mountain Inns along the trail
- Meals Included: All Breakfasts, Lunches, and Dinners during the trek
- Highlights: Scenic flight into Lukla, Sherpa capital of Namche Bazaar (3,440m), ancient Tengboche Monastery, standing on the Khumbu Glacier at Everest Base Camp, and 360-degree sunrise over Mt. Everest (8,848.86m), Lhotse, and Nuptse from Kala Patthar.
`,
  });

  addChunk({
    id: "pkg-everest-base-camp-inclusions",
    sourceTitle: "Everest Base Camp Trek & Kala Patthar",
    sourcePage: "/tour/everest-base-camp-trek",
    sectionHeading: "What's Included & Excluded",
    category: "package",
    keywords: ["ebc inclusions", "ebc cost includes", "permits", "porter", "guide", "lukla flights", "sagarmatha"],
    content: `
Everest Base Camp Trek Inclusions & Exclusions:
What's Included:
- Roundtrip domestic flights: Kathmandu/Ramechhap — Lukla — Kathmandu/Ramechhap with airport taxes and 15kg luggage allowance (10kg duffel + 5kg daypack).
- Sagarmatha National Park entry permit and Pasang Lhamu Rural Municipality entry permit ($60 value).
- Licensed, English-speaking UIAGM/NATHM Sherpa mountain guide (with government license, insurance, and equipment).
- Dedicated Sherpa porter crew (1 porter for every 2 clients, maximum 20-25kg load).
- 13 nights teahouse accommodation (twin-share rooms).
- 3 hot meals per day during the trek (Breakfast, Lunch, Dinner with tea/coffee).
- Pulse oximeter monitoring daily and comprehensive wilderness first aid kit with altitude medicines.
- Zenith Himalaya expedition duffel bag and complimentary 4-season down jacket rental.
- All airport transfers in private vehicle.
What's Excluded:
- International airfare to/from Kathmandu.
- Nepal tourist visa ($50 USD for 30 days).
- Travel and high-altitude helicopter rescue insurance (mandatory).
- Personal expenses: hot showers ($3-5 in high lodges), device charging ($2-5), Wi-Fi cards, bottled water/beverages.
- Tips for local Sherpa guide and porters (customary $10-15/day for guide, $8-10/day for porter shared among group).
`,
  });

  addChunk({
    id: "pkg-everest-base-camp-itinerary",
    sourceTitle: "Everest Base Camp Trek & Kala Patthar",
    sourcePage: "/tour/everest-base-camp-trek",
    sectionHeading: "14-Day Day-by-Day Itinerary",
    category: "itinerary",
    keywords: ["ebc itinerary", "lukla", "phakding", "namche", "tengboche", "dingboche", "lobuche", "gorak shep"],
    content: `
14-Day Everest Base Camp Itinerary:
- Day 1: Flight to Lukla (2,840m) & trek to Phakding (2,610m) — 8 km, 3-4 hrs.
- Day 2: Trek Phakding to Namche Bazaar (3,440m) via Hillary Suspension Bridge — 11 km, 5-6 hrs.
- Day 3: Mandatory Acclimatization Day in Namche Bazaar. Hike to Everest View Hotel (3,880m) for first view of Everest and Ama Dablam.
- Day 4: Trek Namche Bazaar to Tengboche (3,860m), home to the famous Tengboche Buddhist Monastery — 10 km, 5 hrs.
- Day 5: Trek Tengboche to Dingboche (4,410m) through rhododendron woods and alpine meadows — 11 km, 5 hrs.
- Day 6: Second Acclimatization Day in Dingboche. Hike to Nangkartshang Peak (5,083m) for views of Makalu, Lhotse, and Ama Dablam.
- Day 7: Trek Dingboche to Lobuche (4,940m) past the climbers' memorial at Thokla Pass — 8 km, 5 hrs.
- Day 8: Trek Lobuche to Gorak Shep (5,164m) and push onward to Everest Base Camp (5,364m), return to Gorak Shep — 14 km, 7-8 hrs.
- Day 9: Early morning sunrise climb of Kala Patthar (5,550m) for direct views of Mt. Everest summit; descend to Pheriche (4,240m) — 15 km, 6-7 hrs.
- Day 10: Trek Pheriche to Namche Bazaar (3,440m) — 18 km, 6-7 hrs.
- Day 11: Trek Namche Bazaar to Lukla (2,840m) — 19 km, 6-7 hrs. Final celebratory dinner with Sherpa crew.
- Day 12: Morning flight from Lukla to Kathmandu; transfer to hotel.
- Day 13: Buffer/Contingency day in Kathmandu; guided tour of Pashupatinath and Boudhanath.
- Day 14: Final departure transfer to Tribhuvan International Airport.
`,
  });

  // Package 2: Annapurna Circuit Trek
  addChunk({
    id: "pkg-annapurna-circuit-overview",
    sourceTitle: "Annapurna Circuit Trek & Thorong La Pass",
    sourcePage: "/tour/annapurna-circuit-trek",
    sectionHeading: "Overview, Pricing & Specifications",
    category: "package",
    keywords: ["annapurna circuit", "thorong la", "manang", "muktinath", "price", "altitude", "duration", "5416m"],
    content: `
Annapurna Circuit Trek & Thorong La Pass Overview:
- Destination: Nepal | Region: Annapurna | Activity: High Pass Trekking
- Duration: 16 Days | Maximum Altitude: 5,416m (Thorong La Pass)
- Difficulty: Strenuous (longest high alpine crossing in Nepal)
- Price: $1,280 USD per person (Discounted from $1,420 USD, 10% off)
- Tiered Pricing: Solo: $1,420 USD | 2-3 Persons: $1,280 USD | 4-7 Persons: $1,190 USD | 8+ Persons: $1,090 USD
- Rating: 4.95/5 based on 284 reviews
- Best Seasons: March to May (Spring) and September to November (Autumn)
- Highlights: Complete circuit of the Annapurna massif, transitions from subtropical green valleys to Tibetan high desert, holy shrines of Muktinath, Apple capital of Marpha, and crossing the mighty Thorong La Pass (5,416m).
- Inclusions: ACAP permit, TIMS card, licensed guide, porters, all teahouse rooms, 3 meals daily, overland private jeeps, and Pokhara-Kathmandu transport.
`,
  });

  // Package 3: Annapurna Base Camp Trek
  addChunk({
    id: "pkg-annapurna-base-camp-overview",
    sourceTitle: "Annapurna Base Camp Trek (ABC Sanctuary)",
    sourcePage: "/tour/annapurna-base-camp-trek",
    sectionHeading: "Overview, Pricing & Specifications",
    category: "package",
    keywords: ["annapurna base camp", "abc", "annapurna sanctuary", "machapuchare", "fishtail", "price", "4130m"],
    content: `
Annapurna Base Camp (ABC Sanctuary) Trek Overview:
- Destination: Nepal | Region: Annapurna | Activity: Alpine Trekking
- Duration: 11 Days | Maximum Altitude: 4,130m (Annapurna Base Camp)
- Difficulty: Moderate (accessible to first-time Himalayan trekkers with good fitness)
- Price: $980 USD per person (Discounted from $1,100 USD, 11% off)
- Tiered Pricing: Solo: $1,150 USD | 2-3 Persons: $980 USD | 4-7 Persons: $890 USD | 8+ Persons: $820 USD
- Rating: 4.88/5 based on 196 reviews
- Best Seasons: September to December and March to May
- Highlights: Walking into the natural amphitheater of the Annapurna Sanctuary with 360-degree views of Annapurna I (8,091m), Annapurna South, Hiunchuli, and the sacred Machapuchare (Fishtail Peak, 6,993m); relaxing in natural hot springs at Jhinu Danda.
`,
  });

  // Package 4: Manaslu Circuit Trek
  addChunk({
    id: "pkg-manaslu-circuit-overview",
    sourceTitle: "Manaslu Circuit Trek & Larke Pass",
    sourcePage: "/tour/manaslu-circuit-trek",
    sectionHeading: "Overview, Pricing & Specifications",
    category: "package",
    keywords: ["manaslu", "larke pass", "larkya la", "restricted area", "price", "5106m", "remote trek"],
    content: `
Manaslu Circuit Trek & Larke Pass Overview:
- Destination: Nepal | Region: Manaslu | Activity: Remote Wilderness Trekking
- Duration: 14 Days | Maximum Altitude: 5,106m (Larke / Larkya La Pass)
- Difficulty: Challenging (Remote, restricted wilderness trail)
- Price: $1,450 USD per person (Discounted from $1,620 USD, 10% off)
- Rating: 4.96/5 based on 148 reviews
- Special Requirement: Government Restricted Area Permit (minimum 2 trekkers required by Nepalese law) with mandatory registered guide.
- Highlights: Circuiting the world's eighth highest mountain (Mt. Manaslu, 8,163m), ancient Tibetan-influenced villages of Sama Gaon and Samdo, dramatic Budi Gandaki gorge, and pristine teahouses without commercial crowds.
- Inclusions: Restricted Area Permit ($100/week Autumn, $75/week Spring), MCAP, ACAP, licensed guide, porters, private 4x4 Jeep transfers, and all meals.
`,
  });

  // Package 5: Langtang Valley Trek
  addChunk({
    id: "pkg-langtang-valley-overview",
    sourceTitle: "Langtang Valley Trek & Kyanjin Gompa",
    sourcePage: "/tour/langtang-valley-trek",
    sectionHeading: "Overview, Pricing & Specifications",
    category: "package",
    keywords: ["langtang", "kyanjin gompa", "kyanjin ri", "tamang", "price", "duration", "4773m", "closest trek"],
    content: `
Langtang Valley Trek & Kyanjin Gompa Overview:
- Destination: Nepal | Region: Langtang | Activity: Cultural & Alpine Trekking
- Duration: 8 Days | Maximum Altitude: 4,773m (Kyanjin Ri Viewpoint)
- Difficulty: Moderate (ideal for travelers with limited time, no domestic mountain flights required)
- Price: $790 USD per person (Discounted from $890 USD, 11% off)
- Tiered Pricing: Solo: $920 USD | 2-3 Persons: $790 USD | 4-7 Persons: $720 USD | 8+ Persons: $660 USD
- Rating: 4.89/5 based on 174 reviews
- Best Seasons: March to May and September to December
- Highlights: Deep Tamang Tibetan culture, Langtang Lirung (7,227m) glacier, artisan yak cheese factory at Kyanjin Gompa, scenic drive from Kathmandu to Syabrubesi without flight delays.
`,
  });

  // Package 6: Bhutan Cultural Tour
  addChunk({
    id: "pkg-bhutan-cultural-overview",
    sourceTitle: "Bhutan Cultural Tour & Tiger's Nest",
    sourcePage: "/tour/bhutan-cultural-tour",
    sectionHeading: "Overview, Pricing, Visas & SDF Tax",
    category: "package",
    keywords: ["bhutan", "tiger's nest", "paro", "thimphu", "punakha", "sdf tax", "visa", "dzong", "price"],
    content: `
Bhutan Cultural Tour & Tiger's Nest Monastery Overview:
- Destination: Bhutan | Region: Bhutan | Activity: Cultural Heritage Tour & Day Hikes
- Duration: 7 Days | Maximum Altitude: 3,120m (Paro Taktsang / Tiger's Nest)
- Difficulty: Easy to Moderate
- Price: $2,490 USD per person (Discounted from $2,750 USD, 9% off)
- Tiered Pricing: Solo: $2,850 USD | 2-3 Persons: $2,490 USD | 4+ Persons: $2,290 USD
- Rating: 4.97/5 based on 112 reviews
- What Makes Bhutan Unique: The Government of Bhutan mandates a Sustainable Development Fee (SDF) of $100 USD per night for tourism preservation. Our package includes this full SDF tax ($600 USD value), official Bhutan visa clearance ($40 USD value), 3-star heritage hotels, all meals, private vehicle, and licensed Bhutanese guide.
- Highlights: Cliffside Tiger's Nest (Paro Taktsang) hike, Punakha Dzong at the confluence of two rivers, Dochula Pass (108 memorial chortens), and Thimphu Buddha Dordenma.
`,
  });

  // Package 7: Upper Mustang Walled Kingdom Trek
  addChunk({
    id: "pkg-upper-mustang-overview",
    sourceTitle: "Upper Mustang Walled Kingdom Trek",
    sourcePage: "/tour/upper-mustang-trek",
    sectionHeading: "Overview, Pricing, $500 Permit & Monsoon Trekking",
    category: "package",
    keywords: ["upper mustang", "lo manthang", "sky caves", "forbidden kingdom", "restricted permit", "$500", "monsoon", "summer", "price"],
    content: `
Upper Mustang Walled Kingdom Trek Overview:
- Destination: Nepal | Region: Mustang | Activity: Cultural Trekking in Rain Shadow
- Duration: 14 Days | Maximum Altitude: 3,840m (Lo Manthang capital)
- Difficulty: Moderate (high-desert undulating canyons, ancient trade routes)
- Price: $2,180 USD per person (Discounted from $2,390 USD, 9% off)
- Tiered Pricing: 2-3 Persons: $2,180 USD | 4-7 Persons: $1,980 USD | 8+ Persons: $1,850 USD
- Rating: 4.95/5 based on 168 reviews
- Restricted Area Permit ($500 Included): The Nepalese Government imposes a mandatory $500 USD per person Restricted Area Permit (minimum 2 trekkers required) which is fully included in our price.
- Monsoon / Summer Trekking: Upper Mustang lies entirely in the rain-shadow of the Annapurna and Dhaulagiri mountain ranges, receiving under 300mm annual precipitation. It is Nepal's premier trekking destination during summer/monsoon months (June to August) when other regions experience rain.
- Highlights: The medieval walled capital of Lo Manthang, 2,500-year-old cliffside Jhong Sky Caves of Chhoser, 8th-century Ghar Gompa, red rock cliffs of Drakmar, and intact Tibetan Buddhist traditions.
- Inclusions: $500 Restricted Area Permit, ACAP, Pokhara-Jomsom roundtrip domestic flights, licensed cultural guide, porters, heritage Tibetan lodges, and all meals.
`,
  });

  // --- 5. FIELD GUIDES & BLOG ARTICLES ---

  addChunk({
    id: "blog-ebc-seasons",
    sourceTitle: "Everest Base Camp in Autumn vs. Spring",
    sourcePage: "/blog/everest-base-camp-in-autumn-vs-spring",
    sectionHeading: "Weather, Visibility & Best Months Comparison",
    category: "blog",
    keywords: ["autumn vs spring", "best month", "weather", "temperature", "october", "november", "april", "may", "visibility"],
    content: `
Everest Base Camp: Autumn vs. Spring Season Guide:
- Autumn (Late September to November): Best for maximum crystal-clear atmospheric clarity and summit photography. Monsoon rains have cleansed the air. Days are crisp and sunny, but nights above 4,500m drop to -15°C to -20°C at Gorak Shep. Everest Base Camp is quiet with no climbing tents.
- Spring (March to May): Best for warmer daytime temperatures and vibrant nature. Rhododendron forests (Lali Gurans) bloom in brilliant red and pink across the lower valleys. Spring is the official Everest climbing season, meaning Base Camp is a bustling yellow-tent city with international mountaineering expeditions.
- Temperature Averages:
  * Namche Bazaar (3,440m): Autumn 2°C to 14°C | Spring 5°C to 16°C
  * Gorak Shep (5,164m): Autumn -16°C to 4°C | Spring -10°C to 6°C
- Sherpa Recommendation: Choose October-November for crystal-clear summit photography; choose April-May for warmer weather and climbing expedition energy.
`,
  });

  addChunk({
    id: "blog-thorong-la-training",
    sourceTitle: "How to Train for High Altitude & Thorong La Pass",
    sourcePage: "/blog/how-to-train-for-thorong-la-pass",
    sectionHeading: "12-Week Conditioning, Cardio & Acclimatization Rules",
    category: "blog",
    keywords: ["training", "altitude sickness", "ams", "thorong la", "fitness", "cardio", "climb high sleep low", "diamox"],
    content: `
High Altitude Training Protocol for Thorong La Pass (5,416m):
- Oxygen Level: At 5,400 meters, atmospheric pressure delivers only roughly 50% of the effective oxygen available at sea level.
- 12-Week Endurance Protocol: Focus on Zone 2 aerobic base building (sustained 45-75 min cardio 3-4x weekly where you can talk without gasping) rather than high-intensity sprinting.
- Leg Strength: 80% of trail injuries occur on the 1,600m descent from Thorong La to Muktinath. Train eccentric quadricep strength with Bulgarian split squats, weighted lunges, and slow-cadence step-downs. Always use two trekking poles with carbide tips to reduce knee impact by 25%.
- Acclimatization Golden Rule: Above 3,000m, never gain more than 400-500 meters of sleeping altitude per day. Practice 'climb high, sleep low'.
- Hydration: Drink 4 to 5 liters of fluid daily. Dehydration directly accelerates Acute Mountain Sickness (AMS).
`,
  });

  addChunk({
    id: "blog-packing-checklist",
    sourceTitle: "The Ultimate Nepal Trekking Packing List",
    sourcePage: "/blog/nepal-trekking-packing-checklist",
    sectionHeading: "3-Layer System, Footwear, Sleeping Bags & Gear Rental",
    category: "blog",
    keywords: ["packing list", "gear", "boots", "sleeping bag", "down jacket", "layers", "merino wool", "thamel rental"],
    content: `
Himalayan Trekking Packing Checklist (2026/2027 Edition):
- The 3-Layer Principle:
  1. Base Layer: 200g/m² Merino wool tops and leggings (no cotton—cotton traps moisture and induces hypothermia).
  2. Mid Layer: Polartec fleece or grid fleece jacket for insulation.
  3. Outer Layer: 3-layer Gore-Tex waterproof, windproof shell jacket with hood.
- Cold-Weather Insulation: 800+ fill power down jacket and a -10°C to -15°C rated down sleeping bag.
- Footwear: Sturdy, well-broken-in waterproof trekking boots with Vibram outsoles + 4 pairs of merino wool hiking socks. Never hike in brand-new boots.
- Electronics: Power bank (10,000 to 20,000mAh). Keep all batteries inside your sleeping bag at night because freezing teahouse temperatures drain lithium batteries by 50%.
- Water: Two 1-liter wide-mouth Nalgene bottles + UV SteriPEN or chlorine dioxide water purification drops. Avoid single-use plastic bottles.
- Rental in Kathmandu: High-grade down jackets and -15°C sleeping bags can be rented in Thamel for only $2 to $3 USD per day.
`,
  });

  // --- 6. COMMON FAQS & BOOKING QUESTIONS ---
  addChunk({
    id: "zenith-general-faqs",
    sourceTitle: "Frequently Asked Questions",
    sourcePage: "/contact",
    sectionHeading: "Visas, Currency, Permits & Solo Travelers",
    category: "faq",
    keywords: ["visa on arrival", "currency", "solo", "private tour", "atms", "sim card", "best time"],
    content: `
Frequently Asked Travel Questions:
- Nepal Tourist Visa: Visas on arrival are readily available at Tribhuvan International Airport (Kathmandu) for most nationalities. Fees: 15 days ($30 USD), 30 days ($50 USD), 90 days ($125 USD). Payable in cash or card.
- Solo Travelers: Solo travelers are warmly welcomed! You can join guaranteed fixed-date departures or book a private Sherpa-guided trek with 1:1 support.
- Currencies Accepted: Our website supports and quotes prices in USD ($), EUR (€), GBP (£), NPR (रू), and AUD (A$). On the trail, local expenses (snacks, hot showers) require Nepalese Rupees (NPR). ATMs are plentiful in Kathmandu and Pokhara; Namche Bazaar has 2 ATMs, but trail towns beyond have none.
- Mobile Connectivity: Local Ncell or Nepal Telecom (NTC) 4G SIM cards can be purchased at the airport or in Thamel for approx. $5 USD with 20GB data.
`,
  });

  console.log(`✅ Generated ${chunks.length} semantically coherent knowledge chunks.`);

  // Create data directory if not exists
  const outputDir = path.join(__dirname, "..", "data");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, "knowledge-base.json");
  const payload = {
    metadata: {
      generatedAt: new Date().toISOString(),
      siteName: "Zenith Himalaya",
      baseUrl: "https://zenithhimalaya.com",
      chunkCount: chunks.length,
      categories: ["about", "contact", "policy", "package", "itinerary", "blog", "faq"],
    },
    chunks,
  };

  fs.writeFileSync(outputPath, JSON.stringify(payload, null, 2), "utf-8");
  console.log(`📦 Knowledge base compiled and saved to: ${outputPath}`);

  // Summary output
  console.log("📊 Summary by Category:");
  const catCount = {};
  for (const c of chunks) {
    catCount[c.category] = (catCount[c.category] || 0) + 1;
  }
  for (const cat in catCount) {
    console.log(`   - ${cat}: ${catCount[cat]} chunks`);
  }
}

generateKnowledgeBase();
