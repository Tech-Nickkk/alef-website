"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register plugins inside the client component logic, but we must be careful with server-side rendering
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function ArticleProgressClient({ children }: { children: React.ReactNode }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current || !progressRef.current) return;

        gsap.to(progressRef.current, {
            height: "100%",
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top center",
                end: "bottom center",
                scrub: true,
            }
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="relative">
            {/* Scroll Progress Line */}
            <div className="absolute -left-8 md:-left-12 top-0 bottom-0 w-px bg-foreground/10 hidden xl:block">
                <div
                    ref={progressRef}
                    className="w-full bg-red origin-top h-0"
                ></div>
            </div>

            <div className="max-w-none">
                {children}
            </div>
        </div>
    );
}
