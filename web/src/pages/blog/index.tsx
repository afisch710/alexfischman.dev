import React from "react";
import { Box, Typography } from "@mui/material";
import { useBlog } from "../../context/BlogProvider";
import BlogPreview from "@/components/blog/BlogPreview";

export default function BlogIndex() {
    const { posts, loading, error } = useBlog();

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Box sx={{ minHeight: "100%", display: "flex", flexDirection: "column" }}>
            <Typography variant="h3" gutterBottom>Blog</Typography>
            {posts.map(post => <BlogPreview key={post.slug} post={post} />)}
        </Box>
    );
}