"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import AnimatedTitle from "../components/CommonCom/AnimatedTitle";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AlertTriangle, Banknote, Building2, TrendingDown, Users, Zap, MoveRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function HouseOfCorruptionPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [counterValue, setCounterValue] = useState(0);

    useGSAP(() => {
        const mm = gsap.matchMedia();

        // 1. HERO ANIMATION
        const heroTl = gsap.timeline();
        heroTl.from(".hero-text-char", {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.05,
            ease: "power4.out"
        })
            .from(".hero-badge", {
                scale: 0,
                opacity: 0,
                duration: 0.5,
                ease: "back.out(1.7)"
            }, "-=0.5")
            .from(".hero-sub", {
                y: 20,
                opacity: 0,
                duration: 0.8
            }, "-=0.3");

        // 2. PINNED COUNTER SECTION (The Scale of Loss)
        ScrollTrigger.create({
            trigger: ".counter-section",
            start: "top top",
            end: "+=150%",
            pin: true,
            scrub: 1,
            onUpdate: (self) => {
                // Animate the number from 0 to 1000 (representing Billions -> 1 Trillion)
                setCounterValue(Math.floor(self.progress * 1000));
            }
        });

        // Animate the red fills and bars in the counter section
        gsap.fromTo(".loss-bar",
            { scaleX: 0 },
            {
                scaleX: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: ".counter-section",
                    start: "top top",
                    end: "+=150%",
                    scrub: 1
                }
            }
        );


        // 3. HORIZONTAL SCROLL (Direct Losses)
        // Only on Desktop
        mm.add("(min-width: 1024px)", () => {
            const sections = gsap.utils.toArray(".direct-loss-card");

            gsap.to(scrollContainerRef.current, {
                xPercent: -100 * (sections.length - 1) / sections.length * 1.1, // Adjust for padding
                ease: "none",
                scrollTrigger: {
                    trigger: ".horizontal-scroll-wrapper",
                    start: "top top",
                    end: "+=300%", // Scroll distance
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1
                }
            });
        });

        // 4. INDIRECT LOSSES (Reveal)
        gsap.from(".indirect-stat", {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
                trigger: ".indirect-section",
                start: "top 70%"
            }
        });

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="bg-background min-h-screen text-foreground pb-24 overflow-x-hidden">

            {/* FLOATING PARTICLES (Money/Shreds) */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-10">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute bg-white/20 w-8 h-4 rounded-sm animate-float"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDuration: `${10 + Math.random() * 20}s`,
                            animationDelay: `-${Math.random() * 20}s`,
                            transform: `rotate(${Math.random() * 360}deg)`
                        }}
                    />
                ))}
            </div>


            {/* 1. HERO SECTION */}
            <header className="relative h-screen flex flex-col items-center justify-center overflow-hidden border-b border-white/10 z-10">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[url('/home/noise.png')] opacity-20 animate-pulse-slow"></div>
                    <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-blue/50 via-transparent to-background"></div>
                </div>

                <div className="relative z-10 text-center px-4 max-w-6xl mx-auto space-y-8">
                    <div className="hero-badge inline-flex items-center gap-3 px-6 py-2 bg-red/10 border border-red/30 rounded-none transform -skew-x-12 text-red font-oswald text-sm tracking-[0.3em] uppercase">
                        <AlertTriangle className="w-4 h-4" />
                        Confidential Financial Report
                    </div>

                    <div className="overflow-hidden">
                        <h1 className="text-7xl md:text-[10rem] font-bebas leading-[0.8] text-foreground tracking-tighter flex flex-wrap justify-center gap-x-6">
                            {"THE $1 TRILLION HEIST".split(" ").map((word, i) => (
                                <span key={i} className="hero-text-char inline-block">{word}</span>
                            ))}
                        </h1>
                    </div>

                    <p className="hero-sub font-oswald text-xl md:text-2xl text-foreground/60 max-w-3xl mx-auto leading-relaxed border-l-2 border-red/50 pl-6 text-left">
                        Lebanon’s collapse was a calculated transfer of wealth.<br />
                        <span className="text-red">50 years of systematic looting, visualized.</span>
                    </p>
                </div>

                <div className="absolute bottom-12 animate-bounce">
                    <div className="text-foreground/30 font-oswald text-xs tracking-widest uppercase flex flex-col items-center gap-2">
                        <span>Initiate Audit</span>
                        <MoveRight className="w-5 h-5 rotate-90" />
                    </div>
                </div>
            </header>


            {/* 2. THE SCALE OF LOSS (Pinned Counter) */}
            <section className="counter-section h-screen flex flex-col items-center justify-center bg-blue relative overflow-hidden z-20">
                <div className="absolute inset-0 w-full h-full">
                    {/* Progress Bar Background */}
                    <div className="loss-bar absolute bottom-0 left-0 h-full w-full bg-red/10 origin-bottom transform scale-y-0 lg:scale-y-1 lg:scale-x-0 lg:origin-left"></div>
                </div>

                <div className="relative z-10 text-center px-4">
                    <h3 className="font-oswald text-xl md:text-2xl text-white/50 tracking-[0.5em] uppercase mb-4">Total Estimated Losses</h3>

                    <div className="flex items-baseline justify-center font-bebas text-white leading-none">
                        <span className="text-6xl md:text-9xl opacity-50 mr-4">$</span>
                        <span className="text-[120px] md:text-[250px] tabular-nums tracking-tighter text-red drop-shadow-[0_0_50px_rgba(227,27,35,0.4)]">
                            {counterValue}
                        </span>
                        <span className="text-6xl md:text-9xl ml-4">B</span>
                    </div>

                    <p className="font-oswald text-white/70 max-w-2xl mx-auto mt-8 text-lg">
                        More than the GDP of 100 nations combined. <br />
                        Stolen from public funds, swallowed by banks, and vanished offshore.
                    </p>
                </div>
            </section>


            {/* 3. DIRECT FINANCIAL LOSSES (Horizontal Scroll) */}
            <section className="horizontal-scroll-wrapper h-screen bg-background relative overflow-hidden z-30 hidden lg:flex flex-col justify-center">
                <div className="absolute top-12 left-12 z-20">
                    <span className="font-oswald text-xs tracking-[0.3em] text-red uppercase mb-2 block">EXHIBIT A</span>
                    <h2 className="text-6xl font-bebas text-white">DIRECT THEFT</h2>
                    <p className="font-oswald text-white/40 text-sm mt-2">Scroll to investigate case files</p>
                </div>

                <div className="flex px-12 gap-12 w-[max-content]" ref={scrollContainerRef}>
                    {directLosses.map((item, index) => (
                        <div key={index} className="direct-loss-card w-[600px] h-[70vh] bg-blue border border-white/10 rounded-3xl p-10 flex flex-col justify-between relative group hover:border-red/50 transition-all duration-500 overflow-hidden">
                            <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/80 opacity-60"></div>
                            <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity transform scale-150">
                                {item.icon}
                            </div>

                            <div className="relative z-10">
                                <span className="inline-block px-3 py-1 bg-white/5 rounded text-xs font-oswald tracking-[0.2em] text-red-400 mb-6">CASE FILE 00{index + 1}</span>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 bg-red/10 rounded-lg text-red">
                                        {item.icon}
                                    </div>
                                    <h3 className="font-bebas text-4xl text-white">{item.title}</h3>
                                </div>
                            </div>

                            <div className="relative z-10 border-t border-white/10 pt-8">
                                <div className="flex justify-between items-end mb-4">
                                    <span className="font-oswald text-white/40 text-sm uppercase tracking-wider">Estimated Amount</span>
                                    <span className="font-bebas text-6xl text-red">{item.amount}</span>
                                </div>
                                <p className="font-oswald text-lg text-white/70 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                    {/* Final CTA Card in Scroll */}
                    <div className="direct-loss-card w-[600px] h-[70vh] bg-red rounded-3xl p-10 flex flex-col justify-center items-center text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('/home/noise.png')] opacity-30 mix-blend-overlay"></div>
                        <h3 className="font-bebas text-6xl text-white mb-6 relative z-10">THE LIST GOES ON</h3>
                        <p className="font-oswald text-white/80 text-xl max-w-md mb-8 relative z-10">This visualizes only the top 6 sectors of theft. The reality is far deeper.</p>
                    </div>
                </div>
            </section>

            {/* MOBILE FALLBACK FOR DIRECT LOSSES (Standard Grid) */}
            <section className="lg:hidden py-24 px-4">
                <div className="mb-12 text-center">
                    <span className="font-oswald text-xs tracking-[0.3em] text-red uppercase mb-2 block">EXHIBIT A</span>
                    <h2 className="text-5xl font-bebas text-white">DIRECT THEFT</h2>
                </div>
                <div className="space-y-6">
                    {directLosses.map((item, index) => (
                        <div key={index} className="bg-blue border border-white/10 p-8 rounded-xl">
                            <div className="flex justify-between items-start mb-6">
                                {item.icon}
                                <span className="font-bebas text-3xl text-red">{item.amount}</span>
                            </div>
                            <h3 className="font-bebas text-2xl text-white mb-2">{item.title}</h3>
                            <p className="font-oswald text-sm text-white/60">{item.description}</p>
                        </div>
                    ))}
                </div>
            </section>


            {/* 4. INDIRECT LOSSES (Reveal) */}
            <section className="indirect-section py-32 px-4 md:px-12 max-w-[1400px] mx-auto z-40 relative">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <span className="font-oswald text-xs tracking-[0.3em] text-red uppercase mb-4 block">EXHIBIT B</span>
                        <h2 className="text-5xl md:text-8xl font-bebas text-white mb-8 leading-[0.8]">THE<br /><span className="text-foreground/20">HUMAN COST</span></h2>
                        <div className="h-2 w-32 bg-red mb-12"></div>

                        <div className="space-y-8">
                            <div className="indirect-stat pl-8 border-l border-white/10 hover:border-red transition-colors duration-500">
                                <h4 className="font-bebas text-3xl text-white mb-1">BRAIN DRAIN</h4>
                                <p className="font-oswald text-red text-xl mb-2">$200B+ Lost GDP</p>
                                <p className="font-oswald text-sm text-white/50">3.5 million Lebanese emigrated. Doctors, engineers, and youth forced to build other nations.</p>
                            </div>
                            <div className="indirect-stat pl-8 border-l border-white/10 hover:border-red transition-colors duration-500">
                                <h4 className="font-bebas text-3xl text-white mb-1">ENERGY FAILURE</h4>
                                <p className="font-oswald text-red text-xl mb-2">$45B+ Generator Bills</p>
                                <p className="font-oswald text-sm text-white/50">Citizens pay double for electricity that the state fails to provide.</p>
                            </div>
                            <div className="indirect-stat pl-8 border-l border-white/10 hover:border-red transition-colors duration-500">
                                <h4 className="font-bebas text-3xl text-white mb-1">STAGNATION</h4>
                                <p className="font-oswald text-red text-xl mb-2">$40B+ Time Wasted</p>
                                <p className="font-oswald text-sm text-white/50">Billions of hours lost in traffic and bureaucracy every year.</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue rounded-3xl p-8 md:p-12 border border-white/5 relative overflow-hidden h-[600px] flex items-end group">
                        <div className="absolute inset-0">
                            <Image
                                src="/home/BLogs&Articles.jpg"
                                alt="Beirut Port"
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent"></div>
                        </div>
                        <div className="relative z-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <div className="bg-red px-4 py-1 text-white font-oswald text-xs tracking-widest uppercase inline-block mb-4">Case Study</div>
                            <h3 className="font-bebas text-5xl text-white leading-none mb-4">THE PORT EXPLOSION</h3>
                            <p className="font-oswald text-white/80 max-w-md">
                                The ultimate manifestation of corruption. Negligence that cost 200+ lives and $15 Billion in physical damage.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. CTA SECTION */}
            <section className="text-center py-32 border-t border-white/10 relative z-40 bg-background">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-5xl md:text-8xl font-bebas text-white mb-8">DEMAND <span className="text-outline-red text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">JUSTICE</span></h2>
                    <p className="font-oswald text-xl text-white/60 mb-12">
                        The evidence is clear. The perpetrators are known. Explore the files.
                    </p>
                    <div className="flex flex-col md:flex-row justify-center gap-6">
                        <button className="group relative bg-red text-white px-16 py-5 font-bebas text-2xl tracking-widest uppercase overflow-hidden">
                            <span className="relative z-10">OPEN THE ARCHIVE</span>
                            <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            <span className="absolute inset-0 z-20 flex items-center justify-center text-red opacity-0 group-hover:opacity-100 transition-opacity duration-300">OPEN THE ARCHIVE</span>
                        </button>
                    </div>
                </div>
            </section>

        </div>
    );
}

