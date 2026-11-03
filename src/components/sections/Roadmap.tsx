import { Check, Circle, Loader } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import type { RoadmapStatus } from "@/config/types";
import { Reveal } from "@/components/effects";
import { Badge, GlassCard, SectionHeading } from "@/components/ui";
import { cn } from "@/lib/cn";

const statusMeta: Record<
  RoadmapStatus,
  { label: string; tone: "success" | "accent" | "neutral"; Icon: typeof Check; dot: string }
> = {
  done: { label: "Completed", tone: "success", Icon: Check, dot: "bg-success text-bg" },
  "in-progress": {
    label: "In progress",
    tone: "accent",
    Icon: Loader,
    dot: "bg-gradient-brand text-on-accent glow",
  },
  upcoming: {
    label: "Upcoming",
    tone: "neutral",
    Icon: Circle,
    dot: "bg-surface text-muted border border-line",
  },
};

export function Roadmap() {
  const { roadmap } = siteConfig;

  return (
    <section id="roadmap" className="px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="Roadmap"
          title="The journey to the moon"
          highlight="moon"
          description="Where we have been, where we are, and where we are headed."
        />

        <ol className="before:bg-line relative flex flex-col gap-8 before:absolute before:top-2 before:bottom-2 before:left-5 before:w-px">
          {roadmap.map((phase, i) => {
            const meta = statusMeta[phase.status];
            return (
              <li key={phase.phase} className="relative pl-16">
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute top-1 left-0 grid size-10 place-items-center rounded-full",
                    meta.dot,
                  )}
                >
                  <meta.Icon
                    className={cn(
                      "size-4",
                      phase.status === "in-progress" && "animate-spin [animation-duration:3s]",
                    )}
                  />
                </span>
                <Reveal delay={0.05 * i}>
                  <GlassCard
                    glow={phase.status === "in-progress"}
                    className={cn("p-6", phase.status === "upcoming" && "opacity-80")}
                  >
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className="text-muted font-mono text-xs tracking-wider uppercase">
                          {phase.phase}
                        </p>
                        <h3 className="text-xl font-semibold">{phase.title}</h3>
                      </div>
                      <Badge tone={meta.tone} pulse={phase.status === "in-progress"}>
                        {meta.label}
                      </Badge>
                    </div>
                    <ul className="text-muted flex flex-col gap-2 text-sm">
                      {phase.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <Check
                            className={cn(
                              "mt-0.5 size-4 shrink-0",
                              phase.status === "done" ? "text-success" : "text-white/20",
                            )}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
