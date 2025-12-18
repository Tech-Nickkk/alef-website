import Image from "next/image";

const trendingArticles = [
    {
        id: 1,
        tag: "Politics",
        reviews: "12.6K Reviews",
        image: "/home/trending-1.jpg",
        title: "Exposing Hezbollah's Grip: Latest Analysis on Political Influence in...",
        description: "LebanonComprehensive research revealing the extent of Hezbollah's political control and its impact on Lebanese sovereignty and democratic processes.",
        author: "Dr. Sarah Mitchell",
        date: "Jan 12, 2025",
        isLarge: true,
    },
    {
        id: 2,
        tag: "Economy",
        reviews: "12.6K Reviews",
        image: "/home/trending-2.jpg",
        title: "The Hidden Cost: How Terrorism Undermines Lebanon's Economy...",
        description: "LebanonComprehensive research revealing the extent of Hezbollah's political control and its impact on Lebanese sovereignty and democratic processes.",
        author: "Dr. Sarah Mitchell",
        date: "Jan 12, 2025",
        isLarge: false,
    },
    {
        id: 3,
        tag: "Economy",
        reviews: "12.6K Reviews",
        image: "/home/trending-3.jpg",
        title: "The Hidden Cost: How Terrorism Undermines Lebanon's Economy...",
        description: "LebanonComprehensive research revealing the extent of Hezbollah's political control and its impact on Lebanese sovereignty and democratic processes.",
        author: "Dr. Sarah Mitchell",
        date: "Jan 12, 2025",
        isLarge: false,
    },
];

export default function TrendingRead() {
    const largeArticle = trendingArticles[0];
    const sideArticles = trendingArticles.slice(1);

    return (
        <section className="py-24 px-6 md:px-12 lg:px-24 bg-white">
            <div className="max-w-[1400px] mx-auto">
                {/* Header */}
                <h2 className="text-3xl md:text-5xl lg:text-5xl text-center mb-16 leading-tight font-cormorant">
                    <span className="font-bold text-[#1a2b4b]">Trending & Most Read </span>
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-auto lg:h-[600px]">
                    {/* Left Large Card */}
                    <div className="group relative rounded-2xl overflow-hidden shadow-lg h-[500px] lg:h-full">
                        <Image
                            src={largeArticle.image}
                            alt={largeArticle.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                        <div className="absolute bottom-0 left-0 w-full p-8 text-white z-10 flex flex-col gap-3">
                            <div className="flex items-center gap-3 mb-1">
                                <span className="bg-[#E31B23] text-white text-xs font-semibold px-3 py-1 rounded-full">
                                    {largeArticle.tag}
                                </span>
                                <span className="text-xs text-gray-300 font-optima">{largeArticle.reviews}</span>
                            </div>

                            <h3 className="text-2xl font-bold leading-tight font-cormorant">
                                {largeArticle.title}
                            </h3>

                            <p className="text-sm text-gray-300 line-clamp-3 font-optima leading-relaxed">
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

                    {/* Right Side Cards */}
                    <div className="flex flex-col gap-6 h-full">
                        {sideArticles.map((article) => (
                            <div key={article.id} className="flex-1 flex rounded-2xl overflow-hidden shadow-lg group bg-[#1F2937] h-[280px] lg:h-auto">
                                {/* Image Section */}
                                <div className="relative w-2/5 h-full">
                                    <Image
                                        src={article.image}
                                        alt={article.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>

                                {/* Content Section */}
                                <div className="w-3/5 p-6 flex flex-col justify-center gap-3 text-white">
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className="bg-[#E31B23] text-white text-xs font-semibold px-3 py-1 rounded-full">
                                            {article.tag}
                                        </span>
                                        <span className="text-xs text-gray-400 font-optima">{article.reviews}</span>
                                    </div>

                                    <h3 className="text-xl font-bold leading-tight font-cormorant">
                                        {article.title}
                                    </h3>

                                    <p className="text-xs text-gray-400 line-clamp-3 font-optima leading-relaxed">
                                        {article.description}
                                    </p>

                                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 font-medium font-optima">
                                        <div className="flex items-center gap-2">
                                            <UserIcon className="w-3 h-3" />
                                            <span>{article.author}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
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
