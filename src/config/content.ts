import {
  AppSection,
  ContactDetail,
  NavItem,
  ServiceDelivery,
  SocialPlatform,
} from "@/config/enums";

/**
 * Teksty z wyróżnieniami (patrz `RichCopy`):
 * [[słowo kluczowe]] — akcent · **mocny nacisk**
 */

/** Marka / tożsamość */
export const brand = {
  fullName: "Paulina Misztal",
  tagline: "Odnowa wewnętrzna",
} as const;

/** SEO (layout, Open Graph, sitemap) */
export const seo = {
  /** ~60 znaków — tyle Google pokazuje w wynikach. */
  title: "Psycholog Warszawa i hipnoterapia online | Paulina Misztal",
  /** ~155 znaków — opis pod tytułem w wynikach wyszukiwania. */
  description:
    "Paulina Misztal — psycholog i certyfikowana hipnoterapeutka. Konsultacje psychologiczne i sesje hipnoterapii w gabinecie w Warszawie lub online.",
  /** Krótszy opis do podglądu linku (Facebook, Messenger, WhatsApp). */
  shareDescription:
    "Konsultacje psychologiczne i hipnoterapia — gabinet w Warszawie lub online. Bezpieczna przestrzeń do rozmowy i realnej zmiany.",
  locale: "pl_PL",
  /** Psychoterapia celowo pominięta — tytuł psychoterapeuty dopiero po ukończeniu szkoły. */
  keywords: [
    "psycholog Warszawa",
    "hipnoterapia Warszawa",
    "hipnoterapeuta Warszawa",
    "konsultacje psychologiczne",
    "psycholog online",
    "hipnoterapia online",
    "terapia poznawczo-behawioralna",
    "CBT",
    "TSR",
    "DDA",
    "wypalenie zawodowe",
    "lęki",
    brand.fullName,
  ],
  /** Zdjęcie używane w danych strukturalnych i podglądzie linku. */
  portrait: "/images/photos/about-portret-fotel.jpg",
} as const;

/**
 * Dane kontaktowe — edytuj tutaj.
 * E-mail i Instagram można nadpisać przez `.env.local` (patrz `site.ts`).
 */
export const contact = {
  email: "zelazowskimariusz91@gmail.com",
  phoneDisplay: "+48 515 965 363",
  /** Cyfry do linku tel: (bez spacji) */
  phoneTel: "+48515965363",
  hours: "Pon – Sob | 10:00 – 20:00",
  /** Bez @ — do wyświetlania; pełny URL w socialProfiles */
  instagramUsername: "odnowa.wewnetrzna",
  city: "Warszawa",
} as const;

/** Linki do profili — ikony w sekcji kontakt (edytuj href). */
export const socialProfiles = [
  {
    platform: SocialPlatform.Facebook,
    href: "https://www.facebook.com/profile.php?id=61592452897275",
    label: "Odnowa wewnętrzna na Facebooku",
  },
  {
    platform: SocialPlatform.Instagram,
    href: "https://www.instagram.com/odnowa.wewnetrzna/",
    label: "Odnowa wewnętrzna na Instagramie",
  },
] as const;

export const contactDetailLabels: Record<ContactDetail, string> = {
  [ContactDetail.Email]: "E-mail",
  [ContactDetail.Phone]: "Telefon",
  [ContactDetail.Hours]: "Godziny przyjęć",
};

/** Oferta — usługi i ceny */
export const services = [
  {
    id: "consultation-adults",
    title: "Konsultacja psychologiczna dla dorosłych",
    delivery: [ServiceDelivery.InPerson, ServiceDelivery.Online],
    description:
      "Spotkanie, podczas którego omówimy Twoje trudności i potrzeby. Konsultacja pomoże określić **dalsze kroki** i wybrać odpowiednie metody [[wsparcia]]. To także czas, w którym możesz po prostu [[porozmawiać]] i podzielić się tym, co Cię obciąża.",
    price: "200 zł",
    priceNote: "za sesję",
  },
  {
    id: "hypnotherapy-2h",
    title: "Sesja hipnoterapii 2h",
    delivery: [ServiceDelivery.InPerson, ServiceDelivery.Online],
    description:
      "Dwugodzinna sesja wprowadzająca w stan **głębokiego relaksu**, dzięki któremu łatwiej dotrzeć do przyczyn trudności i zacząć wprowadzać zmiany. Pomaga uwalniać się od [[lęków]] i blokad, budować [[poczucie własnej wartości]] oraz odzyskać **równowagę emocjonalną** i wewnętrzny spokój.",
    price: "600 zł",
    priceNote: "za sesję",
  },
] as const;

/** Menu nawigacji */
export const navigation = [
  {
    id: NavItem.About,
    label: "Poznaj mnie bliżej",
    section: AppSection.About,
    isCTA: false,
  },
  {
    id: NavItem.Services,
    label: "Zakres wsparcia",
    section: AppSection.Services,
    isCTA: false,
  },
  {
    id: NavItem.Resources,
    label: "Przydatne materiały",
    section: AppSection.Resources,
    isCTA: false,
  },
  {
    id: NavItem.Contact,
    label: "Spotkajmy się",
    section: AppSection.Contact,
    isCTA: true,
  },
] as const;

