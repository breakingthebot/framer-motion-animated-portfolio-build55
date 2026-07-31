import React from 'react';
import { motion } from 'framer-motion';
import { categoriesList } from '../data/buildsData';
import { playTabSound } from '../utils/soundFX';
import './CategoryFilter.css';

/**
 * Renders category tab strip with layoutId active pill background and sound effect.
 */
export const CategoryFilter = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="category-strip">
      {categoriesList.map((cat) => {
        const isSelected = selectedCategory === cat;
        return (
          <button
            key={cat}
            className={`cat-btn ${isSelected ? 'selected' : ''}`}
            onClick={() => {
              playTabSound();
              onSelectCategory(cat);
            }}
          >
            <span>{cat}</span>
            {isSelected && (
              <motion.div
                className="cat-pill-bg"
                layoutId="catPillBg"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};
