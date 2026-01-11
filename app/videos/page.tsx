// app/videos/page.tsx
import AnimatedTitle from "../components/CommonCom/AnimatedTitle";
import MediaFeed from "../components/Media/MediaFeed"; // Import the new client component
import { sanityFetch } from "@/sanity/lib/live"; // Use your live fetch or client.fetch

export default async function VideosPage() {
    // 1. Fetch on Server
    const query = `*[_type == "video"] | order(publishedAt desc) {
        _id,
        title,
        videoUrl,
        description,
        thumbnail,
        publishedAt
    }`;
    
    // Using sanityFetch for caching/revalidation benefits
    const { data: videos } = await sanityFetch({ query });

    return (
        <div className="bg-background min-h-screen flex flex-col relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-blue/10 to-transparent pointer-events-none" />

            <main className="grow pt-32 px-4 md:px-8 lg:px-12 max-w-[1400px] mx-auto w-full z-10 relative">
                
                {/* Header (Static Content) */}
                <div className="mb-16 text-center max-w-5xl mx-auto">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <span className="w-2 h-2 bg-red rounded-full"></span>
                        <span className="font-oswald text-xs tracking-[0.3em] text-red uppercase">
                            MEDIA ARCHIVE
                        </span>
                    </div>
                    <AnimatedTitle
                        text="VIDEOS"
                        className="text-5xl mb-4 md:text-7xl lg:text-8xl font-bold font-bebas text-foreground uppercase leading-none"
                    />
                     <p className="font-oswald text-lg md:text-xl text-foreground/60 leading-relaxed max-w-3xl mx-auto text-center">
                        Watch our latest coverage, interviews, and deep dives.
                    </p>
                </div>

                {/* 2. Pass data to Client Component */}
                <MediaFeed items={videos} type="video" />

            </main>
        </div>
    );
}