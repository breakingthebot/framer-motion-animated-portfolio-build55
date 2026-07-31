// src/components/CommandPalette.jsx
// Interactive Cmd+K / Ctrl+K Command Palette & Quick Navigator Modal.
// Connects to: src/App.jsx, src/data/buildsData.js
// Created: 2026-07-31

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Code2,
  Sparkles,
  Layers,
  BarChart3,
  Bookmark,
  Download,
  Volume2,
  Moon,
  Sun,
  X,
  ArrowRight,
  Command
} from 'lucide-react';
import { playClickSound, playModalOpenSound } from '../utils/soundFX';
import './CommandPalette.css';

/**
 * Renders the interactive Cmd+K Command Palette quick action runner & search modal.
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether command palette is open.
 * @param {Function} props.onClose - Dismiss palette handler.
 * @param {Array<Object>} props.builds - Full list of project builds.
 * @param {Function} props.onSelectProject - Callback to open project detail modal.
 * @param {Function} props.onToggleTheme - Callback to toggle theme mode.
 * @param {Function} props.onOpenAnalytics - Callback to open Analytics modal.
 * @param {Function} props.onOpenPlaylists - Callback to open Playlists modal.
 * @param {Function} props.onOpenExport - Callback to open Export modal.
 * @param {string} props.themeMode - Active theme mode.
 */
export function CommandPalette({
  isOpen,
  onClose,
  builds = [],
  onSelectProject,
  onToggleTheme,
  onOpenAnalytics,
  onOpenPlaylists,
  onOpenExport,
  themeMode
}) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  // Focus input automatically when opened
  useEffect(() => {
    if (isOpen) {
      playModalOpenSound();
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Quick Action Commands
  const quickActions = [
    {
      id: 'act-analytics',
      title: 'Open Build Analytics & Stats Matrix',
      category: 'System Action',
      icon: BarChart3,
      handler: () => {
        onClose();
        onOpenAnalytics();
      }
    },
    {
      id: 'act-playlists',
      title: 'Open Bookmarked Builds & Playlists',
      category: 'System Action',
      icon: Bookmark,
      handler: () => {
        onClose();
        onOpenPlaylists();
      }
    },
    {
      id: 'act-export',
      title: 'Export Portfolio Dataset (JSON / PDF)',
      category: 'System Action',
      icon: Download,
      handler: () => {
        onClose();
        onOpenExport();
      }
    },
    {
      id: 'act-theme',
      title: `Toggle Theme Mode (${themeMode === 'cyber-dark' ? 'Neon Light' : 'Cyber Dark'})`,
      category: 'System Action',
      icon: themeMode === 'cyber-dark' ? Sun : Moon,
      handler: () => {
        onToggleTheme();
      }
    }
  ];

  // Filter items based on query
  const filteredActions = quickActions.filter((a) =>
    a.title.toLowerCase().includes(query.toLowerCase())
  );

  const filteredBuilds = builds
    .filter((b) => {
      const q = query.toLowerCase();
      return (
        b.title.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q) ||
        `build ${b.buildNumber}`.includes(q) ||
        b.tech.some((t) => t.toLowerCase().includes(q))
      );
    })
    .slice(0, 10);

  const totalItems = [...filteredActions, ...filteredBuilds];

  // Keyboard navigation (Up / Down / Enter / Esc)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, totalItems.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + totalItems.length) % Math.max(1, totalItems.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (totalItems[selectedIndex]) {
          playClickSound();
          const item = totalItems[selectedIndex];
          if (item.handler) {
            item.handler();
          } else {
            onClose();
            onSelectProject(item);
          }
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, totalItems, onClose, onSelectProject]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="cmd-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="cmd-palette-card"
          initial={{ scale: 0.95, opacity: 0, y: -20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: -20 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* SEARCH INPUT BAR */}
          <div className="cmd-input-container">
            <Search size={18} className="cmd-search-icon" />
            <input
              ref={inputRef}
              type="text"
              className="cmd-input"
              placeholder="Type a command or search 55 builds..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
            />
            <div className="cmd-input-right">
              <span className="cmd-esc-badge">ESC to close</span>
              <button className="cmd-close-btn" onClick={onClose}>
                <X size={16} />
              </button>
            </div>
          </div>

          {/* LIST RESULTS */}
          <div className="cmd-results-container">
            {/* SYSTEM ACTIONS */}
            {filteredActions.length > 0 && (
              <div className="cmd-group">
                <span className="cmd-group-label">Quick System Actions</span>
                {filteredActions.map((action, idx) => {
                  const Icon = action.icon;
                  const isSelected = selectedIndex === idx;
                  return (
                    <div
                      key={action.id}
                      className={`cmd-item ${isSelected ? 'selected' : ''}`}
                      onClick={() => {
                        playClickSound();
                        action.handler();
                      }}
                      onMouseEnter={() => setSelectedIndex(idx)}
                    >
                      <div className="cmd-item-icon">
                        <Icon size={16} />
                      </div>
                      <span className="cmd-item-title">{action.title}</span>
                      <span className="cmd-item-category">{action.category}</span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* BUILD RESULTS */}
            {filteredBuilds.length > 0 && (
              <div className="cmd-group">
                <span className="cmd-group-label">Build Repositories ({filteredBuilds.length})</span>
                {filteredBuilds.map((build, idx) => {
                  const itemIndex = filteredActions.length + idx;
                  const isSelected = selectedIndex === itemIndex;
                  return (
                    <div
                      key={build.id}
                      className={`cmd-item ${isSelected ? 'selected' : ''}`}
                      onClick={() => {
                        playClickSound();
                        onClose();
                        onSelectProject(build);
                      }}
                      onMouseEnter={() => setSelectedIndex(itemIndex)}
                    >
                      <div className="cmd-item-icon build">
                        <Code2 size={16} />
                      </div>
                      <div className="cmd-item-content">
                        <div className="cmd-item-top">
                          <span className="cmd-build-num">Build #{build.buildNumber}</span>
                          <span className="cmd-build-title">{build.title}</span>
                        </div>
                        <span className="cmd-build-cat">{build.category} • {build.tech.slice(0, 3).join(', ')}</span>
                      </div>
                      <ArrowRight size={14} className="cmd-arrow" />
                    </div>
                  );
                })}
              </div>
            )}

            {totalItems.length === 0 && (
              <div className="cmd-empty">
                <p>No matching commands or builds found for "{query}".</p>
              </div>
            )}
          </div>

          {/* FOOTER SHORTCUT HINTS */}
          <div className="cmd-footer">
            <div className="hint-group">
              <span className="hint-key">↑↓</span> to navigate
              <span className="hint-key">↵</span> to select
              <span className="hint-key">esc</span> to dismiss
            </div>
            <div className="cmd-brand-hint">
              <Command size={13} /> 246 Builds Quick Navigator
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
