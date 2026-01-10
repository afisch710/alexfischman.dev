import Head from 'next/head';
import React from 'react';

interface ArticleStructuredDataProps {
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  author: {
    name: string;
    url: string;
  };
  image: string;
  url: string;
  keywords?: string[];
}

export default function ArticleStructuredData({
  headline,
  description,
  datePublished,
  dateModified,
  author,
  image,
  url,
  keywords = []
}: ArticleStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": headline,
    "description": description,
    "image": `https://www.alexfischman.dev${image}`,
    "datePublished": datePublished,
    "dateModified": dateModified || datePublished,
    "author": {
      "@type": "Person",
      "name": author.name,
      "url": author.url,
      "sameAs": [
        "https://github.com/afisch710",
        "https://linkedin.com/in/afischman710"
      ]
    },
    "publisher": {
      "@type": "Person",
      "name": "Alex Fischman",
      "url": "https://www.alexfischman.dev",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.alexfischman.dev/af_dark.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "keywords": keywords.join(', '),
    "articleSection": "Technology",
    "inLanguage": "en-US"
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
