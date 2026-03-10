'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-warm-beige/80 backdrop-blur-md border-b border-subtle-border/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-deep-charcoal tracking-tight">
            AI Knowledge Hub
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#toolbox" className="text-sm text-warm-gray hover:text-deep-charcoal transition-colors">
              Toolbox
            </Link>
            <Link href="#playbook" className="text-sm text-warm-gray hover:text-deep-charcoal transition-colors">
              Playbook
            </Link>
            <Link href="/ai-happening" className="text-sm text-warm-gray hover:text-deep-charcoal transition-colors">
              AI Happening
            </Link>
          </nav>

          {/* CTA Button - Fixed link */}
          <div className="hidden md:block">
            <a
              href="https://curioustapan.gumroad.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm"
            >
              Subscribe
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-subtle-border/30">
            <nav className="flex flex-col space-y-4">
              <Link
                href="#toolbox"
                className="text-sm text-warm-gray hover:text-deep-charcoal"
                onClick={() => setIsMenuOpen(false)}
              >
                Toolbox
              </Link>
              <Link
                href="#playbook"
                className="text-sm text-warm-gray hover:text-deep-charcoal"
                onClick={() => setIsMenuOpen(false)}
              >
                Playbook
              </Link>
              <Link
                href="/ai-happening"
                className="text-sm text-warm-gray hover:text-deep-charcoal"
                onClick={() => setIsMenuOpen(false)}
              >
                AI Happening
              </Link>
              <a
                href="https://curioustapan.gumroad.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Subscribe
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
