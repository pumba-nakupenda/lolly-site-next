"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import OptimizedImage from "../OptimizedImage";

interface Post {
    title: string;
    slug: string;
    mainImage?: any;
    publishedAt: string;
    excerpt: string;
    categories?: string[];
}

const BlogClient = ({ posts }: { posts: Post[] }) => {
    const featuredPost = posts[0];
    const otherPosts = posts.slice(1);

    return (
        <div className="pt-32 pb-24 min-h-screen bg-[#050505] relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-20 text-center"
                >
                    <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Lolly Insights</span>
                    <h1 className="text-5xl md:text-8xl font-serif font-bold text-white mb-8">Le <span className="text-primary italic">Lab</span> de LOLLY</h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-xl font-light leading-relaxed">
                        Exploration des tendances, stratégies digitales et pépites créatives tout droit venues de Dakar.
                    </p>
                </motion.div>

                {posts.length > 0 ? (
                    <div className="space-y-20">
                        {/* Featured Post */}
                        {featuredPost && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="group relative"
                            >
                                <div className="absolute inset-0 bg-primary/20 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-[2.5rem] overflow-hidden bg-white/[0.03] border border-white/10 backdrop-blur-2xl">
                                    <div className="relative h-[400px] lg:h-full overflow-hidden">
                                        {featuredPost.mainImage ? (
                                            <OptimizedImage
                                                src={featuredPost.mainImage}
                                                alt={featuredPost.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-surface" />
                                        )}
                                        <div className="absolute top-8 left-8 flex gap-2">
                                            {featuredPost.categories?.map((cat, idx) => (
                                                <span key={idx} className="bg-primary text-black px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                                                    {cat}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="p-8 lg:p-20 flex flex-col justify-center">
                                        <div className="text-primary font-mono text-[10px] md:text-xs mb-6 tracking-widest uppercase font-bold">
                                            {featuredPost.publishedAt ? new Date(featuredPost.publishedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : 'À venir'}
                                        </div>
                                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 group-hover:text-primary transition-colors leading-[1.1] tracking-tight">
                                            <Link href={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
                                        </h2>
                                        <p className="text-gray-400 text-base md:text-lg mb-10 leading-relaxed line-clamp-4 font-light">
                                            {featuredPost.excerpt}
                                        </p>
                                        <Link
                                            href={`/blog/${featuredPost.slug}`}
                                            className="inline-flex items-center gap-4 text-white font-bold group/btn"
                                        >
                                            <span className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover/btn:bg-primary group-hover/btn:border-primary group-hover/btn:text-black transition-all duration-300">
                                                →
                                            </span>
                                            <span className="text-sm tracking-widest uppercase">Lire l'article</span>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Other Posts Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {otherPosts.map((post, i) => (
                                <motion.article
                                    key={post.slug || i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group flex flex-col"
                                >
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="relative h-72 rounded-[2rem] overflow-hidden mb-8 border border-white/10"
                                    >
                                        {post.mainImage ? (
                                            <OptimizedImage
                                                src={post.mainImage}
                                                alt={post.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-surface" />
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                                        <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                                            {post.categories?.map((cat, idx) => (
                                                <span key={idx} className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider">
                                                    {cat}
                                                </span>
                                            ))}
                                        </div>
                                    </Link>

                                    <div className="flex-grow flex flex-col px-2">
                                        <div className="text-[10px] text-gray-500 font-bold mb-4 uppercase tracking-[0.2em]">
                                            {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Inconnu'}
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors leading-snug">
                                            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                                        </h3>
                                        <p className="text-gray-400 text-sm line-clamp-3 mb-8 leading-relaxed font-light">
                                            {post.excerpt}
                                        </p>
                                        <div className="mt-auto">
                                            <Link
                                                href={`/blog/${post.slug}`}
                                                className="text-white text-xs font-bold uppercase tracking-widest flex items-center gap-3 hover:text-primary transition-colors"
                                            >
                                                Explorer
                                                <span className="w-8 h-[1px] bg-white/20 group-hover:w-12 group-hover:bg-primary transition-all duration-300" />
                                            </Link>
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-40 border border-dashed border-white/10 rounded-[3rem]">
                        <p className="text-gray-500 text-2xl font-serif italic">Le labo est en pleine ébullition... Revenez bientôt.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogClient;
