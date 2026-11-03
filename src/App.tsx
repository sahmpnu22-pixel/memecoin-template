import { LazyMotion, MotionConfig } from "motion/react";
import type { ComponentType } from "react";
import { siteConfig } from "@/config/site.config";
import type { SectionId } from "@/config/types";
import { GlowBackground, NoiseOverlay } from "@/components/effects";
import {
  About,
  Community,
  FAQ,
  Footer,
  Hero,
  HowToBuy,
  Navbar,
  Roadmap,
  StatsBar,
  Tokenomics,
} from "@/components/sections";
import { useSiteMeta } from "@/lib/useSiteMeta";

/**
 * Section registry. Each id in `siteConfig.sections` renders its component,
 * in that order. Ids without a component yet are skipped.
 */
const registry: Partial<Record<SectionId, ComponentType>> = {
  hero: Hero,
  stats: StatsBar,
  about: About,
  tokenomics: Tokenomics,
  howToBuy: HowToBuy,
  roadmap: Roadmap,
  community: Community,
  faq: FAQ,
};

const loadMotionFeatures = () => import("@/lib/motionFeatures").then((mod) => mod.default);

export default function App() {
  useSiteMeta();

  return (
    <LazyMotion features={loadMotionFeatures} strict>
      <MotionConfig reducedMotion="user">
        <div id="top" className="relative min-h-dvh overflow-x-clip">
          <GlowBackground />
          <NoiseOverlay />
          <a
            href="#main"
            className="focus:bg-surface sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:px-4 focus:py-2"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main">
            {siteConfig.sections.map((id) => {
              const Section = registry[id];
              return Section ? <Section key={id} /> : null;
            })}
          </main>
          <Footer />
        </div>
      </MotionConfig>
    </LazyMotion>
  );
}
