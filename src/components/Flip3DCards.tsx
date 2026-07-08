'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

interface CardData {
  id: number
  title: string
  description: string
  frontImage: string
  backContent: string
  color?: string
}

interface Flip3DCardsProps {
  cards: CardData[]
  className?: string
}

export default function Flip3DCards({ cards, className = '' }: Flip3DCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (!containerRef.current) return

    gsap.registerPlugin(ScrollTrigger)

    const totalScrollHeight = window.innerHeight * 3
    const positions = [14, 38, 62, 86]
    const rotations = [-15, -7.5, 7.5, 15]

    // Pin cards section
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: () => `+=${totalScrollHeight}`,
      pin: true,
      pinSpacing: true,
    })

    // Spread cards animation
    cardsRef.current.forEach((card, index) => {
      if (!card) return

      gsap.to(card, {
        left: `${positions[index]}%`,
        rotation: `${rotations[index]}`,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: () => `+=${window.innerHeight}`,
          scrub: 0.5,
          id: `spread-${index}`,
        },
      })
    })

    // Rotate and flip cards with staggered effect
    cardsRef.current.forEach((card, index) => {
      if (!card) return

      const frontEl = card.querySelector('.flip-card-front') as HTMLElement
      const backEl = card.querySelector('.flip-card-back') as HTMLElement

      const staggerOffset = index * 0.05
      const startOffset = 1 / 3 + staggerOffset
      const endOffset = 2 / 3 + staggerOffset

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: () => `+=${totalScrollHeight}`,
        scrub: 1,
        id: `rotate-flip-${index}`,
        onUpdate: (self) => {
          const progress = self.progress
          if (progress >= startOffset && progress <= endOffset) {
            const animationProgress = (progress - startOffset) / (1 / 3)
            const frontRotation = -180 * animationProgress
            const backRotation = 180 - 180 * animationProgress
            const cardRotation = rotations[index] * (1 - animationProgress)

            if (frontEl && backEl) {
              frontEl.style.transform = `rotateY(${frontRotation}deg)`
              backEl.style.transform = `rotateY(${backRotation}deg)`
              card.style.transform = `translate(-50%, -50%) rotate(${cardRotation}deg)`
            }
          }
        },
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div ref={containerRef} className={`flip-3d-cards ${className}`}>
      {cards.map((card, index) => (
        <div
          key={card.id}
          className="flip-card"
          ref={(el) => {
            if (el) cardsRef.current[index] = el
          }}
        >
          <div className="flip-card-wrapper">
            <div className="flip-card-inner">
              {/* Front Side */}
              <div className="flip-card-front">
                <img
                  src={card.frontImage}
                  alt={card.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/hero-main.jpg'; // fallback image
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white text-2xl font-bold mb-2">{card.title}</h3>
                  <p className="text-white/80 text-sm">{card.description}</p>
                </div>
              </div>

              {/* Back Side */}
              <div className="flip-card-back" style={{ backgroundColor: card.color || '#000' }}>
                <div className="p-6 h-full flex flex-col justify-center items-center text-center">
                  <div className="text-white">
                    {card.backContent}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
