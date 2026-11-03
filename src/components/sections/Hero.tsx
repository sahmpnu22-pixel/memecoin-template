import { ArrowRight, LineChart } from "lucide-react";
import { m, useReducedMotion, type Variants } from "motion/react";
import { siteConfig } from "@/config/site.config";
import { Badge, Button, CopyField } from "@/components/ui";
import { FloatingMascot } from "@/components/effects";
import { chainLabels } from "@/lib/chains";
import { resolveHref } from "@/lib/links";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero() {
  const { token, hero, features } = siteConfig;
  const reduce = useReducedMotion();

  return (
    <section id="hero" className="relative px-4 pt-32 pb-20 sm:pt-40 lg:pb-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        <m.div
          variants={container}
          initial={reduce ? false : "hidden"}
          animate="show"
          className="flex flex-col items-center gap-7 text-center lg:items-start lg:text-left"
        >
          {hero.badge && (
            <m.div variants={item}>
              <Badge pulse tone="success">
                {hero.badge}
              </Badge>
            </m.div>
          )}

          <m.h1
            variants={item}
            className="text-[2.75rem] leading-[1.02] font-bold sm:text-6xl lg:text-7xl"
          >
            {hero.headline} <span className="text-gradient">{hero.highlight}</span>
          </m.h1>

          <m.div
            variants={item}
            className="flex flex-wrap items-center justify-center gap-2 lg:justify-start"
          >
            <span className="border-line rounded-full border bg-white/5 px-3 py-1 font-mono text-sm font-semibold">
              {token.ticker}
            </span>
            <span className="border-line text-muted rounded-full border bg-white/5 px-3 py-1 text-sm">
              on {chainLabels[token.chain]}
            </span>
          </m.div>

          <m.p variants={item} className="text-muted max-w-xl text-base leading-relaxed sm:text-lg">
            {hero.subheadline}
          </m.p>

          <m.div variants={item} className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button
              href={resolveHref(hero.ctaPrimary.href)}
              size="lg"
              iconRight={<ArrowRight className="size-5" />}
            >
              {hero.ctaPrimary.label}
            </Button>
            <Button
              href={resolveHref(hero.ctaSecondary.href)}
              variant="secondary"
              size="lg"
              icon={<LineChart className="size-5" />}
            >
              {hero.ctaSecondary.label}
            </Button>
          </m.div>

          <m.div variants={item} className="flex w-full justify-center lg:justify-start">
            <CopyField value={token.contract} />
          </m.div>
        </m.div>

        <m.div
          initial={reduce ? false : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto w-full max-w-[420px] lg:max-w-[520px]"
        >
          <FloatingMascot
            src={token.mascot}
            alt={`${token.name} mascot`}
            animated={features.animations}
            className="aspect-square"
          />
        </m.div>
      </div>
    </section>
  );
}
