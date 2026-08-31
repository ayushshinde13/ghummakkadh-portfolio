import { Variants } from "framer-motion";
import { HERO_TIMINGS, EASING, SPRING_CONFIGS } from "./animation";

/**
 * Reusable Production-Ready Framer Motion Variants
 * Strict typing and clean encapsulation for Stripe / Razorpay / Uber level polish.
 */

// 1. Entire hero section container
export const heroSectionVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: EASING.easeOut,
      when: "beforeChildren",
    },
  },
};

// 2. Slow floating radial background gradients (15s repeat Infinity)
export const backgroundGradientVariants: Variants = {
  animate: {
    x: [0, 40, -30, 0],
    y: [0, -30, 40, 0],
    scale: [1, 1.1, 0.95, 1],
    transition: {
      duration: 15,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  },
};

// 3. Page Reveal Behind Scooter: Reveals from RIGHT to LEFT as scooter passes
export const pageRevealVariants: Variants = {
  hidden: {
    clipPath: "inset(-25% 0 -25% 100%)",
    opacity: 0,
  },
  visible: {
    clipPath: "inset(-25% 0 -25% 0%)",
    opacity: 1,
    transition: {
      delay: HERO_TIMINGS.pageReveal,
      duration: 1.1,
      ease: EASING.scooterDrive,
    },
  },
};

// 4. Left Content: Slide from x = -120, fade from 0, duration 0.8s, easeOut
export const leftContentVariants: Variants = {
  hidden: {
    x: -120,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      delay: HERO_TIMINGS.leftContentSlide,
      duration: 0.8,
      ease: EASING.easeOut,
    },
  },
};

// 5. Phone Mockup: Starts x = 250, opacity 0, scale 0.9, spring stiffness 90, damping 15
export const phoneMockupVariants: Variants = {
  hidden: {
    x: 250,
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      delay: HERO_TIMINGS.phoneSlide,
      ...SPRING_CONFIGS.phone,
    },
  },
};

// 6. Phone Idle Animation (continuous floating y: [-8, 0, -8], duration 4)
export const phoneIdleVariants: Variants = {
  idle: {
    y: [-8, 0, -8],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// 7. Scooter Drive: Enters from RIGHT (120vw), drives across to LEFT (0.2s -> 1.5s)
export const scooterDriveVariants: Variants = {
  hidden: {
    x: "120vw",
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      delay: HERO_TIMINGS.scooterEnter,
      duration: HERO_TIMINGS.scooterReach - HERO_TIMINGS.scooterEnter, // 1.3s duration
      ease: EASING.scooterDrive,
    },
  },
};

// 8. Scooter Bounce & Tilt (driving vs idle)
export const scooterBounceVariants: Variants = {
  driving: {
    y: [0, -6, 0, -4, 0],
    rotate: [0, -2.5, 1, -1.5, 0],
    transition: {
      duration: 0.3,
      repeat: 4, // loops while driving across
      ease: "easeInOut",
    },
  },
  idle: {
    y: [0, -3, 0],
    rotate: 0,
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// 9. Scooter Ground Shadow
export const scooterShadowVariants: Variants = {
  driving: {
    scaleX: [1, 0.85, 1],
    opacity: [0.35, 0.2, 0.35],
    transition: {
      duration: 0.3,
      repeat: 4,
      ease: "easeInOut",
    },
  },
  idle: {
    scaleX: [1, 0.95, 1],
    opacity: [0.3, 0.22, 0.3],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// 10. Floating Cards: OTP Card, Fare Locked Card, Driver Nearby Card
// opacity 0, y = 50, scale 0.9, stagger delay 0.2 starting at 1.6s
export const floatingCardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.9,
  },
  visible: (customIndex: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: HERO_TIMINGS.floatingCardsStart + customIndex * HERO_TIMINGS.floatingCardStagger,
      duration: 0.5,
      ease: EASING.easeOut,
    },
  }),
};

// 11. Stats Container & Items: animate from bottom, opacity 0, y = 40, stagger children
export const statsContainerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: HERO_TIMINGS.statsStart,
      staggerChildren: HERO_TIMINGS.statsStagger,
    },
  },
};

export const statItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: EASING.easeOut,
    },
  },
};

// 12. CTA Buttons: scale animation at 2.1s, hover scale 1.05 + shadow-xl
export const ctaButtonVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.85,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: HERO_TIMINGS.buttonsStart,
      duration: 0.45,
      type: "spring",
      stiffness: 120,
      damping: 14,
    },
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
};

