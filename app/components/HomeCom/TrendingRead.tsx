import Image from "next/image";

const trendingArticles = [
    {
        id: 1,
        tag: "Politics",
        reviews: "12.6K Reads",
        image: "/home/trending-1.jpg",
        title: "Exposing Hezbollah's Grip: Latest Analysis on Political Influence",
        description: "Comprehensive research revealing the extent of Hezbollah's political control and its impact on Lebanese sovereignty and democratic processes.",
        author: "Dr. Sarah Mitchell",
        date: "Jan 12, 2025",
        isLarge: true,
    },
    {
        id: 2,
        tag: "Economy",
        reviews: "8.2K Reads",
        image: "/home/trending-2.jpg",
        title: "The Hidden Cost: How Terrorism Undermines Lebanon's Economy",
        description: "Analyzing the direct correlation between regional instability and the collapsing banking sector.",
        author: "Prof. James H.",
        date: "Jan 11, 2025",
        isLarge: false,
    },
    {
        id: 3,
        tag: "Security",
        reviews: "6.5K Reads",
        image: "/home/trending-3.jpg",
        title: "Border Control Reports: 2024 Year in Review",
        description: "A summary of the major security breaches recorded along the southern border.",
        author: "Security Desk",
        date: "Jan 09, 2025",
        isLarge: false,
    },
    {
        id: 4,
        tag: "Opinion",
        reviews: "5.9K Reads",
        image: "/home/trending-1.jpg",
        title: "Rebuilding Trust: A Manifesto for Change",
        description: "Why the upcoming elections are the most critical in Lebanon's modern history.",
        author: "Editor in Chief",
        date: "Jan 08, 2025",
        isLarge: false,
    },
    {
        id: 5,
        tag: "Culture",
        reviews: "4.1K Reads",
        image: "/home/trending-2.jpg",
        title: "Beirut's Art Scene: Resistance Through Expression",
        description: "How local artists are documenting the struggle for sovereignty.",
        author: "Layla M.",
        date: "Jan 05, 2025",
        isLarge: false,
    },
];

export default function TrendingRead() {
    const largeArticle = trendingArticles[0];
    const sideArticles = trendingArticles.slice(1);

    return (
        <section className="py-24 px-6 md:px-12 lg:px-24 bg-white">
            <div className="max-w-[1400px] mx-auto">
                <h2 className="text-3xl md:text-5xl lg:text-5xl text-center mb-16 leading-tight font-cormorant">
                    <span className="font-bold text-[#1a2b4b]">Trending & Most Read</span>
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:h-[600px]">
                    {/* Left Large Card */}
                    <div className="group relative rounded-2xl overflow-hidden shadow-lg h-[500px] lg:h-full cursor-pointer">
                        <Image
                            src={largeArticle.image}
                            alt={largeArticle.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

                        <div className="absolute bottom-0 left-0 w-full p-8 text-white z-10 flex flex-col gap-3">
                            <div className="flex items-center gap-3 mb-1">
                                <span className="bg-[#E31B23] text-white text-xs font-semibold px-3 py-1 rounded-full font-optima">
                                    {largeArticle.tag}
                                </span>
                                <span className="text-xs text-gray-300 font-optima">{largeArticle.reviews}</span>
                            </div>

                            <h3 className="text-2xl md:text-3xl font-bold leading-tight font-cormorant">
                                {largeArticle.title}
                            </h3>

                            <p className="text-sm text-gray-300 line-clamp-2 md:line-clamp-3 font-optima leading-relaxed">
                                {largeArticle.description}
                            </p>

                            <div className="flex items-center gap-6 mt-2 text-xs text-gray-400 font-medium font-optima">
                                <div className="flex items-center gap-2">
                                    <UserIcon className="w-4 h-4" />
                                    <span>{largeArticle.author}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CalendarIcon className="w-4 h-4" />
                                    <span>{largeArticle.date}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side Cards - Vertical Scrollable or Static Grid */}
                    <div className="flex flex-col gap-4 h-full overflow-y-auto pr-2 custom-scrollbar">
                        {sideArticles.map((article) => (
                            <div key={article.id} className="shrink-0 flex rounded-2xl overflow-hidden shadow-lg group bg-[#1F2937] h-[140px] cursor-pointer hover:bg-[#2d3b4e] transition-colors">
                                {/* Image Section */}
                                <div className="relative w-[35%] h-full">
                                    <Image
                                        src={article.image}
                                        alt={article.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>

                                {/* Content Section */}
                                <div className="w-[65%] p-4 flex flex-col justify-center gap-2 text-white">
                                    <div className="flex items-center gap-3">
                                        <span className="text-[#E31B23] text-[10px] font-bold uppercase font-optima tracking-wider">
                                            {article.tag}
                                        </span>
                                        <span className="text-[10px] text-gray-400 font-optima">{article.reviews}</span>
                                    </div>

                                    <h3 className="text-lg font-bold leading-none font-cormorant line-clamp-2">
                                        {article.title}
                                    </h3>

                                    <div className="flex items-center gap-3 mt-1 text-[10px] text-gray-500 font-medium font-optima">
                                        <div className="flex items-center gap-1">
                                            <UserIcon className="w-3 h-3" />
                                            <span>{article.author}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <CalendarIcon className="w-3 h-3" />
                                            <span>{article.date}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

// Icons
function UserIcon({ className }: { className?: string }) {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>;
}

function CalendarIcon({ className }: { className?: string }) {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg>;
}