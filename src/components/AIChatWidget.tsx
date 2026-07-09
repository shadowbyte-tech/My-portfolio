'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { MessageSquare, X, Send, User, Bot, Sparkles } from 'lucide-react'
import { playSound } from '../lib/sound'

const SUGGESTED_QUESTIONS = [
  "What are your core skills?",
  "Tell me about ASTrusted consultancy project.",
  "Are you available for internships?",
  "What is Shadow AI?",
  "How can I contact you?"
]

const BOT_DATA = {
  skills: "I specialize in Python, JavaScript, React.js, Tailwind CSS, Node.js, Express.js, MongoDB, and SQL. I also have deep focus in AI Agents, Prompt Engineering, LLM Integration, and Cybersecurity.",
  projects: "My featured projects include:\n1. **AS Trusted Consultancy**: Deployed real-estate platform using React and Tailwind, achieving 98+ Lighthouse speed and 150% client inquiries growth.\n2. **Personal AI Agent System**: A multi-agent autonomous planner built using Python and LangChain, saving ~6 hours/week on developer research.\n3. **Ninjas System UI**: Gaming platform clone demonstrating pixel-perfect layout and Framer Motion elements.",
  experience: "I am a Freelance Web Developer & AI Automation Specialist (2024 - Present), building client sites and automated n8n workflows. I was also a Front-End Development Intern at QSkill / SR India (2026).",
  contact: "You can contact me at sukkamanikantagoud@gmail.com, find me on GitHub at github.com/shadowbyte-tech, or on LinkedIn at linkedin.com/in/sukkamanikantagoud/.",
  shadow_ai: "Shadow AI (and Shadowbyte Tech) is my initiative focused on engineering intelligent multi-agent systems, automation scripts, n8n backend pipelines, and modern full-stack web experiences.",
  availability: "Yes! I am actively open to frontend internships, cybersecurity roles, junior web developer positions, and AI automation contract work."
}

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'bot', text: string }>>([
    { sender: 'bot', text: "Hi! I'm Shadow AI Assistant. Ask me anything about Manikanta's skills, experience, projects, or availability!" }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  const toggleWidget = () => {
    playSound('open')
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const handleSend = (text: string) => {
    if (!text.trim()) return
    playSound('click')
    
    // Add user message
    setMessages(prev => [...prev, { sender: 'user', text }])
    setInputText('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      let reply = "I'm not sure about that. Try asking about Manikanta's skills, projects, experience, contact details, or Shadow AI!"
      const query = text.toLowerCase()

      if (query.includes('skill') || query.includes('technolog') || query.includes('stack')) {
        reply = BOT_DATA.skills
      } else if (query.includes('project') || query.includes('work') || query.includes('trusted') || query.includes('ninjas')) {
        reply = BOT_DATA.projects
      } else if (query.includes('experience') || query.includes('job') || query.includes('intern')) {
        reply = BOT_DATA.experience
      } else if (query.includes('contact') || query.includes('email') || query.includes('phone') || query.includes('reach')) {
        reply = BOT_DATA.contact
      } else if (query.includes('shadow') || query.includes('agency')) {
        reply = BOT_DATA.shadow_ai
      } else if (query.includes('avail') || query.includes('open') || query.includes('hiring') || query.includes('hire')) {
        reply = BOT_DATA.availability
      }

      setMessages(prev => [...prev, { sender: 'bot', text: reply }])
      setIsTyping(false)
    }, 1000)
  }

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      {/* Floating Chat Bubble */}
      <motion.button
        onClick={toggleWidget}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-[#00F5FF] to-[#7C3AED] text-white flex items-center justify-center shadow-lg shadow-[#00F5FF]/20 cursor-pointer relative"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        {!isOpen && (
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-[#050816] rounded-full animate-pulse" />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="absolute bottom-16 right-0 w-[90vw] sm:w-[380px] h-[500px] rounded-3xl glass-card border border-white/10 flex flex-col overflow-hidden shadow-2xl backdrop-blur-xl"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/5 bg-gradient-to-r from-[#00F5FF]/10 to-[#7C3AED]/10 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00F5FF] to-[#7C3AED] flex items-center justify-center">
                  <Sparkles size={16} className="text-white animate-spin-slow" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">Shadow AI Agent</h3>
                  <span className="text-[10px] text-green-400 font-mono">● Online & Ready</span>
                </div>
              </div>
              <button 
                onClick={toggleWidget} 
                className="text-zinc-450 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs scrollbar-none">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.sender === 'bot' && (
                    <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                      <Bot size={13} className="text-[#00F5FF]" />
                    </div>
                  )}
                  <div className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
                    msg.sender === 'user' 
                      ? 'bg-gradient-to-r from-[#00F5FF] to-[#7C3AED] text-white rounded-tr-none' 
                      : 'bg-white/5 border border-white/5 text-zinc-200 rounded-tl-none'
                  }`}>
                    {msg.text.split('\n').map((line, idx) => (
                      <p key={idx} className={idx > 0 ? "mt-1.5" : ""}>{line}</p>
                    ))}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-2 justify-start">
                  <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <Bot size={13} className="text-[#00F5FF]" />
                  </div>
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/5 text-zinc-400 rounded-tl-none flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-[#00F5FF] rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-[#00F5FF] rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-[#00F5FF] rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Suggested Questions */}
            <div className="px-4 py-2 border-t border-white/5 bg-black/20 flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-none">
              {SUGGESTED_QUESTIONS.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(q)}
                  onMouseEnter={() => playSound('hover')}
                  className="px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-[10px] text-[#00F5FF] font-medium hover:bg-[#00F5FF]/10 hover:border-[#00F5FF]/30 transition-colors cursor-pointer"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input Footer */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSend(inputText)
              }}
              className="p-3 border-t border-white/5 bg-black/40 flex gap-2 items-center"
            >
              <input
                type="text"
                placeholder="Ask a question..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#00F5FF]/50"
              />
              <button
                type="submit"
                className="p-2.5 rounded-full bg-gradient-to-r from-[#00F5FF] to-[#7C3AED] text-white cursor-pointer shadow-md shadow-[#00F5FF]/10"
              >
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
