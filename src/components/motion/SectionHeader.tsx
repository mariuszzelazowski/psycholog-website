"use client";

import { motion } from "framer-motion";
import { fadeUp, viewportReveal } from "@/lib/motion";

type SectionHeaderProps = {
  label: string;
  title: string;
  titleId?: string;
  headingLevel?: "h2" | "h3";
  className?: string;
};

export default function SectionHeader({
  label,
  title,
  titleId,
  headingLevel = "h3",
  className = "",
}: SectionHeaderProps) {
  const titleClassName =
    "section-title text-balance text-[1.75rem] min-[400px]:text-3xl md:text-4xl lg:text-[2.75rem] px-1";

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
      className={`text-center space-y-2 ${className}`}
    >
      <motion.p variants={fadeUp} className="section-label max-w-full">
        {label}
      </motion.p>
      {headingLevel === "h2" ? (
        <motion.h2 id={titleId} variants={fadeUp} className={titleClassName}>
          {title}
        </motion.h2>
      ) : (
        <motion.h3 id={titleId} variants={fadeUp} className={titleClassName}>
          {title}
        </motion.h3>
      )}
      <motion.div
        variants={fadeUp}
        className="section-divider section-divider-animated mx-auto !mt-2.5"
        aria-hidden
      />
    </motion.header>
  );
}
