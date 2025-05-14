'use client';
import React from 'react';
import { Box, Typography } from '@mui/material';
import { GetStaticProps } from 'next';
import type { Post } from '../../types/blog';
import postsData from '../../data/posts.json';
import BlogCard from '@/components/blog/BlogCard';
import CustomHead from '@/components/common/Head';

export default function BlogIndex({ posts }: { posts: Post[] }) {
    return (
        <>
            <CustomHead
                title="Blog | Alex Fischman"
                description="Read the latest blog posts by Alex Fischman on software engineering, AI, technology, weather, and more."
                ogImage="af_dark.png"
                ogUrl="https://www.alexfischman.dev/blog"
            />
            <Box sx={{ minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
                <>
                    {posts.map(post => (
                        <BlogCard key={post.slug} post={post} />
                    ))}
                </>
            </Box>
        </>
    );
}

export const getStaticProps: GetStaticProps<{ posts: Post[] }> = async () => {
    const posts: Post[] = postsData;
    return { props: { posts } };
};