"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

// #region CONTACT INFORMATION

// Enter your existing public contact details here.
// Leave any optional field empty to hide that card.

const contactInfo = {
  phone: "017-6065490",
  email: "aridaniel0405@gmail.com",
  linkedin: "http://www.linkedin.com/in/daniel-hasmuri-a0144431b",
  github: "https://github.com/NeroReiki",
 // Your WhatsApp QR link
  whatsapp: "https://wa.me/qr/PCSLEM5VGWX6L1",
};

// #endregion

// #region CONTACT TYPES

type ContactCardProps = {
  title: string;
  value: string;
  symbol: string;
  href: string;
  accent: "cyan" | "violet";
  whatsappUrl?: string;
};

// #endregion

// #region CONTACT BACKGROUND


function ContactBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

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

    // Detect when the Contact background is visible.
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
      {/* #region GALAXY VIDEO */}

      <video
        ref={videoRef}
        loop
        muted
        playsInline
        preload="metadata"
        disablePictureInPicture
        className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
      >
        <source
          src="/videos/galaxypage5.mp4"
          type="video/mp4"
        />
      </video>

      {/* #endregion */}

      {/* #region DARK OVERLAY */}

      <div className="absolute inset-0 bg-[#030817]/30" />

      {/* #endregion */}

      {/* #region GRADIENT OVERLAY */}

      <div className="absolute inset-0 bg-gradient-to-b from-[#030817]/20 via-transparent to-[#030817]/80" />

      {/* #endregion */}
    </div>
  );
}

// #endregion

// #region CONTACT CARD

function ContactCard({
  title,
  value,
  symbol,
  href,
  accent,
  whatsappUrl,
}: ContactCardProps) {
  const isViolet = accent === "violet";

  const isPhoneOrEmail =
    href.startsWith("tel:") ||
    href.startsWith("mailto:");

  return (
    <article
      className={`
        group flex h-full flex-col items-center
        justify-center rounded-3xl border
        bg-[#0B1730]/80 p-7 text-center
        transition-all duration-300
        hover:-translate-y-1
        motion-reduce:transform-none
        ${
          isViolet
            ? "border-violet-300/30 hover:border-violet-300/70 hover:shadow-[0_0_30px_rgba(167,139,250,0.18)]"
            : "border-cyan-300/30 hover:border-cyan-300/70 hover:shadow-[0_0_30px_rgba(34,211,238,0.18)]"
        }
      `}
    >
      {/* #region CONTACT ICON */}

      <span
        aria-hidden="true"
        className={`
          mb-5 flex h-16 w-16 items-center
          justify-center rounded-2xl border
          text-3xl
          ${
            isViolet
              ? "border-violet-300/40 bg-violet-400/10 text-violet-300"
              : "border-cyan-300/40 bg-cyan-400/10 text-cyan-300"
          }
        `}
      >
        {symbol}
      </span>

      {/* #endregion */}

      {/* #region CONTACT TITLE */}

      <h2 className="mb-4 text-xl font-bold text-white">
        {title}
      </h2>

      {/* #endregion */}

      {/* #region CONTACT VALUE */}

      <a
        href={href}
        target={isPhoneOrEmail ? undefined : "_blank"}
        rel={
          isPhoneOrEmail
            ? undefined
            : "noopener noreferrer"
        }
        className={`
          max-w-full break-words text-sm
          font-semibold leading-6
          underline-offset-4
          transition-colors
          hover:underline
          focus-visible:outline-2
          focus-visible:outline-offset-4
          focus-visible:outline-cyan-300
          ${
            isViolet
              ? "text-violet-300 hover:text-white"
              : "text-cyan-300 hover:text-white"
          }
        `}
      >
        {value}
      </a>

      {/* #endregion */}

      {/* #region OPTIONAL WHATSAPP LINK */}

      {whatsappUrl && (
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="
            mt-5 inline-flex items-center
            justify-center gap-2
            rounded-xl border border-green-400/50
            bg-green-500/10 px-5 py-2.5
            text-sm font-semibold text-green-300
            transition-all duration-300
            hover:border-green-300
            hover:bg-green-500/20
            hover:shadow-[0_0_20px_rgba(74,222,128,0.15)]
            focus-visible:outline-2
            focus-visible:outline-offset-4
            focus-visible:outline-green-300
          "
        >
          {/* WHATSAPP ICON */}

          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            className="h-5 w-5"
          >
            <path
              d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.5L3 20.5l1.3-4.7a8.5 8.5 0 1 1 16.2-4.1Z"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinejoin="round"
            />
            <path
              d="M8.5 8.1c.3-.4.6-.5.9-.3l1.2 1.3c.2.3.2.5 0 .8l-.6.7c.7 1.3 1.7 2.3 3 3l.7-.6c.3-.2.5-.2.8 0l1.3 1.2c.2.3.1.6-.3.9-.6.5-1.2.7-1.9.5-2.7-.8-5-3.1-5.8-5.8-.2-.7 0-1.3.7-1.7Z"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          </svg>

          Chat on WhatsApp
          <span aria-hidden="true">↗</span>
        </a>
      )}

      {/* #endregion */}
    </article>
  );
}

