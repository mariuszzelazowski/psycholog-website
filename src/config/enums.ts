/** Kotwice sekcji na stronie (id w HTML + nawigacja). */
export enum AppSection {
  Hero = "hero",
  About = "about",
  Services = "services",
  Resources = "resources",
  Contact = "contact",
}

/** Pozycje w bloku danych kontaktowych. */
export enum ContactDetail {
  Email = "email",
  Phone = "phone",
  Hours = "hours",
}

/** Formy realizacji usługi (etykiety na kartach oferty). */
export enum ServiceDelivery {
  InPerson = "stacjonarnie",
  Online = "online",
}

/** Elementy menu głównego. */
export enum NavItem {
  About = "about",
  Services = "services",
  Resources = "resources",
  Contact = "contact",
}

/** Profile w social media (ikony w kontakcie). */
export enum SocialPlatform {
  Facebook = "facebook",
  Instagram = "instagram",
}
