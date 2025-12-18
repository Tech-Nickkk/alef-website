import Image from "next/image";
import Link from "next/link";

const articles = [
    {
        id: 1,
        tag: "Politics",
        image: "/home/article-1.png",
        title: "Exposing Hezbollah's Grip: Latest Analysis on Political Influence in...",
        description: "LebanonComprehensive research revealing the extent of Hezbollah's political control and its impact on Lebanese sovereignty and democratic processes.",
        author: "Dr. Sarah Mitchell",
        date: "Jan 12, 2025",
    },
    {
        id: 2,
        tag: "Economy",
        image: "/home/article-2.png",
        title: "The Hidden Cost: How Terrorism Undermines Lebanon's Economy...",
        description: "LebanonComprehensive research revealing the extent of Hezbollah's political control and its impact on Lebanese sovereignty and democratic processes.",
        author: "Dr. Sarah Mitchell",
        date: "Jan 12, 2025",
    },
    {
        id: 3,
        tag: "Culture",
        image: "/home/article-3.png",
        title: "Building Cultural Resilience: Community Initiatives Against...",
        description: "LebanonComprehensive research revealing the extent of Hezbollah's political control and its impact on Lebanese sovereignty and democratic processes.",
        author: "Dr. Sarah Mitchell",
        date: "Jan 12, 2025",
    },
];

export default function RecentArticles() {
    return (
        <section className="py-24 px-6 md:px-12 lg:px-24 bg-white">
            <div className="max-w-[1400px] mx-auto">
                {/* Header */}
                <h2 className="text-3xl md:text-5xl lg:text-5xl text-center mb-16 leading-tight font-cormorant text-[#1F2937]">
                    <span className="font-bold text-[#1a2b4b]">Dynamic Stream Of The Most</span>{" "}
                    <span className="font-bold text-[#1a2b4b]">Recent Articles</span>
                    <br />
                    <span className="font-bold text-[#1a2b4b]">Across All Categories</span>
                </h2>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {articles.map((article) => (
                        <article
                            key={article.id}
                            className="group relative h-[500px] rounded-2xl overflow-hidden shadow-lg cursor-pointer block"
                        >
                            {/* Background Image */}
                            <Image
                                src={article.image}
                                alt={article.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 w-full p-6 text-white z-10 flex flex-col gap-3">
                                {/* Tag */}
                                <span className="inline-block bg-[#E31B23] text-white text-xs font-semibold px-3 py-1 rounded-full w-fit mb-1">
                                    {article.tag}
                                </span>

                                <h3 className="text-xl font-bold leading-tight font-cormorant">
                                    {article.title}
                                </h3>

                                <p className="text-sm text-gray-300 line-clamp-3 font-optima leading-relaxed">
                                    {article.description}
                                </p>

                                <div className="flex items-center gap-6 mt-3 text-xs text-gray-400 font-medium font-optima">
                                    <div className="flex items-center gap-2">
                                        <UserIcon className="w-4 h-4" />
                                        <span>{article.author}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CalendarIcon className="w-4 h-4" />
                                        <span>{article.date}</span>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* View All Button */}
                <div className="flex justify-center">
                    {/* Keeping it rectangular as per general rule, but slightly rounded to not match hero exactly if different visual is key. 
                Wait, image shows rounded pill. User asked to 'add this'. 
                User also said earlier 'use rectangular boxes'.
                I will compromise: rounded-none to respect the STRICT text rule over the image visual,
                or slight round. Let's stick to the rectangular rule for "buttons" to be safe.
                Actually, the image has a VERY red pill button. I'll make it rounded-full to match the image explicitly requested *here*.
            */}
                    <button className="bg-[#E31B23] hover:bg-[#c4151c] text-white px-10 py-3 text-sm font-semibold transition-all shadow-lg flex items-center gap-2 rounded-full">
                        View All
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </section>
    );
}

// Icons
function UserIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    );
}

function CalendarIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
            <line x1="16" x2="16" y1="2" y2="6" />
            <line x1="8" x2="8" y1="2" y2="6" />
            <line x1="3" x2="21" y1="10" y2="10" />
        </svg>
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
