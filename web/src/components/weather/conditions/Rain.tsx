"use client";

import React, { useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import { useVisibility } from "@/context/VisibilityProvider";

interface Raindrop {
  x: number;
  y: number;
  len: number;
  speed: number;
}

export default function Rain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isVisible } = useVisibility();

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Initialize an array of raindrops
    const drops: Raindrop[] = Array.from({ length: 50 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      len: 10 + Math.random() * 20,
      speed: 2 + Math.random() * 4,
    }));

    let animationFrameId: number;

    // Handle window resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Draw loop
    const draw = () => {
      if (isVisible) {
        ctx.clearRect(0, 0, width, height);
        ctx.strokeStyle = "rgba(255,255,255,0.7)";
        ctx.lineWidth = 1;

        drops.forEach((drop) => {
          ctx.beginPath();
          ctx.moveTo(drop.x, drop.y);
          ctx.lineTo(drop.x, drop.y + drop.len);
          ctx.stroke();

          drop.y += drop.speed;
          if (drop.y > height) {
            drop.y = -drop.len;
            drop.x = Math.random() * width;
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
          background: "linear-gradient(180deg, #4a4a4a, #1f1f1f)",
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