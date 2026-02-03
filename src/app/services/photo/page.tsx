import PhotographyClient from "@/components/services/PhotographyClient";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Photographie Professionnelle | LOLLY Agence",
    description:
        "Photographie de haute précision à Dakar. Portrait, packshot, événementiel et studio pour sublimer votre image de marque.",
    keywords:
        "photographe professionnel dakar, shooting photo sénégal, packshot produit, photo studio",
    openGraph: {
        title: "Photographie Professionnelle | LOLLY Agence",
        description:
            "Photographie de haute précision à Dakar. Portrait, packshot, événementiel et studio pour sublimer votre image de marque.",
        url: "https://lolly.sn/services/photo",
        images: ["/assets/Photo/sony_a7ii_01.webp"],
    },
};

export default function PhotographyPage() {
    return <PhotographyClient />;
}
