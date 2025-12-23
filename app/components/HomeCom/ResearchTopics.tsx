"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTitle from "../CommonCom/AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const topics = [
    {
        id: "01",
        count: "45 ARTICLES",
        title: "Politics in Lebanon",
        description: "Analysis of political instability and terrorism's influence on governance",
        icon: (
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-theme-white">
                <path d="M3 21h18" />
                <path d="M5 21V7" />
                <path d="M19 21V7" />
                <path d="M4 7h16" />
                <path d="m12 2 8 5H4Z" />
                <line x1="12" y1="11" x2="12" y2="17" />
            </svg>
        )
    },
    {
        id: "02",
        count: "45 ARTICLES",
        title: "Economy & Impact",
        description: "Research on economic disruption caused by terrorism and strategies for recovery",
        icon: (
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-theme-white">
                <line x1="12" y1="20" x2="12" y2="10" />
                <line x1="18" y1="20" x2="18" y2="4" />
                <line x1="6" y1="20" x2="6" y2="16" />
                <path d="M2 17l6-6 4 4 6-10" />
            </svg>
        )
    },
    {
        id: "03",
        count: "45 ARTICLES",
        title: "Culture and Society",
        description: "Exploring cultural resilience and community initiatives against extremism",
        icon: (
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-theme-white">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.77 10-10 10Z" />
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
            </svg>
        )
    },
    {
        id: "04",
        count: "45 ARTICLES",
        title: "Policy Strategies",
        description: "Expert perspectives on counter-terrorism strategies and policy recommendations",
        icon: (
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-theme-white">
                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                <line x1="4" y1="22" x2="4" y2="15" />
            </svg>
        )
    }
];

export default function ResearchTopics() {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const container = containerRef.current;
            const section = sectionRef.current;
            const progressBar = progressBarRef.current;

            if (!container || !section || !progressBar) return;

            const totalScroll = container.scrollWidth - window.innerWidth + 100; // Extra padding

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: `+=${totalScroll}`,
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    refreshPriority: 1,
                }
            });

            tl.to(container, {
                x: () => -(container.scrollWidth - window.innerWidth + 96), // Scroll to end with some padding
                ease: "none",
            });

            // Progress bar animation
            tl.to(progressBar, {
                scaleX: 1,
                ease: "none"
            }, 0);

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="h-screen bg-theme-black overflow-hidden flex flex-col justify-center relative">

            {/* Top Bar with Progress */}
            <div className="absolute top-12 left-0 w-full px-6 md:px-12 lg:px-24">
                <div className="flex justify-center items-end mb-4">
                    <AnimatedTitle
                        text="RESEARCH & TOPICS"
                        className="text-4xl md:text-6xl font-bold font-bebas text-theme-white uppercase leading-none"
                    />
                </div>

                {/* Progress Bar Track */}
                <div className="w-full h-[2px] bg-theme-white/10 relative">
                    {/* Progress Bar Fill */}
                    <div
                        ref={progressBarRef}
                        className="absolute inset-y-0 left-0 bg-theme-accent w-full origin-left scale-x-0"
                    />
                </div>
            </div>

            {/* Horizontal Scroll Container */}
            <div ref={containerRef} className="flex gap-8 pl-6 md:pl-12 lg:pl-24 w-fit pt-20">
                {topics.map((topic, idx) => (
                    <div key={idx} className="relative group shrink-0 w-[85vw] md:w-[600px] h-[50vh] md:h-[500px]">
                        <Link href={`/research/${topic.title.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`} className="block h-full">
                            <div className="bg-card-bg border border-theme-white/10 hover:border-theme-white/30 transition-all duration-300 h-full rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden hover:bg-[var(--color-card-hover)]">

                                {/* Top Row */}
                                <div className="flex justify-between items-start font-oswald text-xs tracking-widest text-theme-white/60">
                                    <span>{topic.id}</span>
                                    <span>{topic.count}</span>
                                </div>

                                {/* Center Icon */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                                    {topic.icon}
                                </div>

                                {/* Bottom Row */}
                                <div className="relative z-10 flex justify-between items-end">
                                    <h3 className="text-5xl md:text-7xl font-bebas text-theme-white uppercase leading-none w-full">
                                        {topic.title}
                                    </h3>
                                </div>

                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
}

function ArrowRight({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    );
}