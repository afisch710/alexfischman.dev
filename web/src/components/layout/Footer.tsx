import React from 'react';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

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
                py: 3,
                mt: 2,
                borderTop: `1px solid rgba(255, 255, 255, 0.3)`,
                gap: { xs: 2, sm: 0 },
            }}
        >
            <Box sx={{ 
                display: "flex", 
                gap: 2,
                order: { xs: 1, sm: 2 },
                justifyContent: "center",
                width: { xs: "100%", sm: "auto" }
            }}>
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