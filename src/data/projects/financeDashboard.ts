import type { Project } from "../projectTypes";

export const financeDashboardProject: Project = {
  slug: "personal-finance-dashboard",

  title: "Personal Finance Dashboard",

  category: "Web Development",

  description:
    "A public demo finance dashboard built with Google Apps Script, HTML, CSS, and JavaScript for tracking balances, expenses, bills, history, and income.",

  tools: [
    "Google Apps Script",
    "HTML",
    "CSS",
    "JavaScript",
    "Google Sheets",
  ],

  image: "/images/projects/finance-dashboard-landscape.png",

  images: [
    "/images/projects/finance-dashboard-landscape.png",
    "/images/projects/finance-dashboard-bills.png",
    "/images/projects/finance-dashboard-income.png",
  ],

  githubUrl: "https://github.com/NeroReiki/personal-finance-dashboard-demo",

  demoUrl:
    "https://script.google.com/macros/s/AKfycbzQnDdzFDr9kobWvao3LqLxrWOZd0j8IlsHrxeS-Vaur5b0QEGDcsBNStDgAzg0Ku-g/exec",

  sections: [
    {
      title: "Project Overview",
      content:
        "A finance dashboard built for tracking balances, spending categories, GPS spending activity, bills, income, and transaction history in a clean interactive interface.",
    },
    {
      title: "Public Demo Version",
      content:
        "A safe public version was prepared using dummy sample data so visitors can explore the dashboard without exposing private financial information.",
    },
    {
      title: "Key Features",
      content:
        "The dashboard includes several useful financial tracking features.",
      bullets: [
        "Current balance overview",
        "Expense category charts",
        "GPS spending map",
        "Transaction history",
        "Bills monitoring",
        "Income tracking",
        "Filters by account and time",
      ],
    },
  ],
};