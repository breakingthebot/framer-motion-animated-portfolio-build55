// src/components/AnalyticsModal.jsx
// Interactive Build Analytics & Technology Distribution Matrix Modal.
// Connects to: src/App.jsx, src/data/buildsData.js
// Created: 2026-07-31

import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart3,
  PieChart,
  Activity,
  Layers,
  Code2,
  Cpu,
  Zap,
  TrendingUp,
  X,
  Award
} from 'lucide-react';
import './AnalyticsModal.css';

/**
 * Computes tech stack counts, category distribution, and architecture depth metrics from builds list.
 * @param {Array<Object>} builds - Array of all 246 build objects.
 * @returns {Object} Analytical metrics breakdown.
 */
function computeAnalyticsData(builds = []) {
  const techCounts = {};
  const categoryCounts = {};
  const depthCounts = {};
  let totalTechTags = 0;

  builds.forEach((build) => {
    // 1. Tech count
    (build.tech || []).forEach((t) => {
      techCounts[t] = (techCounts[t] || 0) + 1;
      totalTechTags += 1;
    });

    // 2. Category count
    const cat = build.category || 'Uncategorized';
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;

    // 3. Depth count
    const d = build.depth || 'Standard';
    depthCounts[d] = (depthCounts[d] || 0) + 1;
  });

  // Sort tech stack by frequency
  const sortedTech = Object.entries(techCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  // Sort categories by count
  const sortedCategories = Object.entries(categoryCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  const featuredCount = builds.filter((b) => b.featured).length;

  return {
    totalBuilds: builds.length,
    totalTechTags,
    uniqueTechCount: Object.keys(techCounts).length,
    featuredCount,
    sortedTech,
    sortedCategories,
    depthCounts
  };
}

/**
 * Renders the Interactive Build Analytics & Tech Distribution Modal.
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the analytics modal is open.
 * @param {Function} props.onClose - Dismiss modal handler.
 * @param {Array<Object>} props.builds - Master array of build metadata.
 */
export function AnalyticsModal({ isOpen, onClose, builds = [] }) {
  const analytics = useMemo(() => computeAnalyticsData(builds), [builds]);

  if (!isOpen) return null;

  const topTech = analytics.sortedTech.slice(0, 8);
  const maxTechCount = topTech[0]?.count || 1;
  const maxCatCount = analytics.sortedCategories[0]?.count || 1;

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
          className="analytics-modal-card"
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* HEADER */}
          <div className="analytics-header">
            <div className="analytics-title-group">
              <span className="analytics-badge">
                <BarChart3 size={14} /> Ecosystem Insights
              </span>
              <h2>Build Analytics &amp; Tech Distribution Matrix</h2>
            </div>
            <button className="modal-close-btn" onClick={onClose}>
              <X size={18} />
            </button>
          </div>

          {/* METRICS STATS CARDS */}
          <div className="analytics-stats-row">
            <div className="stat-box">
              <div className="stat-icon-wrapper blue">
                <Code2 size={18} />
              </div>
              <div className="stat-info">
                <span className="stat-value">{analytics.totalBuilds}</span>
                <span className="stat-label">Featured Repos</span>
              </div>
            </div>

            <div className="stat-box">
              <div className="stat-icon-wrapper purple">
                <Cpu size={18} />
              </div>
              <div className="stat-info">
                <span className="stat-value">{analytics.uniqueTechCount}</span>
                <span className="stat-label">Unique Tech Stacks</span>
              </div>
            </div>

            <div className="stat-box">
              <div className="stat-icon-wrapper green">
                <Zap size={18} />
              </div>
              <div className="stat-info">
                <span className="stat-value">{analytics.totalTechTags}</span>
                <span className="stat-label">Total Integrations</span>
              </div>
            </div>

            <div className="stat-box">
              <div className="stat-icon-wrapper gold">
                <Award size={18} />
              </div>
              <div className="stat-info">
                <span className="stat-value">{analytics.featuredCount}</span>
                <span className="stat-label">Flagship Showcases</span>
              </div>
            </div>
          </div>

          {/* BODY CONTENT: CHARTS GRID */}
          <div className="analytics-body">
            <div className="charts-grid">
              {/* TOP TECH STACK FREQUENCY CHART */}
              <div className="chart-card">
                <div className="chart-header">
                  <h3>
                    <TrendingUp size={16} className="chart-icon" /> Top Technology Frequency
                  </h3>
                  <span className="subtext">Most frequent libraries &amp; frameworks</span>
                </div>
                <div className="bar-chart-container">
                  {topTech.map((item, idx) => {
                    const pct = Math.round((item.count / maxTechCount) * 100);
                    return (
                      <div key={idx} className="bar-row">
                        <div className="bar-info">
                          <span className="bar-name">{item.name}</span>
                          <span className="bar-count">{item.count} builds</span>
                        </div>
                        <div className="bar-track">
                          <motion.div
                            className="bar-fill blue-fill"
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ duration: 0.6, delay: idx * 0.05 }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* CATEGORY DISTRIBUTION CHART */}
              <div className="chart-card">
                <div className="chart-header">
                  <h3>
                    <Layers size={16} className="chart-icon" /> Domain Category Breakdown
                  </h3>
                  <span className="subtext">Distribution across app domains</span>
                </div>
                <div className="bar-chart-container">
                  {analytics.sortedCategories.slice(0, 6).map((cat, idx) => {
                    const pct = Math.round((cat.count / maxCatCount) * 100);
                    return (
                      <div key={idx} className="bar-row">
                        <div className="bar-info">
                          <span className="bar-name">{cat.name}</span>
                          <span className="bar-count">{cat.count} repos</span>
                        </div>
                        <div className="bar-track">
                          <motion.div
                            className="bar-fill purple-fill"
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ duration: 0.6, delay: idx * 0.05 }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ARCHITECTURE DEPTH GAUGES */}
            <div className="architecture-gauge-box">
              <h3>
                <Activity size={16} className="chart-icon" /> Architecture Depth Breakdown
              </h3>
              <div className="depth-badges-row">
                {Object.entries(analytics.depthCounts).map(([depth, count]) => (
                  <div key={depth} className="depth-pill-card">
                    <span className="depth-name">{depth} Architecture</span>
                    <span className="depth-val">{count} Builds</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="analytics-footer">
            <p>
              Calculated dynamically from public metadata for all <strong>{analytics.totalBuilds} builds</strong>.
            </p>
            <button className="footer-done-btn" onClick={onClose}>
              Close Matrix
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
