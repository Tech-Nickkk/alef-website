"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedParagraphProps {
    text: string;
    className?: string;
}

export default function AnimatedParagraph({ text, className = "" }: AnimatedParagraphProps) {
    const containerRef = useRef<HTMLParagraphElement>(null);
    const [lines, setLines] = useState<{ words: string[] }[]>([]);

    useEffect(() => {
        // Simple word splitting for robust rendering without layout thrashing
        // True "line" splitting requires complex measurement or libraries like SplitText.
        // We simulate the requested effect by staggering words and characters linearly,
        // which visually approximates the flow.

        // However, to strictly attempt "split lines", we would need to measure offsets.
        // For stability, we will use the word/char split which is standard for this effect.
        if (!text) return;
    }, [text]);

    const words = text.split(" ");

    useEffect(() => {
        const ctx = gsap.context(() => {
            const container = containerRef.current;
            if (!container) return;

            const wordElements = container.querySelectorAll(".word");
            if (wordElements.length === 0) return;

            // Group words by line using offsetTop
            const linesMap = new Map<number, Element[]>();
            wordElements.forEach((w) => {
                const top = (w as HTMLElement).offsetTop;
                if (!linesMap.has(top)) linesMap.set(top, []);
                linesMap.get(top)?.push(w);
            });

            // Sort lines by vertical position
            const sortedLines = Array.from(linesMap.entries())
                .sort((a, b) => a[0] - b[0])
                .map((entry) => entry[1]);

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: "top 90%",
                    end: "bottom 75%",
                    // markers: true,
                    scrub: true,
                }
            });

            sortedLines.forEach((lineWords, idx) => {
                const chars = lineWords.flatMap(w => Array.from(w.querySelectorAll(".char")));

                tl.fromTo(chars,
                    { opacity: 0 },
                    {
                        opacity: 1,
                        stagger: 0.02,
                        duration: 1, // Relative duration in scrub
                        ease: "none",
                    },
                    idx * 0.2 // Stagger lines by 0.2 (relative timeline time)
                );
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <p ref={containerRef} className={className}>
            {words.map((word, wIdx) => (
                <span key={wIdx} className="word inline-block whitespace-nowrap">
                    {word.split("").map((char, cIdx) => (
                        <span key={cIdx} className="char inline-block opacity-0">
                            {char}
                        </span>
                    ))}
                    {wIdx < words.length - 1 && <span className="char inline-block opacity-0">&nbsp;</span>}
                </span>
            ))}
        </p>
    );
}
