'use client'

import { Suspense } from 'react'
import { PostHogPageViewInner } from './PostHogPageViewInner'

export default function PostHogPageView() {
  return (
    <Suspense fallback={null}>
      <PostHogPageViewInner />
    </Suspense>
  )
}
