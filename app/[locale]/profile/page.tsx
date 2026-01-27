"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/lib/firebase";
import { useRouter, Link } from "@/i18n/routing";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import {
    doc,
    getDoc,
    collection,
    query,
    orderBy,
    getDocs
} from "firebase/firestore";
import AnimatedTitle from "@/app/components/CommonCom/AnimatedTitle";
import {
    Loader2,
    LogOut,
    Mail,
    User,
    CreditCard,
    History,
    TrendingUp,
    Heart,
    Calendar,
    Award,
    ArrowLeft,
    Sparkles,
    ChevronRight,
    HelpCircle,
    X,
    Star,
    Crown,
    Shield,
    Gem,
    Lock
} from "lucide-react";
import { useTranslations } from "next-intl";

// Define interface for donation history items
interface DonationHistoryItem {
    id: string;
    amount: number;
    date: any; // Firestore Timestamp
    type: string;
}

// Badge/Tier System Configuration
const BADGE_TIERS = [
    {
        name: "Supporter",
        icon: Shield,
        minAmount: 50,
        maxAmount: 249,
        color: "from-emerald-500 to-emerald-600",
        bgColor: "bg-emerald-500/10",
        borderColor: "border-emerald-500/30",
        textColor: "text-emerald-500",
        description: "Thank you for starting your journey with us!"
    },
    {
        name: "Advocate",
        icon: Star,
        minAmount: 250,
        maxAmount: 999,
        color: "from-blue to-blue/80",
        bgColor: "bg-blue/10",
        borderColor: "border-blue/30",
        textColor: "text-blue",
        description: "Your consistent support makes a real difference!"
    },
    {
        name: "Champion",
        icon: Crown,
        minAmount: 1000,
        maxAmount: 4999,
        color: "from-amber-500 to-amber-600",
        bgColor: "bg-amber-500/10",
        borderColor: "border-amber-500/30",
        textColor: "text-amber-500",
        description: "You're a true champion of our cause!"
    },
    {
        name: "Legend",
        icon: Gem,
        minAmount: 5000,
        maxAmount: Infinity,
        color: "from-purple-500 to-pink-500",
        bgColor: "bg-purple-500/10",
        borderColor: "border-purple-500/30",
        textColor: "text-purple-500",
        description: "Your legendary impact inspires us all!"
    }
];

// Get current badge and progress
const getBadgeInfo = (totalDonated: number) => {
    if (totalDonated < BADGE_TIERS[0].minAmount) {
        return {
            currentBadge: null,
            nextBadge: BADGE_TIERS[0],
            progress: (totalDonated / BADGE_TIERS[0].minAmount) * 100,
            amountToNext: BADGE_TIERS[0].minAmount - totalDonated
        };
    }

    for (let i = BADGE_TIERS.length - 1; i >= 0; i--) {
        if (totalDonated >= BADGE_TIERS[i].minAmount) {
            const nextTier = BADGE_TIERS[i + 1];
            if (nextTier) {
                const rangeStart = BADGE_TIERS[i].minAmount;
                const rangeEnd = nextTier.minAmount;
                const progressInRange = ((totalDonated - rangeStart) / (rangeEnd - rangeStart)) * 100;
                return {
                    currentBadge: BADGE_TIERS[i],
                    nextBadge: nextTier,
                    progress: Math.min(progressInRange, 100),
                    amountToNext: nextTier.minAmount - totalDonated
                };
            }
            return {
                currentBadge: BADGE_TIERS[i],
                nextBadge: null,
                progress: 100,
                amountToNext: 0
            };
        }
    }
    return {
        currentBadge: null,
        nextBadge: BADGE_TIERS[0],
        progress: 0,
        amountToNext: BADGE_TIERS[0].minAmount
    };
};

