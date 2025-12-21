"use client";

import Card from "./Card";
import AnimatedTitle from "../CommonCom/AnimatedTitle";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function FacesOfCorruption() {
    const sectionRef = useRef<HTMLElement>(null);
    const cardRefs = useRef<HTMLDivElement[]>([]);

    useGSAP(() => {
        if (!sectionRef.current) return;

        const cards = cardRefs.current.filter(Boolean); // Ensure no nulls
        if (cards.length === 0) return;

        // Reset any existing transforms to ensure clean state
        gsap.set(cards, { clearProps: "all" });

        // Initial state: Stacked in center
        // We use CSS to center them absolute, so we just need to ensure they start 'closed'

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top", // Lock when section hits top
                end: "+=200%", // 2x height of scroll distance
                pin: true,
                scrub: 1,
                anticipatePin: 1,
                refreshPriority: -1,
            }
        });

        // 1. Spread Cards fan-like
        tl.fromTo(cards,
            {
                xPercent: -50, // Centered (offset by CSS translate)
                yPercent: -50,
                rotation: 0,
                x: 0,
            },
            {
                xPercent: -50, // Keep centered anchor
                yPercent: -50,
                x: (index) => {
                    // Spread from -300px to +300px roughly
                    return (index - 1.5) * 300; // 260px gap
                },
                rotation: (index) => {
                    // Fan rotation
                    return (index - 1.5) * 10;
                },
                duration: 1,
                ease: "power2.out"
            }
        );

        // 2. Flip Cards (Sequential or Overlapping)
        // Access the inner flipping part of the card
        const innerCards = cards.map(c => c.querySelector('.flip-card-inner'));

        if (innerCards.length > 0) {
            tl.to(innerCards, {
                rotateY: 180,
                duration: 0.5,
                stagger: 0.1,
                ease: "power1.inOut"
            }, "<+=0.2"); // Start slightly after spread begins
        }

    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="py-24 px-6 md:px-12 lg:px-24 bg-theme-black border-t border-theme-white/10 overflow-hidden">
            <div className="max-w-[1400px] mx-auto h-full flex flex-col">

                {/* Header */}
                <div className="flex flex-col items-center mb-16 border-b border-theme-white/10 pb-6 relative z-10">
                    <AnimatedTitle
                        text="FACES OF CORRUPTION"
                        className="text-4xl md:text-6xl font-bold font-bebas text-theme-white uppercase leading-none text-center"
                    />
                </div>

                {/* Cards Container - Height needed for pinning space */}
                <div className="cards-container relative w-full h-[500px] flex items-center justify-center">
                    {[...Array(4)].map((_, index) => (
                        <div
                            key={index}
                            ref={(el) => {
                                if (el) cardRefs.current[index] = el;
                            }}
                            className="absolute top-1/2 left-1/2 w-[240px] h-[360px]"
                            style={{ transform: 'translate(-50%, -50%)' }}
                        >
                            <Card
                                id={`card-${index + 1}`}
                                frontSrc="/home/card-back.png"
                                frontAlt="Card Pattern"
                                backSrc="/home/card-front.jpg"
                                backAlt="Face of Corruption"
                            />
                        </div>
                    ))}
                </div>


                {/* Inspect Deck Button */}
                <div className="flex justify-center mt-12 relative z-10">
                    <button className="group relative bg-transparent border border-theme-white/20 text-theme-white px-12 py-4 text-sm font-bold tracking-[0.2em] uppercase font-oswald overflow-hidden transition-all hover:border-theme-white/50">
                        <span className="relative z-10 group-hover:text-theme-black transition-colors duration-300">Inspect Full Archive</span>
                        <div className="absolute inset-0 bg-theme-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    </button>
                </div>
            </div>
        </section>
    );
}
