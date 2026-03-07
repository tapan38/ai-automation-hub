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
    description: 'Complete collection of AI prompts to rapidly prototype and launch MVPs using vibe coding principles.',
    imageUrl: 'https://placehold.co/400x300/FDFBF7/1A1A1A?text=Vibe+Coding+MVP',
    category: 'Template',
    link: 'https://curioustapan.gumroad.com/l/vcgzpf',
    price: '$0+'
  },
  {
    id: 'g2',
    title: 'Launch-Fast API Toolbox & Bypass Guide',
    description: 'Essential API tools and techniques to bypass common bottlenecks and launch products faster.',
    imageUrl: 'https://placehold.co/400x300/FDFBF7/1A1A1A?text=API+Toolbox',
    category: 'Template',
    link: 'https://curioustapan.gumroad.com/l/aqwzzx',
    price: '$12'
  },
  {
    id: 'g3',
    title: 'Zero-Maintenance Newsletter Playbook',
    description: 'Complete system to create and run a newsletter with minimal ongoing maintenance.',
    imageUrl: 'https://placehold.co/400x300/FDFBF7/1A1A1A?text=Newsletter+Playbook',
    category: 'Template',
    link: 'https://curioustapan.gumroad.com/l/thyra',
    price: '$19'
  },
  {
    id: 'g4',
    title: 'Database Without a Database Blueprint',
    description: 'Build scalable applications without traditional databases using modern serverless solutions.',
    imageUrl: 'https://placehold.co/400x300/FDFBF7/1A1A1A?text=No+DB+Blueprint',
    category: 'Template',
    link: 'https://curioustapan.gumroad.com/l/tiraw',
    price: '$19'
  },
  {
    id: 'g5',
    title: 'Affiliate Velocity Engine',
    description: 'Automated affiliate marketing system to generate passive income with minimal effort.',
    imageUrl: 'https://placehold.co/400x300/FDFBF7/1A1A1A?text=Affiliate+Engine',
    category: 'Template',
    link: 'https://curioustapan.gumroad.com/l/getiuo',
    price: '$29'
  },
  {
    id: 'g6',
    title: 'The Ultimate n8n Automation Vault',
    description: 'Complete collection of n8n workflows and automations for any use case.',
    imageUrl: 'https://placehold.co/400x300/FDFBF7/1A1A1A?text=n8n+Vault',
    category: 'Template',
    link: 'https://curioustapan.gumroad.com/l/fxeilz',
    price: '$0'
  },

  // TOOLBOX PRODUCTS (Category = "App") - AFFILIATE TOOLS
  {
    id: 'reclaim',
    title: 'Reclaim AI',
    description: 'AI calendar assistant that saves 7.6 hours/week. FREE forever plan includes unlimited tasks, buffer time & habit tracking.',
    imageUrl: 'https://placehold.co/400x300/FDFBF7/1A1A1A?text=Reclaim+AI',
    category: 'App',
    link: 'https://go.reclaim.ai/ykyg21k0nfq4',
    price: 'Free Forever'
  },
  {
    id: 'monica',
    title: 'Monica AI',
    description: 'FREE Chrome extension with 10M+ users. Access GPT-5, Claude, Gemini in one place.',
    imageUrl: 'https://placehold.co/400x300/FDFBF7/1A1A1A?text=Monica+AI',
    category: 'App',
    link: 'https://monica.im/invitation-affiliate?ref=ndrmyzc',
    price: 'Free Extension'
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
        resolve(toolboxItems); // App items go to Toolbox
      }
      // Playbook section: Show Templates (Category = "Template")
      else if (category === 'Affiliate') {
        resolve(playbookItems); // Template items go to Playbook
      } else {
        resolve([]);
      }
    }, 10);
  });
}

export const DATABASE_ID = 'static-data';
