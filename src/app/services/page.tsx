import ServicesClient from "@/components/services/ServicesClient";
import { Metadata } from "next";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
    title: "Nos Expertises | Agence de Communication 360°",
    description:
        "Découvrez nos expertises d'élite au Sénégal : Consulting stratégique, Formation, Production Vidéo, Design Graphique et Community Management. Une vision créative pour votre impact.",
    openGraph: {
        title: "Nos Expertises | LOLLY Agency",
        description:
            "Découvrez nos expertises d'élite : Consulting, Formation, Production Vidéo, Design Graphique et Community Management.",
        url: "https://lolly.sn/services",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Expertises LOLLY Agency",
        description: "Services de communication branding et production vidéo au Sénégal.",
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
            "name": "Services",
            "item": "https://lolly.sn/services"
        }
    ]
};

export const revalidate = 60;

async function getServicesData() {
    const { client } = await import("@/sanityClient");
    try {
        const [expertises, steps, faqs, results] = await Promise.all([
            client.fetch(`*[_type == "service"] | order(orderId asc) {
                "id": _id,
                orderId,
                title,
                description,
                items,
                cta,
                link,
                highlight,
                icon,
                extra
            }`),
            client.fetch(`*[_type == "step"] | order(orderId asc) {
                "id": _id,
                orderId,
                title,
                subtitle,
                icon,
                content,
                details,
                deliverable
            }`),
            client.fetch(`*[_type == "faq"] | order(orderId asc) {
                "id": _id,
                question,
                answer
            }`),
            client.fetch(`*[_type == "result"] | order(orderId asc) {
                "id": _id,
                value,
                label,
                description
            }`)
        ]);
        return { expertises, steps, faqs, results };
    } catch (e) {
        return { expertises: null, steps: null, faqs: null, results: null };
    }
}

export default async function ServicesPage() {
    const data = await getServicesData();
    return (
        <>
            <JsonLd data={breadcrumbData} />
            <ServicesClient
                expertises={data.expertises}
                steps={data.steps}
                faqs={data.faqs}
                results={data.results}
            />
        </>
    );
}
