"use client";

import { useEffect, useRef, useState } from "react";

export default function GlowingGrid() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [columns, setColumns] = useState(0);
    const [rows, setRows] = useState(0);

    // Initialize grid size logic
    useEffect(() => {
        const updateGridSize = () => {
            if (!containerRef.current) return;
            const width = containerRef.current.offsetWidth;
            const height = containerRef.current.offsetHeight;
            const size = 40; // Size of each grid square in px
            setColumns(Math.ceil(width / size));
            setRows(Math.ceil(height / size));
        };

        updateGridSize();
        window.addEventListener("resize", updateGridSize);
        return () => window.removeEventListener("resize", updateGridSize);
    }, []);

    // Use a ref for mouse position to avoid re-renders on every mouse move
    const mousePosition = useRef({ x: -1000, y: -1000 });

    const fadeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container || !container.parentElement) return;

        const parent = container.parentElement;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = parent.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            mousePosition.current = { x, y };

            // Update CSS variables for the mask and opacity
            if ((e.target as HTMLElement).closest("a, button")) {
                container.style.setProperty("--glow-opacity", "0");
            } else {
                container.style.setProperty("--mouse-x", `${x}px`);
                container.style.setProperty("--mouse-y", `${y}px`);
                container.style.setProperty("--glow-opacity", "1");
            }

            if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);

            fadeTimeoutRef.current = setTimeout(() => {
                container.style.setProperty("--glow-opacity", "0");
            }, 300); // Fade out delay
        };

        const handleMouseLeave = () => {
            container.style.setProperty("--glow-opacity", "0");
        };

        parent.addEventListener("mousemove", handleMouseMove);
        parent.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            parent.removeEventListener("mousemove", handleMouseMove);
            parent.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
        >
            {/* 1. Base Grid Layer (Dim Lines) */}
            <div
                className="absolute inset-0 z-0 opacity-[0.05]"
                style={{
                    backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            ></div>

            {/* 2. Glowing Layer (Highlighted Lines/Fills) */}
            <div
                className="absolute inset-0 z-10 transition-opacity duration-300 ease-out"
                style={{
                    opacity: 'var(--glow-opacity, 0)',
                    maskImage: `radial-gradient(
            300px circle at var(--mouse-x, -100%) var(--mouse-y, -100%), 
            black 0%, 
            transparent 70%
          )`,
                    WebkitMaskImage: `radial-gradient(
            300px circle at var(--mouse-x, -100%) var(--mouse-y, -100%), 
            black 0%, 
            transparent 70%
          )`
                }}
            >
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
              linear-gradient(rgba(227, 27, 35, 0.2) 1px, transparent 1px), 
              linear-gradient(90deg, rgba(227, 27, 35, 0.2) 1px, transparent 1px)
            `,
                        backgroundSize: '40px 40px',
                        boxShadow: 'inset 0 0 100px rgba(227, 27, 35, 0.05)'
                    }}
                ></div>

                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(227, 27, 35, 0.1) 2px, transparent 0)`,
                        backgroundSize: '40px 40px',
                        backgroundPosition: '-1px -1px'
                    }}
                />

                <div
                    className="absolute inset-0 mix-blend-screen"
                    style={{
                        backgroundImage: `linear-gradient(rgba(227,27,35,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(227,27,35,0.05) 1px, transparent 1px)`,
                        backgroundSize: '40px 40px',
                        filter: 'blur(1px)'
                    }}
                />
            </div>

            {/* 3. The "Solid Square" Highlight */}
            <div
                className="absolute inset-0 z-20 transition-opacity duration-300 ease-out"
                style={{
                    opacity: 'var(--glow-opacity, 0)',
                    maskImage: `radial-gradient(
            150px circle at var(--mouse-x, -100%) var(--mouse-y, -100%), 
            black 0%, 
            transparent 100%
          )`,
                    WebkitMaskImage: `radial-gradient(
            150px circle at var(--mouse-x, -100%) var(--mouse-y, -100%), 
            black 0%, 
            transparent 100%
          )`
                }}
            >
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundColor: 'rgba(227, 27, 35, 0.02)',
                        backgroundImage: `
                 linear-gradient(rgba(227, 27, 35, 0.6) 1px, transparent 1px), 
                 linear-gradient(90deg, rgba(227, 27, 35, 0.6) 1px, transparent 1px)
               `,
                        backgroundSize: '40px 40px',
                    }}
                />
            </div>

        </div>
    );
}
