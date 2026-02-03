import VCardClient from "@/components/vcard/VCardClient";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "VCard - Amadou Mbaye Gueye | LOLLY Agence",
    description: "Carte de visite digitale de Amadou Mbaye Gueye, Fondateur de LOLLY Agence.",
    openGraph: {
        title: "VCard - Amadou Mbaye Gueye | LOLLY Agence",
        description: "Carte de visite digitale de Amadou Mbaye Gueye, Fondateur de LOLLY Agence.",
        url: "https://lolly.sn/vcard",
    },
};

export default function VCardPage() {
    return <VCardClient />;
}
