// src/components/ExecutiveHero.jsx
// Authentic Senior Full-Stack Engineering Executive Hero Banner.
// Connects to: src/components/HeroSection.jsx, src/App.jsx
// Created: 2026-07-31

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Code2, Layers, Download, Calendar, Mail, CheckCircle2, ShieldCheck, Terminal, Github, ExternalLink } from 'lucide-react';
import { playClickSound } from '../utils/soundFX';
import './ExecutiveHero.css';

/**
 * Renders an authentic, 100% factually accurate Senior Full-Stack Engineering Executive Hero banner.
 * @param {Object} props
 * @param {Function} props.onOpenExport - Callback to open dataset export modal.
 * @param {Function} props.onOpenCmdPalette - Callback to open Cmd+K command palette.
 */
export function ExecutiveHero({ onOpenExport, onOpenCmdPalette }) {
  return (
    <div className="exec-hero-container">
      <div className="exec-hero-content">
        {/* AVAILABILITY STATUS BADGE */}
        <motion.div
          className="exec-status-badge"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <span className="status-dot-ping" />
          <span className="status-text">Available for Senior / Principal Engineering Roles &amp; Contracts</span>
        </motion.div>

        {/* MAIN HEADLINE */}
        <motion.h1
          className="exec-headline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Senior Full-Stack &amp; Systems Software Engineer
        </motion.h1>

        {/* SUBTITLE */}
        <motion.p
          className="exec-subheadline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Architecting resilient web applications, multi-framework design systems, and event-driven architectures across <strong>React 19</strong>, <strong>Vue 3</strong>, <strong>Svelte 5</strong>, <strong>Lit 3 Web Components</strong>, <strong>Tailwind CSS</strong>, <strong>Go</strong>, and <strong>Python</strong>.
        </motion.p>

        {/* 100% FACTUAL STATS STRIP */}
        <motion.div
          className="exec-stats-grid"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="exec-stat-card">
            <span className="stat-num">55</span>
            <span className="stat-lbl">Completed Open-Source Builds</span>
          </div>

          <div className="exec-stat-card">
            <span className="stat-num highlight">34</span>
            <span className="stat-lbl">Live Production Deployed Apps</span>
          </div>

          <div className="exec-stat-card">
            <span className="stat-num">10+</span>
            <span className="stat-lbl">Core Tech Stacks Mastered</span>
          </div>

          <div className="exec-stat-card">
            <span className="stat-num">100%</span>
            <span className="stat-lbl">Verified Build Success Rate</span>
          </div>
        </motion.div>

        {/* ACTION BUTTONS */}
        <motion.div
          className="exec-actions-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a
            href="#casestudies"
            className="exec-btn primary"
            onClick={() => playClickSound()}
          >
            <Sparkles size={16} /> Explore System Architecture Case Studies
          </a>

          <button
            className="exec-btn secondary"
            onClick={() => {
              playClickSound();
              if (onOpenExport) onOpenExport();
            }}
          >
            <Download size={16} /> Export Portfolio Summary (PDF/JSON)
          </button>

          <a
            href="https://github.com/breakingthebot"
            target="_blank"
            rel="noopener noreferrer"
            className="exec-btn outline"
          >
            <Github size={16} /> GitHub Profile
          </a>
        </motion.div>

        {/* FEATURED TECH PILLS */}
        <motion.div
          className="exec-tech-strip"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <span className="tech-strip-label">Core Stacks:</span>
          <div className="tech-pills-wrap">
            <span className="tech-pill">React 19</span>
            <span className="tech-pill">Framer Motion</span>
            <span className="tech-pill">Vue 3</span>
            <span className="tech-pill">Svelte 5</span>
            <span className="tech-pill">Lit 3.x Web Components</span>
            <span className="tech-pill">TailwindCSS v3</span>
            <span className="tech-pill">styled-components</span>
            <span className="tech-pill">Python</span>
            <span className="tech-pill">Go</span>
            <span className="tech-pill">Vite</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
