import HomeClient from "@/components/home/HomeClient";
import { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { FALLBACK_TESTIMONIALS } from "@/data/fallback";
import { supabase } from "@/lib/supabase";

export const revalidate = 60; // revalidate at most every 60 seconds

export const metadata: Metadata = {
    title: "Agence de Conseil en Communication | LOLLY Agence",
    description:
        "LOLLY est votre partenaire stratégique pour dominer le paysage digital sénégalais. Stratégie 360, Branding, Formation et Production Vidéo.",
    keywords: "communication, digital, sénégal, branding, formation, vidéo",
    openGraph: {
        title: "Agence de Conseil en Communication | LOLLY Agence",
        description:
            "LOLLY est votre partenaire stratégique pour dominer le paysage digital sénégalais. Stratégie 360, Branding, Formation et Production Vidéo.",
        url: "https://lolly.sn",
        type: "website",
        images: ["https://lolly.sn/meta-image.png"],
    },
    twitter: {
        card: "summary_large_image",
        title: "Agence de Conseil en Communication | LOLLY Agence",
        description:
            "LOLLY est votre partenaire stratégique pour dominer le paysage digital sénégalais. Stratégie 360, Branding, Formation et Production Vidéo.",
        images: ["https://lolly.sn/meta-image.png"],
    },
};

const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "LOLLY Agency",
    "url": "https://lolly.sn",
    "logo": "https://lolly.sn/assets/logos/logo_white.png",
    "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+221772354747",
        "contactType": "customer service",
        "areaServed": "SN",
        "availableLanguage": ["French", "English"]
    },
    "sameAs": [
        "https://www.facebook.com/lollyagency",
        "https://www.instagram.com/lollyagency",
        "https://www.linkedin.com/company/lollyagency"
    ]
};

async function getHomeData() {
    try {
        const [{ data: rawTestimonials }, { data: heroes }, { data: partners }] = await Promise.all([
            supabase.from("testimonials").select("*"),
            supabase.from("hero").select("*").limit(1),
            supabase.from("partners").select("*"),
        ]);

        const testimonials = rawTestimonials?.map((t) => ({
            quote: t.content,
            author: t.name,
            role: t.role,
            rating: t.rating,
            color: t.rating >= 5 ? "primary" : "accent",
            avatar: t.avatar,
        }));

        return {
            testimonials: testimonials?.length ? testimonials : FALLBACK_TESTIMONIALS,
            hero: heroes?.[0] ?? null,
            partners: partners !== null ? partners : undefined,
        };
    } catch (e) {
        console.error("Error fetching home data:", e);
        return {
            testimonials: FALLBACK_TESTIMONIALS,
            hero: null,
            partners: undefined,
        };
    }
}

export default async function Home() {
    const { testimonials, hero, partners } = await getHomeData();

    return (
        <>
            <JsonLd data={organizationData} />
            <HomeClient
                testimonials={testimonials}
                partners={partners}
                hero={hero}
            />
        </>
    );
}
