"use client";

import { useState, useMemo } from "react";
import AnimatedTitle from "@/app/components/CommonCom/AnimatedTitle";
import { Star, Search } from 'lucide-react';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';

interface Author {
    _id: string;
    name?: string;
    discloseName?: boolean;
    category?: 'officer' | 'director' | 'advisor' | 'blogAuthor';
    position?: string;
    description?: string;
    image?: any;
}

interface ExpertsCornerClientProps {
    activists: Author[];
}

export default function ExpertsCornerClient({ activists }: ExpertsCornerClientProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState<"All" | "Officers" | "Directors" | "Expert Advisors">("All");

    const filteredActivists = useMemo(() => {
        return activists.filter(a => {
            const matchesSearch = (a.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
                (a.position || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
                (a.description || "").toLowerCase().includes(searchQuery.toLowerCase());
            return matchesSearch;
        });
    }, [activists, searchQuery]);

    const officers = filteredActivists.filter(a => a.category === 'officer');
    const directors = filteredActivists.filter(a => a.category === 'director');
    const advisors = filteredActivists.filter(a => a.category === 'advisor');

    const showOfficers = (categoryFilter === "All" || categoryFilter === "Officers") && officers.length > 0;
    const showDirectors = (categoryFilter === "All" || categoryFilter === "Directors") && directors.length > 0;
    const showAdvisors = (categoryFilter === "All" || categoryFilter === "Expert Advisors") && advisors.length > 0;

    const highlightText = (text: string, query: string) => {
        if (!query || !text) return text;

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
        <main className="grow pt-32 px-4 md:px-8 lg:px-12 max-w-[1400px] mx-auto w-full z-10 relative">

            {/* Header matches BlogsPage style */}
            <div className="mb-20 text-center max-w-5xl mx-auto">
                <AnimatedTitle
                    text="EXPERTS CORNER"
                    className="text-5xl mb-4 md:text-7xl lg:text-8xl font-bold font-bebas text-foreground uppercase leading-none"
                />
                <p className="font-oswald text-xl md:text-2xl text-foreground/90 leading-relaxed max-w-4xl mx-auto">
                    Meet the dedicated leadership team and our network of expert advisors driving the mission of the American Lebanon Education Foundation.
                </p>
            </div>

            {/* Filters Row - Matches BlogsFeed layout */}
            <div className="flex flex-wrap items-center justify-center md:justify-between gap-6 py-6 border-y border-foreground/60 mb-12">

                {/* Category Tabs */}
                <div className="flex items-center gap-8 overflow-x-auto no-scrollbar pb-2 md:pb-0">
                    {["All", "Officers", "Directors", "Expert Advisors"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setCategoryFilter(tab as any)}
                            className={`font-oswald text-sm uppercase tracking-widest transition-all relative shrink-0 ${categoryFilter === tab ? "text-red" : "text-foreground/70 hover:text-foreground"
                                }`}
                        >
                            {tab}
                            {categoryFilter === tab && (
                                <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-red"></span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Search Bar - Matches BlogsFeed style */}
                <div className="relative w-full md:w-auto">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/60" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="SEARCH TEAM..."
                        className="bg-foreground/15 border border-foreground/30 rounded-full py-2.5 pl-12 pr-6 font-oswald text-xs tracking-widest focus:outline-none focus:border-red/50 transition-colors w-full md:w-96 uppercase"
                    />
                </div>
            </div>

            {/* Section 1: ALEF Officers */}
            {showOfficers && (
                <section className="mb-24">
                    <div className="flex items-center gap-4 mb-10">
                        <span className="h-px bg-red w-12"></span>
                        <h2 className="text-3xl font-bebas text-foreground tracking-wide">ALEF Officers</h2>
                        <span className="h-px bg-foreground/30 grow"></span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {officers.map((officer: Author) => (
                            <div key={officer._id} className="bg-blue border border-light-blue p-6 rounded-sm hover:-translate-y-1 transition-transform duration-300 group">
                                <div className="w-full aspect-4/5 bg-black/30 mb-6 rounded-sm relative overflow-hidden flex items-center justify-center bg-linear-to-b from-white/5 to-transparent">
                                    {officer.image ? (
                                        <Image
                                            src={urlFor(officer.image).width(400).height(500).url()}
                                            alt={officer.discloseName === true ? (officer.name || 'Officer') : 'Officer'}
                                            fill
                                            className="object-cover"
                                            unoptimized
                                        />
                                    ) : (
                                        <Image
                                            src="/home/default-avatar.svg"
                                            alt="Default Avatar"
                                            fill
                                            className="object-contain p-12 opacity-20"
                                        />
                                    )}
                                </div>
                                <h3 className="text-2xl font-bebas text-white mb-2 group-hover:text-red transition-colors">
                                    {officer.discloseName === true ? (
                                        highlightText(officer.name || "", searchQuery)
                                    ) : (
                                        <Star className="w-6 h-6 fill-white inline-block" />
                                    )}
                                </h3>
                                {officer.position && (
                                    <p className="font-oswald text-red text-sm tracking-wide uppercase">
                                        {highlightText(officer.position, searchQuery)}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Section 2: ALEF Directors */}
            {showDirectors && (
                <section className="mb-24">
                    <div className="flex items-center gap-4 mb-10">
                        <span className="h-px bg-red w-12"></span>
                        <h2 className="text-3xl font-bebas text-foreground tracking-wide">ALEF Directors</h2>
                        <span className="h-px bg-foreground/30 grow"></span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {directors.map((director: Author) => (
                            <div key={director._id} className="bg-blue border border-light-blue p-6 rounded-sm hover:bg-light-blue transition-colors duration-300 flex flex-col items-center text-center h-full">
                                <div className="w-full aspect-4/5 bg-black/30 mb-6 rounded-sm relative overflow-hidden flex items-center justify-center bg-linear-to-b from-white/5 to-transparent shrink-0">
                                    {director.image ? (
                                        <Image
                                            src={urlFor(director.image).width(400).height(500).url()}
                                            alt={director.discloseName === true ? (director.name || 'Director') : 'Director'}
                                            fill
                                            className="object-cover"
                                            unoptimized
                                        />
                                    ) : (
                                        <Image
                                            src="/home/default-avatar.svg"
                                            alt="Default Avatar"
                                            fill
                                            className="object-contain p-12 opacity-20"
                                        />
                                    )}
                                </div>
                                <h3 className="text-lg font-bebas text-white mb-3 tracking-wide">
                                    {director.discloseName === true ? (
                                        highlightText(director.name || "", searchQuery)
                                    ) : (
                                        <Star className="w-6 h-6 fill-white inline-block" />
                                    )}
                                </h3>
                                <p className="font-oswald text-white/70 text-sm leading-relaxed">
                                    {highlightText(director.description || director.position || "", searchQuery)}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Section 3: ALEF Expert Advisors */}
            {showAdvisors && (
                <section className="mb-24">
                    <div className="flex items-center gap-4 mb-10">
                        <span className="h-px bg-red w-12"></span>
                        <h2 className="text-3xl font-bebas text-foreground tracking-wide">ALEF Expert Advisors</h2>
                        <span className="h-px bg-foreground/30 grow"></span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {advisors.map((advisor: Author) => (
                            <div key={advisor._id} className="bg-blue border border-light-blue p-6 rounded-sm hover:bg-light-blue transition-colors duration-300 flex flex-col items-center text-center h-full">
                                <div className="w-full aspect-4/5 bg-black/30 mb-6 rounded-sm relative overflow-hidden flex items-center justify-center bg-linear-to-b from-white/5 to-transparent shrink-0">
                                    {advisor.image ? (
                                        <Image
                                            src={urlFor(advisor.image).width(400).height(500).url()}
                                            alt={advisor.discloseName === true ? (advisor.name || 'Advisor') : 'Advisor'}
                                            fill
                                            className="object-cover"
                                            unoptimized
                                        />
                                    ) : (
                                        <Image
                                            src="/home/default-avatar.svg"
                                            alt="Default Avatar"
                                            fill
                                            className="object-contain p-12 opacity-20"
                                        />
                                    )}
                                </div>
                                <h3 className="text-lg font-bebas text-white mb-3 tracking-wide">
                                    {advisor.discloseName === true ? (
                                        highlightText(advisor.name || "", searchQuery)
                                    ) : (
                                        <Star className="w-6 h-6 fill-white inline-block" />
                                    )}
                                </h3>
                                <p className="font-oswald text-white/70 text-sm leading-relaxed">
                                    {highlightText(advisor.description || advisor.position || "", searchQuery)}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* No Results Message */}
            {filteredActivists.length === 0 && (
                <div className="col-span-full text-center py-20 bg-blue/50 rounded-lg border border-white/5">
                    <div className="flex flex-col items-center gap-4">
                        <p className="text-foreground/60 text-xl font-oswald tracking-widest uppercase">
                            No team members found matching "{searchQuery}"
                        </p>
                        <button
                            onClick={() => {
                                setCategoryFilter("All");
                                setSearchQuery("");
                            }}
                            className="text-red font-oswald text-sm underline underline-offset-4 hover:text-white transition-colors"
                        >
                            CLEAR FILTERS
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}
