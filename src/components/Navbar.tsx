"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { AppSection, brand, navigation } from "@/config";
import {
  lockBodyScroll,
  unlockBodyScroll,
  resetBodyScrollLock,
} from "@/lib/scroll-lock";
import { scrollToSectionElement } from "@/lib/scroll-to-section";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pendingScrollRef = useRef<AppSection | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const baseItem =
    "cursor-pointer relative min-h-12 px-4 py-3 rounded-2xl text-sm tracking-wide font-medium transition-all duration-300 backdrop-blur-md border shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] touch-manipulation";

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

  const scrollToSection = (section: AppSection) => {
    if (isOpen) {
      pendingScrollRef.current = section;
      setIsOpen(false);
      return;
    }

    const behavior: ScrollBehavior = prefersReducedMotion ? "auto" : "smooth";
    scrollToSectionElement(section, behavior);
  };

  const toggleMenu = () => {
    setIsOpen((open) => !open);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      lockBodyScroll();
      return () => {
        unlockBodyScroll();
      };
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      resetBodyScrollLock();
    };
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        pendingScrollRef.current = null;
        setIsOpen(false);
        resetBodyScrollLock();
      }
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        pendingScrollRef.current = null;
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <motion.nav
      id="navbar"
      initial={prefersReducedMotion ? false : { y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-50 border-b transition-all duration-300 pt-[env(safe-area-inset-top,0px)] ${
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
            className="w-11 h-11 min-w-11 flex items-center justify-center rounded-xl border border-accent/35 bg-bg-soft/80 text-xl text-text touch-manipulation"
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            aria-label={isOpen ? "Zamknij menu" : "Otwórz menu"}
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      <AnimatePresence onExitComplete={runPendingScroll}>
        {isOpen && (
          <motion.div
            id="mobile-nav"
            key="mobile-nav-panel"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden mobile-nav-panel border-t border-accent/30 bg-bg-soft/98 backdrop-blur-xl"
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
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
