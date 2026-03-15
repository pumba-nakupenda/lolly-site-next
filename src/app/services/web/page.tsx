import WebClient from "@/components/services/WebClient";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Création de Site Web | LOLLY Agence",
    description:
        "Sites vitrine, e-commerce, landing pages et portfolios. LOLLY crée des sites web modernes, rapides et optimisés SEO pour votre présence digitale au Sénégal.",
    keywords:
        "création site web dakar, agence web sénégal, site vitrine, e-commerce, landing page, développement web",
    openGraph: {
        title: "Création de Site Web | LOLLY Agence",
        description:
            "Sites vitrine, e-commerce et landing pages. Des sites modernes, rapides et optimisés pour votre croissance.",
        url: "https://lolly.sn/services/web",
        images: ["https://lolly.sn/meta-image.png"],
    },
};

export default function WebPage() {
    return <WebClient />;
}
