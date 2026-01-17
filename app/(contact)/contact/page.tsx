"use client";

import React, { useState, FormEvent } from 'react';
import AnimatedTitle from "../../components/CommonCom/AnimatedTitle";
import { Send } from 'lucide-react';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        organization: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSubmitted(true);

        // Reset after showing success
        setTimeout(() => {
            setIsSubmitted(false);
            setFormData({ name: '', email: '', organization: '', subject: '', message: '' });
        }, 3000);
    };

    return (
        <div className="bg-background min-h-screen relative overflow-hidden">

            <main className="relative z-10 px-6 md:px-12 lg:px-24 py-24 md:py-32">
                <div className="max-w-[1400px] mx-auto">

                    {/* Header */}
                    <div className="text-center mb-16 md:mb-24">
                        <div className="flex items-center justify-center gap-2 text-foreground/60 font-oswald text-xs tracking-widest mb-6">
                            <span className="w-2 h-2 bg-red rounded-full inline-block"></span>
                            GET IN TOUCH // CONNECT
                        </div>
                        <AnimatedTitle
                            text="CONTACT US"
                            className="text-5xl mb-4 md:text-7xl lg:text-8xl font-bold font-bebas text-foreground uppercase leading-none"
                        />
                        <p className="font-oswald text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto leading-relaxed">
                            Ready to join our mission? Have questions about our advocacy work?
                            We'd love to hear from you.
                        </p>
                    </div>

                    {/* Main Content Centered */}
                    <div className="max-w-4xl mx-auto">
                        {/* Contact Form Container */}
                        <div className="bg-blue rounded-xl shadow-2xl overflow-hidden relative border border-white/5">
                            <div className="p-8 md:p-16 relative z-10">
                                <div className="mb-12 text-center">
                                    <h3 className="font-bebas text-3xl md:text-5xl text-white tracking-wider mb-3">
                                        SEND US A MESSAGE
                                    </h3>
                                    <div className="w-16 h-1 bg-red mx-auto mb-6"></div>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-12">
                                    {/* Name & Email Row */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                        <div className="group relative">
                                            <input
                                                type="text"
                                                name="name"
                                                id="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="peer w-full bg-transparent border-b border-white/20 py-4 font-oswald text-white text-lg placeholder-transparent focus:outline-none focus:border-red transition-all duration-300"
                                                placeholder="Name"
                                            />
                                            <label
                                                htmlFor="name"
                                                className="absolute left-0 top-4 font-oswald text-sm tracking-widest text-white/50 transition-all duration-300 peer-focus:-top-6 peer-focus:text-xs peer-focus:text-red peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-red"
                                            >
                                                FULL NAME
                                            </label>
                                        </div>

                                        <div className="group relative">
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="peer w-full bg-transparent border-b border-white/20 py-4 font-oswald text-white text-lg placeholder-transparent focus:outline-none focus:border-red transition-all duration-300"
                                                placeholder="Email"
                                            />
                                            <label
                                                htmlFor="email"
                                                className="absolute left-0 top-4 font-oswald text-sm tracking-widest text-white/50 transition-all duration-300 peer-focus:-top-6 peer-focus:text-xs peer-focus:text-red peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-red"
                                            >
                                                EMAIL ADDRESS
                                            </label>
                                        </div>
                                    </div>

                                    {/* Organization & Subject */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                        <div className="group relative">
                                            <input
                                                type="text"
                                                name="organization"
                                                id="organization"
                                                value={formData.organization}
                                                onChange={handleChange}
                                                className="peer w-full bg-transparent border-b border-white/20 py-4 font-oswald text-white text-lg placeholder-transparent focus:outline-none focus:border-red transition-all duration-300"
                                                placeholder="Organization"
                                            />
                                            <label
                                                htmlFor="organization"
                                                className="absolute left-0 top-4 font-oswald text-sm tracking-widest text-white/50 transition-all duration-300 peer-focus:-top-6 peer-focus:text-xs peer-focus:text-red peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-red"
                                            >
                                                ORGANIZATION (OPTIONAL)
                                            </label>
                                        </div>

                                        <div className="group relative">
                                            <select
                                                name="subject"
                                                id="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                                className="peer w-full bg-transparent border-b border-white/20 py-4 font-oswald text-white text-lg focus:outline-none focus:border-red transition-all duration-300 appearance-none cursor-pointer"
                                            >
                                                <option value="" disabled hidden></option>
                                                <option value="general" className="bg-blue text-white">General Inquiry</option>
                                                <option value="media" className="bg-blue text-white">Media & Press</option>
                                                <option value="partnership" className="bg-blue text-white">Partnership Opportunity</option>
                                                <option value="volunteer" className="bg-blue text-white">Volunteer Interest</option>
                                                <option value="donation" className="bg-blue text-white">Donation Support</option>
                                                <option value="other" className="bg-blue text-white">Other</option>
                                            </select>
                                            <label
                                                htmlFor="subject"
                                                className={`absolute left-0 font-oswald text-sm tracking-widest transition-all duration-300 pointer-events-none ${formData.subject ? '-top-6 text-xs text-red' : 'top-4 text-white/50'}`}
                                            >
                                                SUBJECT
                                            </label>
                                            <div className="absolute right-0 top-4 pointer-events-none text-white/40">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div className="group relative">
                                        <textarea
                                            name="message"
                                            id="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={4}
                                            className="peer w-full bg-transparent border-b border-white/20 py-4 font-oswald text-white text-lg placeholder-transparent focus:outline-none focus:border-red transition-all duration-300 resize-none"
                                            placeholder="Message"
                                        />
                                        <label
                                            htmlFor="message"
                                            className="absolute left-0 top-4 font-oswald text-sm tracking-widest text-white/50 transition-all duration-300 peer-focus:-top-6 peer-focus:text-xs peer-focus:text-red peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-red"
                                        >
                                            YOUR MESSAGE
                                        </label>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="pt-4 flex justify-center">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting || isSubmitted}
                                            className={`group relative bg-transparent border text-white px-12 py-4 text-sm font-bold tracking-[0.2em] uppercase font-oswald overflow-hidden transition-all isolate cursor-pointer ${isSubmitted
                                                ? 'border-green-500 text-green-500 hover:border-green-500'
                                                : 'border-white/30 hover:border-white/50'
                                                }`}
                                        >
                                            <span className="relative z-10 flex items-center gap-3 group-hover:text-blue transition-colors duration-300">
                                                {isSubmitting ? (
                                                    <>
                                                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                                        SENDING...
                                                    </>
                                                ) : isSubmitted ? (
                                                    <>
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                                        MESSAGE SENT
                                                    </>
                                                ) : (
                                                    <>
                                                        SEND MESSAGE <Send className="w-4 h-4" />
                                                    </>
                                                )}
                                            </span>
                                            {!isSubmitted && (
                                                <div className="absolute inset-0 bg-white transform scale-y-0 origin-top group-hover:scale-y-100 group-hover:origin-bottom transition-transform duration-500 ease-out -z-10"></div>
                                            )}
                                        </button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
