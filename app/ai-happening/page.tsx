import Link from 'next/link'

export const metadata = {
  title: 'AI Happening | Daily AI News & Updates',
  description: 'Your daily dose of AI news, tools, and updates. One curated story per day.',
}

// Fetch data from SheetDB with ISR caching (24 hours)
// Updated: March 10, 2025 - Cache bust
async function getPosts() {
  try {
    const response = await fetch('https://sheetdb.io/api/v1/kc24mhd5f6de3', {
      next: { revalidate: 86400 } // Cache for 24 hours
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }
    
    const data = await response.json()
    return data || []
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

// Type for SheetDB response
interface Post {
  Date: string
  Headline?: string
  headline?: string
  Summary?: string
  summary?: string
  Link?: string
  link?: string
}

export default async function AIHappeningPage() {
  const posts: Post[] = await getPosts()

  // Parse summary into bullet points (split by newlines, periods, or handle as array)
  const parseSummary = (summary: string): string[] => {
    if (!summary) return []
    // Try splitting by newlines first, then by periods, or return as single item
    const byNewlines = summary.split('\n').filter(s => s.trim())
    if (byNewlines.length > 1) return byNewlines
    
    const byPeriods = summary.split('.').filter(s => s.trim()).map(s => s.trim() + '.')
    if (byPeriods.length > 1) return byPeriods.slice(0, 3) // Max 3 bullets
    
    return [summary]
  }

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

      {/* Subscribe Section - Static Button (Server Component compatible) */}
      <section className="py-8 bg-[#FAF8F3]/50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-[#E8E4DE]/60 text-center">
            <div className="px-8 py-3 bg-[#1A1A1A] text-white rounded-lg font-medium inline-block">
              Subscribe to the Daily Vibe
            </div>
          </div>
        </div>
      </section>

      {/* Feed Section - Live Data */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {posts.length === 0 ? (
            // Fallback for empty API
            <div className="text-center py-16">
              <p className="text-lg text-[#8B8680]">
                Check back tomorrow for the latest AI news.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {posts.map((post, index) => (
                <article
                  key={index}
                  className="bg-white rounded-xl p-8 shadow-sm border border-[#E8E4DE]/60 hover:shadow-md hover:border-subtle-border transition-all duration-300"
                >
                  {/* Date */}
                  <div className="flex items-center text-sm text-[#8B8680] mb-3">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {post.Date}
                  </div>

                  {/* Headline */}
                  <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">
                    {post.Headline || post.headline}
                  </h3>

                  {/* Summary */}
                  <ul className="space-y-2">
                    {parseSummary(post.Summary || post.summary || '').map((point, i) => (
                      <li key={i} className="flex items-start text-[#8B8680]">
                        <span className="w-1.5 h-1.5 bg-[#1A1A1A]/40 rounded-full mt-2 mr-3 flex-shrink-0" />
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Read More Link */}
                  {(post.Link || post.link) && (
                    <div className="mt-4 pt-4 border-t border-[#E8E4DE]/40">
                      <a
                        href={post.Link || post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-medium text-[#1A1A1A] hover:text-opacity-80 transition-colors group"
                      >
                        Read More
                        <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </a>
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
