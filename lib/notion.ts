// Notion API Integration via Maton
const MATON_BASE_URL = 'https://api.maton.ai';
const MATON_NOTION_CONNECTION = '6be24ed2-ab30-47fc-8e64-0fed3bf6130f';
const DATABASE_ID = '319c1f53-d15b-80e8-a2ca-f46c846f0a13';

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

// Get Maton API key from environment or use hardcoded fallback
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
    throw new Error(`Maton API error: ${response.status}`);
  }

  return response.json();
}

// Query Notion database via Maton
async function queryNotionDatabase(filter?: any): Promise<any[]> {
  const response = await matonAPI(`/connections/${MATON_NOTION_CONNECTION}/notion/databases/${DATABASE_ID}/query`, {
    method: 'POST',
    body: JSON.stringify({
      filter: filter,
      sorts: [{ property: 'Product', direction: 'descending' }]
    }),
  });
  
  return response.results || [];
}

// Helper: Extract plain text from rich_text
function getPlainText(property: any): string {
  if (!property) return '';
  
  const richText = property.rich_text || property.text || property;
  
  if (Array.isArray(richText)) {
    return richText.map((t: any) => t?.plain_text || t?.text?.content || '').join('');
  }
  
  if (typeof property === 'string') {
    return property;
  }
  
  return '';
}

// Helper: Get URL from various property types
function getUrl(property: any): string {
  if (!property) return '';
  
  if (typeof property.url === 'string') {
    return property.url;
  }
  
  const text = getPlainText(property);
  if (text && text.startsWith('http')) {
    return text;
  }
  
  return '';
}

// Helper: Extract image URL from files or external property
function getImageUrl(property: any): string {
  if (!property) return '';
  
  if (property.files && Array.isArray(property.files) && property.files.length > 0) {
    const file = property.files[0];
    if (file.external?.url) return file.external.url;
    if (file.file?.url) return file.file.url;
  }
  
  if (property.external?.url) {
    return property.external.url;
  }
  
  if (typeof property === 'string') {
    return property;
  }
  
  return 'https://via.placeholder.com/400x300';
}

// Helper: Get select value
function getSelect(property: any): string {
  if (!property) return '';
  
  if (property.select && property.select.name) {
    return property.select.name;
  }
  
  return '';
}

// Helper: Get title
function getTitle(property: any): string {
  if (!property) return '';
  
  if (property.title && Array.isArray(property.title)) {
    return property.title.map((t: any) => t?.plain_text || t?.text?.content || '').join('');
  }
  
  if (typeof property === 'string') {
    return property;
  }
  
  return '';
}

// Parse database item to NotionItem
function parseItem(page: any): NotionItem | null {
  if (!page || !page.properties) {
    return null;
  }

  const p = page.properties;
  
  const title = getTitle(p.Product) || getTitle(p.Title) || getTitle(p.Name);
  const description = getPlainText(p.Description);
  const category = getSelect(p.Category) as NotionCategory | '';
  const link = getUrl(p['Product URL']) || getUrl(p.Link) || getPlainText(p.Link) || '';
  const price = getSelect(p.Price) || '';
  const imageUrl = getImageUrl(p['Image'] || p['Image URL']);

  if (!title) {
    return null;
  }

  return {
    id: page.id,
    title,
    description: description || '',
    imageUrl: imageUrl || '',
    category: (category as NotionCategory) || 'Affiliate',
    link: link || '#',
    price: price || '$0',
  };
}

// Fetch all published items
export async function getAllItems(): Promise<NotionItem[]> {
  try {
    const filter = {
      and: [
        { property: 'Status', select: { equals: 'Published' } }
      ]
    };
    
    const results = await queryNotionDatabase(filter);
    
    return results
      .map(parseItem)
      .filter((item): item is NotionItem => item !== null);
  } catch (error) {
    console.error('Error fetching Notion items:', error);
    return [];
  }
}

// Fetch items by category
export async function getItemsByCategory(category: NotionCategory): Promise<NotionItem[]> {
  try {
    const filter = {
      and: [
        { property: 'Category', select: { equals: category } },
        { property: 'Status', select: { equals: 'Published' } }
      ]
    };
    
    const results = await queryNotionDatabase(filter);
    
    return results
      .map(parseItem)
      .filter((item): item is NotionItem => item !== null);
  } catch (error) {
    console.error('Error fetching items by category:', error);
    return [];
  }
}

// Export database ID
export { DATABASE_ID };
