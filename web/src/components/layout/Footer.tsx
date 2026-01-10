import React from 'react';
import { Box, IconButton, Typography, useTheme, Tooltip } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import CodeIcon from '@mui/icons-material/Code';
import Image from 'next/image';

export default function Footer() {
    const theme = useTheme();
    const currentYear = new Date().getFullYear();

    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "center",
                justifyContent: { xs: "center", sm: "space-between" },
                py: 1.5,
                mt: 1,
                borderTop: `1px solid rgba(255, 255, 255, 0.1)`,
                gap: { xs: 1, sm: 0 },
            }}
        >
            <Box sx={{ 
                display: "flex", 
                gap: 1,
                order: { xs: 1, sm: 3 },
                justifyContent: { xs: "center", sm: "flex-end" },
                width: { xs: "100%", sm: "33%" }
            }}>
                <Tooltip title="View Alex's GitHub">
                    <IconButton
                        href="https://github.com/afisch710"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        sx={{
                            color: theme.palette.text.primary,
                            '&:hover': {
                                color: theme.palette.primary.main,
                            },
                        }}
                    >
                        <GitHubIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="View Alex's LinkedIn">
                    <IconButton
                        href="https://www.linkedin.com/in/afischman710/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        sx={{
                            color: theme.palette.text.primary,
                            '&:hover': {
                                color: theme.palette.primary.main,
                            },
                        }}
                    >
                        <LinkedInIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Email Alex">
                    <IconButton
                        href="mailto:afischman710@gmail.com"
                        aria-label="Email"
                        sx={{
                            color: theme.palette.text.primary,
                            '&:hover': {
                                color: theme.palette.primary.main,
                            },
                        }}
                    >
                        <EmailIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="View this website's repo">
                    <IconButton
                        href="https://github.com/afisch710/alexfischman.dev"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Repository"
                        sx={{
                            color: theme.palette.text.primary,
                            '&:hover': {
                                color: theme.palette.primary.main,
                            },
                        }}
                    >
                        <CodeIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Visit Smarter Weather">
                    <IconButton
                        href="https://smarterweather.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Smarter Weather"
                        sx={{
                            color: theme.palette.text.primary,
                            '&:hover': {
                                color: theme.palette.primary.main,
                            },
                            '& img': {
                                width: 24,
                                height: 24,
                            },
                        }}
                    >
                        <Image 
                            src="/smarterweather_light.svg" 
                            alt="Smarter Weather" 
                            width={24}
                            height={24}
                        />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Visit Pourtle">
                    <IconButton
                        href="https://pourtle.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Pourtle"
                        sx={{
                            color: theme.palette.text.primary,
                            '&:hover': {
                                color: theme.palette.primary.main,
                            },
                            '& img': {
                                width: 24,
                                height: 24,
                            },
                        }}
                    >
                        <Image 
                            src="/pourtle_logo.svg" 
                            alt="Pourtle" 
                            width={24}
                            height={24}
                        />
                    </IconButton>
                </Tooltip>
            </Box>
            
            {/* Left Privacy Link - Desktop Only */}
            <Box sx={{
                display: { xs: 'none', sm: 'flex' },
                justifyContent: 'flex-start',
                alignItems: 'center',
                width: '33%',
                order: 1
            }}>
                <Typography 
                    variant="body2" 
                    component="button"
                    onClick={() => {
                        const event = new CustomEvent('openPrivacyModal');
                        window.dispatchEvent(event);
                    }}
                    sx={{
                        fontSize: '0.875rem',
                        color: 'text.secondary',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        textDecoration: 'underline',
                        padding: 0,
                        '&:hover': {
                            color: 'text.primary',
                        },
                    }}
                >
                    Privacy
                </Typography>
            </Box>
            
            <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{
                    fontSize: { xs: '0.7rem', sm: '0.875rem' },
                    order: { xs: 2, sm: 2 },
                    textAlign: "center",
                    width: { xs: "100%", sm: "33%" },
                    display: { xs: "block", sm: "block" },
                    whiteSpace: 'nowrap'
                }}
            >
                © {currentYear} Alex Fischman. All rights reserved.
            </Typography>
            
            {/* Mobile Privacy Link - Below Copyright */}
            <Box sx={{
                display: { xs: 'flex', sm: 'none' },
                justifyContent: 'center',
                width: '100%',
                order: 3,
                mt: 0.5
            }}>
                <Typography 
                    variant="body2" 
                    component="button"
                    onClick={() => {
                        const event = new CustomEvent('openPrivacyModal');
                        window.dispatchEvent(event);
                    }}
                    sx={{
                        fontSize: '0.7rem',
                        color: 'text.secondary',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        textDecoration: 'underline',
                        padding: 0,
                        '&:hover': {
                            color: 'text.primary',
                        },
                    }}
                >
                    Privacy
                </Typography>
            </Box>
        </Box>
    );
} 