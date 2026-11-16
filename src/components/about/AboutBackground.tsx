
"use client";

import { useEffect, useRef } from "react";

// #region ABOUT BACKGROUND COMPONENT

export default function AboutBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // #region VIDEO PLAYBACK
  
useEffect(() => {
  const video = videoRef.current;

  if (!video) return;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  let isVisible = false;

  // Play only when the video is visible.
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

  // Detect when the background enters or leaves the screen.
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

  document.addEventListener(
    "visibilitychange",
    syncVideoPlayback
  );

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

return (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#050A1D]"
    style={{
      WebkitMaskImage:
        "linear-gradient(to bottom, transparent 0px, black 160px)",
      maskImage:
        "linear-gradient(to bottom, transparent 0px, black 160px)",
    }}
  >
      {/* #region ANIMATED GALAXY VIDEO */}
      <video
        ref={videoRef}
        loop
        muted
        playsInline
        preload="metadata"
        disablePictureInPicture
        className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
      >

{/* #region RESPONSIVE GALAXY VIDEO */}

{/* Mobile - optimized video */}
<source
  src="/videos/galaxypage2-mobile.mp4"
  type="video/mp4"
  media="(max-width: 767px)"
/>

{/* Tablet and Desktop - original HD video */}
<source
  src="/videos/galaxypage2.mp4"
  type="video/mp4"
/>

{/* #endregion */}

      </video>
      {/* #endregion */}

      {/* #region DARK VIDEO OVERLAY */}
      <div className="absolute inset-0 bg-[#030817]/45" />
      {/* #endregion */}

      {/* #region GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030817]/20 via-transparent to-[#030817]/85" />
      {/* #endregion */}
    </div>
  );
}

// #endregion
