import AnimatedTitle from "@/app/components/CommonCom/AnimatedTitle";
import MediaFeed from "../components/Media/MediaFeed";
import { sanityFetch } from "@/sanity/lib/live";

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
    const { data: shorts } = await sanityFetch({ query });

    return (
        <main className="min-h-screen w-full bg-background pt-32 pb-20 px-4 md:px-8 relative overflow-hidden">

            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-[50vh] bg-linear-to-b from-blue/10 to-transparent pointer-events-none" />
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

                {/* Content Feed (type="short" triggers 9:16 aspect ratio in cards) */}
                <div className="w-full">
                    <MediaFeed items={shorts || []} type="short" />
                </div>

            </div>
        </main>
    );
}