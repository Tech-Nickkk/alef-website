"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface AnimatedTitleProps {
    text: string;
    className?: string;
}

export default function AnimatedTitle({ text, className = "" }: AnimatedTitleProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const chars = containerRef.current?.querySelectorAll(".animated-char");
        if (!chars || chars.length === 0) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 85%",
                toggleActions: "play none none none", 
            }
        });

        tl.fromTo(chars,
            { opacity: 0 },
            {
                opacity: 1,
                stagger: 0.02,
                duration: 1.5,
                ease: "power2.out"
            }
        );

        tl.to(chars, {
            opacity: 0.2,
            duration: 0.03,
            stagger: {
                amount: 0.2,
                from: "random",
                repeat: 3,
                yoyo: true
            },
            ease: "power3.inOut"
        }, "-=1.2");

    }, { scope: containerRef, dependencies: [text] });

    const words = text.split(" ");

    return (
        <div ref={containerRef} className={className} aria-label={text}>
            {words.map((word, wIdx) => (
                <span key={wIdx} className="inline-block whitespace-nowrap">
                    {word.split("").map((char, cIdx) => (
                        <span
                            key={cIdx}
                            className="animated-char inline-block"
                        >
                            {char}
                        </span>
                    ))}
                    {wIdx < words.length - 1 && <span>&nbsp;</span>}
                </span>
            ))}
        </div>
    );
}