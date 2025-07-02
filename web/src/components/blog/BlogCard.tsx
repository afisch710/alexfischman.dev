import React from "react";
import Link from "next/link";
import { Card, CardActionArea, CardContent, Typography, Box, Button } from "@mui/material";
import { Post } from "../../types/blog";

interface BlogCardProps {
  post: Post;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        maxWidth: 500,
        my: 2,
        boxShadow: 3,
        overflow: "hidden",
        backgroundColor: (theme) => theme.palette.background.paper,
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: 6,
        },
      }}
    >
      <CardActionArea component={Link} href={`/blog/${post.slug}`}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 900, fontSize: { xs: '1.5rem', md: '2.2rem' }, mb: 1 }}>
            {post.title}
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: 'text.primary', mb: 2 }}>
            {post.description}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
            <Typography variant="caption" color="text.secondary">
              {formatPublishTime(post.date)}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {post.tags.map((tag) => (
                <Box key={tag} sx={{ bgcolor: 'grey.100', px: 1.5, py: 0.5, borderRadius: 1, fontSize: '0.85rem', fontWeight: 500, color: 'text.secondary', display: 'inline-block' }}>{tag}</Box>
              ))}
            </Box>
          </Box>
          <Button variant="outlined" sx={{ textTransform: "none", color: "primary.main" }}>
            Read More →
          </Button>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

function formatPublishTime(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  if (diffHours < 24) {
    return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  } else {
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
}
