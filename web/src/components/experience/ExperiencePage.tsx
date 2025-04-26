"use client";
import React from 'react';
import { useRouter } from 'next/router';
import {
    Box,
    Typography,
    Chip,
    Container,
    Button,
    Paper
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Experience } from '@/context/ExperienceProvider';
import LinkPreview from '../common/LinkPreview';

interface Artifact {
    url: string;
    title?: string;
    description?: string;
    image?: string;
}

interface ExperiencePageProps {
    experience: Experience;
}

export default function ExperiencePage({ experience }: ExperiencePageProps) {
    const router = useRouter();

    if (!experience) {
        return <Typography variant="h5" color="error">Experience not found</Typography>;
    }

    return (
        <Container sx={{ py: 4 }}>
            <Paper
                elevation={3}
                sx={{
                    p: { xs: 3, md: 6 },
                    borderRadius: 3,
                    bgcolor: 'background.paper',
                }}
            >
                <Button onClick={() => router.back()} variant="outlined" sx={{ mb: 2 }}>
                    Back
                </Button>
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
                <Typography variant="body1" paragraph sx={{ lineHeight: 1.6 }}>
                    {experience.description}
                </Typography>
                {experience.artifacts && experience.artifacts.length > 0 && (
                    <Box sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            {experience.artifacts.map((artifact, index) => {
                                const artifactObj: Artifact = typeof artifact === "string" ? { url: artifact } : artifact;
                                return (
                                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index} sx={{ height: 300 }}>
                                        <LinkPreview
                                            url={artifactObj.url}
                                            title={artifactObj.title}
                                            description={artifactObj.description}
                                            image={artifactObj.image}
                                        />
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Box>
                )}
            </Paper>
        </Container>
    );
}