import { motion, AnimatePresence } from 'motion/react';
import { LoadingScreen } from './LoadingScreen';
import { HeroSection } from './HeroSection';
import WelcomeScreen from './components/WelcomeScreen';
import AnimatedBackground from './components/AnimatedBackground';
import ThreeDCard from './components/ThreeDCard';
import TextTypingAnimation, { SkillsTyping } from './components/TextTypingAnimation';
import RefreshRedirect from './components/RefreshRedirect';
import EnhancedPortfolioCard from './components/EnhancedPortfolioCard';
import AdvancedContactForm from './components/AdvancedContactForm';
import GSATextAnimation from './components/GSATextAnimation';
import Flip3DCards from './components/Flip3DCards';
import SmoothScroll from './components/SmoothScroll';
import MarqueeFooter from './components/MarqueeFooter';
import { hasPlayedIntro, setIntroPlayed, clearIntroState } from './lib/introState';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Terminal,
  ArrowUpRight,
  Code2,
  Cpu,
  Shield,
  Layout,
  Zap,
  ChevronRight,
  Monitor,
  Globe,
  Database,
  Lock,
  ExternalLink,
  Sun,
  Moon,
  X
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { ThemeProvider, useTheme } from './lib/theme';


/* ── Custom Cursor ─────────────────────────────── */
const Cursor = () => {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (dot.current) { dot.current.style.left = e.clientX + 'px'; dot.current.style.top = e.clientY + 'px'; }
      if (ring.current) { ring.current.style.left = e.clientX + 'px'; ring.current.style.top = e.clientY + 'px'; }
    };
    const over = (e: MouseEvent) => { if ((e.target as Element)?.closest('a,button,[data-hover]')) ring.current?.classList.add('hovering'); else ring.current?.classList.remove('hovering'); };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseover', over); };
  }, []);
  return (<><div ref={dot} className="cursor-dot" /><div ref={ring} className="cursor-ring" /></>);
};

/* ── Marquee Ticker ─────────────────────────────── */
const items = ['Frontend Developer','AI Builder','Cyber Security Student','Prompt Engineer','React · TypeScript','JNTUH Sultanpur','shadowbyte-tech'];
const Ticker = () => (
  <div className="relative overflow-hidden border-y border-white/[0.04] py-4 bg-zinc-950/30">
    <div className="marquee-track">
      {[...items,...items].map((t,i) => (
        <span key={i} className="inline-flex items-center gap-6 px-8 text-[12px] font-black uppercase tracking-[0.5em] text-zinc-700">
          {t}<span className="text-amber-500/40">✦</span>
        </span>
      ))}
    </div>
  </div>
);

