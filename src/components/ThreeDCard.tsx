'use client'

import React, { useRef, useState } from 'react'

export default function ThreeDCard() {
  const [hovered, setHovered] = useState(false)

  return (
    <div className="w-full h-96 md:h-[500px] relative flex items-center justify-center">
      <div 
        className="relative transition-all duration-500 ease-out"
        style={{
          transform: hovered ? 'scale(1.1) rotateY(10deg)' : 'scale(1) rotateY(0deg)',
          transformStyle: 'preserve-3d',
          perspective: '1000px'
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="relative w-64 h-80 md:w-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
          <img
            src="/identity-bw.jpg"
            alt="Sukka Manikanta Goud"
            className="w-full h-full object-cover transition-all duration-500"
            style={{
              filter: hovered ? 'grayscale(0%) brightness(1.1)' : 'grayscale(50%) brightness(0.8)',
            }}
          />
          
          {/* Overlay with text */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          
          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-white text-2xl md:text-3xl font-bold mb-2">
              Sukka Manikanta Goud
            </h3>
            <p className="text-white/80 text-sm md:text-base">
              Frontend Developer & AI Builder
            </p>
          </div>

          {/* Hover glow effect */}
          <div 
            className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500"
            style={{
              background: hovered 
                ? 'radial-gradient(circle at center, rgba(251, 191, 36, 0.3) 0%, transparent 70%)'
                : 'transparent',
              opacity: hovered ? 1 : 0
            }}
          />
        </div>
      </div>
      
      <div className="absolute bottom-4 left-4 text-xs text-zinc-500 font-mono bg-black/50 px-2 py-1 rounded">
        Interactive Card • Hover to see effect
      </div>
    </div>
  )
}
