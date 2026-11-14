
"use client";

import { useEffect, useRef } from "react";

// #region ANIMATED GALAXY BACKGROUND

export default function AnimatedBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // #region VIDEO PLAYBACK
  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    // Respect reduced-motion preferences.
    const media = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (media.matches) return;

    // Attempt playback if the browser permits it.
    video.play().catch(() => {
      // Autoplay may be blocked by browser settings.
    });
  }, []);
  // #endregion

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#070B1D]"
    >
      {/* #region GALAXY VIDEO */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        disablePictureInPicture
        className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
      >
        <source src="/videos/galaxy.mp4" type="video/mp4" />
      </video>
      {/* #endregion */}

     {/* #region DARK OVERLAY - TEXT READABILITY */}

    <div className="absolute inset-0 bg-[#070B1D]/0" />

    {/* #endregion */}
    </div>
  );
}

// #endregion
