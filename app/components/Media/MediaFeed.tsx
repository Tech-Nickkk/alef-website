"use client";

import { useState, useMemo } from "react";
import FilterBar from "../CommonCom/FilterBar";
import VideoCard from "./VideoCard";
import { useTranslations } from "next-intl";

interface MediaFeedProps {
    items: any[];
    type: "video" | "short" | "podcast";
}

export default function MediaFeed({ items, type }: MediaFeedProps) {
    const t = useTranslations("MediaFeed");
    const [filter, setFilter] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const years = useMemo(() => {
        const uniqueYears = Array.from(new Set(items.map(item =>
            new Date(item.publishedAt).getFullYear().toString()
        ))).sort((a, b) => b.localeCompare(a));

        // We need to translate "All" if it's displayed, but keep it as "All" for logic or map it
        // Ideally, we keep the value "All" but display the translated string.
        // The FilterBar likely displays the string directly. 
        // For simplicity, we can let FilterBar handle "All" display if passed, or we pass translated strings.
        // Let's pass "All" as key, but FilterBar logic might need adjustment if it doesn't support label vs value.
        // Assuming FilterBar displays the tab string directly:

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
                        <span key={index} className="bg-red/70 text-white rounded px-0.5">
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
            <FilterBar
                tabs={years.map(y => y === "All" ? t("all") : y)} // Translate "All" for display
                activeTab={filter === "All" ? t("all") : filter} // Match translated active tab
                onTabChange={(tab) => setFilter(tab === t("all") ? "All" : tab)} // Map back to "All" for logic
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                searchPlaceholder={t("searchPlaceholder")}
            />

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
                                {t("noResults", { type: type, query: searchQuery })}
                            </p>
                            <button
                                onClick={() => { setFilter("All"); setSearchQuery(""); }}
                                className="text-red font-oswald text-sm underline underline-offset-4 hover:text-white transition-colors"
                            >
                                {t("clearFilters")}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}