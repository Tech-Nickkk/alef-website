"use client";

import AnimatedTitle from "../../components/CommonCom/AnimatedTitle";
import Image from "next/image";
import { Calendar, MapPin, ArrowRight, Clock } from "lucide-react";
import Link from "next/link";

export default function EventsPage() {
    return (
        <main className="min-h-screen bg-background pt-32 pb-24 px-6 md:px-12 lg:px-24 flex flex-col items-center">

            {/* Header */}
            <div className="max-w-4xl mx-auto text-center mb-24 space-y-6">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <span className="w-1.5 h-1.5 bg-red rounded-full animate-pulse"></span>
                    <span className="font-oswald text-red tracking-[0.3em] uppercase text-xs font-bold">Agenda & Gatherings</span>
                    <span className="w-1.5 h-1.5 bg-red rounded-full animate-pulse"></span>
                </div>
                <AnimatedTitle
                    text="EVENTS & GATHERINGS"
                    className="text-6xl md:text-8xl font-bold font-bebas text-foreground uppercase leading-none"
                />
                <div className="h-1 w-24 bg-red mx-auto"></div>
            </div>

            {/* UPCOMING EVENTS SECTION */}
            <div className="w-full max-w-7xl mx-auto mb-32">
                <div className="flex items-end gap-6 mb-12 border-b border-foreground/10 pb-6">
                    <h2 className="text-4xl md:text-5xl font-bebas text-foreground mb-1">Upcoming Events</h2>
                    <span className="font-oswald text-foreground/40 text-lg uppercase tracking-wider pb-1">Join the Movement</span>
                </div>

                {/* Event Card */}
                <div className="group relative bg-blue border border-white/10 rounded-3xl overflow-hidden grid md:grid-cols-12 shadow-2xl hover:shadow-red/10 transition-all duration-500">

                    {/* Image Side */}
                    <div className="md:col-span-5 lg:col-span-6 relative h-[400px] md:h-auto overflow-hidden">
                        <div className="absolute inset-0 bg-blue/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                        <Image
                            src="/events/gala-dinner-2026.jpg"
                            alt="ALEF Gala Dinner Event"
                            fill
                            className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                        />
                    </div>

                    {/* Content Side */}
                    <div className="md:col-span-7 lg:col-span-6 p-10 md:p-14 lg:p-16 flex flex-col justify-center relative bg-gradient-to-br from-blue to-[#0a1e30]">
                        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                            <Clock className="w-64 h-64 text-white" />
                        </div>

                        <div className="relative z-10 space-y-8">
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-red/10 border border-red/20 rounded-full text-red text-xs font-oswald tracking-widest uppercase mb-6">
                                    <Calendar className="w-3 h-3" />
                                    <span>Upcoming</span>
                                </div>
                                <h3 className="text-4xl md:text-5xl lg:text-6xl font-bebas text-white leading-[0.9] mb-4">
                                    Annual Gala <br /> <span className="text-red">Dinner 2026</span>
                                </h3>
                                <p className="font-oswald text-white/70 text-lg leading-relaxed max-w-md">
                                    A prestigious gathering of patriots and friends of freedom. Join us for an evening of dialogue, unity, and vision for the future of Lebanon.
                                </p>
                            </div>

                            <div className="space-y-4 border-t border-white/10 pt-8">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-white/5 rounded-lg text-red shrink-0 border border-white/5">
                                        <Calendar className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <span className="block font-bebas text-xl text-white tracking-wide">April 7, 2026</span>
                                        <span className="block font-oswald text-sm text-white/50 uppercase tracking-widest">Save the Date</span>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-white/5 rounded-lg text-red shrink-0 border border-white/5">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <span className="block font-bebas text-xl text-white tracking-wide">3 West 51st Street</span>
                                        <span className="block font-oswald text-sm text-white/50 uppercase tracking-widest">New York, NY 10019</span>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4">
                                <button className="group/btn relative overflow-hidden bg-white text-blue px-10 py-4 font-bebas text-xl tracking-widest uppercase rounded-lg hover:bg-red hover:text-white transition-all duration-300 shadow-lg">
                                    <span className="relative z-10 flex items-center gap-3">
                                        Reserve Your Seat <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* PAST EVENTS / EMPTY STATE */}
            <div className="w-full max-w-7xl mx-auto">
                <div className="flex items-end gap-6 mb-12 border-b border-foreground/10 pb-6 opacity-60">
                    <h2 className="text-4xl rounded md:text-5xl font-bebas text-foreground mb-1">Past Events</h2>
                </div>
                <div className="bg-foreground/5 border border-foreground/10 rounded-2xl p-12 text-center">
                    <p className="font-oswald text-foreground/40 text-lg uppercase tracking-widest">Archive Updating...</p>
                </div>
            </div>

        </main>
    );
}
