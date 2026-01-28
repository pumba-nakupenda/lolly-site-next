import { useState, useEffect } from "react";

/**
 * Custom hook to detect if the current device is mobile (width < 768px)
 * @returns {boolean} True if the device is mobile, false otherwise
 */
export const useIsMobile = (): boolean => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return isMobile;
};
