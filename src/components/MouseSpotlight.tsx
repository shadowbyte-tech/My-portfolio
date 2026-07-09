'use client'

import React, { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

export default function MouseSpotlight() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Spring settings for trailing effect
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 }
  const glowX = useSpring(mouseX, springConfig)
  const glowY = useSpring(mouseY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Offset by half the width/height of the glow element (150px)
      mouseX.set(e.clientX - 150)
      mouseY.set(e.clientY - 150)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [mouseX, mouseY])

  return (
    <>
      {/* Spotlight background glow orb */}
      <motion.div
        className="fixed top-0 left-0 w-[300px] h-[300px] rounded-full pointer-events-none z-[-5] opacity-25 mix-blend-screen blur-[80px]"
        style={{
          x: glowX,
          y: glowY,
          background: 'radial-gradient(circle, rgba(0, 245, 255, 0.4) 0%, rgba(124, 58, 237, 0.2) 50%, transparent 100%)',
        }}
      />
      {/* Visual Cursor Trailing dot */}
      <motion.div
        className="fixed top-[146px] left-[146px] w-[8px] h-[8px] rounded-full pointer-events-none z-[9999] bg-[#00F5FF]"
        style={{
          x: glowX,
          y: glowY,
          boxShadow: '0 0 10px #00F5FF, 0 0 20px #00F5FF',
        }}
      />
    </>
  )
}
