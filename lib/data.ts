// Google Sheets Database Integration via Maton
const MATON_BASE_URL = 'https://api.maton.ai';
const MATON_SHEETS_CONNECTION = 'c7636909-2514-406d-91bd-07ec3c151caa';
const SHEET_NAME = 'AI Automation Dataset';

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

// Get Maton API key from environment
const MATON_TOKEN = process.env.MATON_API_KEY || 'nfp_5206519433160mQkTTNBjSwRvjJipmSccCscWB3ZP4zT7G6';

// Helper to make Maton API calls
async function matonAPI(endpoint: string, options: RequestInit = {}): Promise<any> {
  const url = `${MATON_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'X-API-Key': MATON_TOKEN,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('Maton API Error:', error);
    // Fall back to sample data on error
    throw new Error(`Maton API error: ${response.status}`);
  }

  return response.json();
}

// Fetch data from Google Sheets
async function fetchFromSheets(): Promise<any[]> {
  try {
    // Fetch all rows from the sheet
    const response = await matonAPI(`/connections/${MATON_SHEETS_CONNECTION}/sheets/${encodeURIComponent(SHEET_NAME)}/values`, {
      method: 'GET',
    });
    
    return response.values || [];
  } catch (error) {
    console.error('Error fetching from Sheets:', error);
    throw error;
  }
}

// Parse sheet row to NotionItem
function parseRow(row: string[], headers: string[]): NotionItem | null {
  const getColumn = (name: string): string => {
    const index = headers.findIndex(h => h.trim().toLowerCase() === name.toLowerCase());
    return index >= 0 && row[index] ? row[index].trim() : '';
  };

  const title = getColumn('Product') || getColumn('Title') || getColumn('Name');
  const description = getColumn('Description');
  const category = getColumn('Category') as NotionCategory;
  const link = getColumn('Product URL') || getColumn('Link') || getColumn('URL');
  const price = getColumn('Price') || getColumn('Price USD');
  const imageUrl = getColumn('Image') || getColumn('Image URL') || getColumn('ImageURL');
  const status = getColumn('Status');

  // Skip items without titles or not published
  if (!title || status?.toLowerCase() !== 'published') {
    return null;
  }

  return {
    id: row[0] || Math.random().toString(36).substr(2, 9),
    title,
    description: description || '',
    imageUrl: imageUrl || 'https://placehold.co/400x300/FDFBF7/1A1A1A?text=Template',
    category: (category as NotionCategory) || 'Template',
    link: link || 'https://curioustapan.gumroad.com/',
    price: price || 'Free',
  };
}

// Fetch all published items from Google Sheets
export async function getAllItems(): Promise<NotionItem[]> {
  try {
    const values = await fetchFromSheets();
    
    if (!values || values.length === 0) {
      console.log('No data in Sheets, using fallback');
      return fallbackData();
    }

    const headers = values[0]; // First row is headers
    const rows = values.slice(1); // Rest are data
    
    console.log('Sheet headers:', headers);
    console.log('Rows found:', rows.length);

    const items = rows
      .map((row: string[]) => parseRow(row, headers))
      .filter((item): item is NotionItem => item !== null);

    if (items.length === 0) {
      console.log('No valid items found, using fallback');
      return fallbackData();
    }

    return items;
  } catch (error) {
    console.error('Error in getAllItems:', error);
    return fallbackData();
  }
}

// Fetch items by category
export async function getItemsByCategory(category: NotionCategory): Promise<NotionItem[]> {
  try {
    const allItems = await getAllItems();
    return allItems.filter(item => 
      item.category.toLowerCase() === category.toLowerCase()
    );
  } catch (error) {
    console.error('Error in getItemsByCategory:', error);
    return fallbackData().filter(item => 
      item.category.toLowerCase() === category.toLowerCase()
    );
  }
}

// Fallback sample data
function fallbackData(): NotionItem[] {
  return [
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
}

// Export database ID
export const DATABASE_ID = 'google-sheets';
