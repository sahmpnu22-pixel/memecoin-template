import { Plus } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import { useId, useState } from "react";
import { cn } from "@/lib/cn";

export interface AccordionItem {
  q: string;
  a: string;
}

interface AccordionProps {
  items: AccordionItem[];
  /** Allow several panels open at once. */
  multiple?: boolean;
  defaultOpen?: number;
  className?: string;
}

export function Accordion({ items, multiple = false, defaultOpen, className }: AccordionProps) {
  const [open, setOpen] = useState<number[]>(defaultOpen === undefined ? [] : [defaultOpen]);
  const baseId = useId();

  const toggle = (i: number) =>
    setOpen((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : multiple ? [...prev, i] : [i],
    );

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {items.map((item, i) => {
        const isOpen = open.includes(i);
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;
        return (
          <div
            key={item.q}
            className={cn("glass transition-colors", isOpen && "border-accent/30 bg-white/[0.06]")}
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
                className="font-display flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-base font-semibold sm:text-lg"
              >
                {item.q}
                <Plus
                  className={cn(
                    "text-accent size-5 shrink-0 transition-transform duration-300",
                    isOpen && "rotate-45",
                  )}
                />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <m.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <p className="text-muted px-6 pb-5 leading-relaxed">{item.a}</p>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
