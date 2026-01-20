"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
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
import { Loader2, LogOut, Mail, User, CreditCard, History, TrendingUp } from "lucide-react";

// Define interface for donation history items
interface DonationHistoryItem {
    id: string;
    amount: number;
    date: any; // Firestore Timestamp
    type: string;
}

export default function ProfilePage() {
    const [user, loading] = useAuthState(auth);
    const [isDonor, setIsDonor] = useState(false);
    const [totalDonated, setTotalDonated] = useState(0);
    const [donationHistory, setDonationHistory] = useState<DonationHistoryItem[]>([]);
    
    const [portalLoading, setPortalLoading] = useState(false);
    const [dataLoading, setDataLoading] = useState(true);
    const router = useRouter();

    // Redirect if not logged in
    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

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
                alert("Error opening portal: " + data.error);
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong.");
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

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Loader2 className="w-8 h-8 animate-spin text-red" />
            </div>
        );
    }

    if (!user) return null;

    return (
        <main className="min-h-screen bg-background pt-32 pb-20 px-4">
            <div className="max-w-4xl mx-auto space-y-8">
                
                <div className="text-center mb-12">
                    <AnimatedTitle 
                        text="MY PROFILE" 
                        className="text-5xl md:text-7xl font-bebas text-foreground"
                    />
                </div>

                {/* --- PROFILE CARD --- */}
                <div className="bg-foreground/5 border border-foreground/10 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
                        
                        {/* Avatar */}
                        <div className="w-32 h-32 md:w-40 md:h-40 shrink-0 rounded-full border-4 border-background shadow-xl overflow-hidden bg-foreground/10 flex items-center justify-center">
                            {user.photoURL ? (
                                <img 
                                    src={user.photoURL} 
                                    alt="Profile" 
                                    className="w-full h-full object-cover" 
                                />
                            ) : (
                                <User className="w-16 h-16 text-foreground/40" />
                            )}
                        </div>

                        {/* User Details & Total Impact */}
                        <div className="flex-1 text-center md:text-left space-y-4">
                            <div>
                                <h2 className="text-3xl font-bebas text-foreground tracking-wide">
                                    {user.displayName || "Anonymous User"}
                                </h2>
                                <div className="flex items-center justify-center md:justify-start gap-2 text-foreground/60 font-oswald text-sm tracking-widest uppercase">
                                    <Mail className="w-4 h-4" />
                                    <span>{user.email}</span>
                                </div>
                            </div>

                            {/* Total Donated Badge (Only shows if they donated) */}
                            {totalDonated > 0 && (
                                <div className="inline-flex items-center gap-3 bg-red/10 border border-red/20 px-6 py-3 rounded-xl mt-2">
                                    <div className="w-10 h-10 rounded-full bg-red text-white flex items-center justify-center">
                                        <TrendingUp className="w-5 h-5" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-xs font-oswald text-red/80 uppercase tracking-widest">Total Impact</p>
                                        <p className="text-2xl font-bebas text-foreground">${totalDonated.toLocaleString()}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-3 min-w-[200px]">
                            {isDonor && (
                                <button
                                    onClick={handleManageSubscription}
                                    disabled={portalLoading}
                                    className="flex items-center justify-center gap-3 px-6 py-3 bg-blue hover:bg-blue/90 text-white font-oswald font-bold tracking-widest uppercase rounded-lg transition-all shadow-lg cursor-pointer text-sm"
                                >
                                    {portalLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CreditCard className="w-4 h-4" />}
                                    Manage Billing
                                </button>
                            )}

                            <button
                                onClick={handleLogout}
                                className="flex items-center justify-center gap-3 px-6 py-3 bg-red hover:bg-[#c4151c] text-white font-oswald font-bold tracking-widest uppercase rounded-lg transition-all shadow-lg hover:shadow-red/20 group text-sm"
                            >
                                <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                Sign Out
                            </button>
                        </div>

                    </div>
                </div>

                {/* --- DONATION HISTORY SECTION --- */}
                {/* Only renders if the user has made a donation */}
                {totalDonated > 0 && (
                    <div className="space-y-4 pt-4">
                        <div className="flex items-center gap-2 px-2">
                            <History className="w-5 h-5 text-red" />
                            <h3 className="font-bebas text-2xl text-foreground tracking-wide">Donation History</h3>
                        </div>

                        <div className="bg-foreground/5 border border-foreground/10 rounded-xl overflow-hidden">
                            {dataLoading ? (
                                <div className="p-8 text-center">
                                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-foreground/40" />
                                </div>
                            ) : donationHistory.length > 0 ? (
                                <div className="divide-y divide-foreground/10">
                                    {donationHistory.map((item) => (
                                        <div key={item.id} className="p-5 flex items-center justify-between hover:bg-foreground/5 transition-colors">
                                            <div className="space-y-1">
                                                <p className="font-oswald font-bold text-foreground uppercase tracking-wide text-sm md:text-base">
                                                    {item.type === 'monthly' ? 'Monthly Donation' : 
                                                     item.type === 'monthly-renewal' ? 'Monthly Renewal' :
                                                     item.type === 'sponsor' ? 'Sponsorship' : 'One-Time Donation'}
                                                </p>
                                                <p className="text-xs font-oswald text-foreground/50 tracking-widest">
                                                    {formatDate(item.date)}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bebas text-xl text-foreground">
                                                    ${item.amount.toLocaleString()}
                                                </p>
                                                <p className="text-[10px] font-oswald text-green-500 uppercase tracking-widest bg-green-500/10 px-2 py-0.5 rounded-full inline-block">
                                                    Successful
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-8 text-center font-oswald text-foreground/40">
                                    No history found.
                                </div>
                            )}
                        </div>
                    </div>
                )}

            </div>
        </main>
    );
}