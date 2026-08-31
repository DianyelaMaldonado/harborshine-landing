import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initFadeInUp() {
  const triggers = document.querySelectorAll("[data-animate='fade-in-up']");

  if (!triggers || triggers.length === 0) return;

  triggers.forEach((trigger) => {
    
    const targetElement =
      trigger.querySelector(".animate-target-box") || trigger;

    gsap.fromTo(
      targetElement,
      {
        y: 120, 
      },
      {
        y: 0, 
        ease: "none", 
        scrollTrigger: {
          trigger: trigger, 
          start: "top bottom", 
          end: "top center", 
          scrub: 1.2, 
        },
      },
    );
  });

  ScrollTrigger.refresh();
}
