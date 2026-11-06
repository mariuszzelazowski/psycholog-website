export type GallerySlide = {
  id: string;
  src: string;
  alt: string;
  /** Krótkie motto / myśl na slajdzie karuzeli. */
  motto: string;
  /** Zdjęcie: `object-cover` + lekki filtr; grafika: `object-contain`. */
  isPhoto?: boolean;
  /** Kadrowanie (mniej „ucięć” przy cover) — wartości CSS `object-position`. */
  photoObjectPosition?: string;
  /** Delikatne oddalenie zdjęcia w ramce (mniej agresywne przycinanie). */
  photoEaseCrop?: boolean;
  /** Delikatny ton „banera” pod zielenie / bordę z foteli. */
  mottoTone?: "neutral" | "green" | "burgundy";
};

/** Pierwszy slajd Hero: portret. */
export const heroSlides: GallerySlide[] = [
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
    id: "hero-photo-logo",
    src: "/images/photos/logo-paulina-misztal.jpg",
    alt: "Logo: Paulina Misztal, psycholog",
    motto: "Odnowa wewnętrzna — we własnym tempie.",
    isPhoto: true,
    mottoTone: "neutral",
    photoObjectPosition: "center 40%",
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
    id: "hero-photo-portret-zaluzje",
    src: "/images/photos/about-portret-zaluzje.jpg",
    alt: "Paulina Misztal — spokojny portret w świetle dnia",
    motto: "Razem szukamy sensu i kierunku.",
    isPhoto: true,
    mottoTone: "neutral",
    photoObjectPosition: "center 30%",
    photoEaseCrop: true,
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
    id: "about-photo-logo",
    src: "/images/photos/logo-paulina-misztal.jpg",
    alt: "Logo: Paulina Misztal, psycholog",
    motto: "Profesja sercem — nauka i empatia w jednym.",
    isPhoto: true,
    mottoTone: "neutral",
    photoObjectPosition: "center 40%",
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
];
