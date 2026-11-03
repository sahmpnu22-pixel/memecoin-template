import { cn } from "@/lib/cn";
import { formatNumber } from "@/lib/format";
import { useCountUp } from "@/lib/useCountUp";
import { useInView } from "@/lib/useInView";

interface CounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  compact?: boolean;
  decimals?: number;
  duration?: number;
  className?: string;
}

/** Number that counts up when it scrolls into view. */
export function Counter({
  value,
  prefix = "",
  suffix = "",
  compact,
  decimals,
  duration,
  className,
}: CounterProps) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const current = useCountUp(value, inView, duration);

  return (
    <span ref={ref} className={cn("font-mono tabular-nums", className)}>
      <span aria-hidden="true">
        {prefix}
        {formatNumber(current, { compact, decimals })}
        {suffix}
      </span>
      <span className="sr-only">
        {prefix}
        {formatNumber(value, { compact, decimals })}
        {suffix}
      </span>
    </span>
  );
}
