import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Phone, MapPin, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/Button";
import { useState, useEffect } from "react";

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    prefilledSubject?: string;
}

const WEBHOOK_URL = process.env.NEXT_PUBLIC_WEBHOOK_URL || "https://n8n.srv812544.hstgr.cloud/webhook/2ee87114-da42-4f38-85e8-c4a99ba04a3f";

const ContactModal = ({ isOpen, onClose, title = "Contactez-nous", prefilledSubject }: ContactModalProps) => {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        countryCode: "+221",
        subject: "Demande de devis",
        message: ""
    });

    // Handle pre-filled subject
    useEffect(() => {
        if (prefilledSubject) {
            setFormData(prev => ({ ...prev, subject: prefilledSubject }));
        }
    }, [prefilledSubject, isOpen]);

    const countries = [
        { code: "+221", label: "SN" },
        { code: "+225", label: "CI" },
        { code: "+33", label: "FR" },
        { code: "+223", label: "ML" },
        { code: "+226", label: "BF" },
    ];

    const subjects = [
        "Demande de devis",
        "Formation Digitale",
        "Consulting / Audit",
        "Production Audiovisuelle",
        "Design & Branding",
        "Autre"
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const dataToSend = {
                ...formData,
                fullPhone: formData.phone ? `${formData.countryCode} ${formData.phone}` : "Non renseigné",
                source: "Modal Pop-up",
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
                setTimeout(() => {
                    onClose();
                    setStatus('idle');
                    setFormData({ name: "", email: "", phone: "", countryCode: "+221", subject: "Demande de devis", message: "" });
                }, 2000);
            } else {
                throw new Error(`Server error ${response.status}`);
            }
        } catch (error: any) {
            console.error("Modal Webhook error:", error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 4000);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="bg-surface border border-white/10 rounded-3xl w-full max-w-2xl relative z-10 shadow-2xl overflow-hidden flex flex-col md:flex-row"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-20 w-8 h-8 flex items-center justify-center bg-black/20 rounded-full"
                        >
                            <X size={20} />
                        </button>

                        {/* Info Side */}
                        <div className="p-8 bg-primary/10 md:w-1/3 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/5">
                            <h3 className="text-xl font-serif font-bold text-white mb-8">Nous Contacter</h3>
                            <div className="space-y-8">
                                <div className="flex items-start">
                                    <div className="bg-primary/20 p-2 rounded-lg mr-4">
                                        <MapPin className="text-primary" size={20} />
                                    </div>
                                    <div>
                                        <span className="block text-white font-medium text-sm">Bureau</span>
                                        <span className="text-xs text-gray-400">LOLLY SAS, Fass Delorme Rue 22x13, Dakar</span>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="bg-primary/20 p-2 rounded-lg mr-4">
                                        <Phone className="text-primary" size={20} />
                                    </div>
                                    <div>
                                        <span className="block text-white font-medium text-sm">Téléphone</span>
                                        <span className="text-xs text-gray-400 text-nowrap">+221 77 235 47 47</span>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="bg-primary/20 p-2 rounded-lg mr-4">
                                        <Mail className="text-primary" size={20} />
                                    </div>
                                    <div>
                                        <span className="block text-white font-medium text-sm">Email</span>
                                        <span className="text-xs text-gray-400 text-wrap break-all">contact@lolly.sn</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form Side */}
                        <div className="p-8 md:p-10 md:w-2/3 bg-surface">
                            {status === 'success' ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="h-full flex flex-col items-center justify-center text-center py-12"
                                >
                                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                                        <CheckCircle2 size={40} className="text-green-500" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-white mb-2">Message reçu !</h2>
                                    <p className="text-gray-400 text-sm">Un membre de l'équipe vous contactera très prochainement.</p>
                                </motion.div>
                            ) : (
                                <>
                                    <h2 className="text-2xl font-bold mb-2 text-white">{title}</h2>
                                    <p className="text-gray-400 mb-8 text-sm lowercase tracking-wide">Parlons de votre prochain succès.</p>

                                    <form className="space-y-5" onSubmit={handleSubmit}>
                                        <div className="grid grid-cols-1 gap-5">
                                            <div>
                                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Nom complet *</label>
                                                <input
                                                    required
                                                    type="text"
                                                    className="w-full bg-background border border-white/5 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary transition-all text-sm shadow-inner"
                                                    placeholder="Votre nom"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Email *</label>
                                                <input
                                                    required
                                                    type="email"
                                                    className="w-full bg-background border border-white/5 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary transition-all text-sm shadow-inner"
                                                    placeholder="votre@email.com"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Téléphone (facultatif)</label>
                                                <div className="flex gap-2">
                                                    <select
                                                        className="bg-background border border-white/5 rounded-xl px-2 py-2.5 text-white focus:outline-none focus:border-primary transition-all text-[11px] w-20"
                                                        value={formData.countryCode}
                                                        onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                                                    >
                                                        {countries.map(c => (
                                                            <option key={c.code} value={c.code} className="bg-surface">{c.label}</option>
                                                        ))}
                                                    </select>
                                                    <input
                                                        type="tel"
                                                        className="flex-1 bg-background border border-white/5 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary transition-all text-sm shadow-inner"
                                                        placeholder="77 000 00 00"
                                                        value={formData.phone}
                                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Sujet *</label>
                                            <select
                                                className="w-full bg-background border border-white/5 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary transition-all text-sm shadow-inner"
                                                value={formData.subject}
                                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            >
                                                {subjects.map(sub => (
                                                    <option key={sub} value={sub} className="bg-surface">{sub}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Message *</label>
                                            <textarea
                                                required
                                                rows={3}
                                                className="w-full bg-background border border-white/5 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary transition-all text-sm shadow-inner resize-none"
                                                placeholder="Comment pouvons-nous vous aider ?"
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            ></textarea>
                                        </div>
                                        <Button
                                            type="submit"
                                            disabled={status === 'loading'}
                                            className="w-full mt-2 h-11 text-sm font-bold shadow-xl"
                                        >
                                            {status === 'loading' ? (
                                                <span className="flex items-center gap-2">
                                                    <Loader2 className="animate-spin" size={16} />
                                                    Traitement...
                                                </span>
                                            ) : status === 'error' ? (
                                                "Réessayer"
                                            ) : (
                                                "Envoyer la demande"
                                            )}
                                        </Button>
                                    </form>
                                </>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ContactModal;
