import AnimatedTitle from "../../components/CommonCom/AnimatedTitle";
import { Star } from 'lucide-react';

export default function ResidentActivistsPage() {
    const officers = [
        { name: "Ziad Abdelnour", title: "Founding Chairman" },
        { name: "Wael Chehab", title: "Vice Chairman" },
        { name: "Nagy Najjar", title: "Vice Chairman" },
        { name: "Charles Chartouni", title: "Political/Social Affairs Director" },
        { name: "Duaa Saigh", title: "Acting Secretary" },
        { name: "Robert Straniere", title: "Special Counsel" },
        { name: "Karra Mannarino", title: "Treasurer" },
        { name: "Nadine Moussa", title: "Legal" },
    ];

    const directors = [
        { title: "Chairman & CEO of one of the largest IT groups in the Middle East" },
        { title: "Former COO of the 5th communications group in the world" },
        { title: "Specialist in the digital world with 25+ year experience in strategic communication" },
        { title: "Strategist with extensive experience in Middle Eastern and American media." },
        { title: "Media Specialist activist/entrepreneur" },
        { title: "Lebanese American Activist/Entrepreneur" },
        { title: "Canadian entrepreneur and software developer" },
        { title: "Lebanese Activist/Entrepreneur" },
        { title: "Lebanese Activist/Entrepreneur" }, 
    ];

    const advisors = [
        { title: "Expert Specialist in Arab and International Affairs based on his diversified work experience in different TV stations and online news portals." },
        { title: "Harvard educated businessman expert in Artificial intelligence" },
        { title: "American Financial Expert" },
        { title: "Technology Specialist Entrepreneur" },
        { title: "Global Podcaster with 1.5 million listeners weekly" },
        { title: "Media Specialist activist/entrepreneur" },
        { title: "Expert Specialist in delivering advanced network infrastructure and telecom solutions to meet U.S. government & commercial enterprises’ needs." },
    ];

    return (
        <div className="bg-theme-black min-h-screen flex flex-col relative overflow-hidden">

            <main className="grow pt-32 px-4 md:px-8 lg:px-12 max-w-[1400px] mx-auto w-full z-10 relative">

                {/* Header */}
                <div className="mb-20 text-center max-w-4xl mx-auto">
                    <AnimatedTitle
                        text="ALEF Officers, Directors & Advisors"
                        className="text-5xl md:text-7xl font-bebas text-theme-white mb-6 justify-center flex text-center"
                    />
                    <div className="h-1 w-24 bg-red-600 mx-auto mb-8"></div>
                    <p className="font-oswald text-xl text-theme-white/80 leading-relaxed">
                        Meet the dedicated leadership team and our network of expert advisors driving the mission of the American Lebanon Education Foundation.
                    </p>
                </div>

                {/* Section 1: ALEF Officers */}
                <section className="mb-24">
                    <div className="flex items-center gap-4 mb-10">
                        <span className="h-px bg-red-600 w-12"></span>
                        <h2 className="text-3xl font-bebas text-theme-white tracking-wide">ALEF Officers</h2>
                        <span className="h-px bg-theme-white/10 grow"></span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {officers.map((officer, index) => (
                            <div key={index} className="bg-[#0f2942] border border-[#1e4b7a] p-6 rounded-sm hover:-translate-y-1 transition-transform duration-300 group">
                                <div className="w-full aspect-4/5 bg-theme-black/30 mb-6 rounded-sm relative overflow-hidden">
                                    {/* Placeholder for Photo */}
                                    {/* <Image src="..." ... /> */}
                                    <div className="absolute inset-0 flex items-center justify-center text-theme-white/10 font-bebas text-4xl">
                                        PHOTO
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bebas text-white mb-2 group-hover:text-red-500 transition-colors">{officer.name}</h3>
                                <p className="font-oswald text-red-500 text-sm tracking-wide uppercase">{officer.title}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Section 2: ALEF Directors */}
                <section className="mb-24">
                    <div className="flex items-center gap-4 mb-10">
                        <span className="h-px bg-red-600 w-12"></span>
                        <h2 className="text-3xl font-bebas text-theme-white tracking-wide">ALEF Directors</h2>
                        <span className="h-px bg-theme-white/10 grow"></span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {directors.map((director, index) => (
                            <div key={index} className="bg-[#0f2942] border border-[#1e4b7a] p-8 rounded-sm flex flex-col items-center text-center hover:bg-[#153a5c] transition-colors duration-300">
                                <div className="mb-4 text-white">
                                    <Star className="w-8 h-8 fill-white" />
                                </div>
                                <h3 className="text-lg font-bebas text-white mb-3 tracking-wide">Director</h3>
                                <p className="font-oswald text-white/70 text-sm leading-relaxed">{director.title}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Section 3: ALEF Expert Advisors */}
                <section className="mb-24">
                    <div className="flex items-center gap-4 mb-10">
                        <span className="h-px bg-red-600 w-12"></span>
                        <h2 className="text-3xl font-bebas text-theme-white tracking-wide">ALEF Expert Advisors</h2>
                        <span className="h-px bg-theme-white/10 grow"></span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {advisors.map((advisor, index) => (
                            <div key={index} className="bg-[#0f2942] border border-[#1e4b7a] p-8 rounded-sm flex flex-col items-center text-center hover:bg-[#153a5c] transition-colors duration-300">
                                <div className="mb-4 text-white">
                                    <Star className="w-8 h-8 fill-white" />
                                </div>
                                <h3 className="text-lg font-bebas text-white mb-3 tracking-wide">Expert Advisor</h3>
                                <p className="font-oswald text-white/70 text-sm leading-relaxed">{advisor.title}</p>
                            </div>
                        ))}
                    </div>
                </section>

            </main>
        </div>
    );
}
