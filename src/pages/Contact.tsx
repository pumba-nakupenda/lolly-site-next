import { Button } from "../components/ui/Button";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Loader2, CheckCircle2, Linkedin, Instagram, Facebook, Music2 } from "lucide-react";
import { useState } from "react";

const WEBHOOK_URL = "https://n8n.srv812544.hstgr.cloud/webhook/2ee87114-da42-4f38-85e8-c4a99ba04a3f";

const Contact = () => {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        countryCode: "+221",
        subject: "Consulting Stratégique",
        message: ""
    });

    const countries = [
        { code: "+221", label: "SN", name: "Sénégal" },
        { code: "+225", label: "CI", name: "Côte d'Ivoire" },
        { code: "+33", label: "FR", name: "France" },
        { code: "+223", label: "ML", name: "Mali" },
        { code: "+226", label: "BF", name: "Burkina Faso" },
        { code: "+242", label: "CG", name: "Congo" },
        { code: "+241", label: "GA", name: "Gabon" },
        { code: "+212", label: "MA", name: "Maroc" },
    ];

    const subjects = [
        "Consulting Stratégique",
        "Formation Digitale Pro",
        "Production Vidéo / Photo",
        "Design & Branding",
        "Community Management",
        "Création de Contenu",
        "Autre demande"
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const dataToSend = {
                ...formData,
                fullPhone: formData.phone ? `${formData.countryCode} ${formData.phone}` : "Non renseigné",
                source: "Contact Page",
                timestamp: new Date().toISOString()
            };

            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: "", email: "", phone: "", countryCode: "+221", subject: "Consulting Stratégique", message: "" });
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                throw new Error(`Server responded with ${response.status}`);
            }
        } catch (error: any) {
            console.error("Webhook error:", error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 4000);
        }
    };

    return (
        <div className="pt-40 pb-20 px-6 min-h-screen bg-transparent relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                        x: [0, 50, 0],
                        y: [0, -30, 0]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.5, 1],
                        x: [0, -80, 0],
                        y: [0, 40, 0]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px]"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.03)_0%,transparent_70%)]" />
            </div>

            <div className="container mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center mb-20"
                >
                    <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="bg-primary/10 text-primary font-bold tracking-[0.2em] uppercase text-xs px-4 py-1.5 rounded-full mb-6 inline-block border border-primary/20 backdrop-blur-sm"
                    >
                        Une idée ? Une question ?
                    </motion.span>
                    <h1 className="text-5xl md:text-8xl font-serif font-bold text-white mb-8 tracking-tight">
                        Parlons de <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary">votre projet</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        Que vous soyez au début de votre réflexion ou prêt à lancer votre campagne, nous sommes là pour vous accompagner vers l'excellence.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-7xl mx-auto">
                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="lg:col-span-7 bg-surface/40 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative group"
                    >
                        {/* Decorative inner glow */}
                        <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        {status === 'success' ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="py-20 flex flex-col items-center text-center"
                            >
                                <motion.div
                                    initial={{ rotate: -20, scale: 0 }}
                                    animate={{ rotate: 0, scale: 1 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                                    className="w-24 h-24 bg-green-500/20 rounded-3xl flex items-center justify-center mb-8 rotate-3 shadow-lg shadow-green-500/10"
                                >
                                    <CheckCircle2 size={56} className="text-green-500" />
                                </motion.div>
                                <h1 className="text-4xl font-bold text-white mb-6">Merci infiniment !</h1>
                                <p className="text-gray-400 max-w-sm text-lg mb-10 leading-relaxed">
                                    Votre demande a été transmise avec succès. Notre équipe s'engage à vous répondre sous 24h.
                                </p>
                                <Button
                                    size="lg"
                                    className="px-12 h-14 rounded-2xl"
                                    onClick={() => setStatus('idle')}
                                >
                                    Envoyer un autre message
                                </Button>
                            </motion.div>
                        ) : (
                            <div className="relative z-10">
                                <h2 className="text-3xl font-bold mb-10 text-white flex items-center gap-4">
                                    Envoyer un message
                                    <div className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
                                </h2>
                                <form className="space-y-8" onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <motion.div
                                            whileHover={{ y: -2 }}
                                            className="space-y-2"
                                        >
                                            <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] ml-1">Identité</label>
                                            <input
                                                required
                                                type="text"
                                                className="w-full bg-background/30 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary/50 focus:bg-background/60 focus:ring-4 focus:ring-primary/5 transition-all placeholder:text-gray-600"
                                                placeholder="Votre nom complet"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </motion.div>
                                        <motion.div
                                            whileHover={{ y: -2 }}
                                            className="space-y-2"
                                        >
                                            <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] ml-1">Contact Email</label>
                                            <input
                                                required
                                                type="email"
                                                inputMode="email"
                                                className="w-full bg-background/30 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary/50 focus:bg-background/60 focus:ring-4 focus:ring-primary/5 transition-all placeholder:text-gray-600"
                                                placeholder="votre@email.pro"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            />
                                        </motion.div>
                                    </div>

                                    <motion.div
                                        whileHover={{ y: -2 }}
                                        className="space-y-2"
                                    >
                                        <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] ml-1">Téléphone (Mobile)</label>
                                        <div className="flex gap-3">
                                            <select
                                                className="bg-background/20 border border-white/5 rounded-2xl px-4 py-4 text-white focus:outline-none focus:border-primary/50 transition-all text-sm w-32 backdrop-blur-md appearance-none cursor-pointer"
                                                value={formData.countryCode}
                                                onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                                            >
                                                {countries.map(c => (
                                                    <option key={c.code} value={c.code} className="bg-surface text-white">
                                                        {c.label} {c.code}
                                                    </option>
                                                ))}
                                            </select>
                                            <input
                                                type="tel"
                                                inputMode="tel"
                                                className="flex-1 bg-background/30 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary/50 focus:bg-background/60 focus:ring-4 focus:ring-primary/5 transition-all placeholder:text-gray-600"
                                                placeholder="77 000 00 00"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            />
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        whileHover={{ y: -2 }}
                                        className="space-y-2"
                                    >
                                        <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] ml-1">Domaine d'intervention</label>
                                        <select
                                            className="w-full bg-background/30 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary/50 focus:bg-background/60 focus:ring-4 focus:ring-primary/5 transition-all appearance-none cursor-pointer"
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        >
                                            {subjects.map(sub => (
                                                <option key={sub} value={sub} className="bg-surface">{sub}</option>
                                            ))}
                                        </select>
                                    </motion.div>

                                    <motion.div
                                        whileHover={{ y: -2 }}
                                        className="space-y-2"
                                    >
                                        <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] ml-1">Détails de votre demande</label>
                                        <textarea
                                            required
                                            rows={5}
                                            className="w-full bg-background/30 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary/50 focus:bg-background/60 focus:ring-4 focus:ring-primary/5 transition-all resize-none placeholder:text-gray-600"
                                            placeholder="Décrivez-nous votre vision ou vos objectifs..."
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        ></textarea>
                                    </motion.div>

                                    <div className="pt-4">
                                        <Button
                                            type="submit"
                                            disabled={status === 'loading'}
                                            className="w-full h-16 text-xl font-bold rounded-2xl shadow-[0_10px_30px_rgba(255,215,0,0.2)] hover:shadow-[0_15px_40px_rgba(255,215,0,0.3)] transition-all flex items-center justify-center gap-3 overflow-hidden group"
                                        >
                                            {status === 'loading' ? (
                                                <>
                                                    <Loader2 className="animate-spin" size={24} />
                                                    Traitement de votre demande...
                                                </>
                                            ) : (
                                                <>
                                                    Démarrez l'aventure
                                                    <motion.span
                                                        animate={{ x: [0, 5, 0] }}
                                                        transition={{ repeat: Infinity, duration: 1.5 }}
                                                    >
                                                        →
                                                    </motion.span>
                                                </>
                                            )}
                                        </Button>
                                    </div>

                                    {status === 'error' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-red-500 text-sm font-medium text-center"
                                        >
                                            Une erreur est survenue lors de l'envoi. Veuillez réessayer ou nous contacter par email.
                                        </motion.div>
                                    )}
                                </form>
                            </div>
                        )}
                    </motion.div>

                    {/* Info Column */}
                    <div className="lg:col-span-5 space-y-10">
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="bg-surface/20 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/5"
                        >
                            <h2 className="text-3xl font-serif font-bold text-white mb-6">On reste à votre écoute.</h2>
                            <p className="text-gray-400 mb-10 leading-relaxed">
                                Besoin d'un conseil immédiat ? N'hésitez pas à nous solliciter via nos différents canaux. On adore discuter nouvelles idées !
                            </p>

                            <div className="space-y-6">
                                {[
                                    { icon: MapPin, title: "Notre Siège", content: "LOLLY SAS, Fass Delorme Rue 22x13, Appt 201", color: "text-primary" },
                                    { icon: Phone, title: "Ligne Directe", content: "+221 77 235 47 47", href: "tel:+221772354747", sub: "Disponibilité immédiate", color: "text-accent" },
                                    { icon: Mail, title: "Email Général", content: "contact@lolly.sn", href: "mailto:contact@lolly.sn", color: "text-white" }
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ x: 10, scale: 1.02 }}
                                        className="flex items-center p-6 bg-white/[0.03] rounded-3xl border border-white/5 hover:border-white/10 transition-all cursor-default group/card"
                                    >
                                        <div className={`w-14 h-14 ${item.color.split('-')[1]}/10 rounded-2xl flex items-center justify-center mr-6 group-hover/card:scale-110 transition-transform bg-black/40`}>
                                            <item.icon size={26} className={item.color} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">{item.title}</p>
                                            {item.href ? (
                                                <a href={item.href} className="text-white font-bold text-lg leading-none mb-1 hover:text-primary transition-colors">
                                                    {item.content}
                                                </a>
                                            ) : (
                                                <p className="text-white font-bold text-lg leading-none mb-1">{item.content}</p>
                                            )}
                                            {item.sub && <p className="text-gray-500 text-xs">{item.sub}</p>}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="bg-gradient-to-br from-primary/20 to-accent/5 p-10 rounded-[2.5rem] border border-primary/10 relative overflow-hidden"
                        >
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold text-white mb-4">Suivez-nous</h3>
                                <p className="text-gray-400 text-sm mb-6 uppercase tracking-widest font-bold">@lolly_agency</p>
                                <div className="flex gap-4">
                                    {[
                                        { icon: Linkedin, url: "https://www.linkedin.com/company/lolly-sas" },
                                        { icon: Instagram, url: "https://www.instagram.com/agence_lolly/" },
                                        { icon: Facebook, url: "https://www.facebook.com/AGENCELOLLY" },
                                        { icon: Music2, url: "https://www.tiktok.com/@agence_lolly" }
                                    ].map((social, i) => (
                                        <a
                                            key={i}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 bg-white/5 rounded-full hover:bg-primary hover:text-black transition-all flex items-center justify-center border border-white/5"
                                        >
                                            <social.icon size={18} />
                                        </a>
                                    ))}
                                </div>
                            </div>
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
                        </motion.div>
                    </div>
                </div>

                {/* Stylized Map Section */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-32 relative group"
                >
                    <div className="absolute inset-0 bg-primary/20 blur-[100px] opacity-0 group-hover:opacity-30 transition-opacity duration-1000" />
                    <div className="bg-surface/30 backdrop-blur-xl border border-white/10 rounded-[4rem] h-[600px] relative overflow-hidden group/map shadow-3xl">
                        {/* Real Styled Google Map Embed */}
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3859.324!2d-17.4555932!3d14.6878172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xec173cd4cab8e55%3A0x5ac445cca102ad01!2sLOLLY%20SAS!5e0!3m2!1sfr!2ssn!4v1737842276034!5m2!1sfr!2ssn"
                            width="100%"
                            height="100%"
                            style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.2) brightness(0.8)' }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Location LOLLY SAS"
                            className="absolute inset-0 opacity-80 group-hover/map:opacity-100 transition-opacity duration-700"
                        ></iframe>

                        {/* Overlay info for mobile or context */}
                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-[2rem] text-center w-[90%] md:w-auto min-w-[320px] shadow-2xl z-20 pointer-events-none group-hover/map:translate-y-[-10px] transition-transform">
                            <h3 className="text-xl font-bold text-white mb-2">LOLLY SAS</h3>
                            <p className="text-gray-400 text-sm mb-4">Fass Delorme Rue 22x13, Dakar</p>
                            <div className="flex items-center justify-center gap-2 text-primary text-[10px] font-black uppercase tracking-widest">
                                <MapPin size={12} />
                                Siège Social
                            </div>
                        </div>

                        {/* Corner markers */}
                        <div className="absolute top-10 left-10 w-4 h-4 border-t-2 border-l-2 border-primary/30 z-20" />
                        <div className="absolute top-10 right-10 w-4 h-4 border-t-2 border-r-2 border-primary/30 z-20" />
                        <div className="absolute bottom-10 left-10 w-4 h-4 border-b-2 border-l-2 border-primary/30 z-20" />
                        <div className="absolute bottom-10 right-10 w-4 h-4 border-b-2 border-r-2 border-primary/30 z-20" />
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Contact;
