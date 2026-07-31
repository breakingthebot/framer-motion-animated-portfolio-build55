// src/components/ProjectCard.jsx
// Interactive build card component showcasing individual project builds.
// Connects to: src/App.jsx, src/components/CollectionsModal.jsx
// Created: 2026-07-31

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Sparkles, Layers, Heart } from 'lucide-react';
import './ProjectCard.css';

/**
 * Renders an interactive project build card with hover tilt, tech stack tags, and bookmark toggle.
 * @param {Object} props
 * @param {Object} props.project - Build item data.
 * @param {Function} props.onSelect - Callback when clicking card to view details.
 * @param {boolean} [props.isBookmarked=false] - Whether this build is bookmarked.
 * @param {Function} [props.onToggleBookmark] - Callback when clicking the heart bookmark button.
 */
export const ProjectCard = ({ project, onSelect, isBookmarked = false, onToggleBookmark }) => {
  return (
    <motion.div
      className="project-card"
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      onClick={() => onSelect(project)}
    >
      <div className="card-top">
        <div className="build-badge">
          <span>Build #{project.buildNumber}</span>
          {project.featured && (
            <span className="featured-pill">
              <Sparkles size={11} /> Featured
            </span>
          )}
        </div>
        <div className="card-top-right">
          <button
            className={`bookmark-heart-btn ${isBookmarked ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              if (onToggleBookmark) onToggleBookmark(project.id);
            }}
            title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Build'}
          >
            <Heart
              size={15}
              fill={isBookmarked ? '#ef4444' : 'none'}
              color={isBookmarked ? '#ef4444' : 'currentColor'}
            />
          </button>
          <span className="depth-tag">{project.depth} Build</span>
        </div>
      </div>

      <h3 className="card-title">{project.title}</h3>
      <p className="card-category"><Layers size={13} /> {project.category}</p>
      <p className="card-desc">{project.description}</p>

      <div className="tech-tags">
        {project.tech.map((t, idx) => (
          <span key={idx} className="tech-chip">
            {t}
          </span>
        ))}
      </div>

      <div className="card-footer" onClick={(e) => e.stopPropagation()}>
        <a
          href={project.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="card-btn primary"
        >
          <ExternalLink size={14} /> Live Demo
        </a>

        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="card-btn secondary"
        >
          <Github size={14} /> GitHub Repo
        </a>
      </div>
    </motion.div>
  );
};

