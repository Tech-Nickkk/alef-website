"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTitle from "../CommonCom/AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const topics = [
    {
        title: "Politics in Lebanon",
        description: "Analysis of political instability and terrorism's influence on governance",
        count: "45 articles",
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#E31B23]">
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
        title: "Economy & Terrorism Impacts",
        description: "Research on economic disruption caused by terrorism and strategies for recovery",
        count: "45 articles",
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#E31B23]">
                <line x1="12" y1="20" x2="12" y2="10" />
                <line x1="18" y1="20" x2="18" y2="4" />
                <line x1="6" y1="20" x2="6" y2="16" />
                <path d="M2 17l6-6 4 4 6-10" />
            </svg>
        )
    },
    {
        title: "Culture and Society",
        description: "Exploring cultural resilience and community initiatives against extremism",
        count: "45 articles",
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#E31B23]">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.77 10-10 10Z" />
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
            </svg>
        )
    },
    {
        title: "Opinions & Strategies",
        description: "Expert perspectives on counter-terrorism strategies and policy recommendations",
        count: "45 articles",
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#E31B23]">
                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                <line x1="4" y1="22" x2="4" y2="15" />
            </svg>
        )
    }
];

export default function ResearchTopics() {
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            cardsRef.current.forEach((card, index) => {
                const speed = 100 + (index * 50); // Increased movement range
                const rotation = index % 2 === 0 ? 6 : -6; // Alternate small rotation

                gsap.fromTo(card,
                    {
                        y: 200,
                        rotation: 0
                    },
                    {
                        y: -speed,
                        rotation: rotation,
                        ease: "none",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: 1,
                        },
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const addToRefs = (el: HTMLDivElement | null) => {
        if (el && !cardsRef.current.includes(el)) {
            cardsRef.current.push(el);
        }
    };

    return (
        <section ref={sectionRef} className="py-40 px-6 md:px-12 lg:px-24 bg-[#f2f2f2] overflow-hidden">
            <div className="max-w-[1400px] mx-auto">
                {/* Header */}
                {/* Header */}
                <AnimatedTitle
                    text="Research & Topics"
                    className="text-3xl md:text-5xl text-center mb-16 leading-tight font-cormorant text-[#1a2b4b] font-bold"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {topics.map((topic, idx) => (
                        <div key={idx} ref={addToRefs} className={`h-full ${idx % 2 === 0 ? 'mt-0' : 'mt-12'}`}>
                            <Link href={`/research/${topic.title.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}>
                                <div className="group bg-white p-8 rounded-4xl shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-[#E31B23]/10 h-full flex flex-col min-h-[320px]">
                                    {/* Icon */}
                                    <div className="mb-6 transform group-hover:-translate-y-1 transition-transform duration-300">
                                        {topic.icon}
                                    </div>

                                    {/* Content */}
                                    <div className="space-y-3 mb-8">
                                        <h3 className="text-xl font-bold text-[#1a2b4b] font-cormorant leading-tight">
                                            {topic.title}
                                        </h3>
                                        <p className="text-sm text-gray-500 font-optima leading-relaxed">
                                            {topic.description}
                                        </p>
                                    </div>

                                    {/* Footer */}
                                    <div className="mt-auto flex items-center justify-between pt-4">
                                        <span className="text-sm font-medium text-[#1a2b4b] font-optima">
                                            {topic.count}
                                        </span>
                                        <span className="text-[#E31B23] transform group-hover:translate-x-2 transition-transform duration-300">
                                            <ArrowRight className="w-6 h-6" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
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