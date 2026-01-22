import AnimatedTitle from "@/app/components/CommonCom/AnimatedTitle";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { ShieldAlert, Gavel, Radio, Mic2, ShieldCheck, TrendingUp, AlarmClock, Quote } from "lucide-react";

export default function AlefProfilePage() {
    const t = useTranslations('AlefProfilePage');

    return (
        <main className="min-h-screen bg-background pt-24 md:pt-32 pb-16 md:pb-24 px-4 md:px-12 lg:px-24">
            <div className="max-w-6xl mx-auto space-y-16 md:space-y-24">

                {/* --- Header Section (Full Message) --- */}
                <div className="space-y-8 md:space-y-12 text-center md:text-left">
                    <div className="text-center space-y-4 md:space-y-6">
                        <div className="flex items-center justify-center gap-3">
                            <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-red rounded-full animate-pulse"></span>
                            <span className="font-oswald text-red tracking-[0.2em] uppercase text-xs md:text-sm font-bold">{t('header.subtitle')}</span>
                            <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-red rounded-full animate-pulse"></span>
                        </div>

                        <AnimatedTitle
                            text={t('header.title')}
                            className="text-4xl md:text-7xl lg:text-8xl font-bold font-bebas text-foreground uppercase leading-none"
                        />
                    </div>

                    {/* Updated Chairman's Letter Card - Static */}
                    <div className="relative bg-blue border border-white/10 p-6 md:p-14 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                        {/* Decorative Corner */}
                        <div className="absolute top-0 right-0 w-24 h-24 md:w-40 md:h-40 bg-white/5 rounded-bl-[60px] md:rounded-bl-[100px]"></div>

                        <div className="relative z-10">
                            <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start mb-6 md:mb-10">
                                <div className="p-3 bg-linear-to-br from-red to-red/60 rounded-lg text-white shrink-0 shadow-lg">
                                    <Quote className="w-6 h-6 md:w-8 md:h-8" />
                                </div>
                                <h3 className="font-bebas text-2xl md:text-4xl text-white pt-1 md:pt-2 leading-tight">
                                    {t('chairmanMessage.title')}
                                </h3>
                            </div>

                            <div className="font-oswald text-white/80 text-base md:text-xl leading-relaxed md:leading-loose space-y-6 text-left md:text-justify">
                                <p>
                                    {t('chairmanMessage.p1')}
                                </p>
                                <p>
                                    {t('chairmanMessage.p2')}
                                </p>
                                <p>
                                    {t('chairmanMessage.p3')}
                                </p>
                                <p>
                                    {t('chairmanMessage.p4')}
                                </p>
                                <p>
                                    {t('chairmanMessage.p5')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- WHO WE ARE (Blue Cards - Static) --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    <div className="relative p-6 md:p-10 border border-white/10 bg-blue rounded-2xl md:rounded-3xl overflow-hidden shadow-xl shadow-blue/20 flex flex-col h-full">
                        <div className="absolute top-0 right-0 p-4 md:p-6">
                            <div className="w-3 h-3 md:w-4 md:h-4 bg-red rounded-full shadow-[0_0_15px_rgba(220,38,38,1)]"></div>
                        </div>
                        <div className="relative z-10 flex flex-col h-full gap-4 md:gap-6 text-white">
                            <span className="font-oswald text-xs md:text-sm tracking-widest text-white/60 uppercase">{t('whoWeAre.foundation.subtitle')}</span>
                            <span className="font-bebas text-5xl md:text-6xl">{t('whoWeAre.foundation.title')}</span>
                            <p className="font-oswald text-sm md:text-base text-white/80 leading-relaxed grow">
                                {t('whoWeAre.foundation.desc')}
                            </p>
                            <div className="mt-6 md:mt-auto pt-6 md:pt-8 border-t border-white/10">
                                <span className="inline-block py-2 px-3 md:px-4 rounded bg-white/10 border border-white/10 text-white font-oswald text-[10px] md:text-xs tracking-[0.2em] font-bold uppercase">{t('whoWeAre.foundation.tag')}</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative p-6 md:p-10 border border-white/10 bg-blue rounded-2xl md:rounded-3xl overflow-hidden shadow-xl shadow-blue/20 flex flex-col h-full">
                        <div className="absolute top-0 right-0 p-4 md:p-6">
                            <div className="w-3 h-3 md:w-4 md:h-4 bg-red rounded-full shadow-[0_0_15px_rgba(220,38,38,1)]"></div>
                        </div>
                        <div className="relative z-10 flex flex-col h-full gap-4 md:gap-6 text-white">
                            <span className="font-oswald text-xs md:text-sm tracking-widest text-white/60 uppercase">{t('whoWeAre.pac.subtitle')}</span>
                            <span className="font-bebas text-5xl md:text-6xl">{t('whoWeAre.pac.title')}</span>
                            <p className="font-oswald text-sm md:text-base text-white/80 leading-relaxed grow">
                                {t('whoWeAre.pac.desc')}
                            </p>
                            <div className="mt-6 md:mt-auto pt-6 md:pt-8 border-t border-white/10">
                                <span className="inline-block py-2 px-3 md:px-4 rounded bg-white/10 border border-white/10 text-white font-oswald text-[10px] md:text-xs tracking-[0.2em] font-bold uppercase">{t('whoWeAre.pac.tag')}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Hezbollah Accountability Act (Static UI) --- */}
                <div className="relative bg-blue text-white rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl shadow-blue/20 border border-white/10">
                    {/* Decorative Corner */}
                    <div className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48 bg-white/5 rounded-bl-[100px] md:rounded-bl-[150px]"></div>

                    <div className="p-6 md:p-16 relative z-10">
                        <div className="flex flex-col gap-8 md:gap-12 items-start mb-10 md:mb-16 border-b border-white/10 pb-8 md:pb-12">
                            <div className="space-y-4 md:space-y-6">
                                <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-4 md:mb-6">
                                    <div className="p-3 md:p-4 bg-linear-to-br from-red to-red/60 rounded-xl text-white shadow-lg">
                                        <ShieldAlert className="w-8 h-8 md:w-10 md:h-10" />
                                    </div>
                                    <span className="inline-block py-1.5 px-3 md:py-2 md:px-4 rounded bg-white/10 border border-white/10 text-white font-oswald text-[10px] md:text-xs tracking-[0.2em] font-bold uppercase">
                                        {t('baa.tag')}
                                    </span>
                                </div>
                                <AnimatedTitle
                                    text={t('baa.title')}
                                    className="text-3xl md:text-6xl font-bold font-bebas text-white/95 uppercase leading-none tracking-wide"
                                />
                                <p className="font-oswald text-base md:text-xl text-white/80 leading-relaxed max-w-3xl">
                                    {t('baa.desc')}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            {[
                                { title: t('baa.points.0.title'), desc: t('baa.points.0.desc') },
                                { title: t('baa.points.1.title'), desc: t('baa.points.1.desc') },
                                { title: t('baa.points.2.title'), desc: t('baa.points.2.desc') },
                                { title: t('baa.points.3.title'), desc: t('baa.points.3.desc') }
                            ].map((item, idx) => (
                                <div key={idx} className="flex gap-4 md:gap-6 p-6 md:p-8 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl items-start">
                                    <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-lg bg-linear-to-br from-red to-red/60 font-bebas text-xl md:text-2xl text-white shrink-0">
                                        0{idx + 1}
                                    </div>
                                    <div>
                                        <h4 className="font-bebas text-xl md:text-2xl mb-2 text-white">{item.title}</h4>
                                        <p className="font-oswald text-sm md:text-lg text-white/70 leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* --- Why Support Matters (Static) --- */}
                <div className="space-y-8 md:space-y-12">
                    <div className="text-center max-w-3xl mx-auto">
                        <AnimatedTitle
                            text={t('support.title')}
                            className="text-4xl md:text-6xl font-bold font-bebas text-foreground uppercase leading-none"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {[
                            { icon: <Gavel className="w-6 h-6 md:w-8 md:h-8" />, title: t('support.tiers.0.title'), desc: t('support.tiers.0.desc') },
                            { icon: <Radio className="w-6 h-6 md:w-8 md:h-8" />, title: t('support.tiers.1.title'), desc: t('support.tiers.1.desc') },
                            { icon: <Mic2 className="w-6 h-6 md:w-8 md:h-8" />, title: t('support.tiers.2.title'), desc: t('support.tiers.2.desc') },
                            { icon: <ShieldCheck className="w-6 h-6 md:w-8 md:h-8" />, title: t('support.tiers.3.title'), desc: t('support.tiers.3.desc') }
                        ].map((tier, idx) => (
                            <div key={idx} className="relative p-6 md:p-8 border border-white/10 bg-blue rounded-2xl md:rounded-3xl overflow-hidden shadow-lg group hover:border-white/30 transition-colors">
                                <div className="relative z-10 flex flex-col h-full gap-4 md:gap-6 text-white">
                                    <div className="w-12 h-12 md:w-14 md:h-14 bg-linear-to-br from-red to-red/60 rounded-xl flex items-center justify-center text-white border-white/10 shadow-lg shadow-red/20 shrink-0">
                                        {tier.icon}
                                    </div>
                                    <div>
                                        <span className="font-bebas text-2xl md:text-3xl block mb-2 md:mb-4">{tier.title}</span>
                                        <p className="font-oswald text-sm text-white/70 leading-relaxed">
                                            {tier.desc}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- Why Now (Static) --- */}
                <div className="border-t border-foreground/10 pt-16 md:pt-20">
                    <div className="max-w-6xl mx-auto space-y-12 md:space-y-16">
                        <div className="text-center">
                            <AnimatedTitle
                                text={t('whyNow.title')}
                                className="text-4xl md:text-6xl font-bold font-bebas text-foreground uppercase leading-none"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                            {/* Opportunity Card */}
                            <div className="relative p-6 md:p-10 border border-white/10 rounded-2xl md:rounded-3xl bg-blue text-white overflow-hidden shadow-xl">
                                <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-white/5 rounded-bl-[80px] md:rounded-bl-[100px]"></div>
                                <div className="relative z-10 flex flex-col gap-4 md:gap-6">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-linear-to-br from-red to-red/60 rounded-lg text-white shadow-lg shadow-red/20">
                                            <TrendingUp className="w-6 h-6 md:w-8 md:h-8" />
                                        </div>
                                        <span className="text-white font-bebas text-2xl md:text-3xl tracking-wide">{t('whyNow.opportunity.title')}</span>
                                    </div>
                                    <h3 className="font-oswald text-white/80 text-xl md:text-3xl leading-snug">
                                        {t('whyNow.opportunity.headline')}
                                    </h3>
                                    <p className="font-oswald text-white/60 text-base md:text-lg">
                                        {t('whyNow.opportunity.desc')}
                                    </p>
                                </div>
                            </div>

                            {/* Urgency Card */}
                            <div className="relative p-6 md:p-10 border border-white/10 rounded-2xl md:rounded-3xl bg-blue text-white overflow-hidden shadow-xl">
                                <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-white/5 rounded-bl-[80px] md:rounded-bl-[100px]"></div>
                                <div className="relative z-10 flex flex-col gap-4 md:gap-6">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-linear-to-br from-red to-red/60 rounded-lg text-white shadow-lg shadow-red/20">
                                            <AlarmClock className="w-6 h-6 md:w-8 md:h-8" />
                                        </div>
                                        <span className="text-white font-bebas text-2xl md:text-3xl tracking-wide">{t('whyNow.urgency.title')}</span>
                                    </div>
                                    <h3 className="font-oswald text-white/80 text-xl md:text-3xl leading-snug">
                                        {t('whyNow.urgency.headline')}
                                    </h3>
                                    <p className="font-oswald text-white/60 text-base md:text-lg">
                                        {t('whyNow.urgency.desc')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- DOWNLOAD DOCUMENT BUTTON --- */}
                <div className="flex justify-center pt-8 md:pt-12 relative z-10 w-full">
                    <Link
                        href="/about/ALEF_Profile.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full md:w-auto"
                    >
                        <button className="w-full md:w-auto group relative bg-transparent border border-foreground/70 text-foreground px-12 py-4 text-sm font-bold tracking-[0.2em] uppercase font-oswald overflow-hidden transition-all hover:border-foreground/50 isolate cursor-pointer">
                            <span className="relative z-10 group-hover:text-background transition-colors duration-300">
                                {t('downloadButton')}
                            </span>
                            <div className="absolute inset-0 bg-foreground transform scale-y-0 origin-top group-hover:scale-y-100 group-hover:origin-bottom transition-transform duration-500 ease-out -z-10"></div>
                        </button>
                    </Link>
                </div>
            </div>
        </main>
    );
}