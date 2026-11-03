import { siteConfig } from "@/config/site.config";
import type { CtaConfig, LinksConfig } from "@/config/types";

/** Resolve a CTA href: a key of `links` ("buy"), or a raw URL / anchor. */
export function resolveHref(href: CtaConfig["href"]): string {
  const links: LinksConfig = siteConfig.links;
  return href in links ? (links[href as keyof LinksConfig] ?? "#") : href;
}

export function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}

export function externalProps(href: string) {
  return isExternal(href) ? { target: "_blank", rel: "noopener noreferrer" } : {};
}
