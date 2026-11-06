import { brand, contact, seo, services } from "@/config/content";
import { getSiteUrl } from "@/lib/site-url";

export default function JsonLd() {
  const siteUrl = getSiteUrl();

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteUrl}/#business`,
    name: brand.fullName,
    description: seo.description,
    url: siteUrl,
    email: contact.email,
    telephone: contact.phoneTel,
    image: `${siteUrl}/images/psychoterapia.svg`,
    priceRange: "$$",
    areaServed: {
      "@type": "City",
      name: contact.city,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: contact.city,
      addressCountry: "PL",
    },
    availableLanguage: ["pl"],
    serviceType: ["Psycholog", "Psychoterapia", "Hipnoterapia", "Konsultacje online"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Oferta",
      itemListElement: services.map((service, index) => ({
        "@type": "Offer",
        position: index + 1,
        name: service.title,
        description: service.description,
        price: service.price.replace(/\s*zł/i, ""),
        priceCurrency: "PLN",
      })),
    },
  };

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${siteUrl}/#webpage`,
    url: siteUrl,
    name: seo.title,
    description: seo.description,
    inLanguage: "pl-PL",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: brand.fullName,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }}
      />
    </>
  );
}
