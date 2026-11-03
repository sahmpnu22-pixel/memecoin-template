import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "accent" | "success" | "danger" | "neutral";

interface BadgeProps {
  tone?: Tone;
  /** Animated "live" dot before the label. */
  pulse?: boolean;
  className?: string;
  children: ReactNode;
}

const tones: Record<Tone, { box: string; dot: string }> = {
  accent: { box: "border-accent/30 bg-accent/10 text-accent", dot: "bg-accent" },
  success: { box: "border-success/30 bg-success/10 text-success", dot: "bg-success" },
  danger: { box: "border-danger/30 bg-danger/10 text-danger", dot: "bg-danger" },
  neutral: { box: "border-line bg-white/5 text-muted", dot: "bg-muted" },
};

export function Badge({ tone = "accent", pulse, className, children }: BadgeProps) {
  const t = tones[tone];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium",
        t.box,
        className,
      )}
    >
      {pulse && (
        <span className="relative flex size-2">
          <span
            className={cn("absolute inline-flex size-full rounded-full", t.dot)}
            style={{ animation: "ping-dot 1.4s cubic-bezier(0,0,0.2,1) infinite" }}
          />
          <span className={cn("relative inline-flex size-2 rounded-full", t.dot)} />
        </span>
      )}
      {children}
    </span>
  );
}
