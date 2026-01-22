import AnimatedTitle from "@/app/components/CommonCom/AnimatedTitle";
import { ShieldCheck, Star, HeartHandshake } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function SponsorsPage() {
    const t = useTranslations('SponsorsPage');

    return (
        <main className="min-h-screen bg-background pt-24 md:pt-32 pb-16 px-4 md:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto space-y-16">

                {/* Header */}
                <div className="text-center space-y-6">
                    <div className="flex items-center justify-center gap-3">
                        <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-red rounded-full animate-pulse"></span>
                        <span className="font-oswald text-red tracking-[0.2em] uppercase text-xs md:text-sm font-bold">
                            {t('header.subtitle')}
                        </span>
                        <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-red rounded-full animate-pulse"></span>
                    </div>

                    <AnimatedTitle
                        text={t('header.title')}
                        className="text-4xl md:text-7xl lg:text-8xl font-bold font-bebas text-foreground uppercase leading-none"
                    />

                    <p className="font-oswald text-foreground/60 text-lg max-w-2xl mx-auto">
                        {t('header.description')}
                    </p>
                </div>

                {/* Static Placeholder Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                    <div className="bg-foreground/5 border border-foreground/10 p-8 rounded-2xl text-center space-y-4">
                        <div className="w-12 h-12 bg-red/10 rounded-full flex items-center justify-center mx-auto text-red">
                            <Star className="w-6 h-6" />
                        </div>
                        <h3 className="font-bebas text-2xl text-foreground">{t('partners.community.title')}</h3>
                        <p className="font-oswald text-foreground/60 text-sm">
                            {t('partners.community.description')}
                        </p>
                    </div>

                    <div className="bg-foreground/5 border border-foreground/10 p-8 rounded-2xl text-center space-y-4 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-red/5 rounded-bl-full"></div>
                        <div className="w-12 h-12 bg-red/10 rounded-full flex items-center justify-center mx-auto text-red">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <h3 className="font-bebas text-2xl text-foreground">{t('partners.strategic.title')}</h3>
                        <p className="font-oswald text-foreground/60 text-sm">
                            {t('partners.strategic.description')}
                        </p>
                    </div>

                    <div className="bg-foreground/5 border border-foreground/10 p-8 rounded-2xl text-center space-y-4">
                        <div className="w-12 h-12 bg-red/10 rounded-full flex items-center justify-center mx-auto text-red">
                            <HeartHandshake className="w-6 h-6" />
                        </div>
                        <h3 className="font-bebas text-2xl text-foreground">{t('partners.visionaries.title')}</h3>
                        <p className="font-oswald text-foreground/60 text-sm">
                            {t('partners.visionaries.description')}
                        </p>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="text-center pt-12 border-t border-foreground/10">
                    <p className="font-oswald text-foreground/50 uppercase tracking-widest text-sm mb-6">
                        {t('cta.text')}
                    </p>
                    <Link href="/donate" className="inline-block bg-red hover:bg-[#c4151c] text-white px-8 py-3 uppercase font-oswald tracking-widest text-sm rounded transition-colors shadow-lg shadow-red/20">
                        {t('cta.button')}
                    </Link>
                </div>

            </div>
        </main>
    );
}
