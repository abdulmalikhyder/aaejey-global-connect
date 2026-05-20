# AAEJEY Consumer Company — Static Website

A fully static website built with pure HTML, CSS and JavaScript. No build step. No framework. Drag-and-drop deployable.

## File structure

```
public/
├── index.html              Home
├── products.html           Product grid (with filter)
├── brands.html             Our 7 brands
├── about.html              Company + Vision + Mission
├── export.html             International / Middle East distributors
├── contact.html            Contact form (Formspree)
├── products/               7 product detail pages
└── assets/
    ├── css/styles.css      All styling (Ocean Deep palette)
    └── js/main.js          Menu, animations, form, filters
```

## Open locally

Just double-click `public/index.html`. The whole site works in your browser.

## Deploy free — pick one

### Option A · Netlify Drop (easiest, ~30 seconds)
1. Go to https://app.netlify.com/drop
2. Drag the **entire `public/` folder** onto the page.
3. Done — Netlify gives you a live URL like `https://glittery-cat-12345.netlify.app`.
4. (Optional) Sign in to rename the site or attach a custom domain.

### Option B · Vercel
1. Install the CLI once: `npm i -g vercel`
2. In a terminal, run: `cd public && vercel`
3. Follow the prompts (just press Enter). Live URL printed at the end.

### Option C · GitHub + Netlify/Vercel auto-deploy
1. Create a new GitHub repo, push the `public/` folder contents to the root.
2. On Netlify or Vercel, "New site from Git", pick the repo, leave build settings empty (it's already static). Deploy.

## One-time setup (2 minutes) — Contact form

Right now the contact form will open the visitor's email app as a fallback. To get submissions emailed to you directly:

1. Sign up free at https://formspree.io (50 submissions/month free).
2. Create a new form → copy the endpoint URL (looks like `https://formspree.io/f/abcd1234`).
3. Open `public/contact.html` and find `YOUR_FORMSPREE_ID`. Replace the whole URL with the one Formspree gave you. Save.

That's it — submissions will now arrive in your inbox.

## Things to edit

- **Phone / WhatsApp number** — `contact.html`, search for `94700000000`. Replace with your real number (no +, no spaces).
- **Email address** — search the project for `info@aaejey.com` and replace.
- **Social links** — footers link to facebook.com / instagram.com / twitter.com root. Replace with your actual handles.
- **Export country list** — `export.html`, the `country-grid` block. Add/remove pills as you sign new markets.
- **Product copy & pack sizes** — files in `public/products/`. Each page is self-contained.
- **Map location** — `contact.html`, the `<iframe>` near the bottom uses `Polgahawela, Sri Lanka`. Change the query string to your exact factory address.

## Design

- Palette: deep navy + ocean blue + teal + mint + gold accent
- Fonts: Fraunces (display serif) + Inter (body) + Amiri (Arabic), loaded from Google Fonts
- All colors live in CSS variables at the top of `assets/css/styles.css` — change them in one place to retheme the whole site.

Made with care in Sri Lanka.
