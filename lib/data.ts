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
const templates: NotionItem[] = [
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
    id: '2',
    title: 'Monical AI',
    description: 'All in one AI',
    imageUrl: 'https://placehold.co/400x300/FDFBF7/1A1A1A?text=Monical+AI',
    category: 'App',
    link: 'https://monica.im/invitation-affiliate?ref=ndrmyzc',
    price: 'Free Credits/Trail'
  }
];

const affiliates: NotionItem[] = [
  {
    id: '3',
    title: 'n8n.io',
    description: 'Open-source workflow automation. Connect 400+ apps and APIs to automate everything.',
    imageUrl: 'https://placehold.co/400x300/FDFBF7/1A1A1A?text=n8n',
    category: 'Affiliate',
    link: 'https://n8n.io',
    price: 'Free'
  },
  {
    id: '4',
    title: 'Notion',
    description: 'All-in-one workspace for notes, databases, wikis, and project management.',
    imageUrl: 'https://placehold.co/400x300/FDFBF7/1A1A1A?text=Notion',
    category: 'Affiliate',
    link: 'https://notion.so',
    price: 'Free tier'
  }
];

// Export functions
export async function getAllItems(): Promise<NotionItem[]> {
  // Add a small delay to simulate async loading (optional)
  return new Promise((resolve) => {
    setTimeout(() => resolve([...templates, ...affiliates]), 10);
  });
}

export async function getItemsByCategory(category: NotionCategory): Promise<NotionItem[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (category === 'Template') resolve(templates);
      else if (category === 'Affiliate') resolve(affiliates);
      else resolve([]);
    }, 10);
  });
}

export const DATABASE_ID = 'static-data';
