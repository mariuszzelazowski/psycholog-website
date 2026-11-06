export type GallerySlide = {
  id: string;
  src: string;
  alt: string;
  /** Krótkie motto / myśl na slajdzie karuzeli. */
  motto: string;
};

/** Lokalne ilustracje — działają bez zewnętrznych CDN. */
export const heroSlides: GallerySlide[] = [
  {
    id: "hero-psychoterapia",
    src: "/images/psychoterapia.svg",
    alt: "Ilustracja: rozmowa terapeutyczna i wsparcie emocjonalne",
    motto: "Każda rozmowa może otworzyć nowy rozdział.",
  },
  {
    id: "hero-psychologia",
    src: "/images/psychologia.svg",
    alt: "Ilustracja: psychologia i refleksja nad sobą",
    motto: "Zrozumienie siebie to pierwszy krok ku zmianie.",
  },
  {
    id: "hero-hipnoza",
    src: "/images/hipnoza.svg",
    alt: "Ilustracja: głęboki relaks i hipnoterapia",
    motto: "W spokoju umysłu pojawia się przestrzeń na uzdrowienie.",
  },
  {
    id: "hero-mindfulness",
    src: "/images/mindfulness.svg",
    alt: "Ilustracja: mindfulness i wewnętrzny spokój",
    motto: "Tu i teraz — oddech wraca do swojego rytmu.",
  },
  {
    id: "hero-gabinet",
    src: "/images/gabinet.svg",
    alt: "Ilustracja: spokojna przestrzeń gabinetu",
    motto: "Bezpieczne miejsce, w którym możesz być sobą.",
  },
];

export const aboutSlides: GallerySlide[] = [
  {
    id: "about-specjalista",
    src: "/images/specjalista.svg",
    alt: "Ilustracja: specjalistka w gabinecie psychologicznym",
    motto: "Obecność i szacunek — fundament naszej współpracy.",
  },
  {
    id: "about-psychoterapia",
    src: "/images/psychoterapia.svg",
    alt: "Ilustracja: psychoterapia i bezpieczna relacja",
    motto: "Relacja leczy — razem szukamy sensu i kierunku.",
  },
  {
    id: "about-wsparcie",
    src: "/images/wsparcie.svg",
    alt: "Ilustracja: wsparcie w trudnym momencie",
    motto: "Nie musisz przechodzić przez trudności w samotności.",
  },
];
