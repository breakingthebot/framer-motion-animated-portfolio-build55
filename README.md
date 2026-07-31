# Build 55: Framer Motion Animated Portfolio (246 Builds Showcase)

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Live%20Demo-000000?style=for-the-badge&logo=vercel)](https://framer-motion-animated-portfolio-build55.vercel.app)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/breakingthebot/framer-motion-animated-portfolio-build55)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![Framer Motion](https://img.shields.io/badge/Framer--Motion-Animations-0055FF?style=for-the-badge&logo=framer)](https://framer.com/motion)
[![Release](https://img.shields.io/badge/Release-v2.3.0-indigo?style=for-the-badge)](CHANGELOG.md)

---

## 🌟 Overview

**Framer Motion Animated Portfolio (Build 55)** is an interactive, theme-switchable glassmorphism portfolio application engineered with **React 19**, **Framer Motion**, and **Vite** celebrating the entire **246 Daily Coding Builds** ecosystem.

Designed to showcase the broad portfolio of daily coding builds—ranging from React, Vue 3, Svelte 5, Angular, and Lit 3.x Web Components to HTMX, Alpine.js, styled-components, Python, Go, and Rust—this application delivers dynamic Framer Motion page transitions, Cmd+K / Ctrl+K command palette quick navigator (`CommandPalette.jsx`), Web Audio API UI sound design effects (`soundFX.js`, `SoundToggle.jsx`), ecosystem analytics & tech stack distribution matrices (`AnalyticsModal.jsx`), bookmarked build playlists & custom collection builders (`CollectionsModal.jsx`), live interactive iframe component sandboxes, JSON & PDF portfolio summary export generators, code snippet architecture inspectors, theme mode switching (Cyberpunk Dark & Neon Light), ambient particle canvas backgrounds, side-by-side repository comparison matrices, real-time live search & tech stack multi-filtering, animated skill radar charts & progress gauges, chronological timeline feed views, scroll animations, layout reordering, hover scale/tilt card physics, and interactive modal overlays.

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
│   │   ├── Navbar.jsx             # Glassmorphic floating nav with layoutId pills & audio toggle
│   │   ├── Navbar.css
│   │   ├── CommandPalette.jsx     # Cmd+K / Ctrl+K quick command runner modal
│   │   ├── CommandPalette.css
│   │   ├── SoundToggle.jsx        # Global Web Audio sound effects mute/unmute toggle
│   │   ├── SoundToggle.css
│   │   ├── ThemeSwitcher.jsx      # Framer Motion sliding theme mode toggle button
│   │   ├── ThemeSwitcher.css
│   │   ├── ParticleCanvas.jsx     # Ambient HTML5 canvas particle generator
│   │   ├── HeroSection.jsx        # Staggered entrance hero banner & 246 build stats
│   │   ├── HeroSection.css
│   │   ├── SearchBar.jsx          # Live search & tech stack multi-filter bar
│   │   ├── SearchBar.css
│   │   ├── SkillRadar.jsx         # Interactive SVG radar chart & progress gauges
│   │   ├── SkillRadar.css
│   │   ├── TimelineView.jsx       # Chronological timeline milestone feed
│   │   ├── TimelineView.css
│   │   ├── CompareModal.jsx       # Side-by-side build comparison matrix modal
│   │   ├── CompareModal.css
│   │   ├── CodeInspector.jsx      # Collapsible architectural code snippet viewer
│   │   ├── CodeInspector.css
│   │   ├── SandboxEmbed.jsx       # Live iframe sandbox preview widget
│   │   ├── SandboxEmbed.css
│   │   ├── PortfolioExport.jsx    # JSON & PDF portfolio summary exporter
│   │   ├── PortfolioExport.css
│   │   ├── CollectionsModal.jsx   # Custom playlist & bookmark manager modal
│   │   ├── CollectionsModal.css
│   │   ├── AnalyticsModal.jsx     # Ecosystem insights & tech distribution matrix
│   │   ├── AnalyticsModal.css
│   │   ├── ProjectCard.jsx        # Hover scale/tilt project card with heart toggle
│   │   ├── ProjectCard.css
│   │   ├── ProjectModal.jsx       # AnimatePresence backdrop modal dialog
│   │   ├── ProjectModal.css
│   │   ├── CategoryFilter.jsx     # Animated category tab strip
│   │   └── CategoryFilter.css
│   ├── utils/
│   │   └── soundFX.js             # Zero-dependency Web Audio API synthesizer
│   ├── data/
│   │   └── buildsData.js          # Public 55 builds metadata
│   ├── styles/
│   │   └── index.css              # Dark/Light glassmorphic design tokens
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

1. **⌨️ Keyboard Shortcuts & Command Palette (`CommandPalette.jsx`)**:
   - Global `Cmd+K` / `Ctrl+K` command runner overlay for power users. Supports live search across all 55 builds, keyboard navigation (`Up`/`Down`/`Enter`/`Esc`), and quick system action triggers.
2. **🔊 Web Audio API Micro-interaction Sound Design (`soundFX.js`, `SoundToggle.jsx`)**:
   - Zero-dependency Web Audio API synthesizer producing tactile audio feedback for button clicks, heart bookmarks, tab navigation swooshes, theme laser sweeps, and modal spring pops.
3. **📊 Build Analytics & Tech Distribution Matrix (`AnalyticsModal.jsx`)**:
   - Interactive data visualizer modal computing real-time ecosystem stats: technology stack frequency, domain category breakdown, total integrations, flagship showcase counts, and architecture depth badges.
4. **❤️ Bookmarked Builds & Playlists Manager (`CollectionsModal.jsx`)**:
   - Save favorite builds with heart bookmark buttons on cards or inside project detail modals. Organize saved builds into custom named playlists, export JSON backups, and copy formatted Markdown summaries.
5. **🎮 Live App Interactive Sandbox Embed (`SandboxEmbed.jsx`)**:
   - Embedded iframe sandbox widget inside `ProjectModal.jsx` allowing users to interact with live deployed web applications without leaving the modal. Features responsive device viewports, iframe refresh triggers, and loading spinners.
6. **🏷️ Portfolio JSON & PDF Exporter (`PortfolioExport.jsx`)**:
   - Instant browser blob downloader exporting complete structured JSON metadata for all repositories, GitHub links, and live Vercel deployments. Printable PDF summary sheet generator.
7. **💻 Code Snippet Architecture Inspector (`CodeInspector.jsx`)**:
   - Collapsible code snippet inspector inside `ProjectModal.jsx` showcasing component imports, design tokens, and architectural pattern highlights with one-click copy feedback.
8. **🌙 Theme Switcher & Particle Canvas (`ThemeSwitcher.jsx`, `ParticleCanvas.jsx`)**:
   - Framer Motion sliding theme toggle switching between **Cyberpunk Dark** and **Neon Light** modes. Floating HTML5 canvas ambient particle background.
9. **🎛️ Side-by-Side Build Comparison Matrix (`CompareModal.jsx`)**:
   - Interactive modal allowing users to select any 2 builds from the 246 series dropdown selectors and compare build numbers, title headers, categories, architecture depth, tech stacks, GitHub repos, and live deployments.
10. **📇 Framer Motion Animated Timeline View (`TimelineView.jsx`)**:
   - Vertical timeline milestone feed with glowing node dots, build numbers, depth tags, title headers, technology chips, and live links.


---

## 📄 Data Handling

This portfolio operates 100% client-side using public repository metadata. User bookmarks, custom playlists, and sound preferences are stored in local browser storage (`localStorage`). No telemetry or personal data is collected or shared.

---

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.
