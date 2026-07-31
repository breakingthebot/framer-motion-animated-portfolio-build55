# Build 55: Framer Motion Animated Portfolio (246 Builds Showcase)

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Live%20Demo-000000?style=for-the-badge&logo=vercel)](https://framer-motion-animated-portfolio-build55.vercel.app)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/breakingthebot/framer-motion-animated-portfolio-build55)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![Framer Motion](https://img.shields.io/badge/Framer--Motion-Animations-0055FF?style=for-the-badge&logo=framer)](https://framer.com/motion)
[![Release](https://img.shields.io/badge/Release-v1.1.0-indigo?style=for-the-badge)](CHANGELOG.md)

---

## 🌟 Overview

**Framer Motion Animated Portfolio (Build 55)** is an interactive, dark glassmorphism portfolio application engineered with **React 19**, **Framer Motion**, and **Vite** celebrating the entire **246 Daily Coding Builds** ecosystem.

Designed to showcase the broad portfolio of daily coding builds—ranging from React, Vue 3, Svelte 5, Angular, and Lit 3.x Web Components to HTMX, Alpine.js, styled-components, Python, Go, and Rust—this application delivers dynamic Framer Motion page transitions, real-time live search & tech stack multi-filtering, scroll animations, layout reordering, hover scale/tilt card physics, and interactive modal overlays.

### 🌐 Live Production & Repository Links
- **Live Vercel Application**: [https://framer-motion-animated-portfolio-build55.vercel.app](https://framer-motion-animated-portfolio-build55.vercel.app)
- **GitHub Codebase**: [https://github.com/breakingthebot/framer-motion-animated-portfolio-build55](https://github.com/breakingthebot/framer-motion-animated-portfolio-build55)
- **License**: [MIT License](LICENSE)

---

## 📂 Directory Architecture

```
Build_55/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx             # Glassmorphic floating nav with layoutId pills
│   │   ├── Navbar.css
│   │   ├── HeroSection.jsx        # Staggered entrance hero banner & 246 build stats
│   │   ├── HeroSection.css
│   │   ├── SearchBar.jsx          # Live search & tech stack multi-filter bar
│   │   ├── SearchBar.css
│   │   ├── ProjectCard.jsx        # Hover scale/tilt project card
│   │   ├── ProjectCard.css
│   │   ├── ProjectModal.jsx       # AnimatePresence backdrop modal dialog
│   │   ├── ProjectModal.css
│   │   ├── CategoryFilter.jsx     # Animated category tab strip
│   │   └── CategoryFilter.css
│   ├── data/
│   │   └── buildsData.js          # Public 246 builds metadata
│   ├── styles/
│   │   └── index.css              # Dark glassmorphic design tokens
│   ├── App.jsx                    # Main portfolio layout coordinator
│   ├── App.css
│   └── main.jsx                   # React application entry point
├── AGENTS.md                      # Master SOP Guidelines (copied & enforced)
├── BUILD_NOTES.md                 # Append-only iteration log
├── CHANGELOG.md                   # Technical version history
├── README.md                      # System overview & live documentation
├── LICENSE                        # Official MIT License
├── package.json                   # Project dependencies & build scripts
├── vite.config.js                 # Vite configuration
├── vercel.json                    # Vercel SPA routing configuration
└── .gitignore                     # SOP exclusion rules
```

---

## 🧩 Key Features

1. **🔍 Live Search & Tech Multi-Filter Bar (`SearchBar.jsx`)**:
   - Real-time text query search across build numbers, project titles, descriptions, categories, and tech stack tags. Multi-select technology chips with active glow indicators and one-click reset handles.
2. **🚀 Framer Motion Glassmorphic Navbar (`Navbar.jsx`)**:
   - Floating navigation bar with `layoutId` active pill animations, section switching, and GitHub repo links.
3. **✨ Staggered Hero Section (`HeroSection.jsx`)**:
   - Hero banner with staggered Framer Motion variants, gradient headings, and interactive 246 build stats cards (`whileHover` scale & spring physics).
4. **🃏 Hover Scale & Tilt Cards (`ProjectCard.jsx`)**:
   - Animated project grid cards with `whileHover={{ y: -8, scale: 1.02 }}`, category pills, tech stack chips, and direct production Vercel / GitHub links.
5. **🪟 AnimatePresence Detail Modal (`ProjectModal.jsx`)**:
   - Fullscreen backdrop blur modal powered by Framer Motion `<AnimatePresence>` with spring scale keyframes and keyboard `ESC` dismissal.
6. **🗂️ Animated Category Filter Strip (`CategoryFilter.jsx`)**:
   - Horizontal category filter bar with `layoutId` animated selection pill backgrounds.

---

## 📄 Data Handling

This portfolio operates 100% client-side using public repository metadata. No user inputs, cookies, or telemetry logs are stored or transmitted.

---

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.
