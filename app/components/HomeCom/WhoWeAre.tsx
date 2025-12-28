"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTitle from "../CommonCom/AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const sections = [
    {
        id: "01",
        subtitle: "IDENTITY",
        title: "ALEF Profile",
        description: "A collective of Lebanese and American professionals united by a shared vision of a free, sovereign, and prosperous Lebanon.",
        href: "/alef-profile",
        icon: (
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        )
    },
    {
        id: "02",
        subtitle: "PRINCIPLES",
        title: "Core Values",
        description: "Sovereignty, Transparency, Economic Freedom, Rule of Law, and Meritocracy. We believe in ethical governance.",
        href: "/core-values",
        icon: (
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <circle cx="12" cy="10" r="3" />
            </svg>
        )
    },
    {
        id: "03",
        subtitle: "FUTURE",
        title: "Strategic plan",
        description: "To establish a transparent, accountable, and self-sustaining Lebanon, free from external influence, where justice prevails.",
        href: "/strategic-plan",
        icon: (
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
            </svg>
        )
    },
    {
        id: "04",
        subtitle: "LEADERSHIP",
        title: "Resident Activists",
        description: "Meet the dedicated officers, directors, and advisors driving our mission forward, led by Ziad K. Abdelnour.",
        href: "/resident-activists",
        icon: (
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        )
    }
];

export default function WhoWeAre() {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const container = containerRef.current;
        const section = sectionRef.current;
        const progressBar = progressBarRef.current;

        if (!container || !section || !progressBar) return;

        const getScrollAmount = () => {
            return -(container.scrollWidth - window.innerWidth);
        };

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: () => `+=${container.scrollWidth - window.innerWidth}`,
                pin: true,
                scrub: 1,
                anticipatePin: 1,
                invalidateOnRefresh: true,
            }
        });

        tl.to(container, {
            x: getScrollAmount,
            ease: "none",
        });

        // Progress bar animation
        tl.to(progressBar, {
            scaleX: 1,
            ease: "none"
        }, 0);

    }, { scope: sectionRef, dependencies: [] });

    return (
        <section ref={sectionRef} className="h-screen bg-theme-black overflow-hidden flex flex-col justify-center relative">

            {/* Top Bar with Progress */}
            <div className="absolute top-12 left-0 w-full px-6 md:px-12 lg:px-24">
                <div className="flex flex-col items-center justify-center mb-10 md:mb-4 gap-4 text-center">
                    <AnimatedTitle
                        text="WHO WE ARE"
                        className="text-4xl md:text-6xl font-bold font-bebas text-theme-white uppercase leading-none"
                    />
                    <div className="flex items-center gap-2 text-theme-white/60 font-oswald text-xs tracking-widest">
                        <span className="w-2 h-2 bg-theme-accent rounded-full inline-block"></span>
                        MISSION // VISION
                    </div>
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
            <div ref={containerRef} className="flex gap-8 pl-6 md:pl-12 lg:pl-24 pr-6 md:pr-12 lg:pr-24 w-fit pt-24 md:pt-44">
                {sections.map((item, idx) => (
                    <div key={idx} className="relative group shrink-0 w-[85vw] md:w-[600px] h-[65vh] md:h-[500px]">
                        <Link href={item.href} className="block h-full">
                            <div className="bg-card-bg border border-theme-white/10 hover:border-theme-white/30 transition-all duration-300 h-full rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden hover:bg-(--color-card-hover)">

                                {/* Top Row */}
                                <div className="flex justify-between items-start font-oswald text-xs tracking-widest text-white/60">
                                    <span>{item.id}</span>
                                    <span>{item.subtitle}</span>
                                </div>

                                {/* Center Icon */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                                    {item.icon}
                                </div>

                                {/* Bottom Row */}
                                <div className="relative z-10 flex flex-col justify-end h-full">
                                    <h3 className="text-4xl md:text-7xl font-bebas text-white uppercase leading-none mb-4">
                                        {item.title}
                                    </h3>
                                    <p className="font-oswald text-white/70 text-sm md:text-base leading-relaxed max-w-md">
                                        {item.description}
                                    </p>
                                </div>

                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
}