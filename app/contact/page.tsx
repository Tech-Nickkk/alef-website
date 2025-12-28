"use client";

import React, { useState, FormEvent } from 'react';
import AnimatedTitle from "../components/CommonCom/AnimatedTitle";
import { Mail, Phone, MapPin, Send, User, MessageSquare, Building2 } from 'lucide-react';

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
        <div className="bg-theme-black min-h-screen relative overflow-hidden">

            {/* Background Grid Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), 
                                      linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '50px 50px'
                }} />
            </div>

            <main className="relative z-10 px-6 md:px-12 lg:px-24 py-24 md:py-32">
                <div className="max-w-[1400px] mx-auto">

                    {/* Header */}
                    <div className="text-center mb-16 md:mb-24">
                        <div className="flex items-center justify-center gap-2 text-theme-white/60 font-oswald text-xs tracking-widest mb-6">
                            <span className="w-2 h-2 bg-theme-accent rounded-full inline-block"></span>
                            GET IN TOUCH // CONNECT
                        </div>
                        <AnimatedTitle
                            text="CONTACT US"
                            className="text-5xl md:text-8xl font-bebas text-theme-white mb-6 justify-center flex"
                        />
                        <p className="font-oswald text-lg md:text-xl text-theme-white/60 max-w-2xl mx-auto leading-relaxed">
                            Ready to join our mission? Have questions about our advocacy work?
                            We'd love to hear from you.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">

                        {/* Contact Information */}
                        <div className="lg:col-span-2 space-y-6">

                            {/* Info Card */}
                            <div className="bg-card-bg border border-white/10 rounded-2xl p-8 md:p-10">
                                <h3 className="font-bebas text-2xl md:text-3xl text-white mb-8 tracking-wide">
                                    REACH OUT DIRECTLY
                                </h3>

                                <div className="space-y-6">
                                    <div className="flex items-start gap-4 group">
                                        <div className="w-12 h-12 bg-theme-accent/10 border border-theme-accent/30 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-theme-accent/20 transition-colors">
                                            <Mail className="w-5 h-5 text-theme-accent" />
                                        </div>
                                        <div>
                                            <p className="font-oswald text-xs tracking-widest text-white/40 mb-1">EMAIL</p>
                                            <a href="mailto:info@alef.org" className="font-oswald text-white hover:text-theme-accent transition-colors">
                                                info@alef.org
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 group">
                                        <div className="w-12 h-12 bg-theme-accent/10 border border-theme-accent/30 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-theme-accent/20 transition-colors">
                                            <Phone className="w-5 h-5 text-theme-accent" />
                                        </div>
                                        <div>
                                            <p className="font-oswald text-xs tracking-widest text-white/40 mb-1">PHONE</p>
                                            <a href="tel:+12025551234" className="font-oswald text-white hover:text-theme-accent transition-colors">
                                                +1 (202) 555-1234
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 group">
                                        <div className="w-12 h-12 bg-theme-accent/10 border border-theme-accent/30 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-theme-accent/20 transition-colors">
                                            <MapPin className="w-5 h-5 text-theme-accent" />
                                        </div>
                                        <div>
                                            <p className="font-oswald text-xs tracking-widest text-white/40 mb-1">LOCATION</p>
                                            <p className="font-oswald text-white">
                                                Washington, D.C.<br />
                                                <span className="text-white/60">United States</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Links Card */}
                            <div className="bg-card-bg border border-theme-white/10 rounded-2xl p-8 md:p-10">
                                <h3 className="font-bebas text-2xl text-white mb-6 tracking-wide">
                                    QUICK LINKS
                                </h3>
                                <div className="space-y-3">
                                    {['Media Inquiries', 'Partnership Opportunities', 'Volunteer Programs', 'Donation Questions'].map((item, idx) => (
                                        <button
                                            key={idx}
                                            className="w-full text-left px-4 py-3 bg-theme-black/50 border border-theme-white/5 rounded-lg font-oswald text-sm text-theme-white/70 hover:text-theme-white hover:border-theme-accent/30 hover:bg-theme-accent/5 transition-all duration-300"
                                        >
                                            {item}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-3">
                            <div className="bg-card-bg border border-white/10 rounded-2xl p-8 md:p-12 relative overflow-hidden">

                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-8">
                                        <h3 className="font-bebas text-2xl md:text-3xl text-white tracking-wide">
                                            SEND US A MESSAGE
                                        </h3>
                                        <div className="font-oswald text-xs tracking-widest text-white/40">
                                            FORM_001
                                        </div>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-6">

                                        {/* Name & Email Row */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="relative">
                                                <label className="block font-oswald text-xs tracking-widest text-white/40 mb-2">
                                                    FULL NAME *
                                                </label>
                                                <div className="relative">
                                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        required
                                                        placeholder="John Doe"
                                                        className="w-full bg-[#0a1929] border border-theme-white/10 rounded-xl px-12 py-4 font-oswald text-white placeholder:text-white/30 focus:outline-none focus:border-theme-accent/50 focus:bg-[#0d2137] transition-all duration-300"
                                                    />
                                                </div>
                                            </div>

                                            <div className="relative">
                                                <label className="block font-oswald text-xs tracking-widest text-white/40 mb-2">
                                                    EMAIL ADDRESS *
                                                </label>
                                                <div className="relative">
                                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        required
                                                        placeholder="john@example.com"
                                                        className="w-full bg-[#0a1929] border border-theme-white/10 rounded-xl px-12 py-4 font-oswald text-white placeholder:text-white/30 focus:outline-none focus:border-theme-accent/50 focus:bg-[#0d2137] transition-all duration-300"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Organization */}
                                        <div className="relative">
                                            <label className="block font-oswald text-xs tracking-widest text-white/40 mb-2">
                                                ORGANIZATION (OPTIONAL)
                                            </label>
                                            <div className="relative">
                                                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                                                <input
                                                    type="text"
                                                    name="organization"
                                                    value={formData.organization}
                                                    onChange={handleChange}
                                                    placeholder="Your Organization"
                                                    className="w-full bg-[#0a1929] border border-theme-white/10 rounded-xl px-12 py-4 font-oswald text-white placeholder:text-white/30 focus:outline-none focus:border-theme-accent/50 focus:bg-[#0d2137] transition-all duration-300"
                                                />
                                            </div>
                                        </div>

                                        {/* Subject */}
                                        <div className="relative">
                                            <label className="block font-oswald text-xs tracking-widest text-white/40 mb-2">
                                                SUBJECT *
                                            </label>
                                            <select
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                                className="w-full bg-[#0a1929] border border-theme-white/10 rounded-xl px-4 py-4 font-oswald text-white/40 focus:outline-none focus:border-theme-accent/50 focus:bg-[#0d2137] transition-all duration-300 appearance-none cursor-pointer"
                                            >
                                                <option value="" className="bg-[#0a1929] text-white">Select a subject...</option>
                                                <option value="general" className="bg-[#0a1929] text-white">General Inquiry</option>
                                                <option value="media" className="bg-[#0a1929] text-white">Media & Press</option>
                                                <option value="partnership" className="bg-[#0a1929] text-white">Partnership Opportunity</option>
                                                <option value="volunteer" className="bg-[#0a1929] text-white">Volunteer Interest</option>
                                                <option value="donation" className="bg-[#0a1929] text-white">Donation Support</option>
                                                <option value="other" className="bg-[#0a1929] text-white">Other</option>
                                            </select>
                                            <div className="absolute right-4 top-[calc(50%+12px)] -translate-y-1/2 pointer-events-none">
                                                <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </div>

                                        {/* Message */}
                                        <div className="relative">
                                            <label className="block font-oswald text-xs tracking-widest text-white/40 mb-2">
                                                YOUR MESSAGE *
                                            </label>
                                            <div className="relative">
                                                <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-white/30" />
                                                <textarea
                                                    name="message"
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    required
                                                    rows={5}
                                                    placeholder="Tell us how we can help..."
                                                    className="w-full bg-[#0a1929] border border-theme-white/10 rounded-xl px-12 py-4 font-oswald text-white placeholder:text-white/30 focus:outline-none focus:border-theme-accent/50 focus:bg-[#0d2137] transition-all duration-300 resize-none"
                                                />
                                            </div>
                                        </div>

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            disabled={isSubmitting || isSubmitted}
                                            className={`w-full group relative bg-transparent border text-white/80 py-5 text-sm font-bold tracking-[0.2em] uppercase font-oswald overflow-hidden transition-all isolate cursor-pointer rounded-xl ${isSubmitted
                                                ? 'border-green-500 bg-green-500/10'
                                                : 'border-theme-accent hover:border-theme-accent/80'
                                                }`}
                                        >
                                            <span className={`relative z-10 flex items-center justify-center gap-3 transition-colors duration-300 ${isSubmitted ? 'text-green-400' : 'group-hover:text-theme-black'
                                                }`}>
                                                {isSubmitting ? (
                                                    <>
                                                        <div className="w-5 h-5 border-2 border-theme-white/30 border-t-theme-white rounded-full animate-spin" />
                                                        SENDING...
                                                    </>
                                                ) : isSubmitted ? (
                                                    <>
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        MESSAGE SENT!
                                                    </>
                                                ) : (
                                                    <>
                                                        <Send className="w-5 h-5" />
                                                        SEND MESSAGE
                                                    </>
                                                )}
                                            </span>
                                            {!isSubmitted && (
                                                <div className="absolute inset-0 bg-theme-accent transform scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500 ease-out -z-10" />
                                            )}
                                        </button>

                                        <p className="text-center font-oswald text-xs text-white/40">
                                            By submitting this form, you agree to our privacy policy.
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
