import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

// Dummy posts data
const dummyPosts = [
  {
    id: 1,
    date: 'March 10, 2026',
    headline: 'Anthropic Announces Claude 4 with 2M Token Context Window',
    summary: [
      'Claude 4 introduces massive context handling for entire codebases and documents',
      'New reasoning mode outperforms GPT-5 on complex coding benchmarks',
      'Available now for all Claude Pro subscribers at no additional cost'
    ],
    slug: 'claude-4-announcement'
  },
  {
    id: 2,
    date: 'March 9, 2026',
    headline: 'OpenAI Releases Sora Public Beta for Video Generation',
    summary: [
      'Text-to-video generation now available for ChatGPT Plus users',
      'Supports 1080p output up to 60 seconds with cinematic controls',
      'Direct competitor to Runway and Pika Labs enters public market'
    ],
    slug: 'sora-public-beta'
  },
  {
    id: 3,
    date: 'March 8, 2026',
    headline: 'GitHub Copilot X Adds Agent Mode for Autonomous Coding',
    summary: [
      'New agent mode can write, test, and debug code without human intervention',
      'Integrates directly with VS Code terminal and file system',
      'Available in preview for GitHub Copilot Pro+ subscribers'
    ],
    slug: 'github-copilot-agent-mode'
  }
]

// AI Happening Daily Blog Page
// Force rebuild: timestamp 1773108480
export const metadata = {
  title: 'AI Happening | Daily AI News & Updates',
  description: 'Your daily dose of AI news, tools, and updates. One curated story per day to keep you informed.',
}

export default function AIHappeningPage() {
  return (
    <div className="min-h-screen bg-warm-beige">
      <Header />
      
      {/* Hero Section */}
      <section className="section-padding pt-24 md:pt-32">
        <div className="container-width text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-deep-charcoal/5 text-sm text-warm-gray mb-4">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
              Daily AI Updates
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-deep-charcoal leading-tight">
              AI <span className="italic font-serif">Happening</span>
            </h1>
            <p className="text-lg md:text-xl text-warm-gray max-w-2xl mx-auto leading-relaxed">
              One story per day. Curated AI news, tools, and updates that actually matter.
            </p>
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="section-padding !py-8 bg-soft-cream/50">
        <div className="container-width">
          <div className="max-w-xl mx-auto">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-subtle-border/60">
              <h2 className="text-2xl font-bold text-deep-charcoal mb-2 text-center">
                Subscribe to the Daily Vibe
              </h2>
              <p className="text-warm-gray text-center mb-6">
                Get one AI update delivered to your inbox every morning.
              </p>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-lg border border-subtle-border/60 bg-white text-deep-charcoal placeholder-warm-gray/50 focus:outline-none focus:ring-2 focus:ring-deep-charcoal/20 focus:border-deep-charcoal/30 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full btn-primary"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-xs text-warm-gray text-center mt-4">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feed Section */}
      <section className="section-padding">
        <div className="container-width">
          <div className="max-w-3xl mx-auto space-y-8">
            {dummyPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-xl p-8 shadow-sm border border-subtle-border/60 hover:shadow-md hover:border-subtle-border transition-all duration-300"
              >
                <div className="space-y-4">
                  {/* Date */}
                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-4 h-4 text-warm-gray"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <time className="text-sm text-warm-gray">{post.date}</time>
                  </div>

                  {/* Headline */}
                  <h3 className="text-xl md:text-2xl font-bold text-deep-charcoal leading-tight">
                    {post.headline}
                  </h3>

                  {/* Summary */}
                  <ul className="space-y-2">
                    {post.summary.map((point, index) => (
                      <li
                        key={index}
                        className="flex items-start text-warm-gray"
                      >
                        <span className="w-1.5 h-1.5 bg-deep-charcoal/40 rounded-full mt-2 mr-3 flex-shrink-0" />
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Read More Link */}
                  <div className="pt-4 border-t border-subtle-border/40">
                    <Link
                      href={`/ai-happening/${post.slug}`}
                      className="inline-flex items-center text-sm font-medium text-deep-charcoal hover:text-deep-charcoal/80 transition-colors group"
                    >
                      Read More
                      <svg
                        className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Load More Placeholder */}
          <div className="text-center mt-12">
            <button className="btn-outline">
              Load More Updates
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
