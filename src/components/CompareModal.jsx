// src/components/CompareModal.jsx
// Side-by-Side Build Comparison Matrix Modal powered by Framer Motion.
// Created: 2026-07-31

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRightLeft, ExternalLink, Github, CheckCircle2, Layers } from 'lucide-react';
import './CompareModal.css';

export const CompareModal = ({ isOpen, onClose, builds }) => {
  const [build1Id, setBuild1Id] = useState(builds[0]?.id || 55);
  const [build2Id, setBuild2Id] = useState(builds[1]?.id || 54);

  if (!isOpen) return null;

  const build1 = builds.find((b) => b.id === Number(build1Id)) || builds[0];
  const build2 = builds.find((b) => b.id === Number(build2Id)) || builds[1];

  return (
    <AnimatePresence>
      <motion.div
        className="compare-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="compare-modal-card"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* MODAL HEADER */}
          <div className="compare-header">
            <div className="compare-title-group">
              <span className="compare-badge">
                <ArrowRightLeft size={14} /> Side-by-Side Architecture Matrix
              </span>
              <h2 className="compare-title">Compare Build Repositories</h2>
            </div>
            <button className="compare-close-btn" onClick={onClose}>
              <X size={18} />
            </button>
          </div>

          {/* SELECTORS ROW */}
          <div className="compare-selectors-row">
            <div className="compare-select-group">
              <label>Build #1 Select:</label>
              <select
                value={build1Id}
                onChange={(e) => setBuild1Id(Number(e.target.value))}
              >
                {builds.map((b) => (
                  <option key={b.id} value={b.id}>
                    Build #{b.buildNumber} — {b.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="compare-vs-pill">VS</div>

            <div className="compare-select-group">
              <label>Build #2 Select:</label>
              <select
                value={build2Id}
                onChange={(e) => setBuild2Id(Number(e.target.value))}
              >
                {builds.map((b) => (
                  <option key={b.id} value={b.id}>
                    Build #{b.buildNumber} — {b.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* SIDE-BY-SIDE MATRIX GRID */}
          <div className="compare-matrix-grid">
            {/* COLUMN 1 */}
            <div className="compare-col">
              <div className="col-header">
                <span className="col-build-num">Build #{build1.buildNumber}</span>
                <h3 className="col-title">{build1.title}</h3>
              </div>

              <div className="compare-feature-item">
                <span className="feature-label">Category</span>
                <span className="feature-value purple">
                  <Layers size={13} /> {build1.category}
                </span>
              </div>

              <div className="compare-feature-item">
                <span className="feature-label">Build Depth</span>
                <span className="feature-value green">
                  <CheckCircle2 size={13} /> {build1.depth} Build
                </span>
              </div>

              <div className="compare-feature-item">
                <span className="feature-label">Description</span>
                <p className="feature-desc">{build1.description}</p>
              </div>

              <div className="compare-feature-item">
                <span className="feature-label">Tech Stack</span>
                <div className="compare-tech-chips">
                  {build1.tech.map((t, idx) => (
                    <span key={idx} className="tech-chip">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="compare-col-footer">
                <a
                  href={build1.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="compare-link-btn primary"
                >
                  <ExternalLink size={13} /> Live App
                </a>
                <a
                  href={build1.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="compare-link-btn secondary"
                >
                  <Github size={13} /> GitHub
                </a>
              </div>
            </div>

            {/* COLUMN 2 */}
            <div className="compare-col">
              <div className="col-header">
                <span className="col-build-num">Build #{build2.buildNumber}</span>
                <h3 className="col-title">{build2.title}</h3>
              </div>

              <div className="compare-feature-item">
                <span className="feature-label">Category</span>
                <span className="feature-value purple">
                  <Layers size={13} /> {build2.category}
                </span>
              </div>

              <div className="compare-feature-item">
                <span className="feature-label">Build Depth</span>
                <span className="feature-value green">
                  <CheckCircle2 size={13} /> {build2.depth} Build
                </span>
              </div>

              <div className="compare-feature-item">
                <span className="feature-label">Description</span>
                <p className="feature-desc">{build2.description}</p>
              </div>

              <div className="compare-feature-item">
                <span className="feature-label">Tech Stack</span>
                <div className="compare-tech-chips">
                  {build2.tech.map((t, idx) => (
                    <span key={idx} className="tech-chip">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="compare-col-footer">
                <a
                  href={build2.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="compare-link-btn primary"
                >
                  <ExternalLink size={13} /> Live App
                </a>
                <a
                  href={build2.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="compare-link-btn secondary"
                >
                  <Github size={13} /> GitHub
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
