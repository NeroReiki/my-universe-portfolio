
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// #region NAVIGATION CONFIGURATION

const navLinks = [
  { name: "Home", href: "/#home", id: "home" },
  { name: "About", href: "/#about", id: "about" },
  { name: "Projects", href: "/#projects", id: "projects" },
  { name: "Skills", href: "/#skills", id: "skills" },
  { name: "Contact", href: "/#contact", id: "contact" },
];

// #endregion

// #region NAVBAR COMPONENT

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const pathname = usePathname();

  // #region ACTIVE SECTION DETECTION

  useEffect(() => {
    // Project detail pages remain separate routes.
    if (pathname !== "/") {
      setActiveSection(
        pathname.startsWith("/projects") ? "projects" : ""
      );
      return;
    }

    let frameId = 0;

    const updateActiveSection = () => {
      const viewportPosition = window.innerHeight * 0.35;

      let currentSection = "home";

      for (const link of navLinks) {
        const section = document.getElementById(link.id);

        if (!section) continue;

        const rect = section.getBoundingClientRect();

        if (rect.top <= viewportPosition) {
          currentSection = link.id;
        }
      }

      setActiveSection((previous) =>
        previous === currentSection
          ? previous
          : currentSection
      );
    };

    const handleScroll = () => {
      cancelAnimationFrame(frameId);

      frameId = requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", handleScroll);

    return () => {
      cancelAnimationFrame(frameId);

      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [pathname]);

  // #endregion

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">

      {/* #region GLASS NAVIGATION BAR */}

      <nav
        aria-label="Main navigation"
        className="mx-auto max-w-6xl rounded-2xl border border-white/20 bg-[#080F26]/60 px-6 py-4 shadow-lg shadow-black/20 backdrop-blur-xl"
      >
        <div className="flex items-center justify-between">

          {/* #region WEBSITE LOGO */}

          <Link
            href="/#home"
            onClick={() => setMenuOpen(false)}
            className="text-lg font-bold tracking-wide text-white"
          >
            <span className="mr-2 text-cyan-300">✦</span>
            My Universe
          </Link>

          {/* #endregion */}

          {/* #region DESKTOP NAVIGATION */}

          <div className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;

              return (
                <Link
                  key={link.id}
                  href={link.href}
                  aria-current={
                    isActive ? "location" : undefined
                  }
                  className={`text-sm font-medium transition-colors duration-300 hover:text-cyan-300 ${
                    isActive
                      ? "text-cyan-300"
                      : "text-white/80"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* #endregion */}

          {/* #region MOBILE MENU BUTTON */}

          <button
            type="button"
            aria-label={
              menuOpen ? "Close menu" : "Open menu"
            }
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg p-2 text-white transition hover:bg-white/10 md:hidden"
          >
            <span className="text-2xl">
              {menuOpen ? "✕" : "☰"}
            </span>
          </button>

          {/* #endregion */}

        </div>

        {/* #region MOBILE NAVIGATION */}

        {menuOpen && (
          <div
            id="mobile-navigation"
            className="mt-4 flex flex-col gap-2 border-t border-white/20 pt-4 md:hidden"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;

              return (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={
                    isActive ? "location" : undefined
                  }
                  className={`rounded-lg px-3 py-3 text-sm font-medium transition hover:bg-white/10 ${
                    isActive
                      ? "bg-white/10 text-cyan-300"
                      : "text-white/80"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        )}

        {/* #endregion */}

      </nav>

      {/* #endregion */}

    </header>
  );
}

// #endregion
