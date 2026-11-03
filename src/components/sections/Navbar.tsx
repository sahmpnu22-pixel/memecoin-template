import { Menu, Rocket, X } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import { useEffect, useState, type ComponentType, type SVGProps } from "react";
import { siteConfig } from "@/config/site.config";
import type { SocialKey } from "@/config/types";
import { Button } from "@/components/ui";
import { DexScreenerIcon, DiscordIcon, TelegramIcon, XIcon } from "@/components/ui/BrandIcons";
import { cn } from "@/lib/cn";
import { externalProps } from "@/lib/links";
import { useActiveSection } from "@/lib/useActiveSection";
import { useScrolled } from "@/lib/useScrolled";

const socialIcons: Record<
  SocialKey,
  { label: string; Icon: ComponentType<SVGProps<SVGSVGElement>> }
> = {
  x: { label: "X (Twitter)", Icon: XIcon },
  telegram: { label: "Telegram", Icon: TelegramIcon },
  discord: { label: "Discord", Icon: DiscordIcon },
  dexscreener: { label: "DEX Screener", Icon: DexScreenerIcon },
};

export function Navbar() {
  const { token, links, nav, sections } = siteConfig;
  const items = nav.filter((item) => (sections as readonly string[]).includes(item.target));
  const active = useActiveSection(items.map((i) => i.target));
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);

  const socials = (Object.keys(socialIcons) as SocialKey[])
    .filter((key) => key !== "dexscreener" && links[key])
    .map((key) => ({ key, href: links[key] as string, ...socialIcons[key] }));

  // Close the mobile menu on Escape and lock page scroll while it is open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav
        aria-label="Main"
        className={cn(
          "mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 rounded-full px-3 pl-5 transition-all duration-300",
          scrolled ? "glass-strong shadow-2xl shadow-black/40" : "border border-transparent",
        )}
      >
        <a href="#top" className="flex items-center gap-2.5" aria-label={`${token.name} home`}>
          <img src={token.logo} alt="" width={32} height={32} className="size-8 rounded-full" />
          <span className="font-display text-lg font-bold">{token.ticker}</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {items.map((item) => (
            <li key={item.target}>
              <a
                href={`#${item.target}`}
                aria-current={active === item.target ? "true" : undefined}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  active === item.target ? "text-text" : "text-muted hover:text-text",
                )}
              >
                {active === item.target && (
                  <m.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-white/[0.07]"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <div className="hidden items-center sm:flex">
            {socials.map(({ key, href, label, Icon }) => (
              <a
                key={key}
                href={href}
                aria-label={label}
                {...externalProps(href)}
                className="text-muted hover:text-text grid size-10 place-items-center rounded-full transition-colors hover:bg-white/5"
              >
                <Icon className="size-[18px]" />
              </a>
            ))}
          </div>
          <Button href={links.buy} size="sm" icon={<Rocket className="size-4" />} className="ml-1">
            Buy Now
          </Button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="text-text grid size-11 place-items-center rounded-full hover:bg-white/5 lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            <m.div
              className="fixed inset-0 -z-10 bg-black/60 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <m.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="glass-strong mx-auto mt-3 max-w-6xl rounded-[var(--r-lg)] p-4 lg:hidden"
            >
              <ul className="flex flex-col">
                {items.map((item) => (
                  <li key={item.target}>
                    <a
                      href={`#${item.target}`}
                      onClick={() => setOpen(false)}
                      className="font-display text-muted hover:text-text block rounded-[var(--r-md)] px-4 py-3 text-lg font-medium transition-colors hover:bg-white/5"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="border-line mt-3 flex items-center justify-between gap-3 border-t pt-4">
                <div className="flex">
                  {socials.map(({ key, href, label, Icon }) => (
                    <a
                      key={key}
                      href={href}
                      aria-label={label}
                      {...externalProps(href)}
                      className="text-muted hover:text-text grid size-11 place-items-center rounded-full hover:bg-white/5"
                    >
                      <Icon className="size-5" />
                    </a>
                  ))}
                </div>
                <Button href={links.buy} size="md" icon={<Rocket className="size-4" />}>
                  Buy Now
                </Button>
              </div>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
