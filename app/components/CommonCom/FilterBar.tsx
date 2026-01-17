"use client";

import { Search } from "lucide-react";

interface FilterBarProps {
    tabs: string[];
    activeTab: string;
    onTabChange: (tab: string) => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    searchPlaceholder?: string;
}

export default function FilterBar({
    tabs,
    activeTab,
    onTabChange,
    searchQuery,
    onSearchChange,
    searchPlaceholder = "SEARCH..."
}: FilterBarProps) {
    return (
        <div className="flex flex-wrap items-center justify-center md:justify-between gap-6 py-6 border-y border-foreground/60 mb-12">

            {/* Tabs / Filters */}
            <div className="flex items-center gap-8 overflow-x-auto no-scrollbar pb-2 md:pb-0">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => onTabChange(tab)}
                        className={`font-oswald text-sm uppercase tracking-widest transition-all relative shrink-0 ${activeTab === tab ? "text-red" : "text-foreground/70 hover:text-foreground"
                            }`}
                    >
                        {tab}
                        {activeTab === tab && (
                            <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-red"></span>
                        )}
                    </button>
                ))}
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/60" />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder={searchPlaceholder}
                    className="bg-foreground/15 border border-foreground/30 rounded-full py-2.5 pl-12 pr-6 font-oswald text-xs tracking-widest focus:outline-none focus:border-red/50 transition-colors w-full md:w-96 uppercase"
                />
            </div>
        </div>
    );
}
