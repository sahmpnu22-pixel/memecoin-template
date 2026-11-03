import { m, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import type { PointerEvent } from "react";
import { cn } from "@/lib/cn";

interface FloatingMascotProps {
  src: string;
  alt: string;
  /** Mouse-tilt and idle float. Turn off via features.animations. */
  animated?: boolean;
  className?: string;
}

export function FloatingMascot({ src, alt, animated = true, className }: FloatingMascotProps) {
  const reduce = useReducedMotion();
  const active = animated && !reduce;

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), {
    stiffness: 150,
    damping: 15,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), {
    stiffness: 150,
    damping: 15,
  });

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!active) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div
      className={cn("relative flex items-center justify-center [perspective:1000px]", className)}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {/* Glow halo */}
      <div
        aria-hidden="true"
        className="bg-gradient-brand absolute inset-[12%] rounded-full opacity-50 blur-3xl"
        style={active ? { animation: "pulse-glow 6s ease-in-out infinite" } : undefined}
      />
      {/* Orbit ring */}
      <div aria-hidden="true" className="absolute inset-[4%] rounded-full border border-white/10" />
      <div
        aria-hidden="true"
        className="absolute inset-[16%] rounded-full border border-dashed border-white/10"
      />

      <m.div style={active ? { rotateX, rotateY } : undefined} className="relative w-[78%]">
        <img
          src={src}
          alt={alt}
          width={480}
          height={480}
          fetchPriority="high"
          className="h-auto w-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)] select-none"
          style={active ? { animation: "float 6s ease-in-out infinite" } : undefined}
          draggable={false}
        />
      </m.div>
    </div>
  );
}
