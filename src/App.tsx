import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useEffect, lazy, Suspense } from 'react';
import AnimatedBackground from './components/AnimatedBackground';
import RefreshRedirect from './components/RefreshRedirect';
import SmoothScroll from './components/SmoothScroll';
import MouseSpotlight from './components/MouseSpotlight';
import { ThemeProvider } from './lib/theme';
import TextTypingAnimation from './components/TextTypingAnimation';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ArrowUpRight,
  ExternalLink,
  Terminal,
  X,
  FileDown,
  Award,
  Briefcase,
  Cpu
} from 'lucide-react';

// Lazy-loaded components for optimal bundle splitting
const AdvancedContactForm = lazy(() => import('./components/AdvancedContactForm'));

/* ── Resume-Aligned Technical Stack Data ── */
const SKILL_GROUPS = [
  {
    category: "Languages",
    skills: ["Python", "JavaScript", "HTML5", "CSS3"]
  },
  {
    category: "Web Development",
    skills: ["React.js", "Tailwind CSS", "Node.js", "Express.js"]
  },
  {
    category: "Databases",
    skills: ["MongoDB", "MySQL", "JSON"]
  },
  {
    category: "Tools & APIs",
    skills: ["Git", "GitHub", "REST APIs", "Vite"]
  }
];

// AI Skills explicitly highlighted
const AI_SKILLS = ["Prompt Engineering", "LLM Integration", "AI Agents", "ChatGPT API", "n8n Workflows"];

/* ── Work History & Experience Data ── */
const EXPERIENCES = [
  {
    role: "Freelance Web Developer & AI Automation Specialist",
    company: "Self-Employed",
    period: "2024 – Present",
    points: [
      "Engineered end-to-end web applications and workflow automatons for commercial clients.",
      "Optimized client site speed, SEO rankings, and integrated secure contact systems.",
      "Architected custom AI agents and n8n scripts to automate operations and content cycles."
    ]
  },
  {
    role: "Front-End Development Intern",
    company: "QSkill / SR India",
    period: "2026",
    points: [
      "Developed interactive layout modules and UI clone dashboards using React and Tailwind.",
      "Participated in active code reviews, asset compressions, and responsive layout audits.",
      "Successfully certified in frontend engineering delivery discipline."
    ],
    certificateUrl: "/qskill-intern-cert.png"
  }
];

/* ── Certifications Data ── */
const CERTIFICATIONS = [
  {
    name: "Google Cloud / Simplilearn SkillUp: Introduction to Large Language Models",
    issuer: "Simplilearn & Google Cloud",
    link: "/google-llm-cert.png"
  },
  {
    name: "QSkill / SR India: Front-End Development Intern Certificate",
    issuer: "QSkill & SR India",
    link: "/qskill-intern-cert.png"
  },
  {
    name: "Google Digital Garage: Fundamentals of Digital Marketing",
    issuer: "Google Garage",
    link: "#"
  }
];

/* ── Alternate Layout Case Studies Data ── */
const PROJECTS = [
  {
    title: "AS Trusted Consultancy",
    problem: "Real estate consultancy lacked an organic digital presence, resulting in 0 client acquisitions via search channels.",
    description: "Architected a live, deployed business platform using React, Tailwind, and Vite. Implemented custom page speed optimizations, local form security hooks, and complete layout responsiveness. Handed over professional workspace documentation directly to the client.",
    outcome: "Successfully deployed at astrusted.in, achieving a 98+ Lighthouse performance rating and ~40% faster initial load time. Indexation led to a 150% increase in organic client inquiries within the first month.",
    image: "/trusted-consultancy.jpg",
    tags: ["React 19", "Tailwind CSS", "Vite", "SEO", "Vercel"],
    githubUrl: "https://github.com/shadowbyte-tech/AS-TRUSTED",
    liveUrl: "https://as-trusted-consultancy.vercel.app/",
    testimonial: {
      text: "Manikanta delivered our platform ahead of schedule, with exceptional performance optimizations and SEO indexing that immediately generated client leads.",
      author: "A.S. Goud, Founder at AS Trusted Consultancy"
    }
  },
  {
    title: "Personal AI Agent System",
    problem: "Recurring developer routine tasks (automated research, scheduling, and code reviews) lacked automated pipeline execution.",
    description: "Designed a multi-agent autonomous system built on Python and LangChain. Integrates task planners, custom LLM APIs, and worker agents containing memory buffers. Automates 5+ daily recurring digital tasks (including automated research, scheduling, and code review).",
    outcome: "Saves ~6 hours/week on developer research and routine logging, operating with 98.4% execution success.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2070",
    tags: ["Python", "AI Agents", "LLM APIs", "LangChain", "n8n"],
    githubUrl: "https://github.com/shadowbyte-tech/ai-assistant",
    isAIAgent: true
  },
  {
    title: "Ninjas System UI",
    problem: "A gaming dashboard clone required interactive frontend widgets and pixel-perfect design translation.",
    description: "Cloned complex interactive elements from the Coding Ninjas dashboard platform. Focused on modular components, Framer Motion animations, and fluid responsive views.",
    outcome: "Delivered a high-fidelity frontend layout demonstrating clean layout discipline and custom widget programming.",
    image: "/ninjas-system.jpg",
    tags: ["React", "UI Engineering", "Framer Motion", "Vite"],
    githubUrl: "https://github.com/shadowbyte-tech/Coding-Ninjas-clone",
    liveUrl: "https://coding-ninjas-clone-beta.vercel.app/"
  }
];

