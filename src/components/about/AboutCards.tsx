
"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

// #region TYPES

type CardId = "education" | "experience" | "skills";

type Job = {
  title: string;
  company: string;
  period: string;
  details: string[];
};

// #endregion

// #region EDUCATION DATA

const education = [
  {
    title: "Bachelor of Science (Hons.) Statistics",
    subtitle: "UiTM Shah Alam",
    period: "2023 – 2025",
    detail: "CGPA: 3.41 / 4.00",
  },
  {
    title: "Diploma in Statistics",
    subtitle: "UiTM Tapah",
    period: "2020 – 2023",
    detail: "CGPA: 3.46 / 4.00",
  },
];

// #endregion

// #region EXPERIENCE DATA

const experience: Job[] = [
  {
    title: "Data Analyst (MySTEP)",
    company: "Department of Statistics Malaysia",
    period: "Apr 2026 – Present",
    details: [
      "Performed data cleaning and prepared statistical summaries and reports for analysis and publication.",
      "Developed a dashboard to monitor and analyze import and export data.",
      "Conducted quality checks on published statistical data and verified data accuracy.",
      "Served as an instructor for a Power BI Basic knowledge-sharing session.",
    ],
  },
  {
    title: "Protégé Data Analyst",
    company: "Airod Sdn Bhd",
    period: "Mar 2026 – Apr 2026",
    details: [
      "Extracted and cleaned sales data using Microsoft Excel.",
      "Developed Looker Studio dashboards to monitor order completion and customer payments.",
      "Collaborated with team members on data-driven insights.",
    ],
  },
  {
    title: "Data Migration Analyst",
    company: "Hong Leong Bank",
    period: "Sep 2025 – Mar 2026",
    details: [
      "Performed data extraction, transformation, loading (ETL), and validation as a Maker.",
      "Reviewed and approved migration activities completed by Makers while serving as an Authorizer.",
      "Ensured data integrity and compliance with migration requirements.",
    ],
  },
  {
    title: "Data Intern",
    company: "Koppiku Sdn Bhd",
    period: "Mar 2025 – Jul 2025",
    details: [
      "Cleaned and maintained sales data for analysis.",
      "Automated Google Reviews data collection using Apify, Google Apps Script, and APIs.",
      "Integrated hourly weather data using WeatherAPI and Google Apps Script.",
      "Developed Looker Studio dashboards for sales performance.",
      "Managed product SKU updates and promotional vouchers using backend systems.",
    ],
  },
];

// #endregion

// #region TECHNICAL SKILLS DATA

const skills = [
  "Power BI",
  "Looker Studio",
  "Excel / VBA",
  "Python",
  "R",
  "SQL",
  "SPSS",
  "SAS",
  "Google Apps Script",
  "Data Cleaning",
  "Data Visualization",
  "Dashboard Development",
];

// #endregion

// #region CARD CONFIGURATION

const cards: {
  id: CardId;
  title: string;
  symbol: string;
  subtitle: string;
  accent: "cyan" | "violet";
}[] = [
  {
    id: "education",
    title: "Education",
    symbol: "🎓",
    subtitle: "My academic foundation",
    accent: "cyan",
  },
  {
    id: "experience",
    title: "Experience",
    symbol: "💼",
    subtitle: "My professional journey",
    accent: "violet",
  },
  {
    id: "skills",
    title: "Technical Skills",
    symbol: "🛠",
    subtitle: "My technical toolkit",
    accent: "cyan",
  },
];

// #endregion

// #region ABOUT CARDS COMPONENT

