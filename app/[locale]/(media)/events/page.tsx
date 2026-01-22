import AnimatedTitle from "@/app/components/CommonCom/AnimatedTitle";
import SkeletonImage from "@/app/components/CommonCom/SkeletonImage";
import { Calendar, MapPin, Clock, Building2, User, Ticket, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function EventsPage() {
    const t = useTranslations("EventsPage");

    const sponsorshipTiers = [
        {
            level: t("sponsors.levels.diamond.name"),
            price: "$25,000",
            color: "from-blue-400 to-blue-600",
            accent: "border-blue-400",
            features: [
                t("sponsors.levels.diamond.features.0"),
                t("sponsors.levels.diamond.features.1"),
                t("sponsors.levels.diamond.features.2")
            ]
        },
        {
            level: t("sponsors.levels.platinum.name"),
            price: "$15,000",
            color: "from-gray-100 to-gray-300",
            accent: "border-gray-200",
            features: [
                t("sponsors.levels.platinum.features.0"),
                t("sponsors.levels.platinum.features.1"),
                t("sponsors.levels.platinum.features.2"),
                t("sponsors.levels.platinum.features.3"),
                t("sponsors.levels.platinum.features.4"),
                t("sponsors.levels.platinum.features.5")
            ]
        },
        {
            level: t("sponsors.levels.gold.name"),
            price: "$10,000",
            color: "from-yellow-400 to-yellow-600",
            accent: "border-yellow-500",
            features: [
                t("sponsors.levels.gold.features.0"),
                t("sponsors.levels.gold.features.1"),
                t("sponsors.levels.gold.features.2"),
                t("sponsors.levels.gold.features.3")
            ]
        },
        {
            level: t("sponsors.levels.sapphire.name"),
            price: "$5,000",
            color: "from-blue-500 to-blue-700",
            accent: "border-blue-600",
            features: [
                t("sponsors.levels.sapphire.features.0"),
                t("sponsors.levels.sapphire.features.1"),
                t("sponsors.levels.sapphire.features.2")
            ]
        },
        {
            level: t("sponsors.levels.silver.name"),
            price: "$2,500",
            color: "from-gray-300 to-gray-500",
            accent: "border-gray-400",
            features: [
                t("sponsors.levels.silver.features.0"),
                t("sponsors.levels.silver.features.1"),
                t("sponsors.levels.silver.features.2")
            ]
        },
        {
            level: t("sponsors.levels.individual.name"),
            price: "$250",
            color: "from-red to-red/80",
            accent: "border-red",
            features: [t("sponsors.levels.individual.features.0")]
        },
    ];

    const accommodations = [
        {
            name: t("accommodations.items.hotel1.name"),
            link: "https://3westclub.com/about-us/",
            address: t("accommodations.items.hotel1.address")
        },
        {
            name: t("accommodations.items.hotel2.name"),
            link: "https://www.warwickhotels.com/warwick-new-york",
            address: t("accommodations.items.hotel2.address")
        },
        {
            name: t("accommodations.items.hotel3.name"),
            link: "https://www.hilton.com/en/hotels/nycnhhh-new-york-hilton-midtown/",
            address: t("accommodations.items.hotel3.address")
        },
    ];

    return (
        <main className="min-h-screen bg-background pt-32 pb-24 px-6 md:px-12 lg:px-24 flex flex-col items-center">

            {/* Header */}
            <div className="max-w-4xl mx-auto text-center mb-24 space-y-6">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <span className="w-1.5 h-1.5 bg-red rounded-full animate-pulse"></span>
                    <span className="font-oswald text-red tracking-[0.3em] uppercase text-xs font-bold">{t("header.tagline")}</span>
                    <span className="w-1.5 h-1.5 bg-red rounded-full animate-pulse"></span>
                </div>
                <AnimatedTitle
                    text={t("header.title")}
                    className="text-6xl md:text-8xl font-bold font-bebas text-foreground uppercase leading-none"
                />
                <div className="h-1 w-24 bg-red mx-auto"></div>
                <p className="font-oswald text-foreground/70 text-lg max-w-2xl mx-auto leading-relaxed">
                    {t("header.description")}
                </p>
            </div>

            {/* UPCOMING EVENT DETAILS */}
            <div className="w-full mb-24">
                <div className="group relative bg-blue border border-white/10 rounded-sm overflow-hidden shadow-2xl flex flex-col">

                    {/* Image Section - Full Width, Uncropped */}
                    <div className="relative w-full h-auto">
                        <div className="absolute inset-0 bg-blue/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
                        <SkeletonImage
                            src="/events/event-img-1.jpg"
                            alt="ALEF Event"
                            width={1200}
                            height={800}
                            style={{ width: "100%", height: "auto" }}
                            className="object-contain"
                        />
                    </div>

                    {/* Info Section */}
                    <div className="w-full p-8 md:p-12 lg:p-16 flex flex-col relative bg-blue">
                        <div className="space-y-8 relative z-10">

                            {/* Title & Description */}
                            <div>
                                <h3 className="text-3xl md:text-5xl font-bebas text-white leading-none mb-4">
                                    {t("hero.titlePart1")} <span className="text-red">{t("hero.titlePart2")}</span>
                                </h3>
                                <p className="font-oswald text-white/70 text-base md:text-lg leading-relaxed mb-6">
                                    {t("hero.descriptionPart1")} <span className="text-white">{t("hero.descriptionPart2")}</span>.
                                </p>
                            </div>

                            {/* Logistics Grid */}
                            <div className="grid md:grid-cols-2 gap-8 border-t border-white/10 pt-8">
                                <div className="space-y-4">
                                    <div className="flex gap-4">
                                        <div className="p-2 bg-red/90 rounded text-white h-fit"><Calendar className="w-5 h-5" /></div>
                                        <div>
                                            <span className="block font-bebas text-xl text-white">{t("hero.date")}</span>
                                            <span className="block font-oswald text-xs text-white/50 uppercase tracking-widest">{t("hero.calendarNote")}</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="p-2 bg-red/90 rounded text-white h-fit"><Clock className="w-5 h-5" /></div>
                                        <div>
                                            <span className="block font-bebas text-xl text-white">{t("hero.reception")}</span>
                                            <span className="block font-bebas text-xl text-white">{t("hero.dinner")}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex gap-4">
                                        <div className="p-2 bg-red/90 rounded text-white h-fit"><MapPin className="w-5 h-5" /></div>
                                        <div>
                                            <span className="block font-bebas text-xl text-white">{t("hero.venueName")}</span>
                                            <span className="block font-oswald text-sm text-white/70">{t("hero.venueAddress")}</span>
                                            <a href="tel:2125825454" className="block font-oswald text-xs text-red hover:text-white mt-1 transition-colors">(212) 582-5454</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="pt-4 flex flex-wrap gap-4 justify-center md:justify-start">
                                <Link
                                    href="https://www.zeffy.com/"
                                    target="_blank"
                                    className="bg-red hover:bg-[#c4151c] text-white px-8 py-4 font-bebas text-lg tracking-widest uppercase transition-all shadow-lg hover:shadow-red/20 flex items-center gap-2"
                                >
                                    <Ticket className="w-4 h-4" /> {t("hero.reserveTicket")}
                                </Link>
                                <Link
                                    href="/contact"
                                    className="border border-white/20 hover:border-white text-white px-8 py-4 font-bebas text-lg tracking-widest uppercase transition-all flex items-center gap-2"
                                >
                                    <Mail className="w-4 h-4" />
                                    {t("hero.contactUs")}
                                </Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* INVITED OFFICIALS SECTION */}
            <div className="w-full max-w-6xl mx-auto mb-24 reveal-anim">
                <div className="bg-white border border-black/5 shadow-xl rounded-sm overflow-hidden">
                    {/* Header Banner */}
                    <div className="bg-blue py-6 px-8 text-center border-b border-white/10">
                        <h3 className="font-bebas text-3xl md:text-4xl text-white tracking-widest uppercase">
                            {t("officials.title")}
                        </h3>
                    </div>

                    <div className="grid md:grid-cols-2">
                        {/* Column 1 */}
                        <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-black/5 relative">
                            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-red/20 to-transparent"></div>

                            <h4 className="font-bebas text-2xl text-blue mb-8 flex items-center gap-3">
                                <span className="bg-red/10 p-2 rounded text-red"><Building2 className="w-5 h-5" /></span>
                                {t("officials.executiveTitle")}
                            </h4>

                            <ul className="space-y-8">
                                <li className="group">
                                    <div className="flex items-start gap-4">
                                        <div className="mt-1 w-2 h-2 bg-red rounded-full shrink-0"></div>
                                        <div>
                                            <strong className="block font-oswald text-lg text-foreground uppercase tracking-wide mb-1">{t("officials.whiteHouse")}</strong>
                                            <span className="font-oswald text-foreground/70 text-sm leading-relaxed block">
                                                {t("officials.whiteHouseDesc")}
                                            </span>
                                        </div>
                                    </div>
                                </li>
                                <li className="group">
                                    <div className="flex items-start gap-4">
                                        <div className="mt-1 w-2 h-2 bg-red rounded-full shrink-0"></div>
                                        <div>
                                            <strong className="block font-oswald text-lg text-foreground uppercase tracking-wide mb-1">{t("officials.stateDept")}</strong>
                                            <span className="font-oswald text-foreground/70 text-sm leading-relaxed block">
                                                {t("officials.stateDeptDesc")}
                                            </span>
                                        </div>
                                    </div>
                                </li>
                                <li className="group">
                                    <div className="flex items-start gap-4">
                                        <div className="mt-1 w-2 h-2 bg-red rounded-full shrink-0"></div>
                                        <div>
                                            <strong className="block font-oswald text-lg text-foreground uppercase tracking-wide mb-1">{t("officials.defenseDept")}</strong>
                                            <span className="font-oswald text-foreground/70 text-sm leading-relaxed block">
                                                {t("officials.defenseDeptDesc")}
                                            </span>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* Column 2 */}
                        <div className="p-8 md:p-12 relative">
                            <h4 className="font-bebas text-2xl text-blue mb-8 flex items-center gap-3">
                                <span className="bg-red/10 p-2 rounded text-red"><User className="w-5 h-5" /></span>
                                {t("officials.legislativeTitle")}
                            </h4>

                            <ul className="space-y-8">
                                <li className="group">
                                    <div className="flex items-start gap-4">
                                        <div className="mt-1 w-2 h-2 bg-red rounded-full shrink-0"></div>
                                        <div>
                                            <strong className="block font-oswald text-lg text-foreground uppercase tracking-wide mb-1">{t("officials.un")}</strong>
                                            <span className="font-oswald text-foreground/70 text-sm leading-relaxed block">
                                                {t("officials.unDesc")}
                                            </span>
                                        </div>
                                    </div>
                                </li>
                                <li className="group">
                                    <div className="flex items-start gap-4">
                                        <div className="mt-1 w-2 h-2 bg-red rounded-full shrink-0"></div>
                                        <div>
                                            <strong className="block font-oswald text-lg text-foreground uppercase tracking-wide mb-1">{t("officials.congress")}</strong>
                                            <span className="font-oswald text-foreground/70 text-sm leading-relaxed block mb-1">
                                                {t("officials.congressDesc1")}
                                            </span>
                                            <span className="font-oswald text-foreground/70 text-sm leading-relaxed block border-t border-black/5 pt-1 mt-1">
                                                {t("officials.congressDesc2")}
                                            </span>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* SPONSORSHIP TIERS */}
            <div className="w-full max-w-7xl mx-auto mb-24 reveal-anim">
                <div className="text-center mb-12">
                    <h3 className="font-bebas text-4xl lg:text-5xl text-foreground mb-4">{t("sponsors.title")}</h3>
                    <div className="flex items-center justify-center gap-4 text-foreground/60 font-oswald text-sm uppercase tracking-widest">
                        <span className="h-px w-12 bg-foreground/20"></span>
                        <span>{t("sponsors.subtitle")}</span>
                        <span className="h-px w-12 bg-foreground/20"></span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sponsorshipTiers.map((tier, idx) => (
                        <div
                            key={idx}
                            className={`group relative overflow-hidden rounded-xl border bg-blue transition-all duration-500 ease-out hover:scale-[1.01] hover:shadow-2xl hover:z-10 ${idx === 0
                                ? 'md:col-span-2 lg:col-span-1 border-white/20 ring-1 ring-white/10'
                                : 'border-white/10'
                                } ${(tier as any).accent ? `hover:${(tier as any).accent}` : 'hover:border-red'}`}
                        >
                            {/* Shine Effect */}
                            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-linear-to-r from-transparent via-white/10 to-transparent z-0 pointer-events-none"></div>

                            {/* Colored Glow Overlay at Bottom */}
                            <div className={`absolute inset-0 bg-linear-to-t ${tier.color} opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none`}></div>

                            <div className="p-6 md:p-8 flex flex-col h-full relative z-10">
                                <div className="mb-6 flex justify-between items-center">
                                    <h4 className={`font-bebas text-3xl tracking-wide transition-colors duration-300 ${idx === 0 ? 'text-white' : 'text-white/90 group-hover:text-white'}`}>
                                        {tier.level}
                                    </h4>
                                    {idx === 0 && (
                                        <span className="bg-red text-white text-[8px] md:text-[10px] font-oswald font-bold px-1 md:px-2 py-1 rounded-sm tracking-widest uppercase animate-pulse">
                                            {t("sponsors.mostExclusive")}
                                        </span>
                                    )}
                                </div>

                                <div className="text-4xl md:text-5xl font-bebas text-white mb-2">{tier.price}</div>

                                {/* Dynamic Separator Line */}
                                <div className={`h-1 mb-6 transition-all duration-500 ease-out w-12 group-hover:w-full ${tier.color ? `group-hover:bg-linear-to-r ${tier.color}` : 'group-hover:bg-white'} bg-white/20`}></div>

                                <div className="flex-1 mb-8">
                                    <ul className="space-y-3">
                                        {tier.features.map((feat, i) => (
                                            <li key={i} className="flex items-start gap-3 text-white/70 font-oswald text-sm font-light">
                                                <span className="mt-1.5 w-1.5 h-1.5 bg-red rounded-full shrink-0"></span>
                                                {feat}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <Link
                                    href="https://www.zeffy.com/"
                                    target="_blank"
                                    className="w-full py-4 font-bebas text-xl tracking-widest uppercase text-center border transition-all duration-300 bg-transparent border-white/20 text-white hover:bg-white hover:text-blue relative overflow-hidden group/btn"
                                >
                                    <span className="relative z-10">{t("sponsors.selectPackage")}</span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ACCOMMODATIONS */}
            <div className="w-full max-w-6xl mx-auto reveal-anim">
                <div className="text-center mb-12">
                    <h3 className="font-bebas text-4xl lg:text-5xl text-foreground mb-4">{t("accommodations.title")}</h3>
                    <p className="font-oswald text-foreground/60 text-sm uppercase tracking-widest">{t("accommodations.subtitle")}</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {accommodations.map((hotel, idx) => (
                        <a
                            key={idx}
                            href={hotel.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white border border-foreground/10 p-8 rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col items-center text-center"
                        >
                            <div className="w-16 h-16 bg-blue/5 rounded-full flex items-center justify-center text-blue mb-6 group-hover:bg-red group-hover:text-white transition-colors duration-300">
                                <Building2 className="w-8 h-8" />
                            </div>
                            <h4 className="font-bebas text-2xl text-foreground mb-2 group-hover:text-blue transition-colors">{hotel.name}</h4>
                            <p className="font-oswald text-foreground/50 text-sm mb-6 uppercase tracking-wide">{hotel.address}</p>

                            <div className="mt-auto inline-flex items-center gap-2 text-sm font-oswald text-red uppercase tracking-widest font-bold border-b border-transparent group-hover:border-red pb-1 transition-all">
                                {t("accommodations.viewProperty")}
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </a>
                    ))}
                </div>
            </div>

        </main>
    );
}
