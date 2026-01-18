import AnimatedTitle from "@/app/components/CommonCom/AnimatedTitle";
import {
    ChartBar, Scale, Lock, Briefcase, Landmark, Zap, Users, Globe, ShieldCheck, CheckCircle2
} from 'lucide-react';
import Link from "next/link";

export default function StrategicPlanPage() {
    return (
        <main className="min-h-screen bg-background pt-24 md:pt-32 pb-16 md:pb-24 px-4 md:px-12 lg:px-24">
            <div className="max-w-6xl mx-auto space-y-16 md:space-y-32">

                {/* --- Header & Executive Summary --- */}
                <div className="space-y-8 md:space-y-12 text-center md:text-left">
                    <div className="text-center space-y-4 md:space-y-6">
                        <div className="flex items-center justify-center gap-3">
                            <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-red rounded-full animate-pulse"></span>
                            <span className="font-oswald text-red tracking-[0.2em] uppercase text-xs md:text-sm font-bold">Roadmap to Recovery</span>
                            <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-red rounded-full animate-pulse"></span>
                        </div>

                        <AnimatedTitle
                            text="STRATEGIC PLAN"
                            className="text-4xl md:text-7xl lg:text-8xl font-bold font-bebas text-foreground uppercase leading-none"
                        />
                        <p className="font-oswald text-foreground/60 text-base md:text-xl tracking-wider uppercase">Rebuilding Investor Confidence in Lebanon</p>
                    </div>

                    <div className="relative bg-blue border border-white/10 p-6 md:p-14 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-24 h-24 md:w-40 md:h-40 bg-white/5 rounded-bl-[60px] md:rounded-bl-[100px]"></div>
                        <div className="relative z-10">
                            <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start mb-6 md:mb-10">
                                <div className="p-3 bg-linear-to-br from-red to-red/60 rounded-lg text-white shrink-0 shadow-lg">
                                    <ChartBar className="w-6 h-6 md:w-8 md:h-8" />
                                </div>
                                <h3 className="font-bebas text-2xl md:text-4xl text-white pt-1 md:pt-2">
                                    Executive Summary
                                </h3>
                            </div>

                            <div className="font-oswald text-white/80 text-base md:text-xl leading-relaxed md:leading-loose space-y-4 md:space-y-6 text-left md:text-justify">
                                <p>
                                    With a new government in place, the question of whether Lebanon can attract investment remains highly dependent on <span className="text-white font-bold decoration-red underline decoration-2 underline-offset-4">political stability, economic reforms, and security guarantees</span>.
                                </p>
                                <p>
                                    While large-scale Foreign Direct Investment (FDI) may be premature, specific incentives targeting <span className="text-white font-bold decoration-red underline decoration-2 underline-offset-4">Lebanese diaspora, strategic sectors, and international partners</span> could create opportunities for limited, high-impact investments.
                                </p>
                                <p>
                                    This brief outlines key policy measures needed to restore confidence, attract capital, and rebuild Lebanon’s economy.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- 1. Political & Security Preconditions --- */}
                <div className="space-y-8 md:space-y-12">
                    <div className="text-center max-w-3xl mx-auto">
                        <AnimatedTitle
                            text="POLITICAL & SECURITY PRECONDITIONS"
                            className="text-3xl md:text-5xl font-bold font-bebas text-foreground uppercase leading-none"
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                        <div className="relative p-6 md:p-10 border border-white/10 bg-blue rounded-2xl md:rounded-3xl overflow-hidden shadow-xl shadow-blue/20 flex flex-col h-full">
                            <div className="absolute top-0 right-0 w-20 h-20 md:w-24 md:h-24 bg-white/5 rounded-bl-[60px] md:rounded-bl-[80px]"></div>
                            <div className="relative z-10 flex flex-col h-full gap-4 md:gap-6 text-white">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-linear-to-br from-red to-red/60 rounded-lg text-white shadow-lg">
                                        <Scale className="w-6 h-6 md:w-8 md:h-8" />
                                    </div>
                                    <span className="font-bebas text-xl md:text-2xl tracking-wide">A. Political Stability & Governance</span>
                                </div>
                                <ul className="space-y-3 md:space-y-4 font-oswald text-white/70 leading-relaxed text-base md:text-lg grow">
                                    <li className="flex gap-3"><span className="text-red">‣</span> The government must implement credible anti-corruption reforms, judicial independence, and depoliticization of state institutions.</li>
                                    <li className="flex gap-3"><span className="text-red">‣</span> Transparent governance frameworks should be introduced, including international monitoring mechanisms.</li>
                                </ul>
                            </div>
                        </div>

                        <div className="relative p-6 md:p-10 border border-white/10 bg-blue rounded-2xl md:rounded-3xl overflow-hidden shadow-xl shadow-blue/20 flex flex-col h-full">
                            <div className="absolute top-0 right-0 w-20 h-20 md:w-24 md:h-24 bg-white/5 rounded-bl-[60px] md:rounded-bl-[80px]"></div>
                            <div className="relative z-10 flex flex-col h-full gap-4 md:gap-6 text-white">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-linear-to-br from-red to-red/60 rounded-lg text-white shadow-lg">
                                        <Lock className="w-6 h-6 md:w-8 md:h-8" />
                                    </div>
                                    <span className="font-bebas text-xl md:text-2xl tracking-wide">B. Security Guarantees & Disarmament</span>
                                </div>
                                <ul className="space-y-3 md:space-y-4 font-oswald text-white/70 leading-relaxed text-base md:text-lg grow">
                                    <li className="flex gap-3"><span className="text-red">‣</span> Security risks, primarily Hezbollah’s armed presence, must be addressed via UN Resolutions 1559, 1680 & 1701.</li>
                                    <li className="flex gap-3"><span className="text-red">‣</span> International support for UNIFIL’s expanded role in monitoring border security.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- 2. Key Investment Incentives --- */}
                <div className="space-y-8 md:space-y-12">
                    <div className="text-center max-w-4xl mx-auto">
                        <AnimatedTitle
                            text="KEY INVESTMENT INCENTIVES & SECTORS"
                            className="text-3xl md:text-5xl font-bold font-bebas text-foreground uppercase leading-none"
                        />
                        <p className="font-oswald text-foreground/60 text-sm md:text-lg uppercase tracking-wider mt-2 md:mt-4">
                            Strategic opportunities for confident growth
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                        {[
                            {
                                title: "Tax Incentives & Regulatory",
                                icon: <Briefcase className="w-6 h-6 md:w-8 md:h-8" />,
                                desc: [
                                    "Corporate tax reductions for new businesses & foreign investors.",
                                    "Zero tax for repatriated capital for Lebanese expatriates.",
                                    "Protection against arbitrary capital controls."
                                ]
                            },
                            {
                                title: "Banking & Financial Sector",
                                icon: <Landmark className="w-6 h-6 md:w-8 md:h-8" />,
                                desc: [
                                    "IMF-backed financial stabilization measures to restore trust.",
                                    "Transparent capital control laws to protect foreign investors."
                                ]
                            },
                            {
                                title: "Public-Private Partnerships",
                                icon: <Zap className="w-6 h-6 md:w-8 md:h-8" />,
                                desc: [
                                    "Investment in renewable energy (solar, wind) projects.",
                                    "Internationally supervised reconstruction of Beirut Port.",
                                    "Expanding digital infrastructure & technology hubs."
                                ]
                            },
                            {
                                title: "Diaspora Investment Fund",
                                icon: <Users className="w-6 h-6 md:w-8 md:h-8" />,
                                desc: [
                                    "Establish a diaspora-focused investment vehicle backed by IMF/U.S./EU.",
                                    "Create de-risking mechanisms to incentivize expatriates."
                                ]
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="relative bg-blue border border-white/10 p-6 md:p-10 rounded-2xl md:rounded-3xl overflow-hidden shadow-xl hover:border-white/30 transition-colors">

                                <div className="relative z-10 flex flex-col items-start h-full">
                                    <div className="mb-4 md:mb-6 p-3 md:p-4 rounded-xl md:rounded-2xl bg-linear-to-br from-red to-red/60 text-white border border-white/10 shadow-lg">
                                        {item.icon}
                                    </div>

                                    <h3 className="font-bebas text-2xl md:text-4xl text-white mb-4 md:mb-6">
                                        {item.title}
                                    </h3>

                                    <ul className="space-y-3 md:space-y-4 font-oswald text-white/70 text-base md:text-lg leading-relaxed grow">
                                        {item.desc.map((d, i) => (
                                            <li key={i} className="flex gap-3 items-start">
                                                <span className="w-1.5 h-1.5 bg-red rounded-full mt-2 shrink-0 opacity-70 transition-opacity"></span>
                                                <span>{d}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="mt-6 md:mt-8 w-12 h-0.5 bg-white/10 transition-all duration-700"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- 3. Strategic Partnerships --- */}
                <div className="space-y-8 md:space-y-12">
                    <div className="text-center max-w-3xl mx-auto">
                        <AnimatedTitle
                            text="STRATEGIC INTERNATIONAL PARTNERSHIPS"
                            className="text-3xl md:text-5xl font-bold font-bebas text-foreground uppercase leading-none"
                        />
                        <p className="font-oswald text-foreground/60 text-sm md:text-lg uppercase tracking-wider mt-2 md:mt-4">
                            Building bridges for economic stability
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                        {/* Card 1 */}
                        <div className="relative bg-blue border border-white/10 p-6 md:p-10 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:border-white/30">
                            <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 transition-colors duration-500"></div>

                            <div className="relative z-10 flex flex-col gap-6 md:gap-8 h-full">
                                <div className="flex items-center gap-4 md:gap-6">
                                    <div className="w-12 h-12 md:w-16 md:h-16 bg-linear-to-br from-red to-red/60 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform duration-300">
                                        <Globe className="w-6 h-6 md:w-8 md:h-8" />
                                    </div>
                                    <div>
                                        <h3 className="font-bebas text-2xl md:text-4xl text-white transition-colors">Gulf & Western Allies</h3>
                                        <span className="font-oswald text-white/40 text-xs md:text-sm uppercase tracking-widest">Global Cooperation</span>
                                    </div>
                                </div>

                                <p className="font-oswald text-white/70 text-base md:text-xl leading-relaxed">
                                    Strengthen economic ties with the United States, Saudi Arabia, UAE, and France, leveraging financial support and trade partnerships. Encourage U.S./EU-led economic recovery programs to rebuild investor confidence.
                                </p>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="relative bg-blue border border-white/10 p-6 md:p-10 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:border-white/30">
                            <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 transition-colors duration-500"></div>

                            <div className="relative z-10 flex flex-col gap-6 md:gap-8 h-full">
                                <div className="flex items-center gap-4 md:gap-6">
                                    <div className="w-12 h-12 md:w-16 md:h-16 bg-linear-to-br from-red to-red/60 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform duration-300">
                                        <ShieldCheck className="w-6 h-6 md:w-8 md:h-8" />
                                    </div>
                                    <div>
                                        <h3 className="font-bebas text-2xl md:text-4xl text-white transition-colors">Oversight & Guarantees</h3>
                                        <span className="font-oswald text-white/40 text-xs md:text-sm uppercase tracking-widest">Security & Compliance</span>
                                    </div>
                                </div>

                                <p className="font-oswald text-white/70 text-base md:text-xl leading-relaxed">
                                    Foreign investment protection through international dispute resolution mechanisms to safeguard against corruption. Strengthening Lebanon’s trade agreements with key partners, including the U.S. and EU.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- 4. Conclusion (Full Content) --- */}
                <div className="relative w-full overflow-hidden rounded-2xl md:rounded-3xl">
                    <div className="absolute inset-0 bg-blue"></div>
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-linear-to-t from-black/50 to-transparent"></div>

                    <div className="relative z-10 p-8 md:p-24 flex flex-col items-center text-center">
                        <div className="mb-6 md:mb-8 p-3 md:p-4 bg-linear-to-br from-red to-red/60 rounded-full text-white animate-pulse">
                            <CheckCircle2 className="w-8 h-8 md:w-12 md:h-12" />
                        </div>

                        <h2 className="text-4xl md:text-7xl font-bebas text-white mb-6 md:mb-8 leading-[0.9]">
                            Conclusion: <br />
                            <span className="text-red">A Phased Approach to Recovery</span>
                        </h2>

                        <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
                            <p className="font-oswald text-base md:text-2xl text-white/80 leading-relaxed">
                                Lebanon’s road to economic recovery requires a balanced approach by <span className="text-white font-bold">prioritizing stability, strategic incentives, and international partnerships</span>. While full-scale investment remains a challenge, targeted reforms can lay the foundation for future investor confidence.
                            </p>

                            <div className="h-px w-24 md:w-32 bg-linear-to-r from-transparent via-red to-transparent mx-auto"></div>

                            <p className="font-oswald text-sm md:text-xl text-white/60 leading-relaxed uppercase tracking-wide">
                                The American Lebanon Education Foundation advocates for a structured Investment Protection & Economic Recovery Plan, ensuring that Lebanon can transition from crisis management to sustainable economic growth.
                            </p>
                        </div>
                    </div>

                    {/* Decorative side accents */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-20 md:h-32 bg-linear-to-b from-transparent via-red to-transparent opacity-50"></div>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-20 md:h-32 bg-linear-to-b from-transparent via-red to-transparent opacity-50"></div>
                </div>

                {/* --- DOWNLOAD DOCUMENT BUTTON --- */}
                <div className="flex justify-center pt-4 md:pt-8 relative z-10">
                    <Link
                        href="/about/ALEF_Strategic_Plan.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <button className="group relative bg-transparent border border-foreground/70 text-foreground px-12 py-4 text-sm font-bold tracking-[0.2em] uppercase font-oswald overflow-hidden transition-all hover:border-foreground/50 isolate cursor-pointer">
                            <span className="relative z-10 group-hover:text-background transition-colors duration-300">
                                READ FULL PLAN
                            </span>
                            <div className="absolute inset-0 bg-foreground transform scale-y-0 origin-top group-hover:scale-y-100 group-hover:origin-bottom transition-transform duration-500 ease-out -z-10"></div>
                        </button>
                    </Link>
                </div>

            </div>
        </main>
    );
}