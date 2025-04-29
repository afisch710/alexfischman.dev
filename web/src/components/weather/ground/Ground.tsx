"use client";

import { Box } from "@mui/material";
import React, { useEffect, useState, useMemo } from "react";
import Grass from "./Grass";
import { Weather } from "../Weather";
import { Season } from "../Season";

// Define types for grass and accumulation conditions
export type GrassCondition = "dead" | "blooming" | "green" | "dry";
export type GroundAccumulation = "none" | "puddles" | "mud" | "snow";

// The overall ground state
export interface GroundState {
    grass: GrassCondition;
    accumulation: GroundAccumulation;
}

interface GroundProps {
    weather: Weather;
    season: Season;
}

const calculateGroundState = (
    weather: Weather,
    season: Season,
    prev: GroundState
): GroundState => {
    switch (season) {
        case "Winter":
            switch (weather) {
                case "Sunny":
                    // Grass remains dead, snow stays if already there
                    return {
                        grass: "dead",
                        accumulation: prev.accumulation === "snow" ? "snow" : "none",
                    };
                case "Cloudy":
                    // Grass remains dead, snow stays if already there
                    return {
                        grass: "dead",
                        accumulation: prev.accumulation === "snow" ? "snow" : "none",
                    };
                case "Snow":
                    // Grass remains dead, snow accumulates
                    return {
                        grass: "dead",
                        accumulation: "snow",
                    };
                default:
                    // Grass remains dead, default to no snow
                    return {
                        grass: "dead",
                        accumulation: "none",
                    };
            }
        case "Spring":
            switch (weather) {
                case "Sunny":
                    // Grass is blooming, snow melts or water seeps into mud or mud dries
                    return {
                        grass: "blooming",
                        accumulation:
                            prev.accumulation === "snow"
                                ? "puddles"
                                : prev.accumulation === "puddles"
                                    ? "mud"
                                    : "none",
                    };
                case "Cloudy":
                    // Grass is blooming, snow melts or water seeps into mud or mud dries
                    return {
                        grass: "blooming",
                        accumulation:
                            prev.accumulation === "snow"
                                ? "puddles"
                                : prev.accumulation === "none"
                                    ? "none"
                                    : "mud",
                    };
                case "Rain":
                    // Grass is blooming, rain forms puddles
                    return {
                        grass: "blooming",
                        accumulation: "puddles",
                    };
                default:
                    // Grass is blooming, default to no accumulation
                    return {
                        grass: "blooming",
                        accumulation: "none",
                    };
            }
        case "Summer":
            switch (weather) {
                case "Sunny":
                    return {
                        grass:
                            prev.grass === "green" && prev.accumulation === "none"
                                ? "dry"
                                : "green",
                        accumulation: prev.accumulation === "puddles" ? "mud" : "none",
                    };
                case "Stormy":
                    // Grass is green, puddles form
                    return {
                        grass: "green",
                        accumulation: "puddles",
                    };
                default:
                    // Grass is green or dry, default to no accumulation
                    return {
                        grass: prev.grass === "green" ? "dry" : "green",
                        accumulation: "none",
                    };
            }
        case "Fall":
            switch (weather) {
                case "Sunny":
                    // Grass is green or dry, puddles turn to mud or it dries
                    return {
                        grass: prev.grass === "dry" ? "dry" : "green",
                        accumulation: prev.accumulation === "puddles" ? "mud" : "none",
                    };
                case "Cloudy":
                    // Grass is blooming, snow melts or water seeps into mud or mud dries
                    return {
                        grass: prev.grass === "dry" ? "dry" : "green",
                        accumulation: prev.accumulation === "puddles" ? "mud" : "none",
                    };
                case "Rain":
                    // Grass is green, rain forms puddles
                    return {
                        grass: "green",
                        accumulation: "puddles",
                    };
                default:
                    // Grass is green, default to no accumulation
                    return {
                        grass: "green",
                        accumulation: "none",
                    };
            }
    }
};

