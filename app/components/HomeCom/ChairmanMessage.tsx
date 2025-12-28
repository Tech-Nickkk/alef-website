import Image from "next/image";
import AnimatedTitle from "../CommonCom/AnimatedTitle";

export default function ChairmanMessage() {

    return (
        <section className="py-12 md:py-24 px-6 md:px-12 lg:px-24 bg-theme-black border-t border-theme-white/10">
            <div className="max-w-[1400px] mx-auto">

                {/* Header */}
                <div className="flex flex-col items-center justify-center mb-6 md:mb-12 border-b border-theme-white/10 pb-6 gap-4 text-center">
                    <AnimatedTitle
                        text="CHAIRMAN'S MESSAGE"
                        className="text-4xl md:text-6xl font-bold font-bebas text-theme-white uppercase leading-none"
                    />
                    <div className="flex items-center gap-2 text-theme-white/60 font-oswald text-xs tracking-widest">
                        <span className="w-2 h-2 bg-theme-accent rounded-full inline-block"></span>
                        LEADERSHIP // FOUNDER
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Text Card with Scrollbar */}
                    <div className="bg-card-bg border border-theme-white/10 rounded-2xl p-8 md:p-12 flex flex-col h-[450px] md:h-[600px] relative group hover:border-theme-white/30 transition-colors duration-500">

                        {/* Technical Label */}
                        <div className="flex justify-between items-start mb-6 font-oswald text-xs tracking-widest text-white/60 shrink-0">
                            <span>01</span>
                            <span>ZIAD K. ABDELNOUR // STATEMENT</span>
                        </div>

                        <div className="relative z-10 flex-1 overflow-hidden flex flex-col">
                            <h3 className="text-2xl md:text-3xl text-white font-bebas tracking-wide leading-normal mb-6 shrink-0">
                                WELCOME TO THE AMERICAN LEBANON EDUCATION FOUNDATION.
                            </h3>

                            {/* SCROLLABLE AREA START */}
                            <div className="overflow-y-auto pr-4 custom-scrollbar flex-1 space-y-6 text-lg text-white/60 font-oswald leading-relaxed">
                                <p>
                                    The American Lebanon Education Foundation is a collective of Lebanese and American professionals, activists, and leaders united by a shared vision of a free, sovereign, and prosperous Lebanon. As an independent, non-partisan movement, we are committed to dismantling corruption, restoring governance, and advocating for Lebanon’s rightful place within the international community.
                                </p>
                                <p>
                                    Our mission is to advocate for political, economic, and security reforms, engaging with international policymakers to support Lebanon’s sovereignty. We strive to combat corruption and militant influences undermining stability while promoting diaspora involvement in Lebanon’s reconstruction and economic growth.
                                </p>
                                <p>
                                    We believe in Sovereignty, upholding Lebanon’s independence from foreign domination. We stand for Transparency & Accountability, believing in ethical governance and responsible leadership. We fight for Economic Freedom, promoting investment, job creation, and financial stability.
                                </p>
                                <p>
                                    The Rule of Law is non-negotiable; we advocate for an independent judiciary and security forces. We are building a Lebanon based on Meritocracy & Performance, valuing skills and leadership excellence above sectarian allegiance.
                                </p>
                                <p>
                                    Join us in this critical fight for the soul of our nation. Together, we can drive policy solutions for a self-reliant and thriving Lebanon.
                                </p>
                                <br />
                            </div>
                            {/* SCROLLABLE AREA END */}

                            {/* Gradient Fade at bottom to indicate scrolling */}
                            <div className="absolute bottom-0 left-0 w-full h-12 bg-linear-to-t from-card-bg to-transparent pointer-events-none"></div>
                        </div>
                    </div>

                    {/* Image Card - Parallax Effect */}
                    <div className="bg-card-bg border border-theme-white/10 rounded-2xl p-2 h-[450px] md:h-[600px] relative overflow-hidden group">
                        <div className="relative w-full h-full rounded-xl overflow-hidden">
                            <Image
                                src="/home/chairman.jpg"
                                alt="Ziad K. Abdelnour"
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div className="absolute bottom-6 left-6 z-10 font-oswald text-xs tracking-widest text-white bg-black/50 px-4 py-2 backdrop-blur-md border border-theme-white/10 rounded-full">
                            FOUNDING_CHAIRMAN // 2025
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}