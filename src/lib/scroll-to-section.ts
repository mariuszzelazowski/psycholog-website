import { AppSection } from "@/config/enums";

/** Górna krawędź sekcji ląduje 1px pod dolną krawędzią paska — obie linie zlewają się w jedną. */
const BORDER_OVERLAP_PX = 1;
const SETTLE_FALLBACK_MS = 1200;
/** Większa różnica = użytkownik sam przewinął w trakcie animacji; wtedy nie szarpiemy stroną. */
const SETTLE_MAX_CORRECTION_PX = 120;

export function getNavOffset() {
  const nav = document.getElementById("navbar");
  if (!nav) return 0;
  return Math.max(0, nav.getBoundingClientRect().height - BORDER_OVERLAP_PX);
}

/** Na wejściu `#sekcja` z linku (np. przyciski w Hero) przeglądarka używa `scroll-margin-top`. */
export function syncHeaderOffsetVar() {
  document.documentElement.style.setProperty(
    "--header-offset",
    `${getNavOffset()}px`,
  );
}

function targetTop(element: HTMLElement) {
  return Math.round(
    element.getBoundingClientRect().top + window.scrollY - getNavOffset(),
  );
}

export function scrollToSectionElement(
  section: AppSection,
  behavior: ScrollBehavior = "smooth",
) {
  const element = document.getElementById(section);
  if (!element) {
    return false;
  }

  window.scrollTo({ top: targetTop(element), behavior });

  if (behavior === "smooth") {
    /** Leniwe obrazki / fonty mogą przesunąć układ w trakcie animacji — dociągnięcie po zakończeniu. */
    let settled = false;
    const settle = () => {
      if (settled) return;
      settled = true;
      window.removeEventListener("scrollend", settle);
      const top = targetTop(element);
      const drift = Math.abs(window.scrollY - top);
      if (drift > 1 && drift <= SETTLE_MAX_CORRECTION_PX) {
        window.scrollTo({ top, behavior: "auto" });
      }
    };
    window.addEventListener("scrollend", settle, { once: true });
    window.setTimeout(settle, SETTLE_FALLBACK_MS);
  }

  return true;
}
