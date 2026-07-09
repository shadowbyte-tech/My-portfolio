'use client'

import React from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { Cpu, Github, ExternalLink, ArrowUpRight } from 'lucide-react'
import { playSound } from '../../lib/sound'

const PROJECTS = [
  {
    slug: "as-trusted-consultancy",
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
    slug: "personal-ai-agent-system",
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
    slug: "ninjas-system-ui",
    title: "Ninjas System UI",
    problem: "A gaming dashboard clone required interactive frontend widgets and pixel-perfect design translation.",
    description: "Cloned complex interactive elements from the Coding Ninjas dashboard platform. Focused on modular components, Framer Motion animations, and fluid responsive views.",
    outcome: "Delivered a high-fidelity frontend layout demonstrating clean layout discipline and custom widget programming.",
    image: "/ninjas-system.jpg",
    tags: ["React", "UI Engineering", "Framer Motion", "Vite"],
    githubUrl: "https://github.com/shadowbyte-tech/Coding-Ninjas-clone",
    liveUrl: "https://coding-ninjas-clone-beta.vercel.app/"
  }
]

export default function ProjectsPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 space-y-16 pt-10">
      
      {/* Header */}
      <section className="text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">Projects.</h1>
        <p className="text-zinc-400 text-sm md:text-base max-w-xl">
          Real software integrations, live client apps, and automated workflows I have shipped.
        </p>
      </section>

      {/* Projects Grid */}
      <section className="space-y-24">
        {PROJECTS.map((project, idx) => {
          const isEven = idx % 2 === 0
          return (
            <motion.article 
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="glass-card p-6 md:p-8"
            >
              <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-center`}>
                
                {/* Visual Representation */}
                <div className="w-full lg:w-[48%] flex-shrink-0">
                  {project.isAIAgent ? (
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
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="block relative group overflow-hidden rounded-2xl border border-white/5 bg-black/40 shadow-xl">
                      <img 
                        loading="lazy"
                        src={project.image} 
                        alt={`${project.title} screenshot showing application interface`}
                        className="w-full aspect-[16/10] object-cover object-top opacity-85 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
                      />
                    </a>
                  )}
                </div>

                {/* Content Info */}
                <div className="w-full lg:w-[52%] space-y-6">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold tracking-tight text-white">{project.title}</h3>
                    <p className="text-[10px] font-mono text-[#00F5FF] uppercase tracking-widest font-semibold">Case Study</p>
                  </div>

                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {project.problem}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[11px] text-zinc-300 font-semibold shadow-inner">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links & Page Navigation */}
                  <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/5 w-full">
                    <Link 
                      href={`/projects/${project.slug}`}
                      onClick={() => playSound('click')}
                      onMouseEnter={() => playSound('hover')}
                      className="flex items-center gap-1 text-xs text-[#00F5FF] hover:text-[#00F5FF]/80 font-bold px-4 py-2 rounded-full bg-[#00F5FF]/5 border border-[#00F5FF]/10"
                    >
                      Read Case Study <ArrowUpRight size={13} />
                    </Link>

                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors px-4 py-2 rounded-full bg-white/5 border border-white/5">
                        <Github size={14} />
                        <span>Source Code</span>
                      </a>
                    )}
                  </div>
                </div>

              </div>
            </motion.article>
          )
        })}
      </section>

    </div>
  )
}
