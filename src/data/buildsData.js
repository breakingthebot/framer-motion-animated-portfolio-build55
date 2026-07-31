// src/data/buildsData.js
// Public Metadata for the 246 Daily Coding Builds Portfolio.
// Contains public build numbers, technologies, live demo URLs, and GitHub repos for all 55 completed builds.

import extractedBuilds from './extracted_builds.json';

export const portfolioStats = {
  totalBuildsTarget: 246,
  completedBuildsCount: 55,
  languagesCount: 38,
  deepBuildsCount: 32,
  githubOrg: "breakingthebot",
};

export const categoriesList = [
  "All Categories",
  "UI Libraries & Design Systems",
  "Web Applications & PWAs",
  "Web Components & Micro-frontends",
  "Minimal Frameworks & HTMX",
  "State Management & State Machines",
  "CLI Tools & Backend Engines",
];

export const buildsList = extractedBuilds;
