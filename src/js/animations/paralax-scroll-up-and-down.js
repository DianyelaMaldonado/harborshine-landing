import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initParallaxScrollUpAndDown() {
  
  const sections = document.querySelectorAll(
    "[data-animate='parallax-section']",
  );

  if (!sections || sections.length === 0) return;

  sections.forEach((section) => {
    
    const parallaxTarget =
      section.querySelector("[data-parallax='target']") || section;

    gsap.fromTo(
      parallaxTarget,
      {
        yPercent: -15, 
      },
      {
        yPercent: 15, 
        ease: "none", 
        scrollTrigger: {
          trigger: section, 
          start: "top bottom", 
          end: "bottom top", 
          scrub: 1, 
        },
      },
    );
  });
}
