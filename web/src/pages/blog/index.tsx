'use client';
import React from 'react';
import { Box, Grid } from '@mui/material';
import { GetStaticProps } from 'next';
import type { Post } from '../../types/blog';
import postsData from '../../data/posts.json';
import BlogCard from '@/components/blog/BlogCard';
import CustomHead from '@/components/common/Head';

export default function BlogIndex({ posts }: { posts: Post[] }) {
    return (
        <>
            <CustomHead
                title="Blog | Alex Fischman – Founder & Senior Software Engineer"
                description="Read the latest blog posts by Alex Fischman on software engineering, AI, technology, weather, and more."
                ogImage="/af_dark.png"
                ogUrl="https://www.alexfischman.dev/blog"
                keywords="Alex Fischman, blog, software engineering, AI, weather technology, web development"
            />
            <Box sx={{ minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
                <Grid container spacing={3} sx={{ p: { xs: 1, sm: 2, md: 3 }, alignItems: 'stretch' }}>
                    {posts
                        .filter(post => !post.draft)
                        .map(post => (
                            <Grid 
                                item 
                                xs={12} 
                                sm={12} 
                                md={6} 
                                lg={4} 
                                xl={4}
                                key={post.slug}
                                sx={{ 
                                    display: 'flex', 
                                    justifyContent: 'center'
                                }}
                            >
                                <BlogCard post={post} fullWidth />
                            </Grid>
                        ))}
                </Grid>
            </Box>
        </>
    );
}

export const getStaticProps: GetStaticProps<{ posts: Post[] }> = async () => {
    const posts: Post[] = postsData;
    return { props: { posts } };
};