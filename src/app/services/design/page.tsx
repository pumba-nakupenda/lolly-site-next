import DesignClient from "@/components/services/DesignClient";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Design Graphique & Branding | LOLLY Agence",
    description:
        "Identité visuelle, logos, et charte graphique. Nous créons des designs qui marquent les esprits et subliment votre marque au Sénégal.",
    keywords:
        "design graphique dakar, branding sénégal, création logo, charte graphique",
    openGraph: {
        title: "Design Graphique & Branding | LOLLY Agence",
        description:
            "Identité visuelle, logos, et charte graphique. Nous créons des designs qui marquent les esprits et subliment votre marque au Sénégal.",
        url: "https://lolly.sn/services/design",
        images: ["https://images.unsplash.com/photo-1558655146-d09347e92766"],
    },
};

export default function DesignPage() {
    return <DesignClient />;
}
