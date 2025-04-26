"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Box } from "@mui/material";
import Rain from "./Rain";
import { useVisibility } from "@/context/VisibilityProvider";

export default function Storm() {
    const { isVisible } = useVisibility();
    const [flash, setFlash] = useState(false);
    // Use a ref to store all active timeout IDs for cleanup.
    const timeoutsRef = useRef<number[]>([]);

    // Helper: generate a random integer between min and max (inclusive).
    const randInt = (min: number, max: number): number =>
        Math.floor(Math.random() * (max - min + 1)) + min;

    // Trigger a sequence of flashes.
    const triggerFlashSequence = useCallback(() => {
        const flashCount = randInt(1, 4);
        const doFlash = (n: number) => {
            if (n <= 0) return;
            // Flash duration between 50 and 200ms.
            const flashDuration = randInt(50, 200);
            setFlash(true);
            const timeoutId1 = window.setTimeout(() => {
                setFlash(false);
                if (n > 1) {
                    // Break between flashes between 50 and 200ms.
                    const breakDuration = randInt(50, 200);
                    const timeoutId2 = window.setTimeout(() => {
                        doFlash(n - 1);
                    }, breakDuration);
                    timeoutsRef.current.push(timeoutId2);
                }
            }, flashDuration);
            timeoutsRef.current.push(timeoutId1);
        };

        doFlash(flashCount);

        // Schedule the next flash sequence after a random delay between 5000 and 15000ms.
        const nextDelay = randInt(5000, 15000);
        const timeoutId3 = window.setTimeout(triggerFlashSequence, nextDelay);
        timeoutsRef.current.push(timeoutId3);
    }, []);

    useEffect(() => {
        if (!isVisible) return;
        // Schedule the first flash sequence after a random initial delay.
        const initialDelay = randInt(5000, 15000);
        const initialTimeout = window.setTimeout(triggerFlashSequence, initialDelay);
        timeoutsRef.current.push(initialTimeout);

        return () => {
            // Clean up all timeouts.
            timeoutsRef.current.forEach((id) => clearTimeout(id));
            timeoutsRef.current = [];
        };
    }, [isVisible, triggerFlashSequence]);

    return (
        <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
            <Rain />
            {/* Lightning overlay */}
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    pointerEvents: "none",
                    zIndex: 1,
                    backgroundColor: flash ? "rgba(220,220,255,0.1)" : "transparent",
                    transition: "background-color 0.15s ease-in-out",
                }}
            />
        </Box>
    );
}