"use client";

import { motion } from "framer-motion";
import { about, aboutSlides, AppSection, brand } from "@/config";
import MediaCarousel from "@/components/motion/MediaCarousel";
import Reveal from "@/components/motion/Reveal";
import SectionHeader from "@/components/motion/SectionHeader";
import AccentMarker from "@/components/ui/AccentMarker";
import RichCopy, { bindOrphans } from "@/lib/rich-copy";
import {
  fadeUp,
  slideFromLeft,
  slideFromRight,
  staggerContainer,
  staggerItem,
} from "@/lib/motion";

export default function About() {
  return (
    <section
      id={AppSection.About}
      className="relative section-padding scroll-mt-header overflow-hidden bg-linear-to-b from-bg-soft to-bg/60 border-b border-accent/20"
      aria-labelledby="about-heading"
    >
      <div className="ambient-orb ambient-orb-c pointer-events-none" aria-hidden />

      <div className="container-custom relative section-stack">
        <SectionHeader
          label={about.sectionLabel}
          title={about.title}
          titleId="about-heading"
        />

        <div className="content-grid w-full grid grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-2 xl:gap-12 lg:items-start">
          <Reveal
            variants={slideFromLeft}
            className="mx-auto w-full max-w-sm lg:max-w-none lg:mx-0 lg:sticky lg:top-[calc(var(--header-offset)+1rem)]"
          >
            <MediaCarousel
              slides={aboutSlides}
              intervalMs={5600}
              frameClassName="aspect-square min-h-[240px] max-h-[min(88vw,400px)] sm:max-h-none sm:min-h-0"
              photoFrameClassName="aspect-[5/6] min-h-[240px] max-h-[min(88vw,420px)] sm:max-h-none sm:min-h-0"
            />
          </Reveal>

          <Reveal variants={slideFromRight} className="space-y-6 text-center lg:text-left">
            <div className="prose-block prose-block-center-lg-left space-y-4">
              <p>
                Nazywam się{" "}
                <span className="font-bold text-primary-dark">{brand.fullName}</span>
                . <RichCopy>{about.introAfterName}</RichCopy>
              </p>
              {about.introParagraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>
                  <RichCopy>{paragraph}</RichCopy>
                </p>
              ))}
            </div>

            <motion.div
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              className="card-glass card-interactive card-padding card-callout space-y-3"
            >
              <h3 className="font-display text-lg md:text-xl font-semibold text-primary text-balance">
                {bindOrphans(about.experienceTitle)}
              </h3>
              <div className="prose-block prose-block-center-lg-left space-y-3 text-[0.9375rem] md:text-base">
                {about.experienceParagraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>
                    <RichCopy>{paragraph}</RichCopy>
                  </p>
                ))}
              </div>
            </motion.div>
          </Reveal>
        </div>

        <Reveal variants={fadeUp} className="content-narrow w-full space-y-5 pt-2 lg:pt-4">
          <h3 className="font-display text-xl md:text-2xl font-semibold text-primary text-center text-balance">
            {bindOrphans(about.challengesTitle)}
          </h3>

          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="list-accent list-accent-centered max-w-2xl mx-auto lg:max-w-none"
          >
            {about.challenges.map((item) => (
              <motion.li
                key={item}
                variants={staggerItem}
                className="list-accent-item"
              >
                <AccentMarker />
                <span className="min-w-0">
                  <RichCopy>{item}</RichCopy>
                </span>
              </motion.li>
            ))}
          </motion.ul>

          <p className="prose-block prose-block-center text-sm md:text-base max-w-2xl mx-auto">
            <RichCopy>{about.challengesFooter}</RichCopy>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
