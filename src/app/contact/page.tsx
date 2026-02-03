import ContactClient from "@/components/contact/ContactClient";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Contact | LOLLY Agence",
    description:
        "Contactez LOLLY pour discuter de votre projet. Consulting, formation, production : nous sommes prêts à relever vos défis.",
    openGraph: {
        title: "Contact | LOLLY Agence",
        description:
            "Contactez LOLLY pour discuter de votre projet. Consulting, formation, production : nous sommes prêts à relever vos défis.",
    },
};

export default function ContactPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-transparent" />}>
            <ContactClient />
        </Suspense>
    );
}
