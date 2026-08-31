import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initRevealLeftToRightStaggerOnScroll() {
  const elements = document.querySelectorAll("[data-animate='stagger-item']");

  if (!elements || elements.length === 0) return;

  const isTouchDevice = ScrollTrigger.isTouch === 1;

  const rowsMap = {};

  elements.forEach((element) => {
    const rowKey = Math.round(element.offsetTop / 10) * 10;
    if (!rowsMap[rowKey]) {
      rowsMap[rowKey] = [];
    }
    rowsMap[rowKey].push(element);
  });

  Object.values(rowsMap).forEach((rowElements) => {
    const rowTl = gsap.timeline({
      scrollTrigger: {
        trigger: rowElements[0],
        start: "top 83%",
        end: "bottom top",
        
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
