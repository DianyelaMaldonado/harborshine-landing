import { gsap } from "gsap";

/**
 * Initializes the infinite scrolling animation for the San Diego locations marquee
 */
export function initMarquee() {
  const marqueeContainer = document.querySelector("#marquee-root .flex");

  if (!marqueeContainer) {
    console.warn("⚠️ Marquee Module: Target container not found in DOM yet.");
    return;
  }

  // Next week we will build the GSAP horizontal twin scroll here
  console.log(
    "🤖 Marquee Module: GSAP ready to animate with version:",
    gsap.version,
  );
}
