"use client";

import Image from "next/image";
import Link from "next/link";

export default function Resources() {
    return (
        <section className="py-24 px-6 md:px-12 lg:px-24 bg-white">
            <div className="max-w-[1400px] mx-auto">
                {/* Main Section Title */}
                <h2 className="text-3xl md:text-5xl lg:text-5xl text-center mb-16 leading-tight font-cormorant text-[#1a2b4b]">
                    <span className="font-bold">Latest Resources</span>
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* UPCOMING EVENTS */}
                    <div className="bg-[#f5f5f5] p-12 lg:p-16 flex flex-col justify-center relative overflow-hidden group rounded-3xl">
                        {/* Badge */}
                        <div className="absolute top-8 right-8 z-20">
                            <div className="bg-[#f0ad4e] text-white text-[10px] font-bold uppercase tracking-widest w-20 h-20 rounded-full flex items-center justify-center text-center transform rotate-12 shadow-lg leading-tight p-2 font-optima">
                                Upcoming<br />Events
                            </div>
                        </div>

                        <div className="relative z-10 max-w-sm">
                            <h2 className="text-4xl md:text-5xl font-bold text-[#1a2b4b] font-cormorant mb-6 leading-tight">
                                Events
                            </h2>

                            <p className="text-gray-600 font-optima text-lg leading-relaxed mb-8">
                                Join our upcoming discussions on post-crisis recovery and cultural resilience.
                            </p>

                            <div className="mb-8 bg-white p-6 shadow-sm border border-gray-100 max-w-[300px]">
                                <div className="text-center">
                                    <span className="block text-4xl font-bold text-[#1a2b4b] font-cormorant">24</span>
                                    <span className="block text-xs font-bold text-[#E31B23] font-optima tracking-wider uppercase mb-2">February</span>
                                    <div className="border-t border-gray-100 pt-2">
                                        <p className="font-bold text-[#1a2b4b] font-optima text-sm">Beirut Economic Forum</p>
                                        <p className="text-xs text-gray-500 font-optima">10:00 AM - Downtown</p>
                                    </div>
                                </div>
                            </div>

                            <Link href="/events">
                                <button className="bg-[#1a2b4b] hover:bg-[#2c426b] text-white px-8 py-3.5 text-sm font-semibold transition-all shadow-md font-optima rounded-none">
                                    View Full Calendar
                                </button>
                            </Link>
                        </div>

                        {/* Image / Visual for Events */}
                        <div className="absolute bottom-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
                            <div className="w-full h-full relative">
                                <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#1a2b4b] rounded-full blur-[100px] translate-x-1/3 translate-y-1/3" />
                            </div>
                        </div>
                    </div>


                    {/* PODCAST NETWORK */}
                    <div className="bg-[#f5f5f5] p-12 lg:p-16 flex flex-col justify-center relative overflow-hidden group rounded-3xl">
                        {/* Badge */}
                        <div className="absolute top-8 right-8 z-20">
                            <div className="bg-[#f0ad4e] text-white text-[10px] font-bold uppercase tracking-widest w-20 h-20 rounded-full flex items-center justify-center text-center transform rotate-12 shadow-lg leading-tight p-2 font-optima">
                                New<br />Episodes
                            </div>
                        </div>

                        <div className="relative z-10 max-w-sm">
                            <h2 className="text-4xl md:text-5xl font-bold text-[#1a2b4b] font-cormorant mb-6 leading-tight">
                                ALEF Podcast<br />Network
                            </h2>

                            <p className="text-gray-600 font-optima text-lg leading-relaxed mb-8">
                                Listen to the best in public policy audio content, featuring expert analysis and voices from the ground.
                            </p>

                            <Link href="/podcast" className="group flex items-center gap-2 text-[#1a2b4b] font-bold font-optima hover:gap-3 transition-all mb-12">
                                See all podcasts <ArrowRight className="w-5 h-5" />
                            </Link>

                            {/* Podcast Players / Links */}
                            <div className="flex gap-3">
                                <div className="w-10 h-10 bg-[#1a2b4b] rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-[#E31B23] transition-colors">
                                    <PlayIcon className="w-4 h-4" />
                                </div>
                                <div className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-[#1a2b4b] cursor-pointer hover:border-[#1a2b4b] transition-colors">
                                    <MicIcon className="w-4 h-4" />
                                </div>
                            </div>
                        </div>

                        {/* Right Side Visual -> Grid of Covers */}
                        <div className="absolute top-0 right-0 w-[45%] h-full">
                            <div className="relative h-full w-full">
                                {/* Floating Grid of Covers (Simulated) */}
                                <div className="grid grid-cols-2 gap-4 opacity-90 transform translate-x-8 translate-y-8 rotate-[-5deg] scale-110">
                                    {/* Mock Covers */}
                                    <div className="aspect-square bg-[#1a2b4b] rounded-lg shadow-lg flex items-center justify-center p-4 text-center">
                                        <span className="text-white font-cormorant font-bold text-xs uppercase">Foresight<br />Africa</span>
                                    </div>
                                    <div className="aspect-square bg-[#E31B23] rounded-lg shadow-lg flex items-center justify-center p-4 text-center mt-8">
                                        <span className="text-white font-cormorant font-bold text-xs uppercase">The<br />Current</span>
                                    </div>
                                    <div className="aspect-square bg-gray-200 rounded-lg shadow-lg flex items-center justify-center p-4 text-center">
                                        <span className="text-[#1a2b4b] font-cormorant font-bold text-[10px] uppercase">Democracy<br />In Question</span>
                                    </div>
                                    <div className="aspect-square bg-[#1a2b4b] rounded-lg shadow-lg flex items-center justify-center p-4 text-center mt-8">
                                        <span className="text-white font-cormorant font-bold text-[10px] uppercase">Metro<br />Blueprint</span>
                                    </div>
                                    <div className="aspect-square bg-white border border-gray-200 rounded-lg shadow-lg flex items-center justify-center p-4 text-center">
                                        <span className="text-[#1a2b4b] font-cormorant font-bold text-[10px] uppercase">Tech<br />Tank</span>
                                    </div>
                                </div>
                            </div>
                            {/* Gradient Fade to blend with background */}
                            <div className="absolute inset-0 bg-linear-to-r from-[#f5f5f5] via-transparent to-transparent pointer-events-none" />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

function ArrowRight({ className }: { className?: string }) {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>;
}

function PlayIcon({ className }: { className?: string }) {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M8 5v14l11-7z" /></svg>;
}

function MicIcon({ className }: { className?: string }) {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" x2="12" y1="19" y2="22" /></svg>;
}
