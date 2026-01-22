import AnimatedTitle from "@/app/components/CommonCom/AnimatedTitle";
import { useTranslations } from 'next-intl';

export default function Testimonials() {
    const t = useTranslations('TestimonialsPage');
    return (
        <div className="bg-theme-black min-h-screen flex flex-col relative overflow-hidden items-center justify-center">

            <main className="relative z-10 text-center px-4">
                <AnimatedTitle
                    text={t('title')}
                    className="text-6xl md:text-9xl font-bebas text-theme-white mb-6 justify-center flex"
                />
                <div className="h-1 w-32 bg-red-600 mx-auto mb-8"></div>
                <p className="font-oswald text-xl md:text-3xl text-theme-white/70 tracking-widest uppercase">
                    {t('description')}
                </p>
            </main>
        </div>
    );
}
