import { cn } from "@/lib/cn";
import { Reveal } from "@/components/effects/Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  /** Word(s) inside `title` to render with the brand gradient. */
  highlight?: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  const parts = highlight && title.includes(highlight) ? title.split(highlight) : [title];

  return (
    <Reveal
      className={cn(
        "mb-12 flex max-w-2xl flex-col gap-4",
        align === "center" ? "mx-auto items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow && (
        <span className="text-accent font-mono text-xs font-semibold tracking-[0.2em] uppercase">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
        {parts[0]}
        {parts.length > 1 && <span className="text-gradient">{highlight}</span>}
        {parts[1]}
      </h2>
      {description && <p className="text-muted text-base sm:text-lg">{description}</p>}
    </Reveal>
  );
}
