
"use client";

import { useMemo, useState } from "react";
import ProjectCard from "@/components/projects/ProjectCard";
import {
  projects,
  type ProjectCategory,
} from "@/data/projects";

// #region PROJECT FILTER TYPES

type FilterCategory = "All Projects" | ProjectCategory;

// #endregion

// #region PROJECT CATEGORIES

const categories: FilterCategory[] = [
  "All Projects",
  "Data Analytics",
  "Data Visualization",
  "Automation",
  "Web Development",
];

// #endregion

// #region PROJECT FILTERS COMPONENT

export default function ProjectFilters() {
  const [activeCategory, setActiveCategory] =
    useState<FilterCategory>("All Projects");

  const [searchQuery, setSearchQuery] = useState("");

  // #region FILTER PROJECT DATA

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

      const matchesSearch = searchableText.includes(search);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // #endregion

  // #region RESET FILTERS

  const resetFilters = () => {
    setActiveCategory("All Projects");
    setSearchQuery("");
  };

  // #endregion

  return (
    <section
      id="project-gallery"
      aria-labelledby="projects-gallery-title"
      className="w-full"
    >
      {/* #region GALLERY HEADING */}

      <div className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
            ✦ Explore My Work
          </p>

          <h2
            id="projects-gallery-title"
            className="text-3xl font-bold text-white md:text-4xl"
          >
            Project{" "}
            <span className="text-cyan-300">Gallery</span>
          </h2>

          <p className="mt-3 text-sm text-slate-300">
            Discover the ideas, tools, and stories behind my creations.
          </p>
        </div>

        {/* #region SEARCH BAR */}

        <div className="relative w-full md:max-w-xs">
          <label
            htmlFor="project-search"
            className="sr-only"
          >
            Search projects
          </label>

          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-cyan-300"
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

        {/* #endregion */}

      </div>

      {/* #endregion */}

      {/* #region CATEGORY FILTER BUTTONS */}

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
              className={`
                rounded-full border px-5 py-2.5
                text-sm font-semibold
                transition-all duration-300
                focus-visible:outline-2
                focus-visible:outline-offset-2
                focus-visible:outline-cyan-300

                ${
                  isActive
                    ? "border-cyan-300 bg-cyan-400 text-[#061321] shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                    : "border-white/25 bg-[#0B1730]/30 text-slate-200 backdrop-blur-md hover:border-cyan-300/70 hover:bg-cyan-400/10 hover:text-cyan-200"
                }
              `}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* #endregion */}

      {/* #region PROJECT COUNT */}

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
        /* #region EMPTY SEARCH RESULTS */

        <div className="rounded-3xl border border-cyan-300/25 bg-[#0B1730]/30 px-6 py-16 text-center backdrop-blur-md">

          <div className="mb-5 text-4xl" aria-hidden="true">
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

        /* #endregion */
      )}

      {/* #endregion */}

    </section>
  );
}

// #endregion
