import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Video, ArrowRight, Play, Film, Camera, Clapperboard, Monitor, Mic, Settings, Search, Edit } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";

const ProductionVideo = () => {
    const navigate = useNavigate();

    // Carousel state
    const [activeIndexes, setActiveIndexes] = useState([0, 0, 0, 0]);

    const equipment = [
        {
            icon: Camera,
            title: "Blackmagic 6K Pro",
            category: "Caméras",
            detail: "2x 6K PRO, DZO Film, SSD, V-Mount",
            images: [
                "https://images.unsplash.com/photo-1574717024458-388ee71c178d?auto=format&fit=crop&q=80&w=1200",
                "https://images.unsplash.com/photo-1581591524425-c7e0978865fc?auto=format&fit=crop&q=80&w=1200",
                "https://images.unsplash.com/photo-1599021419847-d8a7a6aba5b4?auto=format&fit=crop&q=80&w=1200"
            ]
        },
        {
            icon: Settings,
            title: "Éclairage Aputure",
            category: "Lumière",
            detail: "Amaran 150c/60c, Softbox, Hexa",
            images: [
                "https://images.unsplash.com/photo-1543039625-14bc3f99056d?auto=format&fit=crop&q=80&w=1200",
                "https://images.unsplash.com/photo-1621619856624-42fd07b94998?auto=format&fit=crop&q=80&w=1200",
                "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?auto=format&fit=crop&q=80&w=1200"
            ]
        },
        {
            icon: Mic,
            title: "Zoom F8N / NTG3+",
            category: "Audio",
            detail: "Lark K2, Blimp, Micro Podcast, Perche",
            images: [
                "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=1200",
                "https://images.unsplash.com/photo-1595066117565-98cc78fb5737?auto=format&fit=crop&q=80&w=1200",
                "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=1200"
            ]
        },
        {
            icon: Monitor,
            title: "Station i9 14900",
            category: "Post-Prod",
            detail: "RTX 4090, 128GB RAM, 70TB, OLED G9",
            images: [
                "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200",
                "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&q=80&w=1200",
                "https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&q=80&w=1200"
            ]
        }
    ];

    const nextImage = (index: number) => {
        const newIndexes = [...activeIndexes];
        newIndexes[index] = (newIndexes[index] + 1) % equipment[index].images.length;
        setActiveIndexes(newIndexes);
    };

    const prevImage = (index: number) => {
        const newIndexes = [...activeIndexes];
        newIndexes[index] = (newIndexes[index] - 1 + equipment[index].images.length) % equipment[index].images.length;
        setActiveIndexes(newIndexes);
    };

    const handleDragEnd = (_e: any, { offset, velocity }: any, index: number) => {
        const swipeConfidenceThreshold = 10000;
        const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity;
        const swipe = swipePower(offset.x, velocity.x);

        if (swipe < -swipeConfidenceThreshold) {
            nextImage(index);
        } else if (swipe > swipeConfidenceThreshold) {
            prevImage(index);
        }
    };

    const handleContact = () => {
        if (window.innerWidth < 768) {
            navigate('/contact?subject=Production Vidéo / Photo');
        } else {
            window.dispatchEvent(new CustomEvent('open-contact-modal', { detail: { subject: 'Production Vidéo / Photo' } }));
        }
    };

    return (
        <div className="pt-24 md:pt-40 pb-20 px-4 md:px-6 min-h-screen relative overflow-hidden bg-black text-white">
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute bottom-[20%] right-[-5%] w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[120px]" />
                <div className="absolute top-[10%] left-[20%] w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px]" />
            </div>

            <div className="container mx-auto max-w-6xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16 md:mb-24"
                >
                    <span className="bg-red-500/10 text-red-500 font-bold tracking-[0.2em] uppercase text-xs px-4 py-2 rounded-full mb-6 inline-block border border-red-500/20">Studio Créatif</span>
                    <h1 className="text-4xl md:text-7xl font-serif font-bold mb-8 tracking-tight">
                        Production <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 italic">Vidéo</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                        L'image en mouvement a le pouvoir de captiver, d'émouvoir et de convaincre en quelques secondes. Nous racontons votre histoire.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mb-20 md:mb-32 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold mb-6">De l'idée à <span className="text-red-500">l'écran</span></h2>
                        <div className="space-y-6">
                            <p className="text-gray-400 leading-relaxed">
                                Que ce soit pour un spot publicitaire TV, une vidéo corporate ou du contenu snackable pour TikTok et Instagram, nous maîtrisons toute la chaîne de production.
                            </p>
                            <p className="text-gray-400 leading-relaxed">
                                Écriture de scénario, casting, tournage 4K/6K, montage dynamique, color grading, motion design... Rien n'est laissé au hasard pour un rendu cinématographique.
                            </p>
                        </div>
                        <Button
                            className="mt-8 bg-white text-black hover:bg-red-600 hover:text-white rounded-full px-8 py-6 text-sm font-bold tracking-widest uppercase transition-all"
                            onClick={() => navigate('/portfolio')}
                        >
                            Voir nos réalisations
                        </Button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    >
                        {[
                            { icon: Film, title: "Qualité Cinéma", desc: "Caméras cinéma numériques et optiques prime." },
                            { icon: Clapperboard, title: "Scénarisation", desc: "Storyboarding et direction artistique pointue." },
                            { icon: Camera, title: "Équipe Pro", desc: "Réalisateurs, cadreurs et ingé sons chevronnés." },
                            { icon: Play, title: "Post-Prod", desc: "Montage, étalonnage et effets spéciaux." }
                        ].map((item, i) => (
                            <div key={i} className="bg-surface/20 backdrop-blur-md p-6 rounded-2xl border border-white/5 hover:border-red-500/30 transition-all group">
                                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-4 group-hover:bg-red-500/20 transition-colors">
                                    <item.icon className="text-white group-hover:text-red-500" size={24} />
                                </div>
                                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-400">{item.desc}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Technical Arsenal - Full Width and Highly Visible */}
                <div className="mb-20 md:mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">Notre <span className="text-red-500 italic">Arsenal</span> Technique</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
                            Nous utilisons les meilleurs outils du marché pour garantir une qualité d'image irréprochable et un rendu cinématographique.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {equipment.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white/5 rounded-[3rem] border border-white/10 overflow-hidden group flex flex-col shadow-2xl relative"
                            >
                                <div className="aspect-video md:aspect-[16/10] relative overflow-hidden bg-gray-900 border-b border-white/10">
                                    <AnimatePresence mode="wait">
                                        <motion.img
                                            key={activeIndexes[i]}
                                            src={item.images[activeIndexes[i]]}
                                            alt={item.title}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.4 }}
                                            drag="x"
                                            dragConstraints={{ left: 0, right: 0 }}
                                            dragElastic={0.2}
                                            onDragEnd={(e, { offset, velocity }) => handleDragEnd(e, { offset, velocity }, i)}
                                            className="w-full h-full object-cover cursor-grab active:cursor-grabbing"
                                        />
                                    </AnimatePresence>

                                    {/* Navigation Arrows */}
                                    <button
                                        onClick={(e) => { e.stopPropagation(); prevImage(i); }}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 z-20"
                                    >
                                        <ArrowRight className="rotate-180" size={20} />
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); nextImage(i); }}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 z-20"
                                    >
                                        <ArrowRight size={20} />
                                    </button>

                                    {/* Dots */}
                                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                                        {item.images.map((_, dotIdx) => (
                                            <div
                                                key={dotIdx}
                                                className={`w-2 h-2 rounded-full transition-all ${dotIdx === activeIndexes[i] ? 'bg-red-600 w-6' : 'bg-white/30'}`}
                                            />
                                        ))}
                                    </div>

                                    <div className="absolute top-6 left-6 z-20">
                                        <div className="flex items-center gap-3 bg-red-600 px-5 py-2 rounded-full shadow-2xl scale-110">
                                            <item.icon size={18} className="text-white" />
                                            <span className="text-xs text-white font-black uppercase tracking-[0.2em]">{item.category}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8 md:p-10">
                                    <h4 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">{item.title}</h4>
                                    <p className="text-gray-400 text-base md:text-lg leading-relaxed font-medium">{item.detail}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Workflow Section */}
                <div className="mb-20 md:mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">La Méthode <span className="text-red-500 italic">Lolly</span></h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">Un processus fluide et structuré pour garantir un résultat d'exception.</p>
                    </motion.div>

                    <div className="space-y-4 max-w-4xl mx-auto">
                        {[
                            { step: "01", title: "Brief & Stratégie", desc: "Compréhension de vos objectifs, de votre cible et définition du concept créatif.", icon: Search },
                            { step: "02", title: "Pré-production", desc: "Écriture du script, storyboarding, repérages et planning de tournage.", icon: Edit },
                            { step: "03", title: "Production", desc: "Tournage avec notre équipe technique et direction artistique sur le plateau.", icon: Camera },
                            { step: "04", title: "Post-production & Livraison", desc: "Montage, étalonnage, mixage sonore et exports tous formats.", icon: Play }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex gap-4 md:gap-6 p-6 md:p-8 bg-surface/30 backdrop-blur-xl border border-white/10 rounded-[2rem] md:rounded-[2.5rem] group hover:bg-red-500/5 transition-all"
                            >
                                <div className="text-4xl md:text-5xl font-serif font-bold text-red-500/20 group-hover:text-red-500 transition-colors shrink-0">
                                    {item.step}
                                </div>
                                <div className="pt-2">
                                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="mb-20 md:mb-32">
                    <h2 className="text-2xl md:text-3xl font-serif font-bold mb-12 text-center">Nos formats vidéo</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {[
                            "Film Corporate / Institutionnel",
                            "Spot Publicitaire TV & Web",
                            "Interview & Reportage",
                            "Couverture Événementielle (Aftermovie)",
                            "Vidéos Courts Formats (Reels/TikTok)",
                            "Motion Design & Animation 2D/3D",
                            "Vidéos Produits & Packshot animés",
                            "Live Streaming Multi-caméras",
                            "Vidéos de Formation (E-learning)"
                        ].map((service, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5 hover:border-red-500/30 transition-all cursor-default"
                            >
                                <Video className="text-red-500 shrink-0" size={20} />
                                <span className="font-medium text-gray-300">{service}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="text-center bg-surface/30 backdrop-blur-xl p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] border border-white/10">
                    <h2 className="text-3xl font-bold mb-6">Un projet vidéo en tête ?</h2>
                    <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                        Discutons de votre scénario. Nous transformons vos idées en images percutantes.
                    </p>
                    <Button
                        size="lg"
                        className="rounded-full px-6 md:px-10 py-5 md:py-6 text-sm md:text-lg font-bold bg-red-600 text-white hover:bg-white hover:text-red-600 transition-all shadow-lg hover:shadow-red-500/20 whitespace-normal"
                        onClick={handleContact}
                    >
                        Lancer le tournage
                        <ArrowRight className="ml-2" size={18} />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductionVideo;
