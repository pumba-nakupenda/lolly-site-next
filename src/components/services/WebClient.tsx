"use client";

import { motion } from "framer-motion";
import {
    Globe, ArrowRight, Monitor, Smartphone, Zap,
    ShoppingCart, Search, RefreshCw, CheckCircle,
    Code2, Layers, Rocket, ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

const WebClient = () => {
    const router = useRouter();

    const handleContact = () => {
        if (window.innerWidth < 768) {
            router.push('/contact?subject=Création de Site Web');
        } else {
            window.dispatchEvent(new CustomEvent('open-contact-modal', {
                detail: { subject: 'Création de Site Web' }
            }));
        }
    };

    const features = [
        { icon: Monitor, title: "Design Premium", desc: "Des interfaces modernes, épurées et mémorables qui reflètent votre image de marque." },
        { icon: Smartphone, title: "100% Mobile", desc: "Chaque site est optimisé pour tous les appareils — téléphone, tablette, desktop." },
        { icon: Zap, title: "Ultra Rapide", desc: "Performance et temps de chargement optimisés pour une expérience fluide." },
        { icon: Search, title: "SEO Intégré", desc: "Structure technique pensée pour le référencement et la visibilité sur Google." },
    ];

    const examples = [
        {
            title: "Dr Cheikh Gueye",
            description: "Site vitrine professionnel pour un médecin — design élégant, prise de rendez-vous et présentation des services.",
            url: "https://drcheikhgueye.com",
            tag: "Site Vitrine",
            color: "blue",
        },
        {
            title: "Kadio — Proposition",
            description: "Landing page percutante pour une proposition commerciale — design moderne, sections claires et appel à l'action.",
            url: "https://kadio-proposition.vercel.app",
            tag: "Landing Page",
            color: "cyan",
        },
    ];

    const services = [
        "Site vitrine professionnel",
        "Landing page haute conversion",
        "Site e-commerce",
        "Portfolio en ligne",
        "Site institutionnel",
        "Refonte & modernisation",
        "Maintenance & hébergement",
        "Optimisation SEO",
    ];

    const techStack = [
        { icon: Code2, title: "Next.js", category: "Framework Web" },
        { icon: Layers, title: "React", category: "Interface UI" },
        { icon: Smartphone, title: "Tailwind CSS", category: "Design System" },
        { icon: Rocket, title: "Vercel", category: "Déploiement" },
        { icon: Globe, title: "WordPress", category: "CMS Classique" },
    ];

    const process = [
        { step: "01", title: "Brief & Objectifs", desc: "On définit ensemble vos cibles, vos objectifs et l'identité visuelle à projeter.", icon: Search },
        { step: "02", title: "Maquette & Design", desc: "Proposition visuelle complète (wireframes + design) validée avant développement.", icon: Layers },
        { step: "03", title: "Développement", desc: "Intégration web responsive, rapide et optimisée avec les meilleures technologies.", icon: Code2 },
        { step: "04", title: "Mise en ligne", desc: "Déploiement, tests finaux, formation et support pour votre prise en main.", icon: CheckCircle },
    ];

    return (
        <div className="pt-24 md:pt-40 pb-20 px-4 md:px-6 min-h-screen relative overflow-hidden bg-black text-white">
            {/* Background */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px]" />
                <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] bg-cyan-500/8 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto max-w-6xl relative z-10">

                {/* Hero */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16 md:mb-24"
                >
                    <span className="bg-blue-500/10 text-blue-400 font-bold tracking-[0.2em] uppercase text-xs px-4 py-2 rounded-full mb-6 inline-block border border-blue-500/20">
                        Présence Digitale
                    </span>
                    <h1 className="text-4xl md:text-7xl font-serif font-bold mb-8 tracking-tight leading-[1.1]">
                        Création de{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 italic">
                            Site Web
                        </span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Un site web, c'est votre meilleur commercial — disponible 24h/24. Nous concevons des sites qui impressionnent, convertissent et évoluent avec vous.
                    </p>
                </motion.div>

                {/* Feature cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 md:mb-32 items-start">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    >
                        {features.map((item, i) => (
                            <div key={i} className="bg-surface/20 backdrop-blur-md p-6 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all group">
                                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                                    <item.icon className="text-white group-hover:text-blue-400 transition-colors" size={24} />
                                </div>
                                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold mb-6">
                            Votre vitrine{" "}
                            <span className="text-blue-400">digitale</span>
                        </h2>
                        <div className="space-y-5">
                            <p className="text-gray-300 leading-relaxed">
                                Au Sénégal comme partout dans le monde, un client qui ne vous trouve pas en ligne ne vous trouve pas du tout. Votre site web est la pièce centrale de votre stratégie de communication.
                            </p>
                            <p className="text-gray-300 leading-relaxed">
                                Nous ne créons pas juste des sites beaux — nous créons des outils de croissance. Chaque pixel, chaque ligne de code, chaque mot est pensé pour attirer, convaincre et convertir.
                            </p>
                        </div>
                        <Button
                            className="mt-8 bg-white text-black hover:bg-blue-500 hover:text-white rounded-full px-8 py-6 text-sm font-bold tracking-widest uppercase transition-all"
                            onClick={handleContact}
                        >
                            Lancer mon projet web <ArrowRight size={16} className="inline ml-2" />
                        </Button>
                    </motion.div>
                </div>

                {/* Nos réalisations */}
                <div className="mb-20 md:mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <span className="text-blue-400 font-bold tracking-[0.2em] uppercase text-[10px] mb-4 block">Exemples Concrets</span>
                        <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">
                            Nos <span className="text-blue-400 italic">réalisations</span>
                        </h2>
                        <p className="text-gray-400 max-w-xl mx-auto">
                            Des sites livrés, en ligne et qui fonctionnent. Cliquez pour les découvrir.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {examples.map((example, i) => (
                            <motion.a
                                key={i}
                                href={example.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -6, scale: 1.01 }}
                                className="group block bg-surface/30 backdrop-blur-xl border border-white/5 hover:border-blue-400/30 rounded-[2rem] overflow-hidden transition-all duration-300 cursor-pointer"
                            >
                                {/* URL Preview bar */}
                                <div className="bg-white/5 border-b border-white/5 px-5 py-3 flex items-center gap-3">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                        <div className="w-3 h-3 rounded-full bg-green-500/50" />
                                    </div>
                                    <div className="flex-1 bg-white/5 rounded-lg px-3 py-1.5 flex items-center gap-2">
                                        <Globe size={10} className="text-gray-500 shrink-0" />
                                        <span className="text-gray-400 text-xs truncate font-mono">
                                            {example.url.replace("https://", "")}
                                        </span>
                                    </div>
                                    <ExternalLink size={14} className="text-gray-500 group-hover:text-blue-400 transition-colors shrink-0" />
                                </div>

                                <div className="p-6 md:p-8">
                                    <div className="flex items-start justify-between gap-4 mb-4">
                                        <div>
                                            <span className={`text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full border mb-3 inline-block ${
                                                example.color === "blue"
                                                    ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                                                    : "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                                            }`}>
                                                {example.tag}
                                            </span>
                                            <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                                                {example.title}
                                            </h3>
                                        </div>
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                                            example.color === "blue" ? "bg-blue-500/10" : "bg-cyan-500/10"
                                        }`}>
                                            <Globe size={22} className={example.color === "blue" ? "text-blue-400" : "text-cyan-400"} />
                                        </div>
                                    </div>
                                    <p className="text-gray-400 text-sm leading-relaxed">{example.description}</p>
                                    <div className="mt-5 flex items-center gap-2 text-blue-400 text-sm font-semibold group-hover:gap-3 transition-all">
                                        Voir le site <ArrowRight size={14} />
                                    </div>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </div>

                {/* Services list */}
                <div className="mb-20 md:mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">
                            Ce que nous <span className="text-blue-400 italic">créons</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {services.map((service, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="flex items-center gap-3 bg-white/5 hover:bg-blue-500/10 px-5 py-4 rounded-2xl border border-white/5 hover:border-blue-500/20 transition-all group cursor-default"
                            >
                                <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                    <CheckCircle size={13} className="text-blue-400" />
                                </div>
                                <span className="text-sm text-gray-300 group-hover:text-white transition-colors font-medium">{service}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Tech Stack */}
                <div className="mb-20 md:mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">
                            Notre <span className="text-blue-400 italic">Stack</span>
                        </h2>
                        <p className="text-gray-400 max-w-xl mx-auto">Les technologies les plus performantes au service de votre projet.</p>
                    </motion.div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                        {techStack.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="bg-white/5 p-5 rounded-3xl border border-white/10 text-center hover:bg-blue-500/10 hover:border-blue-500/20 transition-all group"
                            >
                                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                    <item.icon className="text-blue-400" size={22} />
                                </div>
                                <h3 className="font-bold text-white mb-1 text-sm">{item.title}</h3>
                                <p className="text-[9px] uppercase tracking-widest text-gray-500 font-bold leading-tight">{item.category}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Process */}
                <div className="mb-20 md:mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">
                            Le Process <span className="text-blue-400 italic">de A à Z</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {process.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 bg-surface/30 backdrop-blur-xl border border-white/5 rounded-[2rem] group hover:border-blue-500/30 transition-all"
                            >
                                <div className="text-4xl font-serif font-bold text-blue-500/10 mb-5 group-hover:text-blue-400/30 transition-colors">
                                    {item.step}
                                </div>
                                <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                                    <item.icon className="text-blue-400" size={20} />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative rounded-[2.5rem] md:rounded-[3rem] overflow-hidden border border-white/10 p-8 md:p-16 text-center"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-surface/50 to-cyan-500/10 pointer-events-none" />
                    <div className="relative z-10">
                        <span className="text-blue-400 font-bold tracking-[0.2em] uppercase text-[10px] mb-4 block">Prêt à passer à l'action ?</span>
                        <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">
                            Votre site web,{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 italic">
                                en 3 semaines
                            </span>
                        </h2>
                        <p className="text-gray-300 max-w-xl mx-auto mb-8 text-lg leading-relaxed">
                            De l'idée à la mise en ligne, nous gérons tout. Parlons de votre projet.
                        </p>
                        <Button
                            className="bg-white text-black hover:bg-blue-500 hover:text-white rounded-full px-10 py-6 text-sm font-black tracking-widest uppercase transition-all shadow-[0_10px_40px_rgba(59,130,246,0.3)] hover:shadow-[0_10px_40px_rgba(59,130,246,0.5)]"
                            onClick={handleContact}
                        >
                            Démarrer mon projet
                        </Button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default WebClient;
