'use client'

interface EmailCaptureProps {
  variant?: 'light' | 'dark'
}

export default function EmailCapture({ variant = 'light' }: EmailCaptureProps) {
  const buttonBaseClasses = variant === 'dark'
    ? 'bg-white text-deep-charcoal hover:bg-white/90'
    : 'bg-deep-charcoal text-white hover:bg-opacity-90'

  return (
    <div className="max-w-md mx-auto">
      <button
        className={`inline-flex items-center justify-center w-full px-6 py-3 rounded-lg font-medium transition-all ${buttonBaseClasses}`}
        onClick={() => {}}
      >
        Get Free Guide
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>
      <p className={`text-xs mt-3 ${variant === 'dark' ? 'text-white/50' : 'text-warm-gray'}`}>
        Free automation templates and guides. No spam.
      </p>
    </div>
  )
}
