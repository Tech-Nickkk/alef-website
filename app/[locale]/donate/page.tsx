"use client";
import AnimatedTitle from "@/app/components/CommonCom/AnimatedTitle";
import { useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function DonatePage() {
    const t = useTranslations('DonatePage');
    const [donationType, setDonationType] = useState<'one-time' | 'monthly' | 'sponsor'>('one-time');
    const [customAmount, setCustomAmount] = useState('');
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [user] = useAuthState(auth);
    const router = useRouter();

    const processPayment = async (amount: number) => {

        if (!user) {
            const confirmLogin = confirm(t('alerts.loginRequired'));
            if (confirmLogin) {
                router.push("/login");
            }
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: amount,
                    donationType: donationType,
                    userId: user.uid,
                    userEmail: user.email
                }),
            });

            const { url, error } = await response.json();

            if (error) {
                alert(t('alerts.paymentError') + error);
                setIsLoading(false);
                return;
            }

            if (url) window.location.href = url;

        } catch (error) {
            console.error("Network error:", error);
            alert(t('alerts.connectError'));
            setIsLoading(false);
        }
    };

    const handleDonate = () => {
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
                alert(t('alerts.validAmount'));
                return;
            }

            processPayment(amount);
        } else {
            alert(t('alerts.selectTier'));
        }
    };

    const tiers = donationType === 'sponsor'
        ? [
            { amount: 5000, label: t('tiers.sponsor.strategic.label'), desc: t('tiers.sponsor.strategic.desc') },
            { amount: 10000, label: t('tiers.sponsor.visionary.label'), desc: t('tiers.sponsor.visionary.desc') },
            { amount: 25000, label: t('tiers.sponsor.global.label'), desc: t('tiers.sponsor.global.desc') }
        ]
        : [
            { amount: 100, label: t('tiers.support.supporter.label'), desc: t('tiers.support.supporter.desc') },
            { amount: 500, label: t('tiers.support.advocate.label'), desc: t('tiers.support.advocate.desc') },
            { amount: 1000, label: t('tiers.support.champion.label'), desc: t('tiers.support.champion.desc') }
        ];

    return (
        <main className="min-h-screen bg-background pt-32 pb-24 px-6 md:px-12 lg:px-24">
            <div className="max-w-4xl mx-auto space-y-16">

                {/* Header Section */}
                <div className="text-center space-y-6">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <span className="w-2 h-2 bg-red rounded-full animate-pulse"></span>
                        <span className="font-oswald text-red tracking-[0.2em] uppercase text-sm font-bold">{t('header.tag')}</span>
                        <span className="w-2 h-2 bg-red rounded-full animate-pulse"></span>
                    </div>

                    <AnimatedTitle
                        text={t('header.title')}
                        className="text-5xl md:text-7xl lg:text-8xl font-bebas text-foreground leading-none"
                    />

                    <p className="font-oswald text-foreground/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        {t('header.description')}
                    </p>
                </div>

                {/* Donation Type Toggle */}
                <div className="flex justify-center">
                    <div className="relative flex items-center bg-foreground/5 p-1 rounded-full border border-foreground/10 w-[450px]">
                        <div className={`absolute left-1 top-1 bottom-1 w-[calc(33.33%-4px)] bg-red rounded-full shadow-lg transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${donationType === 'monthly' ? 'translate-x-full' :
                            donationType === 'sponsor' ? 'translate-x-[200%]' :
                                'translate-x-0'
                            }`}></div>

                        <button onClick={() => setDonationType('one-time')} className={`relative z-10 flex-1 py-3 text-center font-oswald text-xs md:text-sm tracking-widest uppercase transition-colors duration-300 ${donationType === 'one-time' ? 'text-white' : 'text-foreground/60 hover:text-foreground'}`}>{t('toggles.oneTime')}</button>
                        <button onClick={() => setDonationType('monthly')} className={`relative z-10 flex-1 py-3 text-center font-oswald text-xs md:text-sm tracking-widest uppercase transition-colors duration-300 ${donationType === 'monthly' ? 'text-white' : 'text-foreground/60 hover:text-foreground'}`}>{t('toggles.monthly')}</button>
                        <button onClick={() => setDonationType('sponsor')} className={`relative z-10 flex-1 py-3 text-center font-oswald text-xs md:text-sm tracking-widest uppercase transition-colors duration-300 ${donationType === 'sponsor' ? 'text-white' : 'text-foreground/60 hover:text-foreground'}`}>{t('toggles.sponsor')}</button>
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
                                        {isLoading ? t('buttons.processing') : `${t('buttons.select')} ${donationType === 'monthly' ? t('buttons.months') : ''}`}
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
                            <label className="font-oswald text-xs tracking-widest text-foreground/50 uppercase">{t('customAmount.label')}</label>
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
                                            ? t('customAmount.errorMin')
                                            : donationType === 'sponsor'
                                                ? t('customAmount.placeholderMin')
                                                : t('customAmount.placeholder')
                                    }
                                />
                            </div>
                        </div>
                        <button
                            onClick={handleDonate}
                            disabled={isLoading}
                            className="w-full md:w-auto px-12 py-4 bg-red hover:bg-[#c4151c] text-white font-oswald font-bold tracking-widest uppercase transition-all shadow-lg shadow-red-500/20 disabled:opacity-50"
                        >
                            {isLoading ? t('customAmount.buttonWait') : (donationType === 'monthly' ? t('customAmount.buttonMonthly') : t('customAmount.button'))}
                        </button>
                    </div>
                </div>

                <div className="text-center space-y-4 pt-8">
                    <p className="font-oswald text-xs text-foreground/40 uppercase tracking-widest">
                        {t('footer.taxInfo')}
                    </p>
                </div>

            </div>
        </main>
    );
}