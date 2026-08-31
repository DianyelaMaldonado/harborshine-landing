import { gsap } from "gsap";

export function initMarquee() {
  const track = document.getElementById("marquee-track");
  if (!track) {
    return;
  }

  const wrapper = track.querySelector(".flex");
  const content = track.querySelector(".marquee-content");

  if (!wrapper || !content) return;

  const clone = content.cloneNode(true);
  wrapper.appendChild(clone);

  gsap.set(wrapper, { xPercent: -50 });

  const marqueeTimeline = gsap.to(wrapper, {
    xPercent: 0,
    ease: "none",
    duration: 12,
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
