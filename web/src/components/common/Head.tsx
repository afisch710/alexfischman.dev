import Head from 'next/head';
import React from 'react';

interface HeadProps {
    title: string;
    description: string;
    ogImage?: string;
    ogUrl?: string;
    ogType?: string;
}

export default function CustomHead({
    title,
    description,
    ogImage = '/og-image.png', // Default OG image
    ogUrl = 'https://www.alexfischman.dev', // Default URL
    ogType = 'website', // Default OG type
}: HeadProps) {
    return (
        <Head>
            {/* Primary Meta Tags */}
            <title>{title}</title>
            <meta name="description" content={description} />

            {/* Open Graph */}
            <meta property="og:type" content={ogType} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={ogUrl} />
            <meta property="og:image" content={`https://www.alexfischman.dev/${ogImage}`} />

            {/* Twitter Card */}
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={`https://www.alexfischman.dev/${ogImage}`} />
        </Head>
    );
} 