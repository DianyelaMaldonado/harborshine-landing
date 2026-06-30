import Splide from "@splidejs/splide";
import "@splidejs/splide/css";

export function initNestedSliders() {
  setTimeout(() => {
    const outerElement = document.getElementById("outer-slider");
    if (!outerElement) {
      return;
    }

    // 1. Mount Master External Category Slider (Controls Kitchen, Bathroom, etc.)
    const outerSlider = new Splide("#outer-slider", {
      type: "fade",
      rewind: true,
      speed: 400,
      pagination: false,
      arrows: true,
    });

    outerSlider.mount();

    // 2. Query and loop through all internal photo carousels dynamically
    const innerElements = document.querySelectorAll(".inner-slider");

    if (innerElements.length === 0) {
      return;
    }

    innerElements.forEach((element) => {
      const innerSlider = new Splide(element, {
        type: "loop",
        autoplay: true,
        interval: 2000,
        speed: 800,
        rewind: false,
        pauseOnHover: true,
        pauseOnFocus: true,
        resetOnHover: false,
        perPage: 4,
        gap: "1.5rem",
        drag: true,
        pagination: false,
        arrows: false,
        breakpoints: {
          1280: { perPage: 3 },
          1024: { perPage: 2 },
          640: { perPage: 1.2, gap: "1rem" },
        },
      });

      innerSlider.mount();
    });
  }, 300);
}
