import BlogPostClient from "@/components/blog/BlogPostClient";
import { client } from "@/sanityClient";

export const revalidate = 60;

import JsonLd from "@/components/JsonLd";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    try {
        const post = await client.fetch(`*[_type == "post" && slug.current == $slug][0]{ title, "excerpt": array::join(string::split(pt::text(body), "")[0..150], "") + "..." }`, { slug });
        return {
            title: `${post?.title || 'Article'} | LOLLY Agency`,
            description: post?.excerpt || 'Découvrez notre dernier article sur le blog de LOLLY Agency.',
        };
    } catch (error) {
        console.error("Error generating metadata for blog post:", error);
        return {
            title: 'Article | LOLLY Agency',
            description: 'Découvrez notre dernier article sur le blog de LOLLY Agency.',
        };
    }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    try {
        const post = await client.fetch(`*[_type == "post" && slug.current == $slug][0]{
            title,
            "mainImage": mainImage.asset->url,
            publishedAt,
            body,
            "categories": categories[]->title,
            "excerpt": array::join(string::split(pt::text(body), "")[0..150], "") + "...",
            "prev": *[_type == "post" && publishedAt < ^.publishedAt] | order(publishedAt desc)[0]{ title, "slug": slug.current },
            "next": *[_type == "post" && publishedAt > ^.publishedAt] | order(publishedAt asc)[0]{ title, "slug": slug.current }
        }`, { slug });

        const blogPostingData = post ? {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "image": post.mainImage || "https://lolly.sn/meta-image.png",
            "datePublished": post.publishedAt,
            "dateModified": post.publishedAt,
            "author": {
                "@type": "Organization",
                "name": "LOLLY Agency"
            },
            "publisher": {
                "@type": "Organization",
                "name": "LOLLY Agency",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://lolly.sn/assets/logos/logo_white.png"
                }
            },
            "description": post.excerpt,
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `https://lolly.sn/blog/${slug}`
            }
        } : null;

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
                },
                {
                    "@type": "ListItem",
                    "position": 3,
                    "name": post?.title || "Article",
                    "item": `https://lolly.sn/blog/${slug}`
                }
            ]
        };
        return (
            <>
                {blogPostingData && <JsonLd data={blogPostingData} />}
                <JsonLd data={breadcrumbData} />
                <BlogPostClient post={post} />
            </>
        );
    } catch (error) {
        console.error("Error fetching blog post:", error);
        const fallbackBreadcrumb = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://lolly.sn/" },
                { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://lolly.sn/blog" }
            ]
        };
        return (
            <>
                <JsonLd data={fallbackBreadcrumb} />
                <BlogPostClient post={null} />
            </>
        );
    }
}

export async function generateStaticParams() {
    try {
        const posts = await client.fetch(`*[_type == "post" && defined(slug.current)]{ "slug": slug.current }`);
        return posts.map((post: any) => ({
            slug: post.slug,
        }));
    } catch (error) {
        console.error("Error generating static params for blog posts:", error);
        return [];
    }
}
