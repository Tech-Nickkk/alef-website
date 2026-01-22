import AnimatedTitle from "@/app/components/CommonCom/AnimatedTitle";
import MediaFeed from "@/app/components/Media/MediaFeed";
import { client } from "@/sanity/lib/client";
import { getTranslations } from "next-intl/server";

export const revalidate = 60;

export default async function VideosPage() {
    const query = `*[_type == "video"] | order(publishedAt desc) {
        _id,
        title,
        videoUrl,
        description,
        thumbnail,
        publishedAt
    }`;

    const videos = await client.fetch(query);
    const t = await getTranslations("VideosPage");

    return (
        <div className="bg-background min-h-screen flex flex-col relative overflow-hidden">

            <main className="grow pt-32 px-4 md:px-8 lg:px-12 max-w-[1400px] mx-auto w-full z-10 relative">

                {/* Header (Static Content) */}
                <div className="mb-16 text-center max-w-5xl mx-auto">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <span className="w-2 h-2 bg-red rounded-full"></span>
                        <span className="font-oswald text-xs tracking-[0.3em] text-red uppercase">
                            {t("subtitle")}
                        </span>
                    </div>
                    <AnimatedTitle
                        text={t("title")}
                        className="text-5xl mb-4 md:text-7xl lg:text-8xl font-bold font-bebas text-foreground uppercase leading-none"
                    />
                    <p className="font-oswald text-lg md:text-xl text-foreground/60 leading-relaxed max-w-3xl mx-auto text-center">
                        {t("description")}
                    </p>
                </div>

                {/* 2. Pass data to Client Component */}
                <MediaFeed items={videos} type="video" />

            </main>
        </div>
    );
}