'use client';
import React from 'react';
import Head from 'next/head';
import { Box, Typography } from '@mui/material';
import { useBlog } from '../../context/BlogProvider';
import BlogPreview from '@/components/blog/BlogPreview';

export default function BlogIndex() {
    const { posts, loading, error } = useBlog();

    return (
        <>
            <Head>
                {/* Primary Meta Tags */}
                <title>Blog | Alex Fischman</title>
                <meta
                    name="description"
                    content="Read the latest blog posts by Alex Fischman on software engineering, AI, technology, weather, and more."
                />

                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta
                    property="og:title"
                    content="Blog | Alex Fischman"
                />
                <meta
                    property="og:description"
                    content="Read the latest blog posts by Alex Fischman on software engineering, AI, technology, weather, and more."
                />
                <meta property="og:url" content="https://www.alexfischman.dev/blog" />
                <meta
                    property="og:image"
                    content="https://www.alexfischman.dev/og-image.png"
                />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@your_twitter_handle" />
                <meta
                    name="twitter:title"
                    content="Blog | Alex Fischman"
                />
                <meta
                    name="twitter:description"
                    content="Read the latest blog posts by Alex Fischman on software engineering, AI, technology, weather, and more."
                />
                <meta
                    name="twitter:image"
                    content="https://www.alexfischman.dev/og-image.png"
                />
            </Head>

            <Box sx={{ minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
                {loading ? (
                    <Typography>Loading...</Typography>
                ) : error ? (
                    <Typography color="error">{error}</Typography>
                ) : (
                    <>
                        <Typography variant="h3" gutterBottom>
                            Blog
                        </Typography>
                        {posts.map(post => (
                            <BlogPreview key={post.slug} post={post} />
                        ))}
                    </>
                )}
            </Box>
        </>
    );
}