import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { X, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

const categories = [
    "Tout",
    "Consulting",
    "Formation",
    "Vidéo",
    "Design",
    "Photo",
    "CM",
    "Contenu",
    "Branding"
];

const projects = [
    {
        id: 1,
        title: "Audit Stratégique - ONG Internationale",
        category: "Consulting",
        image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        description: "Diagnostic complet de la communication globale et plan de redressement de l'image de marque. Nous avons analysé les processus internes et externes pour proposer une feuille de route sur 24 mois permettant d'unifier la voix de l'organisation à travers 15 pays.",
        hasReport: true,
        reportLabel: "Étude de cas complète"
    },
    {
        id: 2,
        title: "Formation Digital Skills for Business",
        category: "Formation",
        image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1516321318423-f06f85e514b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        description: "Programme intensif de 4 semaines pour une équipe de 20 collaborateurs corporate. Couvrant de l'IA générative au Social Media Management, cette formation a permis d'augmenter l'efficacité opérationnelle du département marketing de 35%.",
        hasReport: false
    },
    {
        id: 3,
        title: "Film Institutionnel - Ministère",
        category: "Vidéo",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1536240478700-b869070f9279?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        description: "Réalisation d'une vidéo 4K présentant les accomplissements majeurs de l'année. Une narration puissante alliant prises de vues aériennes et interviews intimistes pour valoriser l'impact direct des politiques publiques.",
        hasReport: false
    },
    {
        id: 4,
        title: "Branding Complet - Fintech Sénégal",
        category: "Design",
        image: "https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        description: "Création de l'identité visuelle, logo, charte graphique et supports digitaux. Un design moderne, sécurisant et ancré dans les codes de la finance technologique africaine.",
        hasReport: true
    },
    {
        id: 5,
        title: "Portraits Corporate - Cabinet d'Avocats",
        category: "Photo",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1521791136364-703a1d41f775?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        description: "Série de portraits professionnels et mise en situation dans les locaux. L'objectif était de retranscrire à la fois l'excellence rigoureuse et l'aspect humain du cabinet.",
        hasReport: false
    },
    {
        id: 6,
        title: "Gestion Social Media - Chaîne de Retail",
        category: "CM",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        description: "Animation quotidienne, création de contenus (Reels) et modération pour 5 plateformes. Une stratégie communautaire ayant généré +150% d'engagement organique en 6 mois.",
        hasReport: false
    },
    {
        id: 7,
        title: "Stratégie de Contenu - Groupe Immobilier",
        category: "Contenu",
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        description: "Rédaction d'articles de blog SEO, newsletters et scripts pour vidéos explicatives. Un storytelling axé sur l'accessibilité à la propriété et la confiance.",
        hasReport: false
    },
    {
        id: 8,
        title: "Campagne 360° - Laiterie du Berger",
        category: "Vidéo",
        videoUrl: "https://www.youtube.com/embed/jNQXAC9IVRw",
        image: "https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        description: "Spots publicitaires combinés à une stratégie digitale et de l'affichage. Une campagne intégrée célébrant le terroir sénégalais et l'innovation laitière.",
        reportUrl: "https://example.com/rapport-laiterie.pdf",
        hasReport: true
    },
    {
        id: 9,
        title: "Branding OMVS TEST - FORUM",
        category: "Branding",
        image: "https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        description: "ndey sane Spots publicitaires combinés à une stratégie digitale et de l'affichage. Une campagne intégrée célébrant le terroir sénégalais et l'innovation laitière.",
        reportUrl: "/assets/pdfs/Proposition.pdf",
        client: "OMVS",
        date: "2024",
        hasReport: true,
        reportLabel: "Proposition Stratégique"
    }
];

const Portfolio = () => {
    const [filter, setFilter] = useState("Tout");
    const [selectedProject, setSelectedProject] = useState<any | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate();

    const filteredProjects = filter === "Tout"
        ? projects
        : projects.filter(p => p.category === filter);

    const handleScroll = (e: any) => {
        const scrollLeft = e.target.scrollLeft;
        const width = e.target.scrollWidth - e.target.clientWidth;
        const scrollPercentage = scrollLeft / width;
        const totalItems = filteredProjects.length;
        const index = Math.round(scrollPercentage * (totalItems - 1));
        if (!isNaN(index)) setActiveIndex(index);
    };

    const nextImage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (selectedProject?.images) {
            setCurrentImageIndex((prev) => (prev + 1) % selectedProject.images.length);
        }
    };

    const prevImage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (selectedProject?.images) {
            setCurrentImageIndex((prev) => (prev - 1 + selectedProject.images.length) % selectedProject.images.length);
        }
    };

    useEffect(() => {
        setCurrentImageIndex(0);
    }, [selectedProject]);

    return (
        <div className="pt-40 pb-20 px-6 min-h-screen bg-transparent relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, -45, 0],
                        x: [0, -40, 0],
                        y: [0, 30, 0]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        x: [0, 50, 0],
                        y: [0, -20, 0]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px]"
                />
            </div>

            <div className="container mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-center mb-24"
                >
                    <span className="bg-primary/10 text-primary font-bold tracking-[0.2em] uppercase text-[10px] px-4 py-1.5 rounded-full mb-6 inline-block border border-primary/20 backdrop-blur-sm">Notre Galerie</span>
                    <h1 className="text-3xl md:text-8xl font-serif font-bold text-white mb-8 tracking-tight leading-[1.1]">
                        Réalisations <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary italic pb-1 px-2">d'Excellence</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Chaque projet est une preuve de notre engagement à bousculer les codes et à marquer l'histoire de nos clients.
                    </p>
                </motion.div>

                {/* Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-wrap md:flex-row justify-center gap-2 md:gap-3 mb-20"
                >
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-8 py-3 rounded-2xl text-[10px] uppercase font-black tracking-[0.2em] transition-all duration-500 backdrop-blur-md border shadow-lg
                                ${filter === cat
                                    ? 'bg-primary text-black border-primary scale-105 shadow-primary/20'
                                    : 'bg-white/5 text-gray-400 border-white/5 hover:border-white/20 hover:text-white'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </motion.div>

                {/* Grid / Carousel */}
                <div 
                    className="flex overflow-x-auto snap-x snap-mandatory pb-8 gap-6 px-[7.5vw] md:px-0 scrollbar-hide md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-10 md:pb-0 md:overflow-visible"
                    onScroll={handleScroll}
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                key={project.id}
                                onClick={() => setSelectedProject(project)}
                                className="min-w-[85vw] md:min-w-0 snap-center group relative aspect-[4/5] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-2xl bg-surface/20"
                            >
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-95 transition-all duration-500"></div>

                                <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full transform md:translate-y-6 md:group-hover:translate-y-0 transition-all duration-500">
                                    <span className="bg-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.3em] px-3 py-1.5 rounded-lg mb-4 block border border-primary/20 w-fit backdrop-blur-md">
                                        {project.category}
                                    </span>
                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight group-hover:text-primary transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="hidden md:block text-gray-400 text-sm opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 line-clamp-2 leading-relaxed">
                                        {project.description}
                                    </p>
                                    <div className="mt-6 md:mt-8 flex items-center gap-3 text-white text-[10px] font-black uppercase tracking-[0.3em] opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all delay-200">
                                        Explorer le cas <div className="h-px w-8 bg-primary" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Pagination Dots for Portfolio (Mobile Only) */}
                <div className="flex md:hidden justify-center gap-2 mt-4">
                    {filteredProjects.map((_, i) => (
                        <div 
                            key={i} 
                            className={`h-1.5 rounded-full transition-all duration-300 ${activeIndex === i ? "w-6 bg-primary" : "w-1.5 bg-white/20"}`}
                        />
                    ))}
                </div>
            </div>

            {/* Project Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 overflow-y-auto pt-20">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProject(null)}
                            className="fixed inset-0 bg-black/95 backdrop-blur-xl"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 50 }}
                            className="bg-surface/50 backdrop-blur-2xl border border-white/10 rounded-[3rem] max-w-6xl w-full max-h-[90vh] overflow-hidden relative z-10 shadow-[0_30px_100px_rgba(0,0,0,0.5)] flex flex-col lg:flex-row"
                        >
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-8 right-8 z-20 w-12 h-12 bg-black/50 backdrop-blur-md rounded-2xl flex items-center justify-center text-white hover:bg-primary hover:text-black transition-all group shadow-xl"
                            >
                                <X size={24} className="group-hover:rotate-90 transition-transform" />
                            </button>

                            <div className="lg:w-3/5 h-[400px] lg:h-auto overflow-hidden relative group/carousel bg-black flex items-center justify-center">
                                {selectedProject.videoUrl ? (
                                    <div className="w-full h-full aspect-video">
                                        <iframe
                                            src={selectedProject.videoUrl}
                                            title={selectedProject.title}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className="w-full h-full"
                                        ></iframe>
                                    </div>
                                ) : (
                                    <>
                                        <AnimatePresence mode="wait">
                                            <motion.img
                                                key={currentImageIndex}
                                                src={selectedProject.images ? selectedProject.images[currentImageIndex] : selectedProject.image}
                                                alt={selectedProject.title}
                                                initial={{ opacity: 0, scale: 1.1 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                transition={{ duration: 0.6 }}
                                                className="w-full h-full object-cover"
                                            />
                                        </AnimatePresence>

                                        {selectedProject.images && selectedProject.images.length > 1 && (
                                            <>
                                                <button
                                                    onClick={prevImage}
                                                    className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-black/40 backdrop-blur-lg rounded-2xl flex items-center justify-center text-white opacity-0 group-hover/carousel:opacity-100 transition-all hover:bg-primary hover:text-black z-30 shadow-2xl"
                                                >
                                                    <ChevronLeft size={28} />
                                                </button>
                                                <button
                                                    onClick={nextImage}
                                                    className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-black/40 backdrop-blur-lg rounded-2xl flex items-center justify-center text-white opacity-0 group-hover/carousel:opacity-100 transition-all hover:bg-primary hover:text-black z-30 shadow-2xl"
                                                >
                                                    <ChevronRight size={28} />
                                                </button>

                                                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full">
                                                    {selectedProject.images.map((_: any, i: number) => (
                                                        <button
                                                            key={i}
                                                            onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(i); }}
                                                            className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${i === currentImageIndex ? 'bg-primary w-8' : 'bg-white/30 hover:bg-white/50'}`}
                                                        />
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    </>
                                )}
                            </div>

                            <div className="lg:w-2/5 p-10 md:p-16 overflow-y-auto custom-scrollbar">
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <span className="bg-primary/10 text-primary font-black uppercase tracking-[0.3em] text-[10px] px-4 py-2 rounded-xl mb-6 inline-block border border-primary/20">
                                        {selectedProject.category}
                                    </span>
                                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-8 tracking-tight leading-tight">
                                        {selectedProject.title}
                                    </h2>
                                    <p className="text-gray-400 text-lg leading-relaxed mb-10">
                                        {selectedProject.description}
                                    </p>

                                    <div className="grid grid-cols-2 gap-8 mb-12">
                                        <div className="flex flex-col gap-3">
                                            <span className="text-primary font-black uppercase text-[10px] tracking-widest">Client</span>
                                            <span className="text-white font-bold text-lg">{selectedProject.client || "Confidentiel"}</span>
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <span className="text-primary font-black uppercase text-[10px] tracking-widest">Livraison</span>
                                            <span className="text-white font-bold text-lg">{selectedProject.date || "Fin 2023"}</span>
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-white/5 flex flex-col gap-5">
                                        <Button
                                            className="w-full h-16 text-lg font-black rounded-2xl shadow-xl shadow-primary/10"
                                            onClick={() => navigate('/contact')}
                                        >
                                            Demander une étude
                                        </Button>

                                        {selectedProject.hasReport && (
                                            <button
                                                onClick={() => {
                                                    if (selectedProject.reportUrl && selectedProject.reportUrl.includes('example.com')) {
                                                        // Si c'est un lien fictif ou si on veut forcer le modal par défaut
                                                        window.dispatchEvent(new CustomEvent('open-contact-modal', {
                                                            detail: { subject: `Rapport : ${selectedProject.title}` }
                                                        }));
                                                    } else if (selectedProject.reportUrl) {
                                                        window.open(selectedProject.reportUrl, '_blank');
                                                    } else {
                                                        window.dispatchEvent(new CustomEvent('open-contact-modal', {
                                                            detail: { subject: `Rapport : ${selectedProject.title}` }
                                                        }));
                                                    }
                                                }}
                                                className="flex items-center justify-center gap-3 text-gray-500 hover:text-white transition-all text-xs font-black uppercase tracking-[0.2em] group"
                                            >
                                                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary transition-all">
                                                    <ExternalLink size={14} />
                                                </div>
                                                {selectedProject.reportLabel || "Rapport complet"}
                                            </button>
                                        )}
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* CTA Final */}
            <section className="container mx-auto px-6 mt-24 md:mt-48 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-gray-900 to-black p-12 md:p-24 rounded-[4rem] border border-white/10 shadow-3xl overflow-hidden relative group"
                >
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-7xl font-serif font-bold text-white mb-8 tracking-tight leading-tight">Votre futur succès <br /> commence <span className="text-primary italic">ici</span>.</h2>
                        <p className="text-gray-400 mb-12 max-w-xl mx-auto text-lg md:text-xl leading-relaxed">Prêt à bousculer votre industrie avec une identité forte et une stratégie qui ne laisse rien au hasard ?</p>
                        <Button
                            className="h-16 px-12 text-lg font-black rounded-2xl shadow-xl"
                            onClick={() => {
                                if (window.innerWidth < 768) {
                                    navigate('/contact');
                                } else {
                                    window.dispatchEvent(new CustomEvent('open-contact-modal'));
                                }
                            }}
                        >
                            Parlons de votre projet
                        </Button>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

export default Portfolio;
