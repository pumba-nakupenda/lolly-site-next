import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { BookOpen, Target, PenTool, BarChart, Rocket, HeartHandshake, Award, CheckCircle, Search, Video, Image, Users, MessageSquare, FileText, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Button } from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import SEO from "../components/SEO";

const Services = () => {
    const stepsRef = useRef(null);
    const navigate = useNavigate();
    const [activeExpertise, setActiveExpertise] = useState(0);
    const [activeDiff, setActiveDiff] = useState(0);
    const [activeResult, setActiveResult] = useState(0);
    const [activeCatalogue, setActiveCatalogue] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const { scrollYProgress } = useScroll({
        target: stepsRef,
        offset: ["start center", "end center"]
    });

    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

    const handleScroll = (e: any, setIndex: Function) => {
        const scrollLeft = e.target.scrollLeft;
        const width = e.target.scrollWidth - e.target.clientWidth;
        if (width <= 0) return;
        const scrollPercentage = scrollLeft / width;
        const totalItems = e.target.children.length;
        const index = Math.round(scrollPercentage * (totalItems - 1));
        if (!isNaN(index)) setIndex(index);
    };

    const handleContactClick = (subject?: string) => {
        const subjectParam = subject ? `?subject=${encodeURIComponent(subject)}` : '';
        const eventDetail = subject ? { detail: { subject } } : undefined;

        if (isMobile) {
            navigate(`/contact${subjectParam}`);
        } else {
            window.dispatchEvent(new CustomEvent('open-contact-modal', eventDetail));
        }
    };

    const expertises = [
        {
            id: "consulting",
            title: "Consulting en Communication",
            icon: MessageSquare,
            badge: "Cœur de métier",
            description: "Votre partenaire stratégique pour une communication qui performe.",
            items: [
                "Audit & diagnostic communication",
                "Stratégie de communication 360°",
                "Communication de crise",
                "Accompagnement au changement",
                "Consulting digital & transformation"
            ],
            cta: "En savoir plus",
            link: "/services/consulting",
            highlight: true
        },
        {
            id: 1,
            title: "Formations Professionnelles",
            icon: BookOpen,
            description: "Des modules pratiques pour transformer vos équipes en experts.",
            items: [
                "Communication d'entreprise stratégique",
                "Marketing digital & réseaux sociaux",
                "Production vidéo & photo",
                "Design graphique & branding"
            ],
            extra: "Formats : Présentiel • En ligne • Intra-entreprise • Certifiants",
            cta: "Voir le catalogue",
            link: "/services/formations"
        },
        {
            id: 2,
            title: "Production Vidéo",
            icon: Video,
            description: "Films institutionnels, spots publicitaires et contenu snackable.",
            items: [
                "Vidéos corporate & institutionnelles",
                "Spots publicitaires TV/web",
                "Captation d'événements & live streaming",
                "Contenus réseaux sociaux (Reels, Stories)",
                "Motion design & animation"
            ],
            cta: "Voir nos réalisations",
            link: "/services/video"
        },
        {
            id: 3,
            title: "Design Graphique",
            icon: PenTool,
            description: "Identité visuelle, logos et supports de communication print et digital.",
            items: [
                "Création de logo & charte graphique",
                "Supports print (flyers, brochures, affiches)",
                "Design digital (bannières, posts, infographies)",
                "UI/UX et maquettes web"
            ],
            cta: "Découvrir notre portfolio",
            link: "/services/design"
        },
        {
            id: 4,
            title: "Photographie",
            icon: Image,
            description: "Shooting corporate, événementiel et produit pour sublimer votre image.",
            items: [
                "Portraits professionnels & équipes",
                "Couverture d'événements",
                "Photographie produits & packshots",
                "Reportage corporate & lifestyle"
            ],
            cta: "Voir la galerie",
            link: "/services/photo"
        },
        {
            id: 5,
            title: "Community Management",
            icon: Users,
            description: "Animation de vos réseaux sociaux et gestion de la réputation en ligne.",
            items: [
                "Stratégie de contenu & ligne éditoriale",
                "Création et planification de posts",
                "Animation quotidienne & modération",
                "Social ads & campagnes publicitaires",
                "Analytics & reporting mensuel"
            ],
            cta: "Nos formules",
            link: "/services/social"
        },
        {
            id: 6,
            title: "Création de Contenu",
            icon: FileText,
            description: "Rédaction web, copywriting et storytelling pour nourrir votre communication.",
            items: [
                "Articles de blog SEO-optimisés",
                "Communiqués & dossiers de presse",
                "Scripts vidéo & discours",
                "Newsletters & emailings",
                "Livres blancs & e-books"
            ],
            cta: "Exemples de contenus",
            link: "/services/content"
        }
    ];

    // Filter out consulting for the general grid/carousel
    const standardExpertises = expertises.filter(s => s.id !== "consulting");

    // ... inside component return
    return (
        <div className="pt-24 md:pt-40 pb-16 md:pb-20 px-0 md:px-6 min-h-screen relative overflow-hidden bg-transparent">
            <SEO
                title="Nos Expertises"
                description="Découvrez nos expertises : Consulting, Formation, Production Vidéo, Design Graphique, et Community Management. Une approche 360° pour votre réussite."
            />
            {/* Premium Background Decorative Elements */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none hidden md:block">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                        x: [0, 50, 0],
                        y: [0, -30, 0]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.5, 1],
                        x: [0, -80, 0],
                        y: [0, 40, 0]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px]"
                />
            </div>

            {/* Header */}
            <div className="container mx-auto max-w-5xl text-center mb-16 md:mb-32 relative z-10 px-6 md:px-0">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <span className="bg-primary/10 text-primary font-bold tracking-[0.2em] uppercase text-xs px-4 py-1.5 rounded-full mb-6 inline-block border border-primary/20 backdrop-blur-sm">Notre Art & Manière</span>
                    <h1 className="text-3xl md:text-8xl font-serif font-bold text-white mb-10 tracking-tight leading-[1.1]">
                        Une méthodologie <br /> qui <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary italic pb-1 px-2">garantit</span> le succès
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Chaque projet est une œuvre unique guidée par un processus rigoureux et créatif pour extraire le meilleur de votre marque.
                    </p>
                </motion.div>
            </div>

            {/* Steps Section */}
            <section className="container mx-auto max-w-6xl mb-24 md:mb-48 relative z-10 px-0 md:px-6" ref={stepsRef}>
                {/* Desktop Line */}
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/10 transform -translate-x-1/2">
                    <motion.div
                        style={{ scaleY: scaleY }}
                        className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary via-accent to-primary origin-top"
                    />
                </div>

                {/* Mobile Line (New) */}
                <div className="md:hidden absolute left-8 top-12 bottom-0 w-px bg-white/10">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary/50 to-transparent" />
                </div>

                {/* Steps Container */}
                <div
                    className="flex flex-col gap-12 px-6 pt-4 pb-8 md:block md:px-0 md:pt-0"
                // Removed onScroll handler for mobile as we are not using scroll spy for active step in vertical mode same way
                >
                    {[
                        {
                            step: "01",
                            title: "Découverte",
                            subtitle: "L'Immersion",
                            icon: Search,
                            content: "Analyse profonde de votre ADN. Nous écoutons, observons et décortiquons vos enjeux pour bâtir sur du solide.",
                            details: ["Audit Stratégique", "Psychologie Cible", "KPIs Business"],
                            deliverable: "Diagnostic & Vision Partagée"
                        },
                        {
                            step: "02",
                            title: "Stratégie",
                            subtitle: "L'Architecture",
                            icon: Target,
                            content: "Conception de votre trajectoire unique. Un plan de bataille précis pour dominer votre marché digital.",
                            details: ["Positionnement", "Ligne Éditoriale", "Écosystème Digital"],
                            deliverable: "Roadmap Stratégique 360°"
                        },
                        {
                            step: "03",
                            title: "Création",
                            subtitle: "L'Exécution",
                            icon: PenTool,
                            content: "L'alchimie entre design et impact. Nos créatifs donnent vie à votre stratégie avec une précision chirurgicale.",
                            details: ["Identité Visuelle", "Production Audiovisuelle", "Storytelling"],
                            deliverable: "Assets de Haute Qualité"
                        },
                        {
                            step: "04",
                            title: "Diffusion",
                            subtitle: "L'Expansion",
                            icon: BarChart,
                            content: "Mise en orbite et optimisation. Nous assurons le rayonnement de votre marque et mesurons chaque victoire.",
                            details: ["Social Media Ads", "Growth Monitoring", "Reporting Data"],
                            deliverable: "Croissance & ROI Mesurable"
                        }
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`w-full md:min-w-0 flex flex-col md:flex-row items-center gap-6 md:gap-20 md:mb-32 lg:mb-48 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} pl-12 md:pl-0 relative`}
                        >
                            {/* Mobile Timeline Dot */}
                            <div className="md:hidden absolute left-[2px] top-8 w-3 h-3 bg-primary rounded-full border-2 border-black z-20 shadow-[0_0_10px_rgba(255,215,0,0.5)]" />

                            <div className="md:w-[45%] w-full">
                                <motion.div
                                    whileHover={{ y: -5, borderColor: "rgba(255, 209, 0, 0.3)" }}
                                    className={`p-6 md:p-12 bg-surface/30 backdrop-blur-xl border border-white/5 rounded-[2rem] md:rounded-[2.5rem] transition-all duration-500 relative group shadow-xl h-full ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none rounded-[2rem]" />

                                    <div className={`md:hidden text-primary font-black text-4xl opacity-20 absolute top-4 right-6`}>
                                        {item.step}
                                    </div>

                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 mt-4 md:mt-0 text-center md:text-inherit">
                                        <span className="text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-2 block">{item.subtitle}</span>
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-300 mb-8 text-base md:text-lg leading-relaxed text-center md:text-inherit">{item.content}</p>

                                    <div className={`flex flex-wrap gap-2 justify-center mb-8 ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}>
                                        {item.details.map((detail, i) => (
                                            <span key={i} className="px-3 py-1.5 bg-white/5 rounded-xl text-[9px] md:text-[10px] uppercase font-bold tracking-widest text-gray-300 border border-white/5">{detail}</span>
                                        ))}
                                    </div>

                                    <div className={`flex items-center justify-center gap-3 text-sm text-gray-300 border-t border-white/5 pt-6 ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}>
                                        <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                                            <CheckCircle size={16} className="text-green-500" />
                                        </div>
                                        <p className="font-medium inline-flex items-center gap-2 text-xs md:text-sm">
                                            <span className="text-gray-500 font-bold uppercase tracking-widest">Livrable :</span> {item.deliverable}
                                        </p>
                                    </div>
                                </motion.div>
                            </div>

                            <motion.div
                                initial={{ scale: 0, rotate: -45 }}
                                whileInView={{ scale: 1, rotate: 0 }}
                                viewport={{ once: true }}
                                transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
                                className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-20 h-20 bg-background border-4 border-white/10 rounded-2xl items-center justify-center z-10 shadow-2xl group overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent opacity-10 group-hover:opacity-100 transition-opacity" />
                                <item.icon className="text-white relative z-10 group-hover:scale-110 transition-transform" size={32} />
                            </motion.div>

                            <div className="md:w-[45%] hidden md:block"></div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Expertises Section */}
            <section className="container mx-auto px-6 mb-24 md:mb-48 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 md:mb-24"
                >
                    <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Notre Catalogue</span>
                    <h2 className="text-3xl md:text-7xl font-serif font-bold text-white mb-6">Nos Expertises <span className="text-primary italic">Majeures</span></h2>
                    <p className="text-gray-300 max-w-xl mx-auto text-lg">Des services d'élite conçus pour propulser chaque aspect de votre présence de marque.</p>
                </motion.div>

                {/* Consulting Highlight */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 group cursor-pointer"
                    onClick={() => navigate('/services/consulting')}
                >
                    <div className="bg-surface/20 backdrop-blur-2xl border border-primary/20 rounded-[3rem] p-10 md:p-16 relative overflow-hidden shadow-2xl transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-[0_0_50px_rgba(255,215,0,0.15)]">
                        <div className="absolute top-0 right-0 p-8">
                            <span className="bg-primary text-black font-black uppercase text-[10px] tracking-widest px-4 py-2 rounded-full shadow-lg">⭐ Cœur de métier</span>
                        </div>
                        <div className="flex flex-col lg:flex-row items-center gap-12 relative z-10">
                            <motion.div
                                whileHover={{ rotate: 5, scale: 1.05 }}
                                className="bg-primary/20 w-32 h-32 rounded-[2rem] shrink-0 flex items-center justify-center border border-primary/30 shadow-[0_0_40px_rgba(255,215,0,0.1)]"
                            >
                                <MessageSquare size={56} className="text-primary" />
                            </motion.div>
                            <div className="text-center lg:text-left">
                                <h3 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 tracking-tight">Consulting en Communication</h3>
                                <p className="text-gray-300 text-xl mb-10 max-w-3xl leading-relaxed">Le socle de votre succès. Nous ne nous contentons pas de communiquer, nous bâtissons l'influence stratégique qui transformera votre business.</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {[
                                        "Audit & diagnostic 360°",
                                        "Stratégie de réputation",
                                        "Positionnement de marque",
                                        "Accompagnement Executive",
                                        "Ingénierie de contenu",
                                        "Plan de continuité digital"
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 bg-white/5 px-5 py-4 rounded-2xl border border-white/5 hover:border-primary/30 transition-all cursor-default group/item">
                                            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center group-hover/item:scale-110 transition-transform">
                                                <CheckCircle size={14} className="text-primary" />
                                            </div>
                                            <span className="text-sm font-bold text-gray-300">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {/* Blob */}
                        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
                    </div>
                </motion.div>

                {/* Grid for other expertises - Horizontal on Mobile */}
                <div
                    className="flex overflow-x-auto snap-x snap-mandatory pt-12 pb-8 gap-5 px-6 md:px-0 scrollbar-hide md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-10 md:pb-0 md:overflow-visible"
                    onScroll={(e) => handleScroll(e, setActiveExpertise)}
                >
                    {standardExpertises.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -15, scale: 1.02 }}
                            className="min-w-[85vw] snap-center md:min-w-0 bg-surface/30 backdrop-blur-xl rounded-[2.5rem] border border-white/5 overflow-hidden hover:border-primary/20 transition-all duration-500 flex flex-col h-full group relative shadow-xl cursor-pointer"
                            onClick={() => navigate(service.link || '/contact')}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
                            <div className="p-6 md:p-10 flex-1 relative z-10">
                                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-8 border border-white/10 group-hover:bg-primary/20 transition-all group-hover:rotate-12 group-hover:scale-110">
                                    <service.icon size={28} className="text-white group-hover:text-primary transition-colors" />
                                </div>
                                <div className="text-white font-black text-6xl mb-2 opacity-[0.03] absolute top-8 right-8 font-serif select-none">{index + 1}</div>

                                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{service.title}</h3>
                                <p className="text-gray-300 text-sm mb-8 leading-relaxed line-clamp-2">{service.description}</p>

                                <ul className="space-y-4 mb-8">
                                    {service.items.map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-[13px] text-gray-300 group/li">
                                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0 group-hover/li:scale-150 transition-transform shadow-[0_0_8px_rgba(255,215,0,0.5)]" />
                                            <span className="leading-tight">{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                {service.extra && (
                                    <div className="bg-white/5 px-4 py-3 rounded-xl border border-white/5 mb-2">
                                        <p className="text-[10px] text-gray-300 italic font-medium leading-none">{service.extra}</p>
                                    </div>
                                )}
                            </div>
                            <div className="p-2 pt-0">
                                <Button
                                    variant="outline"
                                    className="w-full border-none bg-white/5 hover:bg-primary hover:text-black rounded-2xl h-12 font-bold transition-all text-xs uppercase tracking-widest"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(service.link || '/contact');
                                    }}
                                >
                                    {service.cta}
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </div>
                {/* Pagination Dots for Expertises (Mobile Only) */}
                <div className="flex md:hidden justify-center gap-2 mt-2">
                    {standardExpertises.map((_, i) => (
                        <div
                            key={i}
                            className={`h-1.5 rounded-full transition-all duration-300 ${activeExpertise === i ? "w-6 bg-accent" : "w-1.5 bg-white/20"}`}
                        />
                    ))}
                </div>
            </section>

            {/* Differentiators */}
            <section className="py-32 relative z-10 mb-48">
                {/* Bg highlight overlay */}
                <div className="absolute inset-x-0 top-0 h-[800px] bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-24"
                    >
                        <span className="text-primary font-bold tracking-[0.2em] uppercase text-[10px] mb-4 block">L'Exclusivité LOLLY</span>
                        <h2 className="text-4xl md:text-6xl font-serif font-bold text-white tracking-tight">
                            Pourquoi nous, <span className="text-primary italic">vraiment</span> ?
                        </h2>
                    </motion.div>

                    <div
                        className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 px-6 md:px-0 scrollbar-hide md:grid md:grid-cols-3 lg:grid-cols-5 md:overflow-visible"
                        onScroll={(e) => handleScroll(e, setActiveDiff)}
                    >
                        {[
                            { icon: HeartHandshake, title: "Co-Création", desc: "Immersion totale dans vos enjeux. Nous devenons votre département com interne." },
                            { icon: Target, title: "Impact Data", desc: "Zéro vanité. Nous traquons les indicateurs réels de croissance et conversion." },
                            { icon: Rocket, title: "Vitesse Tech", desc: "Intelligence Artificielle et workflows agiles pour un time-to-market record." },
                            { icon: BookOpen, title: "Mentorat", desc: "Nous ne gardons pas nos secrets. Nous formons vos équipes pour l'autonomie." },
                            { icon: Award, title: "Elite Locale", desc: "Ambition mondiale couplée à une connaissance intime du marché sénégalais." }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -10, scale: 1.02 }}
                                className="min-w-[80vw] snap-center md:min-w-0 bg-surface/20 backdrop-blur-xl p-8 rounded-[2rem] border border-white/5 hover:border-primary/30 transition-all duration-500 group text-center flex flex-col items-center"
                            >
                                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-all">
                                    <item.icon size={28} className="text-primary" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-3 tracking-tight">{item.title}</h3>
                                <p className="text-gray-300 text-[13px] leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                    {/* Pagination Dots for Differentiators (Mobile Only) */}
                    <div className="flex md:hidden justify-center gap-2 mt-4">
                        {[0, 1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className={`h-1.5 rounded-full transition-all duration-300 ${activeDiff === i ? "w-6 bg-primary" : "w-1.5 bg-white/20"}`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Results Section */}
            <section className="container mx-auto px-6 mb-48 relative z-10">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mb-24 text-center"
                >
                    <span className="text-primary font-bold tracking-[0.2em] uppercase text-[10px] mb-4 block">Performance Mesurée</span>
                    <h2 className="text-4xl md:text-7xl font-serif font-bold text-white tracking-tight">
                        Quelques <span className="italic">Victoires</span>
                    </h2>
                </motion.div>

                <div
                    className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 px-6 md:px-0 scrollbar-hide md:grid md:grid-cols-3 md:gap-10 md:overflow-visible max-w-6xl mx-auto"
                    onScroll={(e) => handleScroll(e, setActiveResult)}
                >
                    {[
                        { val: "+450%", label: "Notoriété Digitale", desc: "Campagne 360° pour une institution publique.", color: "primary" },
                        { val: "+180%", label: "Conversion Leads", desc: "Refonte d'identité et stratégie ads pour une PME.", color: "accent" },
                        { val: "85%", label: "Gain d'Autonomie", desc: "Efficacité post-formation des équipes marketing.", color: "secondary" }
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2, type: "spring", stiffness: 100 }}
                            whileHover={{ y: -10 }}
                            className={`min-w-[85vw] snap-center md:min-w-0 p-12 bg-surface/30 backdrop-blur-2xl border border-white/10 rounded-[3rem] relative overflow-hidden group shadow-2xl`}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
                            <div className="relative z-10">
                                <motion.div
                                    initial={{ y: 20 }}
                                    whileInView={{ y: 0 }}
                                    className="text-6xl font-black text-white mb-4 tracking-tighter"
                                >
                                    {stat.val}
                                </motion.div>
                                <div className={`text-primary font-black uppercase tracking-[0.2em] text-[10px] mb-6 block`}>{stat.label}</div>
                                <p className="text-gray-300 text-sm leading-relaxed">{stat.desc}</p>
                            </div>
                            {/* Inner Glow */}
                            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/10 rounded-full blur-[50px] pointer-events-none" />
                        </motion.div>
                    ))}
                </div>
                {/* Pagination Dots for Results (Mobile Only) */}
                <div className="flex md:hidden justify-center gap-2 mt-4">
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            className={`h-1.5 rounded-full transition-all duration-300 ${activeResult === i ? "w-6 bg-primary" : "w-1.5 bg-white/20"}`}
                        />
                    ))}
                </div>
            </section>

            {/* FAQ Section */}
            <section className="container mx-auto px-6 mb-48 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-24"
                >
                    <span className="text-primary font-bold tracking-[0.2em] uppercase text-[10px] mb-4 block">Questions Fréquentes</span>
                    <h2 className="text-4xl md:text-6xl font-serif font-bold text-white tracking-tight">
                        Tout savoir sur <span className="text-primary italic">notre approche</span>
                    </h2>
                </motion.div>

                <div className="max-w-3xl mx-auto space-y-4">
                    <FAQItem
                        q="Comment débute une collaboration avec LOLLY ?"
                        a="Tout commence par une consultation stratégique offerte. Nous analysons vos besoins réels avant de vous proposer une roadmap personnalisée."
                    />
                    <FAQItem
                        q="Proposez-vous des formations sur mesure ?"
                        a="Absolument. Nos modules Digital Skills sont adaptés au niveau de vos équipes et aux spécificités de votre secteur d'activité."
                    />
                    <FAQItem
                        q="Quels sont vos délais habituels ?"
                        a="Pour un branding complet, comptez 3 à 5 semaines. Pour une production vidéo institutionnelle, entre 2 et 4 semaines selon l'envergure."
                    />
                    <FAQItem
                        q="Accompagnez-vous vos clients sur le long terme ?"
                        a="Oui, nous proposons des forfaits d'accompagnement mensuels pour le consulting stratégique et la gestion des réseaux sociaux."
                    />
                </div>
            </section>

            {/* Final CTA Section */}
            {/* Comprehensive Catalogue Section */}
            <section className="container mx-auto px-6 mb-48 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-24"
                >
                    <span className="text-primary font-bold tracking-[0.2em] uppercase text-[10px] mb-4 block">Catalogue Exhaustif</span>
                    <h2 className="text-4xl md:text-8xl font-serif font-bold text-white mb-6">37 Services d'exception à <span className="text-primary italic">votre service</span></h2>
                    <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
                        Parce que votre marque mérite une expertise chirurgicale dans chaque domaine de la communication moderne.
                    </p>
                </motion.div>

                <div className="md:hidden flex overflow-x-auto gap-2 pb-8 scrollbar-hide px-6 -mx-6">
                    {[
                        "Stratégie", "Design", "Vidéos", "Social", "Contenu", "Formations", "Events"
                    ].map((tab, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveCatalogue(i)}
                            className={`whitespace-nowrap px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${activeCatalogue === i
                                ? "bg-primary text-black"
                                : "bg-white/5 text-gray-300 border border-white/10"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {[
                        { cat: "Stratégie & Conseil", list: ["Audit image", "Audit digital", "Diagnostic comm", "Stratégie 360", "Plan de comm", "Positionnement", "Accompagnement Executive"] },
                        { cat: "Identité & Design", list: ["Logo & Charte", "Supports Print", "Webdesign UI/UX", "Packaging", "Signalétique", "Design Event"] },
                        { cat: "Photos & Vidéos", list: ["Film Corporate", "Spot TV/Web", "Motion Design", "Reportage photo", "Packshot produit", "Live Streaming"] },
                        { cat: "Digital & Social", list: ["Social Media Strat", "Community Management", "Social Ads", "E-réputation", "Influence Marketing", "Newsletters"] },
                        { cat: "Contenu & Écrit", list: ["Storytelling", "Rédaction Web SEO", "Scriptwriting", "Copywriting", "Articles de blog", "Livre Blanc"] },
                        { cat: "Formations Pro", list: ["Marketing Digital", "Outils IA", "Vente & Négociation", "Prise de parole", "Design Graphique", "Montage Vidéo"] },
                        { cat: "Événementiel", list: ["Lancement de marque", "Relations Presse", "Organisation séminaire"] }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            className={`space-y-6 group ${isMobile && activeCatalogue !== i ? "hidden" : "block"}`}
                        >
                            <h3 className="text-primary font-black uppercase tracking-widest text-xs border-b border-primary/20 pb-4 group-hover:border-primary transition-colors">{item.cat}</h3>
                            <ul className="space-y-3">
                                {item.list.map((service, j) => (
                                    <li key={j} className="text-gray-500 hover:text-white text-sm transition-colors cursor-default border-l border-white/5 pl-4 hover:border-primary">
                                        {service}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section className="container mx-auto px-6 mb-24 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-gray-900 to-black p-12 md:p-24 rounded-[4rem] border border-white/10 shadow-3xl text-center relative overflow-hidden group"
                >
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    <div className="relative z-10">
                        <span className="bg-primary/20 text-primary font-bold tracking-[0.2em] uppercase text-[10px] px-4 py-1.5 rounded-full mb-8 inline-block border border-primary/20">Parlons Avenir</span>
                        <h2 className="text-4xl md:text-7xl font-serif font-bold text-white mb-8 tracking-tight leading-tight">
                            Prêt à bousculer <br /> votre <span className="text-primary italic">marché</span> ?
                        </h2>
                        <p className="text-gray-300 mb-12 max-w-2xl mx-auto text-xl leading-relaxed">
                            Nous offrons une heure de consultation stratégique aux marques ambitieuses. Analysons ensemble votre potentiel.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Button
                                size="lg"
                                className="h-16 px-12 text-lg font-black rounded-2xl shadow-xl shadow-primary/20"
                                onClick={() => handleContactClick()}
                            >
                                Réserver mon créneau
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="h-16 px-12 text-lg font-bold rounded-2xl border-white/20 hover:bg-white/5 backdrop-blur-md"
                                onClick={() => window.location.href = 'mailto:contact@lolly.sn'}
                            >
                                Nous écrire
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

// Extracted FAQItem to handle internal state cleaner
const FAQItem = ({ q, a }: { q: string, a: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-surface/30 backdrop-blur-md rounded-3xl border border-white/5 overflow-hidden"
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-8 text-left flex justify-between items-center group"
            >
                <span className="text-lg font-bold text-white group-hover:text-primary transition-colors">{q}</span>
                <ChevronDown
                    size={20}
                    className={`text-primary transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                    >
                        <div className="px-8 pb-8 text-gray-300 leading-relaxed text-sm">
                            {a}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Services;
