"use client";

import Link from "next/link";
import AnimatedTitle from "../CommonCom/AnimatedTitle";


export default function Resources() {
    return (
        <section className="py-24 px-6 md:px-12 lg:px-24 bg-theme-black border-t border-theme-white/10">
            <div className="max-w-[1400px] mx-auto">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-theme-white/10 pb-6 gap-4">
                    <AnimatedTitle
                        text="LATEST RESOURCES"
                        className="text-4xl md:text-6xl font-bold font-bebas text-theme-white uppercase leading-none"
                    />
                    <div className="flex items-center gap-2 text-theme-white/60 font-oswald text-xs tracking-widest mb-2">
                        <span className="w-2 h-2 bg-theme-accent rounded-full inline-block"></span>
                        ARCHIVE // MEDIA
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* UPCOMING EVENTS */}
                    <div className="bg-[#1a1a1a] border border-theme-white/10 p-12 flex flex-col justify-center relative overflow-hidden group rounded-2xl hover:border-theme-white/30 transition-colors duration-500 min-h-[500px]">

                        <div className="relative z-10 max-w-sm h-full flex flex-col justify-between">
                            <div>
                                <span className="font-oswald text-xs tracking-[0.2em] text-theme-accent mb-4 block">CALENDAR_SYNC</span>
                                <AnimatedTitle
                                    text="UPCOMING EVENTS"
                                    className="text-4xl md:text-5xl font-bold text-theme-white font-bebas mb-6 leading-none"
                                />

                                <p className="text-theme-white/60 font-oswald text-lg leading-relaxed mb-8">
                                    Join our upcoming discussions on post-crisis recovery and cultural resilience.
                                </p>
                            </div>

                            <div className="mb-8">
                                <div className="bg-theme-black border border-theme-white/10 p-6 flex gap-6 items-center group-hover:border-theme-accent/50 transition-colors">
                                    <div className="text-center px-4 border-r border-theme-white/10">
                                        <span className="block text-3xl font-bold text-theme-white font-bebas">24</span>
                                        <span className="block text-[10px] font-bold text-theme-accent font-oswald tracking-wider uppercase">FEB</span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-theme-white font-bebas text-xl tracking-wide">Beirut Economic Forum</p>
                                        <p className="text-xs text-theme-white/40 font-oswald tracking-widest">10:00 AM - DOWNTOWN</p>
                                    </div>
                                </div>
                            </div>

                            <Link href="/events" className="group/btn flex items-center gap-4">
                                <span className="text-theme-white font-bebas text-xl tracking-wider group-hover/btn:text-theme-accent transition-colors">FULL CALENDAR</span>
                                <ArrowRight className="w-5 h-5 text-theme-white group-hover/btn:text-theme-accent transition-colors" />
                            </Link>
                        </div>
                    </div>


                    {/* PODCAST NETWORK */}
                    <div className="bg-[#1a1a1a] border border-theme-white/10 p-12 flex flex-col justify-center relative overflow-hidden group rounded-2xl hover:border-theme-white/30 transition-colors duration-500 min-h-[500px]">

                        {/* Decorative Grid Background */}
                        <div className="absolute inset-0 z-0 opacity-10"
                            style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}
                        ></div>

                        <div className="relative z-10 max-w-sm h-full flex flex-col justify-between">
                            <div>
                                <span className="font-oswald text-xs tracking-[0.2em] text-theme-accent mb-4 block">AUDIO_LOGS</span>
                                <AnimatedTitle
                                    text="PODCAST NETWORK"
                                    className="text-4xl md:text-5xl font-bold text-theme-white font-bebas mb-6 leading-none"
                                />

                                <p className="text-theme-white/60 font-oswald text-lg leading-relaxed mb-8">
                                    Listen to the best in public policy audio content, featuring expert analysis and voices from the ground.
                                </p>
                            </div>

                            {/* Podcast Players / Links */}
                            <div className="flex gap-4 mb-12">
                                <div className="w-12 h-12 bg-theme-white rounded-full flex items-center justify-center text-theme-black cursor-pointer hover:bg-theme-accent hover:text-theme-white transition-all transform hover:scale-110">
                                    <PlayIcon className="w-5 h-5" />
                                </div>
                                <div className="w-12 h-12 bg-transparent border border-theme-white/20 rounded-full flex items-center justify-center text-theme-white cursor-pointer hover:border-theme-white transition-all">
                                    <MicIcon className="w-5 h-5" />
                                </div>
                            </div>

                            <Link href="/podcast" className="group/btn flex items-center gap-4">
                                <span className="text-theme-white font-bebas text-xl tracking-wider group-hover/btn:text-theme-accent transition-colors">LISTEN TO ALL</span>
                                <ArrowRight className="w-5 h-5 text-theme-white group-hover/btn:text-theme-accent transition-colors" />
                            </Link>
                        </div>

                        {/* Right Side Visual -> Abstract Waves */}
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 w-[300px] h-[300px] rounded-full border-[20px] border-theme-white/5 animate-pulse"></div>
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 w-[200px] h-[200px] rounded-full border-[20px] border-theme-white/5 animate-pulse delay-75"></div>
                    </div>

                </div>
            </div>
        </section>
    );
}

function ArrowRight({ className }: { className?: string }) {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>;
}

function PlayIcon({ className }: { className?: string }) {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M8 5v14l11-7z" /></svg>;
}

function MicIcon({ className }: { className?: string }) {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" x2="12" y1="19" y2="22" /></svg>;
}
