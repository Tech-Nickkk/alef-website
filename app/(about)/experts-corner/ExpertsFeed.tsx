"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Star } from 'lucide-react';
import FilterBar from "@/app/components/CommonCom/FilterBar";
import { urlFor } from '@/sanity/lib/image';

interface Author {
    _id: string;
    name?: string;
    discloseName?: boolean;
    category?: 'officer' | 'director' | 'advisor' | 'blogAuthor';
    position?: string;
    description?: string;
    image?: any;
}

interface ExpertsFeedProps {
    initialActivists: Author[];
}

export default function ExpertsFeed({ initialActivists }: ExpertsFeedProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState<"All" | "Officers" | "Directors" | "Expert Advisors">("All");

    const filteredActivists = useMemo(() => {
        return initialActivists.filter(a => {
            const matchesSearch = (a.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
                (a.position || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
                (a.description || "").toLowerCase().includes(searchQuery.toLowerCase());
            return matchesSearch;
        });
    }, [initialActivists, searchQuery]);

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
                <span key={index} className="bg-red/70 text-white rounded px-0.5">
                    {part}
                </span>
            ) : (
                part
            )
        );
    };

    return (
        <>
            {/* Filters Row */}
            <FilterBar
                tabs={["All", "Officers", "Directors", "Expert Advisors"]}
                activeTab={categoryFilter}
                onTabChange={(tab) => setCategoryFilter(tab as any)}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                searchPlaceholder="SEARCH TEAM..."
            />

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
                            <div key={officer._id} className="bg-blue border border-light-blue p-6 rounded-sm transition-transform duration-300 group">
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
                                <h3 className="text-2xl font-bebas text-white mb-2 transition-colors">
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
                            <div key={director._id} className="bg-blue border border-light-blue p-6 rounded-sm transition-colors duration-300 flex flex-col items-center text-center h-full">
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
                            <div key={advisor._id} className="bg-blue border border-light-blue p-6 rounded-sm transition-colors duration-300 flex flex-col items-center text-center h-full">
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
        </>
    );
}