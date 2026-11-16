"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  projects,
  type Project,
  type ProjectCategory,
} from "@/data/projects";

// #region TYPES AND FILTER CATEGORIES

type FilterCategory = "All Projects" | ProjectCategory;

const categories: FilterCategory[] = [
  "All Projects",
  "Final Year Project",
  "Data Analytics",
  "Data Visualization",
  "Automation",
  "Web Development",
];


// #endregion

// #region PROJECTS BACKGROUND


function ProjectsBackground() {
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
            // Autoplay may be blocked.
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
        {/* #region RESPONSIVE GALAXY VIDEO */}

{/* Mobile - optimized 1.63 MB video */}
<source
  src="/videos/galaxypage3-mobile.mp4"
  type="video/mp4"
  media="(max-width: 767px)"
/>

{/* Tablet and Desktop - original HD video */}
<source
  src="/videos/galaxypage3.mp4"
  type="video/mp4"
/>

{/* #endregion */}

      </video>

      {/* #endregion */}

      {/* #region VIDEO OVERLAYS */}

      <div className="absolute inset-0 bg-[#030817]/45" />

      <div className="absolute inset-0 bg-gradient-to-b from-[#030817]/20 via-transparent to-[#030817]/85" />

      {/* #endregion */}
    </div>
  );
}

// #endregion

// #region PROJECT CARD

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-cyan-300/20 bg-[#0B1730]/30 shadow-[0_0_25px_rgba(34,211,238,0.08)] backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-cyan-300/70 hover:shadow-[0_0_35px_rgba(34,211,238,0.2)] motion-reduce:transform-none">

      {/* #region PROJECT PREVIEW */}

      <Link
        href={`/projects/${project.slug}`}
        aria-label={`View details for ${project.title}`}
        className="relative block h-52 overflow-hidden border-b border-white/10 bg-[#101B38]/60 focus-visible:outline-2 focus-visible:outline-cyan-300"
      >

        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-cyan-950/60 via-[#111A3C]/60 to-violet-950/60">

            <div
              aria-hidden="true"
              className="absolute h-36 w-36 rounded-full bg-cyan-400/20 blur-3xl"
            />

            <div className="relative w-[78%] rounded-xl border border-cyan-300/25 bg-[#0A1730]/50 p-4 shadow-lg backdrop-blur-sm">

              <div className="mb-4 flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-cyan-300">
                  Project Preview
                </span>

                <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
              </div>

              {/* DECORATIVE CHART */}

              <svg
                viewBox="0 0 300 125"
                fill="none"
                className="w-full"
                aria-hidden="true"
              >
                {[30, 65, 100].map((y) => (
                  <line
                    key={y}
                    x1="0"
                    y1={y}
                    x2="300"
                    y2={y}
                    stroke="#94A3B8"
                    strokeOpacity="0.18"
                  />
                ))}

                {[35, 62, 45, 82, 68, 96, 77].map(
                  (height, index) => (
                    <rect
                      key={index}
                      x={16 + index * 40}
                      y={115 - height}
                      width="21"
                      height={height}
                      rx="3"
                      fill={
                        index % 2 === 0
                          ? "#22D3EE"
                          : "#A78BFA"
                      }
                      opacity="0.65"
                    />
                  )
                )}

                <polyline
                  points="26,90 66,76 106,85 146,44 186,56 226,20 266,35"
                  stroke="#67E8F9"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        )}

        {/* PROJECT CATEGORY */}

        <span className="absolute left-4 top-4 rounded-full border border-cyan-300/30 bg-[#07152C]/85 px-3 py-1.5 text-xs font-semibold text-cyan-200 backdrop-blur-md">
          {project.category}
        </span>

      </Link>

      {/* #endregion */}

      {/* #region PROJECT INFORMATION */}

      <div className="flex flex-1 flex-col p-6">

        <h3 className="mb-3 text-xl font-bold text-white">
          <Link
            href={`/projects/${project.slug}`}
            className="transition-colors duration-300 hover:text-cyan-300 focus-visible:rounded focus-visible:outline-2 focus-visible:outline-cyan-300"
          >
            {project.title}
          </Link>
        </h3>

        <p className="mb-6 text-sm leading-7 text-slate-300">
          {project.description}
        </p>

        {/* #region TECHNOLOGY TAGS */}

        <div className="mb-7 flex flex-wrap gap-2">
          {project.tools.map((tool) => (
            <span
              key={tool}
              className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200"
            >
              {tool}
            </span>
          ))}
        </div>

        {/* #endregion */}

        {/* #region PROJECT BUTTONS */}

        <div className="mt-auto flex flex-wrap items-center gap-3 border-t border-white/10 pt-5">

          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-slate-950 transition-all duration-300 hover:bg-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
          >
            View Project
            <span aria-hidden="true">↗</span>
          </Link>

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-white/25 bg-white/10 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:border-violet-300 hover:bg-violet-400/15"
            >
              GitHub ↗
            </a>
          )}

          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-white/25 bg-white/10 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:border-cyan-300 hover:bg-cyan-400/15"
            >
              Live Demo ↗
            </a>
          )}

        </div>

        {/* #endregion */}

      </div>

      {/* #endregion */}

    </article>
  );
}

// #endregion

// #region PROJECT FILTERS AND GALLERY

