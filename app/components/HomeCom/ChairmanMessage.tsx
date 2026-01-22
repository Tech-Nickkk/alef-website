import SkeletonImage from "../CommonCom/SkeletonImage";
// import Link from "next/link";
import AnimatedTitle from "../CommonCom/AnimatedTitle";
import { useTranslations } from "next-intl";

export default function ChairmanMessage() {
    const t = useTranslations('ChairmanMessage');

    return (
        <section className="py-12 md:py-24 px-6 md:px-12 lg:px-24">
            <div className="max-w-[1400px] mx-auto">

                {/* Header */}
                <div className="flex flex-col items-center justify-center mb-6 md:mb-12 pb-6 gap-4 text-center">
                    <AnimatedTitle
                        text={t('title')}
                        className="text-4xl md:text-6xl font-bold font-bebas text-foreground uppercase leading-none"
                    />
                    <div className="flex items-center gap-2 text-foreground/60 font-oswald text-xs tracking-widest">
                        <span className="w-2 h-2 bg-red rounded-full inline-block"></span>
                        {t('subtitle')}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Text Card with Scrollbar */}
                    <div className="bg-blue rounded-2xl p-8 md:p-12 flex flex-col h-[450px] md:h-[600px] relative group">

                        {/* Technical Label */}
                        <div className="flex justify-between items-start mb-6 font-oswald text-xs tracking-widest text-white/60 shrink-0">
                            <span>{t('statement')}</span>
                            <span>{t('author')}</span>
                        </div>

                        <div className="relative z-10 flex-1 overflow-hidden flex flex-col">
                            <h3 className="text-2xl md:text-3xl text-white font-bebas tracking-wide leading-normal mb-6 shrink-0">
                                {t('welcome')}
                            </h3>

                            {/* SCROLLABLE AREA START */}
                            <div className="overflow-y-auto pr-4 custom-scrollbar flex-1 space-y-6 text-lg text-white/60 font-oswald leading-relaxed">
                                <p>{t('p1')}</p>
                                <p>{t('p2')}</p>
                                <p>{t('p3')}</p>
                                <p>{t('p4')}</p>
                                <p>{t('p5')}</p>
                                <br />
                            </div>
                            {/* SCROLLABLE AREA END */}

                            {/* Gradient Fade at bottom to indicate scrolling */}
                            <div className="absolute bottom-0 left-0 w-full h-12 bg-linear-to-t from-blue to-transparent pointer-events-none"></div>
                        </div>
                    </div>

                    {/* Image Card - Parallax Effect */}
                    <div className="bg-blue border border-white/10 rounded-2xl p-2 h-[450px] md:h-[600px] relative overflow-hidden group">
                        <div className="relative w-full h-full rounded-xl overflow-hidden">
                            <SkeletonImage
                                src="/home/Ziad Abdelnour.jpg"
                                alt="Ziad K. Abdelnour"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>

                {/* About Chairman Button */}
                {/* <div className="flex justify-center mt-12 relative z-10">
                    <Link
                        href="https://3afekra.com/wp-content/uploads/2022/11/%D8%B2%D9%8A%D8%A7%D8%AF-%D8%B9%D8%A8%D8%AF-%D8%A7%D9%84%D9%86%D9%88%D8%B1-.pdf"
                        target="_blank"
                    >
                        <button className="group relative bg-transparent border border-foreground/70 text-foreground px-12 py-4 text-sm font-bold tracking-[0.2em] uppercase font-oswald overflow-hidden transition-all hover:border-foreground/50 isolate cursor-pointer">
                            <span className="relative z-10 group-hover:text-background transition-colors duration-300">ABOUT THE CHAIRMAN</span>
                            <div className="absolute inset-0 bg-foreground transform scale-y-0 origin-top group-hover:scale-y-100 group-hover:origin-bottom transition-transform duration-500 ease-out -z-10"></div>
                        </button>
                    </Link>
                </div> */}
            </div>
        </section>
    );
}