export default function AboutCards() {
  const [activeCard, setActiveCard] =
    useState<CardId | null>(null);

  const [selectedJob, setSelectedJob] =
    useState<Job | null>(null);

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const jobTriggerRef = useRef<HTMLButtonElement>(null);

  // #region TOGGLE MAIN CARD

  function toggleCard(id: CardId) {
    setActiveCard((current) =>
      current === id ? null : id
    );
  }

  // #endregion

  // #region OPEN JOB POPUP

  function openJobDetails(
    job: Job,
    trigger: HTMLButtonElement
  ) {
    jobTriggerRef.current = trigger;
    setSelectedJob(job);
  }

  // #endregion

  // #region POPUP KEYBOARD AND SCROLL HANDLING

  useEffect(() => {
    if (!selectedJob) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSelectedJob(null);
      }

      // Keep keyboard focus within the popup.
      if (event.key === "Tab") {
        const modal = document.getElementById(
          "experience-job-dialog"
        );

        if (!modal) return;

        const focusable = Array.from(
          modal.querySelectorAll<HTMLElement>(
            'button, a[href], [tabindex]:not([tabindex="-1"])'
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
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
      jobTriggerRef.current?.focus();
    };
  }, [selectedJob]);

  // #endregion

  return (
    <section className="relative mx-auto w-full max-w-7xl py-8">

      {/* #region SECTION HEADER */}
      <div className="mb-10 text-center">

        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
          Explore My Journey
        </p>

        <h2 className="text-3xl font-bold text-white md:text-4xl">
          Discover My{" "}
          <span className="text-cyan-300">
            Universe.
          </span>
        </h2>

        <p className="mt-4 text-sm text-slate-300">
          Tap or click a card to explore more.
        </p>

      </div>
      {/* #endregion */}

      {/* #region CARD GRID */}
      <div className="grid items-start gap-5 md:grid-cols-3">

        {cards.map((card) => {
          const isActive = activeCard === card.id;
          const isViolet = card.accent === "violet";

          return (
            <article
              key={card.id}
              className={`
                relative overflow-hidden rounded-3xl border
                backdrop-blur-xl
                transition-all duration-300
                motion-reduce:transition-none
                ${
                    isActive
                    ? isViolet
                    ? "border-violet-300/80 bg-[#1C1637]/75 shadow-[0_0_35px_rgba(167,139,250,0.25)]"
                    : "border-cyan-300/80 bg-[#0B2239]/75 shadow-[0_0_35px_rgba(34,211,238,0.25)]"
                    : "border-white/20 bg-[#0B1730]/60 hover:-translate-y-2 hover:scale-[1.02] hover:border-cyan-300/60 hover:shadow-[0_0_30px_rgba(34,211,238,0.18)] motion-reduce:transform-none"
                }
              `}
            >

              {/* #region CARD HEADER */}
              <button
                type="button"
                aria-expanded={isActive}
                aria-controls={`about-details-${card.id}`}
                onClick={() => toggleCard(card.id)}
                className="group flex w-full flex-col p-6 text-left focus-visible:outline-2 focus-visible:outline-cyan-300 sm:p-7"
              >

                <div className="mb-7 flex w-full items-center justify-between">

                  <span
                    className={`
                      flex h-14 w-14 items-center justify-center
                      rounded-2xl border text-3xl
                      ${
                        isViolet
                          ? "border-violet-300/50 bg-violet-400/10 text-violet-300"
                          : "border-cyan-300/50 bg-cyan-400/10 text-cyan-300"
                      }
                    `}
                  >
                    {card.symbol}
                  </span>

                  <span
                    className={`text-2xl ${
                      isViolet
                        ? "text-violet-300"
                        : "text-cyan-300"
                    }`}
                  >
                    {isActive ? "−" : "+"}
                  </span>

                </div>

                <h3 className="mb-2 text-2xl font-bold text-white">
                  {card.title}
                </h3>

                <p className="text-sm text-slate-300">
                  {card.subtitle}
                </p>

                <div
                  className={`mt-6 h-px w-full ${
                    isViolet
                      ? "bg-gradient-to-r from-violet-400 to-transparent"
                      : "bg-gradient-to-r from-cyan-400 to-transparent"
                  }`}
                />

                <p className="mt-4 text-xs text-slate-400">
                  {isActive ? "Tap to close" : "Tap to expand"}
                </p>

              </button>
              {/* #endregion */}

              {/* #region EXPANDABLE CONTENT */}
              <div
                id={`about-details-${card.id}`}
                aria-hidden={!isActive}
                inert={!isActive}
                className={`
                  grid transition-[grid-template-rows]
                  duration-500 ease-in-out
                  motion-reduce:transition-none
                  ${
                    isActive
                      ? "grid-rows-[1fr]"
                      : "grid-rows-[0fr]"
                  }
                `}
              >
                <div className="min-h-0 overflow-hidden">

                  <div className="border-t border-white/15 px-5 pb-6 pt-5 sm:px-6">

                    {/* #region EDUCATION */}
                    {card.id === "education" && (
                      <div className="space-y-4">

                        {education.map((item) => (
                          <div
                            key={item.title}
                            className="rounded-xl border border-white/10 bg-white/5 p-4"
                          >
                            <p className="mb-2 text-xs font-semibold text-cyan-300">
                              {item.period}
                            </p>

                            <h4 className="mb-2 text-base font-semibold text-white">
                              {item.title}
                            </h4>

                            <p className="text-sm text-slate-300">
                              {item.subtitle}
                            </p>

                            <p className="mt-2 text-xs text-slate-400">
                              {item.detail}
                            </p>
                          </div>
                        ))}

                      </div>
                    )}
                    {/* #endregion */}

                    {/* #region COMPACT EXPERIENCE LIST */}
                    {card.id === "experience" && (
                      <div className="space-y-3">

                        {experience.map((job) => (
                          <button
                            key={job.title + job.company}
                            type="button"
                            onClick={(event) =>
                              openJobDetails(
                                job,
                                event.currentTarget
                              )
                            }
                            className="group/job w-full rounded-xl border border-violet-300/15 bg-white/5 p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-300/60 hover:bg-violet-400/10 hover:shadow-[0_0_20px_rgba(167,139,250,0.15)] focus-visible:outline-2 focus-visible:outline-violet-300 motion-reduce:transform-none"
                          >

                            {/* DATE */}
                            <div className="mb-2 flex items-center justify-between gap-2">

                              <span className="text-xs font-semibold text-violet-300">
                                {job.period}
                              </span>

                              <span className="text-violet-300 transition-transform group-hover/job:scale-125">
                                ↗
                              </span>

                            </div>

                            {/* JOB TITLE */}
                            <h4 className="mb-1 text-sm font-bold text-white sm:text-base">
                              {job.title}
                            </h4>

                            {/* COMPANY */}
                            <p className="text-xs text-slate-300 sm:text-sm">
                              {job.company}
                            </p>

                          </button>
                        ))}

                        <p className="text-center text-xs text-violet-200/70">
                          Select a job to view full details.
                        </p>

                      </div>
                    )}
                    {/* #endregion */}

                    {/* #region TECHNICAL SKILLS */}
                    {card.id === "skills" && (
                      <div className="flex flex-wrap gap-2">

                        {skills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-lg border border-cyan-300/25 bg-cyan-400/10 px-3 py-2 text-xs font-medium text-cyan-100 transition-colors hover:border-cyan-300/60 hover:bg-cyan-400/20"
                          >
                            {skill}
                          </span>
                        ))}

                      </div>
                    )}
                    {/* #endregion */}

                  </div>

                </div>
              </div>
              {/* #endregion */}

            </article>
          );
        })}

      </div>
      {/* #endregion */}

      {/* #region FLOATING JOB DETAILS POPUP */}
      {selectedJob !== null &&
        typeof document !== "undefined" &&
        createPortal(
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">

            {/* #region DARK BACKDROP */}
            <button
              type="button"
              tabIndex={-1}
              aria-label="Close job details"
              onClick={() => setSelectedJob(null)}
              className="absolute inset-0 h-full w-full cursor-default bg-[#030817]/85 backdrop-blur-md"
            />
            {/* #endregion */}

            {/* #region POPUP CONTAINER */}
            <div
              id="experience-job-dialog"
              role="dialog"
              aria-modal="true"
              aria-labelledby="selected-job-title"
              className="relative z-10 max-h-[85dvh] w-full max-w-xl overflow-y-auto rounded-3xl border border-violet-300/50 bg-[#111A35] p-6 text-white shadow-[0_0_60px_rgba(167,139,250,0.25)] sm:p-8"
            >

              {/* #region POPUP HEADER */}
              <div className="mb-6 flex items-start justify-between gap-4">

                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">
                    Professional Experience
                  </p>

                  <p className="mb-2 text-sm text-violet-200">
                    {selectedJob.period}
                  </p>

                  <h3
                    id="selected-job-title"
                    className="text-2xl font-bold text-white"
                  >
                    {selectedJob.title}
                  </h3>

                  <p className="mt-2 text-sm text-cyan-300">
                    {selectedJob.company}
                  </p>
                </div>

                {/* CLOSE BUTTON */}
                <button
                  ref={closeButtonRef}
                  type="button"
                  aria-label="Close job details"
                  onClick={() => setSelectedJob(null)}
                  className="shrink-0 rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-lg text-white transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-violet-300"
                >
                  ✕
                </button>

              </div>
              {/* #endregion */}

              {/* #region DIVIDER */}
              <div className="mb-6 h-px bg-gradient-to-r from-violet-400/70 via-cyan-400/40 to-transparent" />
              {/* #endregion */}

              {/* #region JOB DESCRIPTION */}
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-violet-200">
                Responsibilities & Contributions
              </h4>

              <ul className="space-y-4">

                {selectedJob.details.map((detail, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-1 shrink-0 text-cyan-300">
                      ✦
                    </span>

                    <p className="text-sm leading-7 text-slate-200">
                      {detail}
                    </p>
                  </li>
                ))}

              </ul>
              {/* #endregion */}

              {/* #region POPUP FOOTER */}
              <p className="mt-8 border-t border-white/10 pt-4 text-center text-xs text-slate-400">
                Press Esc or tap outside to close.
              </p>
              {/* #endregion */}

            </div>
            {/* #endregion */}

          </div>,
          document.body
        )}
      {/* #endregion */}

    </section>
  );
}

// #endregion
