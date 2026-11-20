import type { MetadataRoute } from "next";
export const dynamic = "force-static";
import { siteUrl } from "@/config/site";
import { routes, type RouteKey } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return (Object.keys(routes) as RouteKey[]).flatMap((k) =>
    (["it", "en"] as const).map((loc) => ({
      url: `${siteUrl}${routes[k][loc] === "/" ? "" : routes[k][loc]}`,
      lastModified: now,
      changeFrequency: k === "menu" ? ("weekly" as const) : ("monthly" as const),
      priority: k === "home" ? 1 : k === "menu" || k === "contact" ? 0.9 : 0.7,
      alternates: { languages: { it: `${siteUrl}${routes[k].it === "/" ? "" : routes[k].it}`, en: `${siteUrl}${routes[k].en}` } },
    })),
  );
}
