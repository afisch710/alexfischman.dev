"use client";

import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { keyframes } from "@emotion/react";

// Keyframes for cloud drifting across the screen
const cloudAnimation = keyframes`
  0% { transform: translateX(-150vw); }
  100% { transform: translateX(150vw); }
`;

// Keyframes for subtle morphing of cloud shape
const morphAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Single cloud shape component using overlapping circles
const SingleCloud = ({
    top,
    delay,
    duration,
    width,
}: {
    top: string;
    delay: string;
    duration: string;
    width: string;
}) => (
    <Box
        sx={{
            position: "absolute",
            top: top,
            width: width,
            height: `calc(${width} * 0.6)`,
            animation: `${cloudAnimation} ${duration} linear infinite`,
            animationDelay: delay,
            animationFillMode: "backwards", // Ensures the cloud starts off-screen
        }}
    >
        {/* Overlapping circles to simulate a fluffy cloud */}
        <Box
            sx={{
                position: "absolute",
                top: "20%",
                left: "0%",
                width: "50%",
                height: "50%",
                bgcolor: "#eee",
                borderRadius: "50%",
                boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                animation: `${morphAnimation} 5s ease-in-out infinite`,
            }}
        />
        <Box
            sx={{
                position: "absolute",
                top: "0%",
                left: "25%",
                width: "50%",
                height: "50%",
                bgcolor: "#eee",
                borderRadius: "50%",
                boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                animation: `${morphAnimation} 5s ease-in-out infinite`,
            }}
        />
        <Box
            sx={{
                position: "absolute",
                top: "20%",
                left: "50%",
                width: "50%",
                height: "50%",
                bgcolor: "#eee",
                borderRadius: "50%",
                boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                animation: `${morphAnimation} 5s ease-in-out infinite`,
            }}
        />
    </Box>
);

interface CloudProps {
    ceiling: number,
}

export default function Cloud(props: CloudProps) {
    const [hasMounted, setHasMounted] = useState(false);
    const [clouds, setClouds] = useState<React.ReactElement[]>([]);

    useEffect(() => {
        setHasMounted(true);
        // TODO: Likely remove clouds as they're distracting, or change how clouds work
        const nClouds = 0;
        // Generate clouds with delays that evenly distribute their animation phases.
        const generatedClouds = Array.from({ length: nClouds }).map((_, i) => {
            const duration = Math.random() * 10 + 40;
            const delay = -((i / nClouds) * duration);
            // Randomize the vertical position and width for variety.
            const top = `${Math.random() * props.ceiling}%`;
            const width = `${Math.random() * 100 + 300}px`;
            return (
                <SingleCloud
                    key={`cloud-${i}`}
                    top={top}
                    delay={`${delay}s`}
                    duration={`${duration}s`}
                    width={width}
                />
            );
        });
        setClouds(generatedClouds);
    }, [props.ceiling]);

    if (!hasMounted) {
        return (
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    pointerEvents: "none",
                }}
            />
        );
    }

    return (
        <>
            {/* Cloud background overlay for an overcast feel */}
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: -3,
                    background: "linear-gradient(180deg, #bdc3c7, #2c3e50)",
                    transition: "opacity 2s ease-in-out",
                }}
            />
            {/* Container for drifting clouds */}
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    pointerEvents: "none",
                    zIndex: -2,
                    opacity: 1,
                    transition: "opacity 1s ease-in-out",
                }}
            >
                {clouds}
            </Box>
        </>
    );
}