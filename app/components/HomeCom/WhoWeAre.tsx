import Link from "next/link";
import AnimatedTitle from "../CommonCom/AnimatedTitle";

const sections = [
    {
        id: "01",
        subtitle: "IDENTITY",
        title: "ALEF Profile",
        description: "A collective of Lebanese and American professionals united by a shared vision of a free, sovereign, and prosperous Lebanon.",
        href: "/alef-profile",
        icon: (
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        )
    },
    {
        id: "02",
        subtitle: "PRINCIPLES",
        title: "Core Values",
        description: "Sovereignty, Transparency, Economic Freedom, Rule of Law, and Meritocracy. We believe in ethical governance.",
        href: "/core-values",
        icon: (
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <circle cx="12" cy="10" r="3" />
            </svg>
        )
    },
    {
        id: "03",
        subtitle: "FUTURE",
        title: "Strategic plan",
        description: "To establish a transparent, accountable, and self-sustaining Lebanon, free from external influence, where justice prevails.",
        href: "/strategic-plan",
        icon: (
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
            </svg>
        )
    },
    {
        id: "04",
        subtitle: "LEADERSHIP",
        title: "Experts Corner",
        description: "Meet the dedicated officers, directors, and advisors driving our mission forward, led by Ziad K. Abdelnour.",
        href: "/experts-corner",
        icon: (
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        )
    }
];

export default function WhoWeAre() {
    return (
        <section className="min-h-screen flex flex-col justify-center relative py-12">
            {/* Header Section */}
            <div className="w-full px-6 md:px-12 lg:px-24 mb-12">
                <div className="flex flex-col items-center justify-center gap-4 text-center">
                    <AnimatedTitle
                        text="WHO WE ARE"
                        className="text-4xl md:text-6xl font-bold font-bebas text-foreground uppercase leading-none"
                    />
                    <div className="flex items-center gap-2 text-foreground/60 font-oswald text-xs tracking-widest">
                        <span className="w-2 h-2 bg-red rounded-full inline-block"></span>
                        MISSION // VISION
                    </div>
                </div>
            </div>

            {/* Grid Container */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 md:px-12 lg:px-24 w-full">
                {sections.map((item, idx) => (
                    <div key={idx} className="relative group w-full h-[400px] md:h-[500px]">
                        <Link href={item.href} className="block h-full">
                            <div className="bg-blue transition-all duration-300 h-full rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden hover:bg-light-blue">

                                {/* Top Row */}
                                <div className="flex justify-between items-start font-oswald text-xs tracking-widest text-white/60">
                                    <span>{item.id}</span>
                                    <span>{item.subtitle}</span>
                                </div>

                                {/* Center Icon */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                                    {item.icon}
                                </div>

                                {/* Bottom Row */}
                                <div className="relative z-10 flex flex-col justify-end h-full">
                                    <h3 className="text-4xl md:text-7xl font-bebas text-white uppercase leading-none mb-4">
                                        {item.title}
                                    </h3>
                                    <p className="font-oswald text-white/70 text-sm md:text-base leading-relaxed max-w-md">
                                        {item.description}
                                    </p>
                                </div>

                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
}