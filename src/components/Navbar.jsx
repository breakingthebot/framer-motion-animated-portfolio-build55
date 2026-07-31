// src/components/Navbar.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Code2, Layers, Github } from 'lucide-react';
import './Navbar.css';

export const Navbar = ({ activeSection, setActiveSection }) => {
  const navLinks = [
    { id: 'featured', label: 'Featured Builds', icon: Sparkles },
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
                onClick={() => setActiveSection(link.id)}
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
    </motion.nav>
  );
};
