"use client";

import React from "react";
import Box from "@mui/material/Box";

export default function Clear() {
  return (
    <>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -4,
          background: "linear-gradient(180deg, #7ba7e0, #a1c4fd)", // Darker, more muted sky gradient
          opacity: 0.9, // Slightly reduce opacity to blend better
          transition: "opacity 2s ease-in-out",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "20%",
          left: "70%",
          width: "200px",
          height: "200px",
          background: "radial-gradient(circle at center, #fff9c4, #fdd835 60%, rgba(253,216,53,0) 80%)",
          borderRadius: "50%",
          filter: "blur(40px)",
          opacity: 0.8,
          zIndex: -3,
        }}
      />
    </>
  );
}