"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Card from "@/app/components/HomeCom/Card";
import AnimatedTitle from "@/app/components/CommonCom/AnimatedTitle";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function HouseOfCardsPage() {
    const containerRef = useRef<HTMLElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!gridRef.current) return;

        const cards = gridRef.current.querySelectorAll('.flip-card-inner');

        gsap.to(cards, {
            rotateY: 180,
            duration: 1.2,
            stagger: {
                amount: 1.5,
                grid: "auto",
                from: "random"
            },
            ease: "power2.inOut",
            delay: 0.5
        });

    }, { scope: containerRef });

    return (
        <main ref={containerRef} className="min-h-screen bg-theme-black py-24 px-6 md:px-12 lg:px-24">

            {/* Header */}
            <div className="max-w-[1920px] mx-auto mb-16 flex flex-col md:flex-row justify-between items-start md:items-end border-b border-theme-white/10 pb-8 gap-6">
                <div>
                    <Link href="/" className="inline-flex items-center gap-2 text-theme-accent mb-6 hover:text-white transition-colors font-oswald text-sm tracking-widest uppercase">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                    <AnimatedTitle
                        text="THE FULL DECK"
                        className="text-5xl md:text-8xl font-bold font-bebas text-white uppercase leading-none mb-4"
                    />
                    <p className="text-white/60 font-oswald text-lg max-w-2xl">
                        A comprehensive archive of the corruption network. Every card reveals a face involved in the systematic dismantling of the state.
                    </p>
                </div>

                <div className="flex items-center gap-2 text-theme-white/60 font-oswald text-xs tracking-widest shrink-0">
                    <span className="w-2 h-2 bg-theme-accent rounded-full inline-block animate-pulse"></span>
                    ARCHIVE STATUS // UNLOCKED
                </div>
            </div>

            {/* Grid Container */}
            <div ref={gridRef} className="max-w-[1920px] mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 md:gap-6">
                {[...Array(52)].map((_, index) => (
                    <div
                        key={index}
                        className="w-full aspect-2/3relative cursor-pointer group perspective-[1000px]"
                    >
                        <Card
                            id={`card-archive-${index + 1}`}
                            frontSrc="/home/card-front.jpg"
                            frontAlt={`Corruption Card ${index + 1}`}
                            backSrc="/home/card-back.png"
                            backAlt="Card Back Pattern"
                        />
                    </div>
                ))}
            </div>
        </main>
    );
}
