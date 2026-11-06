import type { MetadataRoute } from "next";
import { aboutSlides, heroSlides } from "@/config/gallery";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const photos = [...heroSlides, ...aboutSlides]
    .filter((slide) => slide.isPhoto)
    .map((slide) => `${base}${slide.src}`);

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      images: [...new Set(photos)],
    },
  ];
}
