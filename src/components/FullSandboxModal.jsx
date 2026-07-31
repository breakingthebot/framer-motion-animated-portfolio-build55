// src/components/FullSandboxModal.jsx
// Dedicated Full-Screen High-Resolution Interactive Sandbox Viewport Modal.
// Connects to: src/App.jsx, src/components/SandboxEmbed.jsx, src/components/ProjectModal.jsx
// Created: 2026-07-31

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Monitor, Tablet, Smartphone, Maximize2, RefreshCw, PlayCircle } from 'lucide-react';
import { playClickSound, playModalOpenSound } from '../utils/soundFX';
import './FullSandboxModal.css';

/**
 * Renders a 100% full-viewport interactive sandbox modal with high-res iframe rendering and device toggles.
 * @param {Object} props
 * @param {Object|null} props.project - The active build project object containing demoUrl.
 * @param {Function} props.onClose - Modal close handler.
 */
export function FullSandboxModal({ project, onClose }) {
  const [deviceMode, setDeviceMode] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'
  const [isLoading, setIsLoading] = useState(true);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (project) {
      playModalOpenSound();
      setIsLoading(true);
    }
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && project) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project || !project.demoUrl) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="full-sandbox-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="full-sandbox-card"
          initial={{ scale: 0.96, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.96, opacity: 0, y: 15 }}
          transition={{ type: 'spring', stiffness: 360, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* TOP CONTROL BAR */}
          <div className="full-sandbox-header">
            <div className="fs-title-group">
              <span className="fs-build-tag">Build #{project.buildNumber || project.id}</span>
              <h3 className="fs-title">{project.title} — Live Interactive Sandbox</h3>
            </div>

            {/* DEVICE PREVIEW TOGGLES */}
            <div className="fs-controls-group">
              <div className="fs-device-switch">
                <button
                  className={`fs-dev-btn ${deviceMode === 'desktop' ? 'active' : ''}`}
                  onClick={() => {
                    playClickSound();
                    setDeviceMode('desktop');
                  }}
                  title="Desktop 100% Full Width"
                >
                  <Monitor size={15} /> <span>Desktop</span>
                </button>
                <button
                  className={`fs-dev-btn ${deviceMode === 'tablet' ? 'active' : ''}`}
                  onClick={() => {
                    playClickSound();
                    setDeviceMode('tablet');
                  }}
                  title="Tablet (768px Viewport)"
                >
                  <Tablet size={15} /> <span>Tablet</span>
                </button>
                <button
                  className={`fs-dev-btn ${deviceMode === 'mobile' ? 'active' : ''}`}
                  onClick={() => {
                    playClickSound();
                    setDeviceMode('mobile');
                  }}
                  title="Mobile (375px Viewport)"
                >
                  <Smartphone size={15} /> <span>Mobile</span>
                </button>
              </div>

              <button
                className="fs-icon-btn"
                onClick={() => {
                  playClickSound();
                  setIsLoading(true);
                  setKey((k) => k + 1);
                }}
                title="Reload Live App Iframe"
              >
                <RefreshCw size={15} />
              </button>

              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="fs-external-btn"
                onClick={() => playClickSound()}
                title="Open Live Application in New Tab"
              >
                <ExternalLink size={15} /> <span>Open Live Site</span>
              </a>

              <button className="fs-close-btn" onClick={onClose} title="Close Fullscreen Viewport (Esc)">
                <X size={18} />
              </button>
            </div>
          </div>

          {/* 100% EDGE-TO-EDGE IFRAME VIEWPORT */}
          <div className="full-sandbox-viewport-wrap">
            {isLoading && (
              <div className="fs-loading-overlay">
                <div className="fs-spinner" />
                <span>Loading High-Resolution Live Interactive Sandbox...</span>
              </div>
            )}

            <div className={`fs-iframe-container ${deviceMode}`}>
              <iframe
                key={key}
                src={project.demoUrl}
                title={`Full Sandbox - ${project.title}`}
                className="fs-iframe"
                onLoad={() => setIsLoading(false)}
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
