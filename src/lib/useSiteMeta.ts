import { useEffect } from "react";
import { siteConfig } from "@/config/site.config";

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

/** Apply theme preset, <title>, favicon and SEO / Open Graph tags from the config. */
export function useSiteMeta() {
  useEffect(() => {
    const { meta, theme } = siteConfig;
    document.documentElement.dataset.theme = theme;
    document.title = meta.title;

    setMeta("name", "description", meta.description);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:title", meta.title);
    setMeta("property", "og:description", meta.description);
    setMeta("property", "og:image", meta.ogImage);
    setMeta("property", "og:url", meta.url);
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", meta.title);
    setMeta("name", "twitter:description", meta.description);
    setMeta("name", "twitter:image", meta.ogImage);

    const icon = document.head.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (icon) icon.href = meta.favicon;
  }, []);
}
