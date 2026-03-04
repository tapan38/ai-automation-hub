import { Client } from '@notionhq/client'

// Initialize Notion client
// In production, use environment variable
const notion = new Client({
  auth: process.env.NOTION_API_KEY || '',
})

// Database ID from user
const DATABASE_ID = '5d3593a2-b64f-49dc-8dd3-94913ab8175b'

export interface NotionItem {
  id: string
  title: string
  description: string
  imageUrl: string
  category: 'Template' | 'Affiliate'
  link: string
  price: string
}

// Helper to extract text from rich_text propertyunction getTextFromRichText(property: any): string {
 if (!property?.rich_text) return ''
  return property.rich_text.map((text: any) => text.plain_text).join('')
}

// Helper to extract text from title property
function getTitle(property: any): string {
  if (!property?.title) return ''
  return property.title.map((text: any) => text.plain_text).join('')
}

// Helper to extract URL from files or external property
function getImageUrl(property: any): string {
  // Try files first
  if (property?.files?.length > 0) {
    const file = property.files[0]
    if (file.external?.url) return file.external.url
if (file.file?.url) return file.file.url
  }
  
  // Try external URL property
  if (property?.external?.url) return property.external.url
  
  // Try URL property
  if (property?.url) return property.url
  
  // Default placeholder
  return 'https://via.placeholder.com/400x300'
}

// Helper to extract URL from URL property
function getUrl(property: any): string {
  return property?.url || ''
}

// Helper to extract select value
function getSelect(property: any): string {
  return property?.select?.name || ''
}

// Fetch all items from Notion database
export async function getAllItems(): Promise<NotionItem[]> {
  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
filter: {
        property: 'Status',
        select: {
          equals: 'Published'
        }
      },
      sorts: [
        {
          property: 'Created',
          direction: 'descending'
        }
      ]
    })

    return response.results.map((page: any) => {
      const properties = page.properties
      
      return {
        id: page.id,
        title: getTitle(properties.Title) || getTextFromRichText(properties.Name),
        description: getTextFromRichText(properties.Description),
        imageUrl: getImageUrl(properties['Image URL'] || properties.Image),
        category: getSelect(properties.Category) as 'Template' | 'Affiliate',
        link: getUrl(properties.Link),
        price: getSelect(properties.Price) || '$0'
      }
    }).filter(item => item.title) // Filter out items without titles
  } catch (error) {
    console.error('Error fetching Notion items:', error)
    return []
  }
}

// Fetch items by category
export async function getItemsByCategory(category: 'Template' | 'Affiliate'): Promise<NotionItem[]> {
  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        and: [
          {
property: 'Category',
            select: {
              equals: category
            }
          },
    {
property: 'Status',
        select: {
          equals: 'Published'
    }
  }
        ]
      },
      sorts: [
        {
          property: 'Created',
    direction: 'descending'
  }
      ]
    })

    return response.results.map((page: any) => {
      const properties = page.properties
      
      return {
        id: page.id,
        title: getTitle(properties.Title) || getTextFromRichText(properties.Name),
 description: getTextFromRichText(properties.Description),
        imageUrl: getImageUrl(properties['Image URL'] || properties.Image),
        category: getSelect(properties.Category) as 'Template' | 'Affiliate',
        link: getUrl(properties.Link),
price: getSelect(properties.Price) || '$0'
      }
    }).filter(item => item.title)
  } catch (error) {
    console.error('Error fetching items by category:', error)
    return []
  }
}
