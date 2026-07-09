'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { Mail, User, MessageSquare, Send, CheckCircle } from 'lucide-react'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

export default function AdvancedContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters'
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    } else if (formData.message.trim().length > 1000) {
      newErrors.message = 'Message must be less than 1000 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)

    try {

      const formspreeId = (typeof process !== 'undefined' && (process.env.NEXT_PUBLIC_FORMSPREE_ID || process.env.VITE_FORMSPREE_ID)) || '';
      const web3formsKey = (typeof process !== 'undefined' && (process.env.NEXT_PUBLIC_WEB3FORMS_KEY || process.env.VITE_WEB3FORMS_KEY)) || '';



      if (formspreeId) {
        const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        if (!response.ok) {
          throw new Error('Formspree submission failed');
        }
      } else if (web3formsKey) {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            access_key: web3formsKey,
            ...formData
          })
        });
        if (!response.ok) {
          throw new Error('Web3Forms submission failed');
        }
      } else {
        // Fallback/Mock Mode for seamless local testing and initial deployments
        console.warn(
          'Contact form submitted in MOCK mode. To receive real emails, set VITE_FORMSPREE_ID or VITE_WEB3FORMS_KEY in your .env file.'
        );
        await new Promise(resolve => setTimeout(resolve, 1200));
      }

      setIsSubmitted(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
      setErrors({})
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000)
    } catch (error) {
      console.error('Submission error:', error)
      setErrors({ message: 'Submission failed. Please try again later.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const inputFields = [
    {
      name: 'name' as keyof FormData,
      label: 'Name',
      type: 'text',
      icon: User,
      placeholder: 'John Doe',
      validation: errors.name
    },
    {
      name: 'email' as keyof FormData,
      label: 'Email',
      type: 'email',
      icon: Mail,
      placeholder: 'john@example.com',
      validation: errors.email
    },
    {
      name: 'subject' as keyof FormData,
      label: 'Subject',
      type: 'text',
      icon: MessageSquare,
      placeholder: 'Project Inquiry',
      validation: errors.subject
    }
  ]

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
        <p className="text-zinc-400">Thank you for reaching out. I'll get back to you soon.</p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {inputFields.map((field, index) => (
        <motion.div
          key={field.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <label htmlFor={field.name} className="block text-sm font-medium text-zinc-300 mb-2">
            {field.label}
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-500">
              <field.icon size={20} />
            </div>
            <input
              id={field.name}
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              onFocus={() => setFocusedField(field.name)}
              onBlur={() => setFocusedField(null)}
              placeholder={field.placeholder}
              autoComplete={field.name === 'email' ? 'email' : field.name === 'name' ? 'name' : 'subject'}
              aria-required="true"
              aria-invalid={field.validation ? 'true' : undefined}
              aria-describedby={field.validation ? `${field.name}-error` : undefined}
              className={`w-full pl-12 pr-4 py-3 rounded-xl border transition-all duration-300 bg-zinc-900/50 backdrop-blur-md ${
                focusedField === field.name
                  ? 'border-amber-400/50 bg-zinc-900/70'
                  : field.validation
                  ? 'border-red-400/50 bg-red-900/10'
                  : 'border-white/10 hover:border-white/20'
              } text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-400/20`}
            />
            {field.validation && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1 text-xs text-red-400"
                id={`${field.name}-error`}
                role="alert"
              >
                {field.validation}
              </motion.p>
            )}
          </div>
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <label htmlFor="message" className="block text-sm font-medium text-zinc-300 mb-2">
          Message
        </label>
        <div className="relative">
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            onFocus={() => setFocusedField('message')}
            onBlur={() => setFocusedField(null)}
            placeholder="Tell me about your project..."
            rows={6}
            autoComplete="off"
            aria-required="true"
            aria-invalid={errors.message ? 'true' : undefined}
            aria-describedby={errors.message ? 'message-error' : undefined}
            className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 bg-zinc-900/50 backdrop-blur-md resize-none ${
              focusedField === 'message'
                ? 'border-amber-400/50 bg-zinc-900/70'
                : errors.message
                ? 'border-red-400/50 bg-red-900/10'
                : 'border-white/10 hover:border-white/20'
            } text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-400/20`}
          />
          <div className="absolute bottom-3 right-3 text-xs text-zinc-500">
            {formData.message.length}/1000
          </div>
          {errors.message && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-xs text-red-400"
              id="message-error"
              role="alert"
            >
              {errors.message}
            </motion.p>
          )}
        </div>
      </motion.div>

      <button
  type="submit"
  disabled={isSubmitting}
  className="w-full py-4 px-6 bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold rounded-xl hover:from-amber-500 hover:to-amber-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
>
  {isSubmitting ? (
    <>
      <div className="w-5 h-5 border-2 border-black/30 border-t-amber-400 rounded-full animate-spin" />
      Opening Gmail...
    </>
  ) : (
    <>
      <Send className="w-5 h-5" />
      Open in Gmail
    </>
  )}
</button>
</form>
)
}
