'use client'

import React, { useState } from 'react'
import { motion } from 'motion/react'
import { Github, Linkedin, Mail, Sparkles, Code, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { playSound } from '../../lib/sound'

const MILESTONES = [
  {
    year: "2024",
    title: "Started Programming",
    short: "Learned foundations of logic, Python scripting, and modular code blocks.",
    details: "Dived deep into algorithms and data processing modules. Understood layout rendering and built basic command line automations. Pivoted toward full-stack setups early on."
  },
  {
    year: "2025",
    title: "Built Web Applications",
    short: "Delivered interactive React dashboards, custom SEO platforms, and real-world clients projects.",
    details: "Focused on user metrics, page weight optimizations, indexing tags, and fast bundle loaders. Transformed visual templates into high-performance web products."
  },
  {
    year: "2025",
    title: "Started Shadow AI",
    short: "Founded the development agency, focusing on multi-agent automation workflows and integrations.",
    details: "Architected autonomous web scrapers, local vector database synchronization buffers, LangChain task planners, and custom n8n operations. Saved dozens of hours on manual administrative schedules."
  },
  {
    year: "2026",
    title: "Building Intelligent Systems",
    short: "Merging cybersecurity hardened protocols with autonomous backend workflows.",
    details: "Interned in frontend layout disciplines. Expanding studies into network security layers, OWASP system checks, state sanitization hooks, and secure LLM routing gateways."
  },
  {
    year: "Future",
    title: "AI Startup Founder",
    short: "Engineering scalable multi-agent systems designed to automate real-world enterprise constraints.",
    details: "Visioning robust workspace interfaces that connect API executors, JSON memory stores, scheduling triggers, and human-in-the-loop validation tools into a zero-maintenance SaaS system."
  }
]

export default function AboutPage() {
  const [expandedMilestone, setExpandedMilestone] = useState<number | null>(null)

  const toggleMilestone = (index: number) => {
    playSound('click')
    setExpandedMilestone(expandedMilestone === index ? null : index)
  }

  return (
    <div className="max-w-4xl mx-auto px-6 space-y-20 pt-10">
      
      {/* ── ABOUT ME HEADER ── */}
      <section className="grid md:grid-cols-3 gap-12 items-center">
        <div className="md:col-span-1 flex justify-center">
          <motion.img 
            src="/profile-sky.jpg" 
            alt="Sukka Manikanta Goud portrait photo" 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-48 h-48 rounded-full object-cover border-2 border-white/10 bg-black/40 shadow-xl select-none" 
          />
        </div>
        <div className="md:col-span-2 space-y-6">
          <div className="space-y-1">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">The Journey.</h1>
            <p className="text-[10px] font-mono text-[#00F5FF] uppercase tracking-widest font-semibold mt-1">About Me</p>
          </div>
          
          <div className="text-zinc-400 space-y-4 leading-relaxed font-medium text-sm md:text-base">
            <p>
              I am a self-driven developer and Cybersecurity student currently based in Sultanpur, India. My engineering process centers on building intelligent system integrations, full-stack applications, and automated workflows using AI agents as leverage.
            </p>
            <p>
              I have a track record of delivering end-to-end freelance client solutions and responsive frontend systems, pivoting my focus from traditional web environments toward scalable automation architectures.
            </p>
          </div>

          <div className="flex gap-6 pt-2 items-center">
            <a 
              href="https://github.com/shadowbyte-tech" 
              target="_blank" 
              rel="noopener noreferrer" 
              onMouseEnter={() => playSound('hover')}
              className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
            >
              <Github size={16} />
              <span>GitHub</span>
            </a>
            <div className="w-px h-4 bg-white/10" />
            <a 
              href="https://www.linkedin.com/in/sukkamanikantagoud/" 
              target="_blank" 
              rel="noopener noreferrer" 
              onMouseEnter={() => playSound('hover')}
              className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
            >
              <Linkedin size={16} />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE TIMELINE ── */}
      <section className="space-y-12">
        <div className="text-center md:text-left">
          <h2 className="text-2xl md:text-4xl font-extrabold text-white">Interactive Timeline</h2>
          <p className="text-zinc-450 text-xs md:text-sm mt-2">Scroll and click on milestones to reveal development history</p>
        </div>

        <div className="relative border-l-2 border-white/5 pl-8 ml-4 space-y-12 py-4">
          {MILESTONES.map((item, idx) => {
            const isExpanded = expandedMilestone === idx
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                {/* Glowing vertical node */}
                <div 
                  className={`absolute -left-[41px] top-1.5 w-6 h-6 rounded-full border-4 border-[#050816] flex items-center justify-center cursor-pointer transition-all duration-300 ${
                    isExpanded 
                      ? 'bg-[#00F5FF] shadow-[0_0_15px_#00F5FF]' 
                      : 'bg-zinc-800 hover:bg-[#7C3AED] hover:shadow-[0_0_10px_#7C3AED]'
                  }`}
                  onClick={() => toggleMilestone(idx)}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>

                <div className="glass-card p-6 cursor-pointer hover:border-[#00F5FF]/20" onClick={() => toggleMilestone(idx)}>
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <span className="text-[#00F5FF] font-mono text-sm font-bold bg-[#00F5FF]/5 border border-[#00F5FF]/10 px-3 py-1 rounded-full">
                        {item.year}
                      </span>
                      <h3 className="text-lg font-bold text-white mt-3">{item.title}</h3>
                      <p className="text-zinc-450 text-xs md:text-sm mt-1.5 leading-relaxed font-semibold">
                        {item.short}
                      </p>
                    </div>
                    <button className="text-zinc-500 hover:text-white pt-1">
                      {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>
                  </div>

                  <motion.div
                    initial={false}
                    animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 mt-4 border-t border-white/5 text-zinc-400 text-xs md:text-sm leading-relaxed">
                      {item.details}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

    </div>
  )
}
