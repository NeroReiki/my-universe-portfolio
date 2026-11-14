
import type { Project } from "../projectTypes";

// #region FINAL YEAR PROJECT

export const finalYearProject: Project = {
  slug: "depression-medical-students-switzerland",

  title:
    "Depression Among Medical Students in Switzerland Using Multiple Linear Regression",

  category: "Final Year Project",

  description:
    "An academic research project investigating factors associated with depression among medical students in Switzerland using statistical analysis and multiple linear regression.",

  tools: [
    "SPSS",
    "SAS",
    "Power BI",
    "Multiple Linear Regression",
    "Statistical Analysis",
  ],

  image: "/images/projects/fyp-cover.webp",

  pdfUrl: "/documents/fyp-depression-medical-students.pdf",

  sections: [
    {
      title: "Research Background",
      content:
        "This final year research project, completed as part of a Bachelor of Science (Hons.) Statistics degree at Universiti Teknologi MARA, investigates the factors associated with depression among medical students in Switzerland. The study examines demographic, academic, well-being, empathy, anxiety, and burnout-related variables.",
    },

    {
      title: "Research Objectives",
      content: "The research focuses on three main objectives.",
      bullets: [
        "Identify relationships between depression and age, study hours, empathy, anxiety, and burnout.",
        "Examine the relationships between demographic, well-being, psychological, and burnout factors and depression.",
        "Investigate the interaction effects of anxiety with year of study and emotional exhaustion.",
      ],
    },

    {
      title: "Research Methodology",
      content:
        "The study used secondary data concerning 881 medical students in Switzerland. Statistical analysis included descriptive statistics, assumption checking, Pearson correlation, multiple linear regression, goodness-of-fit evaluation, and interaction analysis.",
      bullets: [
        "Data preprocessing and descriptive analysis",
        "Regression assumption checking",
        "Pearson correlation analysis",
        "Multiple linear regression",
        "Interaction effect analysis",
      ],
    },

    {
      title: "Key Research Findings",
      content:
        "The full regression model achieved an R-squared value of 0.632. Seven predictors were identified as statistically significant, while the tested interaction effects were not significant.",
      bullets: [
        "Significant predictors included year of study, gender, partnership status, and health satisfaction.",
        "Anxiety, emotional exhaustion, and cynicism were also significant predictors.",
        "Anxiety showed a strong positive correlation with depression scores (r = 0.727).",
        "Neither tested interaction effect was statistically significant.",
      ],
    },

    {
      title: "Research Conclusion",
      content:
        "The research highlights the importance of anxiety, burnout, and student well-being in understanding depressive symptoms among medical students. The findings support the consideration of mental health awareness, counselling, mentorship, and targeted student support initiatives.",
    },
  ],
};

// #endregion
