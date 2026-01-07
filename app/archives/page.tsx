import AnimatedTitle from "../components/CommonCom/AnimatedTitle";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const archiveData = [
    {
        title: "UN Security Resolution 1559",
        url: "https://share.google/ByXPi7Vm2E4PcBYWF"
    },
    {
        title: "UN Security Resolution 1680",
        url: "https://share.google/m5vLi6FiZ8CVJyRpU"
    },
    {
        title: "UN Security Resolution 1701",
        url: "https://share.google/JbJxOtC9mdpip0Gif"
    },
    {
        title: "House Resolution 533",
        description: "Ushered in by Congressman Robert Dornan (California 27th district) and introduced by Charles Chartouni.",
        url: "https://www.congress.gov/bill/100th-congress/house-resolution/533"
    },
    {
        title: "Representative Shreve Introduces Bill to Counter Iran's Regime of Terror",
        url: "https://shreve.house.gov/media/press-releases/representative-shreve-introduces-bill-counter-irans-regime-terror"
    },
    {
        title: "No Hezbollah in Our Hemisphere Act",
        description: "Introduced by U.S. Senators John Curtis (R-UT), Chair of the Foreign Relations Western Hemisphere Subcommittee, and Jacky Rosen (D-NV).",
        url: "https://www.curtis.senate.gov/press-releases/curtis-rosen-introduce-bill-to-counter-hezbollahs-influence-in-latin-america/"
    },
    {
        title: "The Charles Malik papers at the Library of Congress",
        url: "https://share.google/P1g2gs6pLw9EYt9gF"
    },
    {
        title: "Lebanon: How Israel, Hezbollah, and Regional Powers Are Shaping Its Future",
        description: "Council on Foreign Relations.",
        url: "https://www.cfr.org/backgrounder/lebanon-how-israel-hezbollah-and-regional-powers-are-shaping-its-future?utm_medium=social_share&utm_source=emailfwd"
    },
    {
        title: "Hezbollah's Networks in Latin America",
        description: "Potential Implications for U.S. Policy and Research.",
        url: "https://www.rand.org/pubs/perspectives/PEA3585-1.html"
    }
];

export default function ArchivesPage() {
    return (
        <div className="bg-background min-h-screen flex flex-col relative overflow-hidden">

            <main className="grow pt-32 px-4 md:px-8 lg:px-12 max-w-[1400px] mx-auto w-full z-10 relative">

                <div className="mb-20 text-center max-w-5xl mx-auto">
                    <AnimatedTitle
                        text="ARCHIVES"
                        className="text-5xl md:text-7xl font-bebas text-foreground mb-6 justify-center flex"
                    />
                    <div className="h-1 w-24 bg-red mx-auto mb-8"></div>
                    <p className="font-oswald text-xl md:text-2xl text-foreground/90 leading-relaxed max-w-4xl mx-auto">
                        Official resolutions, legislative actions, and historical documents.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
                    {archiveData.map((item, index) => (
                        <Link
                            key={index}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative bg-blue border border-white/10 p-8 hover:bg-light-blue transition-all duration-300 overflow-hidden rounded-lg"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <ArrowUpRight className="w-6 h-6 text-white" />
                            </div>

                            <h3 className="font-bebas text-2xl md:text-3xl text-white mb-3 transition-colors pr-8">
                                {item.title}
                            </h3>

                            {item.description && (
                                <p className="font-oswald text-white/70 text-sm md:text-base leading-relaxed">
                                    {item.description}
                                </p>
                            )}

                            <div className="mt-6 flex items-center gap-2 text-xs font-oswald tracking-widest text-white/50 group-hover:text-red transition-colors uppercase">
                                <span>Read Document</span>
                                <span className="w-8 h-px bg-current transition-all group-hover:w-12" />
                            </div>
                        </Link>
                    ))}
                </div>

            </main>
        </div>
    );
}