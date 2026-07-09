'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import { Terminal, X, Volume2, VolumeX } from 'lucide-react'
import { playSound, areSoundsEnabled, toggleSounds } from '../lib/sound'

const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Experience', path: '/experience' },
  { name: 'Projects', path: '/projects' },
  { name: 'Skills', path: '/skills' },
  { name: 'Contact', path: '/contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [soundsEnabled, setSoundsEnabled] = useState(areSoundsEnabled())

  const handleNavClick = () => {
    playSound('click')
    setMobileMenuOpen(false)
  }

  const toggleSoundSettings = () => {
    const nextState = !soundsEnabled
    setSoundsEnabled(nextState)
    toggleSounds(nextState)
    if (nextState) {
      playSound('open')
    }
  }

  return (
    <header className="fixed top-6 left-0 w-full z-[100] flex justify-center px-4">
      <nav className="w-full max-w-4xl rounded-full glass-navbar py-3 px-6 flex justify-between items-center relative">
        {/* Brand Logo */}
        <Link 
          href="/" 
          onClick={handleNavClick}
          className="flex items-center gap-3 group focus-visible:ring-2 focus-visible:ring-[#00F5FF] focus-visible:outline-none rounded-full"
        >
          <span className="w-8 h-8 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-[#00F5FF] font-mono text-xs font-semibold select-none group-hover:border-[#00F5FF]/30 transition-colors shadow-inner">
            &gt;_
          </span>
          <span className="font-mono text-xs tracking-wider text-zinc-300">
            manikanta<span className="text-[#00F5FF]">.dev</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-4 items-center text-xs">
          {NAV_LINKS.map((item) => {
            const isActive = pathname === item.path
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={handleNavClick}
                onMouseEnter={() => playSound('hover')}
                className={`font-semibold tracking-wider transition-colors focus-visible:ring-2 focus-visible:ring-[#00F5FF] focus-visible:outline-none rounded-full px-3.5 py-1.5 ${
                  isActive 
                    ? 'text-[#00F5FF] bg-white/5 border border-white/5 shadow-[0_0_15px_rgba(0,245,255,0.05)]' 
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            )
          })}
          
          <div className="w-px h-4 bg-white/10" />

          {/* Sound Toggle */}
          <button
            onClick={toggleSoundSettings}
            className="p-1.5 rounded-full hover:bg-white/5 text-zinc-400 hover:text-[#00F5FF] transition-colors focus:outline-none cursor-pointer"
            title={soundsEnabled ? 'Disable UI Sounds' : 'Enable UI Sounds'}
          >
            {soundsEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
          </button>

          <div className="w-px h-4 bg-white/10" />

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleNavClick}
            className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#00F5FF] to-[#7C3AED] text-white hover:opacity-90 transition-opacity text-xs font-bold focus-visible:ring-2 focus-visible:ring-[#00F5FF] focus-visible:outline-none shadow-md shadow-[#00F5FF]/10"
          >
            Resume ↗
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => {
            playSound('click')
            setMobileMenuOpen(!mobileMenuOpen)
          }}
          className="md:hidden w-9 h-9 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-all focus-visible:ring-2 focus-visible:ring-[#00F5FF] focus-visible:outline-none cursor-pointer"
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
              {NAV_LINKS.map((item) => {
                const isActive = pathname === item.path
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={handleNavClick}
                    className={`text-base font-semibold border-b border-white/5 pb-2 transition-colors ${
                      isActive ? 'text-[#00F5FF]' : 'text-zinc-350 hover:text-white'
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              })}

              <div className="flex justify-between items-center py-2">
                <span className="text-xs text-zinc-400">UI Sounds</span>
                <button
                  onClick={toggleSoundSettings}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-zinc-300 hover:text-[#00F5FF]"
                >
                  {soundsEnabled ? (
                    <>
                      <Volume2 size={14} />
                      <span>On</span>
                    </>
                  ) : (
                    <>
                      <VolumeX size={14} />
                      <span>Off</span>
                    </>
                  )}
                </button>
              </div>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleNavClick}
                className="py-3 rounded-full bg-gradient-to-r from-[#00F5FF] to-[#7C3AED] text-white font-bold text-center text-sm shadow-lg shadow-[#00F5FF]/10"
              >
                View Resume ↗
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
