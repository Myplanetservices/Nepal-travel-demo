---
name: website-design-consistency-audit
description: Use when reviewing a live website or deployed prototype (e.g. a Vercel/Netlify preview link) for design consistency, visual polish, and structural or copy issues before it ships to a client. Triggers include requests to "review this site," "check the design," "find inconsistencies," "audit this before I send it to the client," or any URL handed over with a request to evaluate it.
---

# Website Design Consistency Audit

## Overview

A structured way to turn "does this website look good and consistent?" into a checklist an agent can actually execute with a browser, instead of a vague scroll-through. The core idea: **consistency bugs hide in comparisons, not in isolation.** A single button looks fine on its own — it only looks wrong next to the four other buttons on the page that are a different height. So this skill's method is always: extract every instance of a pattern (buttons, cards, headings, spacing units) across the whole site, put them side by side, and diff them.

## When to Use

- A prototype/demo link (Vercel, Netlify, staging subdomain) needs review before showing a client
- Someone asks "what's inconsistent about this site" or "what would you fix"
- A multi-page site was built section-by-section or page-by-page and may have drifted in spacing, type scale, color usage, or component styling between sections
- Before a handoff, launch, or client presentation

**Don't use for:** a single static screenshot with no live/interactive site to crawl (there's no way to check responsive behavior, real link targets, or console errors); pure copywriting review with no design component.

## Core Pattern: Crawl → Extract → Compare → Verify → Report

Do not review page-by-page in isolation. Build inventories first, then compare across the whole site.

```
1. CRAWL      Visit every reachable page/route. List them.
2. EXTRACT    Pull out every instance of each repeating element type
              (buttons, cards, section headers, spacing, colors, type).
3. COMPARE    Line up each inventory and look for the outlier, not the
              average. One card with a different shadow is the finding;
              five identical cards are not worth reporting.
4. VERIFY     Confirm suspected bugs are real (check DOM/CSS, not just
              a screenshot impression) and check functional correctness
              (links resolve, forms submit, counters animate).
5. REPORT     Plain-English list, grouped by severity, with the exact
              location (page + section) for each finding.
```

## Step 1: Crawl

- Visit the root URL. Extract every internal link (nav, footer, in-page CTAs, buttons).
- Visit each unique route at least once. Note any 404s, redirect loops, or placeholder pages (e.g. a "Blog" link that goes nowhere real).
- Record the list of pages found — this becomes your audit scope. If a site has 8 nav links but only 3 real pages, that's already a finding.

## Step 2: Extract Inventories

For **every** page, capture screenshots at three breakpoints minimum: mobile (~390px), tablet (~768px), desktop (~1440px). Then build these inventories across all pages combined:

**Visual/design tokens**
- Color palette actually used (sample backgrounds, text, buttons, borders — not just what a style guide claims). Flag any one-off color that doesn't belong to the palette.
- Type scale: every distinct font-size/weight/line-height combination in use for headings, body, labels, captions. Flag inconsistent heading sizes for the same semantic level (e.g. all H2s should match).
- Spacing scale: vertical rhythm between sections, padding inside cards, gaps in grids. Flag sections whose top/bottom padding clearly doesn't match its siblings.
- Border-radius, shadow, and border styles on buttons, cards, inputs, and images. Flag any component whose corner radius or shadow depth doesn't match its counterparts elsewhere on the site.
- Button states and styles: primary/secondary/tertiary button treatment should be identical everywhere the same intent is used. Flag any CTA that's styled like a primary action in one place and a link in another.
- Iconography and imagery style: flag mixed icon sets (e.g. two different icon libraries), inconsistent image aspect ratios in what should be a uniform grid, or mismatched illustration/photo styles.

