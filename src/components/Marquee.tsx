"use client";

import { motion } from "framer-motion";

const Marquee = () => {

    return (
        <div className="relative w-full overflow-hidden bg-primary py-2 md:py-4 border-y border-black">
            <div className="flex whitespace-nowrap">
                <motion.div
                    className="flex space-x-12 text-black font-black text-xl md:text-4xl uppercase tracking-tighter"
                    animate={{ x: [0, -1035] }}
                    transition={{
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 20,
                        ease: "linear",
                    }}
                >
                    {/* Repeating text enough times to fill screen + buffer */}
                    {[...Array(8)].map((_, i) => (
                        <span key={i} className="flex items-center">
                            STRATÉGIE <span className="mx-6 text-2xl">•</span>
                            DESIGN <span className="mx-6 text-2xl">•</span>
                            BRANDING <span className="mx-6 text-2xl">•</span>
                            PRODUCTION <span className="mx-6 text-2xl">•</span>
                            FORMATION <span className="mx-6 text-2xl">•</span>
                            MARKETING <span className="mx-6 text-2xl">•</span>
                            PHOTOGRAPHIE <span className="mx-6 text-2xl">•</span>
                            VIDEO <span className="mx-6 text-2xl">•</span>
                        </span>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Marquee;
