'use client';
import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import { Box, Typography, Container, Button, Fade, Zoom, TypographyProps, SxProps, Theme, alpha } from '@mui/material';
import Grid from '@mui/material/Grid2';
import NextLink from 'next/link';
import { GetStaticProps } from 'next';
import type { Post } from "../types/blog";
import BlogPreview from "../components/blog/BlogPreview";
import type { Experience } from '@/types/experience';
import experiencesData from '@/data/experience.json';
import ExperienceCard from '@/components/experience/ExperienceCard';
import postsData from '@/data/posts.json';
import GithubProfile from '@/components/github/GithubProfile';

// Track if intro has played in this SPA session
let introPlayedInApp = false;

// StreamingText component for typing effect
function StreamingText({
    text,
    variant = 'body1',
    component,
    gutterBottom,
    startDelay = 0,
    sx,
    onComplete,
    showCursor = true,
    charDelay = 50,
    skip = false,
    ...props
}: {
    text: string;
    variant?: TypographyProps['variant'];
    component: React.ElementType;
    gutterBottom?: boolean;
    startDelay?: number;
    sx?: SxProps<Theme>;
    onComplete?: () => void;
    showCursor?: boolean;
    charDelay?: number;
    skip?: boolean;
}) {
    const [displayed, setDisplayed] = React.useState('');

    useEffect(() => {
        if (skip) {
            setDisplayed(text);
            onComplete?.();
            return;
        }
        setDisplayed('');
        const timeouts: NodeJS.Timeout[] = [];
        const initialDelay = startDelay;
        const totalChars = text.length;

        for (let i = 0; i < totalChars; i++) {
            timeouts.push(
                setTimeout(() => {
                    setDisplayed(prev => prev + text[i]);
                }, initialDelay + i * charDelay)
            );
        }
        timeouts.push(
            setTimeout(() => {
                onComplete?.();
            }, initialDelay + totalChars * charDelay)
        );

        return () => timeouts.forEach(clearTimeout);
    }, [text, startDelay, charDelay, skip, onComplete]);

    return (
        <Typography variant={variant} component={component} gutterBottom={gutterBottom} sx={sx} {...props}>
            {displayed}
            {showCursor && <span className="cursor">|</span>}
        </Typography>
    );
}

