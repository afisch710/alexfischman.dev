import React from 'react';
import Link from 'next/link';
import { Container, Typography, Button, Box, Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Head from '../components/common/Head';

export default function Custom404() {
  return (
    <>
      <Head
        title="Page Not Found - Alex Fischman"
        description="The page you're looking for doesn't exist."
      />
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Paper elevation={3} sx={{ p: { xs: 4, md: 8 }, borderRadius: 3, textAlign: 'center' }}>
          <Typography
            variant="h1"
            component="h1"
            sx={{ 
              fontSize: { xs: '4rem', md: '6rem' },
              fontWeight: 900,
              color: 'primary.main',
              mb: 2
            }}
          >
            404
          </Typography>
          
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ fontWeight: 700, mb: 2 }}
          >
            Page Not Found
          </Typography>
          
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 4, fontSize: '1.1rem', lineHeight: 1.6 }}
          >
            The page you're looking for doesn't exist. It might have been moved, deleted, 
            or you entered the wrong URL.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              component={Link}
              href="/"
              variant="contained"
              size="large"
              startIcon={<HomeIcon />}
              sx={{ textTransform: 'none' }}
            >
              Go Home
            </Button>
            
            <Button
              onClick={() => window.history.back()}
              variant="outlined"
              size="large"
              startIcon={<ArrowBackIcon />}
              sx={{ textTransform: 'none' }}
            >
              Go Back
            </Button>
          </Box>
          
          <Box sx={{ mt: 4, pt: 4, borderTop: 1, borderColor: 'divider' }}>
            <Typography variant="body2" color="text.secondary">
              Looking for something specific? Try navigating from the{' '}
              <Link href="/" style={{ color: 'inherit' }}>
                homepage
              </Link>
              {' '}or check out my{' '}
              <Link href="/blog" style={{ color: 'inherit' }}>
                blog
              </Link>
              {' '}and{' '}
              <Link href="/experience" style={{ color: 'inherit' }}>
                experience
              </Link>
              .
            </Typography>
          </Box>
        </Paper>
      </Container>
    </>
  );
} 