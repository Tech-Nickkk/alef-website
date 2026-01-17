"use client";

import { useMemo, useState } from "react";
import AnimatedTitle from "../components/CommonCom/AnimatedTitle";
import FilterBar from "../components/CommonCom/FilterBar";
import Image from "next/image";

// Member Data Types
interface Member {
    name: string;
    state: string;
    desc: string;
    img: string;
}

// Data
const SENATE_REPUBLICANS: Member[] = [
    { name: "Charles Grassley", state: "IA", desc: "President pro tempore of the US Senate", img: "Charles Grassley.jpg" },
    { name: "Jim Risch", state: "ID", desc: "Chairman of the Senate Foreign Relations Committee", img: "Jim Risch.jpg" },
    { name: "Joe Wilson", state: "SC", desc: "Chair of the Subcommittee on the Middle East & House Armed Services Committee", img: "Joe Wilson.jpg" },
    { name: "Darin Lahood", state: "IL", desc: "Co-chair of the bipartisan U.S.-Lebanon Friendship Caucus.", img: "Darin Lahood.jpg" },
    { name: "James Lankford", state: "OK", desc: "Co-chair of the bipartisan Senate Abraham Accords Caucus.", img: "James Lankford.jpg" },
    { name: "Joni Ernst", state: "IA", desc: "Co-chair of the bipartisan Senate Abraham Accords Caucus,", img: "Joni Ernst.jpg" },
    { name: "Lindsey Graham", state: "SC", desc: "Senate Appropriations Committee.", img: "Lindsey Graham.jpg" },
    { name: "Tom Cotton", state: "AZ", desc: "National security and foreign policy.", img: "Tom Cotton.jpg" },
    { name: "Todd Young", state: "IN", desc: "Ranking Member on the Senate Foreign Relations Subcommittee", img: "Todd Young.jpg" },
    { name: "Roger Wicker", state: "MS", desc: "Defense policy, military funding, and national security,", img: "Roger Wicker.jpg" },
    { name: "Steve Daines", state: "MT", desc: "Member of the Senate Foreign Relations Committee with firsthand experience dealing with Hezbollah", img: "Steve Daines.jpg" },
    { name: "Rick Scott", state: "FL", desc: "Vocal opponent of Iran and its terrorist proxy Hezbollah.", img: "Rick Scott.jpg" },
    { name: "Ted Cruz", state: "TX", desc: "Vocal opponent of Iran and its terrorist proxy Hezbollah.", img: "Ted Cruz.jpg" },
];

const SENATE_DEMOCRATS: Member[] = [
    { name: "Mark Warner", state: "VA", desc: "Chairman of the Senate Select Committee on Intelligence", img: "Mark Warner.jpg" },
    { name: "Ron Wyden", state: "OR", desc: "Key influencer on national security, foreign aid and intelligence matters.", img: "Ron Wyden.jpg" },
    { name: "Mark Kelly", state: "AZ", desc: "Member of the Senate Armed Services and Intelligence Committees,", img: "Mark Kelly.jpg" },
    { name: "Elissa Slotkin", state: "MI", desc: "Former CIA analyst with Middle East experience and member of the Senate Armed Services Committee", img: "Elissa Slotkin.jpg" },
];

const HOUSE_REPUBLICANS: Member[] = [
    { name: "Michael McCaul", state: "TX", desc: "Chairman of the House Foreign Affairs Committee", img: "Michael McCaul.jpg" },
    { name: "Mike Lawler", state: "NY", desc: "Chair of the House Foreign Affairs Subcommittee on the Middle East and North Africa,", img: "Mike Lawler.jpg" },
    { name: "Zach Nunn", state: "IA", desc: "Chair of the Republican National Security Task Force", img: "zach nunn.jpg" },
    { name: "Dave McCormick", state: "PA", desc: "Chairman of the Subcommittee on Counterterrorism", img: "dave mc cormick.jpg" },
    { name: "Darrell Issa", state: "CA", desc: "Vice Chair of the House Foreign Affairs Committee", img: "darrell issa.jpg" },
    { name: "Joe Wilson", state: "SC", desc: "Member of House Foreign Affairs Committee", img: "Joe Wilson.jpg" },
    { name: "Don Bacon", state: "IL", desc: "Serves on the House Armed Services Committee and House Permanent Select Committee on Intelligence", img: "Don Bacon.jpg" },
    { name: "Mark Messmer", state: "IN", desc: "Serves on the House Armed Services Committee,", img: "Mark Messmer.jpg" },
    { name: "Brian Mast", state: "FL", desc: "Serves on the House Foreign Affairs Committee", img: "Brian Mast.jpg" },
    { name: "Mike Rogers", state: "MI", desc: "Serves on the Senate Foreign Relations Committee", img: "Mike Rogers.jpg" },
    { name: "Jefferson Shreve", state: "IN", desc: "Vocal opponent of Iran and its terrorist proxy Hezbollah.", img: "Jefferson Shreve.jpg" },
    { name: "Claudia Tenney", state: "NY", desc: "National security, counterterrorism, and foreign threats.", img: "Claudia Tenney.jpg" },
    { name: "Greg Steube", state: "FL", desc: "PAGER Act Legislation", img: "Greg Steube.jpg" },
];

