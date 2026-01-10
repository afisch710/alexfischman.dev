import Head from 'next/head';
import React from 'react';

interface WebsiteStructuredDataProps {
  name: string;
  description: string;
  url: string;
  includeSearchAction?: boolean;
}

export default function WebsiteStructuredData({
  name,
  description,
  url,
  includeSearchAction = false
}: WebsiteStructuredDataProps) {
  const structuredData: any = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": name,
    "description": description,
    "url": url,
    "author": {
      "@type": "Person",
      "name": "Alex Fischman",
      "url": "https://www.alexfischman.dev"
    }
  };

  // Add sitelinks searchbox for homepage
  if (includeSearchAction) {
    structuredData.potentialAction = {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.google.com/search?q=site:alexfischman.dev+{search_term_string}"
      },
      "query-input": "required name=search_term_string"
    };
  }

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </Head>
  );
}