/* ── Redesigned Floating Pill Navbar ── */
const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', id: 'hero' },
    { name: 'About', id: 'about' },
    { name: 'Experience', id: 'experience' },
    { name: 'Projects', id: 'projects' },
    { name: 'Skills', id: 'skills' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <header className="fixed top-6 left-0 w-full z-[100] flex justify-center px-4">
      <nav className="w-full max-w-4xl rounded-full glass-navbar py-3 px-6 flex justify-between items-center relative">
        <a href="#" className="flex items-center gap-3 group focus-visible:ring-2 focus-visible:ring-[#00F5FF] focus-visible:outline-none rounded-full" aria-label="Sukka Manikanta Goud Portfolio Homepage">
          <span className="w-8 h-8 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-[#00F5FF] font-mono text-xs font-semibold select-none group-hover:border-[#00F5FF]/30 transition-colors shadow-inner">
            &gt;_
          </span>
          <span className="font-mono text-xs tracking-wider text-zinc-300">
            manikanta<span className="text-[#00F5FF]">.dev</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex gap-6 items-center text-sm">
          {navLinks.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="text-zinc-400 hover:text-white font-medium transition-colors focus-visible:ring-2 focus-visible:ring-[#00F5FF] focus-visible:outline-none rounded-full px-3 py-1"
            >
              {item.name}
            </a>
          ))}
          <div className="w-px h-4 bg-white/10" />
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#00F5FF] to-[#7C3AED] text-white hover:opacity-90 transition-opacity text-xs font-bold focus-visible:ring-2 focus-visible:ring-[#00F5FF] focus-visible:outline-none shadow-md shadow-[#00F5FF]/10"
          >
            Resume ↗
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden w-9 h-9 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-all focus-visible:ring-2 focus-visible:ring-[#00F5FF] focus-visible:outline-none"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={16} /> : <Terminal size={16} />}
        </button>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="absolute top-full left-0 right-0 mt-3 mx-2 bg-[#050816]/95 border border-white/15 rounded-3xl p-6 flex flex-col gap-4 md:hidden z-[90] shadow-2xl backdrop-blur-xl"
            >
              {navLinks.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-zinc-350 hover:text-white text-base font-semibold border-b border-white/5 pb-2"
                >
                  {item.name}
                </a>
              ))}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 rounded-full bg-gradient-to-r from-[#00F5FF] to-[#7C3AED] text-white font-bold text-center text-sm shadow-lg shadow-[#00F5FF]/10"
              >
                View Resume ↗
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

const PROFILE_IMAGES = [
  "/profile-closeup.jpg",
  "/profile-headphones.jpg",
  "/profile-sky.jpg"
];

const HERO_ROLES = [
  "AI Engineer",
  "Cyber Security Student",
  "Founder of Shadow AI",
  "Full Stack Developer"
];

export default function App() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % PROFILE_IMAGES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <ThemeProvider>
      <SmoothScroll>
        <RefreshRedirect />
        <MouseSpotlight />
        <Navbar />

        <main className="min-h-screen text-zinc-300 font-sans antialiased overflow-x-hidden relative bg-[#050816] selection:bg-[#00F5FF]/20 selection:text-[#00F5FF]">
          <AnimatedBackground />

          {/* ── HERO SECTION ── */}
          <section id="hero" className="min-h-screen flex flex-col justify-center items-center text-center px-6 md:px-12 relative overflow-hidden pt-32 pb-20">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto space-y-8 relative z-10"
            >
              {/* Open to opportunities badge */}
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[11px] text-zinc-300 font-medium select-none shadow-sm shadow-[#00F5FF]/5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F5FF] animate-pulse" />
                <span>Currently Open to: Internships • Freelance Opportunities • Junior Roles</span>
              </div>

              {/* Portrait Avatar Slideshow */}
              <div className="flex justify-center h-24">
                <div className="w-24 h-24 rounded-full overflow-hidden border border-white/10 bg-[#050816] shadow-xl select-none relative">
                  <AnimatePresence mode="wait">
                    <motion.img 
                      key={currentImageIndex}
                      src={PROFILE_IMAGES[currentImageIndex]} 
                      alt="Sukka Manikanta Goud portrait" 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0 w-full h-full object-cover" 
                    />
                  </AnimatePresence>
                </div>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight leading-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                  Hi, I'm Sukka Manikanta Goud.
                </h1>
                
                <div className="text-xl md:text-3xl font-semibold tracking-tight text-zinc-300 min-h-[40px] flex items-center justify-center gap-2">
                  <span>I am a</span>
                  <TextTypingAnimation 
                    texts={HERO_ROLES} 
                    className="text-[#00F5FF] font-mono"
                    speed={80}
                    deleteSpeed={40}
                    pauseTime={1800}
                  />
                </div>
              </div>

              <p className="text-zinc-400 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
                Building intelligent systems, AI agents, and modern web experiences.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap justify-center gap-4 pt-6">
                <a 
                  href="#projects" 
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-[#00F5FF] to-[#7C3AED] text-white font-bold text-xs uppercase tracking-wider glow-btn-cyan focus-visible:ring-2 focus-visible:ring-[#00F5FF] focus-visible:outline-none"
                >
                  View Projects
                </a>
                <a 
                  href="/resume.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="px-6 py-3 rounded-full border border-white/10 bg-white/5 text-zinc-300 font-bold text-xs hover:border-[#7C3AED]/30 hover:text-white transition-all uppercase tracking-wider glow-btn-purple focus-visible:ring-2 focus-visible:ring-[#7C3AED] focus-visible:outline-none"
                >
                  Download Resume
                </a>
                <a 
                  href="#contact" 
                  className="px-6 py-3 rounded-full border border-white/10 bg-white/5 text-zinc-300 font-bold text-xs hover:border-[#00F5FF]/30 hover:text-white transition-all uppercase tracking-wider glow-btn-cyan focus-visible:ring-2 focus-visible:ring-[#00F5FF] focus-visible:outline-none"
                >
                  Contact Me
                </a>
              </div>
            </motion.div>
          </section>

          {/* ── PROJECTS SECTION ── */}
          <section id="projects" className="py-32 px-6 md:px-12 relative">
            <div className="max-w-5xl mx-auto">
              <div className="mb-20 text-center md:text-left">
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">Selected Projects.</h2>
                <p className="text-zinc-400 text-sm md:text-base max-w-xl">
                  Real software integrations, live client apps, and automated workflows I have shipped.
                </p>
              </div>

              <div className="space-y-24">
                {PROJECTS.map((project, idx) => {
                  const isEven = idx % 2 === 0;
                  return (
                    <motion.article 
                      key={project.title}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8 }}
                      className="glass-card p-6 md:p-8"
                    >
                      <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-center`} >
                        {/* Image representation / Visual side */}
                        <div className="w-full lg:w-[48%] flex-shrink-0">
                          {project.isAIAgent ? (
                            /* AI Agent Architecture Diagram (CSS Flowchart) */
                            <div className="w-full aspect-[16/10] rounded-2xl border border-white/5 bg-black/40 p-6 font-mono text-[10px] leading-relaxed text-zinc-400 flex flex-col justify-between select-none shadow-lg">
                              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                                <span className="text-[#00F5FF] font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                                  <Cpu size={14} className="text-[#00F5FF] animate-pulse" />
                                  Multi-Agent Task Executor
                                </span>
                                <span className="text-[9px] px-2 py-0.5 rounded-full bg-white/5 border border-white/5">v1.2.0</span>
                              </div>
                              
                              <div className="my-6 space-y-4">
                                <div className="flex items-center justify-between">
                                  <div className="px-3 py-1.5 border border-white/5 rounded-xl bg-white/5 text-zinc-300 font-semibold text-[9px]">
                                    Task Trigger / API call
                                  </div>
                                  <span className="text-[#00F5FF]">➔</span>
                                  <div className="px-3 py-1.5 border border-[#7C3AED]/30 rounded-xl bg-[#7C3AED]/5 text-[#7C3AED] font-semibold text-[9px]">
                                    Task Planner Agent
                                  </div>
                                </div>
                                
                                <div className="h-px bg-white/5 w-full" />
                                
                                <div className="flex justify-between items-start gap-4">
                                  <div className="space-y-1.5 flex-1">
                                    <div className="text-[9px] font-bold text-zinc-450">Worker Instances</div>
                                    <div className="px-2 py-1 border border-white/5 rounded bg-black/20 text-[9px]">Agent A: Web Scraper</div>
                                    <div className="px-2 py-1 border border-white/5 rounded bg-black/20 text-[9px]">Agent B: API Executor</div>
                                  </div>
                                  <div className="space-y-1.5 flex-1">
                                    <div className="text-[9px] font-bold text-zinc-450">Memory Sync</div>
                                    <div className="px-2 py-1 border border-white/5 rounded bg-black/20 text-[9px]">JSON Local Store</div>
                                    <div className="px-2 py-1 border border-white/5 rounded bg-black/20 text-[9px]">Vector Embeddings</div>
                                  </div>
                                </div>
                              </div>

                              <div className="border-t border-white/5 pt-3 flex justify-between items-center text-[8px] text-zinc-500">
                                <span>AUTONOMOUS PIPELINE</span>
                                <span>5+ AUTOMATED ROUTINES</span>
                              </div>
                            </div>
                          ) : (
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="block relative group overflow-hidden rounded-2xl border border-white/5 bg-black/40 shadow-xl focus-visible:ring-2 focus-visible:ring-[#00F5FF] focus-visible:outline-none">
                              <img 
                                loading="lazy"
                                src={project.image} 
                                alt={`${project.title} screenshot showing application interface`}
                                className="w-full aspect-[16/10] object-cover object-top opacity-85 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
                              />
                            </a>
                          )}
                        </div>

                        {/* Info Column */}
                        <div className="w-full lg:w-[52%] space-y-6">
                          <div className="space-y-1">
                            <h3 className="text-2xl font-bold tracking-tight text-white">{project.title}</h3>
                            <p className="text-[10px] font-mono text-[#00F5FF] uppercase tracking-widest font-semibold">Case Study</p>
                          </div>

                          <div className="space-y-4 text-zinc-400 text-sm">
                            <div>
                              <h4 className="text-zinc-200 text-xs font-bold uppercase tracking-wider mb-1">Problem</h4>
                              <p className="leading-relaxed text-zinc-400">{project.problem}</p>
                            </div>
                            <div>
                              <h4 className="text-zinc-200 text-xs font-bold uppercase tracking-wider mb-1">Execution</h4>
                              <p className="leading-relaxed text-zinc-400">{project.description}</p>
                            </div>
                            <div>
                              <h4 className="text-zinc-200 text-xs font-bold uppercase tracking-wider mb-1">Outcome</h4>
                              <p className="leading-relaxed text-zinc-400">{project.outcome}</p>
                            </div>
                          </div>

                          {/* Testimonial */}
                          {project.testimonial && (
                            <blockquote className="border-l-2 border-[#00F5FF]/40 pl-4 py-1.5 italic text-zinc-450 text-[13px] leading-relaxed bg-[#00F5FF]/5 rounded-r-xl pr-3">
                              "{project.testimonial.text}"
                              <cite className="block not-italic text-zinc-400 font-mono text-[9px] uppercase tracking-wider mt-2">— {project.testimonial.author}</cite>
                            </blockquote>
                          )}

                          {/* Stack tags */}
                          <div className="flex flex-wrap gap-2 pt-2">
                            {project.tags.map(tag => (
                              <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[11px] text-zinc-300 font-semibold shadow-inner">
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* Action Links */}
                          <div className="flex items-center gap-6 pt-4 border-t border-white/5 w-full">
                            {project.githubUrl && (
                              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-[#00F5FF] focus-visible:outline-none rounded-full px-3 py-1.5 bg-white/5 border border-white/5">
                                <Github size={15} />
                                <span>Source Code</span>
                              </a>
                            )}
                            {project.liveUrl && (
                              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-[#00F5FF] hover:text-[#00F5FF]/85 font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-[#00F5FF] focus-visible:outline-none rounded-full px-3 py-1.5 bg-[#00F5FF]/5 border border-[#00F5FF]/10">
                                <ExternalLink size={14} />
                                <span>Visit Live Site</span>
                                <ArrowUpRight size={13} className="ml-0.5" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ── EXPERIENCE SECTION ── */}
          <section id="experience" className="py-32 px-6 md:px-12 relative">
            <div className="max-w-5xl mx-auto">
              <div className="mb-20 text-center md:text-left">
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">Experience.</h2>
                <p className="text-zinc-400 text-sm md:text-base max-w-xl">
                  A timeline of freelance deliveries, internships, and technical roles.
                </p>
              </div>

              <div className="space-y-12">
                {EXPERIENCES.map((exp, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="glass-card p-8 flex flex-col md:flex-row justify-between gap-6"
                  >
                    <div className="space-y-2 md:max-w-xl">
                      <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                      <p className="text-xs font-mono text-[#00F5FF] uppercase tracking-wider">{exp.company}</p>
                      <ul className="list-disc list-inside text-zinc-400 text-sm space-y-2 pt-2">
                        {exp.points.map((pt, pIdx) => (
                          <li key={pIdx} className="leading-relaxed">{pt}</li>
                        ))}
                      </ul>
                      {exp.certificateUrl && (
                        <div className="pt-3">
                          <a 
                            href={exp.certificateUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="inline-flex items-center gap-1.5 text-xs text-[#00F5FF] hover:text-[#00F5FF]/80 font-semibold focus-visible:ring-2 focus-visible:ring-[#00F5FF] focus-visible:outline-none rounded w-fit"
                          >
                            Verify Certificate <ArrowUpRight size={12} />
                          </a>
                        </div>
                      )}
                    </div>
                    <div className="text-sm font-semibold font-mono text-[#7C3AED] whitespace-nowrap bg-[#7C3AED]/5 border border-[#7C3AED]/10 px-4 py-1.5 rounded-full h-fit shadow-sm">
                      {exp.period}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ── SKILLS SECTION ── */}
          <section id="skills" className="py-32 px-6 md:px-12 relative">
            <div className="max-w-5xl mx-auto">
              <div className="mb-20 text-center md:text-left">
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">Skills Matrix.</h2>
                <p className="text-zinc-400 text-sm md:text-base max-w-xl">
                  Technologies, libraries, and automation methodologies that define my stack.
                </p>
              </div>

              <div className="space-y-8">
                {/* Highlighted AI Skills Category */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="glass-card p-8 border-[#00F5FF]/10 hover:border-[#00F5FF]/20"
                >
                  <h3 className="text-xl font-bold text-[#00F5FF] mb-6 tracking-tight flex items-center gap-2">
                    <Cpu size={18} />
                    AI & Automation (Core Focus)
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {AI_SKILLS.map(s => (
                      <span key={s} className="skill-chip px-4 py-2 rounded-full text-xs font-semibold select-none cursor-default">
                        {s}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Standard Categories Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {SKILL_GROUPS.map((group) => (
                    <motion.div 
                      key={group.category} 
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="glass-card p-6"
                    >
                      <h4 className="text-sm font-bold text-zinc-200 mb-4 tracking-tight border-b border-white/5 pb-2">{group.category}</h4>
                      <div className="flex flex-wrap gap-2">
                        {group.skills.map(s => (
                          <span key={s} className="skill-chip px-3 py-1.5 rounded-full text-[11px] font-medium select-none cursor-default">
                            {s}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── CERTIFICATIONS SECTION ── */}
          <section id="certifications" className="py-24 px-6 md:px-12 relative">
            <div className="max-w-5xl mx-auto">
              <div className="mb-12 text-center md:text-left">
                <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-2">Certifications.</h2>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {CERTIFICATIONS.map((cert, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="glass-card p-6 flex flex-col justify-between gap-4"
                  >
                    <div className="space-y-2">
                      <Award size={18} className="text-[#00F5FF]" />
                      <h3 className="text-sm font-bold text-zinc-100 leading-snug">{cert.name}</h3>
                      <p className="text-xs font-mono text-zinc-550">{cert.issuer}</p>
                    </div>
                    <a 
                      href={cert.link} 
                      className="inline-flex items-center gap-1.5 text-xs text-[#00F5FF] hover:text-[#00F5FF]/80 transition-colors mt-2 focus-visible:ring-2 focus-visible:ring-[#00F5FF] focus-visible:outline-none rounded w-fit"
                    >
                      Verify Certificate <ArrowUpRight size={12} />
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ── JOURNEY/ABOUT SECTION ── */}
          <section id="about" className="py-32 px-6 md:px-12 relative">
            <div className="max-w-5xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 items-start">
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                    <img 
                      src="/profile-sky.jpg" 
                      alt="Sukka Manikanta Goud black and white portrait photo" 
                      className="w-16 h-16 rounded-full object-cover border border-white/10 bg-black/40 grayscale select-none shadow-lg" 
                    />
                    <div>
                      <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">The Journey.</h2>
                      <p className="text-[10px] font-mono text-[#00F5FF] uppercase tracking-widest font-semibold mt-1">About Me</p>
                    </div>
                  </div>
                  
                  <div className="text-base text-zinc-400 space-y-6 leading-relaxed">
                    <p>
                      I am a self-driven developer and Cybersecurity student currently based in Sultanpur, India. My engineering process centers on building intelligent system integrations, full-stack applications, and automated workflows using AI agents as leverage.
                    </p>
                    <p>
                      I have a track record of delivering end-to-end freelance client solutions and responsive frontend systems, pivoting my focus from traditional web environments toward scalable automation architectures.
                    </p>
                  </div>

                  <div className="flex gap-8 pt-4 border-t border-white/5 items-center">
                    <a href="https://github.com/shadowbyte-tech" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-[#00F5FF] focus-visible:outline-none rounded-full px-3 py-1.5 bg-white/5 border border-white/5">
                      <Github size={16} />
                      <span>GitHub</span>
                    </a>
                    <div className="w-px h-4 bg-white/5" />
                    <a href="https://www.linkedin.com/in/sukkamanikantagoud/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-[#00F5FF] focus-visible:outline-none rounded-full px-3 py-1.5 bg-white/5 border border-white/5">
                      <Linkedin size={16} />
                      <span>LinkedIn</span>
                    </a>
                  </div>
                </motion.div>

                {/* Condensed Timeline */}
                <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="glass-card p-8 space-y-8"
                >
                  <h3 className="text-lg font-bold tracking-tight text-white border-b border-white/5 pb-2">Milestone Timeline</h3>
                  <div className="space-y-6 border-l border-white/5 pl-6 relative">
                    {[
                      { phase: "Frontend Foundations", desc: "Mastered frontend rendering layouts, modular React structure, design translation, and state management." },
                      { phase: "AI Leverage & Agents", desc: "Shifted focus to using advanced prompt engines and generative workflows to compress development cycles and launch products fast." },
                      { phase: "Cyber Security Path", desc: "Deep-diving into web application vulnerabilities, network basics, OWASP, and system hardening." }
                    ].map((item, idx) => (
                      <div key={idx} className="relative">
                        <div className="absolute -left-[29px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#00F5FF] border-2 border-[#050816] shadow-sm shadow-[#00F5FF]" />
                        <h4 className="font-bold text-zinc-200 text-sm">{item.phase}</h4>
                        <p className="text-xs text-zinc-400 leading-relaxed mt-1">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* ── TECHNICAL WRITING / NOTES SECTION ── */}
          <section id="notes" className="py-24 px-6 md:px-12 relative">
            <div className="max-w-5xl mx-auto">
              <div className="mb-16 text-center md:text-left">
                <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-2">Technical Notes.</h2>
                <p className="text-zinc-450 text-sm md:text-base max-w-xl">
                  Documenting engineering challenges, system design decisions, and AI integration findings.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <motion.article 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="glass-card p-8 flex flex-col justify-between gap-4"
                >
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono text-[#00F5FF] uppercase tracking-widest font-semibold">AI AUTOMATION</span>
                    <h3 className="text-xl font-bold text-white leading-snug">
                      Building Autonomous AI Agent Pipelines (n8n & LangChain)
                    </h3>
                    <p className="text-sm text-zinc-450 leading-relaxed">
                      Analyzing how to wire multi-agent memory buffers with LangChain, setup planning agents for sub-task routing, and construct local JSON storage syncs to automate developer pipelines.
                    </p>
                  </div>
                  <span className="text-xs text-zinc-450 font-medium select-none bg-white/5 border border-white/5 rounded-full px-3.5 py-1.5 w-fit">Read Note (Coming Soon)</span>
                </motion.article>

                <motion.article 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="glass-card p-8 flex flex-col justify-between gap-4"
                >
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono text-[#7C3AED] uppercase tracking-widest font-semibold">WEB ARCHITECTURE</span>
                    <h3 className="text-xl font-bold text-white leading-snug">
                      Production Optimization: Scaling React 19 and Tailwind v4
                    </h3>
                    <p className="text-sm text-zinc-450 leading-relaxed">
                      Sharing performance findings from deploying ASTrusted: bundle splitting, lazy loading, font preloading, and achieving a 98+ Lighthouse score on near-black theme palettes.
                    </p>
                  </div>
                  <span className="text-xs text-zinc-450 font-medium select-none bg-white/5 border border-white/5 rounded-full px-3.5 py-1.5 w-fit">Read Note (Coming Soon)</span>
                </motion.article>
              </div>
            </div>
          </section>

          {/* ── CONTACT SECTION ── */}
          <section id="contact" className="py-32 px-6 md:px-12 relative">
            <div className="max-w-5xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 items-start">
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="space-y-6 lg:sticky lg:top-32"
                >
                  <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">Inbound.</h2>
                  <p className="text-[10px] font-mono text-[#00F5FF] uppercase tracking-widest font-semibold">Get In Touch</p>
                  <p className="text-zinc-400 text-sm leading-relaxed max-w-md">
                    I am actively open to frontend collaborations, cybersecurity opportunities, and building real-world software products. Reach out directly or fill out the form.
                  </p>
                  
                  <div className="space-y-4 pt-4">
                    <a
                      href="mailto:sukkamanikantagoud@gmail.com"
                      className="text-xl font-bold text-white hover:text-[#00F5FF] transition-colors break-all focus-visible:ring-2 focus-visible:ring-[#00F5FF] focus-visible:outline-none rounded w-fit block"
                    >
                      sukkamanikantagoud@gmail.com
                    </a>
                    
                    <div className="pt-4">
                      <a 
                        href="/resume.pdf"
                        download
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#00F5FF] to-[#7C3AED] text-white font-bold hover:opacity-95 transition-opacity text-xs uppercase tracking-wider glow-btn-cyan focus-visible:ring-2 focus-visible:ring-[#00F5FF] focus-visible:outline-none shadow-lg shadow-[#00F5FF]/10"
                      >
                        <FileDown size={14} />
                        Download Resume PDF
                      </a>
                    </div>
                  </div>
                </motion.div>
                
                {/* Form Block */}
                <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="w-full glass-card p-6 md:p-8"
                >
                  <Suspense fallback={<div className="h-48 flex items-center justify-center text-[#00F5FF] font-mono text-[11px] uppercase tracking-[0.25em] animate-pulse">Loading Form...</div>}>
                    <AdvancedContactForm />
                  </Suspense>
                </motion.div>
              </div>
            </div>
          </section>

          {/* ── FOOTER ── */}
          <footer className="px-6 md:px-12 py-12 relative flex justify-center">
            <div className="w-full max-w-5xl glass-card p-8 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-medium">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-[#00F5FF] font-mono text-xs font-semibold select-none shadow-inner">
                  &gt;_
                </span>
                <p className="text-zinc-400">© {new Date().getFullYear()} Sukka Manikanta Goud</p>
              </div>
              <div className="flex gap-6 text-zinc-400">
                <a href="https://github.com/shadowbyte-tech" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-[#00F5FF] focus-visible:outline-none rounded">GitHub</a>
                <a href="https://www.linkedin.com/in/sukkamanikantagoud/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-[#00F5FF] focus-visible:outline-none rounded">LinkedIn</a>
                <a href="mailto:sukkamanikantagoud@gmail.com" className="hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-[#00F5FF] focus-visible:outline-none rounded">Email</a>
              </div>
            </div>
          </footer>
        </main>
      </SmoothScroll>
    </ThemeProvider>
  );
}

