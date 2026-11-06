"use client";

import { motion } from "framer-motion";
import { brand, footer } from "@/config";
import RichCopy from "@/lib/rich-copy";
import { fadeUp } from "@/lib/motion";

/** Stopka jest na samym dole strony i jest niska — ujemny margines z `viewportReveal` nie pozwoliłby jej nigdy się pokazać. */
const footerViewport = { once: true, amount: 0 } as const;

export default function Footer() {
  return (
    <footer className="relative border-t border-accent/30 bg-linear-to-r from-bg-soft to-bg py-3.5 md:py-4 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/40 to-transparent"
        aria-hidden
      />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={footerViewport}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.06, delayChildren: 0.04 },
          },
        }}
        className="container-custom flex flex-col items-center gap-2 text-center lg:flex-row lg:justify-between lg:gap-6"
      >
        <motion.p
          variants={fadeUp}
          className="text-[0.8125rem] text-text-muted font-medium lg:shrink-0"
        >
          © {new Date().getFullYear()} ·{" "}
          <span className="font-display font-semibold text-primary-dark tracking-wide">
            {brand.fullName}
          </span>
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="flex flex-wrap justify-center gap-1 sm:gap-1.5"
        >
          {footer.keywords.map((keyword) => (
            <span key={keyword} className="footer-keyword">
              {keyword}
            </span>
          ))}
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="footer-note font-display md:text-xs text-text-muted/90 leading-snug italic font-medium lg:px-0"
        >
          <RichCopy>{footer.note}</RichCopy>
        </motion.p>
      </motion.div>
    </footer>
  );
}
