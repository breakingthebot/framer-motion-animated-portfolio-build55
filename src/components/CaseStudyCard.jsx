// src/components/CaseStudyCard.jsx
// Enterprise Case Study Showcase Card Component.
// Connects to: src/App.jsx, src/data/caseStudiesData.js
// Created: 2026-07-31

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Activity, Cpu, ExternalLink, ArrowRight } from 'lucide-react';
import { playModalOpenSound } from '../utils/soundFX';
import './CaseStudyCard.css';

/**
 * Renders an enterprise engineering case study card with scale metrics.
 * @param {Object} props
 * @param {Object} props.caseStudy - Case study data object.
 * @param {Function} props.onSelect - Callback when clicking card to view deep-dive.
 */
export function CaseStudyCard({ caseStudy, onSelect }) {
  return (
    <motion.div
      className="cs-card"
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      onClick={() => {
        playModalOpenSound();
        onSelect(caseStudy);
      }}
    >
      <div className="cs-card-top">
        <span className="cs-card-category">{caseStudy.category}</span>
        <span className="cs-card-scale-badge">{caseStudy.scaleMetrics.throughput}</span>
      </div>

      <h3 className="cs-card-title">{caseStudy.title}</h3>
      <p className="cs-card-subtitle">{caseStudy.subtitle}</p>
      <p className="cs-card-desc">{caseStudy.executiveSummary}</p>

      <div className="cs-card-metrics-row">
        <div className="cs-metric-chip">
          <Activity size={13} /> {caseStudy.scaleMetrics.latency}
        </div>
        <div className="cs-metric-chip">
          <Shield size={13} /> {caseStudy.scaleMetrics.availability}
        </div>
      </div>

      <div className="cs-card-tech">
        {caseStudy.techStack.slice(0, 4).map((tech, idx) => (
          <span key={idx} className="cs-chip">
            {tech}
          </span>
        ))}
      </div>

      <div className="cs-card-footer">
        <span className="cs-action-text">
          Explore Architecture &amp; System Deep-Dive <ArrowRight size={14} />
        </span>
      </div>
    </motion.div>
  );
}
