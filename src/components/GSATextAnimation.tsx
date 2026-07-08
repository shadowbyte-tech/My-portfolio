'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

interface GSATextAnimationProps {
  children: React.ReactNode
  keywords?: string[]
  className?: string
  highlightColor?: string
}

export default function GSATextAnimation({ 
  children, 
  keywords = [], 
  className = '',
  highlightColor = '60, 60, 60'
}: GSATextAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    gsap.registerPlugin(ScrollTrigger)

    const container = containerRef.current
    const paragraphs = container.querySelectorAll('p')

    // Process text into words with keyword highlighting
    paragraphs.forEach(paragraph => {
      const text = paragraph.textContent
      if (!text) return

      // Split by spaces but preserve the spaces in between
      const words = text.match(/(\S+\s*)/g) || []
      paragraph.innerHTML = ''

      words.forEach(word => {
        if (word.trim()) {
          const wordContainer = document.createElement('div')
          wordContainer.className = 'gsap-word'

          const wordText = document.createElement('span')
          wordText.textContent = word.trim()

          const normalizedWord = word.toLowerCase().replace(/[.,!?;:"]/g, '').trim()
          if (keywords.includes(normalizedWord)) {
            wordContainer.classList.add('keyword-wrapper')
            wordText.classList.add('keyword', normalizedWord)
          }

          wordContainer.appendChild(wordText)
          paragraph.appendChild(wordContainer)
        }
      })
    })

    // Create ScrollTrigger animation
    ScrollTrigger.create({
      trigger: container,
      start: 'top 80%',
      end: 'bottom 20%',
      onUpdate: (self) => {
        const progress = self.progress
        const words = Array.from(container.querySelectorAll('.gsap-word'))
        const totalWords = words.length

        words.forEach((word, index) => {
          const wordText = word.querySelector('span')

          if (progress <= 0.7) {
            const revealProgress = progress / 0.7
            const overlapWords = 15
            const wordStart = index / totalWords
            const wordEnd = wordStart + overlapWords / totalWords

            const wordProgress = revealProgress <= wordStart
              ? 0
              : revealProgress >= wordEnd
                ? 1
                : (revealProgress - wordStart) / (wordEnd - wordStart)

            ;(word as HTMLElement).style.opacity = wordProgress.toString()

            const bgOpacity = wordProgress >= 0.9 ? 1 - (wordProgress - 0.9) / 0.1 : 1
            ;(word as HTMLElement).style.backgroundColor = `rgba(${highlightColor}, ${bgOpacity})`

            const textProgress = wordProgress >= 0.7 ? ((wordProgress - 0.7) / 0.3) : wordProgress
            if (wordText) (wordText as HTMLElement).style.opacity = textProgress.toString()
          } else {
            const reverseProgress = (progress - 0.7) / 0.3
            const reverseOverlap = 5
            const wordStart = index / totalWords
            const wordEnd = wordStart + reverseOverlap / totalWords

            const wordProgress = reverseProgress <= wordStart
              ? 0
              : reverseProgress >= wordEnd
                ? 1
                : (reverseProgress - wordStart) / (wordEnd - wordStart)

            if (wordText) (wordText as HTMLElement).style.opacity = (1 - wordProgress).toString()
            ;(word as HTMLElement).style.backgroundColor = `rgba(${highlightColor}, ${wordProgress})`
          }
        })
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [keywords, highlightColor])

  return (
    <div ref={containerRef} className={`gsap-text-animation ${className}`}>
      {children}
    </div>
  )
}
