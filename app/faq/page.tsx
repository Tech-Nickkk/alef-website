"use client";

import { useState } from 'react';
import AnimatedTitle from "../components/CommonCom/AnimatedTitle";
import { FAQS } from '../lib/faqData';
import { Plus, Minus } from 'lucide-react';

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="bg-theme-black min-h-screen flex flex-col relative overflow-hidden">

            <main className="grow pt-32 px-4 md:px-8 lg:px-12 max-w-[1400px] mx-auto w-full z-10 relative">

                {/* Header Section */}
                <div className="mb-20 text-center">
                    <AnimatedTitle
                        text="FREQUENTLY ASKED QUESTIONS"
                        className="text-5xl md:text-7xl font-bebas text-theme-white mb-6 justify-center flex"
                    />
                    <div className="h-1 w-24 bg-red-600 mx-auto mb-8"></div>
                    <p className="font-oswald text-xl md:text-2xl text-theme-white/90 leading-relaxed max-w-3xl mx-auto">
                        Understanding the complexities of Hezbollah's influence, U.S. policy, and the path to a sovereign Lebanon.
                    </p>
                </div>

                {/* FAQ Accordion Grid */}
                <div className="grid grid-cols-1 gap-4 mb-24 max-w-4xl mx-auto">
                    {FAQS.map((faq, index) => (
                        <div
                            key={index}
                            className={`border border-theme-white/10 rounded-sm transition-all duration-300 bg-card-bg`}
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex items-center justify-between p-6 text-left focus:outline-none group"
                            >
                                <span className="font-bebas text-xl md:text-2xl tracking-wide text-white">
                                    {faq.question}
                                </span>
                                <div className={`ml-4 shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                                    {openIndex === index ? (
                                        <Minus className="w-6 h-6 text-theme-accent" />
                                    ) : (
                                        <Plus className="w-6 h-6 text-white/50 group-hover:text-white" />
                                    )}
                                </div>
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                            >
                                <div className="p-6 pt-0 border-t border-white/5 mx-6 mt-2">
                                    <p className="font-oswald text-white/70 text-lg leading-relaxed pt-4">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Contact CTA */}
                <div className="text-center mb-24">
                    <p className="font-oswald text-theme-white/60 mb-4 uppercase tracking-widest">
                        Still have questions?
                    </p>
                    <a
                        href="/contact"
                        className="inline-block bg-theme-accent hover:bg-[#c4151c] text-white px-8 py-3 font-bebas text-xl tracking-wider transition-all shadow-lg shadow-red-900/20"
                    >
                        Contact Us
                    </a>
                </div>

            </main>
        </div>
    );
}