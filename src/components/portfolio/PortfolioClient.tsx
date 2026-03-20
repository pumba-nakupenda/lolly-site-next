"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { X, ExternalLink, ChevronLeft, ChevronRight, Eye } from "lucide-react";

interface ProjectLink { label: string; url: string; }

interface Project {
    id: any;
    title: string;
    category: string;
    image: any;
    images?: any[];
    galleryLayout?: string;
    description: string;
    reportUrl?: string;
    client?: string;
    date?: string;
    hasReport?: boolean;
    reportLabel?: string;
    videoUrl?: string;
    links?: ProjectLink[];
}

function PortfolioImg({ src, alt, className }: { src: string; alt: string; className?: string }) {
    const [err, setErr] = useState(false);
    if (!src || err) return (
        <div className={`bg-gray-900 flex items-center justify-center ${className ?? ""}`}>
            <span className="text-gray-600 text-xs">Image non disponible</span>
        </div>
    );
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} className={className} onError={() => setErr(true)} loading="lazy" />;
}

function getDomain(url: string) {
    try { return new URL(url).hostname.replace("www.", ""); } catch { return url; }
}

const PortfolioClient = ({ projects: initialProjects }: { projects: Project[] }) => {
    const dynamicCategories = ["Tout", ...Array.from(new Set(initialProjects.map(p => p.category)))];
    const [filter, setFilter] = useState("Tout");
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const router = useRouter();

    const filteredProjects = filter === "Tout"
        ? initialProjects
        : initialProjects.filter(p => p.category === filter);

    useEffect(() => { setCurrentImageIndex(0); setLightboxIndex(null); }, [selectedProject]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (lightboxIndex !== null && selectedProject?.images) {
                if (e.key === "Escape") setLightboxIndex(null);
                if (e.key === "ArrowRight") setLightboxIndex(i => Math.min((i ?? 0) + 1, selectedProject.images!.length - 1));
                if (e.key === "ArrowLeft") setLightboxIndex(i => Math.max((i ?? 0) - 1, 0));
                return;
            }
            if (!selectedProject) return;
            if (e.key === "Escape") setSelectedProject(null);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [selectedProject, lightboxIndex]);

    return (
        <div className="pt-32 md:pt-40 pb-24 bg-[#050505] relative">

            {/* Header */}
            <div className="container mx-auto px-6 mb-16 md:mb-20 text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                    <span className="text-primary font-bold tracking-[0.2em] uppercase text-[10px] mb-6 inline-block">
                        Notre Galerie
                    </span>
                    <h1 className="text-4xl md:text-8xl font-serif font-bold text-white mb-6 tracking-tight leading-[1.1]">
                        Réalisations <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary italic">d'Excellence</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-xl mx-auto">
                        Chaque projet est une preuve de notre engagement à bousculer les codes.
                    </p>
                </motion.div>
            </div>

            {/* Filters */}
            <div className="mb-12 md:mb-16 overflow-x-auto scrollbar-hide">
                <motion.div
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className="flex gap-2 md:gap-3 justify-start md:justify-center px-6 min-w-max md:min-w-0"
                >
                    {dynamicCategories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-5 py-2 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all border ${
                                filter === cat
                                    ? "bg-primary text-black border-primary"
                                    : "bg-transparent text-gray-400 border-white/10 hover:border-white/30 hover:text-white"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </motion.div>
            </div>

            {/* Behance-style masonry grid */}
            <div className="container mx-auto px-4 md:px-6">
                {filteredProjects.length === 0 ? (
                    <div className="text-center py-32">
                        <p className="text-gray-500">Aucun projet dans cette catégorie.</p>
                        <button onClick={() => setFilter("Tout")} className="mt-6 text-primary text-sm underline">Voir tous</button>
                    </div>
                ) : (
                    <AnimatePresence mode="popLayout">
                        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-5 space-y-4 md:space-y-5">
                            {filteredProjects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.4, delay: index * 0.04 }}
                                    onClick={() => setSelectedProject(project)}
                                    className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-2xl bg-[#111] mb-4 md:mb-5"
                                >
                                    {/* Image */}
                                    <div className="overflow-hidden">
                                        <PortfolioImg
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>

                                    {/* Hover overlay — Behance style */}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/70 transition-all duration-400 flex flex-col justify-end p-5 md:p-6">
                                        <div className="translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                            <span className="text-primary text-[10px] font-black uppercase tracking-widest mb-2 block">{project.category}</span>
                                            <h3 className="text-white font-bold text-lg leading-snug mb-1">{project.title}</h3>
                                            {project.client && <p className="text-gray-400 text-xs">{project.client}</p>}
                                            <div className="flex items-center gap-2 mt-3">
                                                <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-primary">
                                                    <Eye size={12} /> Voir le projet
                                                </span>
                                                {project.images && project.images.length > 1 && (
                                                    <span className="text-gray-500 text-[10px]">{project.images.length} visuels</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Category tag always visible top-left */}
                                    <div className="absolute top-3 left-3 z-10 group-hover:opacity-0 transition-opacity">
                                        <span className="bg-black/60 backdrop-blur-sm text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-lg border border-white/10">
                                            {project.category}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </AnimatePresence>
                )}
            </div>

            {/* CTA */}
            <div className="container mx-auto px-6 mt-24 md:mt-32 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-[3rem] p-12 md:p-20 relative overflow-hidden group"
                >
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
                            Votre futur succès<br />commence <span className="text-primary italic">ici</span>.
                        </h2>
                        <p className="text-gray-400 mb-10 max-w-lg mx-auto text-lg leading-relaxed">
                            Prêt à bousculer votre industrie avec une identité forte ?
                        </p>
                        <Button className="h-14 px-10 font-black rounded-2xl" onClick={() => router.push("/contact")}>
                            Parlons de votre projet
                        </Button>
                    </div>
                </motion.div>
            </div>

            {/* Project Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <div
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
                        role="dialog"
                        aria-modal="true"
                    >
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setSelectedProject(null)}
                            className="fixed inset-0 bg-black/90 backdrop-blur-xl"
                        />

                        <motion.div
                            initial={{ opacity: 0, y: 40, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 40, scale: 0.97 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="relative z-10 bg-[#0f0f0f] border border-white/10 rounded-[2rem] w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col lg:flex-row"
                        >
                            {/* Close */}
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-5 right-5 z-20 w-10 h-10 bg-white/10 hover:bg-primary hover:text-black text-white rounded-xl flex items-center justify-center transition-all"
                            >
                                <X size={18} />
                            </button>

                            {/* Left — Media: Behance style scroll */}
                            <div className="lg:w-[60%] bg-[#080808] overflow-y-auto min-h-[300px] lg:min-h-0">
                                {selectedProject.videoUrl ? (
                                    <div className="aspect-video w-full">
                                        <iframe
                                            src={selectedProject.videoUrl}
                                            title={selectedProject.title}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className="w-full h-full"
                                        />
                                    </div>
                                ) : (
                                    /* Behance: images empilées pleine largeur */
                                    <div className="flex flex-col gap-1">
                                        {(selectedProject.images ?? [selectedProject.image]).filter(Boolean).map((src: string, i: number) => (
                                            <div
                                                key={i}
                                                className="w-full overflow-hidden cursor-zoom-in group/img relative"
                                                onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                                            >
                                                <PortfolioImg
                                                    src={src}
                                                    alt={`${selectedProject.title} — ${i + 1}`}
                                                    className="w-full object-cover group-hover/img:brightness-90 transition-all duration-300"
                                                />
                                                {/* Lightbox hint */}
                                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity">
                                                    <span className="bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1.5 rounded-full">
                                                        Agrandir
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Lightbox overlay */}
                                <AnimatePresence>
                                    {lightboxIndex !== null && selectedProject.images && (
                                        <motion.div
                                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                            className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4"
                                            onClick={() => setLightboxIndex(null)}
                                        >
                                            <button
                                                onClick={(e) => { e.stopPropagation(); setLightboxIndex(i => Math.max((i ?? 0) - 1, 0)); }}
                                                disabled={lightboxIndex <= 0}
                                                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-primary hover:text-black text-white rounded-xl flex items-center justify-center disabled:opacity-20 transition-all z-10"
                                            ><ChevronLeft size={22} /></button>
                                            <PortfolioImg
                                                src={selectedProject.images[lightboxIndex] ?? ""}
                                                alt={selectedProject.title}
                                                className="max-w-[90vw] max-h-[90vh] object-contain rounded-xl"
                                            />
                                            <button
                                                onClick={(e) => { e.stopPropagation(); setLightboxIndex(i => Math.min((i ?? 0) + 1, selectedProject.images!.length - 1)); }}
                                                disabled={lightboxIndex >= selectedProject.images.length - 1}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-primary hover:text-black text-white rounded-xl flex items-center justify-center disabled:opacity-20 transition-all z-10"
                                            ><ChevronRight size={22} /></button>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }}
                                                className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-primary hover:text-black text-white rounded-xl flex items-center justify-center transition-all z-10"
                                            ><X size={16} /></button>
                                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-gray-500 text-xs">
                                                {lightboxIndex + 1} / {selectedProject.images.length}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Right — Info */}
                            <div className="lg:w-[40%] overflow-y-auto p-8 md:p-10 flex flex-col">
                                <div className="flex-1">
                                    <span className="text-primary text-[10px] font-black uppercase tracking-[0.25em] mb-4 block">{selectedProject.category}</span>
                                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-5 leading-tight">{selectedProject.title}</h2>
                                    <p className="text-gray-400 text-base leading-relaxed mb-8">{selectedProject.description}</p>

                                    <div className="grid grid-cols-2 gap-6 mb-8 pb-8 border-b border-white/5">
                                        {selectedProject.client && (
                                            <div>
                                                <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest block mb-1">Client</span>
                                                <span className="text-white font-semibold">{selectedProject.client}</span>
                                            </div>
                                        )}
                                        {selectedProject.date && (
                                            <div>
                                                <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest block mb-1">Livraison</span>
                                                <span className="text-white font-semibold">{selectedProject.date}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Links */}
                                    {selectedProject.links && selectedProject.links.length > 0 && (
                                        <div className="mb-8 space-y-2">
                                            <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest block mb-3">Liens</span>
                                            {selectedProject.links.map((link: ProjectLink, i: number) => {
                                                const domain = getDomain(link.url);
                                                return (
                                                    <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-primary/30 rounded-xl px-4 py-3 transition-all group/link"
                                                    >
                                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                                        <img src={`https://www.google.com/s2/favicons?domain=${domain}&sz=32`} alt="" className="w-5 h-5 rounded shrink-0" />
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-white text-sm font-medium group-hover/link:text-primary transition-colors truncate">{link.label || domain}</p>
                                                            <p className="text-gray-600 text-[10px] truncate">{domain}</p>
                                                        </div>
                                                        <ExternalLink size={13} className="text-gray-600 group-hover/link:text-primary transition-colors shrink-0" />
                                                    </a>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="space-y-3 pt-2">
                                    <Button className="w-full h-12 font-black rounded-xl" onClick={() => router.push("/contact")}>
                                        Demander une étude similaire
                                    </Button>
                                    {selectedProject.hasReport && selectedProject.reportUrl && (
                                        <a href={selectedProject.reportUrl} target="_blank" rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="flex items-center justify-center gap-2 w-full h-11 border border-white/10 hover:border-primary/40 text-gray-400 hover:text-primary rounded-xl text-xs font-bold uppercase tracking-widest transition-all"
                                        >
                                            <ExternalLink size={13} /> {selectedProject.reportLabel || "Voir le rapport"}
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PortfolioClient;
