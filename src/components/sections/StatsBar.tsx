import { siteConfig } from "@/config/site.config";
import { Counter, GlassCard } from "@/components/ui";
import { Reveal } from "@/components/effects";

export function StatsBar() {
  const { stats } = siteConfig;
  if (stats.length === 0) return null;

  return (
    <section id="stats" aria-label="Key stats" className="px-4 py-8 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <GlassCard
            strong
            className="lg:divide-line grid grid-cols-2 gap-y-8 p-6 sm:p-8 lg:grid-cols-4 lg:gap-y-0 lg:divide-x"
          >
            {stats.map((stat) => (
              <dl key={stat.label} className="flex flex-col items-center gap-1.5 px-4 text-center">
                <dd className="order-1 text-3xl font-bold sm:text-4xl">
                  <Counter
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    compact={stat.compact}
                    decimals={stat.decimals}
                    className="text-gradient"
                  />
                </dd>
                <dt className="text-muted order-2 text-xs font-medium tracking-wider uppercase sm:text-sm">
                  {stat.label}
                </dt>
              </dl>
            ))}
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}
