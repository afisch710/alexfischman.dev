"use client";
import React from 'react';
import { Card, CardActionArea, Box, Typography } from '@mui/material';
import Image from 'next/image';

interface LinkPreviewProps {
    url: string;
    title?: string;
    description?: string;
    image?: string;
}

export default function LinkPreview({ url, title, description, image }: LinkPreviewProps) {
    const isLocalImage = image?.startsWith('/');
    const imageUrl = image || "https://via.placeholder.com/300x150?text=No+Image";

    return (
        <Card
            sx={{
                cursor: "pointer",
                height: "100%",
                borderRadius: 4,
                position: "relative",
                overflow: "hidden",
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
                        position: "relative",
                        width: "100%",
                        height: "100%",
                    }}
                >
                    {isLocalImage ? (
                        <Image
                            src={imageUrl}
                            alt={title || "Preview image"}
                            fill
                            style={{
                                objectFit: "cover",
                                objectPosition: "center -20px",
                            }}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
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
                                backgroundPosition: "center -20px",
                            }}
                        />
                    )}
                    <Box
                        sx={{
                            position: "absolute",
                            bottom: 0,
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
                </Box>
            </CardActionArea>
        </Card>
    );
}