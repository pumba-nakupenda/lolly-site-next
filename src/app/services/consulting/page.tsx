import ConsultingClient from "@/components/services/ConsultingClient";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Consulting en Communication | LOLLY Agence",
    description:
        "Plus qu'un conseil, une vision. Nous structurons votre image pour qu'elle devienne votre meilleur levier de croissance au Sénégal.",
    keywords:
        "consulting communication dakar, stratégie de marque sénégal, audit communication, gestion de crise",
    openGraph: {
        title: "Consulting en Communication | LOLLY Agence",
        description:
            "Plus qu'un conseil, une vision. Nous structurons votre image pour qu'elle devienne votre meilleur levier de croissance au Sénégal.",
        url: "https://lolly.sn/services/consulting",
        images: [
            {
                url: "/assets/Consulting/consulting01.webp",
                width: 1200,
                height: 630,
                alt: "Consulting en Communication",
            },
        ],
    },
};

export default function ConsultingPage() {
    return <ConsultingClient />;
}
