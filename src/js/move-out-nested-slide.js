import Splide from "@splidejs/splide";
import "@splidejs/splide/css";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";

import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";

export function initNestedSliders() {
  setTimeout(() => {
    const outerElement = document.getElementById("outer-slider");
    if (!outerElement) {
      return;
    }

    // 1. Mount Master External Category Slider
    const outerSlider = new Splide("#outer-slider", {
      type: "fade",
      rewind: true,
      speed: 400,
      pagination: false,
      arrows: true,
      drag: false,
      keyboard: "focused", // A11Y FIX: Only react to keyboard when explicitly focused
    });

    outerSlider.mount();

    // 2. Query and loop through all internal photo carousels
    const innerElements = document.querySelectorAll(".inner-slider");

    if (innerElements.length === 0) {
      return;
    }

    innerElements.forEach((element) => {
      const innerSlider = new Splide(element, {
        type: "loop",
        drag: "free",
        focus: "center",
        arrows: false,
        pagination: false,
        fixedWidth: "65%",
        gap: "1.5rem",
        slideFocus: false, // A11Y FIX: Prevent double tabbing per slide
        keyboard: "focused", // A11Y FIX: Isolate keyboard controls
        autoScroll: {
          speed: 1,
          pauseOnHover: true,
          pauseOnFocus: true,
        },
        mediaQuery: "min",
        breakpoints: {
          900: {
            fixedWidth: false,
            autoWidth: true,
          },
        },
      });

      innerSlider.mount({ AutoScroll });

      // 3. Accessible Lightbox Initialization
      const lightbox = new PhotoSwipeLightbox({
        gallery: element,
        children: "a.gallery-item",
        pswpModule: () => import("photoswipe"),
        bgOpacity: 0.85,
        wheelToZoom: true,
        padding: { top: 30, bottom: 30, left: 20, right: 20 },
      });

      lightbox.on("open", () => {
        const autoScroll = innerSlider.Components.AutoScroll;
        if (autoScroll) autoScroll.pause();
      });

      lightbox.on("close", () => {
        // Only resume if the manual pause toggle button is NOT pressed
        const toggleBtn = element.querySelector(".autoscroll-toggle");
        const isManuallyPaused =
          toggleBtn && toggleBtn.getAttribute("aria-pressed") === "true";

        const autoScroll = innerSlider.Components.AutoScroll;
        if (autoScroll && !isManuallyPaused) {
          autoScroll.play();
        }
      });

      lightbox.init();

      // 4. A11Y FIX: Manual Auto-Scroll Toggle Logic
      const toggleBtn = element.querySelector(".autoscroll-toggle");
      if (toggleBtn) {
        toggleBtn.addEventListener("click", () => {
          const autoScroll = innerSlider.Components.AutoScroll;
          const isPaused = toggleBtn.getAttribute("aria-pressed") === "true";

          if (isPaused) {
            autoScroll.play();
            toggleBtn.setAttribute("aria-pressed", "false");
            toggleBtn.querySelector(".toggle-text").textContent = "Pause";
            toggleBtn.querySelector(".pause-icon").classList.remove("hidden");
            toggleBtn.querySelector(".play-icon").classList.add("hidden");
          } else {
            autoScroll.pause();
            toggleBtn.setAttribute("aria-pressed", "true");
            toggleBtn.querySelector(".toggle-text").textContent = "Play";
            toggleBtn.querySelector(".pause-icon").classList.add("hidden");
            toggleBtn.querySelector(".play-icon").classList.remove("hidden");
          }
        });
      }
    });
  }, 300);
}
