# AI Knowledge & Automation Hub

A minimalist, high-converting Next.js website for AI automation templates and productivity tools. Built with Notion as CMS.

## Features

- 🚀 **Next.js 14** with App Router
- 🎨 **Tailwind CSS** with warm beige aesthetic
- 📝 **Notion CMS** for easy content management
- 🏎️ **Static Site Generation** with ISR for performance
- 📱 **Fully Responsive** design
- 🔍 **SEO Optimized** with 15 researched keywords

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- @notionhq/client

## Getting Started

### 1. Install Dependencies

```bash
cd ai-automation-hub
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

### 3. Set Up Notion Database

1. Create a Notion database with these columns:
   - **Title** (Title)
   - **Description** (Rich Text)
   - **Image URL** (Files & Media or URL)
   - **Category** (Select: "Template" or "Affiliate")
   - **Link** (URL)
   - **Price** (Select: "$0", "$7", "$15", etc.)
   - **Status** (Select: "Published" or "Draft")

2. Share the database with your integration
3. Copy the database ID to `.env.local`

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deployment

### Deploy to Vercel

```bash
npm run build
```

Or use the Vercel CLI:
```bash
vercel --prod
```

### Deploy to GitHub Pages

```bash
npm run build
# Output is in .next/static
```

## SEO Keywords Integrated

The site is optimized for these high-value keywords:

1. workflow automation
2. AI automation
3. automation templates
4. n8n workflows
5. AI agent
6. no-code automation
7. business automation
8. process automation
9. Zapier alternative
10. productivity automation
11. AI integration
12. workflow builder
13. automation tools
14. AI-powered workflows
15. task automation

## File Structure

```
ai-automation-hub/
├── app/
│   ├── page.tsx          # Homepage
│   ├── layout.tsx        # Root layout with SEO
│   └── globals.css       # Global styles
├── components/
│   ├── Card.tsx          # Product card component
│   ├── Header.tsx        # Navigation header
│   ├── Footer.tsx        # Footer component
│   └── EmailCapture.tsx  # Newsletter signup
├── lib/
│   └── notion.ts         # Notion API integration
├── public/               # Static assets
└── package.json
```

## Content Management

All content is managed in Notion:

1. Go to your Notion database
2. Add new rows for templates or affiliate tools
3. Set Category to "Template" or "Affiliate"
4. Set Status to "Published"
5. Changes will reflect on the site (ISR revalidation every hour)

## Customization

### Design
- Edit `tailwind.config.ts` for colors
- Edit `app/globals.css` for global styles
- Colors: Warm beige (#FDFBF7), Dark charcoal (#1A1A1A)

### SEO
- Edit `app/layout.tsx` for meta tags
- Site title, description, Open Graph, Twitter cards

### Components
- Edit components in `/components/`
- Styled with Tailwind CSS classes

## License

MIT
# Deploy: Tue Mar 10 18:16:56 UTC 2026
