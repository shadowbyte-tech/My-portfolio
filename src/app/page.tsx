'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Link from 'next/link'
import { Cpu, Award, Play, BookOpen, Quote, Star, ArrowUpRight } from 'lucide-react'
import TextTypingAnimation from '../components/TextTypingAnimation'
import { playSound } from '../lib/sound'

const HERO_ROLES = [
  "AI Engineer",
  "Cyber Security Student",
  "Founder of Shadow AI",
  "Full Stack Developer"
]

const TECHS = [
  "Python", "JavaScript", "TypeScript", "React", "Next.js", 
  "FastAPI", "TailwindCSS", "Docker", "Linux", "AI", "Cyber Security"
]

const PHILOSOPHY = {
  title: "My Philosophy",
  text: "I believe technology should remove complexity and empower people to achieve more with less effort. I enjoy building intelligent systems that solve real-world problems and create meaningful experiences."
}

const LEARNING_TOPICS = [
  { name: "System Design", progress: 75, status: "Advanced Architectures" },
  { name: "LLM Engineering", progress: 85, status: "RAG & Finetuning" },
  { name: "AI Agents", progress: 90, status: "LangChain & LangGraph" },
  { name: "Cloud Computing", progress: 70, status: "AWS / Docker Deploys" },
  { name: "Cyber Security", progress: 80, status: "OWASP & Hardening" }
]

const AVAILABILITY = [
  "Available for Internships",
  "Open to Collaborations",
  "Interested in AI and Full-Stack Opportunities"
]

const TESTIMONIALS = [
  {
    text: "Manikanta delivered our platform ahead of schedule, with exceptional performance optimizations and SEO indexing that immediately generated client leads.",
    author: "A.S. Goud",
    role: "Founder, AS Trusted Consultancy",
    stars: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
  },
  {
    text: "Manikanta has a rare combination of frontend execution and automation depth. His LangChain multi-agent planning setups saved us countless development cycles.",
    author: "Elena Rostova",
    role: "Technical Lead, Alpha Automations",
    stars: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
  },
  {
    text: "Exceptional UI designer who understands complex software systems. Redesigned our operational metrics dashboard with pure performance and state stability.",
    author: "Siddharth Mehta",
    role: "Product Owner, Ninjas Systems",
    stars: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150"
  }
]

const PROFILE_IMAGES = [
  "/profile-closeup.jpg",
  "/profile-headphones.jpg",
  "/profile-sky.jpg"
]

export default function HomePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0)

  useEffect(() => {
    const avatarInterval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % PROFILE_IMAGES.length)
    }, 4500)

    const testimonialInterval = setInterval(() => {
      setCurrentTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length)
    }, 6000)

    return () => {
      clearInterval(avatarInterval)
      clearInterval(testimonialInterval)
    }
  }, [])

  return (
    <div className="max-w-5xl mx-auto px-6 space-y-36">
      
      {/* ── HERO SECTION ── */}
      <section className="min-h-[75vh] flex flex-col justify-center items-center text-center relative overflow-hidden pt-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8 relative z-10 w-full"
        >
          {/* Status availability pill */}
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[11px] text-zinc-300 font-medium select-none shadow-sm shadow-[#00F5FF]/5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span>Currently Open to Internships, Freelance, & AI Collaborations</span>
          </div>

          {/* Portrait Slideshow */}
          <div className="flex justify-center h-24">
            <div className="w-24 h-24 rounded-full overflow-hidden border border-white/10 bg-black/40 shadow-xl select-none relative">
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
              <span>I am an</span>
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
            <Link
              href="/projects"
              onClick={() => playSound('click')}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#00F5FF] to-[#7C3AED] text-white font-bold text-xs uppercase tracking-wider glow-btn-cyan cursor-pointer"
            >
              View Projects
            </Link>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playSound('click')}
              className="px-6 py-3 rounded-full border border-white/10 bg-white/5 text-zinc-300 font-bold text-xs hover:border-[#7C3AED]/30 hover:text-white transition-all uppercase tracking-wider glow-btn-purple"
            >
              Download Resume
            </a>
            <Link
              href="/contact"
              onClick={() => playSound('click')}
              className="px-6 py-3 rounded-full border border-white/10 bg-white/5 text-zinc-300 font-bold text-xs hover:border-[#00F5FF]/30 hover:text-white transition-all uppercase tracking-wider glow-btn-cyan cursor-pointer"
            >
              Contact Me
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── TECHNICAL STACK INFINITE MARQUEE ── */}
      <section className="overflow-hidden py-4 border-y border-white/5 relative bg-black/20">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#050816] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#050816] to-transparent z-10 pointer-events-none" />
        
        <div className="flex w-[200%] animate-infinite-marquee gap-8 hover:[animation-play-state:paused] cursor-default py-2">
          {/* Double list for seamless wrapping */}
          {[...TECHS, ...TECHS].map((tech, i) => (
            <span
              key={i}
              className="skill-chip px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider text-zinc-300 select-none shadow-sm cursor-default"
            >
              {tech}
            </span>
          ))}
        </div>

        <style jsx>{`
          @keyframes infiniteMarquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-infinite-marquee {
            animation: infiniteMarquee 30s linear infinite;
          }
        `}</style>
      </section>

      {/* ── PHILOSOPHY, LEARNING, & AVAILABILITY GRID ── */}
      <section className="grid md:grid-cols-2 gap-8">
        
        {/* Philosophy Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 flex flex-col justify-between"
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Quote className="w-10 h-10 text-[#00F5FF]/40 rotate-180" />
              <span className="text-[10px] font-mono text-[#00F5FF] uppercase tracking-widest font-semibold">Core Focus</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-[#00F5FF] to-[#7C3AED] bg-clip-text text-transparent">
              {PHILOSOPHY.title}
            </h2>
            <p className="text-zinc-300 text-sm md:text-base leading-relaxed font-medium">
              {PHILOSOPHY.text}
            </p>
          </div>
          <Quote className="w-10 h-10 text-[#7C3AED]/40 self-end mt-4" />
        </motion.div>

        {/* Availability Status Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 flex flex-col justify-between"
        >
          <div>
            <div className="mb-6 flex justify-between items-center">
              <Cpu className="w-6 h-6 text-[#7C3AED]" />
              <span className="text-[10px] font-mono text-[#7C3AED] uppercase tracking-widest font-semibold">Live Availability</span>
            </div>
            <h2 className="text-xl font-bold text-white mb-6">Current Engagement</h2>
            <div className="space-y-4">
              {AVAILABILITY.map((status, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-[#00F5FF]/10 transition-colors">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                  </span>
                  <span className="text-xs text-zinc-300 font-semibold">{status}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── WHAT I'M LEARNING NOW ── */}
      <section className="space-y-10">
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-extrabold text-white">What I'm Learning Now</h2>
          <p className="text-zinc-450 text-xs md:text-sm mt-2">Constantly expanding stack and methodology knowledge</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {LEARNING_TOPICS.map((topic, i) => (
            <motion.div
              key={topic.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-6 flex flex-col justify-between gap-4"
            >
              <div className="space-y-2">
                <BookOpen className="w-5 h-5 text-[#00F5FF]" />
                <h3 className="text-sm font-bold text-white">{topic.name}</h3>
                <span className="text-[10px] text-zinc-400 block font-medium">{topic.status}</span>
              </div>
              <div className="space-y-2 pt-2">
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#00F5FF] to-[#7C3AED] rounded-full" 
                    style={{ width: `${topic.progress}%` }}
                  />
                </div>
                <span className="text-[10px] text-[#00F5FF] font-mono font-bold">{topic.progress}% Completed</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  )
}

