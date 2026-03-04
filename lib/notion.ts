// Notion API Integration for Version 2025-09-03
// Uses standard Database Query endpoint

const NOTION_API_BASE = 'https://api.notion.com/v1';
const NOTION_VERSION = '2025-09-03';

export type NotionCategory = 'Template' | 'Affiliate' | 'App' | 'Knowledge';

export interface NotionItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: NotionCategory;
  link: string;
  price: string;
}

// Get API key and Data Source ID from environment
const NOTION_API_KEY = process.env.NOTION_API_KEY || '';

// Format database ID to UUID format (with dashes) if needed
function formatDatabaseId(id: string): string {
  // If already has dashes, return as-is
  if (id.includes('-')) return id;
  
  // Remove any non-alphanumeric characters
  const clean = id.replace(/[^a-f0-9]/gi, '');
  
  // Check length
  if (clean.length !== 32) return id;
  
  // Insert dashes in UUID format: 8-4-4-4-12
  return `${clean.slice(0, 8)}-${clean.slice(8, 12)}-${clean.slice(12, 16)}-${clean.slice(16, 20)}-${clean.slice(20, 32)}`;
}

const RAW_DATABASE_ID = process.env.NOTION_DATA_SOURCE_ID || '319c1f53d15b808195c5000cec18446c';
const DATABASE_ID = formatDatabaseId(RAW_DATABASE_ID);

// Helper to make Notion API calls
async function notionAPI(endpoint: string, options: RequestInit = {}): Promise<any> {
  const url = `${NOTION_API_BASE}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Authorization': `Bearer ${NOTION_API_KEY}`,
      'Notion-Version': NOTION_VERSION,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('Notion API Error:', error);
    throw new Error(`Notion API error: ${response.status}`);
  }

  return response.json();
}

// Query database using the standard Database Query endpoint
async function queryDatabase(filter?: any): Promise<any[]> {
  const endpoint = `/databases/${DATABASE_ID}/query`;
  const body: any = {};
  
  if (filter) {
    body.filter = filter;
  }
  
  body.sorts = [
    { property: 'Created', direction: 'descending' }
  ];

  const response = await notionAPI(endpoint, {
    method: 'POST',
    body: JSON.stringify(body),
  });

  return response.results || [];
}

// Helper: Safely extract title from various formats
function getTitle(property: any): string {
  if (!property) return '';
  
  // Handle title type (array of rich_text objects)
  if (Array.isArray(property)) {
    return property.map((t: any) => t?.plain_text || t?.text?.content || '').join('');
  }
  
  // Handle object with title property
  if (property.title && Array.isArray(property.title)) {
    return property.title.map((t: any) => t?.plain_text || t?.text?.content || '').join('');
  }
  
  // Handle object with rich_text property
  if (property.rich_text && Array.isArray(property.rich_text)) {
    return property.rich_text.map((t: any) => t?.plain_text || t?.text?.content || '').join('');
  }
  
  // Direct string
  if (typeof property === 'string') {
    return property;
  }
  
  return '';
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
  
  // Handle URL type property
  if (typeof property.url === 'string') {
    return property.url;
  }
  
  // Handle rich_text with URL
  const text = getPlainText(property);
  if (text && text.startsWith('http')) {
    return text;
  }
  
  return '';
}

// Helper: Extract image URL from files or external property
function getImageUrl(property: any): string {
  if (!property) return '';
  
  // Handle files type
  if (property.files && Array.isArray(property.files) && property.files.length > 0) {
    const file = property.files[0];
    if (file.external?.url) return file.external.url;
    if (file.file?.url) return file.file.url;
  }
  
  // Handle external type
  if (property.external?.url) {
    return property.external.url;
  }
  
  // Handle direct URL
  if (typeof property === 'string') {
    return property;
  }
  
  // Default placeholder
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

// Parse database item to NotionItem
function parseItem(page: any): NotionItem | null {
  if (!page || !page.properties) {
    return null;
  }

  const p = page.properties;
  
  const title = getTitle(p.Title) || getTitle(p.Name);
  const description = getPlainText(p.Description);
  const category = getSelect(p.Category) as NotionCategory | '';
  const link = getUrl(p.Link) || getPlainText(p.Link) || '';
  const price = getSelect(p.Price) || '';
  const imageUrl = getImageUrl(p['Image URL'] || p.Image);

  // Skip items without titles
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
    
    const results = await queryDatabase(filter);
    
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
    
    const results = await queryDatabase(filter);
    
    return results
      .map(parseItem)
      .filter((item): item is NotionItem => item !== null);
  } catch (error) {
    console.error('Error fetching items by category:', error);
    return [];
  }
}

// Export for use in other files
export { DATABASE_ID };
