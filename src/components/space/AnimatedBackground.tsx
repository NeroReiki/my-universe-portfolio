
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

    // Respect reduced-motion preferences.
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    // Pause or resume playback when appropriate.
    const syncVideoPlayback = () => {
      const shouldPlay =
        !document.hidden && !reducedMotion.matches;

      if (!shouldPlay) {
        video.pause();
        return;
      }

      if (video.paused) {
        video.play().catch(() => {
          // Autoplay may be blocked by the browser.
        });
      }
    };

    // Set initial playback state.
    syncVideoPlayback();

    // Pause when the tab is hidden and resume
    // when the visitor returns.
    document.addEventListener(
      "visibilitychange",
      syncVideoPlayback
    );

    // Respond to reduced-motion setting changes.
    reducedMotion.addEventListener(
      "change",
      syncVideoPlayback
    );

    // Cleanup event listeners.
    return () => {
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
        autoPlay
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
