"use client";

import { motion } from "framer-motion";
import OptimizedImage from "./OptimizedImage";

interface Partner {
    name: string;
    logo: string;
    scale?: number;
}

const ClientLogos = ({ partners }: { partners?: Partner[] }) => {
    const defaultLogos = [
        { name: "BIS", logo: "/assets/logos/bis.webp", scale: 1.0 },
        { name: "Firdo", logo: "/assets/logos/firdo_trans.webp", scale: 1.1 },
        { name: "MEN", logo: "/assets/logos/men.webp", scale: 1.2 },
        { name: "IA Groups", logo: "/assets/logos/ia_groups.webp", scale: 1.0 },
        { name: "Studio Sankara", logo: "/assets/logos/studio_sankara.webp", scale: 1.0 },
        { name: "APHRC", logo: "/assets/logos/aphrc.webp", scale: 1.0 },
        { name: "IFES", logo: "/assets/logos/ifes.webp", scale: 1.0 },
        { name: "NDI", logo: "/assets/logos/ndi.webp", scale: 1.1 },
        { name: "Kadior", logo: "/assets/logos/kadior.webp", scale: 1.1 }
    ];

    const displayLogos = partners && partners.length > 0 ? partners : defaultLogos;
    // Duplicate for seamless loop
    const allLogos = [...displayLogos, ...displayLogos, ...displayLogos];

    return (
        <section className="py-12 md:py-20 bg-black border-y border-white/5 overflow-hidden relative z-10">
            <div className="container mx-auto px-6 mb-8 md:mb-12 text-center">
                <p className="text-gray-500 uppercase tracking-widest text-[10px] md:text-sm font-bold">Ils nous font confiance</p>
            </div>

            <div className="flex whitespace-nowrap overflow-hidden relative">
                <div className="absolute left-0 top-0 bottom-0 w-20 md:w-48 bg-gradient-to-r from-black via-black/80 to-transparent z-10"></div>
                <div className="absolute right-0 top-0 bottom-0 w-20 md:w-48 bg-gradient-to-l from-black via-black/80 to-transparent z-10"></div>

                <motion.div
                    className="flex items-center space-x-32 md:space-x-48"
                    animate={{ x: [0, -1600] }}
                    transition={{
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 45,
                        ease: "linear",
                    }}
                >
                    {allLogos.map((logo, i) => (
                        <div key={i} className="flex-shrink-0 opacity-40 hover:opacity-100 transition-all duration-500 h-12 md:h-20 w-32 md:w-48 flex items-center justify-center transition-transform hover:scale-110 duration-500 group relative">
                            <OptimizedImage
                                src={logo.logo}
                                alt={logo.name || "Client Logo"}
                                style={{ transform: `scale(${logo.scale || 1})` }}
                                className="max-h-full w-auto object-contain grayscale brightness-0 invert group-hover:grayscale-0 group-hover:brightness-100 group-hover:invert-0 transition-all duration-500"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default ClientLogos;
