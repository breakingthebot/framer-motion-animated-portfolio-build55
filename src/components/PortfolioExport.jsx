// src/components/PortfolioExport.jsx
// Exportable Portfolio JSON & Printable PDF Summary Sheet Component.
// Created: 2026-07-31

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, FileJson, Printer, X, CheckCircle2 } from 'lucide-react';
import { buildsList, portfolioStats } from '../data/buildsData';
import './PortfolioExport.css';

export const PortfolioExport = ({ isOpen, onClose }) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const handleDownloadJSON = () => {
    const exportData = {
      title: "246 Daily Coding Builds Portfolio Summary",
      stats: portfolioStats,
      exportedAt: new Date().toISOString(),
      builds: buildsList,
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `246_builds_portfolio_summary_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const handlePrintPDF = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="export-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="export-modal-card"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="export-header">
            <div className="export-title-group">
              <span className="export-badge">
                <Download size={14} /> Portfolio Exporter
              </span>
              <h2 className="export-title">Export 246 Builds Summary</h2>
            </div>
            <button className="export-close-btn" onClick={onClose}>
              <X size={18} />
            </button>
          </div>

          <div className="export-body">
            <p className="export-desc">
              Download complete structured JSON metadata or launch a print-ready PDF resume summary for the 246 Daily Coding Builds portfolio.
            </p>

            {downloadSuccess && (
              <motion.div 
                className="export-success-banner"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <CheckCircle2 size={16} /> JSON dataset exported successfully!
              </motion.div>
            )}

            <div className="export-options-grid">
              <div className="export-option-card" onClick={handleDownloadJSON}>
                <div className="option-icon json"><FileJson size={24} /></div>
                <div className="option-text">
                  <h4>Export Raw JSON Dataset</h4>
                  <p>Full array of build metadata, GitHub repos, live Vercel URLs, and tech stacks.</p>
                </div>
                <button className="option-btn primary">
                  <Download size={14} /> Download .JSON
                </button>
              </div>

              <div className="export-option-card" onClick={handlePrintPDF}>
                <div className="option-icon print"><Printer size={24} /></div>
                <div className="option-text">
                  <h4>Printable PDF Summary Sheet</h4>
                  <p>Generates a formatted summary view suitable for saving as PDF or printing.</p>
                </div>
                <button className="option-btn secondary">
                  <Printer size={14} /> Print / Save PDF
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
