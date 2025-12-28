import AnimatedTitle from "../../components/CommonCom/AnimatedTitle";
import { Target, Flag, Users, Globe, Briefcase, Award } from 'lucide-react';

export default function OurProfilePage() {
    return (
        <div className="bg-theme-black min-h-screen flex flex-col relative overflow-hidden">


            <main className="grow pt-32 px-4 md:px-8 lg:px-12 max-w-[1400px] mx-auto w-full z-10 relative">

                {/* Header Section */}
                <div className="mb-20 text-center max-w-5xl mx-auto">
                    <AnimatedTitle
                        text="ALEF PROFILE"
                        className="text-6xl md:text-8xl font-bebas text-theme-white mb-6 justify-center flex"
                    />
                    <div className="h-1 w-24 bg-theme-accent mx-auto mb-8"></div>
                    <p className="font-oswald text-xl md:text-2xl text-theme-white/80 leading-relaxed">
                        The American Lebanon Education Foundation is a collective of Lebanese and American professionals,
                        activists, and leaders united by a shared vision of a free, sovereign, and prosperous Lebanon.
                    </p>
                </div>

                {/* Vision & Mission Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
                    {/* Vision Card */}
                    <div className="bg-card-bg border border-theme-white/10 hover:border-theme-white/30 rounded-2xl group transition-all duration-300 relative overflow-hidden p-12 flex flex-col">
                        <div className="relative z-10">
                            <h2 className="text-4xl font-bebas text-white mb-6 group-hover:text-theme-accent transition-colors">Our Vision</h2>
                            <p className="font-oswald text-white/70 text-lg leading-relaxed">
                                To establish a transparent, accountable, and self-sustaining Lebanon, free from external influence,
                                where democracy, economic stability, and justice prevail.
                            </p>
                        </div>
                    </div>

                    {/* Mission Card */}
                    <div className="bg-card-bg border border-theme-white/10 hover:border-theme-white/30 rounded-2xl group transition-all duration-300 relative overflow-hidden p-12 flex flex-col">
                        <div className="absolute top-6 right-6 text-theme-accent/20 group-hover:text-theme-accent/40 transition-colors">
                            <Flag className="w-16 h-16" />
                        </div>
                        <div className="relative z-10">
                            <h2 className="text-4xl font-bebas text-white mb-6 group-hover:text-theme-accent transition-colors">Our Mission</h2>
                            <ul className="space-y-4 font-oswald text-white/70 text-lg">
                                {[
                                    "Advocate for political, economic, and security reforms.",
                                    "Engage with international policymakers to support sovereignty.",
                                    "Combat corruption and militant influences.",
                                    "Promote diaspora involvement in reconstruction.",
                                    "Drive policy solutions for a thriving Lebanon."
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <span className="w-1.5 h-1.5 bg-theme-accent rounded-full mt-2.5 shrink-0"></span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Organizational Structure */}
                <section className="mb-24">
                    <div className="flex items-center gap-4 mb-10">
                        <span className="h-px bg-theme-accent w-12"></span>
                        <h2 className="text-3xl font-bebas text-theme-white tracking-wide">Organizational Structure</h2>
                        <span className="h-px bg-theme-white/10 grow"></span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: "Executive Board", desc: "Key experts driving strategic initiatives.", icon: <Briefcase className="w-8 h-8" /> },
                            { title: "Advisory Council", desc: "Professionals guiding policy recommendations.", icon: <Users className="w-8 h-8" /> },
                            { title: "Task Forces", desc: "Teams focused on advocacy and community outreach.", icon: <Target className="w-8 h-8" /> },
                            { title: "Global Partners", desc: "Collaborations with governments and NGOs.", icon: <Globe className="w-8 h-8" /> },
                        ].map((item, idx) => (
                            <div key={idx} className="bg-card-bg border border-theme-white/10 p-8 rounded-2xl hover:bg-card-bg/80 transition-all duration-300 group text-center flex flex-col items-center">
                                <div className="mb-6 text-white/50 group-hover:text-theme-accent transition-colors duration-300">
                                    {item.icon}
                                </div>
                                <h3 className="text-2xl font-bebas text-white mb-3">{item.title}</h3>
                                <p className="font-oswald text-white/60 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Diversity Section */}
                <section className="mb-24">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/3">
                            <h2 className="text-5xl font-bebas text-theme-white mb-4">Diversity of Voices</h2>
                            <p className="font-oswald text-theme-white/60 text-lg">
                                Reflecting Lebanon's rich demographics and ensuring every community is heard.
                            </p>
                        </div>
                        <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-card-bg border border-theme-white/10 p-8 rounded-2xl hover:border-theme-accent/50 transition-colors duration-300">
                                <h3 className="text-2xl font-bebas text-white mb-4">Inclusive Council</h3>
                                <p className="font-oswald text-white/70 leading-relaxed">
                                    Our structures ensure that the voices of different communities are heard to address unique challenges faced by all sectors.
                                </p>
                            </div>
                            <div className="bg-card-bg border border-theme-white/10 p-8 rounded-2xl hover:border-theme-accent/50 transition-colors duration-300">
                                <h3 className="text-2xl font-bebas text-white mb-4">Community Action</h3>
                                <p className="font-oswald text-white/70 leading-relaxed">
                                    We foster dialogue through town hall meetings and forums to shape our initiatives based on real needs.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Metrics Section */}
                <section className="mb-20 pt-10 border-t border-theme-white/10">
                    <div className="flex items-end justify-between mb-10">
                        <div>
                            <h2 className="text-4xl font-bebas text-theme-white mb-2">Metrics for Success</h2>
                            <p className="font-oswald text-theme-white/50">Ensuring accountability in our initiatives</p>
                        </div>
                        <Award className="w-10 h-10 text-theme-accent opacity-50 hidden md:block" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { title: "Hezbollah Accountability", metric: "Track legislative advocacy" },
                            { title: "Economic Recovery", metric: "Target $500M investment" },
                            { title: "UN Advocacy", metric: "Count supporting countries" },
                            { title: "Diaspora Engagement", metric: "Aim for 2,000 members" },
                            { title: "Political Reform", metric: "Monitor legislative progress" },
                            { title: "Community Events", metric: "5 major events/year" },
                        ].map((card, i) => (
                            <div key={i} className="flex items-center p-6 bg-card-bg border border-theme-white/10 rounded-xl hover:border-theme-accent/50 transition-all duration-300 gap-4">
                                <div className="h-12 w-1 bg-theme-accent rounded-full shrink-0"></div>
                                <div>
                                    <h4 className="font-bebas text-xl text-white mb-1">{card.title}</h4>
                                    <p className="font-oswald text-sm text-white/50 tracking-wide uppercase">{card.metric}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </main>
        </div>
    );
}