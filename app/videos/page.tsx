"use client";

import AnimatedTitle from "../components/CommonCom/AnimatedTitle";
import { Play } from "lucide-react";
import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

interface Video {
    _id: string;
    title: string;
    slug: { current: string };
    videoUrl: string;
    description: string;
    thumbnail: any;
    publishedAt: string;
}

export default function VideosPage() {
    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const query = `*[_type == "video"] | order(publishedAt desc) {
                    _id,
                    title,
                    slug,
                    videoUrl,
                    description,
                    thumbnail,
                    publishedAt
                }`;
                const data = await client.fetch(query);
                setVideos(data);
            } catch (error) {
                console.error("Error fetching videos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, []);

    const getYoutubeId = (url: string) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const getEmbedUrl = (url: string) => {
        const ytId = getYoutubeId(url);
        if (ytId) return `https://www.youtube.com/embed/${ytId}`;
        // Fallback for vimeo or other if needed, or just return original if it is already an embed link
        return url;
    };

    if (loading) {
        return <div className="min-h-screen bg-background flex items-center justify-center text-white font-oswald text-xl uppercase tracking-widest">Loading Videos...</div>;
    }

    return (
        <div className="bg-background min-h-screen flex flex-col relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-blue/10 to-transparent pointer-events-none" />

            <main className="grow pt-32 px-4 md:px-8 lg:px-12 max-w-[1400px] mx-auto w-full z-10 relative">
                {/* Header Section */}
                <div className="mb-20 text-center max-w-5xl mx-auto">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <span className="w-2 h-2 bg-red rounded-full"></span>
                        <span className="font-oswald text-xs tracking-[0.3em] text-red uppercase">
                            MEDIA ARCHIVE
                        </span>
                    </div>

                    <AnimatedTitle
                        text="VIDEOS"
                        className="text-5xl md:text-8xl font-bebas text-foreground mb-8 justify-center flex leading-none"
                    />

                    <p className="font-oswald text-lg md:text-xl text-foreground/60 leading-relaxed max-w-3xl mx-auto pl-6 text-center">
                        Watch our latest coverage, interviews, and deep dives.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
                    {videos.map((video) => (
                        <div key={video._id} className="bg-blue border border-white/10 rounded-lg overflow-hidden group hover:border-red/30 transition-colors duration-500">
                            {/* Video Container */}
                            <div className="relative w-full aspect-video bg-black/50 overflow-hidden">
                                {video.videoUrl ? (
                                    <iframe
                                        src={getEmbedUrl(video.videoUrl)}
                                        title={video.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                        className="absolute inset-0 w-full h-full"
                                    />
                                ) : video.thumbnail ? (
                                    <img
                                        src={urlFor(video.thumbnail).url()}
                                        alt={video.thumbnail.alt || video.title}
                                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-800 text-white/20 font-bebas">No Preview</div>
                                )}
                            </div>

                            <div className="p-8 relative">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="inline-block px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-red font-oswald tracking-widest uppercase">
                                        {new Date(video.publishedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                    </span>
                                </div>

                                <h3 className="text-2xl font-bebas text-white mb-3 leading-none group-hover:text-red transition-colors duration-300 line-clamp-2">
                                    {video.title}
                                </h3>

                                {video.description && (
                                    <p className="text-white/60 font-oswald text-sm line-clamp-3 mb-6">
                                        {video.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}

                    {videos.length === 0 && (
                        <div className="col-span-full text-center py-20">
                            <p className="text-foreground/60 text-xl font-oswald tracking-widest uppercase">
                                No videos found.
                            </p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
