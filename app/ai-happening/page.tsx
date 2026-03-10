import Link from 'next/link'

export const dynamic = 'force-static'
export const revalidate = false

export const metadata = {
  title: 'AI Happening | Daily AI News & Updates',
  description: 'Your daily dose of AI news, tools, and updates. One curated story per day.',
}

const dummyPosts = [
  {
    id: 1,
    date: 'March 10, 2026',
    headline: 'Anthropic Announces Claude 4 with 2M Token Context Window',
    summary: [
      'Claude 4 introduces massive context handling for entire codebases and documents',
      'New reasoning mode outperforms GPT-5 on complex coding benchmarks',
      'Available now for all Claude Pro subscribers'
    ]
  },
  {
    id: 2,
    date: 'March 9, 2026',
    headline: 'OpenAI Releases Sora Public Beta',
    summary: [
      'Text-to-video generation now available for ChatGPT Plus users',
      'Supports 1080p output up to 60 seconds with cinematic controls',
      'Direct competitor to Runway and Pika Labs enters market'
    ]
  },
  {
    id: 3,
    date: 'March 8, 2026',
    headline: 'GitHub Copilot X Adds Agent Mode',
    summary: [
      'New agent mode can write, test, and debug code autonomously',
      'Integrates directly with VS Code terminal and file system',
      'Available in preview for GitHub Copilot Pro+ subscribers'
    ]
  }
]

export default function AIHappeningPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Simple Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#FDFBF7]/80 backdrop-blur-md border-b border-[#E8E4DE]/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-[#1A1A1A]">
            AI Knowledge Hub
          </Link>
          <nav className="flex items-center space-x-6 text-sm text-[#8B8680]">
            <Link href="/" className="hover:text-[#1A1A1A]">Home</Link>
            <Link href="/ai-happening" className="text-[#1A1A1A]">AI Happening</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-28 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#1A1A1A]/5 text-sm text-[#8B8680] mb-4">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
            Daily AI Updates
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#1A1A1A] mb-4">
            AI <span className="italic font-serif">Happening</span>
          </h1>
          <p className="text-lg md:text-xl text-[#8B8680] max-w-2xl mx-auto">
            One story per day. Curated AI news, tools, and updates.
          </p>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="py-8 bg-[#FAF8F3]/50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-[#E8E4DE]/60">
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 text-center">
              Subscribe to the Daily Vibe
            </h2>
            <p className="text-[#8B8680] text-center mb-6">
              Get one AI update delivered to your inbox every morning.
            </p>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg border border-[#E8E4DE]/60 bg-white text-[#1A1A1A] placeholder-[#8B8680]/50 focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/20"
              />
              <button type="submit" className="w-full px-6 py-3 bg-[#1A1A1A] text-white rounded-lg font-medium hover:bg-opacity-90 transition-all">
                Subscribe
              </button>
            </form>
            <p className="text-xs text-[#8B8680] text-center mt-4">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>

      {/* Feed Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-8">
          {dummyPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-xl p-8 shadow-sm border border-[#E8E4DE]/60">
              <div className="flex items-center text-sm text-[#8B8680] mb-3">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {post.date}
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">{post.headline}</h3>
              <ul className="space-y-2">
                {post.summary.map((point, i) => (
                  <li key={i} className="flex items-start text-[#8B8680]">
                    <span className="w-1.5 h-1.5 bg-[#1A1A1A]/40 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t border-[#E8E4DE]/40">
                <button className="text-sm font-medium text-[#1A1A1A] hover:text-opacity-80">
                  Read More →
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
