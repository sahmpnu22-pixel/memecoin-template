# Memecoin Landing Template — Buyer's Guide

Launch a polished, dark-theme token landing page in **under 5 minutes**.
You only edit **two files** and one folder:

| What | Where |
| --- | --- |
| Your content (name, ticker, links, tokenomics, roadmap, FAQ) | `src/config/site.config.ts` |
| Your colors | `src/styles/theme.css` |
| Your images | `public/` |

You never need to touch the components.

---

## 5-minute quick start

**0:00 — Install** (Node.js 20.19 or newer)

```bash
npm install
npm run dev        # live preview at http://localhost:5173
```

**1:00 — Brand it.** Open `src/config/site.config.ts`. Your editor autocompletes every field and underlines typos.

1. `token`: name, ticker (with `$`), chain, contract address.
2. `links`: buy (DEX swap URL), chart, X, Telegram, Discord. Delete a social link to hide its icon everywhere.
3. `hero`: headline, the highlighted part of it, subheadline and the two buttons.

**3:00 — Swap the images.** Replace these files in `public/` (keep the names, or update the paths in the config):

| File | Used for | Recommended |
| --- | --- | --- |
| `logo.svg` | Navbar and footer | Square, SVG or PNG |
| `mascot.svg` | Hero and About | Transparent, about 960×960 px |
| `favicon.svg` | Browser tab | Square |
| `og-image.png` | Link preview on X and Telegram | 1200×630 px |

**4:00 — Pick a look.** Set `theme` to `"neon-purple"`, `"degen-green"` or `"solana-gradient"`.

**5:00 — Ship it.**

```bash
npm run build      # creates the /dist folder
```

Upload `/dist` to any static host (see "Deploy" below). Done.

---

## Config reference (`site.config.ts`)

| Field | What it controls |
| --- | --- |
| `token` | Name, ticker, chain, contract address, logo and mascot. An empty `contract` shows "Coming soon" |
| `meta` | Page title, SEO description, social preview image, favicon, production URL |
| `theme` | Color preset |
| `links` | Buy, chart and social links |
| `nav` | Menu items and the section each one scrolls to |
| `hero` | Badge, headline, gradient highlight, subheadline, buttons |
| `stats` | Key numbers with count-up animation (`prefix`, `suffix`, `compact`, `decimals` are optional) |
| `about` | Story title, paragraphs and image |
| `tokenomics` | Total supply, buy/sell tax and allocations. **Percentages must add up to 100** (a warning appears in the dev console if not) |
| `howToBuy` | Buying steps. Icons: `wallet`, `coins`, `arrow-left-right`, `rocket`, `globe`, `shield` |
| `roadmap` | Phases with status `done`, `in-progress` or `upcoming` |
| `community` | Title and text of the Community section |
| `faq` | Questions and answers |
| `sections` | Order of sections. Remove an id to hide that section |
| `features` | `animations` toggles mascot motion. (`liveStats` is reserved for a future live-price module) |
| `footer` | Disclaimer and copyright |

A button `href` accepts a key of `links` (`"buy"`, `"chart"`), a full URL, or an anchor such as `"#tokenomics"`.

### Colors (`src/styles/theme.css`)

Each preset is five lines. To create your own brand, copy a preset block and change:

```css
--accent: #8b5cf6;          /* main color */
--accent-2: #22d3ee;        /* second gradient color */
--accent-rgb: 139 92 246;   /* same as --accent, as R G B (used for glows) */
--accent-2-rgb: 34 211 238; /* same as --accent-2 */
--on-accent: #ffffff;       /* text color on accent buttons */
```

The tokenomics chart, buttons, glows and badges recolor automatically.
`--noise-opacity` controls the film-grain texture (`0` removes it).

---

## Deploy

Run `npm run build`, then upload the **contents of `dist/`**:

| Host | How |
| --- | --- |
| Vercel / Netlify / Cloudflare Pages | Connect the repo. Build command `npm run build`, output directory `dist` |
| cPanel / shared hosting | Upload the contents of `dist/` to `public_html` |
| Any static host | Upload `dist/` |

After deploying, set `meta.url` and use a full `https://…` address for `meta.ogImage` so link previews work on X and Telegram.

---

## Launch checklist

- [ ] Contract address, buy link and chart link are real (open each one)
- [ ] Token name, ticker and chain are correct everywhere
- [ ] Tokenomics adds up to 100% and matches your real allocation
- [ ] `og-image.png` is your own, `meta.url` is your domain
- [ ] Disclaimer and copyright are yours
- [ ] Checked on a phone

> Only publish claims that are true for your token (burned LP, renounced contract, locks, taxes).

---

## Troubleshooting

| Problem | Fix |
| --- | --- |
| Red underline in `site.config.ts` | A field name or value is misspelled. Hover to see the allowed values |
| A section disappeared | Check that its id is still in `sections` |
| A social icon is missing | Its link in `links` is empty |
| Chart looks wrong | `tokenomics.allocations` must add up to 100 |
| Link preview shows the wrong image | Use a full `https://` URL in `meta.ogImage`, then clear the cache with the platform's card validator |
| `npm run build` fails | Use Node.js 20.19+ and run `npm install` again |

---

## Project structure

```
src/
  config/site.config.ts   ← your content
  config/types.ts         (types for the config, no need to edit)
  styles/theme.css        ← your colors
  styles/index.css        (Tailwind setup and design tokens)
  components/ui/          Button, GlassCard, Badge, CopyField, Counter, Accordion, SectionHeading
  components/effects/     GlowBackground, NoiseOverlay, FloatingMascot, Reveal
  components/sections/    Navbar, Hero, Stats, About, Tokenomics, HowToBuy, Roadmap, Community, FAQ, Footer
  lib/                    hooks and helpers
public/                   ← your images
```

**Tech:** React 18, TypeScript (strict), Tailwind CSS v4, Motion, Vite. Fonts are bundled (no external requests).
Animations respect the visitor's "reduce motion" setting automatically.
Useful commands: `npm run lint`, `npm run format`.

---

## Support & license

One purchase = one project (your own token). Don't resell or redistribute the template source.
Questions about setup? Contact the seller from your order.
