const COMPANIES = [
    { name: "Google", icon: "G" },
    { name: "Shopify", icon: "S" },
    { name: "Netflix", icon: "N" },
    { name: "Airbnb", icon: "A" },
    { name: "Stripe", icon: "Sᵗ" },
    { name: "Slack", icon: "Sl" },
    { name: "Figma", icon: "F" },
    { name: "Notion", icon: "N" },
    { name: "Linear", icon: "L" },
    { name: "Vercel", icon: "▲" },
    { name: "Discord", icon: "D" },
    { name: "GitHub", icon: "GH" },
]

// Duplicate for infinite scroll
const DUPLICATED = [...COMPANIES, ...COMPANIES]

export default function LogoCarousel() {
    return (
        <section className="py-14 border-y border-white/5 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 mb-8 text-center">
                <p className="text-sm text-white/30 uppercase tracking-widest font-semibold">
                    Trusted by teams at world-class companies
                </p>
            </div>

            <div className="relative">
                {/* Fade edges */}
                <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-darkbg to-transparent pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-darkbg to-transparent pointer-events-none" />

                {/* Scrolling track */}
                <div className="flex animate-marquee whitespace-nowrap gap-8 pl-8">
                    {DUPLICATED.map((c, i) => (
                        <div
                            key={`${c.name}-${i}`}
                            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl glass-light border border-white/5 flex-shrink-0 hover:border-primary/30 transition-colors cursor-default"
                        >
                            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary/30 to-accent/20 flex items-center justify-center text-[10px] font-bold text-primary">
                                {c.icon}
                            </div>
                            <span className="text-sm text-white/50 font-medium">{c.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
