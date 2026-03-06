// Sample data for AI Knowledge Hub

const sampleTemplates: NotionItem[] = [
  {
    id: '1',
    title: 'Vibe Coding MVP Prompt Vault',
    description: 'Complete collection of AI prompts to rapidly prototype and launch MVPs using vibe coding principles.',
    imageUrl: 'https://placehold.co/400x300/FDFBF7/1A1A1A?text=Vibe+Coding+MVP',
    category: 'Template',
    link: 'https://curioustapan.gumroad.com/',
    price: '$0+'
  },
  {    id: '2',
    title: 'Launch-Fast API Toolbox & Bypass Guide',
    description: 'Essential API tools and techniques to bypass common bottlenecks and launch products faster.',
    imageUrl: 'https://placehold.co/400x300/FDFBF7/1A1A1A?text=API+Toolbox',
    category: 'Template',
    link: 'https://curioustapan.gumroad.com/',
    price: '$12'
  },
  {
    id: '3',
    title: 'Zero-Maintenance Newsletter Playbook',
    description: 'Complete system to create and run a newsletter with minimal ongoing maintenance.',
    imageUrl: 'https://placehold.co/400x300/FDFBF7/1A1A1A?text=Newsletter+Playbook',
    category: 'Template',
    link: 'https://curioustapan.gumroad.com/',
        price: '$19'
  },
  {
    id: '4',
    title: 'Database Without a Database Blueprint',
    description: 'Build scalable applications without traditional databases using modern serverless solutions.',
    imageUrl: 'https://placehold.co/400x300/FDFBF7/1A1A1A?text=No+DB+Blueprint',
    category: 'Template',
    link: 'https://curioustapan.gumroad.com/',
    price: '$19'
  },
  {
    id: '5',
    title: 'Affiliate Velocity Engine',
    description: 'Automated affiliate marketing system to generate passive income with minimal effort.',
        imageUrl: 'https://placehold.co/400x300/FDFBF7/1A1A1A?text=Affiliate+Engine',
    category: 'Template',
    link: 'https://curioustapan.gumroad.com/',
    price: '$29'
  },
  {
    id: '6',
    title: 'The Ultimate n8n Automation Vault',
    description: 'Complete collection of n8n workflows and automations for any use case.',
    imageUrl: 'https://placehold.co/400x300/FDFBF7/1A1A1A?text=n8n+Vault',
    category: 'Template',
    link: 'https://curioustapan.gumroad.com/',
    price: '$0'
  }
];
const sampleAffiliates: NotionItem[] = [
  { id: '7', title: 'n8n.io', description: 'Open-source workflow automation. Connect 400+ apps and APIs to automate everything.', imageUrl: 'https://placehold.co/400x300/FDFBF7/1A1A1A?text=n8n', category: 'Affiliate', link: 'https://n8n.io', price: 'Free/Self-hosted' },
  { id: '8', title: 'Notion', description: 'All-in-one workspace for notes, databases, wikis, and project management.', imageUrl: 'https://placehold.co/400x300/FDFBF7/1A1A1A?text=Notion', category: 'Affiliate', link: 'https://notion.so', price: 'Free tier' },
  { id: '9', title: 'OpenRouter', description: 'Unified API for LLMs. Access GPT, Claude, and more through one API.', imageUrl: 'https://placehold.co/400x300/FDFBF7/1A1A1A?text=OpenRouter', category: 'Affiliate', link: 'https://openrouter.ai', price: 'Pay per use' }
];

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

// Get all published items
export async function getAllItems(): Promise<NotionItem[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...sampleTemplates, ...sampleAffiliates]);
    }, 50);
  });
}

// Fetch items by category
export async function getItemsByCategory(category: NotionCategory): Promise<NotionItem[]> {  return new Promise((resolve) => {
    setTimeout(() => {
      if (category === 'Template') {
        resolve(sampleTemplates);
      } else if (category === 'Affiliate') {
        resolve(sampleAffiliates);
      } else {
        resolve([]);
      }
    }, 50);
  });
}

// Export database ID (not used with sample data)
export const DATABASE_ID = 'sample';
