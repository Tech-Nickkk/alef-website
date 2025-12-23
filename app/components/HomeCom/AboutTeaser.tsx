"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTitle from "../CommonCom/AnimatedTitle";


gsap.registerPlugin(ScrollTrigger);


export default function AboutTeaser() {
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
                        text="WHO WE ARE"
                        className="text-4xl md:text-6xl font-bold font-bebas text-theme-white uppercase leading-none"
                    />
                    <div className="flex items-center gap-2 text-theme-white/60 font-oswald text-xs tracking-widest mb-2">
                        <span className="w-2 h-2 bg-theme-accent rounded-full inline-block"></span>
                        MISSION STATEMENT
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Text Card */}
                    <div className="bg-card-bg border border-theme-white/10 rounded-2xl p-8 md:p-12 flex flex-col justify-between h-full min-h-[500px] relative group hover:border-theme-white/30 transition-colors duration-500">

                        {/* Technical Label */}
                        <div className="flex justify-between items-start mb-8 font-oswald text-xs tracking-widest text-theme-white/60">
                            <span>01</span>
                            <span>IDENTITY // CORE</span>
                        </div>

                        <div className="space-y-8 relative z-10 flex-1">
                            <h3 className="text-2xl md:text-3xl text-theme-white font-bebas tracking-wide leading-normal">
                                WE ARE THE BRIDGE BETWEEN THE DIASPORA AND A FREE LEBANON.
                            </h3>

                            <div className="space-y-6 text-lg text-theme-white/60 font-oswald leading-relaxed">
                                <p>
                                    The American Lebanon Education Foundation (ALEF) is united by a vision of sovereignty, operating as an independent movement committed to dismantling corruption and restoring the rule of law.
                                </p>
                                <p>
                                    We do not just advocate for change; we drive policy solutions that engage international decision-makers to ensure Lebanon’s reconstruction is built on meritocracy, justice, and economic freedom, not militia rule.
                                </p>
                            </div>
                        </div>

                        <div className="mt-12 pt-8 border-t border-theme-white/10 flex justify-between items-center">
                            <Link href="/about-us" className="group/btn flex items-center gap-4 w-full justify-between relative">
                                <span className="text-theme-white font-bebas text-xl tracking-wider group-hover/btn:text-theme-accent transition-colors relative">
                                    READ FULL MANIFESTO
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
                                src="/home/hero-img.png"
                                alt="ALEF Mission"
                                fill
                                className="object-cover transition-all duration-700 grayscale group-hover:grayscale-0"
                            />
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-linear-to-t from-theme-black/80 via-transparent to-transparent opacity-60"></div>
                        </div>

                        {/* Overlay Elements */}
                        <div className="absolute top-6 right-6 z-10">
                            <div className="w-20 h-20 border border-theme-white/20 rounded-full flex items-center justify-center animate-spin-slow">
                                <div className="w-2 h-2 bg-theme-accent rounded-full"></div>
                            </div>
                        </div>

                        <div className="absolute bottom-6 left-6 z-10 font-oswald text-xs tracking-widest text-theme-white bg-black/50 px-4 py-2 backdrop-blur-md border border-theme-white/10 rounded-full">
                            IMG_REF_01 // BEIRUT_ARCHIVE
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