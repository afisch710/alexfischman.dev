import React from 'react';
import Head from 'next/head';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { GetStaticProps } from 'next';
import type { Experience } from '../../types/experience';
import experiencesData from '../../data/experience.json';
import ExperienceCard from '../../components/experience/ExperienceCard';

export default function ExperiencePage({
    experiences,
}: {
    experiences: Experience[];
}) {
    return (
        <>
            <Head>
                <title>Experience | Alex Fischman – Senior Software Engineer & Founder</title>
                <meta
                    name="description"
                    content="Explore projects and professional experiences by Alex Fischman."
                />
                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta
                    property="og:title"
                    content="Experience | Alex Fischman – Senior Software Engineer & Founder"
                />
                <meta
                    property="og:description"
                    content="Explore projects and professional experiences by Alex Fischman."
                />
                <meta property="og:url" content="https://www.alexfischman.dev/experience" />
                <meta
                    property="og:image"
                    content="https://www.alexfischman.dev/og-image.png"
                />
                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@your_twitter_handle" />
                <meta
                    name="twitter:title"
                    content="Experience | Alex Fischman – Senior Software Engineer & Founder"
                />
                <meta
                    name="twitter:description"
                    content="Explore projects and professional experiences by Alex Fischman."
                />
                <meta
                    name="twitter:image"
                    content="https://www.alexfischman.dev/og-image.png"
                />
            </Head>
            <Box sx={{ width: '100%', p: 4, pb: 8 }}>
                <Typography variant="h3" gutterBottom>
                    Experience
                </Typography>
                <Grid container spacing={3}>
                    {experiences.map((exp, index) => (
                        <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
                            <ExperienceCard experience={exp} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    );
}

export const getStaticProps: GetStaticProps<{ experiences: Experience[] }> = async () => {
    const experiences: Experience[] = [...experiencesData].sort((a, b) => a.priority - b.priority);
    return {
        props: {
            experiences,
        },
    };
};