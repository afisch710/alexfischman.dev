"use client";
import React, { useState } from "react";
import NextLink from "next/link";
import { Box, Typography, Container, Divider, Button, Link as MuiLink, Paper, Snackbar, Chip, Modal, IconButton, useTheme, useMediaQuery } from "@mui/material";
import ShareIcon from '@mui/icons-material/Share';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Post } from "../../types/blog";
import MermaidDiagram from "./MermaidDiagram";

interface BlogPostProps {
    post: Post;
}

export default function BlogPost({ post }: BlogPostProps) {
    const [showCopySuccess, setShowCopySuccess] = useState(false);
    const [imageModal, setImageModal] = useState<{ open: boolean; src: string; alt: string }>({
        open: false,
        src: '',
        alt: ''
    });
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setShowCopySuccess(true);
        } catch (err) {
            console.error('Failed to copy URL:', err);
        }
    };

    const handleImageClick = (src: string, alt: string) => {
        setImageModal({ open: true, src, alt });
    };

    const closeImageModal = () => {
        setImageModal({ open: false, src: '', alt: '' });
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
                    <ReactMarkdown 
                        remarkPlugins={[remarkGfm]} 
                        rehypePlugins={[rehypeRaw]}
                        components={{
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
                        img: ({ src, alt, style, width, height, ...props }) => {
                            // Parse custom styling from props
                            const customStyles: any = {};
                            let finalMaxWidth = "100%"; // Default
                            
                            if (width) {
                                if (typeof width === 'string' && width.includes('%')) {
                                    finalMaxWidth = width;
                                    customStyles.width = width;
                                } else {
                                    const pixelWidth = typeof width === 'number' ? `${width}px` : width;
                                    customStyles.width = pixelWidth;
                                    finalMaxWidth = pixelWidth;
                                }
                            }
                            
                            if (height) {
                                customStyles.height = typeof height === 'number' ? `${height}px` : height;
                            }
                            
                            // Parse inline styles if provided
                            if (style) {
                                Object.assign(customStyles, style);
                            }
                            
                            return (
                                <Box
                                    component="img"
                                    src={src}
                                    alt={alt || "Blog image"}
                                    onClick={() => handleImageClick(src || '', alt || 'Blog image')}
                                    sx={{
                                        maxWidth: finalMaxWidth,
                                        height: "auto",
                                        borderRadius: 2,
                                        cursor: "pointer",
                                        my: 3,
                                        display: "block",
                                        mx: "auto",
                                        boxShadow: 2,
                                        transition: "transform 0.3s, box-shadow 0.3s",
                                        "&:hover": {
                                            transform: "scale(1.02)",
                                            boxShadow: 4
                                        },
                                        ...customStyles
                                    }}
                                    {...props}
                                />
                            );
                        },
                        code: ({ inline, children, className, ...props }: { inline?: boolean; children?: React.ReactNode; className?: string; [key: string]: any }) => {
                            const match = /language-(\w+)/.exec(className || '');
                            const language = match ? match[1] : '';
                            
                            // Handle Mermaid diagrams
                            if (language === 'mermaid' && !inline) {
                                return <MermaidDiagram chart={String(children).replace(/\n$/, '')} />;
                            }
                            
                            // Handle regular code blocks and inline code
                            return (inline ?? !String(children).includes('\n')) ? (
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
                            );
                        },
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

            {/* Image Modal */}
            <Modal open={imageModal.open} onClose={closeImageModal}>
                <Box
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        bgcolor: 'rgba(0,0,0,0.9)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1300,
                    }}
                >
                    <IconButton
                        onClick={closeImageModal}
                        sx={{
                            position: 'absolute',
                            top: 24,
                            right: 24,
                            color: '#fff',
                            zIndex: 1400,
                        }}
                        aria-label="Close image"
                    >
                        <CloseIcon fontSize="large" />
                    </IconButton>
                    <Box
                        component="img"
                        src={imageModal.src}
                        alt={imageModal.alt}
                        sx={{
                            maxWidth: isMobile ? '90vw' : '80vw',
                            maxHeight: isMobile ? '70vh' : '80vh',
                            objectFit: 'contain',
                            borderRadius: 2,
                        }}
                    />
                </Box>
            </Modal>

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
