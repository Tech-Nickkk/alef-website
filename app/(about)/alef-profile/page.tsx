import AnimatedTitle from "@/app/components/CommonCom/AnimatedTitle";
import Link from "next/link";
import { ShieldAlert, Gavel, Radio, Mic2, ShieldCheck, TrendingUp, AlarmClock, Quote } from "lucide-react"; 

export default function AlefProfilePage() {
    return (
        <main className="min-h-screen bg-background pt-24 md:pt-32 pb-16 md:pb-24 px-4 md:px-12 lg:px-24">
            <div className="max-w-6xl mx-auto space-y-16 md:space-y-24">

                {/* --- Header Section (Full Message) --- */}
                <div className="space-y-8 md:space-y-12 text-center md:text-left">
                    <div className="text-center space-y-4 md:space-y-6">
                        <div className="flex items-center justify-center gap-3">
                            <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-red rounded-full animate-pulse"></span>
                            <span className="font-oswald text-red tracking-[0.2em] uppercase text-xs md:text-sm font-bold">About The Foundation</span>
                            <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-red rounded-full animate-pulse"></span>
                        </div>

                        <AnimatedTitle
                            text="ALEF PROFILE"
                            className="text-4xl md:text-7xl lg:text-8xl font-bold font-bebas text-foreground uppercase leading-none"
                        />
                    </div>

                    {/* Updated Chairman's Letter Card - Static */}
                    <div className="relative bg-blue border border-white/10 p-6 md:p-14 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                        {/* Decorative Corner */}
                        <div className="absolute top-0 right-0 w-24 h-24 md:w-40 md:h-40 bg-white/5 rounded-bl-[60px] md:rounded-bl-[100px]"></div>
                        
                        <div className="relative z-10">
                            <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start mb-6 md:mb-10">
                                <div className="p-3 bg-linear-to-br from-red to-red/60 rounded-lg text-white shrink-0 shadow-lg">
                                    <Quote className="w-6 h-6 md:w-8 md:h-8" />
                                </div>
                                <h3 className="font-bebas text-2xl md:text-4xl text-white pt-1 md:pt-2 leading-tight">
                                    Dear Patriots and Friends of Freedom and Prosperity,
                                </h3>
                            </div>

                            <div className="font-oswald text-white/80 text-base md:text-xl leading-relaxed md:leading-loose space-y-6 text-left md:text-justify">
                                <p>
                                    First off, and as the new year unfolds, I personally wish you and your loved ones good health, clarity of purpose, and steady progress toward all that matters most to you. May the year ahead bring meaningful moments, renewed energy, and opportunities beyond your wildest imagination.
                                </p>
                                <p>
                                    Having said that, it is with great pride and anticipation that I announce a watershed moment in the American Lebanon Foundation (ALEF) and American Lebanon Political Action Committee (ALPAC) unwavering missions to fortify America's Lebanon’s foundations and effectively lobby the US Administration on behalf of Lebanon.
                                </p>
                                <p>
                                    We are unveiling today our cutting-edge digital website platform, a beacon of wisdom and intelligence in our ever-evolving digital landscape.
                                </p>
                                <p>
                                    Lebanon stands today at the edge of complete institutional collapse. Its democracy, economy, and sovereignty are under siege by Hezbollah—a globally designated terrorist organization entrenched in every layer of government, finance, and daily life. Corruption, clientelism, and militant dominance have left a proud nation defenseless and the Lebanese people voiceless.
                                </p>
                                <div className="text-white font-bold border-l-4 border-red pl-4 md:pl-6 py-3 md:py-4 bg-white/5 rounded-r-lg text-sm md:text-xl">
                                    We are done watching. We are acting. This is no longer a time for hope; it is a time for action. The tree of liberty needs periodic refreshment if we are ever to build a real state.
                                </div>
                                <p>
                                    We, Lebanese and American patriots are hereby launching as of today an alternative national salvation plan second to none and are the ONLY American Lebanon Political Action Committee of its kind in the land.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- WHO WE ARE (Blue Cards - Static) --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    <div className="relative p-6 md:p-10 border border-white/10 bg-blue rounded-2xl md:rounded-3xl overflow-hidden shadow-xl shadow-blue/20 flex flex-col h-full">
                        <div className="absolute top-0 right-0 p-4 md:p-6">
                            <div className="w-3 h-3 md:w-4 md:h-4 bg-red rounded-full shadow-[0_0_15px_rgba(220,38,38,1)]"></div>
                        </div>
                        <div className="relative z-10 flex flex-col h-full gap-4 md:gap-6 text-white">
                            <span className="font-oswald text-xs md:text-sm tracking-widest text-white/60 uppercase">The Foundation</span>
                            <span className="font-bebas text-5xl md:text-6xl">ALEF</span>
                            <p className="font-oswald text-sm md:text-base text-white/80 leading-relaxed grow">
                                A global force of Lebanese and American professionals, activists, and policy experts committed to dismantling corruption, restoring governance, and advocating for Lebanon’s rightful place.
                            </p>
                            <div className="mt-6 md:mt-auto pt-6 md:pt-8 border-t border-white/10">
                                <span className="inline-block py-2 px-3 md:px-4 rounded bg-white/10 border border-white/10 text-white font-oswald text-[10px] md:text-xs tracking-[0.2em] font-bold uppercase">Open to citizens of any nationality</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative p-6 md:p-10 border border-white/10 bg-blue rounded-2xl md:rounded-3xl overflow-hidden shadow-xl shadow-blue/20 flex flex-col h-full">
                        <div className="absolute top-0 right-0 p-4 md:p-6">
                            <div className="w-3 h-3 md:w-4 md:h-4 bg-red rounded-full shadow-[0_0_15px_rgba(220,38,38,1)]"></div>
                        </div>
                        <div className="relative z-10 flex flex-col h-full gap-4 md:gap-6 text-white">
                            <span className="font-oswald text-xs md:text-sm tracking-widest text-white/60 uppercase">The Political Arm</span>
                            <span className="font-bebas text-5xl md:text-6xl">ALPAC</span>
                            <p className="font-oswald text-sm md:text-base text-white/80 leading-relaxed grow">
                                The ONLY American Lebanon Political Action Committee of its kind, dedicated to direct political lobbying and legislative influence in the United States.
                            </p>
                            <div className="mt-6 md:mt-auto pt-6 md:pt-8 border-t border-white/10">
                                <span className="inline-block py-2 px-3 md:px-4 rounded bg-white/10 border border-white/10 text-white font-oswald text-[10px] md:text-xs tracking-[0.2em] font-bold uppercase">Open only to US citizens</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Hezbollah Accountability Act (Static UI) --- */}
                <div className="relative bg-blue text-white rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl shadow-blue/20 border border-white/10">
                    {/* Decorative Corner */}
                    <div className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48 bg-white/5 rounded-bl-[100px] md:rounded-bl-[150px]"></div>

                    <div className="p-6 md:p-16 relative z-10">
                        <div className="flex flex-col gap-8 md:gap-12 items-start mb-10 md:mb-16 border-b border-white/10 pb-8 md:pb-12">
                            <div className="space-y-4 md:space-y-6">
                                <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-4 md:mb-6">
                                    <div className="p-3 md:p-4 bg-linear-to-br from-red to-red/60 rounded-xl text-white shadow-lg">
                                        <ShieldAlert className="w-8 h-8 md:w-10 md:h-10" />
                                    </div>
                                    <span className="inline-block py-1.5 px-3 md:py-2 md:px-4 rounded bg-white/10 border border-white/10 text-white font-oswald text-[10px] md:text-xs tracking-[0.2em] font-bold uppercase">
                                        Urgent Campaign
                                    </span>
                                </div>
                                <AnimatedTitle
                                    text="The Hezbollah Accountability Act (HAA)"
                                    className="text-3xl md:text-6xl font-bold font-bebas text-white/95 uppercase leading-none tracking-wide"
                                />
                                <p className="font-oswald text-base md:text-xl text-white/80 leading-relaxed max-w-3xl">
                                    We are launching the HAA to dismantle the networks that hold Lebanon hostage. This is not a think tank; this is a political action committee building pressure at every level.
                                </p>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            {[
                                { title: "Disrupt Financing", desc: "Disrupt global financing and influence networks." },
                                { title: "Pressure Congress", desc: "Pressure U.S. Congress & White House for stricter sanctions." },
                                { title: "Mobilize Diaspora", desc: "Mobilize diaspora to influence policy & reshape narratives." },
                                { title: "Target Key Actors", desc: "Target financial sector main actors (bankers, ministers)." }
                            ].map((item, idx) => (
                                <div key={idx} className="flex gap-4 md:gap-6 p-6 md:p-8 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl items-start">
                                    <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-lg bg-linear-to-br from-red to-red/60 font-bebas text-xl md:text-2xl text-white shrink-0">
                                        0{idx + 1}
                                    </div>
                                    <div>
                                        <h4 className="font-bebas text-xl md:text-2xl mb-2 text-white">{item.title}</h4>
                                        <p className="font-oswald text-sm md:text-lg text-white/70 leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* --- Why Support Matters (Static) --- */}
                <div className="space-y-8 md:space-y-12">
                    <div className="text-center max-w-3xl mx-auto">
                        <AnimatedTitle
                            text="Why Your Support Matters"
                            className="text-4xl md:text-6xl font-bold font-bebas text-foreground uppercase leading-none"
                        />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {[
                            { icon: <Gavel className="w-6 h-6 md:w-8 md:h-8" />, title: "Task Force", desc: "Launch a National HAA Task Force of legal, financial, and intelligence experts." },
                            { icon: <Radio className="w-6 h-6 md:w-8 md:h-8" />, title: "Media Ops", desc: "Scale targeted media operations to reframe Lebanon’s story globally." },
                            { icon: <Mic2 className="w-6 h-6 md:w-8 md:h-8" />, title: "Advocacy", desc: "Drive high-level advocacy events featuring lawmakers and donors." },
                            { icon: <ShieldCheck className="w-6 h-6 md:w-8 md:h-8" />, title: "Guardians", desc: "Build the 'Guardians of Sovereignty' donor program for real-time access." }
                        ].map((tier, idx) => (
                            <div key={idx} className="relative p-6 md:p-8 border border-white/10 bg-blue rounded-2xl md:rounded-3xl overflow-hidden shadow-lg group hover:border-white/30 transition-colors">
                                <div className="relative z-10 flex flex-col h-full gap-4 md:gap-6 text-white">
                                    <div className="w-12 h-12 md:w-14 md:h-14 bg-linear-to-br from-red to-red/60 rounded-xl flex items-center justify-center text-white border-white/10 shadow-lg shadow-red/20 shrink-0">
                                        {tier.icon}
                                    </div>
                                    <div>
                                        <span className="font-bebas text-2xl md:text-3xl block mb-2 md:mb-4">{tier.title}</span>
                                        <p className="font-oswald text-sm text-white/70 leading-relaxed">
                                            {tier.desc}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- Why Now (Static) --- */}
                <div className="border-t border-foreground/10 pt-16 md:pt-20">
                    <div className="max-w-6xl mx-auto space-y-12 md:space-y-16">
                        <div className="text-center">
                            <AnimatedTitle
                                text="Why Now?"
                                className="text-4xl md:text-6xl font-bold font-bebas text-foreground uppercase leading-none"
                            />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                            {/* Opportunity Card */}
                            <div className="relative p-6 md:p-10 border border-white/10 rounded-2xl md:rounded-3xl bg-blue text-white overflow-hidden shadow-xl">
                                <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-white/5 rounded-bl-[80px] md:rounded-bl-[100px]"></div>
                                <div className="relative z-10 flex flex-col gap-4 md:gap-6">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-linear-to-br from-red to-red/60 rounded-lg text-white shadow-lg shadow-red/20">
                                            <TrendingUp className="w-6 h-6 md:w-8 md:h-8" />
                                        </div>
                                        <span className="text-white font-bebas text-2xl md:text-3xl tracking-wide">OPPORTUNITY</span>
                                    </div>
                                    <h3 className="font-oswald text-white/80 text-xl md:text-3xl leading-snug">
                                        Bipartisan concern in Washington is growing—we must seize this window.
                                    </h3>
                                    <p className="font-oswald text-white/60 text-base md:text-lg">
                                        The current U.S. administration is our best ally. We have a unique chance to push for policies that support a free Lebanon.
                                    </p>
                                </div>
                            </div>

                            {/* Urgency Card */}
                            <div className="relative p-6 md:p-10 border border-white/10 rounded-2xl md:rounded-3xl bg-blue text-white overflow-hidden shadow-xl">
                                <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-white/5 rounded-bl-[80px] md:rounded-bl-[100px]"></div>
                                <div className="relative z-10 flex flex-col gap-4 md:gap-6">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-linear-to-br from-red to-red/60 rounded-lg text-white shadow-lg shadow-red/20">
                                            <AlarmClock className="w-6 h-6 md:w-8 md:h-8" />
                                        </div>
                                        <span className="text-white font-bebas text-2xl md:text-3xl tracking-wide">URGENCY</span>
                                    </div>
                                    <h3 className="font-oswald text-white/80 text-xl md:text-3xl leading-snug">
                                        Lebanon’s people are ready. If we don’t act now, we may never have another chance.
                                    </h3>
                                    <p className="font-oswald text-white/60 text-base md:text-lg">
                                        The socio-economic collapse is accelerating. Every day we wait is a day lost to corruption and decay.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- DOWNLOAD DOCUMENT BUTTON --- */}
                <div className="flex justify-center pt-8 md:pt-12 relative z-10">
                    <Link
                        href="https://docs.google.com/document/d/e/2PACX-1vS6ATAXEEkAVf3wN73K58zLHP67RzgUbgs0q8k8mDoEUldUkfC_36bjuD4KBc-mdw/pub"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <button className="group relative bg-transparent border border-foreground/70 text-foreground px-12 py-4 text-sm font-bold tracking-[0.2em] uppercase font-oswald overflow-hidden transition-all hover:border-foreground/50 isolate cursor-pointer">
                            <span className="relative z-10 group-hover:text-background transition-colors duration-300">
                                READ FULL PROFILE
                            </span>
                            <div className="absolute inset-0 bg-foreground transform scale-y-0 origin-top group-hover:scale-y-100 group-hover:origin-bottom transition-transform duration-500 ease-out -z-10"></div>
                        </button>
                    </Link>
                </div>
            </div>
        </main>
    );
}