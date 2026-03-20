"use client";

import { motion } from "framer-motion";
import OptimizedImage from "../OptimizedImage";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

const markdownComponents = {
    h2: ({ children }: any) => <h2 className="text-3xl font-bold text-white mt-16 mb-6">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-2xl font-bold text-white mt-12 mb-4">{children}</h3>,
    p: ({ children }: any) => <p className="text-gray-400 leading-relaxed mb-6 font-light">{children}</p>,
    blockquote: ({ children }: any) => (
        <blockquote className="border-l-4 border-primary pl-8 my-12 italic text-xl text-gray-200 bg-white/5 p-8 rounded-r-3xl">
            {children}
        </blockquote>
    ),
    ul: ({ children }: any) => <ul className="list-disc list-inside mb-8 space-y-4 text-gray-400">{children}</ul>,
    ol: ({ children }: any) => <ol className="list-decimal list-inside mb-8 space-y-4 text-gray-400">{children}</ol>,
    img: ({ src, alt }: any) => (
        <div className="my-12 rounded-3xl overflow-hidden border border-white/5">
            <OptimizedImage src={src || ""} alt={alt || "Image de blog"} className="w-full object-cover" />
        </div>
    ),
    a: ({ href, children }: any) => (
        <a href={href} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">{children}</a>
    ),
    strong: ({ children }: any) => <strong className="text-white font-bold">{children}</strong>,
};

const BlogPostClient = ({ post }: { post: any }) => {
    if (!post) return (
        <div className="pt-40 text-center min-h-screen bg-[#050505]">
            <h1 className="text-white text-2xl font-serif">Article non trouvé</h1>
            <Link href="/blog" className="text-primary mt-8 inline-block hover:underline">Retour au blog</Link>
        </div>
    );

    return (
        <div className="pt-32 pb-24 min-h-screen bg-[#050505] relative">
            {/* Background Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl aspect-square bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 max-w-4xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Header */}
                    <header className="mb-16 text-center">
                        <div className="flex justify-center gap-3 mb-8">
                            {post.categories?.map((cat: string, i: number) => (
                                <span key={i} className="bg-primary/10 text-primary border border-primary/20 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">
                                    {cat}
                                </span>
                            ))}
                        </div>
                        <div className="text-gray-500 font-mono text-xs mb-6 tracking-widest uppercase">
                            Publié le {new Date(post.publishedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </div>
                        <h1 className="text-4xl md:text-7xl font-serif font-bold text-white mb-12 leading-[1.1]">
                            {post.title}
                        </h1>
                    </header>

                    {/* Image Principale */}
                    {post.mainImage && (
                        <div className="rounded-[3rem] overflow-hidden mb-20 border border-white/10 aspect-[16/9] relative group">
                            <OptimizedImage
                                src={post.mainImage}
                                alt={post.title}
                                className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
                            />
                        </div>
                    )}

                    {/* Corps de l'article */}
                    <div className="prose prose-invert prose-primary max-w-none mb-32">
                        {post.body ? (
                            <ReactMarkdown components={markdownComponents}>{post.body}</ReactMarkdown>
                        ) : (
                            <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
                                <p className="text-gray-500 italic">Contenu en cours de rédaction...</p>
                            </div>
                        )}
                    </div>

                    {/* Navigation entre articles */}
                    <div className="pt-20 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {post.prev ? (
                            <Link href={`/blog/${post.prev.slug}`} className="group p-8 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-primary/30 transition-all">
                                <span className="text-primary text-[10px] font-bold uppercase tracking-[0.2em] block mb-4">← Article Précédent</span>
                                <h4 className="text-white font-bold text-xl group-hover:text-primary transition-colors">{post.prev.title}</h4>
                            </Link>
                        ) : <div />}

                        {post.next && (
                            <Link href={`/blog/${post.next.slug}`} className="group p-8 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-primary/30 transition-all text-right">
                                <span className="text-primary text-[10px] font-bold uppercase tracking-[0.2em] block mb-4">Article Suivant →</span>
                                <h4 className="text-white font-bold text-xl group-hover:text-primary transition-colors">{post.next.title}</h4>
                            </Link>
                        )}
                    </div>

                    <div className="mt-20 text-center">
                        <Link href="/blog" className="inline-flex items-center gap-4 text-white hover:text-primary transition-colors">
                            <span className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">←</span>
                            <span className="font-bold uppercase tracking-widest text-xs">Retour à la liste</span>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default BlogPostClient;
