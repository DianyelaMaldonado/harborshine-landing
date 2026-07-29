export function initAccessibleVideo() {
  const video = document.getElementById("promo-video");
  const toggleBtn = document.getElementById("video-toggle-btn");
  const restartBtn = document.getElementById("video-restart-btn");
  const videoSection = document.getElementById("harborshine-video-section");

  // Safety check: Exit if elements don't exist
  if (!video || !toggleBtn || !restartBtn || !videoSection) {
    return;
  }

  const playIcon = toggleBtn.querySelector(".play-icon");
  const pauseIcon = toggleBtn.querySelector(".pause-icon");

  // 1. Function to update UI icons based on video state
  function updateToggleUI() {
    if (video.paused) {
      toggleBtn.setAttribute("aria-pressed", "false");
      toggleBtn.setAttribute("aria-label", "Play video");
      pauseIcon.classList.add("hidden");
      playIcon.classList.remove("hidden");
    } else {
      toggleBtn.setAttribute("aria-pressed", "true");
      toggleBtn.setAttribute("aria-label", "Pause video");
      playIcon.classList.add("hidden");
      pauseIcon.classList.remove("hidden");
    }
  }

  // 2. Main toggle logic (Play/Pause/Unmute)
  function handleVideoToggle() {
    // Ensure sound is active when user interacts
    video.muted = false;

    if (video.paused || video.ended) {
      video.play();
    } else {
      video.pause();
    }
    updateToggleUI();
  }

  // 3. Restart logic (Top right button)
  function handleRestart() {
    video.currentTime = 0; // Rewind to start
    video.muted = false; // Ensure sound is ON
    video.play(); // Force play
    updateToggleUI();
  }

  // 4. Bind events
  toggleBtn.addEventListener("click", handleVideoToggle);
  restartBtn.addEventListener("click", handleRestart);
  video.addEventListener("click", handleVideoToggle);
  video.addEventListener("ended", updateToggleUI);

  // Set initial UI state
  updateToggleUI();

  // 5. INTERSECTION OBSERVER: Handle Scroll Mute/Pause
  // Native web API to detect when the video section is visible on screen
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // If the video leaves the viewport and is currently playing, pause it
      if (!entry.isIntersecting && !video.paused) {
        video.pause();
        updateToggleUI();
      }
    });
  }, observerOptions);

  // Start observing the video section
  videoObserver.observe(videoSection);
}
