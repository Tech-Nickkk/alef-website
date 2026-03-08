"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function AlefInTheNewsPage() {
    const t = useTranslations("AlefInTheNewsPage");
    const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setGlowPos({
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100,
        });
    };

    return (
        <main
            className="min-h-screen bg-background overflow-hidden"
            onMouseMove={handleMouseMove}
        >
            {/* Animated background grid */}
            <div className="fixed inset-0 z-0 pointer-events-none" style={{
                backgroundImage: `
                    linear-gradient(rgba(196,21,28,0.04) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(196,21,28,0.04) 1px, transparent 1px)
                `,
                backgroundSize: "60px 60px",
            }} />

            {/* Dynamic mouse-follow glow */}
            <div
                className="fixed inset-0 z-0 transition-opacity duration-500 opacity-60 pointer-events-none"
                style={{
                    background: `radial-gradient(ellipse 600px 400px at ${glowPos.x}% ${glowPos.y}%, rgba(196,21,28,0.08) 0%, transparent 70%)`,
                }}
            />

            {/* Floating decorative orbs */}
            <div className="fixed top-1/4 left-1/6 w-64 h-64 bg-red/5 rounded-full blur-3xl animate-pulse pointer-events-none" />
            <div className="fixed bottom-1/3 right-1/6 w-80 h-80 bg-red/5 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: "1.5s" }} />

            {/* ─── HERO SECTION ─── */}
            <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-28 pb-16">

                {/* COMING SOON BADGE */}
                <div className="relative z-10 flex items-center gap-3 mb-8">
                    <span className="inline-flex items-center gap-2 border border-red/40 bg-red/8 px-4 py-2 rounded-full text-red font-oswald text-xs uppercase tracking-[0.25em]">
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red opacity-75" />
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red" />
                        </span>
                        {t("badge")}
                    </span>
                </div>

                {/* Main headline */}
                <div className="relative z-10 text-center max-w-5xl mx-auto mb-6">
                    <h1 className="font-bebas text-[clamp(4rem,12vw,10rem)] leading-none text-foreground mb-2 tracking-tight">
                        ALEF{" "}
                        <span className="text-red">{t("titleInThe")}</span>{" "}
                        {t("titleNews")}
                    </h1>
                    <div className="flex items-center justify-center gap-6 mt-4 mb-8">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-red/40" />
                        <span className="font-oswald text-foreground/40 text-xs uppercase tracking-[0.4em]">{t("subtitle")}</span>
                        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-red/40" />
                    </div>
                    <p className="font-oswald text-foreground/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed tracking-wide">
                        {t("description")}
                    </p>
                </div>

                {/* CTA Buttons */}
                <div className="relative z-10 flex flex-wrap gap-4 justify-center mt-8">
                    <Link
                        href="/blogs-and-articles"
                        className="group relative overflow-hidden bg-red text-white px-8 py-4 font-bebas text-lg tracking-widest uppercase transition-all shadow-lg shadow-red/20 hover:shadow-red/40 flex items-center gap-2"
                    >
                        <span className="relative z-10">{t("readArticles")}</span>
                        <svg className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    </Link>
                    <Link
                        href="/contact"
                        className="group border border-foreground/20 hover:border-red text-foreground/70 hover:text-foreground px-8 py-4 font-bebas text-lg tracking-widest uppercase transition-all flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {t("pressInquiries")}
                    </Link>
                </div>

            </section>
        </main>
    );
}
