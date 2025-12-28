"use client";

import { usePathname } from "next/navigation";
import AnimatedTitle from "./AnimatedTitle";

export default function JoinUs() {
    const pathname = usePathname();

    return (
        <section id="join-us" className="relative py-24 px-6 md:px-12 lg:px-24 bg-theme-black overflow-hidden border-t border-theme-white/10">

            <div className="relative z-10 max-w-4xl mx-auto w-full text-center space-y-12 bg-card-bg border border-theme-white/10 p-12 md:p-20 rounded-3xl overflow-hidden">


                <div className="relative z-30">
                    {/* Decorative pulsing dot */}
                    <div className="absolute -top-4 -right-4 md:-top-12 md:-right-12 flex items-center gap-2">
                        <span className="w-2 h-2 bg-theme-accent rounded-full animate-pulse"></span>
                        <span className="font-oswald text-[10px] tracking-widest text-white/40">JOIN US</span>
                    </div>

                    <div className="flex flex-col items-center space-y-2">
                        <span className="font-oswald text-xs tracking-[0.3em] text-theme-accent uppercase">Be Part of the Solution</span>
                        <div className="flex justify-center">
                            <AnimatedTitle
                                key={pathname}
                                text="JOIN THE MOVEMENT"
                                className="text-4xl md:text-6xl lg:text-7xl font-bebas text-white uppercase leading-none"
                            />
                        </div>
                    </div>

                    {/* Subtitle */}
                    <p className="text-white/60 font-oswald text-lg md:text-xl max-w-2xl mx-auto mt-8">
                        Help us build our network. Provide your contact details to join our mailing list and stay informed about our latest initiatives.
                    </p>

                    {/* Input Form */}
                    <div className="max-w-2xl mx-auto pt-8 relative space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative group">
                                <input
                                    type="text"
                                    placeholder="FULL NAME"
                                    className="w-full bg-theme-black border border-theme-white/20 text-theme-white px-6 py-4 outline-none font-oswald text-lg focus:border-theme-accent/50 transition-colors uppercase placeholder:text-gray-400"
                                />
                                <div className="absolute bottom-0 left-0 w-0 h-px bg-theme-accent group-hover:w-full transition-all duration-500"></div>
                            </div>
                            <div className="relative group">
                                <input
                                    type="email"
                                    placeholder="ENTER SECURE EMAIL"
                                    className="w-full bg-theme-black border border-theme-white/20 text-theme-white px-6 py-4 outline-none font-oswald text-lg focus:border-theme-accent/50 transition-colors uppercase placeholder:text-gray-400"
                                />
                                <div className="absolute bottom-0 left-0 w-0 h-px bg-theme-accent group-hover:w-full transition-all duration-500"></div>
                            </div>
                        </div>

                        <button className="w-full bg-theme-accent hover:bg-[#b0151b] text-white px-10 py-4 font-bold tracking-wider transition-all font-oswald uppercase hover:shadow-[0_0_20px_rgba(227,27,35,0.4)]">
                            JOIN NOW
                        </button>

                        <div className="text-left mt-4 text-[10px] text-white/30 font-oswald uppercase tracking-widest">
                            * Your information is secure. We use this to build our mailing list.
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
