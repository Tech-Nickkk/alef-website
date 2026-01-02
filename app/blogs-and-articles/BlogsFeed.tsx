"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, User, Search, Filter } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";

interface Sanityblog {
    _id: string;
    title: string;
    slug: { current: string };
    publishedAt: string;
    excerpt: string;
    mainImage?: {
        asset: {
            _ref: string;
        };
    };
    author?: {
        name: string;
        discloseName?: boolean;
        image?: {
            asset: {
                _ref: string;
            };
        };
    };
}

interface BlogsFeedProps {
    initialBlogs: Sanityblog[];
}

export default function BlogsFeed({ initialBlogs }: BlogsFeedProps) {
    const [filter, setFilter] = useState("All"); // Year filter
    const [searchQuery, setSearchQuery] = useState("");
    const [authorFilter, setAuthorFilter] = useState("All Authors");
    const [isAuthorFilterOpen, setIsAuthorFilterOpen] = useState(false);

    // Extract unique years for horizontal tabs
    const years = useMemo(() => {
        const uniqueYears = Array.from(new Set(initialBlogs.map(blog =>
            blog.publishedAt ? new Date(blog.publishedAt).getFullYear().toString() : "N/A"
        ))).filter(y => y !== "N/A").sort((a, b) => b.localeCompare(a));
        return ["All", ...uniqueYears];
    }, [initialBlogs]);

    // Extract unique authors for dropdown
    const authors = useMemo(() => {
        const uniqueAuthors = Array.from(new Set(initialBlogs.map(blog =>
            blog.author?.discloseName ? blog.author.name : "Anonymous"
        ).filter(Boolean)));
        return ["All Authors", ...uniqueAuthors];
    }, [initialBlogs]);

    const filteredBlogs = useMemo(() => {
        return initialBlogs.filter(blog => {
            const blogYear = blog.publishedAt ? new Date(blog.publishedAt).getFullYear().toString() : "N/A";
            const blogAuthor = blog.author?.discloseName ? blog.author.name : "Anonymous";

            const matchesYear = filter === "All" || blogYear === filter;
            const matchesAuthor = authorFilter === "All Authors" || blogAuthor === authorFilter;
            const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                blogAuthor.toLowerCase().includes(searchQuery.toLowerCase());

            return matchesYear && matchesAuthor && matchesSearch;
        });
    }, [initialBlogs, filter, authorFilter, searchQuery]);

    const highlightText = (text: string, query: string) => {
        if (!query) return text;

        const parts = text.split(new RegExp(`(${query})`, "gi"));
        return parts.map((part, index) =>
            part.toLowerCase() === query.toLowerCase() ? (
                <span key={index} className="bg-red/30 text-white rounded px-0.5">
                    {part}
                </span>
            ) : (
                part
            )
        );
    };

    return (
        <>
            {/* Filters Row */}
            <div className="flex flex-wrap items-center justify-between gap-6 py-6 border-y border-foreground/20 mb-12">
                <div className="flex items-center gap-8 overflow-x-auto no-scrollbar pb-2 md:pb-0">
                    {years.map((item) => (
                        <button
                            key={item}
                            onClick={() => setFilter(item)}
                            className={`font-oswald text-sm uppercase tracking-widest transition-all relative ${filter === item ? "text-red" : "text-foreground/40 hover:text-foreground"
                                }`}
                        >
                            {item}
                            {filter === item && (
                                <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-red"></span>
                            )}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative hidden md:block">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="SEARCH ARTICLES..."
                            className="bg-foreground/5 border border-white/10 rounded-full py-2.5 pl-12 pr-6 font-oswald text-xs tracking-widest focus:outline-none focus:border-red/50 transition-colors w-64 uppercase"
                        />
                    </div>
                    <div className="relative">
                        <button
                            onClick={() => setIsAuthorFilterOpen(!isAuthorFilterOpen)}
                            className={`flex items-center gap-2 border rounded-full px-5 py-2.5 font-oswald text-xs tracking-widest transition-all uppercase ${isAuthorFilterOpen || authorFilter !== "All Authors"
                                ? "bg-red border-red text-white"
                                : "bg-foreground/5 border-white/10 hover:bg-foreground/10"
                                }`}
                        >
                            <Filter className="w-4 h-4" />
                            {authorFilter === "All Authors" ? "AUTHOR FILTER" : authorFilter}
                        </button>

                        {isAuthorFilterOpen && (
                            <div className="absolute top-full right-0 mt-2 w-64 bg-background border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50 py-2">
                                {authors.map((author) => (
                                    <button
                                        key={author}
                                        onClick={() => {
                                            setAuthorFilter(author);
                                            setIsAuthorFilterOpen(false);
                                        }}
                                        className={`w-full text-left px-5 py-2.5 font-oswald text-[9px] tracking-widest uppercase transition-colors hover:bg-foreground/5 truncate ${authorFilter === author ? "text-red" : "text-foreground/60"
                                            }`}
                                    >
                                        {author}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Blogs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24 min-h-[50vh]">
                {filteredBlogs && filteredBlogs.length > 0 ? (
                    filteredBlogs.map((blog: Sanityblog) => (
                        <Link
                            key={blog._id}
                            href={`/blogs-and-articles/${blog.slug.current}`}
                            className="group bg-blue flex flex-col h-full rounded-sm overflow-hidden"
                        >
                            {/* Blog Image */}
                            <div className="relative w-full h-52 overflow-hidden">
                                {blog.mainImage?.asset ? (
                                    <Image
                                        src={urlFor(blog.mainImage).width(600).height(400).url()}
                                        alt={blog.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        unoptimized
                                    />
                                ) : (
                                    <div className="w-full h-full bg-linear-to-br from-light-blue to-blue flex items-center justify-center">
                                        <span className="text-white/20 font-bebas text-4xl">ALEF</span>
                                    </div>
                                )}
                                {/* Overlay gradient */}
                                <div className="absolute inset-0 bg-linear-to-t from-blue via-transparent to-transparent opacity-60"></div>
                            </div>

                            {/* Content */}
                            <div className="p-6 flex flex-col grow">
                                <h3 className="text-2xl font-bebas text-white mb-3 leading-tight">
                                    {highlightText(blog.title, searchQuery)}
                                </h3>

                                <p className="font-oswald text-white/70 text-sm leading-relaxed mb-4 line-clamp-3 grow">
                                    {highlightText(blog.excerpt, searchQuery)}
                                </p>

                                {/* Author and Date */}
                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                                    <div className="flex items-center gap-3">
                                        {blog.author?.image?.asset ? (
                                            <div className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-red/30">
                                                <Image
                                                    src={urlFor(blog.author.image).width(64).height(64).url()}
                                                    alt={blog.author.discloseName === true ? (blog.author.name || 'Author') : 'Author'}
                                                    fill
                                                    className="object-cover"
                                                    unoptimized
                                                />
                                            </div>
                                        ) : (
                                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center ring-2 ring-white/10">
                                                <User className="w-4 h-4 text-white/30" />
                                            </div>
                                        )}
                                        <span className="font-oswald text-sm text-white/60">
                                            {highlightText(blog.author?.discloseName === true ? (blog.author?.name || 'Anonymous') : '★★★★★★', searchQuery)}
                                        </span>
                                    </div>

                                    <span className="font-oswald text-xs text-white/40 tracking-wider uppercase">
                                        {blog.publishedAt && new Date(blog.publishedAt).toLocaleDateString("en-US", {
                                            year: "numeric", month: "short", day: "numeric"
                                        })}
                                    </span>
                                </div>

                                {/* Read More */}
                                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/10">
                                    <span className="text-white font-bebas text-lg tracking-wider group-hover:text-red transition-colors">
                                        READ FULL ARTICLE
                                    </span>
                                    <ArrowRight className="w-4 h-4 text-white group-hover:text-red transition-colors transform group-hover:translate-x-1 duration-300" />
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="col-span-full text-center py-20 bg-blue/50 rounded-lg border border-white/5">
                        <div className="flex flex-col items-center gap-4">
                            <span className="text-4xl">🔍</span>
                            <p className="text-foreground/60 text-xl font-oswald tracking-widest uppercase">
                                No articles found matching your criteria.
                            </p>
                            <button
                                onClick={() => {
                                    setFilter("All");
                                    setSearchQuery("");
                                    setAuthorFilter("All Authors");
                                }}
                                className="text-red font-oswald text-sm underline underline-offset-4 hover:text-white transition-colors"
                            >
                                CLEAR FILTERS
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
