export default function ServicesLoading() {
    return (
        <div className="pt-24 md:pt-40 pb-20 px-6 min-h-screen">
            {/* Header skeleton */}
            <div className="max-w-3xl mx-auto text-center mb-24 animate-pulse">
                <div className="h-5 w-48 bg-white/10 rounded-full mx-auto mb-6" />
                <div className="h-16 w-full bg-white/5 rounded-2xl mb-4" />
                <div className="h-16 w-3/4 bg-white/5 rounded-2xl mx-auto mb-8" />
                <div className="h-5 w-2/3 bg-white/5 rounded-full mx-auto" />
            </div>
            {/* Cards skeleton */}
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white/5 rounded-[2.5rem] h-80 animate-pulse" style={{ animationDelay: `${i * 150}ms` }} />
                ))}
            </div>
        </div>
    );
}
