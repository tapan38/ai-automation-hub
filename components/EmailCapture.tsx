'use client'
// Cache bust: March 10, 2025

import MorphingSubscribe from './MorphingSubscribe'

interface EmailCaptureProps {
  variant?: 'light' | 'dark'
}

export default function EmailCapture({ variant = 'light' }: EmailCaptureProps) {
  return (
    <div className="max-w-md mx-auto">
      <div className={`${variant === 'dark' ? 'text-center' : ''}`}>
        <MorphingSubscribe 
          variant={variant} 
          defaultText="Get Free Guide" 
        />
      </div>
      <p className={`text-xs mt-3 ${variant === 'dark' ? 'text-white/50' : 'text-warm-gray'}`}>
        Free automation templates and guides. No spam.
      </p>
    </div>
  )
}
