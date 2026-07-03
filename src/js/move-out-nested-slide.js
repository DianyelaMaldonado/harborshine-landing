import Splide from "@splidejs/splide";
import "@splidejs/splide/css";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";

export function initNestedSliders() {
  setTimeout(() => {
    const outerElement = document.getElementById("outer-slider");
    if (!outerElement) {
      return;
    }

    const outerSlider = new Splide("#outer-slider", {
      type: "fade",
      rewind: true,
      speed: 400,
      pagination: false,
      arrows: true,
      drag: false,
    });

    outerSlider.mount();

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
        autoScroll: {
          speed: 1,
          pauseOnHover: false,
          pauseOnFocus: false,
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
    });
  }, 300);
}
