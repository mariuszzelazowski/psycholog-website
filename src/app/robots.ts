import type { MetadataRoute } from "next";
import { getSiteUrl, isIndexable } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();

  if (!isIndexable()) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
