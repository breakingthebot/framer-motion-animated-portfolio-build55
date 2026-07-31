// src/components/CaseStudyModal.jsx
// Interactive Enterprise Case Study Deep-Dive & System Architecture Explorer Modal.
// Connects to: src/App.jsx, src/data/caseStudiesData.js
// Created: 2026-07-31

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Cpu, ShieldCheck, Activity, Layers, Code, Zap, CheckCircle2, ArrowRight } from 'lucide-react';
import { playClickSound, playModalOpenSound } from '../utils/soundFX';
import './CaseStudyModal.css';

/**
 * Renders the detail modal for an enterprise engineering case study.
 * @param {Object} props
 * @param {Object} props.caseStudy - Selected case study object.
 * @param {Function} props.onClose - Modal close handler.
 */
export const CaseStudyModal = ({ caseStudy, onClose }) => {
  const [activeTab, setActiveTab] = useState('architecture'); // 'architecture' | 'code' | 'metrics'

  useEffect(() => {
    if (caseStudy) {
      playModalOpenSound();
    }
  }, [caseStudy]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && caseStudy) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [caseStudy, onClose]);

  if (!caseStudy) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="cs-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="cs-modal-card"
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* HEADER */}
          <div className="cs-modal-header">
            <div className="cs-modal-title-group">
              <span className="cs-category-badge">{caseStudy.category}</span>
              <h2 className="cs-title">{caseStudy.title}</h2>
              <p className="cs-subtitle">{caseStudy.subtitle}</p>
            </div>
            <button className="cs-close-btn" onClick={onClose}>
              <X size={18} />
            </button>
          </div>

          {/* METRICS STRIP */}
          <div className="cs-metrics-strip">
            <div className="cs-metric-box">
              <span className="cs-metric-val">{caseStudy.scaleMetrics.throughput}</span>
              <span className="cs-metric-lbl">Peak Throughput</span>
            </div>
            <div className="cs-metric-box">
              <span className="cs-metric-val highlight">{caseStudy.scaleMetrics.latency}</span>
              <span className="cs-metric-lbl">P99 Latency</span>
            </div>
            <div className="cs-metric-box">
              <span className="cs-metric-val">{caseStudy.scaleMetrics.availability}</span>
              <span className="cs-metric-lbl">SLA Uptime</span>
            </div>
            <div className="cs-metric-box">
              <span className="cs-metric-val">{caseStudy.scaleMetrics.dataVolume}</span>
              <span className="cs-metric-lbl">Data Scale</span>
            </div>
          </div>

          {/* TAB BAR */}
          <div className="cs-tab-bar">
            <button
              className={`cs-tab-btn ${activeTab === 'architecture' ? 'active' : ''}`}
              onClick={() => {
                playClickSound();
                setActiveTab('architecture');
              }}
            >
              <Cpu size={15} /> System Architecture &amp; Solution
            </button>
            <button
              className={`cs-tab-btn ${activeTab === 'code' ? 'active' : ''}`}
              onClick={() => {
                playClickSound();
                setActiveTab('code');
              }}
            >
              <Code size={15} /> Code Highlights
            </button>
            <button
              className={`cs-tab-btn ${activeTab === 'metrics' ? 'active' : ''}`}
              onClick={() => {
                playClickSound();
                setActiveTab('metrics');
              }}
            >
              <Activity size={15} /> Production SLA Metrics
            </button>
          </div>

          {/* BODY CONTENT */}
          <div className="cs-modal-body">
            {activeTab === 'architecture' && (
              <div className="cs-tab-content">
                <div className="cs-section-block">
                  <h4 className="cs-block-title">Executive Summary</h4>
                  <p className="cs-text">{caseStudy.executiveSummary}</p>
                </div>

                <div className="cs-challenge-grid">
                  <div className="cs-challenge-box problem">
                    <h5 className="cs-box-title">⚠️ Core Engineering Challenge</h5>
                    <p className="cs-box-text">{caseStudy.challenge}</p>
                  </div>
                  <div className="cs-challenge-box solution">
                    <h5 className="cs-box-title">🚀 Architectural Solution</h5>
                    <p className="cs-box-text">{caseStudy.solution}</p>
                  </div>
                </div>

                {/* ARCHITECTURE FLOWCHART DIAGRAM */}
                <div className="cs-flowchart-section">
                  <h4 className="cs-block-title">Interactive System Topology Flowchart</h4>
                  <div className="cs-flowchart-grid">
                    {caseStudy.architectureNodes.map((node, index) => (
                      <React.Fragment key={node.id}>
                        <motion.div
                          className={`cs-flow-node ${node.type}`}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.08 }}
                        >
                          <span className="node-type-pill">{node.type}</span>
                          <span className="node-title">{node.label}</span>
                        </motion.div>
                        {index < caseStudy.architectureNodes.length - 1 && (
                          <div className="cs-flow-arrow">
                            <ArrowRight size={16} />
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'code' && (
              <div className="cs-tab-content">
                <h4 className="cs-block-title">Core Architecture Code Implementation</h4>
                <div className="cs-code-wrapper">
                  <pre className="cs-code-block">
                    <code>{caseStudy.codeHighlight}</code>
                  </pre>
                </div>

                <div className="cs-section-block" style={{ marginTop: '20px' }}>
                  <h4 className="cs-block-title">Technology Stack &amp; Libraries</h4>
                  <div className="cs-tech-tags">
                    {caseStudy.techStack.map((tech, idx) => (
                      <span key={idx} className="cs-tech-chip">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'metrics' && (
              <div className="cs-tab-content">
                <h4 className="cs-block-title">Empirical Production SLA Performance Benchmarks</h4>
                <div className="cs-sla-grid">
                  <div className="cs-sla-card">
                    <ShieldCheck size={24} className="sla-icon green" />
                    <div className="sla-info">
                      <span className="sla-val">{caseStudy.scaleMetrics.availability}</span>
                      <span className="sla-lbl">SLA Availability Guarantee</span>
                    </div>
                  </div>

                  <div className="cs-sla-card">
                    <Zap size={24} className="sla-icon cyan" />
                    <div className="sla-info">
                      <span className="sla-val">{caseStudy.scaleMetrics.latency}</span>
                      <span className="sla-lbl">P99 Response Latency</span>
                    </div>
                  </div>

                  <div className="cs-sla-card">
                    <Activity size={24} className="sla-icon purple" />
                    <div className="sla-info">
                      <span className="sla-val">{caseStudy.scaleMetrics.throughput}</span>
                      <span className="sla-lbl">Peak Ingestion Throughput</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* FOOTER */}
          <div className="cs-modal-footer">
            <a
              href={caseStudy.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cs-modal-btn primary"
            >
              <ExternalLink size={16} /> Open Live Production App
            </a>
            <a
              href={caseStudy.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cs-modal-btn secondary"
            >
              <Github size={16} /> View Code Base Repository
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
