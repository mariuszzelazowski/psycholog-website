"use client";

import { motion } from "framer-motion";
import { AppSection, services, servicesSection } from "@/config";
import Reveal from "@/components/motion/Reveal";
import SectionHeader from "@/components/motion/SectionHeader";
import RichCopy, { bindOrphans } from "@/lib/rich-copy";
import {
  fadeUp,
  motionTransition,
  scaleIn,
  staggerContainer,
  staggerItem,
} from "@/lib/motion";

function SubsectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 sm:gap-4">
      <span
        className="h-px min-w-6 flex-1 bg-gradient-to-r from-transparent to-accent/40"
        aria-hidden
      />
      <h3 className="card-title text-center min-w-0">{children}</h3>
      <span
        className="h-px min-w-6 flex-1 bg-gradient-to-l from-transparent to-accent/40"
        aria-hidden
      />
    </div>
  );
}

export default function Services() {
  return (
    <section
      id={AppSection.Services}
      className="relative section-padding scroll-mt-header overflow-hidden bg-bg border-y border-accent/25"
      aria-labelledby="services-heading"
    >
      <div
        className="ambient-orb ambient-orb-d pointer-events-none"
        aria-hidden
      />

      <div className="container-custom relative section-stack">
        <SectionHeader
          label={servicesSection.sectionLabel}
          titleId="services-heading"
        />

        <Reveal
          variants={fadeUp}
          className="content-grid flex flex-col gap-3 sm:gap-4"
        >
          <SubsectionTitle>
            {bindOrphans(servicesSection.challengesTitle)}
          </SubsectionTitle>

          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="challenge-chips"
          >
            {servicesSection.challenges.map((item) => (
              <motion.li
                key={item}
                variants={staggerItem}
                className="challenge-chip"
                style={{ "--chip-chars": item.length } as React.CSSProperties}
              >
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </Reveal>

        <div className="content-grid flex flex-col gap-3 sm:gap-4">
          <Reveal variants={fadeUp}>
            <SubsectionTitle>{servicesSection.offersTitle}</SubsectionTitle>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-2 md:gap-5">
            {services.map((service, index) => (
              <motion.article
                key={service.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={scaleIn}
                transition={{ ...motionTransition, delay: index * 0.08 }}
                whileHover={{ y: -4 }}
                className="group card-glass card-interactive card-padding flex flex-col h-full text-center lg:text-left"
              >
                <div className="space-y-3 flex-1">
                  <h3 className="card-title transition-colors duration-300 group-hover:text-primary lg:max-w-none mx-auto lg:mx-0 max-w-[22rem]">
                    {bindOrphans(service.title)}
                  </h3>

                  <div className="flex flex-wrap gap-1.5 justify-center lg:justify-start">
                    {service.delivery.map((mode) => (
                      <span
                        key={mode}
                        className="text-[0.6875rem] uppercase tracking-[0.14em] font-semibold px-3 py-1 rounded-full border border-accent/40 text-primary-dark bg-bg-soft/80"
                      >
                        {mode}
                      </span>
                    ))}
                  </div>

                  <p className="prose-block prose-block-center-lg-left lg:max-w-none">
                    <RichCopy>{service.description}</RichCopy>
                  </p>
                </div>

                {service.price && (
                  <div className="mt-4 pt-3 border-t border-accent/25 flex flex-wrap items-baseline justify-center lg:justify-between gap-x-3 gap-y-1">
                    <span className="font-display text-2xl md:text-3xl font-bold text-primary-dark">
                      {service.price}
                    </span>
                    <span className="text-[0.6875rem] text-text-muted font-semibold uppercase tracking-wider">
                      {service.priceNote}
                    </span>
                  </div>
                )}
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
