"use client";

import React, { useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import { useVisibility } from "@/context/VisibilityProvider";

interface Snowflake {
  x: number;
  y: number;
  radius: number;
  speed: number;
  drift: number;
}

export default function Snow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isVisible } = useVisibility();

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Create snowflakes
    const flakes: Snowflake[] = Array.from({ length: 80 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: 2 + Math.random() * 4,
      speed: 0.5 + Math.random() * 1.5,
      drift: -0.5 + Math.random() * 1,
    }));

    let animationFrameId: number;

    // Resize handler
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Draw loop
    const draw = () => {
      if (isVisible) {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";

        flakes.forEach((flake) => {
          ctx.beginPath();
          ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
          ctx.fill();

          flake.y += flake.speed;
          flake.x += flake.drift;
          // Reset position if out of bounds
          if (flake.y > height + flake.radius) {
            flake.y = -flake.radius;
            flake.x = Math.random() * width;
          }
          if (flake.x > width + flake.radius) {
            flake.x = -flake.radius;
          } else if (flake.x < -flake.radius) {
            flake.x = width + flake.radius;
          }
        });
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [isVisible]);

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -3,
          background: "linear-gradient(180deg, #dfe9f3, #aaa)",
          transition: "opacity 2s ease-in-out",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: -2,
        }}
      >
        <canvas ref={canvasRef} />
      </Box>
    </>
  );
}