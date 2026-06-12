import Alpine from "alpinejs";

/**
 * Initializes Alpine.js core specifically for the navigation context
 */
export function initNavigation() {
  // We attach Alpine to the global window object so components can read it
  window.Alpine = Alpine;
  Alpine.start();

  console.log("✨ Navigation Module: Alpine.js successfully initialized.");
}
