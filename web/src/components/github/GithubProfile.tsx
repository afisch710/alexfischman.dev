import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, CircularProgress, Box } from '@mui/material';
import { graphql } from '@octokit/graphql';

export interface GithubProfileProps {
    /** GitHub username to fetch data for */
    username: string;
}

interface ProfileData {
    totalContributions: number;
    publicRepos: number;
    followers: number;
    bio: string | null;
    location: string | null;
    topLanguages: Array<{
        name: string;
        count: number;
    }>;
}

const GithubProfile: React.FC<GithubProfileProps> = ({ username }) => {
    const [data, setData] = useState<ProfileData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGithubData = async () => {
            try {
                const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
                const gqlWithAuth = graphql.defaults({ headers: { authorization: `token ${token}` } });

                const userDataRes: any = await gqlWithAuth(`
                    {
                        user(login: "${username}") {
                            contributionsCollection {
                                contributionCalendar {
                                    totalContributions
                                }
                            }
                            repositories(privacy: PUBLIC, first: 100, orderBy: {field: STARGAZERS, direction: DESC}) {
                                totalCount
                                nodes {
                                    languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
                                        edges {
                                            node {
                                                name
                                            }
                                        }
                                    }
                                }
                            }
                            followers {
                                totalCount
                            }
                            bio
                            location
                        }
                    }
                `);

                const languages = new Map<string, number>();
                userDataRes.user.repositories.nodes.forEach((repo: any) => {
                    repo.languages.edges.forEach((edge: any) => {
                        const lang = edge.node.name;
                        languages.set(lang, (languages.get(lang) || 0) + 1);
                    });
                });

                const topLanguages = Array.from(languages.entries())
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 5)
                    .map(([name, count]) => ({ name, count }));

                setData({
                    totalContributions: userDataRes.user.contributionsCollection.contributionCalendar.totalContributions,
                    publicRepos: userDataRes.user.repositories.totalCount,
                    followers: userDataRes.user.followers.totalCount,
                    bio: userDataRes.user.bio,
                    location: userDataRes.user.location,
                    topLanguages
                });
            } catch (error) {
                console.error('Error fetching GitHub data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchGithubData();
    }, [username]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" p={2}>
                <CircularProgress />
            </Box>
        );
    }

    if (!data) {
        return <Typography color="error">Unable to load GitHub profile data.</Typography>;
    }

    return (
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    GitHub Profile
                </Typography>
                {data.bio && (
                    <Typography variant="body2" color="text.secondary" paragraph>
                        {data.bio}
                    </Typography>
                )}
                {data.location && (
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        📍 {data.location}
                    </Typography>
                )}
                <Box sx={{ mt: 2 }}>
                    <Typography>
                        {data.totalContributions} contributions in the last year
                    </Typography>
                    <Typography>
                        {data.publicRepos} public repositories
                    </Typography>
                    <Typography>
                        {data.followers} followers
                    </Typography>
                </Box>
                {data.topLanguages.length > 0 && (
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="subtitle2" gutterBottom>
                            Top Languages:
                        </Typography>
                        {data.topLanguages.map((lang) => (
                            <Typography key={lang.name} variant="body2" color="text.secondary">
                                {lang.name} ({lang.count} repos)
                            </Typography>
                        ))}
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

export default GithubProfile;
