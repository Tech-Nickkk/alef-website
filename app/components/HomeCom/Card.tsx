import Image from "next/image";
import { forwardRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface CardProps {
    id: string;
    frontSrc: string;
    frontAlt: string;
    backSrc: string;
    backAlt: string;
}

const Card = forwardRef<HTMLDivElement, CardProps>(({ id, frontSrc, frontAlt, backSrc, backAlt }, ref) => {
    return (
        <div ref={ref} className="card relative w-full h-full perspective-[1000px]" id={id}>
            <div className="card-wrapper w-full h-full">
                <div className="flip-card-inner relative w-full h-full transform-3d">
                    <div className="flip-card-front absolute w-full h-full backface-hidden rounded-xl overflow-hidden">
                        <Image priority src={backSrc} alt={backAlt} width={500} height={500} className="object-cover w-full h-full" />
                    </div>
                    <div className="flip-card-back absolute w-full h-full backface-hidden rounded-xl overflow-hidden transform-[rotateY(180deg)]">
                        <Image priority src={frontSrc} alt={frontAlt} width={500} height={500} className="object-cover w-full h-full" />
                    </div>
                </div>
            </div>
        </div>
    );
});

Card.displayName = "Card";

export default Card;