export type GallerySlide = {
  id: string;
  src: string;
  alt: string;
  /** Krótkie motto / myśl na slajdzie karuzeli. */
  motto: string;
  /** Zdjęcie: `object-cover` + lekki filtr; SVG: `object-contain`. */
  isPhoto?: boolean;
  /** Kadrowanie (mniej „ucięć” przy cover) — wartości CSS `object-position`. */
  photoObjectPosition?: string;
  /** Delikatne oddalenie zdjęcia w ramce (mniej agresywne przycinanie). */
  photoEaseCrop?: boolean;
  /** Delikatny ton „banera” pod zielenie / bordę z foteli. */
  mottoTone?: "neutral" | "green" | "burgundy";
};

/** Lokalne ilustracje — działają bez zewnętrznych CDN. Kolejność: zdjęcia i SVG naprzemiennie. */
export const heroSlides: GallerySlide[] = [
  {
    id: "hero-photo-zielone",
    src: "/images/photos/hero-gabinet-zielone.jpg",
    alt: "Gabinet: zielone fotele, rośliny i spokojna przestrzeń do rozmowy",
    motto: "Bezpieczne miejsce, w którym możesz być sobą.",
    isPhoto: true,
    mottoTone: "green",
    photoObjectPosition: "center 42%",
    photoEaseCrop: true,
  },
  {
    id: "hero-psychoterapia",
    src: "/images/psychoterapia.svg",
    alt: "Ilustracja: rozmowa terapeutyczna i wsparcie emocjonalne",
    motto: "Każda rozmowa może otworzyć nowy rozdział.",
    mottoTone: "neutral",
  },
  {
    id: "hero-photo-bordowe",
    src: "/images/photos/hero-gabinet-bordowy.jpg",
    alt: "Gabinet: ciepła przestrzeń z bordowym fotelem i delikatnym światłem",
    motto: "Ciepło gabinetu — tło dla Twojej historii.",
    isPhoto: true,
    mottoTone: "burgundy",
    photoObjectPosition: "center 48%",
    photoEaseCrop: true,
  },
  {
    id: "hero-psychologia",
    src: "/images/psychologia.svg",
    alt: "Ilustracja: psychologia i refleksja nad sobą",
    motto: "Zrozumienie siebie to pierwszy krok ku zmianie.",
    mottoTone: "neutral",
  },
  {
    id: "hero-photo-portret-fotel",
    src: "/images/photos/about-portret-fotel.jpg",
    alt: "Paulina Misztal — psycholożka w przestrzeni gabinetu",
    motto: "Obecność i szacunek — fundament naszej współpracy.",
    isPhoto: true,
    mottoTone: "neutral",
    photoObjectPosition: "center 28%",
    photoEaseCrop: true,
  },
  {
    id: "hero-mindfulness",
    src: "/images/mindfulness.svg",
    alt: "Ilustracja: mindfulness i wewnętrzny spokój",
    motto: "Tu i teraz — oddech wraca do swojego rytmu.",
    mottoTone: "neutral",
  },
  {
    id: "hero-photo-portret-zaluzje",
    src: "/images/photos/about-portret-zaluzje.jpg",
    alt: "Paulina Misztal — spokojny portret w świetle dnia",
    motto: "Razem szukamy sensu i kierunku.",
    isPhoto: true,
    mottoTone: "neutral",
    photoObjectPosition: "center 30%",
    photoEaseCrop: true,
  },
  {
    id: "hero-hipnoza",
    src: "/images/hipnoza.svg",
    alt: "Ilustracja: głęboki relaks i hipnoterapia",
    motto: "W spokoju umysłu pojawia się przestrzeń na uzdrowienie.",
    mottoTone: "neutral",
  },
  {
    id: "hero-gabinet",
    src: "/images/gabinet.svg",
    alt: "Ilustracja: spokojna przestrzeń gabinetu",
    motto: "Przestrzeń zaprojektowana dla Twojego komfortu.",
    mottoTone: "neutral",
  },
];

export const aboutSlides: GallerySlide[] = [
  {
    id: "about-photo-dziennik",
    src: "/images/photos/about-dziennik-biurko.jpg",
    alt: "Chwila refleksji przy biurku — pisanie i codzienna troska o siebie",
    motto: "Małe kroki — też są odnową.",
    isPhoto: true,
    mottoTone: "green",
    photoObjectPosition: "center 38%",
    photoEaseCrop: true,
  },
  {
    id: "about-specjalista",
    src: "/images/specjalista.svg",
    alt: "Ilustracja: specjalistka w gabinecie psychologicznym",
    motto: "Profesja sercem — nauka i empatia w jednym.",
    mottoTone: "neutral",
  },
  {
    id: "about-photo-kanapa",
    src: "/images/photos/about-kanapa-notes.jpg",
    alt: "Paulina Misztal z notatnikiem — ciepła, domowa atmosfera rozmowy",
    motto: "Nie musisz przechodzić przez trudności w samotności.",
    isPhoto: true,
    mottoTone: "burgundy",
    photoObjectPosition: "center 32%",
    photoEaseCrop: true,
  },
  {
    id: "about-psychoterapia",
    src: "/images/psychoterapia.svg",
    alt: "Ilustracja: psychoterapia i bezpieczna relacja",
    motto: "Relacja leczy — przestrzeń na prawdę o sobie.",
    mottoTone: "neutral",
  },
  {
    id: "about-wsparcie",
    src: "/images/wsparcie.svg",
    alt: "Ilustracja: wsparcie w trudnym momencie",
    motto: "Wsparcie wtedy, gdy najbardziej go potrzebujesz.",
    mottoTone: "neutral",
  },
];
