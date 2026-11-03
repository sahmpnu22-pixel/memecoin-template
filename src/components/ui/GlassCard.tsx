import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Stronger blur & background, for overlays and highlighted cards. */
  strong?: boolean;
  /** Accent glow, e.g. for the active / featured card. */
  glow?: boolean;
  /** Lift and brighten on hover. */
  interactive?: boolean;
}

export function GlassCard({
  strong,
  glow,
  interactive,
  className,
  children,
  ...rest
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass relative overflow-hidden p-6",
        strong && "glass-strong rounded-lg",
        glow && "glow",
        interactive &&
          "transition-all duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-white/[0.06]",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
