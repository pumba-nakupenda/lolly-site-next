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
    const { supabase } = await import("@/lib/supabase");
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        console.warn("[services] Supabase not configured, using default data");
        return { expertises: undefined, steps: undefined, faqs: undefined, results: undefined };
    }
    try {
        const [{ data: expertises }, { data: steps }, { data: faqs }, { data: results }] = await Promise.all([
            supabase.from("services").select("*").order("order_id", { ascending: true }),
            supabase.from("steps").select("*").order("order_id", { ascending: true }),
            supabase.from("faqs").select("*").order("order_id", { ascending: true }),
            supabase.from("results").select("*").order("order_id", { ascending: true }),
        ]);
        return {
            expertises: expertises !== null ? expertises.map((s) => ({
                id: s.id, orderId: s.order_id, title: s.title,
                description: s.description, items: s.items, cta: s.cta,
                link: s.link, highlight: s.highlight, icon: s.icon, extra: s.extra,
            })) : [],
            steps: steps !== null ? steps.map((s) => ({
                id: s.id, orderId: s.order_id, title: s.title,
                subtitle: s.subtitle, icon: s.icon, content: s.content,
                details: s.details, deliverable: s.deliverable,
            })) : [],
            faqs: faqs !== null ? faqs.map((f) => ({
                id: f.id, question: f.question, answer: f.answer,
            })) : [],
            results: results !== null ? results.map((r) => ({
                id: r.id, value: r.value, label: r.label, description: r.description,
            })) : [],
        };
    } catch (e) {
        console.error("Error fetching services data:", e);
        return { expertises: undefined, steps: undefined, faqs: undefined, results: undefined };
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
