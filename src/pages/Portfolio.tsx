import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { X, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import SEO from "../components/SEO";

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
        title: "Branding OMVS - FORUM",
        category: "Branding",
        image: "/portfolio/omvs/OMVS.webp",
        images: [
            "/portfolio/omvs/OMVS.webp",
            "/portfolio/omvs/MOCKUP OMVS.webp",
            "/portfolio/omvs/SAVE THE DATE.webp",
            "/portfolio/omvs/hivernage 225.webp"
        ],
        description: "Accompagnement stratégique et design pour l'OMVS, incluant des supports de communication pour les événements majeurs.",
        reportUrl: "/assets/pdfs/Proposition.pdf",
        client: "OMVS",
        date: "2025-2026",
        hasReport: false,
        reportLabel: "Proposition Stratégique"
    },
    {
        id: 2,
        title: "Investment Advice",
        category: "Consulting",
        image: "/portfolio/investiment advice/investiment advice.webp",
        images: [
            "/portfolio/investiment advice/investiment advice.webp",
            "/portfolio/investiment advice/investiment advice (1).webp",
            "/portfolio/investiment advice/investiment advice (2).webp"
        ],
        description: "Impression et communication pour un cabinet d'investissement.",
        client: "Confidentiel",
        date: "2025",
        hasReport: false
    },
    {
        id: 3,
        title: "ISD Group",
        category: "Design",
        image: "/portfolio/isd groups/carreaux.webp",
        images: [
            "/portfolio/isd groups/carreaux.webp",
            "/portfolio/isd groups/carreaux-01.webp",
            "/portfolio/isd groups/carreaux-02.webp",
            "/portfolio/isd groups/carreaux-03.webp",
            "/portfolio/isd groups/PEINTURE.webp",
            "/portfolio/isd groups/fer a beton.webp"
        ],
        description: "Identité visuelle et supports de communication pour un groupe industriel diversifié. Focus sur la robustesse et l'innovation.",
        client: "ISD Group",
        date: "2025",
        hasReport: false
    },
    {
        id: 4,
        title: "Kadior - Melokaan",
        category: "Branding",
        image: "/portfolio/kadior/MELOKAAN.webp",
        images: [
            "/portfolio/kadior/MELOKAAN.webp"
        ],
        description: "Création d'identité visuelle pour Kadior, capturant l'essence du 'Melokaan' à travers un design épuré et moderne.",
        client: "Kadior",
        date: "2025",
        hasReport: false
    },
    {
        id: 5,
        title: "Lolly Branding",
        category: "Branding",
        image: "/portfolio/lolly/sercive lolly-01.webp",
        images: [
            "/portfolio/lolly/sercive lolly-01.webp",
            "/portfolio/lolly/3 INGREDIENTS DUN BRANDING (1)-01.webp"
        ],
        description: "Branding global pour lolly, incluant la stratégie de contenu et le design des supports digitaux.",
        client: "Lolly",
        date: "2025",
        hasReport: false
    },
    {
        id: 6,
        title: "Luxia Boutique",
        category: "Branding",
        image: "/portfolio/luxia/branding boutique-01.webp",
        images: [
            "/portfolio/luxia/branding boutique-01.webp",
            "/portfolio/luxia/branding boutique-02.webp",
            "/portfolio/luxia/oudama_photo_of_a_black_woman_with_facial_care_product_red_ba_24cd30d9-b16a-40ae-803b-ad2da8a563c0_0-Recovered.webp"
        ],
        description: "Univers visuel pour une boutique de luxe, alliant élégance et raffinement pour une expérience client d'exception.",
        client: "Luxia",
        date: "2025",
        hasReport: false
    },
    {
        id: 7,
        title: "NDI Institutionnel",
        category: "Design",
        image: "/portfolio/ndi/9291816[1].webp",
        images: [
            "/portfolio/ndi/9291816[1].webp",
            "/portfolio/ndi/KAKEMONO.webp",
            "/portfolio/ndi/MOCKUP - Echarpe - Atelier de capitalisation - V01.webp",
            "/portfolio/ndi/plastic-tree-interior-decoration-Recovered.webp"
        ],
        description: "Supports de communication institutionnelle et événementielle pour NDI. Conception de kakemonos et goodies personnalisés.",
        client: "NDI",
        date: "2025",
        hasReport: false
    },
    {
        id: 8,
        title: "RAOB Branding",
        category: "Branding",
        image: "/portfolio/raob/agenda raob.webp",
        images: [
            "/portfolio/raob/agenda raob.webp",
            "/portfolio/raob/bache raob.webp",
            "/portfolio/raob/Notepad8[1].webp"
        ],
        description: "Identité visuelle et supports print pour le RAOB. Création d'agendas et de bâches événementielles.",
        client: "RAOB",
        date: "2025",
        hasReport: false
    },
    {
        id: 9,
        title: "Tapisserie Torrejon",
        category: "Design",
        image: "/portfolio/tapicerie torrejon/LOGO TAPICERIE TORREJON THIAM.webp",
        images: [
            "/portfolio/tapicerie torrejon/LOGO TAPICERIE TORREJON THIAM.webp"
        ],
        description: "Création du logotype pour la Tapisserie Torrejon. Un design qui reflète le savoir-faire artisanal et l'élégance du métier.",
        client: "Tapisserie Torrejon",
        date: "2025",
        hasReport: false
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
        <div className="pt-24 md:pt-40 pb-16 md:pb-20 px-0 md:px-6 min-h-screen bg-transparent relative overflow-hidden">
            <SEO
                title="Portfolio"
                description="Découvrez nos réalisations en consulting, branding, vidéo, design et photographie. Des projets à fort impact pour nos clients au Sénégal."
                keywords="portfolio communication dakar, réalisations agence lolly, branding sénégal, production vidéo dakar"
                url="https://lolly.sn/portfolio"
            />
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

            <div className="container mx-auto relative z-10 px-0 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-center mb-16 md:mb-24 px-6 md:px-0"
                >
                    <span className="bg-primary/10 text-primary font-bold tracking-[0.2em] uppercase text-[10px] px-4 py-1.5 rounded-full mb-6 inline-block border border-primary/20 backdrop-blur-sm">Notre Galerie</span>
                    <h1 className="text-3xl md:text-8xl font-serif font-bold text-white mb-8 tracking-tight leading-[1.1]">
                        Réalisations <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary italic pb-1 px-2">d'Excellence</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Chaque projet est une preuve de notre engagement à bousculer les codes et à marquer l'histoire de nos clients.
                    </p>
                </motion.div>

                {/* Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-wrap md:justify-center gap-2 md:gap-3 mb-12 md:mb-20 px-6 md:px-0 py-4 -my-4"
                >
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`whitespace-nowrap px-6 md:px-8 py-3 rounded-2xl text-[10px] uppercase font-black tracking-[0.2em] transition-all duration-500 backdrop-blur-md border shadow-lg
                                ${filter === cat
                                    ? 'bg-primary text-black border-primary scale-105 shadow-primary/20'
                                    : 'bg-white/5 text-gray-300 border-white/5 hover:border-white/20 hover:text-white'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </motion.div>

                {/* Grid / Carousel */}
                <div
                    className="flex overflow-x-auto snap-x snap-mandatory pb-8 gap-6 px-6 md:px-0 scrollbar-hide md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-10 md:pb-0 md:overflow-visible"
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
                                    srcSet={`${project.image.replace('.webp', '-400.webp')} 400w, ${project.image.replace('.webp', '-800.webp')} 800w, ${project.image.replace('.webp', '-1200.webp')} 1200w`}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    alt={project.title}
                                    width="800"
                                    height="1000"
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                {/* Category Tag - Top Left */}
                                <div className="absolute top-5 left-5 z-20">
                                    <span className="bg-primary text-black text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-lg shadow-2xl border border-white/10 backdrop-blur-sm">
                                        {project.category}
                                    </span>
                                </div>

                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-all duration-500"></div>

                                <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full flex flex-col justify-end min-h-[40%] transform md:translate-y-0 translate-y-2 group-hover:translate-y-0 transition-all duration-500 z-10">
                                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-tight group-hover:text-primary transition-colors drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] line-clamp-2">
                                        {project.title}
                                    </h3>
                                    <p className="hidden md:block text-gray-300 text-[11px] opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 line-clamp-2 leading-relaxed">
                                        {project.description}
                                    </p>
                                    <div className="mt-4 flex items-center gap-2 text-white text-[9px] font-black uppercase tracking-[0.3em] opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all delay-200">
                                        Explorer <div className="h-px w-6 bg-primary" />
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
                            className="bg-surface/50 backdrop-blur-2xl border border-white/10 rounded-[3rem] max-w-6xl w-full max-h-[90vh] overflow-y-auto lg:overflow-hidden relative z-10 shadow-[0_30px_100px_rgba(0,0,0,0.5)] flex flex-col lg:flex-row"
                        >
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-6 right-6 md:top-8 md:right-8 z-20 w-10 h-10 md:w-12 md:h-12 bg-black/50 backdrop-blur-md rounded-xl md:rounded-2xl flex items-center justify-center text-white hover:bg-primary hover:text-black transition-all group shadow-xl"
                            >
                                <X size={20} className="group-hover:rotate-90 transition-transform" />
                            </button>

                            <div className="lg:w-3/5 min-h-[300px] md:h-[400px] lg:h-auto overflow-hidden relative group/carousel bg-black flex items-center justify-center">
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
                                                srcSet={`${(selectedProject.images ? selectedProject.images[currentImageIndex] : selectedProject.image).replace('.webp', '-400.webp')} 400w, ${(selectedProject.images ? selectedProject.images[currentImageIndex] : selectedProject.image).replace('.webp', '-800.webp')} 800w, ${(selectedProject.images ? selectedProject.images[currentImageIndex] : selectedProject.image).replace('.webp', '-1200.webp')} 1200w`}
                                                sizes="(max-width: 1024px) 100vw, 60vw"
                                                alt={selectedProject.title}
                                                initial={{ opacity: 0, scale: 1.1 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                transition={{ duration: 0.6 }}
                                                className="w-full h-full object-cover"
                                                width="1200"
                                                height="800"
                                            />
                                        </AnimatePresence>

                                        {selectedProject.images && selectedProject.images.length > 1 && (
                                            <>
                                                <button
                                                    onClick={prevImage}
                                                    className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 bg-black/40 backdrop-blur-lg rounded-xl md:rounded-2xl flex items-center justify-center text-white opacity-100 lg:opacity-0 lg:group-hover/carousel:opacity-100 transition-all hover:bg-primary hover:text-black z-30 shadow-2xl"
                                                >
                                                    <ChevronLeft size={24} />
                                                </button>
                                                <button
                                                    onClick={nextImage}
                                                    className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 bg-black/40 backdrop-blur-lg rounded-xl md:rounded-2xl flex items-center justify-center text-white opacity-100 lg:opacity-0 lg:group-hover/carousel:opacity-100 transition-all hover:bg-primary hover:text-black z-30 shadow-2xl"
                                                >
                                                    <ChevronRight size={24} />
                                                </button>

                                                <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3 z-30 bg-black/20 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-full">
                                                    {selectedProject.images.map((_: any, i: number) => (
                                                        <button
                                                            key={i}
                                                            onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(i); }}
                                                            className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-500 ${i === currentImageIndex ? 'bg-primary w-6 md:w-8' : 'bg-white/30 hover:bg-white/50'}`}
                                                        />
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    </>
                                )}
                            </div>

                            <div className="lg:w-2/5 p-8 md:p-16 overflow-y-visible lg:overflow-y-auto custom-scrollbar">
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <span className="bg-primary/10 text-primary font-black uppercase tracking-[0.3em] text-[10px] px-3 py-1.5 rounded-xl mb-4 md:mb-6 inline-block border border-primary/20">
                                        {selectedProject.category}
                                    </span>
                                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6 md:mb-8 tracking-tight leading-tight">
                                        {selectedProject.title}
                                    </h2>
                                    <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-8 md:mb-10">
                                        {selectedProject.description}
                                    </p>

                                    <div className="grid grid-cols-2 gap-6 md:gap-8 mb-10 md:mb-12">
                                        <div className="flex flex-col gap-2 md:gap-3">
                                            <span className="text-primary font-black uppercase text-[10px] tracking-widest">Client</span>
                                            <span className="text-white font-bold text-base md:text-lg">{selectedProject.client || "Confidentiel"}</span>
                                        </div>
                                        <div className="flex flex-col gap-2 md:gap-3">
                                            <span className="text-primary font-black uppercase text-[10px] tracking-widest">Livraison</span>
                                            <span className="text-white font-bold text-base md:text-lg">{selectedProject.date || "Fin 2023"}</span>
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-white/5 flex flex-col gap-4 md:gap-5">
                                        <Button
                                            className="w-full h-14 md:h-16 text-base md:text-lg font-black rounded-xl md:rounded-2xl shadow-xl shadow-primary/10"
                                            onClick={() => navigate('/contact')}
                                        >
                                            Demander une étude
                                        </Button>

                                        {selectedProject.hasReport && (
                                            <button
                                                onClick={() => {
                                                    if (selectedProject.reportUrl && selectedProject.reportUrl.includes('example.com')) {
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
                                                className="flex items-center justify-center gap-3 text-gray-500 hover:text-white transition-all text-[10px] font-black uppercase tracking-[0.2em] group py-2"
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
            <section className="container mx-auto px-0 md:px-6 mt-16 md:mt-48 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-gray-900 to-black p-8 md:p-24 rounded-[3rem] md:rounded-[4rem] border border-white/10 shadow-3xl overflow-hidden relative group mx-6 md:mx-0"
                >
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-7xl font-serif font-bold text-white mb-6 md:mb-8 tracking-tight leading-tight">Votre futur succès <br /> commence <span className="text-primary italic">ici</span>.</h2>
                        <p className="text-gray-300 mb-10 md:mb-12 max-w-xl mx-auto text-base md:text-xl leading-relaxed px-4 md:px-0">Prêt à bousculer votre industrie avec une identité forte et une stratégie qui ne laisse rien au hasard ?</p>
                        <Button
                            className="w-full md:w-auto h-14 md:h-16 px-8 md:px-12 text-base md:text-lg font-black rounded-xl md:rounded-2xl shadow-xl"
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
