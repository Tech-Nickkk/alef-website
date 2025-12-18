import Image from "next/image";
import Link from "next/link";

const topics = [
    {
        title: "Politics in Lebanon",
        description: "Analysis of political instability and terrorism's influence on governance",
        count: 45,
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#E31B23]">
                <path d="M12 2a10 10 0 1 0 10 10 10 10 0 0 0-10-10zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
                <path d="M12 6v6l4 2" />
            </svg>
        ),
    },
    {
        title: "Economy & Terrorism Impacts",
        description: "Research on economic disruption caused by terrorism and strategies for recovery",
        count: 45,
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#E31B23]">
                <path d="M3 3v18h18" />
                <path d="m19 9-5 5-4-4-3 3" />
            </svg>
        ),
    },
    {
        title: "Culture and Society",
        description: "Exploring cultural resilience and community initiatives against extremism",
        count: 45,
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#E31B23]">
                <path d="M2.05 13a9 9 0 0 0 17 2 9 9 0 0 0 2.95-9.1A9 9 0 0 0 2.05 13z" />
                <path d="M12 8a6 6 0 0 1 6 6" />
            </svg>
        ),
    },
    {
        title: "Opinions & Strategies",
        description: "Expert perspectives on counter-terrorism strategies and policy recommendations",
        count: 45,
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#E31B23]">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
            </svg>
        ),
    },
];

export default function ResearchTopics() {
    return (
        <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#FAFAFA]">
            <div className="max-w-[1400px] mx-auto">
                {/* Header */}
                <h2 className="text-3xl md:text-5xl lg:text-5xl text-center mb-16 leading-tight font-cormorant">
                    <span className="font-bold text-[#1a2b4b]">Research & Topics </span>
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Side: 2x2 Grid of Topics */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {topics.map((topic, index) => (
                            <div
                                key={index}
                                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between group hover:shadow-md transition-shadow h-full min-h-[250px]"
                            >
                                <div>
                                    <div className="mb-6 w-12 h-12 flex items-center justify-center bg-red-50 rounded-full group-hover:bg-red-100 transition-colors">
                                        {/* Replaced Icon with actual visual from design if available, otherwise using SVG placeholder above */}
                                        {topic.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-[#1a2b4b] mb-3 font-cormorant">
                                        {topic.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 leading-relaxed font-optima pr-4">
                                        {topic.description}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between mt-8 pt-4 border-t border-gray-50">
                                    <span className="text-sm font-semibold text-gray-400 font-optima">{topic.count} articles</span>
                                    <ArrowRight className="w-5 h-5 text-[#E31B23] transform group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Side: Large Image */}
                    <div className="relative h-full min-h-[500px] rounded-3xl overflow-hidden shadow-xl">
                        <Image
                            src="/home/research and topics.jpg"
                            alt="Research Library"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

function ArrowRight({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    );
}
