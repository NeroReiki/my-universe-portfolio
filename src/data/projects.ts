// #region PROJECT IMPORTS

import { finalYearProject } from "./projects/finalYearProject";
import { financeDashboardProject } from "./projects/financeDashboard";

import type { Project } from "./projectTypes";

// #endregion

// #region RE-EXPORT PROJECT TYPES

export type {
  Project,
  ProjectCategory,
  ProjectSection,
} from "./projectTypes";

// #endregion

// #region ALL PORTFOLIO PROJECTS

export const projects: Project[] = [
  finalYearProject,
  financeDashboardProject,
];

// #endregion