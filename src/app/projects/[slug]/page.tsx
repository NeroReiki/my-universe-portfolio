import ProjectGallery from "@/components/projects/ProjectGallery";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";

// #region PAGE TYPES

type ProjectDetailsProps = {
  params: Promise<{ slug: string }>;
};

// #endregion

// #region GENERATE PROJECT ROUTES

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// #endregion

// #region PROJECT BACKGROUND

function ProjectDetailsBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#050A1D]"
    >
      {/* #region GALAXY VIDEO */}

      <video
        autoPlay
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

      {/* #region VIDEO OVERLAY */}

      <div className="absolute inset-0 bg-[#030817]/40" />

      <div className="absolute inset-0 bg-gradient-to-b from-[#030817]/20 via-transparent to-[#030817]/90" />

      {/* #endregion */}
    </div>
  );
}

// #endregion

// #region PROJECT DETAILS PAGE

export default async function ProjectDetailsPage({
  params,
}: ProjectDetailsProps) {
  const { slug } = await params;

  // #region FIND SELECTED PROJECT

  const project = projects.find(
    (item) => item.slug === slug
  );

  if (!project) {
    notFound();
  }

  // #endregion

  // #region PROJECT GALLERY IMAGES

const previewImages = (
  project.images?.length
    ? project.images
    : project.image
      ? [project.image]
      : []
).slice(0, 3);

// #endregion


  return (
    <main className="galaxy-page-enter relative min-h-screen overflow-hidden bg-[#050A1D] text-white">

      {/* #region BACKGROUND */}

      <ProjectDetailsBackground />

      {/* #endregion */}

      {/* #region MAIN CONTENT */}

      <div className="relative z-10 mx-auto max-w-5xl px-5 pb-24 pt-32 sm:px-6 md:px-10">

        {/* #region BACK NAVIGATION */}

        <Link
          href="/projects"
          className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition-colors hover:text-white"
        >
          <span aria-hidden="true">←</span>
          Back to Projects
        </Link>

        {/* #endregion */}

        {/* #region PROJECT HEADER */}

        <header className="mb-10">

          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">
            ✦ {project.category}
          </p>

          <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
            {project.title}
          </h1>

          <p className="max-w-3xl text-lg leading-relaxed text-slate-200">
            {project.description}
          </p>

        </header>

        {/* #endregion */}

        
{/* ====================================== */}
{/* #region PROJECT SCREENSHOT GALLERY */}
{/* ====================================== */}

<ProjectGallery
  images={previewImages}
  title={project.title}
/>

{/* #endregion */}

        {/* #region PROJECT OVERVIEW AND TOOLS */}

        <div className="mb-10 grid gap-7 md:grid-cols-3">

          {/* PROJECT OVERVIEW */}

          <section className="rounded-3xl border border-cyan-300/25 bg-[#0B1730]/30 p-7 backdrop-blur-md md:col-span-2">

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
              ✦ Overview
            </p>

            <h2 className="mb-5 text-2xl font-bold">
              About This Project
            </h2>

            <p className="text-sm leading-8 text-slate-200 sm:text-base">
              {project.description}
            </p>

          </section>

          {/* PROJECT TOOLS */}

          <section className="rounded-3xl border border-violet-300/25 bg-[#0B1730]/30 p-7 backdrop-blur-md">

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">
              ◈ Technologies
            </p>

            <h2 className="mb-5 text-xl font-bold">
              Tools Used
            </h2>

            <div className="flex flex-wrap gap-2">

              {project.tools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-xl border border-cyan-300/20 bg-cyan-400/10 px-3 py-2 text-xs font-medium text-cyan-100"
                >
                  {tool}
                </span>
              ))}

            </div>

          </section>

        </div>

        {/* #endregion */}

        {/* #region DYNAMIC PROJECT SECTIONS */}

        {project.sections && project.sections.length > 0 && (
          <div className="mb-10 space-y-7">

            {project.sections.map((section, index) => (
              <section
                key={`${section.title}-${index}`}
                className="group rounded-3xl border border-cyan-300/25 bg-[#0B1730]/30 p-6 shadow-[0_0_25px_rgba(34,211,238,0.05)] backdrop-blur-md transition-all duration-300 hover:border-cyan-300/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.12)] sm:p-8"
              >

                {/* #region SECTION HEADER */}

                <div className="mb-5 flex items-start gap-4">

                  <span
                    aria-hidden="true"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-300/40 bg-cyan-400/10 text-lg font-semibold text-cyan-300"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="min-w-0">

                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                      Project Insight
                    </p>

                    <h2 className="text-xl font-bold text-white sm:text-2xl">
                      {section.title}
                    </h2>

                  </div>

                </div>

                {/* #endregion */}

                {/* #region SECTION DESCRIPTION */}

                <p className="whitespace-pre-line text-sm leading-8 text-slate-200 sm:text-base">
                  {section.content}
                </p>

                {/* #endregion */}

                {/* #region OPTIONAL BULLET POINTS */}

                {section.bullets && section.bullets.length > 0 && (
                  <ul className="mt-6 space-y-3">

                    {section.bullets.map((bullet, bulletIndex) => (
                      <li
                        key={bulletIndex}
                        className="flex items-start gap-3 text-sm leading-7 text-slate-200 sm:text-base"
                      >

                        <span
                          aria-hidden="true"
                          className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.5)]"
                        />

                        <span>{bullet}</span>

                      </li>
                    ))}

                  </ul>
                )}

                {/* #endregion */}

                {/* #region OPTIONAL SECTION IMAGE */}

                {section.image && (
                  <div className="relative mt-7 h-56 overflow-hidden rounded-2xl border border-white/15 bg-[#07152C]/50 sm:h-80">

                    <Image
                      src={section.image}
                      alt={`${section.title} screenshot`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 960px"
                      className="object-contain"
                    />

                  </div>
                )}

                {/* #endregion */}

              </section>
            ))}

          </div>
        )}

        {/* #endregion */}


