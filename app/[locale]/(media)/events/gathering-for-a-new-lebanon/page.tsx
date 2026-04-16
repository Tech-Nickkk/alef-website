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
            
            {/* Nav Back Button */}
            <div className="w-full max-w-7xl mx-auto mb-12">
                <Link href="/events" className="inline-flex items-center gap-2 text-foreground/70 hover:text-red transition-colors font-oswald uppercase tracking-widest text-sm">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Events Archive
                </Link>
            </div>

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
                        <video className="w-full aspect-video" controls autoPlay src="/events/Camille_Chamoun_Video.mp4"></video>
                    </div>
                </div>
            )}

            {/* EVENT HIGHLIGHTS / "STORIES" SECTION */}
            <div className="w-full max-w-7xl mx-auto mb-16 px-4" id="media">
                <h4 className="font-bebas text-3xl md:text-4xl text-foreground mb-8 uppercase text-center md:text-left">Highlights</h4>
                <div className="flex gap-4 md:gap-6 overflow-x-auto pb-6 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="flex flex-col items-center gap-3 cursor-pointer group flex-shrink-0 snap-start">
                            <div className="p-[3px] rounded-full bg-linear-to-tr from-red via-red/50 to-orange-500 group-hover:scale-105 transition-transform shadow-lg">
                                <div className="w-20 h-20 md:w-24 md:h-24 bg-black rounded-full overflow-hidden border-[3px] border-background">
                                    <SkeletonImage src="/events/Event_Image.jpg" alt="Highlight" width={96} height={96} className="w-full h-full object-cover" />
                                </div>
                            </div>
                            <span className="font-oswald text-xs uppercase tracking-widest text-foreground/60 group-hover:text-foreground transition-colors">Key Moment {i + 1}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* PHOTOS GRID */}
            <div className="w-full max-w-7xl mx-auto mb-16 px-4">
                <h4 className="font-bebas text-3xl md:text-4xl text-foreground mb-8 uppercase text-center md:text-left">Photo Gallery</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[150px] md:auto-rows-[200px]">
                    <div className="col-span-2 row-span-2 relative rounded-xl overflow-hidden group bg-black shadow-xl">
                        <SkeletonImage src="/events/Event_Image.jpg" alt="Photo" width={600} height={400} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="relative rounded-xl overflow-hidden group bg-black shadow-lg">
                            <SkeletonImage src="/events/event-img-1.jpg" alt="Photo" width={300} height={200} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        </div>
                    ))}
                    <div className="col-span-2 row-span-1 relative rounded-xl overflow-hidden group bg-black shadow-lg">
                        <SkeletonImage src="/events/Camille_Chamoun.jpeg" alt="Photo" width={600} height={200} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                    </div>
                </div>
            </div>

            {/* VIDEOS SECTION */}
            <div className="w-full max-w-7xl mx-auto mb-24 px-4">
                <h4 className="font-bebas text-3xl md:text-4xl text-foreground mb-8 uppercase text-center md:text-left">Videos & Speeches</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(3)].map((_, i) => (
                         <div key={i} suppressHydrationWarning className="relative overflow-hidden rounded-xl border border-foreground/10 bg-black aspect-video flex-col justify-center text-center shadow-xl">
                              <video
                                 className="w-full h-full object-cover"
                                 controls
                                 poster="/events/Camille_Chamoun.jpeg"
                                 src="/events/Camille_Chamoun_Video.mp4"
                             >
                                 Your browser does not support the video tag.
                             </video>
                         </div>
                    ))}
                </div>
            </div>

        </main>
    );
}
