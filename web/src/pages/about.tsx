"use client";
import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Link, Paper, Stack, Chip, useTheme, useMediaQuery, Fade, Zoom } from '@mui/material';
import { alpha } from '@mui/material';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid2';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import Image from 'next/image';
import aboutData from '@/data/about.json';
import CustomHead from '@/components/common/Head';
// Keep the import but don't use it for now
// import GithubProfile from '@/components/github/GithubProfile';

export default function About() {
    const [professional, personal] = aboutData.content;

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [showHeader, setShowHeader] = useState(false);
    const [showContacts, setShowContacts] = useState(false);
    const [showParagraphs, setShowParagraphs] = useState(false);

    useEffect(() => {
      setShowHeader(true);
      const contactsTimer = setTimeout(() => setShowContacts(true), 200);
      const paragraphsTimer = setTimeout(() => setShowParagraphs(true), 400);
      return () => {
        clearTimeout(contactsTimer);
        clearTimeout(paragraphsTimer);
      };
    }, []);

    return (
        <>
            <CustomHead
                title={aboutData.title}
                description={aboutData.description}
                ogImage={aboutData.ogImage}
                ogUrl="https://www.alexfischman.dev/about"
                keywords="Alex Fischman, about, software engineer, Microsoft, Smarter Weather, University of Iowa"
            />
            <Container maxWidth="lg" sx={{ p: 0 }}>
                <Paper
                    elevation={3}
                    sx={{
                        p: { xs: 3, md: 6 },
                        borderRadius: 3,
                        bgcolor: 'background.paper',
                    }}
                >
                    <Fade in={showHeader} timeout={500}>
                      {isMobile ? (
                        // Mobile layout
                        <Stack direction="column" spacing={2} alignItems="flex-start" sx={{ mb: 2 }}>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Box
                                    sx={{
                                        width: 140,
                                        height: 140,
                                        borderRadius: '50%',
                                        overflow: 'hidden',
                                        position: 'relative'
                                    }}
                                >
                                    <Image
                                        src="/headshot.JPG"
                                        alt="Alex Fischman"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        sizes="140px"
                                        priority
                                    />
                                </Box>
                                <Stack direction="column" spacing={1}>
                                    <Typography variant="h5" sx={{ pl: 1 }}>Alex Fischman</Typography>
                                    <Chip label="Founder, Smarter Weather LLC" color="primary" variant="outlined" size="small" />
                                    <Chip label="Senior Software Engineer" color="primary" variant="outlined" size="small" />
                                    <Zoom in={showContacts} timeout={500} style={{ transitionDelay: '200ms' }}>
                                      <Stack direction="row" justifyContent="flex-start" gap={4} sx={{ width: '100%', pl: 1 }}>
                                          <Link
                                              href={`mailto:${aboutData.contact.email}`}
                                              sx={{ '&:hover': { color: 'primary.dark' } }}
                                          >
                                              <EmailIcon fontSize="medium" />
                                          </Link>
                                          <Link
                                              href={aboutData.contact.linkedin}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              sx={{ '&:hover': { color: 'primary.dark' } }}
                                          >
                                              <LinkedInIcon fontSize="medium" />
                                          </Link>
                                          <Link
                                              href={aboutData.contact.github}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              sx={{ '&:hover': { color: 'primary.dark' } }}
                                          >
                                              <GitHubIcon fontSize="medium" />
                                          </Link>
                                      </Stack>
                                    </Zoom>
                                </Stack>
                            </Stack>
                        </Stack>
                      ) : (
                        // Desktop layout
                        <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ mb: 4 }}>
                            <Box
                                sx={{
                                    width: 120,
                                    height: 120,
                                    borderRadius: '50%',
                                    overflow: 'hidden',
                                    position: 'relative',
                                    aspectRatio: '1'
                                }}
                            >
                                <Image
                                    src="/headshot.JPG"
                                    alt="Alex Fischman"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    sizes="120px"
                                    priority
                                />
                            </Box>
                            <Stack direction="column" spacing={2} sx={{ flex: 1 }}>
                                <Typography variant="h4" component="h1">
                                    Alex Fischman
                                </Typography>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <Chip label="Founder, Smarter Weather LLC" color="primary" variant="outlined" />
                                    <Chip label="Senior Software Engineer" color="primary" variant="outlined" />
                                </Stack>
                                <Zoom in={showContacts} timeout={500} style={{ transitionDelay: '200ms' }}>
                                  <Stack direction="row" spacing={2}>
                                      {/* Contact links */}
                                      <Link href={`mailto:${aboutData.contact.email}`} sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, '&:hover': { color: 'primary.dark' } }}>
                                          <EmailIcon fontSize="small" />
                                          {aboutData.contact.email}
                                      </Link>
                                      <Link href={aboutData.contact.linkedin} target="_blank" rel="noopener noreferrer" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, '&:hover': { color: 'primary.dark' } }}>
                                          <LinkedInIcon fontSize="small" />
                                          afischman710
                                      </Link>
                                      <Link href={aboutData.contact.github} target="_blank" rel="noopener noreferrer" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, '&:hover': { color: 'primary.dark' } }}>
                                          <GitHubIcon fontSize="small" />
                                          afisch710
                                      </Link>
                                  </Stack>
                                </Zoom>
                            </Stack>
                        </Stack>
                      )}
                    </Fade>
                    <Divider sx={{
                        bgcolor: theme => alpha(theme.palette.text.primary, 0.4),
                        height: '1px',
                        my: { xs: 1, md: 2 },
                    }} />
                    <Fade in={showParagraphs} timeout={500} style={{ transitionDelay: '400ms' }}>
                      <Grid container spacing={4} sx={{ mt: 2 }}>
                          <Grid size={{ xs: 12 }}>
                              <Typography
                                  variant="body2"
                                  component="p"
                                  sx={{
                                      mb: 3,
                                      lineHeight: 1.8,
                                      letterSpacing: '0.2px',
                                  }}
                              >
                                  {professional}
                              </Typography>
                              <Divider sx={{ my: 4 }} />
                              <Typography
                                  variant="body2"
                                  component="p"
                                  sx={{
                                      mb: 3,
                                      lineHeight: 1.8,
                                      letterSpacing: '0.2px',
                                  }}
                              >
                                  {personal}
                              </Typography>
                          </Grid>
                      </Grid>
                    </Fade>
                </Paper>

                {/* GitHub profile section removed for now, will be refactored later */}
            </Container>
        </>
    );
};