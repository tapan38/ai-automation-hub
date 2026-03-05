// Google Sheets Integration - Live Product Data
import https from 'https';
import fs from 'fs';
import path from 'path';

const SHEET_ID = '1C7lPBltqIemPNx5SdekEzc5iw9FU-_xMgjQjlGn7z4w';

// Google Sheets token from environment variable (set in Vercel)
const accessToken = process.env.SHEETS_ACCESS_TOKEN || '';

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

// Static fallback data
const fallbackTemplates: NotionItem[] = [
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
  }
];

const fallbackAffiliates: NotionItem[] = [
  {
    id: '7',
    title: 'n8n.io',
    description: 'Open-source workflow automation. Connect 400+ apps and APIs to automate everything.',
    imageUrl: 'https://placehold.co/400x300/FDFBF7/1A1A1A?text=n8n',
    category: 'Affiliate',
    link: 'https://n8n.io',
    price: 'Free'
  }
];

// Fetch from Google Sheets
async function fetchFromSheets(): Promise<{templates: NotionItem[], affiliates: NotionItem[]} | null> {
  return new Promise((resolve) => {
    if (!accessToken) {
      console.log('No access token, using fallback');
      resolve(null);
      return;
    }

    const options = {
      hostname: 'sheets.googleapis.com',
      port: 443,
      path: `/v4/spreadsheets/${SHEET_ID}/values/Sheet1!A1:F100`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          
          if (result.error) {
            console.log('Sheets error:', result.error.message);
            resolve(null);
            return;
          }
          
          if (!result.values || result.values.length < 2) {
            console.log('No data in sheet');
            resolve(null);
            return;
          }
          
          const parsed = parseSheetData(result.values);
          resolve(parsed);
        } catch (e) {
          console.error('Parse error:', e);
          resolve(null);
        }
      });
    });

    req.on('error', (e) => {
      console.error('Request error:', e);
      resolve(null);
    });
    
    req.setTimeout(10000, () => {
      req.destroy();
      resolve(null);
    });
    
    req.end();
  });
}

// Parse sheet using actual column names
function parseSheetData(values: any[][]): {templates: NotionItem[], affiliates: NotionItem[]} | null {
  const headers = values[0];
  const rows = values.slice(1);
  
  // Find column indices based on actual headers
  const getColIndex = (name: string): number => {
    const idx = headers.findIndex((h: string) => 
      h.toLowerCase().includes(name.toLowerCase())
    );
    return idx >= 0 ? idx : -1;
  };
  
  const nameIdx = getColIndex('name');
  const catIdx = getColIndex('category');
  const descIdx = getColIndex('description');
  const priceIdx = getColIndex('price');
  const linkIdx = getColIndex('button link') || getColIndex('link');
  const imgIdx = getColIndex('image link') || getColIndex('image');
  
  if (nameIdx === -1) {
    console.log('Could not find Name column');
    return null;
  }
  
  const templates: NotionItem[] = [];
  const affiliates: NotionItem[] = [];
  
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    if (!row[nameIdx]) continue; // Skip empty rows
    
    const title = row[nameIdx] || '';
    const category = (row[catIdx] || 'Template') as NotionCategory;
    const description = row[descIdx] || '';
    const price = row[priceIdx] || '$0';
    const link = row[linkIdx] || 'https://curioustapan.gumroad.com/';
    const imageUrl = row[imgIdx] || `https://placehold.co/400x300/FDFBF7/1A1A1A?text=${encodeURIComponent(title.substring(0, 15))}`;
    
    const item: NotionItem = {
      id: `sheet-${i}`,
      title: title.trim(),
      description: description.trim(),
      imageUrl: imageUrl.trim() || `https://placehold.co/400x300/FDFBF7/1A1A1A?text=${encodeURIComponent(title.substring(0, 15))}`,
      category: category.trim() as NotionCategory,
      link: link.trim() || '#',
      price: price.trim() || 'Free',
    };
    
    // Categorize
    const cat = category.toLowerCase();
    if (cat === 'template' || cat === 'app') {
      templates.push(item);
    } else if (cat === 'affiliate' || cat === 'tool' || cat === 'tools') {
      affiliates.push(item);
    } else {
      templates.push(item); // Default to templates
    }
  }
  
  return { templates, affiliates };
}

// Export functions
export async function getAllItems(): Promise<NotionItem[]> {
  const data = await fetchFromSheets();
  if (data) {
    console.log(`Sheets: ${data.templates.length} templates, ${data.affiliates.length} affiliates`);
    return [...data.templates, ...data.affiliates];
  }
  console.log('Using fallback data');
  return [...fallbackTemplates, ...fallbackAffiliates];
}

export async function getItemsByCategory(category: NotionCategory): Promise<NotionItem[]> {
  const data = await fetchFromSheets();
  
  if (data) {
    console.log(`Fetched from sheets for ${category}`);
    if (category === 'Template') return data.templates;
    if (category === 'Affiliate') return data.affiliates;
    return [];
  }
  
  // Fallback
  if (category === 'Template') return fallbackTemplates;
  if (category === 'Affiliate') return fallbackAffiliates;
  return [];
}

export const DATABASE_ID = SHEET_ID;
