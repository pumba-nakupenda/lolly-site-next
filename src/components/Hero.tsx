import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "./ui/Button";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
    const ref = useRef(null);
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(false);

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
        if (isMobile) {
            navigate('/contact');
        } else {
            window.dispatchEvent(new CustomEvent('open-contact-modal'));
        }
    };

    return (
        <section ref={ref} className="relative h-[100dvh] flex items-center justify-center overflow-hidden bg-transparent">

            {/* Advanced Background Decorative Elements */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none hidden md:block">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 45, 0],
                        x: [0, 30, 0],
                        y: [0, -20, 0]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[-5%] right-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.4, 1],
                        x: [0, -50, 0],
                        y: [0, 60, 0]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-[-10%] left-[-15%] w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px]"
                />
            </div>

            <motion.div style={{ y: textY }} className="container mx-auto px-6 z-10 relative text-center pt-10 md:pt-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block py-2 px-5 rounded-full bg-white/5 backdrop-blur-md text-primary font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs mb-6 md:mb-8 border border-white/10"
                    >
                        Agence de Communication & Formation
                    </motion.span>

                    <h1 className="text-4xl md:text-9xl font-serif font-bold text-white mb-6 md:mb-8 leading-[1.1] tracking-tight">
                        Des mots qui <span className="text-primary italic">touchent</span>, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-accent pb-1 px-2">images qui marquent</span>
                    </h1>

                    <p className="text-sm md:text-2xl text-gray-400 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed px-4 md:px-0">
                        Propulsez votre marque vers l'excellence avec des stratégies créatives
                        et des formations professionnelles de standard international.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Button
                            size="lg"
                            className="h-16 px-10 text-lg font-bold rounded-2xl shadow-[0_10px_30px_rgba(255,215,0,0.2)]"
                            onClick={() => window.location.href = '/services'}
                        >
                            Explorer nos expertises
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="h-16 px-10 text-lg font-bold rounded-2xl border-white/10 hover:bg-white/5 backdrop-blur-sm"
                            onClick={handleContactClick}
                        >
                            Lancer un projet
                        </Button>
                    </div>
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3"
                style={{ opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]) }}
            >
                <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold">Scroll</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="w-6 h-10 border-2 border-white/10 rounded-full flex justify-center p-1.5 backdrop-blur-sm"
                >
                    <div className="w-1 h-2 bg-primary rounded-full"></div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
