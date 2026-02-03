import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Music2 } from "lucide-react";
import Link from "next/link";
import OptimizedImage from "./OptimizedImage";

const Footer = () => {
    return (
        <footer className="bg-surface/50 text-white pt-16 pb-8 border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 text-center md:text-left">
                    {/* Agency Info */}
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="mb-6 block h-10 w-fit">
                            <OptimizedImage
                                src="/assets/logos/logo_white.png"
                                alt="LOLLY Agency"
                                height={40}
                                width={150}
                                className="h-10 w-auto object-contain"
                            />
                        </Link>
                        <p className="text-gray-300 mb-8 max-w-sm mx-auto md:mx-0 leading-relaxed">
                            Des mots qui touchent, des images qui marquent.
                            Nous sommes une agence de communication basée à Dakar, dédiée à propulser votre image de marque.
                        </p>
                        <div className="flex justify-center md:justify-start space-x-6">
                            <a href="https://www.linkedin.com/company/lolly-sas" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-primary transition-colors p-2" aria-label="LinkedIn">
                                <Linkedin size={22} />
                            </a>
                            <a href="https://www.instagram.com/agence_lolly/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-primary transition-colors p-2" aria-label="Instagram">
                                <Instagram size={22} />
                            </a>
                            <a href="https://www.facebook.com/AGENCELOLLY" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-primary transition-colors p-2" aria-label="Facebook">
                                <Facebook size={22} />
                            </a>
                            <a href="https://www.tiktok.com/@agence_lolly" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-primary transition-colors p-2" aria-label="TikTok">
                                <Music2 size={22} />
                            </a>
                        </div>
                    </div>

                    {/* Links */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-bold mb-6 text-secondary uppercase tracking-widest text-sm">Liens Rapides</h4>
                        <ul className="space-y-3">
                            <li><Link href="/" className="text-gray-300 hover:text-primary transition-colors py-1 inline-block">Accueil</Link></li>
                            <li><Link href="/services" className="text-gray-300 hover:text-primary transition-colors py-1 inline-block">Services</Link></li>
                            <li><Link href="/portfolio" className="text-gray-300 hover:text-primary transition-colors py-1 inline-block">Réalisations</Link></li>
                            <li><Link href="/about" className="text-gray-300 hover:text-primary transition-colors py-1 inline-block">À propos</Link></li>
                            <li><Link href="/contact" className="text-gray-300 hover:text-primary transition-colors py-1 inline-block">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-bold mb-6 text-secondary uppercase tracking-widest text-sm">Contact</h4>
                        <ul className="space-y-6">
                            <li className="flex flex-col md:flex-row items-center md:items-start gap-3">
                                <MapPin className="text-primary shrink-0" size={20} />
                                <span className="text-gray-300 text-sm">LOLLY SAS, Fass Delorme Rue 22x13, Apt 201</span>
                            </li>
                            <li className="flex flex-col md:flex-row items-center md:items-start gap-3">
                                <Phone className="text-primary shrink-0" size={20} />
                                <a href="tel:+221772354747" className="text-gray-300 hover:text-primary transition-colors text-sm">+221 77 235 47 47</a>
                            </li>
                            <li className="flex flex-col md:flex-row items-center md:items-start gap-3">
                                <Mail className="text-primary shrink-0" size={20} />
                                <a href="mailto:contact@lolly.sn" className="text-gray-300 hover:text-primary transition-colors text-sm">contact@lolly.sn</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm gap-4">
                    <p>&copy; {new Date().getFullYear()} LOLLY Agency. Tous droits réservés.</p>
                    <div className="flex gap-6">
                        <Link href="/legal" className="hover:text-primary transition-colors">Mentions Légales</Link>
                        <Link href="/cgv" className="hover:text-primary transition-colors">CGV</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
