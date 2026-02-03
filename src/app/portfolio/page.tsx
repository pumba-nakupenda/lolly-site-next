import PortfolioClient from "@/components/portfolio/PortfolioClient";
import { Metadata } from "next";
import { client } from "@/sanityClient";

export const revalidate = 60;

import { FALLBACK_PROJECTS } from "@/data/fallback";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
    title: "Portfolio d'Excellence | Nos Réalisations Impactantes",
    description:
        "Découvrez l'impact de LOLLY Agency à travers nos projets en branding, stratégie digitale et production audiovisuelle au Sénégal.",
    openGraph: {
        title: "Portfolio | LOLLY Agency",
        description: "Plus qu'une agence, un partenaire de succès. Découvrez nos réalisations.",
        url: "https://lolly.sn/portfolio",
    }
};

const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        {
            "@type": "ListItem",
            "position": 1,
            "name": "Accueil",
            "item": "https://lolly.sn/"
        },
        {
            "@type": "ListItem",
            "position": 2,
            "name": "Portfolio",
            "item": "https://lolly.sn/portfolio"
        }
    ]
};

async function getProjects() {
    try {
        return await client.fetch(`*[_type == "portfolio"] | order(publishedAt desc) {
            "id": _id,
            title,
            category,
            "image": mainImage.asset->url,
            "images": [mainImage.asset->url, ...gallery[].asset->url],
            description,
            client,
            "date": publishedAt,
            hasReport,
            reportUrl,
            reportLabel,
            videoUrl
        }`);
    } catch (error) {
        console.error("Error fetching projects:", error);
        return FALLBACK_PROJECTS;
    }
}

export default async function PortfolioPage() {
    const projects = await getProjects();
    return (
        <>
            <JsonLd data={breadcrumbData} />
            <PortfolioClient projects={projects && projects.length > 0 ? projects : FALLBACK_PROJECTS} />
        </>
    );
}
