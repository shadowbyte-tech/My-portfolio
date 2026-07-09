'use client'

import React, { Suspense } from 'react'
import { motion } from 'motion/react'
import { Mail, FileDown, ArrowUpRight } from 'lucide-react'
import AdvancedContactForm from '../../components/AdvancedContactForm'
import { playSound } from '../../lib/sound'

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 space-y-12 pt-10">
      
      {/* Header */}
      <section className="text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">Inbound.</h1>
        <p className="text-zinc-400 text-sm md:text-base max-w-xl">
          I am actively open to frontend collaborations, cybersecurity opportunities, and building real-world software products. Reach out directly or fill out the form.
        </p>
      </section>

      {/* Grid */}
      <section className="grid lg:grid-cols-2 gap-12 items-start pt-6">
        
        {/* Contact info details */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="space-y-4">
            <span className="text-[10px] font-mono text-[#00F5FF] uppercase tracking-widest font-bold">Contact Info</span>
            <a
              href="mailto:sukkamanikantagoud@gmail.com"
              onMouseEnter={() => playSound('hover')}
              onClick={() => playSound('click')}
              className="text-xl font-bold text-white hover:text-[#00F5FF] transition-colors break-all focus-visible:ring-2 focus-visible:ring-[#00F5FF] focus-visible:outline-none rounded w-fit block"
            >
              sukkamanikantagoud@gmail.com
            </a>
          </div>

          <div className="pt-4">
            <a 
              href="/resume.pdf"
              download
              onMouseEnter={() => playSound('hover')}
              onClick={() => playSound('click')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#00F5FF] to-[#7C3AED] text-white font-bold hover:opacity-95 transition-opacity text-xs uppercase tracking-wider glow-btn-cyan focus-visible:ring-2 focus-visible:ring-[#00F5FF] focus-visible:outline-none shadow-lg shadow-[#00F5FF]/10"
            >
              <FileDown size={14} />
              Download Resume PDF
            </a>
          </div>
        </motion.div>

        {/* Contact Form widget wrapper */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-card p-6 md:p-8"
        >
          <Suspense fallback={<div className="h-48 flex items-center justify-center text-[#00F5FF] font-mono text-[11px] uppercase tracking-[0.25em] animate-pulse">Loading Form...</div>}>
            <AdvancedContactForm />
          </Suspense>
        </motion.div>

      </section>

    </div>
  )
}
