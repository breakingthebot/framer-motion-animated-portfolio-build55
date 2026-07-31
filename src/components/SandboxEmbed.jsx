// src/components/SandboxEmbed.jsx
// Interactive Live Component Sandbox & Web App Embed Component.
// Created: 2026-07-31

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCw, Monitor, Smartphone, Tablet, Maximize2, ExternalLink } from 'lucide-react';
import './SandboxEmbed.css';

export const SandboxEmbed = ({ demoUrl, title }) => {
  const [isEmbedLoaded, setIsEmbedLoaded] = useState(false);
  const [deviceFrame, setDeviceFrame] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'
  const [iframeKey, setIframeKey] = useState(0);

  const handleRefresh = () => {
    setIsEmbedLoaded(false);
    setIframeKey((prev) => prev + 1);
  };

  return (
    <div className="sandbox-embed-container">
      <div className="sandbox-top-bar">
        <div className="sandbox-title-group">
          <Play size={14} className="sandbox-play-icon" />
          <span className="sandbox-label">Live App Interactive Sandbox</span>
        </div>

        <div className="sandbox-viewport-controls">
          <button
            className={`device-btn ${deviceFrame === 'desktop' ? 'active' : ''}`}
            onClick={() => setDeviceFrame('desktop')}
            title="Desktop View"
          >
            <Monitor size={14} />
          </button>
          <button
            className={`device-btn ${deviceFrame === 'tablet' ? 'active' : ''}`}
            onClick={() => setDeviceFrame('tablet')}
            title="Tablet View"
          >
            <Tablet size={14} />
          </button>
          <button
            className={`device-btn ${deviceFrame === 'mobile' ? 'active' : ''}`}
            onClick={() => setDeviceFrame('mobile')}
            title="Mobile View"
          >
            <Smartphone size={14} />
          </button>

          <div className="sandbox-divider" />

          <button className="sandbox-action-btn" onClick={handleRefresh} title="Refresh Live Sandbox">
            <RotateCw size={13} />
          </button>
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="sandbox-action-btn"
            title="Open in New Window"
          >
            <ExternalLink size={13} />
          </a>
        </div>
      </div>

      <div className={`sandbox-frame-wrapper ${deviceFrame}`}>
        {!isEmbedLoaded && (
          <div className="sandbox-loading-overlay">
            <div className="sandbox-spinner" />
            <span>Loading Live Demo ({title})...</span>
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
