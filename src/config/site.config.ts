import type { SiteConfig } from "./types";

/**
 * ─────────────────────────────────────────────────────────────
 *  SITE CONFIG — the only file you need to edit.
 *  Change the values below and the whole site updates.
 *  Colors live in src/styles/theme.css.
 * ─────────────────────────────────────────────────────────────
 */
export const siteConfig = {
  token: {
    name: "Pepe Moon",
    ticker: "$PMOON",
    chain: "solana",
    contract: "PMoon1111111111111111111111111111111111pump",
    logo: "/logo.svg",
    mascot: "/mascot.svg",
  },

  meta: {
    title: "Pepe Moon ($PMOON) — The Frog Heading to the Moon",
    description:
      "Pepe Moon is a community-driven memecoin on Solana. Zero tax, burned LP, and a frog on a mission.",
    ogImage: "/og-image.png",
    favicon: "/favicon.svg",
    url: "https://pepemoon.xyz",
  },

  // "neon-purple" | "degen-green" | "solana-gradient"
  theme: "neon-purple",

  links: {
    buy: "https://raydium.io/swap/",
    chart: "https://dexscreener.com/solana",
    x: "https://x.com/",
    telegram: "https://t.me/",
    discord: "https://discord.gg/",
    dexscreener: "https://dexscreener.com/solana",
  },

  nav: [
    { label: "About", target: "about" },
    { label: "Tokenomics", target: "tokenomics" },
    { label: "How to Buy", target: "howToBuy" },
    { label: "Roadmap", target: "roadmap" },
    { label: "FAQ", target: "faq" },
  ],

  hero: {
    badge: "Live on Solana",
    headline: "The frog is going",
    highlight: "to the moon",
    subheadline:
      "No VCs. No presale. No roadmap promises we can't keep. Just a frog, a rocket, and the strongest community on-chain.",
    ctaPrimary: { label: "Buy $PMOON", href: "buy" },
    ctaSecondary: { label: "View Chart", href: "chart" },
  },

  stats: [
    { label: "Total Supply", value: 1_000_000_000, compact: true },
    { label: "Holders", value: 12_480, suffix: "+" },
    { label: "Buy / Sell Tax", value: 0, suffix: "%" },
    { label: "LP Burned", value: 100, suffix: "%" },
  ],

  about: {
    title: "Born from a meme, built by the community",
    paragraphs: [
      "Pepe Moon started as a joke in a group chat and turned into a movement.",
      "Fair launch, liquidity burned, contract renounced. The frog belongs to everyone.",
    ],
    image: "/mascot.svg",
  },

  tokenomics: {
    totalSupply: 1_000_000_000,
    buyTax: 0,
    sellTax: 0,
    allocations: [
      { label: "Liquidity Pool", percent: 80, description: "Burned forever" },
      { label: "Marketing", percent: 10, description: "CEX listings & campaigns" },
      { label: "Community", percent: 7, description: "Airdrops & rewards" },
      { label: "Team", percent: 3, description: "Locked 12 months" },
    ],
  },

  howToBuy: [
    { title: "Get a wallet", description: "Download Phantom or Solflare.", icon: "wallet" },
    {
      title: "Get some SOL",
      description: "Buy SOL on an exchange and send it to your wallet.",
      icon: "coins",
    },
    {
      title: "Go to Raydium",
      description: "Connect your wallet and paste the contract address.",
      icon: "globe",
    },
    {
      title: "Swap for $PMOON",
      description: "Swap SOL for $PMOON. Welcome, frog.",
      icon: "arrow-left-right",
    },
  ],

  roadmap: [
    {
      phase: "Phase 1",
      title: "Hatch",
      status: "done",
      items: ["Fair launch", "LP burned", "1,000 holders"],
    },
    {
      phase: "Phase 2",
      title: "Hop",
      status: "in-progress",
      items: ["CoinGecko & CMC listing", "10,000 holders", "Meme contests"],
    },
    {
      phase: "Phase 3",
      title: "Moon",
      status: "upcoming",
      items: ["Tier-2 CEX listings", "Merch store", "100,000 holders"],
    },
  ],

  faq: [
    { q: "Is the liquidity locked?", a: "Liquidity is 100% burned, so it can never be removed." },
    { q: "Is there a tax?", a: "No. Buy and sell tax are both 0%." },
    { q: "Where can I buy?", a: "On Raydium or Jupiter, using the contract address above." },
  ],

  sections: ["hero", "stats", "about", "tokenomics", "howToBuy", "roadmap", "community", "faq"],

  features: {
    liveStats: false,
    animations: true,
  },

  footer: {
    disclaimer:
      "$PMOON is a memecoin with no intrinsic value or expectation of financial return. It is for entertainment purposes only. Always do your own research.",
    copyright: "© 2026 Pepe Moon. All rights reserved.",
  },
} satisfies SiteConfig;

export type { SiteConfig };
