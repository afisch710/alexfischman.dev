"use client";
import React from 'react';
import Head from 'next/head';
import { Box, Typography, Container, Link, Paper } from '@mui/material';
import Grid from '@mui/material/Grid2';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
// Keep the import but don't use it for now
// import GithubProfile from '@/components/github/GithubProfile';

export default function About() {
    // Removed unused theme variable

    return (
        <>
            <Head>
                {/* Primary Meta Tags */}
                <title>Experience | Alex Fischman</title>
                <meta
                    name="description"
                    content="Learn more about Alex Fischman."
                />

                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta
                    property="og:title"
                    content="About | Alex Fischman"
                />
                <meta
                    property="og:description"
                    content="Learn more about Alex Fischman."
                />
                <meta
                    property="og:url"
                    content="https://www.alexfischman.dev/experience"
                />
                <meta
                    property="og:image"
                    content="https://www.alexfischman.dev/af_dark.png"
                />

                {/* Twitter Card */}
                <meta
                    name="twitter:title"
                    content="About | Alex Fischman"
                />
                <meta
                    name="twitter:description"
                    content="Learn more about Alex Fischman."
                />
                <meta
                    name="twitter:image"
                    content="https://www.alexfischman.dev/af_dark.png"
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
                            <Typography variant="body1" paragraph>
                                I&apos;m a Senior Software Engineer with over a decade of experience at Microsoft, where I led the development of cross-device connectivity features (calling, messaging, notifications) used by millions. My work spans full-stack development, cloud architecture, and real-time data visualization.
                            </Typography>
                            <Typography variant="body1" paragraph>
                                Outside of work, I&apos;m the founder of Smarter Weather LLC, passionate about building innovative weather applications with AI and GPU acceleration. I&apos;m also an avid weather enthusiast, coffee aficionado, and enjoy hiking, photography, and exploring new technologies.
                            </Typography>
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
                                    href="mailto:afischman710@gmail.com"
                                    sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}
                                >
                                    <EmailIcon fontSize="small" />
                                    afischman710@gmail.com
                                </Link>
                                <Link
                                    href="https://www.linkedin.com/in/afischman710"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}
                                >
                                    <LinkedInIcon fontSize="small" />
                                    afischman710
                                </Link>
                                <Link
                                    href="https://github.com/afisch710"
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