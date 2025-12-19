// app/components/AboutTeaser.tsx
import Link from "next/link";
import Image from "next/image";

export default function AboutTeaser() {
    return (
        <section className="py-24 px-6 md:px-12 lg:px-24 bg-white">
            <div className="max-w-[1400px] mx-auto">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    
                    <div className="flex-1 space-y-8">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#1a2b4b] font-cormorant leading-tight">
                            Who We Are
                        </h2>
                        
                        <div className="space-y-6 text-lg text-gray-600 font-optima leading-relaxed">
                            <p>
                                The American Lebanon Education Foundation (ALEF) is a collective of Lebanese and American professionals, activists, and leaders united by a shared vision of a free, sovereign, and prosperous Lebanon.
                            </p>
                            <p>
                                As an independent, non-partisan movement, we are committed to dismantling corruption, restoring governance, and advocating for Lebanon’s rightful place within the international community. Our mission extends to promoting diaspora involvement in reconstruction and driving policy solutions for a self-reliant nation.
                            </p>
                        </div>

                        <Link href="/about-us" className="inline-block">
                            <button className="bg-[#E31B23] hover:bg-[#c4151c] text-white px-10 py-3.5 text-sm font-semibold transition-all shadow-lg flex items-center gap-2 rounded-full font-optima uppercase tracking-wider">
                                Know More
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </Link>
                    </div>

                    <div className="flex-1 w-full relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                         <Image
                            src="/home/hero-img.png" 
                            alt="ALEF Mission"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-[#1a2b4b]/20" />
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