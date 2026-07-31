// src/components/SearchHistory.jsx
// Recent search queries & filter history pill bar component with localStorage persistence.
// Connects to: src/components/SearchBar.jsx
// Created: 2026-07-31

import React, { useState, useEffect } from 'react';
import { History, X, Trash2 } from 'lucide-react';
import { playClickSound } from '../utils/soundFX';
import './SearchHistory.css';

const STORAGE_KEY = 'build_55_recent_searches';
const MAX_HISTORY = 8;

/**
 * Renders interactive recent search query history chips saved in localStorage.
 * @param {Object} props
 * @param {Function} props.onSelectQuery - Callback when clicking a recent search chip.
 * @param {string} props.activeQuery - Active search query.
 */
export function SearchHistory({ onSelectQuery, activeQuery }) {
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : ['React 19', 'Svelte 5', 'Build 50', 'Framer Motion'];
  });

  // Save new activeQuery to history when user stops typing
  useEffect(() => {
    if (!activeQuery || activeQuery.trim().length < 2) return;
    const clean = activeQuery.trim();

    setHistory((prev) => {
      const filtered = prev.filter((item) => item.toLowerCase() !== clean.toLowerCase());
      const updated = [clean, ...filtered].slice(0, MAX_HISTORY);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, [activeQuery]);

  const handleRemoveItem = (e, item) => {
    e.stopPropagation();
    playClickSound();
    setHistory((prev) => {
      const updated = prev.filter((i) => i !== item);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const handleClearAll = () => {
    playClickSound();
    setHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  if (history.length === 0) return null;

  return (
    <div className="search-history-container">
      <div className="history-header">
        <span className="history-label">
          <History size={13} /> Recent Searches
        </span>
        <button className="clear-history-btn" onClick={handleClearAll} title="Clear Search History">
          <Trash2 size={12} /> Clear
        </button>
      </div>

      <div className="history-chips-row">
        {history.map((term) => (
          <button
            key={term}
            className={`history-chip ${activeQuery === term ? 'active' : ''}`}
            onClick={() => {
              playClickSound();
              onSelectQuery(term);
            }}
          >
            <span>{term}</span>
            <span
              className="remove-chip-x"
              onClick={(e) => handleRemoveItem(e, term)}
              title="Remove query"
            >
              <X size={11} />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
