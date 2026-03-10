'use client'

import posthog from 'posthog-js'
import { useEffect } from 'react'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Only init on client side
    if (typeof window !== 'undefined') {
      posthog.init('phc_xJaSmlwnJSGRwUr5MFFLpda8xhjODSTr8QNzP47M0WG', {
        api_host: 'https://us.i.posthog.com',
        capture_pageview: false,
        loaded: (posthog) => {
          if (process.env.NODE_ENV === 'development') posthog.debug()
        }
      })
    }
  }, [])

  return <>{children}</>
}

export default PostHogProvider