function ProjectFilters() {
  const [activeCategory, setActiveCategory] =
    useState<FilterCategory>("All Projects");

  const [searchQuery, setSearchQuery] = useState("");

  // #region FILTER LOGIC

  const filteredProjects = useMemo(() => {
    const search = searchQuery.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesCategory =
        activeCategory === "All Projects" ||
        project.category === activeCategory;

      const searchableText = [
        project.title,
        project.description,
        project.category,
        ...project.tools,
      ]
        .join(" ")
        .toLowerCase();

      return matchesCategory &&
        searchableText.includes(search);
    });
  }, [activeCategory, searchQuery]);

  const resetFilters = () => {
    setActiveCategory("All Projects");
    setSearchQuery("");
  };

  // #endregion

  return (
    <section
      id="project-gallery"
      aria-labelledby="project-gallery-title"
      className="w-full"
    >

      {/* #region GALLERY HEADING */}

      <div className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
            ✦ Explore My Work
          </p>

          <h2
            id="project-gallery-title"
            className="text-3xl font-bold text-white md:text-4xl"
          >
            Project{" "}
            <span className="text-cyan-300">
              Gallery
            </span>
          </h2>

          <p className="mt-3 text-sm text-slate-300">
            Discover the ideas, tools, and stories behind my creations.
          </p>
        </div>

        {/* SEARCH BAR */}

        <div className="relative w-full md:max-w-xs">

          <label
            htmlFor="project-search"
            className="sr-only"
          >
            Search projects
          </label>

          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xl text-cyan-300"
          >
            ⌕
          </span>

          <input
            id="project-search"
            type="search"
            value={searchQuery}
            onChange={(event) =>
              setSearchQuery(event.target.value)
            }
            placeholder="Search projects..."
            className="w-full rounded-xl border border-cyan-300/30 bg-[#0B1730]/30 py-3 pl-11 pr-4 text-sm text-white outline-none backdrop-blur-md transition-colors placeholder:text-slate-400 focus:border-cyan-300 focus:ring-1 focus:ring-cyan-300"
          />

        </div>

      </div>

      {/* #endregion */}

      {/* #region CATEGORY FILTERS */}

      <div
        role="group"
        aria-label="Filter projects by category"
        className="mb-7 flex flex-wrap gap-3"
      >

        {categories.map((category) => {
          const isActive = activeCategory === category;

          return (
            <button
              key={category}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 ${
                isActive
                  ? "border-cyan-300 bg-cyan-400 text-[#061321] shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                  : "border-white/25 bg-[#0B1730]/30 text-slate-200 backdrop-blur-md hover:border-cyan-300/70 hover:bg-cyan-400/10 hover:text-cyan-200"
              }`}
            >
              {category}
            </button>
          );
        })}

      </div>

      {/* #endregion */}

      {/* #region PROJECT COUNTER */}

      <p
        aria-live="polite"
        className="mb-6 text-sm text-slate-300"
      >
        Showing{" "}
        <span className="font-semibold text-cyan-300">
          {filteredProjects.length}
        </span>{" "}
        of {projects.length} projects
      </p>

      {/* #endregion */}

      {/* #region PROJECT GRID */}

      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 items-stretch gap-7 md:grid-cols-2 xl:grid-cols-3">

          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
            />
          ))}

        </div>
      ) : (
        <div className="rounded-3xl border border-cyan-300/25 bg-[#0B1730]/30 px-6 py-16 text-center backdrop-blur-md">

          <div
            className="mb-5 text-4xl text-cyan-300"
            aria-hidden="true"
          >
            ✧
          </div>

          <h3 className="mb-3 text-2xl font-bold text-white">
            No Projects Found
          </h3>

          <p className="mb-7 text-sm text-slate-300">
            Try another keyword or choose a different category.
          </p>

          <button
            type="button"
            onClick={resetFilters}
            className="rounded-xl border border-cyan-300/60 bg-cyan-400/10 px-6 py-3 text-sm font-semibold text-cyan-200 transition-colors hover:bg-cyan-400/20"
          >
            Clear Filters
          </button>

        </div>
      )}

      {/* #endregion */}

    </section>
  );
}

// #endregion

// #region MAIN PROJECTS PAGE

export default function ProjectsSection() {
  return (
<section
  id="projects"
  className="relative z-20 -mt-40 isolate min-h-screen overflow-hidden bg-transparent text-white"
>

      {/* #region BACKGROUND */}

      <ProjectsBackground />

      {/* #endregion */}

      {/* #region PAGE CONTENT */}

      <div className="relative z-10 mx-auto max-w-7xl px-5 pb-24 pt-[19rem] sm:px-6 md:px-10">

        {/* #region HERO */}

        <section className="mb-16">

          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
            ✦ My Creations
          </p>

          <h2 className="mb-6 text-5xl font-bold tracking-tight drop-shadow-[0_4px_15px_rgba(0,0,0,0.8)] md:text-7xl">
            My{" "}
            <span className="text-cyan-300">
              Projects.
            </span>
          </h2>

          <p className="max-w-2xl text-lg leading-relaxed text-slate-200 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
            A collection of my data analytics,
            visualization, automation, and development
            projects — where ideas become meaningful creations.
          </p>

        </section>

        {/* #endregion */}

        {/* #region PROJECT GALLERY */}

        <ProjectFilters />

        {/* #endregion */}

      </div>

      {/* #endregion */}

    </section>
  );
}