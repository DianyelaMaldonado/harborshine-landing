import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Initializes a highly elegant and smooth global parallax effect for sections.
 * It looks for containers marked with [data-animate="parallax-section"].
 * If a [data-parallax="target"] child is found (like a background image), it animates that target.
 * Otherwise, it smoothly shifts the entire section wrapper.
 */
export function initParallaxScrollUpAndDown() {
  // Query all sections configured for the parallax behavior
  const sections = document.querySelectorAll(
    "[data-animate='parallax-section']",
  );

  if (!sections || sections.length === 0) return;

  sections.forEach((section) => {
    // Check if there is a specific internal target (e.g., a background image or container)
    // to avoid shifting the structural outer bounds of the section layout
    const parallaxTarget =
      section.querySelector("[data-parallax='target']") || section;

    gsap.fromTo(
      parallaxTarget,
      {
        yPercent: -15, // Starts slightly shifted upwards when entering the viewport baseline
      },
      {
        yPercent: 15, // Smoothly glides downwards until the section leaves the viewport limits
        ease: "none", // Linear ease is strictly mandatory for scrub sync to feel natural and attached
        scrollTrigger: {
          trigger: section, // The section boundaries define the timeline scope
          start: "top bottom", // Starts calculations the exact moment the top of the section enters the bottom viewport edge
          end: "bottom top", // Completes the movement when the bottom of the section leaves the top viewport edge
          scrub: 1, // Adds a luxury 1-second smoothing catch-up delay to the scroll movement
        },
      },
    );
  });
}
