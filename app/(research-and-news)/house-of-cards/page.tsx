"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTitle from "../../components/CommonCom/AnimatedTitle";
import { Filter, Search } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

import { CARD_DATA } from "./card-data";

const BACK_IMAGE = "/home/card-back.png";

const FULL_DECK = Array.from({ length: 52 }).map((_, i) => {
    const dataRef = CARD_DATA[i % CARD_DATA.length];

    // Create the "Stamp Title" from the tag (e.g., "TERROR" from "TERROR STRATEGIST")
    // If specific overrides are needed, they can be done here.
    const stampTitle = dataRef.tag.split(" ")[0];

    return {
        id: `card-${i}`,
        slug: dataRef.id,
        front: dataRef.image,
        back: BACK_IMAGE,
        name: dataRef.name,
        status: dataRef.tag,
        stamp: stampTitle, // NEW PROPERTY
        suit: ["Spades", "Hearts", "Diamonds", "Clubs"][Math.floor(i / 13)],
        revealed: false
    };
});

export default function HouseOfCardsPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const [filter, setFilter] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [visibleCount, setVisibleCount] = useState(10);
    const CARDS_PER_PAGE = 10;

    const filteredCards = useMemo(() => {
        return FULL_DECK.filter(c => {
            const matchesSuit = filter === "All" || c.suit === filter;
            const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesSuit && matchesSearch;
        });
    }, [filter, searchQuery]);

    const visibleCards = useMemo(() => {
        return filteredCards.slice(0, visibleCount);
    }, [filteredCards, visibleCount]);

    const hasMore = visibleCount < filteredCards.length;

    const handleButtonClick = () => {
        if (hasMore) {
            setVisibleCount(prev => prev + CARDS_PER_PAGE);
        } else {
            setVisibleCount(CARDS_PER_PAGE);
            containerRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        setVisibleCount(CARDS_PER_PAGE);
    }, [filter, searchQuery]);

    useGSAP(() => {
        if (!gridRef.current) return;

        const cardContainers = gridRef.current.querySelectorAll(".card-container");

        gsap.fromTo(cardContainers,
            { y: 40, opacity: 0, scale: 0.95 },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.5,
                stagger: 0.05,
                ease: "power2.out",
                overwrite: "auto"
            }
        );

        cardContainers.forEach((container) => {
            const inner = container.querySelector(".card-inner");
            if (!inner) return;

            const onMouseEnter = () => {
                gsap.to(inner, {
                    rotationY: 180,
                    duration: 1,
                    ease: "bounce.out"
                });
            };

            const onMouseLeave = () => {
                gsap.to(inner, {
                    rotationX: 0,
                    rotationY: 0,
                    duration: 1,
                    ease: "bounce.out"
                });
            };

            container.addEventListener("mouseenter", onMouseEnter as any);
            container.addEventListener("mouseleave", onMouseLeave as any);
        });

    }, { scope: containerRef, dependencies: [visibleCards] });

    return (
        <div ref={containerRef} className="bg-background min-h-screen text-foreground selection:bg-red selection:text-white pb-32">
            <div className="fixed inset-0 pointer-events-none opacity-20">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red/20 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue/40 blur-[120px] rounded-full"></div>
            </div>

            <main className="relative z-10 pt-32 px-6 md:px-12 lg:px-24 max-w-[1800px] mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
                    <div className="space-y-4">
                        <AnimatedTitle
                            text="HOUSE OF CARDS"
                            className="text-6xl md:text-8xl lg:text-9xl font-bebas leading-[0.85] uppercase tracking-tighter"
                        />
                        <p className="font-oswald text-xl text-foreground/50 max-w-2xl uppercase tracking-widest leading-relaxed">
                            The Complete Dossier Archive. Every card reveals a story, a connection, or a warning.
                        </p>
                    </div>

                    <div className="flex flex-col items-end gap-2 border-l border-foreground/20 pl-8 h-fit">
                        <span className="font-bebas text-5xl text-red leading-none">{filteredCards.length}</span>
                        <span className="font-oswald text-xs tracking-[0.3em] uppercase text-foreground/40">Visible Dossiers</span>
                    </div>
                </div>

                {/* Filters Row */}
                <div className="flex flex-wrap items-center justify-between gap-6 py-6 border-y border-foreground/20 mb-12">
                    <div className="flex items-center gap-8 overflow-x-auto no-scrollbar pb-2 md:pb-0">
                        {["All", "Spades", "Hearts", "Diamonds", "Clubs"].map((item) => (
                            <button
                                key={item}
                                onClick={() => setFilter(item)}
                                className={`font-oswald text-sm uppercase tracking-widest transition-all relative ${filter === item ? "text-red" : "text-foreground/40 hover:text-foreground"
                                    }`}
                            >
                                {item}
                                {filter === item && (
                                    <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-red"></span>
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto justify-center md:justify-end">
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/60" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="SEARCH ARCHIVE..."
                                className="bg-foreground/15 border border-foreground/30 rounded-full py-3 pl-14 pr-6 font-oswald text-sm tracking-widest focus:outline-none focus:border-red/50 transition-colors w-full uppercase placeholder:text-foreground/50"
                            />
                        </div>
                    </div>
                </div>

                {/* Cards Grid */}
                <div
                    ref={gridRef}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 md:gap-14"
                >
                    {visibleCards.map((card) => (
                        <div
                            key={card.id}
                            className="card-container group relative aspect-[2.5/3.6] cursor-pointer"
                            style={{ perspective: "2000px" }}
                        >
                            <div className="card-inner absolute inset-0 preserve-3d">
                                {/* Front (Pattern/Back) */}
                                <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden border border-white/10 bg-blue">
                                    <Image
                                        src={card.back}
                                        alt="Card Back"
                                        fill
                                        className="object-cover opacity-90"
                                    />
                                </div>

                                {/* Back (Revealed Image) */}
                                <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden border border-red/40 bg-background rotate-y-180 shadow-2xl shadow-red/20 cursor-pointer pointer-events-auto">
                                    <Link href={`/house-of-cards/${card.slug}`} className="absolute inset-0 z-20">
                                        <div className="absolute inset-0">
                                            <Image
                                                src={card.front}
                                                alt={card.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        {/* === NEW STAMP UI === */}
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -rotate-12 border-4 border-red/80 px-4 py-1 rounded-sm backdrop-blur-sm pointer-events-none">
                                            <span className="font-oswald text-2xl font-bold text-red/90 uppercase tracking-widest whitespace-nowrap">
                                                {card.stamp}
                                            </span>
                                        </div>

                                        <div className="absolute bottom-6 left-6 right-6 z-30">
                                            <p className="font-bebas text-3xl tracking-wide uppercase text-black/90 leading-none drop-shadow-sm">{card.name}</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {(filteredCards.length > CARDS_PER_PAGE || !hasMore) && (
                    <div className="mt-24 flex flex-col items-center">
                        <div className="w-px h-24 bg-linear-to-b from-red to-transparent mb-10"></div>
                        <button
                            onClick={handleButtonClick}
                            className="group relative bg-transparent border border-foreground px-16 py-6 text-sm font-bold tracking-[0.3em] uppercase font-oswald overflow-hidden"
                        >
                            <span className="relative z-10 group-hover:text-background transition-colors duration-500">
                                {hasMore ? "DECRYPT MORE DOSSIERS" : "SECURE RETRIEVED ARCHIVE"}
                            </span>
                            <div className="absolute inset-0 bg-foreground transform scale-y-0 origin-top group-hover:scale-y-100 group-hover:origin-bottom transition-transform duration-500 ease-out -z-10"></div>
                        </button>
                        <p className="mt-8 font-oswald text-[10px] tracking-[0.5em] text-foreground/75 uppercase">
                            {hasMore ? `DECRYPTING ${visibleCount} / ${filteredCards.length} ENTRIES` : "FULL ARCHIVE ACCESSIBLE"}
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
}