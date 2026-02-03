import { motion, useSpring, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";

const CustomCursor = () => {
    const [isVisible, setIsVisible] = useState(false);
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 150 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const moveMouse = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        window.addEventListener("mousemove", moveMouse);
        return () => window.removeEventListener("mousemove", moveMouse);
    }, [isVisible, mouseX, mouseY]);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[300] pointer-events-none hidden md:block">
            <motion.div
                style={{
                    translateX: cursorX,
                    translateY: cursorY,
                }}
                className="w-8 h-8 rounded-full border border-primary/50 flex items-center justify-center -ml-4 -mt-4 shadow-[0_0_15px_rgba(255,209,0,0.1)] will-change-transform"
            >
                <div className="w-1 h-1 bg-primary rounded-full shadow-lg" />
            </motion.div>
        </div>
    );
};

export default CustomCursor;
