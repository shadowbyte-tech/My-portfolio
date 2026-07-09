'use client'

import React from 'react'
import { motion } from 'motion/react'
import { Cpu, Code, Database, Globe, Layers } from 'lucide-react'
import { playSound } from '../../lib/sound'

const AI_SKILLS = ["Prompt Engineering", "LLM Integration", "AI Agents", "ChatGPT API", "n8n Workflows"]

const SKILL_GROUPS = [
  {
    category: "Languages",
    icon: Code,
    skills: ["Python", "JavaScript", "HTML5", "CSS3"]
  },
  {
    category: "Web Development",
    icon: Globe,
    skills: ["React.js", "Tailwind CSS", "Node.js", "Express.js"]
  },
  {
    category: "Databases",
    icon: Database,
    skills: ["MongoDB", "MySQL", "JSON"]
  },
  {
    category: "Tools & APIs",
    icon: Layers,
    skills: ["Git", "GitHub", "REST APIs", "Vite"]
  }
]

export default function SkillsPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 space-y-16 pt-10">
      
      {/* Header */}
      <section className="text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">Skills Matrix.</h1>
        <p className="text-zinc-400 text-sm md:text-base max-w-xl">
          Technologies, frameworks, libraries, and automation systems that define my stack.
        </p>
      </section>

      {/* Core focus: AI & Automation */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-card p-8 border-[#00F5FF]/10 hover:border-[#00F5FF]/20"
      >
        <h3 className="text-xl font-bold text-[#00F5FF] mb-6 tracking-tight flex items-center gap-2">
          <Cpu size={18} />
          AI & Automation (Core Focus)
        </h3>
        <div className="flex flex-wrap gap-2.5">
          {AI_SKILLS.map(s => (
            <span 
              key={s} 
              onMouseEnter={() => playSound('hover')}
              className="skill-chip px-4 py-2.5 rounded-full text-xs font-semibold select-none cursor-default"
            >
              {s}
            </span>
          ))}
        </div>
      </motion.section>

      {/* Standard Categories Grid */}
      <section className="grid md:grid-cols-2 gap-6">
        {SKILL_GROUPS.map((group, idx) => {
          const GroupIcon = group.icon
          return (
            <motion.div 
              key={group.category} 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="glass-card p-6"
            >
              <h4 className="text-sm font-bold text-zinc-200 mb-4 tracking-tight border-b border-white/5 pb-3 flex items-center gap-2">
                <GroupIcon size={16} className="text-[#7C3AED]" />
                {group.category}
              </h4>
              <div className="flex flex-wrap gap-2.5 pt-1">
                {group.skills.map(s => (
                  <span 
                    key={s} 
                    onMouseEnter={() => playSound('hover')}
                    className="skill-chip px-3 py-2 rounded-full text-xs font-semibold select-none cursor-default"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          )
        })}
      </section>

    </div>
  )
}
