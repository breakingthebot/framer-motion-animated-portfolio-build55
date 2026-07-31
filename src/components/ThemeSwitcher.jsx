// src/components/ThemeSwitcher.jsx
// Framer Motion Theme Switcher Component.
// Created: 2026-07-31

import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import './ThemeSwitcher.css';

export const ThemeSwitcher = ({ themeMode, onToggleTheme }) => {
  const isDark = themeMode === 'cyber-dark';

  return (
    <button
      className="theme-switcher-track"
      onClick={onToggleTheme}
      aria-label="Toggle Theme Mode"
    >
      <motion.div
        className="theme-switcher-handle"
        animate={{ x: isDark ? 0 : 26 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        {isDark ? <Moon size={13} /> : <Sun size={13} />}
      </motion.div>
      <span className="theme-switcher-text">
        {isDark ? 'Cyber' : 'Neon'}
      </span>
    </button>
  );
};
