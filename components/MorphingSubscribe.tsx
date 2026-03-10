'use client'

import { useState } from 'react'

interface MorphingSubscribeProps {
  variant?: 'light' | 'dark' | 'primary'
  defaultText?: string
}

export default function MorphingSubscribe({ 
  variant = 'primary',
  defaultText = 'Subscribe'
}: MorphingSubscribeProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || isSubmitting) return

    setIsSubmitting(true)

    const now = new Date()
    const date = now.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short', 
      year: 'numeric'
    })

    try {
      // SheetDB expects array format with EXACT column names from sheet
      // Column header is "Email Id" not "Email"
      const response = await fetch('https://sheetdb.io/api/v1/yi7a1u6kqnbw4', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([
          {
            "Email Id": email,
            Date: date
          }
        ])
      })

      if (response.ok) {
        // Redirect on success
        window.location.href = 'https://curioustapan.gumroad.com/'
      } else {
        setIsSubmitting(false)
        alert('Failed to subscribe. Please try again.')
      }
    } catch (error) {
      setIsSubmitting(false)
      alert('Network error. Please try again.')
    }
  }

  // Visual styles: adaptive to background
  const buttonClasses = {
    // White bg -> Bold black button
    light: 'bg-[#1A1A1A] text-white hover:bg-black shadow-lg shadow-black/25 border-2 border-[#1A1A1A]',
    // Dark bg -> Clean white button
    dark: 'bg-white text-[#1A1A1A] hover:bg-gray-50 shadow-lg shadow-white/20 border-2 border-white',
    // Default -> Bold black
    primary: 'bg-[#1A1A1A] text-white hover:bg-black shadow-lg shadow-black/25 border-2 border-[#1A1A1A]'
  }

  if (isExpanded) {
    return (
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            disabled={isSubmitting}
            className="px-4 py-3 pr-12 rounded-lg border-2 border-[#1A1A1A] bg-white text-[#1A1A1A] placeholder-[#8B8680] focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/20 w-64 font-medium"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-[#1A1A1A] hover:text-[#1A1A1A]/80 disabled:opacity-50"
          >
            {isSubmitting ? (
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            )}
          </button>
        </div>
      </form>
    )
  }

  return (
    <button
      onClick={() => setIsExpanded(true)}
      className={`inline-flex items-center justify-center px-8 py-4 rounded-lg font-bold text-lg tracking-wide transition-all transform hover:scale-105 active:scale-95 ${buttonClasses[variant]}`}
    >
      {defaultText}
      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </button>
  )
}
