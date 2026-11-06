import { contact, contactDetailLabels, socialProfiles } from "@/config/content";
import { ContactDetail, SocialPlatform } from "@/config/enums";

/** Wartości runtime (env ma pierwszeństwo nad `content.ts`). */
export const siteConfig = {
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? contact.email,
  phone: contact.phoneDisplay,
  phoneHref: `tel:${contact.phoneTel}`,
  instagramUsername:
    process.env.NEXT_PUBLIC_INSTAGRAM_USERNAME ?? contact.instagramUsername,
  hours: contact.hours,
} as const;

export type ContactAction = {
  id: ContactDetail.Email | ContactDetail.Phone | SocialPlatform;
  label: string;
  value?: string;
  href: string;
  /** Pełny opis dla czytników ekranu (np. nazwa profilu). */
  ariaLabel: string;
  external?: boolean;
};

/** Kafelki-akcje w sekcji kontakt — budowane z `siteConfig` + etykiet z content. */
export function getContactActions(): ContactAction[] {
  return [
    {
      id: ContactDetail.Email,
      label: contactDetailLabels[ContactDetail.Email],
      value: siteConfig.contactEmail,
      href: `mailto:${siteConfig.contactEmail}`,
      ariaLabel: `${contactDetailLabels[ContactDetail.Email]}: ${siteConfig.contactEmail}`,
    },
    {
      id: ContactDetail.Phone,
      label: contactDetailLabels[ContactDetail.Phone],
      value: siteConfig.phone,
      href: siteConfig.phoneHref,
      ariaLabel: `${contactDetailLabels[ContactDetail.Phone]}: ${siteConfig.phone}`,
    },
    ...socialProfiles.map((profile) => ({
      id: profile.platform,
      label: profile.title,
      href: profile.href,
      ariaLabel: profile.label,
      external: true,
    })),
  ];
}

export const contactHours = {
  label: contactDetailLabels[ContactDetail.Hours],
  value: siteConfig.hours,
} as const;

/** Kotwica do linków `#sekcja` */
export function sectionHref(sectionId: string) {
  return `#${sectionId}`;
}
