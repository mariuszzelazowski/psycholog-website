"use client";

import { motion } from "framer-motion";
import { AppSection, resourcesGift, resourcesSection } from "@/config";
import SectionHeader from "@/components/motion/SectionHeader";
import RichCopy, { bindOrphans } from "@/lib/rich-copy";
import { motionTransition, scaleIn, viewportReveal } from "@/lib/motion";

export default function Resources() {
  return (
    <section
      id={AppSection.Resources}
      className="relative section-padding scroll-mt-header overflow-hidden bg-linear-to-b from-bg/50 via-bg-soft to-bg border-y border-accent/20"
      aria-labelledby="resources-heading"
    >
      <div
        className="ambient-orb ambient-orb-b pointer-events-none"
        aria-hidden
      />

      <div className="container-custom relative section-stack">
        <div className="space-y-3">
          <SectionHeader
            label={resourcesSection.sectionLabel}
            titleId="resources-heading"
          />

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={viewportReveal}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: motionTransition,
              },
            }}
            className="section-lead section-lead-wide"
          >
            <RichCopy>{resourcesSection.lead}</RichCopy>
          </motion.p>
        </div>

        <div className="content-narrow w-full max-w-xl mx-auto">
          <motion.article
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.28 }}
            variants={scaleIn}
            transition={motionTransition}
            whileHover={{ y: -4 }}
            className="group relative card-glass card-interactive card-padding flex flex-col gap-4 text-center overflow-hidden"
          >
            <div
              className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-accent/15 blur-2xl opacity-90 transition-opacity duration-500 group-hover:opacity-100"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-10 -left-8 h-28 w-28 rounded-full bg-primary/10 blur-2xl opacity-80"
              aria-hidden
            />

            <div className="relative flex flex-col items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/45 bg-bg-soft/90 px-3.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-primary-dark shadow-sm">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse"
                  aria-hidden
                />
                {resourcesGift.badge}
              </span>

              <h3 className="card-title">{bindOrphans(resourcesGift.title)}</h3>

              <p className="prose-block prose-block-center text-[0.9375rem] md:text-base max-w-md">
                <RichCopy>{resourcesGift.description}</RichCopy>
              </p>
            </div>

            <div className="relative flex flex-col sm:flex-row sm:justify-center gap-2.5 pt-1">
              <motion.a
                href={resourcesGift.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full sm:w-auto min-w-[min(100%,16rem)]"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.99 }}
              >
                {resourcesGift.ctaLabel}
              </motion.a>
            </div>

            <p className="text-xs text-text-muted/90 font-medium leading-snug">
              Link otwiera plik w nowej karcie (Google&nbsp;Drive).
            </p>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
