import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import PostHogProvider from '@/components/PostHogProvider'
import PostHogPageView from '@/components/PostHogPageView'

const inter = Inter({ subsets: ['latin'] })

// SEO Keywords from research
const SEO_KEYWORDS = [
  'workflow automation',
  'AI automation',
  'automation templates',
  'n8n workflows',
  'AI agent',
  'no-code automation',
  'business automation',
  'process automation',
  'Zapier alternative',
  'productivity automation',
  'AI integration',
  'workflow builder',
  'automation tools',
  'AI-powered workflows',
  'task automation'
]

export const metadata: Metadata = {
  title: 'AI Knowledge & Automation Hub | Outsource Your Brain to AI',
  description: 'Master AI automation with free templates, n8n workflows, and productivity tools. Learn workflow automation, no-code automation, and AI integration to save hours every day.',
  keywords: SEO_KEYWORDS.join(', '),
  authors: [{ name: 'Tapan' }],
  openGraph: {
    title: 'AI Knowledge & Automation Hub | Outsource Your Brain to AI',
    description: 'Master AI automation with free templates, n8n workflows, and productivity tools. Save hours every day.',
    siteName: 'AI Automation Hub',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Knowledge & Automation Hub',
    description: 'Master AI automation with free templates and workflows.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Gumroad Overlay Script */}
        <script src="https://gumroad.com/js/gumroad.js" async></script>
        <script src="https://gumroad.com/js/gumroad-embed.js" async></script>
      </head>
      <body className={`${inter.className} antialiased`}>
        <PostHogProvider>
          <PostHogPageView />
          {children}
        </PostHogProvider>
      </body>
    </html>
  )
}
