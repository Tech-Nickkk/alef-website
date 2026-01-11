import Link from "next/link";
import AnimatedTitle from "../CommonCom/AnimatedTitle";
import GlowingGrid from "../CommonCom/GlowingGrid";
import { Video, Smartphone, Mic, Calendar, ArrowRight, Film, Images, Play } from "lucide-react";

export default function Media() {
    const mediaItems = [
        {
            id: "events",
            label: "ON_THE_GROUND",
            title: "EVENTS",
            desc: "Photo documentation and reports from our global advocacy events.",
            link: "/events",
            icon: <Images className="w-10 h-10 text-white group-hover:text-red transition-all duration-300" />
        },
        {
            id: "podcasts",
            label: "AUDIO_LOGS",
            title: "PODCASTS",
            desc: "Deep dive discussions with experts on policy and sovereignty.",
            link: "/podcasts",
            icon: <Mic className="w-10 h-10 text-white group-hover:text-red transition-all duration-300" />
        },
        {
            id: "shorts",
            label: "QUICK_INTEL",
            title: "SHORTS",
            desc: "Rapid-fire insights and updates. Truth in under 60 seconds.",
            link: "/shorts",
            icon: <Smartphone className="w-10 h-10 text-white group-hover:text-red transition-all duration-300" />
        },
        {
            id: "videos",
            label: "VISUAL_ARCHIVE",
            title: "VIDEOS",
            desc: "Watch our latest documentaries, interviews, and visual investigations.",
            link: "/videos",
            icon: <Video className="w-10 h-10 text-white group-hover:text-red transition-all duration-300" />
        }
    ];

    return (
        <section className="py-12 md:py-24 px-6 md:px-12 lg:px-24">
            <div className="max-w-[1400px] mx-auto">

                {/* Header */}
                <div className="flex flex-col items-center justify-center mb-16 pb-6 gap-4 text-center">
                    <AnimatedTitle
                        text="MEDIA"
                        className="text-4xl md:text-6xl font-bold font-bebas text-foreground uppercase leading-none"
                    />
                    <div className="flex items-center gap-2 text-foreground/60 font-oswald text-xs tracking-widest">
                        <span className="w-2 h-2 bg-red rounded-full inline-block"></span>
                        ARCHIVE // MEDIA
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {mediaItems.map((item, index) => (
                        <div key={index} className="bg-blue border border-white/10 p-12 flex flex-col justify-center relative overflow-hidden group rounded-2xl hover:border-white/30 transition-colors duration-500 min-h-[400px]">
                            {/* Interactive Glowing Grid Background */}
                            <GlowingGrid />

                            <div className="relative z-30 h-full flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-6">
                                        <span className="font-oswald text-xs tracking-[0.2em] text-red block">{item.label}</span>
                                        <div className="p-3 bg-white/5 rounded-full border border-white/10 group-hover:border-red/50 transition-colors">
                                            {item.icon}
                                        </div>
                                    </div>

                                    <h2 className="text-4xl md:text-5xl font-bold text-white font-bebas mb-6 leading-none group-hover:translate-x-2 transition-transform duration-500">{item.title}</h2>

                                    <p className="text-white/60 font-oswald text-lg leading-relaxed mb-8 max-w-sm">
                                        {item.desc}
                                    </p>
                                </div>

                                <Link href={item.link} className="group/btn flex items-center gap-4 relative w-fit">
                                    <span className="text-white font-bebas text-xl tracking-wider group-hover/btn:text-red transition-colors relative">
                                        EXPLORE
                                        <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-red transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-500 origin-right group-hover/btn:origin-left ease-out"></span>
                                    </span>
                                    <ArrowRight className="w-5 h-5 text-white group-hover/btn:text-red transition-colors" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
