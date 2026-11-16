
"use client";

import Image from "next/image";
import Link from "next/link";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { projects } from "@/data/projects";

// ==========================================
// #region TYPES
// ==========================================

type SkillTool = {
  name: string;
  logo: string;
  projectTool?: string;
};

type SkillCategory = {
  title: string;
  symbol: string;
  accent: "cyan" | "violet";
  tools: SkillTool[];
};

// #endregion

// ==========================================
// #region SKILLS DATA
// ==========================================

// To add a new skill later, add it here.
// Logo files are stored in:
// public/images/skills/

const skillCategories: SkillCategory[] = [
  {
    title: "Data Visualization",
    symbol: "◈",
    accent: "cyan",
    tools: [
      {
        name: "Power BI",
        logo: "/images/skills/powerbi.svg",
      },
      {
        name: "Looker Studio",
        logo: "/images/skills/looker-icon.svg",
      },
    ],
  },

 
{
  title: "Programming & Databases",
  symbol: "⌘",
  accent: "violet",
  tools: [
    {
      name: "Python",
      logo: "/images/skills/python.svg",
    },
    {
      name: "R",
      logo: "/images/skills/r-lang.svg",
    },
    {
      name: "PostgreSQL",
      logo: "/images/skills/postgresql.svg",
    },
    {
      name: "Visual Studio",
      logo: "/images/skills/visual-studio.svg",
    },

    // #region WEB DEVELOPMENT TOOLS

    {
      name: "HTML",
      logo: "/images/skills/html.svg",
    },

    // #endregion
  ],
},

  {
    title: "Statistical Analysis",
    symbol: "∑",
    accent: "cyan",
    tools: [
      {
        name: "SPSS",
        logo: "/images/skills/spss.svg",
      },
      {
        name: "SAS",
        logo: "/images/skills/sas.svg",
      },
    ],
  },

  {
    title: "Data & Automation",
    symbol: "⚙",
    accent: "violet",
    tools: [
      {
        name: "Microsoft Excel",
        logo: "/images/skills/microsoft-excel.svg",
        projectTool: "Excel",
      },
      {
        name: "Google Sheets",
        logo: "/images/skills/google-sheets.svg",
      },
      {
        name: "Google Apps Script",
        logo: "/images/skills/appscript.svg",
      },
    ],
  },
];

// #endregion

// ==========================================
// #region MATCH SKILLS TO PROJECTS
// ==========================================

function getProjectsForTool(tool: SkillTool) {
  const possibleNames = [
    tool.name,
    tool.projectTool,
  ]
    .filter((name): name is string => Boolean(name))
    .map((name) => name.trim().toLowerCase());

  return projects.filter((project) =>
    project.tools.some((projectTool) =>
      possibleNames.includes(
        projectTool.trim().toLowerCase()
      )
    )
  );
}

// #endregion

// ==========================================
// #region SKILLS GALAXY BACKGROUND
// ==========================================


