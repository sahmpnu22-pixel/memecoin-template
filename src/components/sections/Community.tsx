import { ArrowUpRight } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { siteConfig } from "@/config/site.config";
import type { SocialKey } from "@/config/types";
import { Reveal } from "@/components/effects";
import { GlassCard, SectionHeading } from "@/components/ui";
import { DexScreenerIcon, DiscordIcon, TelegramIcon, XIcon } from "@/components/ui/BrandIcons";
import { externalProps } from "@/lib/links";

const socials: Record<
  SocialKey,
  { name: string; blurb: string; Icon: ComponentType<SVGProps<SVGSVGElement>> }
> = {
  x: { name: "X (Twitter)", blurb: "News, memes and raids", Icon: XIcon },
  telegram: { name: "Telegram", blurb: "Chat with the community", Icon: TelegramIcon },
  discord: { name: "Discord", blurb: "Events and giveaways", Icon: DiscordIcon },
  dexscreener: { name: "DEX Screener", blurb: "Live price and chart", Icon: DexScreenerIcon },
};

const order: SocialKey[] = ["x", "telegram", "discord", "dexscreener"];

export function Community() {
  const { links, community } = siteConfig;
  // Only socials with a link are shown
  const items = order.filter((key) => links[key]);
  if (items.length === 0) return null;

  return (
    <section id="community" className="px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Community"
          title={community.title}
          description={community.description}
        />

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((key, i) => {
            const { name, blurb, Icon } = socials[key];
            const href = links[key] as string;
            return (
              <li key={key}>
                <Reveal delay={0.07 * i} className="h-full">
                  <a
                    href={href}
                    {...externalProps(href)}
                    className="group block h-full rounded-[var(--r-lg)]"
                  >
                    <GlassCard interactive className="group-hover:glow flex h-full flex-col gap-5">
                      <div className="flex items-center justify-between">
                        <span className="text-text group-hover:bg-gradient-brand group-hover:text-on-accent grid size-12 place-items-center rounded-[var(--r-md)] bg-white/[0.06] transition-colors">
                          <Icon className="size-6" />
                        </span>
                        <ArrowUpRight className="text-muted group-hover:text-text size-5 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{name}</h3>
                        <p className="text-muted text-sm">{blurb}</p>
                      </div>
                    </GlassCard>
                  </a>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
