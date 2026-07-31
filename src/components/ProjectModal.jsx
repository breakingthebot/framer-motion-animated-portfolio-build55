// src/components/ProjectModal.jsx
// Interactive detail modal for showcase project builds with code inspector, sandbox embed, and bookmarking.
// Connects to: src/App.jsx, src/components/CodeInspector.jsx, src/components/SandboxEmbed.jsx, src/components/CollectionsModal.jsx
// Created: 2026-07-31

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Sparkles, Layers, CheckCircle2, Heart } from 'lucide-react';
import { CodeInspector } from './CodeInspector';
import { SandboxEmbed } from './SandboxEmbed';
import './ProjectModal.css';

/**
 * Renders the detail modal for a selected build project.
 * @param {Object} props
 * @param {Object} props.project - The selected build object.
 * @param {Function} props.onClose - Modal close handler.
 * @param {boolean} [props.isBookmarked=false] - Whether project is bookmarked.
 * @param {Function} [props.onToggleBookmark] - Handler to toggle bookmark status.
 */
export const ProjectModal = ({ project, onClose, isBookmarked = false, onToggleBookmark }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && project) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="modal-card"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header">
            <div className="modal-title-row">
              <span className="modal-build-num">Build #{project.buildNumber}</span>
              <h2 className="modal-title">{project.title}</h2>
            </div>
            <div className="modal-header-actions">
              <button
                className={`modal-heart-btn ${isBookmarked ? 'active' : ''}`}
                onClick={() => onToggleBookmark && onToggleBookmark(project.id)}
                title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Build'}
              >
                <Heart
                  size={18}
                  fill={isBookmarked ? '#ef4444' : 'none'}
                  color={isBookmarked ? '#ef4444' : 'currentColor'}
                />
              </button>
              <button className="modal-close-btn" onClick={onClose}>
                <X size={18} />
              </button>
            </div>
          </div>

          <div className="modal-body">
            <div className="modal-meta-row">
              <span className="modal-meta-tag category">
                <Layers size={13} /> {project.category}
              </span>
              <span className="modal-meta-tag depth">
                <CheckCircle2 size={13} /> {project.depth} Architecture
              </span>
              {project.featured && (
                <span className="modal-meta-tag featured">
                  <Sparkles size={13} /> Featured Showcase
                </span>
              )}
            </div>

            <p className="modal-description">{project.description}</p>

            {/* LIVE APP INTERACTIVE SANDBOX EMBED (NEW v1.8.0) */}
            {project.demoUrl && (
              <SandboxEmbed 
                demoUrl={project.demoUrl} 
                title={project.title} 
                onOpenFullscreen={() => onOpenFullscreen && onOpenFullscreen(project)}
              />
            )}

            <div className="modal-tech-section">
              <h4 className="section-subtitle">Tech Stack &amp; Libraries</h4>
              <div className="tech-tags">
                {project.tech.map((t, idx) => (
                  <span key={idx} className="tech-chip">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* ARCHITECTURE & CODE INSPECTOR (NEW v1.6.0) */}
            <CodeInspector buildNumber={project.buildNumber} />
          </div>

          <div className="modal-footer">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-btn primary"
              >
                <ExternalLink size={16} /> Open Live Production App
              </a>
            )}

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-btn secondary"
            >
              <Github size={16} /> View GitHub Repository
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
