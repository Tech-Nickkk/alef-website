"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedTitleProps {
    text: string;
    className?: string;
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "div" | "span";
}

export default function AnimatedTitle({ text, className = "", as: Component = "h2" }: AnimatedTitleProps) {
    const containerRef = useRef<HTMLElement>(null);
    const charsRef = useRef<(HTMLSpanElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const chars = charsRef.current.filter((char) => char !== null);

            gsap.fromTo(chars,
                { opacity: 0 },
                {
                    opacity: 1,
                    stagger: 0.01, // Adjust stagger timing as needed
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 90%",
                        end: "top 30%",
                        // markers: true,
                        scrub: true,
                    }
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, [text]);

    const words = text.split(" ");
    let charIndex = 0;

    return (
        <Component ref={containerRef as any} className={className}>
            {words.map((word, wIdx) => (
                <span key={wIdx} className="inline-block whitespace-nowrap">
                    {word.split("").map((char, cIdx) => (
                        <span
                            key={cIdx}
                            ref={(el) => {
                                charsRef.current[charIndex++] = el;
                            }}
                            className="inline-block"
                        >
                            {char}
                        </span>
                    ))}
                    {wIdx < words.length - 1 && <span>&nbsp;</span>}
                </span>
            ))}
        </Component>
    );
}
