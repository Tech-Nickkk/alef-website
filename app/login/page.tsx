"use client";
import { useState } from "react";
import { auth } from "@/lib/firebase";
import {
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
} from "firebase/auth";
import { useRouter } from "next/navigation";
import AnimatedTitle from "../components/CommonCom/AnimatedTitle";
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();

    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGoogleLogin = async () => {
        setError(null);
        setLoading(true);
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            router.push("/");
        } catch (err) {
            console.error("Login failed", err);
            setError("Failed to sign in with Google.");
            setLoading(false);
        }
    };

    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
            }
            router.push("/");
        } catch (err: any) {
            console.error("Auth error", err);
            let msg = "An error occurred.";
            if (err.code === 'auth/invalid-email') msg = "Invalid email address.";
            else if (err.code === 'auth/user-disabled') msg = "User account disabled.";
            else if (err.code === 'auth/user-not-found') msg = "No user found with this email.";
            else if (err.code === 'auth/wrong-password') msg = "Incorrect password.";
            else if (err.code === 'auth/email-already-in-use') msg = "Email already in use.";
            else if (err.code === 'auth/weak-password') msg = "Password is too weak.";

            setError(msg);
            setLoading(false);
        }
    };

    const toggleMode = () => {
        setError(null);
        setIsLogin(!isLogin);
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden font-oswald text-foreground">
            {/* Back to Home Arrow */}
            <Link
                href="/"
                className="absolute top-8 left-8 z-50 p-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:scale-105 transition-all duration-300 group"
                aria-label="Back to Home"
            >
                <ArrowLeft className="w-6 h-6 text-foreground/80 group-hover:text-foreground transition-colors" />
            </Link>

            {/* Background Ambience - Adjusted to match the blue theme better */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-red/10 rounded-full blur-[100px] pointer-events-none" />

            <div
                className="w-full max-w-md bg-blue border border-white/10 rounded-2xl p-8 shadow-2xl relative z-10 text-white"
            >
                <div className="text-center mb-10">
                    <AnimatedTitle
                        text={isLogin ? "WELCOME BACK" : "CREATE ACCOUNT"}
                        className="text-4xl md:text-5xl text-white mb-3 block font-bebas tracking-wide"
                    />
                    <p className="text-white/60 text-sm tracking-widest uppercase font-light">
                        {isLogin ? "Enter your details to access your account" : "Join us and start your journey today"}
                    </p>
                </div>

                <form onSubmit={handleEmailAuth} className="space-y-6">

                    {/* Email Input */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-white/70 uppercase tracking-widest ml-1">Email Address</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-white/40 group-focus-within:text-white/80 transition-colors" />
                            </div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30 rounded-lg pl-10 pr-4 py-3.5 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-300 font-sans"
                                placeholder="name@example.com"
                                required
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-white/70 uppercase tracking-widest ml-1">Password</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-white/40 group-focus-within:text-white/80 transition-colors" />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30 rounded-lg pl-10 pr-12 py-3.5 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-300 font-sans"
                                placeholder="••••••••"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/40 hover:text-white transition-colors"
                            >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="text-red-400 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20 text-center font-sans">
                            {error}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-white text-blue font-bold uppercase tracking-widest py-4 rounded-lg hover:bg-gray-200 focus:ring-4 focus:ring-white/20 transition-all duration-300 flex items-center justify-center gap-2 mt-4 group shadow-lg"
                    >
                        {loading ? (
                            <Loader2 className="h-5 w-5 animate-spin text-blue" />
                        ) : (
                            <>
                                {isLogin ? "Sign In" : "Sign Up"}
                                <ArrowRight className="h-4 w-4 text-blue group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>

                <div className="relative my-10">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/10"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-blue text-white/40 rounded-full font-oswald tracking-widest text-xs">OR CONTINUE WITH</span>
                    </div>
                </div>

                <div>
                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        className="w-full bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium py-3.5 rounded-lg transition-all duration-300 flex items-center justify-center gap-3 group tracking-wide"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="currentColor"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="currentColor"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                                fill="currentColor"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                        </svg>
                        <span className="group-hover:text-white transition-colors">Google</span>
                    </button>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-white/50 text-sm tracking-wide">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button
                            onClick={toggleMode}
                            className="text-white hover:underline underline-offset-4 font-semibold transition-colors ml-1 uppercase"
                        >
                            {isLogin ? "Sign up" : "Sign in"}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}