import { motion } from "framer-motion";

const logos = [
    { src: "/assets/logos/bis.png", scale: 1.0 },
    { src: "/assets/logos/firdo_trans.png", scale: 1.1 },
    { src: "/assets/logos/men.png", scale: 1.2 },
    { src: "/assets/logos/ia_groups.png", scale: 1.0 },
    { src: "/assets/logos/studio_sankara.png", scale: 1.0 },
    { src: "/assets/logos/aphrc.png", scale: 1.0 },
    { src: "/assets/logos/ifes.png", scale: 1.0 },
    { src: "/assets/logos/ndi.png", scale: 1.1 },
    { src: "/assets/logos/kadior.png", scale: 1.1 }
];

// Duplicate for seamless loop
const allLogos = [...logos, ...logos, ...logos];

const ClientLogos = () => {
    return (
        <section className="py-12 md:py-20 bg-black border-y border-white/5 overflow-hidden relative z-10">
            <div className="container mx-auto px-6 mb-8 md:mb-12 text-center">
                <p className="text-gray-500 uppercase tracking-widest text-[10px] md:text-sm font-bold">Ils nous font confiance</p>
            </div>

            <div className="flex whitespace-nowrap overflow-hidden relative">
                <div className="absolute left-0 top-0 bottom-0 w-20 md:w-48 bg-gradient-to-r from-black via-black/80 to-transparent z-10"></div>
                <div className="absolute right-0 top-0 bottom-0 w-20 md:w-48 bg-gradient-to-l from-black via-black/80 to-transparent z-10"></div>

                <motion.div
                    className="flex items-center space-x-24 md:space-x-32"
                    animate={{ x: [0, -1600] }}
                    transition={{
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 45,
                        ease: "linear",
                    }}
                >
                    {allLogos.map((logo, i) => (
                        <div key={i} className="flex-shrink-0 opacity-40 hover:opacity-100 transition-all duration-500 h-10 md:h-14 flex items-center justify-center transition-transform hover:scale-110 duration-500 group">
                            <img
                                src={logo.src}
                                alt="Client Logo"
                                style={{ transform: `scale(${logo.scale})` }}
                                className="max-h-full w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default ClientLogos;
