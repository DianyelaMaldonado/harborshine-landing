import { gsap } from "gsap";

export function initMarquee() {
  const track = document.getElementById("marquee-track");
  if (!track) {
    console.warn(
      "⚠️ Marquee Module: Target '#marquee-track' container not found.",
    );
    return;
  }

  const wrapper = track.querySelector(".flex");
  const content = track.querySelector(".marquee-content");

  if (!wrapper || !content) return;

  // 1. CLONE ARCHITECTURE: Duplicate content once to create a seamless infinite seam
  const clone = content.cloneNode(true);
  wrapper.appendChild(clone);
  const marqueeTimeline = gsap.to(wrapper, {
    xPercent: -50,
    ease: "none",
    duration: 22,
    repeat: -1,
  });

  track.addEventListener("mouseenter", () => {
    gsap.to(marqueeTimeline, {
      timeScale: 0,
      duration: 0.4,
      ease: "power2.out",
    });
  });

  track.addEventListener("mouseleave", () => {
    gsap.to(marqueeTimeline, {
      timeScale: 1,
      duration: 0.4,
      ease: "power2.out",
    });
  });
}
