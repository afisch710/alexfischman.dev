import React, { useState } from 'react';
import { Card, CardActionArea, Box, Typography, Modal, IconButton } from '@mui/material';
import Image from 'next/image';
import CloseIcon from '@mui/icons-material/Close';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

interface ImagePreviewProps {
    image: string;
    title?: string;
    description?: string;
}

export default function ImagePreview({ image, title, description }: ImagePreviewProps) {
    const [open, setOpen] = useState(false);
    const isLocalImage = image?.startsWith('/');
    const imageUrl = image || "https://via.placeholder.com/300x150?text=No+Image";
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <>
            <Card
                sx={{
                    cursor: "pointer",
                    height: 220,
                    borderRadius: 4,
                    position: "relative",
                    overflow: "hidden",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                        transform: "scale(1.03)",
                        boxShadow: 6
                    },
                }}
                onClick={() => setOpen(true)}
            >
                <CardActionArea
                    sx={{
                        height: "100%",
                        width: "100%",
                        backgroundColor: "transparent",
                    }}
                >
                    <Box
                        sx={{
                            position: "relative",
                            width: "100%",
                            height: "100%",
                        }}
                    >
                        {isLocalImage ? (
                            <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
                                <Image
                                    src={imageUrl}
                                    alt={title || "Preview image"}
                                    fill
                                    style={{ objectFit: "cover" }}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </Box>
                        ) : (
                            <Box
                                sx={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "100%",
                                    backgroundImage: `url(${imageUrl})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            />
                        )}
                        {(title || description) && (
                            <Box
                                sx={{
                                    width: "100%",
                                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                                    color: "#fff",
                                    p: 1,
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                }}
                            >
                                {title && (
                                    <Typography variant="subtitle1" gutterBottom>
                                        {title}
                                    </Typography>
                                )}
                                {description && (
                                    <Typography variant="caption">
                                        {description}
                                    </Typography>
                                )}
                            </Box>
                        )}
                    </Box>
                </CardActionArea>
            </Card>
            {/* Modal for full-size image */}
            <Modal open={open} onClose={() => setOpen(false)}>
                <Box
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        bgcolor: 'rgba(0,0,0,0.85)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1300,
                    }}
                >
                    <IconButton
                        onClick={() => setOpen(false)}
                        sx={{
                            position: 'absolute',
                            top: 24,
                            right: 24,
                            color: '#fff',
                            zIndex: 1400,
                        }}
                        aria-label="Close"
                    >
                        <CloseIcon fontSize="large" />
                    </IconButton>
                    <Box
                        sx={{
                            position: 'relative',
                            width: isMobile ? '90vw' : 800,
                            height: isMobile ? '60vw' : 600,
                            maxWidth: '90vw',
                            maxHeight: '80vh',
                            background: 'transparent',
                        }}
                    >
                        <Image
                            src={imageUrl}
                            alt={title || "Full preview image"}
                            fill
                            style={{ objectFit: 'contain' }}
                            sizes="90vw"
                            priority
                        />
                    </Box>
                </Box>
            </Modal>
        </>
    );
} 