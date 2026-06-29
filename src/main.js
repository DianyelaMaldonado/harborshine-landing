// Import global styles for Tailwind CSS v4 compilation
import "./css/style.css";

import { initNavigation } from "./js/navigation.js";
import { initMarquee } from "./js/marquee.js";
import { initServicesData } from "./js/services-data.js";
import { initNestedSliders } from "./js/move-out-nested-slide.js";
import { contactForm } from "./js/contact-form.js";

/**
 * Async Component Loader to keep the HTML codebase componentized
 */
async function loadComponent(targetId, componentPath) {
  try {
    const response = await fetch(componentPath);
    if (!response.ok)
      throw new Error(`Failed to fetch component: ${componentPath}`);
    const html = await response.text();
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
    loadComponent("navigation-root", "/src/components/navigation.html"),
    loadComponent("hero-root", "/src/components/hero.html"),
    loadComponent("marquee-root", "/src/components/marquee.html"),
    loadComponent("intro-root", "/src/components/intro.html"),
    loadComponent("services-root", "/src/components/services.html"),
    loadComponent("about-root", "/src/components/about.html"),
    loadComponent(
      "move-out-root",
      "/src/components/move-out-nested-slide.html",
    ),
    loadComponent("coverage-root", "/src/components/coverage.html"),
    loadComponent("reviews-root", "/src/components/reviews.html"),
    loadComponent("contact-root", "/src/components/contact.html"),
    loadComponent("footer-root", "/src/components/footer.html"),
  ]);

  console.log("✨ Global HTML layouts successfully injected into the DOM.");

  // 2. Inject nested sub-components inside the structural shell before JavaScript boots up
  await Promise.all([
    loadComponent(
      "bathroom-target",
      "/src/components/before-and-after/bathroom.html",
    ),
    loadComponent(
      "kitchen-target",
      "/src/components/before-and-after/kitchen.html",
    ),
    loadComponent(
      "deep-cleaning-target",
      "/src/components/before-and-after/deep-cleaning-01.html",
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
});
