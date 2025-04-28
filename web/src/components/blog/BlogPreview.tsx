import React from "react";
import Link from "next/link";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { Post } from "../../types/blog";

interface BlogPreviewProps {
  post: Post;
}

export default function BlogPreview({ post }: BlogPreviewProps) {
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
        <CardContent
          sx={{
            p: 3,
          }}
        >
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
            {post.title}
          </Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            gutterBottom
          >
            {new Date(post.date).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.5 }}>
            {post.description}
          </Typography>
          <Typography
            variant="button"
            sx={{ textTransform: "none", color: "primary.main" }}
          >
            Read More →
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}