interface GrassColor {
    primaryColor: string;
    secondaryColor: string;
    tertiaryColor: string;
    quaternaryColor: string;
}

// Helper to map grass condition to a background color
const getGrassColor = (groundState: GroundState): GrassColor => {
    switch (groundState.grass) {
        case "dead":
        case "dry":
            return {
                primaryColor: "#D9B282",
                secondaryColor: "#BF8A49",
                tertiaryColor: "#BF913B",
                quaternaryColor: "#BA8336",
            };
        case "blooming":
            return {
                primaryColor: "#80c93b",
                secondaryColor: "#2b4900",
                tertiaryColor: "#304e15",
                quaternaryColor: "#4b7e1d",
            };
        case "green":
        default:
            return {
                primaryColor: "#80c93b",
                secondaryColor: "#2b4900",
                tertiaryColor: "#304e15",
                quaternaryColor: "#4b7e1d",
            };
    }
};

// Helper to map accumulation type to a height (as a percentage of the ground container)
const getAccumulationHeight = (acc: GroundAccumulation): string => {
    switch (acc) {
        case "none":
            return "0%";
        case "puddles":
            return "5%";
        case "mud":
            return "5%";
        case "snow":
            return "15%";
        default:
            return "0%";
    }
};

// Helper to map accumulation type to a background color
const getAccumulationColor = (acc: GroundAccumulation): string => {
    switch (acc) {
        case "none":
            return "transparent";
        case "puddles":
            return "rgba(50,100,200,0.5)";
        case "mud":
            return "rgba(101,67,33,0.8)";
        case "snow":
            return "rgba(255,255,255,0.8)";
        default:
            return "transparent";
    }
};

export default function Ground({ weather, season }: GroundProps) {
    // Initialize ground state; you may change these defaults as needed.
    const [groundState, setGroundState] = useState<GroundState>({
        grass: "green",
        accumulation: "none",
    });

    // Use memo to calculate grass color only when groundState changes.
    const grassColor = useMemo(() => getGrassColor(groundState), [groundState]);

    // Use functional update to calculate and update ground state only when weather or season change.
    useEffect(() => {
        setGroundState((prevState) => {
            const newState = calculateGroundState(weather, season, prevState);
            if (
                newState.grass !== prevState.grass ||
                newState.accumulation !== prevState.accumulation
            ) {
                console.log(
                    `Season: ${season} weather: ${weather} grass: ${newState.grass} accumulation: ${newState.accumulation}`
                );
                return newState;
            }
            return prevState;
        });
    }, [weather, season]);

    // Set CSS variable --vh to 1% of window.innerHeight
    useEffect(() => {
      const setVh = () => {
        document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
      };
      setVh();
      window.addEventListener('resize', setVh);
      return () => window.removeEventListener('resize', setVh);
    }, []);

    return (
        <Box
            sx={{
                position: "fixed",
                bottom: 0,
                left: 0,
                width: "100vw",
                height: "calc(var(--vh, 1vh) * 10 + env(safe-area-inset-bottom))",
                paddingBottom: "env(safe-area-inset-bottom)",
                overflow: "hidden",
            }}
        >
            {/* Grass layer */}
            <Box
                sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: -2,
                    transition: "background-color 2s ease",
                }}
            >
                <Grass
                    primaryColor={grassColor.primaryColor}
                    secondaryColor={grassColor.secondaryColor}
                    tertiaryColor={grassColor.secondaryColor}
                    quaternaryColor={grassColor.primaryColor}
                />
            </Box>
            {/* Accumulation layer */}
            <Box
                sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: getAccumulationHeight(groundState.accumulation),
                    backgroundColor: getAccumulationColor(groundState.accumulation),
                    zIndex: -1,
                    transition:
                        "height 2s ease, background-color 2s ease, opacity 2s ease",
                }}
            />
        </Box>
    );
}