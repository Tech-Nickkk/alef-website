'use client';

import { useState } from 'react';
import { usePathname } from "next/navigation";
import AnimatedTitle from "./AnimatedTitle";

export default function JoinUs() {
    const pathname = usePathname();
    
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const res = await fetch('/api/join-us', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus('success');
                setMessage("Welcome to the movement!");
                setFormData({ name: '', email: '' }); 
            } else {
                setStatus('error');
                setMessage(data.error || "Something went wrong.");
            }
        } catch (error) {
            setStatus('error');
            setMessage("Failed to connect. Please try again.");
        }
    };

    return (
        <section id="join-us" className="relative py-12 md:py-24 px-4 md:px-12 lg:px-24 overflow-hidden border-t border-foreground/10">
            <div className="relative z-10 max-w-4xl mx-auto w-full text-center space-y-8 md:space-y-12 bg-blue border border-white/10 p-8 md:p-20 rounded-3xl overflow-hidden transition-all duration-500">

                <div className="relative z-30">
                    
                    {/* --- SUCCESS STATE --- */}
                    {status === 'success' ? (
                        <div className="flex flex-col items-center justify-center space-y-6 py-10 animate-fade-in">
                            {/* Big Checkmark Icon */}
                            <div className="w-20 h-20 md:w-24 md:h-24 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.4)] mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 md:w-12 md:h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>

                            <AnimatedTitle
                                key="success-title"
                                text="WELCOME TO THE TEAM"
                                className="text-4xl md:text-6xl lg:text-7xl font-bebas text-white uppercase leading-none"
                            />
                            
                            <p className="text-white/80 font-oswald text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
                                You have successfully joined the movement. <br/>
                                Keep an eye on your inbox for exclusive updates.
                            </p>
                        </div>
                    ) : (
                        
                    /* --- NORMAL FORM STATE --- */
                    <>
                        <div className="flex flex-col items-center space-y-2">
                            <span className="font-oswald text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] text-red uppercase">Be Part of the Solution</span>
                            <div className="flex justify-center">
                                <AnimatedTitle
                                    key={pathname}
                                    text="JOIN THE MOVEMENT"
                                    className="text-4xl md:text-6xl lg:text-7xl font-bebas text-white uppercase leading-none"
                                />
                            </div>
                        </div>

                        <p className="text-white/60 font-oswald text-base md:text-xl max-w-2xl mx-auto mt-6 md:mt-8 leading-relaxed">
                            Help us build our network. Provide your contact details to join our mailing list.
                        </p>

                        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto pt-6 md:pt-8 relative space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                                <div className="relative group">
                                    <input
                                        type="text"
                                        placeholder="FULL NAME"
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        required
                                        className="w-full bg-background text-foreground px-4 py-3 md:px-6 md:py-4 outline-none font-oswald text-base md:text-lg uppercase placeholder:text-gray-400 rounded-sm border border-transparent focus:border-red transition-colors"
                                    />
                                </div>
                                <div className="relative group">
                                    <input
                                        type="email"
                                        placeholder="ENTER SECURE EMAIL"
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        required
                                        className="w-full bg-background text-foreground px-4 py-3 md:px-6 md:py-4 outline-none font-oswald text-base md:text-lg uppercase placeholder:text-gray-400 rounded-sm border border-transparent focus:border-red transition-colors"
                                    />
                                </div>
                            </div>

                            <button 
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full bg-red hover:bg-[#b0151b] text-white px-8 py-3 md:px-10 md:py-4 font-bold tracking-wider transition-all font-oswald uppercase hover:shadow-[0_0_20px_rgba(227,27,35,0.4)] text-sm md:text-base cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {status === 'loading' ? 'JOINING...' : 'JOIN NOW'}
                            </button>

                            {/* Error Message Only (Success is handled by the big view above) */}
                            {status === 'error' && (
                                <div className="text-center mt-4 text-sm font-oswald uppercase tracking-widest text-red-500">
                                    {message}
                                </div>
                            )}

                            <div className="text-left mt-4 text-[10px] text-white/30 font-oswald uppercase tracking-widest">
                                * Your information is secure. We use this to build our mailing list.
                            </div>
                        </form>
                    </>
                    )}
                </div>
            </div>
        </section>
    );
}