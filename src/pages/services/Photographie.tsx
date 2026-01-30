import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Image, ArrowRight, Camera, User, ShoppingBag, Sun, Layers, Zap, Search, CheckCircle } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";

const Photographie = () => {
    const navigate = useNavigate();

    // Carousel state
    const [activeIndexes, setActiveIndexes] = useState([0, 0, 0, 0]);

    const equipment = [
        {
            icon: Camera,
            title: "Sony A7III + G Master II",
            category: "Setup Principal",
            detail: "Full Frame, Optique F/2.8, Piqué Chirurgical & Bokeh Soyeux",
            images: [
                "/assets/Photo/sony_a7ii_01.webp",
                "/assets/Photo/gmaster_lens_01.webp",
                "/assets/Photo/sony_a7ii_02.webp"
            ]
        },
        {
            icon: Zap,
            title: "Godox V1 / AD600 BM2",
            category: "Éclairage",
            detail: "2x AD600 (Studio), V1 (Local), Speedlite",
            images: [
                "/assets/Photo/godox_v1_01.webp",
                "/assets/Photo/godox_v1_02.webp",
                "/assets/Photo/godox_s85_01.webp"
            ]
        },
        {
            icon: Layers,
            title: "Studio de Photo",
            category: "Espace",
            detail: "Cyclorama, Fonds Multi-couleurs, Diffusion",
            images: [
                "/assets/Photo/studio_01.webp",
                "/assets/Photo/studio_02.webp",
                "/assets/Photo/studio_03.webp"
            ]
        },
        {
            icon: ShoppingBag,
            title: "Table Photo Produit",
            category: "Packshot",
            detail: "Surface acrylique, Éclairage 360°, Macro",
            images: [
                "/assets/Photo/packshot_01.webp",
                "/assets/Photo/packshot_02.webp",
                "/assets/Photo/packshot_03.webp"
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
                <div className="absolute top-[30%] left-[30%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto max-w-6xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16 md:mb-24"
                >
                    <span className="bg-blue-500/10 text-blue-400 font-bold tracking-[0.2em] uppercase text-xs px-4 py-2 rounded-full mb-6 inline-block border border-blue-500/20">Studio Photo</span>
                    <h1 className="text-4xl md:text-7xl font-serif font-bold mb-8 tracking-tight">
                        Photographie <span className="text-blue-400 italic">Pro</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Une image vaut mille mots. Assurez-vous qu'elle dise les bons. Des visuels haute définition pour sublimer vos produits et équipes.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mb-20 md:mb-32 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold mb-6">L'art de <span className="text-blue-400">capter</span> l'instant</h2>
                        <div className="space-y-6">
                            <p className="text-gray-300 leading-relaxed">
                                Oubliez les photos ternes et mal éclairées. Notre studio mobile se déplace chez vous pour capturer l'essence de votre activité avec un matériel de pointe.
                            </p>
                            <p className="text-gray-300 leading-relaxed">
                                Que ce soit pour un catalogue e-commerce, des portraits LinkedIn ou un reportage événementiel, nous livrons des photos retouchées prêtes à l'emploi.
                            </p>
                        </div>
                        <Button
                            className="mt-8 bg-white text-black hover:bg-blue-500 hover:text-white rounded-full px-8 py-6 text-sm font-bold tracking-widest uppercase transition-all"
                            onClick={() => navigate('/portfolio')}
                        >
                            Voir la galerie
                        </Button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    >
                        {[
                            { icon: User, title: "Portraits", desc: "Mettez en valeur l'humain derrière l'entreprise." },
                            { icon: ShoppingBag, title: "E-commerce", desc: "Des packshots produits qui déclenchent l'achat." },
                            { icon: Sun, title: "Lifestyle", desc: "Mise en scène de vos produits en situation réelle." },
                            { icon: Camera, title: "Événementiel", desc: "Immortalisez vos séminaires et lancements." }
                        ].map((item, i) => (
                            <div key={i} className="bg-surface/20 backdrop-blur-md p-6 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all group">
                                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                                    <item.icon className="text-white group-hover:text-blue-400" size={24} />
                                </div>
                                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-300">{item.desc}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Technical Arsenal - Full Width with Carousels */}
                <div className="mb-20 md:mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">Notre <span className="text-blue-400 italic">Arsenal</span> Technique</h2>
                        <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
                            Nous utilisons le matériel le plus précis pour garantir un piqué exceptionnel et une fidélité des couleurs irréprochable.
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
                                            srcSet={`${item.images[activeIndexes[i]].replace('.webp', '-400.webp')} 400w, ${item.images[activeIndexes[i]].replace('.webp', '-800.webp')} 800w, ${item.images[activeIndexes[i]].replace('.webp', '-1200.webp')} 1200w`}
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            alt={item.title}
                                            loading="lazy"
                                            decoding="async"
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
                                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-blue-500 z-20"
                                    >
                                        <ArrowRight className="rotate-180" size={20} />
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); nextImage(i); }}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-blue-500 z-20"
                                    >
                                        <ArrowRight size={20} />
                                    </button>

                                    {/* Dots */}
                                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                                        {item.images.map((_, dotIdx) => (
                                            <div
                                                key={dotIdx}
                                                className={`w-2 h-2 rounded-full transition-all ${dotIdx === activeIndexes[i] ? 'bg-blue-500 w-6' : 'bg-white/30'}`}
                                            />
                                        ))}
                                    </div>

                                    <div className="absolute top-6 left-6 z-20">
                                        <div className="flex items-center gap-3 bg-blue-500 px-5 py-2 rounded-full shadow-2xl scale-110">
                                            <item.icon size={18} className="text-white" />
                                            <span className="text-xs text-white font-black uppercase tracking-[0.2em]">{item.category}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8 md:p-10">
                                    <h4 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">{item.title}</h4>
                                    <p className="text-gray-300 text-base md:text-lg leading-relaxed font-medium">{item.detail}</p>
                                </div>
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
                        <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">Workflow <span className="text-blue-400 italic">Créatif</span></h2>
                        <p className="text-gray-300 max-w-2xl mx-auto">De la conception à la livraison finale, chaque étape est maîtrisée.</p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {[
                            { step: "01", title: "Moodboard", desc: "Définition de l'univers visuel.", icon: Search },
                            { step: "02", title: "Setup", desc: "Installation studio ou repérages.", icon: Sun },
                            { step: "03", title: "Shooting", desc: "Captations HD avec direction artistique.", icon: Camera },
                            { step: "04", title: "Retouche", desc: "Nettoyage et colorimétrie avancée.", icon: Layers },
                            { step: "05", title: "Livraison", desc: "Fichiers optimisés pour tous supports.", icon: CheckCircle }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="relative p-6 bg-surface/30 backdrop-blur-xl border border-white/5 rounded-3xl text-center group hover:border-blue-500/30 transition-all"
                            >
                                <div className="text-3xl font-serif font-bold text-blue-500/10 mb-4 group-hover:text-blue-500 transition-colors">
                                    {item.step}
                                </div>
                                <h3 className="font-bold text-white mb-2">{item.title}</h3>
                                <p className="text-gray-300 text-xs leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="mb-20 md:mb-32">
                    <h2 className="text-2xl md:text-3xl font-serif font-bold mb-12 text-center">Nos prestations photo</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {[
                            "Shooting Corporate & Trombinoscope",
                            "Photographie Culinaire (Food)",
                            "Photographie Immobilière & Architecture",
                            "Packshots Produits (Fond blanc/Creative)",
                            "Reportage Événementiel",
                            "Photographie Mode & Lifestyle",
                            "Banque d'images personnalisée",
                            "Retouche photo avancée",
                            "Photos de chantier / suivi d'avancement"
                        ].map((service, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5 hover:border-blue-500/30 transition-all cursor-default"
                            >
                                <Image className="text-blue-400 shrink-0" size={20} />
                                <span className="font-medium text-gray-300">{service}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="text-center bg-surface/30 backdrop-blur-xl p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] border border-white/10">
                    <h2 className="text-3xl font-bold mb-6">Réservez votre shooting</h2>
                    <p className="text-gray-300 mb-8 max-w-xl mx-auto">
                        Studio ou extérieur ? Définissons ensemble l'univers visuel qui correspond à votre marque.
                    </p>
                    <Button
                        size="lg"
                        className="rounded-full px-6 md:px-10 py-5 md:py-6 text-sm md:text-lg font-bold bg-blue-500 text-white hover:bg-white hover:text-blue-500 transition-all shadow-lg hover:shadow-blue-500/20 whitespace-normal"
                        onClick={handleContact}
                    >
                        Booker une date
                        <ArrowRight className="ml-2" size={18} />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Photographie;
