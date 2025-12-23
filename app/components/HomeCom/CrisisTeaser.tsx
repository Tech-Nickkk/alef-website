"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTitle from "../CommonCom/AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

export default function CrisisTeaser() {
    const sectionRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (imageRef.current) {
                gsap.fromTo(imageRef.current,
                    { scale: 1.1 },
                    {
                        scale: 1,
                        ease: "none",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true,
                        },
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 px-6 md:px-12 lg:px-24 bg-theme-black border-t border-theme-white/10">
            <div className="max-w-[1400px] mx-auto">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-theme-white/10 pb-6 gap-4">
                    <AnimatedTitle
                        text="CRISIS UPDATE"
                        className="text-4xl md:text-6xl font-bold font-bebas text-theme-white uppercase leading-none"
                    />
                    <div className="flex items-center gap-2 text-theme-white/60 font-oswald text-xs tracking-widest mb-2">
                        <span className="w-2 h-2 bg-theme-accent rounded-full inline-block animate-pulse"></span>
                        SITUATION ANALYSIS 2024
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Text Card */}
                    <div className="bg-card-bg border border-theme-white/10 rounded-2xl p-8 md:p-12 flex flex-col justify-between h-full min-h-[500px] relative group hover:border-theme-white/30 transition-colors duration-500">

                        {/* Technical Label */}
                        <div className="flex justify-between items-start mb-8 font-oswald text-xs tracking-widest text-theme-white/60">
                            <span>02</span>
                            <span>BRIEFING // SECURITY</span>
                        </div>

                        <div className="space-y-8 relative z-10 flex-1">
                            <div className="space-y-4">
                                <h3 className="text-2xl md:text-3xl text-theme-white font-bebas tracking-wide leading-normal">
                                    THE MILITARY DEFEAT OF HEZBOLLAH DOES NOT MEAN THE END OF THE CRISIS.
                                </h3>
                                <h4 className="text-theme-accent font-bebas text-xl tracking-wider">
                                    WHAT HAS CHANGED?
                                </h4>
                            </div>

                            {/* <div className="w-12 h-[2px] bg-theme-accent"></div> */}

                            <div className="space-y-6 text-lg text-theme-white/60 font-oswald leading-relaxed">
                                <p>
                                    Despite the collapse of 80% of Hezbollah’s arsenal, Lebanon remains held hostage by archaic laws and a political vacuum. The 1955 Boycott Law remains fully enforced, and normalizing relations with Israel is still a felony. Understanding this legal minefield is critical for the next phase of Lebanon's sovereignty.
                                </p>
                            </div>
                        </div>

                        <div className="mt-12 pt-8 border-t border-theme-white/10 flex justify-between items-center">
                            <Link href="/research/crisis-2024" className="group/btn flex items-center gap-4 w-full justify-between relative">
                                <span className="text-theme-white font-bebas text-xl tracking-wider group-hover/btn:text-theme-accent transition-colors relative">
                                    FULL INTELLIGENCE REPORT
                                    <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-theme-accent transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-500 origin-right group-hover/btn:origin-left ease-out"></span>
                                </span>
                                <div className="w-12 h-12 border border-theme-white/20 rounded-full flex items-center justify-center group-hover/btn:bg-theme-accent group-hover/btn:border-theme-accent transition-all duration-300 bg-theme-black">
                                    <ArrowRight className="w-5 h-5 text-theme-white" />
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Image Card */}
                    <div className="bg-card-bg border border-theme-white/10 rounded-2xl p-2 h-full min-h-[500px] relative overflow-hidden group">
                        <div className="relative w-full h-full rounded-xl overflow-hidden">
                            <Image
                                ref={imageRef}
                                src="/home/Hezbollah_ALEF.jpeg"
                                alt="Crisis in Lebanon"
                                fill
                                className="object-cover transition-all duration-700 grayscale group-hover:grayscale-0"
                            />
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-linear-to-t from-theme-black/80 via-transparent to-transparent opacity-60"></div>
                        </div>

                        {/* Overlay Elements */}
                        <div className="absolute top-6 left-6 z-10">
                            <div className="px-3 py-1 border border-theme-accent/50 bg-theme-accent/10 rounded text-theme-accent font-oswald text-xs tracking-widest">
                                CRITICAL ALERT
                            </div>
                        </div>

                        <div className="absolute bottom-6 right-6 z-10 font-oswald text-xs tracking-widest text-theme-white bg-black/50 px-4 py-2 backdrop-blur-md border border-theme-white/10 rounded-full">
                            LOC: SOUTH_LEBANON // REF_2024
                        </div>
                    </div>

                </div>
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
