import { motion, useScroll, useTransform } from 'motion/react';
import { Github, Linkedin, Mail, ArrowUpRight, ChevronDown } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import { SkillsTyping } from './components/TextTypingAnimation';
import ThreeDCard from './components/ThreeDCard';

/* ── Typewriter for rotating roles ── */
const ROLES = [
  'Future Cybersecurity Expert',
  'AI-Driven Builder',
  'Prompt Engineer',
  'Real-World Problem Solver',
];

const Typewriter = () => {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = ROLES[roleIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 55);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % ROLES.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIdx]);

  return (
    <span className="hero-typewriter">
      {displayed}
      <span className="hero-tw-cursor" />
    </span>
  );
};

/* ── Proof Signal Badge ── */
const Badge = ({ label, delay }: { label: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    className="hero-badge"
  >
    {label}
  </motion.div>
);

/* ══════════════════════════════════════════
   HERO SECTION COMPONENT
══════════════════════════════════════════ */
export const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const portraitY = useTransform(scrollY, [0, 700], [0, 90]);
  const contentY = useTransform(scrollY, [0, 700], [0, -40]);
  const overlayOpacity = useTransform(scrollY, [0, 500], [0, 0.6]);

  /* Mouse parallax on portrait */
  useEffect(() => {
    const section = sectionRef.current;
    const el = parallaxRef.current;
    if (!section || !el) return;
    const onMove = (e: MouseEvent) => {
      const r = section.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `translate(${x * -18}px, ${y * -10}px) scale(1.08)`;
    };
    const onLeave = () => { el.style.transform = 'translate(0,0) scale(1.08)'; };
    section.addEventListener('mousemove', onMove);
    section.addEventListener('mouseleave', onLeave);
    return () => {
      section.removeEventListener('mousemove', onMove);
      section.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden bg-black flex flex-col justify-end"
    >
      {/* ══ PHASE 1 — LETTERBOX BARS (cinematic entry) ══ */}
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 1.15, delay: 0.04, ease: [0.76, 0, 0.24, 1] }}
        className="absolute inset-x-0 top-0 h-[14vh] bg-black origin-top z-[50]"
      />
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 1.15, delay: 0.04, ease: [0.76, 0, 0.24, 1] }}
        className="absolute inset-x-0 bottom-0 h-[14vh] bg-black origin-bottom z-[50]"
      />

      {/* ══ PHASE 2 — FULL-BLEED PORTRAIT ══ */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: portraitY }}
      >
        {/* Portrait image with parallax + clip-path reveal */}
        <div className="hero-img-reveal absolute inset-0" style={{ overflow: 'hidden' }}>
          <div
            ref={parallaxRef}
            className="absolute inset-0"
            style={{ transform: 'scale(1.08)', transition: 'transform 0.26s cubic-bezier(0.16,1,0.3,1)' }}
          >
            <img
              src="/hero-main.jpg"
              alt="Sukka Manikanta Goud"
              className="hero-zoom w-full h-full object-cover"
              style={{ filter: 'brightness(0.78) contrast(1.08) saturate(0.82)', objectPosition: '60% 12%' }}
            />
          </div>
        </div>

        {/* Scanline + shine sweeps */}
        <div className="hero-scanline" />
        <div className="hero-shine" />

        {/* Layered gradients for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/96 via-black/60 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
        {/* Gold environmental glow on the right (portrait side) */}
        <div className="absolute top-0 right-0 w-[55%] h-full bg-gradient-to-l from-amber-900/20 to-transparent pointer-events-none" />
        {/* Radial depth vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,transparent_30%,rgba(0,0,0,0.55)_100%)] pointer-events-none" />

        {/* Subtle scroll parallax dark overlay */}
        <motion.div className="absolute inset-0 bg-black pointer-events-none" style={{ opacity: overlayOpacity }} />
      </motion.div>

      {/* ══ BACKGROUND DESIGN SYSTEM ══ */}
      {/* Precision grid */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)',
          backgroundSize: '90px 90px',
          opacity: 1,
        }}
      />
      {/* Gold ambient edge glow */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[300px] bg-gradient-to-tr from-amber-500/[0.06] to-transparent pointer-events-none z-[1] blur-3xl" />

      {/* Tactical corner brackets */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-8 left-8 z-10 pointer-events-none"
      >
        <div className="w-10 h-10 border-l-2 border-t-2 border-amber-400/30" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-8 right-8 z-10 pointer-events-none"
      >
        <div className="w-10 h-10 border-r-2 border-t-2 border-amber-400/30" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-8 left-8 z-10 pointer-events-none"
      >
        <div className="w-10 h-10 border-l-2 border-b-2 border-white/10" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-8 right-8 z-10 pointer-events-none"
      >
        <div className="w-10 h-10 border-r-2 border-b-2 border-white/10" />
      </motion.div>

      {/* ══ SIGNATURE VISUAL DETAILS — Left vertical label ══ */}
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.8, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-8 top-1/2 -translate-y-1/2 z-10 hidden xl:flex flex-col items-center gap-5"
      >
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-amber-400/50 to-transparent" />
        <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.55em] [writing-mode:vertical-rl] rotate-180 select-none">
          Cyber Security · AI Builder
        </p>
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-amber-400/50 to-transparent" />
      </motion.div>

      {/* ══ Right vertical label — Mission + Coordinates ══ */}
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.0, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute right-8 top-1/2 -translate-y-1/2 z-10 hidden xl:flex flex-col items-center gap-5"
      >
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-amber-400/30 to-transparent" />
        <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.55em] [writing-mode:vertical-rl] select-none">
          Mission 2030 · 18.183°N
        </p>
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-amber-400/30 to-transparent" />
      </motion.div>

      {/* ══ Floating Social Links (right side) ══ */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute right-8 bottom-28 z-10 hidden xl:flex flex-col items-center gap-4"
      >
        <a href="https://github.com/shadowbyte-tech" target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-white transition-colors duration-300 hover:scale-110 transform">
          <Github size={15} />
        </a>
        <div className="w-px h-5 bg-white/8" />
        <a href="https://www.linkedin.com/in/sukkamanikantagoud/" target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-white transition-colors duration-300 hover:scale-110 transform">
          <Linkedin size={15} />
        </a>
        <div className="w-px h-5 bg-white/8" />
        <a href="mailto:sukkamanikantagoud@gmail.com" className="text-zinc-600 hover:text-white transition-colors duration-300 hover:scale-110 transform">
          <Mail size={15} />
        </a>
      </motion.div>

      {/* ══ ACTIVE BUILD MODE — Status pulse (top-right of content) ══ */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-24 right-8 md:right-16 z-10 hidden md:block"
      >
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.04] backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,1)] animate-pulse" />
          <span className="text-[10px] font-mono text-emerald-400/70 uppercase tracking-[0.45em] font-bold">
            Active Build Mode
          </span>
        </div>
      </motion.div>

      {/* ══ MAIN CONTENT COLUMN ══ */}
      <motion.div
        className="relative z-10 max-w-[1440px] mx-auto w-full px-8 md:px-16 xl:px-24 pb-20 pt-36"
        style={{ y: contentY }}
      >
        <div className="max-w-[52rem]">

          {/* ── PHASE 1 — SMG Monogram badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.55, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-5 mb-10"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-400 flex items-center justify-center text-black text-[10px] font-black tracking-wider shadow-[0_0_30px_rgba(251,191,36,0.35)] select-none">
              SMG
            </div>
            <div className="h-px w-12 bg-gradient-to-r from-amber-400/50 to-transparent" />
            <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.55em]">
              JNTUH Sultanpur · 2026
            </span>
          </motion.div>

          {/* ── PHASE 3 — NAME REVEAL SYSTEM ── */}
          <div className="mb-6 select-none">
            {/* SUKKA — Solid bold white */}
            <div className="overflow-hidden leading-none">
              <motion.h1
                initial={{ y: '115%', opacity: 0, skewY: 2 }}
                animate={{ y: 0, opacity: 1, skewY: 0 }}
                transition={{ duration: 1.05, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="hero-name-sukka"
              >
                SUKKA
              </motion.h1>
            </div>

            {/* MANIKANTA — Ghost outline with face showing through */}
            <div className="overflow-hidden leading-none relative">
              <motion.p
                initial={{ y: '115%', opacity: 0, skewY: 2 }}
                animate={{ y: 0, opacity: 1, skewY: 0 }}
                transition={{ duration: 1.05, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
                className="hero-name-manikanta"
              >
                MANIKANTA
              </motion.p>
            </div>

            {/* GOUD — Gold premium signature */}
            <div className="overflow-hidden leading-none">
              <motion.p
                initial={{ y: '115%', opacity: 0, skewY: 2 }}
                animate={{ y: 0, opacity: 1, skewY: 0 }}
                transition={{ duration: 1.05, delay: 1.22, ease: [0.16, 1, 0.3, 1] }}
                className="hero-name-goud"
              >
                GOUD
              </motion.p>
            </div>
          </div>

          {/* ── PHASE 5 — Philosophy line ── */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-[13px] md:text-sm font-medium italic text-zinc-500 tracking-wide mb-6"
          >
            "Built on Curiosity.&nbsp;&nbsp;Driven by Execution."
          </motion.p>

          {/* ── Divider ── */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, delay: 1.45, ease: [0.16, 1, 0.3, 1] }}
            className="origin-left h-px w-full max-w-md bg-gradient-to-r from-amber-400/50 via-white/10 to-transparent mb-9"
          />

          {/* ── PHASE 4 — Identity positioning + CTA row ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-8 mb-10"
          >
            {/* Skills Typing Animation */}
            <div className="flex items-center gap-3 h-12 min-w-0">
              <div className="w-1 h-1 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)] flex-shrink-0" />
              <div className="text-lg md:text-xl font-bold uppercase tracking-[0.32em] text-zinc-300">
                <SkillsTyping />
              </div>
            </div>

            {/* Separator — desktop only */}
            <div className="hidden sm:block w-px h-7 bg-white/10" />

            {/* ── PHASE 7 — CTA Buttons ── */}
            <div className="flex items-center gap-4">
              <a
                href="#projects"
                id="hero-cta-primary"
                className="hero-cta-gold group flex items-center gap-2.5"
                data-hover
              >
                Explore My Work
                <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </a>
              <a
                href="#about"
                id="hero-cta-secondary"
                className="hero-cta-glass group flex items-center gap-2.5"
                data-hover
              >
                View My Journey
                <ChevronDown size={12} className="group-hover:translate-y-0.5 transition-transform duration-300" />
              </a>
            </div>
          </motion.div>

          {/* ── PHASE 6 — Proof Signals ── */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-2.5 mb-12"
          >
            {[
              { label: '⬡ JNTUH Sultanpur' },
              { label: '⬡ Cyber Security' },
              { label: '⬡ Trusted Consultancy' },
              { label: '⬡ Active Build Mode' },
              { label: '⬡ Mission 2030' },
            ].map((b, i) => (
              <Badge key={b.label} label={b.label} delay={1.9 + i * 0.07} />
            ))}
          </motion.div>

          {/* ── Stats row ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 2.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex gap-8 md:gap-14 pt-8 border-t border-white/[0.06]"
          >
            {[
              { val: 'B.Tech', label: 'Cyber Security' },
              { val: 'AI+', label: 'Force Multiplier' },
              { val: '2030', label: 'Mission Year' },
            ].map((s, i) => (
              <div key={`${s.val}-${i}`} className="space-y-1.5 pr-8 md:pr-14 border-r border-white/[0.05] last:border-0">
                <p className="text-xl md:text-2xl font-black text-white tracking-tight">{s.val}</p>
                <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.45em]">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* ══ SCROLL CUE ══ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-9 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 hero-scroll-cue"
      >
        <div className="w-px h-10 bg-gradient-to-b from-transparent via-amber-400/55 to-transparent" />
        <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.55em] select-none">
          ↓ Begin Journey
        </p>
      </motion.div>

      {/* ══ COORDINATES — bottom left ══ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.3, duration: 0.9 }}
        className="absolute bottom-9 left-8 z-10 hidden md:block"
      >
        <p className="text-[10px] font-mono text-zinc-700 uppercase tracking-[0.45em] select-none">
          18.183° N · 78.336° E · Sultanpur
        </p>
      </motion.div>
    </section>
  );
};
