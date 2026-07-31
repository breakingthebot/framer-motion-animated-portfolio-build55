// src/components/CodeInspector.jsx
// Interactive Code Snippet & Architecture Inspector Component.
// Created: 2026-07-31

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Copy, Check, ChevronDown, ChevronUp, FileCode } from 'lucide-react';
import './CodeInspector.css';

const sampleCodeSnippets = {
  55: {
    filename: 'PortfolioApp.jsx',
    code: `import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';

export function App() {
  return (
    <div className="app-layout">
      <Navbar activeSection="featured" />
      <HeroSection />
      <motion.div layout>
        <AnimatePresence>
          {/* Framer Motion Animated Grid */}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}`,
  },
  54: {
    filename: 'Rating.jsx',
    code: `import styled, { css } from 'styled-components';

const StarButton = styled.button\`
  background: transparent;
  border: none;
  font-size: \${({ size }) => size === 'lg' ? '1.8rem' : '1.4rem'};
  color: \${({ isFilled, theme }) =>
    isFilled ? theme.colors.warning : theme.colors.textMuted};
  transition: transform 0.15s ease, color 0.15s ease;

  &:hover {
    transform: scale(1.2);
  }
\`;

export const Rating = ({ value, max = 5 }) => (
  <StarButton isFilled={value > 0}>★</StarButton>
);`,
  },
  53: {
    filename: 'Button.module.css',
    code: `.btn {
  composes: fontBase from '../../styles/typography.module.css';
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 12px;
  background: var(--color-primary);
}

.primary {
  background: linear-gradient(135deg, #0ea5e9, #3b82f6);
  color: #ffffff;
}`,
  },
  default: {
    filename: 'Architecture.jsx',
    code: `// Modular Architecture Sample
import React from 'react';

export const BuildModule = ({ title, tech }) => {
  return (
    <div className="build-module">
      <h3>{title}</h3>
      <div className="stack">{tech.join(', ')}</div>
    </div>
  );
};`,
  },
};

export const CodeInspector = ({ buildNumber }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const snippet = sampleCodeSnippets[buildNumber] || sampleCodeSnippets.default;

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="code-inspector-container">
      <button
        className="code-inspector-toggle-btn"
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        <div className="toggle-left">
          <Code size={16} className="code-icon" />
          <span>Architecture &amp; Code Inspector</span>
          <span className="file-chip">
            <FileCode size={12} /> {snippet.filename}
          </span>
        </div>
        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="code-snippet-box"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="snippet-top-bar">
              <span className="snippet-filename">{snippet.filename}</span>
              <button className="copy-btn" onClick={handleCopy}>
                {isCopied ? (
                  <>
                    <Check size={13} style={{ color: '#34d399' }} /> Copied!
                  </>
                ) : (
                  <>
                    <Copy size={13} /> Copy Code
                  </>
                )}
              </button>
            </div>

            <pre className="code-pre">
              <code>{snippet.code}</code>
            </pre>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
