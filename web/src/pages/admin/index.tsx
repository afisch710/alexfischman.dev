// pages/admin/index.tsx
import React, { useEffect } from 'react';
import Head from 'next/head';

const AdminPage = () => {
  useEffect(() => {
    (window as any).CMS_MANUAL_INIT = true;

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/netlify-cms@^2.0.0/dist/netlify-cms.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/netlify-cms@^2.0.0/dist/netlify-cms.js';
    script.onload = () => {
      const cms = (window as any).CMS;
      cms.registerPreviewTemplate('blog', (window as any).BlogPostPreview);
      cms.init();
    };
    document.body.appendChild(script);

    return () => {
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Admin | Content Manager</title>
        <link rel="cms-config-url" href="/admin/config.yml" type="text/yaml" />
      </Head>
      <div id="nc-root" />
    </>
  );
};

// Mark this page as not using the default layout
AdminPage.getLayout = (page: React.ReactNode) => page;

export default AdminPage;