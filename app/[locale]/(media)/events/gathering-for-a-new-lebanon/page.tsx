"use client";

import SkeletonImage from "@/app/components/CommonCom/SkeletonImage";
import { Calendar, MapPin, Clock, ArrowLeft, Mic, X, Play } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function GatheringForNewLebanonPage() {
    const t = useTranslations("EventsPage");
    const [videoOpen, setVideoOpen] = useState(false);

    return (
        <main className="min-h-screen bg-background pt-32 pb-24 px-6 md:px-12 lg:px-24 flex flex-col items-center">

            {/* EVENT HERO */}
            <div className="w-full max-w-7xl mx-auto mb-24">
                <div className="group relative bg-blue border border-white/10 rounded-sm overflow-hidden shadow-2xl flex flex-col">

                    {/* Image Section */}
                    <div className="relative w-full h-auto">
                        <div className="absolute inset-0 bg-blue/10 pointer-events-none z-10"></div>
                        <Image
                            src="/events/Event_Image.jpg"
                            alt="ALEF Event"
                            width={1200}
                            height={600}
                            style={{ width: "100%", height: "auto" }}
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* Info Section */}
                    <div className="w-full p-8 md:p-12 lg:p-16 flex flex-col relative bg-blue">
                        <div className="space-y-8 relative z-10">

                            {/* Title & Description */}
                            <div>
                                <h3 className="text-3xl md:text-5xl font-bebas text-white leading-none mb-4">
                                    {t("hero.titlePart1")} <span className="text-red">{t("hero.titlePart2")}</span>
                                </h3>
                                <p className="font-oswald text-white/70 text-base md:text-lg leading-relaxed mb-6">
                                    {t("hero.descriptionPart1")} <span className="text-white">{t("hero.descriptionPart2")}</span>.
                                </p>
                            </div>

                            {/* Logistics Grid */}
                            <div className="grid md:grid-cols-2 gap-8 border-t border-white/10 pt-8">
                                <div className="space-y-4">
                                    <div className="flex gap-4">
                                        <div className="p-2 bg-red/90 rounded text-white h-fit"><Calendar className="w-5 h-5" /></div>
                                        <div>
                                            <span className="block font-bebas text-xl text-white">{t("hero.date")}</span>
                                            <span className="block font-oswald text-xs text-white/50 uppercase tracking-widest">{t("hero.calendarNote")}</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="p-2 bg-red/90 rounded text-white h-fit"><Clock className="w-5 h-5" /></div>
                                        <div>
                                            <span className="block font-bebas text-xl text-white">{t("hero.reception")}</span>
                                            <span className="block font-bebas text-xl text-white">{t("hero.dinner")}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex gap-4">
                                        <div className="p-2 bg-red/90 rounded text-white h-fit"><MapPin className="w-5 h-5" /></div>
                                        <div>
                                            <span className="block font-bebas text-xl text-white">{t("hero.venueName")}</span>
                                            <span className="block font-oswald text-sm text-white/70">{t("hero.venueAddress")}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* EVENT MESSAGE */}
            <div className="w-full max-w-5xl mx-auto mb-24 px-4">
                <div className="bg-blue border border-white/10 p-8 md:p-12 lg:p-16 rounded-sm shadow-2xl relative">
                    <h3 className="font-bebas text-3xl md:text-5xl text-white mb-10 tracking-widest text-center leading-tight">
                        American Lebanon Education Foundation <br />
                        <span className="text-red">Inaugural Dinner April 14, 2026</span> <br />
                        <span className="text-white/50 mr-2">~</span> <span className="text-white">Ziad Abdelnour</span>
                    </h3>

                    <div className="space-y-6 font-oswald text-white/70 text-lg md:text-xl leading-relaxed text-justify md:text-left">
                        <p>The American Lebanon Education Foundation is a global initiative of professionals, activists, and leaders united by a shared vision of a free, sovereign, and prosperous Lebanon. As an independent, non-partisan movement, we are committed to dismantling corruption, restoring governance, and advocating for Lebanon&apos;s rightful place within the international community.</p>
                        <p>Our mission is to advocate for political, economic, and security reforms, engaging with international policymakers to support Lebanon&apos;s sovereignty. We strive to combat corruption and militant influences undermining stability while promoting diaspora involvement in Lebanon&apos;s reconstruction and economic growth.</p>
                        <p>We believe in Sovereignty, upholding Lebanon&apos;s independence from foreign domination. We stand for Transparency &amp; Accountability, believing in ethical governance and responsible leadership. We fight for Economic Freedom, promoting investment, job creation, and financial stability.</p>
                        <p>The Rule of Law is non-negotiable; we advocate for an independent judiciary and security forces. We are building a Lebanon based on Meritocracy &amp; Performance, valuing skills and leadership excellence above sectarian allegiance.</p>

                        <div className="border-l-4 border-red pl-5 py-3 mt-8 bg-red/5 rounded-r-sm">
                            <p className="text-white tracking-wide text-xl font-medium">Join us in this critical fight for the soul of our nation. Together, we can drive policy solutions for a self-reliant and thriving Lebanon.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* FEATURED SPEAKERS SECTION */}
            <div className="w-full max-w-6xl mx-auto mb-24 reveal-anim">
                <div className="text-center mb-12">
                    <h3 className="font-bebas text-4xl lg:text-5xl text-foreground mb-4 uppercase">Featured Speakers</h3>
                    <div className="flex items-center justify-center gap-4 text-foreground/60 font-oswald text-sm uppercase tracking-widest">
                        <span className="h-px w-12 bg-foreground/20"></span>
                        <span>Event Roster</span>
                        <span className="h-px w-12 bg-foreground/20"></span>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="md:col-span-2 bg-blue border border-white/10 p-8 rounded-sm shadow-xl relative flex flex-col items-center text-center">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-red shadow-lg shadow-red/20 mb-6">
                            <Image src="/events/Camille_Chamoun.jpeg" alt="Camille Chamoun" width={96} height={96} className="w-full h-full object-cover object-top" />
                        </div>
                        <h4 className="font-bebas text-3xl text-white mb-2">{t("speakers.list.camille.name")}</h4>
                        <div className="text-red font-oswald uppercase tracking-widest text-sm mb-4">{t("speakers.list.camille.title")}</div>
                        <p className="font-oswald text-white/70 text-lg leading-relaxed flex-grow">{t("speakers.list.camille.desc")}</p>
                        <button onClick={() => setVideoOpen(true)} className="mt-6 inline-flex items-center gap-2 bg-red hover:bg-[#c4151c] text-white px-5 py-2.5 font-bebas text-base tracking-widest uppercase transition-all shadow-lg hover:shadow-red/30 rounded-sm cursor-pointer">
                            <Play className="w-4 h-4 fill-white" /> {t("speakers.watchVideo")}
                        </button>
                    </div>

                    <div className="bg-blue border border-white/10 p-8 rounded-sm shadow-xl relative flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-red rounded-full flex items-center justify-center text-white mb-6">
                            <Mic className="w-8 h-8" />
                        </div>
                        <h4 className="font-bebas text-3xl text-white mb-2">{t("speakers.list.bruce.name")}</h4>
                        <div className="text-red font-oswald uppercase tracking-widest text-sm mb-4">{t("speakers.list.bruce.title")}</div>
                        <p className="font-oswald text-white/70 text-lg leading-relaxed flex-grow">{t("speakers.list.bruce.desc")}</p>
                    </div>

                    <div className="bg-blue border border-white/10 p-8 rounded-sm shadow-xl relative flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-red rounded-full flex items-center justify-center text-white mb-6">
                            <Mic className="w-8 h-8" />
                        </div>
                        <h4 className="font-bebas text-3xl text-white mb-2">{t("speakers.list.amir.name")}</h4>
                        <div className="text-red font-oswald uppercase tracking-widest text-sm mb-4">{t("speakers.list.amir.title")}</div>
                        <p className="font-oswald text-white/70 text-lg leading-relaxed flex-grow">{t("speakers.list.amir.desc")}</p>
                    </div>
                </div>
            </div>

            {/* VIDEO MODAL */}
            {videoOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4" onClick={() => setVideoOpen(false)}>
                    <div className="relative w-full max-w-4xl bg-black rounded-sm overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => setVideoOpen(false)} className="absolute top-3 right-3 z-10 bg-red hover:bg-[#c4151c] text-white p-2 rounded-full transition-colors shadow-lg">
                            <X className="w-5 h-5" />
                        </button>
                        <div className="absolute top-0 left-0 w-full h-1 bg-red z-10"></div>
                        <div className="bg-blue px-6 py-4 border-b border-white/10">
                            <p className="font-bebas text-2xl text-white tracking-wide">{t("speakers.list.camille.name")}</p>
                            <p className="font-oswald text-red text-xs uppercase tracking-widest">{t("speakers.list.camille.title")}</p>
                        </div>
                        <video className="w-full aspect-video" controls autoPlay src="https://www.dropbox.com/scl/fi/wveuqjjib4wkeywopt9sk/ALEF-Inaugural-Dinner.mp4?rlkey=6sfjvhx3s58ht2hcv044emyrd&e=1&st=z028hcou&bmus=1&raw=1"></video>
                    </div>
                </div>
            )}

            {/* EVENT VIDEO */}
            <div id="media" className="w-full max-w-5xl mx-auto mb-24 px-4 text-center">
                <h4 className="font-bebas text-3xl md:text-4xl text-foreground mb-8 uppercase">Event Video</h4>
                <div className="relative overflow-hidden border border-foreground/10 bg-black aspect-video flex-col justify-center text-center shadow-2xl">
                    <video
                        className="w-full h-full object-cover"
                        controls
                        preload="metadata"
                        poster="/events/Event_Image.jpg"
                        src="https://www.dropbox.com/scl/fi/wveuqjjib4wkeywopt9sk/ALEF-Inaugural-Dinner.mp4?rlkey=6sfjvhx3s58ht2hcv044emyrd&e=1&st=z028hcou&bmus=1&raw=1"
                    >
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>

            {/* PHOTOS GRID */}
            <div className="w-full max-w-7xl mx-auto mb-24 px-4">
                <h4 className="font-bebas text-3xl md:text-4xl text-foreground mb-8 uppercase text-center">Photo Gallery</h4>
                <div className="grid grid-cols-2 gap-4 auto-rows-[250px] md:auto-rows-[350px] grid-flow-dense">
                    {[...Array(27)].map((_, i) => {
                        let spanClasses = "col-span-1 row-span-1";
                        // Creates repeating patterns:
                        // 1. Right large, left stack
                        // 2. Left large, right stack
                        // 3. Normal 2x2
                        if (i % 8 === 1) {
                            spanClasses = "col-span-1 row-span-2";
                        } else if (i % 8 === 3) {
                            spanClasses = "col-span-1 row-span-2";
                        }

                        return (
                            <div key={i} className={`relative overflow-hidden bg-black shadow-lg ${spanClasses}`}>
                                <SkeletonImage
                                    src={`/events/Event_1/Event_1_Img_${i + 1}.jpg`}
                                    alt={`Event Photo ${i + 1}`}
                                    width={800}
                                    height={800}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* BACK TO EVENTS BUTTON */}
            <div className="flex justify-center mt-12 relative z-10 w-full">
                <Link href="/events">
                    <button className="group relative bg-transparent border border-foreground/70 text-foreground px-12 py-4 text-sm font-bold tracking-[0.2em] uppercase font-oswald overflow-hidden transition-all hover:border-foreground/50 isolate cursor-pointer">
                        <span className="relative z-10 group-hover:text-background transition-colors duration-300">Back To Events Archive</span>
                        <div className="absolute inset-0 bg-foreground transform scale-y-0 origin-top group-hover:scale-y-100 group-hover:origin-bottom transition-transform duration-500 ease-out -z-10"></div>
                    </button>
                </Link>
            </div>

        </main>
    );
}
