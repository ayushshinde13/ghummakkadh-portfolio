import { Transition } from "framer-motion";

/**
 * Reusable Choreography Timings & Easing Curves
 * Production-ready Framer Motion animation constants for the Ghummakkad Hero sequence.
 *
 * Choreography Timeline:
 * 0.0s - Background radial gradients & container fade in
 * 0.2s - Scooter starts driving from RIGHT across to LEFT
 * 0.3s - Page Content (Phone Mockup & Left Headline) reveals from RIGHT to LEFT behind the scooter
 * 0.5s - Phone mockup spring physics
 * 0.8s - Left headline slides in
 * 1.5s - Scooter reaches LEFT destination & stops
 * 1.6s - Floating cards appear (Fare Locked, OTP, Driver Nearby) - staggered by 0.2s
 * 1.9s - Stats animate from bottom (y = 40) - staggered children
 * 2.1s - Buttons animate with scale bounce
 * 2.4s - Everything enters continuous idle animations (phone float, scooter idle bounce)
 */

export const HERO_TIMINGS = {
  backgroundFade: 0.0,
  scooterEnter: 0.4,
  pageReveal: 0.7,
  phoneSlide: 0.5,
  leftContentSlide: 0.7,
  scooterReach: 1.5,
  floatingCardsStart: 1.6,
  floatingCardStagger: 0.2,
  statsStart: 1.9,
  statsStagger: 0.15,
  buttonsStart: 2.1,
  idleStart: 2.4,
} as const;

export const EASING = {
  easeOut: [0.16, 1, 0.3, 1] as const,
  easeInOut: [0.4, 0, 0.2, 1] as const,
  scooterDrive: [0.22, 1, 0.36, 1] as const,
};

export const SPRING_CONFIGS = {
  phone: {
    type: "spring",
    stiffness: 90,
    damping: 15,
  } as Transition,
  button: {
    type: "spring",
    stiffness: 140,
    damping: 12,
  } as Transition,
};

export const getDelay = (time: number): Transition => ({
  delay: time,
  ease: EASING.easeOut,
});
