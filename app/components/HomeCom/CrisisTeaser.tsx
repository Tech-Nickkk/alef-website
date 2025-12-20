"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTitle from "../CommonCom/AnimatedTitle";
import AnimatedParagraph from "../CommonCom/AnimatedParagraph";

gsap.registerPlugin(ScrollTrigger);

export default function CrisisTeaser() {
    const sectionRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (imageRef.current) {
                gsap.fromTo(imageRef.current,
                    {
                        yPercent: 10,
                    },
                    {
                        yPercent: -10,
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
        <section ref={sectionRef} className="py-24 px-6 md:px-12 lg:px-24 bg-white">
            <div className="max-w-[1400px] mx-auto">
                <AnimatedTitle
                    text="What Has Changed Since 2024?"
                    className="text-3xl md:text-5xl font-bold text-[#1a2b4b] font-cormorant leading-tight text-center mb-16"
                />
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    <div className="flex-1 space-y-8">
                        <AnimatedTitle
                            text="The military defeat of Hezbollah does not mean the end of the crisis."
                            as="h3"
                            className="text-xl md:text-2xl font-bold text-[#E31B23] font-cormorant"
                        />



                        <div className="space-y-6 text-lg text-gray-600 font-optima leading-relaxed">
                            <AnimatedParagraph
                                text="Despite the collapse of 80% of Hezbollah’s arsenal, Lebanon remains held hostage by archaic laws and a political vacuum. The 1955 Boycott Law remains fully enforced, and normalizing relations with Israel is still a felony. Understanding this legal minefield is critical for the next phase of Lebanon's sovereignty."
                            />
                        </div>

                        <Link href="/research/crisis-2024" className="inline-block">
                            <button className="bg-[#E31B23] hover:bg-[#c4151c] text-white px-8 py-3.5 text-sm font-semibold transition-all shadow-lg flex items-center gap-2 font-optima uppercase tracking-wider">
                                Read Article
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </Link>
                    </div>

                    <div className="flex-1 w-full relative h-[300px] lg:h-[400px] overflow-hidden shadow-2xl">
                        <Image
                            ref={imageRef}
                            src="/home/Hezbollah_ALEF.jpeg"
                            alt="Crisis in Lebanon"
                            fill
                            className="object-cover scale-120"
                        />
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