// #endregion

// #region MAIN CONTACT PAGE

export default function ContactSection() {

  // #region CONTACT METHODS

  const contactMethods: ContactCardProps[] = [];

  // PHONE NUMBER

  if (contactInfo.phone.trim()) {
    contactMethods.push({
      title: "Phone Number",
      value: contactInfo.phone,
      symbol: "☎",
      href: `tel:${contactInfo.phone.replace(
        /[^\d+]/g,
        ""
      )}`,
      accent: "violet",
      whatsappUrl: contactInfo.whatsapp,
    });
  }

  // EMAIL

  if (contactInfo.email.trim()) {
    contactMethods.push({
      title: "Email",
      value: contactInfo.email,
      symbol: "✉",
      href: `mailto:${contactInfo.email}`,
      accent: "cyan",
    });
  }

  // LINKEDIN

  if (contactInfo.linkedin.trim()) {
    contactMethods.push({
      title: "LinkedIn",
      value: contactInfo.linkedin
        .replace(/^https?:\/\/(www\.)?/, "")
        .replace(/\/$/, ""),
      symbol: "in",
      href: contactInfo.linkedin,
      accent: "violet",
    });
  }

  // GITHUB

  if (contactInfo.github.trim()) {
    contactMethods.push({
      title: "GitHub",
      value: contactInfo.github
        .replace(/^https?:\/\/(www\.)?/, "")
        .replace(/\/$/, ""),
      symbol: "⌘",
      href: contactInfo.github,
      accent: "cyan",
    });
  }

  // #endregion

  return (
<section
  id="contact"
  className="relative z-40 -mt-40 isolate min-h-screen overflow-hidden bg-transparent text-white"
>

      {/* #region ANIMATED BACKGROUND */}

      <ContactBackground /> 

      {/* #endregion */}

      {/* #region MAIN CONTENT */}

      <div className="relative z-10 mx-auto max-w-6xl px-5 pb-24 pt-[19rem] sm:px-6 md:px-10">

        {/* #region INTRODUCTION */}

        <section className="mb-14">

          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
            ✦ Let&apos;s Connect
          </p>

          <h2 className="mb-6 text-5xl font-bold tracking-tight drop-shadow-[0_4px_15px_rgba(0,0,0,0.8)] md:text-7xl">
            Get in{" "}
            <span className="text-cyan-300">
              Touch.
            </span>
          </h2>

          <p className="max-w-2xl text-lg leading-relaxed text-slate-200 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
            Have a question, collaboration opportunity,
            or just want to say hello?
            I&apos;d love to hear from you.
          </p>

        </section>

        {/* #endregion */}

        {/* #region CONTACT CARDS */}

        {contactMethods.length > 0 ? (
          <section
            aria-label="Contact methods"
            className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2"
          >
            {contactMethods.map((method) => (
              <ContactCard
                key={method.title}
                {...method}
              />
            ))}
          </section>
        ) : (
          <section className="mb-10 rounded-3xl border border-cyan-300/30 bg-[#0B1730]/30 p-10 text-center backdrop-blur-md">
            <h2 className="mb-3 text-xl font-bold text-white">
              Let&apos;s Stay Connected
            </h2>

            <p className="mx-auto max-w-lg text-sm leading-7 text-slate-300">
              My contact details will appear here soon.
            </p>
          </section>
        )}

        {/* #endregion */}

        {/* #region CLOSING CARD */}

        <section className="rounded-3xl border border-violet-300/30 bg-[#0B1730]/80 p-8 text-center shadow-[0_0_30px_rgba(167,139,250,0.08)] sm:p-12">

          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-violet-300">
            ✦ Beyond the Stars
          </p>

          <h2 className="mb-5 text-2xl font-bold text-white sm:text-3xl">
            Let&apos;s Create Something Meaningful.
          </h2>

          <p className="mx-auto mb-8 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
            I&apos;m always open to connecting, learning,
            and exploring exciting opportunities.
          </p>

          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 rounded-xl border border-cyan-300/60 bg-cyan-400/10 px-6 py-3 text-sm font-semibold text-cyan-200 transition-colors hover:bg-cyan-400/20"
          >
            Explore My Projects ↗
          </Link>

        </section>

        {/* #endregion */}

      </div>

      {/* #endregion */}

     </section>
  );
}

// #endregion
