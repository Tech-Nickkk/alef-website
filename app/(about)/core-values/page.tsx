import AnimatedTitle from "@/app/components/CommonCom/AnimatedTitle";
import { ShieldCheck, Scale, Globe, TrendingUp, Users, Target, Flag, Briefcase, HandCoins, BarChart3, Radio, CheckCircle2, FileText } from 'lucide-react';
import Link from "next/link";

export default function CoreValuesPage() {
    const values = [
        {
            title: "Sovereignty",
            icon: <Globe className="w-6 h-6 md:w-8 md:h-8" />,
            desc: "Upholding Lebanon’s independence from foreign domination."
        },
        {
            title: "Transparency & Accountability",
            icon: <ShieldCheck className="w-6 h-6 md:w-8 md:h-8" />,
            desc: "Believing in ethical governance and responsible leadership."
        },
        {
            title: "Economic Freedom",
            icon: <TrendingUp className="w-6 h-6 md:w-8 md:h-8" />,
            desc: "Promoting investment, job creation, and financial stability."
        },
        {
            title: "Rule of Law",
            icon: <Scale className="w-6 h-6 md:w-8 md:h-8" />,
            desc: "Advocating for an independent judiciary and security forces."
        },
        {
            title: "Meritocracy & Performance",
            icon: <Users className="w-6 h-6 md:w-8 md:h-8" />,
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
        <main className="min-h-screen bg-background pt-24 md:pt-32 pb-16 md:pb-24 px-4 md:px-12 lg:px-24">
            <div className="max-w-6xl mx-auto space-y-16 md:space-y-32">

                {/* --- 1. INTRODUCTION, VISION & MISSION --- */}
                <div className="space-y-8 md:space-y-12 text-center md:text-left">
                    <div className="text-center space-y-4 md:space-y-6">
                        <div className="flex items-center justify-center gap-3">
                            <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-red rounded-full animate-pulse"></span>
                            <span className="font-oswald text-red tracking-[0.2em] uppercase text-xs md:text-sm font-bold">Our Foundation</span>
                            <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-red rounded-full animate-pulse"></span>
                        </div>

                        <AnimatedTitle
                            text="MISSION & CORE VALUES"
                            className="text-4xl md:text-7xl lg:text-8xl font-bold font-bebas text-foreground uppercase leading-none"
                        />
                        <div className="h-1 w-20 md:w-32 bg-red mx-auto mb-6 md:mb-10"></div>

                        <p className="font-oswald text-foreground/60 text-base md:text-xl tracking-wider uppercase max-w-4xl mx-auto">
                            A collective of Lebanese and American professionals united by a shared vision of a free, sovereign, and prosperous Lebanon.
                        </p>
                    </div>

                    <div className="relative bg-blue border border-white/10 p-6 md:p-14 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-24 h-24 md:w-40 md:h-40 bg-white/5 rounded-bl-[80px] md:rounded-bl-[100px]"></div>
                        <div className="relative z-10">
                            <h3 className="font-bebas text-2xl md:text-4xl text-white mb-4 md:mb-6">Introduction</h3>
                            <p className="font-oswald text-white/80 text-base md:text-xl leading-relaxed md:leading-loose space-y-6 text-left md:text-justify">
                                The American Lebanon Education Foundation is a collective of Lebanese and American professionals, activists, and leaders united by a shared vision of a free, sovereign, and prosperous Lebanon. As an independent, non-partisan movement, we are committed to dismantling corruption, restoring governance, and advocating for Lebanon’s rightful place within the international community.
                            </p>
                        </div>
                    </div>


                    <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                        {/* Vision Card */}
                        <div className="relative p-6 md:p-10 border border-white/10 bg-blue rounded-2xl md:rounded-3xl overflow-hidden shadow-xl shadow-blue/20 flex flex-col h-full">
                            <div className="absolute top-0 right-0 w-16 h-16 md:w-24 md:h-24 bg-white/5 rounded-bl-[60px] md:rounded-bl-[80px]"></div>
                            <div className="relative z-10 flex flex-col h-full gap-4 md:gap-6 text-white">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-linear-to-br from-red to-red/60 rounded-lg text-white shadow-lg">
                                        <Target className="w-6 h-6 md:w-8 md:h-8" />
                                    </div>
                                    <span className="font-bebas text-2xl md:text-3xl tracking-wide">Vision</span>
                                </div>
                                <p className="font-oswald text-white/70 text-base md:text-xl leading-relaxed grow">
                                    To establish a transparent, accountable, and self-sustaining Lebanon, free from external influence, where democracy, economic stability, and justice prevail.
                                </p>
                            </div>
                        </div>

                        {/* Mission Card */}
                        <div className="relative p-6 md:p-10 border border-white/10 bg-blue rounded-2xl md:rounded-3xl overflow-hidden shadow-xl shadow-blue/20 flex flex-col h-full">
                            <div className="absolute top-0 right-0 w-16 h-16 md:w-24 md:h-24 bg-white/5 rounded-bl-[60px] md:rounded-bl-[80px]"></div>
                            <div className="relative z-10 flex flex-col h-full gap-4 md:gap-6 text-white">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-linear-to-br from-red to-red/60 rounded-lg text-white shadow-lg">
                                        <Flag className="w-6 h-6 md:w-8 md:h-8" />
                                    </div>
                                    <span className="font-bebas text-2xl md:text-3xl tracking-wide">Mission</span>
                                </div>
                                <ul className="space-y-3 md:space-y-4 font-oswald text-white/70 text-sm md:text-lg leading-relaxed grow">
                                    {[
                                        "Advocate for political, economic, and security reforms.",
                                        "Engage with international policymakers to support Lebanon’s sovereignty.",
                                        "Combat corruption and militant influences undermining stability.",
                                        "Promote diaspora involvement in Lebanon’s reconstruction and economic growth.",
                                        "Drive policy solutions for a self-reliant and thriving Lebanon."
                                    ].map((item, i) => (
                                        <li key={i} className="flex gap-3 items-start">
                                            <span className="w-1.5 h-1.5 bg-red rounded-full mt-2 shrink-0"></span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* // --- 2. CORE VALUES --- */}
                <div className="space-y-8 md:space-y-12">
                    <div className="text-center max-w-4xl mx-auto">
                        <AnimatedTitle
                            text="CORE VALUES"
                            className="text-4xl md:text-5xl font-bold font-bebas text-foreground uppercase leading-none"
                        />
                        <div className="h-1 w-20 md:w-24 bg-red mx-auto mt-4 md:mt-6"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {values.map((val, index) => (
                            <div key={index} className="relative bg-blue border border-white/10 p-6 md:p-8 rounded-2xl md:rounded-3xl overflow-hidden shadow-xl transition-all duration-500 hover:border-white/30">

                                <div className="relative z-10 flex flex-col items-start h-full">
                                    <div className="mb-4 md:mb-6 p-3 md:p-4 rounded-xl md:rounded-2xl bg-linear-to-br from-red to-red/60 text-white border border-white/10 shadow-lg">
                                        {val.icon}
                                    </div>

                                    <h3 className="font-bebas text-2xl md:text-3xl text-white mb-2 md:mb-4 transition-colors duration-300">
                                        {val.title}
                                    </h3>

                                    <p className="font-oswald text-white/70 text-base md:text-lg leading-relaxed grow">
                                        {val.desc}
                                    </p>

                                    <div className="mt-6 md:mt-8 w-12 h-0.5 bg-white/10 transition-all duration-700"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* // --- 3. STRATEGIC PILLARS & INITIATIVES --- */}
                <div className="space-y-16 md:space-y-24">
                    {/* Pillars */}
                    <div>
                        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
                            <AnimatedTitle
                                text="STRATEGIC PILLARS"
                                className="text-4xl md:text-5xl font-bold font-bebas text-foreground uppercase leading-none"
                            />
                            <p className="font-oswald text-foreground/60 text-sm md:text-lg mt-4 uppercase tracking-widest">
                                The foundations of our roadmap
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                            {pillars.map((pillar, idx) => (
                                <div key={idx} className="relative bg-blue border border-white/10 p-8 md:p-10 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                                    <div className="absolute top-0 right-0 p-4 md:p-6 opacity-20">
                                        <span className="font-bebas text-6xl md:text-8xl text-white">0{idx + 1}</span>
                                    </div>
                                    <div className="relative z-10 flex flex-col h-full justify-center">
                                        <h3 className="font-bebas text-2xl md:text-4xl text-white mb-2 md:mb-4 pr-12">{pillar.title}</h3>
                                        <div className="h-1 w-12 bg-red mb-4 md:mb-6"></div>
                                        <p className="font-oswald text-white/70 text-lg md:text-xl leading-relaxed">{pillar.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Initiatives */}
                    <div>
                        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
                            <AnimatedTitle
                                text="KEY INITIATIVES"
                                className="text-4xl md:text-5xl font-bold font-bebas text-foreground uppercase leading-none"
                            />
                        </div>

                        <div className="grid gap-4 md:gap-6">
                            {[
                                { t: "Hezbollah Accountability Act (HAA)", d: "Lobbying for legal and financial accountability of Hezbollah.", i: <ShieldCheck className="w-5 h-5 md:w-6 md:h-6" /> },
                                { t: "Investment Protection & Economic Recovery", d: "Attracting investment for Lebanon’s economic renewal.", i: <TrendingUp className="w-5 h-5 md:w-6 md:h-6" /> },
                                { t: "UN Chapter VII Advocacy", d: "Promoting international intervention for stability and sovereignty.", i: <Globe className="w-5 h-5 md:w-6 md:h-6" /> },
                                { t: "Diaspora Engagement Program", d: "Mobilizing Lebanese expatriates for national development.", i: <Users className="w-5 h-5 md:w-6 md:h-6" /> },
                                { t: "Media Influence Strategy", d: "Targeting international outlets to reshape Lebanon’s image.", i: <Radio className="w-5 h-5 md:w-6 md:h-6" /> }
                            ].map((item, idx) => (
                                <div key={idx} className="relative bg-blue border border-white/10 p-6 md:p-8 rounded-xl md:rounded-2xl overflow-hidden flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 group hover:bg-light-blue transition-colors duration-300">
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-red"></div>
                                    <div className="p-3 md:p-4 bg-linear-to-br from-red to-red/60 rounded-xl text-white shrink-0 shadow-lg">
                                        {item.i}
                                    </div>
                                    <div className="grow">
                                        <h3 className="font-bebas text-xl md:text-2xl text-white mb-1">{item.t}</h3>
                                        <p className="font-oswald text-white/60 text-base md:text-lg">{item.d}</p>
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="p-2 border border-white/10 rounded-full text-white/40 group-hover:text-white transition-colors">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* // --- 4. DIVERSITY & STRUCTURE --- */}
                <div className="space-y-12 md:space-y-16">
                    <div className="text-center max-w-4xl mx-auto">
                        <AnimatedTitle
                            text="DIVERSITY OF VOICES"
                            className="text-4xl md:text-5xl font-bold font-bebas text-foreground uppercase leading-none"
                        />
                        <p className="font-oswald text-foreground/60 text-base md:text-lg mt-4 md:mt-6 max-w-2xl mx-auto">
                            Enhancing Legitimate Decision-Making. At ALEF, we recognize that a diverse range of perspectives is essential to building a robust and effective movement.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        <DiversityCard
                            icon={<Users className="w-6 h-6 md:w-8 md:h-8" />}
                            title="Inclusive Advisory Council"
                            desc="We aim to reflect Lebanon's diverse demographics, ensuring voices of different communities are heard to address unique challenges faced by all sectors."
                        />
                        <DiversityCard
                            icon={<Briefcase className="w-6 h-6 md:w-8 md:h-8" />}
                            title="Community Engagement"
                            desc="We encourage participation through town hall meetings, forums, and workshops, fostering dialogue on critical issues based on the needs of the Lebanese people."
                        />
                        <DiversityCard
                            icon={<Target className="w-6 h-6 md:w-8 md:h-8" />}
                            title="Task Forces with Varied Expertise"
                            desc="Our task forces comprise individuals from law, economics, and social activism, bringing a wealth of knowledge to tackle multifaceted challenges."
                        />
                        <DiversityCard
                            icon={<Globe className="w-6 h-6 md:w-8 md:h-8" />}
                            title="Collaboration with Grassroots"
                            desc="Partnering with grassroots organizations amplifies marginalized voices, ensuring our strategies resonate with the broader public."
                        />
                    </div>

                    <div className="border-t border-white/10 pt-16 md:pt-20">
                        <div className="bg-blue rounded-2xl md:rounded-[3rem] p-8 md:p-16 border border-white/10 relative overflow-hidden">
                            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
                            <h2 className="text-3xl md:text-4xl font-bebas text-white mb-8 md:mb-12 text-center relative z-10">Organizational Structure</h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative z-10">
                                {[
                                    { name: "Executive Board", icon: <Briefcase className="w-6 h-6 md:w-8 md:h-8 text-white" /> },
                                    { name: "Advisory Council", icon: <Users className="w-6 h-6 md:w-8 md:h-8 text-white" /> },
                                    { name: "Task Forces", icon: <Target className="w-6 h-6 md:w-8 md:h-8 text-white" /> },
                                    { name: "Global Partners", icon: <Globe className="w-6 h-6 md:w-8 md:h-8 text-white" /> }
                                ].map((item, i) => (
                                    <div key={i} className="bg-white/5 p-6 md:p-8 rounded-xl md:rounded-2xl border border-white/5 flex flex-col items-center text-center gap-4 hover:bg-white/10 transition-colors">
                                        <div className="p-3 md:p-4 bg-linear-to-br from-red to-red/60 rounded-xl shadow-lg">
                                            {item.icon}
                                        </div>
                                        <h4 className="font-bebas text-xl md:text-2xl text-white tracking-wide">{item.name}</h4>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* // --- 5. FUNDING & SUPPORT --- */}
                <div className="bg-blue rounded-2xl md:rounded-3xl p-6 md:p-14 relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                    <div className="relative z-10 grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <HandCoins className="w-6 h-6 md:w-8 md:h-8 text-red" />
                                <span className="font-oswald text-red tracking-widest uppercase text-xs md:text-sm font-bold">Sustainability</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bebas text-white mb-4 md:mb-6">Funding & Support</h2>
                            <p className="font-oswald text-white/70 leading-relaxed text-base md:text-xl">
                                ALEF is committed to a transparent and strategic approach to funding. We plan to maintain financial sustainability while fostering trust through diverse sources and rigorous accountability.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                            {["Diverse Sources", "Fundraising Campaigns", "Corporate Partnerships", "Grant Applications", "Transparent Reporting", "Community Engagement"].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 md:p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-red shrink-0" />
                                    <span className="font-bebas text-base md:text-lg text-white tracking-wide">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* // --- 6. METRICS FOR SUCCESS --- */}
                <div className="space-y-10 md:space-y-14">
                    <div className="text-center max-w-3xl mx-auto">
                        <AnimatedTitle
                            text="METRICS FOR SUCCESS"
                            className="text-4xl md:text-6xl font-bold font-bebas text-foreground uppercase leading-none"
                        />
                        <p className="font-oswald text-foreground/60 mt-4 md:mt-6 text-base md:text-xl">
                            We believe in measurable impact. Here is how we track our progress towards a free Lebanon.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <MetricCard
                            icon={<ShieldCheck className="w-5 h-5 md:w-6 md:h-6" />}
                            title="Hezbollah Accountability"
                            goal="Legal & Financial Accountability"
                            metrics={["Track congressional reps actions", "Measure media coverage span"]}
                        />
                        <MetricCard
                            icon={<TrendingUp className="w-5 h-5 md:w-6 md:h-6" />}
                            title="Economic Recovery"
                            goal="Attract Foreign Investment"
                            metrics={["Target $500M new investments", "Monitor job creation stats"]}
                        />
                        <MetricCard
                            icon={<Globe className="w-5 h-5 md:w-6 md:h-6" />}
                            title="UN Chapter VII"
                            goal="International Intervention"
                            metrics={["Count supporting countries", "Evaluate resolutions passed"]}
                        />
                        <MetricCard
                            icon={<Users className="w-5 h-5 md:w-6 md:h-6" />}
                            title="Diaspora Engagement"
                            goal="Mobilize Expatriates"
                            metrics={["2,000 engaged members in Year 1", "Measure funding directed back"]}
                        />
                        <MetricCard
                            icon={<Radio className="w-5 h-5 md:w-6 md:h-6" />}
                            title="Media Influence"
                            goal="Reshape Global Narrative"
                            metrics={["Assess sentiment shifts", "Track strategic comms issued"]}
                        />
                        <MetricCard
                            icon={<FileText className="w-5 h-5 md:w-6 md:h-6" />}
                            title="Political Reform"
                            goal="Ensure Fair Elections"
                            metrics={["Monitor legislative progress", "Public perception surveys"]}
                        />
                    </div>
                </div>

                {/* --- DOWNLOAD DOCUMENT BUTTON --- */}
                <div className="flex justify-center pt-8 md:pt-16 relative z-10">
                    <Link
                        href="https://docs.google.com/document/d/e/2PACX-1vRNFZ8Ghzj5gKY_asmglxg_n1KTKHQDebY-_p7NodBrreNtUVxUGuf61ExZC3q9yQ/pub"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <button className="group relative bg-transparent border border-foreground/70 text-foreground px-12 py-4 text-sm font-bold tracking-[0.2em] uppercase font-oswald overflow-hidden transition-all hover:border-foreground/50 isolate cursor-pointer">
                            <span className="relative z-10 group-hover:text-background transition-colors duration-300">
                                READ CORE VALUES
                            </span>
                            <div className="absolute inset-0 bg-foreground transform scale-y-0 origin-top group-hover:scale-y-100 group-hover:origin-bottom transition-transform duration-500 ease-out -z-10"></div>
                        </button>
                    </Link>
                </div>
            </div>
        </main>
    );
}

// Updated sub-components with better props
function DiversityCard({ title, desc, icon }: { title: string, desc: string, icon: React.ReactNode }) {
    return (
        <div className="bg-blue border border-white/10 p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-xl flex flex-col gap-4 md:gap-6 relative overflow-hidden group hover:border-white/30 transition-colors">
            <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-red/10 transition-colors duration-500"></div>
            <div className="w-12 h-12 md:w-14 md:h-14 bg-linear-to-br from-red to-red/60 rounded-2xl flex items-center justify-center text-white border border-white/5 relative z-10 shadow-lg">
                {icon}
            </div>
            <div className="relative z-10">
                <h3 className="font-bebas text-2xl md:text-3xl text-white mb-2 md:mb-4">{title}</h3>
                <p className="font-oswald text-white/70 text-base md:text-lg leading-relaxed">{desc}</p>
            </div>
        </div>
    );
}

function MetricCard({ title, goal, metrics, icon }: { title: string, goal: string, metrics: string[], icon: React.ReactNode }) {
    return (
        <div className="group bg-blue p-6 md:p-8 rounded-2xl md:rounded-3xl relative overflow-hidden flex flex-col h-full border border-white/10 hover:border-white/30 transition-colors">
            <div className="mb-6">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-linear-to-br from-red to-red/60 rounded-xl flex items-center justify-center text-white mb-4 md:mb-6 shadow-lg">
                    {icon}
                </div>
                <h4 className="font-bebas text-2xl md:text-3xl text-white mb-2">{title}</h4>
                <div className="inline-block px-2 py-1 md:px-3 md:py-1 rounded bg-white/5 border border-white/10 text-white/60 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1">
                    Goal: {goal}
                </div>
            </div>

            <div className="mt-auto pt-4 md:pt-6 border-t border-white/5">
                <ul className="space-y-2 md:space-y-3">
                    {metrics.map((m, i) => (
                        <li key={i} className="flex gap-3 items-start font-oswald text-white/70 text-sm md:text-base leading-snug group-hover:text-white/90 transition-colors">
                            <span className="w-1.5 h-1.5 bg-red rounded-full mt-1.5 md:mt-2 shrink-0"></span>
                            <span>{m}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}