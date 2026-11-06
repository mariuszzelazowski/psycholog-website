import type { Metadata } from "next";
import { brand, contact, seo } from "@/config/content";
import { getMetadataBaseUrl, getSiteUrl } from "@/lib/site-url";

export function buildSiteMetadata(): Metadata {
  const siteUrl = getSiteUrl();
  const metadataBase = getMetadataBaseUrl();
  const title = seo.title;

  return {
    ...(metadataBase ? { metadataBase } : {}),
    title: {
      default: title,
      template: `%s | ${brand.fullName}`,
    },
    description: seo.description,
    keywords: [...seo.keywords],
    authors: [{ name: brand.fullName }],
    creator: brand.fullName,
    publisher: brand.fullName,
    category: "health",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      locale: seo.locale,
      url: siteUrl,
      siteName: `${brand.fullName} — ${brand.tagline}`,
      title,
      description: seo.description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: seo.description,
    },
    formatDetection: {
      telephone: true,
      email: true,
      address: false,
    },
    other: {
      "geo.region": "PL-MZ",
      "geo.placename": contact.city,
    },
  };
}
