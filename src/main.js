// Import global styles for Tailwind CSS v4 compilation
import "./css/style.css";

// Import our custom component modules
import { initNavigation } from "./js/navigation.js";
import { initMarquee } from "./js/marquee.js";

/**
 * Async Component Loader to keep the HTML codebase componentized
 */
async function loadComponent(targetId, componentPath) {
  try {
    const response = await fetch(componentPath);
    if (!response.ok)
      throw new Error(`Failed to fetch component: ${componentPath}`);
    const html = await response.text();
    document.getElementById(targetId).innerHTML = html;
  } catch (error) {
    console.error(`❌ Layout engine error:`, error);
  }
}

/**
 * Main application initializer
 */
document.addEventListener("DOMContentLoaded", async () => {
  // 1. Inject all HTML layouts asynchronously first
  await loadComponent("navigation-root", "/src/components/navigation.html");
  await loadComponent("hero-root", "/src/components/hero.html");
  await loadComponent("marquee-root", "/src/components/marquee.html");
  await loadComponent("intro-root", "/src/components/intro.html");
  await loadComponent("services-root", "/src/components/services.html");
  await loadComponent("about-root", "/src/components/about.html");
  await loadComponent("coverage-root", "/src/components/coverage.html");
  await loadComponent("contact-root", "/src/components/contact.html");
  await loadComponent("footer-root", "/src/components/footer.html");

  // 2. Trigger individual Javascript modules now that HTML exists
  initNavigation();
  initMarquee();
});
