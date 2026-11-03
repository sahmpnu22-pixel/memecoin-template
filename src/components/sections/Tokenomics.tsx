import { useState } from "react";
import { siteConfig } from "@/config/site.config";
import { Reveal } from "@/components/effects";
import { Badge, GlassCard, SectionHeading } from "@/components/ui";
import { cn } from "@/lib/cn";
import { formatNumber } from "@/lib/format";

const SIZE = 320;
const STROKE = 44;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
/** Visual gap between segments, in px of arc length. */
const GAP = 4;

/** Segment color: explicit override, else a step along the accent → accent-2 gradient of the theme. */
function segmentColor(index: number, total: number, override?: string) {
  if (override) return override;
  const pct = total <= 1 ? 0 : Math.round((index / (total - 1)) * 100);
  return `color-mix(in oklab, var(--accent), var(--accent-2) ${pct}%)`;
}

export function Tokenomics() {
  const { tokenomics, token } = siteConfig;
  const { allocations, totalSupply, buyTax, sellTax } = tokenomics;
  const [active, setActive] = useState<number | null>(null);

  const sum = allocations.reduce((acc, a) => acc + a.percent, 0);
  if (import.meta.env.DEV && Math.round(sum) !== 100) {
    console.warn(`[site.config] tokenomics.allocations add up to ${sum}%, expected 100%.`);
  }

  // Each segment starts where the previous ones end
  const segments = allocations.map((a, i) => {
    const before = allocations.slice(0, i).reduce((acc, x) => acc + x.percent, 0);
    return {
      ...a,
      length: (a.percent / (sum || 1)) * CIRCUMFERENCE,
      offset: (before / (sum || 1)) * CIRCUMFERENCE,
      color: segmentColor(i, allocations.length, a.color),
    };
  });

  const current = active === null ? null : segments[active];

  return (
    <section id="tokenomics" className="px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Tokenomics"
          title="Fair, simple, transparent"
          highlight="transparent"
          description="No hidden wallets and no surprise unlocks. Here is exactly where every token goes."
        />

        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-16">
          <Reveal className="mx-auto w-full max-w-[380px]">
            <div className="relative aspect-square">
              <div
                aria-hidden="true"
                className="bg-gradient-brand absolute inset-10 rounded-full opacity-20 blur-3xl"
              />
              <svg
                viewBox={`0 0 ${SIZE} ${SIZE}`}
                role="img"
                aria-label={`${token.ticker} token allocation: ${allocations
                  .map((a) => `${a.label} ${a.percent}%`)
                  .join(", ")}`}
                className="relative size-full -rotate-90"
                onMouseLeave={() => setActive(null)}
              >
                <circle
                  cx={SIZE / 2}
                  cy={SIZE / 2}
                  r={RADIUS}
                  fill="none"
                  stroke="var(--line)"
                  strokeWidth={STROKE}
                />
                {segments.map((seg, i) => (
                  <circle
                    key={seg.label}
                    cx={SIZE / 2}
                    cy={SIZE / 2}
                    r={RADIUS}
                    fill="none"
                    stroke={seg.color}
                    strokeWidth={active === i ? STROKE + 10 : STROKE}
                    strokeDasharray={`${Math.max(seg.length - GAP, 0.01)} ${CIRCUMFERENCE}`}
                    strokeDashoffset={-seg.offset}
                    tabIndex={0}
                    aria-label={`${seg.label}: ${seg.percent}%`}
                    className="cursor-pointer transition-[stroke-width,opacity] duration-200 outline-none"
                    style={{ opacity: active === null || active === i ? 1 : 0.35 }}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onBlur={() => setActive(null)}
                  />
                ))}
              </svg>

              <div
                className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center"
                aria-live="polite"
              >
                <span className="text-muted text-xs tracking-wider uppercase">
                  {current ? current.label : "Total Supply"}
                </span>
                <span className="font-display text-4xl font-bold sm:text-5xl">
                  {current ? `${current.percent}%` : formatNumber(totalSupply, { compact: true })}
                </span>
                <span className="text-muted font-mono text-xs">
                  {current
                    ? `${formatNumber((current.percent / 100) * totalSupply, { compact: true })} ${token.ticker}`
                    : token.ticker}
                </span>
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col gap-6">
            <Reveal className="flex flex-wrap gap-2">
              <Badge tone={buyTax === 0 ? "success" : "neutral"}>Buy tax {buyTax}%</Badge>
              <Badge tone={sellTax === 0 ? "success" : "neutral"}>Sell tax {sellTax}%</Badge>
              <Badge tone="neutral">Supply {formatNumber(totalSupply)}</Badge>
            </Reveal>

            <ul className="grid gap-3 sm:grid-cols-2">
              {segments.map((seg, i) => (
                <li key={seg.label}>
                  <Reveal delay={0.06 * i}>
                    <GlassCard
                      interactive
                      className={cn(
                        "flex h-full flex-col gap-3 p-5",
                        active === i && "border-white/20 bg-white/[0.08]",
                      )}
                      onMouseEnter={() => setActive(i)}
                      onMouseLeave={() => setActive(null)}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-display flex items-center gap-2.5 font-semibold">
                          <span
                            aria-hidden="true"
                            className="size-3 rounded-full"
                            style={{ background: seg.color, boxShadow: `0 0 12px ${seg.color}` }}
                          />
                          {seg.label}
                        </span>
                        <span className="font-mono text-xl font-bold">{seg.percent}%</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${seg.percent}%`, background: seg.color }}
                        />
                      </div>
                      <div className="text-muted flex items-center justify-between gap-3 text-sm">
                        <span>{seg.description}</span>
                        <span className="shrink-0 font-mono text-xs">
                          {formatNumber((seg.percent / 100) * totalSupply, { compact: true })}
                        </span>
                      </div>
                    </GlassCard>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
