import Image from "next/image";
import Link from "next/link";
import AnimatedTitle from "../CommonCom/AnimatedTitle";

export default function BlogsAndArticles() {

    return (
        <section className="py-12 md:py-16 px-6 md:px-12 lg:px-24 bg-theme-black border-t border-theme-white/10">
            <div className="max-w-[1400px] mx-auto">

                {/* Header */}
                {/* Header */}
                <div className="flex flex-col items-center justify-center mb-6 md:mb-12 border-b border-theme-white/10 pb-6 gap-4 text-center">
                    <AnimatedTitle
                        text="BLOGS & ARTICLES"
                        className="text-4xl md:text-6xl font-bold font-bebas text-theme-white uppercase leading-none"
                    />
                    <div className="flex items-center gap-2 text-theme-white/60 font-oswald text-xs tracking-widest">
                        <span className="w-2 h-2 bg-theme-accent rounded-full inline-block animate-pulse"></span>
                        LATEST ANALYSES
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Text Card */}
                    <div className="bg-card-bg border border-theme-white/10 rounded-2xl p-8 md:p-12 flex flex-col justify-between h-[550px] md:h-[600px] relative group hover:border-theme-white/30 transition-colors duration-500">

                        {/* Technical Label */}
                        <div className="flex justify-between items-start mb-8 font-oswald text-xs tracking-widest text-white/60">
                            <span>03</span>
                            <span>OPINION // ZIAD ABDELNOUR</span>
                        </div>

                        <div className="space-y-8 relative z-10 flex-1">
                            <div className="space-y-4">
                                <h3 className="text-3xl md:text-4xl text-white font-bebas tracking-wide leading-normal">
                                    US FOREIGN POLICY TOWARDS LEBANON
                                </h3>
                                <h4 className="text-theme-accent font-bebas text-xl tracking-wider">
                                    NOVEMBER 29, 2025
                                </h4>
                            </div>

                            <div className="space-y-6 text-base md:text-lg text-white/60 font-oswald leading-relaxed">
                                <p>
                                    A critical examination of the shifting diplomatic dynamics between Washington and Beirut. We analyze how current American foreign policy decisions are shaping the future of Lebanese sovereignty and what steps must be taken to ensure a free and independent Lebanon.
                                </p>
                            </div>
                        </div>

                        <div className="mt-0 md:mt-12 pt-0 md:pt-8 border-t border-theme-white/10 flex justify-between items-center">
                            {/* Link points to the LinkedIn Article provided in the email */}
                            <Link
                                href="https://www.linkedin.com/posts/ziad-abdelnour_lebanon-washington-american-activity-7400281962818719744-gZ_6?utm_source=share"
                                target="_blank"
                                className="group/btn flex items-center gap-4 w-full justify-between relative"
                            >
                                <span className="text-white font-bebas text-lg md:text-xl tracking-wider group-hover/btn:text-theme-accent transition-colors relative">
                                    READ FULL ARTICLE
                                    <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-theme-accent transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-500 origin-right group-hover/btn:origin-left ease-out"></span>
                                </span>
                                <div className="md:w-12 md:h-12 w-10 h-10 border border-theme-white/20 rounded-full flex items-center justify-center group-hover/btn:bg-theme-accent group-hover/btn:border-theme-accent transition-all duration-300 bg-theme-black">
                                    <ArrowRight className="w-5 h-5 text-theme-white" />
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Image Card */}
                    <div className="bg-card-bg border border-theme-white/10 rounded-2xl p-2 h-[500px] md:h-[600px] relative overflow-hidden group">
                        <div className="relative w-full h-full rounded-xl overflow-hidden">
                            <Image
                                src="/home/BLogs&Articles.jpg"
                                alt="US Foreign Policy"
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Overlay Elements */}
                        <div className="absolute top-6 left-6 z-10">
                            <div className="px-3 py-1 border border-theme-accent/50 bg-theme-accent/10 rounded text-theme-accent font-oswald text-xs tracking-widest">
                                FEATURED BLOG
                            </div>
                        </div>
                    </div>

                </div>

                <div className="flex justify-center mt-12 relative z-10">
                    <button className="group relative bg-transparent border border-theme-white/70 text-theme-white px-12 py-4 text-sm font-bold tracking-[0.2em] uppercase font-oswald overflow-hidden transition-all hover:border-theme-white/50 isolate cursor-pointer">
                        <span className="relative z-10 group-hover:text-theme-black transition-colors duration-300">VIEW ALL ARTICLES</span>
                        <div className="absolute inset-0 bg-theme-white transform scale-y-0 origin-top group-hover:scale-y-100 group-hover:origin-bottom transition-transform duration-500 ease-out -z-10"></div>
                    </button>
                </div>
            </div>
        </section>
    );
}

function ArrowRight({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    );
}