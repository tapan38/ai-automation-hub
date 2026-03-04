'use client'

import Image from 'next/image'
import { useState } from 'react'

type Category = 'Template' | 'Affiliate' | 'App' | 'Knowledge'

interface CardProps {
  title: string
  description: string
  imageUrl: string
  price: string
  link: string
  category: Category
}

export default function Card({ title, description, imageUrl, price, link, category }: CardProps) {
  const [imageError, setImageError] = useState(false)

  // Fallback image
  const displayImage = imageError || !imageUrl 
    ? 'https://via.placeholder.com/400x300/FDFBF7/1A1A1A?text=AI+Template' 
    : imageUrl

  const isFree = price === '$0' || price === 'Free' || price === '' || !price
  
  // Determine button text and behavior based on category
  const getButtonConfig = () => {
    switch (category) {
      case 'App':
        return {
          text: 'View App',
          href: link,
          isGumroad: false,
          target: '_blank'
        }
      case 'Template':
      case 'Knowledge':
        return {
          text: isFree ? 'Get it Free' : price,
          href: link,
          isGumroad: true,
          target: '_self'
        }
      case 'Affiliate':
      default:
        return {
          text: 'Learn More',
          href: link,
          isGumroad: false,
          target: '_blank'
        }
    }
  }

  const buttonConfig = getButtonConfig()

  return (
    <div className="card group flex flex-col h-full">
      {/* Image Container */}
      <div className="relative aspect-[4/3] mb-4 overflow-hidden rounded-lg bg-soft-cream">
        <Image
          src={displayImage}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          onError={() => setImageError(true)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Price Tag - only show for paid items (not App, not Free) */}
        {!isFree && category !== 'App' && category !== 'Knowledge' && (
          <div className="absolute top-3 right-3">
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-deep-charcoal text-white">
              {price}
            </span>
          </div>
        )}
      </div>

      {/* Content - flex-grow to push button to bottom */}
      <div className="flex flex-col flex-grow space-y-3">
        <h3 className="text-lg font-semibold text-deep-charcoal line-clamp-2">
          {title}
        </h3>
        
        <p className="text-warm-gray text-sm line-clamp-3 leading-relaxed flex-grow">
          {description}
        </p>

        {/* CTA Button - minimalist dark style, always at bottom */}
        <a
          href={buttonConfig.href || '#'}
          target={buttonConfig.target}
          rel={buttonConfig.target === '_blank' ? 'noopener noreferrer' : undefined}
          className="inline-flex items-center justify-center w-full px-4 py-3 bg-deep-charcoal text-white rounded-lg text-sm font-medium hover:bg-opacity-90 transition-all duration-200 mt-auto"
          data-gumroad={buttonConfig.isGumroad ? 'true' : undefined}
        >
          {buttonConfig.text}
        </a>
      </div>
    </div>
  )
}

// Loading skeleton for cards
export function CardSkeleton() {
  return (
    <div className="card flex flex-col h-full">
      <div className="aspect-[4/3] mb-4 rounded-lg bg-soft-cream animate-pulse" />
      <div className="flex flex-col flex-grow space-y-3">
        <div className="h-6 bg-soft-cream rounded w-3/4 animate-pulse" />
        <div className="h-4 bg-soft-cream rounded w-full animate-pulse" />
        <div className="h-4 bg-soft-cream rounded w-2/3 animate-pulse" />
        <div className="h-12 bg-soft-cream rounded mt-auto animate-pulse" />
      </div>
    </div>
  )
}
