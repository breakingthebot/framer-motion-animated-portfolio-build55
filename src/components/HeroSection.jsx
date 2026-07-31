// src/components/HeroSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Code, Terminal, Zap } from 'lucide-react';
import { portfolioStats } from '../data/buildsData';
import './HeroSection.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const HeroSection = () => {
  return (
    <motion.section
      className="hero-section"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="badge-strip" variants={itemVariants}>
        <span className="badge-pill info">
          <Zap size={13} />
          Framer Motion Portfolio
        </span>
        <span className="badge-pill success">
          <Sparkles size={13} />
          246 Builds Series
        </span>
      </motion.div>

      <motion.h1 className="hero-title" variants={itemVariants}>
        Exploring 246 Daily Coding Builds Through Animated Interactive Portfolios
      </motion.h1>

      <motion.p className="hero-subtitle" variants={itemVariants}>
        A showcase portfolio visualizing the 246-build ecosystem. Spanning web applications, custom UI libraries, micro-frontends, state machines, and native developer tools.
      </motion.p>

      <motion.div className="stats-grid" variants={itemVariants}>
        <motion.div 
          className="stat-card"
          whileHover={{ scale: 1.05, y: -4 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          <div className="stat-icon purple"><Code size={22} /></div>
          <div className="stat-content">
            <span className="stat-number">{portfolioStats.totalBuildsTarget}</span>
            <span className="stat-label">Total Builds Target</span>
          </div>
        </motion.div>

        <motion.div 
          className="stat-card"
          whileHover={{ scale: 1.05, y: -4 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          <div className="stat-icon blue"><Terminal size={22} /></div>
          <div className="stat-content">
            <span className="stat-number">{portfolioStats.completedBuildsCount}</span>
            <span className="stat-label">Active Completed Repos</span>
          </div>
        </motion.div>

        <motion.div 
          className="stat-card"
          whileHover={{ scale: 1.05, y: -4 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          <div className="stat-icon green"><Sparkles size={22} /></div>
          <div className="stat-content">
            <span className="stat-number">{portfolioStats.languagesCount}</span>
            <span className="stat-label">Languages &amp; Stacks</span>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};
