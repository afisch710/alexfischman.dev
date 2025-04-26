"use client";
import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import {
    Box,
    Typography,
    CircularProgress,
    Chip,
    IconButton,
    Collapse
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useExperience } from '../../context/ExperienceProvider';
import ExperienceCard from '../../components/experience/ExperienceCard';

export default function Experience() {
    const { experiences, loading, error } = useExperience();

    // State for selected companies and tags
    const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    // State for showing/hiding filters
    const [filtersVisible, setFiltersVisible] = useState<boolean>(false);

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

    // Filter experiences:
    // - If one or more companies are selected, only experiences whose company is in the selection are shown.
    // - If one or more tags are selected, only experiences that include all of the selected tags are shown.
    // - If both filters are active, both conditions must be satisfied.
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

    if (loading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
            >
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
            >
                <Typography variant="h6" color="error">
                    {error}
                </Typography>
            </Box>
        );
    }

    return (
        <>
            <Head>
                <title key="title">Experience | af.dev</title>
                <meta
                    key="description"
                    name="description"
                    content="Explore projects and experiences by Alex Fischman."
                />
                <meta
                    key="og:title"
                    property="og:title"
                    content="Experience | af.dev"
                />
                <meta
                    key="og:description"
                    property="og:description"
                    content="Explore projects and experiences by Alex Fischman."
                />
                <meta key="og:image" property="og:image" content="/af_dark.png" />
                <meta
                    key="twitter:card"
                    name="twitter:card"
                    content="summary_large_image"
                />
                <meta
                    key="twitter:title"
                    name="twitter:title"
                    content="Experience | af.dev"
                />
                <meta
                    key="twitter:description"
                    name="twitter:description"
                    content="Explore projects and experiences by Alex Fischman."
                />
                <meta
                    key="twitter:image"
                    name="twitter:image"
                    content="/af_dark.png"
                />
            </Head>
            <Box width="100%" p={4} pb={8} position="relative">
                {/* Header with title and filter toggle icon */}
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                >
                    <Typography variant="h3">Projects</Typography>
                    <IconButton
                        onClick={() => setFiltersVisible(prev => !prev)}
                        color="primary"
                    >
                        <FilterListIcon />
                    </IconButton>
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
                    {filteredExperiences.map((experience, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                            <ExperienceCard experience={experience} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    );
}