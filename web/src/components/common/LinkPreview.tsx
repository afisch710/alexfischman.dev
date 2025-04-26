"use client";
import React from 'react';
import { Card, CardActionArea, Box, Typography } from '@mui/material';

interface LinkPreviewProps {
    url: string;
    title?: string;
    description?: string;
    image?: string;
}

export default function LinkPreview({ url, title, description, image }: LinkPreviewProps) {
    return (
        <Card
            sx={{
                cursor: "pointer",
                height: "100%",
                borderRadius: 4,
                position: "relative",
                // Shift the image up slightly by setting a negative vertical offset in the background position.
                backgroundImage: `url(${image || "https://via.placeholder.com/300x150?text=No+Image"})`,
                backgroundSize: "cover",
                backgroundPosition: "center -20px", // Shifts the image upward by 20px
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": { transform: "scale(1.03)", boxShadow: 6 },
            }}
            onClick={() => window.open(url, "_blank")}
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
                        position: "absolute",
                        bottom: 0, // Overlay now flush to the bottom.
                        left: 0,
                        width: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        color: "#fff",
                        p: 1,
                    }}
                >
                    <Typography variant="subtitle1" gutterBottom>
                        {title || "No Title"}
                    </Typography>
                    {description && (
                        <Typography variant="caption">
                            {description}
                        </Typography>
                    )}
                </Box>
            </CardActionArea>
        </Card>
    );
}