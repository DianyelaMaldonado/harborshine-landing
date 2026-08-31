export function initAccessibleVideo() {
  const video = document.getElementById("promo-video");
  const toggleBtn = document.getElementById("video-toggle-btn");
  const restartBtn = document.getElementById("video-restart-btn");
  const videoSection = document.getElementById("harborshine-video-section");

  if (!video || !toggleBtn || !restartBtn || !videoSection) {
    return;
  }

  const playIcon = toggleBtn.querySelector(".play-icon");
  const pauseIcon = toggleBtn.querySelector(".pause-icon");

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

  function handleVideoToggle() {
    
    video.muted = false;

    if (video.paused || video.ended) {
      video.play();
    } else {
      video.pause();
    }
    updateToggleUI();
  }

  function handleRestart() {
    video.currentTime = 0; 
    video.muted = false; 
    video.play(); 
    updateToggleUI();
  }

  toggleBtn.addEventListener("click", handleVideoToggle);
  restartBtn.addEventListener("click", handleRestart);
  video.addEventListener("click", handleVideoToggle);
  video.addEventListener("ended", updateToggleUI);

  updateToggleUI();

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (video.paused) {
          video.muted = true;
          video.play().catch(() => {});
          updateToggleUI();
        }
      } else if (!video.paused) {
        video.pause();
        updateToggleUI();
      }
    });
  }, observerOptions);

  videoObserver.observe(videoSection);
}
