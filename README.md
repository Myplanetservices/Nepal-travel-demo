# My Planet Services — 3D Portfolio & Client Acquisition Platform

A high-converting sales and demo web application built for **My Planet Services**, targeting Nepal-based travel and trekking agencies. The site directly addresses the primary pain points of local agencies (reliance on outdated Facebook-only marketing, absence of online booking, high OTA middleman fees, lack of interactive route visualization, and lost foreign leads) while serving as a dynamic client acquisition engine that generates personalized live previews at `/preview/[agency-slug]`.

---

## 🛠 Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router, Server Components + Leaf Client Components)
- **Language:** TypeScript 5.7
- **Styling:** Tailwind CSS v4 + Semantic OKLCH Design Tokens (`design.md`)
- **3D Graphics:** [React Three Fiber](https://r3f.docs.pmnd.rs/) (`@react-three/fiber`), `@react-three/drei`, Three.js
- **Smooth Scrolling:** [Lenis](https://lenis.darkroom.engineering/) synchronized with [GSAP](https://gsap.com/) ScrollTrigger ticker
- **Forms & Validation:** React Hook Form + Zod (`@hookform/resolvers`)
- **Icons:** Lucide React
- **Target Deployment:** Vercel

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser.

### 3. Production Build & Validation
```bash
npm run build
npm run start
```

---

## 📂 Project Architecture

```
├── app/
│   ├── layout.tsx                     # Root layout with Manrope & DM Sans fonts, SEO metadata
│   ├── globals.css                    # Semantic OKLCH tokens, Lenis styles, glass utilities
│   ├── page.tsx                       # Main portfolio landing page
│   ├── demo/
│   │   └── annapurna-treks/page.tsx   # Complete mini travel agency demo website
│   └── preview/
│       └── [slug]/page.tsx            # Dynamic personalized client preview route
├── components/
│   ├── 3d/
│   │   ├── HeroGlobeScene.tsx         # 3D interactive Nepal globe with trek pins & GSAP scroll camera
│   │   └── HeroGlobeFallback.tsx      # SSR & low-power mobile fallback card
│   ├── landing/
│   │   ├── SiteNav.tsx                # Sticky frosted glass nav with scroll progress bar
│   │   ├── HeroSection.tsx            # Conversion hero with 3D centerpiece & proof bar
│   │   ├── BeforeAfterSection.tsx     # Draggable comparison slider (Facebook vs Modern site)
│   │   ├── FeaturesSection.tsx        # Bento-grid (booking, WhatsApp, itinerary, mobile speed)
│   │   ├── CaseStudiesSection.tsx     # Selected Nepal agency case studies
│   │   ├── PricingSection.tsx         # 3 transparent agency tiers (Starter, Growth, 3D Flagship)
│   │   ├── TestimonialsSection.tsx    # Verified agency director reviews
│   │   ├── ContactSection.tsx         # Zod validated prototype request form
│   │   ├── SiteFooter.tsx             # Dark footer with SEO/AEO section
│   │   └── PreviewGeneratorModal.tsx  # Instant preview generator modal
│   ├── providers/
│   │   └── SmoothScrollProvider.tsx   # Centralized Lenis smooth scroll & GSAP sync
│   └── ui/
│       ├── button.tsx                 # Button component with design.md specifications
│       ├── card.tsx                   # Card component with rounded-2xl & soft elevation
│       └── badge.tsx                  # Pill badge component
├── lib/
│   ├── utils.ts                       # Tailwind merge & clsx utility
│   └── agencies.ts                    # Personalization engine lead config & dynamic resolver
└── public/
    └── assets/                        # Brand vectors, logo, and travel imagery
```

---

## ⚡ How to Add a New Lead's Personalized Preview in Under 10 Minutes

The personalization engine allows sales reps to create a custom URL (e.g. `myplanetservices.com/preview/everest-summit-treks`) for cold outreach via WhatsApp or email.

### Option A: Instant URL (Zero Code)
1. Any URL matching `/preview/[any-agency-name]` works automatically out of the box!
2. Example: visiting `/preview/sherpa-climbing-expeditions` will automatically format the agency name, generate contact buttons, and load the interactive demonstration.

### Option B: Add a Dedicated Lead Configuration in `lib/agencies.ts`
To customize the exact flagship trek, brand color, and personalized message:

1. Open `lib/agencies.ts`.
2. Add a new entry to `PRESET_AGENCIES`:

```typescript
"namche-alpine-adventures": {
  slug: "namche-alpine-adventures",
  name: "Namche Alpine Adventures",
  city: "Namche Bazaar, Khumbu",
  phone: "+977 9801239999",
  email: "contact@namchealpine.example",
  regNumber: "Govt Reg. #59201/TAAN",
  primaryColor: "#0284c7",
  tagline: "Exclusive High-Altitude Sherpa Guiding",
  establishedYear: 2016,
  flagshipTrek: {
    title: "Everest Three Passes Luxury Traverse",
    duration: "18 Days",
    altitude: "5,535m (Kongma La)",
    priceUSD: 1650,
    description: "Private guided traverse across Renjo La, Cho La, and Kongma La with heated teahouse lodges.",
    difficulty: "Strenuous",
  },
  clientOwnerName: "Dawa Sherpa",
  customOutreachPitch: "We noticed Namche Alpine is missing an instant online booking engine for autumn season travelers. This preview shows your exact packages with 3D elevation maps.",
},
```

3. Save the file. The new route `/preview/namche-alpine-adventures` is immediately active!

---

## 🌍 SEO & AEO (Answer Engine Optimization)

- Built with semantic HTML5 landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).
- Validated with Schema.org JSON-LD definitions for `TravelAgency` and `WebDesignService`.
- Server-rendered page routes ensure immediate indexing by Googlebot, Perplexity, Bing, and ChatGPT Search.
