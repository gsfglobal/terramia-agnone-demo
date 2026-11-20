import type { Metadata } from "next";
import { demoMode, siteUrl } from "@/config/site";
import { type Locale, type RouteKey, routes } from "./i18n";

export function pageMeta(key: RouteKey, locale: Locale, title: string, description: string): Metadata {
  const path = routes[key][locale];
  return {
    title: key === "home" ? { absolute: title } : title,
    description,
    alternates: {
      canonical: path,
      languages: { it: routes[key].it, en: routes[key].en, "x-default": routes[key].it },
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: "Terra Mia — Ristorante Braceria",
      locale: locale === "it" ? "it_IT" : "en_GB",
      type: "website",
      images: [{ url: (process.env.NEXT_PUBLIC_BASE_PATH || "") + "/og.jpg", width: 1200, height: 630, alt: "Terra Mia — Ristorante Braceria, Agnone" }],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Terra Mia — Ristorante Braceria ad Agnone", template: "%s · Terra Mia Agnone" },
  applicationName: "Terra Mia",
  // In demo il sito non deve essere indicizzato
  robots: demoMode ? { index: false, follow: false } : { index: true, follow: true },
  formatDetection: { telephone: true, email: true, address: false },
};
