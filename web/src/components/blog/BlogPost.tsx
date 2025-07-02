"use client";
import React, { useState } from "react";
import NextLink from "next/link";
import { Box, Typography, Container, Divider, Button, Link as MuiLink, Paper, Fab, Snackbar, Chip } from "@mui/material";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ShareIcon from '@mui/icons-material/Share';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Post } from "../../types/blog";

interface BlogPostProps {
    post: Post;
}

export default function BlogPost({ post }: BlogPostProps) {
    const [showCopySuccess, setShowCopySuccess] = useState(false);

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setShowCopySuccess(true);
        } catch (err) {
            console.error('Failed to copy URL:', err);
        }
    };

    return (
        <Container sx={{ p: 0 }}>
            <Paper elevation={3} sx={{ p: { xs: 3, md: 6 }, borderRadius: 3, bgcolor: 'background.paper' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <Button component={NextLink} href="/blog" variant="outlined" startIcon={<ArrowBackIcon />} sx={{ textTransform: "none" }}>
                        All Posts
                    </Button>
                    <Button 
                        onClick={handleShare}
                        variant="outlined"
                        startIcon={<ShareIcon />}
                        aria-label="Share post"
                        sx={{ textTransform: "none" }}
                    >
                        Share
                    </Button>
                </Box>
                <Typography variant="h1" component="h1" gutterBottom sx={{ fontWeight: 900, fontSize: { xs: '2.5rem', md: '4rem' }, mb: 2 }}>
                    {post.title}
                </Typography>
                <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 700, color: 'text.primary', mb: 3 }}>
                    {post.description}
                </Typography>
                {/* Author Section */}
                <Box sx={{ mt: 2, mb: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        {/* Author headshot now links to the About page */}
                        <Box
                            component={NextLink}
                            href="/about/"
                            sx={{ display: 'inline-block', mr: 2 }}
                        >
                            <Box
                                component="img"
                                src="/headshot.JPG"
                                alt="Author headshot"
                                sx={{
                                    width: 56,
                                    height: 56,
                                    borderRadius: '50%',
                                    border: '2px solid',
                                    borderColor: 'divider',
                                    cursor: 'pointer',
                                }}
                            />
                        </Box>
                        <Box>
                            {/* Author name now links to the About page */}
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                <MuiLink
                                    component={NextLink}
                                    href="/about/"
                                    underline="hover"
                                    sx={{
                                        color: 'inherit',
                                        textDecoration: 'none',
                                    }}
                                >
                                    Alex Fischman
                                </MuiLink>
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                {`published ${formatPublishTime(post.date)}`}
                            </Typography>
                        </Box>
                    </Box>
                    {/* Tags shown as separate row for all screen sizes */}
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {post.tags.map((tag) => (
                            <Chip key={tag} label={tag} size="small" sx={{ borderRadius: '8px' }} />
                        ))}
                    </Box>
                </Box>
                <Divider sx={{ my: 4 }} />
                <Box sx={{ "& img": { maxWidth: "100%", height: "auto", borderRadius: 2 }, "& pre": { overflowX: "auto" } }}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
                        h2: ({ ...props }) => (
                            <Typography variant="h4" gutterBottom sx={{ mt: 4 }} {...props} />
                        ),
                        h3: ({ ...props }) => (
                            <Typography variant="h5" gutterBottom sx={{ mt: 3 }} {...props} />
                        ),
                        p: ({ ...props }) => (
                            <Typography
                                variant="body1"
                                paragraph
                                sx={{
                                    lineHeight: 1.7,
                                }}
                                {...props}
                            />
                        ),
                        a: ({ href, children }) => (
                            <MuiLink 
                                href={href} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                underline="hover"
                                sx={{ 
                                    color: 'secondary.main',
                                    fontWeight: 500
                                }}
                            >
                                {children}
                            </MuiLink>
                        ),
                        code: ({ inline, children, ...props }: { inline?: boolean; children?: React.ReactNode; [key: string]: any }) =>
                            // Fallback: treat as inline unless we explicitly detect a block (multiple lines)
                            (inline ?? !String(children).includes('\n')) ? (
                                <Box
                                    component="code"
                                    sx={{ bgcolor: 'action.hover', px: 0.5, borderRadius: 1, fontFamily: 'monospace' }}
                                    {...props}
                                >
                                    {children}
                                </Box>
                            ) : (
                                <Box
                                    component="pre"
                                    sx={{ bgcolor: 'action.hover', p: 2, my: 2, borderRadius: 1, overflowX: 'auto', fontFamily: 'monospace' }}
                                    {...props}
                                >
                                    {children}
                                </Box>
                            ),
                        blockquote: ({ children }) => (
                            <Box sx={{ borderLeft: 4, borderColor: 'divider', pl: 2, my: 3 }}>
                                <Typography variant="body1" component="blockquote" sx={{ fontStyle: 'italic' }}>
                                    {children}
                                </Typography>
                            </Box>
                        ),
                        ul: ({ children }) => <Box component="ul" sx={{ pl: 4, mb: 2 }}>{children}</Box>,
                        ol: ({ children }) => <Box component="ol" sx={{ pl: 4, mb: 2 }}>{children}</Box>,
                        li: ({ children }) => <Typography component="li" variant="body1" sx={{ mb: 1 }}>{children}</Typography>,
                    }}>
                        {post.body}
                    </ReactMarkdown>
                </Box>
            </Paper>
            <Fab
                size="small"
                aria-label="scroll back to top"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                sx={{ position: 'fixed', bottom: 24, right: 24 }}
            >
                <KeyboardArrowUpIcon />
            </Fab>
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

function formatPublishTime(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours < 1) {
        return "less than one hour ago";
    } else if (diffHours < 24) {
        return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else {
        return date.toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    }
}