const HOUSE_DEMOCRATS: Member[] = [
    { name: "Josh Gottheimer", state: "NJ", desc: "Vocal opponent of Iran and its terrorist proxy Hezbollah.", img: "josh gottheimer.jpg" },
    { name: "Brad Schneider", state: "IL", desc: "Co-chair of the bipartisan Abraham Accords Caucus", img: "brad schneider.jpg" },
    { name: "Ritchie Torres", state: "NY", desc: "Vocal opponent of Iran and its terrorist proxy Hezbollah.", img: "Ritchie Torres.jpg" },
    { name: "Don Davis", state: "NC", desc: "Serves on the House Armed Services Committee, influencing U.S. defense policy and military readiness.", img: "don davis.jpg" },
    { name: "Jacky Rosen", state: "NV", desc: "Co-led the bipartisan No Hezbollah in Our Hemisphere Act to counter Hezbollah's operations in Latin America", img: "jacky rosen.jpg" },
    { name: "Jimmy Panetta", state: "CA", desc: "Son of former Defense Secretary Leon Panetta. Expert in Middle East diplomacy", img: "Jimmy panetta.jpg" },
    { name: "Brad Sherman", state: "CA", desc: "Member of the House Foreign Affairs Committee. Top influence on U.S. foreign policy Middle East issues.", img: "brad sherman.jpg" },
    { name: "Gregory Meeks", state: "NY", desc: "Member of the House Foreign Affairs Committee , one of the top Democrats, influencing U.S. foreign policy,", img: "Gregory meeks.jpg" },
];

// Helper to highlight text
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

