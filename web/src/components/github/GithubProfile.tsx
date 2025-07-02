import React, { useState } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import githubProfileData from '@/data/github-profile.json';
import { Chip, Divider } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import CodeIcon from '@mui/icons-material/Code';
import BugReportIcon from '@mui/icons-material/BugReport';
import MergeTypeIcon from '@mui/icons-material/MergeType';
import RateReviewIcon from '@mui/icons-material/RateReview';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import StarIcon from '@mui/icons-material/Star';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { useTheme, alpha } from '@mui/material/styles';

export interface GithubProfileProps {
    /** GitHub username to display */
    username: string;
}

// Define the GitHub profile data structure
interface GitHubProfileData {
    totalContributions: number;
    monthlyContributions: Record<string, number>;
    commitContributions: number;
    issueContributions: number;
    prContributions: number;
    prReviewContributions: number;
    followersCount: number;
    followingCount: number;
    starredCount: number;
    reposContributedToCount: number;
    languageCount: Record<string, number>;
    workflows: {
        total: number;
        success: number;
        failure: number;
    };
}

// Function to convert month number to abbreviated name
const getMonthAbbrev = (monthStr: string) => {
    const date = new Date(2000, parseInt(monthStr) - 1, 1);
    return date.toLocaleString('en-US', { month: 'short' });
};

