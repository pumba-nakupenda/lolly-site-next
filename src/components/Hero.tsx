"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "./ui/Button";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface HeroProps {
    data?: {
        badge?: string;
        title?: string;
        subtitle?: string;
        cta1Label?: string;
        cta1Link?: string;
        cta2Label?: string;
        cta2Link?: string;
    }
}

const Hero = ({ data }: HeroProps) => {
    const ref = useRef(null);
    const router = useRouter();
    const [isMobile, setIsMobile] = useState(false);

    // Fallbacks
    const badge = data?.badge || "Agence de Conseil en Communication";
    const titleLines = data?.title ? data.title.split('\n') : ["Des mots qui touchent,", "des images qui marquent"];
    const subtitle = data?.subtitle || "Propulsez votre marque vers l'excellence. Nous sommes votre partenaire stratégique pour une communication à fort impact.";
    const cta1Label = data?.cta1Label || "Explorer nos expertises";
    const cta1Link = data?.cta1Link || "/services";
    const cta2Label = data?.cta2Label || "Lancer un projet";
    const cta2Link = data?.cta2Link || "/contact";

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const textY = useTransform(scrollYProgress, [0, 1], ["0%", isMobile ? "0%" : "200%"]);

    const handleContactClick = () => {
        if (cta2Link === '/contact') {
            if (isMobile) {
                router.push('/contact');
            } else {
                window.dispatchEvent(new CustomEvent('open-contact-modal'));
            }
        } else {
            router.push(cta2Link);
        }
    };

    return (
        <section ref={ref} className="relative h-[100dvh] flex items-center justify-center overflow-hidden bg-transparent">

            {/* Advanced Background Decorative Elements */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <AnimatePresence>
                    {!isMobile && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: 1,
                                    scale: [1, 1.2, 1],
                                    rotate: [0, 45, 0],
                                    x: [0, 30, 0],
                                    y: [0, -20, 0]
                                }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                className="absolute top-[-5%] right-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-primary/10 rounded-full blur-[80px] md:blur-[120px]"
                            />
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: 1,
                                    scale: [1, 1.4, 1],
                                    x: [0, -50, 0],
                                    y: [0, 60, 0]
                                }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute bottom-[-10%] left-[-15%] w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-accent/10 rounded-full blur-[70px] md:blur-[100px]"
                            />
                        </>
                    )}
                </AnimatePresence>
                <div className="md:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.05)_0%,transparent_70%)]" />
            </div>

            <motion.div style={{ y: textY }} className="container mx-auto px-6 z-10 relative text-center pt-20 md:pt-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block py-2 px-5 rounded-full bg-primary/10 md:backdrop-blur-md text-primary font-bold tracking-[0.2em] uppercase text-[9px] md:text-xs mb-8 md:mb-8 border border-primary/20"
                    >
                        {badge}
                    </motion.span>

                    <h1 className="text-5xl md:text-9xl font-serif font-bold text-white mb-8 md:mb-8 leading-[1.05] tracking-tight">
                        {titleLines[0]} {titleLines[1] && <br />}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-accent pb-1 px-2">
                            {titleLines[1] || ""}
                        </span>
                    </h1>

                    <p className="text-base md:text-2xl text-gray-400 mb-12 md:mb-12 max-w-3xl mx-auto leading-relaxed px-2 md:px-0 font-light">
                        {subtitle}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-5 md:gap-6">
                        <Button
                            size="lg"
                            className="w-full sm:w-auto h-16 md:h-16 px-10 text-lg font-bold rounded-2xl shadow-[0_10px_30px_rgba(255,215,0,0.2)]"
                            onClick={() => router.push(cta1Link)}
                        >
                            {cta1Label}
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="w-full sm:w-auto h-16 md:h-16 px-10 text-lg font-bold rounded-2xl border-white/10 hover:bg-white/5 backdrop-blur-sm"
                            onClick={handleContactClick}
                        >
                            {cta2Label}
                        </Button>
                    </div>
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3 z-30"
                style={{ opacity: isMobile ? 1 : useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
            >
                <span className="text-[9px] uppercase tracking-[0.3em] text-gray-500 font-bold">Scroll</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="w-5 h-9 border-2 border-white/30 rounded-full flex justify-center p-1.5 backdrop-blur-sm no-mobile-blur"
                >
                    <div className="w-1 h-1.5 bg-primary rounded-full"></div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