**Structural/content**
- Section anatomy: if most sections follow a pattern (eyebrow label → heading → body → CTA), flag sections that silently drop or reorder a piece of that pattern without a clear reason.
- Repeated numbers/stats: cross-check every stat or count on the site (review counts, customer counts, years in business) against every other place it appears. Flag reused numbers standing in for different claims, and flag animated counters that render as 0/empty when JS hasn't fired (check both live-scrolled state and raw initial HTML).
- Metadata: fetch `<title>`, Open Graph tags, and Twitter card tags. Compare them against the actual page content/brand name. Flag any mismatch — this is a common but easy-to-miss bug when a site is templated from an agency's own boilerplate.
- Contact info and CTAs: collect every phone number, email, and address on the site (footer, contact page, tel: links, mailto: links) and diff them against each other. Flag any inconsistency.
- Placeholder content: generic social links (bare domain instead of a handle), lorem-ipsum-style text, obviously templated review names/avatars, broken parenthesis or truncated copy.
- Naming consistency: does the brand name, tagline, and value proposition stay identical across nav, hero, footer, and meta tags? Flag drift.

**Functional**
- Every internal link resolves to a real page (no dead links).
- Forms (booking, contact, newsletter) at least visually validate and show expected states (loading, error, success) — flag if a form has no visible feedback state.
- Currency/language/unit switchers (if present) actually change displayed values — don't assume, click through and verify.
- Check browser console for JS errors on each page load.

## Step 3–4: Compare & Verify

For each inventory, sort by the attribute being compared (all font sizes together, all button paddings together, etc.) and look for anything that doesn't cluster with the rest. Before reporting a finding, verify it in the rendered DOM/CSS (inspect element) rather than relying on a screenshot impression alone — screenshots can create false positives from anti-aliasing or compression.

## Step 5: Report

Group findings into three tiers so the person can triage:

| Tier | Meaning | Example |
|---|---|---|
| **Breaks trust/functionality** | A visitor or search engine would notice something wrong or broken | Wrong phone number, dead link, meta tags describing the wrong brand |
| **Visual inconsistency** | Noticeable once you compare two instances side by side | Card shadows differ between two sections, button corner-radius mismatch |
| **Polish/nice-to-have** | Would tighten the site but isn't a real problem | Slightly uneven vertical rhythm between two sections |

For each finding: name it in plain English, say exactly where it is (page + section), and say why it matters (what a real visitor or client would notice) — don't just say "inconsistent," show the two things being compared.

## Common Mistakes

- **Reviewing one page at a time and reporting as you go.** You'll miss cross-page inconsistencies (a button style that's fine on the homepage but doesn't match the same button on the About page) unless you build the full inventory first.
- **Trusting the screenshot over the DOM.** A shadow or spacing difference that looks real in a screenshot can be a compression artifact — check computed CSS before reporting.
- **Treating "different" as automatically "wrong."** A hero section is allowed to look different from a content section. Only flag inconsistency between elements that are supposed to be the same kind of thing (all primary buttons, all H2s, all card components).
- **Skipping mobile.** A huge share of consistency bugs (overflow, broken grids, illegible type) only show up under ~480px width.
- **Ignoring metadata.** Meta title/OG/Twitter tags are invisible on the page itself but are often the first thing a client or prospect actually sees when the link is shared — always check them, not just the visible page.
- **Forgetting to verify counters/animations in a non-JS or pre-scroll state**, since that's exactly the state a search engine crawler or slow connection will see.

## Quick Reference Checklist

- [ ] Crawled every route, noted dead links/placeholder pages
- [ ] Captured mobile/tablet/desktop screenshots per page
- [ ] Color palette inventoried, off-palette colors flagged
- [ ] Type scale inventoried, inconsistent heading sizes flagged
- [ ] Spacing/padding rhythm compared across sections
- [ ] Button/card/border-radius/shadow styles compared across all instances
- [ ] Repeated stats/numbers cross-checked for reuse or zero-state bugs
- [ ] Title/OG/Twitter meta tags checked against actual brand/content
- [ ] All phone numbers/emails/addresses cross-checked against each other
- [ ] Placeholder or generic content flagged (social links, lorem text, broken copy)
- [ ] All internal links click-tested
- [ ] Forms and switchers (currency, language) functionally tested, not just visually assumed
- [ ] Console checked for JS errors
- [ ] Findings grouped by severity tier with exact location cited
