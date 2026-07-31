// src/components/HeroSection.jsx
// Main Hero Section component wrapping ExecutiveHero.
// Connects to: src/App.jsx, src/components/ExecutiveHero.jsx
// Created: 2026-07-31

import React from 'react';
import { ExecutiveHero } from './ExecutiveHero';
import './HeroSection.css';

/**
 * Renders the top hero section delegating to ExecutiveHero.
 */
export const HeroSection = ({ onOpenExport, onOpenCmdPalette }) => {
  return <ExecutiveHero onOpenExport={onOpenExport} onOpenCmdPalette={onOpenCmdPalette} />;
};

