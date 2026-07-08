import { useState, useEffect } from 'react';

const TERMINAL = [
  'Authenticating Identity…',
  'Booting SMG Interface…',
  'Loading Build System…',
  'Identity Verified.',
] as const;

interface Props { onComplete: () => void; }

export const LoadingScreen = ({ onComplete }: Props) => {
  const [stage,   setStage]   = useState(0);
  const [tLines,  setTLines]  = useState(0);
  const [pct,     setPct]     = useState(0);
  const [exiting, setExiting] = useState(false);

  /* ── Stage timeline ── */
  useEffect(() => {
    const t = [
      setTimeout(() => setStage(1),  100),   // corners + hline + HUD
      setTimeout(() => setStage(2),  600),   // SMG wipe
      setTimeout(() => setStage(3), 1250),   // full name
      setTimeout(() => setStage(4), 1750),   // terminal + bar
      setTimeout(() => setStage(5), 3000),   // quote
      setTimeout(() => setExiting(true), 3600),
      setTimeout(() => onComplete(),       4100),
    ];
    return () => t.forEach(clearTimeout);
  }, [onComplete]);

  /* ── Terminal lines: 1 per 300ms ── */
  useEffect(() => {
    if (stage < 4) return;
    let n = 0;
    const iv = setInterval(() => {
      n++;
      setTLines(n);
      if (n >= TERMINAL.length) clearInterval(iv);
    }, 300);
    return () => clearInterval(iv);
  }, [stage]);

  /* ── Progress counter (RAF) ── */
  useEffect(() => {
    if (stage < 4) return;
    let raf: number;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(Math.round(((now - t0) / 1700) * 100), 100);
      setPct(p);
      if (p < 100) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [stage]);

  const on = (s: number) => stage >= s;

  return (
    <div className={`ls-wrap${exiting ? ' ls-exit' : ''}`}>

      {/* Ambient glow */}
      <div className={`ls-orb${on(1) ? ' ls-orb-on' : ''}`} />
      <div className="ls-noise" />

      {/* Corner marks */}
      {(['tl','tr','bl','br'] as const).map(p => (
        <div key={p} className={`ls-corner ls-corner-${p}${on(1) ? ' ls-corner-on' : ''}`} />
      ))}

      {/* HUD labels */}
      <span className={`ls-hud ls-hud-tl${on(1) ? ' ls-hud-on' : ''}`}>SMG_SYSTEM&nbsp;·&nbsp;v1.0</span>
      <span className={`ls-hud ls-hud-tr${on(1) ? ' ls-hud-on' : ''}`}>PORTFOLIO.2026</span>
      <span className={`ls-hud ls-hud-bl${on(1) ? ' ls-hud-on' : ''}`}>18.183°N&nbsp;·&nbsp;78.336°E</span>
      <span className={`ls-hud ls-hud-br${on(4) ? ' ls-hud-on' : ''}`}>{String(pct).padStart(3,'0')}%</span>

      {/* ── CENTER ── */}
      <div className="ls-center">

        {/* Horizontal rule that draws from center out */}
        <div className={`ls-hline${on(1) ? ' ls-hline-on' : ''}`} />

        {/* SMG — large clip-path wipe */}
        <div className={`ls-monogram${on(2) ? ' ls-monogram-on' : ''}`}>
          <span className="ls-smg-outline">SMG</span>
          <span className={`ls-smg-fill${on(2) ? ' ls-smg-fill-on' : ''}`}>SMG</span>
        </div>

        {/* Full name — staggered words */}
        <div className={`ls-name-row${on(3) ? ' ls-name-row-on' : ''}`}>
          <span className="ls-n1">SUKKA</span>
          <span className="ls-n2">MANIKANTA</span>
          <span className="ls-n3">GOUD</span>
        </div>

        {/* Thin separator */}
        <div className={`ls-sep${on(3) ? ' ls-sep-on' : ''}`} />

        {/* Terminal lines */}
        <div className={`ls-terminal${on(4) ? ' ls-terminal-on' : ''}`}>
          {TERMINAL.map((line, i) => (
            <div key={i} className={`ls-tline${i < tLines ? ' ls-tline-on' : ''}`}>
              <span className={`ls-chevron${i === TERMINAL.length - 1 && tLines >= TERMINAL.length ? ' ls-chevron-done' : ''}`}>›</span>
              <span>{line}</span>
              {i < TERMINAL.length - 1 && i === tLines - 1 && <span className="ls-cursor" />}
              {i === TERMINAL.length - 1 && tLines >= TERMINAL.length && <span className="ls-check">✓</span>}
            </div>
          ))}
        </div>

        {/* Final quote */}
        <div className={`ls-quote${on(5) ? ' ls-quote-on' : ''}`}>
          "Curious Mind.&nbsp;&nbsp;Builder Mindset."
        </div>

      </div>

      {/* Progress bar */}
      <div className={`ls-bar-track${on(4) ? ' ls-bar-on' : ''}`}>
        <div className="ls-bar-fill" style={{ transform: `scaleX(${pct / 100})` }} />
        <div className="ls-bar-glow" style={{ left: `${pct}%` }} />
      </div>

      {/* Bottom tagline */}
      <span className={`ls-tagline${on(1) ? ' ls-hud-on' : ''}`}>
        Cyber Security&nbsp;·&nbsp;AI Builder&nbsp;·&nbsp;Frontend Engineer
      </span>

    </div>
  );
};