export default function Home({
  featured,
  experiences,
}: { featured: Post; experiences: Experience[] }) {
    const [firstDone, setFirstDone] = useState(false);
    const [secondDone, setSecondDone] = useState(false);
    const [highlightsVisible, setHighlightsVisible] = useState(false);
    const [blogVisible, setBlogVisible] = useState(false);
    const [githubVisible, setGithubVisible] = useState(false);
    const [skipped, setSkipped] = useState(false);

    const firstText = "Hi, I'm Alex Fischman.\nA senior software engineer and founder of Smarter Weather.";

    // Memoize onComplete handlers so they don't change identity each render
    const handleFirstDone = useCallback(() => {
        setFirstDone(true);
    }, []);

    const handleSecondDone = useCallback(() => {
        setSecondDone(true);
    }, []);

    const skipAll = () => {
        setSkipped(true);
        setFirstDone(true);
        setSecondDone(true);
        setHighlightsVisible(true);
        setBlogVisible(true);
        introPlayedInApp = true;
    };

    const skipBtnRef = React.useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!skipped && !highlightsVisible) {
            skipBtnRef.current?.focus();
        }
    }, [skipped, highlightsVisible]);

    // On mount, skip animation if intro already played in this SPA session
    useEffect(() => {
        if (introPlayedInApp) {
            skipAll();
        }
    }, []);


    return (
        <>
            <Head>
                {/* Primary Meta Tags */}
                <title>Alex Fischman | Senior Software Engineer & Founder</title>
                <meta name="description" content="Blog, experience, and about me." />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Alex Fischman | Senior Software Engineer & Founder" />
                <meta property="og:description" content="Blog, experience, and about me." />
                <meta property="og:url" content="https://www.alexfischman.dev/" />
                <meta property="og:image" content="https://www.alexfischman.dev/af_dark.png" />

                {/* Twitter */}
                <meta name="twitter:title" content="Alex Fischman | Senior Software Engineer & Founder" />
                <meta name="twitter:description" content="Blog, experience, and about me." />
                <meta name="twitter:image" content="https://www.alexfischman.dev/af_dark.png" />
            </Head>

            <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
                {/* Global CSS for animations */}
                <style>{`
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(10px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
          .cursor {
            display: inline-block;
            animation: blink 1s step-end infinite;
          }
        `}</style>

                {/* Hero Section with StreamingText */}
                <Box sx={{ 
                    position: 'relative', 
                    textAlign: 'center', 
                }}>
                    <Fade in={secondDone} timeout={500}>
                        <Box sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            bgcolor: 'background.paper',
                            borderRadius: 4,
                            boxShadow: (theme) => `0 4px 20px ${alpha(theme.palette.common.black, 0.1)}`,
                            zIndex: -1,
                        }} />
                    </Fade>
                    <Box sx={{
                        py: { xs: 3, md: 4 },
                        px: { xs: 2, md: 4 },
                        mb: { xs: 4, md: 6 },
                    }}>
                        <StreamingText
                            text={firstText}
                            component="div"
                            gutterBottom
                            sx={{
                                typography: { xs: 'h4', md: 'h2' },
                                maxWidth: { xs: '100%', md: '85%' },
                                mx: 'auto',
                                fontWeight: 700,
                                mb: { xs: 2, md: 3 },
                                color: 'text.primary',
                                letterSpacing: '-0.02em',
                                lineHeight: { xs: 1.2, md: 1.2 },
                                fontSize: { xs: '1.5rem', md: 'h2.fontSize' },
                                '& br': {
                                    display: 'block',
                                    content: '""',
                                    marginTop: { xs: 0.5, md: 2 },
                                },
                                whiteSpace: 'pre-line',
                            }}
                            showCursor={!firstDone}
                            onComplete={handleFirstDone}
                            skip={skipped}
                        />
                        {firstDone && (
                            <StreamingText
                                text="After 10 years at Microsoft building products used by millions, I now focus on creating elegant, high-performance software that blends big data, real-time visuals, and AI to reinvent how we experience weather. While I'm focused on my own venture, I'm also open to opportunities where I can help build something impactful."
                                variant="subtitle1"
                                component="p"
                                gutterBottom
                                charDelay={30}
                                sx={{
                                    maxWidth: { xs: '95%', md: '75%' },
                                    mx: 'auto',
                                    color: 'text.secondary',
                                    lineHeight: { xs: 1.5, md: 1.6 },
                                    fontSize: { xs: '0.875rem', md: '1.25rem' },
                                    mb: { xs: 2, md: 3 },
                                    letterSpacing: '0.01em',
                                }}
                                showCursor={!secondDone}
                                onComplete={handleSecondDone}
                                skip={skipped}
                            />
                        )}
                        {!skipped && !highlightsVisible && (
                            <Box
                                sx={{
                                    position: 'fixed',
                                    bottom: '25%',
                                    left: 0,
                                    right: 0,
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    zIndex: 1000,
                                }}
                            >
                                <Button
                                    ref={skipBtnRef}
                                    autoFocus={false}
                                    variant="contained"
                                    color="secondary"
                                    onClick={skipAll}
                                    sx={{
                                        animation: 'pulse 2s ease-in-out infinite',
                                        borderRadius: 2,
                                        px: { xs: 2, md: 4 },
                                        py: { xs: 0.75, md: 1.5 },
                                        fontSize: { xs: '0.8125rem', md: '1rem' },
                                        fontWeight: 600,
                                        minWidth: { xs: 'auto', md: '140px' },
                                    }}
                                >
                                    Skip Intro
                                </Button>
                            </Box>
                        )}
                        <Zoom
                            in={secondDone}
                            timeout={500}
                            style={{ transitionDelay: secondDone ? '200ms' : '0ms' }}
                            unmountOnExit
                            onEntered={() => setHighlightsVisible(true)}
                        >
                            <Box sx={{ mt: { xs: 3, md: 6 }, textAlign: 'center' }}>
                                <Button 
                                    component={NextLink} 
                                    href="/about" 
                                    variant="outlined" 
                                    color="primary"
                                    sx={{
                                        px: { xs: 2, md: 4 },
                                        py: { xs: 0.75, md: 1.5 },
                                        fontSize: { xs: '0.8125rem', md: '1rem' },
                                        fontWeight: 600,
                                        borderRadius: 2,
                                        minWidth: { xs: 'auto', md: '140px' },
                                        boxShadow: (theme) => `0 4px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
                                        '&:hover': {
                                            transform: 'translateY(-2px)',
                                            boxShadow: (theme) => `0 6px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
                                        },
                                        transition: 'all 0.3s ease',
                                    }}
                                >
                                    Learn More
                                </Button>
                            </Box>
                        </Zoom>
                    </Box>
                </Box>

                {/* Highlights Section */}
                <Fade in={highlightsVisible} timeout={500} onEntered={() => setBlogVisible(true)} unmountOnExit>
                    <Box sx={{ mb: { xs: 4, md: 5 } }}>
                        <Typography 
                            variant="h4" 
                            component="h2" 
                            gutterBottom 
                            sx={{ 
                                textAlign: { xs: 'center', md: 'left' },
                                fontWeight: 600,
                                mb: 2,
                                color: 'text.primary',
                            }}
                        >
                            Highlights
                        </Typography>
                        <Grid container spacing={2} alignItems="stretch">
                            {experiences.slice(0, 3).map((exp, index) => (
                                <Grid size={{ xs: 12, md: 4 }} key={index}>
                                    <ExperienceCard experience={exp} />
                                </Grid>
                            ))}
                        </Grid>
                        <Button component={NextLink} href="/experience" variant="outlined" color="primary" sx={{ mt: 3 }}>
                            See More
                        </Button>
                    </Box>
                </Fade>

                {/* Featured Blog Post Section */}
                <Fade in={blogVisible} timeout={500} unmountOnExit onEntered={() => { 
                    introPlayedInApp = true; 
                    setGithubVisible(true);
                }}>
                    <Box sx={{ mb: { xs: 4, md: 5 } }}>
                        <Typography 
                            variant="h4" 
                            component="h2" 
                            gutterBottom 
                            sx={{ 
                                textAlign: { xs: 'center', md: 'left' },
                                fontWeight: 600,
                                mb: 3,
                                color: 'text.primary',
                            }}
                        >
                            Featured Blog Post
                        </Typography>
                        <BlogPreview post={featured} />
                    </Box>
                </Fade>

                {/* GitHub Activity Section */}
                <Fade in={githubVisible} timeout={500} unmountOnExit>
                    <Box sx={{ mb: { xs: 4, md: 5 } }}>
                        <Typography 
                            variant="h4" 
                            component="h2" 
                            gutterBottom 
                            sx={{ 
                                textAlign: { xs: 'center', md: 'left' },
                                fontWeight: 600,
                                mb: 3,
                                color: 'text.primary',
                            }}
                        >
                            Activity
                        </Typography>
                        <GithubProfile username="alexfischman" />
                    </Box>
                </Fade>
            </Container>
        </>
    );
}
export const getStaticProps: GetStaticProps<{ featured: Post; experiences: Experience[] }> = async () => {
  const posts: Post[] = postsData;
  const experiences: Experience[] = [...experiencesData].sort((a, b) => a.priority - b.priority);
  return { props: { featured: posts[0], experiences } };
};