/**
 * Professional Portfolio: SUKKA MANIKANTA GOUD
 * Digital Identity: Frontend Developer | AI Builder | Future Cybersecurity Engineer
 */

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()
  return (
    <button
      onClick={toggleTheme}
      className="relative w-10 h-10 rounded-xl bg-zinc-900/50 border border-white/[0.05] flex items-center justify-center text-zinc-500 hover:text-amber-400 hover:border-amber-400/20 transition-all duration-400 group active:scale-95"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <Sun 
        size={16} 
        className={`absolute transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          theme === 'dark' 
            ? 'opacity-0 rotate-90 scale-50' 
            : 'opacity-100 rotate-0 scale-100'
        }`} 
      />
      <Moon 
        size={16} 
        className={`absolute transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          theme === 'dark' 
            ? 'opacity-100 rotate-0 scale-100' 
            : 'opacity-0 -rotate-90 scale-50'
        }`} 
      />
    </button>
  )
}

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const total = document.body.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Journey', id: 'about' },
    { name: 'Stack', id: 'skills' },
    { name: 'Builds', id: 'projects' },
    { name: 'Character', id: 'beyond' },
    { name: 'Inbound', id: 'contact' },
  ];

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Scroll Progress */}
      <div className="fixed top-0 left-0 h-[1px] z-[200] bg-amber-400/70 transition-all duration-100 pointer-events-none" style={{ width: `${progress}%` }} />

      <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${scrolled ? 'py-3' : 'py-7'}`}>
        <div className={`max-w-[1400px] mx-auto px-6 md:px-12 flex justify-between items-center transition-all duration-700 ${scrolled ? 'glass py-3 px-8 rounded-2xl border border-white/[0.04] shadow-[0_20px_80px_rgba(0,0,0,0.9)]' : ''}`}>
          <a href="#" className="flex items-center gap-4 group">
            <div className="relative w-9 h-9 overflow-hidden rounded-xl bg-amber-400 flex items-center justify-center text-black text-[12px] font-black transition-all duration-500 shadow-lg shadow-amber-400/20">
              SMG
              <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </div>
            <div className="hidden sm:block">
              <p className="text-[11px] font-black tracking-[0.18em] text-zinc-100 uppercase leading-none mb-0.5">Sukka Manikanta Goud</p>
              <p className="text-[12px] font-mono text-amber-500/50 uppercase tracking-[0.4em] leading-none">Cyber Identity</p>
            </div>
          </a>

          <div className="hidden lg:flex gap-6 items-center">
            {navLinks.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-[12px] font-black uppercase tracking-[0.45em] text-zinc-600 hover:text-white transition-colors duration-300 relative group py-2"
              >
                {item.name}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-amber-400/50 group-hover:w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
              </a>
            ))}
            <div className="w-px h-6 bg-white/[0.05]" />
            <ThemeToggle />
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="shimmer-btn px-5 py-2.5 rounded-xl bg-zinc-950 border border-white/[0.07] text-zinc-500 hover:text-white hover:border-amber-400/20 transition-all duration-400 text-[12px] font-black uppercase tracking-[0.3em]"
            >
              Resume ↗
            </a>
          </div>

          {/* Mobile hamburger — animated to X when open */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden relative w-10 h-10 rounded-xl bg-zinc-900/50 border border-white/[0.05] flex flex-col justify-center items-center group active:scale-95 transition-all"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <div className="relative w-5 h-4">
              <div className={`absolute top-0 left-0 w-full h-px bg-zinc-500 group-hover:bg-white transition-all duration-400 ${
                mobileMenuOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : ''
              }`} />
              <div className={`absolute top-1/2 -translate-y-1/2 left-0 w-full h-px bg-zinc-500 group-hover:bg-white transition-all duration-400 ${
                mobileMenuOpen ? 'opacity-0 scale-x-0' : ''
              }`} />
              <div className={`absolute bottom-0 left-0 w-full h-px bg-zinc-500 group-hover:bg-white transition-all duration-400 ${
                mobileMenuOpen ? 'bottom-1/2 translate-y-1/2 -rotate-45' : ''
              }`} />
            </div>
          </button>
        </div>
      </nav>

      {/* ── Mobile Menu Drawer ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 z-[95] h-full w-full max-w-sm bg-black/95 backdrop-blur-2xl border-l border-white/[0.04] lg:hidden flex flex-col"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between p-6 border-b border-white/[0.04]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center text-black text-[12px] font-black">
                    SMG
                  </div>
                  <div>
                    <p className="text-[12px] font-black tracking-[0.15em] text-zinc-100 uppercase leading-none mb-0.5">Navigation</p>
                    <p className="text-[12px] font-mono text-amber-500/50 uppercase tracking-[0.3em] leading-none">Menu</p>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-9 h-9 rounded-lg bg-zinc-900/70 border border-white/[0.05] flex items-center justify-center text-zinc-500 hover:text-white hover:border-white/10 transition-all duration-300 active:scale-90"
                  aria-label="Close menu"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Nav links */}
              <div className="flex-1 flex flex-col justify-center px-6 py-8 gap-2">
                {navLinks.map((item, i) => (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={handleNavClick}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="group flex items-center justify-between py-4 px-5 rounded-2xl text-zinc-500 hover:text-white hover:bg-white/[0.03] transition-all duration-400"
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-[12px] text-amber-500/40 font-black uppercase tracking-[0.2em]">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-[13px] font-bold uppercase tracking-[0.25em]">
                        {item.name}
                      </span>
                    </div>
                    <span className="w-5 h-5 rounded-full border border-zinc-800 group-hover:border-amber-400/30 flex items-center justify-center transition-all duration-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-800 group-hover:bg-amber-400 transition-all duration-400" />
                    </span>
                  </motion.a>
                ))}
              </div>

              {/* Bottom actions */}
              <div className="p-6 border-t border-white/[0.04] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-mono text-zinc-700 uppercase tracking-[0.3em] font-bold">Theme</span>
                  <ThemeToggle />
                </div>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3.5 px-5 rounded-2xl bg-amber-400 text-black font-bold text-[12px] uppercase tracking-[0.3em] flex items-center justify-center gap-2 hover:bg-amber-500 transition-all duration-300 active:scale-[0.98]"
                >
                  View Resume ↗
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

const SectionHeader = ({ title, subtitle, mono, dark = false }: { title: string; subtitle?: string; mono?: string; dark?: boolean }) => (
  <div className="max-w-4xl mb-20">
    {mono && (
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-4 h-px ${dark ? 'bg-amber-500/40' : 'bg-amber-500/40'}`} />
        <p className={`font-mono text-[12px] tracking-[0.6em] uppercase font-black ${dark ? 'text-amber-600/70' : 'text-amber-500/60'}`}>{mono}</p>
      </div>
    )}
    <h2 className={`text-4xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tighter mb-7 leading-[1.02] ${dark ? 'text-zinc-950' : 'text-zinc-50'}`}>{title}</h2>
    {subtitle && <p className={`text-base md:text-lg font-medium max-w-xl leading-relaxed ${dark ? 'text-zinc-600' : 'text-zinc-500'}`}>{subtitle}</p>}
  </div>
);

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showApp, setShowApp] = useState(true);

  useEffect(() => {
    document.body.style.overflow = loaded ? 'auto' : 'hidden';
  }, [loaded]);

  useEffect(() => {
    // Only run welcome screen logic after loading is complete
    if (!loaded) return

    const currentHash = window.location.hash
    const pathname = window.location.pathname

    // If returning from detail to portfolio
    if (currentHash === '#portfolio') {
      setShowWelcome(false)
      setShowApp(true)
      return
    }

    const navEntries = performance.getEntriesByType('navigation')
    const navigationType =
      navEntries.length > 0
        ? (navEntries[0] as PerformanceNavigationTiming).type
        : null

    const isReload = navigationType === 'reload'

    // Only homepage resets intro
    if (isReload && pathname === '/') {
      clearIntroState()

      if (window.location.hash) {
        history.replaceState(null, '', '/')
      }

      window.scrollTo({
        top: 0,
        behavior: 'instant',
      })
    }

    // Force show welcome screen for testing
    console.log('Setting welcome screen to show')
    setShowWelcome(true)
    setShowApp(false)

    const timer = setTimeout(() => {
      console.log('Hiding welcome screen')
      setShowWelcome(false)
      setShowApp(true)
      setIntroPlayed()
    }, 2800)

    return () => clearTimeout(timer)
  }, [loaded])

  return (
    <ThemeProvider>
    <SmoothScroll>
      <RefreshRedirect />
      {/* ── PREMIUM LOADING SCREEN ── */}
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}

      {/* ── MAIN PORTFOLIO — mounts fresh after load so hero animations fire ── */}
      {loaded && (
        <>
          {/* Welcome Screen */}
          <AnimatePresence>
            {showWelcome && (
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: 0 }}
                exit={{ y: '-100%' }}
                onAnimationStart={(definition) => {
                  if (definition === 'exit') {
                    setShowApp(true)
                  }
                }}
                transition={{
                  duration: 1.2,
                  ease: [0.76, 0, 0.24, 1],
                }}
                style={{
                  position: 'fixed',
                  inset: 0,
                  zIndex: 9999,
                }}
              >
                <WelcomeScreen />
              </motion.div>
            )}
          </AnimatePresence>

          {showApp && (
            <div className="min-h-screen bg-black text-zinc-100 font-sans antialiased overflow-x-hidden" style={{ position: 'relative', overflow: 'hidden' }}>
              <AnimatedBackground />
              
              <div style={{ position: 'relative', zIndex: 2 }}>
                <Cursor />
                <Navbar />
                <HeroSection />

      {/* ── MARQUEE TICKER ────────────────────────── */}
      <Ticker />

      {/* My Journey Section */}
      <section id="about" className="py-56 px-6 md:px-12 bg-zinc-950/10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-28 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="relative"
          >
            <div className="aspect-[3/4] rounded-[2.5rem] overflow-hidden border border-white/[0.06] relative group shadow-[0_30px_80px_rgba(0,0,0,0.6)] card-glow">
              <img
                src="/about-main.jpg"
                alt="Sukka Manikanta Goud — Personal Identity"
                className="w-full h-full object-cover object-center brightness-95 group-hover:brightness-105 transition-all duration-1000 group-hover:scale-[1.03]"
              />
            </div>
            
            <div className="absolute -bottom-10 -right-10 hidden xl:block">
              <div className="p-10 glass rounded-3xl border border-white/5 backdrop-blur-3xl max-w-[320px] shadow-2xl">
                <div className="space-y-6">
                  <p className="text-[12px] font-mono text-zinc-800 uppercase tracking-[0.5em] font-black italic border-b border-white/5 pb-3 w-fit">The Journey</p>
                  <GSATextAnimation 
                    keywords={['Kamareddy', 'mastery', 'frontend', 'cybersecurity', 'production', 'AI']}
                    highlightColor="251, 191, 36"
                  >
                    <div className="space-y-4">
                      <p className="text-lg text-zinc-400 font-medium leading-relaxed tracking-tight max-w-lg">
                        Started with a single HTML tag in Kamareddy. Now engineering systems that anticipate scale. From frontend interfaces to cybersecurity fundamentals, every project is a step toward mastery.
                      </p>
                      <p className="text-lg text-zinc-400 font-medium leading-relaxed tracking-tight max-w-lg">
                        Currently focused on React ecosystems, AI integration, and building production-grade applications that solve real-world problems. Learning never stops.
                      </p>
                    </div>
                  </GSATextAnimation>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-16"
          >
            <div className="space-y-8">
               <motion.p
                 initial={{opacity:0,y:8}} whileInView={{opacity:1,y:0}}
                 viewport={{once:true}} transition={{duration:0.7,delay:0.2}}
                 className="text-amber-500 font-mono text-[12px] tracking-[0.6em] uppercase font-black"
               >// MY REAL STORY</motion.p>
               <motion.h2
                 initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}}
                 viewport={{once:true}} transition={{duration:1,delay:0.3,ease:[0.16,1,0.3,1]}}
                 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-zinc-50 leading-[0.92]"
               >Curious Mind. <br /> Builder Mindset.</motion.h2>
            </div>
            
            <div className="mt-12 space-y-12">
              <div className="border-l border-white/10 pl-8 relative space-y-16">
                {[
                  { phase: "Phase 01", title: "Frontend Foundations", desc: "Started with the structural web. Learned to build high-fidelity interfaces and understand browser mechanics." },
                  { phase: "Phase 02", title: "AI & Prompt Engineering Pivot", desc: "Realized code is just execution. Shifted focus to using AI as a leverage multiplier to build faster and smarter." },
                  { phase: "Phase 03", title: "Cyber Security Expansion", desc: "Moved from building systems to breaking and securing them. Deep-diving into web vulnerabilities and defensive architecture." },
                  { phase: "Phase 04", title: "Startup Vision", desc: "The ultimate goal: combine AI, frontend engineering, and cybersecurity to launch autonomous, secure systems." },
                ].map((item, i) => (
                  <motion.div key={i} initial={{opacity:0, x:-10}} whileInView={{opacity:1, x:0}} viewport={{once:true}} transition={{duration:0.8, delay:i*0.15}} className="relative group">
                    <div className="absolute -left-[37px] top-1.5 w-2.5 h-2.5 rounded-full bg-zinc-800 border-2 border-black group-hover:bg-amber-400 transition-colors duration-500" />
                    <p className="text-[12px] font-mono text-amber-500/80 uppercase tracking-widest mb-1.5 font-bold">{item.phase}</p>
                    <p className="text-xl font-bold text-zinc-100 mb-2">{item.title}</p>
                    <p className="text-sm text-zinc-400 leading-relaxed max-w-lg">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex gap-16 pt-12 border-t border-white/5 items-center">
              <SocialLink icon={<Github size={20} />} name="GitHub" href="https://github.com/shadowbyte-tech" newTab />
              <div className="w-px h-10 bg-white/5" />
              <SocialLink icon={<Linkedin size={20} />} name="LinkedIn" href="https://www.linkedin.com/in/sukkamanikantagoud/" newTab />
            </div>
          </motion.div>
        </div>
      </section>



      {/* Skills Section: Core Stack */}
      <section id="skills" className="py-72 px-6 md:px-12 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_0.45fr] gap-32">
            <div>
              <SectionHeader 
                mono="Technical Arsenal"
                title="Capability Matrix."
                subtitle="A strategic mapping of my current execution capabilities and learning trajectories."
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-20">
                {[
                  { 
                    category: "Building", 
                    skills: ["React 18", "TypeScript", "Tailwind CSS", "Architecture"],
                    desc: "Engineering high-fidelity, component-driven frontend systems."
                  },
                  { 
                    category: "Strategic AI", 
                    skills: ["Prompt Engineering", "Workflow Automation", "LLM Integration", "Research"],
                    desc: "Using AI as a leverage multiplier for rapid execution and problem-solving."
                  },
                  { 
                    category: "Cyber Security Path", 
                    skills: ["Web Security", "Network Basics", "Threat Modeling", "Defensive Mindset"],
                    desc: "Transitioning from building interfaces to securing the underlying architecture."
                  },
                  { 
                    category: "Scaling Systems", 
                    skills: ["Business Logic", "State Management", "Deployment", "Version Control"],
                    desc: "Structuring projects that can scale cleanly from prototype to production."
                  }
                ].map((group, i) => (
                   <div key={i} className="p-9 rounded-[2rem] bg-zinc-900/[0.07] border border-white/[0.05] card-glow transition-all duration-700 group cursor-default">
                    <div className="flex items-center gap-3 mb-8">
                      <span className="w-1 h-1 rounded-full bg-zinc-800 group-hover:bg-amber-400 transition-colors duration-500" />
                      <p className="text-[12px] font-mono text-amber-500/70 uppercase tracking-[0.6em] font-black group-hover:text-amber-400 transition-colors duration-400">{group.category}</p>
                    </div>
                    <div className="space-y-8">
                       <p className="text-sm text-zinc-600 font-medium leading-relaxed max-w-[280px]">{group.desc}</p>
                       <div className="flex flex-wrap gap-2">
                        {group.skills.map(s => (
                          <span key={s} className="px-3.5 py-1.5 rounded-lg bg-zinc-950 border border-white/[0.04] text-[12px] font-bold uppercase tracking-widest text-zinc-700 group-hover:border-white/[0.07] hover:text-amber-400 hover:border-amber-400/20 transition-all duration-300 cursor-default">
                            {s}
                          </span>
                        ))}
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-16 lg:pt-10">
               <div className="p-10 glass rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/5 blur-3xl rounded-full -mr-16 -mt-16" />
                  <p className="text-[12px] font-mono text-amber-500/60 uppercase tracking-[0.5em] font-black mb-8 italic">Currently Investigating</p>
                  <div className="space-y-12">
                    <div className="group/item">
                      <p className="text-xl font-bold text-zinc-100 mb-3 tracking-tight leading-none group-hover/item:translate-x-1 transition-transform">OWASP & Web Security</p>
                      <p className="text-sm text-zinc-500 font-medium leading-relaxed">Deep-diving into common injection attacks and defensive frontend architecture.</p>
                    </div>
                    <div className="pt-10 border-t border-white/5 group/item">
                      <p className="text-xl font-bold text-zinc-100 mb-3 tracking-tight leading-none group-hover/item:translate-x-1 transition-transform">Python Automation</p>
                      <p className="text-sm text-zinc-500 font-medium leading-relaxed">Scripting security tools and automating repetitive analytical workflows.</p>
                    </div>
                  </div>
               </div>

               <div className="space-y-8 pl-8 border-l border-amber-500/20">
                  <p className="text-[12px] font-mono text-zinc-700 uppercase tracking-[0.4em] font-black italic">My Principles</p>
                  <div className="space-y-8">
                    <div className="flex items-start gap-5">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
                      <p className="text-sm text-zinc-500 font-medium leading-relaxed italic">"Execution over theory. Build what works, secure what matters."</p>
                    </div>
                    <div className="flex items-start gap-5">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
                      <p className="text-sm text-zinc-500 font-medium leading-relaxed">Leveraging AI to compress years of learning into months of execution.</p>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>
      {/* Projects Section: Selected Builds */}
      <section id="projects" className="py-72 px-6 md:px-12 bg-black">
        <div className="max-w-7xl mx-auto">
          <SectionHeader 
            mono="Mission 2030"
            title="Evidence of Execution."
            subtitle="Selected builds focusing on real-world practical utility and high-fidelity interaction."
          />

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Trusted Consultancy",
                description: "Father's Real Estate System - A high-trust digital presence for family real estate consultancy with modern UI patterns and secure form handling.",
                image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=2070",
                tags: ["React", "Business UI", "Real Estate", "Execution"],
                githubUrl: "https://github.com/shadowbyte-tech/AS-TRUSTED",
                liveUrl: "https://as-trusted-consultancy.vercel.app/",
                featured: true,
                index: 0
              },
              {
                title: "Ninjas System UI",
                description: "Internship Task @ QSpiders - High-performance gaming UI clone demonstrating pixel-perfect layout mastery and frontend discipline.",
                image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070",
                tags: ["Internship", "UI Clone", "Frontend Mastery", "Execution"],
                githubUrl: "https://github.com/shadowbyte-tech/Coding-Ninjas-clone",
                liveUrl: "https://coding-ninjas-clone-beta.vercel.app/",
                featured: false,
                index: 1
              },
              {
                title: "AI Chat Assistant",
                description: "Intelligent chat system powered by AI with advanced prompt engineering and natural language processing.",
                image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2070",
                tags: ["AI", "Prompt Engineering", "Chatbot", "NLP"],
                githubUrl: "https://github.com/shadowbyte-tech/ai-assistant",
                liveUrl: "https://ai-assistant-demo.vercel.app/",
                featured: false,
                index: 2
              }
            ].map((project) => (
              <EnhancedPortfolioCard key={project.index} {...project} />
            ))}
          </div>
        </div>
      </section>

      {/* Build Philosophy: Principles */}
      <section className="py-40 px-6 md:px-12 bg-white text-zinc-950 rounded-[3rem] md:rounded-[5rem] mx-4 md:mx-8 lg:mx-12 overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.4)]">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            mono="How I Work"
            title="My Build Process."
            subtitle="I think before I build, use AI as a tool not a crutch, and care about security from day one."
            dark
          />
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10 mt-20">
            {[
              { step: "01 / Ideate", name: "Problem First", desc: "Finding real-world inefficiencies and mapping them to digital solutions." },
              { step: "02 / Prompt", name: "AI Acceleration", desc: "Using advanced prompt engineering to scaffold and accelerate the build cycle." },
              { step: "03 / Build", name: "Clean Execution", desc: "Refining AI output into production-grade, type-safe TypeScript architectures." },
              { step: "04 / Secure", name: "Defensive Layer", desc: "Applying cybersecurity principles to ensure the system is unshakeable." },
            ].map((p, i) => (
              <motion.div key={i}
                initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}}
                viewport={{once:true}} transition={{duration:0.8,delay:i*0.12,ease:[0.16,1,0.3,1]}}
                className="space-y-5 group border-t-2 border-zinc-100 group-hover:border-amber-400 pt-6 transition-colors duration-500"
              >
                <p className="text-[12px] font-mono font-black uppercase tracking-[0.4em] text-amber-500">{p.step}</p>
                <h4 className="text-xl font-bold tracking-tight leading-none">{p.name}</h4>
                <p className="text-zinc-500 font-normal leading-relaxed text-[13px]">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission 2030 */}
      <section className="py-56 px-6 md:px-12 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}}
            viewport={{once:true}} transition={{duration:0.9,ease:[0.16,1,0.3,1]}}
            className="mb-20"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-4 h-px bg-amber-500/40" />
              <p className="text-amber-500/60 font-mono text-[12px] tracking-[0.6em] font-black uppercase">Where I'm Headed</p>
            </div>
            <h2 className="text-5xl md:text-8xl font-bold tracking-tighter text-white leading-[1.02]">Mission 2030.</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { year: "2026", phase: "System Foundations", desc: "Mastering the mechanics of web security and high-fidelity frontend execution.", active: true, tag: "CURRENT PHASE" },
              { year: "2028", phase: "Security Mastery", desc: "Gaining deep industry knowledge and establishing authority in cybersecurity systems.", active: false, tag: "UPCOMING" },
              { year: "2030", phase: "Startup Ambition", desc: "Launching autonomous AI-powered security systems and personal ventures.", active: false, tag: "LONG-TERM" },
            ].map((t, i) => (
              <motion.div key={i}
                initial={{opacity:0,y:32}} whileInView={{opacity:1,y:0}}
                viewport={{once:true}} transition={{duration:1,delay:i*0.15,ease:[0.16,1,0.3,1]}}
                className={`p-12 rounded-[2.5rem] relative group text-left border transition-all duration-700 ${
                  t.active
                    ? 'bg-zinc-900/50 border-white/[0.08] shadow-[0_20px_60px_rgba(251,191,36,0.04)]'
                    : 'bg-transparent border-white/[0.04] hover:border-white/[0.08] hover:bg-zinc-900/20'
                }`}
              >
                {t.active && (
                  <div className="absolute top-10 right-10 flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)] animate-pulse" />
                    <span className="text-[12px] font-mono font-bold text-amber-500 uppercase tracking-widest">{t.tag}</span>
                  </div>
                )}
                {!t.active && (
                  <div className="absolute top-10 right-10">
                    <span className="text-[12px] font-mono font-bold text-zinc-600 uppercase tracking-widest">{t.tag}</span>
                  </div>
                )}
                <p className={`text-7xl font-bold mb-8 tracking-tighter transition-all duration-700 mt-4 ${
                  t.active ? 'text-amber-400' : 'text-zinc-900 group-hover:text-zinc-800'
                }`}>{t.year}</p>
                <div className={`h-px w-full mb-8 ${t.active ? 'bg-white/10' : 'bg-white/[0.04]'}`} />
                <div className="space-y-4">
                  <p className={`text-base font-bold uppercase tracking-[0.15em] leading-tight ${
                    t.active ? 'text-zinc-50' : 'text-zinc-800 group-hover:text-zinc-600 transition-colors duration-500'
                  }`}>{t.phase}</p>
                  <p className="text-sm text-zinc-600 font-medium leading-relaxed">{t.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Beyond Code: Character Section */}
      <section id="beyond" className="py-72 px-6 md:px-12 bg-black">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[0.8fr_1.2fr] gap-32 items-center">
           <div className="order-last lg:order-first">
            <div className="space-y-10 mb-20">
               <p className="text-zinc-600 font-mono text-[12px] tracking-[0.6em] uppercase font-black">Beyond the Code</p>
               <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-zinc-50 leading-[0.92]">Character & <br /> Resolve.</h2>
            </div>
            <div className="text-xl md:text-2xl text-zinc-400 font-medium leading-relaxed space-y-12 tracking-tight max-w-2xl">
              <p>
                I am grounded by three core values: <span className="text-amber-400 font-bold">Family, Discipline, and Financial Ambition</span>. These aren't motivational words — they are the daily decisions I make that keep me consistent.
              </p>
              <p>
                I push hard to understand things deeply rather than superficially. I'd rather build one thing that actually works than talk about ten things that don't exist yet.
              </p>
            </div>
            
            <div className="mt-24 space-y-20 pt-16 border-t border-white/5">
              <div className="flex gap-20">
                 <div className="space-y-4">
                   <p className="text-[12px] font-mono text-zinc-800 uppercase tracking-[0.6em] font-black italic">Core Ethos</p>
                   <p className="text-2xl font-bold text-amber-400 uppercase tracking-tighter italic">Family_First</p>
                 </div>
                 <div className="space-y-4">
                   <p className="text-[12px] font-mono text-zinc-800 uppercase tracking-[0.6em] font-black italic">Operating Routine</p>
                   <p className="text-2xl font-bold text-amber-400 uppercase tracking-tighter italic">Strict_Discipline</p>
                 </div>
              </div>
              <div className="flex items-center gap-6 group">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-800 group-hover:bg-zinc-500 transition-colors" />
                <p className="text-sm font-bold text-zinc-50 lowercase tracking-widest italic opacity-40 group-hover:opacity-60 transition-opacity">
                   {`"Execution over consensus. Progress over perfection."`}
                </p>
              </div>
            </div>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Warm amber ring for the golden-hour photo */}
            <div className="absolute -inset-2 rounded-[4.5rem] border border-amber-400/[0.08] pointer-events-none" />
            <div className="aspect-[4/5] rounded-[4rem] overflow-hidden border border-white/[0.07] relative shadow-[0_40px_100px_rgba(0,0,0,0.8)] group">
              <img
                src="/beyond-code.jpg"
                alt="Sukka Manikanta Goud — Beyond Code"
                className="w-full h-full object-cover object-center brightness-[0.92] hover:brightness-100 transition-all duration-1200 hover:scale-[1.03]"
                style={{ transitionDuration: '1.2s' }}
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/60 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section: Inbound */}
      <section id="contact" className="py-72 px-6 md:px-12 bg-zinc-950">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-40">
          <SectionHeader 
            mono="Build Opportunities"
            title="Strategic Inbound."
            subtitle="I am actively open to frontend collaborations, cybersecurity learning opportunities, and building real-world systems."
          />
          
          <div className="grid lg:grid-cols-2 gap-20 w-full">
            {/* Left: Quick Contact */}
            <div className="w-full relative group flex flex-col items-center">
              <a
                href="mailto:sukkamanikantagoud@gmail.com"
                className="text-xl md:text-3xl lg:text-5xl font-bold tracking-tighter text-zinc-800 hover:text-white transition-all duration-700 uppercase leading-none break-all relative z-10"
              >
                sukkamanikantagoud <br /> @gmail.com
              </a>
              <div className="mt-16 flex flex-wrap justify-center gap-4 text-[12px] font-mono text-zinc-600 uppercase tracking-[0.5em] font-black">
                <span className="px-4 py-2 border border-white/5 rounded-full bg-zinc-900/50">Internships</span>
                <span className="px-4 py-2 border border-white/5 rounded-full bg-zinc-900/50">Collaborations</span>
                <span className="px-4 py-2 border border-white/5 rounded-full bg-zinc-900/50">Frontend UI</span>
                <span className="px-4 py-2 border border-white/5 rounded-full bg-zinc-900/50">Security Systems</span>
              </div>
              {/* Amber glow on hover */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-amber-400/[0.04] blur-[120px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
            </div>
            
            {/* Right: Advanced Contact Form */}
            <div className="max-w-lg mx-auto w-full">
              <AdvancedContactForm />
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-20 md:gap-40 pb-20 mt-32">
            <SocialLink icon={<Github size={24} />} name="GitHub" href="https://github.com/shadowbyte-tech" newTab />
            <SocialLink icon={<Linkedin size={24} />} name="LinkedIn" href="https://www.linkedin.com/in/sukkamanikantagoud/" newTab />
            <SocialLink icon={<Mail size={24} />} name="Email" href="mailto:sukkamanikantagoud@gmail.com" />
          </div>
        </div>
      </section>

      {/* Footer: Closing Identity */}
      <footer className="relative border-t border-white/5 bg-black overflow-hidden">
        {/* B&W Identity Signature — Cinematic Visual Layer */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          <div className="absolute right-0 bottom-0 w-[420px] h-[520px] opacity-[0.06]">
            <img 
              src="/identity-bw.jpg" 
              alt="" 
              aria-hidden="true"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-linear-to-l from-transparent via-black/60 to-black" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black to-transparent" />
          </div>
        </div>

        <div className="relative z-10 py-48 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-32 items-end pb-32 border-b border-white/5">
              <div className="space-y-20">
                 <div className="flex items-center gap-8">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden border border-white/10 shadow-2xl cursor-pointer group">
                      <img src="/hero-main.jpg" alt="SMG" className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700" />
                    </div>
                    <div className="space-y-2">
                       <p className="text-xl font-bold tracking-tight text-white uppercase leading-none">Sukka Manikanta Goud</p>
                       <p className="text-[12px] font-mono text-zinc-700 uppercase tracking-[0.4em] font-black">Hardening the digital foundation.</p>
                    </div>
                 </div>
                 <h3 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-zinc-300 max-w-2xl leading-[1.05]">
                   Engineering the <br /> <span className="text-white italic underline decoration-emerald-500/20 underline-offset-8">unshakeable future.</span>
                 </h3>
              </div>
              
              <div className="flex flex-col md:items-end gap-12">
                 <div className="flex gap-12 text-[12px] font-bold uppercase tracking-[0.5em] text-zinc-700">
                    <a href="https://github.com/shadowbyte-tech" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">GitHub</a>
                    <a href="https://www.linkedin.com/in/sukkamanikantagoud/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">LinkedIn</a>
                    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-amber-400 transition-colors cursor-pointer uppercase">Back to Top</button>
                 </div>
                 <p className="text-[12px] font-mono text-zinc-800 uppercase tracking-[0.4em] font-black italic">18.183° N, 78.336° E • SULTANPUR, IN</p>
              </div>
            </div>
            
            <div className="pt-20 flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
              <div className="space-y-4">
                <p className="text-[12px] font-mono text-zinc-800 uppercase tracking-[0.4em] font-black italic">
                  SMG.OS v1.0 • Designed for Tactical Precision
                </p>
                <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-[12px] text-zinc-700 font-bold uppercase tracking-[0.6em] select-none">
                  <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-500/50 shadow-[0_0_8px_rgba(251,191,36,0.5)] animate-pulse" /> Currently Building</span>
                  <span className="text-zinc-800">|</span>
                  <span>Sultanpur, India</span>
                </div>
              </div>
              <p className="text-[12px] font-black uppercase tracking-[0.5em] text-zinc-900 select-none pb-1 border-b border-zinc-900/40">
                Identity Sequence Complete
              </p>
            </div>
          </div>
        </div>
      </footer>
              </div>
            </div>
          )}
        </>
      )}
      
      {/* Marquee Footer */}
      <MarqueeFooter 
        items={[
          { text: "Frontend Developer", icon: "⚡" },
          { text: "React Expert", icon: "🚀" },
          { text: "AI Builder", icon: "🤖" },
          { text: "Cyber Security", icon: "🔒" },
          { text: "Creative Thinker", icon: "💡" }
        ]}
      />
    </SmoothScroll>
    </ThemeProvider>
  );
}

const SocialLink = ({ icon, name, href, newTab }: { icon: any, name: string, href: string, newTab?: boolean }) => (
    <a href={href} {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="flex flex-col items-center gap-5 text-zinc-600 hover:text-white transition-all group">
    <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-white/[0.03] flex items-center justify-center group-hover:bg-white group-hover:text-black group-hover:shadow-[0_0_40px_rgba(255,255,255,0.05)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
      {icon}
    </div>
    <span className="text-[12px] font-black uppercase tracking-[0.4em] opacity-40 group-hover:opacity-100 transition-opacity">{name}</span>
  </a>
);
