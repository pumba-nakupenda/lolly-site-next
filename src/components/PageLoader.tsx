import { motion } from "framer-motion";
import OptimizedImage from "./OptimizedImage";

const PageLoader = () => {
    return (
        <div className="fixed inset-0 z-[200] bg-background flex items-center justify-center overflow-hidden">
            <div className="relative flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut", repeat: Infinity, repeatType: "reverse", repeatDelay: 0.5 }}
                    className="relative h-16 md:h-24 w-auto mb-4 opacity-50"
                >
                    <OptimizedImage
                        src="/assets/logos/logo_white.png"
                        alt="LOLLY Agency"
                        height={96}
                        width={300}
                        className="h-full w-auto object-contain"
                    />
                </motion.div>

                <motion.div
                    animate={{ scaleX: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-full h-px bg-primary/30 mt-8 origin-center"
                />
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
        </div>
    );
};

export default PageLoader;
