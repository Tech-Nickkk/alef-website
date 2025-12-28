import AnimatedTitle from "../components/CommonCom/AnimatedTitle";
import Link from 'next/link';
import { BLOG_POSTS } from '../lib/blogData';
import { ArrowRight } from 'lucide-react';

export default function BlogsPage() {
    return (
        <div className="bg-theme-black min-h-screen flex flex-col relative overflow-hidden">

            <main className="grow pt-32 px-4 md:px-8 lg:px-12 max-w-[1400px] mx-auto w-full z-10 relative">

                {/* Header Section */}
                <div className="mb-20 text-center max-w-5xl mx-auto">
                    <AnimatedTitle
                        text="BLOGS & ARTICLES"
                        className="text-5xl md:text-7xl font-bebas text-theme-white mb-6 justify-center flex"
                    />
                    <div className="h-1 w-24 bg-theme-accent mx-auto mb-8"></div>
                    <p className="font-oswald text-xl md:text-2xl text-theme-white/90 leading-relaxed max-w-4xl mx-auto">
                        In-depth analysis, geopolitical strategy, and critical updates on the future of Lebanon and the Middle East.
                    </p>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
                    {BLOG_POSTS.map((post) => (
                        <div key={post.id} className="group bg-[#0f2942] border border-[#1e4b7a] p-8 flex flex-col justify-between h-full hover:border-red-600/50 transition-colors duration-300 rounded-sm">
                            <div>
                                <div className="mb-4">
                                    <span className="font-oswald text-xs tracking-[0.2em] text-theme-accent uppercase border border-theme-accent/20 px-2 py-1">
                                        OPINION
                                    </span>
                                </div>

                                <h3 className="text-2xl font-bebas text-white mb-4 leading-none group-hover:text-red-500 transition-colors">
                                    {post.title}
                                </h3>

                                <p className="font-oswald text-xs text-white/40 mb-4 tracking-widest uppercase">
                                    {post.date}
                                </p>

                                <p className="font-oswald text-white/70 text-sm leading-relaxed mb-8 line-clamp-3">
                                    {post.excerpt}
                                </p>
                            </div>

                            <Link
                                href={`/blogs-and-articles/${post.slug}`}
                                className="group/btn flex items-center gap-2 mt-auto w-fit"
                            >
                                <span className="text-white font-bebas text-lg tracking-wider group-hover/btn:text-theme-accent transition-colors">
                                    READ FULL ARTICLE
                                </span>
                                <ArrowRight className="w-4 h-4 text-white group-hover/btn:text-theme-accent transition-colors transform group-hover/btn:translate-x-1 duration-300" />
                            </Link>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}