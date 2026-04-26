"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import AnimatedTitle from "@/app/components/CommonCom/AnimatedTitle";
import { PenTool, Video, Smartphone, Mic, ArrowRight } from "lucide-react";
import GlowingGrid from "@/app/components/CommonCom/GlowingGrid";

export default function GetInvolvedPage() {
    const tNavbar = useTranslations('Navbar.menu');

    const involvementOptions = [
        {
            id: "article",
            title: "Submit Article",
            desc: "Share your well-researched articles, essays, and opinion pieces with our global audience.",
            href: "/submit-article",
            icon: PenTool
        },
        {
            id: "video",
            title: "Submit Video",
            desc: "Contribute high-quality videos, analysis, or documentaries to feature on our platform.",
            href: "/submit-video",
            icon: Video
        },
        {
            id: "short",
            title: "Submit Short",
            desc: "Share quick, engaging vertical short-form content designed for maximum impact.",
            href: "/submit-short",
            icon: Smartphone
        },
        {
            id: "podcast",
            title: "Submit Podcast",
            desc: "Submit your podcast episodes or audio discussions for our editorial review.",
            href: "/submit-podcast",
            icon: Mic
        }
    ];

    return (
        <div className="min-h-screen bg-background relative overflow-hidden pt-32 pb-24 px-4 md:px-8">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue/10 rounded-full blur-[150px]" />
            </div>

            <main className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-16 md:mb-24 space-y-6">
                    <div className="inline-flex items-center gap-2 bg-foreground/5 border border-foreground/10 px-4 py-2 rounded-full mb-2">
                        <span className="w-2 h-2 bg-red rounded-full animate-pulse" />
                        <span className="font-oswald text-xs text-foreground/60 uppercase tracking-widest">
                            Join Our Mission
                        </span>
                    </div>
                    <AnimatedTitle
                        text={tNavbar('getInvolved')}
                        className="text-5xl md:text-7xl lg:text-8xl font-bebas text-foreground leading-none tracking-wide"
                    />
                    <p className="font-oswald text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto leading-relaxed">
                        Choose how you want to contribute to our platform. Whether you are a writer, creator, or speaker, your voice matters here.
                    </p>
                </div>

                {/* Options Grid */}
                <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
                    {involvementOptions.map((option) => (
                        <div key={option.id} className="relative overflow-hidden rounded-3xl border border-white/10 bg-blue shadow-2xl shadow-blue/20 transition-colors duration-500 hover:border-white/30 p-8 md:p-12 h-full flex flex-col justify-between">
                            {/* GlowingGrid Component */}
                            <GlowingGrid />

                            {/* Top accent line */}
                            <div className="absolute top-0 left-0 right-0 h-px bg-white/10" />

                            <div className="relative z-30 flex-1">
                                <div className="flex items-center justify-between mb-8">
                                    {/* Badge */}
                                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red/20 border border-red/30 backdrop-blur-sm pointer-events-none">
                                        <span className="font-oswald text-xs text-red uppercase tracking-widest font-semibold">
                                            Contribute
                                        </span>
                                    </div>
                                    {/* Icon */}
                                    <option.icon className="w-10 h-10 text-white/80 pointer-events-none" strokeWidth={1.5} />
                                </div>

                                <h3 className="text-4xl md:text-5xl font-bebas text-white tracking-wide mb-4 pointer-events-none">
                                    {option.title}
                                </h3>
                                
                                <p className="font-oswald text-white/60 leading-relaxed text-lg mb-8 pointer-events-none">
                                    {option.desc}
                                </p>
                            </div>
                            
                            <div className="relative z-30 pt-4 mt-auto">
                                <Link href={option.href} className="group">
                                    <div className="inline-flex items-center gap-3 px-8 py-4 bg-red hover:bg-red/90 text-white font-oswald font-bold tracking-widest uppercase rounded-xl transition-all duration-300 shadow-lg shadow-red/30 cursor-pointer">
                                        <span>Get Involved</span>
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </Link>
                            </div>

                            {/* Bottom accent line */}
                            <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
