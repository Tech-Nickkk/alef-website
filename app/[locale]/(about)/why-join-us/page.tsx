import AnimatedTitle from "@/app/components/CommonCom/AnimatedTitle";
import { ShieldCheck, Target, Globe, Users, Briefcase, Zap } from 'lucide-react';
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function WhyJoinUsPage() {
    const t = useTranslations('WhyJoinUs');

    const items = [
        {
            title: t('items.0.title'),
            icon: <Target className="w-6 h-6 md:w-8 md:h-8" />,
            desc: t('items.0.desc')
        },
        {
            title: t('items.1.title'),
            icon: <Briefcase className="w-6 h-6 md:w-8 md:h-8" />,
            desc: t('items.1.desc')
        },
        {
            title: t('items.2.title'),
            icon: <Zap className="w-6 h-6 md:w-8 md:h-8" />,
            desc: t('items.2.desc')
        },
        {
            title: t('items.3.title'),
            icon: <Users className="w-6 h-6 md:w-8 md:h-8" />,
            desc: t('items.3.desc')
        },
        {
            title: t('items.4.title'),
            icon: <Globe className="w-6 h-6 md:w-8 md:h-8" />,
            desc: t('items.4.desc')
        },
        {
            title: t('items.5.title'),
            icon: <ShieldCheck className="w-6 h-6 md:w-8 md:h-8" />,
            desc: t('items.5.desc')
        }
    ];

    return (
        <main className="min-h-screen bg-background pt-24 md:pt-32 pb-16 md:pb-24 px-4 md:px-12 lg:px-24">
            <div className="max-w-6xl mx-auto space-y-16 md:space-y-32">

                {/* --- HERO SECTION --- */}
                <div className="text-center space-y-6 md:space-y-8">
                    <div className="flex items-center justify-center gap-3">
                        <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-red rounded-full animate-pulse"></span>
                        <span className="font-oswald text-red tracking-[0.2em] uppercase text-xs md:text-sm font-bold">{t('subtitle')}</span>
                        <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-red rounded-full animate-pulse"></span>
                    </div>

                    <AnimatedTitle
                        text={t('title')}
                        className="text-4xl md:text-7xl lg:text-8xl font-bold font-bebas text-foreground uppercase leading-none"
                    />
                    <div className="h-1.5 w-24 md:w-40 bg-red mx-auto"></div>

                    <p className="font-oswald text-foreground/70 text-base md:text-2xl leading-relaxed max-w-4xl mx-auto">
                        {t('intro')}
                    </p>
                </div>

                {/* --- GRID OF VALUES --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {items.map((item, index) => (
                        <div key={index} className="relative group bg-blue border border-white/10 p-8 md:p-10 rounded-2xl md:rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:border-red/30 hover:translate-y-[-5px] shadow-2xl">
                            {/* Accent line */}
                            <div className="absolute top-0 left-0 w-1.5 h-0 bg-red transition-all duration-500 group-hover:h-full"></div>
                            
                            <div className="relative z-10 flex flex-col h-full">
                                <div className="mb-6 md:mb-8 w-14 h-14 md:w-16 md:h-16 bg-white/5 rounded-2xl flex items-center justify-center text-white border border-white/10 transition-colors group-hover:bg-red group-hover:border-red group-hover:shadow-[0_0_20px_rgba(227,27,35,0.4)]">
                                    {item.icon}
                                </div>

                                <h3 className="font-bebas text-2xl md:text-3xl text-white mb-4 tracking-wide group-hover:text-white transition-colors">
                                    {item.title}
                                </h3>

                                <p className="font-oswald text-white/60 text-base md:text-lg leading-relaxed group-hover:text-white/80 transition-colors">
                                    {item.desc}
                                </p>
                            </div>

                            {/* Background Number */}
                            <div className="absolute -bottom-4 -right-2 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity pointer-events-none">
                                <span className="text-[120px] md:text-[180px] font-bebas leading-none text-white">0{index + 1}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- FINAL CTA --- */}
                <div className="relative bg-blue border border-white/10 p-10 md:p-20 rounded-3xl md:rounded-[4rem] overflow-hidden text-center">
                    <div className="absolute inset-0 bg-linear-to-b from-white/5 to-transparent pointer-events-none"></div>
                    <div className="relative z-10 space-y-8 md:space-y-12">
                        <h2 className="font-bebas text-4xl md:text-6xl text-white uppercase">{t('cta')}</h2>
                        
                        <Link href="/#join-us">
                            <button className="group relative bg-red text-white px-10 md:px-16 py-4 md:py-6 text-sm md:text-lg font-bold tracking-[0.2em] uppercase font-oswald overflow-hidden transition-all hover:bg-[#b0151b] isolate cursor-pointer shadow-[0_10px_30px_rgba(227,27,35,0.3)]">
                                <span className="relative z-10">{t('button')}</span>
                                <div className="absolute inset-0 bg-white/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 skew-x-12"></div>
                            </button>
                        </Link>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-0 left-0 w-32 h-32 md:w-64 md:h-64 bg-red/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-32 h-32 md:w-64 md:h-64 bg-red/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
                </div>

            </div>
        </main>
    );
}
