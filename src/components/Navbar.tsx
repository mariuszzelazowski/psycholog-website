"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useLayoutEffect,
} from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { AppSection, brand, navigation } from "@/config";
import {
  lockBodyScroll,
  unlockBodyScroll,
  resetBodyScrollLock,
} from "@/lib/scroll-lock";
import {
  scrollToSectionElement,
  syncHeaderOffsetVar,
} from "@/lib/scroll-to-section";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navHeightPx, setNavHeightPx] = useState(0);
  const [canPortal, setCanPortal] = useState(false);
  const [menuMounted, setMenuMounted] = useState(false);
  const pendingScrollRef = useRef<AppSection | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const scrollLockActiveRef = useRef(false);
  const prefersReducedMotion = useReducedMotion();

  const baseItem =
    "cursor-pointer relative min-h-12 px-4 py-3 rounded-2xl text-sm tracking-wide font-medium transition-all duration-300 backdrop-blur-md border shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] touch-manipulation";

  const measureNavHeight = useCallback(() => {
    const nav = navRef.current;
    if (!nav) {
      return;
    }
    setNavHeightPx(nav.getBoundingClientRect().height);
    syncHeaderOffsetVar();
  }, []);

  const runPendingScroll = useCallback(() => {
    const section = pendingScrollRef.current;
    if (!section) {
      return;
    }
    pendingScrollRef.current = null;

    const behavior: ScrollBehavior = prefersReducedMotion ? "auto" : "smooth";
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        scrollToSectionElement(section, behavior);
      });
    });
  }, [prefersReducedMotion]);

  const closeMenu = useCallback(() => {
    pendingScrollRef.current = null;
    setIsOpen(false);
  }, []);

  const openMenu = useCallback(() => {
    measureNavHeight();
    setMenuMounted(true);
    setIsOpen(true);
  }, [measureNavHeight]);

  const scrollToSection = (section: AppSection) => {
    if (isOpen) {
      pendingScrollRef.current = section;
      setIsOpen(false);
      return;
    }

    const behavior: ScrollBehavior = prefersReducedMotion ? "auto" : "smooth";
    scrollToSectionElement(section, behavior);
  };

  const toggleMenu = useCallback(() => {
    if (isOpen) {
      closeMenu();
      return;
    }
    openMenu();
  }, [closeMenu, isOpen, openMenu]);

  /**
   * iOS Safari potrafi połknąć pierwszy `click` (tap zatrzymujący bezwładny scroll, heurystyki hover),
   * mimo że `touchend` dochodzi. `preventDefault` blokuje syntetyczny click, więc nie ma podwójnego toggle.
   */
  const triggerTouchStartRef = useRef<{ x: number; y: number } | null>(null);

  const handleTriggerTouchStart = (event: React.TouchEvent<HTMLButtonElement>) => {
    const touch = event.touches[0];
    triggerTouchStartRef.current =
      event.touches.length === 1 && touch
        ? { x: touch.clientX, y: touch.clientY }
        : null;
  };

  const handleTriggerTouchEnd = (event: React.TouchEvent<HTMLButtonElement>) => {
    const start = triggerTouchStartRef.current;
    triggerTouchStartRef.current = null;
    const touch = event.changedTouches[0];
    if (!start || !touch) {
      return;
    }
    const moved = Math.hypot(touch.clientX - start.x, touch.clientY - start.y);
    const rect = event.currentTarget.getBoundingClientRect();
    const inside =
      touch.clientX >= rect.left &&
      touch.clientX <= rect.right &&
      touch.clientY >= rect.top &&
      touch.clientY <= rect.bottom;
    if (moved > 10 || !inside) {
      return;
    }
    event.preventDefault();
    toggleMenu();
  };

  useEffect(() => {
    setCanPortal(true);
    resetBodyScrollLock();
  }, []);

  useLayoutEffect(() => {
    measureNavHeight();
    const nav = navRef.current;
    if (!nav || typeof ResizeObserver === "undefined") {
      return;
    }
    const observer = new ResizeObserver(measureNavHeight);
    observer.observe(nav);
    return () => observer.disconnect();
  }, [measureNavHeight]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useLayoutEffect(() => {
    if (!isOpen) {
      if (scrollLockActiveRef.current) {
        unlockBodyScroll();
        scrollLockActiveRef.current = false;
      }
      return;
    }

    measureNavHeight();
    lockBodyScroll();
    scrollLockActiveRef.current = true;

    return () => {
      if (scrollLockActiveRef.current) {
        unlockBodyScroll();
        scrollLockActiveRef.current = false;
      }
    };
  }, [isOpen, measureNavHeight]);

  useEffect(() => {
    return () => {
      resetBodyScrollLock();
      scrollLockActiveRef.current = false;
    };
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        pendingScrollRef.current = null;
        setIsOpen(false);
        setMenuMounted(false);
        resetBodyScrollLock();
        scrollLockActiveRef.current = false;
      }
      measureNavHeight();
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, [measureNavHeight]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, closeMenu]);

  const handleMenuExitComplete = useCallback(() => {
    setMenuMounted(false);
    runPendingScroll();
  }, [runPendingScroll]);

  const mobileMenu =
    canPortal && menuMounted
      ? createPortal(
          <AnimatePresence onExitComplete={handleMenuExitComplete}>
            {isOpen && (
              <>
                <motion.button
                  key="mobile-menu-backdrop"
                  type="button"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mobile-menu-backdrop fixed inset-0 z-[110] lg:hidden cursor-pointer border-0 p-0"
                  aria-label="Zamknij menu"
                  onClick={closeMenu}
                />
                <motion.div
                  key="mobile-nav-panel"
                  id="mobile-nav"
                  role="dialog"
                  aria-modal="true"
                  data-scroll-lock-ignore
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    top: navHeightPx,
                    maxHeight: `calc(100dvh - ${navHeightPx}px - env(safe-area-inset-bottom, 0px))`,
                  }}
                  className="mobile-nav-panel fixed inset-x-0 z-[120] lg:hidden border-t border-accent/30 bg-bg-soft/98 backdrop-blur-xl shadow-lg"
                >
                  <div className="container-custom flex flex-col items-stretch gap-2 py-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
                    {navigation.map((link) => (
                      <button
                        type="button"
                        key={link.id}
                        onClick={() => scrollToSection(link.section)}
                        className={`${baseItem} w-full text-center ${
                          link.isCTA
                            ? "nav-cta"
                            : "bg-bg-soft/80 text-text border-accent/30"
                        }`}
                      >
                        {link.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body,
        )
      : null;

  return (
    <>
      <motion.nav
        ref={navRef}
        id="navbar"
        initial={prefersReducedMotion ? false : { y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 border-b transition-all duration-300 pt-[env(safe-area-inset-top,0px)] lg:relative lg:z-50 lg:inset-auto lg:sticky lg:top-0 ${
          /** Nad backdropem menu (z-110), żeby syntetyczny click po touchend nie trafiał w backdrop i nie zamykał od razu (Android/Samsung). */
          isOpen ? "z-[125]" : "z-[100]"
        } ${
          scrolled
            ? "bg-bg-soft/90 backdrop-blur-xl border-accent/35 shadow-sm"
            : "bg-bg-soft/75 backdrop-blur-lg border-accent/20"
        }`}
      >
        <div className="container-custom flex justify-between items-center gap-3 sm:gap-4 py-3 sm:py-4 lg:py-5">
          <button
            type="button"
            onClick={() => scrollToSection(AppSection.Hero)}
            className="flex min-w-0 max-w-[calc(100%-3.25rem)] flex-col items-start text-left cursor-pointer touch-manipulation"
          >
            <span className="font-display text-pretty text-xl sm:text-2xl lg:text-[2.35rem] font-semibold tracking-tight text-primary-dark leading-tight">
              {brand.fullName}
            </span>
            <span className="text-[0.6rem] sm:text-[0.65rem] lg:text-xs tracking-[0.22em] sm:tracking-[0.28em] uppercase text-text-muted truncate max-w-full">
              {brand.tagline}
            </span>
          </button>

          <div className="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0">
            {navigation.map((link) => (
              <button
                type="button"
                key={link.id}
                onClick={() => scrollToSection(link.section)}
                className={`${baseItem} whitespace-nowrap ${
                  link.isCTA
                    ? "nav-cta hover:shadow-lg"
                    : "bg-bg-soft/70 text-text border-accent/30 hover:border-accent/50 hover:text-primary-dark"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="lg:hidden shrink-0">
            <button
              type="button"
              onClick={toggleMenu}
              onTouchStart={handleTriggerTouchStart}
              onTouchEnd={handleTriggerTouchEnd}
              onTouchCancel={() => {
                triggerTouchStartRef.current = null;
              }}
              className="mobile-menu-trigger relative z-[101] w-11 h-11 min-w-11 flex items-center justify-center rounded-xl border border-accent/35 bg-bg-soft/80 text-xl text-text touch-manipulation cursor-pointer"
              aria-expanded={isOpen}
              aria-controls="mobile-nav"
              aria-haspopup="dialog"
              aria-label={isOpen ? "Zamknij menu" : "Otwórz menu"}
            >
              {isOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </motion.nav>

      <div
        className="lg:hidden shrink-0 pointer-events-none"
        style={{ height: navHeightPx > 0 ? navHeightPx : undefined }}
        aria-hidden
      />

      {mobileMenu}
    </>
  );
}
