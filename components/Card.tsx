'use client'

import Image from 'next/image'
import { useState } from 'react'

interface CardProps {
  title: string
  description: string
  imageUrl: string
  price: string
  link: string
  category: 'Template' | 'Affiliate'
}

export default function Card({ title, description, imageUrl, price, link, category }: CardProps) {
  const [imageError, setImageError] = useState(false)
  
  // Fallback image
  const displayImage = imageError || !imageUrl 
    ? 'https://via.placeholder.com/400x300/FDFBF7/1A1A1A?text=AI+Template' 
    : imageUrl

  const isFree = price === '$0' || price === 'Free'
  const buttonText = category === 'Template' ? 'Get it on Gumroad' : 'Learn More'

  return (
    <div className="card group">
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
        {/* Price Tag */}
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            isFree 
              ? 'bg-green-100 text-green-800' 
              : 'bg-deep-charcoal text-white'
          }`}>
            {isFree ? 'Free' : price}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-deep-charcoal line-clamp-2">
          {title}
        </h3>
        
        <p className="text-warm-gray text-sm line-clamp-3 leading-relaxed">
        {description}
      </p>

      {/* Button */}
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-full btn-outline text-sm group/btn"
        >
          {buttonText}
          <svg 
            className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
    </a>
      </div>
    </div>
  )
}

// Loading skeleton for cards
export function CardSkeleton() {
  return (
    <div className="card animate-pulse">
      <div className="aspect-[4/3] mb-4 rounded-lg bg-soft-cream" />
      <div className="space-y-3">
        <div className="h-6 bg-soft-cream rounded w-3/4" />
  <div className="h-4 bg-soft-cream rounded w-full" />
        <div className="h-4 bg-soft-cream rounded w-2/3" />
        <div className="h-10 bg-soft-cream rounded" />
      </div>
</div>
  )
}
