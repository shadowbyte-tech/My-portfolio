'use client'

import React from 'react'

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-[#050816]">
      {/* GLOWING ORBS / ACCENT BLOBS */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Blob 1: Cyan (Top Left) */}
        <div 
          className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-[#00F5FF] blur-[150px] opacity-[0.15] animate-blob-drift-1" 
        />

        {/* Blob 2: Purple (Top Right) */}
        <div 
          className="absolute top-[10%] right-[-10%] w-[45vw] h-[45vw] max-w-[550px] max-h-[550px] rounded-full bg-[#7C3AED] blur-[160px] opacity-[0.2] animate-blob-drift-2" 
        />

        {/* Blob 3: Purple (Bottom Left) */}
        <div 
          className="absolute bottom-[-10%] left-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-[#7C3AED] blur-[150px] opacity-[0.15] animate-blob-drift-3" 
        />

        {/* Blob 4: Cyan (Bottom Right) */}
        <div 
          className="absolute bottom-[10%] right-[-10%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-[#00F5FF] blur-[140px] opacity-[0.12] animate-blob-drift-4" 
        />
      </div>

      {/* FAINT GRID PATTERN */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px]" 
        style={{
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 95%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 95%)'
        }}
      />

      {/* NOISE OVERLAY */}
      <div className="noise-overlay" />

      {/* STYLE TAG FOR CUSTOM ANIMATIONS */}
      <style>{`
        @keyframes blobDrift1 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, 50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
        }
        @keyframes blobDrift2 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(-40px, -30px) scale(1.05); }
        }
        @keyframes blobDrift3 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          40% { transform: translate(30px, -40px) scale(0.9); }
        }
        @keyframes blobDrift4 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          60% { transform: translate(-30px, 30px) scale(1.1); }
        }
        .animate-blob-drift-1 { animation: blobDrift1 25s infinite ease-in-out; }
        .animate-blob-drift-2 { animation: blobDrift2 22s infinite ease-in-out; }
        .animate-blob-drift-3 { animation: blobDrift3 28s infinite ease-in-out; }
        .animate-blob-drift-4 { animation: blobDrift4 20s infinite ease-in-out; }
      `}</style>
    </div>
  )
}

export default AnimatedBackground

