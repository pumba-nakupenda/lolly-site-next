import BlogPostClient from "@/components/blog/BlogPostClient";
import { supabase } from "@/lib/supabase";

export const revalidate = 60;

import JsonLd from "@/components/JsonLd";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    try {
        const { data: post } = await supabase
            .from("posts")
            .select("title, excerpt, main_image")
            .eq("slug", slug)
            .single();
        const ogImage = post?.main_image || 'https://lolly.sn/meta-image.png';
        return {
            title: `${post?.title || 'Article'} | LOLLY Agency`,
            description: post?.excerpt || 'Découvrez notre dernier article sur le blog de LOLLY Agency.',
            openGraph: {
                title: `${post?.title || 'Article'} | LOLLY Agency`,
                description: post?.excerpt || 'Découvrez notre dernier article sur le blog de LOLLY Agency.',
                images: [{ url: ogImage }],
                type: 'article',
            },
            twitter: {
                card: 'summary_large_image',
                images: [ogImage],
            },
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
        const { data: rawPost } = await supabase
            .from("posts")
            .select("*")
            .eq("slug", slug)
            .single();

        // Fetch prev/next posts
        const [{ data: prevPosts }, { data: nextPosts }] = await Promise.all([
            supabase.from("posts").select("title, slug").lt("published_at", rawPost?.published_at ?? "").order("published_at", { ascending: false }).limit(1),
            supabase.from("posts").select("title, slug").gt("published_at", rawPost?.published_at ?? "").order("published_at", { ascending: true }).limit(1),
        ]);

        const post = rawPost ? {
            title: rawPost.title,
            mainImage: rawPost.main_image,
            publishedAt: rawPost.published_at,
            body: rawPost.body,
            categories: rawPost.categories,
            excerpt: rawPost.excerpt,
            prev: prevPosts?.[0] ? { title: prevPosts[0].title, slug: { current: prevPosts[0].slug } } : null,
            next: nextPosts?.[0] ? { title: nextPosts[0].title, slug: { current: nextPosts[0].slug } } : null,
        } : null;

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
        const { data: posts } = await supabase.from("posts").select("slug");
        return (posts ?? []).map((post) => ({ slug: post.slug }));
    } catch (error) {
        console.error("Error generating static params for blog posts:", error);
        return [];
    }
}
