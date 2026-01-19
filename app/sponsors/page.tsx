"use client";
import AnimatedTitle from "../components/CommonCom/AnimatedTitle";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase"; 
import { collection, query, orderBy, getDocs } from "firebase/firestore";

export default function SponsorsPage() {
    const [sponsors, setSponsors] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSponsors = async () => {
            try {
                // Fetch sponsors sorted by highest amount first
                const q = query(
                    collection(db, "sponsors"), 
                    orderBy("amount", "desc") 
                );
                
                const querySnapshot = await getDocs(q);
                const data = querySnapshot.docs.map(doc => doc.data());
                setSponsors(data);
            } catch (error) {
                console.error("Error fetching sponsors:", error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchSponsors();
    }, []);

    // 1. Loading State
    if (loading) {
         return (
            <div className="min-h-screen bg-theme-black flex items-center justify-center">
                <p className="font-oswald text-white/50 animate-pulse tracking-widest uppercase">Loading...</p>
            </div>
         );
    }

    // 2. FALLBACK: Use your original "In Progress" UI if no sponsors exist
    if (sponsors.length === 0) {
        return (
            <div className="bg-theme-black min-h-screen flex flex-col relative overflow-hidden items-center justify-center">
                <main className="relative z-10 text-center px-4">
                    <AnimatedTitle
                        text="IN PROGRESS"
                        className="text-6xl md:text-9xl font-bebas text-theme-white mb-6 justify-center flex"
                    />
                    <div className="h-1 w-32 bg-red-600 mx-auto mb-8"></div>
                    <p className="font-oswald text-xl md:text-3xl text-theme-white/70 tracking-widest uppercase">
                        This page is currently under development.
                    </p>
                </main>
            </div>
        );
    }

    // 3. REAL UI: If sponsors exist, show the list
    return (
        <div className="bg-theme-black min-h-screen pt-32 px-6">
            <div className="text-center mb-16">
                 <AnimatedTitle text="OUR SPONSORS" className="text-6xl md:text-8xl font-bebas text-theme-white" />
                 <p className="font-oswald text-white/60 mt-4 tracking-widest uppercase">
                    Partners powering our mission
                 </p>
            </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {sponsors.map((sponsor, idx) => (
                    <div key={idx} className="group p-8 border border-white/10 bg-white/5 rounded-xl text-center hover:bg-white/10 transition-colors duration-300">
                        <div className="mb-4">
                            {/* You can replace this with an actual logo if you add image uploads later */}
                            <div className="w-16 h-16 bg-red-600/20 rounded-full mx-auto flex items-center justify-center text-red-500 font-bebas text-2xl">
                                {sponsor.name.charAt(0)}
                            </div>
                        </div>
                        <h3 className="text-2xl font-bebas text-white group-hover:text-red-500 transition-colors">{sponsor.name}</h3>
                        <p className="text-white/40 font-oswald text-xs tracking-widest uppercase mt-2">{sponsor.tier}</p>
                    </div>
                ))}
             </div>
        </div>
    );
}