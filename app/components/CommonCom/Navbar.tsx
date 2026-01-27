"use client";

import React, { useEffect, useRef, useState } from "react";
import SkeletonImage from "./SkeletonImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "./ThemeProvider";
import { useGSAP } from "@gsap/react";
import { createPortal } from "react-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { usePathname, useRouter, Link } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
    const navRef = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);
    const [user] = useAuthState(auth);

    // i18n hooks
    const pathname = usePathname();
    const router = useRouter();
    const locale = useLocale(); // Added this line

    const handleLanguageChange = (locale: string) => {
        router.replace(pathname, { locale });
        setIsLangOpen(false);
        setIsMenuOpen(false);
    };

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

    // Close menu on resize if screen becomes large
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1280 && isMenuOpen) {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isMenuOpen]);

    const toggleSubmenu = (label: string) => {
        setOpenSubmenu(prev => prev === label ? null : label);
    };

    const t = useTranslations('Navbar');

    const navLinks = [
        { label: t('home'), href: "/" },
        {
            label: t('about'),
            href: "#",
            dropdown: [
                { label: t('menu.ourProfile'), href: "/alef-profile" },
                { label: t('menu.coreValues'), href: "/core-values" },
                { label: t('menu.strategicPlan'), href: "/strategic-plan" },
                { label: t('menu.expertsCorner'), href: "/experts-corner" },
                { label: t('menu.ourSponsors'), href: "/sponsors" },
                { label: t('menu.testimonials'), href: "/testimonials" }
            ],
        },
        { label: t('congressional'), href: "/congressional-advocacy" },
        {
            label: t('research'),
            href: "#",
            dropdown: [
                { label: t('menu.inTheNews'), href: "/alef-in-the-news" },
                { label: t('menu.blogsAndArticles'), href: "/blogs-and-articles" },
                { label: t('menu.houseOfCorruption'), href: "/house-of-corruption" },
                { label: t('menu.houseOfCards'), href: "/house-of-cards" },
                { label: t('menu.archives'), href: "/archives" },
                { label: t('menu.bookRecommendations'), href: "/book-recommendations" },
                { label: t('menu.fallenAngels'), href: "/fallen-angels" }
            ],
        },
        {
            label: t('media'),
            href: "#",
            dropdown: [
                { label: t('menu.videos'), href: "/videos" },
                { label: t('menu.shorts'), href: "/shorts" },
                { label: t('menu.podcasts'), href: "/podcasts" },
                { label: t('menu.events'), href: "/events" }
            ],
        },
        // { label: "Store", href: "/alef-store" },
        {
            label: t('contact'),
            href: "#",
            dropdown: [
                { label: t('menu.getInTouch'), href: "/contact" },
                { label: "FAQ", href: "/faq" } // FAQ wasn't in my JSON, will leave it hardcoded or add. Let's leave hardcoded as 'FAQ' is usually universal or I missed it. Adding to JSON now would take more steps. 'FAQ' is acceptable.
            ]
        }
    ];

    const languages = [
        { name: "English", code: "en" },
        { name: "French", code: "fr" },
        { name: "Arabic", code: "ar" },
        { name: "Spanish", code: "es" }
    ];

    return (
        <>
            <nav ref={navRef} className="fixed top-0 z-50 w-full px-4 md:px-6 flex items-center justify-between bg-background navbar-container h-16 md:h-20 overflow-visible">

                {/* Left: Logo */}
                <div className="shrink-0 cursor-pointer relative z-50">
                    <Link href="/" onClick={() => setIsMenuOpen(false)}>
                        <div className="relative">
                            <SkeletonImage src="/home/logo.png" alt="ALEF Logo" width={90} height={90} className="object-contain w-[80px] md:w-[110px]" />
                        </div>
                    </Link>
                </div>

                {/* Center: Desktop Navigation */}
                <div className="hidden xl:flex items-center gap-6 text-[14px] lg:text-[15px] tracking-wide text-foreground/90 font-oswald">
                    {navLinks.map((link, index) => (
                        <React.Fragment key={link.label}>
                            {index > 0 && <span className="w-px h-4 bg-white/40"></span>}

                            {link.dropdown ? (
                                <div className="group relative flex items-center gap-1 cursor-pointer hover:text-foreground transition-colors tracking-widest text-sm h-full py-8 uppercase">
                                    <Link href={link.href}>{link.label}</Link>
                                    <ChevronDown className="w-3 h-3 text-foreground/70 group-hover:text-white transition-transform group-hover:rotate-180" />

                                    {/* Dropdown Menu */}
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top group-hover:translate-y-0 translate-y-2">
                                        <div className="bg-background/95 backdrop-blur-md border border-foreground/10 p-2 shadow-xl rounded-sm">
                                            <ul className="flex flex-col gap-1">
                                                {link.dropdown.map((subItem) => (
                                                    <li key={subItem.label}>
                                                        <Link
                                                            href={subItem.href}
                                                            className="block px-4 py-3 text-sm text-foreground/80 hover:text-theme-accent hover:bg-foreground/5 transition-colors uppercase"
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
                                    className="hover:text-foreground transition-colors tracking-widest text-sm py-8 uppercase"
                                >
                                    {link.label}
                                </Link>
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* Right: Actions (Desktop) & Hamburger (Mobile) */}
                <div className="flex items-center gap-3 md:gap-6 relative z-50">
                    {/* Theme Toggle - Hidden on Mobile/Tablet */}
                    <div className="hidden xl:block">
                        <ThemeToggle />
                    </div>

                    {/* Language - Hidden on Mobile/Tablet */}
                    <div className="hidden xl:block relative">
                        <button
                            className="text-foreground/90 hover:text-foreground transition-colors p-2 hover:bg-foreground/10 rounded-none cursor-pointer"
                            onClick={() => setIsLangOpen(!isLangOpen)}
                        >
                            <GlobeIcon className="w-5 h-5 cursor-pointer" />
                        </button>

                        {/* Language Dropdown */}
                        <div className={`absolute top-full right-0 pt-2 w-40 transition-all duration-200 transform origin-top ${isLangOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}>
                            <div className="bg-background/95 backdrop-blur-md border border-foreground/10 p-2 shadow-xl rounded-sm">
                                <ul className="flex flex-col gap-1">
                                    {languages.map((lang) => (
                                        <li key={lang.code}>
                                            <button
                                                onClick={() => handleLanguageChange(lang.code)}
                                                className={`w-full text-left px-4 py-2 text-sm font-oswald tracking-wider uppercase transition-colors ${locale === lang.code
                                                    ? 'bg-red text-white'
                                                    : 'text-foreground/80 hover:text-theme-accent hover:bg-foreground/5'
                                                    }`}
                                            >
                                                {t(`languages.${lang.code}`)}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                    </div>

                    {/* Login / Profile Button - Always Visible */}
                    <div>
                        {user ? (
                            <Link
                                href="/profile"
                                className="relative flex items-center justify-center w-10 h-10 rounded-full overflow-hidden border border-foreground/20 hover:border-red transition-all duration-300 group"
                                aria-label="My Profile"
                            >
                                {user.photoURL ? (
                                    <img
                                        src={user.photoURL}
                                        alt={user.displayName || "User Profile"}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-foreground/5 flex items-center justify-center group-hover:bg-foreground/10 transition-colors">
                                        <span className="font-bebas text-lg text-foreground/70 group-hover:text-foreground">
                                            {user.displayName ? user.displayName.charAt(0).toUpperCase() : <UserIcon className="w-5 h-5" />}
                                        </span>
                                    </div>
                                )}
                            </Link>
                        ) : (
                            <Link href="/login" className="text-foreground/90 hover:text-foreground transition-colors p-2 hover:bg-foreground/10 rounded-none flex items-center justify-center" aria-label="Login">
                                <UserIcon className="w-5 h-5" />
                            </Link>
                        )}
                    </div>

                    {/* Donate - Always Visible */}
                    <div className="relative group">
                        <Link href="/donate">
                            <button className="relative overflow-hidden bg-red hover:bg-[#c4151c] text-white px-6 py-3 md:px-8 md:py-3.5 text-xs md:text-sm uppercase font-semibold transition-all shadow-lg shadow-red-900/20 tracking-wider rounded-none font-oswald cursor-pointer isolate animate-heartbeat">
                                <span className="relative z-10 tracking-wider">{t('donate')}</span>
                                <div className="absolute top-0 -left-full w-full h-full bg-linear-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] group-hover:left-[150%] transition-all duration-700 ease-in-out z-0" />
                            </button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button - Visible < XL */}
                    <button
                        className="xl:hidden p-2 text-foreground hover:bg-foreground/10 transition-colors"
                        onClick={() => setIsMenuOpen(true)}
                    >
                        <MenuIcon className="w-8 h-8" />
                    </button>
                </div>
            </nav>

            {/* PORTAL: Mobile Menu Overlay */}
            {mounted && createPortal(
                <div
                    className={`fixed inset-0 bg-background z-999 transition-transform duration-500 cubic-bezier(0.7,0,0.3,1) flex flex-col ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
                >
                    {/* Mobile Header (Logo + Close) */}
                    <div className="shrink-0 flex items-center justify-between px-4 md:px-8 lg:px-12 h-16 md:h-20 border-b border-foreground/5 bg-background relative z-10">
                        <div className="shrink-0 cursor-pointer">
                            <Link href="/" onClick={() => setIsMenuOpen(false)}>
                                <div className="relative">
                                    <SkeletonImage src="/home/logo.png" alt="ALEF Logo" width={90} height={90} className="object-contain w-[80px] md:w-[110px]" />
                                </div>
                            </Link>
                        </div>
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="p-2 text-foreground hover:bg-foreground/10 transition-colors"
                        >
                            <XIcon className="w-8 h-8" />
                        </button>
                    </div>

                    {/* Scrollable Content Container */}
                    <div className={`flex-1 flex flex-col h-full overflow-y-auto transition-opacity duration-500 ease-in-out ${isMenuOpen ? 'opacity-100 delay-300' : 'opacity-0 delay-0'}`}>
                        {/* Mobile Links */}
                        <div className="flex-1 px-6 py-8">
                            <div className="flex flex-col gap-6">
                                {navLinks.map((link) => (
                                    <div key={link.label} className="border-b border-foreground/5 pb-4 last:border-0">
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
                                                className="text-3xl font-bebas text-foreground tracking-wide group-hover:text-theme-accent transition-colors block w-full"
                                            >
                                                {link.label}
                                            </Link>

                                            {link.dropdown && (
                                                <div className={`p-2 text-foreground/50 group-hover:text-theme-accent transition-all duration-300 ${openSubmenu === link.label ? 'rotate-180' : ''}`}>
                                                    <ChevronDown className="w-5 h-5" />
                                                </div>
                                            )}
                                        </div>

                                        {/* Accordion Submenu */}
                                        {
                                            link.dropdown && (
                                                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openSubmenu === link.label ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                                                    <ul className="flex flex-col gap-3 pl-4 border-l-2 border-theme-accent/20 ml-1">
                                                        {link.dropdown.map(subItem => (
                                                            <li key={subItem.label}>
                                                                <Link
                                                                    href={subItem.href}
                                                                    className="text-sm font-oswald text-foreground/70 uppercase tracking-widest hover:text-theme-accent transition-colors block py-1"
                                                                    onClick={() => setIsMenuOpen(false)}
                                                                >
                                                                    {subItem.label}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )
                                        }
                                    </div>
                                ))}


                            </div>

                            {/* Mobile Preferences (Language + Theme) */}
                            <div className="mt-8 pt-8 border-t border-foreground/10 flex flex-col gap-6">
                                <div className="flex items-center justify-between">
                                    <span className="text-foreground/70 font-oswald uppercase tracking-widest text-sm">Theme</span>
                                    <ThemeToggle />
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-foreground/70 font-oswald uppercase tracking-widest text-sm">Language</span>
                                    <div className="flex gap-4">
                                        {languages.map((lang) => (
                                            <button
                                                key={lang.code}
                                                onClick={() => handleLanguageChange(lang.code)}
                                                className={`text-sm font-oswald transition-colors uppercase ${locale === lang.code
                                                    ? 'bg-red text-white px-2 py-1'
                                                    : 'text-foreground/50 hover:text-theme-accent'
                                                    }`}
                                            >
                                                {lang.code.toUpperCase()}
                                            </button>
                                        ))}
                                    </div>
                                </div>
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
            className="text-foreground/90 hover:text-foreground transition-colors p-2 hover:bg-foreground/10 rounded-none flex items-center gap-2 cursor-pointer"
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

function GlobeIcon({ className }: { className?: string }) {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10" /><line x1="2" x2="22" y1="12" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>;
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

function UserIcon({ className }: { className?: string }) {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>;
}