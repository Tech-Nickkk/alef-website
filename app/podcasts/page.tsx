"use client";

import AnimatedTitle from "../components/CommonCom/AnimatedTitle";
import { Search } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { client } from "@/sanity/lib/client";

interface Podcast {
    _id: string;
    title: string;
    slug: { current: string };
    videoUrl: string;
    publishedAt: string;
}

export default function PodcastsPage() {
    const [podcasts, setPodcasts] = useState<Podcast[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchPodcasts = async () => {
            try {
                const query = `*[_type == "podcast"] | order(publishedAt desc) {
                    _id,
                    title,
                    slug,
                    videoUrl,
                    publishedAt
                }`;
                const data = await client.fetch(query);
                setPodcasts(data);
            } catch (error) {
                console.error("Error fetching podcasts:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPodcasts();
    }, []);

    // Helper to extract YouTube ID
    const getYoutubeId = (url: string) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const getEmbedUrl = (url: string) => {
        const ytId = getYoutubeId(url);
        if (ytId) return `https://www.youtube.com/embed/${ytId}`;
        return url; // Fallback or direct link handling could be added
    };


    // Extract unique years for filter
    const years = useMemo(() => {
        const uniqueYears = Array.from(new Set(podcasts.map(p => {
            return new Date(p.publishedAt).getFullYear().toString();
        }))).sort((a, b) => b.localeCompare(a));
        return ["All", ...uniqueYears];
    }, [podcasts]);


    const filteredPodcasts = useMemo(() => {
        return podcasts.filter(p => {
            const pYear = new Date(p.publishedAt).getFullYear().toString();
            const matchesYear = filter === "All" || pYear === filter;
            const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());

            return matchesYear && matchesSearch;
        });
    }, [filter, searchQuery, podcasts]);

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
        return <div className="min-h-screen bg-background flex items-center justify-center text-white font-oswald text-xl uppercase tracking-widest">Loading Podcasts...</div>;
    }

    return (
        <div className="bg-background min-h-screen flex flex-col relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-blue/10 to-transparent pointer-events-none" />

            <main className="grow pt-32 px-4 md:px-8 lg:px-12 max-w-[1400px] mx-auto w-full z-10 relative">

                {/* Header Section */}
                <div className="mb-20 text-center max-w-5xl mx-auto">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <span className="w-2 h-2 bg-red rounded-full animate-pulse"></span>
                        <span className="font-oswald text-xs tracking-[0.3em] text-red uppercase">
                            AUDIO ARCHIVE
                        </span>
                    </div>

                    <AnimatedTitle
                        text="THE ALEF PODCAST"
                        className="text-5xl md:text-8xl font-bebas text-foreground mb-8 justify-center flex leading-none"
                    />

                    <p className="font-oswald text-lg md:text-xl text-foreground/60 leading-relaxed max-w-3xl mx-auto border-l-2 border-red/30 pl-6 text-left md:text-center md:border-l-0 md:pl-0">
                        Critical conversations on geopolitics, economics, and the unseen forces shaping our world.
                    </p>
                </div>

                {/* Filters Row */}
                <div className="flex flex-wrap items-center justify-between gap-6 py-6 border-y border-foreground/20 mb-12">
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

                {/* Podcast Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32 min-h-[50vh]">
                    {filteredPodcasts.length > 0 ? (
                        filteredPodcasts.map((podcast) => (
                            <div
                                key={podcast._id}
                                className="bg-blue border border-white/10 rounded-lg overflow-hidden group flex flex-col h-full transition-all duration-300 hover:border-white/30 hover:shadow-xl"
                            >
                                {/* Video/Embed Area (Since no cover image) */}
                                <div className="relative w-full aspect-video bg-black/50 overflow-hidden opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                                    <iframe
                                        src={getEmbedUrl(podcast.videoUrl)}
                                        title={podcast.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                        className="absolute inset-0 w-full h-full"
                                    />
                                </div>

                                {/* Content */}
                                <div className="p-8 relative grow flex flex-col">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-[10px] text-red font-oswald tracking-widest uppercase">
                                            {new Date(podcast.publishedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </span>
                                    </div>

                                    <h3 className="text-2xl font-bebas text-white mb-4 leading-none transition-colors duration-300">
                                        {highlightText(podcast.title, searchQuery)}
                                    </h3>

                                    {/* Link to source if needed, or just let the embed play */}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20 bg-blue/50 rounded-lg border border-white/5">
                            <div className="flex flex-col items-center gap-4">
                                <span className="text-4xl">🔍</span>
                                <p className="text-foreground/60 text-xl font-oswald tracking-widest uppercase">
                                    No podcasts found {searchQuery && `matching "${searchQuery}"`}.
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
            </main>
        </div>
    );
}
