import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Users, ArrowRight, MessageCircle, Heart, Share2, TrendingUp, Calendar, BarChart3, ShieldCheck, Zap, Search, Layout, PenTool, PieChart } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";

const CommunityManagement = () => {
    const navigate = useNavigate();

    const [activeIdx, setActiveIdx] = useState(0);

    const gallery = [
        {
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200",
            title: "Au cœur de la Tendance",
            desc: "Nos community managers travaillent dans un environnement dynamique pour propulser votre marque."
        },
        {
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
            title: "Data & Performance",
            desc: "Nous analysons chaque interaction pour optimiser votre croissance sociale."
        },
        {
            image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=1200",
            title: "Création de Contenu",
            desc: "Du storytelling visuel percutant adapté à chaque plateforme."
        },
        {
            image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1200",
            title: "Engagement Communautaire",
            desc: "Nous créons une véritable relation de confiance avec votre audience."
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
            navigate('/contact?subject=Community Management');
        } else {
            window.dispatchEvent(new CustomEvent('open-contact-modal', { detail: { subject: 'Community Management' } }));
        }
    };

    return (
        <div className="pt-24 md:pt-40 pb-20 px-4 md:px-6 min-h-screen relative overflow-hidden bg-black text-white">
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto max-w-6xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16 md:mb-24"
                >
                    <span className="bg-pink-500/10 text-pink-400 font-bold tracking-[0.2em] uppercase text-xs px-4 py-2 rounded-full mb-6 inline-block border border-pink-500/20">Social Media</span>
                    <h1 className="text-4xl md:text-7xl font-serif font-bold mb-8 tracking-tight">
                        Community <span className="text-pink-400 italic">Management</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                        Ne laissez pas vos réseaux sociaux dormir. Nous créons de l'engagement, de la conversation et in fine, du business.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mb-20 md:mb-32 items-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    >
                        {[
                            { icon: MessageCircle, title: "Modération", desc: "Réponses rapides aux commentaires et messages." },
                            { icon: Heart, title: "Engagement", desc: "Créer une vraie relation avec votre audience." },
                            { icon: Share2, title: "Viralité", desc: "Contenus pensés pour être partagés." },
                            { icon: TrendingUp, title: "Social Ads", desc: "Publicités ciblées pour plus de conversion." }
                        ].map((item, i) => (
                            <div key={i} className="bg-surface/20 backdrop-blur-md p-6 rounded-2xl border border-white/5 hover:border-pink-500/30 transition-all group">
                                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-4 group-hover:bg-pink-500/20 transition-colors">
                                    <item.icon className="text-white group-hover:text-pink-400" size={24} />
                                </div>
                                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-400">{item.desc}</p>
                            </div>
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold mb-6">Votre voix <span className="text-pink-400">digitalisée</span></h2>
                        <div className="space-y-6">
                            <p className="text-gray-400 leading-relaxed">
                                Être sur les réseaux sociaux ne suffit pas. Il faut y être stratégique. Nous définissons une ligne éditoriale claire qui reflète vos valeurs et attire vos clients idéaux.
                            </p>
                            <p className="text-gray-400 leading-relaxed">
                                Fini le stress de "quoi poster aujourd'hui ?". Nous planifions, créons et publions pour vous, tout en vous fournissant des rapports mensuels détaillés sur vos performances.
                            </p>
                        </div>
                        <Button
                            className="mt-8 bg-white text-black hover:bg-pink-500 hover:text-white rounded-full px-8 py-6 text-sm font-bold tracking-widest uppercase transition-all"
                            onClick={() => navigate('/contact')}
                        >
                            Déléguer mes réseaux
                        </Button>
                    </motion.div>
                </div>

                {/* Agency Life Carousel */}
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
                                            <span key={i} className="text-pink-400 italic">{word}</span> : word + ' '
                                    )}
                                </h2>
                                <p className="text-gray-300 max-w-xl text-base md:text-lg">{gallery[activeIdx].desc}</p>
                            </motion.div>
                        </div>

                        {/* Arrows */}
                        <div className="absolute top-1/2 -translate-y-1/2 left-6 right-6 flex justify-between z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={prevSlide}
                                className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-pink-500 transition-colors"
                            >
                                <ArrowRight className="rotate-180" size={20} />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-pink-500 transition-colors"
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
                                    className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIdx ? 'w-12 bg-pink-500' : 'w-4 bg-white/20'}`}
                                />
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Social Tech Section */}
                <div className="mb-20 md:mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">Notre <span className="text-pink-400 italic">Social Stack</span></h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">Précision, réactivité et data au cœur de notre gestion.</p>
                    </motion.div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: Calendar, title: "Buffer / Metricool", category: "Planification" },
                            { icon: BarChart3, title: "Ads Manager", category: "Publicité Meta" },
                            { icon: ShieldCheck, title: "Brandwatch", category: "Social Listening" },
                            { icon: Zap, title: "ManyChat", category: "Automatisation FAQ" }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="p-6 bg-white/5 rounded-3xl border border-white/5 hover:bg-pink-500/5 hover:border-pink-500/20 transition-all text-center"
                            >
                                <div className="w-12 h-12 bg-pink-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <item.icon className="text-pink-400" size={24} />
                                </div>
                                <h3 className="font-bold text-sm mb-1">{item.title}</h3>
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{item.category}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* The Workflow */}
                <div className="mb-20 md:mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">Cycle de <span className="text-pink-400 italic">Gestion</span></h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">Une méthode itérative pour une croissance constante.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
                        {[
                            { step: "01", title: "Curation & Veille", desc: "Analyse des tendances et de ce qui fait parler votre audience.", icon: Search },
                            { step: "02", title: "Calendrier Éditorial", desc: "Planification des contenus sur 30 jours pour une cohérence totale.", icon: Layout },
                            { step: "03", title: "Production & Publication", desc: "Création visuelle et textuelle optimisée pour chaque réseau.", icon: PenTool },
                            { step: "04", title: "Analyse & Optimisation", desc: "Rapport de performance et ajustements stratégiques mensuels.", icon: PieChart }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex gap-4 md:gap-6 p-6 md:p-8 bg-surface/30 backdrop-blur-xl border border-white/10 rounded-[2rem] md:rounded-[2.5rem] group hover:bg-pink-500/5 transition-all"
                            >
                                <div className="text-4xl md:text-5xl font-serif font-bold text-pink-500/20 group-hover:text-pink-400 transition-colors shrink-0">
                                    {item.step}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                    <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="mb-20 md:mb-32">
                    <h2 className="text-2xl md:text-3xl font-serif font-bold mb-12 text-center">Réseaux maîtrisés</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {[
                            "Instagram (Feed & Reels)",
                            "LinkedIn (B2B & Marque Employeur)",
                            "Facebook (Page entreprise)",
                            "TikTok (Tendances & Création)",
                            "Twitter / X (Veille & Réactivité)",
                            "Google Business Profile (SEO Local)",
                            "Campagnes Publicitaires (Meta Ads)",
                            "Marketing d'Influence",
                            "Reporting & Analytics Mensuel"
                        ].map((service, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5 hover:border-pink-500/30 transition-all cursor-default"
                            >
                                <Users className="text-pink-400 shrink-0" size={20} />
                                <span className="font-medium text-gray-300">{service}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="text-center bg-surface/30 backdrop-blur-xl p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] border border-white/10">
                    <h2 className="text-3xl font-bold mb-6">On booste votre visibilité ?</h2>
                    <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                        Choisissez le forfait qui vous convient et regardez votre communauté grandir.
                    </p>
                    <Button
                        size="lg"
                        className="rounded-full px-6 md:px-10 py-5 md:py-6 text-sm md:text-lg font-bold bg-pink-500 text-white hover:bg-white hover:text-pink-500 transition-all shadow-lg hover:shadow-pink-500/20 whitespace-normal"
                        onClick={handleContact}
                    >
                        Demander nos tarifs
                        <ArrowRight className="ml-2" size={18} />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CommunityManagement;
