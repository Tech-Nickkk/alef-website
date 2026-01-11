"use client";

import { useRef, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, FileText, ShieldAlert, Fingerprint, Diamond, Club, Heart, Spade, Layers } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CARD_DATA } from "../card-data";
import AnimatedTitle from "../../../components/CommonCom/AnimatedTitle";

export default function CardDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const card = CARD_DATA.find((c) => c.id === id);
    const containerRef = useRef<HTMLDivElement>(null);

    // Determine the Stamp Title based on ID
    let stampTitle = "CORRUPT";
    if (card) {
        if (card.id === "michel-aoun") stampTitle = "THE ENABLER";
        else if (card.id === "naim-qassem") stampTitle = "THE PROXY";
        else if (card.id === "riad-salameh") stampTitle = "THE SCHEMER";
        else if (card.id === "walid-jumblatt") stampTitle = "THE CHAMELEON";
        else stampTitle = card.tag.split(" ")[0];
    }

    if (!card) notFound();

    useGSAP(() => {
        gsap.from(".stamp-mark", {
            scale: 2,
            opacity: 0,
            rotation: 15,
            duration: 0.5,
            ease: "bounce.out",
            delay: 0.2
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="bg-background min-h-screen text-foreground font-sans selection:bg-red selection:text-white overflow-hidden">

            {/* Ambient Background */}
            <div className="fixed inset-0 pointer-events-none z-0">

                <div className="absolute top-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-red/5 blur-[150px] rounded-full"></div>
            </div>

            <main className="relative z-10 pt-32 px-6 md:px-12 lg:px-24 max-w-[1800px] mx-auto">

                {/* Main Dossier Grid */}
                <div className="grid lg:grid-cols-[1fr_1.5fr] xl:grid-cols-[450px_1fr] gap-12 lg:gap-24 mb-24">

                    {/* LEFT COLUMN: VISUAL IDENTIFICATION */}
                    <div className="relative">
                        {/* Image Container */}
                        <div className="dossier-image-container relative w-full aspect-3/4 rounded-2xl overflow-hidden border border-white/10 bg-[#f0f0f0] shadow-2xl">

                            {/* The Card Image */}
                            <Image
                                src={card.image}
                                alt={card.name}
                                fill
                                className="object-cover scale-90"
                                priority
                            />

                            {/* THE STAMP */}
                            <div className="stamp-mark absolute top-6 right-6 z-20 transform -rotate-12 mix-blend-normal">
                                <div className="border-[4px] border-red/90 px-4 py-1 rounded-sm backdrop-blur-md bg-black/40 shadow-lg">
                                    <span className="font-bebas text-4xl md:text-5xl text-red uppercase tracking-widest whitespace-nowrap drop-shadow-md">
                                        {stampTitle}
                                    </span>
                                </div>
                            </div>

                            {/* NAME OVERLAY */}
                            <div className="absolute bottom-10 left-8 z-30 text-center">
                                <p className="font-bebas text-6xl tracking-wide uppercase text-black/90 leading-none">{card.name}</p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: TEXT CONTENT */}
                    <div className="flex flex-col justify-center">
                        <div className="dossier-header-text space-y-4 mb-10">
                            <div className="flex items-center gap-3">
                                <span className="h-px w-12 bg-red"></span>
                                <span className="font-oswald text-red text-sm tracking-[0.3em] uppercase">Target Profile</span>
                            </div>

                            <h1 className="text-6xl md:text-8xl font-bebas leading-[0.85] tracking-tighter uppercase text-foreground drop-shadow-lg">
                                {card.name}
                            </h1>

                            <p className="font-oswald text-xl md:text-2xl text-foreground/60 uppercase tracking-wide font-bold">
                                {card.role}
                            </p>
                        </div>

                        {/* Summary Box */}
                        <div className="dossier-header-text bg-foreground/5 border-l-4 border-red p-6 md:p-8 rounded-r-sm mb-10 backdrop-blur-sm">
                            <p className="font-oswald text-lg md:text-xl text-foreground/80 leading-relaxed font-light">
                                {card.summary}
                            </p>
                        </div>

                        {/* Quote */}
                        <div className="dossier-header-text relative max-w-2xl">
                            <span className="absolute -top-6 -left-4 font-bebas text-8xl text-foreground/5 z-0">"</span>
                            <blockquote className="relative z-10 font-bebas text-3xl md:text-4xl text-foreground/90 uppercase leading-tight tracking-wide italic">
                                "{card.quote}"
                            </blockquote>
                        </div>
                    </div>
                </div>

                {/* BOTTOM SECTION: EVIDENCE FILES */}
                <div className="border-t border-foreground/20 pt-16">
                    <div className="flex flex-col items-center gap-6 mb-16 text-center">
                        <AnimatedTitle
                            text="Evidence & Activities"
                            className="text-5xl md:text-6xl font-bebas uppercase tracking-tighter"
                        />
                        <div className="h-1 w-24 bg-red"></div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                        {card.sections.map((section, idx) => (
                            <div
                                key={idx}
                                className="dossier-section group relative p-8 rounded-sm bg-blue border border-white/10 hover:border-red/50 transition-all duration-500 hover:shadow-lg hover:-translate-y-1"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <ShieldAlert className="w-6 h-6 text-red" />
                                </div>

                                <h3 className="font-oswald text-xl text-white tracking-[0.2em] uppercase mb-6 group-hover:text-red transition-colors duration-300 border-b border-white/5 pb-4">
                                    {section.title}
                                </h3>

                                <ul className="space-y-4">
                                    {section.content.map((point, i) => (
                                        <li key={i} className="flex gap-4 text-sm md:text-base text-white/70 leading-relaxed font-sans group-hover:text-white/90 transition-colors">
                                            <span className="w-1.5 h-1.5 bg-white/20 rounded-full mt-2 shrink-0 group-hover:bg-red transition-colors"></span>
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Navigation */}
                <div className="border-t border-foreground/60 pt-16 flex flex-col items-center mt-24">
                    <p className="font-oswald text-foreground/50 text-sm uppercase tracking-[0.5em] mb-8">End of Dossier</p>
                    <Link href="/house-of-cards"
                        className="group relative bg-transparent border border-foreground/70 text-foreground px-12 py-5 text-sm font-bold tracking-[0.2em] uppercase font-oswald overflow-hidden transition-all hover:border-foreground/50 isolate cursor-pointer"
                    >
                        <span className="relative z-10 group-hover:text-background transition-colors duration-300 font-bebas text-2xl">Return to Archive</span>
                        <div className="absolute inset-0 bg-foreground transform scale-y-0 origin-top group-hover:scale-y-100 group-hover:origin-bottom transition-transform duration-500 ease-out -z-10"></div>
                    </Link>
                </div>

            </main>
        </div>
    );
}