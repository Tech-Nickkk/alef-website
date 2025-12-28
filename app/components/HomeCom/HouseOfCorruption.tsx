"use client";

import { useState, useRef, MouseEvent } from "react";
import Image from "next/image";
import AnimatedTitle from "../CommonCom/AnimatedTitle";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HouseOfCorruption() {
    const [showMagnifier, setShowMagnifier] = useState(false);
    const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });
    const [imgSize, setImgSize] = useState({ width: 0, height: 0 });
    const imageContainerRef = useRef<HTMLDivElement>(null);

    const imageSrc = "/home/$1-Trillion-Robbery.jpg";
    const zoomLevel = 2.5;

    const handleMouseEnter = () => {
        setShowMagnifier(true);
    };

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!imageContainerRef.current) return;

        const { top, left, width, height } = imageContainerRef.current.getBoundingClientRect();

        // Calculate position relative to the image container
        const x = e.clientX - left;
        const y = e.clientY - top;

        setMagnifierPosition({ x, y });
        setImgSize({ width, height });
    };

    const handleMouseLeave = () => {
        setShowMagnifier(false);
    };

    return (
        <section className="py-12 md:py-24 px-6 md:px-12 lg:px-24 bg-theme-black border-t border-theme-white/10">
            <div className="max-w-[1400px] mx-auto">
                {/* Header Row */}
                <div className="flex flex-col items-center justify-center mb-6 md:mb-12 border-b border-theme-white/10 pb-6 gap-4 text-center">
                    <AnimatedTitle
                        text="HOUSE OF CORRUPTION"
                        className="text-4xl md:text-6xl font-bold font-bebas text-theme-white uppercase leading-none"
                    />
                    <div className="flex items-center gap-2 text-theme-white/60 font-oswald text-xs tracking-widest">
                        <span className="w-2 h-2 bg-theme-accent rounded-full inline-block"></span>
                        EXCLUSIVE INVESTIGATION // FINANCE
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Left Column: Content Card */}
                    <div className="bg-card-bg border border-theme-white/10 rounded-2xl p-8 md:p-12 flex flex-col justify-between h-[550px] md:h-[600px] relative group hover:border-theme-white/30 transition-colors duration-500">

                        {/* Technical Label */}
                        <div className="flex justify-between items-start mb-8 font-oswald text-xs tracking-widest text-white/60">
                            <span>01</span>
                            <span>FINANCIAL REPORT</span>
                        </div>

                        <div className="space-y-8 relative z-10 flex-1">
                            <div className="space-y-4">
                                <h3 className="text-3xl md:text-5xl text-white font-bebas tracking-wide leading-none">
                                    THE $1 TRILLION ROBBERY
                                </h3>
                            </div>

                            <div className="space-y-4 text-base md:text-lg text-white/60 font-oswald leading-relaxed">
                                <p>
                                    An unprecedented financial collapse orchestrated by a ruling elite that systematically looted the nation's wealth.
                                    Our investigation exposes the mechanisms behind the largest state-sponsored Ponzi scheme in history.
                                </p>
                                <p>
                                    From phantom infrastructure projects to illicit capital flight, discover the faces and facts behind the disappearance of
                                    life savings of millions of Lebanese citizens.
                                </p>
                            </div>
                        </div>

                        <div className="mt-0 md:mt-12 pt-0 md:pt-8 border-t border-theme-white/10 flex justify-between items-center">
                            <Link
                                href="/house-of-corruption"
                                className="group/btn flex items-center gap-4 w-full justify-between relative"
                            >
                                <span className="text-white font-bebas text-lg md:text-xl tracking-wider group-hover/btn:text-theme-accent transition-colors relative">
                                    READ FULL REPORT
                                    <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-theme-accent transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-500 origin-right group-hover/btn:origin-left ease-out"></span>
                                </span>
                                <div className="md:w-12 md:h-12 w-10 h-10 border border-theme-white/20 rounded-full flex items-center justify-center group-hover/btn:bg-theme-accent group-hover/btn:border-theme-accent transition-all duration-300 bg-theme-black">
                                    <ArrowRight className="w-5 h-5 text-theme-white" />
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Right Column: Image Card with Magnifying Glass */}
                    <div className="bg-card-bg border border-theme-white/10 rounded-2xl p-2 h-[500px] md:h-[600px] relative overflow-hidden group">
                        <div
                            ref={imageContainerRef}
                            className="relative w-full h-full rounded-xl overflow-hidden cursor-none"
                            onMouseEnter={handleMouseEnter}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                        >
                            <Image
                                src={imageSrc}
                                alt="$1 Trillion Robbery"
                                fill
                                className="object-cover"
                            />


                            {/* Magnifying Glass */}
                            <div
                                className={`absolute pointer-events-none z-50 ${showMagnifier
                                        ? 'opacity-100 scale-100'
                                        : 'opacity-0 scale-75'
                                    }`}
                                style={{
                                    top: `${magnifierPosition.y - 75}px`,
                                    left: `${magnifierPosition.x - 75}px`,
                                    transition: 'opacity 300ms ease-out, transform 1000ms ease-out',
                                }}
                            >
                                {/* Glass Lens */}
                                <div
                                    className="relative rounded-full bg-no-repeat overflow-hidden"
                                    style={{
                                        height: "150px",
                                        width: "150px",
                                        backgroundImage: `url('${imageSrc}')`,
                                        backgroundSize: `${imgSize.width * zoomLevel}px ${imgSize.height * zoomLevel}px`,
                                        backgroundPositionX: `${-magnifierPosition.x * zoomLevel + 75}px`,
                                        backgroundPositionY: `${-magnifierPosition.y * zoomLevel + 75}px`,
                                        border: "6px solid #4a4a4a",
                                        boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 0 20px rgba(255,255,255,0.1)"
                                    }}
                                >
                                    {/* Glass Reflection */}
                                    <div
                                        className="absolute inset-0 rounded-full pointer-events-none"
                                        style={{
                                            background: "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.1) 100%)"
                                        }}
                                    />
                                    {/* Inner Ring */}
                                    <div
                                        className="absolute inset-1 rounded-full pointer-events-none"
                                        style={{
                                            border: "2px solid rgba(80,80,80,0.5)"
                                        }}
                                    />
                                </div>

                                {/* Handle */}
                                <div
                                    className="absolute"
                                    style={{
                                        width: "20px",
                                        height: "60px",
                                        background: "linear-gradient(90deg, #3a3a3a 0%, #5a5a5a 50%, #3a3a3a 100%)",
                                        borderRadius: "4px",
                                        bottom: "-35px",
                                        right: "10px",
                                        transform: "rotate(-45deg)",
                                        transformOrigin: "top center",
                                        boxShadow: "2px 4px 8px rgba(0,0,0,0.4)"
                                    }}
                                >
                                    {/* Handle Grip Lines */}
                                    <div className="absolute top-4 left-1 right-1 space-y-1">
                                        <div className="h-0.5 bg-gray-600 rounded"></div>
                                        <div className="h-0.5 bg-gray-600 rounded"></div>
                                        <div className="h-0.5 bg-gray-600 rounded"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
