// src/components/MetricsMatrix.jsx
// Interactive Production Performance Benchmarks & SLA Metrics Matrix.
// Connects to: src/App.jsx, src/data/benchmarksData.js
// Created: 2026-07-31

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Gauge, Zap, Database, HardDrive, Cpu, CheckCircle2, TrendingUp } from 'lucide-react';
import { frameworkBenchmarks, benchmarkMetricsList } from '../data/benchmarksData';
import { playClickSound } from '../utils/soundFX';
import './MetricsMatrix.css';

/**
 * Renders an interactive performance benchmarking suite comparing framework overhead and latency metrics.
 */
export function MetricsMatrix() {
  const [activeMetric, setActiveMetric] = useState('throughput'); // 'coldStart' | 'memory' | 'throughput' | 'bundle'
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Systems & High-Perf', 'Web Components', 'Reactive Frameworks', 'Full-Stack Frameworks'];

  const filteredBenchmarks = frameworkBenchmarks.filter((item) =>
    selectedCategory === 'All' ? true : item.category === selectedCategory
  );

  const getMetricValue = (item, metricId) => {
    switch (metricId) {
      case 'coldStart':
        return item.coldStartMs;
      case 'memory':
        return item.memoryMb;
      case 'throughput':
        return item.p99ThroughputRps;
      case 'bundle':
        return item.bundleSizeKb;
      default:
        return 0;
    }
  };

  // Compute max for bar percentages
  const maxVal = Math.max(...filteredBenchmarks.map((item) => getMetricValue(item, activeMetric)));

  return (
    <div className="metrics-matrix-card">
      <div className="matrix-header">
        <div className="matrix-title-group">
          <span className="matrix-kicker">Empirical Benchmarking &amp; SLA Matrix</span>
          <h2 className="matrix-title">
            <Gauge className="matrix-icon" /> Production Performance &amp; Framework Overhead Comparison
          </h2>
        </div>

        {/* METRIC SELECTION TABS */}
        <div className="metric-tabs-strip">
          {benchmarkMetricsList.map((m) => (
            <button
              key={m.id}
              className={`metric-tab-btn ${activeMetric === m.id ? 'active' : ''}`}
              onClick={() => {
                playClickSound();
                setActiveMetric(m.id);
              }}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <div className="matrix-body">
        {/* CATEGORY FILTER CHIPS */}
        <div className="matrix-filter-row">
          <span className="filter-label">Filter Category:</span>
          <div className="filter-chips-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-chip ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => {
                  playClickSound();
                  setSelectedCategory(cat);
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* BARS CHART CONTAINER */}
        <div className="matrix-bars-container">
          {filteredBenchmarks.map((item, idx) => {
            const val = getMetricValue(item, activeMetric);
            const pct = Math.max(8, Math.round((val / maxVal) * 100));

            return (
              <motion.div
                key={item.id}
                className="matrix-bar-row"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.06 }}
              >
                <div className="bar-label-col">
                  <span className="fw-name">{item.framework}</span>
                  <span className="fw-badge" style={{ color: item.color, borderColor: `${item.color}40` }}>
                    {item.badge}
                  </span>
                </div>

                <div className="bar-track-col">
                  <motion.div
                    className="bar-fill"
                    style={{ background: item.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ type: 'spring', stiffness: 180, damping: 20 }}
                  >
                    <span className="bar-val-text">
                      {val.toLocaleString()} {benchmarkMetricsList.find((m) => m.id === activeMetric)?.unit}
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* INSIGHTS FOOTER STRIP */}
        <div className="matrix-insights-footer">
          <div className="insight-pill">
            <Zap size={14} className="insight-icon" />
            <span>Rust WASM delivers <strong>185k RPS</strong> with sub-5KB gzip payload.</span>
          </div>
          <div className="insight-pill">
            <CheckCircle2 size={14} className="insight-icon green" />
            <span>Lit 3 Web Components achieve <strong>8.2ms cold start</strong> with zero framework runtime.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
