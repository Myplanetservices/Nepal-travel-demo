# My Planet Services — Design System & Specification

## 1. Project Overview

**Project:** My Planet Services  
**Type:** Single-page portfolio / landing site  
**Audience:** Travel agencies looking for premium web design services  
**Tone:** Confident, calm, premium, travel-inspired  
**Motion stance:** Static only — no scroll animations, transitions, or 3D effects

This document defines the visual language, component behavior, and section-by-section layout for the landing page so the design can be replicated, extended, or handed off cleanly.

---

## 2. Visual Identity

### 2.1 Color Palette

All colors are defined as semantic CSS custom properties in `src/styles.css` using the OKLCH color space.

| Token | Light Mode Value | Usage |
|-------|------------------|-------|
| `--background` | `oklch(0.995 0.002 240)` | Page canvas, airy whites |
| `--foreground` | `oklch(0.22 0.06 258)` | Primary text, headings |
| `--primary` | `oklch(0.52 0.19 253)` | Vivid travel blue — CTAs, links, accents |
| `--primary-foreground` | `oklch(0.99 0.002 240)` | Text on primary buttons |
| `--secondary` | `oklch(0.965 0.025 242)` | Subtle button / muted fills |
| `--muted` | `oklch(0.965 0.012 244)` | Muted backgrounds |
| `--muted-foreground` | `oklch(0.5 0.035 256)` | Secondary body text |
| `--accent` | `oklch(0.94 0.045 238)` | Soft blue tint for icon backgrounds |
| `--border` | `oklch(0.9 0.018 247)` | Dividers, card borders |
| `--mist` | `oklch(0.977 0.016 237)` | Section alternation background |
| `--highlight` | `oklch(0.84 0.17 84)` | Warm yellow — badges, stars, emphasis |
| `--highlight-foreground` | `oklch(0.23 0.05 66)` | Text on highlight badges |
| `--success` | `oklch(0.48 0.14 158)` | Positive status indicators |
| `--success-soft` | `oklch(0.95 0.05 154)` | Soft green background |
| `--footer` | `oklch(0.23 0.09 257)` | Footer dark surface |
| `--footer-foreground` | `oklch(0.99 0.002 240)` | Footer primary text |
| `--footer-muted` | `oklch(0.78 0.03 244)` | Footer secondary text |
| `--footer-soft` | `oklch(0.32 0.085 255)` | Footer hover / soft fills |

### 2.2 Typography

| Font | Role | Weight Range |
|------|------|--------------|
| **Manrope** | Headings, display text, buttons, labels | 700–900 |
| **DM Sans** | Body text, navigation, captions | 400–700 |
| **Pacifico** | Editorial script accent (used sparingly) | 400 |

**Type Scale**

| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| Hero H1 | `clamp(2.75rem, 6vw, 4.5rem)` | 800 | 1.05 |
| Section H2 | `clamp(2rem, 4vw, 3.3rem)` | 800 | 1.1 |
| Card H3 | `1.25rem`–`1.5rem` | 800 | 1.2 |
| Body | `1rem` | 400–600 | 1.65 |
| Small / Caption | `0.75rem`–`0.875rem` | 600–800 | 1.5 |

### 2.3 Spacing

- **Section padding:** `6.5rem` vertical on desktop, `4.5rem` on mobile
- **Site container:** `min(100% - 2rem, 74rem)` centered
- **Card internal padding:** `1.5rem`–`1.75rem`
- **Grid gaps:** `1rem`–`2rem` depending on section density
- **Border radius tokens:** `--radius: 0.75rem`; cards use `rounded-2xl` (`1rem`)

---

## 3. Layout Principles

- **Centered, contained composition** — all content sits inside a max-width container.
- **Generous whitespace** — premium feel achieved through breathing room, not density.
- **Single-column or clean grid** — sections use `grid` with clear breakpoints.
- **Sticky navigation** — header is fixed at the top with a frosted-glass backdrop.
- **Mobile-first collapse** — multi-column layouts collapse to a single column below `640px` and to tighter grids at `768px`.
- **No full-bleed dark sections** except the footer; page alternates between white (`--background`) and mist (`--mist`).

---

## 4. Components

### 4.1 Buttons

- **Primary button:** solid `--primary` background, white text, fully rounded (`rounded-full`), `h-10`/`h-11`, no transition animations.
- **Secondary button:** softer background or ghost style depending on context.
- All buttons are anchors when linking to in-page sections (`#contact`, `#work`, etc.).

### 4.2 Cards

- Use shadcn/ui `Card` with `rounded-2xl` override.
- Soft shadow: `shadow-card` — `0 12px 32px oklch(0.25 0.04 257 / 0.07)`.
- Border color: `--border` at 70% opacity for subtle separation.
- Internal padding consistently `p-6` or `p-7`.

### 4.3 Badges / Labels

- **Status label:** pill shape (`rounded-full`), small text (`0.7rem`), bold, with an inline icon.
- **Most popular badge:** absolute top-right of featured pricing card, `--highlight` background.

### 4.4 Icons

- All icons from **Lucide React**.
- Icon containers: `size-12` grid-centered, `--accent` background, `--primary` icon color, `rounded-xl`.

### 4.5 Browser Mockups

- Rounded card frame with a faux browser chrome (three dots + address bar).
- Before image is grayscale; After image is full color.
- Overlay label sits on the image with reversed or high-contrast text.

