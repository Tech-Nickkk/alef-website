"use client";

import AnimatedTitle from "../components/CommonCom/AnimatedTitle";
import { Play, Search, Filter } from "lucide-react";
import { useState, useMemo } from "react";

// Podcast data - ordered from most recent to oldest
const podcasts = [
    {
        id: 1,
        title: "November 2025",
        subtitle: "Global Economic Shifts & Policy",
        videoId: "mviiuh24DYQ",
        date: "NOV 2025",
        featured: true,
        description: "An in-depth look at the emerging economic corridors and the shifting dynamics of global trade power."
    },
    {
        id: 2,
        title: "October 2025",
        subtitle: "Crisis Management Strategies",
        videoId: "3MsiXOxsyMQ",
        date: "OCT 2025",
        featured: false,
    },
    {
        id: 3,
        title: "July 2025",
        subtitle: "The Future of Governance",
        videoId: "6M2BkWoBg68",
        date: "JUL 2025",
        featured: false,
    },
];

export default function PodcastsPage() {
    const [filter, setFilter] = useState("All"); // Year filter
    const [searchQuery, setSearchQuery] = useState("");
    const [topicFilter, setTopicFilter] = useState("All Topics");
    const [isTopicFilterOpen, setIsTopicFilterOpen] = useState(false);

    // Extract unique years for horizontal tabs
    const years = useMemo(() => {
        const uniqueYears = Array.from(new Set(podcasts.map(p => {
            const parts = p.date.split(" ");
            return parts.length > 1 ? parts[1] : "N/A";
        }))).filter(y => y !== "N/A").sort((a, b) => b.localeCompare(a));
        return ["All", ...uniqueYears];
    }, []);

    // Extract unique subtitles (topics) for dropdown
    const topics = useMemo(() => {
        const uniqueTopics = Array.from(new Set(podcasts.map(p => p.subtitle)));
        return ["All Topics", ...uniqueTopics];
    }, []);

    const filteredPodcasts = useMemo(() => {
        return podcasts.filter(p => {
            const parts = p.date.split(" ");
            const pYear = parts.length > 1 ? parts[1] : "N/A";

            const matchesYear = filter === "All" || pYear === filter;
            const matchesTopic = topicFilter === "All Topics" || p.subtitle === topicFilter;
            const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));

            return matchesYear && matchesTopic && matchesSearch;
        });
    }, [filter, topicFilter, searchQuery]);

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

    return (
        <div className="bg-background min-h-screen flex flex-col relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-[50vh] bg-linear-to-b from-blue/10 to-transparent pointer-events-none" />

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
                        <div className="relative hidden md:block">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="SEARCH ARCHIVE..."
                                className="bg-foreground/5 border border-white/10 rounded-full py-2.5 pl-12 pr-6 font-oswald text-xs tracking-widest focus:outline-none focus:border-red/50 transition-colors w-64 uppercase"
                            />
                        </div>
                        <div className="relative">
                            <button
                                onClick={() => setIsTopicFilterOpen(!isTopicFilterOpen)}
                                className={`flex items-center gap-2 border rounded-full px-5 py-2.5 font-oswald text-xs tracking-widest transition-all uppercase ${isTopicFilterOpen || topicFilter !== "All Topics"
                                    ? "bg-red border-red text-white"
                                    : "bg-foreground/5 border-white/10 hover:bg-foreground/10"
                                    }`}
                            >
                                <Filter className="w-4 h-4" />
                                {topicFilter === "All Topics" ? "TOPIC FILTER" : "TOPIC SELECTED"}
                            </button>

                            {isTopicFilterOpen && (
                                <div className="absolute top-full right-0 mt-2 w-64 bg-background border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50 py-2">
                                    {topics.map((topic) => (
                                        <button
                                            key={topic}
                                            onClick={() => {
                                                setTopicFilter(topic);
                                                setIsTopicFilterOpen(false);
                                            }}
                                            className={`w-full text-left px-5 py-2.5 font-oswald text-[9px] tracking-widest uppercase transition-colors hover:bg-foreground/5 truncate ${topicFilter === topic ? "text-red" : "text-foreground/60"
                                                }`}
                                        >
                                            {topic}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Podcast Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32 min-h-[50vh]">
                    {filteredPodcasts.length > 0 ? (
                        filteredPodcasts.map((podcast) => (
                            <div
                                key={podcast.id}
                                className="bg-blue border border-white/10 rounded-lg overflow-hidden"
                            >
                                {/* Video Container */}
                                <div className="relative w-full aspect-video bg-black/50 overflow-hidden">
                                    <iframe
                                        src={`https://www.youtube.com/embed/${podcast.videoId}`}
                                        title={podcast.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                        className="absolute inset-0 w-full h-full opacity-80 hover:opacity-100 transition-opacity duration-300"
                                    />
                                    {/* Bottom border gradient */}
                                    <div className="absolute inset-x-0 bottom-0 h-[2px] bg-linear-to-r from-transparent via-red to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </div>

                                {/* Content */}
                                <div className="p-8 relative">
                                    {/* Background Watermark Icon */}
                                    <div className="absolute top-4 right-4 text-red/5 transform rotate-12 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-0">
                                        <Play className="w-24 h-24" />
                                    </div>

                                    <div className="relative z-10">
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="inline-block px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-red font-oswald tracking-widest uppercase mb-2">
                                                {podcast.date}
                                            </span>
                                            {podcast.featured && (
                                                <span className="flex items-center gap-1 text-[10px] text-red/80 font-oswald tracking-widest uppercase animate-pulse">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-red"></span>
                                                    Latest
                                                </span>
                                            )}
                                        </div>

                                        <h3 className="text-3xl font-bebas text-white mb-2 leading-none group-hover:text-red transition-colors duration-300">
                                            {highlightText(podcast.title, searchQuery)}
                                        </h3>

                                        <h4 className="text-sm font-oswald text-white/50 uppercase tracking-widest mb-6 border-l-2 border-red/30 pl-3">
                                            {highlightText(podcast.subtitle, searchQuery)}
                                        </h4>

                                        <div className="flex items-center gap-2 group/link cursor-pointer">
                                            <div className="w-8 h-8 rounded-full bg-red/10 flex items-center justify-center group-hover/link:bg-red transition-colors duration-300">
                                                <Play className="w-3 h-3 text-red fill-current group-hover/link:text-white transition-colors" />
                                            </div>
                                            <span className="text-xs font-oswald text-white/60 tracking-wider group-hover/link:text-white transition-colors">
                                                WATCH EPISODE
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20 bg-blue/50 rounded-lg border border-white/5">
                            <div className="flex flex-col items-center gap-4">
                                <span className="text-4xl">🔍</span>
                                <p className="text-foreground/60 text-xl font-oswald tracking-widest uppercase">
                                    No podcasts found matching your criteria.
                                </p>
                                <button
                                    onClick={() => {
                                        setFilter("All");
                                        setSearchQuery("");
                                        setTopicFilter("All Topics");
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