const directLosses = [
    {
        icon: <Banknote className="w-12 h-12 text-current" />,
        amount: "$150B+",
        title: "Embezzlement",
        description: "Direct theft from public coffers by state officials over 40 years."
    },
    {
        icon: <Building2 className="w-12 h-12 text-current" />,
        amount: "$100B+",
        title: "Money Laundering",
        description: "Illicit capital flight to offshore tax havens like Switzerland and Panama."
    },
    {
        icon: <TrendingDown className="w-12 h-12 text-current" />,
        amount: "$85B",
        title: "Ponzi Scheme",
        description: "Central Bank financial engineering that swallowed depositors' life savings."
    },
    {
        icon: <Zap className="w-12 h-12 text-current" />,
        amount: "$95B",
        title: "Energy Sector",
        description: "Phantom power plants and fuel deals leaving the country in darkness."
    },
    {
        icon: <AlertTriangle className="w-12 h-12 text-current" />,
        amount: "$25B",
        title: "Smuggling",
        description: "Lost customs revenue at ports and borders controlled by militias."
    },
    {
        icon: <Users className="w-12 h-12 text-current" />,
        amount: "$18B",
        title: "Telecom Fraud",
        description: "Sector overpricing and fraudulent contracts in the Ministry of Telecommunications."
    }
];