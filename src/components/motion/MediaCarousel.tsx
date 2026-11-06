"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { GallerySlide } from "@/config/gallery";
import { slideCrossfade } from "@/lib/motion";

type MediaCarouselProps = {
  slides: readonly GallerySlide[];
  intervalMs?: number;
  frameClassName?: string;
};

export default function MediaCarousel({
  slides,
  intervalMs = 5200,
  frameClassName = "aspect-[4/5] min-h-[240px] max-h-[min(72vh,520px)] sm:max-h-none sm:min-h-0",
}: MediaCarouselProps) {
  const [index, setIndex] = useState(0);
  const slide = slides[index];

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs, slides.length]);

  const goTo = (next: number) =>
    setIndex((next + slides.length) % slides.length);

  if (!slide) return null;

  return (
    <div className="card-glass card-interactive relative p-1 sm:p-1.5">
      <div
        className={`relative w-full overflow-hidden rounded-[1.25rem] bg-bg ${frameClassName}`}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={slide.id}
            className="absolute inset-0 pb-[4.75rem] sm:pb-[5rem]"
            initial={slideCrossfade.initial}
            animate={slideCrossfade.animate}
            exit={slideCrossfade.exit}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- lokalne SVG, pełna kontrola kadru */}
            <img
              src={slide.src}
              alt={slide.alt}
              decoding="async"
              draggable={false}
              className="absolute inset-0 m-auto h-full w-full object-contain p-2 pb-0 sm:p-4 sm:pb-0"
            />
          </motion.div>
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-primary-dark/40 via-primary-dark/5 to-transparent z-10" />

        <AnimatePresence mode="wait">
          <motion.figure
            key={slide.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="carousel-motto z-20"
            aria-live="polite"
          >
            <blockquote className="carousel-motto-text">
              {`„${slide.motto}"`}
            </blockquote>
          </motion.figure>
        </AnimatePresence>

        {slides.length > 1 && (
          <div className="absolute top-[38%] sm:top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-1 sm:px-2 z-30 pointer-events-none">
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              aria-label="Poprzednie zdjęcie"
              className="carousel-arrow pointer-events-auto touch-manipulation"
            >
              ◀
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              aria-label="Następne zdjęcie"
              className="carousel-arrow pointer-events-auto touch-manipulation"
            >
              ▶
            </button>
          </div>
        )}
      </div>

      {slides.length > 1 && (
        <div className="flex justify-center flex-wrap gap-1 py-2 sm:py-3 z-20 relative">
          {slides.map((item, i) => (
            <button
              type="button"
              key={item.id}
              onClick={() => goTo(i)}
              aria-label={`${item.alt}. ${item.motto}`}
              aria-current={i === index}
              className="carousel-dot-hit touch-manipulation"
            >
              <span
                className={`carousel-dot ${i === index ? "carousel-dot-active" : ""}`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
