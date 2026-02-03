import CGVClient from "@/components/legal/CGVClient";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "CGV | LOLLY Agence",
    description: "Conditions Générales de Vente de LOLLY Agence.",
    openGraph: {
        title: "CGV | LOLLY Agence",
        description: "Conditions Générales de Vente de LOLLY Agence.",
        url: "https://lolly.sn/cgv",
    },
};

export default function CGVPage() {
    return <CGVClient />;
}
