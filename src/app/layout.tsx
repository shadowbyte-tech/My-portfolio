import '../index.css'
import React from 'react'
import Navbar from '../components/Navbar'
import ScrollProgress from '../components/ScrollProgress'
import MouseSpotlight from '../components/MouseSpotlight'
import AIChatWidget from '../components/AIChatWidget'
import EasterEggs from '../components/EasterEggs'
import AnimatedBackground from '../components/AnimatedBackground'
import { ThemeProvider } from '../lib/theme'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sukka Manikanta Goud | Premium Founder Portfolio',
  description: 'AI Automation Engineer, Cybersecurity Student & Founder of Shadow AI building intelligent agent systems and modern full-stack web experiences.',
  openGraph: {
    title: 'Sukka Manikanta Goud | Premium Founder Portfolio',
    description: 'AI Automation Engineer, Cybersecurity Student & Founder of Shadow AI building intelligent agent systems and modern full-stack web experiences.',
    type: 'website',
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#050816] text-zinc-300 font-sans antialiased overflow-x-hidden selection:bg-[#00F5FF]/20 selection:text-[#00F5FF]">
        <ThemeProvider>
          <ScrollProgress />
          <MouseSpotlight />
          <AnimatedBackground />
          <Navbar />
          <EasterEggs />
          
          <main className="min-h-screen pt-32 pb-16 relative z-10">
            {children}
          </main>

          <AIChatWidget />
        </ThemeProvider>
      </body>
    </html>
  )
}
