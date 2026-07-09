import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Github, ExternalLink, ArrowUpRight, CheckCircle, ShieldAlert, Zap } from 'lucide-react'

interface CaseStudyData {
  title: string
  overview: string
  problem: string
  solution: string
  architecture: string
  techStack: string[]
  challenges: string
  futurePlans: string
  githubUrl?: string
  liveUrl?: string
  image: string
}

const CASE_STUDIES: Record<string, CaseStudyData> = {
  "as-trusted-consultancy": {
    title: "AS Trusted Consultancy",
    overview: "A professional business application designed to bootstrap organic search traffic and establish local digital authority for a growing real-estate advisory workspace.",
    problem: "The client suffered from zero organic search discovery and zero inbound local inquiries, depending entirely on word-of-mouth lead generations.",
    solution: "Built a fully optimized responsive React 19 portfolio application on top of Next.js configurations. Established fast preloading layout metrics and configured custom structured schema scripts for immediate crawler indexing.",
    architecture: "Static site generation (SSG) deployment utilizing client-side form security validation hooks. Content preloading, responsive media queries, and serverless edge delivery structures.",
    techStack: ["React 19", "Tailwind CSS", "Vite", "SEO Meta Tags", "Vercel Edge Network"],
    challenges: "Optimizing the visual layout asset loads to guarantee an ultra-high Lighthouse score while supporting multi-layered layout media and local caching parameters.",
    futurePlans: "Integrating automated email notification triggers and custom real-estate listing manager portals.",
    githubUrl: "https://github.com/shadowbyte-tech/AS-TRUSTED",
    liveUrl: "https://as-trusted-consultancy.vercel.app/",
    image: "/trusted-consultancy.jpg"
  },
  "personal-ai-agent-system": {
    title: "Personal AI Agent System",
    overview: "A multi-agent autonomous system built on Python and LangChain. Integrates task planners, custom LLM APIs, and worker agents containing memory buffers.",
    problem: "Recurring developer activities (automated scraping, system checks, prompt diagnostics) consumed hours of daily manual command executions.",
    solution: "Designed a planning worker loop that routes tasks to specialist subagents (Web Scraper, API checker, local logger) and syncs workspace status metrics dynamically in a shared JSON datastore.",
    architecture: "LangChain Planner loops connecting LangGraph task execution grids. Vector index caches for automated search routing, n8n webhook listeners, and local document memory buffers.",
    techStack: ["Python", "AI Agents", "LangChain", "LLM APIs", "n8n Workflows", "Vector DB"],
    challenges: "Managing agent feedback loops to avoid infinite token exhaustion on complex planning failures, resolved by setting max-iteration timeouts and planning buffers.",
    futurePlans: "Moving memory layers to secure cloud-hosted embeddings and adding a browser interface for human-in-the-loop task overrides.",
    githubUrl: "https://github.com/shadowbyte-tech/ai-assistant",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2070"
  },
  "ninjas-system-ui": {
    title: "Ninjas System UI",
    overview: "A responsive gaming dashboard replica highlighting advanced UI animations, modular widget layouts, and fluid viewport translation scripts.",
    problem: "Translating pixel-perfect Figma design layouts of gaming statistics into performant React web interfaces without visual page reflows.",
    solution: "Programmed component states with Framer Motion layout transition parameters. Wrapped metrics, grids, charts, and charts in optimized custom containers.",
    architecture: "React modular widgets with isolated CSS module rules. Layout transition triggers, dynamic styling parameters, and responsive grid calculations.",
    techStack: ["React", "UI Engineering", "Framer Motion", "Vite CSS Modules"],
    challenges: "Fine-tuning complex multi-layer slide menus on lower-powered devices, resolved by forcing CSS composite GPU properties.",
    futurePlans: "Wiring dummy WebSocket dashboard stats to simulate live player counts and score achievements.",
    githubUrl: "https://github.com/shadowbyte-tech/Coding-Ninjas-clone",
    liveUrl: "https://coding-ninjas-clone-beta.vercel.app/",
    image: "/ninjas-system.jpg"
  }
}

// Next.js 15 Dynamic page signature
interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function ProjectCaseStudyPage({ params }: PageProps) {
  const { slug } = await params
  const project = CASE_STUDIES[slug]

  if (!project) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto px-6 space-y-12 pt-6 pb-20">
      
      {/* Back button */}
      <Link 
        href="/projects" 
        className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-[#00F5FF] transition-colors"
      >
        <ArrowLeft size={14} />
        <span>Back to Projects</span>
      </Link>

      {/* Title */}
      <div className="space-y-4">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">{project.title}</h1>
        <p className="text-xs font-mono text-[#00F5FF] uppercase tracking-widest font-bold">Case Study Documentation</p>
      </div>

      {/* Showcase Image */}
      <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden border border-white/10 bg-black/40">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover object-top"
        />
      </div>

      {/* Case Study Details Sections */}
      <div className="grid md:grid-cols-3 gap-8 pt-6">
        
        {/* Main Content */}
        <div className="md:col-span-2 space-y-8">
          
          {/* Overview */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <CheckCircle size={16} className="text-[#00F5FF]" />
              Project Overview
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed font-medium">{project.overview}</p>
          </section>

          {/* Problem */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldAlert size={16} className="text-[#7C3AED]" />
              The Challenge / Problem Statement
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed font-medium">{project.problem}</p>
          </section>

          {/* Solution */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Zap size={16} className="text-[#00F5FF]" />
              The Deployed Solution
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed font-medium">{project.solution}</p>
          </section>

          {/* Architecture */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">System Architecture & Pipeline</h2>
            <p className="text-zinc-400 text-sm leading-relaxed font-medium">{project.architecture}</p>
          </section>

          {/* Key Engineering Challenges */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">Engineering Hurdles & Resolutions</h2>
            <p className="text-zinc-400 text-sm leading-relaxed font-medium">{project.challenges}</p>
          </section>

          {/* Future Plans */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">Future Roadmap</h2>
            <p className="text-zinc-400 text-sm leading-relaxed font-medium">{project.futurePlans}</p>
          </section>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="glass-card p-6 space-y-6">
            <div>
              <h3 className="text-xs font-mono text-zinc-450 uppercase tracking-widest font-bold mb-3">Tech Stack Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map(tech => (
                  <span key={tech} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-[11px] text-zinc-300 font-semibold shadow-inner">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="h-px bg-white/5 w-full" />

            <div className="space-y-3">
              <h3 className="text-xs font-mono text-zinc-450 uppercase tracking-widest font-bold">Action Links</h3>
              <div className="flex flex-col gap-2.5">
                {project.githubUrl && (
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center justify-between text-xs text-zinc-300 hover:text-white transition-colors px-4 py-2.5 rounded-xl bg-white/5 border border-white/5 font-semibold"
                  >
                    <span>View Repository</span>
                    <Github size={14} />
                  </a>
                )}
                {project.liveUrl && (
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center justify-between text-xs text-[#00F5FF] hover:text-[#00F5FF]/85 font-bold px-4 py-2.5 rounded-xl bg-[#00F5FF]/5 border border-[#00F5FF]/10"
                  >
                    <span>Visit Live Site</span>
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}
