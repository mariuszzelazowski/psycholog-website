import { contact, contactDetailLabels } from "@/config/content";
import { ContactDetail } from "@/config/enums";

/** Wartości runtime (env ma pierwszeństwo nad `content.ts`). */
export const siteConfig = {
  contactEmail:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? contact.email,
  phone: contact.phoneDisplay,
  phoneHref: `tel:${contact.phoneTel}`,
  instagramUsername:
    process.env.NEXT_PUBLIC_INSTAGRAM_USERNAME ?? contact.instagramUsername,
  hours: contact.hours,
} as const;

export type ContactDetailRow = {
  id: ContactDetail;
  label: string;
  value: string;
  href?: string;
};

/** Lista do sekcji kontakt — budowana z `siteConfig` + etykiet z content. */
export function getContactDetails(): ContactDetailRow[] {
  return [
    {
      id: ContactDetail.Email,
      label: contactDetailLabels[ContactDetail.Email],
      value: siteConfig.contactEmail,
      href: `mailto:${siteConfig.contactEmail}`,
    },
    {
      id: ContactDetail.Phone,
      label: contactDetailLabels[ContactDetail.Phone],
      value: siteConfig.phone,
      href: siteConfig.phoneHref,
    },
    {
      id: ContactDetail.Hours,
      label: contactDetailLabels[ContactDetail.Hours],
      value: siteConfig.hours,
    },
  ];
}

/** Kotwica do linków `#sekcja` */
export function sectionHref(sectionId: string) {
  return `#${sectionId}`;
}
