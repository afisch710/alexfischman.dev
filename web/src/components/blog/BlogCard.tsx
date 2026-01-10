import React from "react";
import Link from "next/link";
import { Card, CardActionArea, CardContent, Typography, Box, Button } from "@mui/material";
import { Post } from "../../types/blog";
import TagClamp from "../common/TagClamp";
import { calculateReadingTime, formatReadingTime } from "@/lib/readingTime";

interface BlogCardProps {
  post: Post;
  fullWidth?: boolean;
}

export default function BlogCard({ post, fullWidth = false }: BlogCardProps) {
  const readingTime = calculateReadingTime(post.body);

  return (
    <Card
      sx={{
        borderRadius: 3,
        width: fullWidth ? '100%' : 'auto',
        height: fullWidth ? '100%' : 'auto',
        maxWidth: { xs: 500, md: fullWidth ? 'none' : 500 },
        my: 2,
        boxShadow: 3,
        overflow: "hidden",
        backgroundColor: (theme) => theme.palette.background.paper,
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: 6,
        },
        ...(fullWidth && {
          display: 'flex',
          flexDirection: 'column'
        })
      }}
    >
      <CardActionArea
        component={Link}
        href={`/blog/${post.slug}`}
        sx={fullWidth ? {
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        } : {}}
      >
        <CardContent sx={fullWidth ? {
          p: 3,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        } : { p: 3 }}>
          {fullWidth ? (
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 900, fontSize: { xs: '1.5rem', md: '2.2rem' }, mb: 1 }}>
                {post.title}
              </Typography>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: 'text.primary', mb: 2 }}>
                {post.description}
              </Typography>
              <Box sx={{ mb: 2 }}>
                <TagClamp tags={post.tags} maxLines={2} containerWidth={300} />
              </Box>
            </Box>
          ) : (
            <>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 900, fontSize: { xs: '1.5rem', md: '2.2rem' }, mb: 1 }}>
                {post.title}
              </Typography>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: 'text.primary', mb: 2 }}>
                {post.description}
              </Typography>
              <Box sx={{ mb: 2 }}>
                <TagClamp tags={post.tags} maxLines={2} containerWidth={400} />
              </Box>
            </>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: fullWidth ? 'auto' : 0 }}>
            <Button 
              variant="outlined" 
              sx={{ 
                textTransform: "none", 
                color: "primary.main",
                fontWeight: 600
              }}
            >
              {formatReadingTime(readingTime)} →
            </Button>
            <Typography variant="caption" color="text.secondary">
              {formatPublishTime(post.date)}
            </Typography>
          </Box>
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
  if (diffHours < 1) {
    return "less than one hour ago";
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  } else {
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
}
