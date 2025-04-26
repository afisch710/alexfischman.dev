"use client";
import React from "react";
import NextLink from "next/link";
import { Box, Typography, Container, Divider, Button, Link as MuiLink, Paper, Fab } from "@mui/material";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Post } from "../../context/BlogProvider";

interface BlogPostProps {
    post: Post;
}

export default function BlogPost({ post }: BlogPostProps) {
    return (
        <Container sx={{ py: 6 }}>
            <Paper elevation={3} sx={{ p: { xs: 3, md: 6 }, borderRadius: 3, bgcolor: 'background.paper' }}>
                <Button component={NextLink} href="/blog" variant="outlined" sx={{ mb: 4 }}>
                    ← Back to Blog
                </Button>
                <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: "bold" }}>
                    {post.title}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    {new Date(post.date).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </Typography>
                {post.description && (
                    <Typography variant="h5" paragraph sx={{ mt: 2 }}>
                        {post.description}
                    </Typography>
                )}
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
                                    '&::first-letter': {
                                        fontSize: '3rem',
                                        fontWeight: 'bold',
                                        float: 'left',
                                        mr: 1,
                                        lineHeight: 1,
                                    },
                                }}
                                {...props}
                            />
                        ),
                        a: ({ href, children }) => (
                            <MuiLink href={href} target="_blank" rel="noopener noreferrer" underline="hover">
                                {children}
                            </MuiLink>
                        ),
                        code: ({ inline, children, ...props }: { inline?: boolean; children?: React.ReactNode; [key: string]: any }) =>
                            inline ? (
                                <Box
                                    component="code"
                                    sx={{ bgcolor: 'action.hover', px: 0.5, borderRadius: 1, fontFamily: 'monospace' }}
                                    {...props}
                                >
                                    {children}
                                </Box>
                            ) : (
                                <Paper elevation={1} sx={{ p: 2, my: 2, overflowX: 'auto' }} {...props}>
                                    <Box component="pre" sx={{ m: 0, fontFamily: 'monospace' }}>
                                        {children}
                                    </Box>
                                </Paper>
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
        </Container>
    );
}
