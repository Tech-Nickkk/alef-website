"use client";

import React, { useRef } from "react";
import Image from "next/image";
import AnimatedTitle from "../../components/CommonCom/AnimatedTitle";

const fallenAngels = [
    {
        name: "Kamal Joumblatt",
        image: "/fallenpatriots/Kamal Joumblatt.jpg",
        description: "One of Lebanon's most influential political figures, a Druze leader, founder of the Progressive Socialist Party (PSP), and head of the leftist National Movement during the early years of the Lebanese Civil War (1975–1990). A vocal critic of Syrian intervention in Lebanon. Assassinated on March 16, 1977. The killing has long been widely attributed to Syrian intelligence or pro-Syrian elements, aimed at eliminating a powerful opponent to Syrian influence."
    },
    {
        name: "Bachir Gemayel",
        image: "/fallenpatriots/Bashir_Gemayel.png",
        description: "(President-elect and Lebanese Forces leader) — Killed on September 14, 1982, by a massive bomb at Kataeb Party headquarters in Beirut, just days before taking office. The attack also killed 23 others."
    },
    {
        name: "Rashid Karami",
        image: "/fallenpatriots/Rachid_Karami.png",
        description: "(Prime Minister) — Killed on June 1, 1987, by a bomb in a helicopter (widely attributed to Syrian involvement)."
    },
    {
        name: "René Moawad",
        image: "/fallenpatriots/René_Moawad.jpg",
        description: "(President) — Killed on November 22, 1989, by a car bomb in West Beirut, along with 23 others."
    },
    {
        name: "Rafic Hariri",
        image: "/fallenpatriots/Rafic Hariri.jpg",
        role: "Prime Minister", // Highlighting specifically as per text
        description: "On February 14, 2005. A massive truck bomb in downtown Beirut killed Hariri and 21 others (including former Economy Minister Bassel Fleihan and bodyguards), injuring hundreds. UN-backed Special Tribunal for Lebanon convicted Hezbollah operatives (e.g., Salim Ayyash in 2020, with appeals adding others like Hassan Habib Merhi and Hussein Oneissi in 2022) for involvement in the plot, though Hezbollah's leadership denied responsibility and was not directly implicated. The killing sparked the Cedar Revolution, forcing Syrian troops out of Lebanon after nearly 30 years."
    },
    // Divider text here in layout: "This event triggered a series of subsequent targeted killings..."
    {
        name: "Samir Kassir",
        image: "/fallenpatriots/Samir Kassir.jpg",
        description: "(prominent anti-Syrian journalist) — Car bomb, June 2, 2005."
    },
    {
        name: "Gebran Tueni",
        image: "/fallenpatriots/Gebran Tuenijpg.jpg",
        description: "(MP and An-Nahar newspaper editor, outspoken critic of Syria) — Car bomb, December 12, 2005."
    },
    {
        name: "Pierre Gemayel",
        image: "/fallenpatriots/Pierre Gemayel.jpg",
        description: "(Minister of Industry, anti-Syrian MP) — Shot dead, November 21, 2006."
    },
    {
        name: "Walid Eido",
        image: "/fallenpatriots/walid_eido.jpg",
        description: "(anti-Syrian MP) — Car bomb, June 13, 2007."
    },
    {
        name: "Antoine Ghanem",
        image: "/fallenpatriots/antoine_ghanem.jpg",
        description: "(anti-Syrian MP) — Car bomb, September 19, 2007."
    },
    {
        name: "Wissam al-Hassan",
        image: "/fallenpatriots/wissam al hassan.jpg",
        description: "(intelligence chief) — Car bomb in 2012 and investigators into Hariri's death."
    },
    {
        name: "Mohamad Chatah",
        image: "/fallenpatriots/Mohamad_Chatah.jpg",
        description: "(Lebanese Economist and Diplomat) — Car bomb, December 27, 2013."
    }
];

export default function FallenAngelsPage() {
    const containerRef = useRef(null);



    return (
        <div className="bg-background min-h-screen flex flex-col relative overflow-hidden" ref={containerRef}>

            <main className="grow pt-32 px-4 md:px-8 lg:px-12 max-w-[1400px] mx-auto w-full z-10 relative pb-20">

                {/* Header Section */}
                <div className="mb-20 text-center max-w-5xl mx-auto">
                    <AnimatedTitle
                        text="FALLEN ANGELS"
                        className="text-5xl mb-6 md:text-7xl lg:text-8xl font-bold font-bebas text-foreground uppercase leading-none"
                    />
                    <div className="font-oswald text-lg md:text-xl text-foreground/80 leading-relaxed max-w-4xl mx-auto space-y-6">
                        <p>
                            Lebanon has a long and tragic history of political violence, with many prominent leaders, politicians, prime ministers, presidents-elect, and influential figures becoming victims of assassinations, bombings, or targeted killings.
                        </p>
                        <p>
                            These acts often stem from the country&apos;s complex sectarian politics, civil war (1975–1990), foreign interventions (Syria, Israel, and others), and regional rivalries.
                        </p>
                        <p className="text-foreground font-semibold pt-4">
                            Here are some of the most notable cases, focusing on high-profile leaders:
                        </p>
                    </div>
                </div>

                {/* List Section */}
                <div className="flex flex-col gap-8 md:gap-12">
                    {fallenAngels.map((angel, index) => (
                        <React.Fragment key={index}>
                            {/* Insert Transition Text before Samir Kassir (Index 5 is Rafic, Index 6 is Samir) */}
                            {index === 5 && (
                                <div className="py-8 md:py-12 text-center max-w-4xl mx-auto fallen-card">
                                    <p className="font-oswald text-lg md:text-xl text-foreground font-semibold leading-relaxed border-t border-b border-foreground/10 py-8">
                                        This event triggered a series of subsequent targeted killings, mostly against anti-Syrian figures (often attributed to Syrian intelligence or allies):
                                    </p>
                                </div>
                            )}

                            <div className="fallen-card group relative bg-foreground/5 border border-white/10 rounded-xl overflow-hidden hover:bg-blue transition-all duration-500">
                                <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start p-6 md:p-8">

                                    {/* Image Container */}
                                    <div className="shrink-0 w-32 h-32 md:w-48 md:h-48 relative rounded-full md:rounded-lg overflow-hidden border-2 border-theme-accent/20 shadow-2xl">
                                        <Image
                                            src={angel.image}
                                            alt={angel.name}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 text-center md:text-left">
                                        <h3 className="font-bebas text-3xl md:text-4xl text-red mb-3 tracking-wide">
                                            {angel.role ? `${angel.role} ${angel.name}` : angel.name}
                                        </h3>
                                        <p className="font-oswald text-foreground/80 text-base md:text-lg leading-relaxed group-hover:text-white transition-colors">
                                            {angel.description}
                                        </p>
                                    </div>

                                </div>
                            </div>
                        </React.Fragment>
                    ))}
                </div>

                {/* Footer Note */}
                <div className="mt-24 mb-12 relative text-center">
                    {/* Decorative Line */}
                    <div className="absolute top-1/2 left-0 w-full h-[3px] bg-linear-to-r from-transparent via-red to-transparent transform -translate-y-1/2" />

                    <div className="relative inline-block bg-background px-6 md:px-12">
                        <p className="font-bebas text-xl md:text-3xl text-foreground/60 uppercase tracking-[0.2em] leading-relaxed max-w-2xl mx-auto">
                            <span className="text-red/80">Along with the dozens of other victims</span> <br className="hidden md:block" />
                            who have fallen to this day
                        </p>
                    </div>
                </div>

            </main>
        </div>
    );
}