---

## 5. Section-by-Section Specification

### 5.1 Navigation (`SiteNav`)

- Sticky top, z-index 50, semi-transparent white background with `backdrop-blur-md`.
- Left: wordmark logo — circle with plane icon + “My Planet Services” text.
- Right desktop: Home, Work, Pricing, Contact links + “Free Preview” CTA.
- Right mobile: “Work” quick link + “Contact” compact CTA.

### 5.2 Hero (`HeroSection`)

- Full-width section with a generated travel hero image.
- Left-aligned text overlay using `bg-hero-overlay` for legibility.
- Headline: **“Websites That Turn Browsers Into Bookings”**
- Subheadline: one to two lines explaining modern sites for travel agencies.
- Primary CTA: **“See a Free Preview”** linking to `#contact`.
- Booking-style proof panel below the CTA with three compact stat-like items.

### 5.3 Before / After (`BeforeAfterSection`)

- Two-column grid on desktop, stacked on mobile.
- Left: “Before” — grayscale outdated travel website mockup.
- Right: “After” — full-color modern travel website mockup.
- Each column has a label pill: “Easy to ignore” / “Built to convert”.
- Bottom center: one-line takeaway with icon.

### 5.4 Features (`FeaturesSection`)

- Background: `--mist`.
- 4-card grid on desktop, 2 columns on tablet, 1 column on mobile.
- Cards:
  1. Online Booking — `CalendarCheck2`
  2. Mobile-First Design — `Smartphone`
  3. WhatsApp Integration — `MessageCircleMore`
  4. SEO-Ready — `SearchCheck`
- Each card: icon container, small index number (`01`–`04`), title, one-line description.

### 5.5 Work / Case Studies (`CaseStudiesSection`)

- One large featured card (≈ 60% width) plus two smaller stacked cards.
- All cards link to the `#contact` demo anchor.
- Images use `bg-case-overlay` for gradient text legibility.
- Featured card shows large destination image + title + CTA text.
- Smaller cards stack vertically on the right.

### 5.6 Pricing (`PricingSection`)

- Background: `--mist`.
- 3-column grid on desktop; featured middle card uses `--primary` background and `--highlight` badge.
- Tiers: Basic, Standard (featured), Premium.
- Placeholder prices shown as `$—` with the word “placeholder” beneath.
- Each card lists 4 features with checkmark icons and a full-width CTA button.

### 5.7 Testimonials (`TestimonialsSection`)

- 3-column grid on desktop.
- Each card: 5-star rating row, quote icon, quote text, divider, name + agency.
- Star color: `--highlight`.

### 5.8 Footer (`SiteFooter`)

- Dark `--footer` background.
- 3-column layout: brand blurb, contact info, social links.
- Contact placeholders: email, phone, address.
- Social icons: Instagram, Facebook, LinkedIn as round icon buttons.
- Bottom bar: copyright + tagline.

---

## 6. Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| `≥1024px` | Full multi-column grids, large hero overlay, side-by-side before/after, 4-feature grid |
| `768px–1023px` | Case-study grid may collapse to single featured + two-column small cards; pricing stays 3 columns if space allows |
| `640px–767px` | 2-column feature grid; other sections stack |
| `<640px` | Single column everywhere; reduced section padding; compact nav; hero overlay becomes more opaque |

---

## 7. Assets

The following generated images are used across the page:

| File | Usage |
|------|-------|
| `src/assets/hero-travel.jpg` | Hero background |
| `src/assets/case-maldives.jpg` | Featured case study / After mockup |
| `src/assets/case-cappadocia.jpg` | Secondary case study / Before mockup |
| `src/assets/case-bali.jpg` | Tertiary case study |

All imagery should feel cohesive: bright natural light, clear skies, aspirational travel destinations, cool-blue and warm-sand tones.

---

## 8. Do’s and Don’ts

### Do
- Keep the page static — no animations, transitions, or 3D.
- Use semantic HTML and accessible landmarks (`<nav>`, `<main>`, `<section>`, `<footer>`).
- Maintain generous whitespace and a clean visual hierarchy.
- Use the semantic color tokens; avoid hardcoded hex values.
- Keep each section in its own component file under `src/components/landing/`.

### Don’t
- Add scroll-triggered reveals, hover transitions, or parallax.
- Use backend, database, or authentication.
- Inject real client data or pricing — all values remain placeholders.
- Use generic AI aesthetics (purple gradients, default Inter hero) — stick to the blue/mist/yellow travel palette.

---

## 9. File Map

```
src/
├── components/landing/
│   ├── SiteNav.tsx
│   ├── HeroSection.tsx
│   ├── BeforeAfterSection.tsx
│   ├── FeaturesSection.tsx
│   ├── CaseStudiesSection.tsx
│   ├── PricingSection.tsx
│   ├── TestimonialsSection.tsx
│   └── SiteFooter.tsx
├── routes/
│   ├── index.tsx          # Composes all sections
│   └── __root.tsx         # Fonts + metadata
├── styles.css             # Tokens, utilities, overrides
└── assets/                # Generated travel images
```

---

## 10. Notes for Export

This codebase is intentionally modular so each section can be lifted into another tool or extended independently. Typography, color tokens, and utility classes are centralized in `src/styles.css`; component props are minimal and stateless.