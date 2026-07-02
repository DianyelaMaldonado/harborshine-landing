import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Initializes a strict scroll-bound upward gliding animation.
 * Using native keywords like 'top bottom' ensures accurate viewport collisions
 * when handling dynamic or asynchronously injected HTML layout modules.
 */
export function initFadeInUp() {
  const triggers = document.querySelectorAll("[data-animate='fade-in-up']");

  if (!triggers || triggers.length === 0) return;

  triggers.forEach((trigger) => {
    // Target the inner visual container to keep coordinates precise and clean
    const targetElement =
      trigger.querySelector(".animate-target-box") || trigger;

    gsap.fromTo(
      targetElement,
      {
        y: 120, // Pushes the visual box 120px down immediately on execution
      },
      {
        y: 0, // Glides up precisely to its natural CSS layout position
        ease: "none", // Using 'none' makes the scrub sync perfectly flat and attached to the wheel layout
        scrollTrigger: {
          trigger: trigger, // The stable outer section dictates the viewport markers
          start: "top bottom", // Magic fix: Starts moving the exact millisecond the top of the section enters the bottom of the screen
          end: "top center", // Finishes the complete transition when the section hits the middle of the screen
          scrub: 1.2, // Binds the timeline strictly to the scroll velocity with a smooth lag catch-up
        },
      },
    );
  });

  // Re-calculate all DOM dimensions once asynchronous component operations settle down safely
  ScrollTrigger.refresh();
}
