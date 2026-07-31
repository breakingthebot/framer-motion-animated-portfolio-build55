// src/App.jsx
// Main Interactive Portfolio for Build 55: 246 Builds Framer Motion Showcase.
// Connects to: src/components/*, src/data/buildsData.js
// Created: 2026-07-31

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProjectCard } from './components/ProjectCard';
import { ProjectModal } from './components/ProjectModal';
import { CategoryFilter } from './components/CategoryFilter';
import { SearchBar } from './components/SearchBar';
import { SkillRadar } from './components/SkillRadar';
import { TimelineView } from './components/TimelineView';
import { CompareModal } from './components/CompareModal';
import { PortfolioExport } from './components/PortfolioExport';
import { ParticleCanvas } from './components/ParticleCanvas';
import { CollectionsModal } from './components/CollectionsModal';
import { AnalyticsModal } from './components/AnalyticsModal';
import { CommandPalette } from './components/CommandPalette';
import { buildsList } from './data/buildsData';
import { Code2, Layers, ExternalLink, Github, LayoutGrid, GitCommit, ArrowRightLeft, Download, Bookmark, BarChart3, Command } from 'lucide-react';
import './App.css';

/**
 * Main App component orchestrating the 246 builds showcase portfolio.
 */
export function App() {
  const [activeSection, setActiveSection] = useState('featured');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTech, setSelectedTech] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [isCmdPaletteOpen, setIsCmdPaletteOpen] = useState(false);
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'timeline'
  const [themeMode, setThemeMode] = useState('cyber-dark'); // 'cyber-dark' | 'neon-light'

  // Bookmarks stored in localStorage
  const [bookmarkedIds, setBookmarkedIds] = useState(() => {
    const saved = localStorage.getItem('build_55_bookmarks');
    return saved ? JSON.parse(saved) : [55, 54, 50];
  });

  // Global Cmd+K / Ctrl+K Keydown listener
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCmdPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeMode);
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === 'cyber-dark' ? 'neon-light' : 'cyber-dark'));
  };

  /**
   * Toggles bookmark status for a given build ID.
   * @param {number} id - Build ID to toggle.
   */
  const handleToggleBookmark = (id) => {
    setBookmarkedIds((prev) => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter((bId) => bId !== id) : [...prev, id];
      localStorage.setItem('build_55_bookmarks', JSON.stringify(updated));
      return updated;
    });
  };

  const handleTechToggle = (tech) => {
    setSelectedTech((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedTech([]);
    setSelectedCategory('All Categories');
    setOnlyBookmarked(false);
  };

  const filteredBuilds = buildsList.filter((b) => {
    // 0. Only Bookmarked Filter
    if (onlyBookmarked && !bookmarkedIds.includes(b.id)) {
      return false;
    }

    // 1. Category Filter
    if (selectedCategory !== 'All Categories' && b.category !== selectedCategory) {
      return false;
    }

    // 2. Search Query Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = b.title.toLowerCase().includes(q);
      const matchDesc = b.description.toLowerCase().includes(q);
      const matchCat = b.category.toLowerCase().includes(q);
      const matchBuild = `build ${b.buildNumber}`.includes(q) || `#${b.buildNumber}`.includes(q);
      const matchTech = b.tech.some((t) => t.toLowerCase().includes(q));

      if (!matchTitle && !matchDesc && !matchCat && !matchBuild && !matchTech) {
        return false;
      }
    }

    // 3. Tech Stack Chips Filter
    if (selectedTech.length > 0) {
      const hasAllTech = selectedTech.every((st) =>
        b.tech.some((t) => t.toLowerCase().includes(st.toLowerCase()))
      );
      if (!hasAllTech) return false;
    }

    return true;
  });

  return (
    <div className="app-layout">
      {/* AMBIENT PARTICLE BACKGROUND CANVAS (NEW v1.5.0) */}
      <ParticleCanvas themeMode={themeMode} />

      {/* GLASSMORPHIC NAVBAR */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        themeMode={themeMode}
        onToggleTheme={toggleTheme}
        onOpenCmdPalette={() => setIsCmdPaletteOpen(true)}
      />

      {/* HERO BANNER */}
      <HeroSection />

      {/* MAIN CONTAINER */}
      <main className="main-content">
        {/* SECTION 1: CATALOG & SEARCH BAR */}
        <section id="catalog" className="section-container">
          <div className="section-header">
            <h2 className="section-title">
              <Code2 className="title-icon" /> 246 Build Index &amp; Repository Showcase
            </h2>

            <div className="header-right-actions">
              {/* CMD+K QUICK NAVIGATOR BUTTON (NEW v1.15.0) */}
              <button
                className="cmd-trigger-btn"
                onClick={() => setIsCmdPaletteOpen(true)}
                title="Open Command Palette (Cmd+K / Ctrl+K)"
              >
                <Command size={14} /> ⌘K Quick Nav
              </button>

              {/* ANALYTICS & STATS MATRIX BUTTON (NEW v1.10.0) */}
              <button
                className="analytics-trigger-btn"
                onClick={() => setIsAnalyticsOpen(true)}
                title="View Technology & Ecosystem Analytics"
              >
                <BarChart3 size={14} /> Analytics &amp; Stats
              </button>

              {/* BOOKMARKS & CUSTOM PLAYLISTS BUTTON (NEW v1.9.0) */}
              <button
                className="collections-trigger-btn"
                onClick={() => setIsCollectionsOpen(true)}
                title="Manage Bookmarked Builds & Playlists"
              >
                <Bookmark size={14} /> Saved &amp; Playlists ({bookmarkedIds.length})
              </button>

              {/* EXPORT PORTFOLIO BUTTON (NEW v1.7.0) */}
              <button
                className="export-trigger-btn"
                onClick={() => setIsExportOpen(true)}
              >
                <Download size={14} /> Export Dataset
              </button>

              {/* COMPARE BUILDS BUTTON (NEW v1.4.0) */}
              <button
                className="compare-trigger-btn"
                onClick={() => setIsCompareOpen(true)}
              >
                <ArrowRightLeft size={14} /> Compare Builds
              </button>

              <span className="build-count-badge">
                Showing {filteredBuilds.length} Featured Repos
              </span>

              {/* VIEW MODE TOGGLE (NEW v1.3.0) */}
              <div className="view-mode-toggle">
                <button
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  title="Grid View"
                >
                  <LayoutGrid size={15} /> Grid
                </button>
                <button
                  className={`view-btn ${viewMode === 'timeline' ? 'active' : ''}`}
                  onClick={() => setViewMode('timeline')}
                  title="Timeline View"
                >
                  <GitCommit size={15} /> Timeline
                </button>
              </div>
            </div>
          </div>

          {/* SEARCH & TECH FILTER BAR (NEW v1.1.0) */}
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedTech={selectedTech}
            onTechToggle={handleTechToggle}
            onClearFilters={handleClearFilters}
          />

          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          {filteredBuilds.length === 0 ? (
            <motion.div
              className="empty-search-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p>No builds match your active search filters.</p>
              <button className="reset-search-btn" onClick={handleClearFilters}>
                Reset Search Filters
              </button>
            </motion.div>
          ) : viewMode === 'timeline' ? (
            <TimelineView
              projects={filteredBuilds}
              onSelect={setSelectedProject}
            />
          ) : (
            <motion.div className="projects-grid" layout>
              <AnimatePresence mode="popLayout">
                {filteredBuilds.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onSelect={setSelectedProject}
                    isBookmarked={bookmarkedIds.includes(project.id)}
                    onToggleBookmark={handleToggleBookmark}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </section>

        {/* SECTION 2: TECH STACK MATRIX (SCROLL ANIMATED) */}
        <motion.section
          id="tech"
          className="section-container tech-matrix-section"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="section-header">
            <h2 className="section-title">
              <Layers className="title-icon" /> Architecture &amp; Technology Matrix
            </h2>
          </div>

          <div className="tech-cards-grid">
            <div className="tech-matrix-card">
              <h3>🎨 Modern Frontend Frameworks</h3>
              <p>React 19, Vue 3, Angular 19, Svelte 5, Next.js, Remix, Vite, Ionic</p>
            </div>

            <div className="tech-matrix-card">
              <h3>💄 CSS Architectures &amp; UI Kits</h3>
              <p>styled-components, CSS Modules, TailwindCSS v3, Vanilla Glassmorphism, Framer Motion</p>
            </div>

            <div className="tech-matrix-card">
              <h3>🧩 Web Components &amp; Minimal JS</h3>
              <p>Lit 3.x, Shadow DOM, Alpine.js 3.x, HTMX Server Fragments, Web Components</p>
            </div>

            <div className="tech-matrix-card">
              <h3>⚙️ Native &amp; Systems Languages</h3>
              <p>Python (async/data), Go, Rust, C#, Java, Swift, Kotlin, Lua, Node.js Express</p>
            </div>
          </div>

          {/* SKILL RADAR & PROGRESS GAUGES (NEW v1.2.0) */}
          <SkillRadar />
        </motion.section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-content">
          <p>
            Public index &amp; portfolio for the <strong>246 Builds Series</strong>. Live on Vercel &amp; GitHub.
          </p>
          <div className="footer-links">
            <a href="https://github.com/breakingthebot/286-builds" target="_blank" rel="noopener noreferrer">
              <Github size={14} /> Master Repo
            </a>
            <a href="https://breakingthebot.github.io/286-builds-dashboard/" target="_blank" rel="noopener noreferrer">
              <ExternalLink size={14} /> Builds Dashboard
            </a>
          </div>
        </div>
      </footer>

      {/* INTERACTIVE DETAIL MODAL */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        isBookmarked={selectedProject ? bookmarkedIds.includes(selectedProject.id) : false}
        onToggleBookmark={handleToggleBookmark}
      />

      {/* SIDE-BY-SIDE BUILD COMPARISON MODAL (NEW v1.4.0) */}
      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        builds={buildsList}
      />

      {/* EXPORT PORTFOLIO MODAL (NEW v1.7.0) */}
      <PortfolioExport
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />

      {/* BOOKMARKS & PLAYLISTS MODAL (NEW v1.9.0) */}
      <CollectionsModal
        isOpen={isCollectionsOpen}
        onClose={() => setIsCollectionsOpen(false)}
        bookmarkedIds={bookmarkedIds}
        onToggleBookmark={handleToggleBookmark}
        builds={buildsList}
        onSelectProject={setSelectedProject}
      />

      {/* BUILD ANALYTICS & TECH DISTRIBUTION MATRIX MODAL (NEW v1.10.0) */}
      <AnalyticsModal
        isOpen={isAnalyticsOpen}
        onClose={() => setIsAnalyticsOpen(false)}
        builds={buildsList}
      />

      {/* CMD+K COMMAND PALETTE QUICK NAVIGATOR MODAL (NEW v1.15.0) */}
      <CommandPalette
        isOpen={isCmdPaletteOpen}
        onClose={() => setIsCmdPaletteOpen(false)}
        builds={buildsList}
        onSelectProject={setSelectedProject}
        onToggleTheme={toggleTheme}
        onOpenAnalytics={() => setIsAnalyticsOpen(true)}
        onOpenPlaylists={() => setIsCollectionsOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
        themeMode={themeMode}
      />
    </div>
  );
}
