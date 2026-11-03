# Memecoin Landing Template — Customization Guide

Make this site yours in about 5 minutes. You only need to edit **two files**.

## 1. Install & run

```bash
npm install
npm run dev      # local preview at http://localhost:5173
npm run build    # production build in /dist
```

Requires Node.js 20 or newer.

## 2. Edit your content: `src/config/site.config.ts`

| Field | What it controls |
| --- | --- |
| `token` | Name, ticker, chain, contract address, logo and mascot |
| `meta` | Browser title, SEO description, social preview image, favicon |
| `theme` | `"neon-purple"`, `"degen-green"` or `"solana-gradient"` |
| `links` | Buy (DEX), chart and social links. Remove a social to hide its icon |
| `nav` | Menu items and the section each one scrolls to |
| `hero` | Badge, headline, gradient highlight, subheadline and buttons |
| `sections` | Order of sections. Remove an id to hide that section |

Your editor autocompletes every field and flags typos before you build.

Button `href` accepts a key of `links` (`"buy"`, `"chart"`), a full URL, or an anchor like `"#tokenomics"`.

Leave `contract: ""` before launch and the copy field shows "Coming soon".

## 3. Images: `/public`

Replace `logo.svg`, `mascot.svg` and `favicon.svg` with your own (PNG, SVG or WebP).
If you change the file name, update the path in `site.config.ts`.
A square, transparent mascot around 960×960 px looks best.

## 4. Colors: `src/styles/theme.css`

Each preset is five lines. Change `--accent` and `--accent-2` (plus their `-rgb` twins, used for glows) to create your own brand colors.
`--noise-opacity` controls the film-grain texture (set `0` to remove it).

## 5. Deploy

Upload the `dist/` folder to any static host: Vercel, Netlify, Cloudflare Pages, or cPanel `public_html`.

## Project structure

```
src/
  config/site.config.ts   ← your content
  config/types.ts         (types for the config, no need to edit)
  styles/theme.css        ← your colors
  styles/index.css        (Tailwind setup and design tokens)
  components/ui/          Button, GlassCard, Badge, CopyField, Counter, Accordion, SectionHeading
  components/effects/     GlowBackground, NoiseOverlay, FloatingMascot, Reveal
  components/sections/    Navbar, Hero, …
  lib/                    hooks and helpers
```

Animations respect the visitor's "reduce motion" system setting automatically.
