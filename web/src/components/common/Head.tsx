import Head from 'next/head';
import React from 'react';

interface HeadProps {
    title: string;
    description: string;
    ogImage?: string;
    ogUrl?: string;
    ogType?: string;
    canonical?: string;
    keywords?: string;
    author?: string;
}

export default function CustomHead({
    title,
    description,
    ogImage = '/af_dark.png', // Default OG image
    ogUrl = 'https://www.alexfischman.dev', // Default URL
    ogType = 'website', // Default OG type
    canonical,
    keywords = 'Alex Fischman, software engineer, senior developer, Microsoft, Smarter Weather, weather technology, full stack development, product development',
    author = 'Alex Fischman',
}: HeadProps) {
    const fullCanonical = canonical ? `https://www.alexfischman.dev${canonical}` : ogUrl;
    
    return (
        <Head>
            {/* Primary Meta Tags */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content={author} />
            <meta name="robots" content="index, follow" />
            <meta name="googlebot" content="index, follow" />
            
            {/* Canonical URL */}
            <link rel="canonical" href={fullCanonical} />

            {/* Open Graph */}
            <meta property="og:type" content={ogType} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={ogUrl} />
            <meta property="og:image" content={`https://www.alexfischman.dev${ogImage}`} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:site_name" content="Alex Fischman" />
            <meta property="og:locale" content="en_US" />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={`https://www.alexfischman.dev${ogImage}`} />
            <meta name="twitter:creator" content="@afisch710" />
            <meta name="twitter:site" content="@afisch710" />

            {/* Additional SEO Meta Tags */}
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#1976d2" />
            <meta name="msapplication-TileColor" content="#1976d2" />
            
            {/* Favicon */}
            <link rel="icon" href="/af.ico" />
            <link rel="apple-touch-icon" href="/af_large.png" />
            <link rel="manifest" href="/manifest.json" />
            
            {/* Preconnect to external domains for performance */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            
            {/* RSS Feed */}
            <link rel="alternate" type="application/rss+xml" title="Alex Fischman Blog" href="/rss.xml" />
        </Head>
    );
} 