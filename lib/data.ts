// Google Sheets Integration via Maton OR fallback to sample data
const MATON_BASE_URL = 'https://api.maton.ai';
const MATON_TOKEN = 'nfp_5206519433160mQkTTNBjSwRvjJipmSccCscWB3ZP4zT7G6';
const SHEETS_CONNECTION_ID = 'c7636909-2514-406d-91bd-07ec3c151caa';

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

// Your static data (edit these to update your website immediately)
const staticTemplates: NotionItem[] = [
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
  }
];

const staticAffiliates: NotionItem[] = [
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
  }
];

// Try to fetch from Google Sheets via Maton (fallback to static if fails)
async function fetchFromMatonSheets(): Promise<{templates: NotionItem[], affiliates: NotionItem[]} | null> {
  try {
    console.log('Trying Maton Sheets API...');
    
    // Different endpoint formats to try
    const endpoints = [
      `/connections/${SHEETS_CONNECTION_ID}/sheets/AI%20Automation%20Dataset/values`,
      `/connections/${SHEETS_CONNECTION_ID}/google-sheets/values`,
      `/connections/${SHEETS_CONNECTION_ID}/values`,
    ];
    
    let response = null;
    let lastError = null;
    
    for (const endpoint of endpoints) {
      try {
        response = await fetch(`${MATON_BASE_URL}${endpoint}`, {
          method: 'GET',
          headers: {
            'X-API-Key': MATON_TOKEN,
            'Content-Type': 'application/json',
          },
        });
        
        if (response.ok) {
          console.log(`Success with endpoint: ${endpoint}`);
          break;
        }
        
        lastError = await response.text();
        console.log(`Endpoint failed: ${endpoint} - ${lastError}`);
      } catch (e) {
        console.log(`Error with endpoint ${endpoint}:`, e);
      }
    }
    
    if (!response || !response.ok) {
      console.log('All Maton endpoints failed, using fallback data');
      return null;
    }
    
    const data = await response.json();
    console.log('Maton response:', JSON.stringify(data, null, 2));
    
    // Parse the sheet data
    if (data.values && data.values.length > 0) {
      const parsed = parseSheetData(data.values);
      return parsed;
    }
    
    return null;
  } catch (error) {
    console.error('Maton fetch error:', error);
    return null;
  }
}

// Parse Google Sheets data
function parseSheetData(values: any[][]): {templates: NotionItem[], affiliates: NotionItem[]} {
  const headers = values[0];
  const rows = values.slice(1);
  
  const templates: NotionItem[] = [];
  const affiliates: NotionItem[] = [];
  
  for (const row of rows) {
    const item: any = {};
    headers.forEach((header: string, index: number) => {
      item[header] = row[index] || '';
    });
    
    if (item.Status !== 'Published') continue;
    
    const parsedItem: NotionItem = {
      id: Math.random().toString(36).substr(2, 9),
      title: item.Product || '',
      description: item.Description || '',
      imageUrl: item.Image || 'https://placehold.co/400x300/FDFBF7/1A1A1A?text=Template',
      category: (item.Category as NotionCategory) || 'Template',
      link: item['Product URL'] || 'https://curioustapan.gumroad.com/',
      price: item.Price || 'Free',
    };
    
    if (!parsedItem.title) continue;
    
    if (parsedItem.category === 'Template') {
      templates.push(parsedItem);
    } else if (parsedItem.category === 'Affiliate' || parsedItem.category === 'Tools') {
      affiliates.push(parsedItem);
    }
  }
  
  return { templates, affiliates };
}

// Main export functions
export async function getAllItems(): Promise<NotionItem[]> {
  const data = await fetchFromMatonSheets();
  if (data) {
    return [...data.templates, ...data.affiliates];
  }
  return [...staticTemplates, ...staticAffiliates];
}

export async function getItemsByCategory(category: NotionCategory): Promise<NotionItem[]> {
  const data = await fetchFromMatonSheets();
  
  if (data) {
    if (category === 'Template') return data.templates;
    if (category === 'Affiliate') return data.affiliates;
    return [];
  }
  
  // Fallback to static
  if (category === 'Template') return staticTemplates;
  if (category === 'Affiliate') return staticAffiliates;
  return [];
}

export const DATABASE_ID = 'google-sheets-via-maton';
