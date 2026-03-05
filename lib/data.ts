// Product Data - Static (works reliably)
// For dynamic data, populate this array or use a CMS

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

// YOUR PRODUCTS - Edit this to update your website!
// RULE: Category "App" → Toolbox | Category "Template" → Playbook
const allProducts: NotionItem[] = [
  // PLAYBOOK PRODUCTS (Category = "Template")
  {
    id: 'g1',
    title: 'Vibe Coding MVP Prompt Vault',
    description: 'Complete prompt collection for building MVPs using AI coding assistants. Ship faster with tested prompts.',
    imageUrl: 'https://placehold.co/400x300/FDFBF7/1A1A1A?text=Vibe+Coding+MVP',
    category: 'Template',
    link: 'https://curioustapan.gumroad.com/l/vcgzpf',
    price: 'CAD$29'
  },
  {
    id: 'g2',
    title: 'Launch-Fast API Toolbox & Bypass Guide',
    description: 'Essential API tools and bypass techniques to launch products faster without getting blocked.',
    imageUrl: 'https://placehold.co/400x300/FDFBF7/1A1A1A?text=API+Toolbox',
    category: 'Template',
    link: 'https://curioustapan.gumroad.com/l/aqwzzx',
    price: 'CAD$27'
  },
  {
    id: 'g3',
    title: 'Zero-Maintenance Newsletter Playbook',
    description: 'Build a newsletter that runs itself. Automation templates and strategies for hands-free publishing.',
    imageUrl: 'https://placehold.co/400x300/FDFBF7/1A1A1A?text=Newsletter+Playbook',
    category: 'Template',
    link: 'https://curioustapan.gumroad.com/l/thyra',
    price: 'CAD$25'
  },
  {
    id: 'g4',
    title: 'Database Without a Database Blueprint',
    description: 'Learn to build scalable data structures using Notion, Airtable, and no-code tools without complex databases.',
    imageUrl: 'https://placehold.co/400x300/FDFBF7/1A1A1A?text=DB+Blueprint',
    category: 'Template',
    link: 'https://curioustapan.gumroad.com/l/tiraw',
    price: 'CAD$31'
  },
  {
    id: 'g5',
    title: 'Affiliate Velocity Engine',
    description: 'Speed up your affiliate marketing with automated workflows, tracking systems, and conversion templates.',
    imageUrl: 'https://placehold.co/400x300/FDFBF7/1A1A1A?text=Affiliate+Engine',
    category: 'Template',
    link: 'https://curioustapan.gumroad.com/l/getiuo',
    price: 'CAD$39'
  },

  // OTHER PLAYBOOK ITEMS
  {
    id: '1',
    title: 'Free API Guide',
    description: '10+ AI automation tips',
    imageUrl: 'https://placehold.co/400x300/FDFBF7/1A1A1A?text=Free+API+Guide',
    category: 'Template',
    link: 'https://curioustapan.gumroad.com/l/finance',
    price: '$0'
  },
  {
    id: '3',
    title: 'n8n.io',
    description: 'Open-source workflow automation. Connect 400+ apps and APIs to automate everything.',
    imageUrl: 'https://placehold.co/400x300/FDFBF7/1A1A1A?text=n8n',
    category: 'Template',
    link: 'https://n8n.io',
    price: 'Free'
  },
  {
    id: '4',
    title: 'Notion',
    description: 'All-in-one workspace for notes, databases, wikis, and project management.',
    imageUrl: 'https://placehold.co/400x300/FDFBF7/1A1A1A?text=Notion',
    category: 'Template',
    link: 'https://notion.so',
    price: 'Free tier'
  },

  // TOOLBOX PRODUCTS (Category = "App")
  {
    id: '2',
    title: 'Monical AI',
    description: 'All in one AI',
    imageUrl: 'https://placehold.co/400x300/FDFBF7/1A1A1A?text=Monical+AI',
    category: 'App',
    link: 'https://monica.im/invitation-affiliate?ref=ndrmyzc',
    price: 'Free Credits/Trail'
  }
];

// UNIVERSAL RULE:
// - Category = "App" → Toolbox section
// - Category = "Template" → Playbook section

// Toolbox items: Apps
const toolboxItems = allProducts.filter(item => item.category === 'App');

// Playbook items: Templates
const playbookItems = allProducts.filter(item => item.category === 'Template');

// For backwards compatibility
const templates = playbookItems;
const affiliates = toolboxItems;

// Export functions
export async function getAllItems(): Promise<NotionItem[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...allProducts]), 10);
  });
}

export async function getItemsByCategory(category: NotionCategory): Promise<NotionItem[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Toolbox section: Show Apps (Category = "App")
      if (category === 'Template') {
        resolve(toolboxItems); // App category items go to Toolbox
      }
      // Playbook section: Show Templates (Category = "Template")
      else if (category === 'Affiliate') {
        resolve(playbookItems); // Template category items go to Playbook
      }
      else resolve([]);
    }, 10);
  });
}

export const DATABASE_ID = 'static-data';
