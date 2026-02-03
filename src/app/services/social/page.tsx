import SocialClient from "@/components/services/SocialClient";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Community Management | LOLLY Agence",
    description:
        "Gérez votre présence sur les réseaux sociaux. Stratégie, modération et engagement pour vos communautés au Sénégal.",
    keywords:
        "community management dakar, gestion réseaux sociaux sénégal, social media agence, engagement digital",
    openGraph: {
        title: "Community Management | LOLLY Agence",
        description:
            "Gérez votre présence sur les réseaux sociaux. Stratégie, modération et engagement pour vos communautés au Sénégal.",
        url: "https://lolly.sn/services/social",
        images: ["https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7"],
    },
};

export default function SocialPage() {
    return <SocialClient />;
}
