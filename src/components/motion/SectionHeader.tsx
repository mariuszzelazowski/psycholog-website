"use client";

import { motion } from "framer-motion";
import { fadeUp, viewportReveal } from "@/lib/motion";

type SectionHeaderProps = {
  label: string;
  titleId?: string;
  className?: string;
};

export default function SectionHeader({
  label,
  titleId,
  className = "",
}: SectionHeaderProps) {
  return (
    <motion.header
      initial="hidden"
      whileInView="visible"
      viewport={viewportReveal}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.08, delayChildren: 0.04 },
        },
      }}
      className={`text-center space-y-2.5 ${className}`}
    >
      <motion.h2
        id={titleId}
        variants={fadeUp}
        className="section-heading max-w-full"
      >
        {label}
      </motion.h2>
      <motion.div
        variants={fadeUp}
        className="section-divider section-divider-animated mx-auto"
        aria-hidden
      />
    </motion.header>
  );
}
