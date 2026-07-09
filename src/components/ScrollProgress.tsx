'use client'

import React from 'react'
import { motion, useScroll, useSpring } from 'motion/react'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#00F5FF] to-[#7C3AED] z-[9999] origin-left shadow-[0_0_8px_#00F5FF]"
      style={{ scaleX }}
    />
  )
}
