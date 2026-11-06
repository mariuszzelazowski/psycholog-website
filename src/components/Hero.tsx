"use client";

import { motion } from "framer-motion";
import { AppSection, hero, heroSlides, sectionHref } from "@/config";
import MediaCarousel from "@/components/motion/MediaCarousel";
import RichCopy from "@/lib/rich-copy";
import { fadeUp, motionTransition, slideFromRight } from "@/lib/motion";

export default function Hero() {
  return (
    <section
      id={AppSection.Hero}
      className="relative section-padding-hero scroll-mt-header overflow-hidden bg-bg-soft"
      aria-label="Wprowadzenie"
    >
      <div className="ambient-orb ambient-orb-a pointer-events-none" aria-hidden />
      <div className="ambient-orb ambient-orb-b pointer-events-none" aria-hidden />

      <div className="container-custom relative grid gap-6 sm:gap-8 md:grid-cols-2 md:gap-10 lg:gap-12 xl:gap-14 items-center max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1, delayChildren: 0.06 } },
          }}
          className="order-2 md:order-1 text-center md:text-left flex flex-col gap-3.5 md:gap-4"
        >
          <motion.p variants={fadeUp} className="section-label mx-auto md:mx-0">
            {hero.eyebrow}
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-display text-balance text-3xl min-[400px]:text-4xl sm:text-[2.65rem] lg:text-[3rem] font-semibold leading-[1.08] text-primary-dark"
          >
            {hero.title}
            <span className="block text-accent font-bold mt-1.5 text-[0.92em]">
              {hero.titleAccent}
            </span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="prose-block prose-block-adaptive max-w-md md:max-w-lg font-medium"
          >
            <RichCopy>{hero.lead}</RichCopy>
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col min-[480px]:flex-row gap-2.5 sm:gap-3 justify-center md:justify-start pt-0.5 w-full min-[480px]:w-auto"
          >
            <motion.a
              href={sectionHref(hero.ctaPrimary.section)}
              className="btn-primary w-full min-[480px]:w-auto"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.99 }}
            >
              {hero.ctaPrimary.label}
            </motion.a>
            <motion.a
              href={sectionHref(hero.ctaSecondary.section)}
              className="btn-secondary w-full min-[480px]:w-auto"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.99 }}
            >
              {hero.ctaSecondary.label}
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={slideFromRight}
          transition={{ ...motionTransition, delay: 0.12 }}
          className="order-1 md:order-2 relative mx-auto w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
        >
          <MediaCarousel
            slides={heroSlides}
            intervalMs={5200}
            priority
            photoFrameClassName="hero-media-frame"
          />
        </motion.div>
      </div>
    </section>
  );
}
