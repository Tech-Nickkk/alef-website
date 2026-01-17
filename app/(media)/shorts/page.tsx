import AnimatedTitle from "@/app/components/CommonCom/AnimatedTitle";
import MediaFeed from "../../components/Media/MediaFeed";
import { client } from "@/sanity/lib/client";

export default async function ShortsPage() {
    const query = `*[_type == "short"] | order(publishedAt desc) {
        _id,
        title,
        videoUrl,
        platform,
        thumbnail,
        publishedAt
    }`;

    // Fetch data server-side
    const shorts = await client.fetch(query);

    return (
        <main className="min-h-screen w-full bg-background pt-32 pb-20 px-4 md:px-8 relative overflow-hidden">
            <div className="fixed inset-0 pointer-events-none opacity-[0.03]"
                style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
            </div>

            <div className="max-w-7xl mx-auto flex flex-col items-center relative z-10">

                {/* Header Section */}
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center gap-2 text-foreground/60 font-oswald text-xs tracking-[0.3em] mb-4">
                        <span className="w-1.5 h-1.5 bg-red rounded-full"></span>
                        MEDIA ARCHIVE
                    </div>

                    <AnimatedTitle
                        text="SHORTS"
                        className="text-5xl mb-4 md:text-7xl lg:text-8xl font-bold font-bebas text-foreground uppercase leading-none"
                    />
                </div>

                <div className="w-full">
                    <MediaFeed items={shorts || []} type="short" />
                </div>

            </div>
        </main>
    );
}