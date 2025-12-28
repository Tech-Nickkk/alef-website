"use client";

import Card from "./Card";
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
        <section ref={sectionRef} className="py-12 md:py-18 px-6 md:px-12 lg:px-24 bg-theme-black border-t border-theme-white/10 overflow-hidden relative">
            <div className="mx-auto h-full flex flex-col items-center">

                {/* Header */}
                {/* Header */}
                <div className="flex flex-col items-center mb-16 border-b border-theme-white/10 pb-6 relative z-10 w-full gap-4">
                    <AnimatedTitle
                        text="HOUSE OF CARDS"
                        className="text-4xl md:text-6xl font-bold font-bebas text-theme-white uppercase leading-none text-center"
                    />
                    <div className="flex items-center gap-2 text-theme-white/60 font-oswald text-xs tracking-widest">
                        <span className="w-2 h-2 bg-theme-accent rounded-full inline-block"></span>
                        ARCHIVE // PROFILES
                    </div>
                </div>

                {/* Cards Container */}
                {/* 
                   Mobile (< md): Flex Col (One line)
                   Tablet (md - lg): Grid 2x2
                   Desktop (lg+): Flex/Absolute (h-500px to allow pinning space)
                */}
                <div className="cards-container relative w-full flex flex-col gap-8 md:grid md:grid-cols-2 md:gap-x-4 md:gap-y-8 md:justify-items-center lg:flex lg:flex-row lg:h-[500px] lg:items-center lg:justify-center lg:gap-0">
                    {[...Array(4)].map((_, index) => (
                        <div
                            key={index}
                            ref={(el) => {
                                if (el) cardRefs.current[index] = el;
                            }}
                            // Wrapper Styling:
                            // Mobile/Tablet: Relative, Auto size (controlled by Card or self)
                            // Desktop: Absolute centered (controlled by GSAP)
                            className="
                                relative 
                                w-[200px] h-[300px] 
                                md:w-[200px] md:h-[300px] 
                                xl:w-[240px] xl:h-[360px]
                                mx-auto
                                
                                lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-1/2 lg:m-0
                            "
                        >
                            <Card
                                id={`card-${index + 1}`}
                                frontSrc="/home/card-front.jpg"
                                frontAlt="Card Front"
                                backSrc="/home/card-back.png"
                                backAlt="Card Back"
                            />
                        </div>
                    ))}
                </div>

                {/* Inspect Deck Button */}
                <div className="flex justify-center mt-12 relative z-10">
                    <Link href="/house-of-cards">
                        <button className="group relative bg-transparent border border-theme-white/70 text-theme-white px-12 py-4 text-sm font-bold tracking-[0.2em] uppercase font-oswald overflow-hidden transition-all hover:border-theme-white/50 isolate cursor-pointer">
                            <span className="relative z-10 group-hover:text-theme-black transition-colors duration-300">VIEW FULL ARCHIVE</span>
                            <div className="absolute inset-0 bg-theme-white transform scale-y-0 origin-top group-hover:scale-y-100 group-hover:origin-bottom transition-transform duration-500 ease-out -z-10"></div>
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
