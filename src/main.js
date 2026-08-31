
import "./css/style.css";

import { initNavigation } from "./js/navigation.js";
import { initMarquee } from "./js/marquee.js";
import { initServicesData } from "./js/services-data.js";
import { initNestedSliders } from "./js/move-out-nested-slide.js";
import { contactForm } from "./js/contact-form.js";
import { initAccessibleVideo } from "./js/video.js";
import { initRevealLeftToRightStaggerOnScroll } from "./js/animations/reveal-left-to-right-stagger-on-scroll.js";
import { initParallaxScrollUpAndDown } from "./js/animations/paralax-scroll-up-and-down.js";
import { initFadeInUp } from "./js/animations/fade-in-up.js";

import navigationHtml from "./components/navigation.html?raw";
import heroHtml from "./components/hero.html?raw";
import marqueeHtml from "./components/marquee.html?raw";
import videoHtml from "./components/video.html?raw";
import servicesHtml from "./components/services.html?raw";
import aboutHtml from "./components/about.html?raw";
import moveOutHtml from "./components/move-out-nested-slide.html?raw";
import coverageHtml from "./components/coverage.html?raw";
import reviewsHtml from "./components/reviews.html?raw";
import contactHtml from "./components/contact.html?raw";
import ownerHtml from "./components/owner.html?raw";
import footerHtml from "./components/footer.html?raw";

import moveOutCleaningReadyHtml from "./components/before-and-after/move-out-cleaning-ready-move-in.html?raw";
import moveOutReadyJunkHtml from "./components/before-and-after/move-out-ready-move-in-junk-removal.html?raw";
import moveOutJunkRemovalHtml from "./components/before-and-after/move-out-junk-removal.html?raw";
import moveOutJunkSmokeHtml from "./components/before-and-after/move-out-junk-removal-and-smoke-stains-removal.html?raw";

function loadComponent(targetId, html) {
  const targetElement = document.getElementById(targetId);
  if (targetElement) {
    targetElement.innerHTML = html;
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  
  loadComponent("navigation-root", navigationHtml);
  loadComponent("hero-root", heroHtml);
  loadComponent("marquee-root", marqueeHtml);
  loadComponent("video-root", videoHtml);
  loadComponent("services-root", servicesHtml);
  loadComponent("about-root", aboutHtml);
  loadComponent("move-out-root", moveOutHtml);
  loadComponent("coverage-root", coverageHtml);
  loadComponent("reviews-root", reviewsHtml);
  loadComponent("contact-root", contactHtml);
  loadComponent("owner-root", ownerHtml);
  loadComponent("footer-root", footerHtml);
  
  loadComponent(
    "move-out-cleaning-ready-move-in-target",
    moveOutCleaningReadyHtml,
  );
  loadComponent(
    "move-out-ready-move-in-junk-removal-target",
    moveOutReadyJunkHtml,
  );
  loadComponent("move-out-junk-removal-target", moveOutJunkRemovalHtml);
  loadComponent(
    "move-out-junk-removal-and-smoke-stains-removal-target",
    moveOutJunkSmokeHtml,
  );

  setTimeout(() => {
    initNavigation();
    initMarquee();
    initServicesData();
    initNestedSliders(); 
    contactForm();
    initAccessibleVideo();
    initRevealLeftToRightStaggerOnScroll();
    initParallaxScrollUpAndDown();
    initFadeInUp();
  }, 50);
});
