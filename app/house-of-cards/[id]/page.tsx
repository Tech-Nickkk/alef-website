"use client";

import { useEffect, useRef, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Quote } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import AnimatedTitle from "@/app/components/CommonCom/AnimatedTitle";
import { CARD_DATA } from "../card-data";

export default function CardDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const card = CARD_DATA.find((c) => c.id === id);
    const containerRef = useRef<HTMLDivElement>(null);

    // If card not found, show 404 (or handle gracefully)
    if (!card) {
        notFound();
    }

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.from(".hero-image", {
            scale: 1.1,
            opacity: 0,
            duration: 1.5,
            rotationY: 10
        })
            .from(".content-stagger", {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1
            }, "-=1")
            .from(".section-card", {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1
            }, "-=0.5");

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="bg-background min-h-screen text-foreground selection:bg-red selection:text-white pb-32">
            {/* Background Atmosphere */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-red/5 blur-[150px] rounded-full"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue/20 blur-[150px] rounded-full"></div>
                <div className="absolute inset-0 bg-[url('/home/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
            </div>

            <main className="relative z-10 pt-32 px-6 md:px-12 lg:px-24 max-w-[1800px] mx-auto">
                <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-24">
                    {/* Left Column: Image & Quick Stats */}
                    <div className="space-y-8">
                        <div className="hero-image relative aspect-[2.5/3.6] w-full max-w-sm mx-auto lg:mx-0 rounded-2xl overflow-hidden border border-foreground/10 shadow-2xl shadow-foreground/20 perspective-2000 group">
                            <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-500"></div>
                            <Image
                                src={card.image}
                                alt={card.name}
                                fill
                                className="object-cover"
                                priority
                            />
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent opacity-60"></div>
                        </div>

                        <div className="content-stagger p-8 border border-foreground/10 bg-foreground/5 rounded-xl backdrop-blur-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <span className={`w-3 h-3 rounded-full ${card.tag.includes("TERROR") || card.tag.includes("EMBEZZLEMENT") ? "bg-red animate-pulse" : "bg-yellow-500"}`}></span>
                                <span className="font-oswald text-xs tracking-[0.2em] text-foreground/50 uppercase">Current Status</span>
                            </div>
                            <p className={`font-bebas text-2xl leading-none tracking-wide ${card.tag.includes("TERROR") || card.tag.includes("EMBEZZLEMENT") ? "text-red" : "text-yellow-500"}`}>
                                {card.tag}
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Content */}
                    <div>
                        <div className="space-y-6 mb-16">
                            <div className="content-stagger">
                                <h1 className="text-6xl md:text-8xl font-bebas leading-[0.85] uppercase tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-foreground to-foreground/50">
                                    {card.name}
                                </h1>
                                <p className="mt-4 font-oswald text-xl text-red uppercase tracking-widest">
                                    {card.role}
                                </p>
                            </div>

                            <div className="content-stagger border-l-2 border-red/30 pl-8 py-2 max-w-2xl">
                                <p className="font-oswald text-lg text-foreground/80 leading-relaxed">
                                    {card.summary}
                                </p>
                            </div>
                        </div>

                        {/* Quote Break */}
                        <div className="content-stagger my-12 max-w-3xl">
                            <blockquote className="relative p-8 md:p-12 text-center border-y border-foreground/10 bg-foreground/5 mx-auto">
                                <p className="font-bebas text-3xl md:text-4xl leading-tight tracking-wide text-foreground/90 uppercase">
                                    "{card.quote}"
                                </p>
                            </blockquote>
                        </div>
                    </div>
                </div>

                {/* Detailed Sections Grid - Full Width Below Top Content */}
                <div className="grid md:grid-cols-2 gap-6 mt-16">
                    {card.sections.map((section, idx) => (
                        <div
                            key={idx}
                            className="section-card p-8 border border-white/10 rounded-xl bg-blue hover:bg-light-blue transition-colors duration-300 group"
                        >
                            <h3 className="font-oswald text-sm text-red tracking-[0.2em] uppercase mb-4 group-hover:text-white transition-colors">
                                {section.title}
                            </h3>
                            <ul className="space-y-4">
                                {section.content.map((point, i) => (
                                    <li key={i} className="flex gap-3 text-sm text-white/60 leading-relaxed group-hover:text-white/90 transition-colors">
                                        <span className="w-1 h-1 bg-white/30 rounded-full mt-2 shrink-0"></span>
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
