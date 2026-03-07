import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'About | AI Knowledge Hub',
  description: 'Learn about AI Knowledge Hub - your source for AI automation templates, n8n workflows, and productivity tools.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-warm-beige">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="section-padding bg-deep-charcoal text-white">
          <div className="container-width text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About AI Knowledge Hub
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Empowering creators to automate their workflows and reclaim their time using AI.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="section-padding">
          <div className="container-width max-w-3xl">
            <h2 className="text-3xl font-bold text-deep-charcoal mb-6">
              Our Mission
            </h2>
            <p className="text-warm-gray text-lg leading-relaxed mb-6">
              AI Knowledge Hub was created with a simple goal: to make AI automation accessible to everyone. 
              We believe that repetitive tasks should be handled by automation, freeing up your time for 
              creative and strategic work.
            </p>
            <p className="text-warm-gray text-lg leading-relaxed mb-6">
              Through battle-tested n8n workflows, Notion templates, and AI-powered tools, we help 
              entrepreneurs, creators, and professionals save 10+ hours every week. Our resources are 
              designed to be practical, actionable, and ready to implement.
            </p>
          </div>
        </section>

        {/* What We Offer */}
        <section className="section-padding bg-soft-cream/50">
          <div className="container-width">
            <h2 className="text-3xl font-bold text-deep-charcoal mb-12 text-center">
              What We Offer
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="card">
                <h3 className="text-xl font-semibold text-deep-charcoal mb-3">
                  🛠️ Toolbox
                </h3>
                <p className="text-warm-gray">
                  Curated AI tools and software that we personally use and recommend. 
                  From calendar automation to AI assistants, discover tools that actually work.
                </p>
              </div>
              <div className="card">
                <h3 className="text-xl font-semibold text-deep-charcoal mb-3">
                  📚 Playbook
                </h3>
                <p className="text-warm-gray">
                  Ready-to-use templates, workflows, and automation recipes. 
                  Build MVPs faster, automate newsletters, and scale your business with proven systems.
                </p>
              </div>
              <div className="card">
                <h3 className="text-xl font-semibold text-deep-charcoal mb-3">
                  ⚡ n8n Automation Vault
                </h3>
                <p className="text-warm-gray">
                  250+ pre-built n8n automation templates. From AI email sorting to lead generation — 
                  no coding required. Just copy, paste, and launch.
                </p>
              </div>
              <div className="card">
                <h3 className="text-xl font-semibold text-deep-charcoal mb-3">
                  🎯 Vibe Coding Resources
                </h3>
                <p className="text-warm-gray">
                  AI-powered prompts and guides for rapid MVP development. 
                  Ship faster using AI coding assistants like Claude and ChatGPT.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="section-padding">
          <div className="container-width max-w-3xl">
            <h2 className="text-3xl font-bold text-deep-charcoal mb-6">
              Why Choose AI Knowledge Hub?
            </h2>
            <ul className="space-y-4 text-warm-gray text-lg">
              <li className="flex items-start">
                <span className="text-green-500 mr-3 mt-1">✓</span>
                <span><strong>Battle-tested:</strong> Every template and workflow has been used in real projects.</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3 mt-1">✓</span>
                <span><strong>No-code friendly:</strong> You don't need to be a developer to automate.</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3 mt-1">✓</span>
                <span><strong>Time-saving:</strong> Save 10+ hours weekly with our automation templates.</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3 mt-1">✓</span>
                <span><strong>Community-driven:</strong> Join 2,000+ automation enthusiasts sharing insights.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-deep-charcoal text-white">
          <div className="container-width text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Automate Your Workflow?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              Join thousands of creators who are reclaiming their time with AI automation.
            </p>
            <Link 
              href="https://curioustapan.gumroad.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-primary text-lg inline-block"
            >
              Get Free Templates →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
