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

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%", // Trigger slightly earlier
                    toggleActions: "play none none reverse"
                }
            });

            // 1. Slow Fade In
            tl.fromTo(chars,
                { opacity: 0 },
                {
                    opacity: 1,
                    stagger: 0.02,
                    duration: 1.5,
                    ease: "power2.out"
                }
            );

            // 2. Flicker Effect (Random dips in opacity)
            tl.to(chars, {
                opacity: 0.2,
                duration: 0.03,
                stagger: {
                    amount: 0.2, // Faster total distribution
                    from: "random",
                    repeat: 3, // More flickers
                    yoyo: true
                },
                ease: "power3.inOut"
            }, "-=1.2"); // Starts closer to the end of the fade

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
