// Import global styles for Tailwind CSS v4 compilation
import "./css/style.css";

import { initNavigation } from "./js/navigation.js";
import { initMarquee } from "./js/marquee.js";
import { initServicesData } from "./js/services-data.js";
import { initNestedSliders } from "./js/move-out-nested-slide.js";
import { contactForm } from "./js/contact-form.js";
import { initRevealLeftToRightStaggerOnScroll } from "./js/animations/reveal-left-to-right-stagger-on-scroll.js";
import { initParallaxScrollUpAndDown } from "./js/animations/paralax-scroll-up-and-down.js";
import { initFadeInUp } from "./js/animations/fade-in-up.js";

import navigationHtml from "./components/navigation.html?raw";
import heroHtml from "./components/hero.html?raw";
import marqueeHtml from "./components/marquee.html?raw";
import servicesHtml from "./components/services.html?raw";
import aboutHtml from "./components/about.html?raw";
import moveOutHtml from "./components/move-out-nested-slide.html?raw";
import coverageHtml from "./components/coverage.html?raw";
import reviewsHtml from "./components/reviews.html?raw";
import contactHtml from "./components/contact.html?raw";
import footerHtml from "./components/footer.html?raw";
import bathroomHtml from "./components/before-and-after/bathroom.html?raw";
import kitchenHtml from "./components/before-and-after/kitchen.html?raw";
import deepCleaningHtml from "./components/before-and-after/deep-cleaning-01.html?raw";

/**
 * Component Loader to keep the HTML codebase componentized.
 * Vite does not publish /src as static files in production, so components are
 * imported as raw HTML and injected after the bundle loads.
 */
function loadComponent(targetId, html) {
  const targetElement = document.getElementById(targetId);
  if (targetElement) {
    targetElement.innerHTML = html;
  }
}

/**
 * Main application initializer
 */
document.addEventListener("DOMContentLoaded", async () => {
  // 1. Inject global structural page layouts first (The main containers)
  loadComponent("navigation-root", navigationHtml);
  loadComponent("hero-root", heroHtml);
  loadComponent("marquee-root", marqueeHtml);
  loadComponent("services-root", servicesHtml);
  loadComponent("about-root", aboutHtml);
  loadComponent("move-out-root", moveOutHtml);
  loadComponent("coverage-root", coverageHtml);
  loadComponent("reviews-root", reviewsHtml);
  loadComponent("contact-root", contactHtml);
  loadComponent("footer-root", footerHtml);

  console.log("✨ Global HTML layouts successfully injected into the DOM.");

  // 2. Inject nested sub-components inside the structural shell before JavaScript boots up
  loadComponent("bathroom-target", bathroomHtml);
  loadComponent("kitchen-target", kitchenHtml);
  loadComponent("deep-cleaning-target", deepCleaningHtml);

  console.log(
    "📦 All nested before/after slides successfully mounted inside sub-roots.",
  );

  // 3. Trigger individual Javascript modules now that ALL HTML elements are fully painted and safe
  initNavigation();
  initMarquee();
  initServicesData();
  initNestedSliders(); // Boots the master category engine and the multi-instanced inner sliders
  contactForm();
  initRevealLeftToRightStaggerOnScroll();
  initParallaxScrollUpAndDown();
  initFadeInUp();
});
