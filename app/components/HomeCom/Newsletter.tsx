"use client";

import AnimatedTitle from "../CommonCom/AnimatedTitle";


export default function Newsletter() {
    return (
        <section className="relative py-24 px-6 md:px-12 lg:px-24 bg-theme-black overflow-hidden border-t border-theme-white/10">
            {/* Background Tech Elements */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-theme-white/20 to-transparent" />
                <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-theme-white/20 to-transparent" />
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-theme-white/20 to-transparent" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto w-full text-center space-y-12 bg-[#1a1a1a] border border-theme-white/10 p-12 md:p-20 rounded-3xl overflow-hidden">

                {/* Decorative pulsing dot */}
                <div className="absolute top-8 right-8 flex items-center gap-2">
                    <span className="w-2 h-2 bg-theme-accent rounded-full animate-pulse"></span>
                    <span className="font-oswald text-[10px] tracking-widest text-theme-white/40">LIVE_FEED</span>
                </div>

                <div className="space-y-6">
                    <span className="font-oswald text-xs tracking-[0.3em] text-theme-accent uppercase">Stay Informed</span>
                    <div className="flex justify-center">
                        <AnimatedTitle
                            text="SUBSCRIBE FOR INTELLIGENCE"
                            className="text-4xl md:text-6xl lg:text-7xl font-bebas text-theme-white uppercase leading-none"
                        />
                    </div>
                </div>

                {/* Subtitle */}
                <p className="text-theme-white/60 font-oswald text-lg md:text-xl max-w-2xl mx-auto">
                    Get The Latest Research And Updates On Terrorism In Lebanon Delivered To Your Inbox.
                </p>

                {/* Input Form */}
                <div className="max-w-xl mx-auto pt-4 relative">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative group">
                            <input
                                type="email"
                                placeholder="ENTER SECURE EMAIL"
                                className="w-full bg-theme-black border border-theme-white/20 text-theme-white px-6 py-4 outline-none font-oswald text-lg focus:border-theme-accent/50 transition-colors uppercase placeholder:text-theme-white/20"
                            />
                            <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-theme-accent group-hover:w-full transition-all duration-500"></div>
                        </div>
                        <button className="bg-theme-accent hover:bg-[#b0151b] text-theme-white px-10 py-4 font-bold tracking-wider transition-all font-oswald uppercase hover:shadow-[0_0_20px_rgba(227,27,35,0.4)]">
                            Subscribe
                        </button>
                    </div>
                    <div className="text-left mt-4 text-[10px] text-theme-white/30 font-oswald uppercase tracking-widest">
                        * Data encrypted. No third-party sharing.
                    </div>
                </div>
            </div>
        </section>
    );
}
