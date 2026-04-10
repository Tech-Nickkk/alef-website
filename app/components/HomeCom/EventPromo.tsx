"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowRight, Calendar, MapPin, Ticket } from "lucide-react";

export default function EventPromo() {
    const t = useTranslations("EventsPage");

    return (
        <section className="w-full bg-background py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
                <div className="w-full bg-blue text-white relative overflow-hidden border border-red/30 rounded-md shadow-2xl">
                    {/* Background Image with Overlay */}
                    <div className="absolute inset-0 z-0 bg-blue">
                        <img
                            src="/events/Event_Image.jpg"
                            alt="ALEF Event Promo"
                            className="w-full h-full object-cover object-right opacity-60 saturate-0 hover:saturate-100 transition-all duration-1000"
                        />
                        <div className="absolute inset-0 bg-linear-to-r from-blue via-blue/70 to-blue/10"></div>
                    </div>

                    <div className="relative z-10 px-8 py-16 md:px-16 flex flex-col lg:flex-row items-center gap-12">
                        {/* Content Side */}
                        <div className="flex-1 space-y-8">
                            <div className="inline-flex items-center gap-3 bg-red/20 px-4 py-2 border border-red/30 shadow-[0_0_15px_rgba(196,21,28,0.3)]">
                                <span className="w-2 h-2 bg-red rounded-full animate-pulse"></span>
                                <span className="font-oswald text-red tracking-[0.3em] uppercase text-xs font-bold leading-none">
                                    {t("header.tagline")}
                                </span>
                            </div>

                            <div>
                                <h2 className="text-4xl md:text-6xl lg:text-7xl font-bebas text-white leading-none mb-4">
                                    {t("hero.titlePart1")} <span className="text-red">{t("hero.titlePart2")}</span>
                                </h2>
                                <p className="font-oswald text-white/80 text-lg md:text-xl leading-relaxed max-w-2xl border-l-2 border-red pl-4">
                                    {t("header.description")}
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-6 font-bebas text-xl md:text-2xl pt-4">
                                <div className="flex items-center gap-3">
                                    <Calendar className="text-red w-6 h-6" />
                                    <span>{t("hero.date")}</span>
                                </div>
                                <div className="hidden sm:block text-red/50">•</div>
                                <div className="flex items-center gap-3">
                                    <MapPin className="text-red w-6 h-6" />
                                    <a href="https://yaranyc.com/" target="_blank" rel="noopener noreferrer" className="hover:text-red transition-colors duration-200">{t("hero.venueName")}</a>
                                </div>
                            </div>

                            <div className="pt-8 flex flex-wrap gap-4">
                                <Link
                                    href="https://www.zeffy.com/en-US/ticketing/gathering-for-a-new-lebanon"
                                    target="_blank"
                                    className="group inline-flex items-center gap-4 bg-red hover:bg-[#c4151c] text-white px-8 py-5 font-bebas text-xl tracking-widest uppercase transition-all shadow-xl hover:shadow-red/40"
                                >
                                    <Ticket className="w-6 h-6" />
                                    {t("hero.reserveTicket")}
                                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                                </Link>
                                <Link
                                    href="/events"
                                    className="group relative bg-transparent border border-white/70 text-white px-8 py-5 text-xl font-bold tracking-[0.2em] font-bebas overflow-hidden transition-all hover:border-white/50 isolate cursor-pointer flex items-center gap-4 uppercase shadow-xl"
                                >
                                    <span className="relative z-10 group-hover:text-blue transition-colors duration-300 flex items-center gap-4">
                                        Learn More
                                        <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                                    </span>
                                    <div className="absolute inset-0 bg-white transform scale-y-0 origin-top group-hover:scale-y-100 group-hover:origin-bottom transition-transform duration-500 ease-out -z-10"></div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
