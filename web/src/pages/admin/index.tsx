// pages/admin/index.tsx
'use client'

import { useEffect } from 'react'
import dynamic from 'next/dynamic'

const AdminPageContent = () => {
  useEffect(() => {
    (async () => {
      const CMS = (await import('netlify-cms-app')).default
      const BlogPostPreview = (await import('../../components/admin/BlogPostPreview')).default
      CMS.registerPreviewTemplate('blog', BlogPostPreview)
      CMS.init()
    })()
  }, [])

  return <div id="nc-root" />
}

const AdminPage = dynamic(
  () => Promise.resolve(AdminPageContent),
  { ssr: false }
)

export default function Admin() {
  return <AdminPage />
}

// Skip static generation for this page
export const getStaticProps = () => {
  if (typeof window === 'undefined') {
    return { props: {} }
  }
  return { props: {} }
}