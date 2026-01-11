"use client";

import Image from "next/image";
import AnimatedTitle from "../CommonCom/AnimatedTitle";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function HouseOfCards() {
    const sectionRef = useRef<HTMLElement>(null);
    const cardRefs = useRef<HTMLDivElement[]>([]);

    useGSAP(() => {
        if (!sectionRef.current) return;

        const cards = cardRefs.current.filter(Boolean);
        if (cards.length === 0) return;

        const mm = gsap.matchMedia();

        // DESKTOP ANIMATION (Large Screens)
        mm.add("(min-width: 1024px)", () => {
            // Reset props specifically for desktop switch
            gsap.set(cards, {
                clearProps: "all",
                position: "absolute",
                left: "50%",
                top: "50%",
                xPercent: -50,
                yPercent: -50
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=200%",
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1,
                }
            });

            // 1. Spread Cards fan-like
            tl.fromTo(cards,
                {
                    xPercent: -50,
                    yPercent: -50,
                    rotation: 0,
                    x: 0,
                },
                {
                    xPercent: -50,
                    yPercent: -50,
                    x: (index) => {
                        return (index - 1.5) * 300;
                    },
                    rotation: (index) => {
                        return (index - 1.5) * 10;
                    },
                    duration: 1,
                    ease: "power2.out"
                }
            );

            // 2. Flip Cards
            const innerCards = cards.map(c => c.querySelector('.flip-card-inner'));
            if (innerCards.length > 0) {
                tl.to(innerCards, {
                    rotateY: 180,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: "power1.inOut"
                }, "<+=0.2");
            }
        });

        // MOBILE/TABLET ANIMATION
        mm.add("(max-width: 1023px)", () => {
            // Reset to relative layout flow
            gsap.set(cards, { clearProps: "all" });

            // Simple Flip on Scroll (In Place)
            const innerCards = cards.map(c => c.querySelector('.flip-card-inner'));

            // Check if we want staggered flip or per-card flip
            // User said: "flip on their places"

            innerCards.forEach((innerCard, i) => {
                if (!innerCard) return;
                gsap.to(innerCard, {
                    scrollTrigger: {
                        trigger: cards[i], // Trigger based on the card wrapper
                        start: "top bottom-=100", // Start flipping when card enters somewhat
                        end: "center center", // Finish flip when centered
                        scrub: 1,
                    },
                    rotateY: 180,
                    ease: "linear" // Linear ease is better for scrub
                });
            });
        });

    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="py-12 md:py-18 px-6 md:px-12 lg:px-24 overflow-hidden relative">
            <div className="mx-auto h-full flex flex-col items-center">

                {/* Header */}
                <div className="flex flex-col items-center mb-6 pb-6 relative z-10 w-full gap-4">
                    <AnimatedTitle
                        text="HOUSE OF CARDS"
                        className="text-4xl md:text-6xl font-bold font-bebas text-foreground uppercase leading-none text-center"
                    />
                    <div className="flex items-center gap-2 text-foreground/60 font-oswald text-xs tracking-widest">
                        <span className="w-2 h-2 bg-red rounded-full inline-block"></span>
                        ARCHIVE // PROFILES
                    </div>
                </div>

                {/* Cards Container */}
                <div className="cards-container relative w-full flex flex-col gap-8 md:grid md:grid-cols-2 md:gap-x-4 md:gap-y-8 md:justify-items-center lg:flex lg:flex-row lg:h-[500px] lg:items-center lg:justify-center lg:gap-0">
                    {[
                        {
                            slug: "michel-aoun",
                            name: "Michel Aoun",
                            status: "SECTARIAN ALLIANCES & COLLAPSE",
                            front: "/houseofcards/aceOfClub.png",
                            back: "/home/card-back.png"
                        },
                        {
                            slug: "naim-qassem",
                            name: "Naim Qassem",
                            status: "TERROR STRATEGIST & IRAN'S PROXY BOSS",
                            front: "/houseofcards/aceOfDiamonds.png",
                            back: "/home/card-back.png"
                        },
                        {
                            slug: "riad-salameh",
                            name: "Riad Salameh",
                            status: "EMBEZZLEMENT & GLOBAL IMPUNITY",
                            front: "/houseofcards/kingOfDiamonds.png",
                            back: "/home/card-back.png"
                        },
                        {
                            slug: "walid-jumblatt",
                            name: "Walid Jumblatt",
                            status: "BRIBERY & BETRAYAL",
                            front: "/houseofcards/kingOfSpades.png",
                            back: "/home/card-back.png"
                        }
                    ].map((card, index) => (
                        <div
                            key={index}
                            ref={(el) => {
                                if (el) cardRefs.current[index] = el;
                            }}
                            className="relative w-[200px] h-[300px] md:w-[200px] md:h-[300px] xl:w-[240px] xl:h-[360px] mx-auto lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-1/2 lg:m-0 perspective-[1000px]"
                        >
                            <div className="flip-card-inner relative w-full h-full preserve-3d">
                                {/* Front (Pattern/Back) - This is the "back" of the card in card-game terms, but the front face in CSS before rotation */}
                                <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden border border-white/10 bg-blue">
                                    <Image
                                        src={card.back}
                                        alt="Card Back"
                                        fill
                                        className="object-cover opacity-90"
                                    />
                                </div>

                                {/* Back (Revealed Image) - This is the "front" of the card (character), rotated 180 initially */}
                                <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden border border-black/10 bg-white rotate-y-180 shadow-xl transition-all duration-500 cursor-pointer pointer-events-auto group/card hover:shadow-2xl hover:shadow-red/10 hover:border-red/20">
                                    <Link href={`/house-of-cards/${card.slug}`} className="absolute inset-0 z-20 block w-full h-full">
                                        <div className="absolute inset-0">
                                            <Image
                                                src={card.front}
                                                alt={card.name}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover/card:scale-105"
                                            />
                                        </div>

                                        {/* Status Badge - Revealed on Hover */}
                                        <div className="absolute top-4 right-4 max-w-[90%] px-3 py-1.5 bg-black/80 backdrop-blur-md text-[9px] text-white font-bold tracking-widest rounded-sm uppercase text-right leading-tight z-30 opacity-0 group-hover/card:opacity-100 transform -translate-y-2 group-hover/card:translate-y-0 transition-all duration-300">
                                            {card.status}
                                        </div>

                                        <div className="absolute bottom-6 left-0 right-0 z-30 text-center">
                                            <p className="font-bebas text-4xl tracking-wide uppercase text-black/90 leading-none group-hover/card:scale-110 transition-transform duration-300">{card.name}</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Inspect Deck Button */}
                <div className="flex justify-center mt-12 relative z-10">
                    <Link href="/house-of-cards">
                        <button className="group relative bg-transparent border border-foreground/70 text-foreground px-12 py-4 text-sm font-bold tracking-[0.2em] uppercase font-oswald overflow-hidden transition-all hover:border-foreground/50 isolate cursor-pointer">
                            <span className="relative z-10 group-hover:text-background transition-colors duration-300">VIEW FULL ARCHIVE</span>
                            <div className="absolute inset-0 bg-foreground transform scale-y-0 origin-top group-hover:scale-y-100 group-hover:origin-bottom transition-transform duration-500 ease-out -z-10"></div>
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
