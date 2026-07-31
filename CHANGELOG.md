# Changelog

All notable changes to **Build 55 (Framer Motion Animated Portfolio — 246 Builds Showcase)** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v1.8.0.html).

## [2.3.0] - 2026-07-31

### Added
- Integrated **100% Full-Screen High-Resolution Interactive Sandbox Modal (`FullSandboxModal.jsx`, `FullSandboxModal.css`)**.
- Built 98vw x 96vh edge-to-edge full-screen sandbox overlay with Desktop, Tablet, and Mobile device preview toggles.
- Added blue "100% Fullscreen Sandbox" trigger button to all sandbox embed headers (`SandboxEmbed.jsx`, `ProjectModal.jsx`).

## [2.2.0] - 2026-07-31

### Added
- Updated contact email in `ContactBookingModal.jsx` to `breakingthebot@gmail.com` and removed LinkedIn links.
- Enlarged live interactive sandbox viewport: increased default iframe height to `720px` and expanded mode to `880px` (`SandboxEmbed.css`).
- Scaled modal card max-width to `1280px` and body max-height to `88vh` (`ProjectModal.css`).

## [2.1.0] - 2026-07-31

### Added
- Integrated **Recruiter Direct Contact & Interview Scheduling Modal (`ContactBookingModal.jsx`, `ContactBookingModal.css`)**.
- Built recruiter contact modal featuring direct email, LinkedIn, and GitHub contact cards, inquiry category selectors (*Full-Time Role*, *Technical Advisory*, *Contract/Consulting*), form validation, and toast submission confirmation.
- Added "Hire / Contact" trigger button to top floating navigation bar (`Navbar.jsx`).

## [2.0.0] - 2026-07-31

### Added
- Integrated **Authentic Senior Engineering Executive Bio & Factual Scale Metrics (`ExecutiveHero.jsx`, `ExecutiveHero.css`)**.
- Built 100% factually accurate executive hero section featuring green pulsing availability status badge, authentic metric cards (*55 Completed Open-Source Builds*, *34 Live Deployed Vercel Web Apps*, *10 Core Stacks*, *100% Verified Build Success Rate*), tech stack pills, and export triggers.

## [1.19.0] - 2026-07-31

### Added
- Integrated **100% Real Flagship Repository Alignment for Case Studies (`caseStudiesData.js`)**.
- Matched Case Study 1 to Build #55 (Framer Motion Animated Portfolio & Showcase Engine).
- Matched Case Study 2 to Build #54 (Styled Components Theme-able UI Kit).
- Matched Case Study 3 to Build #52 (ApexAdmin Enterprise Tailwind CSS Admin Dashboard).

## [1.18.0] - 2026-07-31

### Added
- Integrated **Live Production App Deployment Links for Enterprise Case Studies (`caseStudiesData.js`)**.
- Connected Case Study 1 to Build 52 ApexAdmin Dashboard (`https://tailwind-admin-dashboard-build52.vercel.app`).
- Connected Case Study 2 to Build 53 ModulaUI Library (`https://react-css-modules-library-build53-pvl71zvas.vercel.app`).
- Connected Case Study 3 to Build 54 Styled Components UI Kit (`https://styled-components-theme-uikit-build54.vercel.app`).

## [1.17.0] - 2026-07-31

### Added
- Integrated **Enterprise System Architecture Case Studies & Flowchart Explorer (`caseStudiesData.js`, `CaseStudyCard.jsx`, `CaseStudyModal.jsx`)**.
- Built enterprise case study cards featuring scale metrics (*150k RPS*, *12ms P99*, *99.99% SLA*, *4.2 TB/Day*).
- Created interactive deep-dive modal with Executive Summaries, Problem & Solution blocks, System Topology Flowcharts, Code Highlights, and SLA Benchmarks.

## [1.16.0] - 2026-07-31

### Added
- Integrated **Live Interactive Build Search History & Recent Searches Pill Bar (`SearchHistory.jsx`, `SearchHistory.css`)**.
- Persists up to 8 unique recent search queries in browser `localStorage` (`build_55_recent_searches`).
- Rendered clickable query chips, individual query remove controls (`X`), and clear history button.

## [1.15.0] - 2026-07-31

### Added
- Integrated **Keyboard Shortcuts & Command Palette Quick Navigator (`CommandPalette.jsx`, `CommandPalette.css`)**.
- Added global `Cmd+K` / `Ctrl+K` keydown listener to trigger the command runner overlay from anywhere in the app.
- Added keyboard selection navigation (`Up`/`Down`/`Enter`/`Esc`), live search across 55 builds, and quick system action shortcuts.

## [1.14.0] - 2026-07-31

