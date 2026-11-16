
import type { Project } from "../projectTypes";

export const bankingDataPipelineProject: Project = {
  slug: "learning-banking-data-pipeline",

  title: "Understanding the Data Pipeline: From Raw Data to PostgreSQL",

  category: "Data Analytics",

  image: "/images/projects/banking-data-pipeline.png",

  description:
    "A hands-on learning project exploring how raw banking data is extracted, cleaned, transformed, and validated using Python and Pandas. Using a simple synthetic banking system, the project demonstrates data quality, relational database design, and preparation for PostgreSQL.",

  tools: [
    "Python",
    "Pandas",
    "PostgreSQL",
    "SQL",
    "SQLAlchemy",
    "Jupyter Notebook",
    "JSON",
    "ETL",
  ],

  githubUrl:
    "https://github.com/NeroReiki/learning-banking-data-pipeline",

  sections: [
    {
      title: "Project Overview",
      content:
        "This personal learning project explores how data moves from raw CSV files through an ETL pipeline into structured datasets suitable for relational database storage. A fictional banking system provides practical examples of customers, bank accounts, and transactions.",
    },
    {
      title: "Project Objectives",
      content:
        "The main objective was to understand the fundamentals of data engineering and how raw data is prepared for structured storage and analysis.",
      bullets: [
        "Generate synthetic banking datasets.",
        "Understand the Extract, Transform, Load (ETL) workflow.",
        "Identify and resolve common data quality issues.",
        "Apply source-to-target mappings using JSON.",
        "Validate relationships between customers, accounts, and transactions.",
        "Understand PostgreSQL relational database design.",
        "Explore structured banking data using SQL.",
      ],
    },
    {
      title: "Data Pipeline Architecture",
      content:
        "The workflow begins with synthetic banking datasets generated in Python. Pandas extracts and transforms the raw CSV files, while JSON mapping configurations document the target database structure. Validation rules remove records that fail data quality and relationship checks. Cleaned datasets are exported to CSV, with optional PostgreSQL loading through SQLAlchemy.",
    },
    {
      title: "Data Cleaning and Transformation",
      content:
        "The source datasets deliberately include inconsistent values to simulate data quality challenges. The ETL notebook applies cleaning, standardization, and validation rules before producing structured outputs.",
      bullets: [
        "Remove duplicate customer records.",
        "Standardize dates, timestamps, gender, and account statuses.",
        "Normalize account and transaction types.",
        "Handle missing or invalid values.",
        "Validate customer-to-account and account-to-transaction relationships.",
        "Exclude records that fail mandatory field checks.",
      ],
    },
    {
      title: "ETL Results",
      content:
        "The Python ETL notebook was executed successfully with PostgreSQL loading disabled. From 1,255 raw records across three datasets, 804 records remained after cleaning and validation.",
      bullets: [
        "Customers: 105 raw records → 100 cleaned records.",
        "Accounts: 150 raw records → 113 cleaned records.",
        "Transactions: 1,000 raw records → 591 cleaned records.",
        "Total: 451 records excluded through cleaning, validation, and relationship checks.",
      ],
    },
    {
      title: "PostgreSQL Database Design",
      content:
        "The project defines three related PostgreSQL tables: customers, accounts, and transactions. Primary and foreign keys describe the one-to-many relationships between customers and accounts, and between accounts and transactions. SQLAlchemy provides an optional database loading stage. PostgreSQL loading has not been retested in this public learning version.",
    },
    {
      title: "SQL Data Analysis",
      content:
        "The repository includes SQL queries demonstrating how structured banking records can support analytical exploration.",
      bullets: [
        "Banking data overview.",
        "Top 10 customers by recorded transaction volume.",
        "Transaction type distribution.",
        "Accounts without recorded transactions.",
        "Monthly transaction trends.",
        "Account status distribution.",
      ],
    },
    {
      title: "Key Learning Outcomes",
      content:
        "This project strengthened my understanding of the relationship between raw data, data quality, transformation rules, and database design. It demonstrates why reliable analytics begins with structured, validated data.",
    },
    {
      title: "Future Improvements",
      content:
        "Potential extensions include automated data quality reports, improved ETL logging, database loading tests, and a Power BI dashboard connected to PostgreSQL.",
    },
  ],
};
