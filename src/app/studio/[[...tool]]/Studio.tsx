"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../studio/sanity.config";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Eye, EyeOff, CheckCircle2, ChevronRight } from "lucide-react";

export default function Studio() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Get password from env, fallback to a default if not set
    const correctPassword = process.env.NEXT_PUBLIC_STUDIO_PASSWORD || "lolly2024";

    useEffect(() => {
        const auth = sessionStorage.getItem("studio-auth");
        if (auth === "true") {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(false);

        // Artificial delay for premium feel
        setTimeout(() => {
            if (password === correctPassword) {
                sessionStorage.setItem("studio-auth", "true");
                setIsAuthenticated(true);
            } else {
                setError(true);
                setIsLoading(false);
                // Shake effect or feedback
            }
        }, 800);
    };

    if (isAuthenticated === null) return null;

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-6 font-sans relative overflow-hidden">
                {/* Background Decorations */}
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px]" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="w-full max-w-md z-10"
                >
                    <div className="bg-surface/30 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-white to-accent opacity-50" />

                        <div className="flex flex-col items-center mb-10">
                            <motion.div
                                initial={{ rotate: -10 }}
                                animate={{ rotate: 0 }}
                                className="w-20 h-20 bg-primary/20 rounded-3xl flex items-center justify-center mb-6 border border-primary/30"
                            >
                                <Lock className="text-primary" size={32} />
                            </motion.div>
                            <h1 className="text-3xl font-serif font-bold text-white tracking-tight mb-2">LOLLY Studio</h1>
                            <p className="text-gray-400 text-sm text-center">Espace sécurisé - Accès restreint</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-2 relative">
                                <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] ml-1">Mot de passe</label>
                                <div className="relative group">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        autoFocus
                                        className={`w-full bg-black/40 border ${error ? 'border-red-500/50 ring-2 ring-red-500/10' : 'border-white/10 focus:border-primary/50'} rounded-2xl px-6 py-5 text-white focus:outline-none transition-all pr-14 text-lg`}
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            setError(false);
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                                <AnimatePresence>
                                    {error && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            className="text-red-400 text-[10px] font-bold uppercase tracking-wider mt-2 ml-1"
                                        >
                                            Mot de passe incorrect
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-16 bg-primary hover:bg-white text-black font-black uppercase tracking-[0.2em] text-xs rounded-2xl transition-all shadow-[0_10px_30px_rgba(255,215,0,0.2)] flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50"
                            >
                                {isLoading ? (
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                        className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                                    />
                                ) : (
                                    <>
                                        Accéder au studio
                                        <ChevronRight size={18} />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-12 text-center">
                            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black">© 2026 LOLLY AGENCY</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        );
    }

    return <NextStudio config={config} />;
}