{/* #region FULL RESEARCH REPORT PDF */}

{project.pdfUrl && (
  <section className="mb-10 rounded-3xl border border-cyan-300/25 bg-[#0B1730]/30 p-5 backdrop-blur-md sm:p-8">

    {/* REPORT HEADING */}

    <div className="mb-6">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
        ✦ Research Document
      </p>

      <h2 className="mb-3 text-2xl font-bold text-white">
        Full Research Report
      </h2>

      <p className="text-sm leading-7 text-slate-300">
        Read the complete academic research report below.
      </p>
    </div>

    {/* EMBEDDED PDF VIEWER */}

   {/* #region READ-ONLY STYLE PDF VIEWER */}

    <iframe
    src={`${project.pdfUrl}#toolbar=0&navpanes=0&scrollbar=1`}
    title={`${project.title} research report`}
    loading="lazy"
    className="h-[500px] w-full rounded-2xl border border-cyan-300/20 bg-white sm:h-[700px]"
    />

{/* #endregion */}

    {/* PDF ACTION BUTTONS */}

    <div className="mt-6 flex flex-wrap gap-3">

    </div>

  </section>
)}

{/* #endregion */}


        {/* #region OPTIONAL PROJECT LINKS */}

        {(project.githubUrl || project.demoUrl) && (
          <section className="mb-10 rounded-3xl border border-cyan-300/25 bg-[#0B1730]/30 p-7 backdrop-blur-md">

            <h2 className="mb-5 text-xl font-bold">
              Explore This Project
            </h2>

            <div className="flex flex-wrap gap-4">

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-6 py-3 text-sm font-semibold text-[#061321] transition-colors hover:bg-cyan-300"
                >
                  GitHub Repository ↗
                </a>
              )}

              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-violet-300/50 bg-violet-400/10 px-6 py-3 text-sm font-semibold text-violet-200 transition-colors hover:bg-violet-400/20"
                >
                  Live Demo ↗
                </a>
              )}

            </div>

          </section>
        )}

        {/* #endregion */}

        {/* #region BOTTOM NAVIGATION */}

        <div className="border-t border-white/15 pt-8">

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-xl border border-cyan-300/40 bg-[#0B1730]/30 px-6 py-3 text-sm font-semibold text-cyan-200 backdrop-blur-md transition-colors hover:bg-cyan-400/15"
          >
            ← Explore More Projects
          </Link>

        </div>

        {/* #endregion */}

      </div>

      {/* #endregion */}

    </main>
  );
}

// #endregion
