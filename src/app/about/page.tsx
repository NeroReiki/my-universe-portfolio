
import Image from "next/image";

import AboutBackground from "@/components/about/AboutBackground";
import AboutCards from "@/components/about/AboutCards";
import FloatingCharts from "@/components/about/FloatingCharts";

// #region ANIMATED PROFILE PHOTO

function OrbitPortrait() {
  return (
    <div className="group relative isolate h-36 w-36 shrink-0 sm:h-44 sm:w-44 lg:h-44 lg:w-44 xl:h-52 xl:w-52">

      {/* #region SOFT BACKGROUND GLOW */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-8 rounded-full bg-cyan-400/25 blur-3xl motion-safe:animate-pulse"
      />
      {/* #endregion */}

      {/* #region OUTER ROTATING RING */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-4 rounded-full border border-dashed border-violet-300/50 motion-safe:animate-[spin_28s_linear_infinite]"
      />
      {/* #endregion */}

      {/* #region INNER ROTATING RING */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-2 rounded-full border-2 border-transparent border-t-cyan-300 border-b-violet-400 motion-safe:animate-[spin_18s_linear_infinite]"
      >
        {/* ORBITING STAR */}
        <span className="absolute -top-[5px] left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-cyan-200 shadow-[0_0_15px_5px_rgba(103,232,249,0.5)]" />
      </div>
      {/* #endregion */}

      {/* #region PROFILE IMAGE */}
      <div className="relative z-10 h-full w-full overflow-hidden rounded-full border-[3px] border-cyan-200/80 bg-[#0B1730] shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-all duration-500 group-hover:scale-105 group-hover:shadow-[0_0_45px_rgba(34,211,238,0.7)] motion-reduce:transition-none">

        <Image
          src="/images/daniel-profile.webp"
          alt="Daniel's profile portrait"
          fill
          sizes="(max-width: 640px) 144px, (max-width: 1280px) 176px, 208px"
          priority
          className="object-cover"
        />

      </div>
      {/* #endregion */}

    </div>
  );
}

// #endregion

// #region ABOUT PAGE COMPONENT


// #region RESUME SECTION

function ResumeSection() {
  return (
    <section
      id="resume"
      className="
        mt-12 rounded-3xl border border-cyan-300/25
        bg-[#0B1730]/35 p-6 backdrop-blur-md
        shadow-[0_0_35px_rgba(34,211,238,0.08)]
        sm:p-8
      "
    >
      {/* #region SECTION HEADING */}

      <div className="mb-7">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
          ✦ My Documents
        </p>

        <h2 className="mb-4 text-3xl font-bold text-white">
          My Resume
        </h2>

        <p className="max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
          Explore my educational background, work experience,
          technical expertise, and professional journey
          in more detail.
        </p>
      </div>

      {/* #endregion */}

      {/* #region RESUME ACTION BUTTONS */}

      <div className="mb-7 flex flex-wrap gap-3">

        {/* OPEN PDF */}

        <a
          href="/documents/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-flex items-center justify-center
            gap-2 rounded-xl border
            border-cyan-300/50 bg-cyan-400/10
            px-5 py-3 text-sm font-semibold
            text-cyan-200 transition-all duration-300
            hover:border-cyan-300
            hover:bg-cyan-400/20
            hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]
          "
        >
          Open Resume PDF ↗
        </a>

        {/* DOWNLOAD PDF */}

        <a
          href="/documents/resume.pdf"
          download="Resume.pdf"
          className="
            inline-flex items-center justify-center
            gap-2 rounded-xl border
            border-violet-300/50 bg-violet-400/10
            px-5 py-3 text-sm font-semibold
            text-violet-200 transition-all duration-300
            hover:border-violet-300
            hover:bg-violet-400/20
            hover:shadow-[0_0_20px_rgba(167,139,250,0.15)]
          "
        >
          ↓ Download Resume
        </a>

      </div>

      {/* #endregion */}

    </section>
  );
}

// #endregion

export default function AboutPage() {
  return (
    <main className="galaxy-page-enter relative min-h-screen overflow-hidden bg-[#050A1D] text-white">

      {/* #region ANIMATED GALAXY BACKGROUND */}
      <AboutBackground />
      {/* #endregion */}

      {/* #region MAIN PAGE CONTENT */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 pb-20 pt-36 sm:px-6 md:px-10">

        {/* #region HERO SECTION */}
        <section className="mb-16 grid items-center gap-12 lg:grid-cols-2 lg:gap-10">

          {/* #region LEFT INTRODUCTION SECTION */}
          <div className="w-full min-w-0">

            {/* #region PROFILE AND NAME ROW */}
            <div className="flex items-center gap-6 sm:gap-8 lg:gap-10 xl:gap-12">



              {/* #region PROFILE AND LABEL */}
              <div className="flex shrink-0 flex-col items-center gap-6">

                {/* ANIMATED PROFILE PHOTO */}
                <OrbitPortrait />

                {/* LABEL BELOW PHOTO */}
                <p className="max-w-36 text-center text-[10px] font-bold uppercase leading-relaxed tracking-[0.12em] text-cyan-300 drop-shadow-lg sm:max-w-44 sm:text-xs xl:max-w-52">
                  ✦ The Person Behind the Data
                </p>

              </div>
              {/* #endregion */}

              {/* #region MAIN HEADING */}
              <div className="min-w-0 flex-1 -translate-y-7">


                <h1 className="text-[clamp(1.65rem,4vw,3.5rem)] font-bold leading-[1.15] tracking-tight text-white drop-shadow-[0_4px_15px_rgba(0,0,0,0.8)] lg:text-4xl xl:text-5xl">

                  <span className="block">
                    Hello, I&apos;m
                  </span>

                  <span className="mt-2 block text-cyan-300">
                    Daniel.
                  </span>

                </h1>

              </div>
              {/* #endregion */}

            </div>
            {/* #endregion */}

            {/* #region INTRODUCTION QUOTE */}
            <p className="mt-10 max-w-xl text-left text-lg leading-relaxed text-slate-100 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] sm:text-xl">
              A Statistics graduate and Data Analyst,
              turning data into meaningful insights.
            </p>
            {/* #endregion */}

            {/* #region SPECIALIZATION BADGES */}
            <div className="mt-8 flex flex-wrap justify-start gap-4">

              {/* DATA ANALYTICS */}
              <span className="rounded-full border border-cyan-400/60 bg-[#07192F]/65 px-5 py-3 text-sm font-semibold text-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.12)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300 hover:shadow-[0_0_25px_rgba(34,211,238,0.3)] motion-reduce:transform-none">
                ◈ Data Analytics
              </span>

              {/* DATA VISUALIZATION */}
              <span className="rounded-full border border-violet-400/60 bg-[#1A1235]/65 px-5 py-3 text-sm font-semibold text-violet-200 shadow-[0_0_20px_rgba(167,139,250,0.12)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:shadow-[0_0_25px_rgba(167,139,250,0.3)] motion-reduce:transform-none">
                ◈ Data Visualization
              </span>

            </div>
            {/* #endregion */}

          </div>
          {/* #endregion */}

          {/* #region RIGHT FLOATING ANALYTICS */}
          <div className="relative flex w-full min-w-0 items-center justify-center">

            {/* #region BACKGROUND GLOW */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-8 rounded-full bg-cyan-400/10 blur-3xl"
            />
            {/* #endregion */}

            {/* #region FLOATING CHARTS */}
            <FloatingCharts />
            {/* #endregion */}

          </div>
          {/* #endregion */}

        </section>
        {/* #endregion */}

        {/* #region INTERACTIVE ABOUT CARDS */}
        <AboutCards />
        {/* #endregion */}

        {/* #region RESUME SECTION */}
        <ResumeSection />
        {/* #endregion */}

      </div>
      {/* #endregion */}

    </main>
  );
}

// #endregion
