import { gsap } from "gsap";

export function initMarquee() {
  const track = document.getElementById("marquee-track");
  if (!track) {
    return;
  }

  const wrapper = track.querySelector(".flex");
  const content = track.querySelector(".marquee-content");

  if (!wrapper || !content) return;

  // 1. CLONE ARCHITECTURE: Duplicate content once for infinite loop
  const clone = content.cloneNode(true);
  wrapper.appendChild(clone);

  // 2. SET INITIAL POSITION: Move wrapper -50% to prepare the rightwards animation
  gsap.set(wrapper, { xPercent: -50 });

  // 3. GSAP INFINITE ANIMATION
  const marqueeTimeline = gsap.to(wrapper, {
    xPercent: 0,
    ease: "none",
    duration: 18,
    repeat: -1,
  });

  track.addEventListener("mouseenter", () => {
    gsap.to(marqueeTimeline, {
      timeScale: 0,
      duration: 0.1,
      ease: "power2.out",
    });
  });

  track.addEventListener("mouseleave", () => {
    gsap.to(marqueeTimeline, {
      timeScale: 1,
      duration: 0.1,
      ease: "power2.out",
    });
  });
}
