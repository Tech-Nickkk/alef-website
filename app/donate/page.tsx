"use client";
import AnimatedTitle from "@/app/components/CommonCom/AnimatedTitle";
import { useState } from 'react';

export default function DonatePage() {
    const [donationType, setDonationType] = useState<'one-time' | 'monthly'>('one-time');

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

                {/* Donation Type Toggle */}
                <div className="flex justify-center">
                    <div className="relative flex items-center bg-foreground/5 p-1 rounded-full border border-foreground/10 w-[300px]">
                        {/* Sliding Active State */}
                        <div className={`absolute left-1 top-1 bottom-1 w-[calc(50%-4px)] bg-red rounded-full shadow-lg transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${donationType === 'monthly' ? 'translate-x-[calc(100%+0px)]' : 'translate-x-0'}`}></div>
                        <button
                            onClick={() => setDonationType('one-time')}
                            className={`relative z-10 flex-1 py-3 text-center font-oswald text-sm tracking-widest uppercase transition-colors duration-300 ${donationType === 'one-time'
                                ? 'text-white'
                                : 'text-foreground/60 hover:text-foreground'
                                }`}
                        >
                            One-Time
                        </button>
                        <button
                            onClick={() => setDonationType('monthly')}
                            className={`relative z-10 flex-1 py-3 text-center font-oswald text-sm tracking-widest uppercase transition-colors duration-300 ${donationType === 'monthly'
                                ? 'text-white'
                                : 'text-foreground/60 hover:text-foreground'
                                }`}
                        >
                            Monthly
                        </button>
                    </div>
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
                                <span className="font-bebas text-6xl text-foreground group-hover:text-white transition-colors duration-300">
                                    {tier.amount}{donationType === 'monthly' && <span className="text-2xl text-foreground/50 group-hover:text-white/60">/mo</span>}
                                </span>
                                <p className="font-oswald text-sm text-foreground/60 group-hover:text-white/70 leading-relaxed min-h-[40px]">
                                    {tier.desc}
                                </p>
                                <div className="pt-6 w-full">
                                    <button className="w-full py-3 bg-transparent border border-foreground/20 group-hover:border-red group-hover:bg-red text-foreground group-hover:text-white font-oswald uppercase tracking-widest text-sm transition-all duration-300">
                                        Select {donationType === 'monthly' ? 'Monthly' : ''}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Major Sponsor Section */}
                <div className="relative p-10 border border-foreground/10 bg-foreground/5 hover:bg-blue hover:border-red/50 transition-all duration-500 rounded-xl overflow-hidden group w-full">
                    <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="w-3 h-3 bg-red rounded-full shadow-[0_0_10px_rgba(220,38,38,0.8)]"></div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                        <div className="text-center md:text-left space-y-2 flex-1">
                            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                                <span className="w-1.5 h-1.5 bg-red rounded-full animate-pulse"></span>
                                <span className="font-oswald text-xs tracking-widest text-red uppercase">Visionary Circle</span>
                            </div>
                            <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4">
                                <span className="font-bebas text-5xl md:text-7xl text-foreground group-hover:text-white transition-colors duration-300">
                                    $5,000+
                                </span>
                                <h3 className="font-oswald text-xl md:text-2xl text-foreground group-hover:text-white uppercase tracking-widest">
                                    Strategic Sponsor
                                </h3>
                            </div>
                            <p className="font-oswald text-sm md:text-base text-foreground/60 group-hover:text-white/70 max-w-2xl leading-relaxed mt-2">
                                Become a pillar of our movement. Strategic sponsors receive quarterly executive briefings, exclusive access to leadership events, and permanent recognition in our annual transparency report.
                            </p>
                        </div>

                        <div className="w-full md:w-auto shrink-0">
                            <button className="w-full md:w-auto px-10 py-5 bg-transparent border border-foreground/20 group-hover:border-red group-hover:bg-red text-foreground group-hover:text-white font-oswald uppercase tracking-widest text-sm transition-all duration-300">
                                Become a Sponsor
                            </button>
                        </div>
                    </div>
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
                            Donate {donationType === 'monthly' ? 'Monthly' : 'Now'}
                        </button>
                    </div>
                </div>

                <div className="text-center space-y-4 pt-8">
                    <p className="font-oswald text-xs text-foreground/40 uppercase tracking-widest">
                        * ALEF is a registered 501(c)(3) non-profit organization. All donations are tax-deductible.
                    </p>
                    <div className="flex flex-col items-center gap-4">
                        <div className="flex justify-center gap-6 items-center flex-wrap opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                            {/* Visa */}
                            <svg className="h-8 w-auto" viewBox="0 0 50 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19.166 2.062H12.78L8.796 29.563H15.182L19.166 2.062ZM31.642 1.947H25.795C24.463 1.947 22.372 2.656 21.826 5.865L18.667 29.562H25.29L25.968 25.137H32.656L33.321 29.562H39.539L34.646 5.865C34.195 3.332 32.964 1.947 31.642 1.947ZM27.025 18.046L29.077 8.528H29.248L31.396 18.045H27.025V18.046ZM49.124 3.018C48.068 2.378 46.398 1.964 43.149 1.964C36.945 1.964 32.553 5.438 32.571 10.155C32.587 13.805 35.852 15.834 38.307 17.062C40.835 18.324 41.688 19.124 41.673 20.366C41.655 22.253 39.467 23.139 37.641 23.139C35.539 23.139 34.343 22.568 33.371 22.106L32.414 28.583C33.644 29.17 35.914 29.686 38.307 29.704C45.053 29.704 49.5 26.262 49.534 21.166C49.534 18.02 47.793 15.656 45.334 14.41C42.875 13.131 42.277 12.561 42.296 11.691C42.296 10.428 43.664 9.877 46.121 9.877C47.385 9.877 48.051 10.091 49.466 10.606L49.124 3.018ZM6.376 3.036L0.301514 29.563H6.46051L9.61951 12.158L15.366 29.563H21.572L15.939 3.036H6.376Z" fill="currentColor" />
                            </svg>
                            {/* Mastercard */}
                            <svg className="h-8 w-auto" viewBox="0 0 50 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M18.773 28.516C21.782 28.516 24.512 27.29 26.473 25.321C26.473 25.321 26.502 25.291 26.502 25.291C27.91 23.869 28.846 21.966 28.846 19.851C28.846 17.737 27.91 15.834 26.502 14.412C26.502 14.412 26.473 14.382 26.473 14.382C24.512 12.413 21.782 11.186 18.773 11.186C13.987 11.186 10.106 15.067 10.106 19.851C10.106 24.635 13.987 28.516 18.773 28.516ZM34.227 28.516C39.013 28.516 42.894 24.635 42.894 19.851C42.894 15.067 39.013 11.186 34.227 11.186C31.218 11.186 28.488 12.413 26.527 14.382C25.119 15.805 24.183 17.707 24.183 19.822C24.183 21.936 25.119 23.839 26.527 25.262C28.488 27.29 31.218 28.516 34.227 28.516Z" fill="currentColor" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M26.527 25.321C28.488 27.29 31.218 28.516 34.227 28.516C39.013 28.516 42.894 24.635 42.894 19.851C42.894 15.067 39.013 11.186 34.227 11.186C31.218 11.186 28.488 12.413 26.527 14.382C26.502 14.412 26.473 14.441 26.444 14.47C27.808 15.856 28.662 17.753 28.662 19.851C28.662 21.949 27.808 23.846 26.444 25.233C26.473 25.262 26.502 25.291 26.527 25.321Z" fillOpacity="0.8" fill="currentColor" />
                            </svg>
                            {/* Amex */}
                            <svg className="h-8 w-auto" viewBox="0 0 50 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.303 6.096H45.697V25.904H4.303V6.096ZM49.074 0H0.926C0.415 0 0 0.415 0 0.926V31.074C0 31.585 0.415 32 0.926 32H49.074C49.585 32 50 31.585 50 31.074V0.926C50 0.415 49.585 0 49.074 0Z" fill="currentColor" />
                                <path d="M12.278 18.899H9.492L9.123 20.3H7.424L10.324 12.924H12.426L14.773 20.3H12.871L12.278 18.899ZM10.873 15.341L10.059 17.584H11.724L10.873 15.341ZM33.824 16.505C33.824 15.545 33.249 14.86 32.232 14.86H30.494V18.157H32.232C33.249 18.157 33.824 17.472 33.824 16.505ZM29.071 13.565V19.658H32.122C34.194 19.658 35.212 18.421 35.212 16.505C35.212 14.59 34.194 13.565 32.122 13.565H29.071ZM18.57 19.658V13.565H20.732L21.787 17.159L22.842 13.565H25.023V19.658H23.636V15.01L22.417 19.381H21.139L19.957 15.01V19.658H18.57ZM41.865 17.53H43.917L44.805 19.658H46.339L43.861 13.565H41.865L39.387 19.658H40.941L41.865 17.53ZM42.42 16.273L43.344 18.491H41.458L42.42 16.273Z" fill="currentColor" />
                            </svg>
                            {/* PayPal */}
                            <svg className="h-8 w-auto" viewBox="0 0 50 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.5 9.5H19.5C22.5 9.5 24 10.5 24 13C24 15 23 16.5 20.5 16.5H17.5V21.5H15.5V9.5Z" fill="none" stroke="currentColor" strokeWidth="2" />
                                <text x="25" y="20" className="text-[10px] font-bold" fill="currentColor" style={{ fontFamily: 'Arial' }}>PayPal</text>
                            </svg>
                        </div>
                        <p className="font-oswald text-xs text-foreground/50 uppercase tracking-widest">
                            Secure payments via Credit Card & PayPal
                        </p>
                    </div>
                </div>

            </div>
        </main>
    );
}
