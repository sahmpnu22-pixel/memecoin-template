import { Check, Copy } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import { cn } from "@/lib/cn";
import { shortenAddress } from "@/lib/format";
import { useCopy } from "@/lib/useCopy";

interface CopyFieldProps {
  value: string;
  label?: string;
  /** Shown instead of the value when it is empty. */
  placeholder?: string;
  className?: string;
}

export function CopyField({
  value,
  label = "CA",
  placeholder = "Coming soon",
  className,
}: CopyFieldProps) {
  const { copied, copy } = useCopy();
  const empty = value.trim() === "";

  return (
    <div
      className={cn(
        "glass flex w-full max-w-xl items-center gap-3 !rounded-full p-1.5 pl-4 text-left",
        className,
      )}
    >
      <span className="text-accent shrink-0 font-mono text-xs font-semibold uppercase">
        {label}
      </span>
      <span className="text-muted min-w-0 flex-1 truncate font-mono text-sm" title={value}>
        <span className="hidden sm:inline">{empty ? placeholder : value}</span>
        <span className="sm:hidden">{empty ? placeholder : shortenAddress(value)}</span>
      </span>
      <button
        type="button"
        disabled={empty}
        onClick={() => copy(value)}
        aria-label={copied ? "Copied" : "Copy contract address"}
        className={cn(
          "relative inline-flex h-9 shrink-0 items-center gap-1.5 overflow-hidden rounded-full px-4 text-xs font-semibold transition-colors",
          copied ? "bg-success/15 text-success" : "text-text bg-white/10 hover:bg-white/15",
          "disabled:opacity-40",
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          <m.span
            key={copied ? "done" : "copy"}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="inline-flex items-center gap-1.5"
          >
            {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            {copied ? "Copied" : "Copy"}
          </m.span>
        </AnimatePresence>
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? "Contract address copied to clipboard" : ""}
      </span>
    </div>
  );
}
