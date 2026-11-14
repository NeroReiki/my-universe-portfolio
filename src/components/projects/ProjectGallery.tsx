
"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

// ==========================================
// #region TYPES
// ==========================================

type ProjectGalleryProps = {
  images: string[];
  title: string;
};

// #endregion

// ==========================================
// #region PROJECT GALLERY
// ==========================================

export default function ProjectGallery({
  images,
  title,
}: ProjectGalleryProps) {
  // #region STATE

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  const galleryImages = images.slice(0, 3);
  const isOpen = selectedIndex !== null;

  // #endregion

  // #region CLIENT MOUNT

  useEffect(() => {
    setMounted(true);
  }, []);

  // #endregion

  // #region NAVIGATION

  const closeGallery = () => {
    setSelectedIndex(null);
  };

  const nextImage = () => {
    setSelectedIndex((current) =>
      current === null
        ? null
        : (current + 1) % galleryImages.length
    );
  };

  const previousImage = () => {
    setSelectedIndex((current) =>
      current === null
        ? null
        : (current - 1 + galleryImages.length) %
          galleryImages.length
    );
  };

  // #endregion

  // #region KEYBOARD SUPPORT

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedIndex(null);
      }

      if (galleryImages.length > 1) {
        if (event.key === "ArrowRight") {
          setSelectedIndex((current) =>
            current === null
              ? null
              : (current + 1) % galleryImages.length
          );
        }

        if (event.key === "ArrowLeft") {
          setSelectedIndex((current) =>
            current === null
              ? null
              : (current - 1 + galleryImages.length) %
                galleryImages.length
          );
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, galleryImages.length]);

  // #endregion

  // #region EMPTY GALLERY

  if (galleryImages.length === 0) {
    return (
      <p className="py-10 text-center text-slate-400">
        Project screenshots coming soon.
      </p>
    );
  }

  // #endregion

  return (
    <>
      {/* ====================================== */}
      {/* #region PROJECT IMAGE GRID */}
      {/* ====================================== */}

      <section
        aria-label={`${title} screenshots`}
        className="mb-10"
      >
        <div
          className={`
            grid grid-cols-1 gap-4
            ${
              galleryImages.length === 2
                ? "sm:grid-cols-2"
                : galleryImages.length === 3
                  ? "sm:grid-cols-3"
                  : ""
            }
          `}
        >
          {galleryImages.map((src, index) => (
            <button
              key={`${src}-${index}`}
              type="button"
              onClick={() => setSelectedIndex(index)}
              aria-label={`Enlarge screenshot ${index + 1}`}
              className="
                group relative block w-full
                cursor-zoom-in overflow-hidden
                rounded-2xl
                focus-visible:outline-2
                focus-visible:outline-cyan-300
              "
            >
              <Image
                src={src}
                alt={`${title} screenshot ${index + 1}`}
                width={1600}
                height={900}
                sizes={
                  galleryImages.length === 3
                    ? "(max-width: 640px) 100vw, 33vw"
                    : galleryImages.length === 2
                      ? "(max-width: 640px) 100vw, 50vw"
                      : "100vw"
                }
                className="
                  block h-auto w-full
                  object-contain
                  transition-transform duration-300
                  group-hover:scale-[1.025]
                "
              />

              {/* ZOOM INDICATOR */}

              <span
                className="
                  absolute bottom-3 right-3
                  rounded-lg border border-white/20
                  bg-[#07152C]/85 px-3 py-2
                  text-xs font-semibold text-white
                  opacity-0 backdrop-blur-md
                  transition-opacity
                  group-hover:opacity-100
                  group-focus-visible:opacity-100
                "
              >
                ⛶ Click to enlarge
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* #endregion */}

      {/* ====================================== */}
      {/* #region FULLSCREEN LIGHTBOX */}
      {/* ====================================== */}

      {mounted &&
        selectedIndex !== null &&
        createPortal(
          <div
            data-scroll-nav-ignore
            role="presentation"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                closeGallery();
              }
            }}
            className="
              fixed inset-0 z-[20000]
              flex items-center justify-center
              bg-[#020617]/95 p-3
              backdrop-blur-xl
              sm:p-6
            "
          >
            <section
              role="dialog"
              aria-modal="true"
              aria-label={`${title} enlarged screenshot`}
              data-scroll-nav-ignore
              className="
                flex h-full w-full max-w-7xl
                flex-col
              "
            >
              {/* #region LIGHTBOX HEADER */}

              <div
                className="
                  mb-3 flex shrink-0
                  items-center justify-between gap-4
                "
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">
                    {title}
                  </p>

                  <p className="mt-1 text-xs text-cyan-300">
                    Image {selectedIndex + 1} of{" "}
                    {galleryImages.length}
                  </p>
                </div>

                <button
                  type="button"
                  autoFocus
                  onClick={closeGallery}
                  aria-label="Close enlarged image"
                  className="
                    flex h-11 w-11 shrink-0
                    items-center justify-center
                    rounded-xl border border-white/20
                    bg-white/10 text-xl text-white
                    transition-colors hover:bg-white/20
                  "
                >
                  ✕
                </button>
              </div>

              {/* #endregion */}

              {/* #region ENLARGED IMAGE */}

              <div
                className="
                  relative min-h-0 flex-1
                  overflow-hidden rounded-2xl
                "
              >
                <Image
                  key={galleryImages[selectedIndex]}
                  src={galleryImages[selectedIndex]}
                  alt={`${title} enlarged screenshot ${
                    selectedIndex + 1
                  }`}
                  fill
                  priority
                  sizes="100vw"
                  className="object-contain"
                />
              </div>

              {/* #endregion */}

              {/* #region LIGHTBOX FOOTER */}

              <div
                className="
                  mt-3 flex shrink-0
                  items-center justify-between gap-3
                "
              >
                <button
                  type="button"
                  onClick={previousImage}
                  disabled={galleryImages.length < 2}
                  className="
                    rounded-xl border border-white/20
                    bg-white/10 px-5 py-3
                    text-sm font-semibold text-white
                    hover:bg-white/20
                    disabled:cursor-not-allowed
                    disabled:opacity-30
                  "
                >
                  ← Previous
                </button>

                <p className="hidden text-xs text-slate-400 sm:block">
                  Use ← → arrows or Esc
                </p>

                <button
                  type="button"
                  onClick={nextImage}
                  disabled={galleryImages.length < 2}
                  className="
                    rounded-xl border border-white/20
                    bg-white/10 px-5 py-3
                    text-sm font-semibold text-white
                    hover:bg-white/20
                    disabled:cursor-not-allowed
                    disabled:opacity-30
                  "
                >
                  Next →
                </button>
              </div>

              {/* #endregion */}
            </section>
          </div>,
          document.body
        )}

      {/* #endregion */}
    </>
  );
}

// #endregion
