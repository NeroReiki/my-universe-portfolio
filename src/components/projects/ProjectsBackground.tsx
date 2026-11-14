
"use client";

import { useEffect, useRef } from "react";

// #region PROJECTS BACKGROUND COMPONENT

export default function ProjectsBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // #region VIDEO PLAYBACK
  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (!motionPreference.matches) {
      video.play().catch(() => {});
    }
  }, []);
  // #endregion

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#050A1D]"
    >
      {/* #region PROJECTS GALAXY VIDEO */}
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
        <source
          src="/videos/galaxypage3.mp4"
          type="video/mp4"
        />
      </video>
      {/* #endregion */}

      {/* #region DARK OVERLAY */}
      <div className="absolute inset-0 bg-[#030817]/45" />
      {/* #endregion */}

      {/* #region GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030817]/20 via-transparent to-[#030817]/85" />
      {/* #endregion */}
    </div>
  );
}

// #endregion