function SkillsBackground() {
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
            // Browser autoplay may be blocked.
          });
        }
      } else {
        video.pause();
      }
    };

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
  className="
    pointer-events-none absolute inset-0
    z-0 overflow-hidden bg-[#050A1D]
  "
  style={{
    WebkitMaskImage:
      "linear-gradient(to bottom, transparent 0px, black 160px)",
    maskImage:
      "linear-gradient(to bottom, transparent 0px, black 160px)",
  }}
>
      {/* #region BACKGROUND VIDEO */}

      <video
        ref={videoRef}    
        loop
        muted
        playsInline
        preload="metadata"
        disablePictureInPicture
        className="
          absolute inset-0 h-full w-full
          object-cover motion-reduce:hidden
        "
      >

{/* #region RESPONSIVE GALAXY VIDEO */}

{/* Mobile - optimized 0.41 MB video */}
<source
  src="/videos/galaxypage4-mobile.mp4"
  type="video/mp4"
  media="(max-width: 767px)"
/>

{/* Tablet and Desktop - original video */}
<source
  src="/videos/galaxypage4.mp4"
  type="video/mp4"
/>

{/* #endregion */}

      </video>

      {/* #endregion */}

      {/* #region DARK OVERLAY */}

      <div className="absolute inset-0 bg-[#030817]/35" />

      {/* #endregion */}

      {/* #region GRADIENT OVERLAY */}

      <div
        className="
          absolute inset-0
          bg-gradient-to-b
          from-[#030817]/30
          via-transparent
          to-[#030817]/80
        "
      />

      {/* #endregion */}
    </div>
  );
}

// #endregion

// ==========================================
// #region SKILL TOOL BUTTON
// ==========================================

function SkillToolItem({
  tool,
  onClick,
}: {
  tool: SkillTool;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-haspopup="dialog"
      aria-label={`View projects using ${tool.name}`}
      className="
        group/tool flex w-full min-w-0
        items-center gap-3 rounded-xl
        border border-cyan-300/20
        bg-[#0B1730]/40 p-3 text-left
        transition-all duration-300
        hover:border-cyan-300/60
        hover:bg-cyan-400/10
        hover:shadow-[0_0_18px_rgba(34,211,238,0.12)]
        focus-visible:outline-2
        focus-visible:outline-cyan-300
      "
    >
      {/* #region TOOL LOGO */}

      <span
        className="
          flex h-11 w-11 shrink-0
          items-center justify-center
          overflow-hidden rounded-lg
          bg-white p-1
        "
      >
        <Image
          src={tool.logo}
          alt={`${tool.name} logo`}
          width={36}
          height={36}
          className="h-9 w-9 object-contain"
        />
      </span>

      {/* #endregion */}

      {/* #region TOOL NAME */}

      <span
        className="
          min-w-0 flex-1
          break-words text-sm
          font-semibold text-white
        "
      >
        {tool.name}
      </span>

      {/* #endregion */}

      {/* #region CLICK INDICATOR */}

      <span
        aria-hidden="true"
        className="
          shrink-0 text-sm text-cyan-300
          transition-transform duration-300
          group-hover/tool:translate-x-0.5
        "
      >
        ↗
      </span>

      {/* #endregion */}
    </button>
  );
}

// #endregion

// ==========================================
// #region SKILL CATEGORY CARD
// ==========================================

function SkillCard({
  category,
  onToolClick,
}: {
  category: SkillCategory;
  onToolClick: (tool: SkillTool) => void;
}) {
  const isViolet = category.accent === "violet";

  return (
    <article
      className={`
        relative flex h-full flex-col
        rounded-[28px] border
        bg-[#080F25]/45 p-6
        backdrop-blur-md
        transition-all duration-300
        sm:p-7

        ${
          isViolet
            ? `
              border-violet-300/35
              hover:border-violet-300/65
              hover:shadow-[0_0_32px_rgba(167,139,250,0.10)]
            `
            : `
              border-cyan-300/35
              hover:border-cyan-300/65
              hover:shadow-[0_0_32px_rgba(34,211,238,0.10)]
            `
        }
      `}
    >
      {/* #region CATEGORY ICON */}

      <div
        className={`
          mb-6 flex h-14 w-14
          items-center justify-center
          rounded-2xl border text-3xl

          ${
            isViolet
              ? `
                border-violet-300/35
                bg-violet-400/10
                text-violet-300
              `
              : `
                border-cyan-300/35
                bg-cyan-400/10
                text-cyan-300
              `
          }
        `}
      >
        {category.symbol}
      </div>

      {/* #endregion */}

      {/* #region CATEGORY TITLE */}

      <h2
        className="
          mb-6 text-xl font-bold
          tracking-tight text-white
          sm:text-2xl
        "
      >
        {category.title}
      </h2>

      {/* #endregion */}

      {/* #region TOOL BUTTONS */}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {category.tools.map((tool) => (
          <SkillToolItem
            key={tool.name}
            tool={tool}
            onClick={() => onToolClick(tool)}
          />
        ))}
      </div>

      {/* #endregion */}
    </article>
  );
}

// #endregion

// ==========================================
// #region CENTERED PROJECT POPUP
// ==========================================

function SkillProjectPopup({
  tool,
  onClose,
}: {
  tool: SkillTool;
  onClose: () => void;
}) {
  // #region REFS

  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // #endregion

  // #region PROJECTS

  const matchingProjects = getProjectsForTool(tool);

  // #endregion

  // #region ESCAPE KEY AND FOCUS

  useEffect(() => {
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }

      // Keep keyboard focus inside the pop-up.
      if (event.key === "Tab") {
        const dialog = document.getElementById(
          "skill-project-dialog"
        );

        if (!dialog) return;

        const focusable = Array.from(
          dialog.querySelectorAll<HTMLElement>(
            "button:not([disabled]), a[href], input:not([disabled])"
          )
        );

        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (
          event.shiftKey &&
          document.activeElement === first
        ) {
          event.preventDefault();
          last.focus();
        } else if (
          !event.shiftKey &&
          document.activeElement === last
        ) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [onClose]);

  // #endregion

  // #region POPUP CONTENT

  return createPortal(
    <div
      data-scroll-nav-ignore
      className="
        fixed inset-0 z-[10000]
        flex items-center justify-center
        bg-[#020617]/80 px-4 py-6
        backdrop-blur-sm
      "
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      {/* #region POPUP WINDOW */}

      <section
        id="skill-project-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="skill-project-heading"
        className="
          flex max-h-[85dvh] w-full max-w-xl
          flex-col overflow-hidden
          rounded-3xl border border-cyan-300/35
          bg-[#0C1630]/95 text-white
          shadow-[0_0_60px_rgba(34,211,238,0.20)]
          backdrop-blur-xl
        "
      >
        {/* #region POPUP HEADER */}

        <div
          className="
            flex shrink-0 items-center
            gap-4 border-b border-white/10
            bg-gradient-to-r
            from-[#162D53] to-[#302055]
            p-5
          "
        >
          {/* TOOL LOGO */}

          <div
            className="
              flex h-12 w-12 shrink-0
              items-center justify-center
              rounded-xl bg-white p-1.5
            "
          >
            <Image
              src={tool.logo}
              alt={`${tool.name} logo`}
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
            />
          </div>

          {/* HEADING */}

          <div className="min-w-0 flex-1">
            <h2
              id="skill-project-heading"
              className="
                break-words text-lg
                font-bold text-white
                sm:text-xl
              "
            >
              Projects Using {tool.name}
            </h2>

            <p className="mt-1 text-xs text-cyan-200">
              {matchingProjects.length} published{" "}
              {matchingProjects.length === 1
                ? "project"
                : "projects"}
            </p>
          </div>

          {/* CLOSE BUTTON */}

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close project popup"
            className="
              flex h-9 w-9 shrink-0
              items-center justify-center
              rounded-lg bg-white/10
              text-xl text-slate-200
              transition-colors
              hover:bg-white/20
              hover:text-white
            "
          >
            ✕
          </button>
        </div>

        {/* #endregion */}

        {/* #region PROJECT DETAILS */}

        <div
          data-scroll-nav-ignore
          className="
            min-h-0 flex-1 space-y-4
            overflow-y-auto overscroll-contain
            p-5 sm:p-6
          "
        >
          {matchingProjects.length > 0 ? (
            matchingProjects.map((project) => (
              <article
                key={project.slug}
                className="
                  rounded-2xl border
                  border-cyan-300/20
                  bg-[#192944]/80 p-5
                "
              >
                {/* CATEGORY */}

                <p
                  className="
                    mb-3 text-xs font-semibold
                    uppercase tracking-wider
                    text-cyan-300
                  "
                >
                  {project.category}
                </p>

                {/* PROJECT TITLE */}

                <h3
                  className="
                    mb-3 text-base font-bold
                    leading-7 text-white
                    sm:text-lg
                  "
                >
                  {project.title}
                </h3>

                {/* TOOLS USED */}

                <div className="mb-5 flex flex-wrap gap-2">
                  {project.tools.map((projectTool) => (
                    <span
                      key={projectTool}
                      className="
                        rounded-lg border
                        border-white/15
                        bg-white/5 px-3 py-1.5
                        text-xs text-slate-300
                      "
                    >
                      {projectTool}
                    </span>
                  ))}
                </div>

                {/* VIEW PROJECT BUTTON */}

                <Link
                  href={`/projects/${project.slug}`}
                  onClick={onClose}
                  className="
                    inline-flex items-center
                    justify-center gap-2
                    rounded-xl bg-cyan-400
                    px-5 py-2.5
                    text-sm font-semibold
                    text-[#07152A]
                    transition-colors
                    hover:bg-cyan-300
                  "
                >
                  View Project ↗
                </Link>
              </article>
            ))
          ) : (
            <div
              className="
                rounded-2xl border
                border-white/10
                bg-white/5 p-6
                text-center
              "
            >
              <p
                className="
                  mb-3 text-base
                  font-semibold text-white
                "
              >
                No Published Projects Yet
              </p>

              <p className="text-sm leading-7 text-slate-300">
                There are currently no published
                projects associated with {tool.name}.
                More projects will be added soon.
              </p>
            </div>
          )}
        </div>

        {/* #endregion */}

        {/* #region POPUP FOOTER */}

        <div
          className="
            shrink-0 border-t
            border-white/10 px-5 py-3
            text-center
          "
        >
          <p className="text-xs text-slate-400">
            Press Esc or click outside to close
          </p>
        </div>

        {/* #endregion */}
      </section>

      {/* #endregion */}
    </div>,
    document.body
  );
}

// #endregion

// ==========================================
// #region MAIN SKILLS PAGE
// ==========================================

export default function SkillsSection() {
  // #region POPUP STATE

  const [selectedTool, setSelectedTool] =
    useState<SkillTool | null>(null);

  const lastClickedToolRef =
    useRef<HTMLButtonElement | null>(null);

  // #endregion

  // #region OPEN POPUP

  const openToolPopup = (tool: SkillTool) => {
    const activeElement = document.activeElement;

    if (activeElement instanceof HTMLButtonElement) {
      lastClickedToolRef.current = activeElement;
    }

    setSelectedTool(tool);
  };

  // #endregion

  // #region CLOSE POPUP

  const closeToolPopup = () => {
    setSelectedTool(null);

    // Return focus to the tool button.
    window.setTimeout(() => {
      lastClickedToolRef.current?.focus();
    }, 0);
  };

  // #endregion

  return (
<section
  id="skills"
  className="
    relative z-30 -mt-40 isolate
    min-h-screen overflow-hidden
    bg-transparent text-white
  "
>
      {/* #region GALAXY BACKGROUND */}

      <SkillsBackground />

      {/* #endregion */}

      {/* #region MAIN CONTENT */}

<div
  className="
    relative z-10 mx-auto
    max-w-6xl px-5 pb-24 pt-[19rem]
    sm:px-6 md:px-10
  "
>
        {/* #region INTRODUCTION */}

        <section className="mb-12">
          <p
            className="
              mb-5 text-sm font-semibold
              uppercase tracking-[0.25em]
              text-cyan-300
            "
          >
            ✦ My Toolkit
          </p>

          <h2
            className="
              mb-6 text-5xl font-bold
              tracking-tight text-white
              drop-shadow-[0_4px_15px_rgba(0,0,0,0.8)]
              md:text-7xl
            "
          >
            My{" "}
            <span className="text-cyan-300">
              Skills.
            </span>
          </h2>

          <p
            className="
              max-w-2xl text-lg
              leading-relaxed text-slate-200
              drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]
            "
          >
            Explore the technologies and analytical
            tools I use to transform data into
            meaningful insights and solutions.
          </p>
        </section>

        {/* #endregion */}

        {/* #region SKILLS SECTION */}

        <section aria-label="Technical skills">
          {/* SECTION HEADING */}

          <div className="mb-8">
            <p
              className="
                mb-3 text-xs font-semibold
                uppercase tracking-[0.2em]
                text-cyan-300
              "
            >
              ✦ Explore My Tools
            </p>

            <h2
              className="
                mb-3 text-2xl font-bold
                text-white sm:text-3xl
              "
            >
              Technical{" "}
              <span className="text-cyan-300">
                Toolkit
              </span>
            </h2>

            <p className="text-sm leading-7 text-slate-300">
              Click any tool to discover the published
              projects where I have used it.
            </p>
          </div>

          {/* #region CATEGORY GRID */}

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {skillCategories.map((category) => (
              <SkillCard
                key={category.title}
                category={category}
                onToolClick={openToolPopup}
              />
            ))}
          </div>

          {/* #endregion */}
        </section>

        {/* #endregion */}
      </div>

      {/* #endregion */}

      {/* #region CENTERED PROJECT MODAL */}

      {selectedTool && (
        <SkillProjectPopup
          tool={selectedTool}
          onClose={closeToolPopup}
        />
      )}

      {/* #endregion */}
    </section>
  );
}

// #endregion