export default function ProfilePage() {
    const t = useTranslations('ProfilePage');
    const [user, loading] = useAuthState(auth);
    const [isDonor, setIsDonor] = useState(false);
    const [totalDonated, setTotalDonated] = useState(0);
    const [donationHistory, setDonationHistory] = useState<DonationHistoryItem[]>([]);
    const [showTierInfo, setShowTierInfo] = useState(false);

    const [portalLoading, setPortalLoading] = useState(false);
    const [dataLoading, setDataLoading] = useState(true);
    const router = useRouter();

    // Get badge info
    const badgeInfo = getBadgeInfo(totalDonated);

    // Redirect if not logged in
    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (showTierInfo) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [showTierInfo]);

    // Fetch User Data & History
    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                try {
                    // 1. Get User Profile Data (Stripe ID + Total Donated)
                    const userDocRef = doc(db, "users", user.uid);
                    const userDocSnap = await getDoc(userDocRef);

                    if (userDocSnap.exists()) {
                        const data = userDocSnap.data();
                        setIsDonor(!!data.stripeCustomerId);
                        // Fetch the totalDonated field updated by your webhook
                        setTotalDonated(data.totalDonated || 0);
                    }

                    // 2. Get Donation History Subcollection
                    // Queries the 'payment_history' subcollection we set up in the webhook
                    const historyRef = collection(db, "users", user.uid, "payment_history");
                    const q = query(historyRef, orderBy("date", "desc"));
                    const historySnap = await getDocs(q);

                    const historyData = historySnap.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    })) as DonationHistoryItem[];

                    setDonationHistory(historyData);

                } catch (error) {
                    console.error("Error fetching profile data:", error);
                } finally {
                    setDataLoading(false);
                }
            }
        };

        if (user) fetchUserData();
    }, [user]);

    const handleLogout = async () => {
        await signOut(auth);
        router.push("/");
    };

    const handleManageSubscription = async () => {
        setPortalLoading(true);
        try {
            const res = await fetch('/api/create-portal-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user?.uid }),
            });

            const data = await res.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                alert(t('alerts.portalError') + data.error);
            }
        } catch (error) {
            console.error(error);
            alert(t('alerts.genericError'));
        } finally {
            setPortalLoading(false);
        }
    };

    // Helper to format Firestore Timestamps
    const formatDate = (timestamp: any) => {
        if (!timestamp) return 'N/A';
        // Handle Firestore Timestamp vs standard Date
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    };

    // Get member since date
    const getMemberSince = () => {
        if (user?.metadata?.creationTime) {
            return new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'long'
            }).format(new Date(user.metadata.creationTime));
        }
        return 'N/A';
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                        <div className="w-16 h-16 rounded-full border-4 border-foreground/10 border-t-red animate-spin"></div>
                        <Heart className="w-6 h-6 text-red absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <p className="font-oswald text-foreground/60 uppercase tracking-widest text-sm">Loading Profile...</p>
                </div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <main className="min-h-screen bg-background relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue/10 rounded-full blur-[150px]" />
                <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-red/10 rounded-full blur-[120px]" />
                <div className="absolute top-[30%] right-[10%] w-[30%] h-[30%] bg-theme-accent/5 rounded-full blur-[100px]" />
            </div>

            {/* Back Button */}
            <Link
                href="/"
                className="fixed top-24 left-6 z-50 p-3 bg-foreground/5 border border-foreground/10 rounded-full hover:bg-foreground/10 hover:scale-105 transition-all duration-300 group backdrop-blur-sm"
                aria-label="Back to Home"
            >
                <ArrowLeft className="w-5 h-5 text-foreground/70 group-hover:text-foreground transition-colors" />
            </Link>

            {/* Tier Info Modal */}
            {showTierInfo && (
                <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setShowTierInfo(false)}
                    ></div>
                    <div className="relative bg-background border border-foreground/10 rounded-3xl p-6 md:p-8 max-w-3xl w-full shadow-2xl">
                        <button
                            onClick={() => setShowTierInfo(false)}
                            className="absolute top-4 right-4 p-2.5 hover:bg-foreground/10 rounded-full transition-colors z-10"
                        >
                            <X className="w-6 h-6 text-foreground/60" />
                        </button>

                        {/* Header */}
                        <div className="flex items-center gap-5 mb-6">
                            <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-amber-500/20 to-sky-500/20 flex items-center justify-center shrink-0">
                                <Award className="w-8 h-8 text-amber-400" />
                            </div>
                            <div>
                                <h3 className="font-bebas text-3xl text-foreground">Supporter Tiers</h3>
                                <p className="font-oswald text-foreground/50 text-sm">Unlock exclusive badges based on your contributions</p>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="bg-foreground/5 rounded-xl p-4 mb-6 border border-foreground/10">
                            <div className="flex items-center justify-between mb-3">
                                <span className="font-oswald text-sm text-foreground/60 uppercase tracking-wider">Total Contributed: <span className="text-foreground font-semibold text-base">${totalDonated.toLocaleString()}</span></span>
                                {badgeInfo.nextBadge && (
                                    <span className="font-oswald text-sm text-foreground/50">
                                        ${badgeInfo.amountToNext.toLocaleString()} to {badgeInfo.nextBadge.name}
                                    </span>
                                )}
                                {!badgeInfo.nextBadge && badgeInfo.currentBadge && (
                                    <span className="font-oswald text-sm text-green-500">🎉 Max tier reached!</span>
                                )}
                            </div>
                            {badgeInfo.nextBadge && (
                                <div className="h-3 bg-foreground/10 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-linear-to-r from-red to-red/80 rounded-full transition-all duration-500"
                                        style={{ width: `${badgeInfo.progress}%` }}
                                    ></div>
                                </div>
                            )}
                        </div>

                        {/* All Tiers - Horizontal Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            {BADGE_TIERS.map((tier) => {
                                const TierIcon = tier.icon;
                                const isCurrentTier = badgeInfo.currentBadge?.name === tier.name;
                                const isUnlocked = totalDonated >= tier.minAmount;

                                return (
                                    <div
                                        key={tier.name}
                                        className={`relative p-4 rounded-xl border text-center transition-all duration-300 ${isCurrentTier
                                            ? `${tier.bgColor} ${tier.borderColor} border-2`
                                            : isUnlocked
                                                ? 'bg-foreground/5 border-foreground/10'
                                                : 'bg-foreground/2 border-foreground/5 opacity-60'
                                            }`}
                                    >
                                        {isCurrentTier && (
                                            <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-red text-white text-[9px] font-oswald uppercase tracking-wider px-2 py-0.5 rounded-full">
                                                Current
                                            </div>
                                        )}
                                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-3 ${isUnlocked
                                            ? `bg-linear-to-br ${tier.color}`
                                            : 'bg-foreground/10'
                                            }`}>
                                            {isUnlocked ? (
                                                <TierIcon className="w-7 h-7 text-white" />
                                            ) : (
                                                <Lock className="w-5 h-5 text-foreground/30" />
                                            )}
                                        </div>
                                        <h4 className={`font-bebas text-xl ${isUnlocked ? 'text-foreground' : 'text-foreground/50'}`}>
                                            {tier.name}
                                        </h4>
                                        <p className="font-oswald text-xs text-foreground/40 uppercase mt-1">
                                            {tier.maxAmount === Infinity
                                                ? `$${tier.minAmount.toLocaleString()}+`
                                                : `$${tier.minAmount.toLocaleString()}+`
                                            }
                                        </p>
                                        {isUnlocked && (
                                            <div className="absolute top-2 right-2 text-green-500">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* CTA */}
                        <div className="text-center pt-2">
                            <Link href="/donate" onClick={() => setShowTierInfo(false)}>
                                <button className="inline-flex items-center gap-2 px-8 py-3 bg-red hover:bg-[#c4151c] text-white font-oswald font-semibold tracking-wider uppercase rounded-xl transition-all duration-300 text-sm shadow-lg shadow-red/20">
                                    <Heart className="w-5 h-5" />
                                    Donate Now
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            <div className="relative z-10 pt-32 pb-20 px-4 md:px-6">
                <div className="max-w-5xl mx-auto space-y-8">

                    {/* Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-foreground/5 border border-foreground/10 px-4 py-2 rounded-full mb-6">
                            <Sparkles className="w-4 h-4 text-red" />
                            <span className="font-oswald text-xs text-foreground/60 uppercase tracking-widest">Your Dashboard</span>
                        </div>
                        <AnimatedTitle
                            text={t('title')}
                            className="text-5xl md:text-7xl font-bebas text-foreground"
                        />
                    </div>

                    {/* --- MAIN PROFILE CARD --- */}
                    <div className="bg-foreground/5 backdrop-blur-xl border border-foreground/10 rounded-3xl overflow-hidden shadow-2xl">
                        {/* Profile Header with Gradient */}
                        <div className="relative h-32 md:h-40 bg-linear-to-r from-blue via-blue/80 to-red/50">
                            <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10"></div>
                            <div className="absolute bottom-0 left-0 right-0 h-20 bg-linear-to-t from-background/50 to-transparent"></div>
                        </div>

                        <div className="relative px-6 md:px-10 pb-8 -mt-16 md:-mt-20">
                            <div className="flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8">
                                {/* Avatar */}
                                <div className="relative group">
                                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl border-4 border-background shadow-2xl overflow-hidden bg-foreground/10 flex items-center justify-center transform group-hover:scale-[1.02] transition-transform duration-300">
                                        {user.photoURL ? (
                                            <img
                                                src={user.photoURL}
                                                alt="Profile"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-linear-to-br from-blue/20 to-red/20 flex items-center justify-center">
                                                <User className="w-16 h-16 text-foreground/40" />
                                            </div>
                                        )}
                                    </div>
                                    {/* Current Badge on Avatar */}
                                    {badgeInfo.currentBadge && (
                                        <div className={`absolute -bottom-2 -right-2 p-2.5 rounded-xl shadow-lg bg-linear-to-br ${badgeInfo.currentBadge.color}`}>
                                            <badgeInfo.currentBadge.icon className="w-5 h-5 text-white" />
                                        </div>
                                    )}
                                </div>

                                {/* User Info */}
                                <div className="flex-1 text-center md:text-left space-y-2 pb-2">
                                    <h2 className="text-3xl md:text-4xl font-bebas text-foreground tracking-wide">
                                        {user.displayName || t('anonymousUser')}
                                    </h2>
                                    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-foreground/60">
                                        <div className="flex items-center gap-2 font-oswald text-sm tracking-wider">
                                            <Mail className="w-4 h-4" />
                                            <span>{user.email}</span>
                                        </div>
                                        <span className="hidden md:block w-1 h-1 rounded-full bg-foreground/30"></span>
                                        <div className="flex items-center gap-2 font-oswald text-sm tracking-wider">
                                            <Calendar className="w-4 h-4" />
                                            <span>Member since {getMemberSince()}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-col sm:flex-row gap-3">
                                    {isDonor && (
                                        <button
                                            onClick={handleManageSubscription}
                                            disabled={portalLoading}
                                            className="flex items-center justify-center gap-2 px-5 py-3 bg-blue hover:bg-blue/90 text-white font-oswald font-semibold tracking-wider uppercase rounded-xl transition-all duration-300 shadow-lg shadow-blue/20 cursor-pointer text-sm group"
                                        >
                                            {portalLoading ? (
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            ) : (
                                                <CreditCard className="w-4 h-4" />
                                            )}
                                            {t('manageBilling')}
                                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    )}

                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center justify-center gap-2 px-5 py-3 bg-foreground/5 hover:bg-red text-foreground hover:text-white font-oswald font-semibold tracking-wider uppercase rounded-xl transition-all duration-300 border border-foreground/10 hover:border-red group text-sm"
                                    >
                                        <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                        {t('signOut')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- STATS CARDS --- */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Total Impact Card */}
                        <div className="bg-linear-to-br from-red/10 to-red/5 backdrop-blur-sm border border-red/20 rounded-2xl p-6 relative overflow-hidden group hover:border-red/40 transition-all duration-300">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-red/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500"></div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-red/20 flex items-center justify-center">
                                        <TrendingUp className="w-6 h-6 text-red" />
                                    </div>
                                    <p className="font-oswald text-xs text-foreground/60 uppercase tracking-widest">{t('totalImpact')}</p>
                                </div>
                                <p className="text-4xl font-bebas text-foreground">${totalDonated.toLocaleString()}</p>
                            </div>
                        </div>

                        {/* Total Donations Card */}
                        <div className="bg-linear-to-br from-blue/10 to-blue/5 backdrop-blur-sm border border-blue/20 rounded-2xl p-6 relative overflow-hidden group hover:border-blue/40 transition-all duration-300">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-blue/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500"></div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-blue/20 flex items-center justify-center">
                                        <Heart className="w-6 h-6 text-blue" />
                                    </div>
                                    <p className="font-oswald text-xs text-foreground/60 uppercase tracking-widest">Total Donations</p>
                                </div>
                                <p className="text-4xl font-bebas text-foreground">{donationHistory.length}</p>
                            </div>
                        </div>

                        {/* Current Badge Card with Info Button */}
                        <div className={`backdrop-blur-sm rounded-2xl p-6 relative overflow-hidden group transition-all duration-300 sm:col-span-2 lg:col-span-1 ${badgeInfo.currentBadge
                            ? `bg-linear-to-br ${badgeInfo.currentBadge.bgColor} border ${badgeInfo.currentBadge.borderColor} hover:border-opacity-60`
                            : 'bg-linear-to-br from-foreground/5 to-foreground/2 border border-foreground/10 hover:border-foreground/20'
                            }`}>
                            <div className="absolute top-0 right-0 w-24 h-24 bg-foreground/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500"></div>

                            {/* Info Button - Top Right */}
                            <button
                                onClick={() => setShowTierInfo(true)}
                                className="absolute top-4 right-4 p-2 bg-foreground/10 hover:bg-foreground/20 rounded-full transition-all duration-200 z-20 group/btn"
                                aria-label="View all tiers"
                            >
                                <HelpCircle className="w-4 h-4 text-foreground/50 group-hover/btn:text-foreground/80 transition-colors" />
                            </button>

                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${badgeInfo.currentBadge
                                        ? `bg-linear-to-br ${badgeInfo.currentBadge.color}`
                                        : 'bg-foreground/10'
                                        }`}>
                                        {badgeInfo.currentBadge ? (
                                            <badgeInfo.currentBadge.icon className="w-6 h-6 text-white" />
                                        ) : (
                                            <Lock className="w-6 h-6 text-foreground/40" />
                                        )}
                                    </div>
                                    <p className="font-oswald text-xs text-foreground/60 uppercase tracking-widest">Current Badge</p>
                                </div>

                                {badgeInfo.currentBadge ? (
                                    <p className={`text-4xl font-bebas ${badgeInfo.currentBadge.textColor}`}>
                                        {badgeInfo.currentBadge.name}
                                    </p>
                                ) : (
                                    <div>
                                        <p className="text-2xl font-bebas text-foreground/40 mb-2">No Badge Yet</p>
                                        <Link href="/donate">
                                            <span className="inline-flex items-center gap-1 text-xs font-oswald text-red hover:text-red/80 transition-colors uppercase tracking-wider cursor-pointer">
                                                <Heart className="w-3 h-3" />
                                                Donate to earn
                                                <ChevronRight className="w-3 h-3" />
                                            </span>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* --- DONATION HISTORY SECTION --- */}
                    {totalDonated > 0 && (
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 px-2">
                                <div className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center">
                                    <History className="w-5 h-5 text-red" />
                                </div>
                                <div>
                                    <h3 className="font-bebas text-2xl text-foreground tracking-wide">{t('history.title')}</h3>
                                    <p className="font-oswald text-xs text-foreground/50 uppercase tracking-widest">Your contribution timeline</p>
                                </div>
                            </div>

                            <div className="bg-foreground/5 backdrop-blur-sm border border-foreground/10 rounded-2xl overflow-hidden">
                                {dataLoading ? (
                                    <div className="p-12 text-center">
                                        <Loader2 className="w-8 h-8 animate-spin mx-auto text-foreground/40" />
                                        <p className="mt-4 font-oswald text-foreground/40 text-sm uppercase tracking-widest">Loading history...</p>
                                    </div>
                                ) : donationHistory.length > 0 ? (
                                    <div className="divide-y divide-foreground/5">
                                        {donationHistory.map((item, index) => (
                                            <div
                                                key={item.id}
                                                className="p-5 md:p-6 flex items-center justify-between hover:bg-foreground/5 transition-all duration-300 group"
                                                style={{ animationDelay: `${index * 50}ms` }}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.type === 'monthly' || item.type === 'monthly-renewal'
                                                        ? 'bg-blue/10 text-blue'
                                                        : item.type === 'sponsor'
                                                            ? 'bg-theme-accent/10 text-theme-accent'
                                                            : 'bg-red/10 text-red'
                                                        }`}>
                                                        <Heart className="w-5 h-5" />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="font-oswald font-semibold text-foreground uppercase tracking-wide text-sm md:text-base">
                                                            {item.type === 'monthly' ? t('history.types.monthly') :
                                                                item.type === 'monthly-renewal' ? t('history.types.monthlyRenewal') :
                                                                    item.type === 'sponsor' ? t('history.types.sponsor') : t('history.types.oneTime')}
                                                        </p>
                                                        <p className="text-xs font-oswald text-foreground/50 tracking-widest">
                                                            {formatDate(item.date)}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="text-right flex items-center gap-3">
                                                    <div>
                                                        <p className="font-bebas text-2xl text-foreground">
                                                            ${item.amount.toLocaleString()}
                                                        </p>
                                                        <span className="text-[10px] font-oswald text-green-500 uppercase tracking-widest bg-green-500/10 px-2 py-0.5 rounded-full inline-block">
                                                            {t('history.status')}
                                                        </span>
                                                    </div>
                                                    <ChevronRight className="w-5 h-5 text-foreground/20 group-hover:text-foreground/40 group-hover:translate-x-1 transition-all" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-12 text-center">
                                        <Heart className="w-12 h-12 text-foreground/20 mx-auto mb-4" />
                                        <p className="font-oswald text-foreground/40 uppercase tracking-widest">
                                            {t('history.empty')}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* --- NO DONATIONS CTA --- */}
                    {!dataLoading && totalDonated === 0 && (
                        <div className="bg-linear-to-br from-red/10 to-blue/10 backdrop-blur-sm border border-foreground/10 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-full bg-[url('/patterns/grid.svg')] opacity-5"></div>
                            <div className="relative z-10">
                                <div className="w-20 h-20 rounded-2xl bg-red/10 flex items-center justify-center mx-auto mb-6">
                                    <Heart className="w-10 h-10 text-red" />
                                </div>
                                <h3 className="font-bebas text-3xl md:text-4xl text-foreground mb-3">Make Your First Impact</h3>
                                <p className="font-oswald text-foreground/60 max-w-md mx-auto mb-8">
                                    Your support can help make a difference. Join our community of supporters and help us achieve our mission.
                                </p>
                                <Link href="/donate">
                                    <button className="inline-flex items-center gap-3 px-8 py-4 bg-red hover:bg-[#c4151c] text-white font-oswald font-bold tracking-widest uppercase rounded-xl transition-all duration-300 shadow-lg shadow-red/30 group">
                                        <Heart className="w-5 h-5" />
                                        Donate Now
                                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </Link>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </main>
    );
}