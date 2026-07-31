// src/components/SearchBar.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Search, X, Filter } from 'lucide-react';
import './SearchBar.css';

const allTechTags = [
  "React 19",
  "Vue 3",
  "Svelte 5",
  "Lit 3.x",
  "Alpine.js 3.x",
  "HTMX",
  "styled-components",
  "CSS Modules",
  "TailwindCSS v3",
  "React Native (Expo)",
];

export const SearchBar = ({
  searchQuery,
  onSearchChange,
  selectedTech,
  onTechToggle,
  onClearFilters,
}) => {
  const hasActiveFilters = searchQuery.length > 0 || selectedTech.length > 0;

  return (
    <motion.div 
      className="search-bar-container"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="search-input-wrapper">
        <Search className="search-icon" size={18} />
        <input
          type="text"
          className="search-input"
          placeholder="Search by title, technology, category, or build number..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchQuery && (
          <button className="clear-search-btn" onClick={() => onSearchChange('')}>
            <X size={16} />
          </button>
        )}
      </div>

      <div className="tech-filter-row">
        <div className="filter-label">
          <Filter size={14} />
          <span>Filter by Tech Stack:</span>
        </div>

        <div className="tech-chips-strip">
          {allTechTags.map((tech) => {
            const isSelected = selectedTech.includes(tech);
            return (
              <button
                key={tech}
                className={`filter-tech-chip ${isSelected ? 'selected' : ''}`}
                onClick={() => onTechToggle(tech)}
              >
                <span>{tech}</span>
              </button>
            );
          })}
        </div>

        {hasActiveFilters && (
          <button className="reset-all-btn" onClick={onClearFilters}>
            Reset Filters
          </button>
        )}
      </div>
    </motion.div>
  );
};
