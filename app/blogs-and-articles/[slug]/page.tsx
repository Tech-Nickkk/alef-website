import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { urlFor } from '@/sanity/lib/image';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';
import { notFound } from 'next/navigation';
import { PortableText } from '@portabletext/react';
import ArticleProgress from '../../components/Blogs/ArticleProgress';

// Custom components for PortableText rendering
const portableTextComponents = {
    types: {
        image: ({ value }: any) => {
            if (!value?.asset?._ref) return null;
            return (
                <figure className="my-10 overflow-hidden rounded-sm border border-white/10 group">
                    <div className="relative aspect-video w-full">
                        <Image
                            src={urlFor(value).width(1200).url()}
                            alt={value.alt || 'ALEF Blog Image'}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            unoptimized
                        />
                    </div>
                    {value.alt && (
                        <figcaption className="mt-4 px-6 pb-6 text-center font-oswald text-sm text-foreground/50 tracking-wide uppercase italic">
                            — {value.alt}
                        </figcaption>
                    )}
                </figure>
            );
        },
    },
    block: {
        h1: ({ children }: any) => <h1 className="text-4xl md:text-5xl font-bebas text-foreground mt-16 mb-8 uppercase tracking-wider">{children}</h1>,
        h2: ({ children }: any) => <h2 className="text-3xl md:text-4xl font-bebas text-foreground mt-12 mb-6 uppercase tracking-wider">{children}</h2>,
        h3: ({ children }: any) => <h3 className="text-2xl md:text-3xl font-bebas text-foreground mt-10 mb-5 uppercase tracking-wider">{children}</h3>,
        normal: ({ children }: any) => <p className="font-oswald text-lg md:text-xl text-foreground/80 leading-relaxed mb-8">{children}</p>,
        blockquote: ({ children }: any) => (
            <blockquote className="border-l-4 border-red bg-foreground/5 p-8 my-10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C15.4647 8 15.017 8.44772 15.017 9V12C15.017 12.5523 14.5693 13 14.017 13H13.017V21H14.017ZM6.017 21L6.017 18C6.017 16.8954 6.91241 16 8.017 16H11.017C11.5693 16 12.017 15.5523 12.017 15V9C12.017 8.44772 11.5693 8 11.017 8H8.017C7.46472 8 7.017 8.44772 7.017 9V12C7.017 12.5523 6.56929 13 6.017 13H5.017V21H6.017Z" /></svg>
                </div>
                <p className="font-oswald text-xl md:text-2xl text-foreground italic leading-relaxed relative z-10">"{children}"</p>
            </blockquote>
        ),
    },
    list: {
        bullet: ({ children }: any) => <ul className="list-disc list-inside mb-8 space-y-4">{children}</ul>,
    },
    marks: {
        link: ({ children, value }: any) => (
            <a href={value.href} target="_blank" rel="noopener noreferrer" className="text-red hover:underline decoration-2 underline-offset-4">
                {children}
            </a>
        ),
        strong: ({ children }: any) => <strong className="text-foreground font-bold">{children}</strong>,
    },
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const query = `
    *[_type == "blog" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      publishedAt,
      mainImage,
      author->{
        name,
        discloseName,
        image,
        position
      },
      body
    }
  `;

    const { data: post } = await sanityFetch({ query, params: { slug } });

    if (!post) {
        notFound();
    }

    return (
        <div className="bg-background min-h-screen flex flex-col relative overflow-hidden selection:bg-red selection:text-foreground">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-[1000px] bg-linear-to-b from-blue/10 to-transparent pointer-events-none"></div>

            <main className="grow pt-32 px-4 md:px-8 lg:px-12 max-w-[900px] mx-auto w-full z-10 relative">

                {/* Article Top Section */}
                <div className="mb-12">
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-3">
                            <span className="w-8 h-px bg-red"></span>
                            <span className="font-oswald text-sm tracking-[0.3em] text-red uppercase font-medium">Inside ALEF Geopolitics</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bebas text-foreground leading-[0.9] uppercase tracking-tight">
                            {post.title}
                        </h1>
                    </div>
                </div>

                {/* Metadata Row */}
                <div className="flex flex-wrap items-center gap-y-6 gap-x-12 py-8 border-y border-foreground/60 mb-16">
                    {/* Author */}
                    <div className="flex items-center gap-4">
                        {post.author?.image ? (
                            <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-red/20">
                                <Image
                                    src={urlFor(post.author.image).width(128).height(128).url()}
                                    alt={post.author.discloseName === true ? post.author.name : 'Author'}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            </div>
                        ) : (
                            <div className="w-14 h-14 rounded-full bg-foreground/5 flex items-center justify-center ring-2 ring-foreground/10">
                                <User className="w-6 h-6 text-foreground/30" />
                            </div>
                        )}
                        <div>
                            <p className="font-oswald text-foreground font-medium uppercase tracking-wider">
                                {post.author?.discloseName === true ? (post.author?.name || 'ALEF Analysts') : '★★★★★★'}
                            </p>
                            <p className="font-oswald text-foreground/40 text-xs uppercase tracking-widest">{post.author?.position || 'Strategic Policy'}</p>
                        </div>
                    </div>

                    {/* Published Date */}
                    <div className="flex items-center gap-4 text-foreground/60">
                        <div className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center border border-foreground/10">
                            <Calendar className="w-4 h-4" />
                        </div>
                        <div>
                            <p className="font-oswald text-foreground/40 text-[10px] uppercase tracking-widest mb-1">Published</p>
                            <p className="font-oswald text-sm text-foreground/80 uppercase">
                                {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                                    year: "numeric", month: "long", day: "numeric"
                                }) : 'Recent Update'}
                            </p>
                        </div>
                    </div>
                </div >

                {/* Main Hero Image */}
                {
                    post.mainImage && (
                        <div className="mb-20">
                            <div className="relative aspect-video w-full rounded-sm overflow-hidden shadow-2xl border border-theme-white/10">
                                <Image
                                    src={urlFor(post.mainImage).width(1200).height(675).url()}
                                    alt={post.title}
                                    fill
                                    priority
                                    className="object-cover"
                                    unoptimized
                                />
                            </div>
                        </div>
                    )
                }

                {/* Article Body */}
                <article className="mb-24">
                    <ArticleProgress>
                        <PortableText value={post.body} components={portableTextComponents} />
                    </ArticleProgress>
                </article>

                {/* Bottom Navigation */}
                <div className="border-t border-foreground/60 pt-16 pb-32 flex flex-col items-center">
                    <p className="font-oswald text-foreground/50 text-sm uppercase tracking-[0.5em] mb-8">End of Dispatch</p>
                    <Link href="/blogs-and-articles"
                        className="group relative bg-transparent border border-foreground/70 text-foreground px-12 py-5 text-sm font-bold tracking-[0.2em] uppercase font-oswald overflow-hidden transition-all hover:border-foreground/50 isolate cursor-pointer"
                    >
                        <span className="relative z-10 group-hover:text-background transition-colors duration-300 font-bebas text-2xl">Return to Archives</span>
                        <div className="absolute inset-0 bg-foreground transform scale-y-0 origin-top group-hover:scale-y-100 group-hover:origin-bottom transition-transform duration-500 ease-out -z-10"></div>
                    </Link>
                </div>

            </main >
            <SanityLive />
        </div >
    );
}
