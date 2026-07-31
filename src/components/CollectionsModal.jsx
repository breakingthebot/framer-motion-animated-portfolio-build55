// src/components/CollectionsModal.jsx
// Interactive Custom Portfolio Showcase Collections & Bookmark Manager Modal.
// Connects to: src/App.jsx, src/components/ProjectCard.jsx, src/components/ProjectModal.jsx
// Created: 2026-07-31

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bookmark,
  Heart,
  Plus,
  Trash2,
  FolderPlus,
  Share2,
  Download,
  X,
  CheckCircle2,
  ExternalLink,
  Layers,
  Sparkles
} from 'lucide-react';
import './CollectionsModal.css';

/**
 * Renders the custom collections and bookmarked builds manager modal.
 * @param {Object} props
 * @param {boolean} props.isOpen - Modal visibility flag.
 * @param {Function} props.onClose - Modal close handler.
 * @param {Array<number>} props.bookmarkedIds - List of bookmarked build IDs.
 * @param {Function} props.onToggleBookmark - Callback to toggle bookmark status of a build.
 * @param {Array<Object>} props.builds - Full list of available project builds.
 * @param {Function} props.onSelectProject - Callback to view detail modal for a project.
 */
export function CollectionsModal({
  isOpen,
  onClose,
  bookmarkedIds = [],
  onToggleBookmark,
  builds = [],
  onSelectProject
}) {
  const [activeTab, setActiveTab] = useState('bookmarks'); // 'bookmarks' | 'collections'
  const [collections, setCollections] = useState(() => {
    const saved = localStorage.getItem('build_55_collections');
    return saved
      ? JSON.parse(saved)
      : [
          { id: 'c1', name: '⭐ Top Favorites', buildIds: [55, 54, 53] },
          { id: 'c2', name: '🎨 CSS & UI Masterpieces', buildIds: [50, 48, 42] }
        ];
  });
  const [newCollectionName, setNewCollectionName] = useState('');
  const [copiedNotice, setCopiedNotice] = useState(false);

  // Save collections to localStorage
  const saveCollectionsToStorage = (updated) => {
    setCollections(updated);
    localStorage.setItem('build_55_collections', JSON.stringify(updated));
  };

  /**
   * Handles creating a new custom collection.
   */
  const handleCreateCollection = (e) => {
    e.preventDefault();
    if (!newCollectionName.trim()) return;
    const newCol = {
      id: 'c_' + Date.now(),
      name: newCollectionName.trim(),
      buildIds: []
    };
    const updated = [...collections, newCol];
    saveCollectionsToStorage(updated);
    setNewCollectionName('');
  };

  /**
   * Handles removing a custom collection.
   * @param {string} colId - Collection ID to delete.
   */
  const handleDeleteCollection = (colId) => {
    const updated = collections.filter((c) => c.id !== colId);
    saveCollectionsToStorage(updated);
  };

  /**
   * Adds or removes a build from a specific collection.
   * @param {string} colId - Target collection ID.
   * @param {number} buildId - Target build ID.
   */
  const handleToggleBuildInCollection = (colId, buildId) => {
    const updated = collections.map((col) => {
      if (col.id === colId) {
        const exists = col.buildIds.includes(buildId);
        const newIds = exists
          ? col.buildIds.filter((id) => id !== buildId)
          : [...col.buildIds, buildId];
        return { ...col, buildIds: newIds };
      }
      return col;
    });
    saveCollectionsToStorage(updated);
  };

  /**
   * Exports the user's bookmarks and custom collections as JSON file.
   */
  const handleExportJSON = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      bookmarkedBuildIds: bookmarkedIds,
      collections: collections
    };
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `build55-collections-export-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  /**
   * Copies formatted Markdown text summary of bookmarks to clipboard.
   */
  const handleCopyMarkdown = () => {
    const bookmarkedProjects = builds.filter((b) => bookmarkedIds.includes(b.id));
    let text = `# Curated 246 Builds Collection\n\n`;
    bookmarkedProjects.forEach((b) => {
      text += `- **Build #${b.buildNumber}**: [${b.title}](${b.demoUrl}) - ${b.description}\n`;
    });
    navigator.clipboard.writeText(text);
    setCopiedNotice(true);
    setTimeout(() => setCopiedNotice(false), 2500);
  };

  if (!isOpen) return null;

  const bookmarkedBuilds = builds.filter((b) => bookmarkedIds.includes(b.id));

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="collections-modal-card"
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* MODAL HEADER */}
          <div className="collections-header">
            <div className="collections-title-group">
              <span className="collections-badge">
                <Bookmark size={14} /> Curated Manager
              </span>
              <h2>Bookmarked Builds &amp; Custom Collections</h2>
            </div>
            <button className="modal-close-btn" onClick={onClose}>
              <X size={18} />
            </button>
          </div>

          {/* SUB NAV TABS */}
          <div className="collections-tab-bar">
            <button
              className={`collections-tab ${activeTab === 'bookmarks' ? 'active' : ''}`}
              onClick={() => setActiveTab('bookmarks')}
            >
              <Heart size={15} /> Bookmarked Builds ({bookmarkedIds.length})
            </button>
            <button
              className={`collections-tab ${activeTab === 'collections' ? 'active' : ''}`}
              onClick={() => setActiveTab('collections')}
            >
              <FolderPlus size={15} /> Custom Playlists ({collections.length})
            </button>
          </div>

          {/* MODAL BODY */}
          <div className="collections-body">
            {activeTab === 'bookmarks' ? (
              <div className="bookmarks-tab-content">
                {bookmarkedBuilds.length === 0 ? (
                  <div className="empty-collections-state">
                    <Heart size={42} className="empty-icon" />
                    <h3>No Bookmarked Builds Yet</h3>
                    <p>
                      Click the heart icon on any project card or detail modal to save builds to your personal showcase!
                    </p>
                  </div>
                ) : (
                  <div className="bookmarked-grid">
                    {bookmarkedBuilds.map((b) => (
                      <motion.div
                        key={b.id}
                        className="bookmarked-item-card"
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                      >
                        <div className="item-header">
                          <span className="build-num">Build #{b.buildNumber}</span>
                          <button
                            className="remove-bookmark-btn"
                            onClick={() => onToggleBookmark(b.id)}
                            title="Remove Bookmark"
                          >
                            <Heart size={14} fill="#ef4444" color="#ef4444" />
                          </button>
                        </div>
                        <h4 className="item-title">{b.title}</h4>
                        <p className="item-desc">{b.description}</p>
                        <div className="item-actions">
                          <button
                            className="item-btn primary"
                            onClick={() => {
                              onClose();
                              onSelectProject(b);
                            }}
                          >
                            View Details
                          </button>
                          {b.demoUrl ? (
                            <a
                              href={b.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="item-btn secondary"
                            >
                              <ExternalLink size={13} /> Live
                            </a>
                          ) : (
                            <a
                              href={b.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="item-btn secondary"
                            >
                              GitHub
                            </a>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="collections-tab-content">
                {/* CREATE NEW COLLECTION FORM */}
                <form className="create-collection-form" onSubmit={handleCreateCollection}>
                  <input
                    type="text"
                    placeholder="Collection Name (e.g. 🔥 Best AI Agents)..."
                    value={newCollectionName}
                    onChange={(e) => setNewCollectionName(e.target.value)}
                  />
                  <button type="submit" className="create-btn">
                    <Plus size={16} /> Create Playlist
                  </button>
                </form>

                {/* COLLECTIONS LIST */}
                <div className="collections-list">
                  {collections.map((col) => {
                    const colBuilds = builds.filter((b) => col.buildIds.includes(b.id));
                    return (
                      <div key={col.id} className="collection-folder">
                        <div className="folder-header">
                          <div className="folder-name-group">
                            <FolderPlus size={16} className="folder-icon" />
                            <h3>{col.name}</h3>
                            <span className="count-chip">{col.buildIds.length} builds</span>
                          </div>
                          <button
                            className="delete-folder-btn"
                            onClick={() => handleDeleteCollection(col.id)}
                            title="Delete Collection"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>

                        {/* FOLDER ITEMS */}
                        {colBuilds.length === 0 ? (
                          <p className="folder-empty">No builds added to this playlist yet.</p>
                        ) : (
                          <div className="folder-items-tags">
                            {colBuilds.map((b) => (
                              <span key={b.id} className="folder-item-chip">
                                #{b.buildNumber} {b.title}
                                <button
                                  className="remove-chip-btn"
                                  onClick={() => handleToggleBuildInCollection(col.id, b.id)}
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* FOOTER ACTIONS */}
          <div className="collections-footer">
            <div className="export-actions">
              <button className="footer-action-btn" onClick={handleExportJSON}>
                <Download size={14} /> Export Backup (.json)
              </button>
              <button className="footer-action-btn" onClick={handleCopyMarkdown}>
                {copiedNotice ? <CheckCircle2 size={14} color="#10b981" /> : <Share2 size={14} />}
                {copiedNotice ? 'Copied Markdown!' : 'Copy Summary'}
              </button>
            </div>
            <button className="footer-done-btn" onClick={onClose}>
              Done
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
