'use client'

import React from 'react'
import { motion } from 'motion/react'
import { Award, Briefcase, ArrowUpRight } from 'lucide-react'
import { playSound } from '../../lib/sound'

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
]

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
]

export default function ExperiencePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 space-y-16 pt-10">
      
      {/* Header */}
      <section className="text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">Experience.</h1>
        <p className="text-zinc-400 text-sm md:text-base max-w-xl">
          A timeline of freelance deliveries, internships, and technical roles.
        </p>
      </section>

      {/* Experience Timeline */}
      <section className="space-y-8">
        {EXPERIENCES.map((exp, idx) => (
          <motion.div 
            key={idx} 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="glass-card p-8 flex flex-col md:flex-row justify-between gap-6"
          >
            <div className="space-y-3 md:max-w-xl">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Briefcase size={18} className="text-[#00F5FF]" />
                {exp.role}
              </h3>
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
                    onMouseEnter={() => playSound('hover')}
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
      </section>

      {/* Certifications Category */}
      <section className="space-y-8">
        <h2 className="text-2xl font-extrabold text-white">Certifications.</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {CERTIFICATIONS.map((cert, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="glass-card p-6 flex flex-col justify-between gap-4"
            >
              <div className="space-y-2">
                <Award size={18} className="text-[#00F5FF]" />
                <h3 className="text-sm font-bold text-zinc-100 leading-snug">{cert.name}</h3>
                <p className="text-xs font-mono text-zinc-550">{cert.issuer}</p>
              </div>
              <a 
                href={cert.link} 
                onMouseEnter={() => playSound('hover')}
                className="inline-flex items-center gap-1.5 text-xs text-[#00F5FF] hover:text-[#00F5FF]/80 transition-colors mt-2 focus-visible:ring-2 focus-visible:ring-[#00F5FF] focus-visible:outline-none rounded w-fit"
              >
                Verify Certificate <ArrowUpRight size={12} />
              </a>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  )
}
