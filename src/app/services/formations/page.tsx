import FormationsClient from "@/components/services/FormationsClient";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Formations Digitales | LOLLY Academy",
    description:
        "Montez en compétence et maîtrisez les codes du digital. Des formations professionnelles certifiantes à Dakar pour booster votre autonomie.",
    keywords:
        "formation digitale dakar, lolly academy, formation marketing sénégal, compétences numériques",
    openGraph: {
        title: "Formations Digitales | LOLLY Academy",
        description:
            "Montez en compétence et maîtrisez les codes du digital. Des formations professionnelles certifiantes à Dakar pour booster votre autonomie.",
        url: "https://lolly.sn/services/formations",
        images: [
            {
                url: "/assets/Formations/formation01.webp",
                width: 1200,
                height: 630,
                alt: "Formations Digitales",
            },
        ],
    },
};

export default function FormationsPage() {
    return <FormationsClient />;
}
