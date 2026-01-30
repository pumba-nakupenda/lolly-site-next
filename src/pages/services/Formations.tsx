import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { BookOpen, ArrowRight, GraduationCap, Users, Award, Laptop, Zap, Globe, MessageSquare, ClipboardCheck, Sparkles } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";

const Formations = () => {
    const navigate = useNavigate();

    const [activeIdx, setActiveIdx] = useState(0);

    const gallery = [
        {
            image: "/assets/Formations/formation01.webp",
            title: "Immersion & Pratique",
            desc: "Apprenez dans des conditions réelles avec nos sessions intensives de prise de parole."
        },
        {
            image: "/assets/Formations/formation02.webp",
            title: "Coaching Personnalisé",
            desc: "Bénéficiez de l'expertise de nos formateurs seniors certifiés."
        },
        {
            image: "/assets/Formations/formation03.webp",
            title: "L'équipe Lolly Academy",
            desc: "Une équipe passionnée dédiée à votre montée en compétences digitale."
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
            navigate('/contact?subject=Formation Digitale Pro');
        } else {
            window.dispatchEvent(new CustomEvent('open-contact-modal', { detail: { subject: 'Formation Digitale Pro' } }));
        }
    };

    return (
        <div className="pt-24 md:pt-40 pb-20 px-4 md:px-6 min-h-screen relative overflow-hidden bg-black text-white">
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px]" />
                <div className="absolute top-[40%] right-[-10%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto max-w-6xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16 md:mb-24"
                >
                    <span className="bg-indigo-500/20 text-indigo-400 font-bold tracking-[0.2em] uppercase text-xs px-4 py-2 rounded-full mb-6 inline-block border border-indigo-500/20">Lolly Academy</span>
                    <h1 className="text-4xl md:text-7xl font-serif font-bold mb-8 tracking-tight">
                        Formations <span className="text-indigo-400 italic">Professionnelles</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Ne dépendez plus d'agences pour tout. Montez en compétence et maîtrisez les codes du digital en interne.
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
                            { icon: GraduationCap, title: "Certifiantes", desc: "Des cursus reconnus pour valider vos acquis." },
                            { icon: Laptop, title: "Pratique 100%", desc: "Pas de théorie inutile, du concret directement applicable." },
                            { icon: Users, title: "Intra-Entreprise", desc: "Formations sur-mesure dans vos locaux." },
                            { icon: Award, title: "Experts Métier", desc: "Formateurs séniors actifs sur le marché." }
                        ].map((item, i) => (
                            <div key={i} className="bg-surface/20 backdrop-blur-md p-6 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-all group">
                                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-500/20 transition-colors">
                                    <item.icon className="text-white group-hover:text-indigo-400" size={24} />
                                </div>
                                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-300">{item.desc}</p>
                            </div>
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold mb-6">L'autonomie est votre <span className="text-indigo-400">pouvoir</span></h2>
                        <div className="space-y-6">
                            <p className="text-gray-300 leading-relaxed">
                                Le digital évolue vite. Très vite. Nos formations sont mises à jour en permanence pour vous donner les clés des outils d'aujourd'hui et de demain.
                            </p>
                            <p className="text-gray-300 leading-relaxed">
                                Que vous soyez une équipe marketing souhaitant internaliser la création de contenu, ou un dirigeant voulant comprendre les leviers de sa croissance, nous avons le module adapté.
                            </p>
                        </div>
                        <Button
                            className="mt-8 bg-white text-black hover:bg-secondary hover:text-white rounded-full px-8 py-6 text-sm font-bold tracking-widest uppercase transition-all"
                            onClick={() => navigate('/contact')}
                        >
                            Voir le calendrier
                        </Button>
                    </motion.div>
                </div>

                {/* Training Environment Carousel */}
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
                                            <span key={i} className="text-indigo-400 italic">{word}</span> : word + ' '
                                    )}
                                </h2>
                                <p className="text-gray-300 max-w-xl text-base md:text-lg">{gallery[activeIdx].desc}</p>
                            </motion.div>
                        </div>

                        {/* Arrows */}
                        <div className="absolute top-1/2 -translate-y-1/2 left-6 right-6 flex justify-between z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={prevSlide}
                                className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-secondary transition-colors"
                            >
                                <ArrowRight className="rotate-180" size={20} />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-secondary transition-colors"
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
                                    className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIdx ? 'w-12 bg-indigo-500' : 'w-4 bg-white/20'}`}
                                />
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Pedagogical Tools Section */}
                <div className="mb-20 md:mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">Notre <span className="text-indigo-400 italic">Écosystème</span> Apprenant</h2>
                        <p className="text-gray-300 max-w-2xl mx-auto">Des outils modernes pour une immersion totale et une progression rapide.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            { icon: Globe, title: "Lolly Hub", desc: "Accès illimité à notre plateforme de ressources." },
                            { icon: Zap, title: "Live Coach", desc: "Sessions de questions/réponses en direct." },
                            { icon: MessageSquare, title: "Discord Privé", desc: "Une communauté d'entraide entre apprenants." },
                            { icon: Sparkles, title: "AI Labs", desc: "Ateliers pratiques sur les outils d'IA générative." }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white/5 p-8 rounded-[2rem] border border-white/5 hover:border-indigo-500/20 transition-all group"
                            >
                                <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <item.icon className="text-indigo-400" size={28} />
                                </div>
                                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-300 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Learning Journey Section */}
                <div className="mb-32">
                    <div className="bg-surface/30 backdrop-blur-xl border border-white/10 rounded-[3rem] p-10 md:p-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">Votre <span className="text-indigo-400 italic">Parcours</span> de Réussite</h2>
                            <p className="text-gray-300 max-w-2xl mx-auto">Une méthodologie structurée pour passer de novice à expert.</p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                            {/* Connector line for desktop */}
                            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-indigo-500/0 via-indigo-500/20 to-indigo-500/0 z-0" />

                            {[
                                { step: "01", title: "Diagnostic", desc: "Évaluation de votre niveau et de vos besoins.", icon: BookOpen },
                                { step: "02", title: "Action", desc: "Formation théorique et ateliers pratiques.", icon: Laptop },
                                { step: "03", title: "Validation", desc: "Mise en situation réelle et projet final.", icon: ClipboardCheck },
                                { step: "04", title: "Certification", desc: "Remise de votre attestation et suivi post-formation.", icon: Award }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.15 }}
                                    className="relative z-10 text-center"
                                >
                                    <div className="w-16 h-16 bg-black border border-white/10 rounded-full flex items-center justify-center mx-auto mb-6 group hover:border-indigo-500 transition-all shadow-xl">
                                        <item.icon className="text-indigo-400" size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mb-20 md:mb-32">
                    <h2 className="text-2xl md:text-3xl font-serif font-bold mb-12 text-center">Modules les plus demandés</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {[
                            "Community Management Avancé",
                            "Publicité Facebook & Instagram Ads",
                            "Création de contenu vidéo (Smartphone)",
                            "Design graphique sur Canva Pro & Photoshop",
                            "Copywriting & Storytelling",
                            "Stratégie de communication digitale",
                            "Prise de parole en public",
                            "Montage vidéo (Premiere Pro / CapCut)",
                            "SEO : Référencer son site web"
                        ].map((service, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5 hover:border-indigo-500/30 transition-all cursor-default"
                            >
                                <BookOpen className="text-indigo-400 shrink-0" size={20} />
                                <span className="font-medium text-gray-300">{service}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="text-center bg-surface/30 backdrop-blur-xl p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] border border-white/10">
                    <h2 className="text-3xl font-bold mb-6">Besoin d'un plan de formation sur-mesure ?</h2>
                    <p className="text-gray-300 mb-8 max-w-xl mx-auto">
                        Nous analysons les besoins de vos équipes et construisons un parcours pédagogique adapté à vos objectifs business.
                    </p>
                    <Button
                        size="lg"
                        className="rounded-full px-6 md:px-10 py-5 md:py-6 text-sm md:text-lg font-bold bg-indigo-500 text-white hover:bg-white hover:text-indigo-500 transition-all shadow-lg hover:shadow-indigo-500/20 whitespace-normal"
                        onClick={handleContact}
                    >
                        Contactez notre pôle formation
                        <ArrowRight className="ml-2" size={18} />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Formations;
