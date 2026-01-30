import { motion } from "framer-motion";
import { CheckCircle, Award, Users, Lightbulb, Target, Rocket } from "lucide-react";
import { Button } from "../components/ui/Button";
import { useRef, useState, useEffect } from "react";
import SEO from "../components/SEO";

const About = () => {
    const containerRef = useRef(null);
    const [activeValue, setActiveValue] = useState(0);

    useEffect(() => {
        const checkMobile = () => { }; // Keep for consistency if needed or remove
        checkMobile();
    }, []);

    const handleScroll = (e: any, setIndex: any) => {
        const scrollLeft = e.target.scrollLeft;
        const width = e.target.scrollWidth - e.target.clientWidth;
        if (width <= 0) return;
        const scrollPercentage = scrollLeft / width;
        const totalItems = e.target.children.length;
        const index = Math.round(scrollPercentage * (totalItems - 1));
        if (!isNaN(index)) setIndex(index);
    };

    return (
        <div className="pt-24 md:pt-40 pb-16 md:pb-20 px-0 md:px-6 min-h-screen relative overflow-hidden bg-transparent" ref={containerRef}>
            <SEO
                title="À Propos"
                description="Découvrez l'histoire de LOLLY, une agence fondée sur l'excellence et l'innovation. Notre mission : bâtir l'élite créative du continent."
            />
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none hidden md:block">
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, 45, 0],
                        x: [0, 50, 0],
                        y: [0, -30, 0]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.4, 1],
                        x: [0, -60, 0],
                        y: [0, 40, 0]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px]"
                />
            </div>

            {/* Header */}
            <div className="container mx-auto max-w-5xl text-center mb-16 md:mb-32 relative z-10 px-6 md:px-0">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <span className="bg-primary/10 text-primary font-bold tracking-[0.2em] uppercase text-xs px-4 py-1.5 rounded-full mb-6 inline-block border border-primary/20 backdrop-blur-sm">Notre ADN</span>
                    <h1 className="text-3xl md:text-8xl font-serif font-bold text-white mb-8 md:mb-10 tracking-tight leading-[1.1]">
                        Plus qu'une <span className="italic">agence</span>,<br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary pb-1 px-2">partenaire d'exception.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Nous croyons au pouvoir des idées qui bousculent le statu quo et aux images qui impriment une vision durable.
                    </p>
                </motion.div>
            </div>

            {/* Notre Histoire */}
            <section className="container mx-auto max-w-6xl mb-24 md:mb-48 relative z-20 px-6 md:px-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8 md:space-y-10"
                    >
                        <div className="space-y-4">
                            <span className="text-primary font-black uppercase text-xs tracking-[0.3em]">Genèse & Vision</span>
                            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-tight">Notre <span className="italic">Odyssée</span></h2>
                        </div>

                        <div className="space-y-8 relative">
                            <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10" />

                            <motion.div
                                whileHover={{ x: 10 }}
                                className="pl-8 md:pl-10 relative group"
                            >
                                <div className="absolute left-[-2px] top-2 w-1 h-8 bg-primary shadow-[0_0_15px_rgba(255,215,0,0.5)] transition-all group-hover:h-full" />
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">L'Origine</h3>
                                <p className="text-gray-300 text-sm md:text-lg leading-relaxed">
                                    Née d'une vision audacieuse en plein cœur de Dakar, LOLLY est l'histoire d'un engagement : transformer des idées en messages puissants. Fondée par Amadou Mbaye GUEYE, nous portons la conviction que la communication africaine mérite une excellence sans compromis.
                                </p>
                            </motion.div>

                            <motion.div
                                whileHover={{ x: 10 }}
                                className="pl-8 md:pl-10 relative group"
                            >
                                <div className="absolute left-[-2px] top-2 w-1 h-8 bg-accent shadow-[0_0_15px_rgba(255,215,0,0.5)] transition-all group-hover:h-full" />
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">L'Évolution</h3>
                                <p className="text-gray-300 text-sm md:text-lg leading-relaxed">
                                    Aujourd'hui, nous nous positionnons comme une pure agence de conseil. Nous structurons la communication des entreprises pour en faire un levier de croissance durable, soutenue par nos pôles de production et de formation.
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="relative mt-8 md:mt-0"
                    >
                        <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 via-transparent to-accent/20 rounded-[3rem] blur-2xl opacity-50" />
                        <div className="relative rounded-[2.5rem] md:rounded-[3rem] overflow-hidden border border-white/10 shadow-3xl bg-surface/20 backdrop-blur-sm p-3 md:p-4">
                            <img
                                src="/assets/notre-odyssee.webp"
                                srcSet="/assets/notre-odyssee-400.webp 400w, /assets/notre-odyssee-800.webp 800w, /assets/notre-odyssee-1200.webp 1200w"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                alt="L'Odyssée LOLLY"
                                width="800"
                                height="600"
                                loading="lazy"
                                className="rounded-[2rem] md:rounded-[2.5rem] w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                        </div>
                        {/* Interactive floating badge */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -bottom-10 -right-10 bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl hidden md:block"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary">
                                    <Award size={24} />
                                </div>
                                <div className="text-left">
                                    <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Expertise</p>
                                    <p className="text-white font-bold">Standard Mondial</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Philosophie & Valeurs */}
            <section className="py-16 md:py-32 relative overflow-hidden">
                {/* Background decorative strip */}
                <div className="absolute inset-0 bg-surface/30 border-y border-white/5 pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.02)_0%,transparent_70%)] pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center max-w-4xl mx-auto mb-12 md:mb-24"
                    >
                        <span className="text-primary font-black uppercase text-xs tracking-[0.3em] mb-4 block">Notre Croyance</span>
                        <h2 className="text-2xl md:text-7xl font-serif font-bold text-white mb-6 md:mb-8 tracking-tight italic">
                            "Des mots qui touchent,<br />des images qui marquent"
                        </h2>
                        <p className="text-gray-300 text-base md:text-xl leading-relaxed max-w-2xl mx-auto">
                            Plus qu'un slogan, c'est notre boussole. Nous refusons le bruit inutile pour ne créer que du sens à haute intensité.
                        </p>
                    </motion.div>

                    <div
                        className="flex overflow-x-auto snap-x snap-mandatory gap-5 pb-8 scrollbar-hide md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:pb-0 md:overflow-visible"
                        onScroll={(e) => handleScroll(e, setActiveValue)}
                    >
                        {[
                            { icon: Target, title: "Excellence", desc: "La médiocrité est notre seule ennemie. Nous visons le parfait équilibre." },
                            { icon: Rocket, title: "Innovation IA", desc: "Pionniers au Sénégal dans l'intégration de l'IA pour décupler votre valeur." },
                            { icon: Lightbulb, title: "Transmission", desc: "Nous ne gardons pas nos secrets. Notre réussite est votre autonomie totale." },
                            { icon: Users, title: "Partenariat Pro", desc: "Nous vivons vos enjeux comme si nous étions membres de votre équipe." },
                            { icon: Award, title: "Culture Locale", desc: "Maîtrise intime des codes du marché sénégalais couplée à une vision globale." },
                            { icon: CheckCircle, title: "Agilité Totale", desc: "L'intelligence du mouvement pour s'adapter à vos besoins changeants." }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -15, scale: 1.02 }}
                                className="min-w-[85vw] snap-center md:min-w-0 p-8 md:p-10 bg-surface/30 backdrop-blur-xl border border-white/5 rounded-[2.5rem] hover:border-primary/40 transition-all duration-500 group relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
                                <div className="w-14 h-14 md:w-16 md:h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6 md:mb-8 border border-white/10 group-hover:bg-primary/20 transition-all shadow-lg group-hover:rotate-12">
                                    <item.icon size={26} className="text-primary group-hover:scale-110 transition-transform" />
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 tracking-tight">{item.title}</h3>
                                <p className="text-gray-300 text-sm md:text-base leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                    {/* Pagination Dots for Values (Mobile Only) */}
                    <div className="flex md:hidden justify-center gap-2 mt-2">
                        {[0, 1, 2, 3, 4, 5].map((i) => (
                            <div
                                key={i}
                                className={`h-1.5 rounded-full transition-all duration-300 ${activeValue === i ? "w-6 bg-primary" : "w-1.5 bg-white/20"}`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Expertise & Leadership */}
            <section className="container mx-auto max-w-6xl mb-24 md:mb-48 px-6 mt-12 md:mt-20 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-start">
                    {/* Founder Highlight */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-5"
                    >
                        <div className="md:sticky md:top-24">
                            <div className="relative rounded-[2.5rem] md:rounded-[3rem] overflow-hidden group mb-8 md:mb-10 border border-white/10 shadow-3xl bg-surface/20 p-2">
                                <img
                                    src="/assets/amadou-mbaye-gueye.webp"
                                    srcSet="/assets/amadou-mbaye-gueye-400.webp 400w, /assets/amadou-mbaye-gueye-800.webp 800w, /assets/amadou-mbaye-gueye-1200.webp 1200w"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    alt="Amadou Mbaye GUEYE"
                                    width="800"
                                    height="800"
                                    loading="lazy"
                                    className="rounded-[2rem] md:rounded-[2.5rem] w-full aspect-square object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                                />
                                <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 p-4 md:p-6 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500">
                                    <h3 className="text-base md:text-xl font-bold text-white">Amadou Mbaye GUEYE</h3>
                                    <p className="text-primary text-[8px] md:text-[10px] font-black uppercase tracking-widest mt-1">Founder & Chief Visionary</p>
                                </div>
                            </div>
                            <div className="space-y-4 md:space-y-6">
                                <h3 className="text-xl md:text-3xl font-serif font-bold text-white tracking-tight italic leading-snug">"Notre héritage sera l'autonomie des talents que nous formons."</h3>
                                <p className="text-gray-300 text-base md:text-lg leading-relaxed">Amadou Mbaye GUEYE incarne l'alliance rare entre une créativité organique et une maîtrise technique pointue en automatisation et IA.</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Ecosystem Grid */}
                    <div className="lg:col-span-7 space-y-10 md:space-y-12 mt-12 md:mt-0">
                        <div className="space-y-4 mb-8 md:mb-20">
                            <span className="text-primary font-black uppercase text-[10px] tracking-[0.3em]">Notre Écosystème</span>
                            <h2 className="text-3xl md:text-6xl font-serif font-bold text-white tracking-tight leading-tight">Capacités <span className="italic">Intégrales</span></h2>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:gap-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-surface/20 backdrop-blur-md p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-primary/20 relative group overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-4 md:p-8">
                                    <span className="bg-primary text-black font-black uppercase text-[8px] tracking-[0.2em] px-2.5 py-1 rounded-lg shadow-lg">⭐ Core Competence</span>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-6 md:gap-8 items-start">
                                    <div className="w-14 h-14 md:w-16 md:h-16 bg-primary/20 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                        <Target size={32} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">Conseil Stratégique High-End</h3>
                                        <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6">Nous auditons vos structures de communication pour y injecter de l'intelligence et de la performance durable.</p>
                                        <div className="flex flex-wrap gap-2">
                                            {["Communication de Crise", "Branding Architecture", "Digital Transformation"].map((tag, i) => (
                                                <span key={i} className="px-3 py-1 bg-white/5 rounded-lg text-[10px] font-bold text-gray-300 border border-white/5">{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                                {[
                                    { title: "Lolly Academy", desc: "Nos modules de formation pour monter vos équipes en compétence et garantir l'autonomie.", icon: Award },
                                    { title: "Lolly Studio", desc: "Production 4K, Motion Design et Photographie Corporate de standard international.", icon: Rocket }
                                ].map((box, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.2 }}
                                        className="bg-surface/20 backdrop-blur-md p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-white/10 group hover:border-white/30 transition-all duration-500"
                                    >
                                        <div className="w-10 h-10 md:w-12 md:h-12 bg-white/5 rounded-xl flex items-center justify-center mb-4 md:mb-6 group-hover:bg-primary/20 transition-all">
                                            <box.icon size={22} className="text-white group-hover:text-primary transition-colors" />
                                        </div>
                                        <h3 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4">{box.title}</h3>
                                        <p className="text-gray-300 text-sm leading-relaxed">{box.desc}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision 2030 */}
            <section className="container mx-auto px-6 mb-16 md:mb-24 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-gray-900 via-surface/40 to-black p-8 md:p-24 rounded-[3rem] md:rounded-[4rem] border border-white/10 shadow-3xl text-center relative overflow-hidden group"
                >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.05)_0%,transparent_70%)]" />

                    <div className="relative z-10 max-w-4xl mx-auto text-center">
                        <span className="bg-primary/20 text-primary font-black uppercase text-[10px] tracking-[0.2em] px-4 py-2 rounded-full mb-8 md:mb-10 inline-block border border-primary/20">Horizon 2030</span>
                        <h2 className="text-3xl md:text-7xl font-serif font-bold text-white mb-8 md:mb-10 tracking-tight leading-tight">Bâtir l'élite créative du <span className="text-primary italic">continent</span>.</h2>
                        <p className="text-gray-300 text-base md:text-xl leading-relaxed mb-10 md:mb-16 max-w-2xl mx-auto">Notre ambition est claire : devenir la référence absolue de la communication et du marketing digital en Afrique de l'Ouest d'ici 5 ans.</p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Button
                                size="lg"
                                className="w-full md:w-auto h-16 px-12 text-lg font-black rounded-2xl shadow-xl shadow-primary/20"
                                onClick={() => {
                                    if (window.innerWidth < 768) {
                                        window.location.href = '/contact';
                                    } else {
                                        window.dispatchEvent(new CustomEvent('open-contact-modal'));
                                    }
                                }}
                            >
                                Rejoignez le mouvement
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

export default About;
