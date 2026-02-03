import BlogClient from "@/components/blog/BlogClient";
import { Metadata } from "next";
import { client } from "@/sanityClient";

export const revalidate = 60;

import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
    title: "Insight & Vision | Le Blog de la Communication d'Élite",
    description: "Conseils stratégiques, tendances digitales et actualités de la communication au Sénégal. Décryptez le futur avec LOLLY Agency.",
    openGraph: {
        title: "Insight & Vision | Le Blog LOLLY Agency",
        description: "Tendances digitales et actualités de la communication au Sénégal.",
        url: "https://lolly.sn/blog",
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
            "name": "Blog",
            "item": "https://lolly.sn/blog"
        }
    ]
};

async function getPosts() {
    try {
        return await client.fetch(`*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
            title,
            slug,
            "mainImage": mainImage.asset->url,
            publishedAt,
            "categories": categories[]->title,
            "excerpt": array::join(string::split(pt::text(body), "")[0..150], "") + "..."
        }`);
    } catch (error) {
        console.error("Error fetching posts:", error);
        return [];
    }
}

export default async function BlogPage() {
    const posts = await getPosts();
    return (
        <>
            <JsonLd data={breadcrumbData} />
            <BlogClient posts={posts} />
        </>
    );
}
