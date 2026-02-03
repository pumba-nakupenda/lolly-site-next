import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import OptimizedImage from "./OptimizedImage";

const Preloader = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{
                        y: "-100%",
                        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
                    }}
                    className="fixed inset-0 z-[200] bg-background flex items-center justify-center overflow-hidden"
                >
                    <div className="relative flex flex-col items-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="relative h-24 md:h-32 w-auto mb-4"
                        >
                            <OptimizedImage
                                src="/assets/logos/logo_white.png"
                                alt="LOLLY Agency"
                                height={128}
                                width={480}
                                className="h-full w-auto object-contain"
                                priority
                            />
                        </motion.div>

                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                            className="w-full h-px bg-primary/30 mt-8 origin-left"
                        />

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2 }}
                            className="mt-6 text-[10px] uppercase font-black tracking-[0.5em] text-gray-500"
                        >
                            L'excellence à l'état pur
                        </motion.p>
                    </div>

                    {/* Decorative background motion */}
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 90, 0],
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="absolute -top-[20%] -right-[10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
