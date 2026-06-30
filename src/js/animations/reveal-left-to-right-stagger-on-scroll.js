import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Initializes a row-aware staggered entry animation for layout elements.
 * Groups elements by horizontal rows and plays a consecutive sequence.
 * Plays strictly once on mobile/tablet footprints, while remaining fully reversible on desktop viewports.
 */
export function initRevealLeftToRightStaggerOnScroll() {
  const elements = document.querySelectorAll("[data-animate='stagger-item']");

  if (!elements || elements.length === 0) return;

  // Check natively if the device relies on mobile/tablet touch interactions
  const isTouchDevice = ScrollTrigger.isTouch === 1;

  // 1. Group items dynamically by their visual row (using their offsetTop position)
  const rowsMap = {};

  elements.forEach((element) => {
    const rowKey = Math.round(element.offsetTop / 10) * 10;
    if (!rowsMap[rowKey]) {
      rowsMap[rowKey] = [];
    }
    rowsMap[rowKey].push(element);
  });

  // 2. Iterate through each detected row group and assign an isolated ScrollTrigger timeline
  Object.values(rowsMap).forEach((rowElements) => {
    const rowTl = gsap.timeline({
      scrollTrigger: {
        trigger: rowElements[0],
        start: "top 83%",
        end: "bottom top",
        // Magic logic: Plays once and locks on mobile, stays fully reversible on desktop scroll setups
        toggleActions: isTouchDevice
          ? "play none none none"
          : "play reverse play reverse",
      },
    });

    rowTl.fromTo(
      rowElements,
      {
        opacity: 0,
        x: -50,
        y: 20,
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 1,
        ease: "power3.out",
        stagger: {
          each: 0.3,
        },
      },
    );
  });
}
