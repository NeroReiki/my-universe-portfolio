
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";

// #region PROJECT CARD PROPS

type ProjectCardProps = {
  project: Project;
};

// #endregion

// #region PROJECT CARD COMPONENT

export default function ProjectCard({
  project,
}: ProjectCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-cyan-300/20 bg-[#0B1730]/30 shadow-[0_0_25px_rgba(34,211,238,0.08)] backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01] hover:border-cyan-300/70 hover:shadow-[0_0_35px_rgba(34,211,238,0.2)] motion-reduce:transform-none">

      {/* #region PROJECT IMAGE / PREVIEW */}
      <div className="relative h-52 overflow-hidden border-b border-white/10 bg-[#101B38]">

        {project.image ? (
          /* #region PROJECT SCREENSHOT */
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none"
          />
          /* #endregion */
        ) : (
          /* #region DEFAULT ANALYTICS PREVIEW */
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-cyan-950/70 via-[#111A3C] to-violet-950/70">

            {/* BACKGROUND GLOW */}
            <div
              aria-hidden="true"
              className="absolute h-36 w-36 rounded-full bg-cyan-400/20 blur-3xl"
            />

            {/* DECORATIVE CHART */}
            <div className="relative w-[78%] rounded-xl border border-cyan-300/25 bg-[#0A1730]/60 p-4 shadow-lg backdrop-blur-md">

              <div className="mb-4 flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-cyan-300">
                  Project Preview
                </span>

                <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
              </div>

              <svg
                viewBox="0 0 300 125"
                fill="none"
                className="w-full"
                aria-hidden="true"
              >
                {/* CHART GRID */}
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

                {/* CHART BARS */}
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

                {/* TREND LINE */}
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
          /* #endregion */
        )}

        {/* #region CATEGORY LABEL */}
        <span className="absolute left-4 top-4 rounded-full border border-cyan-300/30 bg-[#07152C]/85 px-3 py-1.5 text-xs font-semibold text-cyan-200 backdrop-blur-md">
          {project.category}
        </span>
        {/* #endregion */}

      </div>
      {/* #endregion */}

      {/* #region PROJECT INFORMATION */}
      <div className="flex flex-1 flex-col p-6">

        {/* PROJECT TITLE */}
        <h3 className="mb-3 text-xl font-bold text-white transition-colors duration-300 group-hover:text-cyan-300">
          {project.title}
        </h3>

        {/* PROJECT DESCRIPTION */}
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

        {/* #region PROJECT ACTIONS */}
        <div className="mt-auto flex flex-wrap items-center gap-3 border-t border-white/10 pt-5">

          {/* VIEW PROJECT DETAILS */}
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-slate-950 transition-all duration-300 hover:bg-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
          >
            View Project
            <span aria-hidden="true">↗</span>
          </Link>

          {/* OPTIONAL GITHUB BUTTON */}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-white/25 bg-white/10 px-4 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:border-violet-300 hover:bg-violet-400/15"
            >
              GitHub ↗
            </a>
          )}

          {/* OPTIONAL LIVE DEMO BUTTON */}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-white/25 bg-white/10 px-4 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:border-cyan-300 hover:bg-cyan-400/15"
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
