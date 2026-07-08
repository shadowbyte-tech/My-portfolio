import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useEffect, lazy, Suspense } from 'react';
import AnimatedBackground from './components/AnimatedBackground';
import RefreshRedirect from './components/RefreshRedirect';
import SmoothScroll from './components/SmoothScroll';
import { ThemeProvider } from './lib/theme';
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
const GSATextAnimation = lazy(() => import('./components/GSATextAnimation'));

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

/* ── Minimalist Navbar ── */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Projects', id: 'projects' },
    { name: 'Experience', id: 'experience' },
    { name: 'Skills', id: 'skills' },
    { name: 'Journey', id: 'about' },
    { name: 'Notes', id: 'notes' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <header>
      <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 py-6 ${
        scrolled ? 'bg-zinc-950/85 backdrop-blur-md border-b border-zinc-900/50 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.4)]' : 'bg-transparent'
      }`}>
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <a href="#" className="flex items-center gap-3 group focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none rounded-md" aria-label="Sukka Manikanta Goud Portfolio Homepage">
            <span className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-amber-500 font-mono text-xs font-semibold select-none group-hover:border-zinc-700 transition-colors shadow-inner">
              &gt;_
            </span>
            <span className="font-mono text-xs tracking-wider text-zinc-300">
              manikanta<span className="text-amber-500">.dev</span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex gap-8 items-center text-sm">
            {navLinks.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-zinc-400 hover:text-zinc-100 font-medium transition-colors focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none rounded"
              >
                {item.name}
              </a>
            ))}
            <div className="w-px h-4 bg-zinc-800" />
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 rounded-lg bg-amber-500 text-black hover:bg-amber-400 transition-colors text-xs font-semibold focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none shadow-lg shadow-amber-500/10"
            >
              Resume ↗
            </a>
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 rounded-lg bg-zinc-900/50 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-zinc-150 transition-all focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={16} /> : <Terminal size={16} />}
          </button>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-zinc-950 border-b border-zinc-900 px-6 py-8 flex flex-col gap-6 md:hidden z-[90] shadow-2xl"
            >
              {navLinks.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-zinc-350 hover:text-white text-base font-semibold"
                >
                  {item.name}
                </a>
              ))}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 font-semibold text-center text-sm"
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
      <Navbar />

      <main className="min-h-screen text-zinc-400 font-sans antialiased overflow-x-hidden relative bg-[#080808]">
        <AnimatedBackground />

        {/* ── HERO SECTION ── */}
        <section id="hero" className="min-h-[90vh] flex flex-col justify-center items-center text-center px-6 md:px-12 relative overflow-hidden pt-28">
          <div className="max-w-3xl mx-auto space-y-8 relative z-10">
            {/* Open to opportunities badge */}
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-zinc-850 bg-zinc-900/20 backdrop-blur-sm text-[11px] text-zinc-300 font-medium select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              <span>Currently Open to: Internships • Freelance Opportunities • Junior Roles</span>
            </div>

            {/* Portrait Avatar Slideshow */}
            <div className="flex justify-center h-24">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-zinc-900 bg-zinc-950 shadow-xl select-none relative">
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
              <h1 className="text-4xl md:text-7xl font-bold tracking-tight leading-tight text-zinc-150">
                SUKKA MANIKANTA GOUD
              </h1>
              <p className="text-lg md:text-2xl font-medium tracking-tight text-zinc-300">
                AI Automation Engineer & Full-Stack Developer
              </p>
            </div>

            <p className="text-zinc-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
              Building intelligent backend agent structures and production-ready web applications. Leveraging automated workflows to solve real-world problems.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <a 
                href="/resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-6 py-3 rounded-xl bg-amber-500 text-black font-semibold text-xs hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/10 uppercase tracking-wider focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none"
              >
                Download Resume ↗
              </a>
              <a 
                href="#projects" 
                className="px-6 py-3 rounded-xl border border-zinc-800 bg-zinc-900/30 text-zinc-300 font-semibold text-xs hover:border-zinc-700 hover:text-white transition-all uppercase tracking-wider focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none"
              >
                Explore Work
              </a>
            </div>
          </div>

          {/* Ambient Background Grid Lines (Subtle) */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        </section>

        {/* ── PROJECTS SECTION ── */}
        <section id="projects" className="py-32 px-6 md:px-12 border-t border-zinc-900/50 bg-zinc-950/10">
          <div className="max-w-5xl mx-auto">
            <div className="mb-20">
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-4">Selected Projects.</h2>
              <p className="text-zinc-500 text-sm md:text-base max-w-xl">
                Real software integrations, live client apps, and automated workflows I have shipped.
              </p>
            </div>

            <div className="space-y-32">
              {PROJECTS.map((project, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <article 
                    key={project.title}
                    className="space-y-6"
                  >
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.1 }}
                      className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-16 items-start`}
                    >
                      {/* Image representation / Visual side */}
                      <div className="w-full lg:w-[48%]">
                        {project.isAIAgent ? (
                          /* AI Agent Architecture Diagram (CSS Flowchart) */
                          <div className="w-full aspect-[16/10] rounded-xl border border-zinc-900 bg-zinc-900/25 p-6 font-mono text-[10px] leading-relaxed text-zinc-500 flex flex-col justify-between select-none">
                            <div className="flex justify-between items-center border-b border-zinc-800/80 pb-3">
                              <span className="text-zinc-300 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                                <Cpu size={14} className="text-amber-500" />
                                Multi-Agent Task Executor
                              </span>
                              <span className="text-[9px] px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">v1.2.0</span>
                            </div>
                            
                            <div className="my-6 space-y-4">
                              <div className="flex items-center justify-between">
                                <div className="px-3 py-1.5 border border-zinc-800 rounded bg-zinc-900 text-zinc-300 font-semibold text-[9px]">
                                  Task Trigger / API call
                                </div>
                                <span className="text-amber-500">➔</span>
                                <div className="px-3 py-1.5 border border-amber-500/20 rounded bg-amber-500/[0.02] text-amber-400 font-semibold text-[9px]">
                                  Task Planner Agent
                                </div>
                              </div>
                              
                              <div className="h-px bg-zinc-900/80 w-full" />
                              
                              <div className="flex justify-between items-start gap-4">
                                <div className="space-y-1.5 flex-1">
                                  <div className="text-[9px] font-bold text-zinc-400">Worker Instances</div>
                                  <div className="px-2 py-1 border border-zinc-800 rounded bg-zinc-900 text-[9px]">Agent A: Web Scraper</div>
                                  <div className="px-2 py-1 border border-zinc-800 rounded bg-zinc-900 text-[9px]">Agent B: API Executor</div>
                                </div>
                                <div className="space-y-1.5 flex-1">
                                  <div className="text-[9px] font-bold text-zinc-400">Memory Sync</div>
                                  <div className="px-2 py-1 border border-zinc-800 rounded bg-zinc-900 text-[9px]">JSON Local Store</div>
                                  <div className="px-2 py-1 border border-zinc-800 rounded bg-zinc-900 text-[9px]">Vector Embeddings</div>
                                </div>
                              </div>
                            </div>

                            <div className="border-t border-zinc-800/80 pt-3 flex justify-between items-center text-[8px] text-zinc-600">
                              <span>AUTONOMOUS PIPELINE</span>
                              <span>5+ AUTOMATED ROUTINES</span>
                            </div>
                          </div>
                        ) : (
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="block relative group overflow-hidden rounded-xl border border-zinc-900 bg-zinc-900/10 project-card focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none">
                            <img 
                              loading="lazy"
                              src={project.image} 
                              alt={`${project.title} screenshot showing application interface`}
                              className="w-full aspect-[16/10] object-cover object-top grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                            />
                          </a>
                        )}
                      </div>

                      {/* Info Column */}
                      <div className="w-full lg:w-[52%] space-y-6">
                        <div className="space-y-1">
                          <h3 className="text-xl md:text-2xl font-bold tracking-tight text-zinc-200">{project.title}</h3>
                          <p className="text-[10px] font-mono text-amber-500 uppercase tracking-widest font-semibold">Case Study</p>
                        </div>

                        <div className="space-y-4 text-zinc-400 text-sm">
                          <div>
                            <h4 className="text-zinc-350 text-xs font-bold uppercase tracking-wider mb-1">Problem</h4>
                            <p className="leading-relaxed text-zinc-500">{project.problem}</p>
                          </div>
                          <div>
                            <h4 className="text-zinc-350 text-xs font-bold uppercase tracking-wider mb-1">Execution</h4>
                            <p className="leading-relaxed text-zinc-500">{project.description}</p>
                          </div>
                          <div>
                            <h4 className="text-zinc-350 text-xs font-bold uppercase tracking-wider mb-1">Outcome</h4>
                            <p className="leading-relaxed text-zinc-550">{project.outcome}</p>
                          </div>
                        </div>

                        {/* Testimonial */}
                        {project.testimonial && (
                          <blockquote className="border-l-2 border-amber-500/40 pl-4 py-1.5 italic text-zinc-550 text-[13px] leading-relaxed">
                            "{project.testimonial.text}"
                            <cite className="block not-italic text-zinc-400 font-mono text-[9px] uppercase tracking-wider mt-2">— {project.testimonial.author}</cite>
                          </blockquote>
                        )}

                        {/* Stack tags */}
                        <div className="flex flex-wrap gap-2 pt-2">
                          {project.tags.map(tag => (
                            <span key={tag} className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-450 font-medium">
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Action Links */}
                        <div className="flex items-center gap-6 pt-4 border-t border-zinc-900/50 w-full">
                          {project.githubUrl && (
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none rounded">
                              <Github size={15} />
                              <span>Source Code</span>
                            </a>
                          )}
                          {project.liveUrl && (
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-amber-500 hover:text-amber-400 font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none rounded">
                              <ExternalLink size={14} />
                              <span>Visit Live Site</span>
                              <ArrowUpRight size={13} className="ml-0.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── EXPERIENCE SECTION ── */}
        <section id="experience" className="py-32 px-6 md:px-12 border-t border-zinc-900/50 bg-zinc-950/20">
          <div className="max-w-5xl mx-auto">
            <div className="mb-20">
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-4">Experience.</h2>
              <p className="text-zinc-500 text-sm md:text-base max-w-xl">
                A timeline of freelance deliveries, internships, and technical roles.
              </p>
            </div>

            <div className="space-y-12">
              {EXPERIENCES.map((exp, idx) => (
                <div key={idx} className="p-8 rounded-xl border border-zinc-900 bg-zinc-900/5 flex flex-col md:flex-row justify-between gap-6 hover:border-zinc-800 transition-all">
                  <div className="space-y-2 md:max-w-xl">
                    <h3 className="text-lg font-bold text-zinc-200">{exp.role}</h3>
                    <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider">{exp.company}</p>
                    <ul className="list-disc list-inside text-zinc-500 text-sm space-y-2 pt-2">
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
                          className="inline-flex items-center gap-1.5 text-xs text-amber-500 hover:text-amber-450 font-semibold focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none rounded w-fit"
                        >
                          Verify Certificate <ArrowUpRight size={12} />
                        </a>
                      </div>
                    )}
                  </div>
                  <div className="text-sm font-semibold font-mono text-amber-500/80 whitespace-nowrap">
                    {exp.period}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SKILLS SECTION ── */}
        <section id="skills" className="py-32 px-6 md:px-12 border-t border-zinc-900/50 bg-zinc-950/10">
          <div className="max-w-5xl mx-auto">
            <div className="mb-20">
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-4">Skills Matrix.</h2>
              <p className="text-zinc-500 text-sm md:text-base max-w-xl">
                Technologies, libraries, and automation methodologies that define my stack.
              </p>
            </div>

            <div className="space-y-8">
              {/* Highlighted AI Skills Category */}
              <div className="p-8 rounded-xl border border-amber-500/20 bg-amber-500/[0.01] hover:bg-amber-500/[0.02] transition-colors">
                <h3 className="text-lg font-bold text-amber-400 mb-6 tracking-tight flex items-center gap-2">
                  <Cpu size={18} />
                  AI & Automation (Core Focus)
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {AI_SKILLS.map(s => (
                    <span key={s} className="px-3.5 py-2 rounded-lg bg-amber-500/5 border border-amber-500/20 text-xs text-amber-400 font-semibold select-none">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Standard Categories Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {SKILL_GROUPS.map((group) => (
                  <div key={group.category} className="p-6 rounded-xl border border-zinc-900 bg-zinc-900/10 hover:border-zinc-800 transition-all duration-300">
                    <h4 className="text-sm font-bold text-zinc-300 mb-4 tracking-tight">{group.category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {group.skills.map(s => (
                        <span key={s} className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-400 font-medium select-none">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CERTIFICATIONS SECTION ── */}
        <section id="certifications" className="py-24 px-6 md:px-12 border-t border-zinc-900/50 bg-zinc-950/20">
          <div className="max-w-5xl mx-auto">
            <div className="mb-12">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-2">Certifications.</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {CERTIFICATIONS.map((cert, idx) => (
                <div key={idx} className="p-6 rounded-xl border border-zinc-900 bg-zinc-900/5 hover:border-zinc-800 transition-all flex flex-col justify-between gap-4">
                  <div className="space-y-2">
                    <Award size={18} className="text-amber-500" />
                    <h3 className="text-sm font-bold text-zinc-250 leading-snug">{cert.name}</h3>
                    <p className="text-xs font-mono text-zinc-500">{cert.issuer}</p>
                  </div>
                  <a 
                    href={cert.link} 
                    className="inline-flex items-center gap-1.5 text-xs text-zinc-450 hover:text-white transition-colors mt-2 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none rounded w-fit"
                  >
                    Verify Certificate <ArrowUpRight size={12} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── JOURNEY/ABOUT SECTION ── */}
        <section id="about" className="py-32 px-6 md:px-12 border-t border-zinc-900/50 bg-zinc-950/10">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                  <img 
                    src="/profile-sky.jpg" 
                    alt="Sukka Manikanta Goud black and white portrait photo" 
                    className="w-16 h-16 rounded-full object-cover border border-zinc-900 bg-zinc-950 grayscale select-none" 
                  />
                  <div>
                    <h2 className="text-2xl md:text-4xl font-bold tracking-tight">The Journey.</h2>
                    <p className="text-[10px] font-mono text-amber-500 uppercase tracking-widest font-semibold mt-1">About Me</p>
                  </div>
                </div>
                
                <div className="text-base text-zinc-500 space-y-6 leading-relaxed">
                  <p>
                    I am a self-driven developer and Cybersecurity student currently based in Sultanpur, India. My engineering process centers on building intelligent system integrations, full-stack applications, and automated workflows using AI agents as leverage.
                  </p>
                  <p>
                    I have a track record of delivering end-to-end freelance client solutions and responsive frontend systems, pivoting my focus from traditional web environments toward scalable automation architectures.
                  </p>
                </div>

                <div className="flex gap-8 pt-4 border-t border-zinc-900/50 items-center">
                  <a href="https://github.com/shadowbyte-tech" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none rounded">
                    <Github size={16} />
                    <span>GitHub</span>
                  </a>
                  <div className="w-px h-4 bg-zinc-800" />
                  <a href="https://www.linkedin.com/in/sukkamanikantagoud/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none rounded">
                    <Linkedin size={16} />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>

              {/* Condensed Timeline */}
              <div className="border border-zinc-900 bg-zinc-900/10 p-8 rounded-xl space-y-8">
                <h3 className="text-base font-bold tracking-tight text-zinc-200">Milestone Timeline</h3>
                <div className="space-y-6 border-l border-zinc-900 pl-6">
                  {[
                    { phase: "Frontend Foundations", desc: "Mastered frontend rendering layouts, modular React structure, design translation, and state management." },
                    { phase: "AI Leverage & Agents", desc: "Shifted focus to using advanced prompt engines and generative workflows to compress development cycles and launch products fast." },
                    { phase: "Cyber Security Path", desc: "Deep-diving into web application vulnerabilities, network basics, OWASP, and system hardening." }
                  ].map((item, idx) => (
                    <div key={idx} className="relative">
                      <div className="absolute -left-[30px] top-1.5 w-1.5 h-1.5 rounded-full bg-zinc-800 border border-zinc-950" />
                      <h4 className="font-bold text-zinc-350 text-sm">{item.phase}</h4>
                      <p className="text-xs text-zinc-500 leading-relaxed mt-1">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TECHNICAL WRITING / NOTES SECTION ── */}
        <section id="notes" className="py-24 px-6 md:px-12 border-t border-zinc-900/50 bg-zinc-950/20">
          <div className="max-w-5xl mx-auto">
            <div className="mb-16">
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-2">Technical Notes.</h2>
              <p className="text-zinc-500 text-sm md:text-base max-w-xl">
                Documenting engineering challenges, system design decisions, and AI integration findings.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <article className="p-8 rounded-xl border border-zinc-900 bg-zinc-900/5 flex flex-col justify-between gap-4">
                <div className="space-y-3">
                  <span className="text-[10px] font-mono text-amber-500 uppercase tracking-widest font-semibold">AI AUTOMATION</span>
                  <h3 className="text-lg font-bold text-zinc-250 leading-snug">
                    Building Autonomous AI Agent Pipelines (n8n & LangChain)
                  </h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    Analyzing how to wire multi-agent memory buffers with LangChain, setup planning agents for sub-task routing, and construct local JSON storage syncs to automate developer pipelines.
                  </p>
                </div>
                <span className="text-xs text-zinc-400 font-medium select-none">Read Note (Coming Soon)</span>
              </article>

              <article className="p-8 rounded-xl border border-zinc-900 bg-zinc-900/5 flex flex-col justify-between gap-4">
                <div className="space-y-3">
                  <span className="text-[10px] font-mono text-amber-500 uppercase tracking-widest font-semibold">WEB ARCHITECTURE</span>
                  <h3 className="text-lg font-bold text-zinc-250 leading-snug">
                    Production Optimization: Scaling React 19 and Tailwind v4
                  </h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    Sharing performance findings from deploying ASTrusted: bundle splitting, lazy loading, font preloading, and achieving a 98+ Lighthouse score on near-black theme palettes.
                  </p>
                </div>
                <span className="text-xs text-zinc-400 font-medium select-none">Read Note (Coming Soon)</span>
              </article>
            </div>
          </div>
        </section>

        {/* ── CONTACT SECTION ── */}
        <section id="contact" className="py-32 px-6 md:px-12 border-t border-zinc-900/50 bg-zinc-950/20">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div className="space-y-6 lg:sticky lg:top-24">
                <h2 className="text-2xl md:text-4xl font-bold tracking-tight">Inbound.</h2>
                <p className="text-[10px] font-mono text-amber-500 uppercase tracking-widest font-semibold">Get In Touch</p>
                <p className="text-zinc-500 text-sm leading-relaxed max-w-md">
                  I am actively open to frontend collaborations, cybersecurity opportunities, and building real-world software products. Reach out directly or fill out the form.
                </p>
                
                <div className="space-y-4 pt-4">
                  <a
                    href="mailto:sukkamanikantagoud@gmail.com"
                    className="text-lg font-bold text-zinc-200 hover:text-amber-500 transition-colors break-all focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none rounded w-fit block"
                  >
                    sukkamanikantagoud@gmail.com
                  </a>
                  
                  <div className="pt-4">
                    <a 
                      href="/resume.pdf"
                      download
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 text-black font-semibold hover:bg-amber-400 transition-colors text-xs uppercase tracking-wider focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none shadow-lg shadow-amber-500/10"
                    >
                      <FileDown size={14} />
                      Download Resume PDF
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Form Block */}
              <div className="w-full">
                <Suspense fallback={<div className="h-48 flex items-center justify-center text-zinc-500 font-mono text-[11px] uppercase tracking-[0.25em]">Loading Form...</div>}>
                  <AdvancedContactForm />
                </Suspense>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="border-t border-zinc-900 bg-zinc-950 py-16 px-6 md:px-12 text-zinc-650">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-medium">
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-md bg-zinc-900 border border-zinc-800 flex items-center justify-center text-amber-500 font-mono text-[10px] font-semibold select-none">
                &gt;_
              </span>
              <p className="text-zinc-500">© {new Date().getFullYear()} Sukka Manikanta Goud</p>
            </div>
            <div className="flex gap-6 text-zinc-500">
              <a href="https://github.com/shadowbyte-tech" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none rounded">GitHub</a>
              <a href="https://www.linkedin.com/in/sukkamanikantagoud/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none rounded">LinkedIn</a>
              <a href="mailto:sukkamanikantagoud@gmail.com" className="hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none rounded">Email</a>
            </div>
          </div>
        </footer>
      </main>
    </SmoothScroll>
    </ThemeProvider>
  );
}
