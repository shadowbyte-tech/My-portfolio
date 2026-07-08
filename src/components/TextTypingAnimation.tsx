'use client'

import { useState, useEffect } from 'react'
import { motion } from 'motion/react'

interface TextTypingAnimationProps {
  texts: string[]
  className?: string
  speed?: number
  deleteSpeed?: number
  pauseTime?: number
}

export default function TextTypingAnimation({
  texts,
  className = '',
  speed = 100,
  deleteSpeed = 50,
  pauseTime = 2000
}: TextTypingAnimationProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const currentFullText = texts[currentTextIndex]
    
    const handleTyping = () => {
      if (isPaused) {
        setIsPaused(false)
        setIsDeleting(true)
        return
      }

      if (isDeleting) {
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1))
        } else {
          setIsDeleting(false)
          setCurrentTextIndex((prev) => (prev + 1) % texts.length)
        }
      } else {
        if (currentText.length < currentFullText.length) {
          setCurrentText(currentFullText.slice(0, currentText.length + 1))
        } else {
          setIsPaused(true)
        }
      }
    }

    const timer = setTimeout(
      handleTyping,
      isPaused ? pauseTime : isDeleting ? deleteSpeed : speed
    )

    return () => clearTimeout(timer)
  }, [currentText, isDeleting, isPaused, currentTextIndex, texts, speed, deleteSpeed, pauseTime])

  return (
    <div className={`inline-block ${className}`}>
      <span className="relative">
        {currentText}
        <motion.span
          className="inline-block w-0.5 h-full bg-amber-400 ml-1"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </span>
    </div>
  )
}

// Skills typing component
export function SkillsTyping() {
  const skills = [
    'React.js Developer',
    'TypeScript Expert', 
    'UI/UX Designer',
    'AI Builder',
    'Cyber Security Student',
    'Prompt Engineer'
  ]

  return (
    <div className="text-2xl md:text-4xl font-bold text-zinc-100">
      I'm a{' '}
      <TextTypingAnimation
        texts={skills}
        className="text-amber-400"
        speed={80}
        deleteSpeed={40}
        pauseTime={1500}
      />
    </div>
  )
}
