"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function SuccessPage() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        // Trigger animation on mount
        setShowConfetti(true);
    }, []);

    return (
        <main className="min-h-screen bg-background flex items-center justify-center px-6 relative overflow-hidden">
            
            {/* Background Decoration */}
            <div className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue rounded-full blur-[100px]"></div>
            </div>

            <div className="max-w-xl w-full relative z-10">
                <div className="bg-foreground/5 border border-foreground/10 backdrop-blur-md rounded-3xl p-10 md:p-16 text-center space-y-8 shadow-2xl">
                    
                    {/* Success Icon Animation */}
                    <div className="relative inline-flex items-center justify-center w-24 h-24 mb-4">
                        <div className={`absolute inset-0 bg-green-500/20 rounded-full animate-ping ${showConfetti ? 'opacity-100' : 'opacity-0'}`}></div>
                        <div className="relative bg-green-500 rounded-full p-6 shadow-[0_0_20px_rgba(34,197,94,0.4)]">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h1 className="font-bebas text-5xl md:text-7xl text-foreground leading-none">
                            THANK YOU!
                        </h1>
                        <p className="font-oswald text-lg text-foreground/60 tracking-wide uppercase">
                            Your donation has been received.
                        </p>
                    </div>

                    <div className="bg-background/50 rounded-xl p-6 border border-foreground/5 text-sm font-oswald text-foreground/50 uppercase tracking-widest">
                        <p>Transaction ID</p>
                        <p className="text-foreground mt-1 font-sans normal-case opacity-80 break-all">
                            {sessionId || "Processing..."}
                        </p>
                    </div>

                    <p className="text-foreground/70 font-light leading-relaxed">
                        A receipt has been sent to your email address. Your support is vital to our mission for a sovereign Lebanon.
                    </p>

                    <div className="pt-4">
                        <Link 
                            href="/" 
                            className="inline-block w-full md:w-auto px-10 py-4 bg-red hover:bg-[#c4151c] text-white font-oswald font-bold tracking-widest uppercase transition-all shadow-lg hover:shadow-red-500/20 rounded-sm"
                        >
                            Return Home
                        </Link>
                    </div>
                </div>
            </div>

            {/* Simple CSS Confetti Dots (Optional visual flair) */}
            {showConfetti && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {[...Array(20)].map((_, i) => (
                        <div 
                            key={i}
                            className="absolute w-2 h-2 bg-red/40 rounded-full animate-pulse"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 2}s`,
                                transform: `scale(${Math.random() * 2})`
                            }}
                        />
                    ))}
                </div>
            )}
        </main>
    );
}