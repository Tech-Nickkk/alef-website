"use client";

import Image from "next/image";
import Link from "next/link";
import AnimatedTitle from "../CommonCom/AnimatedTitle";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FacesOfCorruption() {
    const sectionRef = useRef(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = cardsRef.current?.querySelectorAll(".corruption-card");
            if (cards) {
                gsap.fromTo(cards,
                    {
                        y: 100,
                        opacity: 0,
                        rotate: 5
                    },
                    {
                        y: 0,
                        opacity: 1,
                        rotate: 0,
                        duration: 1,
                        stagger: 0.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 65%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 px-6 md:px-12 lg:px-24 bg-[#f4f7fa]">
            <div className="max-w-[1400px] mx-auto">
                <AnimatedTitle
                    text="The Faces of Corruption"
                    className="text-4xl md:text-5xl lg:text-6xl text-center mb-16 font-cormorant text-[#1a2b4b] font-bold"
                />

                {/* Cards Grid */}
                <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="corruption-card relative group">
                            <div className="relative aspect-3/4 w-full shadow-2xl rounded-xl overflow-hidden transform transition-transform duration-500 hover:-translate-y-2">
                                <Image
                                    src="/home/card.jpg"
                                    alt="Face of Corruption"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Inspect Deck Button */}
                <div className="flex justify-center">
                    <button className="border-2 border-[#1a2b4b] text-[#1a2b4b] hover:bg-[#1a2b4b] hover:text-white px-10 py-4 text-sm font-bold tracking-widest transition-all uppercase font-optima">
                        Inspect Full Deck
                    </button>
                </div>
            </div>
        </section>
    );
}
