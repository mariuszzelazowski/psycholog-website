"use client";

import { motion } from "framer-motion";
import { brand, footer } from "@/config";
import RichCopy from "@/lib/rich-copy";
import { fadeUp, viewportReveal } from "@/lib/motion";

export default function Footer() {
  return (
    <footer className="relative border-t border-accent/30 bg-linear-to-r from-bg-soft to-bg py-6 md:py-7 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/40 to-transparent"
        aria-hidden
      />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportReveal}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.06, delayChildren: 0.04 },
          },
        }}
        className="container-custom text-center space-y-2.5"
      >
        <motion.p variants={fadeUp} className="text-sm text-text-muted font-medium">
          © {new Date().getFullYear()} ·{" "}
          <span className="font-display font-semibold text-primary-dark tracking-wide">
            {brand.fullName}
          </span>
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="flex flex-wrap justify-center gap-1.5"
        >
          {footer.keywords.map((keyword) => (
            <span key={keyword} className="footer-keyword">
              {keyword}
            </span>
          ))}
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="footer-note font-display text-xs md:text-sm text-text-muted/90 mx-auto leading-snug italic font-medium"
        >
          <RichCopy>{footer.note}</RichCopy>
        </motion.p>
      </motion.div>
    </footer>
  );
}
