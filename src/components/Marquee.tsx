"use client";

const ITEMS = [
    "STRATÉGIE", "DESIGN", "BRANDING", "PRODUCTION",
    "SITE WEB", "FORMATION", "MARKETING", "PHOTOGRAPHIE", "VIDÉO",
];

const MarqueeRow = () => (
    <span className="flex items-center shrink-0 text-black font-black text-xl md:text-4xl uppercase tracking-tighter">
        {ITEMS.map((word, j) => (
            <span key={j} className="flex items-center">
                {word}
                <span className="mx-6 text-2xl" aria-hidden="true">•</span>
            </span>
        ))}
    </span>
);

const Marquee = () => (
    <div
        className="marquee-container relative w-full overflow-hidden bg-primary py-2 md:py-4 border-y border-black select-none"
        title="Survolez pour mettre en pause"
        role="marquee"
        aria-label="Nos domaines d'expertise"
    >
        {/* Two copies → seamless CSS loop via translateX(-50%) */}
        <div className="marquee-track whitespace-nowrap">
            <MarqueeRow />
            <MarqueeRow />
        </div>
    </div>
);

export default Marquee;
