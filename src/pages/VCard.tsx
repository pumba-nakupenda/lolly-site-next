import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, Globe, MapPin, Download, Share2, Linkedin, Instagram, Facebook, Music2, Smartphone, QrCode, X } from "lucide-react";
import { Button } from "../components/ui/Button";

const VCard = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [showQrCode, setShowQrCode] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const contactInfo = {
        firstName: "Amadou Mbaye",
        lastName: "GUEYE",
        title: "Fondateur et Consultant",
        company: "LOLLY SAS",
        phone: "+221772354747",
        displayPhone: "+221 77 235 47 47",
        email: "contact@lolly.sn",
        website: "https://lolly.sn",
        address: "Fass Delorme Rue 22x13, Dakar, Sénégal",
        avatar: "/assets/amadou-mbaye-gueye.jpg",
        bio: "J'accompagne les entreprises et les institutions dans leur stratégie de communication et leur transformation digitale.",
        services: ["Stratégie", "Branding", "Communication", "Formation"],
        socials: [
            { icon: Linkedin, url: "https://www.linkedin.com/company/lolly-sas" },
            { icon: Instagram, url: "https://www.instagram.com/agence_lolly/" },
            { icon: Facebook, url: "https://www.facebook.com/AGENCELOLLY" },
            { icon: Music2, url: "https://www.tiktok.com/@agence_lolly" }
        ]
    };

    const generateVCard = async () => {
        // VCard 3.0 requires CRLF (\r\n) line endings
        const vcard = [
            'BEGIN:VCARD',
            'VERSION:3.0',
            `N:${contactInfo.lastName};${contactInfo.firstName};;;`,
            `FN:${contactInfo.firstName} ${contactInfo.lastName}`,
            `ORG:${contactInfo.company}`,
            `TITLE:${contactInfo.title}`,
            `TEL;TYPE=CELL:${contactInfo.phone}`,
            `EMAIL:${contactInfo.email}`,
            `URL:${contactInfo.website}`,
            `ADR;TYPE=WORK:;;${contactInfo.address};;;;`,
            'END:VCARD'
        ].join('\r\n');

        // text/x-vcard is often more compatible for direct sharing on mobile
        // Trigger download - on mobile this typically prompts to "Open in Contacts"
        const blob = new Blob([vcard], { type: "text/x-vcard;charset=utf-8" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "amadou_mbaye_gueye.vcf");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `${contactInfo.firstName} ${contactInfo.lastName} - ${contactInfo.company}`,
                    text: `Voici la carte de visite digitale de ${contactInfo.firstName} ${contactInfo.lastName}, ${contactInfo.title} chez ${contactInfo.company}.`,
                    url: window.location.href
                });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(window.location.href);
            alert("Lien copié dans le presse-papier !");
        }
    };


    if (!isMobile) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-4">
                <div className="text-center space-y-4 max-w-md">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto text-primary mb-6">
                        <Smartphone size={32} />
                    </div>
                    <h1 className="text-2xl font-bold text-white">Version Mobile Uniquement</h1>
                    <p className="text-gray-400">
                        Cette carte de visite digitale est conçue pour être visualisée sur votre téléphone pour une meilleure expérience.
                    </p>
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10 mt-8">
                        <p className="text-sm text-gray-500">Ouvrez le lien sur votre mobile</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[-20%] right-[-20%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.5, 1],
                        x: [0, -50, 0],
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-[-20%] left-[-20%] w-[500px] h-[500px] bg-accent/20 rounded-full blur-[150px]"
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-md bg-surface/30 backdrop-blur-2xl border border-white/10 rounded-[3rem] overflow-hidden relative z-10 shadow-2xl"
            >
                {/* Header Image / Banner */}
                <div className="h-32 bg-gradient-to-r from-primary/20 to-accent/20 relative">
                    <div className="absolute inset-0 bg-[url('/assets/pattern.png')] opacity-10" />

                    {/* Logo Overlay */}
                    <div className="absolute top-6 left-0 right-0 text-center z-10">
                        <span
                            className="text-2xl tracking-tight text-white italic"
                            style={{ fontFamily: 'var(--font-logo)', fontWeight: 900 }}
                        >
                            LOLLY<span className="text-primary">.</span>
                        </span>
                    </div>

                    {/* QR Code Toggle */}
                    <button
                        onClick={() => setShowQrCode(true)}
                        className="absolute top-4 right-4 w-10 h-10 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/40 transition-colors"
                    >
                        <QrCode size={18} />
                    </button>
                </div>

                {/* Profile Picture */}
                <div className="px-8 relative -mt-16 text-center">
                    <div className="w-32 h-32 mx-auto rounded-[2rem] p-1.5 bg-background border border-white/10 relative shadow-xl">
                        <img
                            src={contactInfo.avatar}
                            alt={contactInfo.firstName}
                            className="w-full h-full object-cover rounded-[1.5rem]"
                        />
                        <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-4 border-black rounded-full" />
                    </div>

                    <div className="mt-6 space-y-2">
                        <h1 className="text-2xl font-bold text-white tracking-tight">{contactInfo.firstName} {contactInfo.lastName}</h1>
                        <p className="text-primary font-bold text-xs uppercase tracking-widest">{contactInfo.title}</p>
                        <p className="text-gray-400 text-sm font-medium">{contactInfo.company}</p>

                        {/* Bio */}
                        <p className="text-gray-400 text-xs leading-relaxed max-w-[280px] mx-auto pt-2">
                            {contactInfo.bio}
                        </p>

                        {/* Services Tags */}
                        <div className="flex flex-wrap justify-center gap-2 pt-3">
                            {contactInfo.services.map((service, index) => (
                                <span key={index} className="px-3 py-1 bg-white/5 rounded-full text-[10px] text-gray-300 border border-white/5">
                                    {service}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="px-8 py-8 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <Button
                            className="w-full h-12 rounded-xl font-bold text-sm shadow-lg shadow-primary/20"
                            onClick={generateVCard}
                        >
                            <Download size={16} className="mr-2" />
                            Garder Contact
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full h-12 rounded-xl font-bold text-sm border-white/10 hover:bg-white/5"
                            onClick={handleShare}
                        >
                            <Share2 size={16} className="mr-2" />
                            Partager
                        </Button>
                    </div>

                    <div className="space-y-4">
                        <a href={`tel:${contactInfo.phone}`} className="flex items-center p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 transition-all group">
                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                <Phone size={20} />
                            </div>
                            <div className="ml-4">
                                <p className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">Mobile</p>
                                <p className="text-white font-medium">{contactInfo.displayPhone}</p>
                            </div>
                        </a>

                        <a href={`mailto:${contactInfo.email}`} className="flex items-center p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 transition-all group">
                            <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                                <Mail size={20} />
                            </div>
                            <div className="ml-4">
                                <p className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">Email</p>
                                <p className="text-white font-medium">{contactInfo.email}</p>
                            </div>
                        </a>

                        <a href={contactInfo.website} target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 transition-all group">
                            <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                                <Globe size={20} />
                            </div>
                            <div className="ml-4">
                                <p className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">Site Web</p>
                                <p className="text-white font-medium">lolly.sn</p>
                            </div>
                        </a>

                        <div className="flex items-center p-4 bg-white/5 rounded-2xl border border-white/5 transition-all">
                            <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-white shrink-0">
                                <MapPin size={20} />
                            </div>
                            <div className="ml-4">
                                <p className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">Adresse</p>
                                <p className="text-white font-medium text-sm">{contactInfo.address}</p>
                            </div>
                        </div>
                    </div>

                    {/* Socials */}
                    <div className="flex justify-center gap-4 pt-4 border-t border-white/5">
                        {contactInfo.socials.map((social, i) => (
                            <a
                                key={i}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white/5 hover:bg-primary hover:text-black rounded-full flex items-center justify-center transition-all"
                            >
                                <social.icon size={18} />
                            </a>
                        ))}
                    </div>
                </div>


                <div className="bg-black/40 py-4 text-center pb-24">
                    <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Powered by LOLLY Agency</p>
                </div>
            </motion.div>

            {/* QR Code Modal */}
            <AnimatePresence>
                {showQrCode && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowQrCode(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-surface border border-white/10 p-8 rounded-3xl relative z-10 w-full max-w-xs text-center shadow-2xl"
                        >
                            <button
                                onClick={() => setShowQrCode(false)}
                                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white/5 rounded-full text-gray-400 hover:text-white"
                            >
                                <X size={16} />
                            </button>

                            <h3 className="text-xl font-bold text-white mb-6">Mon QR Code</h3>
                            <div className="bg-white p-4 rounded-2xl inline-block mx-auto mb-6">
                                <img
                                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(window.location.href)}&color=000000`}
                                    alt="QR Code"
                                    className="w-48 h-48"
                                />
                            </div>
                            <p className="text-sm text-gray-400">
                                Scannez pour accéder à la carte de visite
                            </p>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Floating Action Buttons */}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4 items-center pointer-events-none">
                {/* Call Button - Top */}
                <motion.a
                    href={`tel:${contactInfo.phone}`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-14 h-14 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-lg pointer-events-auto"
                >
                    <Phone size={24} fill="currentColor" />
                </motion.a>

                {/* WhatsApp Button - Bottom */}
                <motion.a
                    href={`https://wa.me/${contactInfo.phone.replace(/\+/g, '')}?text=Bonjour, je souhaite entrer en contact avec vous.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg pointer-events-auto relative"
                >
                    <svg
                        viewBox="0 0 24 24"
                        width="28"
                        height="28"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.634 1.437h.005c6.558 0 11.895-5.335 11.898-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                </motion.a>
            </div>
        </div>
    );
};

export default VCard;