/** Sekcja hero */
export const hero = {
  eyebrow: "Psycholog · Warszawa · Online",
  title: "Konsultacje psychologiczne",
  titleAccent: "Sesje hipnoterapii",
  lead:
    "[[Bezpieczna przestrzeń]] do rozmowy, zrozumienia i **realnej zmiany** — stacjonarnie w **Warszawie** lub [[online]]. **Ode mnie dla Ciebie** — w [[przydatnych materiałach]] czeka **darmowy Dziennik Regeneracji** do pobrania.",
  ctaPrimary: { label: "Spotkajmy się", section: AppSection.Contact },
  ctaSecondary: { label: "Sprawdź zakres wsparcia", section: AppSection.Services },
} as const;

/** Sekcja o mnie */
export const about = {
  sectionLabel: "O mnie",
  title: "Poznaj mnie bliżej",
  /** Pierwszy akapit po „Nazywam się {fullName}.” */
  introAfterName:
    "Jestem [[psychologiem]] oraz certyfikowaną [[hipnoterapeutką]]. Aktualnie jestem w trakcie szkolenia psychoterapeutycznego w nurcie **poznawczo-behawioralnym (CBT)**.",
  introParagraphs: [
    "W swojej praktyce korzystam m.in. z [[terapii poznawczo-behawioralnej (CBT)]] oraz [[terapii skoncentrowanej na rozwiązaniach (TSR)]]. Na co dzień pracuję z osobami dorosłymi w **prywatnym gabinecie**.",
    "Kieruję się **indywidualnym podejściem** do pacjenta oraz budowaniem [[bezpiecznej relacji]] opartej na zaufaniu.",
  ],
  experienceTitle: "Wykształcenie i doświadczenie",
  experienceParagraphs: [
    "Ukończyłam jednolite studia magisterskie na kierunku **psychologia** oraz aktualnie jestem w szkole psychoterapii [[Centrum CBT EDU]] w Warszawie.",
    "Brałam udział w licznych szkoleniach i warsztatach, m.in.: certyfikowany kurs [[hipnozy]] (Omni Hypnosis Training Center), TSR – I stopień (CTSR), „Praca z ciałem – jak to robią terapeuci tańcem i ruchem”.",
    "Doświadczenie zdobywałam w Telefonie Pogadania oraz podczas stażu w **Ośrodku Interwencji Kryzysowej** w Piasecznie, gdzie wspierałam osoby w [[kryzysach emocjonalnych]].",
  ],
  challengesTitle: "Wspieram osoby, które zmagają się z:",
  challenges: [
    "[[niskim poczuciem własnej wartości]], lękami, fobiami i **przewlekłym stresem**",
    "trudnościami w **relacjach partnerskich i rodzinnych**",
    "[[kryzysami życiowymi]]",
    "[[wypaleniem zawodowym]] i perfekcjonizmem",
    "**DDA**, **DDD**",
  ],
  challengesFooter:
    "Towarzyszę również osobom, które pragną **lepiej poznać siebie** i rozwijać swój [[potencjał]].",
} as const;

/** Sekcja oferta — nagłówki */
export const servicesSection = {
  sectionLabel: "Oferta",
  title: "Zakres wsparcia",
} as const;

/** Sekcja materiały do pobrania */
export const resourcesSection = {
  sectionLabel: "Dla Ciebie",
  title: "Przydatne materiały",
  lead:
    "Mały **prezent** od serca — narzędzie, które możesz zabrać ze sobą i wracać do niego we własnym tempie.",
} as const;

/** Bezpłatny materiał (link zewnętrzny) */
export const resourcesGift = {
  id: "dziennik-regeneracji",
  badge: "Prezent · PDF · do pobrania",
  title: "Dziennik Regeneracji",
  description:
    "Darmowy dziennik do świadomego odpoczywania i budowania [[odnowy]] — krótkie zapiski i pytania, które pomagają **złapać balans** po intensywnych dniach.",
  ctaLabel: "Pobierz Dziennik Regeneracji",
  href: "https://bit.ly/dziennikregeneracji",
} as const;

/** Sekcja kontakt — copy */
export const contactSection = {
  sectionLabel: "Skontaktuj się",
  title: "Pozostańmy w kontakcie",
  lead:
    "Napisz przez **formularz e-mail**, zadzwoń lub odwiedź profile na [[Facebooku]] i [[Instagramie]].",
  socialHeading: "Social media",
  formIntro: "Formularz wysyła wiadomość na adres e-mail gabinetu.",
  formPlaceholders: {
    name: "Imię i nazwisko",
    email: "Adres e-mail (do kontaktu zwrotnego)",
    message: "W czym mogę Ci pomóc?",
  },
  submitEmail: "Wyślij wiadomość e-mail",
  submitLoading: "Wysyłanie…",
  submitSuccessWeb3:
    "Dziękuję — wiadomość została wysłana na skrzynkę e-mail.",
  submitSuccessMailto:
    "Otworzy się program pocztowy z przygotowaną wiadomością.",
} as const;

/** Stopka */
export const footer = {
  keywords: ["Psycholog", "Hipnoterapia", contact.city, "Online"] as const,
  note: "Strona wykonana z pasją dla **bezpieczeństwa** i komfortu pacjentów.",
} as const;
