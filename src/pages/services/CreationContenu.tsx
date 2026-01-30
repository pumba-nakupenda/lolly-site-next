import { motion } from "framer-motion";
import { FileText, ArrowRight, PenTool, Search, Mail, Mic, Laptop, Sparkles, Layout, Globe, Lightbulb, FileEdit, CheckCircle, Share2 } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import SEO from "../../components/SEO";
import contentImg from "../../assets/office_vibe.webp";

const CreationContenu = () => {
    const navigate = useNavigate();

    const handleContact = () => {
        if (window.innerWidth < 768) {
            navigate('/contact?subject=Création de Contenu');
        } else {
            window.dispatchEvent(new CustomEvent('open-contact-modal', { detail: { subject: 'Création de Contenu' } }));
        }
    };

    return (
        <div className="pt-24 md:pt-40 pb-20 px-4 md:px-6 min-h-screen relative overflow-hidden bg-black text-white">
            <SEO
                title="Création de Contenu"
                description="Rédaction SEO, copywriting et storytelling. Donnez de la voix à votre expertise avec du contenu qui convertit au Sénégal."
                keywords="rédaction seo dakar, copywriting sénégal, brand content dakar, storytelling"
                url="https://lolly.sn/services/content"
            />
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[50%] transform -translate-x-1/2 w-[800px] h-[800px] bg-green-500/10 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto max-w-6xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16 md:mb-24"
                >
                    <span className="bg-green-500/10 text-green-400 font-bold tracking-[0.2em] uppercase text-xs px-4 py-2 rounded-full mb-6 inline-block border border-green-500/20">Brand Content</span>
                    <h1 className="text-4xl md:text-7xl font-serif font-bold mb-8 tracking-tight">
                        Création de <span className="text-green-400 italic">Contenu</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Le contenu est roi. Nous écrivons les textes qui séduisent Google et vos clients. Donnez de la voix à votre expertise.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mb-20 md:mb-32 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold mb-6">Des mots qui <span className="text-green-400">marchent</span></h2>
                        <div className="space-y-6">
                            <p className="text-gray-300 leading-relaxed">
                                Un beau site web sans bon contenu est une coquille vide. Nos rédacteurs et copywriters conçoivent des textes percutants, optimisés pour le référencement (SEO) et orientés conversion.
                            </p>
                            <p className="text-gray-300 leading-relaxed">
                                Du script de votre vidéo institutionnelle à vos newsletters hebdomadaires, nous trouvons le ton juste pour engager votre audience.
                            </p>
                        </div>
                        <Button
                            className="mt-8 bg-white text-black hover:bg-green-500 hover:text-white rounded-full px-8 py-6 text-sm font-bold tracking-widest uppercase transition-all"
                            onClick={() => navigate('/contact')}
                        >
                            Nous confier votre rédaction
                        </Button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    >
                        {[
                            { icon: PenTool, title: "Copywriting", desc: "L'art de vendre avec les mots." },
                            { icon: Search, title: "SEO", desc: "Textes optimisés pour être en 1ère page Google." },
                            { icon: Mail, title: "Newsletters", desc: "Fidéliser votre base client." },
                            { icon: Mic, title: "Scripts", desc: "Scénarisation pour vidéos et podcasts." }
                        ].map((item, i) => (
                            <div key={i} className="bg-surface/20 backdrop-blur-md p-6 rounded-2xl border border-white/5 hover:border-green-500/30 transition-all group">
                                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-500/20 transition-colors">
                                    <item.icon className="text-white group-hover:text-green-400" size={24} />
                                </div>
                                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-300">{item.desc}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Content Lab Atmosphere */}
                <div className="mb-20 md:mb-32">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative h-[300px] md:h-[400px] rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/10"
                    >
                        <img
                            src={contentImg}
                            srcSet={`${contentImg.replace('.webp', '-400.webp')} 400w, ${contentImg.replace('.webp', '-800.webp')} 800w, ${contentImg.replace('.webp', '-1200.webp')} 1200w`}
                            sizes="(max-width: 768px) 100vw, 80vw"
                            alt="Content Lab"
                            width="1200"
                            height="800"
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-green-900/40 mix-blend-multiply" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center p-8 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 max-w-xl">
                                <h3 className="text-3xl font-serif font-bold mb-4">L'Usine à Idées</h3>
                                <p className="text-gray-200">
                                    C'est ici que vos concepts prennent vie sous forme de mots, de scripts et de stratégies éditoriales percutantes.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Content Tech Section */}
                <div className="mb-20 md:mb-32">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-white/5 border border-white/10 rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 text-center"
                    >
                        <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">Notre <span className="text-green-400 italic">Content Lab</span></h2>
                        <p className="text-gray-300 max-w-2xl mx-auto mb-16">L'intelligence des mots couplée à la puissance des outils modernes.</p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {[
                                { icon: Laptop, title: "Pro Stack", desc: "Postes de travail haute performance." },
                                { icon: Sparkles, title: "AI Guided", desc: "Assistance IA pour la recherche et l'idéation." },
                                { icon: Layout, title: "CMS Experts", desc: "Maîtrise de WordPress, Shopify & plus." },
                                { icon: Globe, title: "SEO Suite", desc: "Analyse sémantique avec Semrush & Ahrefs." }
                            ].map((item, i) => (
                                <div key={i} className="group">
                                    <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-green-500/20 transition-all">
                                        <item.icon className="text-green-400" size={32} />
                                    </div>
                                    <h3 className="font-bold mb-2">{item.title}</h3>
                                    <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Creation Workflow Section */}
                <div className="mb-20 md:mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">La Fabrique à <span className="text-green-400 italic">Histoires</span></h2>
                        <p className="text-gray-300 max-w-2xl mx-auto">Un workflow rigoureux pour des contenus qui marquent les esprits.</p>
                    </motion.div>

                    <div className="space-y-4 max-w-4xl mx-auto">
                        {[
                            { step: "01", title: "Curation & Idéation", desc: "Brainstorming et recherche d'angles originaux pour votre sujet.", icon: Lightbulb },
                            { step: "02", title: "Rédaction & Optimisation", desc: "Écriture du premier jet et raffinement SEO / Conversion.", icon: FileEdit },
                            { step: "03", title: "Révision & QC", desc: "Relecture chirurgicale pour une qualité irréprochable.", icon: CheckCircle },
                            { step: "04", title: "Distribution", desc: "Adaptation du contenu pour tous vos canaux de diffusion.", icon: Share2 }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-start gap-4 md:gap-6 p-6 bg-surface/30 backdrop-blur-xl border border-white/5 rounded-2xl hover:border-green-500/30 transition-all group"
                            >
                                <div className="text-3xl font-serif font-bold text-green-500/20 group-hover:text-green-400 transition-colors w-12 shrink-0">
                                    {item.step}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2 flex items-center gap-3">
                                        <item.icon size={20} className="text-green-400" />
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-gray-300 leading-relaxed">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="mb-20 md:mb-32">
                    <h2 className="text-2xl md:text-3xl font-serif font-bold mb-12 text-center">Nos services éditoriaux</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {[
                            "Articles de Blog & Tribunes",
                            "Copywriting Pages de Vente",
                            "Rédaction de Site Web (Sitemap)",
                            "Newsletters & Emailing",
                            "Livres Blancs & E-books",
                            "Communiqués & Dossiers de Presse",
                            "Scripts Vidéo & Voix-off",
                            "Slogans & Base line",
                            "Traduction & Localisation (Français/Wolof/Anglais)"
                        ].map((service, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5 hover:border-green-500/30 transition-all cursor-default"
                            >
                                <FileText className="text-green-400 shrink-0" size={20} />
                                <span className="font-medium text-gray-300">{service}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="text-center bg-surface/30 backdrop-blur-xl p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] border border-white/10">
                    <h2 className="text-3xl font-bold mb-6">Vous avez les idées, nous avons la plume.</h2>
                    <p className="text-gray-300 mb-8 max-w-xl mx-auto">
                        Ne perdez plus de temps devant une page blanche. Laissez des professionnels écrire pour vous.
                    </p>
                    <Button
                        size="lg"
                        className="rounded-full px-6 md:px-10 py-5 md:py-6 text-sm md:text-lg font-bold bg-green-500 text-white hover:bg-white hover:text-green-500 transition-all shadow-lg hover:shadow-green-500/20 whitespace-normal"
                        onClick={handleContact}
                    >
                        Commander du contenu
                        <ArrowRight className="ml-2" size={18} />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CreationContenu;
