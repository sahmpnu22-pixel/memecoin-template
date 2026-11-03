import { siteConfig } from "@/config/site.config";
import type { SocialKey } from "@/config/types";
import { DexScreenerIcon, DiscordIcon, TelegramIcon, XIcon } from "@/components/ui/BrandIcons";
import { externalProps } from "@/lib/links";
import type { ComponentType, SVGProps } from "react";

const socials: Record<SocialKey, { label: string; Icon: ComponentType<SVGProps<SVGSVGElement>> }> =
  {
    x: { label: "X (Twitter)", Icon: XIcon },
    telegram: { label: "Telegram", Icon: TelegramIcon },
    discord: { label: "Discord", Icon: DiscordIcon },
    dexscreener: { label: "DEX Screener", Icon: DexScreenerIcon },
  };

export function Footer() {
  const { token, links, nav, sections, footer } = siteConfig;
  const navItems = nav.filter((item) => (sections as readonly string[]).includes(item.target));
  const socialItems = (Object.keys(socials) as SocialKey[]).filter((key) => links[key]);

  return (
    <footer className="border-line border-t px-4 pt-14 pb-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
          <a href="#top" className="flex items-center gap-2.5" aria-label={`${token.name} home`}>
            <img
              src={token.logo}
              alt=""
              width={36}
              height={36}
              loading="lazy"
              className="size-9 rounded-full"
            />
            <span className="font-display text-xl font-bold">{token.name}</span>
          </a>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {navItems.map((item) => (
                <li key={item.target}>
                  <a
                    href={`#${item.target}`}
                    className="text-muted hover:text-text text-sm transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={links.chart}
                  {...externalProps(links.chart)}
                  className="text-muted hover:text-text text-sm transition-colors"
                >
                  Chart
                </a>
              </li>
            </ul>
          </nav>

          <ul className="flex">
            {socialItems.map((key) => {
              const { label, Icon } = socials[key];
              const href = links[key] as string;
              return (
                <li key={key}>
                  <a
                    href={href}
                    aria-label={label}
                    {...externalProps(href)}
                    className="text-muted hover:text-text grid size-11 place-items-center rounded-full transition-colors hover:bg-white/5"
                  >
                    <Icon className="size-5" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <p className="glass text-muted !rounded-[var(--r-md)] p-4 text-center text-xs leading-relaxed">
          {footer.disclaimer}
        </p>
        <p className="text-muted/70 text-center text-xs">{footer.copyright}</p>
      </div>
    </footer>
  );
}
