"use client";

import { use } from 'react';
import { getPostBySlug } from '../../lib/blogData';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    // Unwrap params using React.use()
    const { slug } = use(params);
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="bg-theme-black min-h-screen flex flex-col relative overflow-hidden">

            <main className="grow pt-32 px-4 md:px-8 lg:px-12 max-w-[1000px] mx-auto w-full z-10 relative">

                {/* Back Button */}
                <Link href="/blogs-and-articles" className="inline-flex items-center gap-2 text-theme-white/50 hover:text-theme-accent transition-colors mb-12 font-oswald text-sm tracking-widest uppercase group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to All Articles
                </Link>

                {/* Article Header */}
                <header className="mb-12 border-b border-theme-white/10 pb-12">
                    <div className="flex flex-col gap-4 mb-6">
                        <span className="font-oswald text-sm tracking-[0.2em] text-theme-accent uppercase">
                            Analysis
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bebas text-theme-white leading-none">
                            {post.title}
                        </h1>
                    </div>
                    <div className="flex items-center gap-4 text-theme-white/60 font-oswald text-sm">
                        <span>{post.date}</span>
                        <span className="w-1 h-1 bg-theme-accent rounded-full"></span>
                        <span>By Ziad K. Abdelnour</span>
                    </div>
                </header>

                {/* Article Content */}
                <article className="prose prose-invert max-w-none mb-24">
                    {post.content.split('\n').map((paragraph, idx) => (
                        <p key={idx} className="font-oswald text-lg text-theme-white/80 leading-loose mb-6">
                            {paragraph}
                        </p>
                    ))}
                </article>

            </main>
        </div>
    );
}