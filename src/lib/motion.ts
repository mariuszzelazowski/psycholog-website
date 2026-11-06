/** Spójny język animacji (Framer Motion). */
export const easeSmooth = [0.22, 1, 0.36, 1] as const;

export const motionTransition = {
  duration: 0.65,
  ease: easeSmooth,
} as const;

export const motionTransitionFast = {
  duration: 0.45,
  ease: easeSmooth,
} as const;

export const viewportReveal = {
  once: true,
  amount: 0.22,
  margin: "0px 0px -48px 0px",
} as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: motionTransition,
  },
};

export const slideFromLeft = {
  hidden: { opacity: 0, x: -28 },
  visible: {
    opacity: 1,
    x: 0,
    transition: motionTransition,
  },
};

export const slideFromRight = {
  hidden: { opacity: 0, x: 28 },
  visible: {
    opacity: 1,
    x: 0,
    transition: motionTransition,
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: motionTransition,
  },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.06,
    },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: motionTransitionFast,
  },
};

export const slideCrossfade = {
  initial: { opacity: 0, scale: 1.04 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: easeSmooth },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    transition: { duration: 0.4, ease: easeSmooth },
  },
};
