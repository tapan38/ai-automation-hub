// Sample data for AI Knowledge Hub - editable via code
// TODO: Reconnect Notion or Google Sheets when API access is fixed

export type NotionCategory = 'Template' | 'Affiliate' | 'App' | 'Knowledge' | 'Tools' | 'Webinar';

export interface NotionItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: NotionCategory;
  link: string;
  price: string;
}

// Template products - EDIT THESE to update your website
const templates: NotionItem[] = [
  {
    id: '1',
    title: 'AI Automation Starter Pack',
    description: 'Complete starter pack with n8n workflows, Notion templates, and AI prompts to automate your daily tasks.',
    imageUrl: 'https://placehold.co/400x300/FDFBF7/1A1A1A?text=AI+Automation',
    category: 'Template',
    link: 'https://curioustapan.gumroad.com/',
    price: 'Free'
  },
  {
    id: '2',
    title: 'Content Calendar System',
    description: 'Automated content planning system with Notion database, AI content ideas, and publishing schedule.',
    imageUrl: 'https://placehold.co/400x300/FDFBF7/1A1A1A?text=Content+Calendar',
    category: 'Template',
    link: 'https://curioustapan.gumroad.com/',
    price: '$15'
  },
  {
    id: '3',
    title: 'Email Outreach Workflow',
    description: 'Automate personalized email outreach with AI-generated sequences and follow-up automation.',
    imageUrl: 'https://placehold.co/400x300/FDFBF7/1A1A1A?text=Email+Outreach',
    category: 'Template',
    link: 'https://curioustapan.gumroad.com/',
    price: 'Free'
  },
  {
    id: '4',
    title: 'Social Media Auto-Scheduler',
    description: 'Schedule and automate social media posts across all platforms with one Notion command.',
    imageUrl: 'https://placehold.co/400x300/FDFBF7/1A1A1A?text=Social+Scheduler',
    category: 'Template',
    link: 'https://curioustapan.gumroad.com/',
    price: '$12'
  },
  {
    id: '5',
    title: 'Lead Tracker CRM',
    description: 'Simple CRM for freelancers to track leads, follow-ups, and deal flow with automations.',
    imageUrl: 'https://placehold.co/400x300/FDFBF7/1A1A1A?text=Lead+Tracker',
    category: 'Template',
    link: 'https://curioustapan.gumroad.com/',
    price: 'Free'
  },
  {
    id: '6',
    title: 'SEO Keyword Research Tool',
    description: 'Automated keyword research with scraping, clustering, and content brief generation.',
    imageUrl: 'https://placehold.co/400x300/FDFBF7/1A1A1A?text=SEO+Tools',
    category: 'Template',
    link: 'https://curioustapan.gumroad.com/',
    price: '$25'
  }
];

// Affiliate/partner tools - EDIT THESE to update your website
const affiliates: NotionItem[] = [
  {
    id: '7',
    title: 'n8n.io',
    description: 'Open-source workflow automation. Connect 400+ apps and APIs to automate everything.',
    imageUrl: 'https://placehold.co/400x300/FDFBF7/1A1A1A?text=n8n',
    category: 'Affiliate',
    link: 'https://n8n.io',
    price: 'Free/Self-hosted'
  },
  {
    id: '8',
    title: 'Notion',
    description: 'All-in-one workspace for notes, databases, wikis, and project management.',
    imageUrl: 'https://placehold.co/400x300/FDFBF7/1A1A1A?text=Notion',
    category: 'Affiliate',
    link: 'https://notion.so',
    price: 'Free tier'
  },
  {
    id: '9',
    title: 'OpenRouter',
    description: 'Unified API for LLMs. Access GPT, Claude, and more through one API.',
    imageUrl: 'https://placehold.co/400x300/FDFBF7/1A1A1A?text=OpenRouter',
    category: 'Affiliate',
    link: 'https://openrouter.ai',
    price: 'Pay per use'
  }
];

// Export all data
export async function getAllItems(): Promise<NotionItem[]> {
  return [...templates, ...affiliates];
}

// Fetch items by category
export async function getItemsByCategory(category: NotionCategory): Promise<NotionItem[]> {
  if (category === 'Template') {
    return templates;
  } else if (category === 'Affiliate') {
    return affiliates;
  }
  return [];
}

// Export database ID (for future integration)
export const DATABASE_ID = 'sample-data';
