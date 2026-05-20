## Goal

Rebuild aaejey.com as a striking, export-ready static website using only HTML, CSS, and JavaScript — content unchanged, deployable free on Vercel/Netlify with zero build step.

## What you'll get

A `public/` folder containing standalone files you can drag-and-drop to Netlify or push to Vercel as-is. Open `index.html` locally in any browser and it just works.

```
public/
├── index.html          (Home)
├── products.html       (All products grid)
├── brands.html         (Nilma, Flowery, Mammoth, Rytink, Luty, Lovendry, Mr. Doust)
├── about.html          (Company + vision/mission)
├── export.html         (Middle East / international buyers page)
├── contact.html        (Formspree-powered form)
├── products/
│   ├── liquid-blue.html
│   ├── air-freshener.html
│   ├── naphthalene-balls.html
│   ├── ball-point-pens.html
│   ├── liquid-dish-wash.html
│   ├── laundry-detergent.html
│   └── toilet-cleaner.html
├── assets/
│   ├── css/styles.css
│   ├── js/main.js
│   └── images/         (reusing your existing zyrosite image URLs, no re-upload needed)
└── README.md           (deploy instructions for Netlify + Vercel)
```

## Design direction — "Ocean Deep"

- Palette: deep navy `#0c2340`, ocean blue `#1a4a6e`, teal `#2d8a9e`, mint accent `#5cbdb9`, off-white `#f7fafc`
- Typography: **Fraunces** (display serif, premium feel) + **Inter** (body) via Google Fonts CDN
- Distinctive touches (not generic AI-template stuff):
  - Asymmetric hero: split layout with a large product photo collage on the right, bold serif headline + Arabic transliteration tagline ("جودة سريلانكية") on the left to immediately signal MENA-friendliness
  - Sticky translucent navbar with frosted glass effect
  - Animated wave SVG dividers between sections (matches "ocean" identity, ties to "ships across oceans" export story)
  - Brand marquee strip (Nilma, Flowery, Mammoth…) auto-scrolling
  - Product cards with hover tilt + subtle teal glow
  - Stats counter on scroll: "25+ years", "7 brands", "1 facility in Polgahawela", country flags strip
  - Dark navy footer with gold-tinted social icons

## Page-by-page

**Home (`index.html`)**
Hero → "Why AAEJEY" 3-pillar strip (Quality / Service / Affordability from your mission) → Featured product grid (6 cards linking to product pages) → Brands marquee → Export CTA banner → Vision snippet → Footer

**Products (`products.html`)**
Filterable grid (JS filter by category: Cleaning / Freshening / Stationery) of all 7 products, each linking to its detail page.

**Product detail pages (×7)**
Large image, description (from your existing copy), brand it belongs to, "Request a quote" button (jumps to contact with product pre-filled in form via `?product=` query string).

**Brands (`brands.html`)**
Card per brand with short positioning line. Nilma highlighted as flagship.

**About (`about.html`)**
Your existing about copy + Vision + Mission bullets + Polgahawela facility callout.

**Export / International (`export.html`)** — the differentiator
- Targets Middle East importers explicitly
- Sections: "Now exporting to" (placeholder country list you can edit), MOQ & shipping terms placeholder, Certifications placeholder, "Become a distributor" CTA → contact form with `?inquiry=export`
- Arabic greeting line + RTL-friendly typography

**Contact (`contact.html`)**
Form (Name, Email, Phone, Address, Message) wired to Formspree. WhatsApp quick-button as secondary CTA. Map embed of Polgahawela. Social links.

## Interactivity (vanilla JS, no frameworks)

- Mobile hamburger menu
- Product filter chips
- Scroll-triggered fade-ins (IntersectionObserver)
- Stats counter animation
- Form validation (required fields, email regex, max-length) before Formspree submit
- Pre-fill contact form from `?product=` / `?inquiry=` query params
- Brand marquee (CSS @keyframes, JS pauses on hover)

## Formspree setup (you do this once, ~2 min)

1. Sign up at formspree.io (free tier: 50 submissions/month)
2. Create a new form, copy the endpoint URL (looks like `https://formspree.io/f/xxxxxx`)
3. Paste it into one place in `contact.html` (I'll mark it with a clear `<!-- REPLACE: your Formspree endpoint -->` comment)

If you prefer Web3Forms (unlimited free) I'll wire that instead — same one-line swap.

## Deployment (after files are ready)

**Netlify (easiest):** drag the `public/` folder onto netlify.com/drop → live in 30 seconds.
**Vercel:** `vercel` CLI in the folder, or import from GitHub — auto-detects static, deploys free.

A `README.md` in the folder will spell both out step-by-step.

## Out of scope (ask if you want any of these)

- Multi-language toggle (English ↔ Arabic full translation) — I can add later if you want true bilingual
- E-commerce / cart
- Backend / database
- CMS for editing content without touching HTML

## Technical note

This Lovable sandbox runs a React preview, so the live preview here will show a basic page that links to the static files. The real deliverable is the `public/` folder — open `public/index.html` directly in your browser (or after deploy) to see the full site.

Ready to build when you approve.