import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { externalProps } from "@/lib/links";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  iconRight?: ReactNode;
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & { href?: undefined };
type ButtonAsLink = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-display font-semibold whitespace-nowrap transition-all duration-200 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-gradient-brand text-on-accent glow hover:brightness-110 hover:-translate-y-0.5",
  secondary: "glass text-text hover:bg-white/10 hover:-translate-y-0.5 !rounded-full",
  ghost: "text-muted hover:text-text hover:bg-white/5",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-14 px-8 text-base",
};

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", icon, iconRight, className, children, ...rest } = props;
  const classes = cn(base, variants[variant], sizes[size], className);
  const content = (
    <>
      {icon}
      <span>{children}</span>
      {iconRight && (
        <span className="transition-transform duration-200 group-hover:translate-x-0.5">
          {iconRight}
        </span>
      )}
    </>
  );

  if (rest.href !== undefined) {
    const anchorProps = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a className={classes} {...externalProps(rest.href)} {...anchorProps}>
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
}
