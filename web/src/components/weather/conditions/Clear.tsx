"use client";

import React from "react";
import Box from "@mui/material/Box";

export default function Clear() {
    return (
        <Box
            sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: -4,
                background: "linear-gradient(180deg, #a1c4fd, #c2e9fb)", // Clear sky
                opacity: 1,
                transition: "opacity 2s ease-in-out",
            }}
        />
    );
}