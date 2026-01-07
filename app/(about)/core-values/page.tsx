import AnimatedTitle from "../../components/CommonCom/AnimatedTitle";
import { ShieldCheck, Scale, Globe, TrendingUp, Users, Target, FileText, Megaphone, Landmark, HandCoins, BarChart3 } from 'lucide-react';

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

                {/* --- 1. INTRODUCTION, VISION & MISSION --- */}
                <section className="mb-24 text-center max-w-5xl mx-auto space-y-16">
                    <div>
                        <AnimatedTitle
                            text="Mission & Core Values"
                            className="text-6xl md:text-8xl font-bebas text-foreground mb-8 justify-center flex"
                        />
                        <div className="h-1 w-24 bg-red mx-auto mb-8"></div>
                        
                        <h2 className="text-3xl font-bebas text-foreground mb-4">Introduction</h2>
                        <p className="font-oswald text-xl md:text-2xl text-foreground/80 leading-relaxed mb-12">
                            The American Lebanon Education Foundation is a collective of Lebanese and American professionals, activists, and leaders united by a shared vision of a free, sovereign, and prosperous Lebanon. As an independent, non-partisan movement, we are committed to dismantling corruption, restoring governance, and advocating for Lebanon’s rightful place within the international community.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 text-left">
                        <div className="bg-blue/5 border border-foreground/10 p-10 rounded-xl">
                            <h3 className="font-bebas text-3xl text-foreground mb-4 flex items-center gap-3">
                                <Target className="w-6 h-6 text-red" /> Vision
                            </h3>
                            <p className="font-oswald text-foreground/70 text-lg leading-relaxed">
                                To establish a transparent, accountable, and self-sustaining Lebanon, free from external influence, where democracy, economic stability, and justice prevail.
                            </p>
                        </div>

                        <div className="bg-blue/5 border border-foreground/10 p-10 rounded-xl">
                            <h3 className="font-bebas text-3xl text-foreground mb-4 flex items-center gap-3">
                                <Flag className="w-6 h-6 text-red" /> Mission
                            </h3>
                            <ul className="list-disc list-inside font-oswald text-foreground/70 text-lg space-y-3">
                                <li>Advocate for political, economic, and security reforms.</li>
                                <li>Engage with international policymakers to support Lebanon’s sovereignty.</li>
                                <li>Combat corruption and militant influences undermining stability.</li>
                                <li>Promote diaspora involvement in Lebanon’s reconstruction.</li>
                                <li>Drive policy solutions for a self-reliant and thriving Lebanon.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* --- 2. CORE VALUES --- */}
                <section className="mb-24">
                    <div className="flex items-center gap-4 mb-10">
                        <span className="h-px bg-red w-12"></span>
                        <h2 className="text-4xl font-bebas text-foreground tracking-wide">Core Values</h2>
                        <span className="h-px bg-foreground/10 grow"></span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {values.map((val, index) => (
                            <div key={index} className="bg-blue border border-white/10 hover:border-red/30 rounded-2xl p-8 flex flex-col items-center text-center transition-all duration-300 group hover:-translate-y-2">
                                <div className="text-white/50 group-hover:text-red transition-colors duration-300 mb-6">
                                    {val.icon}
                                </div>
                                <h3 className="text-2xl font-bebas text-white mb-4 group-hover:text-red transition-colors">{val.title}</h3>
                                <p className="font-oswald text-white/70 leading-relaxed text-lg">
                                    {val.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* --- 3. STRATEGIC PILLARS & INITIATIVES --- */}
                <section className="mb-24">
                    <div className="grid lg:grid-cols-2 gap-16">
                        <div>
                            <h2 className="text-4xl font-bebas text-foreground mb-8">Strategic Pillars</h2>
                            <div className="space-y-4">
                                {pillars.map((pillar, idx) => (
                                    <div key={idx} className="flex items-center p-6 bg-background border border-foreground/10 rounded-xl hover:border-red/50 transition-all duration-300 gap-6 shadow-sm">
                                        <div className="h-full w-1 bg-red rounded-full shrink-0"></div>
                                        <div>
                                            <h3 className="font-bebas text-xl text-foreground mb-1">{pillar.title}</h3>
                                            <p className="font-oswald text-foreground/60">{pillar.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h2 className="text-4xl font-bebas text-foreground mb-8">Key Initiatives</h2>
                            <div className="space-y-4 font-oswald text-foreground/80">
                                <InitiativeItem title="Hezbollah Accountability Act (HAA)" desc="Lobbying for legal and financial accountability of Hezbollah." />
                                <InitiativeItem title="Investment Protection & Recovery" desc="Attracting investment for Lebanon’s economic renewal." />
                                <InitiativeItem title="UN Chapter VII Advocacy" desc="Promoting international intervention for stability and sovereignty." />
                                <InitiativeItem title="Diaspora Engagement Program" desc="Mobilizing Lebanese expatriates for national development." />
                                <InitiativeItem title="Media Influence Strategy" desc="Targeting international outlets to reshape Lebanon’s image." />
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- 4. DIVERSITY & STRUCTURE --- */}
                <section className="mb-24 bg-blue/5 -mx-4 md:-mx-8 lg:-mx-12 px-4 md:px-8 lg:px-12 py-16">
                    <div className="max-w-[1400px] mx-auto">
                        <h2 className="text-4xl font-bebas text-foreground mb-2 text-center">Diversity of Voices</h2>
                        <p className="text-center font-oswald text-foreground/60 mb-12 max-w-3xl mx-auto">
                            Enhancing Legitimate Decision-Making. At ALEF, we recognize that a diverse range of perspectives is essential to building a robust and effective movement.
                        </p>

                        <div className="grid md:grid-cols-2 gap-8 mb-16">
                            <div className="space-y-6">
                                <DiversityCard title="Inclusive Advisory Council" desc="We aim to reflect Lebanon's diverse demographics, ensuring voices of different communities are heard to address unique challenges faced by all sectors." />
                                <DiversityCard title="Community Engagement" desc="We encourage participation through town hall meetings, forums, and workshops, fostering dialogue on critical issues based on the needs of the Lebanese people." />
                            </div>
                            <div className="space-y-6">
                                <DiversityCard title="Task Forces with Varied Expertise" desc="Our task forces comprise individuals from law, economics, and social activism, bringing a wealth of knowledge to tackle multifaceted challenges." />
                                <DiversityCard title="Collaboration with Grassroots" desc="Partnering with grassroots organizations amplifies marginalized voices, ensuring our strategies resonate with the broader public." />
                            </div>
                        </div>

                        <div className="border-t border-foreground/10 pt-12">
                             <h2 className="text-3xl font-bebas text-foreground mb-8 text-center">Organizational Structure</h2>
                             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                                {["Executive Board", "Advisory Council", "Task Forces", "Global Partners"].map((item, i) => (
                                    <div key={i} className="bg-background p-6 rounded-lg border border-foreground/5 shadow-sm">
                                        <h4 className="font-bebas text-xl text-foreground">{item}</h4>
                                    </div>
                                ))}
                             </div>
                        </div>
                    </div>
                </section>

                {/* --- 5. FUNDING & METRICS --- */}
                <section className="mb-24">
                    <div className="grid lg:grid-cols-1 gap-12">
                        {/* Funding */}
                        <div className="bg-blue text-white p-12 rounded-2xl relative overflow-hidden">
                             <div className="relative z-10">
                                <h2 className="text-4xl font-bebas mb-6">Funding and Support</h2>
                                <p className="font-oswald text-white/70 mb-8 leading-relaxed">
                                    To sustain our efforts and drive meaningful change, ALEF is committed to a transparent and strategic approach to funding. We plan to maintain financial sustainability while fostering trust through:
                                </p>
                                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 font-bebas text-xl tracking-wide">
                                    {["Diverse Sources", "Fundraising Campaigns", "Corporate Partnerships", "Grant Applications", "Transparent Reporting", "Community Engagement", "Impact Measurement"].map((item, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <HandCoins className="w-5 h-5 text-red" /> {item}
                                        </div>
                                    ))}
                                </div>
                             </div>
                        </div>

                        {/* Metrics */}
                        <div>
                             <h2 className="text-4xl font-bebas text-foreground mb-8 flex items-center gap-3">
                                <BarChart3 className="w-8 h-8 text-red" /> Metrics for Success
                             </h2>
                             <p className="font-oswald text-foreground/60 mb-8">
                                To effectively measure our progress and ensure accountability, we establish specific, measurable goals.
                             </p>
                             
                             <div className="grid md:grid-cols-2 gap-6">
                                <MetricCard 
                                    title="Hezbollah Accountability" 
                                    goal="Achieve legal/financial accountability."
                                    metrics={["Track congressional reps advocating for HAA.", "Measure media coverage span."]}
                                />
                                <MetricCard 
                                    title="Economic Recovery" 
                                    goal="Attract foreign investment."
                                    metrics={["Target $500M new investments in 2 years.", "Monitor job creation stats."]}
                                />
                                <MetricCard 
                                    title="Diaspora Engagement" 
                                    goal="Mobilize expatriates."
                                    metrics={["Aim for 2,000 engaged members in year 1.", "Measure funding directed back to Lebanon."]}
                                />
                                <MetricCard 
                                    title="Media Influence" 
                                    goal="Reshape international narrative."
                                    metrics={["Assess shifts in global media sentiment.", "Track strategic communications issued."]}
                                />
                             </div>
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
}

// Sub-components for cleaner code
function InitiativeItem({ title, desc }: { title: string, desc: string }) {
    return (
        <div className="flex items-start gap-3">
            <div className="mt-1.5 w-1.5 h-1.5 bg-red rounded-full shrink-0"></div>
            <div>
                <strong className="block text-lg font-bebas tracking-wide">{title}</strong>
                <span className="text-base">{desc}</span>
            </div>
        </div>
    );
}

function DiversityCard({ title, desc }: { title: string, desc: string }) {
    return (
        <div className="bg-background border border-foreground/10 p-6 rounded-xl">
            <h3 className="font-bebas text-xl text-foreground mb-2">{title}</h3>
            <p className="font-oswald text-foreground/70 text-sm leading-relaxed">{desc}</p>
        </div>
    );
}

function MetricCard({ title, goal, metrics }: { title: string, goal: string, metrics: string[] }) {
    return (
        <div className="border border-foreground/10 p-6 rounded-xl hover:border-red/50 transition-colors">
            <h4 className="font-bebas text-xl text-red mb-2">{title}</h4>
            <p className="font-oswald text-sm font-bold text-foreground/80 mb-2">Goal: {goal}</p>
            <ul className="list-disc list-inside font-oswald text-xs text-foreground/60 space-y-1">
                {metrics.map((m, i) => <li key={i}>{m}</li>)}
            </ul>
        </div>
    );
}

function Flag({ className }: { className?: string }) {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" x2="4" y1="22" y2="15"/></svg>;
}