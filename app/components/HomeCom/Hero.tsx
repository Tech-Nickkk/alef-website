"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Navbar from "../CommonCom/Navbar";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const heroRef = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (imageRef.current) {
                gsap.to(imageRef.current, {
                    yPercent: 20, // Move image down by 20% of its height
                    ease: "none",
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: true,
                    },
                });
            }
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={heroRef} className="relative min-h-screen flex flex-col overflow-hidden">
            {/* Background Image */}
            <div ref={imageRef} className="absolute inset-0 z-0 scale-110 hero-image">
                <Image
                    src="/home/hero-img.png"
                    alt="Lebanon Coastline"
                    fill
                    className="object-cover"
                    priority
                    quality={100}
                />
                <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/30 to-transparent" />
                <div className="absolute inset-0 bg-black/20" />
            </div>

            <Navbar />

            {/* Hero Content */}
            <div className="relative z-10 flex-1 flex flex-col justify-center items-center px-6 md:px-12 lg:px-24 pb-20 w-full max-w-[1920px] mx-auto text-center">
                <div className="max-w-4xl space-y-8 hero-content opacity-0">
                    <h1 className="text-3xl md:text-5xl lg:text-7xl font-cormorant">
                        Exposing Hezbollah’s<br />
                        <span className="text-white">Grip Latest Analysis</span>
                    </h1>

                    <p className="text-lg md:text-2xl text-gray-200 max-w-2xl leading-relaxed font-optima">
                        Educating to Eradicate Terrorism in Lebanon <br />
                        <span className="text-gray-200">Quality. Independence. Impact.</span>
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4">
                        <button className="group bg-[#E31B23] hover:bg-[#c4151c] text-white px-8 py-3 text-sm font-semibold transition-all shadow-lg shadow-red-900/30 flex items-center gap-3 w-full sm:w-auto justify-center uppercase tracking-widest rounded-none font-optima">
                            Explore Research
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>

                        <button className="group border border-white hover:bg-white hover:text-black text-white px-8 py-3 text-sm font-medium transition-all backdrop-blur-sm w-full sm:w-auto justify-center uppercase tracking-widest rounded-none font-optima">
                            Subscribe to Updates
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

function ArrowRight({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    );
}