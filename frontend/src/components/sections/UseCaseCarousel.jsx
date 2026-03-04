import { useState } from "react"

const USE_CASES = [
    { icon: "🍽️", title: "Restaurant Menus", desc: "Replace physical menus with contactless QR menus that update instantly", tag: "Hospitality" },
    { icon: "📇", title: "Digital Business Card", desc: "Share contact info, social profiles, and portfolio with a scannable QR code", tag: "Networking" },
    { icon: "📦", title: "Package Tracking", desc: "Add QR codes to packages for instant tracking and delivery updates", tag: "Logistics" },
    { icon: "🎟️", title: "Event Tickets", desc: "Generate unique QR ticket codes for events, shows, and conferences", tag: "Events" },
    { icon: "📶", title: "WiFi Sharing", desc: "Let guests connect to your network with a simple scan — no password needed", tag: "Hospitality" },
    { icon: "🛒", title: "Product Information", desc: "Link to product specs, reviews, and tutorials directly from packaging", tag: "Retail" },
    { icon: "💊", title: "Medical Records", desc: "Quick-access patient data and appointment scheduling for healthcare", tag: "Healthcare" },
    { icon: "📍", title: "Location Sharing", desc: "Share your business location on Google Maps with one scan", tag: "Local Business" },
]

function Carousel2({ items }) {
    const [current, setCurrent] = useState(0)
    const visibleCount = 4
    const maxIdx = Math.max(0, items.length - visibleCount)

    const prev = () => setCurrent(c => Math.max(0, c - 1))
    const next = () => setCurrent(c => Math.min(maxIdx, c + 1))

    return (
        <div className="relative">
            <div className="overflow-hidden">
                <div
                    className="flex gap-4 transition-transform duration-500"
                    style={{ transform: `translateX(calc(-${current * 25}% - ${current * 16 * 0.25}px))` }}
                >
                    {items.map((uc) => (
                        <div
                            key={uc.title}
                            className="card-lift flex-shrink-0 w-[calc(25%-12px)] glass rounded-2xl p-5 border border-white/5 hover:border-accent/20"
                        >
                            <div className="text-3xl mb-3">{uc.icon}</div>
                            <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-medium bg-accent/10 text-accent/80 mb-3">
                                {uc.tag}
                            </span>
                            <h3 className="font-semibold text-white text-sm mb-2">{uc.title}</h3>
                            <p className="text-white/35 text-xs leading-relaxed">{uc.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex items-center justify-center gap-3 mt-6">
                <button type="button" onClick={prev} disabled={current === 0} className="w-9 h-9 rounded-full glass-light border border-white/10 flex items-center justify-center text-white/50 hover:text-white disabled:opacity-30 transition">←</button>
                <div className="flex gap-1.5">
                    {Array.from({ length: maxIdx + 1 }).map((_, i) => (
                        <button key={i} type="button" onClick={() => setCurrent(i)} className={`h-1.5 rounded-full transition-all ${i === current ? "bg-accent w-5" : "bg-white/20 w-1.5"}`} />
                    ))}
                </div>
                <button type="button" onClick={next} disabled={current === maxIdx} className="w-9 h-9 rounded-full glass-light border border-white/10 flex items-center justify-center text-white/50 hover:text-white disabled:opacity-30 transition">→</button>
            </div>
        </div>
    )
}

export default function UseCaseCarousel() {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <div className="inline-block px-4 py-1.5 rounded-full glass-light border border-white/10 text-xs text-white/50 uppercase tracking-widest mb-4">
                        Use Cases
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
                        Infinite <span className="gradient-text-warm">Possibilities</span>
                    </h2>
                    <p className="text-white/40 max-w-xl mx-auto">Explore how businesses and creators use QR codes to enhance their customer experience.</p>
                </div>
                <Carousel2 items={USE_CASES} />
            </div>
        </section>
    )
}
