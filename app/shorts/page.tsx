"use client";

import AnimatedTitle from "@/app/components/CommonCom/AnimatedTitle";
import { useEffect, useState, useMemo } from "react";
import { client } from "@/sanity/lib/client";
import { Search } from "lucide-react";

interface Short {
    _id: string;
    title: string;
    videoUrl: string;
    platform: string;
    publishedAt: string;
}

export default function ShortsPage() {
    const [shorts, setShorts] = useState<Short[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchShorts = async () => {
            try {
                const query = `*[_type == "short"] | order(publishedAt desc) {
                    _id,
                    title,
                    videoUrl,
                    platform,
                    publishedAt
                }`;
                const data = await client.fetch(query);
                setShorts(data);
            } catch (error) {
                console.error("Error fetching shorts:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchShorts();
    }, []);

    const getEmbedUrl = (short: Short) => {
        if (short.platform === 'facebook' || (short.videoUrl && short.videoUrl.includes('facebook.com'))) {
            if (short.videoUrl.includes('plugins/video.php')) return short.videoUrl;

            const encodedHref = encodeURIComponent(short.videoUrl);
            return `https://www.facebook.com/plugins/video.php?href=${encodedHref}&show_text=false&width=450&height=800&appId`;
        }
        if (short.videoUrl.includes('youtube.com/shorts/')) {
            const id = short.videoUrl.split('shorts/')[1];
            return `https://www.youtube.com/embed/${id}`;
        }
        return short.videoUrl;
    };

    // Extract unique years for filter
    const years = useMemo(() => {
        const uniqueYears = Array.from(new Set(shorts.map(s => {
            return new Date(s.publishedAt).getFullYear().toString();
        }))).sort((a, b) => b.localeCompare(a));
        return ["All", ...uniqueYears];
    }, [shorts]);

    const filteredShorts = useMemo(() => {
        return shorts.filter(s => {
            const sYear = new Date(s.publishedAt).getFullYear().toString();
            const matchesYear = filter === "All" || sYear === filter;
            const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase());

            return matchesYear && matchesSearch;
        });
    }, [filter, searchQuery, shorts]);

    const highlightText = (text: string, query: string) => {
        if (!query) return text;
        const parts = text.split(new RegExp(`(${query})`, "gi"));
        return parts.map((part, index) =>
            part.toLowerCase() === query.toLowerCase() ? (
                <span key={index} className="bg-red/30 text-white rounded px-0.5">
                    {part}
                </span>
            ) : (
                part
            )
        );
    };

    if (loading) {
        return <div className="min-h-screen w-full bg-background flex items-center justify-center text-foreground font-oswald text-xl uppercase tracking-widest">Loading Shorts...</div>;
    }

    return (
        <main className="min-h-screen w-full bg-background pt-32 pb-20 px-4 md:px-8 relative overflow-hidden">

            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-blue/10 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto flex flex-col items-center relative z-10">

                {/* Header Section */}
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center gap-2 text-foreground/60 font-oswald text-xs tracking-[0.3em] mb-4">
                        <span className="w-1.5 h-1.5 bg-red rounded-full"></span>
                        MEDIA ARCHIVE
                    </div>

                    <AnimatedTitle
                        text="SHORTS"
                        className="text-5xl md:text-7xl lg:text-8xl font-bold font-bebas text-foreground leading-none mb-2"
                    />
                </div>

                {/* Filters Row */}
                <div className="w-full flex flex-wrap items-center justify-between gap-6 py-6 border-y border-foreground/20 mb-12">
                    <div className="flex items-center gap-8 overflow-x-auto no-scrollbar pb-2 md:pb-0">
                        {years.map((item) => (
                            <button
                                key={item}
                                onClick={() => setFilter(item)}
                                className={`font-oswald text-sm uppercase tracking-widest transition-all relative ${filter === item ? "text-red" : "text-foreground/40 hover:text-foreground"
                                    }`}
                            >
                                {item}
                                {filter === item && (
                                    <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-red"></span>
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="SEARCH ARCHIVE..."
                                className="bg-foreground/5 border border-white/10 rounded-full py-2.5 pl-12 pr-6 font-oswald text-xs tracking-widest focus:outline-none focus:border-red/50 transition-colors w-64 uppercase"
                            />
                        </div>
                    </div>
                </div>

                {/* Video Grid - Adjusted max-w to 300px */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full justify-items-center">
                    {filteredShorts.length > 0 ? (
                        filteredShorts.map((short) => (
                            <div key={short._id} className="w-full max-w-[300px] bg-blue border border-white/10 rounded-lg overflow-hidden relative group h-fit flex flex-col transition-all duration-300 hover:border-white/30 hover:shadow-xl">

                                {/* Video Container */}
                                <div className="relative w-full aspect-[9/16] bg-black/50 overflow-hidden opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                                    <iframe
                                        src={getEmbedUrl(short)}
                                        style={{ border: "none", overflow: "hidden", width: "100%", height: "100%" }}
                                        scrolling="no"
                                        frameBorder="0"
                                        allowFullScreen={true}
                                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                                        className="w-full h-full"
                                    ></iframe>
                                </div>

                                {/* Caption/Content to match Podcast style */}
                                <div className="p-4 relative grow flex flex-col">
                                    <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
                                        <span className="text-[10px] text-red font-oswald tracking-widest uppercase">
                                            {new Date(short.publishedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </span>
                                        <span className="font-oswald text-[9px] tracking-widest uppercase text-white/40 flex items-center gap-1">
                                            {short.platform}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bebas text-white mb-2 leading-tight transition-colors duration-300">
                                        {highlightText(short.title, searchQuery)}
                                    </h3>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20 w-full bg-blue/50 rounded-lg border border-white/5">
                            <div className="flex flex-col items-center gap-4">
                                <span className="text-4xl">🔍</span>
                                <p className="text-foreground/60 text-xl font-oswald tracking-widest uppercase">
                                    No shorts found {searchQuery && `matching "${searchQuery}"`}.
                                </p>
                                <button
                                    onClick={() => {
                                        setFilter("All");
                                        setSearchQuery("");
                                    }}
                                    className="text-red font-oswald text-sm underline underline-offset-4 hover:text-white transition-colors"
                                >
                                    CLEAR FILTERS
                                </button>
                            </div>
                        </div>
                    )}
                </div>

            </div>

            {/* Simple Noise Overlay */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03]"
                style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
            </div>
        </main>
    );
}
