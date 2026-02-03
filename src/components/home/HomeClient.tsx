"use client";

import Hero from "../Hero";
import Marquee from "../Marquee";
import ClientLogos from "../ClientLogos";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import OptimizedImage from "../OptimizedImage";
import { Star } from "lucide-react";

interface Testimonial {
    quote: string;
    author: string;
    role: string;
    color: string;
    rating?: number;
    avatar?: any;
}

interface Service {
    id: string;
    title: string;
    desc: string;
    color: string;
    link?: string;
}

interface HomeClientProps {
    testimonials: Testimonial[];
    partners?: any[];
    hero?: any;
}

const HomeClient = ({ testimonials, partners, hero }: HomeClientProps) => {
    const containerRef = useRef(null);
    const [activeService, setActiveService] = useState(0);
    const [activeTestimonial, setActiveTestimonial] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleScroll = (e: any, setIndex: any) => {
        const scrollLeft = e.target.scrollLeft;
        const width = e.target.offsetWidth;
        const index = Math.round(scrollLeft / width);
        setIndex(index);
    };

    const defaultServices = [
        { id: "01", title: "Stratégie 360°", color: "bg-primary", desc: "Audit, positionnement et plan d'action pour connecter votre marque à son audience." },
        { id: "02", title: "Design & Branding", color: "bg-accent", desc: "Identités visuelles fortes, chartes graphiques et supports qui impriment la rétine." },
        { id: "03", title: "Formation", color: "bg-white", desc: "Empowerment de vos équipes pour une autonomie digitale totale et certifiée." }
    ];

    const displayServices = defaultServices;

    return (
        <div className="relative overflow-hidden bg-transparent" ref={containerRef}>
            <Hero data={hero} />

            <ClientLogos partners={partners} />

            <section className="py-16 md:py-32 relative z-10">
                {/* Background Decorative Element */}
                <div className="absolute top-1/2 left-0 w-full h-full pointer-events-none -z-10 hidden md:block">
                    {!isMobile && (
                        <motion.div
                            animate={{
                                scale: [1, 1.3, 1],
                                x: [-20, 20, -20]
                            }}
                            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-0 right-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px]"
                        />
                    )}
                </div>

                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8 md:gap-12">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="max-w-3xl"
                        >
                            <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Notre Philosophie</span>
                            <h2 className="text-3xl md:text-7xl font-serif font-bold mb-8 text-white tracking-tight leading-tight">
                                Nous ne suivons pas <br />les tendances. <span className="text-primary italic pb-1 px-2">On les crée.</span>
                            </h2>
                            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-xl">
                                Agence de Conseil en Communication. LOLLY est votre partenaire stratégique pour dominer le paysage digital sénégalais avec une longueur d'avance.
                            </p>
                        </motion.div>
                        <Link href="/services" className="w-full md:w-auto self-start md:self-end">
                            <motion.div
                                whileHover={{ x: 10 }}
                                className="group flex items-center justify-between md:justify-start gap-4 text-white hover:text-primary transition-all uppercase tracking-[0.2em] text-[10px] md:text-xs font-black cursor-pointer bg-white/5 px-6 md:px-8 py-4 md:py-5 rounded-2xl border border-white/10 backdrop-blur-sm"
                            >
                                Voir toutes nos expertises
                                <span className="text-lg group-hover:translate-x-2 transition-transform">→</span>
                            </motion.div>
                        </Link>
                    </div>

                    {/* Services Section - Horizontal Scroll on Mobile */}
                    <div
                        className="flex overflow-x-auto pb-8 gap-5 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-3 md:gap-8 md:pb-0 md:overflow-visible"
                        onScroll={(e) => handleScroll(e, setActiveService)}
                    >
                        {displayServices.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2, duration: 0.8 }}
                                whileHover={{ y: -15, scale: 1.02 }}
                                className={`min-w-[85vw] md:min-w-0 snap-center p-8 md:p-10 bg-surface/30 md:backdrop-blur-xl border border-white/5 rounded-[2.5rem] hover:border-primary/30 transition-all duration-500 group relative overflow-hidden ${i === 1 ? 'md:mt-12' : i === 2 ? 'md:mt-24' : ''}`}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
                                <div className={`w-14 h-14 md:w-16 md:h-16 ${item.color} rounded-2xl mb-6 md:mb-8 flex items-center justify-center text-black font-black text-xl md:text-2xl group-hover:rotate-12 transition-transform shadow-lg`}>
                                    {item.id}
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">{item.title}</h3>
                                <p className="text-gray-300 text-base md:text-lg leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                    {/* Pagination Dots for Services (Mobile Only) */}
                    <div className="flex md:hidden justify-center gap-2 mt-4">
                        {[0, 1, 2].map((i) => (
                            <div
                                key={i}
                                className={`h-1.5 rounded-full transition-all duration-300 ${activeService === i ? "w-6 bg-primary" : "w-1.5 bg-white/20"}`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-32 relative overflow-hidden">

                <div className="container mx-auto px-6 relative z-10">

                    <motion.div

                        initial={{ opacity: 0 }}

                        whileInView={{ opacity: 1 }}

                        className="mb-12 md:mb-20 text-center"

                    >
                        <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Témoignages</span>
                        <h2 className="text-3xl md:text-6xl font-serif font-bold text-white tracking-tight leading-tight">
                            La Preuve par <span className="italic">l'Impact</span>
                        </h2>
                    </motion.div>

                    {/* Testimonials Section - Horizontal Scroll on Mobile */}
                    <div
                        className="flex md:grid overflow-x-auto md:overflow-visible pb-8 md:pb-0 gap-5 md:gap-10 snap-x snap-mandatory md:grid-cols-2"
                        onScroll={(e) => handleScroll(e, setActiveTestimonial)}
                    >
                        {testimonials.map((t, i) => (

                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                whileHover={{ scale: 1.02 }}
                                className="min-w-[85vw] md:min-w-0 snap-center p-8 md:p-12 bg-surface/20 backdrop-blur-md rounded-[2.5rem] md:rounded-[3rem] border border-white/10 relative group h-full flex flex-col"
                            >
                                <span className={`text-6xl md:text-8xl ${t.color === 'primary' ? 'text-primary/10' : 'text-accent/10'} font-serif absolute top-4 left-6 md:top-6 md:left-10 group-hover:scale-110 transition-transform`}>"</span>
                                <p className="text-base md:text-xl text-gray-300 italic mb-6 md:mb-8 relative z-10 pt-6 md:pt-8 leading-relaxed">"{t.quote}"</p>

                                <div className="mt-auto space-y-6 md:space-y-8 relative z-10">
                                    {/* Star Rating */}
                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, index) => (
                                            <Star
                                                key={index}
                                                size={16}
                                                className={`${index < (t.rating || 5) ? "fill-primary text-primary" : "text-gray-600"} transition-all`}
                                            />
                                        ))}
                                    </div>

                                    <div className="flex items-center">
                                        <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-xl md:rounded-2xl mr-4 md:mr-5 shadow-xl border border-white/5 overflow-hidden flex items-center justify-center relative">
                                            <OptimizedImage
                                                src={i === 0 ? "/assets/logos/kadior.webp" : "/assets/logos/linkshop.webp"}
                                                alt={t.role}
                                                width={100}
                                                height={100}
                                                sizes="60px"
                                                className="w-full h-full object-contain p-2"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-base md:text-lg">{t.author}</h4>
                                            <span className={`text-[10px] md:text-sm font-bold uppercase tracking-widest ${t.color === 'primary' ? 'text-primary' : 'text-accent'}`}>{t.role}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Pagination Dots for Testimonials (Mobile Only) */}
                    <div className="flex md:hidden justify-center gap-2 mt-4">
                        {[0, 1].map((i) => (
                            <div
                                key={i}
                                className={`h-1.5 rounded-full transition-all duration-300 ${activeTestimonial === i ? "w-6 bg-accent" : "w-1.5 bg-white/20"}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Background testimo decoration */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-accent/10 rounded-full blur-[180px] -z-10 hidden md:block" />
            </section>

            <Marquee />
        </div>
    );
};

export default HomeClient;
