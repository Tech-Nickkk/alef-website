import AnimatedTitle from "../../components/CommonCom/AnimatedTitle";
import { ShieldCheck, Scale, Globe, TrendingUp, Users } from 'lucide-react';

export default function CoreValuesPage() {
    const values = [
        {
            title: "Sovereignty",
            icon: <Globe className="w-12 h-12" />,
            desc: "Upholding Lebanon’s independence from foreign domination."
        },
        {
            title: "Transparency & Accountability",
            icon: <ShieldCheck className="w-12 h-12" />,
            desc: "Believing in ethical governance and responsible leadership."
        },
        {
            title: "Economic Freedom",
            icon: <TrendingUp className="w-12 h-12" />,
            desc: "Promoting investment, job creation, and financial stability."
        },
        {
            title: "Rule of Law",
            icon: <Scale className="w-12 h-12" />,
            desc: "Advocating for an independent judiciary and security forces."
        },
        {
            title: "Meritocracy & Performance",
            icon: <Users className="w-12 h-12" />,
            desc: "Building a Lebanon based on skills and leadership excellence."
        }
    ];

    const pillars = [
        {
            title: "Political Reform",
            desc: "Ending sectarian politics and ensuring fair elections."
        },
        {
            title: "Economic Revitalization",
            desc: "Banking reforms and public-private partnerships."
        },
        {
            title: "Security & Stability",
            desc: "Disarmament of non-state actors and enforcement of UN Resolutions."
        },
        {
            title: "Media & Awareness",
            desc: "Shaping global narratives through strategic communications."
        }
    ];

    return (
        <div className="bg-background min-h-screen flex flex-col relative overflow-hidden">

            <main className="grow pt-32 px-4 md:px-8 lg:px-12 max-w-[1400px] mx-auto w-full z-10 relative">

                {/* Intro */}
                <div className="mb-20 text-center max-w-4xl mx-auto">
                    <AnimatedTitle
                        text="Our Core Values"
                        className="text-6xl md:text-8xl font-bebas text-foreground mb-8 justify-center flex"
                    />
                    <div className="h-1 w-24 bg-red mx-auto mb-8"></div>
                    <p className="font-oswald text-xl md:text-2xl text-foreground/70 leading-relaxed">
                        As an independent, non-partisan movement, we are committed to dismantling corruption,
                        restoring governance, and advocating for Lebanon’s rightful place within the international community.
                    </p>
                </div>

                {/* Core Values Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
                    {values.map((val, index) => (
                        <div key={index} className="bg-blue border border-white/10 hover:border-white/30 rounded-2xl p-6 flex flex-col items-center text-center transition-all duration-300 group">
                            <div className="text-white/50 group-hover:text-red transition-colors duration-300 mb-6">
                                {val.icon}
                            </div>
                            <h3 className="text-2xl font-bebas text-white mb-4 group-hover:text-red transition-colors">{val.title}</h3>
                            <p className="font-oswald text-white/70 leading-relaxed">
                                {val.desc}
                            </p>
                            <span className="mt-8 text-5xl font-bebas text-white/5 group-hover:text-white/10 transition-colors">
                                0{index + 1}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Strategic Pillars Section */}
                <section className="mb-20 pt-10 border-t border-foreground/10">
                    <div className="flex items-end justify-between mb-10">
                        <div>
                            <h2 className="text-4xl font-bebas text-foreground mb-2">Strategic Pillars</h2>
                            <p className="font-oswald text-foreground/50 text-lg">The foundation of our movement</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {pillars.map((pillar, idx) => (
                            <div key={idx} className="flex items-center p-6 bg-blue border border-white/10 rounded-xl hover:border-red/50 transition-all duration-300 gap-8">
                                <div className="h-12 w-1 bg-red rounded-full shrink-0"></div>
                                <div>
                                    <h3 className="font-bebas text-xl text-white mb-1">{pillar.title}</h3>
                                    <p className="font-oswald text-sm text-white/50 tracking-wide uppercase">{pillar.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}
