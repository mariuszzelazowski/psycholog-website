"use client";

import { MotionConfig, useReducedMotion } from "framer-motion";
import { motionTransition } from "@/lib/motion";

export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <MotionConfig
      reducedMotion={prefersReducedMotion ? "always" : "never"}
      transition={motionTransition}
    >
      {children}
    </MotionConfig>
  );
}
