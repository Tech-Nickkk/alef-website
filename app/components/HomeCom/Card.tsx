import Image from "next/image";
import { useEffect, useRef, forwardRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface CardProps {
    id: string;
    frontSrc: string;
    frontAlt: string;
    backText?: string;
    backSrc?: string;
    backAlt?: string;
}

const Card = forwardRef<HTMLDivElement, CardProps>(({ id, frontSrc, frontAlt, backText, backSrc, backAlt }, ref) => {
    return (
        <div ref={ref} className="card relative w-[240px] h-[360px] perspective-[1000px]" id={id}>
            <div className="card-wrapper w-full h-full animate-floating">
                <div className="flip-card-inner relative w-full h-full transform-style-preserve-3d">
                    <div className="flip-card-front absolute w-full h-full backface-hidden rounded-xl overflow-hidden shadow-2xl">
                        <Image priority src={frontSrc} alt={frontAlt} width={500} height={500} className="object-cover w-full h-full" />
                    </div>
                    <div className="flip-card-back absolute w-full h-full backface-hidden rounded-xl overflow-hidden bg-theme-accent text-theme-white rotate-y-180 flex items-center justify-center border border-theme-white/10 shadow-2xl">
                        {backSrc ? (
                            <Image src={backSrc} alt={backAlt || "Card Back"} width={500} height={500} className="object-cover w-full h-full" />
                        ) : (
                            <p className="text-center text-xl font-bebas tracking-wider p-6">{backText}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
});

Card.displayName = "Card";

export default Card;