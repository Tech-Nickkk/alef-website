"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "./ThemeProvider";
import { useGSAP } from "@gsap/react";
import { createPortal } from "react-dom";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
    const navRef = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);

    useGSAP(() => {
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
    }, { scope: navRef });

    useEffect(() => {
        setMounted(true);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isMenuOpen]);

    const toggleSubmenu = (label: string) => {
        setOpenSubmenu(prev => prev === label ? null : label);
    };

    const navLinks = [
        { label: "Home", href: "/" },
        {
            label: "About Us",
            href: "#",
            dropdown: [
                { label: "Our Profile", href: "/alef-profile" },
                { label: "Core Values", href: "/core-values" },
                { label: "Strategic Plan", href: "/strategic-plan" },
                { label: "Resident Activists", href: "/resident-activists" },
                { label: "Our Sponsors", href: "/sponsors" },      // Moved from Multimedia
                { label: "Testimonials", href: "/testimonials" }   // Moved from Get In Touch
            ],
        },
        {
            label: "Research & News",
            href: "#",
            dropdown: [
                { label: "In the News", href: "/alef-in-the-news" }, // Cleaned label
                { label: "Blogs & Articles", href: "/blogs-and-articles" },
                { label: "House of Corruption", href: "/house-of-corruption" },
                { label: "House of Cards", href: "/house-of-cards" }
            ],
        },
        {
            label: "Media", // Shortened from Multimedia
            href: "#",
            dropdown: [
                { label: "Videos", href: "/videos" },
                { label: "Podcasts", href: "/podcasts" },
                { label: "Events Gallery", href: "/events-gallery" }
            ],
        },
        { label: "Store", href: "/alef-store" }, // Elevated to top-level for better visibility
        {
            label: "Contact",
            href: "#",
            dropdown: [
                { label: "Get in Touch", href: "/contact" },
                { label: "FAQ", href: "/faq" } // Moved from Get In Touch
            ]
        }
    ];

    return (
        <>
            <nav ref={navRef} className="fixed top-0 z-50 w-full px-4 md:px-8 lg:px-12 flex items-center justify-between bg-theme-black navbar-container h-16 md:h-20 overflow-visible">

                {/* Left: Logo */}
                <div className="shrink-0 cursor-pointer relative z-50">
                    <Link href="/" onClick={() => setIsMenuOpen(false)}>
                        <div className="relative">
                            <Image src="/home/logo.png" alt="ALEF Logo" width={90} height={90} className="object-contain w-[80px] md:w-[110px]" />
                        </div>
                    </Link>
                </div>

                {/* Center: Desktop Navigation */}
                <div className="hidden xl:flex items-center gap-6 text-[14px] lg:text-[15px] tracking-wide text-theme-white/90 font-oswald">
                    {navLinks.map((link, index) => (
                        <React.Fragment key={link.label}>
                            {index > 0 && <span className="w-px h-4 bg-white/40"></span>}

                            {link.dropdown ? (
                                <div className="group relative flex items-center gap-1 cursor-pointer hover:text-theme-white transition-colors tracking-widest text-sm h-full py-8 uppercase">
                                    <Link href={link.href}>{link.label}</Link>
                                    <ChevronDown className="w-3 h-3 text-theme-white/70 group-hover:text-theme-white transition-transform group-hover:rotate-180" />

                                    {/* Dropdown Menu */}
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top group-hover:translate-y-0 translate-y-2">
                                        <div className="bg-theme-black/90 backdrop-blur-md border border-theme-white/10 p-2 shadow-xl rounded-sm">
                                            <ul className="flex flex-col gap-1">
                                                {link.dropdown.map((subItem) => (
                                                    <li key={subItem.label}>
                                                        <Link
                                                            href={subItem.href}
                                                            className="block px-4 py-3 text-sm text-theme-white/80 hover:text-theme-white hover:bg-theme-white/10 transition-colors uppercase"
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
                                    className="hover:text-theme-white transition-colors tracking-widest text-sm py-8 uppercase"
                                >
                                    {link.label}
                                </Link>
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* Right: Actions (Desktop) & Hamburger (Mobile) */}
                <div className="flex items-center gap-3 md:gap-6 relative z-50">
                    {/* Theme Toggle - Visible always */}
                    <ThemeToggle />

                    {/* Search - Hidden on very small screens if crowded, or keep */}
                    <button className="hidden sm:block text-theme-white/90 hover:text-theme-white transition-colors p-2 hover:bg-theme-white/10 rounded-none cursor-pointer">
                        <SearchIcon className="w-5 h-5 cursor-pointer" />
                    </button>

                    {/* Donate - Hidden on small mobile to save space? Or kept compact. */}
                    <div className="hidden sm:block relative group">
                        <span className="absolute inset-0 bg-theme-accent opacity-75 animate-ping duration-2000 rounded-none"></span>
                        <button className="relative overflow-hidden bg-theme-accent hover:bg-[#c4151c] text-white px-4 py-2 md:px-6 md:py-2.5 text-[10px] md:text-xs uppercase font-semibold transition-all transform hover:-translate-y-0.5 shadow-lg shadow-red-900/20 tracking-wider rounded-none font-oswald cursor-pointer isolate">
                            <span className="relative z-10">Donate</span>
                            <div className="absolute top-0 -left-full w-full h-full bg-linear-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] group-hover:left-[150%] transition-all duration-700 ease-in-out z-0" />
                        </button>
                    </div>

                    {/* Mobile Menu Button - Visible < XL */}
                    <button
                        className="xl:hidden p-2 text-theme-white hover:bg-theme-white/10 transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? null : <MenuIcon className="w-8 h-8" />}
                    </button>
                </div>
            </nav>

            {/* PORTAL: Mobile Menu Overlay */}
            {mounted && createPortal(
                <div
                    className={`fixed inset-0 bg-[#021024] z-999 transition-transform duration-500 cubic-bezier(0.7,0,0.3,1) flex flex-col ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
                >
                    {/* Scrollable Content Container - Fades in/out */}
                    <div className={`flex-1 flex flex-col h-full overflow-y-auto transition-opacity duration-500 ease-in-out ${isMenuOpen ? 'opacity-100 delay-300' : 'opacity-0 delay-0'}`}>

                        {/* Mobile Header (Logo + Close) */}
                        <div className="shrink-0 flex items-center justify-between px-6 h-20 md:h-24 border-b border-white/10">
                            <div className="relative">
                                <Link href="/" onClick={() => setIsMenuOpen(false)}>
                                    <Image src="/home/logo.png" alt="ALEF Logo" width={80} height={80} className="object-contain w-[70px] md:w-[90px]" />
                                </Link>
                            </div>
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="p-2 text-white hover:text-theme-accent transition-colors"
                            >
                                <XIcon className="w-8 h-8" />
                            </button>
                        </div>

                        {/* Mobile Links */}
                        <div className="flex-1 px-6 py-8">
                            <div className="flex flex-col gap-6">
                                {navLinks.map((link) => (
                                    <div key={link.label} className="border-b border-white/5 pb-4 last:border-0">
                                        <div
                                            className="flex items-center justify-between cursor-pointer group"
                                            onClick={() => {
                                                if (link.dropdown) {
                                                    toggleSubmenu(link.label);
                                                } else {
                                                    setIsMenuOpen(false);
                                                }
                                            }}
                                        >
                                            <Link
                                                href={link.dropdown ? "#" : link.href}
                                                onClick={(e) => {
                                                    if (link.dropdown) e.preventDefault();
                                                }}
                                                className="text-3xl font-bebas text-white tracking-wide group-hover:text-theme-accent transition-colors block w-full"
                                            >
                                                {link.label}
                                            </Link>

                                            {link.dropdown && (
                                                <div className={`p-2 text-white/50 group-hover:text-theme-accent transition-all duration-300 ${openSubmenu === link.label ? 'rotate-180' : ''}`}>
                                                    <ChevronDown className="w-5 h-5" />
                                                </div>
                                            )}
                                        </div>

                                        {/* Accordion Submenu */}
                                        {link.dropdown && (
                                            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openSubmenu === link.label ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                                                <ul className="flex flex-col gap-3 pl-4 border-l-2 border-theme-accent/20 ml-1">
                                                    {link.dropdown.map(subItem => (
                                                        <li key={subItem.label}>
                                                            <Link
                                                                href={subItem.href}
                                                                className="text-sm font-oswald text-white/70 uppercase tracking-widest hover:text-theme-accent transition-colors block py-1"
                                                                onClick={() => setIsMenuOpen(false)}
                                                            >
                                                                {subItem.label}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="mt-12 flex flex-col gap-6">
                                <button className="w-full bg-theme-accent text-white font-bebas text-xl tracking-wider py-4 uppercase hover:bg-[#c4151c] transition-colors shadow-lg shadow-red-500/20">
                                    Donate to ALEF
                                </button>
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}

function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="text-theme-white/90 hover:text-theme-white transition-colors p-2 hover:bg-theme-white/10 rounded-none flex items-center gap-2 cursor-pointer"
            aria-label="Toggle Theme"
        >
            {theme === 'light' && <MoonIcon className="w-5 h-5" />}
            {theme === 'dark' && <SunIcon className="w-5 h-5" />}
        </button>
    );
}

function ChevronDown({ className }: { className?: string }) {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m6 9 6 6 6-6" /></svg>;
}

function SearchIcon({ className }: { className?: string }) {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>;
}

function SunIcon({ className }: { className?: string }) {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" /></svg>;
}

function MoonIcon({ className }: { className?: string }) {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>;
}

function MenuIcon({ className }: { className?: string }) {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>;
}

function XIcon({ className }: { className?: string }) {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>;
}
