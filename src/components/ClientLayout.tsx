"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { MotionConfig } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ContactModal from "./ContactModal";
import Preloader from "./Preloader";
import CustomCursor from "./CustomCursor";
import WhatsAppButton from "./WhatsAppButton";
import ScrollToTop from "./ScrollToTop";
import { useIsMobile } from "../hooks/useIsMobile";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [modalSubject, setModalSubject] = useState("");
    const isMobile = useIsMobile();

    useEffect(() => {
        const handleOpenContact = (e: any) => {
            if (e.detail && e.detail.subject) {
                setModalSubject(e.detail.subject);
            } else {
                setModalSubject("");
            }
            setIsContactModalOpen(true);
        };
        window.addEventListener("open-contact-modal", handleOpenContact);
        return () =>
            window.removeEventListener("open-contact-modal", handleOpenContact);
    }, []);

    const isVCardPage = pathname?.toLowerCase().startsWith("/vcard");
    const isStudioPage = pathname?.toLowerCase().startsWith("/studio");
    const isIsolatedPage = isVCardPage || isStudioPage;

    return (
        <MotionConfig>
            <div className="min-h-screen font-sans text-gray-100 flex flex-col bg-background">
                {!isMobile && !isIsolatedPage && <Preloader />}
                {!isIsolatedPage && <CustomCursor />}
                {!isIsolatedPage && <Navbar />}
                <ScrollToTop />
                <ContactModal
                    isOpen={isContactModalOpen}
                    onClose={() => setIsContactModalOpen(false)}
                    prefilledSubject={modalSubject}
                />

                <main className="flex-grow">{children}</main>

                {!isIsolatedPage && <Footer />}
                {!isIsolatedPage && <WhatsAppButton />}
            </div>
        </MotionConfig>
    );
}
