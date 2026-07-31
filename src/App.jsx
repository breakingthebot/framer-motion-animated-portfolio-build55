// src/App.jsx
// Main Interactive Portfolio for Build 55: 246 Builds Framer Motion Showcase.
// Created: 2026-07-31

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProjectCard } from './components/ProjectCard';
import { ProjectModal } from './components/ProjectModal';
import { CategoryFilter } from './components/CategoryFilter';
import { SearchBar } from './components/SearchBar';
import { buildsList } from './data/buildsData';
import { Code2, Layers, ExternalLink, Github } from 'lucide-react';
import './App.css';

export function App() {
  const [activeSection, setActiveSection] = useState('featured');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTech, setSelectedTech] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleTechToggle = (tech) => {
    setSelectedTech((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedTech([]);
    setSelectedCategory('All Categories');
  };

  const filteredBuilds = buildsList.filter((b) => {
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
      {/* GLASSMORPHIC NAVBAR */}
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

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
            <span className="build-count-badge">
              Showing {filteredBuilds.length} Featured Repos
            </span>
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
          ) : (
            <motion.div className="projects-grid" layout>
              <AnimatePresence mode="popLayout">
                {filteredBuilds.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onSelect={setSelectedProject}
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
      />
    </div>
  );
}
