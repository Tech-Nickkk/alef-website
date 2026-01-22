import Link from "next/link";
import AnimatedTitle from "../CommonCom/AnimatedTitle";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

const BILL_KEYS = ['bill1', 'bill2', 'bill3', 'bill4'];

export default function CongressionalActions() {
    const t = useTranslations('CongressionalActions');

    return (
        <section className="py-12 md:py-24 px-6 md:px-12 lg:px-24">
            <div className="max-w-[1400px] mx-auto">

                {/* Header */}
                <div className="flex flex-col items-center justify-center mb-16 pb-6 gap-4 text-center">
                    <AnimatedTitle
                        text={t('title')}
                        className="text-4xl md:text-6xl font-bold font-bebas text-foreground uppercase leading-none"
                    />
                    <div className="flex items-center gap-2 text-foreground/60 font-oswald text-xs tracking-widest">
                        <span className="w-2 h-2 bg-red rounded-full inline-block"></span>
                        {t('subtitle')}
                    </div>
                    <p className="text-foreground/60 font-oswald text-lg tracking-wide max-w-2xl mx-auto">
                        {t('desc')}
                    </p>
                </div>

                {/* Bills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {BILL_KEYS.map((key) => (
                        <div
                            key={key}
                            className="group bg-blue p-8 rounded-2xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between min-h-[300px]"
                        >
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-6">
                                    <span className="font-bebas text-3xl text-red tracking-wide">{t(`items.${key}.id`)}</span>
                                    <span className="font-oswald text-xs text-white/40 tracking-widest border border-white/20 px-3 py-2 rounded-sm uppercase">
                                        {t(`items.${key}.date`)}
                                    </span>
                                </div>

                                <h3 className="font-bebas text-2xl text-white mb-4 leading-snug transition-colors">
                                    {t(`items.${key}.title`)}
                                </h3>

                                <p className="font-oswald text-white/70 text-base leading-relaxed mb-8">
                                    {t(`items.${key}.desc`)}
                                </p>
                            </div>

                            <div className="relative z-10 pt-6 border-t border-white/20">
                                <Link
                                    href={t(`items.${key}.link`)}
                                    target="_blank"
                                    className="group/btn flex items-center gap-4 w-full justify-between relative"
                                >
                                    <span className="text-white font-bebas text-lg tracking-wider group-hover/btn:text-red transition-colors relative">
                                        {t('readBill')}
                                        <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-red transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-500 origin-right group-hover/btn:origin-left ease-out"></span>
                                    </span>
                                    <div className="w-10 h-10 border border-white/30 rounded-full flex items-center justify-center group-hover/btn:bg-red group-hover/btn:border-red transition-all duration-300">
                                        <ArrowRight className="w-5 h-5 text-white" />
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