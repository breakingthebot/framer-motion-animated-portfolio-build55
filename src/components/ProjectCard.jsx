// src/components/ProjectCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Sparkles, Layers } from 'lucide-react';
import './ProjectCard.css';

export const ProjectCard = ({ project, onSelect }) => {
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
        <span className="depth-tag">{project.depth} Build</span>
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
