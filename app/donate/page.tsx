import AnimatedTitle from "@/app/components/CommonCom/AnimatedTitle";
import React from 'react';

export default function DonatePage() {
    return (
        <main className="min-h-screen bg-background pt-32 pb-24 px-6 md:px-12 lg:px-24">
            <div className="max-w-4xl mx-auto space-y-16">

                {/* Header Section */}
                <div className="text-center space-y-6">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <span className="w-2 h-2 bg-red rounded-full animate-pulse"></span>
                        <span className="font-oswald text-red tracking-[0.2em] uppercase text-sm font-bold">Support The Cause</span>
                        <span className="w-2 h-2 bg-red rounded-full animate-pulse"></span>
                    </div>

                    <AnimatedTitle
                        text="POWER THE MOVEMENT"
                        className="text-5xl md:text-7xl lg:text-8xl font-bebas text-foreground leading-none"
                    />

                    <p className="font-oswald text-foreground/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Your contribution fuels our fight for a sovereign, free, and prosperous Lebanon. Every dollar directly supports our advocacy, research, and global outreach operations.
                    </p>
                </div>

                {/* Donation Options */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { amount: "$100", label: "SUPPORTER", desc: "Support our daily operations and content creation." },
                        { amount: "$500", label: "ADVOCATE", desc: "Help fund our research papers and policy briefs." },
                        { amount: "$1,000", label: "CHAMPION", desc: "Power our international lobbying and events." }
                    ].map((tier, idx) => (
                        <div key={idx} className="group relative p-8 border border-foreground/10 bg-foreground/5 hover:bg-blue hover:border-red/50 transition-all duration-500 rounded-xl overflow-hidden cursor-pointer">
                            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <div className="w-3 h-3 bg-red rounded-full shadow-[0_0_10px_rgba(220,38,38,0.8)]"></div>
                            </div>

                            <div className="relative z-10 flex flex-col items-center text-center gap-4">
                                <span className="font-oswald text-xs tracking-widest text-foreground/50 group-hover:text-white/60 uppercase">{tier.label}</span>
                                <span className="font-bebas text-6xl text-foreground group-hover:text-white transition-colors duration-300">{tier.amount}</span>
                                <p className="font-oswald text-sm text-foreground/60 group-hover:text-white/70 leading-relaxed min-h-[40px]">
                                    {tier.desc}
                                </p>
                                <div className="pt-6 w-full">
                                    <button className="w-full py-3 bg-transparent border border-foreground/20 group-hover:border-red group-hover:bg-red text-foreground group-hover:text-white font-oswald uppercase tracking-widest text-sm transition-all duration-300">
                                        Select
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Custom Amount */}
                <div className="max-w-2xl mx-auto bg-foreground/5 border border-foreground/10 p-8 rounded-xl">
                    <div className="flex flex-col md:flex-row gap-6 items-end">
                        <div className="flex-1 space-y-2 w-full">
                            <label className="font-oswald text-xs tracking-widest text-foreground/50 uppercase">Other Amount</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-oswald text-foreground/40">$</span>
                                <input
                                    type="number"
                                    className="w-full bg-background border border-foreground/10 px-8 py-4 font-bebas text-2xl outline-none focus:border-red transition-colors"
                                    placeholder="ENTER AMOUNT"
                                />
                            </div>
                        </div>
                        <button className="w-full md:w-auto px-12 py-4 bg-red hover:bg-[#c4151c] text-white font-oswald font-bold tracking-widest uppercase transition-all shadow-lg shadow-red-500/20">
                            Donate Now
                        </button>
                    </div>
                </div>

                <div className="text-center space-y-4 pt-8">
                    <p className="font-oswald text-xs text-foreground/40 uppercase tracking-widest">
                        * ALEF is a registered 501(c)(3) non-profit organization. All donations are tax-deductible.
                    </p>
                    <div className="flex justify-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Placeholder for payment icons */}
                        <div className="h-8 w-12 bg-foreground/10 rounded"></div>
                        <div className="h-8 w-12 bg-foreground/10 rounded"></div>
                        <div className="h-8 w-12 bg-foreground/10 rounded"></div>
                        <div className="h-8 w-12 bg-foreground/10 rounded"></div>
                    </div>
                </div>

            </div>
        </main>
    );
}
