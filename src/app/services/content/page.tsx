import ContentClient from "@/components/services/ContentClient";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Création de Contenu & Copywriting | LOLLY Agence",
    description:
        "Rédaction SEO, copywriting et storytelling. Donnez de la voix à votre expertise avec du contenu qui convertit au Sénégal.",
    keywords:
        "rédaction seo dakar, copywriting sénégal, brand content dakar, storytelling",
    openGraph: {
        title: "Création de Contenu & Copywriting | LOLLY Agence",
        description:
            "Rédaction SEO, copywriting et storytelling. Donnez de la voix à votre expertise avec du contenu qui convertit au Sénégal.",
        url: "https://lolly.sn/services/content",
        images: ["/assets/office_vibe.webp"],
    },
};

export default function ContentPage() {
    return <ContentClient />;
}
