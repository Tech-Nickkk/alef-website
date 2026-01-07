import AnimatedTitle from "../../components/CommonCom/AnimatedTitle";
import { ShieldCheck, HardHat, ChartBar, Globe, Building2, Scale, Landmark, Users, Briefcase, Zap, Lock } from 'lucide-react';

export default function StrategicPlanPage() {
    return (
        <div className="bg-background min-h-screen flex flex-col relative overflow-hidden">

            <main className="grow pt-32 px-4 md:px-8 lg:px-12 max-w-[1400px] mx-auto w-full z-10 relative">

                {/* --- HEADER --- */}
                <div className="mb-16 text-center max-w-5xl mx-auto">
                    <AnimatedTitle
                        text="Rebuilding Investor Confidence"
                        className="text-5xl md:text-7xl font-bebas text-foreground mb-6 justify-center flex"
                    />
                    <div className="h-1 w-24 bg-red mx-auto mb-8"></div>
                    <p className="font-oswald text-xl md:text-2xl text-foreground/70 max-w-3xl mx-auto leading-relaxed uppercase tracking-wider">
                        Our Strategic Plan for Lebanon
                    </p>
                </div>

                {/* --- EXECUTIVE SUMMARY --- */}
                <div className="bg-blue border border-white/10 p-10 md:p-14 mb-24 rounded-2xl relative overflow-hidden group hover:border-red/50 transition-all duration-300">
                    <div className="absolute top-0 right-0 p-12 text-white/5 group-hover:text-red/10 transition-colors duration-500">
                        <ChartBar className="w-64 h-64" />
                    </div>
                    <h2 className="text-4xl font-bebas text-white mb-6 relative z-10">Executive Summary</h2>
                    <div className="font-oswald text-white/80 text-lg leading-loose relative z-10 max-w-4xl space-y-6">
                        <p>
                            With a new government in place, the question of whether Lebanon can attract investment remains highly dependent on <span className="text-white font-bold">political stability, economic reforms, and security guarantees</span>.
                        </p>
                        <p>
                            While large-scale Foreign Direct Investment (FDI) may be premature, specific incentives targeting <span className="text-white font-bold">Lebanese diaspora, strategic sectors, and international partners</span> could create opportunities for limited, high-impact investments.
                        </p>
                        <p>
                            This brief outlines key policy measures needed to restore confidence, attract capital, and rebuild Lebanon’s economy.
                        </p>
                    </div>
                </div>

                {/* --- 1. POLITICAL & SECURITY PRECONDITIONS --- */}
                <section className="mb-24">
                    <div className="flex items-end gap-4 mb-10 border-b border-foreground/10 pb-4">
                        <span className="text-7xl font-bebas text-red leading-[0.8]">01</span>
                        <h2 className="text-4xl font-bebas text-foreground mb-1">Political & Security Preconditions</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* A. Political Stability */}
                        <div className="bg-background border border-foreground/10 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-red/10 rounded-lg text-red"><Scale className="w-6 h-6" /></div>
                                <h3 className="text-2xl font-bebas text-foreground">A. Political Stability & Governance</h3>
                            </div>
                            <ul className="space-y-4 font-oswald text-foreground/70 leading-relaxed list-disc list-inside">
                                <li>The government must implement <strong>credible anti-corruption reforms</strong>, judicial independence, and depoliticization of state institutions to regain investor trust.</li>
                                <li><strong>Transparent governance frameworks</strong> should be introduced, including international monitoring mechanisms to enforce accountability.</li>
                            </ul>
                        </div>

                        {/* B. Security Guarantees */}
                        <div className="bg-background border border-foreground/10 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-red/10 rounded-lg text-red"><Lock className="w-6 h-6" /></div>
                                <h3 className="text-2xl font-bebas text-foreground">B. Security Guarantees & Disarmament</h3>
                            </div>
                            <ul className="space-y-4 font-oswald text-foreground/70 leading-relaxed list-disc list-inside">
                                <li>Lebanon’s security risks, primarily Hezbollah’s armed presence, must be addressed through compliance with <strong>UN Resolutions 1559, 1680 & 1701</strong>.</li>
                                <li>International support for <strong>UNIFIL’s expanded role</strong> in monitoring border security can help create a more predictable investment environment.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* --- 2. KEY INVESTMENT INCENTIVES --- */}
                <section className="mb-24">
                    <div className="flex items-end gap-4 mb-10 border-b border-foreground/10 pb-4">
                        <span className="text-7xl font-bebas text-red leading-[0.8]">02</span>
                        <h2 className="text-4xl font-bebas text-foreground mb-1">Key Investment Incentives & Sectors</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* A. Tax Incentives */}
                        <div className="bg-blue border border-white/10 p-8 rounded-xl text-white">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-white/10 rounded-lg text-white"><Briefcase className="w-6 h-6" /></div>
                                <h3 className="text-2xl font-bebas">A. Tax Incentives & Regulatory</h3>
                            </div>
                            <ul className="space-y-3 font-oswald text-white/70 list-disc list-inside">
                                <li>Corporate tax reductions for new businesses and foreign investors.</li>
                                <li><strong>Zero tax for repatriated capital</strong> for Lebanese expatriates investing in Lebanon.</li>
                                <li>Protection against arbitrary capital controls or future banking collapses through a clear financial reform framework.</li>
                            </ul>
                        </div>

                        {/* B. Banking Reforms */}
                        <div className="bg-blue border border-white/10 p-8 rounded-xl text-white">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-white/10 rounded-lg text-white"><Landmark className="w-6 h-6" /></div>
                                <h3 className="text-2xl font-bebas">B. Banking & Financial Sector</h3>
                            </div>
                            <ul className="space-y-3 font-oswald text-white/70 list-disc list-inside">
                                <li><strong>IMF-backed financial stabilization measures</strong> must be implemented to restore trust in Lebanon’s banking sector.</li>
                                <li>Capital control laws should be transparent, structured, and protect foreign investors from arbitrary asset seizures.</li>
                            </ul>
                        </div>

                        {/* C. PPPs */}
                        <div className="bg-blue border border-white/10 p-8 rounded-xl text-white">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-white/10 rounded-lg text-white"><Zap className="w-6 h-6" /></div>
                                <h3 className="text-2xl font-bebas">C. Public-Private Partnerships</h3>
                            </div>
                            <ul className="space-y-3 font-oswald text-white/70 list-disc list-inside">
                                <li>Investment in <strong>renewable energy (solar, wind)</strong> projects to address Lebanon’s energy crisis.</li>
                                <li>Internationally supervised reconstruction of <strong>Beirut Port</strong>, similar to the Singapore Port model, to ensure efficiency.</li>
                                <li>Expanding digital infrastructure & technology hubs.</li>
                            </ul>
                        </div>

                        {/* D. Diaspora Fund */}
                        <div className="bg-blue border border-white/10 p-8 rounded-xl text-white">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-white/10 rounded-lg text-white"><Users className="w-6 h-6" /></div>
                                <h3 className="text-2xl font-bebas">D. Lebanese Diaspora Investment Fund</h3>
                            </div>
                            <ul className="space-y-3 font-oswald text-white/70 list-disc list-inside">
                                <li>Establish a <strong>diaspora-focused investment vehicle</strong>, backed by IMF, U.S., EU, and GCC partners.</li>
                                <li>Create <strong>de-risking mechanisms</strong> to incentivize expatriates to reinvest in Lebanon’s economy.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* --- 3. STRATEGIC PARTNERSHIPS --- */}
                <section className="mb-24">
                    <div className="flex items-end gap-4 mb-10 border-b border-foreground/10 pb-4">
                        <span className="text-7xl font-bebas text-red leading-[0.8]">03</span>
                        <h2 className="text-4xl font-bebas text-foreground mb-1">Strategic International Partnerships</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-background border border-foreground/10 p-8 rounded-xl">
                            <h3 className="text-2xl font-bebas text-foreground mb-4">A. Engaging with Gulf & Western Allies</h3>
                            <p className="font-oswald text-foreground/70 leading-relaxed mb-4">
                                Strengthen economic ties with the <strong>United States, Saudi Arabia, UAE, and France</strong>, leveraging financial support and trade partnerships. Encourage U.S./EU-led economic recovery programs to rebuild investor confidence.
                            </p>
                        </div>
                        <div className="bg-background border border-foreground/10 p-8 rounded-xl">
                            <h3 className="text-2xl font-bebas text-foreground mb-4">B. Oversight & Investment Guarantees</h3>
                            <p className="font-oswald text-foreground/70 leading-relaxed mb-4">
                                Foreign investment protection through <strong>international dispute resolution mechanisms</strong> to safeguard against corruption. Strengthening Lebanon’s trade agreements with key partners, including the U.S. and EU, for preferential trade status.
                            </p>
                        </div>
                    </div>
                </section>

                {/* --- 4. CONCLUSION --- */}
                <section className="mb-24 bg-foreground text-background p-12 rounded-2xl text-center">
                    <h2 className="text-4xl font-bebas mb-6">Conclusion: A Phased Approach to Recovery</h2>
                    <p className="font-oswald text-lg md:text-xl leading-relaxed max-w-4xl mx-auto opacity-90">
                        Lebanon’s road to economic recovery requires a balanced approach by prioritizing stability, strategic incentives, and international partnerships. While full-scale investment remains a challenge, targeted reforms in banking, infrastructure, and regulatory transparency can lay the foundation for future investor confidence.
                    </p>
                    <p className="font-oswald text-lg md:text-xl leading-relaxed max-w-4xl mx-auto mt-6 font-bold text-red">
                        The American Lebanon Education Foundation advocates for a structured Investment Protection & Economic Recovery Plan, ensuring that Lebanon can transition from crisis management to sustainable economic growth.
                    </p>
                </section>

            </main>
        </div>
    );
}