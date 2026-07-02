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

const BASE = import.meta.env.BASE_URL || "/";

/**
 * Resolves absolute paths (e.g., /media/...) within fetched HTML
 * so they work with the GitHub Pages base URL in production.
 */
function resolveTemplatePaths(html) {
  return html.replace(/(src|href|poster)="\/(?!\/|#)/g, `$1="${BASE}`);
}

/**
 * Async Component Loader to keep the HTML codebase componentized
 */
async function loadComponent(targetId, componentPath) {
  try {
    const response = await fetch(componentPath);
    if (!response.ok)
      throw new Error(`Failed to fetch component: ${componentPath}`);
    let html = await response.text();
    html = resolveTemplatePaths(html);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.innerHTML = html;
    }
  } catch (error) {
    console.error(`❌ Layout engine error:`, error);
  }
}

/**
 * Main application initializer
 */
document.addEventListener("DOMContentLoaded", async () => {
  // 1. Inject global structural page layouts first (The main containers)
  await Promise.all([
    loadComponent("navigation-root", `${BASE}templates/navigation.html`),
    loadComponent("hero-root", `${BASE}templates/hero.html`),
    loadComponent("marquee-root", `${BASE}templates/marquee.html`),
    loadComponent("intro-root", `${BASE}templates/intro.html`),
    loadComponent("services-root", `${BASE}templates/services.html`),
    loadComponent("about-root", `${BASE}templates/about.html`),
    loadComponent(
      "move-out-root",
      `${BASE}templates/move-out-nested-slide.html`,
    ),
    loadComponent("coverage-root", `${BASE}templates/coverage.html`),
    loadComponent("reviews-root", `${BASE}templates/reviews.html`),
    loadComponent("contact-root", `${BASE}templates/contact.html`),
    loadComponent("footer-root", `${BASE}templates/footer.html`),
  ]);

  console.log("✨ Global HTML layouts successfully injected into the DOM.");

  // 2. Inject nested sub-components inside the structural shell before JavaScript boots up
  await Promise.all([
    loadComponent(
      "bathroom-target",
      `${BASE}templates/before-and-after/bathroom.html`,
    ),
    loadComponent(
      "kitchen-target",
      `${BASE}templates/before-and-after/kitchen.html`,
    ),
    loadComponent(
      "deep-cleaning-target",
      `${BASE}templates/before-and-after/deep-cleaning-01.html`,
    ),
  ]);

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
