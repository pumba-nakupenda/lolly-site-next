"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

const LABELS: Record<string, string> = {
    services: "Services",
    consulting: "Consulting",
    design: "Design Graphique",
    video: "Production Vidéo",
    photo: "Photographie",
    social: "Community Management",
    content: "Création de Contenu",
    formations: "Formations",
    web: "Création de Site Web",
    portfolio: "Portfolio",
    about: "À propos",
    blog: "Le Lab",
    contact: "Contact",
};

export default function Breadcrumb() {
    const pathname = usePathname();
    const segments = pathname.split("/").filter(Boolean);

    // Only show on nested pages (e.g. /services/web, not /)
    if (segments.length < 2) return null;

    return (
        <nav
            aria-label="Fil d'Ariane"
            className="absolute top-[72px] md:top-[88px] left-0 right-0 z-30 px-6 pointer-events-none"
        >
            <div className="container mx-auto">
                <ol className="flex items-center gap-1.5 flex-wrap pointer-events-auto">
                    <li>
                        <Link
                            href="/"
                            className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors"
                        >
                            <Home size={10} />
                            Accueil
                        </Link>
                    </li>
                    {segments.map((seg, i) => {
                        const href = "/" + segments.slice(0, i + 1).join("/");
                        const isLast = i === segments.length - 1;
                        return (
                            <li key={href} className="flex items-center gap-1.5">
                                <ChevronRight size={9} className="text-gray-700" aria-hidden="true" />
                                {isLast ? (
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary" aria-current="page">
                                        {LABELS[seg] || seg}
                                    </span>
                                ) : (
                                    <Link
                                        href={href}
                                        className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors"
                                    >
                                        {LABELS[seg] || seg}
                                    </Link>
                                )}
                            </li>
                        );
                    })}
                </ol>
            </div>
        </nav>
    );
}