const GithubProfile: React.FC<GithubProfileProps> = () => {
    const {
        totalContributions,
        monthlyContributions,
        commitContributions,
        issueContributions,
        prContributions,
        prReviewContributions,
        followersCount,
        followingCount,
        starredCount,
        reposContributedToCount,
        languageCount,
    } = githubProfileData as GitHubProfileData;

    // Only last 12 months
    const monthEntries = Object.entries(monthlyContributions).slice(-12);

    // Preapproved languages to display
    const approvedLanguages = [
        'Java',
        'JavaScript',
        'CSS',
        'HTML',
        'TypeScript',
        'Shell',
        'Python',
        'Lua',
        'Dockerfile',
        'Swift',
    ];

    // Calculate total bytes and percentage for approved languages only
    const totalBytes = approvedLanguages.reduce((sum, lang) => sum + (languageCount[lang] || 0), 0);
    const languagePercentages: Record<string, number> = {};
    approvedLanguages.forEach((lang) => {
        const bytes = languageCount[lang] || 0;
        languagePercentages[lang] = totalBytes > 0
            ? Math.round((bytes / totalBytes) * 100)
            : 0;
    });

    // Color scale for contributions
    const contribColors = ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'];

    // Prepare heatmap colors and scale for last 12 months
    const monthlyValues = monthEntries.map(([, count]) => count);
    const maxContrib = Math.max(...monthlyValues, 1);

    // Compute dynamic "nice" step unit and Y-axis labels
    const range = maxContrib;
    const targetTicks = 5;
    const rawStep = range / targetTicks;
    const magnitude = 10 ** Math.floor(Math.log10(rawStep));
    const multipliers = [1, 2, 5, 10];
    // Choose the smallest multiplier that yields a step >= rawStep
    const stepUnit = multipliers.find(m => m * magnitude >= rawStep)! * magnitude;
    const niceMax = Math.ceil(range / stepUnit) * stepUnit;
    const yAxisLabels = Array.from(
        { length: niceMax / stepUnit + 1 },
        (_, i) => niceMax - i * stepUnit
    );

    const statDescriptions: Record<string, string> = {
        commits: 'Commits represent saved snapshots of code changes.',
        issues: 'Issues represent bug reports or feature requests.',
        prs: 'Pull Requests represent proposed code changes.',
        reviews: 'Reviews represent feedback provided on pull requests.',
        followers: 'Followers represent users subscribed to see public activity.',
        following: 'Following represent users whose public activity is being followed.',
        stars: 'Stars represent repositories marked as favorite.',
        repos: 'Repos represent unique repositories with contributions.',
    };

    const [activeStat, setActiveStat] = useState<string | null>(null);
    const [activeMonth, setActiveMonth] = useState<string | null>(null);
    const [hoveredMonth, setHoveredMonth] = useState<string | null>(null);

    // Month to display status for: active (click) takes precedence over hover
    const displayedMonth = activeMonth !== null ? activeMonth : hoveredMonth;

    const theme = useTheme();

    return (
        <Card variant="outlined" sx={{ borderRadius: 3, boxShadow: 1, p: 1, width: '100%', maxWidth: 1200 }}>
            <CardContent>


                <Box
                    sx={{
                        mt: 2,
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 2,
                    }}
                >
                    {/* Chart Section */}
                    <Box sx={{ 
                        flex: 1, 
                        px: { xs: 2, md: 6 },
                        py: 2,
                        border: 1,
                        borderColor: (theme) => alpha(theme.palette.text.primary, 0.5),
                        borderRadius: 2,
                        width: { xs: '100%', md: 'auto' },
                        overflow: 'auto',
                    }}>
                        <Typography variant="subtitle2" gutterBottom>
                            Monthly Contributions
                        </Typography>
                        {/* Y-axis and bars code */}
                        <Box sx={{ position: 'relative', height: 120, mb: 1 }}>
                            <Box sx={{ position: 'absolute', left: 0, bottom: 0, top: 0, width: 24, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                {yAxisLabels.map((value) => (
                                    <Typography variant="caption" color="text.secondary" key={value}>
                                        {value}
                                    </Typography>
                                ))}
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', height: '100%', ml: '28px', gap: 1.5 }}>
                                {monthEntries.map(([month, count]) => {
                                    const pct = Math.floor((count / maxContrib) * 100);
                                    const level = Math.min(
                                        contribColors.length - 1,
                                        Math.floor((count / maxContrib) * contribColors.length)
                                    );
                                    return (
                                        <Box
                                            key={month}
                                            onClick={() => {
                                                if (activeMonth === month) {
                                                    setActiveMonth(null);
                                                    setHoveredMonth(null);
                                                } else {
                                                    setActiveMonth(month);
                                                }
                                            }}
                                            onMouseEnter={() => setHoveredMonth(month)}
                                            onMouseLeave={() => setHoveredMonth(null)}
                                            sx={{
                                                flex: 1,
                                                minWidth: 0,
                                                height: `${pct}%`,
                                                bgcolor: contribColors[level],
                                                borderRadius: 1,
                                                cursor: 'pointer',
                                                transition: 'all 0.2s',
                                                '&:hover': { transform: 'scaleY(1.1)' },
                                            }}
                                        />
                                    );
                                })}
                            </Box>
                        </Box>
                        {/* Month labels aligned to bars */}
                        <Box sx={{ display: 'flex', ml: '28px', gap: 1.5 }}>
                            {monthEntries.map(([month]) => (
                                <Box key={month} sx={{ flex: 1, minWidth: 0, textAlign: 'center' }}>
                                    <Typography 
                                        variant="caption"
                                        color="text.secondary"
                                        sx={{
                                            display: 'inline-block',
                                            transform: 'rotate(-45deg)',
                                            transformOrigin: 'left center',
                                            whiteSpace: 'nowrap',
                                            position: 'relative',
                                            left: '0%',
                                            top: '0.5em',
                                            marginLeft: '-0.5em',
                                        }}
                                    >
                                        {getMonthAbbrev(month.split('-')[1])}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                        {/* Status line under graph */}
                        <Box sx={{
                            height: '1.5em',
                            mt: 0.5,
                            textAlign: 'center',
                            visibility: displayedMonth ? 'visible' : 'hidden'
                        }}>
                            {displayedMonth &&
                                <Typography variant="body2" color="text.primary" component="span">
                                    {getMonthAbbrev(displayedMonth.split('-')[1])} {displayedMonth.split('-')[0]} — {monthlyContributions[displayedMonth]} contributions
                                </Typography>
                            }
                        </Box>
                    </Box>
                    {/* Stats Section */}
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h5" gutterBottom>
                            {totalContributions.toLocaleString()} contributions in the last year
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                            <Chip
                                clickable
                                size="small"
                                icon={<CodeIcon />}
                                label={`${commitContributions} Commits`}
                                onClick={() => setActiveStat(activeStat === 'commits' ? null : 'commits')}
                            />
                            <Chip
                                clickable
                                size="small"
                                icon={<BugReportIcon />}
                                label={`${issueContributions} Issues`}
                                onClick={() => setActiveStat(activeStat === 'issues' ? null : 'issues')}
                            />
                            <Chip
                                clickable
                                size="small"
                                icon={<MergeTypeIcon />}
                                label={`${prContributions} PRs`}
                                onClick={() => setActiveStat(activeStat === 'prs' ? null : 'prs')}
                            />
                            <Chip
                                clickable
                                size="small"
                                icon={<RateReviewIcon />}
                                label={`${prReviewContributions} Reviews`}
                                onClick={() => setActiveStat(activeStat === 'reviews' ? null : 'reviews')}
                            />
                            <Chip
                                clickable
                                size="small"
                                icon={<PeopleIcon />}
                                label={`${followersCount} Followers`}
                                onClick={() => setActiveStat(activeStat === 'followers' ? null : 'followers')}
                            />
                            <Chip
                                clickable
                                size="small"
                                icon={<PersonAddIcon />}
                                label={`${followingCount} Following`}
                                onClick={() => setActiveStat(activeStat === 'following' ? null : 'following')}
                            />
                            <Chip
                                clickable
                                size="small"
                                icon={<StarIcon />}
                                label={`${starredCount} Stars`}
                                onClick={() => setActiveStat(activeStat === 'stars' ? null : 'stars')}
                            />
                            <Chip
                                clickable
                                size="small"
                                icon={<FolderOpenIcon />}
                                label={`${reposContributedToCount} Repos`}
                                onClick={() => setActiveStat(activeStat === 'repos' ? null : 'repos')}
                            />
                        </Box>
                        {activeStat && (
                            <Box sx={{ mt: 1 }}>
                                <Typography variant="body2" color="text.secondary">
                                    {statDescriptions[activeStat]}
                                </Typography>
                            </Box>
                        )}
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="subtitle2" gutterBottom>
                            Languages
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {[
                                ...approvedLanguages
                            ]
                                .sort((a, b) => (languagePercentages[b] || 0) - (languagePercentages[a] || 0))
                                .map((lang) => (
                                    <Chip
                                        key={lang}
                                        size="small"
                                        label={`${lang} ${languagePercentages[lang] || 0}%`}
                                        variant="outlined"
                                    />
                                ))}
                        </Box>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default GithubProfile;
