import type { Metadata } from "next";
import { brand, contact, seo } from "@/config/content";
import { getMetadataBaseUrl, getSiteUrl, isIndexable } from "@/lib/site-url";

export function buildSiteMetadata(): Metadata {
  const siteUrl = getSiteUrl();
  const metadataBase = getMetadataBaseUrl();
  const title = seo.title;
  const indexable = isIndexable();
  const googleVerification =
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();

  return {
    ...(metadataBase ? { metadataBase } : {}),
    title: {
      default: title,
      template: `%s | ${brand.fullName}`,
    },
    description: seo.description,
    applicationName: brand.fullName,
    keywords: [...seo.keywords],
    authors: [{ name: brand.fullName, url: siteUrl }],
    creator: brand.fullName,
    publisher: brand.fullName,
    category: "health",
    robots: indexable
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        }
      : { index: false, follow: false },
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      locale: seo.locale,
      url: siteUrl,
      siteName: `${brand.fullName} — ${brand.tagline}`,
      title,
      description: seo.shareDescription,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: seo.shareDescription,
    },
    ...(googleVerification
      ? { verification: { google: googleVerification } }
      : {}),
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
