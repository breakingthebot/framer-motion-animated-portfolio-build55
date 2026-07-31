// src/components/ContactBookingModal.jsx
// Interactive Recruiter Direct Contact & Technical Interview Scheduling Modal.
// Connects to: src/App.jsx, src/components/Navbar.jsx
// Created: 2026-07-31

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Linkedin, Github, Calendar, Send, CheckCircle2, MessageSquare, Briefcase, Clock, ShieldCheck } from 'lucide-react';
import { playClickSound, playModalOpenSound } from '../utils/soundFX';
import './ContactBookingModal.css';

/**
 * Renders an interactive recruiter contact and interview scheduling modal.
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether contact modal is open.
 * @param {Function} props.onClose - Modal close handler.
 */
export function ContactBookingModal({ isOpen, onClose }) {
  const [inquiryType, setInquiryType] = useState('Full-Time Role'); // 'Full-Time Role' | 'Technical Advisory' | 'Contract / Consulting'
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (isOpen) {
      playModalOpenSound();
      setIsSubmitted(false);
      setErrorMsg('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg('Please fill in your name, email, and message.');
      return;
    }

    if (!formData.email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    playClickSound();
    setErrorMsg('');
    setIsSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="contact-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="contact-modal-card"
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* HEADER */}
          <div className="contact-modal-header">
            <div className="contact-header-title">
              <span className="contact-kicker">Recruiter &amp; Leadership Outreach</span>
              <h2 className="contact-title">Schedule Technical Call / Get in Touch</h2>
            </div>
            <button className="contact-close-btn" onClick={onClose}>
              <X size={18} />
            </button>
          </div>

          <div className="contact-modal-body">
            {/* QUICK CONTACT CHIPS */}
            <div className="quick-contact-grid">
              <a
                href="mailto:contact@breakingthebot.com"
                className="quick-contact-card"
                onClick={() => playClickSound()}
              >
                <Mail size={18} className="qc-icon red" />
                <div className="qc-info">
                  <span className="qc-label">Direct Email</span>
                  <span className="qc-val">contact@breakingthebot.com</span>
                </div>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="quick-contact-card"
                onClick={() => playClickSound()}
              >
                <Linkedin size={18} className="qc-icon blue" />
                <div className="qc-info">
                  <span className="qc-label">LinkedIn Profile</span>
                  <span className="qc-val">linkedin.com/in/breakingthebot</span>
                </div>
              </a>

              <a
                href="https://github.com/breakingthebot"
                target="_blank"
                rel="noopener noreferrer"
                className="quick-contact-card"
                onClick={() => playClickSound()}
              >
                <Github size={18} className="qc-icon purple" />
                <div className="qc-info">
                  <span className="qc-label">GitHub Codebase</span>
                  <span className="qc-val">github.com/breakingthebot</span>
                </div>
              </a>
            </div>

            {/* INQUIRY CATEGORY TABS */}
            <div className="inquiry-tab-section">
              <span className="section-label">Inquiry Category:</span>
              <div className="inquiry-tabs-strip">
                {['Full-Time Role', 'Technical Advisory', 'Contract / Consulting'].map((cat) => (
                  <button
                    key={cat}
                    className={`inquiry-tab-btn ${inquiryType === cat ? 'active' : ''}`}
                    onClick={() => {
                      playClickSound();
                      setInquiryType(cat);
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* FORM OR SUCCESS TOAST */}
            {isSubmitted ? (
              <motion.div
                className="contact-success-box"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <CheckCircle2 size={48} className="success-icon" />
                <h3>Thank You for Reaching Out!</h3>
                <p>
                  Your message regarding <strong>{inquiryType}</strong> has been sent. I will respond within 24 hours.
                </p>
                <button
                  className="reset-form-btn"
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', email: '', company: '', message: '' });
                  }}
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                {errorMsg && <div className="form-error-banner">{errorMsg}</div>}

                <div className="form-row">
                  <div className="form-field">
                    <label className="form-label">Your Name *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="form-field">
                    <label className="form-label">Email Address *</label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="jane@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label className="form-label">Company / Organization</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Acme Corp / Tech Recruiting"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>

                <div className="form-field">
                  <label className="form-label">Message / Role Details *</label>
                  <textarea
                    className="form-textarea"
                    rows="4"
                    placeholder="Provide details about your role, team, or project inquiry..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="form-submit-btn">
                  <Send size={16} /> Send Direct Inquiry Message
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
