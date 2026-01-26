import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import ClientLogos from "../components/ClientLogos";
import { motion } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";

const Home = () => {
    const containerRef = useRef(null);

    return (
        <div className="relative overflow-hidden bg-transparent" ref={containerRef}>
            <Hero />

            <ClientLogos />

            <section className="py-32 relative z-10">
                {/* Background Decorative Element */}
                <div className="absolute top-1/2 left-0 w-full h-full pointer-events-none overflow-hidden -z-10 hidden md:block">
                    <motion.div
                        animate={{
                            scale: [1, 1.3, 1],
                            x: [-20, 20, -20]
                        }}
                        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]"
                    />
                </div>

                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="max-w-3xl"
                        >
                            <span className="text-primary font-bold tracking-[0.2em] uppercase text-[10px] mb-4 block">Notre Philosophie</span>
                            <h2 className="text-3xl md:text-7xl font-serif font-bold mb-8 text-white tracking-tight">
                                Nous ne suivons pas <br />les tendances. <span className="text-primary italic pb-1 px-2">On les crée.</span>
                            </h2>
                            <p className="text-base md:text-xl text-gray-400 leading-relaxed max-w-xl">
                                LOLLY est votre partenaire stratégique pour dominer le paysage digital sénégalais avec une longueur d'avance.
                            </p>
                        </motion.div>
                        <Link to="/services">
                            <motion.div
                                whileHover={{ x: 10 }}
                                className="group flex items-center gap-4 text-white hover:text-primary transition-all uppercase tracking-[0.2em] text-xs font-black cursor-pointer bg-white/5 px-8 py-5 rounded-2xl border border-white/10 backdrop-blur-sm"
                            >
                                Voir toutes nos expertises
                                <span className="text-lg group-hover:translate-x-2 transition-transform">→</span>
                            </motion.div>
                        </Link>
                    </div>

                    {/* Services Section - Horizontal Scroll on Mobile */}
                    <div className="flex overflow-x-auto pb-8 gap-6 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-3 md:gap-8 md:pb-0 md:overflow-visible">
                        {[
                            { id: "01", title: "Stratégie 360°", color: "bg-primary", desc: "Audit, positionnement et plan d'action pour connecter votre marque à son audience." },
                            { id: "02", title: "Design & Branding", color: "bg-accent", desc: "Identités visuelles fortes, chartes graphiques et supports qui impriment la rétine." },
                            { id: "03", title: "Formation", color: "bg-white", desc: "Empowerment de vos équipes pour une autonomie digitale totale et certifiée." }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2, duration: 0.8 }}
                                whileHover={{ y: -15, scale: 1.02 }}
                                className={`min-w-[85vw] md:min-w-0 snap-center p-10 bg-surface/30 backdrop-blur-xl border border-white/5 rounded-[2.5rem] hover:border-primary/30 transition-all duration-500 group relative overflow-hidden ${i === 1 ? 'md:mt-12' : i === 2 ? 'md:mt-24' : ''}`}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
                                <div className={`w-16 h-16 ${item.color} rounded-2xl mb-8 flex items-center justify-center text-black font-black text-2xl group-hover:rotate-12 transition-transform shadow-lg`}>
                                    {item.id}
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">{item.title}</h3>
                                <p className="text-gray-400 text-lg leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-32 relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="mb-20 text-center"
                    >
                        <span className="text-primary font-bold tracking-[0.2em] uppercase text-[10px] mb-4 block">Témoignages</span>
                        <h2 className="text-4xl md:text-6xl font-serif font-bold text-white tracking-tight">
                            La Preuve par <span className="italic">l'Impact</span>
                        </h2>
                    </motion.div>

                    {/* Testimonials Section - Horizontal Scroll on Mobile */}
                    <div className="flex overflow-x-auto pb-8 gap-6 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-2 md:gap-10 md:pb-0 md:overflow-visible">
                        {[
                            {
                                quote: "J'ai été séduite par leur rigueur, leur professionnalisme et leur grande disponibilité. L'équipe de LOLLY a su allier stratégie et pragmatisme pour m'accompagner efficacement. Lors de ma dernière campagne de communication, ils ont été un véritable bouclier.",
                                author: "Directrice",
                                role: "Fondatrice, Kadior",
                                color: "primary"
                            },
                            {
                                quote: "LOLLY est un partenaire de confiance qui comprend les enjeux du digital au Sénégal. Leur accompagnement sur Linkshop a été déterminant pour notre croissance et notre visibilité.",
                                author: "Responsable Digital",
                                role: "Linkshop Sénégal",
                                color: "accent"
                            }
                        ].map((t, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                whileHover={{ scale: 1.02 }}
                                className="min-w-[85vw] md:min-w-0 snap-center p-12 bg-surface/20 backdrop-blur-md rounded-[3rem] border border-white/10 relative group"
                            >
                                <span className={`text-8xl ${t.color === 'primary' ? 'text-primary/10' : 'text-accent/10'} font-serif absolute top-6 left-10 group-hover:scale-110 transition-transform`}>"</span>
                                <p className="text-xl text-gray-300 italic mb-10 relative z-10 pt-8 leading-relaxed">"{t.quote}"</p>
                                <div className="flex items-center relative z-10">
                                    <div className={`w-14 h-14 ${t.color === 'primary' ? 'bg-primary/10' : 'bg-accent/10'} rounded-2xl mr-5 shadow-xl border border-white/5 overflow-hidden flex items-center justify-center`}>
                                        <img
                                            src={i === 0 ? "/kadior_logo.png" : "/linkshop_logo.png"}
                                            alt={t.role}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-lg">{t.author}</h4>
                                        <span className={`text-sm font-bold uppercase tracking-widest ${t.color === 'primary' ? 'text-primary' : 'text-accent'}`}>{t.role}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Background testimo decoration */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[150px] -z-10 hidden md:block" />
            </section>

            <Marquee />
        </div>
    );
};

export default Home;
