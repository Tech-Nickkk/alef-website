"use client";

import { useRef, useState, useEffect } from "react";
import SkeletonImage from "../../components/CommonCom/SkeletonImage";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTitle from "../../components/CommonCom/AnimatedTitle";
import {
    AlertTriangle,
    Banknote,
    Building2,
    Users,
    Zap,
    MoveRight,
    FileText,
    Siren,
    Globe,
    Scale,
    ShieldAlert,
    X,
    Maximize2,
    Car,
    Bomb,
    TrendingDown,
    HeartPulse
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// --- 1. DATA ---
const DIRECT_LOSSES = [
    {
        id: "DL-01",
        title: "PUBLIC FUNDS EMBEZZLED",
        amount: "$150B - $180B",
        source: "IMF, World Bank, EU Reports",
        description: "Systematic theft by political class via state contracts and treasury looting.",
        icon: <Banknote className="w-8 h-8" />
    },
    {
        id: "DL-02",
        title: "OFFSHORE MONEY LAUNDERING",
        amount: "$80B - $100B",
        source: "Swiss Leaks, Pandora Papers",
        description: "Illicit capital flight transferred to accounts in Switzerland, France, and tax havens.",
        icon: <Globe className="w-8 h-8" />
    },
    {
        id: "DL-03",
        title: "BANKING SECTOR PONZI",
        amount: "$70B - $85B",
        source: "World Bank, Audit Reports",
        description: "Central Bank (BDL) financial engineering designed to cover state deficit using depositor funds.",
        icon: <AlertTriangle className="w-8 h-8" />
    },
    {
        id: "DL-04",
        title: "INFRASTRUCTURE WASTE",
        amount: "$40B - $60B",
        source: "Lebanese Court of Audit",
        description: "Phantom projects in dams, roads, and councils that were paid for but never completed.",
        icon: <Building2 className="w-8 h-8" />
    },
    {
        id: "DL-05",
        title: "FUEL & ELECTRICITY",
        amount: "$25B - $35B",
        source: "Ministry of Energy Reports",
        description: "Defective fuel imports (Sonatrach), rigged tenders, and generator cartels.",
        icon: <Zap className="w-8 h-8" />
    },
    {
        id: "DL-06",
        title: "CUSTOMS & SMUGGLING",
        amount: "$15B - $25B",
        source: "IMF, Customs Reports",
        description: "Lost revenues from smuggling of goods, fuel, and drugs across porous borders.",
        icon: <ShieldAlert className="w-8 h-8" />
    },
    {
        id: "DL-07",
        title: "TELECOM SECTOR FRAUD",
        amount: "$12B - $18B",
        source: "Ministry of Telecom, World Bank",
        description: "Gross overpricing of services and embezzlement of sector revenues.",
        icon: <Siren className="w-8 h-8" />
    },
    {
        id: "DL-08",
        title: "REAL ESTATE SEIZURES",
        amount: "$10B - $15B",
        source: "Land Registry Investigations",
        description: "Illegal acquisition of public lands (Mashaa) and coastal zones by political elites.",
        icon: <Scale className="w-8 h-8" />
    }
];

const GALLERY_IMAGES = [
    // Left Lane: 1, 2, 3
    { src: "/houseOfCorruption/house-of-corruption-img-1.jpg", alt: "Narco Funding Graph", caption: "Illicit Revenue Streams", side: "left" },
    { src: "/houseOfCorruption/house-of-corruption-img-2.jpg", alt: "Shadow Banking", caption: "Currency Manipulation", side: "left" },
    { src: "/houseOfCorruption/house-of-corruption-img-3.jpg", alt: "The Venezuela Connection", caption: "Gold & Crypto Laundering", side: "left" },

    // Right Lane: 4, 5, 6
    { src: "/houseOfCorruption/house-of-corruption-img-4.jpg", alt: "Fuel Cartel", caption: "Energy Sector Corruption", side: "right" },
    { src: "/houseOfCorruption/house-of-corruption-img-5.jpg", alt: "Laundering Map", caption: "Global Money Flow", side: "right" },
    { src: "/houseOfCorruption/house-of-corruption-img-6.png", alt: "Crisis Summary", caption: "The Aftermath", side: "right" },
];

const indirectStats = [
    {
        title: "MASS EMIGRATION",
        loss: "$200B - $250B",
        label: "LOST GDP (1975-2023)",
        detail: "Over 3.5 million Lebanese emigrated since 1975. Highly skilled professionals left, weakening the economy. Billions lost in missed investments, wages, and entrepreneurship.",
        icon: <Users className="w-6 h-6" />
    },
    {
        title: "PRIVATE GENERATOR COSTS",
        loss: "$40B - $50B",
        label: "ELECTRICITY CRISIS",
        detail: "Lebanese people forced to rely on private generators due to a failed national grid. Families pay $200-$500/month for unreliable power.",
        icon: <Zap className="w-6 h-6" />
    },
    {
        title: "BANK DEPOSITS STOLEN",
        loss: "$80B - $100B",
        label: "FINANCIAL CRISIS (2019-2023)",
        detail: "Lebanese banks froze accounts and prevented depositors from withdrawing their money. Bankers transferred billions abroad while ordinary people lost savings.",
        icon: <Banknote className="w-6 h-6" />
    },
    {
        title: "TRAFFIC CONGESTION",
        loss: "$30B - $40B",
        label: "WASTED COMMUTING TIME",
        detail: "Lebanese spend an average of 1.5-3 hours per day stuck in traffic. Productivity losses equivalent to 5% of Lebanon's GDP/year.",
        icon: <Car className="w-6 h-6" />
    },
    {
        title: "PORT OF BEIRUT EXPLOSION",
        loss: "$15B - $20B",
        label: "ECONOMIC LOSSES",
        detail: "The 2020 explosion destroyed businesses, homes, and key economic infrastructure. Billions in trade revenue lost due to port mismanagement.",
        icon: <Bomb className="w-6 h-6" />
    },
    {
        title: "LOSS OF FOREIGN INVESTMENT",
        loss: "$50B - $70B",
        label: "DUE TO CORRUPTION",
        detail: "International investors withdrew from Lebanon due to political instability & financial fraud.",
        icon: <TrendingDown className="w-6 h-6" />
    },
    {
        title: "HEALTH CRISIS",
        loss: "$10B - $15B",
        label: "POLLUTION & WATER CONTAMINATION",
        detail: "Lebanon's garbage crisis led to massive pollution. Poor sanitation increased disease rates, affecting workforce productivity.",
        icon: <HeartPulse className="w-6 h-6" />
    }
];

// Reusable Components
const SectionHeader = ({ subtitle, title, figure, text }: { subtitle: string, title: string, figure: string, text: string }) => (
    <div className="py-16 text-center">
        <span className="font-oswald text-[10px] tracking-[0.4em] text-red uppercase mb-4 block">{subtitle}</span>
        <h2 className="text-5xl md:text-8xl font-bebas text-foreground mb-6 leading-none">{title}</h2>
        <div className="flex flex-col items-center justify-center gap-2">
            <div className="font-bebas text-3xl md:text-5xl text-red">{figure}</div>
            <p className="font-oswald text-foreground/60 max-w-lg mx-auto text-base font-light tracking-wide">
                {text}
            </p>
        </div>
    </div>
);

export default function HouseOfCorruptionPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [counterValue, setCounterValue] = useState(0);
    const [selectedImage, setSelectedImage] = useState<{ src: string, alt: string, caption: string } | null>(null);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (selectedImage) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [selectedImage]);

    useGSAP(() => {
        // Set initial state
        setCounterValue(0);

        const mm = gsap.matchMedia();

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".counter-section",
                start: "top top",
                end: "+=150%",
                pin: true,
                scrub: 1,
                onUpdate: (self) => setCounterValue(Math.floor(Math.max(0, self.progress) * 1000))
            }
        });

        mm.add({
            isDesktop: "(min-width: 768px)",
            isMobile: "(max-width: 767px)",
        }, (context) => {
            const { isDesktop, isMobile } = context.conditions as { isDesktop: boolean, isMobile: boolean };

            if (isDesktop) {
                // Vertical Animation (Desktop)
                // Adjusted y values to -250vh to ensure images are fully off-screen at start/end
                gsap.set(".left-lane", { y: "100vh" });
                gsap.set(".right-lane", { y: "-250vh" });

                tl.to(".left-lane", { y: "-250vh", ease: "none", duration: 1 }, 0)
                    .to(".right-lane", { y: "100vh", ease: "none", duration: 1 }, 0);
            }

            if (isMobile) {
                tl.fromTo(".mobile-top-lane",
                    { x: "100vw", xPercent: 0 },
                    { x: 0, xPercent: -100, ease: "none", duration: 1 },
                    0
                );

                tl.fromTo(".mobile-bottom-lane",
                    { x: 0, xPercent: -100 },
                    { x: "100vw", xPercent: 0, ease: "none", duration: 1 },
                    0
                );
            }
        });

        mm.add("(min-width: 768px)", () => {
            gsap.fromTo(".center-line",
                { scaleY: 0, transformOrigin: "top" },
                {
                    scaleY: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".indirect-list-container",
                        start: "top 75%",
                        end: "bottom center",
                        scrub: 0.1,
                        invalidateOnRefresh: true
                    }
                }
            );
        });

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="bg-background min-h-screen text-foreground font-sans selection:bg-red selection:text-white">

            {/* 1. HERO WRAPPER */}
            <div className="relative h-screen flex flex-col items-center justify-center overflow-hidden z-10">
                <div className="relative z-10 text-center px-4 max-w-7xl mx-auto space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red text-white font-oswald text-xs tracking-[0.2em] uppercase">
                        <Siren className="w-3 h-3" />
                        Confidential Financial Audit
                    </div>
                    <div className="overflow-hidden">
                        <AnimatedTitle
                            text="THE $1 TRILLION HEIST"
                            className="text-6xl md:text-8xl lg:text-[9rem] font-bebas font-bold text-foreground flex flex-wrap justify-center gap-x-2 opacity-90"
                        />
                    </div>
                    <p className="font-oswald text-lg md:text-2xl text-foreground/70 max-w-3xl mx-auto leading-relaxed text-center font-light tracking-wide">
                        A systematic transfer of wealth. Direct theft, laundered money, and wasted potential.
                    </p>
                </div>
                <div className="absolute bottom-12">
                    <div className="text-foreground/80 font-oswald text-[10px] tracking-[0.3em] uppercase flex flex-col items-center gap-3 animate-bounce">
                        <span>Initiate Inspection</span>
                        <MoveRight className="w-4 h-4 rotate-90" />
                    </div>
                </div>
            </div>

            {/* 2. COUNTER & FLOATING GALLERY WRAPPER */}
            <div className="counter-section h-screen flex flex-col items-center justify-center relative overflow-hidden z-20 bg-background">

                {/* Floating Images Container */}
                <div className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-hidden">

                    {/* DESKTOP: Vertical Lanes (md and up) */}
                    <div className="hidden md:block w-full h-full relative">
                        {/* Left Lane - Moves UP */}
                        <div className="left-lane absolute left-[8%] top-0 flex flex-col gap-[20vh]">
                            {GALLERY_IMAGES.filter(i => i.side === 'left').map((img, idx) => (
                                <div
                                    key={idx}
                                    className="relative pointer-events-auto cursor-pointer transition-all duration-500 group w-56 h-72 lg:w-72 lg:h-96"
                                    onClick={() => setSelectedImage(img)}
                                >
                                    <div className="absolute top-1/2 -left-8 w-8 h-px bg-foreground/20"></div>
                                    <div className="relative w-full h-full border border-light-blue rounded-sm overflow-hidden bg-blue shadow-2xl hover:border-red hover:shadow-[0_0_30px_rgba(220,38,38,0.2)]">
                                        <SkeletonImage
                                            src={img.src}
                                            alt={img.alt}
                                            fill
                                            className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-blue/90 translate-y-full group-hover:translate-y-0 transition-transform duration-300 border-t border-red/30">
                                            <p className="font-bebas text-white text-lg leading-none mb-1">{img.alt}</p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-white/60 text-[9px] font-oswald uppercase tracking-wider">{img.caption}</span>
                                                <Maximize2 className="w-3 h-3 text-red" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Right Lane - Moves DOWN */}
                        <div className="right-lane absolute right-[8%] top-0 flex flex-col gap-[20vh]">
                            {GALLERY_IMAGES.filter(i => i.side === 'right').map((img, idx) => (
                                <div
                                    key={idx}
                                    className="relative pointer-events-auto cursor-pointer transition-all duration-500 group w-56 h-72 lg:w-72 lg:h-96"
                                    onClick={() => setSelectedImage(img)}
                                >
                                    <div className="absolute top-1/2 -right-8 w-8 h-px bg-foreground/20"></div>
                                    <div className="relative w-full h-full border border-light-blue rounded-sm overflow-hidden bg-blue shadow-2xl hover:border-red hover:shadow-[0_0_30px_rgba(220,38,38,0.2)]">
                                        <SkeletonImage
                                            src={img.src}
                                            alt={img.alt}
                                            fill
                                            className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-blue/90 translate-y-full group-hover:translate-y-0 transition-transform duration-300 border-t border-red/30">
                                            <p className="font-bebas text-white text-lg leading-none mb-1">{img.alt}</p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-white/60 text-[9px] font-oswald uppercase tracking-wider">{img.caption}</span>
                                                <Maximize2 className="w-3 h-3 text-red" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* MOBILE: Horizontal Lanes (sm only) */}
                    <div className="md:hidden w-full h-full relative flex flex-col justify-between py-12">
                        {/* Top Lane - Moves LEFT */}
                        <div className="mobile-top-lane flex gap-6 absolute top-20 left-0 whitespace-nowrap z-10 transform-gpu will-change-transform">
                            {GALLERY_IMAGES.filter(i => i.side === 'left').map((img, idx) => (
                                <div
                                    key={`top-${idx}`}
                                    className="relative shrink-0 w-36 h-52 rounded-md overflow-hidden border border-white/20 bg-blue shadow-lg pointer-events-auto active:scale-95 transition-transform"
                                    onClick={() => setSelectedImage(img)}
                                >
                                    <SkeletonImage
                                        src={img.src}
                                        alt={img.alt}
                                        fill
                                        className="object-cover opacity-90"
                                    />
                                    <div className="absolute bottom-2 right-2 p-1.5 bg-red/90 rounded-full text-white shadow-lg backdrop-blur-sm">
                                        <Maximize2 className="w-3 h-3" />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Bottom Lane - Moves RIGHT */}
                        <div className="mobile-bottom-lane flex gap-6 absolute bottom-24 left-0 whitespace-nowrap z-10 transform-gpu will-change-transform">
                            {GALLERY_IMAGES.filter(i => i.side === 'right').map((img, idx) => (
                                <div
                                    key={`bottom-${idx}`}
                                    className="relative shrink-0 w-36 h-52 rounded-md overflow-hidden border border-white/20 bg-blue shadow-lg pointer-events-auto active:scale-95 transition-transform"
                                    onClick={() => setSelectedImage(img)}
                                >
                                    <SkeletonImage
                                        src={img.src}
                                        alt={img.alt}
                                        fill
                                        className="object-cover opacity-90"
                                    />
                                    <div className="absolute bottom-2 right-2 p-1.5 bg-red/90 rounded-full text-white shadow-lg backdrop-blur-sm">
                                        <Maximize2 className="w-3 h-3" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Centered Counter */}
                <div className="relative z-30 text-center px-4 pointer-events-none flex flex-col items-center justify-center h-full">
                    <div className="inline-block border border-red/30 bg-red/5 px-6 py-2 rounded-full mb-8 backdrop-blur-md">
                        <h3 className="font-oswald text-xs md:text-sm text-red tracking-[0.2em] uppercase">Total Economic Impact</h3>
                    </div>
                    <div className="flex items-baseline justify-center font-bebas text-foreground leading-none">
                        <span className="text-4xl md:text-7xl opacity-50 mr-2 md:mr-6 font-light">$</span>
                        <span className="text-[100px] md:text-[220px] tabular-nums tracking-tighter text-foreground">{counterValue}</span>
                        <span className="text-4xl md:text-7xl ml-2 md:ml-6 font-light">B</span>
                    </div>
                    <p className="font-oswald text-foreground/70 max-w-xl mx-auto mt-8 text-base md:text-lg leading-relaxed font-light tracking-wide bg-background/50 p-6 rounded-xl backdrop-blur-sm border border-foreground/5 hidden md:block">
                        Equivalent to losing the entire GDP of the nation... <span className="text-red">every single year.</span>
                    </p>
                </div>
            </div>

            {/* 3. DIRECT LOSSES WRAPPER */}
            <div className="relative z-30">
                <SectionHeader
                    subtitle="Exhibit A"
                    title="DIRECT LOSSES"
                    figure="$500B - $600B"
                    text="Verified financial data extracted from international audits and forensic reports."
                />

                {/* Grid View (Desktop) - Replaces Horizontal Scroll */}
                <div className="direct-losses-wrapper hidden lg:block py-24 bg-background">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1400px] mx-auto px-12">
                        {DIRECT_LOSSES.map((item, index) => (
                            <div
                                key={index}
                                className="dossier-card w-full h-[600px] bg-blue relative flex flex-col p-10 group shadow-2xl rounded-sm hover:-translate-y-2 transition-transform duration-300"
                            >
                                {/* Card Header */}
                                <div className="flex justify-between items-start mb-12">
                                    <div className="p-4 bg-linear-to-br from-red to-red/60 rounded-full text-white group-hover:scale-110 transition-transform duration-500 border border-white/5">
                                        {item.icon}
                                    </div>
                                    <span className="font-oswald text-xs text-white/30 tracking-[0.2em] uppercase">{item.id}</span>
                                </div>

                                {/* Content */}
                                <div className="grow flex flex-col justify-center">
                                    <h3 className="font-bebas text-5xl text-white mb-4 leading-[0.85]">{item.title}</h3>
                                    <div className="h-px w-12 bg-red mb-6 group-hover:w-full transition-all duration-700"></div>

                                    <div className="font-bebas text-4xl text-red/90 mb-6">{item.amount}</div>

                                    <p className="font-oswald text-white/70 text-lg font-light leading-relaxed mb-8">
                                        {item.description}
                                    </p>
                                </div>

                                {/* Footer */}
                                <div className="pt-6 border-t border-white/10">
                                    <div className="flex flex-col gap-1">
                                        <span className="font-oswald text-[9px] text-white/30 uppercase tracking-widest">Source</span>
                                        <span className="font-oswald text-xs text-white/60 uppercase tracking-wide">{item.source}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mobile List View (Direct Losses) */}
                <div className="lg:hidden px-6 pb-24 space-y-8 bg-background">
                    {DIRECT_LOSSES.map((item, index) => (
                        <div key={index} className="bg-blue border border-light-blue p-8 rounded-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-6 opacity-10 text-white">
                                {item.icon}
                            </div>
                            <span className="font-oswald text-[10px] text-red uppercase tracking-widest mb-2 block">{item.id}</span>
                            <h3 className="font-bebas text-4xl text-white mb-2 leading-none">{item.title}</h3>
                            <div className="font-bebas text-3xl text-red mb-4">{item.amount}</div>
                            <p className="font-oswald text-white/70 text-sm font-light mb-6">{item.description}</p>
                            <div className="pt-4 border-t border-white/10">
                                <span className="font-oswald text-[10px] text-white/40 uppercase tracking-wider">Source: {item.source}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 4. INDIRECT LOSSES WRAPPER */}
            <div className="indirect-wrapper py-32 bg-background relative z-40 overflow-hidden">
                <div className="max-w-[1200px] mx-auto px-6 relative">
                    <SectionHeader
                        subtitle="Exhibit B: Cost of Life"
                        title="THE HUMAN COST"
                        figure="$400B - $500B"
                        text="This is not just money lost; it is time and future stolen."
                    />

                    <div className="indirect-list-container relative space-y-24 mb-32">
                        {/* Faded Background Line */}
                        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-red/10 hidden md:block"></div>
                        {/* Animating Main Line */}
                        <div className="center-line absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-red hidden md:block origin-top"></div>

                        {indirectStats.map((stat, i) => (
                            <div key={i} className={`flex flex-col md:flex-row items-center gap-12 relative z-10 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                                <div className="w-full md:w-1/2 flex justify-center">
                                    <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
                                        {/* Pulse Animations */}
                                        <div className="absolute inset-0 border border-red/40 rounded-full animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
                                        <div className="absolute inset-8 border border-red/20 rounded-full animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] delay-150"></div>
                                        <div className="absolute inset-16 border border-red/10 rounded-full animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] delay-300"></div>

                                        <div className="w-32 h-32 md:w-40 md:h-40 bg-blue border border-light-blue rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(220,38,38,0.2)] relative z-20 group">
                                            <div className="text-red scale-150 group-hover:scale-125 transition-transform duration-500">
                                                {stat.icon}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`w-full md:w-1/2 ${i % 2 === 1 ? 'md:text-right' : 'md:text-left'} text-center`}>
                                    <span className="font-oswald text-xs text-red uppercase tracking-[0.3em] mb-2 block">{stat.label}</span>
                                    <h3 className="font-bebas text-5xl md:text-7xl text-foreground mb-4 leading-[0.9]">{stat.title}</h3>
                                    <div className={`h-1 w-24 bg-foreground/10 mb-6 mx-auto ${i % 2 === 1 ? 'md:ml-auto md:mr-0' : 'md:mr-auto md:ml-0'}`}></div>
                                    <div className="font-bebas text-4xl md:text-5xl text-foreground/80 mb-6">{stat.loss}</div>
                                    <p className={`font-oswald text-foreground/60 text-lg md:text-xl font-light leading-relaxed max-w-sm mx-auto ${i % 2 === 1 ? 'md:ml-auto md:mr-0' : 'md:mr-auto md:ml-0'}`}>
                                        {stat.detail}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 5. CTA WRAPPER */}
            <div className="relative py-40 border-t border-foreground/10 overflow-hidden bg-background">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-linear-to-b from-transparent to-background"></div>
                </div>
                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    <FileText className="w-12 h-12 text-red/80 mx-auto mb-8 opacity-80" />
                    <h2 className="text-5xl md:text-7xl font-bebas text-foreground mb-8 leading-[0.9]">
                        LEBANON'S COLLAPSE IS NOT A DISASTER.<br />
                        <span className="text-red">IT IS A CRIME SCENE.</span>
                    </h2>
                    <p className="font-oswald text-lg text-foreground/50 mb-12 max-w-xl mx-auto font-light tracking-wide">
                        The data is public. The perpetrators are known. The stolen assets are traced. What is missing is accountability.
                    </p>
                    <Link
                        href="/houseOfCorruption/house-of-corruption-summary.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <button className="group relative bg-foreground text-background px-10 py-4 md:py-3 font-bebas text-base md:text-lg tracking-[0.2em] uppercase overflow-hidden hover:bg-red hover:text-white transition-all duration-300 cursor-pointer">
                            <span className="relative z-10 flex items-center gap-4">
                                CHECK OUT FULL REPORT <MoveRight className="w-4 h-4" />
                            </span>
                        </button>
                    </Link>
                </div>
            </div>

            {/* IMAGE INSPECTION MODAL */}
            {selectedImage && (
                <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-8 animate-in fade-in duration-300">
                    <button
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-6 right-6 text-white/70 hover:text-red transition-colors p-2 z-50 bg-black/20 rounded-full"
                    >
                        <X className="w-8 h-8 md:w-10 md:h-10" />
                    </button>

                    <div
                        className="relative w-full max-w-5xl h-[80vh] md:h-[85vh] flex flex-col items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative w-full h-full rounded-sm overflow-hidden border border-white/10 shadow-2xl bg-black">
                            <SkeletonImage
                                src={selectedImage.src}
                                alt={selectedImage.alt}
                                fill
                                className="object-contain"
                            />
                        </div>
                        <div className="mt-4 md:mt-6 text-center px-4">
                            <h3 className="font-bebas text-2xl md:text-3xl text-white tracking-wide">{selectedImage.alt}</h3>
                            <p className="font-oswald text-red text-xs md:text-sm tracking-[0.2em] uppercase">{selectedImage.caption}</p>
                        </div>
                    </div>

                    <div className="absolute inset-0 -z-10" onClick={() => setSelectedImage(null)} />
                </div>
            )}

        </div>
    );
}