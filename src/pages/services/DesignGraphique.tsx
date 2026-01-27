import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { PenTool, ArrowRight, Layers, Palette, Monitor, Type, Cpu, Sparkles, Search, RefreshCw, CheckCircle } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";

const DesignGraphique = () => {
    const navigate = useNavigate();

    const [activeIdx, setActiveIdx] = useState(0);

    const gallery = [
        {
            image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1200",
            title: "Le Laboratoire d'Idées",
            desc: "Un environnement conçu pour stimuler la créativité et l'innovation visuelle."
        },
        {
            image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1200",
            title: "Branding & Stratégie",
            desc: "Nous traduisons vos valeurs en langage visuel universel."
        },
        {
            image: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=1200",
            title: "Excellence Créative",
            desc: "Chaque pixel est pensé pour servir votre message et votre image."
        },
        {
            image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=1200",
            title: "Design Multi-supports",
            desc: "Une cohérence parfaite du print au digital pour une marque forte."
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
            navigate('/contact?subject=Design & Branding');
        } else {
            window.dispatchEvent(new CustomEvent('open-contact-modal', { detail: { subject: 'Design & Branding' } }));
        }
    };

    return (
        <div className="pt-24 md:pt-40 pb-20 px-4 md:px-6 min-h-screen relative overflow-hidden bg-black text-white">
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto max-w-6xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16 md:mb-24"
                >
                    <span className="bg-purple-500/10 text-purple-400 font-bold tracking-[0.2em] uppercase text-xs px-4 py-2 rounded-full mb-6 inline-block border border-purple-500/20">Identité Visuelle</span>
                    <h1 className="text-4xl md:text-7xl font-serif font-bold mb-8 tracking-tight">
                        Design <span className="text-purple-400 italic">Graphique</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                        Le design n'est pas juste "joli". C'est l'interface entre votre marque et le monde. Nous créons des identités qui marquent les esprits.
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
                            { icon: Palette, title: "Créativité Pure", desc: "Des concepts originaux, loin des banques d'images." },
                            { icon: Layers, title: "Cohérence", desc: "Une charte graphique déclinable sur tous supports." },
                            { icon: Monitor, title: "UI/UX Design", desc: "Des expériences web et mobiles intuitives." },
                            { icon: Type, title: "Typographie", desc: "Le choix des mots, mais surtout de leur forme." }
                        ].map((item, i) => (
                            <div key={i} className="bg-surface/20 backdrop-blur-md p-6 rounded-2xl border border-white/5 hover:border-purple-500/30 transition-all group">
                                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
                                    <item.icon className="text-white group-hover:text-purple-400" size={24} />
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
                        <h2 className="text-3xl font-bold mb-6">Sublimer pour <span className="text-purple-400">convaincre</span></h2>
                        <div className="space-y-6">
                            <p className="text-gray-400 leading-relaxed">
                                Votre logo est souvent le premier contact qu'un client a avec vous. Il doit inspirer confiance, professionnalisme et modernité.
                            </p>
                            <p className="text-gray-400 leading-relaxed">
                                Nos directeurs artistiques ne font pas que dessiner, ils traduisent vos valeurs en langage visuel universel. Du print au digital, nous assurons une cohérence parfaite de votre image de marque.
                            </p>
                        </div>
                        <Button
                            className="mt-8 bg-white text-black hover:bg-purple-500 hover:text-white rounded-full px-8 py-6 text-sm font-bold tracking-widest uppercase transition-all"
                            onClick={() => navigate('/portfolio')}
                        >
                            Voir notre portfolio
                        </Button>
                    </motion.div>
                </div>

                {/* Creative Space Carousel */}
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
                                            <span key={i} className="text-purple-400 italic">{word}</span> : word + ' '
                                    )}
                                </h2>
                                <p className="text-gray-300 max-w-xl text-base md:text-lg">{gallery[activeIdx].desc}</p>
                            </motion.div>
                        </div>

                        {/* Arrows */}
                        <div className="absolute top-1/2 -translate-y-1/2 left-6 right-6 flex justify-between z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={prevSlide}
                                className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-purple-500 transition-colors"
                            >
                                <ArrowRight className="rotate-180" size={20} />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-purple-500 transition-colors"
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
                                    className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIdx ? 'w-12 bg-purple-500' : 'w-4 bg-white/20'}`}
                                />
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Tech Stack Section */}
                <div className="mb-20 md:mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">Notre <span className="text-purple-400 italic">Tech Stack</span></h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">Les meilleurs outils pour une exécution chirurgicale.</p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {[
                            { icon: Palette, title: "Adobe CC", category: "Design Pro" },
                            { icon: Layers, title: "Figma", category: "UI/UX & Collab" },
                            { icon: Monitor, title: "Cinema 4D", category: "Modélisation 3D" },
                            { icon: Sparkles, title: "Midjourney", category: "Concept Art AI" },
                            { icon: Cpu, title: "Tablettes Wacom", category: "Illustration" }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="bg-white/5 p-6 rounded-3xl border border-white/10 text-center hover:bg-purple-500/10 transition-all group"
                            >
                                <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                    <item.icon className="text-purple-400" size={24} />
                                </div>
                                <h3 className="font-bold text-white mb-1 text-sm">{item.title}</h3>
                                <p className="text-[9px] uppercase tracking-widest text-gray-500 font-bold">{item.category}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Process Section */}
                <div className="mb-20 md:mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">Le Process <span className="text-purple-400 italic">Créatif</span></h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">Une méthodologie rigoureuse pour des visuels qui convertissent.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { step: "01", title: "Audit & Brief", desc: "Analyse de votre marque et de vos attentes.", icon: Search },
                            { step: "02", title: "Exploration", desc: "Moodboards, croquis et directions créatives.", icon: Palette },
                            { step: "03", title: "Conception", desc: "Design haute fidélité et itérations graphiques.", icon: RefreshCw },
                            { step: "04", title: "Livraison", desc: "Fichiers sources et guide d'utilisation.", icon: CheckCircle }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-10 md:p-8 bg-surface/30 backdrop-blur-xl border border-white/5 rounded-[2rem] group hover:border-purple-500/30 transition-all"
                            >
                                <div className="text-4xl font-serif font-bold text-purple-500/10 mb-6 group-hover:text-purple-400 transition-colors">
                                    {item.step}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="mb-20 md:mb-32">
                    <h2 className="text-2xl md:text-3xl font-serif font-bold mb-12 text-center">Tout ce que nous créons</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {[
                            "Création de Logo & Rebranding",
                            "Charte Graphique Complète",
                            "Supports Print (Cartes, Brochures, Flyers)",
                            "Design Web & Maquettes (UI/UX)",
                            "Visuels Réseaux Sociaux",
                            "Présentations PowerPoint / Keynote (Pitch Deck)",
                            "Design de Packaging",
                            "Signalétique & Habillage de stand",
                            "Illustrations sur mesure"
                        ].map((service, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5 hover:border-purple-500/30 transition-all cursor-default"
                            >
                                <PenTool className="text-purple-400 shrink-0" size={20} />
                                <span className="font-medium text-gray-300">{service}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="text-center bg-surface/30 backdrop-blur-xl p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] border border-white/10">
                    <h2 className="text-3xl font-bold mb-6">Votre image a besoin d'un refresh ?</h2>
                    <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                        Donnez un coup de jeune à votre marque avec une identité visuelle forte et mémorable.
                    </p>
                    <Button
                        size="lg"
                        className="rounded-full px-6 md:px-10 py-5 md:py-6 text-sm md:text-lg font-bold bg-purple-500 text-white hover:bg-white hover:text-purple-500 transition-all shadow-lg hover:shadow-purple-500/20 whitespace-normal"
                        onClick={handleContact}
                    >
                        Briefer nos créatifs
                        <ArrowRight className="ml-2" size={18} />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DesignGraphique;
