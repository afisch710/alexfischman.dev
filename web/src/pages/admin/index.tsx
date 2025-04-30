// pages/admin/index.tsx
import React, { useEffect } from 'react';
import Head from 'next/head';

const AdminPage = () => {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/netlify-cms@^2.0.0/dist/netlify-cms.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/netlify-cms@^2.0.0/dist/netlify-cms.js';
    script.onload = () => {
      const cms = (window as any).CMS;
      cms.registerPreviewTemplate('blog', (window as any).BlogPostPreview);
      cms.init({ configPath: '/admin/config.yml' });
    };
    document.body.appendChild(script);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Admin | Content Manager</title>
      </Head>
      <div id="nc-root" />
    </>
  );
};

// Mark this page as not using the default layout
AdminPage.getLayout = (page: React.ReactNode) => page;

export default AdminPage;