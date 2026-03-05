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
  {
    id: '1',
    title: 'Free API Guide',
    description: '10+ AI automation tips',
    imageUrl: 'https://placehold.co/400x300/FDFBF7/1A1A1A?text=Free+API+Guide',
    category: 'Template',  // Goes to Playbook
    link: 'https://curioustapan.gumroad.com/l/finance',
    price: '$0'
  },
  {
    id: '2',
    title: 'Monical AI',
    description: 'All in one AI',
    imageUrl: 'https://placehold.co/400x300/FDFBF7/1A1A1A?text=Monical+AI',
    category: 'App',  // Goes to Toolbox
    link: 'https://monica.im/invitation-affiliate?ref=ndrmyzc',
    price: 'Free Credits/Trail'
  },
  {
    id: '3',
    title: 'n8n.io',
    description: 'Open-source workflow automation. Connect 400+ apps and APIs to automate everything.',
    imageUrl: 'https://placehold.co/400x300/FDFBF7/1A1A1A?text=n8n',
    category: 'Template',  // Goes to Playbook
    link: 'https://n8n.io',
    price: 'Free'
  },
  {
    id: '4',
    title: 'Notion',
    description: 'All-in-one workspace for notes, databases, wikis, and project management.',
    imageUrl: 'https://placehold.co/400x300/FDFBF7/1A1A1A?text=Notion',
    category: 'Template',  // Goes to Playbook
    link: 'https://notion.so',
    price: 'Free tier'
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
