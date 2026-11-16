import ProjectsSection from "@/components/projects/ProjectsSection";
import Link from "next/link";
import AnimatedBackground from "@/components/space/AnimatedBackground";
import AboutSection from "@/components/about/AboutSection";
import SkillsSection from "@/components/skills/SkillsSection";
import ContactSection from "@/components/contact/ContactSection";

// #region HOME PAGE COMPONENT

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#070B1D] text-white">

      {/* #region HOME SECTION */}
      <section
        id="home"
        className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-[#070B1D] px-6 py-24"
      >

        {/* #region HOME GALAXY BACKGROUND */}
        <AnimatedBackground />
        {/* #endregion */}

        {/* #region INTRODUCTION CONTAINER */}
        <div className="relative z-10 isolate mx-auto w-full max-w-3xl text-center">

          {/* #region SOFT DARK BACKGROUND */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-6 -inset-y-10 -z-10 rounded-[50%] bg-[#030817]/75 blur-3xl md:-inset-x-12"
          />
          {/* #endregion */}

          {/* #region WELCOME MESSAGE */}
          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            Welcome to My Universe
          </p>
          {/* #endregion */}

          {/* #region MAIN HEADING */}
          <h1 className="mb-7 text-5xl font-bold leading-tight tracking-tight text-white drop-shadow-[0_4px_15px_rgba(0,0,0,0.9)] md:text-7xl">
            A Little Space of
            <span className="block text-cyan-300">
              My Own.
            </span>
          </h1>
          {/* #endregion */}

          {/* #region DESCRIPTION */}
          <p className="mb-5 text-lg font-semibold leading-relaxed text-white drop-shadow-[0_3px_10px_rgba(0,0,0,1)]">
            Come take a look at my projects, ideas, and creations.
          </p>
          {/* #endregion */}

          {/* #region PERSONAL MESSAGE */}
          <p className="mb-10 text-base font-medium italic leading-relaxed text-violet-100 drop-shadow-[0_3px_10px_rgba(0,0,0,1)] md:text-lg">
            May you find what you&apos;re looking for among the stars.
          </p>
          {/* #endregion */}

          {/* #region NAVIGATION BUTTONS */}
          <div className="flex flex-wrap justify-center gap-4">

            <Link
              href="/#projects"
              className="rounded-xl bg-cyan-400 px-7 py-3 font-semibold text-slate-950 shadow-lg shadow-cyan-900/30 transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-300 hover:shadow-[0_0_25px_rgba(34,211,238,0.4)]"
            >
              Explore My Universe
            </Link>

            <Link
              href="/#about"
              className="rounded-xl border border-white/50 bg-[#101A40]/65 px-7 py-3 font-semibold text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300 hover:bg-[#101A40]/85"
            >
              About Me
            </Link>

          </div>
          {/* #endregion */}

        </div>
        {/* #endregion */}

      </section>
      {/* #endregion */}

      {/* #region ABOUT SECTION */}
      <AboutSection /> 
      {/* #endregion */}
      {/* #region PROJECTS SECTION */}
      <ProjectsSection />
      {/* #endregion */}
      {/* #region SKILLS SECTION */}
      <SkillsSection />
      {/* #endregion */}
      {/* #region CONTACT SECTION */}
      <ContactSection />
      {/* #endregion */}


    </main>
  );
}

// #endregion
