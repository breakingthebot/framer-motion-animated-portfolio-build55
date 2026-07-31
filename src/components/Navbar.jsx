// src/components/Navbar.jsx
// Glassmorphic Navbar with navigation tabs, ThemeSwitcher, SoundToggle, and active pill animations.
// Connects to: src/App.jsx, src/components/ThemeSwitcher.jsx, src/components/SoundToggle.jsx
// Created: 2026-07-31

import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Sparkles, Code2, Layers, Github } from 'lucide-react';
import { ThemeSwitcher } from './ThemeSwitcher';
import { SoundToggle } from './SoundToggle';
import { playTabSound } from '../utils/soundFX';
import './Navbar.css';

/**
 * Renders top floating navigation bar with layoutId active pill animations, theme switcher, and sound toggle.
 */
export const Navbar = ({ activeSection, setActiveSection, themeMode, onToggleTheme }) => {
  const navLinks = [
    { id: 'casestudies', label: 'Enterprise Case Studies', icon: Cpu },
    { id: 'featured', label: 'Featured Repos', icon: Sparkles },
    { id: 'catalog', label: '246 Build Index', icon: Code2 },
    { id: 'tech', label: 'Tech Stack', icon: Layers },
  ];

  return (
    <motion.nav 
      className="navbar"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="nav-container">
        <div className="nav-brand">
          <div className="logo-icon">🚀</div>
          <div className="brand-text">
            <span className="brand-title">246 Builds</span>
            <span className="brand-subtitle">Portfolio &amp; Showcase</span>
          </div>
        </div>

        <div className="nav-links">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                className={`nav-link-btn ${isActive ? 'active' : ''}`}
                onClick={() => {
                  playTabSound();
                  setActiveSection(link.id);
                }}
              >
                <Icon size={16} />
                <span>{link.label}</span>
                {isActive && (
                  <motion.div
                    className="active-pill"
                    layoutId="activePill"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="nav-right-group" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <SoundToggle />
          <ThemeSwitcher themeMode={themeMode} onToggleTheme={onToggleTheme} />

          <a
            href="https://github.com/breakingthebot"
            target="_blank"
            rel="noopener noreferrer"
            className="github-btn"
          >
            <Github size={16} />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </motion.nav>
  );
};

