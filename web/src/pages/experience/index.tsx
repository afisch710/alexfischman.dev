import React, { useState, useMemo, useEffect } from 'react';
import Head from 'next/head';
import { Box, Typography, Chip, IconButton, Collapse, Tooltip, Zoom, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import FilterListIcon from '@mui/icons-material/FilterList';
import { GetStaticProps } from 'next';
import type { Experience } from '../../types/experience';
import experiencesData from '../../data/experience.json';
import ExperienceCard from '../../components/experience/ExperienceCard';
import { alpha } from '@mui/material/styles';

// Track if teaching tip has been shown in this SPA session
let teachingTipShown = false;

export default function ExperiencePage({
    experiences,
}: {
    experiences: Experience[];
}) {
    // State for selected companies and tags
    const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    // State for showing/hiding filters
    const [filtersVisible, setFiltersVisible] = useState<boolean>(false);
    const [hasClickedFilter, setHasClickedFilter] = useState<boolean>(false);

    // Build a list of all companies from experiences
    const allCompanies = useMemo(() => {
        const companySet = new Set<string>();
        experiences.forEach(exp => companySet.add(exp.company));
        return Array.from(companySet);
    }, [experiences]);

    // Build a list of all tags from experiences
    const allTags = useMemo(() => {
        const tagSet = new Set<string>();
        experiences.forEach(exp => {
            exp.tags.forEach((tag: string) => tagSet.add(tag));
        });
        return Array.from(tagSet);
    }, [experiences]);

    // Toggle handlers for companies and tags
    const toggleCompany = (company: string) => {
        setSelectedCompanies(prev =>
            prev.includes(company)
                ? prev.filter(c => c !== company)
                : [...prev, company]
        );
    };

    const toggleTag = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag)
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
        );
    };

    // Filter experiences based on selected companies and tags
    const filteredExperiences = useMemo(() => {
        return experiences.filter(exp => {
            const companyMatches =
                selectedCompanies.length > 0
                    ? selectedCompanies.includes(exp.company)
                    : true;
            const tagMatches =
                selectedTags.length > 0
                    ? selectedTags.every((tag: string) =>
                        exp.tags.includes(tag)
                    )
                    : true;
            return companyMatches && tagMatches;
        });
    }, [experiences, selectedCompanies, selectedTags]);

    const handleFilterClick = () => {
        setFiltersVisible(prev => !prev);
        setHasClickedFilter(true);
    };

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
                {/* Header with title and filter toggle icon */}
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                >
                    <Typography variant="h3">Experience</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                        <IconButton
                            onClick={handleFilterClick}
                            color="primary"
                            sx={{
                                animation: !hasClickedFilter ? 'pulse 2s ease-in-out infinite' : 'none',
                                '@keyframes pulse': {
                                    '0%': {
                                        transform: 'scale(1)',
                                        boxShadow: '0 0 0 0 rgba(25, 118, 210, 0.4)',
                                    },
                                    '70%': {
                                        transform: 'scale(1.1)',
                                        boxShadow: '0 0 0 10px rgba(25, 118, 210, 0)',
                                    },
                                    '100%': {
                                        transform: 'scale(1)',
                                        boxShadow: '0 0 0 0 rgba(25, 118, 210, 0)',
                                    },
                                },
                            }}
                        >
                            <FilterListIcon />
                        </IconButton>
                    </Box>
                </Box>

                {/* Filter Controls */}
                <Collapse in={filtersVisible}>
                    <Box mb={4}>
                        {/* Company Filters */}
                        <Typography variant="h6" gutterBottom>
                            Company:
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {allCompanies.map(company => (
                                <Chip
                                    key={company}
                                    label={company}
                                    onClick={() => toggleCompany(company)}
                                    variant={
                                        selectedCompanies.includes(company)
                                            ? 'filled'
                                            : 'outlined'
                                    }
                                    color={
                                        selectedCompanies.includes(company)
                                            ? 'primary'
                                            : 'default'
                                    }
                                    sx={{
                                        transition: 'transform 0.2s ease',
                                        '&:hover': { transform: 'scale(1.1)' },
                                    }}
                                />
                            ))}
                        </Box>

                        {/* Tag Filters */}
                        <Box mt={2}>
                            <Typography variant="h6" gutterBottom>
                                Skills:
                            </Typography>
                            <Box
                                sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}
                            >
                                {allTags.map(tag => (
                                    <Chip
                                        key={tag}
                                        label={tag}
                                        onClick={() => toggleTag(tag)}
                                        variant={
                                            selectedTags.includes(tag)
                                                ? 'filled'
                                                : 'outlined'
                                        }
                                        color={
                                            selectedTags.includes(tag)
                                                ? 'primary'
                                                : 'default'
                                        }
                                        sx={{
                                            transition: 'transform 0.2s ease',
                                            '&:hover': {
                                                transform: 'scale(1.1)',
                                            },
                                        }}
                                    />
                                ))}
                            </Box>
                        </Box>
                    </Box>
                </Collapse>

                {/* Render filtered experiences */}
                <Grid container spacing={3}>
                    {filteredExperiences.map((exp, index) => (
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