import HomeClient from "@/components/home/HomeClient";
import { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { FALLBACK_TESTIMONIALS } from "@/data/fallback";
import { client } from "@/sanityClient";

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
        const [testimonials, hero, partners] = await Promise.all([
            client.fetch(`*[_type == "testimonial"] {
                "quote": content,
                "author": name,
                role,
                rating,
                "color": select(rating >= 5 => "primary", "accent"),
                "avatar": avatar.asset->url
            }`),
            client.fetch(`*[_type == "hero"][0]`),
            client.fetch(`*[_type == "partner"] {
                name,
                "logo": logo.asset->url,
                scale
            }`)
        ]);
        return {
            testimonials: testimonials?.length > 0 ? testimonials : FALLBACK_TESTIMONIALS,
            hero,
            partners
        };
    } catch (e) {
        console.error("Error fetching home data:", e);
        return {
            testimonials: FALLBACK_TESTIMONIALS,
            hero: null,
            partners: null
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
