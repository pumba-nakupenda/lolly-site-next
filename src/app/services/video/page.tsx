import ProductionVideoClient from "@/components/services/ProductionVideoClient";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Production Vidéo | LOLLY Studio",
    description:
        "Des images qui marquent. Production vidéo haute qualité à Dakar : spots publicitaires, documentaires, et contenu social media.",
    keywords:
        "production vidéo dakar, agence audiovisuelle sénégal, montage vidéo, tournage 6k",
    openGraph: {
        title: "Production Vidéo | LOLLY Studio",
        description:
            "Des images qui marquent. Production vidéo haute qualité à Dakar : spots publicitaires, documentaires, et contenu social media.",
        url: "https://lolly.sn/services/video",
        images: [
            {
                url: "/assets/Video/bmpcc01.webp",
                width: 1200,
                height: 630,
                alt: "Production Vidéo",
            },
        ],
    },
};

export default function ProductionVideoPage() {
    return <ProductionVideoClient />;
}
