import React from 'react';
import Head from 'next/head';

interface PersonStructuredDataProps {
  name: string;
  jobTitle: string;
  description: string;
  url: string;
  image: string;
  sameAs?: string[];
  worksFor?: {
    name: string;
    url: string;
  }[];
  knowsAbout?: string[];
}

export default function PersonStructuredData({
  name,
  jobTitle,
  description,
  url,
  image,
  sameAs = [],
  worksFor = [],
  knowsAbout = []
}: PersonStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": name,
    "jobTitle": jobTitle,
    "description": description,
    "url": url,
    "image": `https://www.alexfischman.dev${image}`,
    "sameAs": sameAs,
    "worksFor": worksFor.map(org => ({
      "@type": "Organization",
      "name": org.name,
      "url": org.url
    })),
    "knowsAbout": knowsAbout,
    "alumniOf": {
      "@type": "Organization",
      "name": "Microsoft",
      "url": "https://www.microsoft.com"
    }
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </Head>
  );
}

interface WebsiteStructuredDataProps {
  name: string;
  description: string;
  url: string;
  author: {
    name: string;
    url: string;
  };
}

export function WebsiteStructuredData({
  name,
  description,
  url,
  author
}: WebsiteStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": name,
    "description": description,
    "url": url,
    "author": {
      "@type": "Person",
      "name": author.name,
      "url": author.url
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.alexfischman.dev/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </Head>
  );
} 