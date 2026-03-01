import Link from "next/link";
import AnimatedTitle from "../CommonCom/AnimatedTitle";
import { useTranslations } from "next-intl";

export default function WhoWeAre() {
    const t = useTranslations('WhoWeAre');

    const sections = [
        {
            id: "01",
            subtitle: t('items.01.subtitle'),
            title: t('items.01.title'),
            description: t('items.01.description'),
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
            subtitle: t('items.02.subtitle'),
            title: t('items.02.title'),
            description: t('items.02.description'),
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
            subtitle: t('items.03.subtitle'),
            title: t('items.03.title'),
            description: t('items.03.description'),
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
            subtitle: t('items.04.subtitle'),
            title: t('items.04.title'),
            description: t('items.04.description'),
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

    return (
        <section className="min-h-screen flex flex-col justify-center relative py-12 md:py-24">
            {/* Header Section */}
            <div className="w-full px-6 md:px-12 lg:px-24 mb-12">
                <div className="flex flex-col items-center justify-center gap-4 text-center">
                    <AnimatedTitle
                        text={t('title')}
                        className="text-4xl md:text-6xl font-bold font-bebas text-foreground uppercase leading-none"
                    />
                    <div className="flex items-center gap-2 text-foreground/60 font-oswald text-xs tracking-widest">
                        <span className="w-2 h-2 bg-red rounded-full inline-block"></span>
                        {t('subtitle')}
                    </div>
                </div>
            </div>

            {/* Grid Container */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 px-6 md:px-12 lg:px-24 w-full">
                {sections.map((item, idx) => (
                    <div key={idx} className="relative group w-full h-[300px] md:h-[380px]">
                        <Link href={item.href} className="block h-full">
                            <div className="bg-blue border border-white/10 transition-all duration-300 h-full rounded-2xl p-8 md:p-10 flex flex-col justify-between relative overflow-hidden hover:bg-light-blue hover:border-white/20">

                                {/* Top: id/subtitle + Title */}
                                <div className="text-center">
                                    <div className="flex justify-between items-start font-oswald text-xs tracking-widest text-white/60 mb-4">
                                        <span>{item.id}</span>
                                        <span>{item.subtitle}</span>
                                    </div>
                                    <h3 className="text-3xl md:text-5xl font-bebas text-white uppercase leading-none">
                                        {item.title}
                                    </h3>
                                </div>

                                {/* Middle: Icon absolutely centered */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-500">
                                    {item.icon}
                                </div>

                                {/* Bottom: Description */}
                                <p className="font-oswald text-white/70 text-base md:text-lg leading-relaxed text-center relative z-10 pb-2 md:pb-4">
                                    {item.description}
                                </p>

                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
}