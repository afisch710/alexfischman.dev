"use client";
import React, { useState } from 'react';
import NextLink from 'next/link';
import {
    Box,
    Typography,
    Chip,
    Container,
    Button,
    Paper,
    Snackbar
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShareIcon from '@mui/icons-material/Share';
import Grid from '@mui/material/Grid2';
import { Experience } from '@/types/experience';
import LinkPreview from '../common/LinkPreview';
import ImagePreview from '../common/ImagePreview';
import type { Artifact } from '@/types/experience';

interface ExperiencePageProps {
    experience: Experience;
}

export default function ExperiencePage({ experience }: ExperiencePageProps) {
    const [showCopySuccess, setShowCopySuccess] = useState(false);

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setShowCopySuccess(true);
        } catch (err) {
            console.error('Failed to copy URL:', err);
        }
    };

    if (!experience) {
        return <Typography variant="h5" color="error">Experience not found</Typography>;
    }

    return (
        <Container sx={{ p: 0 }}>
            <Paper
                elevation={3}
                sx={{
                    p: { xs: 3, md: 6 },
                    borderRadius: 3,
                    bgcolor: 'background.paper',
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <Button component={NextLink} href="/experience" variant="outlined" startIcon={<ArrowBackIcon />} sx={{ textTransform: "none" }}>
                        All Experience
                    </Button>
                    <Button 
                        onClick={handleShare}
                        variant="outlined"
                        startIcon={<ShareIcon />}
                        aria-label="Share experience"
                        sx={{ textTransform: "none" }}
                    >
                        Share
                    </Button>
                </Box>
                <Typography variant="h4" gutterBottom>
                    {experience.title}
                </Typography>
                <Typography variant="subtitle2" gutterBottom color="text.secondary">
                    {experience.company} {experience.team && `| ${experience.team}`}
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, my: 2 }}>
                    {experience.tags.map((tag, index) => (
                        <Chip key={index} label={tag} size="small" />
                    ))}
                </Box>
                <Typography variant="body1" component="p" sx={{ lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                    {experience.description}
                </Typography>
                {experience.artifacts && experience.artifacts.length > 0 && (
                    <Box sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            {experience.artifacts.map((artifact, index) => {
                                const artifactObj: Artifact = typeof artifact === "string" ? { url: artifact } : artifact;
                                const isImageOnly = 'image' in artifactObj && !('url' in artifactObj);
                                return (
                                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index} sx={{ height: 300 }}>
                                        {'url' in artifactObj ? (
                                            <LinkPreview
                                                url={artifactObj.url}
                                                title={artifactObj.title}
                                                description={artifactObj.description}
                                                image={artifactObj.image}
                                            />
                                        ) : isImageOnly ? (
                                            <ImagePreview
                                                image={artifactObj.image}
                                                title={artifactObj.title}
                                                description={artifactObj.description}
                                            />
                                        ) : null}
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Box>
                )}
            </Paper>
            <Snackbar
                open={showCopySuccess}
                autoHideDuration={2000}
                onClose={() => setShowCopySuccess(false)}
                message="URL copied to clipboard!"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            />
        </Container>
    );
}