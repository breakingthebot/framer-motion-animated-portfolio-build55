// src/components/SandboxEmbed.jsx
// Interactive Live Component Sandbox & Web App Embed Component.
// Connects to: src/components/ProjectModal.jsx, src/components/FullSandboxModal.jsx
// Created: 2026-07-31

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCw, Monitor, Smartphone, Tablet, Maximize2, Minimize2, ExternalLink, Expand } from 'lucide-react';
import { playClickSound } from '../utils/soundFX';
import './SandboxEmbed.css';

/**
 * Renders a spacious live application iframe sandbox preview widget.
 * @param {Object} props
 * @param {string} props.demoUrl - Live Vercel app URL.
 * @param {string} props.title - App title header.
 * @param {Function} [props.onOpenFullscreen] - Handler to open 100% full-screen modal.
 */
export const SandboxEmbed = ({ demoUrl, title, onOpenFullscreen }) => {
  const [isEmbedLoaded, setIsEmbedLoaded] = useState(false);
  const [deviceFrame, setDeviceFrame] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'
  const [isExpanded, setIsExpanded] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  const handleRefresh = () => {
    setIsEmbedLoaded(false);
    setIframeKey((prev) => prev + 1);
  };

  return (
    <div className={`sandbox-embed-container ${isExpanded ? 'expanded-mode' : ''}`}>
      <div className="sandbox-top-bar">
        <div className="sandbox-title-group">
          <Play size={14} className="sandbox-play-icon" />
          <span className="sandbox-label">Live App Interactive Sandbox</span>
          {isExpanded && <span className="expanded-badge">Full Screen Preview</span>}
        </div>

        <div className="sandbox-viewport-controls">
          {onOpenFullscreen && (
            <button
              className="device-btn active"
              onClick={() => {
                playClickSound();
                onOpenFullscreen();
              }}
              title="Open 100% Fullscreen Interactive Viewport"
              style={{ background: '#38bdf8', color: '#041220', fontWeight: 800 }}
            >
              <Expand size={14} /> <span>100% Fullscreen Sandbox</span>
            </button>
          )}

          <button
            className={`device-btn ${deviceFrame === 'desktop' ? 'active' : ''}`}
            onClick={() => setDeviceFrame('desktop')}
            title="Desktop View (100%)"
          >
            <Monitor size={14} /> <span className="device-text">Desktop</span>
          </button>
          <button
            className={`device-btn ${deviceFrame === 'tablet' ? 'active' : ''}`}
            onClick={() => setDeviceFrame('tablet')}
            title="Tablet View (768px)"
          >
            <Tablet size={14} /> <span className="device-text">Tablet</span>
          </button>
          <button
            className={`device-btn ${deviceFrame === 'mobile' ? 'active' : ''}`}
            onClick={() => setDeviceFrame('mobile')}
            title="Mobile View (375px)"
          >
            <Smartphone size={14} /> <span className="device-text">Mobile</span>
          </button>

          <div className="sandbox-divider" />

          <button
            className={`sandbox-action-btn ${isExpanded ? 'active' : ''}`}
            onClick={() => setIsExpanded(!isExpanded)}
            title={isExpanded ? 'Minimize Viewport' : 'Expand Viewport'}
          >
            {isExpanded ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
          </button>
          <button className="sandbox-action-btn" onClick={handleRefresh} title="Refresh Live Sandbox">
            <RotateCw size={13} />
          </button>
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="sandbox-action-btn"
            title="Open in New Tab"
          >
            <ExternalLink size={13} />
          </a>
        </div>
      </div>

      <div className={`sandbox-frame-wrapper ${deviceFrame} ${isExpanded ? 'expanded-height' : ''}`}>
        {!isEmbedLoaded && (
          <div className="sandbox-loading-overlay">
            <div className="sandbox-spinner" />
            <span>Loading Live App ({title})...</span>
          </div>
        )}

        <iframe
          key={iframeKey}
          src={demoUrl}
          title={`Live Demo for ${title}`}
          className="sandbox-iframe"
          onLoad={() => setIsEmbedLoaded(true)}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />
      </div>
    </div>
  );
};

