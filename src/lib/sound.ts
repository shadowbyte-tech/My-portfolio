'use client'

let audioCtx: AudioContext | null = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioCtx;
}

export function playSound(type: 'hover' | 'click' | 'open') {
  if (typeof window === 'undefined') return;
  
  // Sounds enabled by default
  const enabled = localStorage.getItem('ui-sounds-enabled') !== 'false';
  if (!enabled) return;

  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') {
      // Audio contexts are often suspended until user interaction
      ctx.resume();
    }

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'hover') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.015, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } else if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1000, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } else if (type === 'open') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(500, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1500, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.15);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    }
  } catch (error) {
    console.warn('Audio Context error:', error);
  }
}

export function toggleSounds(enabled: boolean) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('ui-sounds-enabled', enabled ? 'true' : 'false');
  }
}

export function areSoundsEnabled(): boolean {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('ui-sounds-enabled') !== 'false';
  }
  return true;
}
