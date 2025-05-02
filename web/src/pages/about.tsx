"use client";
import React from 'react';
import Head from 'next/head';
import { Box, Typography, Container, Link, Paper } from '@mui/material';
import Grid from '@mui/material/Grid2';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import aboutData from '@/data/about.json';
// Keep the import but don't use it for now
// import GithubProfile from '@/components/github/GithubProfile';

export default function About() {
    // Removed unused theme variable

    return (
        <>
            <Head>
                {/* Primary Meta Tags */}
                <title>{aboutData.title}</title>
                <meta
                    name="description"
                    content={aboutData.description}
                />

                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta
                    property="og:title"
                    content={aboutData.title}
                />
                <meta
                    property="og:description"
                    content={aboutData.description}
                />
                <meta
                    property="og:url"
                    content="https://www.alexfischman.dev/about"
                />
                <meta
                    property="og:image"
                    content={`https://www.alexfischman.dev/${aboutData.ogImage}`}
                />

                {/* Twitter Card */}
                <meta
                    name="twitter:title"
                    content={aboutData.title}
                />
                <meta
                    name="twitter:description"
                    content={aboutData.description}
                />
                <meta
                    name="twitter:image"
                    content={`https://www.alexfischman.dev/${aboutData.ogImage}`}
                />
            </Head>
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Paper
                    elevation={3}
                    sx={{
                        p: { xs: 3, md: 6 },
                        borderRadius: 3,
                        bgcolor: 'background.paper',
                    }}
                >
                    <Grid container spacing={4} alignItems="center">
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Box
                                component="img"
                                src="/af.svg"
                                alt="Alex Fischman"
                                sx={{
                                    width: { xs: 120, md: 200 },
                                    height: { xs: 120, md: 200 },
                                    borderRadius: '50%',
                                    display: 'block',
                                    mx: { xs: 'auto', md: 0 },
                                }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 8 }}>
                            <Typography variant="h4" component="h1" gutterBottom>
                                Alex Fischman
                            </Typography>
                            {aboutData.content.map((paragraph, index) => (
                                <Typography key={index} variant="body1" paragraph>
                                    {paragraph}
                                </Typography>
                            ))}
                            <Box
                                sx={{
                                    mt: 2,
                                    display: 'flex',
                                    flexDirection: { xs: 'column', sm: 'row' },
                                    gap: 2,
                                    alignItems: 'center',
                                    justifyContent: { xs: 'center', md: 'flex-start' },
                                }}
                            >
                                <Link
                                    href={`mailto:${aboutData.contact.email}`}
                                    sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}
                                >
                                    <EmailIcon fontSize="small" />
                                    {aboutData.contact.email}
                                </Link>
                                <Link
                                    href={aboutData.contact.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}
                                >
                                    <LinkedInIcon fontSize="small" />
                                    afischman710
                                </Link>
                                <Link
                                    href={aboutData.contact.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}
                                >
                                    <GitHubIcon fontSize="small" />
                                    afisch710
                                </Link>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>

                {/* GitHub profile section removed for now, will be refactored later */}
            </Container>
        </>
    );
};