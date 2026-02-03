"use client";

import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "./ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import OptimizedImage from "./OptimizedImage";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [servicesOpen, setServicesOpen] = useState(false); // For Mobile accordion
    const [hoverServices, setHoverServices] = useState(false); // For Desktop hover
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Structure for nav links, allowing sub-items
    const navLinks = [
        { name: "Accueil", href: "/" },
        {
            name: "Services",
            href: "/services",
            subItems: [
                { name: "Consulting", href: "/services/consulting" },
                { name: "Formations", href: "/services/formations" },
                { name: "Production Vidéo", href: "/services/video" },
                { name: "Design Graphique", href: "/services/design" },
                { name: "Photographie", href: "/services/photo" },
                { name: "Community Management", href: "/services/social" },
                { name: "Création de Contenu", href: "/services/content" },
            ]
        },
        { name: "Portfolio", href: "/portfolio" },
        { name: "Le Lab", href: "/blog" },
        { name: "À propos", href: "/about" },
        { name: "Contact", href: "/contact" },
    ];

    const isActive = (path: string) => pathname === path || (path !== '/' && pathname.startsWith(path));

    const handleContactClick = () => {
        if (window.innerWidth < 768) {
            setIsOpen(false);
            router.push('/contact');
        } else {
            window.dispatchEvent(new CustomEvent('open-contact-modal'));
        }
    };

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${scrolled
                    ? "py-4"
                    : "py-8"
                    }`}
                style={{ paddingTop: scrolled ? 'max(1rem, env(safe-area-inset-top))' : 'max(2rem, env(safe-area-inset-top))' }}
            >
                <div className="container mx-auto px-6">
                    <div className={`relative flex items-center justify-between px-8 py-4 rounded-[2rem] transition-all duration-700 ${scrolled
                        ? "bg-surface/95 md:bg-surface/40 md:backdrop-blur-2xl border border-white/10 shadow-2xl"
                        : "bg-transparent border border-transparent"}`}
                    >
                        <Link href="/" className="relative z-10 block h-8 w-auto">
                            <OptimizedImage
                                src="/assets/logos/logo_white.png"
                                alt="LOLLY Agency"
                                height={32}
                                width={120}
                                className="h-8 w-auto object-contain transition-all hover:opacity-80"
                                priority
                            />
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-10">
                            {navLinks.map((link) => (
                                <div
                                    key={link.name}
                                    className="relative group"
                                    onMouseEnter={() => link.subItems && setHoverServices(true)}
                                    onMouseLeave={() => link.subItems && setHoverServices(false)}
                                >
                                    <div className="flex items-center gap-1">
                                        <Link
                                            href={link.href}
                                            className="relative transition-colors font-bold text-[10px] uppercase tracking-[0.2em] group py-2"
                                            onClick={() => {
                                                // Optional: if clicking "Services" should just open dropdown on touch devices or do nothing if hover works
                                            }}
                                        >
                                            <span className={`relative z-10 transition-colors ${isActive(link.href) ? "text-primary" : "text-gray-400 group-hover:text-white"}`}>
                                                {link.name}
                                            </span>
                                            {isActive(link.href) && (
                                                <motion.div
                                                    layoutId="activeNav"
                                                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full shadow-[0_0_10px_rgba(255,215,0,0.5)]"
                                                />
                                            )}
                                        </Link>
                                        {link.subItems && (
                                            <ChevronDown size={12} className={`text-gray-400 transition-transform duration-300 ${hoverServices && link.name === 'Services' ? 'rotate-180 text-primary' : ''}`} />
                                        )}
                                    </div>

                                    {/* Dropdown Menu */}
                                    <AnimatePresence>
                                        {link.subItems && hoverServices && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-surface/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-2"
                                            >
                                                <div className="flex flex-col gap-1">
                                                    {link.subItems.map((subItem) => (
                                                        <Link
                                                            key={subItem.name}
                                                            href={subItem.href}
                                                            className="px-4 py-3 rounded-xl hover:bg-white/10 text-gray-300 hover:text-white transition-all text-xs font-bold uppercase tracking-wider flex items-center justify-between group/item"
                                                        >
                                                            {subItem.name}
                                                            <ChevronRight size={12} className="opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all text-primary" />
                                                        </Link>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                            <div className={pathname === '/contact' ? "invisible pointer-events-none" : ""}>
                                <Button
                                    className="h-10 px-6 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-primary/10"
                                    onClick={handleContactClick}
                                >
                                    Lancer un projet
                                </Button>
                            </div>
                        </div>

                        {/* Mobile Toggle */}
                        <button
                            className="md:hidden relative z-10 w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
                        >
                            <AnimatePresence mode="wait">
                                {isOpen ? <X key="x" size={20} /> : <Menu key="menu" size={20} />}
                            </AnimatePresence>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[-1] bg-black/95 md:bg-black/98 flex flex-col pt-32 px-10 pb-10 overflow-y-auto md:backdrop-blur-3xl"
                        >
                            <div className="flex flex-col space-y-8">
                                {navLinks.map((link, i) => (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex flex-col"
                                    >
                                        <div className="flex items-center justify-between">
                                            <Link
                                                href={link.href}
                                                className={`text-3xl font-serif font-bold ${isActive(link.href) ? "text-primary" : "text-white"}`}
                                                onClick={() => !link.subItems && setIsOpen(false)}
                                            >
                                                {link.name}
                                            </Link>
                                            {link.subItems && (
                                                <button
                                                    onClick={() => setServicesOpen(!servicesOpen)}
                                                    className="p-3 border border-white/10 rounded-2xl bg-white/5"
                                                >
                                                    <ChevronDown
                                                        size={24}
                                                        className={`text-white transition-transform duration-500 ${servicesOpen ? 'rotate-180 text-primary' : ''}`}
                                                    />
                                                </button>
                                            )}
                                        </div>

                                        {/* Mobile Submenu Accordion */}
                                        <AnimatePresence>
                                            {link.subItems && servicesOpen && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="flex flex-col gap-5 pl-6 pt-6 border-l-2 border-primary/20 ml-2 mt-2">
                                                        {link.subItems.map((subItem) => (
                                                            <Link
                                                                key={subItem.name}
                                                                href={subItem.href}
                                                                className={`text-base font-bold uppercase tracking-widest ${isActive(subItem.href) ? "text-primary" : "text-gray-400"}`}
                                                                onClick={() => setIsOpen(false)}
                                                            >
                                                                {subItem.name}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                ))}

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                    className="pt-12 border-t border-white/10 mt-auto"
                                >
                                    <Button className="w-full h-16 text-lg font-black rounded-2xl" onClick={handleContactClick}>
                                        Lancer un projet
                                    </Button>

                                    {/* Social Links in Mobile Menu */}
                                    <div className="flex justify-center gap-6 mt-12">
                                        {[
                                            { icon: "Instagram", url: "https://www.instagram.com/agence_lolly/" },
                                            { icon: "Linkedin", url: "https://www.linkedin.com/company/lolly-sas" },
                                            { icon: "Facebook", url: "https://www.facebook.com/AGENCELOLLY" },
                                        ].map((social, i) => (
                                            <a
                                                key={i}
                                                href={social.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-primary hover:border-primary/30 transition-all font-bold text-xs uppercase"
                                            >
                                                {social.icon[0]}
                                            </a>
                                        ))}
                                    </div>
                                    <p className="text-center text-[8px] text-gray-600 mt-8 uppercase tracking-[0.3em] font-black">
                                        © {new Date().getFullYear()} LOLLY SAS
                                    </p>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </>
    );
};

export default Navbar;
