export default function PortfolioLoading() {
    return (
        <div className="pt-24 md:pt-40 pb-20 px-6 min-h-screen">
            {/* Header */}
            <div className="max-w-2xl mx-auto text-center mb-16 animate-pulse">
                <div className="h-5 w-32 bg-white/10 rounded-full mx-auto mb-6" />
                <div className="h-20 w-full bg-white/5 rounded-2xl mb-4" />
                <div className="h-5 w-3/4 bg-white/5 rounded-full mx-auto" />
            </div>
            {/* Filter skeleton */}
            <div className="flex gap-3 justify-center mb-16 animate-pulse">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-10 w-24 bg-white/5 rounded-2xl" />
                ))}
            </div>
            {/* Grid skeleton */}
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                        key={i}
                        className="bg-white/5 rounded-[2.5rem] aspect-[4/5] animate-pulse"
                        style={{ animationDelay: `${i * 100}ms` }}
                    />
                ))}
            </div>
        </div>
    );
}
