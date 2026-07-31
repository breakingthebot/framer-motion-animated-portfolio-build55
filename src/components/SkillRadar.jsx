// src/components/SkillRadar.jsx
// Interactive Framer Motion SVG Radar Chart & Circular Progress Gauges.
// Created: 2026-07-31

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Radar, Award, CheckCircle2, Cpu } from 'lucide-react';
import './SkillRadar.css';

const radarCategories = [
  { name: 'UI Libraries', value: 95, color: '#38bdf8' },
  { name: 'Web Apps & PWAs', value: 90, color: '#818cf8' },
  { name: 'Micro-frontends', value: 85, color: '#c084fc' },
  { name: 'Minimal JS & HTMX', value: 80, color: '#34d399' },
  { name: 'CLI Tools & Engines', value: 88, color: '#fbbf24' },
  { name: 'Systems & Backend', value: 82, color: '#f87171' },
];

const progressGauges = [
  { title: 'React 19 & Ecosystem', percent: 94, subtitle: 'JSX, Hooks, Context, State', color: '#38bdf8' },
  { title: 'CSS & UI Architectures', percent: 92, subtitle: 'styled-components, CSS Modules, Tailwind', color: '#818cf8' },
  { title: 'Web Components & HTMX', percent: 84, subtitle: 'Lit 3.x, Shadow DOM, Server Fragments', color: '#c084fc' },
  { title: 'Backend & Polyglot Engines', percent: 88, subtitle: 'Python, Go, Rust, Node.js', color: '#34d399' },
];

export const SkillRadar = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  // SVG Radar Polygon calculations (6 axes)
  const radius = 120;
  const center = 150;
  const numAxes = radarCategories.length;

  const getCoordinates = (index, valuePercent) => {
    const angle = (Math.PI * 2 / numAxes) * index - Math.PI / 2;
    const r = (radius * valuePercent) / 100;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  const pointsString = radarCategories
    .map((cat, idx) => {
      const { x, y } = getCoordinates(idx, cat.value);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <motion.div 
      className="skill-radar-container"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="radar-header">
        <h3 className="radar-title">
          <Radar className="radar-icon" size={20} /> Skill Distribution &amp; Technical Coverage Radar
        </h3>
        <p className="radar-subtitle">
          Interactive SVG radar polygon &amp; animated circular progress gauges calculated across 246 builds.
        </p>
      </div>

      <div className="radar-grid-layout">
        {/* SVG RADAR POLYGON */}
        <div className="svg-radar-wrapper">
          <svg viewBox="0 0 300 300" className="radar-svg">
            {/* Background Grid Circles */}
            {[0.25, 0.5, 0.75, 1].map((scale, i) => (
              <circle
                key={i}
                cx={center}
                cy={center}
                r={radius * scale}
                className="radar-grid-circle"
              />
            ))}

            {/* Axis Lines & Labels */}
            {radarCategories.map((cat, idx) => {
              const outerPoint = getCoordinates(idx, 100);
              const labelPoint = getCoordinates(idx, 118);
              return (
                <g key={idx}>
                  <line
                    x1={center}
                    y1={center}
                    x2={outerPoint.x}
                    y2={outerPoint.y}
                    className="radar-axis-line"
                  />
                  <text
                    x={labelPoint.x}
                    y={labelPoint.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className={`radar-axis-text ${hoveredCategory === cat.name ? 'active' : ''}`}
                    onMouseEnter={() => setHoveredCategory(cat.name)}
                    onMouseLeave={() => setHoveredCategory(null)}
                  >
                    {cat.name}
                  </text>
                </g>
              );
            })}

            {/* Polygon Shape with Framer Motion Entrance */}
            <motion.polygon
              points={pointsString}
              className="radar-polygon-shape"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 0.75 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />

            {/* Points on Polygon */}
            {radarCategories.map((cat, idx) => {
              const { x, y } = getCoordinates(idx, cat.value);
              return (
                <circle
                  key={idx}
                  cx={x}
                  cy={y}
                  r={5}
                  fill={cat.color}
                  className="radar-data-point"
                  onMouseEnter={() => setHoveredCategory(cat.name)}
                  onMouseLeave={() => setHoveredCategory(null)}
                />
              );
            })}
          </svg>

          {hoveredCategory && (
            <motion.div 
              className="radar-tooltip-box"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <span>{hoveredCategory}: </span>
              <strong>
                {radarCategories.find((c) => c.name === hoveredCategory)?.value}% Coverage
              </strong>
            </motion.div>
          )}
        </div>

        {/* CIRCULAR PROGRESS GAUGES */}
        <div className="gauges-column">
          {progressGauges.map((gauge, idx) => (
            <div key={idx} className="gauge-card">
              <div className="gauge-header">
                <div className="gauge-title-row">
                  <Cpu size={16} style={{ color: gauge.color }} />
                  <span className="gauge-title">{gauge.title}</span>
                </div>
                <span className="gauge-percent" style={{ color: gauge.color }}>
                  {gauge.percent}%
                </span>
              </div>

              <div className="gauge-track">
                <motion.div
                  className="gauge-fill"
                  style={{ backgroundColor: gauge.color }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${gauge.percent}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: idx * 0.15 }}
                />
              </div>
              <span className="gauge-subtitle">{gauge.subtitle}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
