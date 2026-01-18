"use client";

import SkeletonImage from "../CommonCom/SkeletonImage";
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
            gsap.set(cards, { clearProps: "all" });

            const innerCards = cards.map(c => c.querySelector('.flip-card-inner'));

            innerCards.forEach((innerCard, i) => {
                if (!innerCard) return;
                gsap.to(innerCard, {
                    scrollTrigger: {
                        trigger: cards[i],
                        start: "top bottom-=100",
                        end: "center center",
                        scrub: 1,
                    },
                    rotateY: 180,
                    ease: "linear"
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
                            stampTitle: "ENABLER",
                            front: "/houseOfCards/aceOfClubs.png",
                            back: "/home/card-back.png"
                        },
                        {
                            slug: "naim-qassem",
                            name: "Naim Qassem",
                            stampTitle: "PROXY",
                            front: "/houseOfCards/aceOfDiamonds.png",
                            back: "/home/card-back.png"
                        },
                        {
                            slug: "riad-salameh",
                            name: "Riad Salameh",
                            stampTitle: "SCHEMER",
                            front: "/houseOfCards/kingOfDiamonds.png",
                            back: "/home/card-back.png"
                        },
                        {
                            slug: "walid-jumblatt",
                            name: "Walid Jumblatt",
                            stampTitle: "CHAMELEON",
                            front: "/houseOfCards/kingOfSpades.png",
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

                                <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden border border-white/10 bg-blue">
                                    <SkeletonImage
                                        src={card.back}
                                        alt="Card Back"
                                        fill
                                        className="object-cover opacity-90"
                                    />
                                </div>

                                <div className="absolute inset-0 backface-hidden rounded-2xl overflow-visible border border-black/10 bg-[#f0f0f0] rotate-y-180 shadow-xl transition-all duration-500 cursor-pointer pointer-events-auto group/card hover:shadow-2xl hover:shadow-red/10 hover:border-red/20">
                                    <Link href={`/house-of-cards/${card.slug}`} className="absolute inset-0 z-20 block w-full h-full">
                                        <div className="absolute inset-0">
                                            <SkeletonImage
                                                src={card.front}
                                                alt={card.name}
                                                fill
                                                className="object-cover scale-90 transition-transform duration-700 group-hover/card:scale-95"
                                            />
                                        </div>

                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 opacity-100 lg:opacity-0 lg:group-hover/card:opacity-100 transition-opacity duration-300 transform -rotate-12 border-4 border-red/80 px-2 py-1 rounded-sm backdrop-blur-sm pointer-events-none shadow-lg shadow-black/20 w-[90%] flex justify-center">
                                            <span className={`font-oswald font-bold text-red/90 uppercase tracking-widest text-center whitespace-normal leading-none drop-shadow-md ${card.stampTitle.length > 10 ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl'}`}>
                                                {card.stampTitle}
                                            </span>
                                        </div>

                                        <div className="absolute bottom-6 inset-x-0 z-30 flex justify-center">
                                            <div className="bg-[#f0f0f0] px-3 py-1 rounded-sm max-w-[95%]">
                                                <p className={`font-bebas tracking-wide uppercase text-black/90 leading-none text-center truncate group-hover/card:scale-105 transition-transform duration-300 ${card.name.length > 15 ? 'text-xl' : 'text-2xl'}`}>
                                                    {card.name}
                                                </p>
                                            </div>
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