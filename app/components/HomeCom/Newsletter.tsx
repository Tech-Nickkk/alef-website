"use client";

import { useRef } from "react";
import AnimatedTitle from "../CommonCom/AnimatedTitle";
import AnimatedParagraph from "../CommonCom/AnimatedParagraph";

export default function Newsletter() {
    return (
        <section className="relative py-24 px-6 md:px-12 lg:px-24 bg-[#f9f9f9] overflow-hidden flex items-center justify-center">
            {/* Background Text */}
            <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden">
                <span className="text-[12rem] md:text-[18rem] lg:text-[24rem] font-bold text-gray-100/50 tracking-widest whitespace-nowrap">
                    NEWSLETTER
                </span>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto w-full text-center space-y-8">
                {/* Title */}
                <AnimatedTitle
                    text="Subscribe To Get News About Us"
                    className="text-4xl md:text-5xl lg:text-6xl font-cormorant text-[#1a2b4b] font-bold"
                />

                {/* Subtitle */}
                <AnimatedParagraph
                    text="Get The Latest Research And Updates On Terrorism In Lebanon Delivered To Your Inbox."
                    className="text-gray-500 font-optima text-lg md:text-xl max-w-2xl mx-auto"
                />

                {/* Input Form */}
                <div className="max-w-xl mx-auto relative pt-4">
                    <div className="bg-white rounded-full p-2 shadow-xl flex items-center">
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="flex-1 bg-transparent px-6 py-3 text-gray-700 placeholder-gray-400 outline-none font-optima text-lg"
                        />
                        <button className="bg-[#D31920] hover:bg-[#b0151b] text-white px-8 py-3 rounded-full font-medium transition-colors font-optima">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
