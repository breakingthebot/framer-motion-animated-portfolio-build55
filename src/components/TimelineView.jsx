// src/components/TimelineView.jsx
// Framer Motion Animated Chronological Timeline View Component.
// Created: 2026-07-31

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ExternalLink, Github, Sparkles, Layers } from 'lucide-react';
import './TimelineView.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export const TimelineView = ({ projects, onSelect }) => {
  return (
    <motion.div
      className="timeline-view-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="timeline-track-line" />

      {projects.map((project) => (
        <motion.div
          key={project.id}
          className="timeline-item"
          variants={itemVariants}
          whileHover={{ x: 6 }}
          onClick={() => onSelect(project)}
        >
          {/* Glowing Node Dot */}
          <div className="timeline-node-dot">
            <div className="node-inner-glow" />
          </div>

          {/* Timeline Content Card */}
          <div className="timeline-card">
            <div className="timeline-card-header">
              <div className="timeline-badge-group">
                <span className="timeline-build-number">Build #{project.buildNumber}</span>
                {project.featured && (
                  <span className="timeline-featured-pill">
                    <Sparkles size={11} /> Featured
                  </span>
                )}
              </div>
              <span className="timeline-depth-badge">{project.depth}</span>
            </div>

            <h3 className="timeline-title">{project.title}</h3>
            <p className="timeline-category"><Layers size={13} /> {project.category}</p>
            <p className="timeline-desc">{project.description}</p>

            <div className="timeline-tech-row">
              {project.tech.map((t, idx) => (
                <span key={idx} className="timeline-tech-chip">
                  {t}
                </span>
              ))}
            </div>

            <div className="timeline-card-footer" onClick={(e) => e.stopPropagation()}>
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="timeline-link-btn primary"
              >
                <ExternalLink size={13} /> Live App
              </a>

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="timeline-link-btn secondary"
              >
                <Github size={13} /> GitHub
              </a>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};
