import React, { useEffect } from 'react'

const AdminPageContent = () => {
  useEffect(() => {
    (async () => {
      const CMS = (await import('netlify-cms-app')).default
      const BlogPostPreview = (await import('./BlogPostPreview')).default
      
      // Register preview template
      CMS.registerPreviewTemplate('blog', BlogPostPreview)
      // Initialize CMS
      CMS.init()
    })()
  }, [])

  return <div id="nc-root" />
}

export default AdminPageContent 