/**
 * Type definitions for site.config.ts.
 * Buyers don't need to edit this file: it powers autocomplete and
 * catches typos in the config at build time.
 */

export type Chain = "solana" | "ethereum" | "base" | "bsc" | "arbitrum" | "ton";

export type ThemePreset = "neon-purple" | "degen-green" | "solana-gradient";

export type SectionId =
  "hero" | "stats" | "about" | "tokenomics" | "howToBuy" | "roadmap" | "community" | "faq";

export type RoadmapStatus = "done" | "in-progress" | "upcoming";

/** Names of lucide-react icons used in "How to Buy" steps. */
export type StepIcon = "wallet" | "coins" | "arrow-left-right" | "rocket" | "globe" | "shield";

export type SocialKey = "x" | "telegram" | "discord" | "dexscreener";

export interface TokenConfig {
  name: string;
  /** Include the "$", e.g. "$PMOON". */
  ticker: string;
  chain: Chain;
  /** Contract / mint address. Leave "" to show "Coming soon". */
  contract: string;
  /** Path inside /public, e.g. "/logo.svg". */
  logo: string;
  /** Large hero image. Path inside /public. */
  mascot: string;
}

export interface MetaConfig {
  title: string;
  description: string;
  /** Absolute URL recommended for social previews. */
  ogImage: string;
  favicon: string;
  /** Production URL, used for canonical and og:url. */
  url: string;
}

export interface LinksConfig {
  buy: string;
  chart: string;
  x?: string;
  telegram?: string;
  discord?: string;
  dexscreener?: string;
}

export interface CtaConfig {
  label: string;
  /** Either a key of `links` or a full URL / "#section" anchor. */
  href: keyof LinksConfig | (string & {});
}

export interface HeroConfig {
  /** Small pill above the headline. Leave "" to hide. */
  badge: string;
  headline: string;
  /** Part of the headline rendered with the brand gradient. */
  highlight: string;
  subheadline: string;
  ctaPrimary: CtaConfig;
  ctaSecondary: CtaConfig;
}

export interface NavItem {
  label: string;
  /** Section to scroll to. */
  target: SectionId;
}

export interface StatItem {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  /** Use compact notation, e.g. 1B instead of 1,000,000,000. */
  compact?: boolean;
  decimals?: number;
}

export interface AboutConfig {
  title: string;
  paragraphs: string[];
  image: string;
}

export interface Allocation {
  label: string;
  percent: number;
  /** Optional override; otherwise taken from the theme palette. */
  color?: string;
  description?: string;
}

export interface TokenomicsConfig {
  totalSupply: number;
  buyTax: number;
  sellTax: number;
  allocations: Allocation[];
}

export interface HowToBuyStep {
  title: string;
  description: string;
  icon: StepIcon;
}

export interface RoadmapPhase {
  phase: string;
  title: string;
  status: RoadmapStatus;
  items: string[];
}

export interface CommunityConfig {
  title: string;
  description: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface FooterConfig {
  disclaimer: string;
  copyright: string;
}

export interface FeaturesConfig {
  /** Pull live price / market cap from DEX Screener. */
  liveStats: boolean;
  /** Mouse-reactive glow and floating mascot. */
  animations: boolean;
}

export interface SiteConfig {
  token: TokenConfig;
  meta: MetaConfig;
  theme: ThemePreset;
  links: LinksConfig;
  nav: NavItem[];
  hero: HeroConfig;
  stats: StatItem[];
  about: AboutConfig;
  tokenomics: TokenomicsConfig;
  howToBuy: HowToBuyStep[];
  roadmap: RoadmapPhase[];
  community: CommunityConfig;
  faq: FaqItem[];
  /** Order of sections on the page. Remove an id to hide that section. */
  sections: SectionId[];
  features: FeaturesConfig;
  footer: FooterConfig;
}
