import {
  ArrowLeftRight,
  Coins,
  Globe,
  Rocket,
  ShieldCheck,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { siteConfig } from "@/config/site.config";
import type { StepIcon } from "@/config/types";
import { Reveal } from "@/components/effects";
import { Button, GlassCard, SectionHeading } from "@/components/ui";

const icons: Record<StepIcon, LucideIcon> = {
  wallet: Wallet,
  coins: Coins,
  "arrow-left-right": ArrowLeftRight,
  rocket: Rocket,
  globe: Globe,
  shield: ShieldCheck,
};

export function HowToBuy() {
  const { howToBuy, links, token } = siteConfig;

  return (
    <section id="howToBuy" className="px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="How to Buy"
          title={`Get ${token.ticker} in 4 easy steps`}
          highlight={token.ticker}
          description="New to crypto? Follow these steps and you will be a holder in minutes."
        />

        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {howToBuy.map((step, i) => {
            const Icon = icons[step.icon];
            return (
              <li key={step.title}>
                <Reveal delay={0.08 * i} className="h-full">
                  <GlassCard interactive className="flex h-full flex-col gap-4">
                    <span
                      aria-hidden="true"
                      className="absolute top-3 right-4 font-mono text-5xl font-bold text-white/[0.06]"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="bg-gradient-brand glow text-on-accent grid size-12 place-items-center rounded-[var(--r-md)]">
                      <Icon className="size-6" />
                    </span>
                    <h3 className="text-lg font-semibold">
                      <span className="sr-only">Step {i + 1}: </span>
                      {step.title}
                    </h3>
                    <p className="text-muted text-sm leading-relaxed">{step.description}</p>
                  </GlassCard>
                </Reveal>
              </li>
            );
          })}
        </ol>

        <Reveal className="mt-10 flex justify-center">
          <Button href={links.buy} size="lg" icon={<Rocket className="size-5" />}>
            Buy {token.ticker} now
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
