import AboutClient from "@/components/about/AboutClient";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "À Propos | LOLLY Agence",
    description:
        "Découvrez l'histoire de LOLLY, une agence fondée sur l'excellence et l'innovation. Notre mission : bâtir l'élite créative du continent.",
    openGraph: {
        title: "À Propos | LOLLY Agence",
        description:
            "Découvrez l'histoire de LOLLY, une agence fondée sur l'excellence et l'innovation. Notre mission : bâtir l'élite créative du continent.",
    },
};

export default function AboutPage() {
    return <AboutClient />;
}
