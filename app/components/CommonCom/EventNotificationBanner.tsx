"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Ticket, X, Clock } from "lucide-react";
import { useState, useEffect } from "react";

export default function EventNotificationBanner() {
    const t = useTranslations("EventsPage");
    const [isVisible, setIsVisible] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        // Show after a small delay
        const timer = setTimeout(() => setIsVisible(true), 1500);

        // Check if user minimized it previously in this session
        const hasMinimized = sessionStorage.getItem("eventBannerMinimized");
        if (hasMinimized) {
            setIsMinimized(true);
        }

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        // Target date: April 14, 2026 - 18:00 (6:00 PM Reception)
        const targetDate = new Date("2026-04-14T18:00:00").getTime();

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                clearInterval(interval);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000)
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const minimizeBanner = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsMinimized(true);
        sessionStorage.setItem("eventBannerMinimized", "true");
    };

    const expandBanner = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsMinimized(false);
        sessionStorage.removeItem("eventBannerMinimized");
    };

    if (!isVisible) return null;

    if (isMinimized) {
        return (
            <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-[100] animate-in zoom-in duration-300 cursor-pointer">
                <button
                    onClick={expandBanner}
                    className="w-14 h-14 rounded-full bg-red border-2 border-red shadow-[0_0_20px_rgba(196,21,28,0.4)] flex items-center justify-center text-white transition-colors duration-300 group cursor-pointer"
                    aria-label="Expand event notification"
                >
                    <Ticket className="w-6 h-6 text-white relative z-10" />

                    {/* Ping animation purely for attention */}
                    <span className="absolute inline-flex h-full w-full rounded-full bg-red opacity-30 animate-ping"></span>
                </button>
            </div>
        );
    }

    return (
        <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-[100] animate-in slide-in-from-bottom-5 duration-500 ease-out max-w-[340px] w-[calc(100%-2rem)]">
            <Link
                href="/events"
                className="block bg-blue/98 backdrop-blur-xl border-l-4 border-red shadow-2xl rounded-r-md group relative overflow-hidden transition-colors cursor-pointer"
            >
                <div className="p-4 sm:p-5 pr-12">
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 flex items-center justify-center bg-red text-white p-2.5 rounded-sm mt-0.5 shadow-[0_0_10px_rgba(196,21,28,0.5)]">
                            <Ticket className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="w-1.5 h-1.5 bg-red rounded-full animate-pulse"></span>
                                <span className="font-oswald text-red tracking-[0.2em] text-[10px] m-0 font-bold uppercase leading-none">
                                    {t("header.tagline")}
                                </span>
                            </div>
                            <h3 className="font-bebas text-white text-xl leading-none">
                                {t("hero.titlePart1")} {t("hero.titlePart2")}
                            </h3>
                            <p className="font-oswald text-white/60 text-xs mt-2 truncate flex items-center gap-1.5">
                                <Clock className="w-3 h-3" />
                                {t("hero.date")}
                            </p>

                            {/* Countdown Timer */}
                            <div className="flex gap-2 mt-4 mb-1">
                                <div className="flex flex-col items-center bg-white/5 px-2 py-1.5 rounded w-12 border border-white/5">
                                    <span className="text-white font-bebas text-lg leading-none">{String(timeLeft.days).padStart(2, '0')}</span>
                                    <span className="text-white/40 text-[8px] uppercase font-oswald tracking-widest leading-none mt-1">Days</span>
                                </div>
                                <div className="flex flex-col items-center bg-white/5 px-2 py-1.5 rounded w-12 border border-white/5">
                                    <span className="text-white font-bebas text-lg leading-none">{String(timeLeft.hours).padStart(2, '0')}</span>
                                    <span className="text-white/40 text-[8px] uppercase font-oswald tracking-widest leading-none mt-1">Hrs</span>
                                </div>
                                <div className="flex flex-col items-center bg-white/5 px-2 py-1.5 rounded w-12 border border-white/5">
                                    <span className="text-white font-bebas text-lg leading-none">{String(timeLeft.minutes).padStart(2, '0')}</span>
                                    <span className="text-white/40 text-[8px] uppercase font-oswald tracking-widest leading-none mt-1">Min</span>
                                </div>
                                <div className="flex flex-col items-center bg-white/5 px-2 py-1.5 rounded w-12 border border-white/5">
                                    <span className="text-white font-bebas text-lg leading-none">{String(timeLeft.seconds).padStart(2, '0')}</span>
                                    <span className="text-white/40 text-[8px] uppercase font-oswald tracking-widest leading-none mt-1">Sec</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Minimize Button */}
                    <button
                        onClick={minimizeBanner}
                        className="absolute right-2 top-2 p-2 text-white/40 hover:text-white transition-colors rounded hover:bg-white/10 z-10"
                        aria-label="Minimize notification"
                    >
                        <X className="w-4 h-4" />
                    </button>

                    {/* Constant Flickering Overlay */}
                    <div className="absolute inset-0 pointer-events-none bg-red/5 animate-pulse" />
                </div>
            </Link>
        </div>
    );
}