// Card Component
const MemberCard = ({ member, searchQuery }: { member: Member; searchQuery: string }) => (
    <div className="group relative bg-white/5 border border-black/5 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-500">
        <div className="aspect-4/5 relative overflow-hidden bg-gray-100">
            <Image
                src={`/congressionalAdvocasy/${member.img}`}
                alt={member.name}
                fill
                className="object-cover transition-transform duration-700 lg:group-hover:scale-110"
            />

            {/* Base Gradient - Always visible for text contrast */}
            <div className="absolute inset-x-0 bottom-0 h-4/5 bg-linear-to-t from-black/90 via-black/50 to-transparent opacity-90 transition-opacity duration-500" />

            {/* Premium Hover Color Wash - Desktop Only */}
            <div className="absolute inset-0 bg-blue/90 opacity-0 lg:group-hover:opacity-90 transition-opacity duration-500 mix-blend-multiply hidden lg:block" />

            {/* Content Container */}
            <div className="absolute bottom-0 left-0 w-full p-6 text-white z-10">
                {/* Name/State Container */}
                <div className="transform transition-transform duration-500 lg:group-hover:-translate-y-1">
                    <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bebas text-3xl tracking-wide drop-shadow-md">
                            {highlightText(member.name, searchQuery)}
                        </h3>
                        <span className="bg-red text-white text-[10px] font-bold px-2 py-0.5 rounded font-oswald tracking-widest shadow-sm border border-red/50">{member.state}</span>
                    </div>
                </div>

                {/* Description Reveal Animation - Always Visible on Mobile, Hover on Desktop */}
                <div className="grid transition-all duration-500 ease-out grid-rows-[1fr] lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                        <div className="pt-2 lg:pt-3 transition-opacity duration-500 delay-100 opacity-100 lg:opacity-0 lg:group-hover:opacity-100">
                            <div className="w-12 h-0.5 bg-red mb-2 lg:mb-3"></div>
                            <p className="text-white/90 font-oswald text-sm font-light uppercase tracking-wide leading-relaxed">
                                {member.desc}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default function CongressionalAdvocacyPage() {
    // State
    const [searchQuery, setSearchQuery] = useState("");
    const [chamberFilter, setChamberFilter] = useState<"All" | "Senate" | "House">("All");

    // Unified List for filtering
    const allMembers = useMemo(() => {
        return [
            ...SENATE_REPUBLICANS.map(m => ({ ...m, chamber: "Senate", party: "Republican" })),
            ...SENATE_DEMOCRATS.map(m => ({ ...m, chamber: "Senate", party: "Democrat" })),
            ...HOUSE_REPUBLICANS.map(m => ({ ...m, chamber: "House", party: "Republican" })),
            ...HOUSE_DEMOCRATS.map(m => ({ ...m, chamber: "House", party: "Democrat" }))
        ];
    }, []);

    // Filter Logic
    const filteredMembers = useMemo(() => {
        return allMembers.filter(m => {
            // Search Text - Use strict name matching only
            const lowerQuery = searchQuery.toLowerCase();
            const matchesSearch = m.name.toLowerCase().includes(lowerQuery);

            if (!matchesSearch) return false;

            // Chamber Filter
            if (chamberFilter === "All") return true;
            return m.chamber === chamberFilter;
        });
    }, [allMembers, searchQuery, chamberFilter]);

    // Grouping for Display
    const senateRepublicans = filteredMembers.filter(m => m.chamber === "Senate" && m.party === "Republican");
    const senateDemocrats = filteredMembers.filter(m => m.chamber === "Senate" && m.party === "Democrat");
    const houseRepublicans = filteredMembers.filter(m => m.chamber === "House" && m.party === "Republican");
    const houseDemocrats = filteredMembers.filter(m => m.chamber === "House" && m.party === "Democrat");

    const showSenate = (chamberFilter === "All" || chamberFilter === "Senate") && (senateRepublicans.length > 0 || senateDemocrats.length > 0);
    const showHouse = (chamberFilter === "All" || chamberFilter === "House") && (houseRepublicans.length > 0 || houseDemocrats.length > 0);

    return (
        <main className="bg-background min-h-screen pb-24">
            {/* HERO / HEADER */}
            <div className="pt-32 pb-16 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto text-center">
                <AnimatedTitle
                    text="CONGRESSIONAL ADVOCACY GROUP"
                    className="text-5xl md:text-7xl lg:text-8xl font-bebas font-bold text-foreground leading-none"
                />

                <div className="max-w-4xl mx-auto space-y-6 mt-10">
                    <p className="font-oswald text-lg md:text-xl text-foreground/80 leading-relaxed font-light">
                        We at the American Lebanon Education Foundation (ALEF) would like to thank these tremendous Bipartisan members of the US Congress who publicly support our stand against the Iranian/Hezbollah axis.
                    </p>
                    <p className="font-oswald text-lg md:text-xl text-foreground/80 leading-relaxed font-light">
                        Over the years, this group has served as the leading voice in Congress calling for both increased support from the United States to liberate Lebanon from Hezbollah’s shackles as well as for needed reforms from Lebanon’s leadership.
                    </p>
                </div>
            </div>

            {/* FILTER BAR - Added Here */}
            <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
                <FilterBar
                    tabs={["All", "Senate", "House"]}
                    activeTab={chamberFilter}
                    onTabChange={(tab) => setChamberFilter(tab as any)}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    searchPlaceholder="SEARCH MEMBERS..."
                />
            </div>

            {/* NO RESULTS MESSAGE */}
            {filteredMembers.length === 0 && (
                <div className="max-w-7xl mx-auto px-4 text-center py-20">
                    <p className="text-foreground/60 text-xl font-oswald uppercase tracking-widest">
                        No members found matching "{searchQuery}"
                    </p>
                    <button
                        onClick={() => { setChamberFilter("All"); setSearchQuery(""); }}
                        className="text-red font-oswald text-sm underline underline-offset-4 hover:text-foreground mt-4"
                    >
                        CLEAR FILTERS
                    </button>
                </div>
            )}

            {/* SENATE SECTION */}
            {showSenate && (
                <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 mb-24">
                    <div className="flex items-center gap-4 mb-12">
                        <span className="h-px flex-1 bg-foreground/70"></span>
                        <h2 className="font-bebas text-3xl md:text-5xl text-foreground">United States Senate</h2>
                        <span className="h-px flex-1 bg-foreground/70"></span>
                    </div>

                    {/* Republicans */}
                    {senateRepublicans.length > 0 && (
                        <div className="mb-16">
                            <h3 className="font-oswald text-xl md:text-2xl text-red mb-8 uppercase tracking-widest pl-2  md:pl-4 border-l-4 border-red">Republicans</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {senateRepublicans.map((member, i) => (
                                    <MemberCard key={i} member={member} searchQuery={searchQuery} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Democrats */}
                    {senateDemocrats.length > 0 && (
                        <div>
                            <h3 className="font-oswald text-xl md:text-2xl text-red mb-8 uppercase tracking-widest pl-2 md:pl-4 border-l-4 border-red">Democrats</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {senateDemocrats.map((member, i) => (
                                    <MemberCard key={i} member={member} searchQuery={searchQuery} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* HOUSE SECTION */}
            {showHouse && (
                <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 mb-24">
                    <div className="flex items-center gap-4 mb-12">
                        <span className="h-px flex-1 bg-foreground/70"></span>
                        <h2 className="font-bebas text-3xl md:text-5xl text-foreground">House of Representatives</h2>
                        <span className="h-px flex-1 bg-foreground/70"></span>
                    </div>

                    {/* Republicans */}
                    {houseRepublicans.length > 0 && (
                        <div className="mb-16">
                            <h3 className="font-oswald text-xl md:text-2xl text-red mb-8 uppercase tracking-widest pl-2 md:pl-4 border-l-4 border-red">Republicans</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {houseRepublicans.map((member, i) => (
                                    <MemberCard key={i} member={member} searchQuery={searchQuery} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Democrats */}
                    {houseDemocrats.length > 0 && (
                        <div>
                            <h3 className="font-oswald text-xl md:text-2xl text-red mb-8 uppercase tracking-widest pl-2 md:pl-4 border-l-4 border-red">Democrats</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {houseDemocrats.map((member, i) => (
                                    <MemberCard key={i} member={member} searchQuery={searchQuery} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

        </main>
    );
}
