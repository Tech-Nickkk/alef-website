"use client";
import AnimatedTitle from "@/app/components/CommonCom/AnimatedTitle";
import { useState } from 'react';

export default function DonatePage() {
    const [donationType, setDonationType] = useState<'one-time' | 'monthly' | 'sponsor'>('one-time');
    const [customAmount, setCustomAmount] = useState('');
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Added loading state

    // 1. Helper to handle the API call
    const processPayment = async (amount: number) => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    amount: amount, 
                    donationType: donationType 
                }),
            });

            const { url, error } = await response.json();

            if (error) {
                alert("Payment Error: " + error);
                setIsLoading(false);
                return;
            }

            // Redirect to Stripe
            if (url) window.location.href = url;

        } catch (error) {
            console.error("Network error:", error);
            alert("Could not connect to payment server.");
            setIsLoading(false);
        }
    };

    // 2. Your existing logic, updated to call processPayment
    const handleDonate = () => {
        // If Custom Amount is filled, use that
        if (customAmount) {
            const amount = parseFloat(customAmount);
            
            // Sponsor Validation
            if (donationType === 'sponsor' && (!amount || amount < 5000)) {
                setIsError(true);
                setCustomAmount('');
                return;
            }
            
            // Basic Validation
            if (!amount || amount <= 0) {
                alert("Please enter a valid amount");
                return;
            }

            processPayment(amount);
        } else {
            // Logic for when they didn't type a custom amount but clicked "Donate Now"
            // Usually, this button is for the custom input. 
            // The Tier buttons below handle their own clicks.
            alert("Please select a tier or enter an amount.");
        }
    };

    const tiers = donationType === 'sponsor'
        ? [
            { amount: 5000, label: "STRATEGIC SPONSOR", desc: "Become a pillar of our movement. Receive quarterly executive briefings and exclusive access." },
            { amount: 10000, label: "VISIONARY PARTNER", desc: "Direct impact on our long-term strategy and permanent recognition in our transparency report." },
            { amount: 25000, label: "GLOBAL ALLY", desc: "Highest level of advocacy support with dedicated liaison and strategic alignment." }
        ]
        : [
            { amount: 100, label: "SUPPORTER", desc: "Support our daily operations and content creation." },
            { amount: 500, label: "ADVOCATE", desc: "Help fund our research papers and policy briefs." },
            { amount: 1000, label: "CHAMPION", desc: "Power our international lobbying and events." }
        ];

    return (
        <main className="min-h-screen bg-background pt-32 pb-24 px-6 md:px-12 lg:px-24">
            <div className="max-w-4xl mx-auto space-y-16">

                {/* Header Section */}
                <div className="text-center space-y-6">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <span className="w-2 h-2 bg-red rounded-full animate-pulse"></span>
                        <span className="font-oswald text-red tracking-[0.2em] uppercase text-sm font-bold">Support The Cause</span>
                        <span className="w-2 h-2 bg-red rounded-full animate-pulse"></span>
                    </div>

                    <AnimatedTitle
                        text="POWER THE MOVEMENT"
                        className="text-5xl md:text-7xl lg:text-8xl font-bebas text-foreground leading-none"
                    />

                    <p className="font-oswald text-foreground/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Your contribution fuels our fight for a sovereign, free, and prosperous Lebanon. Every dollar directly supports our advocacy, research, and global outreach operations.
                    </p>
                </div>

                {/* Donation Type Toggle */}
                <div className="flex justify-center">
                    <div className="relative flex items-center bg-foreground/5 p-1 rounded-full border border-foreground/10 w-[450px]">
                        <div className={`absolute left-1 top-1 bottom-1 w-[calc(33.33%-4px)] bg-red rounded-full shadow-lg transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${donationType === 'monthly' ? 'translate-x-[100%]' :
                            donationType === 'sponsor' ? 'translate-x-[200%]' :
                                'translate-x-0'
                            }`}></div>

                        <button onClick={() => setDonationType('one-time')} className={`relative z-10 flex-1 py-3 text-center font-oswald text-xs md:text-sm tracking-widest uppercase transition-colors duration-300 ${donationType === 'one-time' ? 'text-white' : 'text-foreground/60 hover:text-foreground'}`}>One-Time</button>
                        <button onClick={() => setDonationType('monthly')} className={`relative z-10 flex-1 py-3 text-center font-oswald text-xs md:text-sm tracking-widest uppercase transition-colors duration-300 ${donationType === 'monthly' ? 'text-white' : 'text-foreground/60 hover:text-foreground'}`}>Monthly</button>
                        <button onClick={() => setDonationType('sponsor')} className={`relative z-10 flex-1 py-3 text-center font-oswald text-xs md:text-sm tracking-widest uppercase transition-colors duration-300 ${donationType === 'sponsor' ? 'text-white' : 'text-foreground/60 hover:text-foreground'}`}>Sponsor</button>
                    </div>
                </div>

                {/* Donation Options */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {tiers.map((tier, idx) => (
                        <div key={idx} className="group relative p-8 border border-foreground/10 bg-foreground/5 hover:bg-blue hover:border-red/50 transition-all duration-500 rounded-xl overflow-hidden cursor-pointer">
                            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <div className="w-3 h-3 bg-red rounded-full shadow-[0_0_10px_rgba(220,38,38,0.8)]"></div>
                            </div>

                            <div className="relative z-10 flex flex-col items-center text-center gap-4">
                                <span className="font-oswald text-xs tracking-widest text-foreground/50 group-hover:text-white/60 uppercase">{tier.label}</span>
                                <span className="font-bebas text-6xl text-foreground group-hover:text-white transition-colors duration-300">
                                    ${tier.amount.toLocaleString()}{donationType === 'monthly' && <span className="text-2xl text-foreground/50 group-hover:text-white/60">/mo</span>}
                                </span>
                                <p className="font-oswald text-sm text-foreground/60 group-hover:text-white/70 leading-relaxed min-h-[40px]">
                                    {tier.desc}
                                </p>
                                <div className="pt-6 w-full">
                                    {/* UPDATED BUTTON: Calls processPayment with the tier amount */}
                                    <button 
                                        onClick={() => processPayment(tier.amount)}
                                        disabled={isLoading}
                                        className="w-full py-3 bg-transparent border border-foreground/20 group-hover:border-red group-hover:bg-red text-foreground group-hover:text-white font-oswald uppercase tracking-widest text-sm transition-all duration-300 cursor-pointer disabled:opacity-50"
                                    >
                                        {isLoading ? 'Processing...' : `Select ${donationType === 'monthly' ? 'Monthly' : ''}`}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Custom Amount */}
                <div className="max-w-2xl mx-auto bg-foreground/5 border border-foreground/10 p-8 rounded-xl">
                    <div className="flex flex-col md:flex-row gap-6 items-end">
                        <div className="flex-1 space-y-2 w-full">
                            <label className="font-oswald text-xs tracking-widest text-foreground/50 uppercase">Other Amount</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-oswald text-foreground/40">$</span>
                                <input
                                    type="number"
                                    value={customAmount}
                                    onChange={(e) => {
                                        setCustomAmount(e.target.value);
                                        setIsError(false);
                                    }}
                                    className={`w-full bg-background border px-8 py-4 font-bebas text-2xl outline-none transition-colors ${isError
                                            ? 'border-red placeholder:text-red/80'
                                            : 'border-foreground/10 focus:border-red'
                                        }`}
                                    placeholder={
                                        isError
                                            ? "MINIMUM SPONSORSHIP IS $5,000"
                                            : donationType === 'sponsor'
                                                ? "ENTER AMOUNT (MIN $5,000)"
                                                : "ENTER AMOUNT"
                                    }
                                />
                            </div>
                        </div>
                        <button
                            onClick={handleDonate}
                            disabled={isLoading}
                            className="w-full md:w-auto px-12 py-4 bg-red hover:bg-[#c4151c] text-white font-oswald font-bold tracking-widest uppercase transition-all shadow-lg shadow-red-500/20 disabled:opacity-50"
                        >
                            {isLoading ? 'Wait...' : `Donate ${donationType === 'monthly' ? 'Monthly' : 'Now'}`}
                        </button>
                    </div>
                </div>

                <div className="text-center space-y-4 pt-8">
                     {/* Your existing Footer text/SVG icons here (No changes needed) */}
                     {/* ... Paste your SVG code here ... */}
                     <p className="font-oswald text-xs text-foreground/40 uppercase tracking-widest">
                        * ALEF is a registered 501(c)(3) non-profit organization. All donations are tax-deductible.
                    </p>
                </div>

            </div>
        </main>
    );
}