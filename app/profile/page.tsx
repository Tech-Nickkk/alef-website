"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/lib/firebase"; // Make sure 'db' is exported from your client firebase.ts
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore"; // Import Firestore functions
import AnimatedTitle from "@/app/components/CommonCom/AnimatedTitle";
import { Loader2, LogOut, Mail, User, CreditCard } from "lucide-react";

export default function ProfilePage() {
    const [user, loading] = useAuthState(auth);
    const [isDonor, setIsDonor] = useState(false); // State to track if they have a Stripe ID
    const [portalLoading, setPortalLoading] = useState(false);
    const router = useRouter();

    // Redirect if not logged in
    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    // Check if user is a donor (has a Stripe ID)
    useEffect(() => {
        const checkDonorStatus = async () => {
            if (user) {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                
                // If the field 'stripeCustomerId' exists, they are a donor/subscriber
                if (docSnap.exists() && docSnap.data().stripeCustomerId) {
                    setIsDonor(true);
                }
            }
        };
        checkDonorStatus();
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
                window.location.href = data.url; // Redirect to Stripe
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
            <div className="max-w-2xl mx-auto">
                
                <div className="text-center mb-12">
                    <AnimatedTitle 
                        text="MY PROFILE" 
                        className="text-5xl md:text-7xl font-bebas text-foreground"
                    />
                </div>

                <div className="bg-foreground/5 border border-foreground/10 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                    
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                    <div className="relative z-10 flex flex-col items-center text-center gap-6">
                        
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-background shadow-xl overflow-hidden bg-foreground/10 flex items-center justify-center">
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

                        <div className="space-y-2">
                            <h2 className="text-3xl font-bebas text-foreground tracking-wide">
                                {user.displayName || "Anonymous User"}
                            </h2>
                            <div className="flex items-center justify-center gap-2 text-foreground/60 font-oswald text-sm tracking-widest uppercase">
                                <Mail className="w-4 h-4" />
                                <span>{user.email}</span>
                            </div>
                        </div>

                        <div className="w-full border-t border-foreground/10 my-4"></div>

                        <div className="flex flex-col gap-4 w-full md:w-auto">
                            
                            {/* NEW: Manage Subscription Button (Only shows if they have history) */}
                            {isDonor && (
                                <button
                                    onClick={handleManageSubscription}
                                    disabled={portalLoading}
                                    className="flex items-center justify-center gap-3 px-8 py-3 bg-blue hover:bg-blue/90 text-white font-oswald font-bold tracking-widest uppercase rounded-lg transition-all shadow-lg cursor-pointer"
                                >
                                    {portalLoading ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <CreditCard className="w-5 h-5" />
                                    )}
                                    Manage Subscription
                                </button>
                            )}

                            <button
                                onClick={handleLogout}
                                className="flex items-center justify-center gap-3 px-8 py-3 bg-red hover:bg-[#c4151c] text-white font-oswald font-bold tracking-widest uppercase rounded-lg transition-all shadow-lg hover:shadow-red/20 group"
                            >
                                <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                Sign Out
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </main>
    );
}