import VCardProClient from "@/components/vcard/VCardProClient";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "VCard Entreprise | LOLLY Agency",
    description: "La carte de visite digitale officielle de l'agence LOLLY.",
    openGraph: {
        title: "VCard Entreprise | LOLLY Agency",
        description: "La carte de visite digitale officielle de l'agence LOLLY.",
        url: "https://lolly.sn/vcard/pro",
    },
};

export default function VCardProPage() {
    return <VCardProClient />;
}
