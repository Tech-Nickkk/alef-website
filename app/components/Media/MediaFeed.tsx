"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import VideoCard from "./VideoCard";

interface MediaFeedProps {
    items: any[];
    type: "video" | "short" | "podcast";
}

export default function MediaFeed({ items, type }: MediaFeedProps) {
    const [filter, setFilter] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const years = useMemo(() => {
        const uniqueYears = Array.from(new Set(items.map(item =>
            new Date(item.publishedAt).getFullYear().toString()
        ))).sort((a, b) => b.localeCompare(a));
        return ["All", ...uniqueYears];
    }, [items]);

    const filteredItems = useMemo(() => {
        return items.filter(item => {
            const itemYear = new Date(item.publishedAt).getFullYear().toString();
            const matchesYear = filter === "All" || itemYear === filter;
            const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesYear && matchesSearch;
        });
    }, [filter, searchQuery, items]);

    // Grid config based on type
    const gridCols = type === 'short'
        ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center"
        : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

    const highlightText = (text: string, query: string) => {
        if (!query) return text;

        const parts = text.split(new RegExp(`(${query})`, "gi"));
        return (
            <span>
                {parts.map((part, index) =>
                    part.toLowerCase() === query.toLowerCase() ? (
                        <span key={index} className="bg-red/30 text-white rounded px-0.5">
                            {part}
                        </span>
                    ) : (
                        part
                    )
                )}
            </span>
        );
    };

    return (
        <div>
            {/* Filters Row */}
            <div className="flex flex-wrap items-center justify-center md:justify-between gap-6 py-6 border-y border-foreground/60 mb-12">
                <div className="flex items-center gap-8 overflow-x-auto no-scrollbar pb-2 md:pb-0">
                    {years.map((year) => (
                        <button
                            key={year}
                            onClick={() => setFilter(year)}
                            className={`font-oswald text-sm uppercase tracking-widest relative transition-colors ${filter === year ? "text-red" : "text-foreground/70 hover:text-foreground"}`}
                        >
                            {year}
                            {filter === year && <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-red"></span>}
                        </button>
                    ))}
                </div>

                <div className="relative w-full md:w-auto">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/60" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={`SEARCH ARCHIVE...`}
                        className="bg-foreground/15 border border-foreground/30 rounded-full py-2.5 pl-12 pr-6 font-oswald text-xs tracking-widest focus:outline-none focus:border-red/50 w-full md:w-96 uppercase transition-colors"
                    />
                </div>
            </div>

            {/* Grid */}
            <div className={`grid gap-8 mb-32 ${gridCols}`}>
                {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                        <div key={item._id} className={type === 'short' ? 'w-full flex justify-center' : 'w-full'}>
                            <VideoCard
                                title={highlightText(item.title, searchQuery)}
                                videoUrl={item.videoUrl}
                                thumbnail={item.thumbnail || item.mainImage}
                                publishedAt={item.publishedAt}
                                platform={item.platform}
                                type={type}
                            />
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-20 bg-blue/50 rounded-lg border border-white/5">
                        <div className="flex flex-col items-center gap-4">
                            <span className="text-4xl">🔍</span>
                            <p className="text-foreground/60 text-xl font-oswald tracking-widest uppercase">
                                No {type}s found matching "{searchQuery}".
                            </p>
                            <button
                                onClick={() => { setFilter("All"); setSearchQuery(""); }}
                                className="text-red font-oswald text-sm underline underline-offset-4 hover:text-white transition-colors"
                            >
                                CLEAR FILTERS
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}