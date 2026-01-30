import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { MessageSquare, CheckCircle, ArrowRight, Target, BarChart, Users, Search, ClipboardList, PenTool, TrendingUp } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";

const Consulting = () => {
    const navigate = useNavigate();

    const [activeIdx, setActiveIdx] = useState(0);

    const gallery = [
        {
            image: "/assets/Consulting/consulting01.webp",
            title: "Expertise Stratégique",
            desc: "Un accompagnement sur-mesure pour définir et sculpter votre identité de marque."
        },
        {
            image: "/assets/Consulting/consulting02.webp",
            title: "Vision Collaborative",
            desc: "Nous travaillons à vos côtés pour transformer vos ambitions en stratégies concrètes."
        }
    ];

    const nextSlide = () => setActiveIdx((prev) => (prev + 1) % gallery.length);
    const prevSlide = () => setActiveIdx((prev) => (prev - 1 + gallery.length) % gallery.length);

    const handleDragEnd = (_e: any, { offset, velocity }: any) => {
        const swipeConfidenceThreshold = 10000;
        const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity;
        const swipe = swipePower(offset.x, velocity.x);

        if (swipe < -swipeConfidenceThreshold) {
            nextSlide();
        } else if (swipe > swipeConfidenceThreshold) {
            prevSlide();
        }
    };

    const handleContact = () => {
        if (window.innerWidth < 768) {
            navigate('/contact?subject=Consulting Stratégique');
        } else {
            window.dispatchEvent(new CustomEvent('open-contact-modal', { detail: { subject: 'Consulting Stratégique' } }));
        }
    };

    return (
        <div className="pt-24 md:pt-40 pb-20 px-4 md:px-6 min-h-screen relative overflow-hidden bg-black text-white">
            {/* Background Elements */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto max-w-6xl relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16 md:mb-24"
                >
                    <span className="bg-primary/20 text-primary font-bold tracking-[0.2em] uppercase text-xs px-4 py-2 rounded-full mb-6 inline-block border border-primary/20">Cœur de métier</span>
                    <h1 className="text-4xl md:text-7xl font-serif font-bold mb-8 tracking-tight">
                        Consulting en <span className="text-primary italic">Communication</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Plus qu'un conseil, une vision. Nous structurons votre image pour qu'elle devienne votre meilleur levier de croissance.
                    </p>
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mb-20 md:mb-32 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold mb-6">Une approche <span className="text-primary">360°</span></h2>
                        <div className="space-y-6">
                            <p className="text-gray-300 leading-relaxed">
                                Dans un monde saturé d'informations, être visible ne suffit plus. Il faut être remarquable. Notre pôle consulting audite, analyse et redéfinit votre positionnement pour vous donner un avantage déloyal sur vos concurrents.
                            </p>
                            <p className="text-gray-300 leading-relaxed">
                                De la communication de crise à la stratégie de marque employeur, nous vous accompagnons sur les enjeux critiques qui définissent la pérennité de votre entreprise.
                            </p>
                        </div>
                        <Button
                            className="mt-8 bg-white text-black hover:bg-primary hover:text-black rounded-full px-8 py-6 text-sm font-bold tracking-widest uppercase transition-all"
                            onClick={() => navigate('/contact')}
                        >
                            Parler à un expert
                        </Button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    >
                        {[
                            { icon: Target, title: "Audit Stratégique", desc: "Diagnostic complet de votre existant." },
                            { icon: MessageSquare, title: "Stratégie de Marque", desc: "Définition de votre ADN et ton." },
                            { icon: Users, title: "Com' Interne", desc: "Fédérer vos équipes autour de la vision." },
                            { icon: BarChart, title: "Gestion de Crise", desc: "Protéger votre réputation." }
                        ].map((item, i) => (
                            <div key={i} className="bg-surface/20 backdrop-blur-md p-6 rounded-2xl border border-white/5 hover:border-primary/30 transition-all group">
                                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                                    <item.icon className="text-white group-hover:text-primary" size={24} />
                                </div>
                                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-300">{item.desc}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Strategy Atmosphere Carousel */}
                <div className="mb-20 md:mb-32">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative rounded-[3rem] overflow-hidden border border-white/10 group aspect-video md:aspect-[21/9] bg-gray-900 shadow-2xl"
                    >
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={activeIdx}
                                src={gallery[activeIdx].image}
                                srcSet={`${gallery[activeIdx].image.replace('.webp', '-400.webp')} 400w, ${gallery[activeIdx].image.replace('.webp', '-800.webp')} 800w, ${gallery[activeIdx].image.replace('.webp', '-1200.webp')} 1200w`}
                                sizes="100vw"
                                alt={gallery[activeIdx].title}
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05 }}
                                transition={{ duration: 0.8 }}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.2}
                                onDragEnd={handleDragEnd}
                                className="absolute inset-0 w-full h-full object-cover cursor-grab active:cursor-grabbing"
                            />
                        </AnimatePresence>

                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                        <div className="absolute bottom-10 md:bottom-12 left-8 md:left-12 right-8 md:right-12 z-10">
                            <motion.div
                                key={`content-${activeIdx}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <h2 className="text-2xl md:text-5xl font-serif font-bold mb-3 md:mb-4 uppercase tracking-tighter">
                                    {gallery[activeIdx].title.split(' ').map((word, i) =>
                                        i === gallery[activeIdx].title.split(' ').length - 1 ?
                                            <span key={i} className="text-primary italic">{word}</span> : word + ' '
                                    )}
                                </h2>
                                <p className="text-gray-300 max-w-xl text-base md:text-lg">{gallery[activeIdx].desc}</p>
                            </motion.div>
                        </div>

                        {/* Arrows */}
                        <div className="absolute top-1/2 -translate-y-1/2 left-6 right-6 flex justify-between z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={prevSlide}
                                className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:text-black transition-colors"
                            >
                                <ArrowRight className="rotate-180" size={20} />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:text-black transition-colors"
                            >
                                <ArrowRight size={20} />
                            </button>
                        </div>

                        {/* Indicators */}
                        <div className="absolute bottom-6 right-12 flex gap-3 z-20">
                            {gallery.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveIdx(i)}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIdx ? 'w-12 bg-primary' : 'w-4 bg-white/20'}`}
                                />
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Methodology / Frameworks */}
                <div className="mb-20 md:mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">Nos <span className="text-primary italic">Frameworks</span></h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">Des méthodologies éprouvées pour des résultats mesurables.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Audit SWOT 2.0", desc: "Analyse profonde des forces, faiblesses, opportunités et menaces dans l'écosystème digital actuel.", icon: Search },
                            { title: "Brand DNA Mapping", desc: "Extraction de l'essence de votre marque pour construire un positionnement unique.", icon: Target },
                            { title: "Data-Driven Strategy", desc: "Utilisation des données analytics pour piloter vos décisions de communication.", icon: BarChart }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 hover:bg-primary/5 hover:border-primary/20 transition-all text-center group"
                            >
                                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-6 transition-transform">
                                    <item.icon className="text-primary" size={32} />
                                </div>
                                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* The Process */}
                <div className="mb-20 md:mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">Le Processus <span className="text-primary italic">D'Accompagnement</span></h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">Une collaboration étroite pour une transformation durable.</p>
                    </motion.div>

                    <div className="space-y-6 max-w-4xl mx-auto">
                        {[
                            { step: "01", title: "Immersion", desc: "Phase d'écoute et d'analyse de votre environnement business.", icon: ClipboardList },
                            { step: "02", title: "Diagnostic", desc: "Identification des points de blocage et des leviers de croissance.", icon: Search },
                            { step: "03", title: "Recommandations", desc: "Élaboration de la stratégie de communication et du plan d'actions.", icon: PenTool },
                            { step: "04", title: "Suivi & Optimisation", desc: "Accompagnement dans le déploiement et mesure des KPIs.", icon: TrendingUp }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-8 p-8 bg-surface/30 backdrop-blur-xl border border-white/5 rounded-[2rem] hover:border-primary/30 transition-all text-center md:text-left"
                            >
                                <div className="text-4xl font-serif font-bold text-primary opacity-20">{item.step}</div>
                                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center shrink-0">
                                    <item.icon className="text-white" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                                    <p className="text-gray-400 text-sm">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Detailed Services */}
                <div className="mb-20 md:mb-32">
                    <h2 className="text-2xl md:text-3xl font-serif font-bold mb-12 text-center">Nos prestations détaillées</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {[
                            "Audit d'image & E-réputation",
                            "Plan de communication 360°",
                            "Plateforme de marque",
                            "Stratégie de contenu (Inbound)",
                            "Accompagnement du dirigeant",
                            "Communication RSE & Valeurs",
                            "Relations Presse & Publics",
                            "Lancement de produit/service",
                            "Copywriting stratégique"
                        ].map((service, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5 hover:border-primary/30 transition-all"
                            >
                                <CheckCircle className="text-primary shrink-0" size={20} />
                                <span className="font-medium text-gray-300">{service}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center bg-surface/30 backdrop-blur-xl p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] border border-white/10">
                    <h2 className="text-3xl font-bold mb-6">Prêt à passer au niveau supérieur ?</h2>
                    <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                        Ne laissez pas le hasard dicter votre image. Prenez le contrôle avec une stratégie éprouvée.
                    </p>
                    <Button
                        size="lg"
                        className="rounded-full px-6 md:px-10 py-5 md:py-6 text-sm md:text-lg font-bold bg-primary text-black hover:bg-white transition-all shadow-lg hover:shadow-primary/20 whitespace-normal"
                        onClick={handleContact}
                    >
                        Demander un audit gratuit
                        <ArrowRight className="ml-2" size={18} />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Consulting;
