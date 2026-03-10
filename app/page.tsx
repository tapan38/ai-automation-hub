import { getItemsByCategory } from '@/lib/data'
import Card, { CardSkeleton } from '@/components/Card'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import EmailCapture from '@/components/EmailCapture'

export const revalidate = 3600 // Revalidate every hour

export default async function Home() {
  // Fetch data
  const [templates, affiliates] = await Promise.all([
    getItemsByCategory('Template'),
    getItemsByCategory('Affiliate')
  ])

  return (
    <div className="min-h-screen bg-warm-beige">
      <Header />

      {/* Hero Section */}
      <section className="section-padding pt-20 md:pt-28">
        <div className="container-width text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-deep-charcoal/5 text-sm text-warm-gray mb-4">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
              2,000+ automation enthusiasts
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-deep-charcoal leading-tight">
              Outsource Your Brain to{' '}
              <span className="italic font-serif">AI</span>
            </h1>
            <p className="text-lg md:text-xl text-warm-gray max-w-2xl mx-auto leading-relaxed">
              Master workflow automation, n8n templates, and AI agents. Save 10+ hours every week with battle-tested automation templates.
            </p>
            <EmailCapture />
          </div>
        </div>
      </section>

      {/* TOOLBOX SECTION - Templates & Products (Gumroad links) */}
      <section id="toolbox" className="section-padding bg-soft-cream/50">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-deep-charcoal mb-4">Toolbox</h2>
            <p className="text-warm-gray max-w-2xl mx-auto">
             Curated AI tools, software, and affiliate resources I personally use and recommend.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.length > 0 ? (
              templates.map((item) => (
                <Card
                  key={item.id}
                  title={item.title}
                  description={item.description}
                  imageUrl={item.imageUrl}
                  price={item.price}
                  link={item.link}
                  category={item.category}
                />
              ))
            ) : (
              <>
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
              </>
            )}
          </div>
          {templates.length === 0 && (
            <div className="text-center py-12">
              <p className="text-warm-gray">No templates found.</p>
            </div>
          )}
        </div>
      </section>

      {/* PLAYBOOK SECTION - Partner Tools & Resources */}
      <section id="playbook" className="section-padding">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-deep-charcoal mb-4">Playbook</h2>
            <p className="text-warm-gray max-w-2xl mx-auto">
            Ready-to-use automation templates, Notion systems, and AI apps to supercharge your productivity.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {affiliates.length > 0 ? (
              affiliates.map((item) => (
                <Card
                  key={item.id}
                  title={item.title}
                  description={item.description}
                  imageUrl={item.imageUrl}
                  price={item.price}
                  link={item.link}
                  category={item.category}
                />
              ))
            ) : (
              <>
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
              </>
            )}
          </div>
          {affiliates.length === 0 && (
            <div className="text-center py-12">
              <p className="text-warm-gray">No partner tools found.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-padding bg-deep-charcoal text-white">
        <div className="container-width text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join 2,000+ Automation Enthusiasts</h2>
          <p className="text-white/70 max-w-xl mx-auto mb-8">
            Get weekly guides on AI automation, n8n workflows, and productivity hacks. No spam. Unsubscribe anytime.
          </p>
          <EmailCapture variant="dark" />
        </div>
      </section>

      <Footer />
    </div>
  )
}
// Deploy check: Tue Mar 10 18:33:48 UTC 2026
