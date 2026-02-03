import LegalClient from "@/components/legal/LegalClient";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Mentions Légales | LOLLY Agence",
    description: "Consultez les mentions légales de LOLLY Agence, votre partenaire en communication au Sénégal.",
    openGraph: {
        title: "Mentions Légales | LOLLY Agence",
        description: "Consultez les mentions légales de LOLLY Agence, votre partenaire en communication au Sénégal.",
        url: "https://lolly.sn/legal",
    },
};

export default function LegalPage() {
    return <LegalClient />;
}
