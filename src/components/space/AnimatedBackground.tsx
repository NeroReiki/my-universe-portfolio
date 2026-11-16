
"use client";

import { useEffect, useRef } from "react";

// ==========================================
// #region ANIMATED GALAXY BACKGROUND
// ==========================================

export default function AnimatedBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // ========================================
  // #region SMART VIDEO PLAYBACK
  // ========================================


useEffect(() => {
  const video = videoRef.current;

  if (!video) return;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  let isVisible = false;

  const syncVideoPlayback = () => {
    const shouldPlay =
      isVisible &&
      !document.hidden &&
      !reducedMotion.matches;

    if (shouldPlay) {
      if (video.paused) {
        video.play().catch(() => {
          // Autoplay may be blocked by the browser.
        });
      }
    } else {
      video.pause();
    }
  };

  // Observe when Home is visible on the screen.
  const observer = new IntersectionObserver(
    ([entry]) => {
      isVisible = entry.isIntersecting;
      syncVideoPlayback();
    },
    {
      threshold: 0.01,
    }
  );

  observer.observe(video);

  // Pause when switching browser tabs.
  document.addEventListener(
    "visibilitychange",
    syncVideoPlayback
  );

  // Respect reduced-motion preferences.
  reducedMotion.addEventListener(
    "change",
    syncVideoPlayback
  );

  syncVideoPlayback();

  return () => {
    observer.disconnect();

    document.removeEventListener(
      "visibilitychange",
      syncVideoPlayback
    );

    reducedMotion.removeEventListener(
      "change",
      syncVideoPlayback
    );

    video.pause();
  };
}, []);

  // #endregion

  // ========================================
  // #region BACKGROUND RENDER
  // ========================================

  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        absolute inset-0 z-0
        overflow-hidden bg-[#070B1D]
      "
    >
      {/* ==================================== */}
      {/* #region GALAXY VIDEO */}
      {/* ==================================== */}

      <video
        ref={videoRef}
        loop
        muted
        playsInline
        preload="metadata"
        disablePictureInPicture
        className="
          absolute inset-0 h-full w-full
          object-cover
          motion-reduce:hidden
        "
      >
        {/* Mobile: optimized 1.05 MB video */}
        <source
          src="/videos/galaxy-mobile.mp4"
          type="video/mp4"
          media="(max-width: 767px)"
        />

        {/* Tablet and desktop: original video */}
        <source
          src="/videos/galaxy.mp4"
          type="video/mp4"
        />
      </video>

      {/* #endregion */}

      {/* ==================================== */}
      {/* #region DARK OVERLAY */}
      {/* ==================================== */}

      <div className="absolute inset-0 bg-[#070B1D]/0" />

      {/* #endregion */}
    </div>
  );

  // #endregion
}

// #endregion
