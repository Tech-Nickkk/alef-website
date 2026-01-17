"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import AnimatedTitle from "../CommonCom/AnimatedTitle";
import Link from "next/link";

gsap.registerPlugin(useGSAP);

const ALLIES = [
    { name: "Heritage Foundation", url: "https://www.heritage.org/" },
    { name: "American Enterprise Institute", url: "https://www.aei.org/" },
    { name: "Hudson Institute", url: "https://www.hudson.org/" },
    { name: "Center for Security Policy", url: "https://centerforsecuritypolicy.org/" },
    { name: "Foundation for Defense of Democracies", url: "https://www.fdd.org/" },
    { name: "Young America’s Foundation", url: "https://yaf.org/" },
    { name: "The Livingston Group", url: "https://www.livingstongroupdc.com/" },
    { name: "Turning Point USA", url: "https://tpusa.com/" },
    { name: "Foreign policy Research Institute", url: "https://www.fpri.org/"},
    { name: "Transparency News", url: "https://transparency.news/"},
    { name: "Washington Institute for Near East Policy", url: "https://www.washingtoninstitute.org/"}
];

export default function AlliedOrganizations() {
    const trackRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const track = trackRef.current;
        if (!track) return;

        const totalWidth = track.scrollWidth / 2;

        gsap.to(track, {
            x: -totalWidth,
            duration: 30, 
            ease: "none",
            repeat: -1,
            modifiers: {
                x: gsap.utils.unitize(x => parseFloat(x) % totalWidth) 
            }
        });
    }, { scope: trackRef });

    return (
        <section className="py-16 md:py-24 overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 mb-16">

                <div className="flex flex-col items-center text-center gap-4">
                    <AnimatedTitle
                        text="ALLIED ORGANIZATIONS"
                        className="text-4xl md:text-6xl font-bold font-bebas text-foreground uppercase leading-none"
                    />
                    <div className="flex items-center gap-2 text-foreground/60 font-oswald text-xs tracking-widest">
                        <span className="w-2 h-2 bg-red rounded-full inline-block"></span>
                        STRATEGIC PARTNERS
                    </div>
                </div>

            </div>

            <div className="relative w-full overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 z-10 bg-linear-to-r from-background to-transparent"></div>
                <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 z-10 bg-linear-to-l from-background to-transparent"></div>

                <div
                    ref={trackRef}
                    className="flex gap-12 md:gap-24 w-fit px-12"
                >
                    {[...ALLIES, ...ALLIES].map((ally, index) => (
                        <Link
                            key={index}
                            href={ally.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0 flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity duration-300 group cursor-pointer"
                        >
                            <h3 className="text-3xl md:text-4xl font-bebas text-foreground whitespace-nowrap group-hover:text-red transition-colors">
                                {ally.name}
                            </h3>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
