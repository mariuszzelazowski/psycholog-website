import type { MetadataRoute } from "next";
import { brand, seo } from "@/config/content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${brand.fullName} — ${brand.tagline}`,
    short_name: brand.fullName,
    description: seo.description,
    lang: "pl",
    start_url: "/",
    display: "browser",
    background_color: "#f8f6f3",
    theme_color: "#f8f6f3",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/apple-icon", type: "image/png", sizes: "180x180" },
    ],
  };
}
