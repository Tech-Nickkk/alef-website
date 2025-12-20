"use client";

import Link from "next/link";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
    const navRef = useRef(null);

    useEffect(() => {
        const showAnim = gsap.from(navRef.current, {
            yPercent: -100,
            paused: true,
            duration: 0.5,
            ease: "power2.out"
        }).progress(1);

        ScrollTrigger.create({
            start: "top top",
            end: 99999,
            onUpdate: (self) => {
                if (self.direction === -1) {
                    showAnim.play();
                } else {
                    showAnim.reverse();
                }
            }
        });
    }, []);
    const navLinks = [
        { label: "Home", href: "/" },
        {
            label: "About Us",
            href: "/about-us",
            dropdown: [
                { label: "Our Mission and Story", href: "/about-us/mission" },
                { label: "Editorial Team", href: "/about-us/team" },
                { label: "Contact Information", href: "/about-us/contact" },
            ],
        },
        {
            label: "Research",
            href: "/research",
            dropdown: [
                { label: "Politics in Lebanon", href: "/research/politics" },
                { label: "Economy and Terrorism", href: "/research/economy" },
                { label: "Culture and Society", href: "/research/culture" },
                { label: "Opinions & Strategies", href: "/research/opinions" },
                { label: "Additional Topics", href: "/research/topics" },
            ],
        },
        { label: "Experts", href: "/experts" },
        {
            label: "Events",
            href: "/events",
            dropdown: [
                { label: "Upcoming Events", href: "/events/upcoming" },
                { label: "Past Events", href: "/events/past" },
            ],
        },
        {
            label: "Resources",
            href: "/resources",
            dropdown: [
                { label: "Articles & Reports", href: "/resources/articles" },
                { label: "Podcasts", href: "/resources/podcasts" },
                { label: "Newsletters", href: "/resources/newsletters" },
            ],
        },
        { label: "Contact", href: "/contact" },
    ];

    return (
        <nav ref={navRef} className="fixed top-0 z-50 w-full px-6 md:px-12 flex items-center justify-between max-w-[1920px] mx-auto border-b border-white/10 bg-black/30 backdrop-blur-md navbar-container opacity-0">
            {/* Logo */}
            <div className="shrink-0 cursor-pointer">
                <Link href="/">
                    <div className="relative">
                        <Image src="/home/logo.png" alt="ALEF Logo" width={100} height={100} className="object-contain brightness-0 invert" />
                    </div>
                </Link>
            </div>

            {/* Navigation Links - Centered */}
            <div className="hidden lg:flex items-center gap-6 text-[15px] font-medium tracking-wide text-white/90">
                {navLinks.map((link, index) => (
                    <React.Fragment key={link.label}>
                        {index > 0 && <span className="w-px h-4 bg-white/40"></span>}

                        {link.dropdown ? (
                            <div className="group relative flex items-center gap-1 cursor-pointer hover:text-white transition-colors tracking-widest text-sm h-full py-8">
                                <Link href={link.href}>{link.label}</Link>
                                <ChevronDown className="w-3 h-3 text-white/70 group-hover:text-white transition-transform group-hover:rotate-180" />

                                {/* Dropdown Menu */}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top group-hover:translate-y-0 translate-y-2">
                                    <div className="bg-[#1a2b4b] backdrop-blur-md border border-white/10 p-2 shadow-xl rounded-sm">
                                        <ul className="flex flex-col gap-1">
                                            {link.dropdown.map((subItem) => (
                                                <li key={subItem.label}>
                                                    <Link
                                                        href={subItem.href}
                                                        className="block px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors capitalize font-optima"
                                                    >
                                                        {subItem.label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Link
                                href={link.href}
                                className="hover:text-white transition-colors tracking-widest text-sm py-8"
                            >
                                {link.label}
                            </Link>
                        )}
                    </React.Fragment>
                ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-6">
                <button className="text-white/90 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-none">
                    <SearchIcon className="w-5 h-5" />
                </button>

                <button className="bg-[#E31B23] hover:bg-[#c4151c] text-white px-6 py-2.5 text-xs uppercase font-semibold transition-all transform hover:-translate-y-0.5 shadow-lg shadow-red-900/20 tracking-wider rounded-none font-optima">
                    Donate
                </button>
            </div>
        </nav>
    );
}

function ChevronDown({ className }: { className?: string }) {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m6 9 6 6 6-6" /></svg>;
}

function SearchIcon({ className }: { className?: string }) {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>;
}