### Added
- Integrated **Expanded High-Resolution Live App Sandbox Viewport (`SandboxEmbed.jsx`, `SandboxEmbed.css`, `ProjectModal.css`)**.
- Expanded `ProjectModal` max-width from `640px` to `1080px` (`82vh` body scroll height).
- Increased default `SandboxEmbed` iframe height from `380px` to `580px`.
- Added interactive Full-Screen Expand toggle button (`Maximize2` / `Minimize2`) scaling iframe height up to `740px`.

## [1.13.0] - 2026-07-31

### Added
- Integrated **Web Audio API Micro-interaction Sound Design System (`soundFX.js`, `SoundToggle.jsx`)**.
- Built zero-dependency WebAudio oscillator tone generators for button clicks, heart bookmarks, tab navigation swooshes, theme laser sweeps, and modal spring pops.
- Added global `SoundToggle` button in `Navbar.jsx` with `localStorage` state persistence.

## [1.12.0] - 2026-07-31

### Added
- Integrated **Selective Vercel & GitHub Link Guarding (`ProjectCard.jsx`, `ProjectModal.jsx`, `TimelineView.jsx`)**.
- Verified 34 builds with live Vercel deployments and 21 earlier CLI/backend builds with GitHub links only.
- Added conditional rendering to hide Live Demo buttons and iframe sandboxes when `demoUrl` is absent, cleanly rendering GitHub links.

## [1.11.0] - 2026-07-31

### Added
- Integrated **Full 55 Builds Catalog Dataset (`extracted_builds.json`, `buildsData.js`)**.
- Expanded showcase catalog from 11 sample repos to all 55 completed builds in the series (Build 1 through Build 55).
- Extracted public titles, descriptions, tech stack tags, GitHub URLs, and live demo links for all 55 projects.

## [1.10.0] - 2026-07-31

### Added
- Integrated **Interactive Build Analytics & Technology Distribution Matrix (`AnalyticsModal.jsx`)**.
- Added dynamic calculation of tech stack frequency, domain category counts, total integrations, and architecture depth badges.
- Added animated bar chart visualizers and stat metrics cards with responsive CSS grid layout.

## [1.9.0] - 2026-07-31

### Added
- Integrated **Interactive Custom Portfolio Showcase Collections & Bookmark Manager (`CollectionsModal.jsx`)**.
- Added heart icon bookmark toggle button to `ProjectCard.jsx` and `ProjectModal.jsx` with Framer Motion animations.
- Added custom playlist creation, bookmark organization, local storage persistence, JSON backup export, and Markdown summary clipboard copying.

## [1.8.0] - 2026-07-31

### Added
- Integrated **Interactive Live Component Sandbox Embed (`SandboxEmbed.jsx`)**.
- Added live iframe preview widget inside `ProjectModal.jsx` allowing users to test live deployed web applications without leaving the modal.
- Added responsive device viewport controls (`Desktop`, `Tablet`, `Mobile`), loading state spinners, and iframe refresh triggers.

## [1.7.0] - 2026-07-31

### Added
- Integrated **Exportable Portfolio PDF & JSON Summary Generator (`PortfolioExport.jsx`)**.

## [1.6.0] - 2026-07-31

### Added
- Integrated **Interactive Code Snippet & Architecture Inspector (`CodeInspector.jsx`)**.

## [1.5.0] - 2026-07-31

### Added
- **MILESTONE RELEASE v1.5.0**: Integrated **Custom Theme Mode Switcher & Particle Background Canvas (`ThemeSwitcher.jsx`, `ParticleCanvas.jsx`)**.

## [1.4.0] - 2026-07-31

### Added
- Integrated **Interactive Build Comparison Matrix Modal (`CompareModal.jsx`)**.

## [1.3.0] - 2026-07-31

### Added
- Integrated **Framer Motion Animated Timeline View (`TimelineView.jsx`)**.

## [1.2.0] - 2026-07-31

### Added
- Integrated **Animated Interactive Skill Radar & Progress Gauges (`SkillRadar.jsx`)**.

## [1.1.0] - 2026-07-31

### Added
- Integrated **Interactive Search & Tech Stack Multi-Filter Bar (`SearchBar.jsx`)**.

## [1.0.0] - 2026-07-31

### Added
- Initial release of **Build 55: Framer Motion Animated Portfolio (246 Builds Showcase)**.
- Implemented **Framer Motion Glassmorphic Navbar (`Navbar.jsx`)** with `layoutId` pill animations.
- Implemented **Hero Banner (`HeroSection.jsx`)** with staggered text entry and live 246 build stats cards.
- Implemented **Interactive Project Grid (`ProjectCard.jsx`)** with hover scale/tilt animations, tech chips, live Vercel links, and GitHub repos.
- Implemented **Category Filter Bar (`CategoryFilter.jsx`)** with animated selection pill backgrounds.
- Implemented **Interactive Detail Modal (`ProjectModal.jsx`)** powered by `<AnimatePresence>` with backdrop blur and keyboard `ESC` dismissal.
- Added master 404-line `AGENTS.md` and MIT `LICENSE`.
