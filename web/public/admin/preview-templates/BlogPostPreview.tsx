import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const BlogPostPreview = ({ entry, widgetFor }: any) => {
  const data = entry.getIn(['data']).toJS();
  const body = widgetFor('body');

  return (
    <Container sx={{ py: 6 }}>
      <Box sx={{ p: { xs: 3, md: 6 }, borderRadius: 3, bgcolor: 'background.paper' }}>
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: "bold" }}>
          {data.title || 'Untitled'}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          {new Date(data.date || new Date()).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Typography>
        {data.description && (
          <Typography variant="h5" paragraph sx={{ mt: 2 }}>
            {data.description}
          </Typography>
        )}
        <Box sx={{ 
          "& img": { maxWidth: "100%", height: "auto", borderRadius: 2 },
          "& pre": { overflowX: "auto" },
          "& p": { lineHeight: 1.7 }
        }}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {body}
          </ReactMarkdown>
        </Box>
      </Box>
    </Container>
  );
};

export default BlogPostPreview; 