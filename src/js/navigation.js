import Alpine from "alpinejs";
import { gsap } from "gsap";

/**
 * Initializes Alpine.js core and binds premium GSAP interactions to the header layout
 */
export function initNavigation() {
  // Bind Alpine globally for cross-template compatibility
  window.Alpine = Alpine;
  Alpine.start();

  // Inject our high-performance animation controller engine
  initPremiumNavbarEngine();
}

/**
 * Core navigation controller handling scroll-lock, animations and scroll states
 */
function initPremiumNavbarEngine() {
  const header = document.getElementById("site-header");
  const toggle = document.getElementById("menu-toggle");
  const dropdown = document.getElementById("menu-dropdown");
  const backdrop = document.getElementById("menu-backdrop");
  const dropdownContent = dropdown?.querySelector(".menu-dropdown-content");

  const desktopNav = document.getElementById("desktop-nav");
  const headerButtons = document.getElementById("header-cta-buttons");

  const menuIcon = document.getElementById("menu-icon");
  const topLine = menuIcon?.querySelector(".line-top");
  const middleLine = menuIcon?.querySelector(".line-middle");
  const bottomLine = menuIcon?.querySelector(".line-bottom");

  if (!header || !toggle || !dropdown || !dropdownContent || !backdrop) return;

  // Target all individual <li> elements inside the mobile menu for the stagger effect
  const mobileMenuItems = dropdownContent.querySelectorAll("ul > li");

  // ---------------------------------------------------------------------------
  // INTERACTIVE INITIAL STATES
  // ---------------------------------------------------------------------------
  gsap.set(dropdown, {
    autoAlpha: 0,
    height: 0,
    pointerEvents: "none",
    overflow: "hidden",
  });
  gsap.set(dropdownContent, { autoAlpha: 0 });
  gsap.set(backdrop, { autoAlpha: 0, pointerEvents: "none" });
  gsap.set(header, { y: 0 });

  // ---------------------------------------------------------------------------
  // IOS COMPATIBLE SCROLL LOCKING ENGINE
  // ---------------------------------------------------------------------------
  let capturedScrollY = 0;

  const lockScroll = () => {
    capturedScrollY = window.scrollY;
    document.documentElement.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${capturedScrollY}px`;
    document.body.style.width = "100%";
  };

  const unlockScroll = () => {
    document.documentElement.style.overflow = "";
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    window.scrollTo(0, capturedScrollY);
  };

  // ---------------------------------------------------------------------------
  //  RESPONSIVE CONSTRAINTS VIEWPORT LOGIC
  // ---------------------------------------------------------------------------
  const isMobileDevice = () =>
    window.matchMedia("(hover: none) and (pointer: coarse)").matches;

  const applyMobileMenuStyles = () => {
    if (isMobileDevice() || window.innerWidth <= 1023) {
      dropdownContent.style.height = "auto";
      dropdownContent.style.maxHeight = "calc(100vh - 80px)";
      dropdownContent.style.overflowY = "auto";
      dropdownContent.style.webkitOverflowScrolling = "touch";
    }
  };

  const resetMobileMenuStyles = () => {
    dropdownContent.style.height = "";
    dropdownContent.style.maxHeight = "";
    dropdownContent.style.overflowY = "";
    dropdownContent.style.webkitOverflowScrolling = "";
  };

  // ---------------------------------------------------------------------------
  //  BURGER ICON TRANSFORM TIMELINE
  // ---------------------------------------------------------------------------
  const iconTl = gsap.timeline({ paused: true });
  iconTl
    .to(topLine, {
      y: 6,
      rotation: 45,
      transformOrigin: "50% 50%",
      duration: 0.25,
      ease: "power2.inOut",
    })
    .to(middleLine, { autoAlpha: 0, duration: 0.15 }, "<")
    .to(
      bottomLine,
      {
        y: -6,
        rotation: -45,
        transformOrigin: "50% 50%",
        duration: 0.25,
        ease: "power2.inOut",
      },
      "<",
    );

  let isOpen = false;
  let currentActiveTimeline = null;

  // ---------------------------------------------------------------------------
  // TRANSITION HANDLERS: OPEN ENGINE (WITH STAGGERED LINKS)
  // ---------------------------------------------------------------------------
  const openMenu = () => {
    if (currentActiveTimeline) currentActiveTimeline.kill();

    lockScroll();
    applyMobileMenuStyles();

    // Reset mobile items to a hidden state on the left before animating them
    gsap.set(mobileMenuItems, { opacity: 0, x: -40 });

    const targetDropdownHeight = dropdown.scrollHeight;
    currentActiveTimeline = gsap.timeline();

    currentActiveTimeline
      .to(backdrop, {
        autoAlpha: 1,
        pointerEvents: "auto",
        duration: 0.25,
        ease: "power2.out",
      })
      .to([desktopNav, headerButtons], { autoAlpha: 0, duration: 0.2 }, "<")
      .to(
        dropdown,
        {
          height: targetDropdownHeight,
          autoAlpha: 1,
          pointerEvents: "auto",
          duration: 0.35,
          ease: "power3.out",
        },
        "-=0.1",
      )
      .to(dropdownContent, { autoAlpha: 1, duration: 0.2 }, "-=0.2")
      // STAGGER MAGIC: Links smoothly slide from x: -40 to x: 0 one by one
      .to(
        mobileMenuItems,
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          ease: "power2.out",
          stagger: 0.08, // Time delay between each link's entry
        },
        "-=0.15",
      );

    iconTl.play();
    isOpen = true;

    // Anchor the structural header firmly in place when screen is active
    gsap.to(header, {
      y: 0,
      backgroundColor: "#ffffff",
      boxShadow: "0 10px 30px rgba(13, 35, 39, 0.08)",
      duration: 0.3,
      overwrite: true,
    });
  };

  // ---------------------------------------------------------------------------
  // TRANSITION HANDLERS: CLOSE ENGINE
  // ---------------------------------------------------------------------------
  const closeMenu = () => {
    if (currentActiveTimeline) currentActiveTimeline.kill();

    currentActiveTimeline = gsap.timeline({
      onComplete: () => {
        unlockScroll();
        resetMobileMenuStyles();
      },
    });

    currentActiveTimeline
      .to(mobileMenuItems, {
        opacity: 0,
        x: -20,
        duration: 0.2,
        ease: "power2.in",
      })
      .to(
        dropdownContent,
        { autoAlpha: 0, duration: 0.15, ease: "power2.in" },
        "<",
      )
      .to(
        dropdown,
        {
          height: 0,
          autoAlpha: 0,
          pointerEvents: "none",
          duration: 0.3,
          ease: "power3.inOut",
        },
        "<",
      )
      .to(
        backdrop,
        {
          autoAlpha: 0,
          pointerEvents: "none",
          duration: 0.25,
          ease: "power2.in",
        },
        "<",
      )
      .to(
        [desktopNav, headerButtons],
        { autoAlpha: 1, duration: 0.25 },
        "-=0.1",
      );

    iconTl.reverse();
    isOpen = false;
  };

  // ---------------------------------------------------------------------------
  // EVENT LISTENER ARCHITECTURE
  // ---------------------------------------------------------------------------
  toggle.addEventListener("click", () => {
    isOpen ? closeMenu() : openMenu();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen) closeMenu();
  });

  backdrop.addEventListener("click", () => {
    if (isOpen) closeMenu();
  });

  window.addEventListener("resize", () => {
    if (isOpen) applyMobileMenuStyles();
  });

  // ---------------------------------------------------------------------------
  // HIGH-PERFORMANCE PEEKABOO NAVIGATION ENGINE
  // ---------------------------------------------------------------------------
  let lastScrollY = window.scrollY;
  let ticking = false;
  let headerVisible = true;
  const scrollThreshold = 10;

  const updateHeaderState = () => {
    const currentScrollY = window.scrollY;

    if (isOpen) {
      lastScrollY = currentScrollY;
      ticking = false;
      return;
    }

    if (currentScrollY <= 80) {
      gsap.to(header, {
        y: 0,
        backgroundColor: "#ffffff",
        boxShadow: "none",
        duration: 0.3,
        overwrite: true,
      });
      headerVisible = true;
    } else if (
      currentScrollY > lastScrollY &&
      currentScrollY > scrollThreshold
    ) {
      if (headerVisible) {
        gsap.to(header, {
          y: -header.offsetHeight,
          backgroundColor: "#ffffff",
          boxShadow: "0 10px 30px rgba(13, 35, 39, 0.08)",
          duration: 0.35,
          overwrite: true,
        });
        headerVisible = false;
      }
    } else if (currentScrollY < lastScrollY) {
      if (!headerVisible) {
        gsap.to(header, {
          y: 0,
          backgroundColor: "#ffffff",
          boxShadow: "0 10px 30px rgba(13, 35, 39, 0.08)",
          duration: 0.3,
          overwrite: true,
        });
        headerVisible = true;
      }
    }

    lastScrollY = currentScrollY;
    ticking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHeaderState);
        ticking = true;
      }
    },
    { passive: true },
  );
}
