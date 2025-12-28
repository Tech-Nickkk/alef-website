import AnimatedTitle from "../../components/CommonCom/AnimatedTitle";
import { ShieldCheck, HardHat, ChartBar, Globe, Building2, Scale } from 'lucide-react';

export default function StrategicPlanPage() {
    return (
        <div className="bg-theme-black min-h-screen flex flex-col relative overflow-hidden">

            <main className="grow pt-32 px-4 md:px-8 lg:px-12 max-w-[1400px] mx-auto w-full z-10 relative">

                {/* Header */}
                <div className="mb-16 text-center max-w-5xl mx-auto">
                    <AnimatedTitle
                        text="Rebuilding Investor Confidence"
                        className="text-5xl md:text-7xl font-bebas text-theme-white mb-6 justify-center flex"
                    />
                    <div className="h-1 w-24 bg-theme-accent mx-auto mb-8"></div>
                    <p className="font-oswald text-xl md:text-2xl text-theme-white/70 max-w-3xl mx-auto leading-relaxed">
                        Our strategic plan to restore confidence, attract capital, and rebuild Lebanon’s economy through stability, reforms, and partnership.
                    </p>
                </div>

                {/* Executive Summary Box */}
                <div className="bg-card-bg border border-theme-white/10 p-12 mb-24 rounded-2xl relative overflow-hidden group hover:border-theme-accent/50 transition-all duration-300">
                    <div className="absolute top-0 right-0 p-12 text-theme-white/5 group-hover:text-theme-accent/10 transition-colors duration-500">
                        <ChartBar className="w-40 h-40" />
                    </div>
                    <h2 className="text-3xl font-bebas text-white mb-6 relative z-10">Executive Summary</h2>
                    <p className="font-oswald text-white/70 text-lg leading-loose relative z-10 max-w-4xl">
                        With a new government in place, attracting investment depends on political stability, economic reforms, and security guarantees.
                        While large-scale Foreign Direct Investment (FDI) may be premature, we propose specific incentives targeting the Lebanese diaspora,
                        strategic sectors, and international partners to create opportunities for high-impact investments.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">

                    {/* Section 1: Preconditions */}
                    <section>
                        <div className="flex items-center gap-4 mb-8">
                            <span className="text-6xl font-bebas text-theme-white/70">01</span>
                            <h2 className="text-3xl font-bebas text-theme-white">Political & Security Preconditions</h2>
                        </div>
                        <div className="space-y-6">
                            <div className="bg-card-bg border border-theme-white/10 p-8 rounded-xl hover:border-theme-accent/50 transition-colors duration-300">
                                <div className="flex items-center gap-6 mb-4">
                                    <div className="p-3 bg-theme-white/5 rounded-lg text-theme-accent">
                                        <Scale className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-2xl font-bebas text-white">Governance Reforms</h3>
                                </div>
                                <p className="font-oswald text-white/60 leading-relaxed">
                                    Implementation of credible anti-corruption reforms, judicial independence, and depoliticization of state institutions.
                                    Transparent governance frameworks and international monitoring mechanisms are essential.
                                </p>
                            </div>

                            <div className="bg-card-bg border border-theme-white/10 p-8 rounded-xl hover:border-theme-accent/50 transition-colors duration-300">
                                <div className="flex items-center gap-6 mb-4">
                                    <div className="p-3 bg-theme-white/5 rounded-lg text-theme-accent">
                                        <ShieldCheck className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-2xl font-bebas text-white">Security Guarantees</h3>
                                </div>
                                <p className="font-oswald text-white/60 leading-relaxed">
                                    Addressing security risks through compliance with UN Resolutions 1559, 1680 & 1701.
                                    Supporting UNIFIL’s expanded role in monitoring border security.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section 2: Investment Incentives */}
                    <section>
                        <div className="flex items-center gap-4 mb-8">
                            <span className="text-6xl font-bebas text-theme-white/70">02</span>
                            <h2 className="text-3xl font-bebas text-theme-white">Key Incentives & Growth Sectors</h2>
                        </div>
                        <div className="space-y-6">
                            <div className="bg-card-bg border border-theme-white/10 p-8 rounded-xl hover:border-theme-accent/50 transition-colors duration-300">
                                <div className="flex items-center gap-6 mb-4">
                                    <div className="p-3 bg-theme-white/5 rounded-lg text-theme-accent">
                                        <Building2 className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-2xl font-bebas text-white">Tax & Regulatory</h3>
                                </div>
                                <ul className="list-disc list-inside font-oswald text-white/60 space-y-2 ml-2">
                                    <li>Corporate tax reductions for new businesses.</li>
                                    <li>Zero tax for repatriated capital for diaspora.</li>
                                    <li>Protection against arbitrary capital controls.</li>
                                </ul>
                            </div>

                            <div className="bg-card-bg border border-theme-white/10 p-8 rounded-xl hover:border-theme-accent/50 transition-colors duration-300">
                                <div className="flex items-center gap-6 mb-4">
                                    <div className="p-3 bg-theme-white/5 rounded-lg text-theme-accent">
                                        <HardHat className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-2xl font-bebas text-white">Infrastructure (PPPs)</h3>
                                </div>
                                <p className="font-oswald text-white/60 leading-relaxed">
                                    Investment in renewable energy (solar, wind). Internationally supervised reconstruction of Beirut Port.
                                    Expanding digital infrastructure & technology hubs.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Section 3: Partnerships */}
                <section className="mb-20 pt-10 border-t border-theme-white/10">
                    <h2 className="text-4xl font-bebas text-theme-white mb-12 text-center">Strategic International Partnerships</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex items-start p-8 bg-card-bg border border-theme-white/10 rounded-xl hover:border-theme-accent/50 transition-all duration-300 gap-6">
                            <div className="mt-1 text-theme-accent">
                                <Globe className="w-10 h-10" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bebas text-white mb-3">Gulf & Western Allies</h3>
                                <p className="font-oswald text-white/60 leading-relaxed">
                                    Strengthen economic ties with the United States, Saudi Arabia, UAE, and France.
                                    Encourage U.S./EU-led economic recovery programs.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start p-8 bg-card-bg border border-theme-white/10 rounded-xl hover:border-theme-accent/50 transition-all duration-300 gap-6">
                            <div className="mt-1 text-theme-accent">
                                <ShieldCheck className="w-10 h-10" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bebas text-white mb-3">Investment Guarantees</h3>
                                <p className="font-oswald text-white/60 leading-relaxed">
                                    Foreign investment protection through international dispute resolution mechanisms
                                    and strengthening trade agreements for preferential status.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
}