"use client";

import React, { useReducer, useEffect } from "react";
import Box from "@mui/material/Box";
import Cloud from "./conditions/Cloud";
import Snow from "./conditions/Snow";
import Rain from "./conditions/Rain";
import Clear from "./conditions/Clear";
import Ground from "./ground/Ground";
import { Weather } from "./Weather";
import { Season } from "./Season";
import { useVisibility } from "@/context/VisibilityProvider";
import Storm from "./conditions/Storm";

// Define the allowed seasons and weather for each season.
const seasons: Season[] = ["Winter", "Spring", "Summer", "Fall"];
const seasonWeatherMapping: { [key in Season]: Weather[] } = {
    Winter: ["Snow", "Cloudy", "Sunny"],
    Spring: ["Rain", "Cloudy", "Sunny"],
    Summer: ["Stormy", "Sunny"],
    Fall: ["Rain", "Cloudy", "Sunny"],
};

interface GroundCycleState {
    season: Season;
    weather: Weather;
    weatherCount: number; // how many weather changes have occurred in the current season
    weatherTarget: number; // target number of weather changes for this season
}

type Action =
    | { type: "NEXT_WEATHER" }
    | { type: "SET_RANDOM_TARGET"; target: number };

function reducer(state: GroundCycleState, action: Action): GroundCycleState {
    switch (action.type) {
        case "SET_RANDOM_TARGET":
            return { ...state, weatherTarget: action.target };
        case "NEXT_WEATHER": {
            // Choose a new weather for the current season, ensuring it's not the same as the previous one.
            const possibilities = seasonWeatherMapping[state.season].filter(
                (w) => w !== state.weather
            );
            const newWeather =
                possibilities[Math.floor(Math.random() * possibilities.length)];

            const newCount = state.weatherCount + 1;
            // If we've reached the target count for this season, advance the season.
            if (newCount >= state.weatherTarget) {
                const currentIndex = seasons.indexOf(state.season);
                const nextSeason = seasons[(currentIndex + 1) % seasons.length];
                return {
                    season: nextSeason,
                    weather: seasonWeatherMapping[nextSeason][0],
                    weatherCount: 0,
                    weatherTarget: 2, // start with a deterministic target; will update on client mount
                };
            }
            return {
                ...state,
                weather: newWeather,
                weatherCount: newCount,
            };
        }
        default:
            return state;
    }
}

const WEATHER_TRANSITION_DURATION = '5'; // seconds
const WEATHER_TRANSITION = `opacity ${WEATHER_TRANSITION_DURATION}s ease-in-out`;
const WEATHER_DURATION = 40000; // ms

export default function WeatherBackground() {
    const [state, dispatch] = useReducer(reducer, {
        season: "Winter",
        weather: seasonWeatherMapping["Winter"][0],
        weatherCount: 0,
        weatherTarget: 2, // Deterministic value for SSR/hydration consistency
    });
    const { isVisible } = useVisibility();

    // On mount, update the weatherTarget with a random value (2 or 3)
    useEffect(() => {
        dispatch({
            type: "SET_RANDOM_TARGET",
            target: Math.floor(Math.random() * 2) + 2,
        });
    }, []);

    // Only start or resume the interval if the page is visible.
    useEffect(() => {
        if (!isVisible) return;
        const interval = setInterval(() => {
            dispatch({ type: "NEXT_WEATHER" });
        }, WEATHER_DURATION);
        return () => clearInterval(interval);
    }, [isVisible]);

    return (
        <Box
            sx={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100dvh",
                overflow: "hidden",
                pointerEvents: "none",
                zIndex: -1,
            }}
        >
            {/* Render weather layers with opacity transitions */}
            <Box
                sx={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100dvh",
                    opacity: state.weather === "Sunny" ? 1 : 0,
                    transition: WEATHER_TRANSITION,
                }}
            >
                <Clear />
            </Box>
            <Box
                sx={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100dvh",
                    opacity: state.weather === "Rain" ? 1 : 0,
                    transition: WEATHER_TRANSITION,
                }}
            >
                <Rain />
            </Box>
            <Box
                sx={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100dvh",
                    opacity: state.weather === "Snow" ? 1 : 0,
                    transition: WEATHER_TRANSITION,
                }}
            >
                <Snow />
            </Box>
            <Box
                sx={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100dvh",
                    opacity: state.weather === "Cloudy" ? 1 : 0,
                    transition: WEATHER_TRANSITION,
                }}
            >
                <Cloud ceiling={2} />
            </Box>
            <Box
                sx={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100dvh",
                    opacity: state.weather === "Stormy" ? 1 : 0,
                    transition: WEATHER_TRANSITION,
                }}
            >
                <Storm />
            </Box>
            <Ground weather={state.weather} season={state.season} />
            <Box
                sx={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100dvh",
                    backgroundColor: "rgba(0,0,0,0.1)",
                    backdropFilter: "blur(2px) brightness(0.9)",
                    zIndex: 0,
                    pointerEvents: "none",
                }}
            />
        </Box>
    );
}