// src/components/SoundToggle.jsx
// Interactive sound effects mute/unmute toggle button component.
// Connects to: src/components/Navbar.jsx, src/utils/soundFX.js
// Created: 2026-07-31

import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { getSoundMutedState, toggleSoundMuteState, playClickSound } from '../utils/soundFX';
import './SoundToggle.css';

/**
 * Renders the global Web Audio sound effects toggle button.
 */
export function SoundToggle() {
  const [muted, setMuted] = useState(() => getSoundMutedState());

  const handleToggle = () => {
    const nextState = toggleSoundMuteState();
    setMuted(nextState);
    if (!nextState) {
      playClickSound();
    }
  };

  return (
    <button
      className={`sound-toggle-btn ${muted ? 'muted' : 'active'}`}
      onClick={handleToggle}
      title={muted ? 'Enable Web Audio SFX' : 'Mute Web Audio SFX'}
      aria-label={muted ? 'Enable sound effects' : 'Mute sound effects'}
    >
      {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
      <span className="sound-label">{muted ? 'SFX Off' : 'SFX On'}</span>
    </button>
  );
}
