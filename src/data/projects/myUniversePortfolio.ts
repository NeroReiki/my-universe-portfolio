
import type { Project } from "../projectTypes";

export const myUniversePortfolioProject: Project = {
  slug: "my-universe-portfolio",

  title: "My Universe Portfolio — An AI-Powered Personal Website",

  category: "Web Development",
 
    image: "/images/projects/my-universe-portfolio.png",

    images: [
    "/images/projects/my-universe-portfolio.png",
    "/images/projects/my-universe-about.png",
    "/images/projects/my-universe-projects.png",
    ],

  description:
    "A responsive personal portfolio developed using Next.js, TypeScript, and Tailwind CSS. Featuring an animated galaxy theme, interactive project gallery, and NERO AI, a Gemini-powered chatbot that helps visitors explore my projects, skills, and background.",

  tools: [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Gemini API",
    "Git",
    "GitHub",
    "Vercel",
  ],

  githubUrl:
    "https://github.com/NeroReiki/my-universe-portfolio",

  demoUrl:
    "https://my-universe-portfolio.vercel.app",

  sections: [
    {
      title: "Project Overview",
      content:
        "My Universe Portfolio is a personal web development project designed to showcase my background, education, experience, technical skills, and projects. The website combines a space-inspired visual theme with responsive layouts, interactive components, and an AI-powered portfolio assistant.",
    },
    {
      title: "Project Objectives",
      content:
        "The goal was to develop a modern, responsive portfolio website while gaining practical experience in frontend development, AI integration, and web deployment.",
      bullets: [
        "Build a professional personal portfolio from scratch.",
        "Learn Next.js, React, TypeScript, and Tailwind CSS.",
        "Create reusable components and responsive layouts.",
        "Develop an interactive project gallery and project detail pages.",
        "Integrate an AI chatbot using the Gemini API.",
        "Deploy and maintain the website using GitHub and Vercel.",
      ],
    },
    {
      title: "Website Design and User Experience",
      content:
        "The website uses a galaxy-inspired visual theme with animated video backgrounds, soft gradients, translucent interface elements, and responsive layouts. The main sections are connected through a single-page scrolling experience.",
      bullets: [
        "Animated galaxy backgrounds for different sections.",
        "Responsive layouts for desktop and mobile devices.",
        "Navigation between Home, About, Projects, Skills, and Contact.",
        "Interactive project cards with hover animations.",
        "Project filtering and keyword search.",
        "Dedicated detail pages for individual projects.",
      ],
    },
    {
      title: "NERO AI — Portfolio Assistant",
      content:
        "NERO AI is an AI-powered portfolio assistant integrated using the Gemini API. It uses curated portfolio knowledge to help visitors learn about my education, skills, projects, and development experience.",
      bullets: [
        "Answers visitor questions about portfolio projects.",
        "Provides explanations of technical skills and project features.",
        "Uses portfolio-specific knowledge to guide responses.",
        "Runs through a Next.js server-side API endpoint.",
        "Keeps the Gemini API key outside the client-side source code.",
      ],
    },
    {
      title: "Frontend Architecture",
      content:
        "The application uses the Next.js App Router with TypeScript and Tailwind CSS. Reusable React components organize the main sections, while structured TypeScript project data powers the project gallery and detail pages.",
    },
    {
      title: "Performance and Accessibility",
      content:
        "The website includes performance-conscious features such as optimized mobile video assets and viewport-aware background video playback. The implementation also considers reduced-motion preferences and responsive navigation.",
      bullets: [
        "Separate optimized background videos for mobile devices.",
        "Pause background video playback when sections are not visible.",
        "Respect reduced-motion preferences.",
        "Responsive layouts and navigation.",
        "Reusable components for consistent styling.",
      ],
    },
    {
      title: "Deployment",
      content:
        "The project is version-controlled using Git and hosted on GitHub. The live portfolio is deployed through Vercel, with environment variables used to configure the Gemini API integration.",
    },
    {
      title: "Key Learning Outcomes",
      content:
        "This project strengthened my practical understanding of frontend web development, responsive design, component-based architecture, API integration, Git workflows, and deployment. It also provided experience integrating an AI assistant into a real web application.",
    },
    {
      title: "Future Improvements",
      content:
        "Potential enhancements include expanded project documentation, additional interactive features, accessibility improvements, and continued optimization of the website experience.",
    },
  ],
};
