"use client";
import React, { useRef, useState } from "react";
import { Box, Tabs, Tab, Stack, Typography, Fade, keyframes } from "@mui/material";
import { IconButton, Drawer, List, ListItemButton, ListItemText, useTheme, useMediaQuery } from "@mui/material";
import WeatherBackground from "../weather/WeatherBackground";
import { usePathname, useRouter } from "next/navigation";
import MenuIcon from "@mui/icons-material/Menu";
import Footer from "./Footer";
import { customMaxWidth } from '../../theme';

const tabRoutes = ["", "blog", "experience", "about"];
const tabNames = ["", "Blog", "Experience", "About Me"];

export default function PageLayout({
    children,
    className
}: {
    children: React.ReactNode;
    className?: string;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // Get the current pathname or default to an empty string.
    const safePath = pathname ?? "";
    // Split the pathname into segments and filter out empty strings.
    const segments = safePath.split('/').filter(Boolean);
    // The first segment is what determines the top-level route.
    const firstSegment = segments[0] || "";
    // Determine the selected tab index by matching the first segment.
    const computedTab = tabRoutes.findIndex((route) => route === firstSegment);
    // If no match is found, default to 0.
    const selectedTab = computedTab === -1 ? 0 : computedTab;

    React.useEffect(() => {
        scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }, [pathname, selectedTab]);

    // Check if content is shorter than viewport and adjust footer position
    React.useEffect(() => {
        const checkContentHeight = () => {
            if (contentRef.current && scrollContainerRef.current) {
                const contentHeight = contentRef.current.offsetHeight;
                const viewportHeight = window.innerHeight;
                const headerHeight = 64; // Approximate header height

                // If content is shorter than viewport minus header, add min-height to push footer down
                if (contentHeight < (viewportHeight - headerHeight)) {
                    contentRef.current.style.minHeight = `${viewportHeight - headerHeight}px`;
                } else {
                    contentRef.current.style.minHeight = 'auto';
                }
            }
        };

        checkContentHeight();
        window.addEventListener('resize', checkContentHeight);

        return () => {
            window.removeEventListener('resize', checkContentHeight);
        };
    }, []);

    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const maxWidth = isMobile ? customMaxWidth.mobile : customMaxWidth.desktop;

    return (
        <Box
            className={className}
            sx={{
                width: "100%",
                height: "100dvh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
                zIndex: 10,
                overflowY: "hidden",
            }}
        >
            <WeatherBackground />
            <Box
                sx={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100dvh",
                    zIndex: 5,
                    pointerEvents: "none",
                }}
            />
            {/* Main content area */}
            <Stack
                direction="column"
                sx={{
                    width: "100%",
                    height: "100%",
                    pb: { xs: 2, md: 4 },
                }}
            >
                {/* Header with logo at left and Tabs at right */}
                <Box
                    sx={{
                        position: "sticky",
                        top: 0,
                        zIndex: 1100,
                        backgroundColor: "inherit", // ensures the background is consistent
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        p: 1,
                    }}
                >
                    {/* Logo container */}
                    <Box
                        sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
                        onClick={() => router.push('/')}
                    >
                        <Box
                            component="img"
                            src="/af.svg"
                            alt="Logo"
                            sx={{ height: 40 }}
                        />
                    </Box>
                    {isMobile && (
                        <Fade in={true} key={selectedTab} timeout={500}>
                            <Typography 
                                variant="h6" 
                                sx={{ 
                                    color: 'text.secondary',
                                    animation: `${keyframes`
                                        0% {
                                            transform: scale(1.1);
                                            opacity: 0;
                                        }
                                        20% {
                                            transform: scale(1.1);
                                            opacity: 1;
                                        }
                                        100% {
                                            transform: scale(1);
                                            opacity: 1;
                                        }
                                    `} 1.5s ease-out forwards`
                                }}
                            >
                                {tabNames[selectedTab]}
                            </Typography>
                        </Fade>
                    )}
                    {/* Mobile menu or desktop tabs */}
                    {isMobile ? (
                        <IconButton
                            color="inherit"
                            onClick={() => setMobileNavOpen(true)}
                            sx={{ color: 'white' }}
                        >
                            <MenuIcon />
                        </IconButton>
                    ) : (
                        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}>
                            <Tabs
                                value={selectedTab}
                                variant="scrollable"
                                scrollButtons="auto"
                                allowScrollButtonsMobile
                                textColor="primary"
                                indicatorColor="primary"
                                sx={{
                                    borderRadius: 4,
                                    "& .MuiTabs-flexContainer": {
                                        justifyContent: { xs: "flex-start", sm: "flex-end" },
                                    },
                                }}
                            >
                                {tabRoutes.map((route) => (
                                    <Tab
                                        key={route}
                                        label={route === "" ? "Home" : route.charAt(0).toUpperCase() + route.slice(1)}
                                        sx={{
                                            borderRadius: 4,
                                            pl: { xs: 0, sm: 2 },
                                            pr: { xs: 0, sm: 2 },
                                            transition: 'color 0.3s',
                                            '&:hover': {
                                                color: 'primary.light',
                                            },
                                        }}
                                        onClick={() => router.push(`/${route}`)}
                                    />
                                ))}
                            </Tabs>
                        </Box>
                    )}
                </Box>
                {/* Scrollable content area */}
                <Box
                    sx={{
                        flex: 1,
                        overscrollBehaviorY: 'none',
                        overflowY: "auto",
                        display: "flex",
                        flexDirection: "column",
                    }}
                    ref={scrollContainerRef}
                >
                    <Box
                        ref={contentRef}
                        sx={{
                            width: '100%',
                            maxWidth,
                            mx: "auto",
                            pb: 3, // Add padding at the bottom of content
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <Box sx={{ flex: 1, pt: 2, pb: 4 }}>
                            {children}
                        </Box>

                        {/* Footer - now inside the scrollable content but will stick to bottom if content is short */}
                        <Footer />
                    </Box>
                </Box>

                <Drawer
                    anchor="right"
                    open={mobileNavOpen}
                    onClose={() => setMobileNavOpen(false)}
                    PaperProps={{
                        sx: {
                            backgroundColor: 'rgba(50,50,50,0.75)',
                        }
                    }}
                    BackdropProps={{
                        sx: {
                            backgroundColor: 'rgba(0,0,0,0.5)',
                        }
                    }}
                >
                    <Box sx={{ width: 240 }} role="presentation" onClick={() => setMobileNavOpen(false)}>
                        <List>
                            {tabRoutes.map((route) => (
                                <ListItemButton
                                    key={route}
                                    onClick={() => router.push(`/${route}`)}
                                >
                                    <ListItemText
                                        primary={
                                            route === ""
                                                ? "Home"
                                                : route.charAt(0).toUpperCase() + route.slice(1)
                                        }
                                    />
                                </ListItemButton>
                            ))}
                        </List>
                    </Box>
                </Drawer>
            </Stack>
        </Box>
    );
}