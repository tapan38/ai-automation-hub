'use client'

import { useState } from 'react'

interface EmailCaptureProps {
  variant?: 'light' | 'dark'
}

export default function EmailCapture({ variant = 'light' }: EmailCaptureProps) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setLoading(true)
    
    // TODO: Integrate with your email provider (Mailchimp, ConvertKit, etc.)
    // For now, just simulate submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className={`text-center p-6 rounded-lg ${
        variant === 'dark' ? 'bg-white/10' : 'bg-green-50'
      }`}>
        <svg className="w-8 h-8 mx-auto mb-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
     </svg>
     <p className={variant === 'dark' ? 'text-white' : 'text-deep-charcoal'}>
   Check your inbox! We just sent you the Free API Tricks guide.
        </p>
      </div>
    )
  }

  return (
    <form id="subscribe" onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
      <input
   type="email"
          placeholder="Enter your email"
          value={email}
        onChange={(e) => setEmail(e.target.value)}
          required
          className={`flex-1 px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 ${
            variant === 'dark' 
              ? 'bg-white/10 border-white/20 text-white placeholder-white/50 focus:ring-white/30'
     : 'bg-white border-subtle-border text-deep-charcoal placeholder-warm-gray focus:ring-deep-charcoal/20'
          }`}
        />
    <button
          type="submit"
          disabled={loading}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
      variant === 'dark'
        ? 'bg-white text-deep-charcoal hover:bg-white/90 disabled:bg-white/50'
              : 'bg-deep-charcoal text-white hover:bg-deep-charcoal/90 disabled:bg-deep-charcoal/50'
    } ${loading ? 'cursor-not-allowed' : ''}`}
        >
   {loading ? 'Subscribing...' : 'Get Free Guide'}
        </button>
      </div>
      <p className={`text-xs mt-3 ${
        variant === 'dark' ? 'text-white/50' : 'text-warm-gray'
      }`}>
        Free "API Tricks" guide + weekly automation tips. No spam. Unsubscribe anytime.
      </p>
    </form>
  )
}
