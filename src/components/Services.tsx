"use client";

import { motion } from "framer-motion";
import { AppSection, services, servicesSection } from "@/config";
import SectionHeader from "@/components/motion/SectionHeader";
import RichCopy, { bindOrphans } from "@/lib/rich-copy";
import { motionTransition, scaleIn } from "@/lib/motion";

export default function Services() {
  return (
    <section
      id={AppSection.Services}
      className="relative section-padding scroll-mt-header overflow-hidden bg-bg border-y border-accent/25"
      aria-labelledby="services-heading"
    >
      <div className="ambient-orb ambient-orb-d pointer-events-none" aria-hidden />

      <div className="container-custom relative section-stack">
        <SectionHeader
          label={servicesSection.sectionLabel}
          title={servicesSection.title}
          titleId="services-heading"
        />

        <div className="grid gap-5 md:grid-cols-2 md:gap-6 content-grid">
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
              <div className="space-y-3.5 flex-1">
                <h3 className="font-display text-balance text-lg md:text-xl font-semibold tracking-tight text-text transition-colors duration-300 group-hover:text-primary-dark lg:max-w-none mx-auto lg:mx-0 max-w-[22rem]">
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
                <div className="mt-5 pt-4 border-t border-accent/25 flex flex-wrap items-baseline justify-center lg:justify-between gap-x-3 gap-y-1">
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
    </section>
  );
}
