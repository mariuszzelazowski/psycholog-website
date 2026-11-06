"use client";

import { motion, type Variants } from "framer-motion";
import { viewportReveal } from "@/lib/motion";

type RevealProps = {
  children: React.ReactNode;
  variants?: Variants;
  className?: string;
  as?: "div" | "section" | "article";
  delay?: number;
};

export default function Reveal({
  children,
  variants,
  className = "",
  as = "div",
  delay = 0,
}: RevealProps) {
  const Component = motion[as];

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={viewportReveal}
      variants={variants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </Component>
  );
}
