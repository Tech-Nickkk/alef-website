import Link from "next/link";
import AnimatedTitle from "../CommonCom/AnimatedTitle";
import { ArrowRight } from "lucide-react";

const BILLS = [
    {
        id: "S. 2237",
        title: "Hezbollah Money Laundering Prevention Act of 2023",
        date: "July 11, 2023",
        desc: "Imposes stricter sanctions on entities aiding Hezbollah’s money laundering, especially via drug trafficking. It targets financial systems rather than military influence.",
        link: "https://www.congress.gov/bill/118th-congress/senate-bill/2237"
    },
    {
        id: "H.R. 3358",
        title: "Lebanon Security and Accountability Act of 2023",
        date: "May 16, 2023",
        desc: "Conditions U.S. aid to bolster Lebanese security forces and reduce Hezbollah’s influence, emphasizing military support over broad sanctions.",
        link: "https://www.congress.gov/bill/118th-congress/house-bill/3358"
    },
    {
        id: "S. 2935",
        title: "Designating Hezbollah as a Transnational Criminal Organization",
        date: "September 27, 2023",
        desc: "Seeks to classify Hezbollah as a transnational criminal organization, enabling law enforcement actions against its drug and smuggling networks.",
        link: "https://www.congress.gov/bill/118th-congress/senate-bill/2935"
    },
    {
        id: "H.R. 1844",
        title: "PAGER Act",
        date: "March 28, 2023",
        desc: "Blocks funds to Lebanon’s military until it cuts ties with Iranian proxies like Hezbollah and dismantles their strongholds.",
        link: "https://www.congress.gov/bill/118th-congress/house-bill/1844"
    }
];

export default function CongressionalActions() {
    return (
        <section className="py-12 md:py-24 px-6 md:px-12 lg:px-24 bg-theme-black border-t border-theme-white/10">
            <div className="max-w-[1400px] mx-auto">

                {/* Header */}
                {/* Header */}
                <div className="flex flex-col items-center justify-center mb-16 border-b border-theme-white/10 pb-6 gap-4 text-center">
                    <AnimatedTitle
                        text="CONGRESSIONAL ACTIONS"
                        className="text-4xl md:text-6xl font-bold font-bebas text-theme-white uppercase leading-none"
                    />
                    <div className="flex items-center gap-2 text-theme-white/60 font-oswald text-xs tracking-widest">
                        <span className="w-2 h-2 bg-theme-accent rounded-full inline-block"></span>
                        LEGISLATION // UPDATES
                    </div>
                    <p className="text-theme-white/60 font-oswald text-lg tracking-wide max-w-2xl mx-auto">
                        LATEST LEGISLATIVE UPDATES AGAINST HEZBOLLAH (118TH CONGRESS)
                    </p>
                </div>

                {/* Bills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {BILLS.map((bill, index) => (
                        <div
                            key={index}
                            className="group bg-card-bg border border-theme-white/10 p-8 rounded-2xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between min-h-[300px]"
                        >
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-6">
                                    <span className="font-bebas text-3xl text-theme-accent tracking-wide">{bill.id}</span>
                                    <span className="font-oswald text-xs text-theme-white/40 tracking-widest border border-theme-white/10 px-2 py-1 rounded-sm uppercase">
                                        {bill.date}
                                    </span>
                                </div>

                                <h3 className="font-bebas text-2xl text-white mb-4 leading-snug transition-colors">
                                    {bill.title}
                                </h3>

                                <p className="font-oswald text-white/70 text-base leading-relaxed mb-8">
                                    {bill.desc}
                                </p>
                            </div>

                            <div className="relative z-10 pt-6 border-t border-theme-white/5">
                                <Link
                                    href={bill.link}
                                    target="_blank"
                                    className="group/btn flex items-center gap-4 w-full justify-between relative"
                                >
                                    <span className="text-white font-bebas text-lg tracking-wider group-hover/btn:text-theme-accent transition-colors relative">
                                        READ OFFICIAL BILL
                                        <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-theme-accent transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-500 origin-right group-hover/btn:origin-left ease-out"></span>
                                    </span>
                                    <div className="w-10 h-10 border border-theme-white/20 rounded-full flex items-center justify-center group-hover/btn:bg-theme-accent group-hover/btn:border-theme-accent transition-all duration-300 bg-theme-black">
                                        <ArrowRight className="w-5 h-5 text-theme-white" />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}