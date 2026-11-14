// #region PROJECT CATEGORY TYPES

export type ProjectCategory =
  | "Final Year Project"
  | "Data Analytics"
  | "Data Visualization"
  | "Automation"
  | "Web Development";

// #endregion

// #region CUSTOM PROJECT SECTION TYPES

export type ProjectSection = {
  title: string;
  content: string;
  bullets?: string[];
  image?: string;
};

// #endregion

// #region PROJECT DATA TYPE

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  description: string;
  tools: string[];
  image?: string;
  images?: string[];
  githubUrl?: string;
  demoUrl?: string;
  pdfUrl?: string;
  sections?: ProjectSection[];
};

// #endregion