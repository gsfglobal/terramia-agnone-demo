import type { MetadataRoute } from "next";
export const dynamic = "force-static";
import { demoMode, siteUrl } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  if (demoMode) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin"] },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
