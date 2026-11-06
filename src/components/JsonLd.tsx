import {
  about,
  brand,
  contact,
  seo,
  services,
  socialProfiles,
} from "@/config/content";
import { AppSection } from "@/config/enums";
import { siteConfig } from "@/config/site";
import { getSiteUrl } from "@/lib/site-url";

const stripMarkup = (text: string) => text.replace(/\[\[|\]\]|\*\*/g, "");

const prices = services.map((service) =>
  Number.parseInt(service.price.replace(/\D/g, ""), 10),
);

export default function JsonLd() {
  const siteUrl = getSiteUrl();
  const ids = {
    website: `${siteUrl}/#website`,
    webpage: `${siteUrl}/#webpage`,
    business: `${siteUrl}/#business`,
    person: `${siteUrl}/#person`,
  };
  const portraitUrl = `${siteUrl}${seo.portrait}`;
  const sameAs = socialProfiles.map((profile) => profile.href);

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": ids.website,
        url: siteUrl,
        name: brand.fullName,
        alternateName: brand.tagline,
        inLanguage: "pl-PL",
        publisher: { "@id": ids.business },
      },
      {
        "@type": "WebPage",
        "@id": ids.webpage,
        url: siteUrl,
        name: seo.title,
        description: seo.description,
        inLanguage: "pl-PL",
        isPartOf: { "@id": ids.website },
        about: { "@id": ids.business },
        primaryImageOfPage: { "@type": "ImageObject", url: portraitUrl },
      },
      {
        "@type": "Person",
        "@id": ids.person,
        name: brand.fullName,
        jobTitle: "Psycholog, hipnoterapeutka",
        image: portraitUrl,
        url: siteUrl,
        sameAs,
        worksFor: { "@id": ids.business },
        knowsLanguage: "pl",
        knowsAbout: [
          "Konsultacje psychologiczne",
          "Hipnoterapia",
          "Terapia poznawczo-behawioralna (CBT)",
          "Terapia skoncentrowana na rozwiązaniach (TSR)",
          ...about.challenges.map(stripMarkup),
        ],
      },
      {
        "@type": "ProfessionalService",
        "@id": ids.business,
        name: `${brand.fullName} — ${brand.tagline}`,
        description: seo.description,
        url: siteUrl,
        image: portraitUrl,
        logo: `${siteUrl}/icon.svg`,
        email: siteConfig.contactEmail,
        telephone: contact.phoneTel,
        priceRange: `${Math.min(...prices)}–${Math.max(...prices)} zł`,
        currenciesAccepted: "PLN",
        founder: { "@id": ids.person },
        employee: { "@id": ids.person },
        sameAs,
        address: {
          "@type": "PostalAddress",
          addressLocality: contact.city,
          addressRegion: "mazowieckie",
          addressCountry: "PL",
        },
        areaServed: [
          { "@type": "City", name: contact.city },
          { "@type": "Country", name: "Polska" },
        ],
        availableLanguage: ["pl"],
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "10:00",
          closes: "20:00",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Oferta",
          itemListElement: services.map((service, index) => ({
            "@type": "Offer",
            position: index + 1,
            price: String(prices[index]),
            priceCurrency: "PLN",
            url: `${siteUrl}/#${AppSection.Services}`,
            itemOffered: {
              "@type": "Service",
              name: service.title,
              description: stripMarkup(service.description),
              provider: { "@id": ids.business },
              areaServed: contact.city,
            },
          })),
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
