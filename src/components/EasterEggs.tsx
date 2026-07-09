'use client'

import React, { useEffect, useState } from 'react'
import confetti from 'canvas-confetti'
import { motion, AnimatePresence } from 'motion/react'

export default function EasterEggs() {
  const [activeEgg, setActiveEgg] = useState<string | null>(null)
  
  useEffect(() => {
    // 1. Konami Code Sequence
    const konamiCode = [
      'ArrowUp', 'ArrowUp', 
      'ArrowDown', 'ArrowDown', 
      'ArrowLeft', 'ArrowRight', 
      'ArrowLeft', 'ArrowRight', 
      'b', 'a'
    ]
    let konamiIndex = 0

    // 2. Typing "shadow" Sequence
    const shadowWord = 'shadow'
    let shadowInput = ''

    // 3. Shift Key counter
    let shiftCount = 0
    let shiftTimeout: NodeJS.Timeout

    const handleKeyDown = (e: KeyboardEvent) => {
      // Check Konami Code
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++
        if (konamiIndex === konamiCode.length) {
          triggerKonami()
          konamiIndex = 0
        }
      } else {
        konamiIndex = 0
      }

      // Check Typing "shadow"
      if (e.key.length === 1) {
        shadowInput += e.key.toLowerCase()
        if (shadowInput.endsWith(shadowWord)) {
          triggerShadow()
          shadowInput = ''
        } else if (shadowInput.length > 20) {
          shadowInput = shadowInput.substring(shadowInput.length - 10)
        }
      }

      // Check Shift Presses
      if (e.key === 'Shift') {
        shiftCount++
        clearTimeout(shiftTimeout)
        
        if (shiftCount === 5) {
          triggerShift()
          shiftCount = 0
        } else {
          shiftTimeout = setTimeout(() => {
            shiftCount = 0
          }, 2000)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      clearTimeout(shiftTimeout)
    }
  }, [])

  const triggerKonami = () => {
    setActiveEgg('🔴 KONAMI MODE DEPLOYED 🔴')
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#00F5FF', '#7C3AED', '#ffffff']
    })
    setTimeout(() => setActiveEgg(null), 3000)
  }

  const triggerShadow = () => {
    setActiveEgg('⚡ SHADOW AGENT UNLEASHED ⚡')
    const end = Date.now() + 2 * 1000
    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#00F5FF', '#7C3AED']
      })
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#00F5FF', '#7C3AED']
      })
      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }
    frame()
    setTimeout(() => setActiveEgg(null), 3000)
  }

  const triggerShift = () => {
    setActiveEgg('💥 TURBO SHIFT TRIGGERED 💥')
    // Random fire burst
    confetti({
      particleCount: 80,
      angle: 90,
      spread: 360,
      origin: { y: 0.5 },
      colors: ['#7C3AED', '#00F5FF']
    })
    setTimeout(() => setActiveEgg(null), 3000)
  }

  return (
    <AnimatePresence>
      {activeEgg && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed top-24 left-1/2 -translate-x-1/2 z-[9999] px-6 py-3 rounded-full bg-black/85 border border-[#00F5FF]/30 text-white font-mono text-xs font-bold tracking-widest text-center shadow-lg shadow-[#00F5FF]/20"
        >
          {activeEgg}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
