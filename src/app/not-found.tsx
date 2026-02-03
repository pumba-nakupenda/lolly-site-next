"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { MoveLeft, Ghost } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden bg-black">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />
            </div>

            <div className="container max-w-2xl text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="relative inline-block mb-12">
                        <motion.div
                            animate={{
                                y: [0, -20, 0],
                                rotate: [0, 5, -5, 0]
                            }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="text-primary opacity-20"
                        >
                            <Ghost size={160} strokeWidth={1} />
                        </motion.div>
                        <h1 className="text-[12rem] font-serif font-black text-white/5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none leading-none">
                            404
                        </h1>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
                        Signal <span className="text-primary italic">Perdu</span>.
                    </h2>
                    <p className="text-gray-300 text-lg md:text-xl mb-12 max-w-lg mx-auto leading-relaxed">
                        Le lien que vous suivez n'existe plus ou a été déplacé. Mais rassurez-vous, votre vision reste intacte.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link href="/">
                            <Button size="lg" className="h-14 px-10 rounded-2xl group flex items-center gap-3">
                                <MoveLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                                Retour à l'accueil
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button variant="outline" size="lg" className="h-14 px-10 border-white/10 hover:bg-white/5 rounded-2xl">
                                Nous contacter
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Corner markers */}
            <div className="absolute top-10 left-10 w-8 h-8 border-t border-l border-primary/20" />
            <div className="absolute bottom-10 right-10 w-8 h-8 border-b border-r border-primary/20" />
        </div>
    );
}
