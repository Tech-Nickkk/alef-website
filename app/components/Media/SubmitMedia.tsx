"use client";

import { Video, Mic, Smartphone, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import GlowingGrid from "@/app/components/CommonCom/GlowingGrid";

interface SubmitMediaProps {
    type: "video" | "short" | "podcast";
}

export default function SubmitMedia({ type }: SubmitMediaProps) {
    const tVideos = useTranslations('VideosPage');
    const tShorts = useTranslations('ShortsPage');
    const tPodcasts = useTranslations('PodcastsPage');

    let title = "";
    let desc = "";
    let linkHref = "";
    let Icon = Video;
    
    switch (type) {
        case 'video':
            title = tVideos('submitTitle');
            desc = tVideos('submitDesc');
            linkHref = "/submit-video";
            Icon = Video;
            break;
        case 'short':
            title = tShorts('submitTitle');
            desc = tShorts('submitDesc');
            linkHref = "/submit-short";
            Icon = Smartphone;
            break;
        case 'podcast':
            title = tPodcasts('submitTitle');
            desc = tPodcasts('submitDesc');
            linkHref = "/submit-podcast";
            Icon = Mic;
            break;
    }

    return (
        <div className="relative z-20 mt-20 mb-12">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-blue shadow-2xl shadow-blue/20 transition-colors duration-500 hover:border-white/30">
                {/* GlowingGrid Component */}
                <GlowingGrid />

                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-px bg-white/10" />

                <div className="relative z-30 px-8 md:px-16 py-16 md:py-20">
                    <div className="max-w-4xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            {/* Left side - Content */}
                            <div className="text-left space-y-6">
                                {/* Badge */}
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red/20 border border-red/30 backdrop-blur-sm">
                                    <span className="font-oswald text-xs text-red uppercase tracking-widest font-semibold">
                                        Contribute
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="text-4xl md:text-5xl lg:text-6xl font-bebas text-white tracking-wide leading-none">
                                    {title}
                                </h3>

                                {/* Description */}
                                <p className="font-oswald text-lg md:text-xl text-white/60 leading-relaxed max-w-md">
                                    {desc}
                                </p>

                                {/* CTA Button */}
                                <div className="pt-4">
                                    <Link href={linkHref} className="group">
                                        <div className="inline-flex items-center gap-3 px-8 py-4 bg-red hover:bg-red/90 text-white font-oswald font-bold tracking-widest uppercase rounded-xl transition-all duration-300 shadow-lg shadow-red/30 cursor-pointer">
                                            <span>Get Involved</span>
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </Link>
                                </div>

                                {/* Stats */}
                                <div className="flex items-center gap-8 pt-4">
                                    <div>
                                        <div className="text-2xl font-bebas text-white">Fast Review</div>
                                        <div className="text-xs font-oswald text-white/50 uppercase tracking-wider">Within 48 Hours</div>
                                    </div>
                                    <div className="w-px h-12 bg-white/10" />
                                    <div>
                                        <div className="text-2xl font-bebas text-white">Wide Reach</div>
                                        <div className="text-xs font-oswald text-white/50 uppercase tracking-wider">Global Audience</div>
                                    </div>
                                </div>
                            </div>

                            {/* Right side - Visual Element */}
                            <div className="relative hidden md:flex items-center justify-center">
                                {/* Central icon */}
                                {Icon && <Icon className="w-50 h-50 text-white/80" strokeWidth={1.5} />}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
            </div>
        </div>
    );
}
