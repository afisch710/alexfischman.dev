import React from 'react';
import { Box, IconButton, Typography, useTheme, Tooltip } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import CodeIcon from '@mui/icons-material/Code';

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
                order: { xs: 1, sm: 2 },
                justifyContent: "center",
                width: { xs: "100%", sm: "auto" }
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
                        <img src="/pourtle_logo.svg" alt="Pourtle" />
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
                        <img src="/smarterweather_light.svg" alt="Smarter Weather" />
                    </IconButton>
                </Tooltip>
            </Box>
            
            <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{
                    fontSize: { xs: '0.7rem', sm: '0.875rem' },
                    order: { xs: 2, sm: 1 },
                    textAlign: { xs: "center", sm: "left" },
                    width: { xs: "100%", sm: "auto" }
                }}
            >
                © {currentYear} Alex Fischman. All rights reserved.
            </Typography>
        </Box>
    );
} 